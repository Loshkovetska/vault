import { GlassButton } from '@/components/ui/glass-button';
import { Text } from '@/components/ui/text';
import { themeConfig } from '@/lib/theme';
import { expireFormate } from '@/lib/utils/date';
import { screenWidth } from '@/lib/utils/device';
import { Settings } from '@solar-icons/react-native/Linear';
import { ImageBackground, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

const styles = StyleSheet.create(() => ({
  container: {
    width: '100%',
    paddingTop: 24,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: screenWidth - 72,
    height: screenWidth * 0.5,
    borderRadius: 16,
    overflow: 'hidden',
  },
  content: {
    width: '100%',
    height: '100%',
    paddingVertical: 32,
    paddingHorizontal: 24,
    paddingTop: 70,
    justifyContent: 'space-between',
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  col: {
    gap: 2,
  },
  balance: {
    flexDirection: 'row',
    gap: 16,
    paddingVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settings: { position: 'absolute', top: 12, right: 20 },
}));

export type CardPreviewProps = {
  holder: string;
  expired_at: string;
  card_number: string;
  onPress: () => void;
};

export function CardPreview({
  holder,
  expired_at,
  card_number,
  onPress,
}: CardPreviewProps) {
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.image}
        source={require('@/assets/images/card-vector.png')}
      >
        <View style={styles.content}>
          <View style={styles.row}>
            <Text typo="display-md">{card_number}</Text>
          </View>
          <View style={styles.row}>
            <View style={styles.col}>
              <Text typo="text-xxs">Card Holder Name</Text>
              <Text typo="text-lg" weight={600}>
                {holder}
              </Text>
            </View>
            <View style={styles.col}>
              <Text typo="text-xxs">Expire Date</Text>
              <Text typo="text-lg" weight={600}>
                {expireFormate(new Date(expired_at ?? 0))}
              </Text>
            </View>
          </View>
        </View>
      </ImageBackground>
      <GlassButton
        size="circle_xs"
        rounded="full"
        wrapperStyle={styles.settings}
        onPress={onPress}
        iconLeft={<Settings size={20} color={themeConfig.colors['gray-900']} />}
      />
    </View>
  );
}
