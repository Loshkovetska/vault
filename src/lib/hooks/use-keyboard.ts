import { useEffect, useState } from 'react';
import { Keyboard } from 'react-native';

export function useKeyboard() {
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    Keyboard.addListener('keyboardWillShow', () => setVisible(true));
    Keyboard.addListener('keyboardWillHide', () => setVisible(false));

    return () => {
      Keyboard.removeAllListeners('keyboardWillShow');
      Keyboard.removeAllListeners('keyboardWillHide');
    };
  }, []);
  return isVisible;
}
