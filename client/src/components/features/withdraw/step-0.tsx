import { Text } from '@/components/ui/text';
import { themeConfig } from '@/lib/theme';
import { BankAccount } from '@/lib/types/card';
import { accountFormate } from '@/lib/utils/string';
import { LiquidGlassView } from '@callstack/liquid-glass';
import { AltArrowRight, Card } from '@solar-icons/react-native/Linear';
import { TouchableOpacity, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

type Step0Props = {
  banks: BankAccount[];
  onSelect: (bank: BankAccount) => void;
};

const styles = StyleSheet.create(theme => ({
  container: {
    paddingVertical: 32,
    paddingHorizontal: 16,
    gap: 24,
  },
  list: { gap: 16 },
  item: {
    gap: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors['white-opacity'],
  },
  col: { gap: 4, flexGrow: 1 },
}));

export function Step0({ banks, onSelect }: Step0Props) {
  return (
    <View style={styles.container}>
      <Text textAlign="center" typo="display-xs" weight={600}>
        Select Bank Account
      </Text>
      <View style={styles.list}>
        {banks.map(bank => (
          <TouchableOpacity
            onPress={() => onSelect(bank)}
            key={bank.id}
            style={styles.item}
          >
            <LiquidGlassView style={styles.icon}>
              <Card color={themeConfig.colors['gray-900']} />
            </LiquidGlassView>
            <View style={styles.col}>
              <Text typo="display-xs" weight={500}>
                {bank.name}
              </Text>
              <Text typo="text-md">{accountFormate(bank.account)}</Text>
            </View>
            <AltArrowRight color={themeConfig.colors['gray-900']} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
