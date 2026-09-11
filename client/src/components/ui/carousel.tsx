import { useCallback, useState } from 'react';
import { FlatList, ListRenderItem, View, ViewToken } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

type CarouselProps<T> = {
  data: T[];
  testID?: string;
  renderItem: ListRenderItem<T>;
};

const styles = StyleSheet.create(theme => ({
  container: {
    gap: 8,
  },
  dots: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors['gray-600'],
  },
  dot_active: {
    backgroundColor: theme.colors['brand-400'],
  },
}));

export function Carousel<T>({ data, testID, renderItem }: CarouselProps<T>) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const onViewChange = useCallback(
    (info: { viewableItems: ViewToken<T>[]; changed: ViewToken<T>[] }) => {
      setCurrentSlide(info.changed?.[0]?.index ?? 0);
    },
    [],
  );
  return (
    <View style={styles.container}>
      <FlatList
        testID={testID}
        keyExtractor={(_, index) => `carousel-${index}`}
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        pagingEnabled
        onViewableItemsChanged={onViewChange}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 100,
        }}
      />
      <View style={styles.dots}>
        {data.map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              i === currentSlide ? styles.dot_active : undefined,
            ]}
          />
        ))}
      </View>
    </View>
  );
}
