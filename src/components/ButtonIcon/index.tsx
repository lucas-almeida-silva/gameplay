import React from 'react';
import { Text, Image, View, TouchableOpacity, TouchableOpacityProps } from 'react-native';

import discordImg from '../../assets/discord.png';
import { styles } from './styles';

type Props = TouchableOpacityProps & {
  title: string;
}

export function ButtonIcon({ title, ...props }: Props){
  return (
    <TouchableOpacity style={styles.container} {...props}>
      <View style={styles.iconWrapper}>
        <Image source={discordImg} style={styles.icon} />
      </View>

      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}