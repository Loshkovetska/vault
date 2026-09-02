import { HeaderDetails } from '@/components/common/header-details';
import { Layout } from '@/components/common/layout';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Text } from '@/components/ui/text';
import { faqList } from '@/lib/constants/faqs';
import { themeConfig } from '@/lib/theme';
import { AltArrowRight, Magnifier } from '@solar-icons/react-native/Linear';
import { Fragment, useCallback, useMemo, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    paddingHorizontal: 16,
    gap: 24,
  },
  list: {
    gap: 12,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    justifyContent: 'space-between',
  },
});

export function FAQScreen() {
  const [faqId, setFaqId] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const onBack = useCallback(() => {
    setFaqId(null);
  }, []);

  const list = useMemo(
    () =>
      faqList.filter(c =>
        c.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()),
      ),
    [search],
  );

  const currentFaq = faqList.find(faq => faq.id === faqId);
  return (
    <>
      <HeaderDetails
        onBack={currentFaq?.title ? onBack : undefined}
        title={currentFaq?.title ?? 'FAQ'}
        position="left"
      />
      <Layout>
        <View style={styles.container}>
          {faqId ? (
            currentFaq?.content
          ) : (
            <>
              <Input
                value={search}
                iconLeft={
                  <Magnifier size={24} color={themeConfig.colors['gray-900']} />
                }
                placeholder="Search FAQ"
                onChangeText={setSearch}
              />
              <View style={styles.list}>
                {list.map((faq, idx) => (
                  <Fragment key={faq.id}>
                    <TouchableOpacity
                      style={styles.btn}
                      onPress={() => setFaqId(faq.id)}
                    >
                      <Text typo="text-md">Q: {faq.title}</Text>
                      <AltArrowRight
                        size={24}
                        color={themeConfig.colors['gray-900']}
                      />
                    </TouchableOpacity>
                    {idx + 1 !== list.length && <Separator />}
                  </Fragment>
                ))}
              </View>
            </>
          )}
        </View>
      </Layout>
    </>
  );
}
