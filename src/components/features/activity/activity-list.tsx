import { ActivityHeader } from './actviity-header';
import { useState } from 'react';
import { TransactionFilter, TransactionType } from '@/lib/types/transaction';
import { useDebounce } from '@/lib/hooks/use-debounce';
import { useGetTransactionsQuery } from '@/lib/store/transactions';
import { ActivityListContent } from './activity-list-content';
import { useAuth } from '@/providers/auth-session';

export function ActivityList() {
  const { currentUser } = useAuth();
  const [searchValue, setSearchValue] = useState('');
  const debouncedValue = useDebounce(searchValue, 300);
  const [tab, setTab] = useState<TransactionFilter>('all');

  const {
    data: transactions,
    isLoading,
    isFetching,
    refetch,
  } = useGetTransactionsQuery(
    {
      type: tab,
      search: debouncedValue,
      user_id: currentUser?.id ?? '',
    },
    { skip: !currentUser },
  );

  const emptylistStrategy = {
    activity_all: tab === 'all' && !searchValue.length,
    activity_search: searchValue.length > 0,
    activity_refund: tab === TransactionType.Refund && !searchValue.length,
    activity_bill: tab === TransactionType.Bill && !searchValue.length,
  };

  const currentEmptyState =
    Object.entries(emptylistStrategy).find(([_, v]) => v)?.[0] ??
    'activity_all';

  return (
    <>
      <ActivityHeader
        search={searchValue}
        filter={tab}
        onSearch={setSearchValue}
        onFilter={setTab}
      />
      <ActivityListContent
        transactions={transactions}
        isLoading={isLoading}
        empty_list_id={currentEmptyState}
        refreshing={!isLoading && isFetching}
        onRefresh={refetch}
      />
    </>
  );
}
