import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';

import { SignIn }  from '../screens/SignIn';
import { Background } from '../components/Background';
import { AppRoutes } from './app.routes';

import { useAuth } from '../hooks/auth';
import { theme } from '../global/styles/theme';

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: theme.colors.secondary100,
  },
};

export function Routes() {
  const { user } = useAuth();

  return (
    <Background>
      <NavigationContainer theme={navTheme}>
        { user.id ? <AppRoutes /> : <SignIn /> }
      </NavigationContainer>
    </Background>
  );
}