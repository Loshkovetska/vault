import { Text } from '@/components/ui/text';
import { TransactionStatus } from '@/lib/types/transaction';

const statuses: Record<TransactionStatus, { title: string; color: string }> = {
  SUCCESS: {
    title: 'Success',
    color: 'success-300',
  },
  FAILED: { title: 'Failed', color: 'error-300' },
  PENDING: { title: 'Pending', color: 'warn-300' },
  PROCESSING: { title: 'Processing', color: 'brand-600' },
};

const textStyles = {
  xs: {
    typo: 'text-xs',
    weight: 500,
  },
  base: {
    typo: 'text-lg',
    weight: 500,
  },
};

type ActivityStatus = {
  size?: keyof typeof textStyles;
  status: keyof typeof TransactionStatus;
};

export function ActivityStatus({ status, size }: ActivityStatus) {
  const currentStyle = textStyles[size ?? 'base'];
  const currentStatus = statuses[status];
  return (
    <Text
      typo={currentStyle.typo as 'text-sm'}
      weight={currentStyle.weight as 500}
      color={currentStatus.color as 'error-400'}
    >
      {currentStatus.title}
    </Text>
  );
}
