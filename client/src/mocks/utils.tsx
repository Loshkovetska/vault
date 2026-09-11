/* eslint-disable testing-library/no-await-sync-events */
import {
  cleanup,
  render,
  screen,
  userEvent,
} from '@testing-library/react-native';
import App from 'App';
import { AUTHORIZATION_INFO, SIGN_UP } from './test-data';
import { server } from './server';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Keychain from 'react-native-keychain';
import { STORAGE_KEYS } from '@/lib/constants/keys';

export async function navigateToSignIn(
  event: ReturnType<typeof userEvent.setup>,
) {
  await render(<App />);

  const skipBtn = await screen.findByTestId('onboarding-skip');
  expect(skipBtn).toBeOnTheScreen();

  //expect navigation to SignIn
  await event.press(skipBtn);
  const welcomeText = await screen.findByText('Welcome to VAULTA');
  expect(welcomeText).toBeOnTheScreen();
}

export async function navigateToSignUp(
  event: ReturnType<typeof userEvent.setup>,
) {
  await navigateToSignIn(event);
  const signUpLink = screen.getByTestId('sign-up-link');
  expect(signUpLink).toBeOnTheScreen();
  await event.press(signUpLink);
}

export async function validateAuthFields(
  event: ReturnType<typeof userEvent.setup>,
  data: {
    email?: string;
    password?: string;
  },
) {
  const email = screen.getByTestId('email-address');
  const password = screen.getByTestId('password');
  const submitBtn = screen.getByTestId('auth-submit');

  expect(email).toBeOnTheScreen();
  expect(password).toBeOnTheScreen();
  expect(submitBtn).toBeOnTheScreen();

  if (data.email) {
    await event.paste(email, data.email);
  }

  if (data.password) {
    await event.paste(password, data.password);
  }

  await event.press(submitBtn);

  return { email, password, submitBtn };
}
export async function fillSignUpFields(
  event: ReturnType<typeof userEvent.setup>,
  data: Partial<typeof SIGN_UP>,
) {
  for (let key in data ?? {}) {
    if (data?.[key as 'pin']) {
      const isRadio = key === 'gender';
      const field = screen.getByTestId(isRadio ? `${key}-${data[key]}` : key);
      expect(field).toBeOnTheScreen();
      if (isRadio) {
        await event.press(field);
      } else {
        await event.paste(field, data[key as 'pin'] as string);
      }
    }
  }
}

export const setupLifeCycles = (config?: {
  useFakeTimers?: boolean;
  isAuthorized?: boolean;
}) => ({
  event: userEvent.setup(),
  beforeAll: () => server.listen({ onUnhandledRequest: 'warn' }),
  async beforeEach() {
    if (config?.useFakeTimers) {
      jest.useFakeTimers();
    }
    if (config?.isAuthorized) {
      await AsyncStorage.setItem(STORAGE_KEYS.ONBOARDED_ID, 'true');
      await Keychain.setGenericPassword(
        'sessionID',
        AUTHORIZATION_INFO.SESSION_UID,
        {
          service: STORAGE_KEYS.SESSION_ID,
          storage: Keychain.STORAGE_TYPE.AES_GCM,
          accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
        },
      );
    }
    this.event = userEvent.setup();
  },
  afterEach: async () => {
    cleanup();
    await AsyncStorage.clear();
    await Keychain.resetGenericPassword({ service: STORAGE_KEYS.SESSION_ID });
    server.resetHandlers();
    jest.clearAllMocks();
    jest.useRealTimers();
  },
  afterAll: () => server.close(),
});
