import { HeaderDetails } from '@/components/common/header-details';
import { Layout } from '@/components/common/layout';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select';
import { documents } from '@/lib/constants/documents';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { RouteProp } from '@react-navigation/native';
import { RootParams } from '../type';
import { useNavigate } from '@/lib/hooks/use-navigate';

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
});

export function LegacyScreen({
  route: { params },
}: {
  route: RouteProp<RootParams, 'Legacy'>;
}) {
  const { navigation } = useNavigate();
  const currentDocument = documents.find(doc => doc.id === params?.id);
  return (
    <>
      <HeaderDetails position="left" title="Legacy Information" />
      <Layout>
        <View style={styles.container}>
          <Select
            value={params?.id}
            onValueChange={e => navigation.setParams({ id: e })}
          >
            <SelectTrigger>
              {currentDocument?.title ?? 'Select Document'}
            </SelectTrigger>
            <SelectContent>
              <SelectItem id="privacy">Privacy Policy</SelectItem>
              <SelectItem id="terms">Terms & Conditions</SelectItem>
            </SelectContent>
          </Select>
          {currentDocument?.content}
        </View>
      </Layout>
    </>
  );
}
