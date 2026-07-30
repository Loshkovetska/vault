import { AddCardRequest, RegisteredCard } from '../types/card';
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { dbService } from '../firebase/db';

export const cardApi = createApi({
  reducerPath: 'cardApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['RegisteredCard'],
  endpoints: build => ({
    getCards: build.query<RegisteredCard[], string>({
      async queryFn(user_id) {
        const res = await dbService.get('registered_cards', {
          where: [{ field: 'user_id', operation: '==', value: user_id }],
        });

        return {
          data: res.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          })) as RegisteredCard[],
        };
      },
      providesTags: ['RegisteredCard'],
    }),
    getCard: build.query<RegisteredCard, string>({
      async queryFn(id) {
        const res = await dbService.getOne('registered_cards', id);

        return { data: { id: res.id, ...res.data() } as RegisteredCard };
      },
    }),
    addCard: build.mutation<null, AddCardRequest>({
      async queryFn(payload) {
        await dbService.post('registered_cards', payload);
        return { data: null };
      },
      invalidatesTags: ['RegisteredCard'],
    }),
    updateCard: build.mutation<null, RegisteredCard>({
      async queryFn({ id, ...payload }) {
        await dbService.update('registered_cards', id, payload);
        return { data: null };
      },
      invalidatesTags: ['RegisteredCard'],
    }),
    deleteCard: build.mutation<null, string>({
      async queryFn(id) {
        await dbService.delete('registered_cards', id);
        return { data: null };
      },
      invalidatesTags: ['RegisteredCard'],
    }),
  }),
});

export const {
  useGetCardsQuery,
  useGetCardQuery,
  useUpdateCardMutation,
  useDeleteCardMutation,
  useAddCardMutation,
} = cardApi;
