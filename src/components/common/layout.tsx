import { ScrollView } from 'react-native';

export function Layout({ children }: React.PropsWithChildren) {
  return (
    <ScrollView
      nestedScrollEnabled
      showsVerticalScrollIndicator={false}
      style={{ flex: 1 }}
      contentContainerStyle={{
        paddingBottom: 120,
      }}
    >
      {children}
    </ScrollView>
  );
}
