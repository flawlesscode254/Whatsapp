import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, FlatList } from "react-native";
import Chat from "../chatList/Chat";
import MessageButton from "../chatList/MessageButton";
import db from "../firebase";

const ChatScreen = () => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    (async () => {
      await db.collection("chats").onSnapshot((snapshot) => {
        setChats(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            image: doc.data().imageUrl,
            username: doc.data().username,
            email: doc.data().email,
            reName: doc.data().reName,
            reEmail: doc.data().reEmail,
            reImage: doc.data().reImage,
            lastMessage: doc.data().lastMessage,
            time: doc.data().time,
          }))
        );
      });
    })();
  }, []);

  return (
    <View>
      <FlatList
        data={chats}
        renderItem={({ item }) => {
          return (
            <Chat
              id={item.id}
              username={item.username}
              imageUrl={item.image}
              time={item.time}
              email={item.email}
              reName={item.reName}
              reEmail={item.reEmail}
              reImage={item.reImage}
              lastMessage={item.lastMessage}
            />
          );
        }}
        keyExtractor={(item) => item.id}
      />

      <MessageButton />
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({});
