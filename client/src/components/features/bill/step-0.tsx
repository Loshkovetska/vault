import { GlassButton } from '@/components/ui/glass-button';
import { Text } from '@/components/ui/text';
import { themeConfig } from '@/lib/theme';
import { BillService } from '@/lib/types/transaction';
import { screenWidth } from '@/lib/utils/device';
import { Icon } from '@solar-icons/react-native/lib/types';
import {
  CheckCircle,
  Global,
  Lightbulb,
  Shop,
  Station,
  Water,
} from '@solar-icons/react-native/Linear';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

export const services: Record<BillService, { title: string; Icon: Icon }> = {
  pulse_data: {
    title: 'Pulse & Data',
    Icon: Station,
  },
  electricity: {
    title: 'Electricity',
    Icon: Lightbulb,
  },
  water: {
    title: 'Water',
    Icon: Water,
  },
  internet: {
    title: 'Internet & Cable TV',
    Icon: Global,
  },
  'e-commerce': {
    title: 'E-Commerce',
    Icon: Shop,
  },
  asurance: { title: 'Asurance', Icon: CheckCircle },
};

const styles = StyleSheet.create(() => ({
  container: {
    padding: 16,
    gap: 24,
  },
  list: { gap: 24, flexDirection: 'row', flexWrap: 'wrap' },
  item: {
    width: (screenWidth - 56) / 2,
  },
  item_style: {
    width: '100%',
    flexDirection: 'column',
    paddingVertical: 44,
    paddingHorizontal: 14,
  },
}));

type Step0Props = {
  service: BillService | null;
  onServiceChange: (service: BillService) => void;
};

export function Step0({ service, onServiceChange }: Step0Props) {
  return (
    <View style={styles.container}>
      <Text typo="display-xs" weight={600} textAlign="center">
        Choose Bill
      </Text>
      <View style={styles.list}>
        {Object.entries(services).map(([id, { Icon, title }]) => (
          <GlassButton
            key={id}
            testID={`service-${id}`}
            wrapperStyle={styles.item}
            style={styles.item_style}
            variant={id === service ? 'selected' : 'default'}
            onPress={() => onServiceChange(id as BillService)}
            iconLeft={<Icon size={32} color={themeConfig.colors['gray-900']} />}
            iconRight={
              <Text typo="text-lg" textAlign="center" weight={500}>
                {title}
              </Text>
            }
          />
        ))}
      </View>
    </View>
  );
}
