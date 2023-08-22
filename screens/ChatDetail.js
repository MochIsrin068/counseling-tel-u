import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat, Bubble, Composer, Send } from "react-native-gifted-chat";
import {
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  SafeAreaView,
  Image,
} from "react-native";
import { FontAwesome, AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { getTable, database } from "../configs/firebaseConfig";
import { onValue, update, ref } from "firebase/database";
import { getData } from "../utils/localStorage";

export default function ChatDetailScreen({ navigation, route }) {
  const { item } = route.params;

  const [messages, setMessages] = useState([]);
  const [userData, setUserData] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    getData("user").then((res) => {
      setUserData(res);
    });
  }, []);

  useEffect(() => {
    if (userData) {
      onValue(
        getTable(
          `history/${
            userData?.nik
              ? `${userData?.nik}${item?.identityNumber}`
              : `${item?.identityNumber}${userData?.nim}`
          }`
        ),
        (snapshot) => {
          const data = snapshot.val();
          console.log("data message", data);
          setMessages((previousMessages) =>
            GiftedChat.append(previousMessages, data?.messages || [])
          );
        }
      );
    }
  }, [userData]);

  // useEffect(() => {
  //   setMessages([
  //     {
  //       _id: 1,
  //       text: "Hello developer",
  //       createdAt: new Date(),
  //       user: {
  //         _id: 2,
  //         name: "React Native",
  //         avatar: "https://placeimg.com/140/140/any",
  //       },
  //     },
  //   ]);
  // }, []);

  const onSend = (newMessages = []) => {
    console.log("ms", messages);
    // setMessages((previousMessages) => {
    //   update(
    //     ref(
    //       database,
    //       `history/${
    //         userData?.nik
    //           ? `${userData?.nik}${item?.identityNumber}`
    //           : `${item?.identityNumber}${userData?.nim}`
    //       }/`
    //     ),
    //     { messages: GiftedChat.append(previousMessages, messages) }
    //   );

    //   return GiftedChat.append(previousMessages, messages);
    // });

    update(
      ref(
        database,
        `history/${
          userData?.nik
            ? `${userData?.nik}${item?.identityNumber}`
            : `${item?.identityNumber}${userData?.nim}`
        }/`
      ),
      { messages: GiftedChat.append(messages, newMessages) }
    );

    // if(message.length > 0){
    //   onValue(getTable(`mesages/${userData?.nik || userData?.nim}/${item?.identityNumber}`), (snapshot) => {
    //     const data = snapshot.val();
    //     setMessages((previousMessages) =>
    //       GiftedChat.append(previousMessages, data)
    //     );
    //   });
    // }
  };

  console.log("message", messages);

  const renderBubble = (props) => (
    <Bubble
      {...props}
      // textStyle={{
      //   right: {
      //     fontFamily: PoppinsRegular,
      //   },
      //   left: {
      //     fontFamily: PoppinsRegular,
      //   },
      // }}
      wrapperStyle={{
        right: {
          backgroundColor: "#1a2849",
          borderTopLeftRadius: 7,
          borderTopRightRadius: 7,
          borderBottomRightRadius: 7,
          borderBottomLeftRadius: 0,
        },
        left: {
          borderTopLeftRadius: 7,
          borderTopRightRadius: 7,
          borderBottomRightRadius: 7,
          borderBottomLeftRadius: 0,
        },
      }}
    />
  );

  const renderSend = (props) => (
    <Send {...props}>
      <View
        style={{
          width: 54,
          height: 44,
          // borderTopLeftRadius: 25,
          // borderBottomLeftRadius: 25,
          marginBottom: 0,
          // marginHorizontal: 5,
          // backgroundColor: colors.litBlue,
          backgroundColor: "#505bda",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <FontAwesome5 name="paper-plane" size={24} color="white" />
      </View>
    </Send>
  );

  const renderChatEmpty = () => (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        transform: [{ scaleY: -1 }],
      }}
    >
      <Image
        source={require("../assets/images/no-message.png")}
        style={{
          height: 100,
          width: 100,
        }}
      />

      <Text
        style={{
          fontWeight: "600",
          fontSize: 16,
          marginLeft: 16,
          color: "#7D8797",
        }}
      >
        Belum ada pesan, silahkan kirim pesan!
      </Text>
    </View>
  );

  return (
    <>
      <SafeAreaView>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            height: 60,
            paddingHorizontal: 16,
            alignItems: "center",
            borderBottomColor: "#EDEEF0",
            borderBottomWidth: 6,
          }}
        >
          <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
            <AntDesign name="arrowleft" size={22} color="black" />
          </TouchableOpacity>
          <Text
            style={{
              fontWeight: "600",
              fontSize: 16,
              marginLeft: 16,
            }}
          >
            {item?.name}
          </Text>
        </View>
      </SafeAreaView>
      <GiftedChat
        renderBubble={renderBubble}
        renderSend={renderSend}
        text={message}
        onInputTextChanged={(val) => setMessage(val)}
        messages={messages}
        onSend={(messages) => onSend(messages)}
        renderChatEmpty={renderChatEmpty}
        user={{
          _id: userData?.nik || userData?.nim,
        }}
      />
    </>
  );
}
