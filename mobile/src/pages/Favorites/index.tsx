import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { useFocusEffect } from "@react-navigation/native";

import styles from "./styles";
import PageHeader from "../../components/PageHeader";
import TeacherItem, { Teacher } from "../../components/TeacherItem";

function Favorites() {
  const [favorites, setFavorites] = useState<ReadonlyArray<Teacher>>([]);
  
  function loadFavorites() {
    AsyncStorage.getItem('favorites').then(response => {
      if (response) {
        const retrievedFavorites = JSON.parse(response) as ReadonlyArray<Teacher>;
        setFavorites(retrievedFavorites);
      }
    });
  }

  useFocusEffect(
    React.useCallback(() => {
      loadFavorites();
    }, [])
  );

  return (
    <View style={styles.container}>
      <PageHeader title="Meus proffys favoritos" />
      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
      >
        {favorites.map(teacher => {
          return (
            <TeacherItem
              key={teacher.id}
              teacher={teacher}
              isFavorite
            />
          );
        })}
      </ScrollView>
    </View>
  );
}

export default Favorites;
