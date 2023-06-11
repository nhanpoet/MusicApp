import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { categoryData } from "../constants";
import { ScrollView } from "react-native";

const Category = ({ activeCategory, setActiveCategory }) => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View
        style={{ backgroundColor: "rgba(27, 20, 19, 0.2)" }}
        className="flex-row  mx-4 space-x-4  h-fit py-4"
      >
        {categoryData.map((data, index) => {
          let isActive = data.name == activeCategory;
          let btnClass = isActive ? "#1DDA63" : "rgba(255, 255, 255, 0.1)";

          return (
            <TouchableOpacity
              key={index}
              onPress={() => setActiveCategory(data.name)}
              style={{ backgroundColor: btnClass }}
              className="rounded-2xl py-2 px-3"
            >
              <Text className="font-semibold text-white" key={index}>
                {data.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default Category;
