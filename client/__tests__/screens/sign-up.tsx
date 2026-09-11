/* eslint-disable jest/no-disabled-tests */
import { server, SIGN_UP_REQUESTS } from '@/mocks/server';
import { SIGN_IN, SIGN_UP } from '@/mocks/test-data';
import {
  fillSignUpFields,
  navigateToSignUp,
  setupLifeCycles,
  validateAuthFields,
} from '@/mocks/utils';
import { act, screen } from '@testing-library/react-native';

const DELAY_MS = 10000;

describe.skip('-- Registration --', () => {
  const { event, ...TEST_LIFECYCLES } = setupLifeCycles({
    useFakeTimers: true,
  });

  beforeAll(TEST_LIFECYCLES.beforeAll);
  beforeEach(TEST_LIFECYCLES.beforeEach);

  afterEach(TEST_LIFECYCLES.afterEach);
  afterAll(TEST_LIFECYCLES.afterAll);

  async function stepsLogic() {
    await navigateToSignUp(event);
    await validateAuthFields(event, SIGN_IN.test);

    const submitBtn = screen.getByTestId('step-submit');
    expect(submitBtn).toBeDisabled();

    //step 0 [filling missing info]
    await fillSignUpFields(event, SIGN_UP);
    expect(screen.getByTestId('step-submit')).not.toBeDisabled();
    await event.press(submitBtn);

    //step 1 [uploading document]
    expect(screen.getByText(/Click to Upload/i)).toBeOnTheScreen();
    expect(screen.getByTestId('step-submit')).toBeDisabled();
    const uploadDocument = screen.getByTestId('upload-document');
    await event.press(uploadDocument);
    expect(screen.getByTestId('step-submit')).not.toBeDisabled();
    await event.press(submitBtn);

    //step 2 [uploading selfie]
    const selfiePicker = screen.getByTestId('selfie-picker');
    expect(selfiePicker).toBeOnTheScreen();
    return { selfiePicker };
  }

  test('Successful Sign Up', async () => {
    const { selfiePicker } = await stepsLogic();
    await event.press(selfiePicker);
    await act(() => {
      jest.advanceTimersByTime(DELAY_MS);
    });

    const message = await screen.findByText(/Verification Complete/i);
    expect(message).toBeOnTheScreen();
  });

  test('Failed Sign Up', async () => {
    const { selfiePicker } = await stepsLogic();
    server.use(SIGN_UP_REQUESTS.error);
    await event.press(selfiePicker);
    await act(() => {
      jest.advanceTimersByTime(DELAY_MS);
    });

    const message = await screen.findByText(/Something went wrong/i);
    expect(message).toBeOnTheScreen();
  });
});
