import React from "react";
import FavoriteScreen from "./src/screens/FavoriteScreen";
import HomeScreen from "./src/screens/HomeScreen";
import PremiumScreen from "./src/screens/PremiumScreen";
import SearchScreen from "./src/screens/SearchScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Feather from "react-native-vector-icons/Feather";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
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
    </NavigationContainer>
  );
};

export default Navigation;
