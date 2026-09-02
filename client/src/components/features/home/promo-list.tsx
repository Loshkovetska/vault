import { Carousel } from '@/components/ui/carousel';
import { Text } from '@/components/ui/text';
import { Promo } from '@/lib/types/promo';
import { useCallback } from 'react';
import { ListRenderItemInfo, TouchableOpacity, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { PromoItem } from '../promo';
import { useNavigate } from '@/lib/hooks/use-navigate';
import { useGetPromosQuery } from '@/lib/store/promos';
import { Placeholder } from '@/components/common/placeholder';

const styles = StyleSheet.create(() => ({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
}));

export function PromoList({ session_id }: { session_id: string }) {
  const { goToPromos, goToPromo } = useNavigate();
  const { data: promos, isLoading } = useGetPromosQuery(session_id, {
    skip: !session_id,
  });
  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<Promo>) => {
      return (
        <PromoItem
          carousel
          promo={item}
          key={item.id}
          onPress={() => goToPromo(item.id)}
        />
      );
    },
    [goToPromo],
  );
  if (isLoading) return <Placeholder type="promo-widget" />;
  if (!promos?.length) return null;
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text typo="text-xl" weight={600}>
          Promo & Rewards
        </Text>
        <TouchableOpacity onPress={goToPromos}>
          <Text typo="text-sm" color="brand-800">
            See all
          </Text>
        </TouchableOpacity>
      </View>
      <Carousel<Promo> data={promos ?? []} renderItem={renderItem} />
    </View>
  );
}
