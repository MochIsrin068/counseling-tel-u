import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { fonts } from "../theme/fonts";
import { colors } from "../theme/colors";
import { getData } from "../utils/localStorage";

export default function SplahScreen({ navigation }) {
  useEffect(() => {
    getData("user").then((res) => {
      setTimeout(() => {
        if (res) {
          navigation.replace("Home");
        } else {
          navigation.replace("Login");
        }
      }, 3000);
    });
  }, [navigation]);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Image
        style={{
          width: 90,
          height: 110,
          resizeMode: "stretch",
        }}
        source={require("../assets/images/telu-logo.png")}
      />
      <Text style={styles.title}>Konseling Tel-U</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: colors.text.primary,
    marginTop: 20,
  },
});
