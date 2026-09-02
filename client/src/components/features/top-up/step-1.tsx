import { AmountSelect } from '@/components/common/amount-select';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select';
import { Text } from '@/components/ui/text';
import { accountMask } from '@/lib/constants/masks';
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

type PaymentMethod = {
  id: string;
  name: string;
  account: string;
  balance: number;
};

type Step1Props = {
  balance?: number;
  method?: PaymentMethod | null;
  options: PaymentMethod[];
  amount: string;
  payment_method: 'bank_transfer' | 'card' | 'store_card';
  onAmountChange: (v: string) => void;
  onBankChange: (v: string) => void;
};

export function Step1({
  balance,
  method,
  options,
  amount,
  payment_method,
  onAmountChange,
  onBankChange,
}: Step1Props) {
  const secretAccount = method?.account;
  const selectedName = method?.name;

  const title =
    payment_method === 'bank_transfer'
      ? 'Bank'
      : payment_method === 'card'
      ? 'Card'
      : 'Vault Card';

  return (
    <View style={styles.container}>
      <Text typo="text-xl" weight={500}>
        Current balance: {priceFormate(balance ?? 0)}
      </Text>
      <View style={styles.row}>
        <Text typo="text-xl" weight={500}>
          Select {title}:
        </Text>
        <Select value={method?.id ?? ''} onValueChange={onBankChange}>
          <SelectTrigger>{selectedName ?? `Select ${title}`}</SelectTrigger>
          <SelectContent>
            {options.map(bk => (
              <SelectItem key={bk.id} id={bk.id}>
                {bk?.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </View>
      <View style={styles.row}>
        <Text typo="text-xl" weight={500}>
          No. Account:
        </Text>
        <Input
          readOnly
          value={secretAccount}
          mask={accountMask}
          keyboardType="number-pad"
          style={{ flex: 0 }}
          variant="auto"
        />
      </View>
      <AmountSelect amount={amount} onAmountChange={onAmountChange} />
    </View>
  );
}
