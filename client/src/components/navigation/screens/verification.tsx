import { ActionButton } from '@/components/common/action-button';
import { HeaderDetails } from '@/components/common/header-details';
import { Layout } from '@/components/common/layout';
import { Step0 } from '@/components/features/verification/step-0';
import { Step1 } from '@/components/features/verification/step-1';
import { Step2 } from '@/components/features/verification/step-2';
import { Step3 } from '@/components/features/verification/step-3';
import { Step4 } from '@/components/features/verification/step-4';
import { Step5 } from '@/components/features/verification/step-5';
import { Step6 } from '@/components/features/verification/step-6';
import { useNavigate } from '@/lib/hooks/use-navigate';
import { useVerifyMutation } from '@/lib/store/users';
import { UserVerification } from '@/lib/types/user';
import { useAuth } from '@/providers/auth-session';
import { useCallback, useState } from 'react';

const initialValues = {
  document_type: null,
  document: null,
  selfie: null,
};
export function VerificationScreen() {
  const { currentUser } = useAuth();

  const [verify] = useVerifyMutation();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<UserVerification>(initialValues);

  const { goHome } = useNavigate(() => {
    setData(initialValues);
    setStep(0);
  });

  const onStep = useCallback((num: number) => setStep(prev => prev + num), []);
  const onDocumentTypeChange = useCallback(
    (v: string) =>
      setData(prev => ({
        ...prev,
        document_type: v as UserVerification['document_type'],
      })),
    [],
  );

  const onChange = useCallback(
    (k: keyof typeof data) => (v: any) =>
      setData(prev => ({ ...prev, [k]: v })),
    [],
  );

  const onSubmit = useCallback(() => {
    verify([currentUser?.id ?? '', data]).then(() => {
      goHome();
    });
  }, [currentUser, data, verify, goHome]);

  const titles = {
    0: 'Identity Verification',
    1: 'Prepare Your ID',
    2: 'Choose Document',
    3: 'Upload Document',
    4: 'Selfie Check',
    5: 'Capture Selfie',
    6: 'Verification in Progress',
  };
  const btns = {
    0: 'Start Verification',
    1: 'Continue',
    2: 'Continue',
    3: 'Continue',
    4: 'Capture Selfie',
    6: 'Done',
  };
  const content = {
    0: <Step0 />,
    1: <Step1 />,
    2: (
      <Step2
        document_type={data.document_type ?? ''}
        onDocumentTypeChange={onDocumentTypeChange}
      />
    ),
    3: (
      <Step3 document={data.document} onDocumentChange={onChange('document')} />
    ),
    4: <Step4 />,
    5: (
      <Step5
        selfie={data.selfie ?? ''}
        onSelfieChange={onChange('selfie')}
        onNext={() => onStep(1)}
      />
    ),
    6: <Step6 />,
  };

  const isValid = {
    0: true,
    1: true,
    2: !!data.document_type,
    3: !!data.document,
    4: true,
    5: true,
    6: true,
  };
  return (
    <>
      <HeaderDetails
        onBack={!step ? undefined : () => onStep(-1)}
        title={titles[step as 0]}
        position="left"
      />
      <Layout>{content[step as 0]}</Layout>
      <ActionButton
        text="We keep your data private & safe"
        onPress={step === 6 ? onSubmit : () => onStep(1)}
        disabled={!isValid[step as 0]}
      >
        {btns[step as 0]}
      </ActionButton>
    </>
  );
}
