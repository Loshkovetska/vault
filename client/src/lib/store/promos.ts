import { Promo } from '../types/promo';
import { createApi } from '@reduxjs/toolkit/query/react';
import { FETCH_BASE_QUERY } from './base';

export const promoApi = createApi({
  reducerPath: 'promoApi',
  tagTypes: ['Promo'],
  baseQuery: FETCH_BASE_QUERY,
  endpoints: build => ({
    getPromos: build.query<Promo[], void>({
      query() {
        return { url: '/promos' };
      },
      providesTags: [{ type: 'Promo', id: 'LIST' }],
    }),
    getPromo: build.query<Promo | null, string>({
      query(id) {
        return { url: `/promos/${id}` };
      },
      providesTags: res => [{ type: 'Promo', id: res?.id }],
    }),
  }),
});

export const { useGetPromosQuery, useGetPromoQuery } = promoApi;
