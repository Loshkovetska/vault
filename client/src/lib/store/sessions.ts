import { createApi } from '@reduxjs/toolkit/query/react';
import { UserSession } from '../types/session';
import { FETCH_BASE_QUERY } from './base';

export const sessionApi = createApi({
  reducerPath: 'sessionApi',
  tagTypes: ['Session', 'SessionItem'],
  baseQuery: FETCH_BASE_QUERY,
  endpoints: build => ({
    getSessions: build.query<UserSession[], undefined>({
      query() {
        return { url: '/sessions' };
      },
      providesTags: ['Session'],
    }),
    getSession: build.query<UserSession, string>({
      query(sessionId) {
        return { url: `/sessions/${sessionId}` };
      },
      providesTags: ['SessionItem'],
    }),
    setSession: build.mutation<string, Omit<UserSession, 'id'>>({
      query(args) {
        return {
          url: '/sessions',
          method: 'POST',
          body: JSON.stringify(args),
          async responseHandler(response) {
            const data = await response.json();
            return data.data;
          },
        };
      },
      invalidatesTags: ['Session'],
    }),
    deleteSession: build.mutation<null, string>({
      query(id) {
        return { url: `/sessions/${id}`, method: 'DELETE' };
      },
      invalidatesTags: ['Session'],
    }),
  }),
});

export const {
  useGetSessionsQuery,
  useGetSessionQuery,
  useDeleteSessionMutation,
  useSetSessionMutation,
} = sessionApi;
