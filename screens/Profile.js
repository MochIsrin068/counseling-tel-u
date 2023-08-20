import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { getData } from "../utils/localStorage";

export default function ProfileScreen({ navigation }) {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    getData("user").then((res) => {
      setUserData(res);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Image
        style={{
          width: 100,
          height: 100,
          resizeMode: "stretch",
          borderRadius: 50,
          backgroundColor: "grey",
        }}
        source={
          userData?.photo
            ? { uri: userData?.photo }
            : require("../assets/images/user-placeholder.png")
        }
      />

      <Text style={styles.name}>{userData?.name}</Text>
      <Text style={styles.nimNik}>{userData?.nik || userData?.nim}</Text>
      <View style={styles.divider}></View>

      <View style={styles.actionWrapper}>
        <TouchableOpacity
          style={styles.action}
          onPress={() => alert("upcoming")}
        >
          <FontAwesome name="edit" size={24} color="blue" />
          <Text style={styles.actionText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      {userData?.nim && (
        <View style={styles.actionWrapper}>
          <TouchableOpacity
            style={styles.action}
            onPress={() => navigation.navigate("Chat")}
          >
            <Ionicons name="chatbox-ellipses-outline" size={24} color="blue" />
            <Text style={styles.actionText}>Konsultasi</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: 40,
    backgroundColor: "white",
    borderRadius: 10,
    margin: 16,
    paddingHorizontal: 16,
  },
  name: {
    fontSize: 20,
    marginTop: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  nimNik: {
    fontSize: 16,
    marginTop: 12,
    textAlign: "center",
  },
  divider: {
    backgroundColor: "#EDEEF0",
    height: 4,
    width: "100%",
    marginTop: 16,
  },
  action: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  actionWrapper: {
    width: "100%",
    backgroundColor: "#EDEEF0",
    padding: 10,
    borderRadius: 4,
    marginTop: 18,
  },
  actionText: { marginLeft: 10, fontWeight: "600", color: "blue" },
});
