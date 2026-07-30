import { Text } from '@/components/ui/text';
import { priceFormate } from '@/lib/utils/number';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

const styles = StyleSheet.create(() => ({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    gap: 20,
  },
}));

type Step2Props = {
  amount: number;
  category: string;
  payment_method: 'bank_transfer' | 'card' | 'store_card';
  method?: {
    id: string;
    name: string;
    account: string;
    balance: number;
  };
  user_name?: string;
};

export function Step2({
  user_name,
  amount,
  category,
  method,
  payment_method,
}: Step2Props) {
  const data = {
    ...(user_name ? { Name: user_name } : {}),
    'Payment Method':
      payment_method === 'bank_transfer'
        ? 'Bank Account'
        : payment_method === 'card'
        ? 'Debit Card'
        : 'Vault Card',
    [payment_method === 'bank_transfer' ? 'No. Account' : 'Card Number']:
      method?.account,
    Nominal: priceFormate(amount),
    'Admin Fee': priceFormate(0),
    Total: priceFormate(amount),
    Category: category,
  };
  return (
    <View style={styles.container}>
      {Object.entries(data).map(([k, v]) => (
        <Text typo="text-xl" key={k} weight={500}>
          {k}: {v}
        </Text>
      ))}
    </View>
  );
}
