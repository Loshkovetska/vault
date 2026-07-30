import { Promo } from '../types/promo';
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { dbService } from '../firebase/db';

export const promoApi = createApi({
  reducerPath: 'promoApi',
  tagTypes: ['Promo'],
  baseQuery: fakeBaseQuery(),
  endpoints: build => ({
    getPromos: build.query<Promo[], string>({
      async queryFn(user_id) {
        const res = await dbService.get('promos', {
          where: [
            {
              field: 'user_id',
              operation: '==',
              value: user_id,
            },
          ],
        });

        return {
          data: res?.docs?.map(d => ({ id: d.id, ...d.data() })) as Promo[],
        };
      },
      providesTags: [{ type: 'Promo', id: 'LIST' }],
    }),
    getPromo: build.query<Promo | null, string>({
      async queryFn(id) {
        const res = await dbService.getOne('promos', id);
        return { data: { id: res.id, ...res.data() } as Promo };
      },
      providesTags: res => [{ type: 'Promo', id: res?.id }],
    }),
  }),
});

export const { useGetPromosQuery, useGetPromoQuery } = promoApi;
