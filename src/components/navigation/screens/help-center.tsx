import { HeaderDetails } from '@/components/common/header-details';
import { Layout } from '@/components/common/layout';
import { Text } from '@/components/ui/text';
import { helpCenterItems } from '@/lib/constants/help-center';
import { themeConfig } from '@/lib/theme';
import { AltArrowRight } from '@solar-icons/react-native/Linear';
import { useCallback, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

const styles = StyleSheet.create({
  container: { paddingVertical: 24, paddingHorizontal: 16, gap: 16 },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    justifyContent: 'space-between',
  },
});

export function HelpCenterScreen() {
  const [itemId, setItemId] = useState<null | string>(null);
  const onBack = useCallback(() => setItemId(null), []);

  const currentItem = helpCenterItems.find(item => item.id === itemId);
  return (
    <>
      <HeaderDetails
        position="left"
        onBack={currentItem ? onBack : undefined}
        title={currentItem?.title ?? 'Help Center'}
      />
      <Layout>
        {itemId ? (
          currentItem?.content
        ) : (
          <View style={styles.container}>
            {helpCenterItems.map(item => (
              <TouchableOpacity
                style={styles.btn}
                key={item.id}
                onPress={() => setItemId(item.id)}
              >
                <Text typo="text-md">{item.title}</Text>
                <AltArrowRight
                  size={24}
                  color={themeConfig.colors['gray-900']}
                />
              </TouchableOpacity>
            ))}
          </View>
        )}
      </Layout>
    </>
  );
}
