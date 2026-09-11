/* eslint-disable testing-library/no-await-sync-events */
/* eslint-disable jest/no-disabled-tests */
/**
 * @format
 */

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react-native';
import App from 'App';
import { setupLifeCycles } from '@/mocks/utils';
import { TestInstance } from 'test-renderer';
import { TRANSACTION_TEST_INPUT } from '@/mocks/test-data';

describe.skip('-- Transaction Create/Preview --', () => {
  const transactionTypesNames = ['Top Up', 'Transfer', 'Bill', 'Withdraw'];
  const { event: fireEvent, ...TEST_LIFECYCLES } = setupLifeCycles({
    isAuthorized: true,
  });

  beforeAll(TEST_LIFECYCLES.beforeAll);
  beforeEach(TEST_LIFECYCLES.beforeEach);
  afterEach(TEST_LIFECYCLES.afterEach);
  afterAll(TEST_LIFECYCLES.afterAll);

  async function navigateToTransactionBuilder(type: string) {
    await render(<App />);
    await waitFor(() => {
      expect(screen.getByText('Ready to start your today')).toBeOnTheScreen();
    });
    const transactionTypes = await screen.findByTestId('transaction-types');
    expect(transactionTypes).toBeOnTheScreen();
    const index = transactionTypesNames.indexOf(type);

    const topupInstance = transactionTypes.children?.[index];

    expect(topupInstance).toHaveTextContent(type);
    await fireEvent.press(topupInstance as TestInstance);
  }

  test('Transaction Preview on Main Screen', async () => {
    await render(<App />);
    await waitFor(() => {
      expect(screen.getByText('Ready to start your today')).toBeOnTheScreen();
    });
    const recentActivity = await screen.findByTestId('recent-activity');
    expect(recentActivity).toBeOnTheScreen();

    const firstChild = recentActivity.children[0];
    await fireEvent.press(firstChild as TestInstance);
    await waitFor(() => {
      expect(screen.getByText(/Transaction Record/i)).toBeOnTheScreen();
    });
  });

  test('Create Top-Up Transaction Successful', async () => {
    await navigateToTransactionBuilder('Top Up');
    expect(screen.getByText('TopUp')).toBeOnTheScreen();

    const submitBtn = screen.getByTestId('submit');

    const selectedPaymentMethod = TRANSACTION_TEST_INPUT.top_up.payment_method;

    //step 0 [payment method]
    expect(submitBtn).toBeDisabled();
    const paymentMethod = screen.getByTestId(
      `payment-method-[${selectedPaymentMethod}]`,
    );
    await fireEvent.press(paymentMethod);

    expect(submitBtn).not.toBeDisabled();
    await fireEvent.press(submitBtn);

    //step 1 [select bank-account/card]
    expect(submitBtn).toBeDisabled();
    const paymentMethodTrigger = screen.getByTestId(
      `select-${selectedPaymentMethod}`,
    );
    await fireEvent.press(paymentMethodTrigger);

    const firstOption = screen.getByTestId(
      `select-option-${TRANSACTION_TEST_INPUT.top_up.method_id}`,
    );

    await fireEvent.press(firstOption);

    const amountInput = screen.getByTestId('amount');

    await fireEvent.type(amountInput, TRANSACTION_TEST_INPUT.top_up.amount);

    expect(submitBtn).not.toBeDisabled();
    await fireEvent.press(submitBtn);
    //step 2 [preview details]
    expect(submitBtn).not.toBeDisabled();
    await fireEvent.press(submitBtn);

    expect(
      screen.getByPlaceholderText('Search your activity'),
    ).toBeOnTheScreen();
  });
  test('Create Transfer Transaction Successful', async () => {
    await navigateToTransactionBuilder('Transfer');

    expect(screen.getByText('Transfer')).toBeOnTheScreen();

    let submitBtn = screen.getByTestId('submit');

    expect(submitBtn).toBeDisabled();

    //step 0 [fill account & amount]
    const fields = ['destination_account', 'amount'];
    for (let value of fields) {
      const input = screen.getByTestId(value);
      await fireEvent.paste(input, TRANSACTION_TEST_INPUT.transfer[value]);
    }

    expect(submitBtn).not.toBeDisabled();
    await fireEvent.press(submitBtn);

    expect(
      screen.getByPlaceholderText('Search your activity'),
    ).toBeOnTheScreen();
  });
  test('Create Bill Transaction Successful', async () => {
    await navigateToTransactionBuilder('Bill');
    expect(screen.getByText('Bill')).toBeOnTheScreen();

    const submitBtn = screen.getByTestId('submit');

    expect(submitBtn).toBeDisabled();

    //step 0 [service selection]
    const service = screen.getByTestId(
      `service-${TRANSACTION_TEST_INPUT.bill.service}`,
    );
    await fireEvent.press(service);

    expect(submitBtn).not.toBeDisabled();
    await fireEvent.press(submitBtn);

    //step 1 [destination & amount]
    expect(submitBtn).toBeDisabled();
    const fields = ['account_reference', 'amount'];
    for (let value of fields) {
      const input = screen.getByTestId(value);
      await fireEvent.paste(input, TRANSACTION_TEST_INPUT.bill[value]);
    }
    expect(submitBtn).not.toBeDisabled();
    await fireEvent.press(submitBtn);
    //step 2 [preview]
    expect(screen.getByText('Payment Details')).toBeOnTheScreen();
    expect(submitBtn).not.toBeDisabled();
    await fireEvent.press(submitBtn);

    expect(
      screen.getByPlaceholderText('Search your activity'),
    ).toBeOnTheScreen();
  });
  test('Create Withdraw Transaction Successful', async () => {
    await navigateToTransactionBuilder('Withdraw');
    expect(screen.getByText('Withdraw')).toBeOnTheScreen();

    //step 0 [select bank account]
    const bankInstance = screen.getByTestId(
      `bank-${TRANSACTION_TEST_INPUT.withdraw.bank_id}`,
    );
    await fireEvent.press(bankInstance);

    //step 1 [amount]
    const submit = screen.getByTestId('submit');
    expect(submit).toBeDisabled();

    const amount = screen.getByTestId('amount');
    expect(amount).toBeOnTheScreen();
    await fireEvent.paste(amount, TRANSACTION_TEST_INPUT.withdraw.amount);
    expect(submit).not.toBeDisabled();
    await fireEvent.press(submit);

    //step 2 [preview]
    expect(screen.getByText('Withdraw Details')).toBeOnTheScreen();
    await fireEvent.press(submit);

    expect(
      screen.getByPlaceholderText('Search your activity'),
    ).toBeOnTheScreen();
  });
});
