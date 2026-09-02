import { View, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { Text } from '../ui/text';

const styles = StyleSheet.create(() => ({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    justifyContent: 'space-between',
  },
  text: { maxWidth: '50%' },
}));

type BaseRowProps = {
  label: string | React.ReactNode;
  value: string | React.ReactNode;
  style?: ViewStyle;
};

export function BaseRow({ label, value, style }: BaseRowProps) {
  return (
    <View style={[styles.container, style]}>
      {typeof label === 'string' ? (
        <Text typo="text-lg" color="gray-500" style={styles.text}>
          {label}
        </Text>
      ) : (
        label
      )}
      {typeof value === 'string' ? (
        <Text
          typo="text-lg"
          textAlign="right"
          ellipsizeMode="tail"
          numberOfLines={1}
          style={styles.text}
        >
          {value}
        </Text>
      ) : (
        value
      )}
    </View>
  );
}
