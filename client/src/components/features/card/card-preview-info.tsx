import { View } from 'react-native';
import { CardPreview, CardPreviewProps } from '../../common/card-preview';
import { Text } from '@/components/ui/text';
import { priceFormate } from '@/lib/utils/number';

export function CardPreviewInfo({
  balance,
  ...rest
}: CardPreviewProps & { balance: number }) {
  return (
    <>
      <CardPreview {...rest} />
      <View
        style={{
          flexDirection: 'row',
          gap: 16,
          paddingVertical: 16,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text typo="display-md" textAlign="center">
          {priceFormate(balance)}
        </Text>
      </View>
    </>
  );
}
