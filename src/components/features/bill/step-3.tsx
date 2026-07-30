import { Text } from '@/components/ui/text';
import { BillService } from '@/lib/types/transaction';
import { priceFormate } from '@/lib/utils/number';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { services } from './step-0';
import { accountFormate } from '@/lib/utils/string';
import { BaseRow } from '@/components/common/base-row';

const styles = StyleSheet.create(() => ({
  container: {
    paddingVertical: 24,
    paddingHorizontal: 16,
    gap: 16,
  },
}));

type Step3Props = {
  total: number;
  service: BillService;
  account_reference?: string;
  payment_method: string;
};

export function Step3({
  total,
  service,
  account_reference,
  payment_method,
}: Step3Props) {
  const data = {
    Service: services[service]?.title,
    [service === 'pulse_data' ? 'Phone' : 'Account']:
      service === 'pulse_data'
        ? account_reference ?? ''
        : accountFormate(account_reference ?? ''),
    Total: priceFormate(total, 0),
    'Payment Method': payment_method,
  };
  return (
    <View style={styles.container}>
      <Text typo="text-lg" weight={500}>
        Payment Details
      </Text>
      {Object.entries(data).map(([k, v]) => (
        <BaseRow label={k} key={k} value={v} />
      ))}
    </View>
  );
}
