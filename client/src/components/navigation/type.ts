import { NavigatorScreenParams } from '@react-navigation/native';

export type HomeTabParams = {
  Home: undefined;
  Activity: undefined;
  QRCode: undefined;
  Rewards: undefined;
  Profile: undefined;
};

export type TransactionScreens = {
  TopUp: undefined;
  Withdraw: undefined;
  Bill: undefined;
  Transfer: undefined;
};

export type CardDetailsTabsScreens = {
  History: undefined;
  Activity: undefined;
};

export type RootParams = {
  Onboarding?: undefined;
  HomeTabs: NavigatorScreenParams<HomeTabParams>;
  ActivityDetails: { id: string };
  PromoDetails: { id: string };
  CardDetailsTabs: NavigatorScreenParams<CardDetailsTabsScreens>;
  Card: undefined;
  CardInfo: undefined;
  PersonalInfo: undefined;
  ContactInfo: undefined;
  CardsBanks: undefined;
  Security: undefined;
  Notification: undefined;
  Language: undefined;
  FAQ: undefined;
  ContactUs: undefined;
  HelpCenter: undefined;
  Legacy: { id: 'privacy' | 'terms' };
  QR: undefined;
  Verification: undefined;
  DeviceManagement: undefined;
  ChangePIN: undefined;
  Notifications: undefined;
  SignIn: undefined;
  SignUp: undefined;
  ChangePassword: undefined;
  AddCard: { id: string | undefined };
  AddBank: { id: string | undefined };
  SuspiciousActivity: { id: string };
} & TransactionScreens;
