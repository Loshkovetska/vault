import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import Config from 'react-native-config';
import * as Keychain from 'react-native-keychain';
import { STORAGE_KEYS } from '../constants/keys';
import { logger } from '../helpers/logger';
export const BASE_URL = Config.API_URL ?? 'http://127.0.0.1:3000/api';

export const injectHeaders = async (): Promise<null | Record<
  string,
  string
>> => {
  try {
    const userSession = await Keychain.getGenericPassword({
      service: STORAGE_KEYS.SESSION_ID,
    });
    if (!userSession) {
      return null;
    }
    const cookieKey = userSession.username || 'sessionID';
    return {
      Cookie: `${cookieKey}=${userSession.password}; SameSite=Lax; HttpOnly; Secure; Domain=vault.com; Path=/; Max-Age=3600`,
    };
  } catch (e) {
    logger('[Error]: Failed to get session', e);
    return null;
  }
};

export const FETCH_BASE_QUERY = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: 'include',
  async prepareHeaders(headers) {
    const hs = await injectHeaders();
    if (hs) headers.set('Cookie', hs.Cookie);
    return headers;
  },
});
