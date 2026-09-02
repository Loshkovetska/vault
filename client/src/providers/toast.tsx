import { toastConfig } from '@/lib/theme/toast';
import Toast from 'react-native-toast-message';

export function ToastProvider() {
  return <Toast config={toastConfig(16)} />;
}
