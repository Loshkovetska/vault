import { RootStack } from '@/components/navigation/root';

declare module '*.png' {
  import { ImageSourcePropType } from 'react-native';
  const value: ImageSourcePropType;
  export default value;
}

declare module '*.jpg' {
  import { ImageSourcePropType } from 'react-native';
  const value: ImageSourcePropType;
  export default value;
}

declare module '*.jpeg' {
  import { ImageSourcePropType } from 'react-native';
  const value: ImageSourcePropType;
  export default value;
}

declare module '*.svg' {
  import React from 'react';
  import { SvgProps } from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}

export type RootStackType = ReturnType<typeof RootStack>;

declare module '@react-navigation/native' {
  interface RootNavigator extends RootStackType {}
}

declare module 'react-native-config' {
  export interface NativeConfig {
    FIREBASE_APP_ID: string;
    FIREBASE_PROJECT_ID: string;
    FIREBASE_APIKEY: string;
    FIREBASE_DB: string;
    FIREBASE_SENDER_ID: string;
    FIREBASE_STORAGE: string;
  }
}
