import { HeaderDetails } from '@/components/common/header-details';
import { Text } from '@/components/ui/text';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { RouteProp } from '@react-navigation/native';
import { RootParams } from '../type';
import {
  useDeleteSessionMutation,
  useGetSessionQuery,
} from '@/lib/store/sessions';
import { dateFormate } from '@/lib/utils/date';
import { GlassButton } from '@/components/ui/glass-button';
import { useNavigate } from '@/lib/hooks/use-navigate';

const styles = StyleSheet.create({
  container: {
    paddingBlock: 24,
    paddingHorizontal: 16,
    gap: 76,
  },
  list: {
    gap: 12,
  },
  action_block: {
    gap: 64,
  },
  btns: {
    gap: 16,
  },
  btn: {
    height: 48,
  },
});

export function SuspiciousActivity({
  route: { params },
}: {
  route: RouteProp<RootParams, 'SuspiciousActivity'>;
}) {
  const { goToScreen } = useNavigate();
  const { data: currentSession } = useGetSessionQuery(params?.id ?? '', {
    skip: !params?.id,
  });

  const [deleteSession] = useDeleteSessionMutation();
  const protectAccount = () => {
    deleteSession(params?.id).then(() => goToScreen('ChangePassword'));
  };
  return (
    <>
      <HeaderDetails title="Suspicious Activity" />
      <View style={styles.container}>
        <Text typo="text-xl" weight={500} textAlign="center">
          We detected unusual activity on your account.
        </Text>

        <View style={styles.list}>
          <Text typo="text-lg" weight={500}>
            &bull;Device: {currentSession?.device}
          </Text>
          <Text typo="text-lg" weight={500}>
            &bull; Location: {currentSession?.location}
          </Text>
          <Text typo="text-lg" weight={500}>
            &bull;Time: {dateFormate(new Date(currentSession?.last_at ?? 0))}
          </Text>
        </View>
        <View style={styles.action_block}>
          <Text textAlign="center" typo="text-xl" weight={500}>
            What would you like to do?
          </Text>
          <View style={styles.btns}>
            <GlassButton
              wrapperStyle={styles.btn}
              onPress={() => goToScreen('HomeTabs')}
            >
              This Was Me
            </GlassButton>
            <GlassButton
              variant="selected"
              wrapperStyle={styles.btn}
              onPress={protectAccount}
            >
              Secure Account
            </GlassButton>
          </View>
        </View>
      </View>
    </>
  );
}
