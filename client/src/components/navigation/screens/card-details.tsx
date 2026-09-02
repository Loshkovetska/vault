import { CardDetailsTabsScreens } from '../type';
import { RouteProp, useIsFocused } from '@react-navigation/native';
import { CardHistory } from '@/components/features/card/history';
import { CardActivity } from '@/components/features/card/activity';

export function CardDetails({
  route: { name },
}: {
  route: RouteProp<CardDetailsTabsScreens, 'Activity' | 'History'>;
}) {
  const isFocused = useIsFocused();

  if (isFocused && name === 'History') {
    return <CardHistory />;
  }

  return <CardActivity />;
}
