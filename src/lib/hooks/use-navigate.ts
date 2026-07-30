import { RootParams } from '@/components/navigation/type';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useCallback, useEffect } from 'react';

export function useNavigate(onBlur?: () => void) {
  const navigation = useNavigation<NavigationProp<RootParams>>();

  const goHome = useCallback(() => {
    navigation.navigate('HomeTabs', { screen: 'Home' });
  }, [navigation]);

  const goBack = useCallback(() => {
    if (navigation.canGoBack()) {
      return navigation.goBack();
    }
    navigation.navigate('HomeTabs', { screen: 'Home' }, { pop: true });
  }, [navigation]);

  const goToActivity = useCallback(() => {
    navigation.navigate('HomeTabs', {
      screen: 'Activity',
    });
  }, [navigation]);

  const goToActivityDetails = useCallback(
    (id: string) => {
      navigation.navigate('ActivityDetails', {
        id,
      });
    },
    [navigation],
  );

  const goToTransaction = useCallback(
    (screen: 'TopUp' | 'Withdraw' | 'Bill' | 'Transfer') => {
      navigation.navigate(screen);
    },
    [navigation],
  );

  const goToPromos = useCallback(() => {
    navigation.navigate('HomeTabs', {
      screen: 'Rewards',
    });
  }, [navigation]);

  const goToPromo = useCallback(
    (id: string) => {
      navigation.navigate('PromoDetails', { id });
    },
    [navigation],
  );

  const goToCard = useCallback(() => {
    navigation.navigate('Card');
  }, [navigation]);

  const goToScreen = useCallback(
    (screen: keyof RootParams) => {
      navigation.navigate(screen as 'Onboarding');
    },
    [navigation],
  );

  const goToLegal = useCallback(
    (id: 'privacy' | 'terms') => {
      navigation.navigate('Legacy', { id });
    },
    [navigation],
  );

  const goToCardEditor = useCallback(
    (id?: string) => {
      navigation.navigate('AddCard', { id });
    },
    [navigation],
  );
  const goToAccountEditor = useCallback(
    (id?: string) => {
      navigation.navigate('AddBank', { id });
    },
    [navigation],
  );

  const goToCardDetails = useCallback(
    (id: 'History' | 'Activity') => {
      navigation.navigate('CardDetailsTabs', {
        screen: id,
      });
    },
    [navigation],
  );

  useEffect(() => {
    onBlur && navigation.addListener('blur', onBlur);
    return () => {
      onBlur && navigation.removeListener('blur', onBlur);
    };
  }, [navigation, onBlur]);

  return {
    navigation,
    goBack,
    goToActivityDetails,
    goToTransaction,
    goToActivity,
    goToPromos,
    goToPromo,
    goToCard,
    goToScreen,
    goHome,
    goToCardDetails,
    goToCardEditor,
    goToAccountEditor,
    goToLegal,
  };
}
