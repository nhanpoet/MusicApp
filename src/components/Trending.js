import { View, Text } from "react-native";
import React from "react";
import { ScrollView } from "react-native";
import { musicTrending } from "../constants";
import { Image } from "react-native";

const Trending = ({ activeCategory }) => {
  return (
    <View className="mt-4 ml-4 ">
      <Text className="font-semibold text-2xl tracking-wider text-white">
        Đang thịnh hành
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingRight: 20 }}
      >
        <View className="flex-row space-x-4 my-4">
          {musicTrending
            .filter((playlist) => playlist.category === activeCategory)
            .map((data, index) => {
              return (
                <View key={index}>
                  <Image
                    source={data.img}
                    className="w-32 h-32 rounded-2xl z-50"
                  />
                  <View
                    style={{ backgroundColor: "rgba(29, 218, 99, 0.4)" }}
                    className="w-32 h-32 rounded-2xl absolute top-1 left-1"
                  ></View>
                  <View
                    style={{ backgroundColor: "rgba(29, 218, 99, 0.2)" }}
                    className="w-32 h-32 rounded-2xl absolute top-2 left-2"
                  ></View>
                  <Text className=" text-white text-sm mt-2 font-semibold">
                    {data.name}
                  </Text>
                  <Text className="  text-xs mt-1 font-semibold text-[#1DDA63]">
                    Album. {data.album}
                  </Text>
                </View>
              );
            })}
        </View>
      </ScrollView>
    </View>
  );
};

export default Trending;
