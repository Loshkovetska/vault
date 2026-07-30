import { Text } from '@/components/ui/text';
import {
  Bill,
  DeterminedTransaction,
  Refund,
  TopUp,
  Transaction,
  TransactionType,
  Transfer,
  Withdraw,
} from '@/lib/types/transaction';
import { TouchableOpacity, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { ActivityStatus } from './activity-status';
import { priceFormate } from '@/lib/utils/number';
import { LiquidGlassView } from '@callstack/liquid-glass';
import { User } from '@solar-icons/react-native/Linear';
import { themeConfig } from '@/lib/theme';

const styles = StyleSheet.create(theme => ({
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
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  itemsLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  itemInfo: {
    gap: 4,
    flexGrow: 1,
    maxWidth: '70%',
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors['white-opacity'],
  },
}));

const titles: Record<Transaction['type'], string> = {
  [TransactionType.TopUp]: 'Top Up',
  [TransactionType.Transfer]: 'Transfer to',
  [TransactionType.Withdraw]: 'Withdraw',
  [TransactionType.Bill]: 'Bill for',
  [TransactionType.Refund]: 'Refund from',
};

export function ActivityItemShort({
  transaction,
  onPress,
}: {
  transaction: Transaction;
  onPress?: () => void;
}) {
  switch (transaction.type) {
    case TransactionType.Transfer:
      const transfer = transaction as DeterminedTransaction<Transfer>;
      return (
        <TouchableOpacity
          activeOpacity={!onPress ? 1 : undefined}
          style={styles.item}
          onPress={onPress}
        >
          <View style={styles.itemsLeft}>
            <LiquidGlassView style={styles.icon}>
              <User size={24} color={themeConfig.colors['gray-900']} />
            </LiquidGlassView>
            <View style={styles.itemInfo}>
              <Text typo="text-md" weight={500}>
                {transfer.name}
              </Text>
              <ActivityStatus status={transfer.status} size="xs" />
            </View>
          </View>
          <Text typo="text-lg" weight={600} color="error-500">
            -{priceFormate(transfer.amount, 0)}
          </Text>
        </TouchableOpacity>
      );
    case TransactionType.Bill:
      const bill = transaction as DeterminedTransaction<Bill>;
      return (
        <TouchableOpacity
          activeOpacity={!onPress ? 1 : undefined}
          style={styles.item}
          onPress={onPress}
        >
          <View style={styles.itemsLeft}>
            <View style={styles.itemInfo}>
              <Text typo="text-md" weight={500}>
                {titles[bill.type]} {bill.metadata.service}
              </Text>
              <ActivityStatus status={bill.status} size="xs" />
            </View>
          </View>
          <Text typo="text-lg" weight={600} color="error-500">
            -{priceFormate(bill.amount, 0)}
          </Text>
        </TouchableOpacity>
      );
    case TransactionType.Refund:
      const refund = transaction as DeterminedTransaction<Refund>;
      return (
        <TouchableOpacity
          activeOpacity={!onPress ? 1 : undefined}
          style={styles.item}
          onPress={onPress}
        >
          <View style={styles.itemsLeft}>
            <View style={styles.itemInfo}>
              <Text typo="text-md" weight={500}>
                {titles[refund.type]}
              </Text>
              <ActivityStatus status={refund.status} size="xs" />
            </View>
          </View>
        </TouchableOpacity>
      );
    case TransactionType.TopUp:
      const topUp = transaction as DeterminedTransaction<TopUp>;
      return (
        <TouchableOpacity
          activeOpacity={!onPress ? 1 : undefined}
          style={styles.item}
          onPress={onPress}
        >
          <View style={styles.itemsLeft}>
            <View style={styles.itemInfo}>
              <Text typo="text-md" weight={500}>
                {titles[topUp.type]}
              </Text>
              <ActivityStatus status={topUp.status} size="xs" />
            </View>
          </View>
          <Text typo="text-lg" weight={600} color="success-500">
            +{priceFormate(topUp.amount, 0)}
          </Text>
        </TouchableOpacity>
      );
    case TransactionType.Withdraw:
      const withdraw = transaction as DeterminedTransaction<Withdraw>;
      return (
        <TouchableOpacity
          activeOpacity={!onPress ? 1 : undefined}
          style={styles.item}
          onPress={onPress}
        >
          <View style={styles.itemsLeft}>
            <View style={styles.itemInfo}>
              <Text typo="text-md" weight={500}>
                {titles[withdraw.type]}
              </Text>
              <ActivityStatus status={withdraw.status} size="xs" />
            </View>
          </View>
          <Text typo="text-lg" weight={600} color="error-500">
            -{priceFormate(withdraw.amount, 0)}
          </Text>
        </TouchableOpacity>
      );
    default:
      return null;
  }
}
