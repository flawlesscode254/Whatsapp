import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  TextInput,
  TouchableOpacity,
  FlatList,
  Text,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import db, { auth } from "../firebase";
import firebase from "firebase";
import { useRoute } from "@react-navigation/core";

let a = "";

const ChatRoomScreen = () => {
  const [message, setMessage] = useState("");
  const [feed, setFeed] = useState([]);
  const [mess, setMess] = useState("");

  const route = useRoute();

  const saveDataToMain = () => {
    db.collection(JSON.stringify(route.params.id)).add({
      name: auth?.currentUser?.displayName,
      message: message,
      lastMessage: message,
      time: firebase.firestore.FieldValue.serverTimestamp(),
    });
  };

  const saveDataToOther = () => {
    db.collection("chats").doc(route.params.id).update({
      lastMessage: message,
    });
  };

  const submitMessage = async () => {
    await saveDataToMain();
    await saveDataToOther();
    await setMessage("");
  };

  useEffect(() => {
    db.collection(JSON.stringify(route.params.id))
      .orderBy("time", "desc")
      .onSnapshot((snapshot) => {
        setFeed(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            name: doc.data().name,
            message: doc.data().message,
            time: doc.data().time,
          }))
        );
      });
  }, []);

  return (
    <ImageBackground
      style={{
        flex: 1,
        resizeMode: "cover",
      }}
      source={{
        uri: "https://wallpaperaccess.com/full/1288076.jpg",
      }}
    >
      <TouchableWithoutFeedback>
        <>
          <FlatList
            style={{
              marginTop: 10,
            }}
            data={feed}
            inverted={true}
            renderItem={({ item }) => {
              return (
                <View>
                  <View
                    style={{
                      backgroundColor:
                        item.name === auth?.currentUser?.displayName
                          ? "#0C6157"
                          : "#4a4a4a",
                      paddingVertical: 7,
                      paddingHorizontal: 20,
                      borderBottomLeftRadius:
                        item.name === auth?.currentUser?.displayName ? 18 : 0,
                      borderTopRightRadius: 18,
                      borderTopLeftRadius: 18,
                      borderBottomRightRadius:
                        item.name === auth?.currentUser?.displayName ? 0 : 18,
                      marginRight:
                        item.name === auth?.currentUser?.displayName ? 10 : 100,
                      marginLeft:
                        item.name === auth?.currentUser?.displayName ? 100 : 10,
                      marginBottom: 20,
                    }}
                  >
                    <Text
                      style={{
                        color: "#FFF",
                      }}
                    >
                      {item.message}
                    </Text>
                    <Text
                      style={{
                        color: "yellow",
                        fontSize: 10,
                        alignSelf: "flex-end",
                      }}
                    >
                      {new Date(item.time?.toDate()).toDateString() + " " + " "}{" "}
                      <Text style={{ color: "black" }}>
                        {new Date(item.time?.toDate()).toLocaleTimeString()}
                      </Text>
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      setMess(item.message);
                    }}
                  >
                    <View
                      style={{
                        alignSelf: "flex-end",
                        marginRight:
                          item.name === auth?.currentUser?.displayName
                            ? 10
                            : 257.5,
                        marginBottom: 5,
                        marginTop: -20,
                        display: "flex",
                        flexDirection: "row",
                        backgroundColor:
                          item.name === auth?.currentUser?.displayName
                            ? "#4a4a4a"
                            : "#0C6157",
                        paddingTop: 5,
                        paddingBottom: 5,
                        paddingLeft: 15,
                        paddingRight: 15,
                        borderBottomRightRadius: 25,
                        borderBottomLeftRadius: 25,
                      }}
                    >
                      <Text
                        style={{
                          color: "#FFF",
                          marginRight: 5,
                        }}
                      >
                        Reply
                      </Text>
                      <Ionicons name="trending-up" color="#FFF" size={24} />
                    </View>
                  </TouchableOpacity>
                </View>
              );
            }}
            keyExtractor={(item) => item.id}
          />

          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            keyboardVerticalOffset={75}
            style={{ width: "100%" }}
          >
            <View>
              {/* <ReplyPost /> */}
              <View
                style={{
                  width: "100%",
                }}
              >
                <View
                  style={{
                    height: 65,
                    bottom: -20,
                    backgroundColor: "#0C6157",
                    marginLeft: 15,
                    marginRight: 75,
                    borderTopLeftRadius: 25,
                    borderTopRightRadius: 25,
                    borderBottomLeftRadius: 25,
                    borderBottomRightRadius: 25,
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "#48494a",
                      borderLeftWidth: 4,
                      borderLeftColor: "orange",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flex: 1,
                      height: 30,
                      marginLeft: 15,
                      marginRight: 15,
                      marginTop: 7,
                      paddingBottom: 25,
                      paddingTop: 25,
                    }}
                  >
                    <Text
                      style={{
                        color: "#FFF",
                      }}
                    >
                      {mess}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.footer}>
                <View
                  style={{
                    bottom: 0,
                    height: 45,
                    flex: 1,
                    marginRight: 10,
                    backgroundColor: "#ECECEC",
                    padding: 10,
                    borderRadius: 30,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  <TextInput
                    value={message}
                    multiline
                    onChangeText={(text) => setMessage(text)}
                    placeholder="Write a message..."
                    style={styles.textInput}
                  />
                  <Ionicons
                    style={{
                      marginLeft: 5,
                    }}
                    name="attach"
                    color="black"
                    size={24}
                  />
                  {!message ? (
                    <Ionicons
                      style={{
                        marginLeft: 10,
                      }}
                      name="camera-outline"
                      color="black"
                      size={24}
                    />
                  ) : (
                    <TouchableOpacity disabled={true}>
                      <Ionicons
                        style={{
                          marginLeft: -30,
                          opacity: 0,
                        }}
                        name="camera-outline"
                        color="black"
                        size={24}
                      />
                    </TouchableOpacity>
                  )}
                </View>

                <TouchableOpacity
                  onPress={submitMessage}
                  disabled={!message}
                  style={{
                    backgroundColor: "#0C6157",
                    borderRadius: 999,
                    height: 50,
                    width: 50,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  activeOpacity={0.5}
                >
                  <Ionicons name="paper-plane" color="#FFF" size={24} />
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
};

export default ChatRoomScreen;

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    width: "100%",
    padding: 15,
    alignItems: "center",
  },
  textInput: {
    color: "black",
    flex: 1,
    paddingLeft: 5,
    height: 30,
  },
});
