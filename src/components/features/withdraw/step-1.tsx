import { AmountSelect } from '@/components/common/amount-select';
import { Text } from '@/components/ui/text';
import { priceFormate } from '@/lib/utils/number';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

const styles = StyleSheet.create(() => ({
  container: {
    padding: 16,
    gap: 48,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  col: {
    gap: 12,
  },
  btn: {
    paddingVertical: 16,
    paddingHorizontal: 28,
    borderRadius: 24,
    height: 53,
  },
  wrap: {
    flexWrap: 'wrap',
  },
}));

type Step1Props = {
  balance?: number;
  amount: string;
  onAmountChange: (v: string) => void;
};

export function Step1({ balance, amount, onAmountChange }: Step1Props) {
  return (
    <View style={styles.container}>
      <Text typo="text-xl" weight={500}>
        Current balance: {priceFormate(balance ?? 0)}
      </Text>
      <AmountSelect {...{ amount, onAmountChange }} fee={0} />
    </View>
  );
}
