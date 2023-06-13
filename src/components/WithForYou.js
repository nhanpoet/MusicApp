import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { playlistData } from "../constants/index";
import { Image } from "react-native";
import { ScrollView } from "react-native";

const WithForYou = ({ activeCategory, navigation }) => {
  return (
    <View className="mt-3 ml-4">
      <Text className="font-semibold text-2xl tracking-wider text-white">
        Dành cho Npoet!
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingRight: 20 }}
      >
        <View className="flex-row space-x-4 my-4">
          {playlistData
            .filter((playlist) => playlist.category === activeCategory)
            .map((data, index) => {
              return (
                <View key={index}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Playlist", { ...data })}
                  >
                    <Image
                      source={data.img}
                      className="w-40 h-40 rounded-3xl"
                    />
                    <Text className=" text-white text-sm mt-1 font-semibold w-36">
                      Playlist. {data.name}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            })}
        </View>
      </ScrollView>
    </View>
  );
};

export default WithForYou;
