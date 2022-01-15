import React from 'react';
import { View, Text, Image, Alert, ActivityIndicator } from 'react-native';

import { useAuth } from '../../hooks/auth';

import { ButtonIcon } from '../../components/ButtonIcon';
import { Background } from '../../components/Background';

import illustrationImg from '../../assets/illustration.png';
import { styles } from './styles';
import { theme } from '../../global/styles/theme';

export function SignIn() {
  const { user, signIn, isLoading } = useAuth();

  async function handleSignIn() {
    try {
      await signIn();
    } catch (error: any) {
      Alert.alert(error);
    }
  }

  return (
    <Background>
      <View style={styles.container}>
        <Image
          source={illustrationImg}
          style={styles.image}
          resizeMode="stretch"
        />

        <View style={styles.content}>
          <Text style={styles.title}>
            Conecte-se {'\n'}
            e organize {'\n'}
            suas jogatinas
          </Text>

          <Text style={styles.subtitle}>
            Crie grupos para jogar seus games {'\n'}
            favoritos com seus amigos
          </Text>

          {
            isLoading ? (
              <ActivityIndicator color={theme.colors.primary} />
            ) : (
              <ButtonIcon
                title="Entrar com Discord"
                onPress={handleSignIn}
              />
            )
          }
        </View>
      </View>
    </Background>
  );
}