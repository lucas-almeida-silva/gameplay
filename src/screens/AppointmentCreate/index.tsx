import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

import { Header } from '../../components/Header';
import { CategorySelect } from '../../components/CategorySelect';
import { SmallInput } from '../../components/SmallInput';
import { TextArea } from '../../components/TextArea';
import { Button } from '../../components/Button';
import { GuildIcon } from '../../components/GuildIcon';
import { ModalView } from '../../components/ModalView';
import { Guilds } from '../Guilds';

import { styles } from './styles';
import { theme } from '../../global/styles/theme';

import bannerImg from '../../assets/banner.png';
import { GuildProps } from '../../components/Guild';

export function AppointmentCreate() {
  const [category, setCategory] = useState('');
  const [guild, setGuild] = useState<GuildProps>({} as GuildProps);
  const [openGuildsModal, setOpenGuildsModal] = useState(false);

  function handleOpenGuilds() {
    setOpenGuildsModal(true);
  }

  function handleGuildSelect(guildSelected: GuildProps) {
    setGuild(guildSelected);
    setOpenGuildsModal(false);
  }

  function handleCategorySelect(categoryId: string) {
    setCategory(categoryId);
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Header
        title="Agendar partida"
      />

      <ScrollView>
        <Text
          style={[
            styles.label,
            { marginLeft: 24, marginTop: 36, marginBottom: 18 }
          ]}
        >
          Categoria
        </Text>

        <CategorySelect
          hasCheckbox
          setCategory={handleCategorySelect}
          categorySelected={category}
        />

        <View style={styles.form}>
          <RectButton onPress={handleOpenGuilds}>
            <View style={styles.select}>
              {
                guild.icon 
                  ? <GuildIcon /> 
                  : <View style={styles.image} />
              }

              <View style={styles.selectBody}>
                <Text style={styles.label}>
                  {guild.name || 'Selecione um servidor'}
                </Text>
              </View>

              <Feather
                name="chevron-right"
                color={theme.colors.heading}
                size={18}
              />
            </View>
          </RectButton>

          <View style={styles.field}>
            <View>
              <Text style={styles.label}>
                Dia e mês
              </Text>

              <View style={styles.column}>
                <SmallInput maxLength={2} />
                <Text style={styles.divider}>
                  /
                </Text>
                <SmallInput maxLength={2} />
              </View>
            </View>

            <View>
              <Text style={styles.label}>
                Hora e minuto
              </Text>

              <View style={styles.column}>
                <SmallInput maxLength={2} />
                <Text style={styles.divider}>
                  :
                </Text>
                <SmallInput maxLength={2} />
              </View>
            </View>
          </View>

          <View style={[styles.field, { marginBottom: 12 }]}>
            <Text style={styles.label}>
              Descrição
            </Text>

            <Text style={styles.caracteresLimit}>
              Max 100 caracteres
            </Text>
          </View>

          <TextArea
            multiline
            numberOfLines={5}
            maxLength={100}
            autoCorrect={false}
          />

          <View style={styles.footer}>
            <Button title="Agendar" />
          </View>
        </View>
      </ScrollView>

      <ModalView visible={openGuildsModal}>
        <Guilds handleGuildSelect={handleGuildSelect} />
      </ModalView>
    </KeyboardAvoidingView>
  );
}