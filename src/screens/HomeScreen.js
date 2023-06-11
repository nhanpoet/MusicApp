import { View, Text, SafeAreaView, StatusBar } from "react-native";
import React, { useState } from "react";
import { Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Category from "../components/Category";
import { ScrollView } from "react-native";
import WithForYou from "../components/WithForYou";
import Trending from "../components/Trending";
import { categoryData } from "../constants";

const HomeScreen = () => {
  const [activeCategory, setActiveCategory] = useState(categoryData[0].name);

  return (
    <SafeAreaView className="flex-1">
      <StatusBar barStyle={"light-content"} />
      <Image
        blurRadius={8}
        source={require("../../assets/images/z4407164788175_31635c2aab77721f83e519604c408b47.jpg")}
        className="absolute w-full h-full"
      />
      <View className="flex-row items-center justify-between mt-2 mx-4">
        <Text className="lg:text-sm font-semibold text-xl tracking-wider text-white">
          Chào buổi tối!
        </Text>
        <View className="flex-row items-center space-x-4">
          <Icon name="bell-outline" size={28} color={"white"} />
          <View className="w-12 h-12 rounded-full border-2 border-[#1DDA63]">
            <Image
              source={require("../../assets/images/avatar.jpg")}
              className="w-full h-full rounded-full"
            />
          </View>
        </View>
      </View>

      <View className="bg-[#1DDA63] w-full h-[1px] mt-3"></View>
      <ScrollView>
        <View>
          <Category
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
        </View>
        <View>
          <WithForYou activeCategory={activeCategory} />
        </View>
        <View className="bg-[#1DDA63] w-full h-[1px] mt-3"></View>
        <View>
          <Trending activeCategory={activeCategory} />
        </View>
        <View>
          <Trending activeCategory={activeCategory} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
