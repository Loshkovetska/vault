import { Logo } from '@/assets/icons/footer-logo';
import { Layout } from '@/components/common/layout';
import { MenuList } from '@/components/features/profile/menu-list';
import { Avatar } from '@/components/ui/avatar';
import { GlassButton } from '@/components/ui/glass-button';
import { Text } from '@/components/ui/text';
import { useNavigate } from '@/lib/hooks/use-navigate';
import { useDeleteSessionMutation } from '@/lib/store/sessions';
import { useDeleteUserMutation } from '@/lib/store/users';
import { useAuth } from '@/providers/auth-session';
import { VerifiedCheck } from '@solar-icons/react-native/Bold';
import { useCallback } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native-unistyles';

const styles = StyleSheet.create(() => ({
  avatar: {
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
  },
  verified: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  btns: {
    paddingTop: 32,
    gap: 16,
    paddingHorizontal: 16,
  },
  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 32,
    paddingHorizontal: 16,
  },
}));

export function ProfileScreen() {
  const { goToScreen } = useNavigate();
  const [deleteAccount] = useDeleteUserMutation();
  const [deleteSession] = useDeleteSessionMutation();
  const insets = useSafeAreaInsets();
  const { session, currentUser, clearSession } = useAuth();

  const isVerified = currentUser?.is_verified;

  const onLogout = useCallback(() => {
    session &&
      deleteSession(session).then(() =>
        clearSession(() => goToScreen('SignIn')),
      );
  }, [session, clearSession, deleteSession, goToScreen]);

  const onDelete = useCallback(() => {
    currentUser && deleteAccount(currentUser?.id).then(onLogout);
  }, [currentUser, deleteAccount, onLogout]);

  return (
    <Layout>
      <View style={{ paddingTop: insets.top + 16 }}>
        <View style={styles.avatar}>
          <Avatar uri={currentUser?.image_url ?? ''} size="lg" />
          <View style={styles.verified}>
            <Text typo="display-sm" weight={600}>
              {currentUser?.full_name}
            </Text>
            {isVerified && <VerifiedCheck color="#49ADF4" />}
          </View>
        </View>
        <MenuList />
        <View style={styles.btns}>
          <GlassButton variant="error" typo="label-lg" onPress={onDelete}>
            Delete Account
          </GlassButton>
          <GlassButton variant="selected" typo="label-lg" onPress={onLogout}>
            Logout
          </GlassButton>
        </View>
        <View style={styles.bottom}>
          <Logo />
          <Text typo="text-xs" color="gray-900">
            Ver 16.26.1
          </Text>
        </View>
      </View>
    </Layout>
  );
}
