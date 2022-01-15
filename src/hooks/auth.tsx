import React, { createContext, ReactNode, useContext, useState } from 'react';
import * as AuthSession from 'expo-auth-session';

import { 
  SCOPE, 
  CLIENT_ID,
  CDN_IMAGE, 
  REDIRECT_URI, 
  RESPONSE_TYPE 
} from '../configs';
import { api } from '../services/api';

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
}

type AuthProviderProps = {
  children: ReactNode;
}

type AuthorizationResponse = AuthSession.AuthSessionResult & {
  params: {
    access_token: string;
  }
}

export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User);
  const [isLoading, setIsLoading] = useState(false);

  async function signIn() {
    try {
      setIsLoading(true);

      const authUrl = `${api.defaults.baseURL}/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

      const { type, params } = await AuthSession
        .startAsync({ authUrl }) as AuthorizationResponse;

      if(type === 'success') {
        api.defaults.headers.common.authorization = `Bearer ${params.access_token}`;

        const { data: userInfo} = await api.get('/users/@me');
        
        const firstName = userInfo.username.split(' ')[0];
        userInfo.avatar = `${CDN_IMAGE}/avatars/${userInfo.id}/${userInfo.avatar}.png`;
        
        setUser({
          ...userInfo,
          firstName,
          token: params.access_token
        });
      }
    } catch(error) {
      throw new Error('Não foi possível autenticar');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn }}>
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