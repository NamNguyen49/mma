
import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HomeScreenData from "../data/HomeScreenData";
import { useFocusEffect } from "@react-navigation/native";

const SwitchAdd = ({ product, route }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [listFavorites, setListFavorites] = useState([]);

  useFocusEffect(() => {
    const checkIsFavorite = async (productId) => {
      try {
        const favorites = await AsyncStorage.getItem("favorites");
        if (favorites) {
          const parsedFavorites = JSON.parse(favorites);
          return parsedFavorites.some((fav) => fav.id === productId);
        }
        return false;
      } catch (error) {
        console.log(error);
        return false;
      }
    };

    const fetchData = async () => {
      const isProductFavorite = await checkIsFavorite(product.id);
      setIsFavorite(isProductFavorite);
    };

    fetchData();
  });

  const getFavoriteList = async () => {
    try {
      const favorites = await AsyncStorage.getItem("favorites");
      if (favorites) {
        const parsedFavorites = JSON.parse(favorites);
        setListFavorites(parsedFavorites);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addItemFavorite = async (item) => {
    try {
      let favorites = [...listFavorites];
      const existingFavorites = await AsyncStorage.getItem("favorites");

      if (existingFavorites) {
        favorites = JSON.parse(existingFavorites);
      }

      const isItemExist = favorites.some((fav) => fav.id === item.id);

      if (!isItemExist) {
        favorites.push(item);
        await AsyncStorage.setItem("favorites", JSON.stringify(favorites));
        setListFavorites(favorites);
        setIsFavorite(true);
        console.log("Updated favorites list: ", listFavorites);
      } else {
        const updatedList = listFavorites.filter((fav) => fav.id !== item.id);
        await AsyncStorage.setItem("favorites", JSON.stringify(updatedList));
        setListFavorites(updatedList);
        setIsFavorite(false);
        console.log("Updated favorites list: ", listFavorites);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFavoriteList();
    console.log("Current favorites list: ", listFavorites);
  }, []);

  const handleToggleFavorite = () => {
    setIsFavorite((previousState) => !previousState);
    if (!isFavorite) {
      addItemFavorite(product);
      Alert.alert("Thích", "Đã thêm vào danh sách yêu thích");
    } else {
      addItemFavorite(product);
      Alert.alert("!Thích", "Đã xóa khỏi danh sách yêu thích");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleToggleFavorite}>
        <Ionicons
          name={isFavorite ? "heart" : "heart-outline"}
          size={30}
          color={isFavorite ? "#F03B39" : "#444654"}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
});

export default SwitchAdd;
