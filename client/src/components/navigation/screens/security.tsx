import { HeaderDetails } from '@/components/common/header-details';
import { Layout } from '@/components/common/layout';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Text } from '@/components/ui/text';
import { useNavigate } from '@/lib/hooks/use-navigate';
import { useTogglePreferenceMutation } from '@/lib/store/users';
import { themeConfig } from '@/lib/theme';
import { ToggledPreference } from '@/lib/types/user';
import { useAuth } from '@/providers/auth-session';
import { AltArrowRight } from '@solar-icons/react-native/Linear';
import { useCallback } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

const styles = StyleSheet.create(() => ({
  block: { gap: 20, paddingVertical: 24, paddingHorizontal: 16 },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    justifyContent: 'space-between',
  },
  block2: {
    gap: 16,
    padding: 16,
  },
}));

export function SecurityScreen() {
  const { currentUser } = useAuth();
  const { goToScreen } = useNavigate();
  const [mutation] = useTogglePreferenceMutation();

  const onToggle = useCallback(
    (k: ToggledPreference) => (v: boolean) => {
      mutation({ body: { [k]: v } });
    },
    [mutation],
  );
  return (
    <>
      <HeaderDetails position="left" title="Security & Privacy" />
      <Layout>
        <View style={styles.block}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => goToScreen('ChangePassword')}
          >
            <Text typo="text-lg" weight={500}>
              Change Password
            </Text>
            <AltArrowRight color={themeConfig.colors['gray-900']} size={24} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => goToScreen('ChangePIN')}
          >
            <Text typo="text-lg" weight={500}>
              Change PIN
            </Text>
            <AltArrowRight color={themeConfig.colors['gray-900']} size={24} />
          </TouchableOpacity>
          <View style={styles.btn}>
            <Text typo="text-lg" weight={500}>
              Biometric Login
            </Text>
            <Switch
              value={currentUser?.biometric}
              onValueChange={onToggle('biometric')}
            />
          </View>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => goToScreen('DeviceManagement')}
          >
            <Text typo="text-lg" weight={500}>
              Device Management
            </Text>
            <AltArrowRight color={themeConfig.colors['gray-900']} size={24} />
          </TouchableOpacity>
        </View>
        <Separator />
        <View style={styles.block2}>
          <Text typo="display-xs" weight={600}>
            Privacy Setting
          </Text>
          <View style={styles.btn}>
            <Text typo="text-lg" weight={500}>
              Data Sharing
            </Text>
            <Switch
              value={currentUser?.data_sharing}
              onValueChange={onToggle('data_sharing')}
            />
          </View>
          <View style={styles.btn}>
            <Text typo="text-lg" weight={500}>
              Personalized Ads
            </Text>
            <Switch
              value={currentUser?.personalized_ads}
              onValueChange={onToggle('personalized_ads')}
            />
          </View>
        </View>
      </Layout>
    </>
  );
}
