import { configureStore } from '@reduxjs/toolkit';
import { userApi } from './users';
import { promoApi } from './promos';
import { transactionApi } from './transactions';
import { bankApi } from './bank_accounts';
import { sessionApi } from './sessions';
import { cardApi } from './cards';
import { notificationApi } from './notifications';
import { vaultCardApi } from './vault_card';

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [promoApi.reducerPath]: promoApi.reducer,
    [transactionApi.reducerPath]: transactionApi.reducer,
    [bankApi.reducerPath]: bankApi.reducer,
    [sessionApi.reducerPath]: sessionApi.reducer,
    [cardApi.reducerPath]: cardApi.reducer,
    [notificationApi.reducerPath]: notificationApi.reducer,
    [vaultCardApi.reducerPath]: vaultCardApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(promoApi.middleware)
      .concat(transactionApi.middleware)
      .concat(bankApi.middleware)
      .concat(sessionApi.middleware)
      .concat(cardApi.middleware)
      .concat(notificationApi.middleware)
      .concat(vaultCardApi.middleware),
});

export const invalidatesTags = {
  userApi: userApi.util.invalidateTags(['User']),
  promoApi: promoApi.util.invalidateTags(['Promo']),
  transactionApi: transactionApi.util.invalidateTags([
    'Transaction',
    'RecentTransaction',
  ]),
  bankApi: bankApi.util.invalidateTags(['BankAccount']),
  sessionApi: sessionApi.util.invalidateTags(['Session']),
  cardApi: cardApi.util.invalidateTags(['RegisteredCard']),
  notificationApi: notificationApi.util.invalidateTags(['Notifications']),
  vaultCardApi: vaultCardApi.util.invalidateTags([
    'VaultTransactions',
    'VaultCard',
  ]),
};
