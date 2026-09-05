import { GetTransactionsRequest, Transaction } from '../types/transaction';
import { createApi } from '@reduxjs/toolkit/query/react';
import { FETCH_BASE_QUERY } from './base';

export const transactionApi = createApi({
  reducerPath: 'transactionApi',
  baseQuery: FETCH_BASE_QUERY,
  tagTypes: ['Transaction', 'RecentTransaction'],
  endpoints: build => ({
    getTransactions: build.query<Transaction[], GetTransactionsRequest>({
      query(args) {
        return { url: `/transactions`, params: args };
      },
      providesTags: ['Transaction'],
    }),
    getTransaction: build.query<Transaction | null, string>({
      query(id) {
        return { url: `/transactions/${id}` };
      },
      providesTags: res => [{ type: 'Transaction', id: res?.id }],
    }),
    getRecent: build.query<Transaction[] | null, string>({
      query() {
        return { url: `/transactions/recent` };
      },
      providesTags: ['RecentTransaction'],
    }),
    postTransaction: build.mutation<null, Omit<Transaction, 'id' | 'user_id'>>({
      query(payload) {
        return {
          url: `/transactions/create`,
          method: 'POST',
          body: JSON.stringify(payload),
        };
      },
      invalidatesTags: ['Transaction', 'RecentTransaction'],
    }),
  }),
});

export const {
  useGetTransactionsQuery,
  useGetRecentQuery,
  useGetTransactionQuery,
  usePostTransactionMutation,
} = transactionApi;
