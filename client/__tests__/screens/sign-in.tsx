/* eslint-disable jest/no-disabled-tests */

import { server, PROVIDER_REQUESTS } from '@/mocks/server';
import { SIGN_IN } from '@/mocks/test-data';
import {
  navigateToSignIn,
  setupLifeCycles,
  validateAuthFields,
} from '@/mocks/utils';
import { screen, waitFor } from '@testing-library/react-native';

describe.skip('-- Authorization --', () => {
  describe('-- Via Form --', () => {
    const { event, ...TEST_LIFECYCLES } = setupLifeCycles();

    beforeEach(TEST_LIFECYCLES.beforeEach);
    beforeAll(TEST_LIFECYCLES.beforeAll);
    afterEach(TEST_LIFECYCLES.afterEach);
    afterAll(TEST_LIFECYCLES.afterAll);

    test('Failed Submission', async () => {
      await navigateToSignIn(event);
      await validateAuthFields(event, SIGN_IN.test);

      await waitFor(() => {
        expect(screen.getByText('Incorrect credentials')).toBeOnTheScreen();
      });
    });

    test('Successful Submission', async () => {
      await navigateToSignIn(event);
      await validateAuthFields(event, SIGN_IN.real);

      const homeSubtitle = await screen.findByText('Ready to start your today');
      expect(homeSubtitle).toBeOnTheScreen();
    });
    test('Validation Error', async () => {
      await navigateToSignIn(event);
      await validateAuthFields(event, {
        email: SIGN_IN.test.email.slice(0, 3),
      });
      await waitFor(() => {
        expect(screen.getByText('Invalid Email')).toBeOnTheScreen();
        expect(screen.getByText('Invalid password')).toBeOnTheScreen();
      });
    });
  });

  describe('-- Via Providers --', () => {
    const { event, ...TEST_LIFECYCLES } = setupLifeCycles();

    beforeEach(TEST_LIFECYCLES.beforeEach);
    beforeAll(TEST_LIFECYCLES.beforeAll);
    afterEach(TEST_LIFECYCLES.afterEach);
    afterAll(TEST_LIFECYCLES.afterAll);

    async function validateProviderBtn(btn: 'google' | 'apple') {
      const testId = `${btn}-signin`;
      const signInBtn = screen.getByTestId(testId);

      expect(signInBtn).toBeOnTheScreen();
      await event.press(signInBtn);
    }
    test.each(['google', 'apple'] as const)(
      '%s Successful SignIn',
      async provider => {
        await navigateToSignIn(event);
        await validateProviderBtn(provider);
      },
    );

    test.each(['google', 'apple'] as const)(
      '%s Failed SignIn',
      async provider => {
        await navigateToSignIn(event);

        const upperProvider = provider.toUpperCase() as 'GOOGLE';
        server.use(PROVIDER_REQUESTS[upperProvider].error);

        await validateProviderBtn(provider);
      },
    );

    test.each(['google', 'apple'] as const)(
      'Sign Up Init Via %s',
      async provider => {
        await navigateToSignIn(event);

        const upperProvider = provider.toUpperCase() as 'GOOGLE';

        const handler = PROVIDER_REQUESTS[upperProvider].success_init;

        server.use(handler);

        await validateProviderBtn(provider);

        expect(
          screen.getByPlaceholderText(/Enter Full Name/i),
        ).toBeOnTheScreen();
      },
    );
  });
});
