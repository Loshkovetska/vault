import { BaseRow } from '@/components/common/base-row';
import { Separator } from '@/components/ui/separator';
import { Text } from '@/components/ui/text';
import { percentageFormate, priceFormate } from '@/lib/utils/number';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

const styles = StyleSheet.create({
  block: {
    gap: 24,
  },
  list: { gap: 16 },
});

type Step2Props = {
  amount: number;
  payment_method: string;
  fee?: number;
  percentage: number;
};

export function Step2({
  amount,
  payment_method,
  fee = 4,
  percentage,
}: Step2Props) {
  const data = {
    Amount: priceFormate(amount),
    'Cashback Promo': priceFormate(9),
    Fee: priceFormate(fee),
    'Payment Method': payment_method,
    'Promo Cashback': percentageFormate(percentage),
  };
  return (
    <>
      <View style={styles.block}>
        <Text typo="display-xs" weight={600}>
          Transaction Summary
        </Text>
        <View style={styles.list}>
          {Object.entries(data).map(([k, v]) => (
            <BaseRow key={k} label={k} value={v} />
          ))}
        </View>
        <Separator />
        <BaseRow label="Total" value={priceFormate(amount + fee + 9)} />
      </View>
    </>
  );
}
