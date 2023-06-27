import React, { useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  Button,
} from "react-native";
import DetailSuggest from "../detail/DetailSuggest";

import SwitchAdd from "./SwitchAdd";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DetailScreen = ({ navigation, route }) => {
  let { product } = route.params;

  const clearAsyncStorage = async () => {
    AsyncStorage.clear();
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={[styles.productContainer]}>
          <View style={styles.imageContainer}>
            <Image source={product.image} style={styles.image} resizeMode="cover" />
          </View>

          <View style={styles.DropDownMenu}>
            <Text style={styles.name}>{product.name} </Text>
            <SwitchAdd product={product} route={route} />
          </View>

          <Text style={styles.detailTitle}> Thông tin</Text>

          <View>
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>
              {product.name}
            </Text>
            <Text style={styles.description}>{product.description}</Text>
          </View>

          <View>
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>Thân lan:</Text>
            <Text style={styles.description}>{product.descriptionThan}</Text>
            <Image style={styles.imgdes} source={product.imgThan} />
          </View>
          <View>
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>Lá lan:</Text>
            <Text style={styles.description}>{product.descriptionLa}</Text>
            <Image style={styles.imgdes} source={product.imgLa} />
          </View>
          <View>
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>Hoa lan:</Text>
            <Text style={styles.description}>{product.descriptionHoa}</Text>
            <Image style={styles.imgdes} source={product.imgHoa} />
          </View>
          <Text style={styles.detailTitle}>SẢN PHẨM BÁN CHẠY NHẤT</Text>


        </View>

        <View>
          <DetailSuggest navigation={navigation} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#FCF8EE",
  },
  productContainer: {
    marginBottom: 20,
  },
  DropDownMenu: {
    flexDirection: "row",
  },
  image: {
    width: "100%",
    height: 500,
    marginBottom: 10,
  },
  name: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
  },

  detailTitle: {
    backgroundColor: "white",
    borderWidth: 0.2,
    borderColor: "black",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 24, // Kích thước chữ to hơn (số 24 là ví dụ, bạn có thể điều chỉnh theo ý muốn)
    height: 40, // Chiều cao dòng chữ tăng lên (số 40 là ví dụ, bạn có thể điều chỉnh theo ý muốn)
    color: "red", // Màu chữ đỏ
    marginBottom: 10,
  },
  description: {
    fontSize: 18,
    textAlign: "justify",
    marginBottom: 20,
  },
  imgdes: {
    width: "100%",
    height: 200,
    marginBottom: 10,
    borderRadius: 10,
  },
});

export default DetailScreen;
