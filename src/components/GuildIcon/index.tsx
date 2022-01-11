import React from 'react';
import { Image } from 'react-native';

import { styles } from './styles';

export function GuildIcon() {
  return (
    <Image 
      source={{uri: 'https://cdn.icon-icons.com/icons2/2108/PNG/512/discord_icon_130958.png'}} 
      resizeMode="cover"
      style={styles.image}
    />
  );
}