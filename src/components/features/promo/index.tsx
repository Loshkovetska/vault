import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Promo, PromoType } from '@/lib/types/promo';
import { periodFormate } from '@/lib/utils/date';
import { screenWidth } from '@/lib/utils/device';
import { percentageFormate } from '@/lib/utils/number';
import { ImageBackground, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import LinearGradient from 'react-native-linear-gradient';

const styles = StyleSheet.create(() => ({
  carousel: {
    width: screenWidth - 32,
    height: screenWidth * 0.6,
    borderRadius: 16,
    overflow: 'hidden',
  },
  container: {
    width: '100%',
    height: screenWidth * 0.6,
    borderRadius: 16,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  content: {
    paddingLeft: 24,
    paddingRight: 12,
    paddingTop: 12,
    paddingBottom: 16,
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
  },
  info: {
    alignItems: 'center',
    maxWidth: 208,
  },
  infoTop: {
    alignItems: 'center',
    gap: 8,
  },
  gradient: { width: '100%' },
  date: {
    marginTop: 4,
  },
  terms: { marginTop: 10 },
  btn: { alignSelf: 'flex-end' },
}));

export function PromoItem({
  promo,
  carousel,
  onPress,
}: {
  promo: Promo;
  carousel?: boolean;
  onPress: () => void;
}) {
  const titles: Record<PromoType, string> = {
    discount: 'Discount up to',
    cashback: 'Cashback of',
    saving: 'Save on',
  };
  return (
    <ImageBackground
      style={styles[carousel ? 'carousel' : 'container']}
      source={{ uri: promo.image_url }}
    >
      <LinearGradient
        colors={['transparent', '#000000']}
        style={styles.gradient}
        useAngle
        angle={-90}
      >
        <View style={styles.content}>
          <View style={styles.info}>
            <View style={styles.infoTop}>
              <Text textAlign="center" typo="text-lg">
                {titles[promo.type]}
              </Text>
              <Text textAlign="center" typo="display-lg" weight={600}>
                {percentageFormate(promo.amount)}
              </Text>
              <Text textAlign="center" typo="text-lg">
                {promo.short_info}
              </Text>
            </View>
            <Text style={styles.date} textAlign="center" typo="text-md">
              {periodFormate(promo.created_at, promo.expired_at)}
            </Text>
            <Text style={styles.terms} textAlign="center" typo="text-sm">
              Term of Condition
            </Text>
          </View>
          <Button style={styles.btn} onPress={onPress}>
            See Details
          </Button>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
}
