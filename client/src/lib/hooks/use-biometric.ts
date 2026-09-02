import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useRef, useState } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import ReactNativeBiometrics from 'react-native-biometrics';
import { STORAGE_KEYS } from '../constants/keys';
import { logger } from '../helpers/logger';
import { useDispatch } from 'react-redux';
import { invalidatesTags } from '../store';

const SESSION_TIMEOUT_MS = 5 * 60 * 1000;

export function useBiometric(onFail: () => void) {
  const [rnBiometrics] = useState(() => new ReactNativeBiometrics());
  const appState = useRef<AppStateStatus | null>(null);
  const dispatch = useDispatch();
  const hasBeenAsked = useRef(false);
  const failedCall = useRef(onFail);
  failedCall.current = onFail;

  const checkBiometrics = useCallback(async () => {
    if (hasBeenAsked.current) return;
    const lastChecked = await AsyncStorage.getItem(STORAGE_KEYS.BIOMETRIC_ID);
    if (lastChecked) {
      const diff = new Date().getTime() - new Date(lastChecked).getTime();
      if (diff <= SESSION_TIMEOUT_MS) return;
    }
    const { available, biometryType } = await rnBiometrics.isSensorAvailable();
    if (available) {
      if (biometryType === 'FaceID') {
        const session = await AsyncStorage.getItem(STORAGE_KEYS.SESSION_ID);
        if (session) {
          const { success } = await rnBiometrics.simplePrompt({
            promptMessage: 'Authenticate to continue',
          });

          if (!success) {
            failedCall.current();
          }

          await AsyncStorage.setItem(
            'last_biometric',
            new Date().toISOString(),
          );
        }
      }
    } else {
      logger(
        '[ERROR]: checkBiometrics',
        'No biometrics found, logging in normally',
      );
    }
    hasBeenAsked.current = true;
  }, [rnBiometrics]);

  useEffect(() => {
    AppState.addEventListener('change', state => {
      if (state === appState.current) {
        return;
      }
      appState.current = state;
      if (state === 'active') {
        dispatch(invalidatesTags.transactionApi);
        dispatch(invalidatesTags.userApi);
        dispatch(invalidatesTags.vaultCardApi);
        checkBiometrics();
      } else {
        hasBeenAsked.current = false;
      }
    });
  }, [checkBiometrics, dispatch]);

  return null;
}
