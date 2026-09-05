import {
  ToggleUserPreference,
  UpdateUserInfo,
  User,
  UserLanguage,
  UserSignUp,
  UserVerification,
} from '../types/user';
import { createApi } from '@reduxjs/toolkit/query/react';
import { authService } from '../firebase/auth';
import { FETCH_BASE_QUERY } from './base';

export const userApi = createApi({
  reducerPath: 'usersApi',
  tagTypes: ['User'],
  baseQuery: FETCH_BASE_QUERY,
  endpoints: build => ({
    getUser: build.query<User | null, string>({
      query() {
        return { url: '/users/profile' };
      },
      providesTags: ['User'],
    }),
    updateUser: build.mutation<null, UpdateUserInfo>({
      query(arg) {
        return { url: '/users', method: 'PUT', body: JSON.stringify(arg) };
      },
      invalidatesTags: ['User'],
    }),
    updatePassword: build.mutation<null, string>({
      async queryFn(newPassword) {
        await authService.updatePassword(newPassword);
        return { data: null };
      },
    }),
    deleteUser: build.mutation<null, string>({
      query() {
        return { url: '/users', method: 'DELETE' };
      },
    }),
    updateLanguage: build.mutation<null, UserLanguage>({
      query(arg) {
        return { url: '/users/lang', method: 'PUT', body: arg };
      },
      invalidatesTags: ['User'],
    }),
    togglePreference: build.mutation<null, ToggleUserPreference>({
      query({ body }) {
        return {
          url: '/users/preferences',
          method: 'PUT',
          body: JSON.stringify(body),
        };
      },
      invalidatesTags: ['User'],
    }),
    verify: build.mutation<null, UserVerification>({
      query() {
        return {
          url: '/users/verification',
          method: 'PUT',
        };
      },
      invalidatesTags: ['User'],
    }),
    signUp: build.mutation<string, UserSignUp>({
      query(body) {
        return {
          url: '/users/create',
          method: 'POST',
          body: JSON.stringify(body),
        };
      },
    }),
  }),
});

export const {
  useGetUserQuery,
  useUpdateUserMutation,
  useUpdateLanguageMutation,
  useVerifyMutation,
  useSignUpMutation,
  useDeleteUserMutation,
  useTogglePreferenceMutation,
  useUpdatePasswordMutation,
} = userApi;
