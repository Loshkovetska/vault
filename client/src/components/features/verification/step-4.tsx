import { Selfie } from '@/assets/icons/selfie';
import { Text } from '@/components/ui/text';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

const styles = StyleSheet.create(() => ({
  block: {
    paddingHorizontal: 16,
    gap: 64,
    paddingVertical: 24,
  },
  icon: { alignSelf: 'center' },
  sub: { gap: 16 },
}));

export function Step4() {
  return (
    <View style={styles.block}>
      <Text typo="display-xs" textAlign="center" weight={600}>
        Take a selfie to verify identity
      </Text>
      <Selfie style={styles.icon} />
      <View style={styles.sub}>
        <Text typo="text-lg" weight={500}>
          &bull; Remove glasses & mask
        </Text>
        <Text typo="text-lg" weight={500}>
          &bull; Face clearly visible
        </Text>
      </View>
    </View>
  );
}
