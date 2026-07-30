import { themeConfig } from '@/lib/theme';
import { TransactionType } from '@/lib/types/transaction';
import { LiquidGlassView } from '@callstack/liquid-glass';
import { Icon } from '@solar-icons/react-native/lib/types';
import {
  BillList,
  CardTransfer,
  CashOut,
  TransferHorizontal,
  UndoLeft,
} from '@solar-icons/react-native/Linear';
import { StyleSheet } from 'react-native-unistyles';

const types: Record<TransactionType, Icon> = {
  bill: BillList,
  refund: UndoLeft,
  top_up: CardTransfer,
  transfer: TransferHorizontal,
  withdraw: CashOut,
};

const iconSizes = {
  default: 20,
  lg: 32,
  sm: 16,
};

const styles = StyleSheet.create(theme => ({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  size_default: { width: 32, height: 32, borderRadius: 16 },
  size_sm: { width: 24, height: 24, borderRadius: 12 },
  size_lg: { width: 64, height: 64, borderRadius: 32 },
  bill: {
    backgroundColor: theme.colors['brand-800'],
  },
  top_up: { backgroundColor: theme.colors['warn-800'] },
  transfer: { backgroundColor: theme.colors['success-800'] },
  refund: { backgroundColor: theme.colors['error-800'] },
  withdraw: { backgroundColor: theme.colors['gray-800'] },
}));

export function ActivityType({
  type,
  size = 'default',
}: {
  type: TransactionType;
  size?: 'default' | 'lg' | 'sm';
}) {
  const IconComp = types[type];

  const iconSize = iconSizes[size];

  return (
    <LiquidGlassView
      effect="clear"
      colorScheme="light"
      style={[styles.container, styles[`size_${size}`], styles[type]]}
    >
      <IconComp size={iconSize} color={themeConfig.colors['gray-0']} />
    </LiquidGlassView>
  );
}
