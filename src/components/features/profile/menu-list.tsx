import { Text } from '@/components/ui/text';
import { menuItems } from '@/lib/constants/menu';
import { useNavigate } from '@/lib/hooks/use-navigate';
import { themeConfig } from '@/lib/theme';
import { LiquidGlassView } from '@callstack/liquid-glass';
import { AltArrowRight } from '@solar-icons/react-native/Linear';
import { TouchableOpacity, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

const styles = StyleSheet.create(theme => ({
  listWrapper: {
    paddingHorizontal: 16,
    paddingTop: 32,
  },
  list: {
    padding: 16,
    borderRadius: 28,
    gap: 24,
  },
  section: {
    gap: 12,
  },
  item: {
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    alignItems: 'center',
  },
  item_left: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
  },
  item_last: {
    borderColor: theme.colors['gray-300'],
    borderBottomWidth: 1,
  },
}));

export function MenuList() {
  const { goToScreen } = useNavigate();
  return (
    <View style={styles.listWrapper}>
      <LiquidGlassView style={styles.list} effect="clear">
        {menuItems.map(section => (
          <View key={section.section} style={styles.section}>
            <Text
              typo="label-md"
              color={section.main ? 'gray-300' : 'gray-900'}
              weight={500}
            >
              {section.section}
            </Text>
            <View>
              {section.list.map((item, idx) => (
                <TouchableOpacity
                  key={item.title}
                  style={[
                    styles.item,
                    ...((idx + 1 === section.list.length && section.main) ||
                    (!section.main && idx + 1 !== section.list.length)
                      ? [styles.item_last]
                      : []),
                  ]}
                  onPress={() => goToScreen(item.link as 'Onboarding')}
                >
                  <View style={styles.item_left}>
                    <item.Icon
                      color={themeConfig.colors['gray-900']}
                      size={20}
                    />
                    <Text typo="label-md" weight={500}>
                      {item.title}
                    </Text>
                  </View>
                  {section.main && (
                    <AltArrowRight color={themeConfig.colors['gray-900']} />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}
      </LiquidGlassView>
    </View>
  );
}
