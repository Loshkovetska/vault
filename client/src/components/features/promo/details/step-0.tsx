import { Text } from '@/components/ui/text';
import { Promo } from '@/lib/types/promo';
import { dateFormate } from '@/lib/utils/date';
import { percentageFormate, priceFormate } from '@/lib/utils/number';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

const styles = StyleSheet.create({
  block: {
    gap: 16,
  },
});

export function Step0({ promo }: { promo?: Promo }) {
  return (
    <>
      <View style={styles.block}>
        <Text typo="text-lg" weight={500}>
          &bull; {promo?.type}: {percentageFormate(promo?.amount ?? 0)}
        </Text>
        <Text typo="text-lg" weight={500}>
          &bull; Max Amount: {priceFormate(promo?.max_amount ?? 0)}
        </Text>
        <Text typo="text-lg" weight={500}>
          &bull; Min Transaction: {promo?.min_transaction}
        </Text>
        <Text typo="text-lg" weight={500}>
          &bull; Payment method: {promo?.payment_method}
        </Text>
        <Text typo="text-lg" weight={500}>
          &bull; Valid Until: {dateFormate(new Date(promo?.expired_at ?? 0))}
        </Text>
      </View>
      <View style={styles.block}>
        <Text typo="display-xs" weight={600}>
          Description
        </Text>
        <Text typo="text-lg" weight={500}>
          {promo?.description}
        </Text>
      </View>
      <View style={styles.block}>
        <Text typo="display-xs" weight={600}>
          How To Use
        </Text>
        <Text typo="text-lg" weight={500}>
          1. Use this promo
        </Text>
        <Text typo="text-lg" weight={500}>
          2. Pay using vaulta
        </Text>
        <Text typo="text-lg" weight={500}>
          3. Linked Wallet : vaulta Balance
        </Text>
      </View>
      <View style={styles.block}>
        <Text typo="display-xs" weight={600}>
          Terms & Conditions
        </Text>
        <Text typo="text-lg" weight={500}>
          &bull; Valid once per user
        </Text>
        <Text typo="text-lg" weight={500}>
          &bull; Not combinable with others
        </Text>
        <Text typo="text-lg" weight={500}>
          &bull; Only for verified users
        </Text>
      </View>
    </>
  );
}
