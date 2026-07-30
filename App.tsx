import '@/unistyles';

import NavigationProvider from '@/components/navigation';
import { Store } from '@/providers/store';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Notifications } from 'react-native-notifications';
import { useNotification } from '@/lib/hooks/use-notification';
import { AuthSession } from '@/providers/auth-session';
import { ToastProvider } from '@/providers/toast';
Notifications.registerRemoteNotifications();

function App() {
  const navigationRef = useNotification();

  return (
    <>
      <SafeAreaProvider>
        <StatusBar barStyle="light-content" />
        <Store>
          <AuthSession>
            <NavigationProvider ref={navigationRef} />
          </AuthSession>
        </Store>
        <ToastProvider />
      </SafeAreaProvider>
    </>
  );
}

export default App;
