import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';

import { theme } from '../global/styles/theme';

import { Background } from '../components/Background';
import { AuthRoutes } from './auth.routes';

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: theme.colors.secondary100,
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