import { AmountSelect } from '@/components/common/amount-select';
import { FormField } from '@/components/common/form-field';
import { accountMask, phoneMask } from '@/lib/constants/masks';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

type Step1Props = {
  account_reference: string;
  isPhone: boolean;
  amount: string;
  onAccountChange?: (v: string) => void;
  onAmountChange: (v: string) => void;
};

const styles = StyleSheet.create(() => ({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    gap: 24,
  },
}));

export function Step1({
  isPhone,
  account_reference,
  amount,
  onAmountChange,
  onAccountChange,
}: Step1Props) {
  return (
    <View style={styles.container}>
      <FormField
        label={isPhone ? 'No.Phone' : 'No.Account'}
        value={account_reference}
        keyboardType={isPhone ? 'phone-pad' : 'number-pad'}
        mask={isPhone ? phoneMask : accountMask}
        onChangeText={onAccountChange}
      />
      <AmountSelect amount={amount} onAmountChange={onAmountChange} />
    </View>
  );
}
