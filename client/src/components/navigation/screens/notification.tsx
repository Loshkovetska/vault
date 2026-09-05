import { HeaderDetails } from '@/components/common/header-details';
import { Layout } from '@/components/common/layout';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Text } from '@/components/ui/text';
import { useTogglePreferenceMutation } from '@/lib/store/users';
import { ToggledPreference } from '@/lib/types/user';
import { useAuth } from '@/providers/auth-session';
import { useCallback } from 'react';
import { View } from 'react-native';
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

export function NotificationSettingsScreen() {
  const { currentUser } = useAuth();
  const [mutate] = useTogglePreferenceMutation();

  const onToggle = useCallback(
    (k: ToggledPreference) => (v: boolean) => {
      mutate({ body: { [k]: v } });
    },
    [mutate],
  );

  return (
    <>
      <HeaderDetails title="Notifications" position="left" />
      <Layout>
        <View style={styles.block2}>
          <Text typo="display-xs" weight={600}>
            Push Notifications
          </Text>
          <View style={styles.btn}>
            <Text typo="text-lg" weight={500}>
              Transaction Alerts
            </Text>
            <Switch
              value={currentUser?.transaction}
              onValueChange={onToggle('transaction')}
            />
          </View>
          <View style={styles.btn}>
            <Text typo="text-lg" weight={500}>
              Promotions & Rewards
            </Text>
            <Switch
              value={currentUser?.promotion}
              onValueChange={onToggle('promotion')}
            />
          </View>
          <View style={styles.btn}>
            <Text typo="text-lg" weight={500}>
              Security Alerts
            </Text>
            <Switch
              value={currentUser?.security}
              onValueChange={onToggle('security')}
            />
          </View>
        </View>
        <Separator />
        <View style={styles.block2}>
          <Text typo="display-xs" weight={600}>
            Email Notifications
          </Text>
          <View style={styles.btn}>
            <Text typo="text-lg" weight={500}>
              Monthly Report
            </Text>
            <Switch
              value={currentUser?.monthly_report}
              onValueChange={onToggle('monthly_report')}
            />
          </View>
          <View style={styles.btn}>
            <Text typo="text-lg" weight={500}>
              Newsletter
            </Text>
            <Switch
              value={currentUser?.newsletter}
              onValueChange={onToggle('newsletter')}
            />
          </View>
        </View>
      </Layout>
    </>
  );
}
