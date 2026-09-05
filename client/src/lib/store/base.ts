import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import Config from 'react-native-config';
import * as Keychain from 'react-native-keychain';
import { STORAGE_KEYS } from '../constants/keys';
export const BASE_URL = Config.API_URL ?? 'http://127.0.0.1:3000/api';

export const FETCH_BASE_QUERY = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: 'include',
  async prepareHeaders(headers) {
    const userSession = await Keychain.getGenericPassword({
      service: STORAGE_KEYS.SESSION_ID,
    });
    if (!userSession) {
      headers.append(
        'Cookie',
        `sessionID=; SameSite=Lax; HttpOnly; Secure; Domain=vault.com; Path=/; Max-Age=3600`,
      );
      return headers;
    }
    headers.append(
      'Cookie',
      `${userSession.username}=${userSession.password}; SameSite=Lax; HttpOnly; Secure; Domain=vault.com; Path=/; Max-Age=3600`,
    );
    return headers;
  },
});
