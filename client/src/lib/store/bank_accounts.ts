import { AddBankRequest, BankAccount } from '../types/card';
import { createApi } from '@reduxjs/toolkit/query/react';
import { FETCH_BASE_QUERY } from './base';

export const bankApi = createApi({
  reducerPath: 'bankApi',
  tagTypes: ['BankAccount'],
  baseQuery: FETCH_BASE_QUERY,
  endpoints: build => ({
    getBankAccounts: build.query<BankAccount[], undefined>({
      query() {
        return { url: '/bank-accounts' };
      },
      providesTags: [{ type: 'BankAccount', id: 'LIST' }],
    }),
    getBank: build.query<BankAccount, string>({
      query(arg) {
        return { url: `/bank-accounts/${arg}` };
      },
      providesTags: [{ type: 'BankAccount', id: 'ITEM' }],
    }),
    connectBank: build.mutation<null, AddBankRequest>({
      query(arg) {
        return {
          url: `/bank-accounts/connect`,
          method: 'POST',
          body: JSON.stringify(arg),
        };
      },
      invalidatesTags: [{ type: 'BankAccount', id: 'LIST' }],
    }),
    updateBank: build.mutation<null, Omit<BankAccount, 'user_id'>>({
      query({ id, ...payload }) {
        return {
          url: `/bank-accounts/${id}`,
          method: 'PUT',
          body: JSON.stringify(payload),
        };
      },
      invalidatesTags: [{ type: 'BankAccount', id: 'LIST' }],
    }),
    deleteBankAccount: build.mutation<null, string>({
      query(id) {
        return { url: `/bank-accounts/${id}`, method: 'DELETE' };
      },
      invalidatesTags: [{ type: 'BankAccount', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetBankAccountsQuery,
  useConnectBankMutation,
  useDeleteBankAccountMutation,
  useUpdateBankMutation,
  useGetBankQuery,
} = bankApi;
