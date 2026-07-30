import { GetTransactionsRequest, Transaction } from '../types/transaction';
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { dbService, FilterOpts } from '../firebase/db';

export const transactionApi = createApi({
  reducerPath: 'transactionApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Transaction', 'RecentTransaction'],
  endpoints: build => ({
    getTransactions: build.query<Transaction[], GetTransactionsRequest>({
      async queryFn({ user_id, search, type }) {
        const where: FilterOpts['where'] = [
          { field: 'user_id', operation: '==', value: user_id },
        ];
        if (type !== 'all') {
          where.push({ field: 'type', operation: '==', value: type });
        }

        const opts = {
          where,
          orderBy: { field: 'created_at', direction: 'desc' },
          search: search.length ? search : undefined,
        };

        const res = await dbService.get('transactions', opts as FilterOpts);

        return {
          data: (res.docs ?? []).map(doc => ({
            id: doc.id,
            ...doc.data(),
          })) as Transaction[],
        };
      },
      providesTags: ['Transaction'],
    }),
    getTransaction: build.query<Transaction | null, string>({
      async queryFn(id) {
        const res = await dbService.getOne('transactions', id);
        return { data: { id, ...res.data() } as Transaction };
      },
      providesTags: res => [{ type: 'Transaction', id: res?.id }],
    }),
    getRecent: build.query<Transaction[] | null, string>({
      async queryFn(user_id) {
        const opts: FilterOpts = {
          where: [{ field: 'user_id', operation: '==', value: user_id }],
          orderBy: { field: 'created_at', direction: 'desc' },
          limit: 5,
        };

        const res = await dbService.get('transactions', opts);

        return {
          data: (res.docs ?? []).map(doc => ({
            id: doc.id,
            ...doc.data(),
          })) as Transaction[],
        };
      },
      providesTags: ['RecentTransaction'],
    }),
    postTransaction: build.mutation<null, Omit<Transaction, 'id'>>({
      async queryFn(payload) {
        await dbService.post('transactions', payload);
        return { data: null };
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
