import React, { useState } from "react";
import { View, Text } from "react-native";
import {
  ScrollView,
  TextInput,
  BorderlessButton,
  RectButton,
} from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-community/async-storage";

import PageHeader from "../../components/PageHeader";
import TeacherItem, { Teacher } from "../../components/TeacherItem";
import styles from "./styles";
import api from "../../services/api";
import { useFocusEffect } from "@react-navigation/native";

function TeacherList() {
  const [teachers, setTeachers] = useState<ReadonlyArray<Teacher>>([]);
  const [favorites, setFavorites] = useState<ReadonlyArray<number>>([]);
  
  const [isFilterListVisible, setIsFilterListVisible] = useState(false);
  const [subject, setSubject] = useState('');
  const [week_day, setWeekDay] = useState('');
  const [time, setTime] = useState('');

  function loadFavorites() {
    AsyncStorage.getItem('favorites').then(response => {
      if (response) {
        const retrievedFavorites = JSON.parse(response) as ReadonlyArray<Teacher>;
        const favoriteTeachersIds = retrievedFavorites.map(teacher => teacher.id);
        setFavorites(favoriteTeachersIds);
      }
    });
  }

  function handleToggleFiltersVisibility() {
    setIsFilterListVisible(!isFilterListVisible);
  }

  async function handleFiltersSubmit() {
    loadFavorites();
    const response = await api.get<ReadonlyArray<Teacher>>("classes", {
      params: {
        subject,
        week_day,
        time,
      },
    });
    setTeachers(response.data);
    setIsFilterListVisible(false);
  }

  const filterButton = (
    <BorderlessButton onPress={handleToggleFiltersVisibility}>
      <Feather name="filter" size={20} color="#FFF" />
    </BorderlessButton>
  );

  const searchForm = (
    <View style={styles.searchForm}>
      <Text style={styles.label}>Matéria</Text>
      <TextInput
        placeholderTextColor="#C1BCCC"
        style={styles.input}
        placeholder="Qual a matéria?"
        value={subject}
        onChangeText={setSubject}
      />

      <View style={styles.inputGroup}>
        <View style={styles.inputBlock}>
          <Text style={styles.label}>Dia da semana</Text>
          <TextInput
            placeholderTextColor="#C1BCCC"
            style={styles.input}
            placeholder="Qual o dia?"
            value={week_day}
            onChangeText={setWeekDay}
          />
        </View>
        <View style={styles.inputBlock}>
          <Text style={styles.label}>Horário</Text>
          <TextInput
            placeholderTextColor="#C1BCCC"
            style={styles.input}
            placeholder="Qual o horário?"
            value={time}
            onChangeText={setTime}
          />
        </View>
      </View>
      <RectButton
        style={styles.submitButton}
        onPress={handleFiltersSubmit}
      >
        <Text style={styles.submitButtonText}>Filtrar</Text>
      </RectButton>
    </View>
  );

  return (
    <View style={styles.container}>
      <PageHeader title="Proffys disponíveis" headerRight={filterButton}>
        {isFilterListVisible && searchForm}
      </PageHeader>
      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
      >
        {teachers.map(teacher => (
          <TeacherItem
            key={teacher.id}
            teacher={teacher}
            isFavorite={favorites.includes(teacher.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

export default TeacherList;
