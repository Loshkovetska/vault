import { createNavigationContainerRef } from '@react-navigation/native';
import {
  getMessaging,
  onMessage,
  RemoteMessage,
  registerDeviceForRemoteMessages,
  getToken,
} from '@react-native-firebase/messaging';
import { useEffect } from 'react';
import notifee, { Event, EventType } from '@notifee/react-native';
import { NotificationType } from '../types/notification';
import { BASE_URL } from '../store/base';
import * as Keychain from 'react-native-keychain';
import { STORAGE_KEYS } from '../constants/keys';
import { logger } from '../helpers/logger';
import {
  checkNotifications,
  requestNotifications,
  RESULTS,
} from 'react-native-permissions';
import { isEmulator } from 'react-native-device-info';

type Notification = {
  type: NotificationType;
  title: string;
  body: string;
  id: string;
};

const navigationRef = createNavigationContainerRef();

export async function onMessageRecieved(message: RemoteMessage) {
  try {
    const payload = message.data as Notification;
    if (payload) {
      const channelId = await notifee.createChannel({
        id: 'vault-alerts',
        name: 'Vault Account Alerts',
      });
      await notifee.displayNotification({
        title: payload.title as string,
        body: payload.body,
        data: payload,
        android: {
          channelId,
          pressAction: { id: 'default' },
        },
      });
    }
  } catch (e) {
    logger('[Error]: On Message Recieved', e);
  }
}

function handleNotificationRouting(income: Notification) {
  if (!navigationRef.isReady()) return;

  switch (income?.type) {
    case 'transaction':
      if (income?.id)
        navigationRef.navigate('ActivityDetails', { id: String(income.id) });
      break;
    case 'promotion':
      if (income?.id)
        navigationRef.navigate('PromoDetails', { id: String(income.id) });
      break;
    case 'security':
      if (income?.id)
        navigationRef.navigate('SuspiciousActivity', {
          id: String(income.id),
        });
      break;
  }
}

async function onEvent(event: Event) {
  const { notification } = event.detail;

  if (event.type === EventType.PRESS && notification) {
    const income = notification?.data;
    income && handleNotificationRouting(income as Notification);
    await notifee.cancelNotification(notification?.id ?? '');
  }
}

notifee.onBackgroundEvent(onEvent);

export function useNotification() {
  useEffect(() => {
    async function onAppBootstrap() {
      try {
        const isSimulator = await isEmulator();
        if (isSimulator) {
          return logger('[INFO]: App boosted on Simulator');
        }
        const userSession = await Keychain.getGenericPassword({
          service: STORAGE_KEYS.SESSION_ID,
        });
        if (!userSession) return null;

        const { status } = await checkNotifications();
        if (status === RESULTS.DENIED || status === RESULTS.LIMITED) {
          const response = await requestNotifications([
            'alert',
            'sound',
            'badge',
          ]);
          if (response.status !== RESULTS.GRANTED) {
            logger('[Error]: Notifications were granted');
            return;
          }
        }

        const messaging = getMessaging();

        await registerDeviceForRemoteMessages(messaging);

        const token = await getToken(messaging);

        await fetch(`${BASE_URL}/users/token`, {
          method: 'PUT',
          headers: {
            Cookie: `${userSession.username}=${userSession.password}; SameSite=Lax; HttpOnly; Secure; Domain=vault.com; Path=/; Max-Age=3600`,
          },
          body: token,
        });

        const initialNotification = await notifee.getInitialNotification();
        if (initialNotification?.notification?.data) {
          const income = initialNotification.notification
            .data as unknown as Notification;
          setTimeout(() => handleNotificationRouting(income), 500);
        }
      } catch (e) {
        logger('[Error]: App Boost Messaging token', e);
      }
    }
    onAppBootstrap();
  }, []);
  useEffect(() => {
    const messaging = getMessaging();
    const unsubscribe = onMessage(messaging, onMessageRecieved);
    return unsubscribe;
  }, []);
  useEffect(() => {
    const unsubscribe = notifee.onForegroundEvent(onEvent);
    return unsubscribe;
  }, []);
  return navigationRef;
}
