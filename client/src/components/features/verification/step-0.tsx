import { Text } from '@/components/ui/text';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

const styles = StyleSheet.create({
  step0: {
    paddingVertical: 28,
    paddingHorizontal: 16,
    gap: 64,
  },
});

export function Step0() {
  return (
    <View style={styles.step0}>
      <View>
        <Text typo="display-xs" weight={600} textAlign="center">
          🛡️ Secure Verification
        </Text>
        <Text typo="display-xs" weight={600} textAlign="center">
          Complete your identity check to unlock all vaulta features.{' '}
        </Text>
      </View>
      <View>
        <Text typo="text-xl" weight={500}>
          &bull; Secure & encrypted process
        </Text>
        <Text typo="text-xl" weight={500}>
          &bull; Takes less than 3 minutes
        </Text>
        <Text typo="text-xl" weight={500}>
          &bull; Required by regulations
        </Text>
      </View>
    </View>
  );
}
