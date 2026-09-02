import { Notification, Notifications } from 'react-native-notifications';
import { useSubscribe } from './use-subscribe';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNavigationContainerRef } from '@react-navigation/native';
import { STORAGE_KEYS } from '../constants/keys';
import { dbService } from '../firebase/db';
import { logger } from '../helpers/logger';
import { Notification as TNotification } from '../types/notification';
import { User } from '../types/user';

const navigationRef = createNavigationContainerRef();

Notifications.events().registerNotificationReceivedForeground(
  (notification: Notification, completion) => {
    logger('registerNotificationReceivedForeground', notification);
    completion({
      alert: true,
      sound: true,
      badge: true,
    });
  },
);

Notifications.events().registerRemoteNotificationsRegistrationDenied(() => {
  logger(
    '[ERROR]: registerRemoteNotificationsRegistrationDenied',
    'notification denied',
  );
});

Notifications.events().registerRemoteNotificationsRegistrationFailed(() => {
  logger(
    '[ERROR]: registerRemoteNotificationsRegistrationFailed',
    'notification failed',
  );
});

Notifications.events().registerNotificationOpened(
  (notification: Notification, completion) => {
    logger('registerNotificationOpened', notification);

    const metadata = notification.payload as TNotification['metadata'];

    if (metadata) {
      if (metadata.promotion_id) {
        navigationRef.navigate('PromoDetails', { id: metadata.promotion_id });
      }
      if (metadata.transaction_id) {
        navigationRef.navigate('ActivityDetails', {
          id: metadata.transaction_id,
        });
      }
      if (metadata.session_id) {
        navigationRef.navigate('SuspiciousActivity', {
          id: metadata.session_id,
        });
      }
    }
    completion();
  },
);

type NotificationBody = {
  title?: string;
  body?: string;
  payload?: any;
  badge?: number;
};

function formateNotification({
  title,
  body,
  badge,
  payload,
}: NotificationBody) {
  Notifications.postLocalNotification({
    body: body ?? 'Click to explore!',
    title: title ?? 'You received notification.',
    sound: 'default',
    identifier: 'new',
    badge: badge ?? 0,
    type: 'notification',
    thread: 'main',
    payload,
  });
}

async function getUser() {
  const session = await AsyncStorage.getItem(STORAGE_KEYS.SESSION_ID);
  if (!session) return null;

  const user_id = (await dbService.getOne('sessions', session))?.data()
    ?.user_id;

  const user = await dbService.getOne('users', user_id);

  return {
    user_id,
    db: dbService.db,
    user: { id: user.id, ...user.data() } as User,
  };
}

export function useNotification() {
  useSubscribe({
    collection: 'notifications',
    onSuccess: async data => {
      const info = await getUser();
      if (!info) return;

      const { user, user_id } = info;
      if (!user) return;
      const hasPermissions: boolean =
        await Notifications.isRegisteredForRemoteNotifications();

      if (!hasPermissions) return;

      const docs = data.docChanges();
      if (!docs.length) return;

      const userNotifications = docs.filter(
        d => d.doc.data().user_id === user_id && d.type === 'added',
      );

      if (!userNotifications.length) return;

      userNotifications.forEach(nt => {
        const notification = nt?.doc.data() as TNotification | undefined;
        if (notification && user[notification.type]) {
          formateNotification({
            title: notification?.title,
            body: notification?.text,
            badge: 1,
            payload: notification.metadata,
          });
        }
      });
    },
  });
  return navigationRef;
}
