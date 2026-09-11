import { View } from 'react-native';
import { Text } from '../ui/text';
import { Input } from '../ui/input';
import { GlassButton } from '../ui/glass-button';
import { priceFormate } from '@/lib/utils/number';
import { StyleSheet } from 'react-native-unistyles';
import { priceMask } from '@/lib/constants/masks';

const styles = StyleSheet.create(() => ({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
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

const availableAmounts = [6, 12, 30, 40, 60];

type AmountSelectProps = {
  amount: string;
  fee?: number;
  onAmountChange: (v: string) => void;
};

export function AmountSelect({
  amount,
  fee,
  onAmountChange,
}: AmountSelectProps) {
  return (
    <>
      <View style={styles.row}>
        <Text typo="text-xl" weight={500}>
          Input nominal:
        </Text>
        <Input
          testID="amount"
          value={amount}
          keyboardType="number-pad"
          variant="auto"
          mask={priceMask}
          onChangeText={onAmountChange}
        />
      </View>
      {typeof fee === 'number' && (
        <Text typo="text-lg" weight={500}>
          Estimate Fee: {priceFormate(fee, 0)}
        </Text>
      )}
      <View style={[styles.row, styles.wrap]}>
        {availableAmounts.map(av => (
          <GlassButton
            style={styles.btn}
            typo="label-md"
            key={av}
            onPress={() => onAmountChange(String(av))}
          >
            {priceFormate(av, 0)}
          </GlassButton>
        ))}
      </View>
    </>
  );
}
