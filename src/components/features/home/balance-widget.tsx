import { StyleSheet } from 'react-native-unistyles';
import { TouchableOpacity, View } from 'react-native';
import { Text } from '@/components/ui/text';
import {
  BillList,
  CardTransfer,
  CashOut,
  TransferHorizontal,
} from '@solar-icons/react-native/Linear';
import { priceFormate } from '@/lib/utils/number';
import { LiquidGlassView } from '@callstack/liquid-glass';
import { themeConfig } from '@/lib/theme';
import { useNavigate } from '@/lib/hooks/use-navigate';
import { Icon } from '@solar-icons/react-native/lib/types';
import { TransactionScreens } from '@/components/navigation/type';

const styles = StyleSheet.create(theme => ({
  container: {
    padding: 16,
    gap: 16,
  },
  top: {
    gap: 4,
  },
  blueView: {
    width: '100%',
    borderRadius: 48,
    overflow: 'hidden',
    backgroundColor: theme.colors['light-black-opacity'],
  },
  blurContainer: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    padding: 12,
  },
}));

const items: Array<{
  icon: Icon;
  title: string;
  screen: keyof TransactionScreens;
}> = [
  {
    icon: CardTransfer,
    title: 'Top Up',
    screen: 'TopUp',
  },
  {
    icon: TransferHorizontal,
    title: 'Transfer',
    screen: 'Transfer',
  },
  { icon: BillList, title: 'Bill', screen: 'Bill' },
  { icon: CashOut, title: 'Withdraw', screen: 'Withdraw' },
];

export default function BalanceWidget({ balance }: { balance: number }) {
  const { goToTransaction } = useNavigate();

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text typo="display-xs">My Balance</Text>
        <Text typo="display-lg" weight={600}>
          {priceFormate(balance)}
        </Text>
      </View>
      <LiquidGlassView effect="clear" style={styles.blueView}>
        <View style={styles.blurContainer}>
          {items.map(item => (
            <TouchableOpacity
              style={styles.btn}
              key={item.title}
              onPress={() => goToTransaction(item.screen)}
            >
              <item.icon size={32} color={themeConfig.colors['gray-900']} />
              <Text typo="text-md" weight={500}>
                {item.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </LiquidGlassView>
    </View>
  );
}
