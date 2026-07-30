import { View, ViewProps } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

const styles = StyleSheet.create(theme => ({
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: theme.colors['gray-300'],
  },
}));

export function Separator({ style, ...rest }: ViewProps) {
  return <View style={[styles.separator, style]} {...rest} />;
}
