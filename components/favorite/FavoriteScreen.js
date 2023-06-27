import React, { useEffect, useState } from "react";
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Button,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import HomeScreenData from "./../data/HomeScreenData";

export default function Favourite({ navigation }) {
  const [listFavourite, setListFavourite] = useState([]);
  const [dataItem, setDataItem] = useState([]);
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

  const deleteAllItem = async () => {
    try {
      const updatedList = [];
      await AsyncStorage.setItem("favorites", JSON.stringify(updatedList));
      setListFavourite([]);
    } catch (error) {
      console.log(error);
    }
  };

  const removeItem = (itemId) => {
    Alert.alert(
      "Remove ",
      "Are you sure you want to remove this ?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Remove",
          style: "destructive",
          onPress: async () => {
            try {
              const updatedFavorites = listFavourite.filter(
                (item) => item.id !== itemId
              );
              await AsyncStorage.setItem(
                "favorites",
                JSON.stringify(updatedFavorites)
              );
              setListFavourite(updatedFavorites);
            } catch (error) {
              console.log(error);
            }
          },
        },
      ]
    );
  };

  const removeAllItems = () => {
    Alert.alert(
      "Remove All ",
      "Are you sure you want to remove all ?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Remove",
          style: "destructive",
          onPress: () => deleteAllItem(),
        },
      ]
    );
  };

  useEffect(() => {
    getFavouriteList();
  }, [isFocused]);

  useFocusEffect(
    React.useCallback(() => {
      const updatedData = () => {
        const updatedData = listFavourite.map((item) => ({
          ...item,
          favorite: listFavourite.some((fav) => fav.id === item.id),
        }));
        setDataItem(updatedData);
      };

      updatedData();
    }, [listFavourite])
  );

  console.log("List favorite", listFavourite);

  if (dataItem.length === 0) {
    return (
      <View style={styles.screenempty}>
        <Text style={styles.textNot}>Your favorites list is empty</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={dataItem}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePress(item)}>
            <View style={styles.listItem}>
              {item.image && item.image.uri ? (
                <ImageBackground
                  source={{ uri: item.image.uri }}
                  style={styles.imageBackground}
                ></ImageBackground>
              ) : null}
              <View style={styles.namedesc}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.desc}>{item.description}</Text>
              </View>
              <TouchableOpacity onPress={() => removeItem(item.id)}>
                <FontAwesome name="trash" size={25} color="red" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      <Button
        width={40}
        title="Remove All"
        onPress={removeAllItems}
        color="gray"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listItem: {
    flexDirection: "row",
    marginVertical: 8,
    backgroundColor: "#FCF8EE",
    borderWidth: 0.3,
    alignItems: "center",
    padding: 8,
  },
  namedesc: {
    flex: 1,
    marginLeft: 12,
  },
  desc: {
    textAlign: "justify",
    marginRight: 10,
  },
  screenempty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  textNot: {
    fontSize: 20,
    textAlign: "center",
  },
  name: {
    fontWeight: "bold",
    fontSize: 20,
  },
  imageBackground: {
    width: 100,
    height: 100,
  },

});
