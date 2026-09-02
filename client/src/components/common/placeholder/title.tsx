import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

const styles = StyleSheet.create(theme => ({
  main: {
    borderRadius: 6,
    borderWidth: 1,
    borderColor: theme.colors['gray-500'],
  },
  xl: {
    width: 160,
    height: 24,
  },
  md: { width: 80, height: 20 },
  sm: { width: 40, height: 16 },
  lg: { width: 120, height: 24 },
}));

type SizeType = Exclude<keyof typeof styles, 'main' | 'useVariants'>;

export function PlaceholderTitle({ size = 'xl' }: { size?: SizeType }) {
  return <View style={[styles.main, styles[size]]} />;
}
