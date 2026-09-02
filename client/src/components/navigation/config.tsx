import {
  CardTransfer,
  Gift,
  HomeSmile,
  QrCode,
  UserCircle,
} from '@solar-icons/react-native/Linear';
import { LabelPosition } from 'node_modules/@react-navigation/bottom-tabs/lib/typescript/src/types';
import { StyleProp, Text, TextStyle } from 'react-native';
import { themeConfig } from '@/lib/theme';
import { HomeTabParams } from './type';
import { Icon } from '@solar-icons/react-native/lib/types';

type TabName = keyof HomeTabParams;

type TabItemConfig = {
  tabBarIcon: ({
    focused,
    color,
    size,
  }: {
    focused: boolean;
    color: string;
    size: number;
  }) => React.JSX.Element;
  tabBarLabel:
    | string
    | ((props: {
        focused: boolean;
        color: string;
        position: LabelPosition;
        children: string;
      }) => React.ReactNode);
};

type TabConfig = Record<TabName, TabItemConfig>;

export const tablabelStyles = (
  focused: boolean,
  color: string,
): StyleProp<TextStyle> => {
  return {
    ...themeConfig.typography['text-sm'],
    fontWeight: focused ? 600 : 400,
    color,
  };
};

function generateTab(I: Icon, label: string): TabItemConfig {
  return {
    tabBarIcon: ({ color }) => <I color={color} size={20} />,
    tabBarLabel: ({ focused, color }) => (
      <Text style={tablabelStyles(focused, color)}>{label}</Text>
    ),
  };
}

export const tabConfig: TabConfig = {
  Home: generateTab(HomeSmile, 'Home'),
  Activity: generateTab(CardTransfer, 'Activity'),
  QRCode: generateTab(QrCode, 'Scan QR'),
  Rewards: generateTab(Gift, 'Rewards'),
  Profile: generateTab(UserCircle, 'Profile'),
};
