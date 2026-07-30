import {
  TouchableOpacity,
  TouchableOpacityProps as RNButtonProps,
  View,
  ViewStyle,
} from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { Text } from './text';
import { themeConfig } from '@/lib/theme';

const buttonSizes = {
  sm: {
    typo: 'label-sm',
    weight: 600,
    style: {
      padding: 8,
    },
  },
  md: {
    typo: 'label-md',
    weight: 600,
    style: {
      paddingVertical: 8,
      paddingHorizontal: 14,
    },
  },
  lg: {
    typo: 'label-lg',
    weight: 500,
    style: {
      paddingVertical: 10,
      paddingHorizontal: 16,
    },
  },
};

type ButtonProps = {
  size?: keyof typeof buttonSizes;
  variant?: 'light' | 'error' | 'text' | 'white';
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  color?: keyof typeof themeConfig.colors;
  innerStyle?: ViewStyle;
  typo?: keyof typeof themeConfig.typography;
} & RNButtonProps;

export function Button({
  style,
  children,
  size,
  variant,
  iconLeft,
  iconRight,
  color = 'gray-900',
  innerStyle,
  typo,
  ...props
}: ButtonProps) {
  const currentSize = buttonSizes[size ?? 'sm'];
  const variantStyle = styles[`intent_${variant ?? 'default'}`];

  return (
    <TouchableOpacity style={style} {...props}>
      <View
        style={[
          styles.container,
          currentSize.style,
          variantStyle,
          ...(props.disabled ? [styles.disabled] : []),
          innerStyle,
        ]}
      >
        {iconLeft}
        {children && (
          <Text
            textAlign="center"
            typo={typo ?? (currentSize.typo as 'label-sm')}
            weight={currentSize.weight as 500}
            color={color}
          >
            {children}
          </Text>
        )}
        {iconRight}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create(theme => ({
  wrapper: {
    width: 'auto',
  },
  container: {
    borderRadius: 16,
    justifyContent: 'center',
    color: theme.colors['gray-900'],
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  disabled: { opacity: 0.5 },
  intent_default: {
    backgroundColor: theme.colors['brand-400'],
  },
  intent_light: {
    backgroundColor: theme.colors['brand-500'],
  },
  intent_error: {
    backgroundColor: theme.colors['error-400'],
  },
  intent_white: {
    backgroundColor: theme.colors['gray-900'],
  },
  intent_text: {
    justifyContent: 'flex-start',
    padding: 0,
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
}));
