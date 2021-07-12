import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, FlatList } from "react-native";
import ContactList from "../contactList/ContactList";
import db, { auth } from "../firebase";

const StartChatScreen = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    db.collection("users")
      .where("state", "!=", auth?.currentUser?.email)
      .onSnapshot((snapshot) => {
        setUsers(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            name: doc.data().name,
            email: doc.data().email,
            image: doc.data().image,
          }))
        );
      });
  }, []);

  return (
    <View>
      <FlatList
        style={{
          marginTop: 10,
        }}
        data={users}
        renderItem={({ item }) => {
          if (item.email !== auth?.currentUser?.email) {
            return (
              <ContactList
                id={item.id}
                username={item.name}
                imageUrl={item.image}
                email={item.email}
              />
            );
          }
          else {
              console.log("a");
          }
        }}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default StartChatScreen;

const styles = StyleSheet.create({});
