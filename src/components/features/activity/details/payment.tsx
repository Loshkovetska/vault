import { DeterminedTransaction, Transfer } from '@/lib/types/transaction';
import { priceFormate } from '@/lib/utils/number';
import { DetailsWrapper } from './details-wrapper';
import { accountFormate } from '@/lib/utils/string';

export function PaymentDetails({
  metadata,
  ...transaction
}: DeterminedTransaction<Transfer>) {
  const data = {
    'Name Transaction': transaction?.name,
    Amount: priceFormate(transaction?.amount ?? 0),
    'Transaction ID': transaction?.id,
    'Destination Account': accountFormate(metadata.destination_account),
  };
  return (
    <DetailsWrapper
      status={transaction.status}
      defined_type={transaction.type}
      type="Transfer"
      data={data}
      created_at={transaction.created_at}
    />
  );
}
