import { DeterminedTransaction, Refund } from '@/lib/types/transaction';

import { priceFormate } from '@/lib/utils/number';
import { DetailsWrapper } from './details-wrapper';

export function RefundDetails({
  metadata,
  ...transaction
}: DeterminedTransaction<Refund>) {
  const data = {
    'Original Transaction': `#${metadata.original_transaction}`,
    'Refund Amount': priceFormate(transaction.amount),
    'Refund Method': 'vaulta Balance',
    Reason: metadata.reason,
  };
  return (
    <DetailsWrapper
      type="Refund"
      defined_type={transaction.type}
      data={data}
      status={transaction.status}
      created_at={transaction.created_at}
      completed_at={metadata.completed_at}
      tracking={metadata.tracking}
    />
  );
}
