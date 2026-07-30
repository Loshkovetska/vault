import { View, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { Text } from '../ui/text';
import { Icon as TIcon } from '@solar-icons/react-native/lib/types';
import { themeConfig } from '@/lib/theme';

const styles = StyleSheet.create(() => ({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    paddingVertical: 100,
  },
  title: { alignItems: 'center' },
}));

type EmptyListProps = {
  title: string;
  text?: string;
  Icon: TIcon;
  style?: ViewStyle;
};

export function EmptyList({ title, text, Icon, style }: EmptyListProps) {
  return (
    <View style={[styles.container, style]}>
      <Icon size={40} color={themeConfig.colors['gray-900']} />
      <View style={styles.title}>
        <Text typo="text-lg" textAlign="center">
          {title}
        </Text>
        {text && (
          <Text typo="text-lg" textAlign="center">
            {text}
          </Text>
        )}
      </View>
    </View>
  );
}
