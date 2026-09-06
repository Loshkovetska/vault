import '@/unistyles';
import { AppRegistry } from 'react-native';
import App from './App';

import { name as appName } from './app.json';
import {
  setBackgroundMessageHandler,
  getMessaging,
} from '@react-native-firebase/messaging';
import { onMessageRecieved } from '@/lib/hooks/use-notification';

const messaging = getMessaging();

setBackgroundMessageHandler(messaging, onMessageRecieved);

AppRegistry.registerComponent(appName, () => App);
