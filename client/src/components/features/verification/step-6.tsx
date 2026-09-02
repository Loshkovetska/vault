import { Text } from '@/components/ui/text';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

const styles = StyleSheet.create(() => ({
  block: {
    paddingHorizontal: 16,
    gap: 64,
    paddingVertical: 24,
  },
  sub: { gap: 12 },
}));

export function Step6() {
  return (
    <View style={styles.block}>
      <View>
        <Text typo="display-xs" textAlign="center" weight={600}>
          🔄 Verifying Data
        </Text>
        <Text typo="display-xs" textAlign="center" weight={600}>
          We’re checking your information
        </Text>
        <Text typo="display-xs" textAlign="center" weight={600}>
          This may take a few moments.
        </Text>
      </View>
      <View style={styles.sub}>
        <Text typo="text-xl" weight={500}>
          Status: In Review
        </Text>
        <Text typo="text-xl" weight={500}>
          You’ll be notified once done.
        </Text>
      </View>
    </View>
  );
}
