import React, { useCallback, useState } from 'react';
import { View } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Profile } from '../../components/Profile';
import { ButtonAdd } from '../../components/ButtonAdd';
import { CategorySelect } from '../../components/CategorySelect';
import { Appointment, AppointmentProps } from '../../components/Appointment';
import { ListHeader } from '../../components/ListHeader';
import { FlatList } from 'react-native-gesture-handler';
import { ListDivider } from '../../components/ListDivider';
import { Background } from '../../components/Background';
import { Load } from '../../components/Load';

import { COLLECTION_APPOINTMENTS } from '../../configs/database';
import { styles } from './styles';

export function Home() {
  const [category, setCategory] = useState('');
  const [appointments, setAppointments] = useState<AppointmentProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigation = useNavigation();

  function handleCategorySelect(categoryId: string) {
    categoryId === category
      ? setCategory('')
      : setCategory(categoryId);
  }

  function handleAppointmentDetails(guildSelected: AppointmentProps) {
    navigation.navigate('AppointmentDetails', { guildSelected });
  }

  function handleAppointmentCreate() {
    navigation.navigate('AppointmentCreate');
  }

  async function loadAppointments() {
    const storage = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
    const appointments: AppointmentProps[] = storage ? JSON.parse(storage) : [];

    if (category) {
      setAppointments(appointments.filter(item => item.category === category));
    } else {
      setAppointments(appointments);
    }

    setIsLoading(false);
  }

  useFocusEffect(useCallback(() => {
    loadAppointments();
  }, [category]));

  return (
    <Background>
      <View style={styles.container}>
        <View style={styles.header}>
          <Profile />
          <ButtonAdd onPress={handleAppointmentCreate} />
        </View>

        <CategorySelect
          categorySelected={category}
          setCategory={handleCategorySelect}
        />

        {isLoading ? <Load /> : (
          <>
            <ListHeader
              title="Partidas agendadas"
              subtitle={`Total ${appointments.length}`}
            />

            <FlatList
              data={appointments}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <Appointment 
                  data={item} 
                  onPress={() => handleAppointmentDetails(item)} 
                />
              )}
              ItemSeparatorComponent={() => <ListDivider />}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 69 }}
              style={styles.matches}
            />
          </>
        )}
      </View >
    </Background>
  );
}