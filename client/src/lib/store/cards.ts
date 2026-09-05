import { AddCardRequest, RegisteredCard } from '../types/card';
import { createApi } from '@reduxjs/toolkit/query/react';
import { FETCH_BASE_QUERY } from './base';

export const cardApi = createApi({
  reducerPath: 'cardApi',
  baseQuery: FETCH_BASE_QUERY,
  tagTypes: ['RegisteredCard'],
  endpoints: build => ({
    getCards: build.query<RegisteredCard[], undefined>({
      query() {
        return { url: '/registered-cards' };
      },
      providesTags: ['RegisteredCard'],
    }),
    getCard: build.query<RegisteredCard, string>({
      query(id) {
        return { url: `/registered-cards/${id}` };
      },
    }),
    addCard: build.mutation<null, AddCardRequest>({
      query(payload) {
        return {
          url: `/registered-cards/connect`,
          method: 'POST',
          body: JSON.stringify(payload),
        };
      },
      invalidatesTags: ['RegisteredCard'],
    }),
    updateCard: build.mutation<null, Omit<RegisteredCard, 'user_id'>>({
      query({ id, ...payload }) {
        return {
          url: `/registered-cards/${id}`,
          method: 'PUT',
          body: JSON.stringify(payload),
        };
      },
      invalidatesTags: ['RegisteredCard'],
    }),
    deleteCard: build.mutation<null, string>({
      query(id) {
        return {
          url: `/registered-cards/${id}`,
          method: 'DELETE',
        };
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
