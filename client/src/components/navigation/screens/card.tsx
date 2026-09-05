import { EmptyList } from '@/components/common/empty-list';
import { HeaderDetails } from '@/components/common/header-details';
import { Layout } from '@/components/common/layout';
import { ActivityItemShort } from '@/components/features/activity/activity-item-short';
import { CardPreviewInfo } from '@/components/features/card/card-preview-info';
import { Button } from '@/components/ui/button';
import { GlassButton } from '@/components/ui/glass-button';
import { Text } from '@/components/ui/text';
import { emptyLists } from '@/lib/constants/empty-lists';
import { useNavigate } from '@/lib/hooks/use-navigate';
import {
  useGetVaultCardQuery,
  useGetVaultTransactionsQuery,
} from '@/lib/store/vault_card';
import { encryptCardNumber } from '@/lib/utils/string';
import { LiquidGlassView } from '@callstack/liquid-glass';
import { Chart } from '@solar-icons/react-native/Bold';
import { ClockCircle, Magnifier } from '@solar-icons/react-native/Linear';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

const styles = StyleSheet.create(theme => ({
  wrapper: { paddingHorizontal: 16 },
  section: {
    padding: 16,
    borderRadius: 16,
    gap: 16,
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    justifyContent: 'space-between',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  icon: {
    color: theme.colors['gray-900'],
  },
  empty: { paddingVertical: 24 },
  btn: { alignSelf: 'center' },
  btn_inner: {
    justifyContent: 'center',
    gap: 8,
  },
}));

export function CardScreen() {
  const { goToScreen, goToCardDetails } = useNavigate();
  const { data: vaultCard } = useGetVaultCardQuery(undefined);

  const { data: transactions } = useGetVaultTransactionsQuery(3);

  return (
    <>
      <HeaderDetails position="left" title="My Card" />
      <Layout>
        <CardPreviewInfo
          card_number={encryptCardNumber(vaultCard?.card_number ?? '')}
          balance={vaultCard?.balance ?? 0}
          holder={vaultCard?.card_holder ?? ''}
          expired_at={vaultCard?.expired_at ?? ''}
          onPress={() => goToScreen('CardInfo')}
        />

        <View style={styles.wrapper}>
          <LiquidGlassView effect="clear" style={styles.section}>
            <View style={styles.top}>
              <Text typo="label-xl">History</Text>
              <View style={styles.actions}>
                <GlassButton
                  size="circle_xs"
                  variant="selected"
                  onPress={() => goToCardDetails('History')}
                  iconLeft={<Magnifier size={16} color={styles.icon.color} />}
                />
                <GlassButton
                  variant="selected"
                  size="circle_xs"
                  onPress={() => goToCardDetails('Activity')}
                  iconLeft={<Chart size={16} color={styles.icon.color} />}
                />
              </View>
            </View>
            {(transactions ?? [])?.length > 0 ? (
              transactions?.map(tr => (
                <ActivityItemShort key={tr.id} transaction={tr} />
              ))
            ) : (
              <EmptyList style={styles.empty} {...emptyLists['activity_all']} />
            )}
            {(transactions ?? [])?.length > 0 && (
              <Button
                innerStyle={styles.btn_inner}
                iconLeft={<ClockCircle size={20} color={styles.icon.color} />}
                style={styles.btn}
                onPress={() => goToCardDetails('History')}
              >
                History
              </Button>
            )}
          </LiquidGlassView>
        </View>
      </Layout>
    </>
  );
}
