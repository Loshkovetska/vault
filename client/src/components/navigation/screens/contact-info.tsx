import { BaseRow } from '@/components/common/base-row';
import { HeaderDetails } from '@/components/common/header-details';
import { Layout } from '@/components/common/layout';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Text } from '@/components/ui/text';
import { useNavigate } from '@/lib/hooks/use-navigate';
import { useTogglePreferenceMutation } from '@/lib/store/users';
import { phoneFormate } from '@/lib/utils/string';
import { useAuth } from '@/providers/auth-session';
import { useCallback } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

const styles = StyleSheet.create({
  container: {
    paddingVertical: 32,
    paddingHorizontal: 16,
    gap: 48,
  },
  list: { gap: 16 },
  switch: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
});

export function ContactInfoScreen() {
  const { currentUser } = useAuth();
  const [mutate] = useTogglePreferenceMutation();
  const { goToScreen } = useNavigate();

  const isVerified = (v: boolean) => (
    <Text
      typo="text-lg"
      textAlign="right"
      weight={500}
      color={`${v ? 'success' : 'error'}-400`}
    >
      {v ? 'Verified' : 'Unverified'}
    </Text>
  );

  const onToggle = useCallback(
    (v: boolean) => {
      mutate({ body: { two_factor_auth: v } }).then(() => {});
    },
    [mutate],
  );
  return (
    <>
      <HeaderDetails position="left" title="Contact & Verify" />
      <Layout>
        <View style={styles.container}>
          <View style={styles.list}>
            <BaseRow
              label={
                <Text typo="text-lg" weight={500}>
                  Phone number: {phoneFormate(currentUser?.phone)}
                </Text>
              }
              value={isVerified(currentUser?.phone_verified ?? false)}
            />
            <BaseRow
              label={
                <Text typo="text-lg" weight={500}>
                  Email: {currentUser?.email ?? '-'}
                </Text>
              }
              value={isVerified(currentUser?.email_verified ?? false)}
            />
          </View>
          <View style={styles.list}>
            <Text typo="text-lg" weight={500}>
              KYC Status: {currentUser?.is_verified ? '' : 'Not'} Completed
            </Text>
            <Button
              disabled={currentUser?.is_verified}
              onPress={() => goToScreen('Verification')}
            >
              Start Verification
            </Button>
          </View>
          <View style={styles.switch}>
            <Text typo="text-lg" weight={500}>
              Two-Factor Authentication
            </Text>
            <Switch
              value={currentUser?.two_factor_auth}
              onValueChange={onToggle}
            />
          </View>
        </View>
      </Layout>
    </>
  );
}
