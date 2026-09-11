import { TransactionType } from '@/lib/types/transaction';

export const SIGN_IN = {
  test: {
    email: 'lodsh@gm.com',
    password: 'test371008',
  },
  real: {
    email: 'ddm22@gm.com',
    password: 'ana26111997',
  },
};
export const SIGN_UP = {
  full_name: 'Lod S',
  bdate: new Date().toISOString(),
  gender: 'Man',
  nationality: 'USA',
  pin: '123456',
};

export const AUTHORIZATION_INFO = {
  AUTH_UID: 'blziGmcCwfQevyA1ljxdpDkCngU2',
  SESSION_UID: 'hMmiu5ZxuppSMWwAzPbp',
  GOOGLE_TOKEN: {
    data: {
      idToken:
        'jEXUlCJtCPJugm97wCD3Av1jaryFYqbiwCEHrwWPQBbWujGDWb7khxdcixE8UDp6',
    },
  },
  APPLE_TOKEN: {
    identityToken:
      'jEXUlCJtCPJugm97wCD3Av1jaryFYqbiwCEHrwWPQBbWujGDWb7khxdcixE8UDp6',
  },
  PROVIDER_INIT: {
    uid: 'hMmiu5ZxuppSMWwAzPbp',
    displayName: 'Test Name',
    photoURL: null,
  },
};

export const IMAGE_PICKER_DATA = {
  assets: [{ uri: 'file://wjwuwjwd-hhdwhwjdw' }],
};

export const DEVICE_INFO = {
  'ip-address': '127.0.0.1',
  'device-name': 'IPhone 17 Pro',
  isEmulator: true,
};

export const GEOLOCATION = {
  coords: {
    latitude: 0,
    longitude: 0,
  },
};

export const KEYCHAIN = {
  STORAGE_TYPE: {
    AES_GCM: 'KeystoreAESGCM',
  },
  ACCESSIBLE: {
    WHEN_UNLOCKED_THIS_DEVICE_ONLY: 'AccessibleWhenUnlockedThisDeviceOnly',
  },
};

export const USER_TEST = {
  data_sharing: true,
  document:
    'file:///Users/anastasialoskoveckaa/Library/Developer/CoreSimulator/Devices/F4ED5716-1046-47B2-9160-7E0348A00443/data/Containers/Data/Application/ADAE11D2-F1E9-48D0-B709-517A56226FC6/tmp/2D9164F4-5CD8-462A-9311-A2C969771CEF.jpg',
  email_verified: false,
  full_name: 'ana hya',
  gender: 'Man',
  image_url:
    'file:///Users/anastasialoskoveckaa/Library/Developer/CoreSimulator/Devices/F4ED5716-1046-47B2-9160-7E0348A00443/data/Containers/Data/Application/ADAE11D2-F1E9-48D0-B709-517A56226FC6/tmp/E2A06DFF-F885-444E-9BDC-893C17FB6595.jpg',
  is_verified: false,
  language: 'en',
  monthly_report: true,
  nationality: 'USA',
  newsletter: true,
  personalized_ads: true,
  phone: '',
  phone_verified: false,
  promotion: true,
  security: true,
  transaction: true,
  two_factor_auth: false,
  id: AUTHORIZATION_INFO.AUTH_UID,
};

export const VAULT_CARD_TEST = {
  id: 'ALjQfxnMsKdF02Gr5gD6',
  balance: 2000,
  card_holder: 'ana hya',
  card_number: '8800014511295814',
  daily_limit: 500,
  expired_at: '2030-09-05T12:06:22.800Z',
  pin: '$2b$08$BVaXz2NsO7yncUfNglPDceSFBf/sJrznfZhq3yH1Uzfz9U5.As9A6',
  status: 'active',
  user_id: AUTHORIZATION_INFO.SESSION_UID,
};

export const PROMO_TEST = {
  id: 'ALjQfxnMsKdF02Gr5gD6',
  user_id: AUTHORIZATION_INFO.AUTH_UID,
  type: 'discount',
  amount: 10,
  max_amount: 500,
  min_transaction: 20,
  payment_method: 'card',
  created_at: '2026-07-29T12:38:19.788Z',
  expired_at: '2026-07-29T12:38:19.788Z',
  short_info: 'short info',
  description: 'long info',
  image_url: 'https://image.com/sjsjs.png',
  used: false,
};

export const BANK_ACCOUNT_TEST = {
  id: 'uP20UpFLxgUhb9PbdWJ',
  account: '2727262662662627',
  balance: 2400,
  name: 'Bank of America',
  user_id: 'qgC6tf7F5vP4xxFmtOWJSXF5lk33',
};

export const CREDIT_CARD_TEST = {
  id: 'uP20UpFLxgUhb9PbdWJ',
  balance: 1500,
  card_holder: USER_TEST.full_name,
  card_number: '5451030000000001',
  cvv: '123',
  expired_at: '0028-07-04T14:42:09.142Z',
  user_id: AUTHORIZATION_INFO.AUTH_UID,
};

export const TRANSACTION_TEST = {
  id: 'ALjQfxnMsKdF02Gr5gD6',
  amount: 40,
  created_at: '2026-07-29T12:38:19.788Z',
  name: 'Transfer to ****2584',
  status: 'SUCCESS',
  type: 'transfer',
  user_id: AUTHORIZATION_INFO.AUTH_UID,
  metadata: {
    destination_account: '12285366884225844558',
    method_id: 'uP20UpFLxgUhb9PbdWJf',
    payment_method: 'store_card',
  },
};

export const TRANSACTION_TEST_INPUT: Record<TransactionType, any> = {
  top_up: {
    payment_method: 'bank_transfer',
    method_id: 'uP20UpFLxgUhb9PbdWJ',
    amount: '20',
  },
  bill: {
    service: 'pulse_data',
    amount: '20',
    account_reference: '0785323133',
    method_id: 'uP20UpFLxgUhb9PbdWJf',
    payment_method: 'store_card',
  },
  withdraw: {
    bank_id: 'uP20UpFLxgUhb9PbdWJ',
    amount: '20',
  },
  transfer: {
    destination_account: '12285366884225844558',
    method_id: 'uP20UpFLxgUhb9PbdWJf',
    payment_method: 'store_card',
    amount: '20',
  },
  refund: {},
};
