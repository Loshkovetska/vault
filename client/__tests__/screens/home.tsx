/* eslint-disable testing-library/no-await-sync-events */
/* eslint-disable jest/no-disabled-tests */
/**
 * @format
 */

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react-native';
import App from 'App';
import { setupLifeCycles } from '@/mocks/utils';
import { priceFormate } from '@/lib/utils/number';
import { USER_TEST, VAULT_CARD_TEST } from '@/mocks/test-data';

describe.skip('-- Main Screen --', () => {
  const TEST_LIFECYCLES = setupLifeCycles({
    isAuthorized: true,
  });

  beforeAll(TEST_LIFECYCLES.beforeAll);
  beforeEach(TEST_LIFECYCLES.beforeEach);
  afterEach(TEST_LIFECYCLES.afterEach);
  afterAll(TEST_LIFECYCLES.afterAll);

  test('Instantly Navigated to Main Screen', async () => {
    await render(<App />);
    await waitFor(() => {
      expect(screen.getByText('Ready to start your today')).toBeOnTheScreen();
    });
  });

  test('Main Screen Successfully loaded information', async () => {
    await render(<App />);
    await waitFor(() => {
      expect(screen.getByText('Ready to start your today')).toBeOnTheScreen();
    });

    const lname = USER_TEST?.full_name?.split(' ')?.[1] ?? '';

    const welcomeText = await screen.findByText(`Hi, ${lname}`);

    expect(welcomeText).toBeOnTheScreen();

    const balance = await screen.findByTestId('vault-balance');
    expect(balance).toHaveTextContent(priceFormate(VAULT_CARD_TEST.balance));

    const recentActivity = await screen.findByTestId('recent-activity');
    expect(recentActivity.children.length).toEqual(1);

    const promosPreview = await screen.findByTestId('promos');
    expect(promosPreview.children.length).toEqual(1);
  });
});
