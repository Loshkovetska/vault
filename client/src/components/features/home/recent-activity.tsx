import { Text } from '@/components/ui/text';
import { TouchableOpacity, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { EmptyList } from '@/components/common/empty-list';
import { emptyLists } from '@/lib/constants/empty-lists';
import { useNavigate } from '@/lib/hooks/use-navigate';
import { ActivityItemShort } from '../activity/activity-item-short';
import { useGetRecentQuery } from '@/lib/store/transactions';
import { Placeholder } from '@/components/common/placeholder';

const styles = StyleSheet.create(() => ({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  list: {
    gap: 16,
  },
  empty: { paddingVertical: 8 },
}));

export function RecentActivity({ session_id }: { session_id: string }) {
  const { data: activities, isLoading } = useGetRecentQuery(session_id);
  const { goToActivity, goToActivityDetails } = useNavigate();

  if (isLoading) return <Placeholder type="recent-activity" />;
  if (!activities?.length) return null;
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text typo="text-xl" weight={600}>
          Recent Activity
        </Text>
        <TouchableOpacity onPress={goToActivity}>
          <Text typo="text-sm" color="brand-800">
            See all
          </Text>
        </TouchableOpacity>
      </View>
      {(activities ?? [])?.length > 0 ? (
        <View style={styles.list}>
          {activities?.map(activity => (
            <ActivityItemShort
              transaction={activity}
              key={activity.id}
              onPress={() => goToActivityDetails(activity.id)}
            />
          ))}
        </View>
      ) : (
        <EmptyList {...emptyLists['activity_all']} style={styles.empty} />
      )}
    </View>
  );
}
