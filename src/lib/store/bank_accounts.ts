import { AddBankRequest, BankAccount } from '../types/card';
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { dbService } from '../firebase/db';

export const bankApi = createApi({
  reducerPath: 'bankApi',
  tagTypes: ['BankAccount'],
  baseQuery: fakeBaseQuery(),
  endpoints: build => ({
    getBankAccounts: build.query<BankAccount[], string>({
      async queryFn(user_id) {
        const res = await dbService.get('bank_accounts', {
          where: [{ field: 'user_id', operation: '==', value: user_id }],
        });

        return {
          data: res.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          })) as BankAccount[],
        };
      },
      providesTags: [{ type: 'BankAccount', id: 'LIST' }],
    }),
    getBank: build.query<BankAccount, string>({
      async queryFn(payload) {
        const res = await dbService.getOne('bank_accounts', payload);

        return { data: { id: res.id, ...res.data() } as BankAccount };
      },
      providesTags: [{ type: 'BankAccount', id: 'ITEM' }],
    }),
    connectBank: build.mutation<null, AddBankRequest>({
      async queryFn(payload) {
        await dbService.post('bank_accounts', payload);

        return { data: null };
      },
      invalidatesTags: [{ type: 'BankAccount', id: 'LIST' }],
    }),
    updateBank: build.mutation<null, BankAccount>({
      async queryFn({ id, ...payload }) {
        await dbService.update('bank_accounts', id, payload);

        return { data: null };
      },
      invalidatesTags: [{ type: 'BankAccount', id: 'LIST' }],
    }),
    deleteBankAccount: build.mutation<null, string>({
      async queryFn(id) {
        await dbService.delete('bank_accounts', id);

        return { data: null };
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
