import {
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from 'react-native';
import { LiquidGlassView } from '@callstack/liquid-glass';
import { StyleSheet } from 'react-native-unistyles';
import { Text } from './text';
import { themeConfig } from '@/lib/theme';

const styles = StyleSheet.create(theme => ({
  wrapper: { width: 'auto' },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 8,
  },
  btn_selected: {
    backgroundColor: theme.colors['brand-500'],
  },
  btn_error: {
    backgroundColor: theme.colors['error-opacity'],
  },
  btn_default: {
    backgroundColor: theme.colors['white-opacity'],
  },
  rounded_full: { borderRadius: 100 },
  rounded_base: { borderRadius: 20 },
  size_base: {
    paddingHorizontal: 12,
  },
  size_circle_xs: {
    width: 32,
    height: 32,
  },
  size_circle_sm: {
    width: 44,
    height: 44,
    padding: 10,
  },
  size_icon_left: {
    paddingLeft: 8,
    paddingRight: 12,
  },
  size_icon_right: {
    paddingRight: 8,
    paddingLeft: 12,
  },
  disabled_true: {
    opacity: 0.5,
  },
  disabled_false: {},
  badge: {
    position: 'absolute',
    top: 1,
    right: 1,
    zIndex: 1,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: theme.colors['error-400'],
  },
}));

type GlassButtonProps = {
  rounded?: 'full' | 'base';
  variant?: 'default' | 'selected' | 'error';
  size?: 'circle_xs' | 'circle_sm' | 'icon_left' | 'icon_right' | 'base';
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  badge?: boolean;
  typo?: keyof typeof themeConfig.typography;
  wrapperStyle?: ViewStyle;
} & TouchableOpacityProps;

export function GlassButton({
  style,
  iconLeft,
  iconRight,
  children,
  rounded,
  size,
  badge,
  variant,
  typo = 'text-lg',
  wrapperStyle,
  ...props
}: GlassButtonProps) {
  const styleList = [
    styles.btn,
    styles[`rounded_${rounded ?? 'base'}`],
    styles[`size_${size ?? 'base'}`],
    styles[`btn_${variant ?? 'default'}`],
    styles[`disabled_${props.disabled ?? false}`],
    style,
  ];

  return (
    <TouchableOpacity style={[styles.wrapper, wrapperStyle]} {...props}>
      <LiquidGlassView effect="clear" style={styleList}>
        {badge && <View style={styles.badge} />}
        {iconLeft}
        {children && (
          <Text typo={typo} weight={500}>
            {children}
          </Text>
        )}
        {iconRight}
      </LiquidGlassView>
    </TouchableOpacity>
  );
}
