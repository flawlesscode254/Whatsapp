import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar, View, Image, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons'

import ProfileScreen from './screens/ProfileScreen';
import topTabNavigation from './navigation/topTabNavigation';
import ChatRoomScreen from './screens/ChatRoomScreen';
import StartChatScreen from './screens/StartChatScreen';
import SignupScreen from './screens/SignUp';
import SigninScreen from './screens/SignIn';

const Stack = createStackNavigator();

const App = () => {

  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#0C6157" barStyle="default" />
      <Stack.Navigator initialRouteName="SignIn" screenOptions={{
        headerStyle: {
          backgroundColor: "#0C6157",
          shadowOpacity: 0,
          elevation: 0
        },
        headerTitleAlign: "left",
        headerTintColor: "#FFF",
        headerTitleStyle: {
          fontWeight: "bold",
          letterSpacing: 2
        }
      }}>
        <Stack.Screen 
            name="SignIn"
            component={SigninScreen}
        />

        <Stack.Screen
          name="Home"
          component={topTabNavigation}
          options={{ 
            title: 'WhatsApp',
            headerRight: () => (
              <View style={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "row",
                alignItems: "center"
              }}>
                <Ionicons style={{
                  marginRight: 15
                }} name="search-outline" color="#FFF" size={20} />
                <Ionicons style={{
                  marginRight: 10
                }} name="ellipsis-vertical" color="#FFF" size={20} />
              </View>
            )
          }}
        />
        <Stack.Screen 
          name="Profile" 
          component={ProfileScreen} 
        />
        <Stack.Screen 
          name="ChatRoom" 
          component={ChatRoomScreen}
          options={({ route }) => ({
            headerTitle: () => (
              <View style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                flexDirection: "row",
                marginLeft: -30
              }}>
                <Image style={{
                  width: 45,
                  height: 45,
                  borderRadius: 999,
                  marginRight: 7
                }} source={{ uri: route.params.imageUrl }} />
                <View>
                  <Text style={{
                    color: "#FFF",
                    fontWeight: "bold",
                    fontSize: 18,
                    letterSpacing: 2
                  }}>{route.params.username}</Text>
                  <Text style={{
                    color: "#FFF",
                    fontSize: 10
                  }}>Last seen at Fri Jul 9 3:15 PM </Text>
                </View>
                
              </View>
            ),
            title: null,
            headerRight: () => (
              <View style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "row"
              }}>
                <Ionicons style={{
                  marginRight: 20
                }} name="videocam" size={20} color="#FFF" />
                <Ionicons style={{
                  marginRight: 20
                }} name="call" size={20} color="#FFF" />
                <Ionicons style={{
                  marginRight: 5
                }} name="ellipsis-vertical" size={20} color="#FFF" />
              </View>
            )
          })}
        />
        <Stack.Screen 
          name="Users" 
          component={StartChatScreen}
          options={{
            headerRight: () => (
              <View style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "row"
              }}>
                <Ionicons style={{
                  marginRight: 20
                }} name="search" size={20} color="#FFF" />
                <Ionicons style={{
                  marginRight: 5
                }} name="ellipsis-vertical" size={20} color="#FFF" />
              </View>
            )
          }}
        />
        
          <Stack.Screen 
            name="SignUp"
            component={SignupScreen}
          />

      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App