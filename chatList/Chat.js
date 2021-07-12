import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/core";
import {auth} from '../firebase'

const Chat = ({ id, imageUrl, username, time, email, reName, reEmail, reImage, lastMessage }) => {

    const navigation = useNavigation()

    const goTo = () => {
        navigation.navigate("ChatRoom", {
            id: id,
            imageUrl: email === auth?.currentUser?.email ? reImage : imageUrl,
            username: email === auth?.currentUser?.email ? reName : username
        })
    }
    return (
    <View style={{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        width: "100%",
        paddingBottom: 10
    }}>

    <View style={{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center"
    }}>

        <Image style={{
            height: 55,
            width: 55,
            borderRadius: 999,
            marginRight: 10,
            marginLeft: 10
        }} source={{ uri: email === auth?.currentUser?.email ? reImage : reEmail === auth?.currentUser?.email ? imageUrl : console.log("a") }} />

        <TouchableOpacity style={{
            paddingVertical: 5
        }} onPress={goTo}>
            <Text style={{
                fontWeight: "bold",
                fontSize: 16,
                letterSpacing: 2
            }}>{
                email === auth?.currentUser?.email ? reName : reEmail === auth?.currentUser?.email ? username : console.log("a")
            }</Text>
            <Text style={{
                color: "gray"
            }}>{lastMessage}</Text>
        </TouchableOpacity>

    </View>

        <Text style={{
            fontSize: 10,
            marginRight: 20
        }}>{new Date(time?.toDate()).toDateString()}</Text>
      
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({});
