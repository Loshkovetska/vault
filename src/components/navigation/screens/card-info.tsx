import { BaseRow } from '@/components/common/base-row';
import { HeaderDetails } from '@/components/common/header-details';
import { Layout } from '@/components/common/layout';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Text } from '@/components/ui/text';
import { useNavigate } from '@/lib/hooks/use-navigate';
import {
  useGetVaultCardQuery,
  useToggleCardStatusMutation,
} from '@/lib/store/vault_card';
import { expireFormate } from '@/lib/utils/date';
import { priceFormate } from '@/lib/utils/number';
import { prettifyCardNumber } from '@/lib/utils/string';
import { useAuth } from '@/providers/auth-session';
import { LiquidGlassView } from '@callstack/liquid-glass';
import {
  Card,
  Copy,
  Lock,
  LockUnlocked,
  Password,
  Pause,
} from '@solar-icons/react-native/Linear';
import { useCallback } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import Clipboard from '@react-native-clipboard/clipboard';
import { toast } from '@/lib/helpers/toast';
import { ToastProvider } from '@/providers/toast';

const styles = StyleSheet.create(theme => ({
  container: {
    flex: 1,
    width: '100%',
    paddingTop: 16,
    paddingHorizontal: 16,
    gap: 24,
    backgroundColor: theme.colors['gray-0'],
  },
  close: { color: theme.colors['gray-900'] },
  section: {
    padding: 16,
    borderRadius: 16,
    gap: 16,
  },
  card: {
    borderWidth: 1,
    borderColor: theme.colors['gray-400'],
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  expire: { alignSelf: 'flex-end' },
}));

export function CardInfoScreen() {
  const { currentUser } = useAuth();
  const { goToScreen, goBack } = useNavigate();
  const { data: vaultCard } = useGetVaultCardQuery(currentUser?.id ?? '', {
    skip: !currentUser,
  });

  const [toggleStatus] = useToggleCardStatusMutation();

  const onPress = useCallback(
    (id: 'active' | 'pause' | 'block' | 'pin') => {
      switch (id) {
        case 'active':
        case 'pause':
        case 'block':
          return toggleStatus([vaultCard?.id ?? '', id])
            .then(() => toast.success('Card status updated!'))
            .catch(() => toast.error('Something went wrong!'));
        case 'pin':
          goBack();
          return goToScreen('ChangePIN');
        default:
          return;
      }
    },
    [vaultCard, goBack, toggleStatus, goToScreen],
  );

  const onCopy = useCallback(() => {
    Clipboard.setString(vaultCard?.card_number ?? '');
    toast.success('Number copied successfully!');
  }, [vaultCard?.card_number]);

  const EyeIcon = vaultCard?.status === 'block' ? Lock : LockUnlocked;
  const StatusIcon = vaultCard?.status === 'pause' ? Pause : Card;
  return (
    <>
      <HeaderDetails title="" />
      <Layout>
        <View style={styles.container}>
          <LiquidGlassView effect="clear" style={styles.section}>
            <Text typo="label-xl">Vault Card</Text>
            <View style={styles.card}>
              <Text typo="display-xs">
                {prettifyCardNumber(vaultCard?.card_number ?? '')}
              </Text>
              <TouchableOpacity onPress={onCopy}>
                <Copy color={styles.close.color} />
              </TouchableOpacity>
            </View>
            <Text typo="label-xl" style={styles.expire}>
              {expireFormate(new Date(vaultCard?.expired_at ?? 0))}
            </Text>
          </LiquidGlassView>
          <LiquidGlassView effect="clear" style={styles.section}>
            <Text typo="label-xl">Limits</Text>
            <BaseRow
              label="Daily Limit"
              value={priceFormate(vaultCard?.daily_limit ?? 0)}
            />
          </LiquidGlassView>
          <LiquidGlassView effect="clear" style={styles.section}>
            <Text typo="label-xl">Settings</Text>
            <Button
              variant="text"
              onPress={() => onPress('pin')}
              iconLeft={<Password color={styles.close.color} />}
            >
              Change PIN
            </Button>
            <Separator />
            <Button
              variant="text"
              onPress={() =>
                onPress(vaultCard?.status === 'pause' ? 'active' : 'pause')
              }
              iconLeft={<StatusIcon color={styles.close.color} />}
            >
              {vaultCard?.status === 'pause' ? 'Activate' : 'Freeze'} Card
            </Button>
            <Separator />
            <Button
              variant="text"
              onPress={() =>
                onPress(vaultCard?.status === 'block' ? 'active' : 'block')
              }
              iconLeft={<EyeIcon color={styles.close.color} />}
            >
              {vaultCard?.status === 'block' ? 'Block' : 'Unblock'} Card
            </Button>
          </LiquidGlassView>
        </View>
      </Layout>
      <ToastProvider />
    </>
  );
}
