import { Text } from '@/components/ui/text';
import { Transaction, TransactionType } from '@/lib/types/transaction';
import { LiquidGlassView } from '@callstack/liquid-glass';
import { View, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { ActivityStatus } from './activity-status';
import { priceFormate } from '@/lib/utils/number';
import { Button } from '@/components/ui/button';
import { useNavigate } from '@/lib/hooks/use-navigate';
import { Separator } from '@/components/ui/separator';
import { ActivityType } from './activity-type';

const styles = StyleSheet.create(theme => ({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 16,
    gap: 16,
    borderRadius: 20,
    backgroundColor: theme.colors['light-black-opacity'],
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  top_row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexGrow: 1,
    maxWidth: '80%',
  },
  top_col: { gap: 12, flexGrow: 1, maxWidth: '75%' },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
    flexWrap: 'wrap',
  },
}));
export function ActivityItem({
  item,
  style,
}: {
  item: Transaction;
  style?: ViewStyle;
}) {
  const { goToActivityDetails } = useNavigate();
  return (
    <LiquidGlassView effect="clear" style={[styles.container, style]}>
      <View style={styles.top}>
        <View style={styles.top_col}>
          <View style={styles.top_row}>
            <ActivityType type={item.type} />
            <Text typo="text-xl" weight={600}>
              {item.name}
            </Text>
          </View>
          <Text
            typo="display-xs"
            color={
              item.type === TransactionType.TopUp ? 'success-500' : 'error-500'
            }
            weight={600}
          >
            {item.type === TransactionType.TopUp ? '+' : '-'}
            {priceFormate(item.amount, 0)}
          </Text>
        </View>
        <ActivityStatus status={item.status} />
      </View>
      <Separator />
      <View style={styles.bottom}>
        <View style={[styles.top_col, { maxWidth: '100%' }]}>
          <Text typo="text-md" weight={500} numberOfLines={1}>
            ID Transaction: {item.id}
          </Text>
        </View>
        <Button size="md" onPress={() => goToActivityDetails(item.id)}>
          See Details
        </Button>
      </View>
    </LiquidGlassView>
  );
}
