import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  Alert,
  Share,
  Platform,
} from 'react-native';
import { BorderlessButton, FlatList } from 'react-native-gesture-handler';
import { Fontisto } from '@expo/vector-icons';
import * as Linking from 'expo-linking';

import { Background } from '../../components/Background';
import { Header } from '../../components/Header';
import { ListHeader } from '../../components/ListHeader';
import { ListDivider } from '../../components/ListDivider';
import { Member } from '../../components/Member';
import { ButtonIcon } from '../../components/ButtonIcon';
import { Load } from '../../components/Load';

import { styles } from './styles';
import { theme } from '../../global/styles/theme';

import bannerImg from '../../assets/banner.png';
import { useRoute } from '@react-navigation/native';
import { AppointmentProps } from '../../components/Appointment';
import { MemberProps } from '../../components/Member';

import { api } from '../../services/api';

type Params = {
  guildSelected: AppointmentProps;
}

type GuildWidget = {
  id: string;
  name: string;
  instant_invite: string;
  members: MemberProps[];
}

export function AppointmentDetails() {
  const [guildWidget, setGuildWidget] = useState<GuildWidget>({} as GuildWidget);
  const [isLoading, setIsLoading] = useState(true);

  const route = useRoute();
  const { guildSelected } = route.params as Params;

  async function fetchGuildInfo() {
    try {
      const response = await api.get(`/guilds/${guildSelected.guild.id}/widget.json`);
      setGuildWidget(response.data);
    } catch {
      Alert.alert('Verifique as configurações do servidor. Será que o Widget está habilitado?');
    } finally {
      setIsLoading(false);
    }
  }

  function handleShareInvitation() {
    const message = Platform.OS === 'ios'
      ? `Junte-se a ${guildSelected.guild.name}`
      : guildWidget.instant_invite;

    Share.share({
      message,
      url: guildWidget.instant_invite
    });
  }

  function handleOpenGuild() {
    Linking.openURL(guildWidget.instant_invite);
  }

  useEffect(() => {
    fetchGuildInfo();
  }, []);

  return (
    <Background>
      <Header
        title="Detalhes"
        action={
          guildSelected.guild.owner && (
            <BorderlessButton onPress={handleShareInvitation}>
              <Fontisto
                name="share"
                size={24}
                color={theme.colors.primary}
              />
            </BorderlessButton>
          )
        }
      />

      <ImageBackground source={bannerImg} style={styles.banner}>
        <View style={styles.bannerContent}>
          <Text style={styles.title}>
            {guildSelected.guild.name}
          </Text>

          <Text style={styles.subtitle}>
            {guildSelected.description}
          </Text>
        </View>
      </ImageBackground>

      {isLoading ? <Load /> : (
        <>
          <ListHeader
            title="Jogadores"
            subtitle={`Total ${guildWidget.members.length}`}
          />

          <FlatList
            data={guildWidget.members}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <Member data={item} />
            )}
            ItemSeparatorComponent={() => <ListDivider isCentered />}
            style={styles.members}
          />
        </>
      )}

      {guildSelected.guild.owner && (
        <View style={styles.footer}>
          <ButtonIcon
            title="Entrar na partida"
            onPress={handleOpenGuild}
          />
        </View>
      )}
    </Background>
  );
}