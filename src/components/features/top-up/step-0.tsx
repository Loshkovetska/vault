import { GlassButton } from '@/components/ui/glass-button';
import { Text } from '@/components/ui/text';
import { themeConfig } from '@/lib/theme';
import { screenWidth } from '@/lib/utils/device';
import { Card, CardTransfer } from '@solar-icons/react-native/Linear';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

const styles = StyleSheet.create(() => ({
  container: {
    padding: 16,
    gap: 24,
  },
  list: {
    gap: 24,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  item: {
    flexDirection: 'column',
    gap: 16,
    paddingHorizontal: 16,
    paddingVertical: 44,
    width: (screenWidth - 56) / 2,
  },
}));

export const methods = {
  bank_transfer: { title: 'Bank Transfer', Icon: CardTransfer },
  card: { title: 'Debit Card', Icon: Card },
};

type Step0Props = {
  selected: string;
  onValueChange: (v: string) => void;
};

export function Step0({ selected, onValueChange }: Step0Props) {
  return (
    <View style={styles.container}>
      <Text textAlign="center" typo="display-xs" weight={500}>
        Choose Method
      </Text>
      <View style={styles.list}>
        {Object.entries(methods).map(([id, method]) => (
          <GlassButton
            key={id}
            typo="text-xl"
            variant={selected === id ? 'selected' : 'default'}
            style={styles.item}
            iconLeft={
              <method.Icon size={40} color={themeConfig.colors['gray-900']} />
            }
            onPress={() => onValueChange(id)}
          >
            {method.title}
          </GlassButton>
        ))}
      </View>
    </View>
  );
}
