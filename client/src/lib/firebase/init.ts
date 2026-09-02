import { getApps, initializeApp } from 'firebase/app';
import Config from 'react-native-config';

export function firebaseInit() {
  const app =
    getApps().length === 0
      ? initializeApp({
          appId: Config.FIREBASE_APP_ID,
          projectId: Config.FIREBASE_PROJECT_ID,
          apiKey: Config.FIREBASE_APIKEY,
          databaseURL: Config.FIREBASE_DB,
          messagingSenderId: Config.FIREBASE_SENDER_ID,
          storageBucket: Config.FIREBASE_STORAGE,
        })
      : getApps()[0];

  return app;
}
