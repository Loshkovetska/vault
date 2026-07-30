import { DeterminedTransaction, TopUp } from '@/lib/types/transaction';
import { priceFormate } from '@/lib/utils/number';
import { DetailsWrapper } from './details-wrapper';
import { useGetBankQuery } from '@/lib/store/bank_accounts';
import { useGetCardQuery } from '@/lib/store/cards';
import { encryptCardNumber } from '@/lib/utils/string';

export function TopUpDetails({
  metadata,
  ...transaction
}: DeterminedTransaction<TopUp>) {
  const { data: bankAccount } = useGetBankQuery(metadata.method_id, {
    skip: metadata.payment_method !== 'bank_transfer',
  });
  const { data: card } = useGetCardQuery(metadata.method_id, {
    skip: metadata.payment_method !== 'card',
  });
  const isBank = metadata.payment_method === 'bank_transfer';

  const data = {
    Amount: priceFormate(transaction.amount),
    [isBank ? 'Name Bank' : 'Debit Card']: isBank
      ? bankAccount?.name ?? ''
      : encryptCardNumber(card?.card_number ?? ''),
    'Payment Method': metadata.payment_method,
    'Transaction ID': transaction.id,
    'Ref Number': metadata.reference_code,
  };
  return (
    <DetailsWrapper
      status={transaction.status}
      defined_type={transaction.type}
      type="Top Up"
      data={data}
      created_at={transaction.created_at}
    />
  );
}
