import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { UserSession } from '../types/session';
import { dbService } from '../firebase/db';
import { authService } from '../firebase/auth';

export const sessionApi = createApi({
  reducerPath: 'sessionApi',
  tagTypes: ['Session', 'SessionItem'],
  baseQuery: fakeBaseQuery(),
  endpoints: build => ({
    getSessions: build.query<UserSession[], string>({
      async queryFn(user_id) {
        const res = await dbService.get('sessions', {
          where: [{ field: 'user_id', operation: '==', value: user_id }],
        });
        return {
          data: res.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          })) as UserSession[],
        };
      },
      providesTags: ['Session'],
    }),
    getSession: build.query<UserSession, string>({
      async queryFn(session) {
        const res = await dbService.getOne('sessions', session);
        return {
          data: { id: res.id, ...res.data() } as UserSession,
        };
      },
      providesTags: ['SessionItem'],
    }),
    setSession: build.mutation<string, Omit<UserSession, 'id'>>({
      async queryFn(args) {
        const doc = await dbService.post('sessions', args);
        return { data: doc.id };
      },
      invalidatesTags: ['Session'],
    }),
    deleteSession: build.mutation<null, string>({
      async queryFn(args) {
        await authService.signOut();
        await dbService.delete('sessions', args);
        return { data: null };
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
