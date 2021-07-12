import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/core";
import db, { auth } from "../firebase";
import firebase from "firebase";

const ContactList = ({ id, imageUrl, username, email }) => {
  const [imager, setImager] = useState("");
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  navigation.addListener("focus", () => {
    db.collection("users")
      .where("email", "==", auth?.currentUser?.email)
      .onSnapshot((snapshot) => {
        snapshot.forEach((doc) => {
          setImager(doc.data().image);
        });
      });
  });

  const goTo = async () => {
    await setLoading(!loading);
    await db.collection("chats").add({
      username: username,
      email: email,
      imageUrl: imageUrl,
      reName: auth?.currentUser?.displayName,
      reEmail: auth?.currentUser?.email,
      reImage: imager,
      lastMessage: "",
      time: firebase.firestore.FieldValue.serverTimestamp(),
    });
    await db.collection("users").doc(id).update({
      state: auth?.currentUser?.email,
    });
    await setLoading(loading);
    await navigation.navigate("ChatRoom", {
      id,
      imageUrl,
      username,
      email,
    });
  };
  return (
    <View>
        {loading ? (
            <View style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 50
            }}>
                <ActivityIndicator color="#0C6157" size="large" />
            </View>
        ) : (
    <View
      style={{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        width: "100%",
        marginBottom: 10,
      }}
    >
      <View
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Image
          style={{
            height: 55,
            width: 55,
            borderRadius: 999,
            marginRight: 10,
            marginLeft: 10,
          }}
          source={{ uri: imageUrl }}
        />

        <TouchableOpacity
          style={{
            paddingVertical: 5,
          }}
          onPress={goTo}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 16,
              letterSpacing: 2,
            }}
          >
            {username}
          </Text>
          <Text
            style={{
              color: "gray",
              width: 200,
            }}
            numberOfLines={1}
          >
            {email}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
    )}
    </View>
  );
};

export default ContactList;

const styles = StyleSheet.create({});
