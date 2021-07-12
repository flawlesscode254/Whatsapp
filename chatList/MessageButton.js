import React from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/core'

const MessageButton = () => {
    const navigation = useNavigation()

    const change = () => {
        navigation.navigate("Users")
    }

    return (
            <View style={{
                backgroundColor: "#0C6157",
                width: 45,
                height: 45,
                borderRadius: 999,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "absolute",
                bottom: 20,
                right: 20,
                top: 530
            }}> 
                <TouchableOpacity onPress={change}>
                    <AntDesign 
                        name="message1"
                        size={24}
                        color="#FFF"
                    />   
                </TouchableOpacity>    
            </View>
    )
}

export default MessageButton

const styles = StyleSheet.create({})
