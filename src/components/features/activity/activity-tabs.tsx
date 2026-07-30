import { GlassButton } from '@/components/ui/glass-button';
import { ActivityTabItem, activityTypes } from '@/lib/constants/content';
import { TransactionFilter } from '@/lib/types/transaction';
import { useCallback } from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';

type ActivityTabsProps = {
  value: TransactionFilter;
  onValueChange: (v: TransactionFilter) => void;
};
export function ActivityTabs({ value, onValueChange }: ActivityTabsProps) {
  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<ActivityTabItem>) => {
      return (
        <GlassButton
          variant={item.type === value ? 'selected' : 'default'}
          key={item.type}
          onPress={() => onValueChange(item.type)}
        >
          {item.title}
        </GlassButton>
      );
    },
    [value, onValueChange],
  );
  return (
    <FlatList
      horizontal
      keyExtractor={item => item.type}
      renderItem={renderItem}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ gap: 8, paddingLeft: 16, paddingRight: 16 }}
      data={activityTypes}
    />
  );
}
