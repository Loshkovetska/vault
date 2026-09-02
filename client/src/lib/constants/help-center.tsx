import { Text } from '@/components/ui/text';
import React from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import Video from 'react-native-video';
import { screenWidth } from '../utils/device';

type HelpCenterItem = { id: string; title: string; content: React.ReactNode };

const styles = StyleSheet.create({
  container: {
    gap: 16,
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  video: {
    width: screenWidth - 32,
    height: screenWidth * 0.6,
    borderRadius: 16,
    overflow: 'hidden',
  },
});

export const helpCenterItems: HelpCenterItem[] = [
  {
    id: '1',
    title: 'Getting Started',
    content: (
      <View style={styles.container}>
        <Text typo="display-xs" weight={600}>
          Welcome to your new digital wallet! Get up and running in less than 5
          minutes.
        </Text>
        <Text typo="text-md" weight={500}>
          &bull; Create Account: Download the app, enter your email, and choose
          a secure 6-digit PIN.
        </Text>
        <Text typo="text-md" weight={500}>
          &bull; Verify Identity: Upload a government ID to unlock full
          transaction capabilities.
        </Text>
        <Text typo="text-md" weight={500}>
          &bull; Link Bank Card: Go to Wallet {'>'} Add Payment Method to
          connect your debit or credit card instantly.
        </Text>
        <Text typo="text-md" weight={500}>
          &bull; First Top-Up: Tap Top Up, select your linked card, and load
          your first balance.
        </Text>
        <Video
          source={{ uri: 'https://www.pexels.com/download/video/7255101/' }}
          style={styles.video}
          controls={false}
        />
      </View>
    ),
  },
  {
    id: '2',
    title: 'Payment Help',
    content: (
      <View style={styles.container}>
        <Text typo="display-xs" weight={600}>
          Need assistance with moving money? Find quick fixes for common
          transaction problems.
        </Text>
        <Text typo="text-md" weight={500}>
          &bull; Transaction Declined: Double-check your daily spending limits
          and confirm your card hasn't expired.
        </Text>
        <Text typo="text-md" weight={500}>
          &bull; Wrong Recipient: Peer-to-peer (P2P) transfers are instant and
          final. Contact support immediately to flag errors.
        </Text>
        <Text typo="text-md" weight={500}>
          &bull; Hidden Fees: We never hide costs. Standard bank transfers are
          free, while card top-ups carry a flat 1.5% processing fee.
        </Text>
        <Text typo="text-md" weight={500}>
          &bull; Refund Timelines: Card refunds take 3 to 5 business days
          depending on your bank's processing cycles.
        </Text>
      </View>
    ),
  },
  {
    id: '3',
    title: 'Security & Privacy',
    content: (
      <View style={styles.container}>
        <Text typo="display-xs" weight={600}>
          Your data and funds are fully protected. Manage your privacy settings
          below.
        </Text>
        <Text typo="text-md" weight={500}>
          &bull; Two-Factor Authentication: Turn on 2FA in Settings {'>'}{' '}
          Security to secure your account with an authenticator app.
        </Text>
        <Text typo="text-md" weight={500}>
          &bull; Biometric Login: Enable Face ID or Fingerprint scanning to keep
          snoopers out of your wallet interface.
        </Text>
        <Text typo="text-md" weight={500}>
          &bull; Data Protection: We encrypt your personal details using
          bank-grade AES-256 protocols and never sell user data.
        </Text>
        <Text typo="text-md" weight={500}>
          &bull; Freeze Card: If you lose your linked virtual card, tap Freeze
          in the card tab to block unauthorized usage instantly.
        </Text>
      </View>
    ),
  },
  {
    id: '4',
    title: 'Technical Issues',
    content: (
      <View style={styles.container}>
        <Text typo="display-xs" weight={600}>
          App acting up? Try these quick self-troubleshooting steps before
          contacting engineering.
        </Text>
        <Text typo="text-md" weight={500}>
          &bull; App Freezing: Force-close the application and clear your
          device's cache folder.
        </Text>
        <Text typo="text-md" weight={500}>
          &bull; Push Notifications: Ensure notification permissions are enabled
          in your device's central system settings.
        </Text>
        <Text typo="text-md" weight={500}>
          &bull; Biometrics Broken: If Face ID fails, log in with your primary
          6-digit PIN to reset biometric configurations.
        </Text>
        <Text typo="text-md" weight={500}>
          &bull; Outdated Version: Check the App Store or Google Play Store to
          ensure you are running the latest app patch.
        </Text>
      </View>
    ),
  },
];
