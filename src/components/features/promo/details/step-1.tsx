import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Text } from '@/components/ui/text';
import { priceFormate } from '@/lib/utils/number';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

type Step1Props = {
  amount: number;
  bank_id: string;
  payment_methods: Array<{ id: string; label: string; disabled: boolean }>;
  onBankChange: (v: string) => void;
};

const styles = StyleSheet.create({
  block: {
    gap: 16,
  },
  list: { gap: 12 },
});

export function Step1({
  amount,
  bank_id,
  payment_methods,
  onBankChange,
}: Step1Props) {
  return (
    <>
      <View style={styles.block}>
        <Text typo="display-xs" weight={600}>
          Amount
        </Text>
        <Text typo="text-lg" weight={500}>
          {priceFormate(amount)}
        </Text>
      </View>
      <View style={styles.block}>
        <Text typo="display-xs" weight={600}>
          Payment Method:
        </Text>
        <RadioGroup value={bank_id} onValueChange={onBankChange}>
          <View style={styles.list}>
            {payment_methods.map(opt => (
              <RadioGroupItem id={opt.id} key={opt.id} disabled={opt.disabled}>
                {opt.label}
              </RadioGroupItem>
            ))}
          </View>
        </RadioGroup>
      </View>
    </>
  );
}
