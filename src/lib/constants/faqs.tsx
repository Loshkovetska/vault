import { Text } from '@/components/ui/text';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

export type FaqItem = { id: string; title: string; content: React.ReactNode };

const styles = StyleSheet.create({
  container: { gap: 24 },
  block: {
    gap: 16,
  },
  sublist: { paddingLeft: 8 },
});

export const faqList: FaqItem[] = [
  {
    id: '1',
    title: 'How to verify my identity?',
    content: (
      <View style={styles.container}>
        <View style={styles.block}>
          <Text typo="label-lg" weight={600}>
            Why it matters
          </Text>
          <Text typo="text-md" weight={500}>
            To keep your account secure and comply with financial regulations,
            we need to verify your identity before unlocking full account
            features (like higher transaction limits and withdrawals).
          </Text>
        </View>
        <View style={styles.block}>
          <Text typo="label-lg" weight={600}>
            What you will need
          </Text>
          <Text typo="text-md" weight={500}>
            &bull; A valid government-issued ID (Passport, Driver’s License, or
            National ID card).
          </Text>
          <Text typo="text-md" weight={500}>
            &bull; A well-lit room for a quick selfie check.
          </Text>
        </View>
        <View style={styles.block}>
          <Text typo="label-lg" weight={600}>
            Steps to verify:
          </Text>
          <Text typo="text-md" weight={500}>
            1. Navigate to Settings: Open the app, go to your Profile, and
            select Identity Verification.
          </Text>
          <Text typo="text-md" weight={500}>
            2. Upload your ID: Take a clear, glare-free photo of the front and
            back of your document. Make sure all four corners are visible.
          </Text>
          <Text typo="text-md" weight={500}>
            3. Take a selfie: Follow the on-screen prompts to complete a quick
            biometric face scan.
          </Text>
          <Text typo="text-md" weight={500}>
            4. Submit: Our team will review your documents. Most verifications
            are completed within 15 to 30 minutes, but can take up to 24 hours
            during peak times.
          </Text>
        </View>
      </View>
    ),
  },
  {
    id: '2',
    title: 'How to withdraw?',
    content: (
      <View style={styles.container}>
        <View style={styles.block}>
          <Text typo="text-md" weight={500}>
            Prerequisite: Ensure your account is fully verified before
            attempting your first withdrawal.
          </Text>
        </View>
        <View style={styles.block}>
          <Text typo="label-lg" weight={600}>
            Steps to withdraw your funds:
          </Text>
          <Text typo="text-md" weight={500}>
            1. Go to Wallet: Tap on the Wallet or Balance tab from the main
            dashboard
          </Text>
          <Text typo="text-md" weight={500}>
            2. Select Withdraw: Choose your preferred payout method (e.g., Bank
            Transfer, Linked Debit Card, or E-wallet).
          </Text>
          <Text typo="text-md" weight={500}>
            3. Enter Amount: Input the total amount you wish to withdraw,
            ensuring it meets the minimum threshold.
          </Text>
          <Text typo="text-md" weight={500}>
            4. Review Fees & Processing Times:
          </Text>
          <Text typo="text-md" weight={500} style={styles.sublist}>
            4.1. Instant Payouts: Take 1–30 minutes (may incur a small
            convenience fee).
          </Text>
          <Text typo="text-md" weight={500} style={styles.sublist}>
            4.2. Standard Bank Transfers: Take 1–3 business days (usually free).
          </Text>
          <Text typo="text-md" weight={500}>
            5. Confirm: Enter your account PIN or biometric scan to authorize
            the transfer safely.
          </Text>
        </View>
      </View>
    ),
  },
  {
    id: '3',
    title: 'Why is my top up pending?',
    content: (
      <View style={styles.container}>
        <View style={styles.block}>
          <Text typo="text-md" weight={500}>
            If your deposit status shows as "Pending," your funds are currently
            being processed by the banking network. Here are the most common
            reasons for delays:
          </Text>
        </View>
        <View style={styles.block}>
          <Text typo="text-md" weight={500}>
            &bull; Banking Processing Windows: Standard bank transfers (ACH or
            SEPA) do not process on weekends or public holidays. They can take 1
            to 3 business days to clear.
          </Text>
          <Text typo="text-md" weight={500}>
            &bull; Security Checks: Our fraud prevention system flags unusually
            large or rapid top-ups for manual review to protect your funds.
          </Text>
          <Text typo="text-md" weight={500}>
            &bull; Mismatched Account Names: If the name on your bank account or
            card does not exactly match the legal name on your verified account,
            the deposit will hang until verified or refunded.
          </Text>
          <Text typo="text-md" weight={500}>
            &bull; 3D Secure Timeout: If using a credit/debit card, the
            transaction might be stuck if the bank's security verification
            window (SMS OTP prompt) was closed too early.
          </Text>
        </View>
      </View>
    ),
  },
  {
    id: '4',
    title: 'Account security tips',
    content: (
      <View style={styles.container}>
        <View style={styles.block}>
          <Text typo="text-md" weight={500}>
            Protecting your assets is our top priority. We highly recommend
            turning on these security layers immediately:
          </Text>
        </View>
        <View style={styles.block}>
          <Text typo="text-md" weight={500}>
            &bull; Enable Two-Factor Authentication (2FA): Do not rely on
            passwords alone. Link a mobile authenticator app (like Google
            Authenticator or Microsoft Authenticator) to generate secure login
            codes.
          </Text>
          <Text typo="text-md" weight={500}>
            &bull; Turn on Biometrics: Enable FaceID or Fingerprint login within
            the app settings to stop anyone from opening your app if your phone
            is unlocked.
          </Text>
          <Text typo="text-md" weight={500}>
            &bull; Watch out for Phishing: Our team will never ask you for your
            password, recovery phrases, or 2FA codes via email, text, or social
            media.
          </Text>
          <Text typo="text-md" weight={500}>
            &bull; Use a Unique Password: Do not recycle passwords used on other
            websites. Use a trusted password manager to generate a complex
            string.
          </Text>
          <Text typo="text-md" weight={500}>
            &bull; Monitor Session History: Periodically check your Settings{' '}
            {'>'} Active Sessions to review connected devices. Instantly log out
            of any unfamiliar hardware.
          </Text>
        </View>
      </View>
    ),
  },
];
