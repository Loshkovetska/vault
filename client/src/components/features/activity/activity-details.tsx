import { HeaderDetails } from '@/components/common/header-details';
import { Layout } from '@/components/common/layout';
import {
  Bill,
  DeterminedTransaction,
  Refund,
  TopUp,
  Transaction,
  TransactionStatus,
  TransactionType,
  Transfer,
  Withdraw,
} from '@/lib/types/transaction';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { Document2, Restart } from '@solar-icons/react-native/Linear';
import { GlassButton } from '@/components/ui/glass-button';
import { EmptyList } from '@/components/common/empty-list';
import { PaymentDetails } from './details/payment';
import { TopUpDetails } from './details/top-up';
import { RefundDetails } from './details/refund';
import { WithdrawDetails } from './details/withdraw';
import { BillDetails } from './details/bill';
import { Placeholder } from '@/components/common/placeholder';
import { useNavigate } from '@/lib/hooks/use-navigate';
import { themeConfig } from '@/lib/theme';

const styles = StyleSheet.create(theme => ({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    gap: 32,
  },
  list: {
    gap: 16,
    borderBottomWidth: 1,
    borderColor: theme.colors['gray-500'],
    paddingVertical: 24,
  },
  btns: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    gap: 8,
    width: '100%',
  },
  empty: { alignItems: 'center', justifyContent: 'center', flex: 1 },
  btn: {
    width: '100%',
  },
  btn_height: {
    height: 48,
  },
}));

export function ActivityDetails({
  transaction,
  loading,
}: {
  transaction?: Transaction;
  loading: boolean;
}) {
  const { goToScreen } = useNavigate();
  if (!transaction || loading) {
    return (
      <View style={styles.empty}>
        {loading ? (
          <Placeholder type="activity-details" />
        ) : (
          <EmptyList
            title="Error occured"
            text="Please try again later"
            Icon={Restart}
          />
        )}
      </View>
    );
  }

  const content: Record<TransactionType, React.ReactNode> = {
    [TransactionType.Bill]: (
      <BillDetails {...(transaction as DeterminedTransaction<Bill>)} />
    ),
    [TransactionType.Transfer]: (
      <PaymentDetails {...(transaction as DeterminedTransaction<Transfer>)} />
    ),
    [TransactionType.TopUp]: (
      <TopUpDetails {...(transaction as DeterminedTransaction<TopUp>)} />
    ),
    [TransactionType.Refund]: (
      <RefundDetails {...(transaction as DeterminedTransaction<Refund>)} />
    ),
    [TransactionType.Withdraw]: (
      <WithdrawDetails {...(transaction as DeterminedTransaction<Withdraw>)} />
    ),
  };

  const isFailed = transaction.status === TransactionStatus.FAILED;
  return (
    <>
      <HeaderDetails title="Transaction Details" />
      <Layout>{content[transaction.type]}</Layout>
      <View style={styles.btns}>
        <GlassButton
          wrapperStyle={styles.btn}
          style={styles.btn_height}
          size={isFailed ? undefined : 'icon_right'}
          iconRight={
            isFailed ? undefined : (
              <Document2 size={24} color={themeConfig.colors['gray-900']} />
            )
          }
          variant={isFailed ? 'selected' : 'default'}
          onPress={() => goToScreen('ContactUs')}
        >
          {isFailed ? 'Contact Us' : 'Download PDF'}
        </GlassButton>
      </View>
    </>
  );
}
