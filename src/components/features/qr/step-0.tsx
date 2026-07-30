import { themeConfig } from '@/lib/theme';
import { MerchantInfo } from '@/lib/types/transaction';
import { decodePaymentQR } from '@/lib/utils/string';
import { Camera } from 'react-native-camera-kit';

export function Step0({ onSet }: { onSet: (v: MerchantInfo) => void }) {
  return (
    <Camera
      scanBarcode
      style={{ flex: 1, width: '100%' }}
      onReadCode={event =>
        onSet(decodePaymentQR(event.nativeEvent.codeStringValue))
      }
      showFrame
      barcodeFrameSize={{ width: 150, height: 150 }}
      laserColor={themeConfig.colors['brand-400']}
      frameColor={themeConfig.colors['brand-400']}
    />
  );
}
