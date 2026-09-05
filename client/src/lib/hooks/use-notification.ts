import { Notification, Notifications } from 'react-native-notifications';
import { createNavigationContainerRef } from '@react-navigation/native';
import { logger } from '../helpers/logger';
import { Notification as TNotification } from '../types/notification';

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

// type NotificationBody = {
//   title?: string;
//   body?: string;
//   payload?: any;
//   badge?: number;
// };

// function formateNotification({
//   title,
//   body,
//   badge,
//   payload,
// }: NotificationBody) {
//   Notifications.postLocalNotification({
//     body: body ?? 'Click to explore!',
//     title: title ?? 'You received notification.',
//     sound: 'default',
//     identifier: 'new',
//     badge: badge ?? 0,
//     type: 'notification',
//     thread: 'main',
//     payload,
//   });
// }

export function useNotification() {
  return navigationRef;
}
