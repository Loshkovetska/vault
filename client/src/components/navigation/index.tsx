import { StyleSheet } from 'react-native-unistyles';
import { View, Image } from 'react-native';
import { themeConfig } from '@/lib/theme';
import { RootStack } from '@/components/navigation/root';
import {
  createStaticNavigation,
  NavigationContainerRefWithCurrent,
} from '@react-navigation/native';
import BootSplash from 'react-native-bootsplash';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useBiometric } from '@/lib/hooks/use-biometric';
import { STORAGE_KEYS } from '@/lib/constants/keys';
import { useSubscribe } from '@/lib/hooks/use-subscribe';
import { logger } from '@/lib/helpers/logger';
import { authService } from '@/lib/firebase/auth';
import { dbService } from '@/lib/firebase/db';
import { Notification } from '@/lib/types/notification';

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    position: 'relative',
    flex: 1,
    backgroundColor: themeConfig.colors['gray-0'],
  },
  ellipse: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 0,
  },
});

export default function NavigationProvider({
  ref,
}: {
  ref: NavigationContainerRefWithCurrent<ReactNavigation.RootParamList>;
}) {
  const [isSigned, setSigned] = useState(false);
  const [hasOnboarded, setOnboarded] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useBiometric(() => setSigned(false));

  useSubscribe({
    collection: 'sessions',
    onSuccess: async data => {
      try {
        const docs = data.docChanges();
        if (docs.length) {
          const session = await AsyncStorage.getItem(STORAGE_KEYS.SESSION_ID);
          const removed = docs.filter(d => d.type === 'removed');

          if (removed.length && session) {
            const theSame = removed.some(d => d.doc.id === session);
            if (theSame) {
              await Promise.all([
                authService.signOut(),
                AsyncStorage.removeItem(STORAGE_KEYS.SESSION_ID),
              ]);
              setSigned(false);
            }
          }

          const added = docs.filter(d => d.type === 'added');
          if (added.length && session) {
            const user_id = added
              .find(ses => ses.doc.id === session)
              ?.doc?.data()?.user_id;

            const activeSessions = added.find(
              ses =>
                ses.doc.id !== session && ses.doc.data()?.user_id === user_id,
            );
            if (activeSessions) {
              const payload: Omit<Notification, 'id'> = {
                user_id,
                title: 'New Sign In was detected',
                text: "Confirm if it's you",
                type: 'security',
                created_at: new Date().toISOString(),
                metadata: {
                  session_id: activeSessions.doc.id,
                },
              };
              await dbService.post('notifications', payload);
            }
          }
        }
      } catch (e) {
        logger('[ERROR]: Session Error', e);
      }
    },
  });

  useEffect(() => {
    const init = async () => {
      const onboarded = await AsyncStorage.getItem(STORAGE_KEYS.ONBOARDED_ID);
      const session = await AsyncStorage.getItem(STORAGE_KEYS.SESSION_ID);
      if (session) {
        setSigned(true);
      }
      if (onboarded) {
        setOnboarded(true);
      }
    };

    init().finally(() => {
      setLoading(false);
    });
  }, []);

  const Navigation = createStaticNavigation(RootStack(hasOnboarded, isSigned));
  if (isLoading) return null;
  return (
    <View style={styles.wrapper}>
      <Image
        source={require('@/assets/images/Ellipse.png')}
        style={styles.ellipse}
      />
      <Navigation ref={ref} onReady={() => BootSplash.hide({ fade: true })} />
    </View>
  );
}
