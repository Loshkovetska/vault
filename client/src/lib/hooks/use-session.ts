import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useState } from 'react';
import DeviceInfo from 'react-native-device-info';
import { useSetSessionMutation } from '../store/sessions';
import GeoLocation, {
  GeolocationResponse,
} from '@react-native-community/geolocation';
import { STORAGE_KEYS } from '../constants/keys';
import { toast } from '../helpers/toast';

export function useSession() {
  const [addSession] = useSetSessionMutation();
  const [session_id, setSessionID] = useState<string | null>();

  const getSession = useCallback(() => {
    AsyncStorage.getItem(STORAGE_KEYS.SESSION_ID).then(setSessionID);
  }, []);

  const connectSession = useCallback(
    (
      user_id: string,
      cb: () => void,
      coords?: GeolocationResponse['coords'],
    ) => {
      Promise.all([DeviceInfo.getDeviceName(), DeviceInfo.getIpAddress()]).then(
        async ([deviceName, ipAddress]) => {
          let address = '';
          if (coords) {
            const res = await fetch(
              `https://www.gps-coordinates.net/geoproxy?q=${coords.latitude}+${coords.longitude}&key=9416bf2c8b1d4751be6a9a9e94ea85ca&no_annotations=1&language=en`,
            ).then(r => r.json());
            const location = res?.results?.[0].components;
            address = location ? `${location?.city},${location?.country}` : '';
          }

          addSession({
            user_id,
            device: deviceName,
            location: address,
            ip_address: ipAddress,
            last_at: new Date().toISOString(),
          }).then(c => {
            if (c.data) {
              AsyncStorage.setItem(STORAGE_KEYS.SESSION_ID, c.data);
              setSessionID(c.data ?? null);
              cb();
            }
          });
        },
      );
    },
    [addSession],
  );

  const setSession = useCallback(
    (user_id: string | undefined, cb: () => void) => {
      if (!user_id) return toast.error('Cannot authorize! Try again.');

      GeoLocation.getCurrentPosition(
        ({ coords }) => connectSession(user_id, cb, coords),
        () => connectSession(user_id, cb, undefined),
      );
    },
    [connectSession],
  );

  const clearSession = useCallback((cb: () => void) => {
    AsyncStorage.removeItem(STORAGE_KEYS.SESSION_ID).then(cb);
  }, []);

  useEffect(() => {
    getSession();
  }, [getSession]);

  return { session: session_id, setSession, clearSession };
}
