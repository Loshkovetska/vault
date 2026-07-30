import { ActivityDetails } from '@/components/features/activity/activity-details';
import { useGetTransactionQuery } from '@/lib/store/transactions';
import { RouteProp } from '@react-navigation/native';
import { RootParams } from '../type';

export function ActivityDetailsScreen({
  route: { params },
}: {
  route: RouteProp<RootParams, 'ActivityDetails'>;
}) {
  const { data: details, isLoading } = useGetTransactionQuery(params?.id);
  return (
    <ActivityDetails loading={isLoading} transaction={details ?? undefined} />
  );
}
