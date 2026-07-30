import { useAuth } from '@/providers/auth-session';
import { ActivityListContent } from '../activity/activity-list-content';
import { useGetVaultTransactionsQuery } from '@/lib/store/vault_card';

export function CardHistory() {
  const { currentUser } = useAuth();
  const { data: transactions, isLoading } = useGetVaultTransactionsQuery(
    {
      id: currentUser?.id ?? '',
    },
    { skip: !currentUser },
  );

  return (
    <ActivityListContent
      transactions={transactions}
      isLoading={isLoading}
      empty_list_id="activity_all"
    />
  );
}
