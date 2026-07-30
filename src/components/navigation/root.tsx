import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { tabConfig } from './config';
import { themeConfig } from '@/lib/theme';
import { LiquidGlassView } from '@callstack/liquid-glass';
import { ProfileScreen } from './screens/profile';
import { PromoRewardsScreen } from './screens/promo-rewards';
import HomeScreen from './screens/home';
import { screenWidth } from '@/lib/utils/device';
import { StyleSheet } from 'react-native-unistyles';
import { ActivityScreen } from './screens/activity';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityDetailsScreen } from './screens/activity-details';
import { TopUpScreen } from './screens/top-up';
import { PromoDetailsScreen } from './screens/promo-details';
import { CardScreen } from './screens/card';
import { PersonalInfoScreen } from './screens/personal-info';
import { ContactInfoScreen } from './screens/contact-info';
import { CardsBanksScreen } from './screens/cards-banks';
import { SecurityScreen } from './screens/security';
import { NotificationSettingsScreen } from './screens/notification';
import { FAQScreen } from './screens/faq';
import { ContactUsScreen } from './screens/contact-us';
import { HelpCenterScreen } from './screens/help-center';
import { LegacyScreen } from './screens/legacy';
import { LanguageScreen } from './screens/language';
import { QRScreen } from './screens/qr';
import { DeviceManagementScreen } from './screens/device-management';
import { ChangePINScreen } from './screens/change-pin';
import { VerificationScreen } from './screens/verification';
import { NotificationsScreen } from './screens/notifications';
import { Onboarding } from '../features/onboarding';
import { SignInScreen } from './screens/sign-in';
import { SignUpScreen } from './screens/sign-up';
import { CardDetailsTabsScreens, RootParams } from './type';
import { WithDraw } from './screens/withdraw';
import { Bill } from './screens/bill';
import { Transfer } from './screens/transfer';
import { ChangePassword } from './screens/change-password';
import { CardInfoScreen } from './screens/card-info';
import {
  createMaterialTopTabNavigator,
  createMaterialTopTabScreen,
} from '@react-navigation/material-top-tabs';
import { CardDetails } from './screens/card-details';
import { CardDetailsTabsView } from './tabs';
import { CardEditor } from './screens/add-card';
import { BankEditor } from './screens/bank-editor';
import { SuspiciousActivity } from './screens/suspicious-activity';

const styles = StyleSheet.create(theme => ({
  container: {
    width: '100%',
    flex: 1,
    position: 'relative',
    zIndex: 1,
    backgroundColor: 'transparent',
  },
  tabbarBlur: {
    alignItems: 'center',
    backgroundColor: theme.colors['light-black-opacity'],
    width: screenWidth - 32,
    height: 82,
    borderRadius: 48,
    overflow: 'hidden',
    position: 'absolute',
    left: 16,
    top: 0,
  },
  tabBarStyle: {
    paddingTop: 11,
    paddingHorizontal: 20,
    borderTopWidth: 0,
    position: 'absolute',
    overflow: 'hidden',
    minHeight: 100,
    justifyContent: 'center',
  },
  tabBarItemStyle: { height: 50, padding: 0 },
}));

export const HomeTabs = createBottomTabNavigator({
  initialRouteName: 'Home',
  screens: {
    Home: HomeScreen,
    Activity: ActivityScreen,
    QRCode: () => <></>,
    Rewards: PromoRewardsScreen,
    Profile: ProfileScreen,
  },
  screenListeners(props) {
    return {
      tabPress: pressOpts => {
        if (props.route.name === 'QRCode') {
          pressOpts.preventDefault();
          props.navigation.navigate('QR');
        }
      },
    };
  },
  screenOptions({ route }) {
    return {
      ...tabConfig[route.name as 'Home'],
      animation: 'shift',
      tabBarActiveTintColor: themeConfig.colors['brand-600'],
      tabBarInactiveTintColor: themeConfig.colors['gray-700'],
      tabBarLabelStyle: {
        ...themeConfig.typography['text-sm'],
        fontWeight: 600 as 600,
      },
      headerShown: false,
      sceneStyle: styles.container,
      tabBarItemStyle: styles.tabBarItemStyle,
      tabBarStyle: styles.tabBarStyle,
      tabBarBackground: () => (
        <LiquidGlassView
          effect="clear"
          tintColor="#1E1E1E"
          style={styles.tabbarBlur}
        />
      ),
    };
  },
});

const CardDetailsTabs = createMaterialTopTabNavigator<CardDetailsTabsScreens>({
  tabBar: props => <CardDetailsTabsView {...props} />,
  screens: {
    History: createMaterialTopTabScreen({
      screen: CardDetails,
    }),
    Activity: createMaterialTopTabScreen({
      screen: CardDetails,
    }),
  },
  screenOptions: {
    sceneStyle: styles.container,
  },
});

export const RootStack = (hasOnboarded: boolean, isSigned: boolean) => {
  return createNativeStackNavigator<RootParams>({
    initialRouteName: isSigned
      ? 'HomeTabs'
      : !hasOnboarded
      ? 'Onboarding'
      : 'SignIn',
    screens: {
      ...(!hasOnboarded ? { Onboarding: Onboarding } : {}),
      HomeTabs: HomeTabs,
      ActivityDetails: ActivityDetailsScreen,
      TopUp: TopUpScreen,
      Withdraw: WithDraw,
      Bill: Bill,
      Transfer: Transfer,
      PromoDetails: PromoDetailsScreen,
      Card: CardScreen,
      CardInfo: CardInfoScreen,
      CardDetailsTabs: CardDetailsTabs,
      PersonalInfo: PersonalInfoScreen,
      ContactInfo: ContactInfoScreen,
      CardsBanks: CardsBanksScreen,
      Security: SecurityScreen,
      Notification: NotificationSettingsScreen,
      Language: LanguageScreen,
      FAQ: FAQScreen,
      ContactUs: ContactUsScreen,
      HelpCenter: HelpCenterScreen,
      Legacy: {
        screen: LegacyScreen,
        initialParams: { id: 'privacy' },
      },
      QR: QRScreen,
      Verification: VerificationScreen,
      DeviceManagement: DeviceManagementScreen,
      ChangePIN: ChangePINScreen,
      Notifications: NotificationsScreen,
      SignIn: SignInScreen,
      SignUp: SignUpScreen,
      ChangePassword: ChangePassword,
      AddCard: CardEditor,
      AddBank: BankEditor,
      SuspiciousActivity: SuspiciousActivity,
    },
    screenOptions: ({ route }) => {
      const bgColor =
        route.name === 'CardInfo'
          ? themeConfig.colors['gray-0']
          : 'transparent';
      return {
        headerShown: false,
        freezeOnBlur: true,
        sceneStyle: {
          ...styles.container,
          backgroundColor: bgColor,
        },
        contentStyle: {
          ...styles.container,
          backgroundColor: bgColor,
        },
        presentation: route.name === 'CardInfo' ? 'fullScreenModal' : undefined,
      };
    },
  });
};
