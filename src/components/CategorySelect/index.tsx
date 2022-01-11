import React from 'react';
import { View, ScrollView } from 'react-native';

import { Category } from '../Category';

import { categories } from '../../utils/categories';

import { styles } from './styles';

type Props = {
  categorySelected: string;
  setCategory: (categoryId: string) => void;
}

export function CategorySelect({ categorySelected, setCategory }: Props) {
  return (
    <ScrollView 
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingRight: 40 }}
      style={styles.container}
    >
      {
        categories.map(category => (
          <Category
            key={category.id}
            title={category.title}
            icon={category.icon}
            checked={category.id === categorySelected}
            onPress={() => setCategory(category.id)}
          />
        ))
      }
    </ScrollView>
  );
}