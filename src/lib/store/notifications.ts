import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { Notification } from '../types/notification';
import { dbService } from '../firebase/db';

export const notificationApi = createApi({
  reducerPath: 'notificationApi',
  tagTypes: ['Notifications'],
  baseQuery: fakeBaseQuery(),
  endpoints: build => ({
    getNotifications: build.query<Notification[], string>({
      async queryFn(user_id) {
        const res = await dbService.get('notifications', {
          where: [{ field: 'user_id', operation: '==', value: user_id }],
        });
        return {
          data: res.docs
            .map(doc => ({
              id: doc.id,
              ...doc.data(),
            }))
            .sort(
              (b, a) =>
                new Date((a as Notification).created_at).getTime() -
                new Date((b as Notification).created_at).getTime(),
            ) as Notification[],
        };
      },
      providesTags: ['Notifications'],
    }),
  }),
});

export const { useGetNotificationsQuery } = notificationApi;
