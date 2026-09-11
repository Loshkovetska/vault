/* eslint-disable testing-library/no-await-sync-events */
/* eslint-disable jest/no-disabled-tests */
/**
 * @format
 */

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react-native';
import App from 'App';
import { onboardingSteps } from '@/components/features/onboarding/constants';
import { navigateToSignIn, setupLifeCycles } from '@/mocks/utils';

describe.skip('-- Onboarding --', () => {
  const { event: fireEvent, ...TEST_LIFECYCLES } = setupLifeCycles();

  beforeEach(TEST_LIFECYCLES.beforeEach);
  afterEach(TEST_LIFECYCLES.afterEach);

  test('Onboarding Steps', async () => {
    await render(<App />);
    await waitFor(() => {
      expect(screen.getByTestId('onboarding-next')).toBeOnTheScreen();
      expect(screen.getByText(onboardingSteps[0].title)).toBeOnTheScreen();
    });

    const nextBtn = await screen.findByTestId('onboarding-next');
    //expect step 1 information
    await fireEvent.press(nextBtn);
    expect(screen.getByText(onboardingSteps[1].title)).toBeOnTheScreen();
    //expect step 2 information
    await fireEvent.press(nextBtn);
    expect(screen.getByText(onboardingSteps[2].title)).toBeOnTheScreen();
    //expect navigation to SignIn
    await fireEvent.press(nextBtn);
    const welcomeText = await screen.findByText('Welcome to VAULTA');
    expect(welcomeText).toBeOnTheScreen();
  });

  test('Onboarding Skip', async () => navigateToSignIn(fireEvent));
});
