import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

const Card = ({ item }: any) => {
  return (
    <View style={styles.card}>
      <Image
        source={{ uri: item.image }}
        style={styles.image}
        resizeMode="contain"
      />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.price}>${item.price}</Text>
        <Text style={styles.category}>{item.category}</Text>
      </View>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    flexDirection: "row",
    padding: 12,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    elevation: 3,
    alignItems: "center",
  },
  image: {
    width: 70,
    height: 70,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#333",
  },
  price: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#c52c2c",
    marginTop: 4,
  },
  category: {
    fontSize: 12,
    color: "gray",
    marginTop: 2,
    textTransform: "capitalize",
  },
});
