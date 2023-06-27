
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Image,
  Text,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import HomeScreenData from "../data/HomeScreenData";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from "@react-navigation/native";

export default function HomeScreen({ navigation }) {
  const windowWidth = Dimensions.get("window").width;
  const [listFavourite, setListFavourite] = useState([]);
  const [data, setData] = useState([]);
  const isFocused = useIsFocused();

  const handlePress = (product) => {
    navigation.navigate("DetailScreen", { product });
  };

  const getFavouriteList = async () => {
    try {
      const favorites = await AsyncStorage.getItem("favorites");
      if (favorites) {
        const parsedFavorites = JSON.parse(favorites);
        setListFavourite(parsedFavorites);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFavouriteList();
  }, []);

  useEffect(() => {
    getFavouriteList();
  }, [isFocused]);

  useFocusEffect(
    React.useCallback(() => {
      const updatedData = () => {
        const updatedData = HomeScreenData.map((item) => ({
          ...item,
          favorite: listFavourite.some((fav) => fav.id === item.id),
        }));
        setData(updatedData);
      };

      updatedData();
    }, [listFavourite])
  );

  const getRandomColor = () => {
    const colors = ["#FADDD2", "#D4E6F1", "#F8E9A1", "#E3F2DF", "#F3D3BD"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.gridContainer}>
        {data.map((product) => (
          <TouchableOpacity
            key={product.id}
            style={[styles.productContainer, { backgroundColor: getRandomColor() }]}
            onPress={() => handlePress(product)}
            activeOpacity={0.7}
          >
            <View style={styles.imageContainer}>
              <Image source={product.image} style={styles.image} resizeMode="cover" />
            </View>
            <Text style={styles.name}>{product.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCF8EE",
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  productContainer: {
    width: "48%",
    aspectRatio: 1,
    marginBottom: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
  },
  imageContainer: {
    width: "80%",
    aspectRatio: 1,
    borderRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  name: {
    fontSize: 16,


    fontWeight: "bold",
    marginTop: 10,
    textAlign: "center",
  },
});

