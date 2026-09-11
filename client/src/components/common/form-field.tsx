import { View, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { Text } from '../ui/text';
import { Input, InputProps } from '../ui/input';
import { InfoCircle } from '@solar-icons/react-native/Linear';
import { themeConfig } from '@/lib/theme';

const styles = StyleSheet.create(() => ({
  block: {
    gap: 6,
  },
  error: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  radios: {
    gap: 12,
  },
}));

type FormFieldBase = { label: string; error?: string };

export type FormFieldProps = FormFieldBase &
  InputProps & { style?: ViewStyle; name?: string };

export function FormField({ label, error, style, ...props }: FormFieldProps) {
  return (
    <View style={[styles.block, style]}>
      <Text typo="text-sm" weight={500}>
        {label}
      </Text>
      <Input testID={props.name} {...props} />
      {error && (
        <View style={styles.error}>
          <InfoCircle size={16} color={themeConfig.colors['error-400']} />
          <Text typo="text-sm" color="error-400" weight={500}>
            {error}
          </Text>
        </View>
      )}
    </View>
  );
}

export function FormRadio({
  label,
  error,
  children,
}: React.PropsWithChildren<FormFieldBase>) {
  return (
    <View style={styles.block}>
      <Text typo="text-sm" weight={500}>
        {label}
      </Text>
      <View style={styles.radios}>{children}</View>
      {error && (
        <View style={styles.error}>
          <InfoCircle size={16} color={themeConfig.colors['error-400']} />
          <Text typo="text-md" color="error-400" weight={500}>
            {error}
          </Text>
        </View>
      )}
    </View>
  );
}
