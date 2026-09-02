import { DeterminedTransaction, Withdraw } from '@/lib/types/transaction';
import { priceFormate } from '@/lib/utils/number';
import { DetailsWrapper } from './details-wrapper';
import { accountFormate } from '@/lib/utils/string';
import { useGetBankQuery } from '@/lib/store/bank_accounts';

export function WithdrawDetails({
  metadata,
  ...transaction
}: DeterminedTransaction<Withdraw>) {
  const { data: selectedBank } = useGetBankQuery(metadata.method_id);
  const data = {
    'Amount:': priceFormate(transaction.amount),
    'Name Bank': `${selectedBank?.name ?? ''}(${accountFormate(
      selectedBank?.account ?? '',
    )})`,
    'Payment Method': 'Withdraw',
    'Transaction ID': transaction.id,
    'Reference Code': metadata?.reference_code,
    Fee: priceFormate(metadata.fee ?? 0),
    Category: transaction.type,
  };
  return (
    <DetailsWrapper
      status={transaction.status}
      defined_type={transaction.type}
      type="Withdraw"
      data={data}
      created_at={transaction.created_at}
    />
  );
}
