import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import {
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  SafeAreaView,
  Image,
} from "react-native";
import { FontAwesome, AntDesign } from "@expo/vector-icons";

export default function ChatDetailScreen({ navigation, route }) {
  const { item } = route.params;
  console.log("item", item);

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);

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
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    </>
  );
}
