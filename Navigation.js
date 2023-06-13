import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState } from "react";
import Feather from "react-native-vector-icons/Feather";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import FavoriteScreen from "./src/screens/FavoriteScreen";
import HomeScreen from "./src/screens/HomeScreen";
import PlaylistScreen from "./src/screens/PlaylistScreen";
import PremiumScreen from "./src/screens/PremiumScreen";
import SearchScreen from "./src/screens/SearchScreen";
import LoadingScreen from "./src/screens/LoadingScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabBottom = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 70,
          backgroundColor: "black",
          paddingTop: 10,
          paddingBottom: 15,
          borderTopColor: "black",
        },
        tabBarInactiveTintColor: "white",
        tabBarActiveTintColor: "#1DDA63",
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarLabel: "Search",
          tabBarIcon: ({ color, size }) => (
            <Feather name="search" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={FavoriteScreen}
        options={{
          tabBarLabel: "Favorite",
          tabBarIcon: ({ color, size }) => (
            <Feather name="heart" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Premium"
        component={PremiumScreen}
        options={{
          tabBarLabel: "Premium",
          tabBarIcon: ({ color, size }) => (
            <Icon name="spotify" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Loading"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Loading" component={LoadingScreen} />
        <Stack.Screen name="Main" component={TabBottom} />
        <Stack.Screen name="Playlist" component={PlaylistScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
