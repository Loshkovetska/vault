import { useMaskedInput } from '@/lib/hooks/use-masked-input';
import { Mask } from '@/lib/types/mask';
import { LiquidGlassView } from '@callstack/liquid-glass';
import { TextInput, TextInputProps } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

export type InputProps = {
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  variant?: 'auto' | 'full';
  mask?: Mask;
} & TextInputProps;

const styles = StyleSheet.create(theme => ({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
    borderRadius: 36,
    padding: 12,
  },
  variant_auto: { width: 'auto', flex: 1 },
  variant_full: { width: '100%' },
  input: {
    flex: 1,
    color: theme.colors['gray-900'],
  },
  placeholder: {
    color: theme.colors['gray-900'],
  },
  multiline: {
    borderRadius: 20,
  },
}));

export function Input({
  iconLeft,
  iconRight,
  variant,
  style,
  value,
  mask,
  onChangeText,
  ...props
}: InputProps) {
  const { value: maskedValue, onChangeText: onMaskChangeText } = useMaskedInput(
    {
      value: value,
      mask,
      onChangeText(_, unmasked) {
        onChangeText?.(unmasked);
      },
    },
  );
  return (
    <LiquidGlassView
      effect="clear"
      style={[
        styles.container,
        styles[`variant_${variant ?? 'full'}`],
        ...(props.multiline ? [styles.multiline] : []),
      ]}
    >
      {iconLeft}
      <TextInput
        style={[styles.input, style]}
        placeholderTextColor={styles.placeholder.color}
        value={maskedValue}
        onChangeText={onMaskChangeText}
        {...props}
      />
      {iconRight}
    </LiquidGlassView>
  );
}
