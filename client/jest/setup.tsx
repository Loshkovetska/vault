function mockObject() {
  return new Proxy(
    {},
    {
      get: (_target, propertyName) => {
        return _target[propertyName as keyof typeof _target];
      },
    },
  );
}

function mockComponentsReference(ID: string) {
  const ReactInstance = require('react');
  const { View } = require('react-native');
  return new Proxy(
    {},
    {
      get: (_target, propertyName) => {
        return (props: any) =>
          ReactInstance.createElement(View, {
            testID: `${ID}-${String(propertyName)}`,
            ...props,
          });
      },
    },
  );
}

// // ==========================================
// // React Native Unistyles Mock Setup
// // ==========================================

jest.mock(
  'react-native-unistyles',
  () => {
    const { themeConfig } = require('@/lib/theme');
    return {
      StyleSheet: {
        create: jest.fn(opts => {
          if (typeof opts === 'function') {
            return opts(themeConfig);
          }
          return opts;
        }),
        configure: jest.fn(() => {}),
      },
    };
  },
  {
    virtual: true,
  },
);
// // ==========================================
// // React Native SafeAreaContext Mock Setup
// // ==========================================

jest.mock('react-native-safe-area-context', () => {
  return require('react-native-safe-area-context/jest/mock').default;
});

// ========================================================
//  Solar Icons Mock
// ========================================================
jest.mock(
  '@solar-icons/react-native/Linear',
  () => mockComponentsReference('icon'),
  {
    virtual: true,
  },
);
jest.mock(
  '@solar-icons/react-native/Bold',
  () => mockComponentsReference('icon'),
  {
    virtual: true,
  },
);

// ========================================================
//  Callstack Liquid Glass Mock Setup
// ========================================================
jest.mock(
  '@callstack/liquid-glass',
  () => mockComponentsReference('liquid-glass-view'),
  { virtual: true },
);

// ========================================================
//  React Native Config Mock Setup
// ========================================================
jest.mock('react-native-config', () => mockObject(), { virtual: true });

// ========================================================
//  React Native Google Signin Mock Setup
// ========================================================
jest.mock(
  '@react-native-google-signin/google-signin',
  () => {
    const { AUTHORIZATION_INFO } = require('@/mocks/test-data');
    return {
      GoogleSignin: {
        configure: jest.fn(() => {}),
        hasPlayServices: jest.fn(opts => Promise.resolve(opts)),
        signIn: jest.fn(() => Promise.resolve(AUTHORIZATION_INFO.GOOGLE_TOKEN)),
      },
    };
  },
  {
    virtual: true,
  },
);

// ========================================================
//  React Native Google Signin Mock Setup
// ========================================================
jest.mock(
  '@invertase/react-native-apple-authentication',
  () => {
    const { AUTHORIZATION_INFO } = require('@/mocks/test-data');
    return {
      appleAuth: {
        performRequest: jest.fn(() =>
          Promise.resolve(AUTHORIZATION_INFO.APPLE_TOKEN),
        ),
      },
    };
  },
  {
    virtual: true,
  },
);

// ========================================================
//  React Native Device Info Mock Setup
// ========================================================
jest.mock(
  'react-native-device-info',
  () => {
    const { DEVICE_INFO } = require('@/mocks/test-data');
    return {
      getDeviceName: jest.fn(() => Promise.resolve(DEVICE_INFO['device-name'])),
      getIpAddress: jest.fn(() => Promise.resolve(DEVICE_INFO['ip-address'])),
      isEmulator: jest.fn(() => Promise.resolve(DEVICE_INFO.isEmulator)),
    };
  },
  {
    virtual: true,
  },
);

// ========================================================
//  React Native GeoLocation Mock Setup
// ========================================================
jest.mock(
  '@react-native-community/geolocation',
  () => {
    const { GEOLOCATION } = require('@/mocks/test-data');
    return {
      getCurrentPosition: jest.fn((success, _) => success(GEOLOCATION)),
    };
  },
  {
    virtual: true,
  },
);

// ========================================================
//  React Native Clipboard Mock Setup
// ========================================================
jest.mock('@react-native-clipboard/clipboard', () => mockObject(), {
  virtual: true,
});

// ========================================================
//  React Native Bootsplash Mock Setup
// ========================================================
jest.mock(
  'react-native-bootsplash',
  () => ({
    hide: jest.fn(() => {}),
  }),
  {
    virtual: true,
  },
);

// ========================================================
//  React Native Camera Kit Mock Setup
// ========================================================
jest.mock('react-native-camera-kit', () => mockObject(), {
  virtual: true,
});

// ==========================================
// React Native Firebase Messaging Mock Setup
// ==========================================
jest.mock(
  '@react-native-firebase/messaging',
  () => ({
    getMessaging: jest.fn(() => {}),
    onMessage: jest.fn(() => {}),
    registerDeviceForRemoteMessages: jest.fn(() => {}),
    getToken: jest.fn(() => Promise.resolve('')),
  }),
  {
    virtual: true,
  },
);

// ==========================================
// React Native Permissions Mock Setup
// ==========================================

jest.mock('react-native-permissions', () => mockObject(), {
  virtual: true,
});

// ==========================================
// Notifee Mock Setup
// ==========================================
jest.mock(
  '@notifee/react-native',
  () => ({
    displayNotification: jest.fn(() => {}),
    onBackgroundEvent: jest.fn(() => {}),
    onForegroundEvent: jest.fn(() => {}),
    cancelNotification: jest.fn(() => {}),
  }),
  {
    virtual: true,
  },
);

// ==========================================
// React Native Image Picker Mock Setup
// ==========================================
jest.mock('react-native-image-picker', () => {
  const { IMAGE_PICKER_DATA } = require('@/mocks/test-data');

  return {
    launchImageLibrary: jest.fn(() => Promise.resolve(IMAGE_PICKER_DATA)),
  };
});

// ==========================================
// React Native Keychain Mock Setup
// ==========================================
jest.mock('react-native-keychain', () => {
  const keychain = new Map();
  const { KEYCHAIN } = require('@/mocks/test-data');
  return {
    getGenericPassword: jest.fn(opts =>
      Promise.resolve({
        password: keychain.get(opts.service),
      }),
    ),
    setGenericPassword: jest.fn((_, password, opts) =>
      Promise.resolve(keychain.set(opts.service, password)),
    ),
    resetGenericPassword: jest.fn(opts =>
      Promise.resolve(keychain.delete(opts.service)),
    ),
    STORAGE_TYPE: KEYCHAIN.STORAGE_TYPE,
    ACCESSIBLE: KEYCHAIN.ACCESSIBLE,
  };
});

// ==========================================
// React Native Async Storage Mock Setup
// ==========================================

jest.mock('@react-native-async-storage/async-storage', () => {
  const storage = new Map();

  return {
    getItem: jest.fn(key => Promise.resolve(storage.get(key))),
    setItem: jest.fn((key, value) => Promise.resolve(storage.set(key, value))),
    removeItem: jest.fn(key => Promise.resolve(storage.delete(key))),
    clear: jest.fn(() => {
      storage.clear();
      return Promise.resolve();
    }),
  };
});
