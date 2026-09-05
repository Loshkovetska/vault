import { createApi } from '@reduxjs/toolkit/query/react';
import { VaultCardStatus, VaultCard, VaultCardAnalytic } from '../types/card';
import { Transaction } from '../types/transaction';
import { FETCH_BASE_QUERY } from './base';

export const vaultCardApi = createApi({
  reducerPath: 'vaultCardApi',
  tagTypes: ['VaultCard', 'VaultTransactions', 'VaultAnalytic'],
  baseQuery: FETCH_BASE_QUERY,
  endpoints: build => ({
    toggleCardStatus: build.mutation<null, VaultCardStatus>({
      query(status) {
        return {
          url: '/vault-card/status',
          method: 'PUT',
          body: status,
        };
      },
      invalidatesTags: [{ type: 'VaultCard' }],
    }),
    getVaultCard: build.query<VaultCard, undefined>({
      query() {
        return {
          url: '/vault-card',
        };
      },
      providesTags: [{ type: 'VaultCard' }],
    }),
    updateBalance: build.mutation<null, [string, number]>({
      query(balance) {
        return {
          url: '/vault-card/balance',
          method: 'PUT',
          body: balance,
        };
      },
      invalidatesTags: [{ type: 'VaultCard' }],
    }),
    changePIN: build.mutation<null, [string, string]>({
      query(pin) {
        return {
          url: '/vault-card/pin',
          method: 'PUT',
          body: pin,
        };
      },
      invalidatesTags: [{ type: 'VaultCard' }],
    }),
    getVaultTransactions: build.query<Transaction[], number | undefined>({
      query(limit) {
        return {
          url: `/vault-card/transactions${limit ? `?limit=${limit}` : ''}`,
        };
      },
      providesTags: ['VaultTransactions'],
    }),
    getVaultAnalytics: build.query<VaultCardAnalytic | null, undefined>({
      query() {
        return {
          url: '/vault-card/analytics',
        };
      },
      providesTags: ['VaultAnalytic'],
    }),
  }),
});

export const {
  useToggleCardStatusMutation,
  useGetVaultCardQuery,
  useChangePINMutation,
  useUpdateBalanceMutation,
  useGetVaultTransactionsQuery,
  useGetVaultAnalyticsQuery,
} = vaultCardApi;
