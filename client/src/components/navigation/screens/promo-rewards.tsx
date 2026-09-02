import { EmptyList } from '@/components/common/empty-list';
import { Header } from '@/components/common/header';
import { Placeholder } from '@/components/common/placeholder';
import { PromoItem } from '@/components/features/promo';
import { emptyLists } from '@/lib/constants/empty-lists';
import { useNavigate } from '@/lib/hooks/use-navigate';
import { useGetPromosQuery } from '@/lib/store/promos';
import { Promo } from '@/lib/types/promo';
import { useAuth } from '@/providers/auth-session';
import { useCallback } from 'react';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItemInfo,
  View,
} from 'react-native';

export function PromoRewardsScreen() {
  const { currentUser } = useAuth();
  const {
    data: promos,
    isLoading,
    isFetching,
    refetch,
  } = useGetPromosQuery(currentUser?.id ?? '', {
    skip: !currentUser,
  });
  const { goToPromo } = useNavigate();
  const renderItem = useCallback(
    ({ item, index }: ListRenderItemInfo<Promo>) => {
      return (
        <View
          style={{
            paddingTop: !index ? 12 : 20,
            paddingHorizontal: 16,
          }}
        >
          <PromoItem
            promo={item}
            key={item.id}
            onPress={() => goToPromo(item.id)}
          />
        </View>
      );
    },
    [goToPromo],
  );

  const emptyList = emptyLists['promo'];
  return (
    <>
      <Header title="Promo & Rewards" notification={false} />

      <FlatList
        keyExtractor={item => item.id}
        onRefresh={refetch}
        refreshing={!isLoading && isFetching}
        refreshControl={
          !isLoading && isFetching ? (
            <View style={{ paddingBottom: 16 }}>
              <ActivityIndicator size="small" />
            </View>
          ) : undefined
        }
        data={promos}
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        ListEmptyComponent={
          isLoading ? <Placeholder /> : <EmptyList {...emptyList} />
        }
      />
    </>
  );
}
