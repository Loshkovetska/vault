import { HeaderDetails } from '@/components/common/header-details';
import { Step1 } from '@/components/features/qr/step-1';
import { Step0 } from '@/components/features/qr/step-0';
import { useCallback, useState } from 'react';
import { MerchantInfo } from '@/lib/types/transaction';

export function QRScreen() {
  const [step, setStep] = useState(0);
  const [merchant, setMerchant] = useState<MerchantInfo | null>(null);

  const onStep = useCallback((num: number) => setStep(prev => prev + num), []);
  const onSetMerchant = useCallback(
    (v: MerchantInfo) => {
      setMerchant(v);
      onStep(1);
    },
    [onStep],
  );
  const steps = {
    0: <Step0 onSet={onSetMerchant} />,
    1: <Step1 merchant={merchant} />,
  };
  const titles = {
    0: 'Scan QR',
    1: 'Payment QR',
  };
  return (
    <>
      <HeaderDetails
        onBack={!step ? undefined : () => onStep(-1)}
        title={titles[step as 0]}
      />
      {steps[step as 0]}
    </>
  );
}
