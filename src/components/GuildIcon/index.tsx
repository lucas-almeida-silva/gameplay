import React from 'react';
import { Image, View } from 'react-native';

import { discordAuth } from '../../configs/discordAuth';

import { styles } from './styles';
import DiscordSvg from '../../assets/discord.svg';

type Props = {
  guildId: string;
  iconId: string | null;
}

export function GuildIcon({ guildId, iconId }: Props) {
  const uri = `${discordAuth.CDN_IMAGE}/icons/${guildId}/${iconId}.png`;

  return (
    <View style={styles.container}>
      {iconId ? (
        <Image
          source={{ uri }}
          resizeMode="cover"
          style={styles.image}
        />
      ): (
        <DiscordSvg width={40} height={40} />
      )}
    </View>
  );
}