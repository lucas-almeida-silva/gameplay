import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import * as AuthSession from 'expo-auth-session';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { api } from '../services/api';
import { COLLECTION_USERS } from '../configs/database';

import { discordAuth } from '../configs/discordAuth';

type User = {
  id: string;
  username: string;
  firstName: string;
  avatar: string;
  email: string;
  token: string;
}

type AuthContextData = {
  user: User;
  isLoading: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

type AuthProviderProps = {
  children: ReactNode;
}

type AuthorizationResponse = AuthSession.AuthSessionResult & {
  params: {
    access_token?: string;
    error?: string;
  }
}

export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User);
  const [isLoading, setIsLoading] = useState(false);

  async function signIn() {
    const { CLIENT_ID, REDIRECT_URI, RESPONSE_TYPE, SCOPE, CDN_IMAGE } = discordAuth

    try {
      setIsLoading(true);

      const authUrl = `${api.defaults.baseURL}/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

      const { type, params } = await AuthSession
        .startAsync({ authUrl }) as AuthorizationResponse;

      if(type === 'success' && !params.error) {
        api.defaults.headers.common.authorization = `Bearer ${params.access_token}`;

        const { data: userInfo} = await api.get('/users/@me');
        
        const firstName = userInfo.username.split(' ')[0];
        userInfo.avatar = `${CDN_IMAGE}/avatars/${userInfo.id}/${userInfo.avatar}.png`;

        const userData = {
          ...userInfo,
          firstName,
          token: params.access_token
        }

        await AsyncStorage.setItem(COLLECTION_USERS, JSON.stringify(userData));
        
        setUser(userData);
      }
    } catch(error) {
      throw new Error('Não foi possível autenticar');
    } finally {
      setIsLoading(false);
    }
  }

  async function signOut() {
    setUser({} as User);
    await AsyncStorage.removeItem(COLLECTION_USERS);
  }

  async function loadUserStorageData() {
    const storage = await AsyncStorage.getItem(COLLECTION_USERS);

    if(storage) {
      const userLogged = JSON.parse(storage) as User;

      api.defaults.headers.common.authorization = `Bearer ${userLogged.token}`;

      setUser(userLogged);
    }
  }

  useEffect(() => {
    loadUserStorageData();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { 
  AuthProvider,
  useAuth,
}