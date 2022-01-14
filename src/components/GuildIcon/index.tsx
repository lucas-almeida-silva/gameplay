import React from 'react';
import { Image } from 'react-native';

import { styles } from './styles';
import guildImg from '../../assets/guild.png';

export function GuildIcon() {
  return (
    <Image 
      source={guildImg} 
      resizeMode="cover"
      style={styles.image}
    />
  );
}