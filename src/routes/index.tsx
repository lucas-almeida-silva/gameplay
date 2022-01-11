import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';

import { Background } from '../components/Background';
import { AuthRoutes } from './auth.routes';

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
  },
};

export function Routes() {
  return (
    <Background>
      <NavigationContainer theme={navTheme}>
        <AuthRoutes />
      </NavigationContainer>
    </Background>
  );
}