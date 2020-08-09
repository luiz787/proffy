import React, { useState } from "react";
import { View, Text } from "react-native";
import {
  ScrollView,
  TextInput,
  BorderlessButton,
  RectButton,
} from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";

import PageHeader from "../../components/PageHeader";
import TeacherItem from "../../components/TeacherItem";
import styles from "./styles";

function TeacherList() {
  const [isFilterListVisible, setIsFilterListVisible] = useState(false);

  function handleToggleFiltersVisibility() {
    setIsFilterListVisible(!isFilterListVisible);
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
      />

      <View style={styles.inputGroup}>
        <View style={styles.inputBlock}>
          <Text style={styles.label}>Dia da semana</Text>
          <TextInput
            placeholderTextColor="#C1BCCC"
            style={styles.input}
            placeholder="Qual o dia?"
          />
        </View>
        <View style={styles.inputBlock}>
          <Text style={styles.label}>Horário</Text>
          <TextInput
            placeholderTextColor="#C1BCCC"
            style={styles.input}
            placeholder="Qual o horário?"
          />
        </View>
      </View>
      <RectButton style={styles.submitButton}>
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
        <TeacherItem />
        <TeacherItem />
        <TeacherItem />
      </ScrollView>
    </View>
  );
}

export default TeacherList;
