import { BASE_URL } from '@/lib/store/base';
import { http, HttpResponse, getResponse } from 'msw';
import { setupServer } from 'msw/native';
import {
  AUTHORIZATION_INFO,
  BANK_ACCOUNT_TEST,
  CREDIT_CARD_TEST,
  PROMO_TEST,
  SIGN_IN,
  TRANSACTION_TEST,
  USER_TEST,
  VAULT_CARD_TEST,
} from './test-data';

export const EXTERNAL_RESOURCES = [
  http.get(`https://www.gps-coordinates.net/geoproxy`, () =>
    HttpResponse.json({}, { status: 500 }),
  ),
];

export const PROVIDER_REQUESTS = {
  GOOGLE: {
    success_signin: http.post(`${BASE_URL}/auth/sign-in/google`, () =>
      HttpResponse.json({ id: AUTHORIZATION_INFO.AUTH_UID }, { status: 200 }),
    ),
    error: http.post(`${BASE_URL}/auth/sign-in/google`, () =>
      HttpResponse.json({ error: 'Failed to sign in' }, { status: 400 }),
    ),
    success_init: http.post(`${BASE_URL}/auth/sign-in/google`, () =>
      HttpResponse.json(AUTHORIZATION_INFO.PROVIDER_INIT, { status: 200 }),
    ),
  },
  APPLE: {
    success_signin: http.post(`${BASE_URL}/auth/sign-in/apple`, () =>
      HttpResponse.json({ id: AUTHORIZATION_INFO.AUTH_UID }, { status: 200 }),
    ),
    error: http.post(`${BASE_URL}/auth/sign-in/apple`, () =>
      HttpResponse.json({ error: 'Failed to sign in' }, { status: 400 }),
    ),
    success_init: http.post(`${BASE_URL}/auth/sign-in/apple`, () =>
      HttpResponse.json(AUTHORIZATION_INFO.PROVIDER_INIT, { status: 200 }),
    ),
  },
};

export const SIGN_UP_REQUESTS = {
  success: http.post(`${BASE_URL}/users/create`, () =>
    HttpResponse.json({ id: AUTHORIZATION_INFO.AUTH_UID }, { status: 200 }),
  ),
  error: http.post(`${BASE_URL}/users/create`, () =>
    HttpResponse.json(null, { status: 500 }),
  ),
};

const authHandlers = [
  http.post(`${BASE_URL}/auth/sign-in/credentials`, async ({ request }) => {
    const body = (await request.json()) as Record<'email' | 'password', string>;
    if (
      body?.email === SIGN_IN.real.email &&
      body?.password === SIGN_IN.real.password
    ) {
      return HttpResponse.json(
        { id: AUTHORIZATION_INFO.AUTH_UID },
        { status: 200 },
      );
    }
    return HttpResponse.json(
      { error: 'Incorrect Credentials' },
      { status: 400 },
    );
  }),
  PROVIDER_REQUESTS.GOOGLE.success_signin,
  PROVIDER_REQUESTS.APPLE.success_signin,
  http.post(`${BASE_URL}/auth/sign-up`, () =>
    HttpResponse.json({ uid: AUTHORIZATION_INFO.AUTH_UID }, { status: 200 }),
  ),
];

const sessionHandlers = [
  http.get(`${BASE_URL}/sessions`, async ({ request }) => {
    return HttpResponse.json(
      { error: 'Unauthorized. Log out!' },
      { status: 401 },
    );
  }),
  http.get(`${BASE_URL}/sessions/*`, () => console.log('Single Session')),
  http.post(`${BASE_URL}/sessions`, () => {
    return HttpResponse.json(
      { data: AUTHORIZATION_INFO.SESSION_UID },
      { status: 200 },
    );
  }),
  http.delete(`${BASE_URL}/sessions/*`, () => console.log('DELETE Session')),
];

const userHandlers = [
  SIGN_UP_REQUESTS.success,
  http.get(`${BASE_URL}/users/profile`, () =>
    HttpResponse.json(USER_TEST, { status: 200 }),
  ),
];

const vaultHandlers = [
  http.get(`${BASE_URL}/vault-card`, () =>
    HttpResponse.json(VAULT_CARD_TEST, { status: 200 }),
  ),
  http.put(`${BASE_URL}/vault-card/balance`, () =>
    HttpResponse.json(null, { status: 200 }),
  ),
];
const transactionHandlers = [
  http.get(`${BASE_URL}/transactions/recent`, () =>
    HttpResponse.json([TRANSACTION_TEST], { status: 200 }),
  ),
  http.get(`${BASE_URL}/transactions/*`, () =>
    HttpResponse.json(TRANSACTION_TEST, { status: 200 }),
  ),
  http.get(`${BASE_URL}/transactions`, () =>
    HttpResponse.json([TRANSACTION_TEST], { status: 200 }),
  ),
  http.post(`${BASE_URL}/transactions/create`, () =>
    HttpResponse.json(null, { status: 200 }),
  ),
];

const promoHandlers = [
  http.get(`${BASE_URL}/promos`, () =>
    HttpResponse.json([PROMO_TEST], { status: 200 }),
  ),
];

const bankAccountHandlers = [
  http.get(`${BASE_URL}/bank-accounts`, () =>
    HttpResponse.json([BANK_ACCOUNT_TEST], { status: 200 }),
  ),
];
const creditCardHandlers = [
  http.get(`${BASE_URL}/registered-cards`, () =>
    HttpResponse.json([CREDIT_CARD_TEST], { status: 200 }),
  ),
];

export const handlers = [
  ...EXTERNAL_RESOURCES,
  ...authHandlers,
  ...sessionHandlers,
  ...userHandlers,
  ...vaultHandlers,
  ...transactionHandlers,
  ...promoHandlers,
  ...bankAccountHandlers,
  ...creditCardHandlers,
];

export const server = setupServer(...handlers);
export { getResponse };
