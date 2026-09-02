import { themeConfig } from '@/lib/theme';
import { Image, ImageStyle, StyleProp } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

const styles = StyleSheet.create(() => ({
  size_sm: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  size_base: {
    width: 40,
    height: 40,
    borderRadius: 24,
  },
  size_lg: {
    width: 86,
    height: 86,
    borderRadius: 43,
  },
  size_2xl: {
    width: 208,
    height: 208,
    borderRadius: 104,
  },
}));

type AvatarProps = {
  size?: 'sm' | 'base' | 'lg' | '2xl';
  uri: string;
  style?: StyleProp<ImageStyle>;
};

export function Avatar({ size, uri, style }: AvatarProps) {
  return (
    <Image
      source={{ uri }}
      style={[
        { backgroundColor: themeConfig.colors['gray-900'] },
        styles[`size_${size ?? 'base'}`],
        style,
      ]}
    />
  );
}
