import { dbService } from '../firebase/db';
import {
  ToggleUserPreference,
  UpdateUserInfo,
  User,
  UserLanguage,
  UserSignUp,
  UserVerification,
} from '../types/user';
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { generateInternalCardNumber } from '../utils/string';
import { generateExpiryDate } from '../utils/date';
import { authService } from '../firebase/auth';
import bcryptjs from 'react-native-bcrypt';
import { VaultCard } from '../types/card';

export const userApi = createApi({
  reducerPath: 'usersApi',
  tagTypes: ['User'],
  baseQuery: fakeBaseQuery(),
  endpoints: build => ({
    getUser: build.query<User | null, string>({
      queryFn: async id => {
        const authData = authService.getAuthUser();
        const currentSession = await dbService.getOne('sessions', id);
        const user_id = currentSession.data()?.user_id;
        const res = await dbService.getOne(`users`, user_id);

        return {
          data: {
            id: res.id,
            email: authData?.email ?? '',
            email_verified: authData?.emailVerified,
            ...res.data(),
          } as User | null,
        };
      },
      providesTags: ['User'],
    }),
    updateUser: build.mutation<null, UpdateUserInfo>({
      queryFn: async ({ id, email, ...payload }) => {
        const authData = authService.getAuthUser();
        if (email !== authData?.email) {
          await authService.update(email);
        }
        await dbService.update(`users`, id, payload);
        return { data: null };
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
      queryFn: async payload => {
        await authService.destroyUser();
        await dbService.delete(`users`, payload);
        return { data: null };
      },
    }),
    updateLanguage: build.mutation<null, [string, UserLanguage]>({
      queryFn: async ([id, lang]) => {
        await dbService.update(`users`, id, { language: lang });
        return { data: null };
      },
      invalidatesTags: ['User'],
    }),
    togglePreference: build.mutation<null, ToggleUserPreference>({
      queryFn: async ({ id, body }) => {
        await dbService.update(`users`, id, body);

        return { data: null };
      },
      invalidatesTags: ['User'],
    }),
    verify: build.mutation<null, [string, UserVerification]>({
      queryFn: async ([id, _]) => {
        await dbService.update('users', id, {
          is_verified: true,
        });
        return { data: null };
      },
      invalidatesTags: ['User'],
    }),
    signUp: build.mutation<string, UserSignUp>({
      queryFn: async ({ pin, id, ...payload }) => {
        const res = await dbService.post('users', payload, id);
        const user_id = res.id;

        const cardPayload: Omit<VaultCard, 'id'> = {
          user_id,
          balance: 0,
          card_number: generateInternalCardNumber(),
          card_holder: payload.full_name,
          expired_at: generateExpiryDate(),
          daily_limit: 500.0,
          status: 'active',
          pin: bcryptjs.hashSync(pin, 8),
        };

        await dbService.post('vault_cards', cardPayload);

        return { data: user_id };
      },
    }),
    signIn: build.mutation<string, string>({
      async queryFn(uid) {
        const res = await dbService.getOne('users', uid);
        return { data: res?.id };
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
  useSignInMutation,
  useUpdatePasswordMutation,
} = userApi;
