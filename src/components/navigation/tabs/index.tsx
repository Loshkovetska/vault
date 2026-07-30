import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';
import {
  ArrowLeft,
  Chart,
  ClockCircle,
} from '@solar-icons/react-native/Linear';
import { Animated, LayoutChangeEvent, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native-unistyles';
import { themeConfig } from '@/lib/theme';
import { Button } from '@/components/ui/button';
import { useCallback, useEffect, useRef, useState } from 'react';
import { LiquidGlassView } from '@callstack/liquid-glass';

const styles = StyleSheet.create(theme => ({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 24,
    paddingHorizontal: 16,
    paddingBottom: 16,
    width: '100%',
  },
  container: {
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors['brand-500'],
    borderRadius: 100,
    padding: 6,
    maxWidth: '70%',
  },
  icon: {
    color: theme.colors['gray-900'],
  },
  btn_default: {
    paddingHorizontal: 0,
    paddingVertical: 8,
    gap: 8,
    width: '100%',
    justifyContent: 'center',
  },
  mock_btn: { opacity: 0, width: 24, height: 24 },
  liquid: {
    position: 'absolute',
    top: 6,
    left: 6,
    borderRadius: 100,
  },
  liquid_inner: { borderRadius: 100 },
}));

export function CardDetailsTabsView({
  state,
  descriptors,
  navigation,
}: MaterialTopTabBarProps) {
  const translateAnim = useRef(new Animated.Value(0)).current;
  const [itemDs, setItemDs] = useState({ width: 0, height: 0 });
  const insets = useSafeAreaInsets();

  const onLayout = useCallback((e: LayoutChangeEvent) => {
    const layout = e.nativeEvent.layout;
    setItemDs({ width: layout.width, height: layout.height });
  }, []);

  useEffect(() => {
    Animated.timing(translateAnim, {
      toValue: state.index * itemDs.width,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [state.index, translateAnim, itemDs]);
  return (
    <View style={[styles.wrapper, { paddingTop: insets.top }]}>
      <Button
        variant="text"
        iconLeft={<ArrowLeft size={24} color={styles.icon.color} />}
        onPress={() => navigation.goBack()}
      />
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.liquid,
            itemDs,
            {
              transform: [{ translateX: translateAnim }],
            },
          ]}
        >
          <LiquidGlassView
            effect="clear"
            style={[styles.liquid_inner, itemDs]}
          />
        </Animated.View>

        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          const Icon = route.name === 'History' ? ClockCircle : Chart;

          const commonProps = {
            'aria-label': options.tabBarAccessibilityLabel,
            'aria-selected': isFocused,
            testID: options.tabBarButtonTestID,
            onPress,
            onLongPress,
            iconLeft: <Icon size={20} color={themeConfig.colors['gray-900']} />,
          };

          return (
            <Button
              key={route.key}
              typo="text-lg"
              variant="text"
              style={{ flex: 1 / 2, zIndex: 1 }}
              innerStyle={styles.btn_default}
              onLayout={onLayout}
              {...commonProps}
            >
              {route.name}
            </Button>
          );
        })}
      </View>
      <View style={styles.mock_btn} />
    </View>
  );
}
