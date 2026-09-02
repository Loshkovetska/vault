import { store } from '@/lib/store';
import { Provider } from 'react-redux';

export function Store({ children }: React.PropsWithChildren) {
  return <Provider store={store}>{children}</Provider>;
}
