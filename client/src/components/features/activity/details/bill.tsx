import { Bill, DeterminedTransaction } from '@/lib/types/transaction';
import { priceFormate } from '@/lib/utils/number';
import { DetailsWrapper } from './details-wrapper';
import { accountFormate } from '@/lib/utils/string';

export function BillDetails({
  metadata,
  ...transaction
}: DeterminedTransaction<Bill>) {
  const data = {
    Amount: priceFormate(transaction.amount),
    Service: metadata.service,
    'Account Reference':
      metadata.service === 'pulse_data'
        ? metadata.account_reference ?? ''
        : accountFormate(metadata.account_reference ?? ''),
  };
  return (
    <DetailsWrapper
      status={transaction.status}
      defined_type={transaction.type}
      type="Bill"
      data={data}
      created_at={transaction.created_at}
    />
  );
}
