import { createApi } from '@reduxjs/toolkit/query/react';
import { Notification } from '../types/notification';
import { FETCH_BASE_QUERY } from './base';

export const notificationApi = createApi({
  reducerPath: 'notificationApi',
  tagTypes: ['Notifications'],
  baseQuery: FETCH_BASE_QUERY,
  endpoints: build => ({
    getNotifications: build.query<Notification[], undefined>({
      query() {
        return { url: '/notifications' };
      },
      providesTags: ['Notifications'],
    }),
  }),
});

export const { useGetNotificationsQuery } = notificationApi;
