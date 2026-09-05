import { ActivityListContent } from '../activity/activity-list-content';
import { useGetVaultTransactionsQuery } from '@/lib/store/vault_card';

export function CardHistory() {
  const { data: transactions, isLoading } =
    useGetVaultTransactionsQuery(undefined);

  return (
    <ActivityListContent
      transactions={transactions}
      isLoading={isLoading}
      empty_list_id="activity_all"
    />
  );
}
