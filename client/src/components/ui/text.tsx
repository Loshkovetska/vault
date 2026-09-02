import { themeConfig } from '@/lib/theme';
import {
  Text as RNText,
  TextStyle,
  type TextProps as RNProps,
} from 'react-native';

export const fontFamilies = {
  200: 'PlusJakartaSans-ExtraLight',
  300: 'PlusJakartaSans-Light',
  400: 'PlusJakartaSans-Regular',
  500: 'PlusJakartaSans-Medium',
  600: 'PlusJakartaSans-SemiBold',
  700: 'PlusJakartaSans-Bold',
  800: 'PlusJakartaSans-ExtraBold',
};

export type TextProps = RNProps & {
  color?: keyof (typeof themeConfig)['colors'];
  typo?: keyof (typeof themeConfig)['typography'];
  weight?: keyof typeof fontFamilies;
  textAlign?: TextStyle['textAlign'];
};

export function Text({
  style,
  color,
  textAlign,
  typo,
  weight,
  ...props
}: TextProps) {
  return (
    <RNText
      style={{
        ...style,
        ...themeConfig.typography[typo ?? 'text-sm'],
        color: themeConfig.colors[color ?? 'gray-900'],
        fontFamily: fontFamilies[weight ?? 400],
        textAlign,
      }}
      {...props}
    />
  );
}
