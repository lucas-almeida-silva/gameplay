import React from 'react';
import { 
  Text, 
  Image,
  View, 
  TouchableOpacity, 
  TouchableOpacityProps 
} from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';

import discordImg from '../../assets/discord.png';
import { styles } from './styles';

type Props = RectButtonProps & {
  title: string;
}

export function ButtonIcon({ title, ...props }: Props){
  return (
    <RectButton style={styles.container} {...props}>
      <View style={styles.iconWrapper}>
        <Image source={discordImg} style={styles.icon} />
      </View>

      <Text style={styles.title}>{title}</Text>
    </RectButton>
  );
}