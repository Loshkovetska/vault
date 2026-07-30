import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { VaultCardStatus, VaultCard, VaultCardAnalytic } from '../types/card';
import { dbService } from '../firebase/db';
import bcrypt from 'react-native-bcrypt';
import { Transaction } from '../types/transaction';

export const vaultCardApi = createApi({
  reducerPath: 'vaultCardApi',
  tagTypes: ['VaultCard', 'VaultTransactions', 'VaultAnalytic'],
  baseQuery: fakeBaseQuery(),
  endpoints: build => ({
    toggleCardStatus: build.mutation<null, [string, VaultCardStatus]>({
      queryFn: async ([id, status]) => {
        await dbService.update('vault_cards', id, { status });
        return { data: null };
      },
      invalidatesTags: [{ type: 'VaultCard' }],
    }),
    getVaultCard: build.query<VaultCard, string>({
      async queryFn(user_id) {
        const res = await dbService.get(`vault_cards`, {
          where: [{ field: 'user_id', operation: '==', value: user_id }],
        });
        const card = res?.docs?.[0];
        return { data: { id: card.id, ...card.data() } as VaultCard };
      },
      providesTags: [{ type: 'VaultCard' }],
    }),
    updateBalance: build.mutation<null, [string, number]>({
      queryFn: async ([id, balance]) => {
        await dbService.update('vault_cards', id, { balance });

        return { data: null };
      },
      invalidatesTags: [{ type: 'VaultCard' }],
    }),
    changePIN: build.mutation<null, [string, string]>({
      queryFn: async ([id, pin]) => {
        await dbService.update('vault_cards', id, {
          pin: bcrypt.hashSync(pin, 8),
        });

        return { data: null };
      },
      invalidatesTags: [{ type: 'VaultCard' }],
    }),
    getVaultTransactions: build.query<
      Transaction[],
      { id: string; limit?: number }
    >({
      async queryFn({ id, limit }) {
        const [withdraws, topups] = await Promise.all([
          dbService.get('transactions', {
            where: [
              { field: 'user_id', operation: '==', value: id },
              {
                field: 'metadata.payment_method',
                operation: '==',
                value: 'store_card',
              },
            ],
            limit,
          }),
          dbService.get('transactions', {
            where: [
              { field: 'user_id', operation: '==', value: id },
              {
                field: 'type',
                operation: '==',
                value: 'top_up',
              },
            ],
            limit,
          }),
        ]);
        const transactions = [...withdraws.docs, ...topups.docs].slice(
          0,
          limit ?? withdraws.size + topups.size,
        );
        return {
          data: transactions.map(transaction => ({
            id: transaction.id,
            ...transaction.data(),
          })) as Transaction[],
        };
      },
      providesTags: ['VaultTransactions'],
    }),
    getVaultAnalytics: build.query<VaultCardAnalytic | null, string>({
      async queryFn(user_id) {
        const cards = await dbService.get('vault_cards', {
          where: [{ field: 'user_id', operation: '==', value: user_id }],
        });
        if (!cards.size) return { data: null };
        const card = cards.docs[0];

        const [bills, transfers, withdraws, refunds] = await Promise.all([
          dbService.get('transactions', {
            where: [
              { field: 'user_id', operation: '==', value: user_id },
              {
                field: 'metadata.method_id',
                operation: '==',
                value: card.id,
              },
              { field: 'type', operation: '==', value: 'bill' },
            ],
          }),
          dbService.get('transactions', {
            where: [
              { field: 'user_id', operation: '==', value: user_id },
              {
                field: 'metadata.method_id',
                operation: '==',
                value: card.id,
              },
              { field: 'type', operation: '==', value: 'transfer' },
            ],
          }),
          dbService.get('transactions', {
            where: [
              { field: 'user_id', operation: '==', value: user_id },
              {
                field: 'metadata.method_id',
                operation: '==',
                value: card.id,
              },
              { field: 'type', operation: '==', value: 'withdraw' },
            ],
          }),
          dbService.get('transactions', {
            where: [
              { field: 'user_id', operation: '==', value: user_id },
              {
                field: 'metadata.method_id',
                operation: '==',
                value: card.id,
              },
              { field: 'type', operation: '==', value: 'refund' },
            ],
          }),
        ]);

        const metrics = {
          Bill: {
            list: bills.docs.map(d => ({ id: d.id, ...d.data() })),
            amount: bills.docs.reduce((prev, d) => prev + d.data().amount, 0),
          },
          Transfer: {
            list: transfers.docs.map(d => ({ id: d.id, ...d.data() })),
            amount: transfers.docs.reduce(
              (prev, d) => prev + d.data().amount,
              0,
            ),
          },
          Withdraw: {
            list: withdraws.docs.map(d => ({ id: d.id, ...d.data() })),
            amount: withdraws.docs.reduce(
              (prev, d) => prev + d.data().amount,
              0,
            ),
          },
          Refund: {
            list: refunds.docs.map(d => ({ id: d.id, ...d.data() })),
            amount: refunds.docs.reduce((prev, d) => prev + d.data().amount, 0),
          },
        };

        return {
          data: {
            metrics: Object.entries(metrics).map(([k, v]) => ({
              metric: k,
              amount: v.amount,
              data: v.list,
              total: v.list.length,
            })),
          } as VaultCardAnalytic,
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
