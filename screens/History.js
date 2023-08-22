import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { getTable } from "../configs/firebaseConfig";
import { onValue } from "firebase/database";
import { getData } from "../utils/localStorage";
import Skeleton from "../components/Skeleton";

export default function HistoryScreen({ navigation }) {
  const [refresh, setRefresh] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [userList, setUserList] = useState([]);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getListData = (data) => {
    const tableName = data && data?.nik ? "students" : "consular";
    onValue(getTable(tableName), (snapshot) => {
      const data = snapshot.val();
      const consulerData = data?.map((item) => ({
        identityNumber: item?.nik || item?.nim,
        name: item?.name,
        role: item?.nik ? "conselar" : "student",
        photo: item?.photo,
      }));
      setUserList(consulerData);
    });
  };

  const getDataUser = () => {
    setIsLoading(true);
    getData("user").then((res) => {
      setUserData(res);
      getListData(res);
    });
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };

  useEffect(() => {
    getDataUser();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.listWrapper}>
        {isLoading ? (
          <Skeleton />
        ) : refreshing ? (
          <ActivityIndicator
            size="large"
            color="#05A0E4"
            style={{ marginTop: 150 }}
          />
        ) : userList.length === 0 ? (
          <View
            style={{
              width: "100%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontWeight: "600",
                color: "grey",
              }}
            >
              Belum ada data konsuler
            </Text>
          </View>
        ) : (
          <FlatList
            refreshControl={
              <RefreshControl
                onRefresh={async () => {
                  if (userList.length > 0) {
                    setUserList([]);
                  }
                  setRefresh(true);
                  await getListData(userData);
                  setRefresh(false);
                }}
                refreshing={refresh}
              />
            }
            keyExtractor={(_, index) => `${index}`}
            data={userList}
            renderItem={({ item }) => (
              <View>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("ChatDetail", {
                      item,
                      sourcePage: "History",
                    })
                  }
                >
                  <View style={styles.row}>
                    <Image
                      source={{
                        uri: item?.photo,
                      }}
                      style={styles.pic}
                    />
                    <View>
                      <View style={styles.nameContainer}>
                        <Text
                          style={styles.nameTxt}
                          numberOfLines={1}
                          ellipsizeMode="tail"
                        >
                          {item.name}
                        </Text>
                      </View>
                      <View style={styles.msgContainer}>
                        <Text style={styles.status}>{item.identityNumber}</Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  inputWrapper: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 4,
  },
  userList: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 4,
    width: "100%",
    marginTop: 16,
    height: "90%",
  },
  // new

  listWrapper: {
    backgroundColor: "white",
    height: Dimensions.get("window").height - 216,
    width: "100%",
    borderRadius: 4,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#DCDCDC",
    backgroundColor: "white",
    borderBottomWidth: 1,
    padding: 10,
    paddingTop: 15,
  },
  pic: {
    borderRadius: 30,
    width: 50,
    height: 50,
    backgroundColor: "#DCDCDC",
  },
  nameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 80,
  },
  nameTxt: {
    marginLeft: 15,
    fontWeight: "600",
    color: "#222",
    fontSize: 16,
    width: 200,
  },
  status: {
    fontWeight: "200",
    color: "#7D8797",
    fontSize: 12,
    marginTop: 8,
  },
  on: {
    fontWeight: "200",
    color: "green",
    fontSize: 13,
    paddingRight: 10,
  },
  off: {
    fontWeight: "200",
    color: "#C0392B",
    fontSize: 13,
    paddingRight: 10,
  },
  msgContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 15,
  },
  email: {
    fontWeight: "400",
    color: "#008B8B",
    fontSize: 12,
    marginLeft: 15,
  },
});
