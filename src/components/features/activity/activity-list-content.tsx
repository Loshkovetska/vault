import { useCallback, useMemo } from 'react';
import {
  ActivityIndicator,
  SectionList,
  SectionListRenderItemInfo,
  View,
} from 'react-native';
import { ActivityItem } from './activity-item';
import { Text } from '@/components/ui/text';
import { activityListFormate } from '@/lib/utils/transactions';
import { Placeholder } from '@/components/common/placeholder';
import { EmptyList } from '@/components/common/empty-list';
import { Transaction } from '@/lib/types/transaction';
import { emptyLists } from '@/lib/constants/empty-lists';

type ActivityListContentProps = {
  transactions?: Transaction[];
  isLoading: boolean;
  empty_list_id: string;
  refreshing?: boolean;
  onRefresh?: () => void;
};

export function ActivityListContent({
  transactions,
  isLoading,
  empty_list_id,
  refreshing,
  onRefresh,
}: ActivityListContentProps) {
  const renderItem = useCallback(
    ({ item, index }: SectionListRenderItemInfo<Transaction>) => {
      return (
        <View
          style={[
            { paddingHorizontal: 16 },
            ...(index > 0 ? [{ marginTop: 4 }] : []),
          ]}
        >
          <ActivityItem item={item} key={item.id} />
        </View>
      );
    },
    [],
  );

  const formattedList = useMemo(() => {
    return activityListFormate(transactions ?? []);
  }, [transactions]);

  const emptyList = emptyLists[empty_list_id as 'activity_all'];

  return (
    <SectionList
      keyExtractor={item => item.id}
      refreshing={refreshing}
      refreshControl={refreshing ? <ActivityIndicator size={24} /> : undefined}
      onRefresh={onRefresh}
      renderItem={renderItem}
      nestedScrollEnabled
      stickySectionHeadersEnabled={false}
      sections={formattedList}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ gap: 12, paddingTop: 12, paddingBottom: 100 }}
      renderSectionHeader={({ section: { title } }) => (
        <Text typo="text-lg" weight={500} style={{ paddingHorizontal: 16 }}>
          {title}
        </Text>
      )}
      ListEmptyComponent={
        isLoading ? <Placeholder /> : <EmptyList {...emptyList} />
      }
    />
  );
}
