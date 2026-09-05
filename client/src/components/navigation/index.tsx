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
import * as Keychain from 'react-native-keychain';

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

  useEffect(() => {
    const init = async () => {
      const onboarded = await AsyncStorage.getItem(STORAGE_KEYS.ONBOARDED_ID);
      const session = await Keychain.getGenericPassword({
        service: STORAGE_KEYS.SESSION_ID,
      });
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
