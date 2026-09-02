import { themeConfig } from '@/lib/theme';
import { Switch as RNSwitch, SwitchProps } from 'react-native';

export function Switch(props: SwitchProps) {
  const colors = themeConfig.colors;
  return (
    <RNSwitch
      thumbColor={colors['gray-900']}
      trackColor={{
        false: colors['gray-100'],
        true: colors['brand-600'],
      }}
      ios_backgroundColor={colors['gray-100']}
      {...props}
    />
  );
}
