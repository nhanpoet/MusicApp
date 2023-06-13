import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useContext, useRef, useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Player } from "../contexts/PlayerContext";
import { BottomModal, ModalContent } from "react-native-modals";
import { Audio } from "expo-av";

const PlaylistScreen = () => {
  const { params } = useRoute();
  let data = params;

  const { currentTrack, setCurrentTrack } = useContext(Player);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentSound, setCurrentSound] = useState(null);
  const [progress, setProgress] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const navigation = useNavigation();

  const playTrack = async () => {
    setIsPlaying(false); // Dừng bài hát hiện tại

    if (data?.music.length > 0) {
      const trackWithIdOne = data.music.find((track) => track.id === 1);

      if (trackWithIdOne) {
        await setCurrentTrack(trackWithIdOne);
        await play(trackWithIdOne.audio);
      }
      console.log(trackWithIdOne);
    }
  };

  const play = async (audioFile) => {
    try {
      if (currentSound) {
        await currentSound.stopAsync(); // Dừng bài hát hiện tại (nếu có)
      }
      const soundObject = new Audio.Sound();
      await soundObject.loadAsync(audioFile);
      await soundObject.playAsync();
      soundObject.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
      setCurrentSound(soundObject);
      setIsPlaying(true);
      // Cập nhật trạng thái đang chạy của bài hát
    } catch (error) {
      console.log("Error playing audio", error);
    }
  };

  const onPlaybackStatusUpdate = async (status) => {
    if (status.isLoaded && status.isPlaying) {
      const progress = status.positionMillis / status.durationMillis;
      setProgress(progress);
      setCurrentTime(status.positionMillis);
      setTotalDuration(status.durationMillis);
    }
    if (status.didJustFinish === true) {
      setCurrentSound(null);

      await playNextTrack();
    }
  };

  const circleSize = 12;
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handlePlayPause = async () => {
    if (currentSound) {
      if (isPlaying) {
        await currentSound.pauseAsync();
        setIsPlaying(false);
      } else {
        await currentSound.playAsync();
        setIsPlaying(true);
      }
    }
  };

  const playNextTrack = async () => {
    setIsPlaying(false); // Dừng bài hát hiện tại
    const currentTrackIndex = data?.music.findIndex(
      (item) => item.id === currentTrack.id
    );
    const nextTrackIndex = (currentTrackIndex + 1) % data?.music.length;
    await setCurrentTrack(data?.music[nextTrackIndex]);
    await play(data?.music[nextTrackIndex].audio);
  };

  const playPreviousTrack = async () => {
    setIsPlaying(false); // Dừng bài hát hiện tại
    const currentTrackIndex = data?.music.findIndex(
      (item) => item.id === currentTrack.id
    );
    const previousTrackIndex =
      (currentTrackIndex - 1 + data?.music.length) % data?.music.length;
    await setCurrentTrack(data?.music[previousTrackIndex]);
    await play(data?.music[previousTrackIndex].audio);
  };

  return (
    <>
      <View>
        <StatusBar barStyle={"dark-content"} />
        <ScrollView>
          <View>
            <Image source={data.img} className="w-full h-96" />
            <TouchableOpacity
              style={{ backgroundColor: "rgba(27, 20, 19, 0.5)" }}
              className="absolute top-14 left-4  rounded-full flex-row items-center justify-center w-10 h-10"
              onPress={() => navigation.goBack()}
            >
              <Icon name="arrow-left" size={26} color={"#1DDA63"} />
            </TouchableOpacity>
            <View className="bg-[#1B1413] opacity-60 absolute bottom-0 w-full h-24"></View>
            <View className="absolute bottom-2 mx-4  ">
              <Text className="text-[#1DDA63] font-semibold text-2xl">
                {data.singer}
              </Text>
              <Text className="text-white font-semibold text-xl">
                Playlist. {data.name}
              </Text>
              <View className="flex-row items-center space-x-3 ">
                <Text className="w-1 h-1 rounded-full bg-[#1DDA63]"></Text>
                <Text className="text-[#1DDA63] font-normal text-xs">2022</Text>
                <Text className="w-1 h-1 rounded-full bg-[#1DDA63]"></Text>
                <Text className="text-[#1DDA63] font-normal text-xs">
                  {data?.music?.length} bài hát
                </Text>
                <Text
                  style={{ color: "rgba(255, 255, 255, 0.3)" }}
                  className="font-normal text-xs"
                >
                  36 phút 42 giây
                </Text>
              </View>
            </View>
          </View>

          <View className="bg-[#1B1413] w-full h-screen">
            <View
              style={{ backgroundColor: "rgba(29, 218, 99, 0.03) " }}
              className="w-full h-16 flex-row items-center justify-between px-4"
            >
              <View className="flex-row items-center space-x-2">
                <TouchableOpacity
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                  className="flex-row items-center px-4 py-2 rounded-3xl w-36 h-9"
                >
                  <Text className="font-semibold text-sm text-[#1DDA63]">
                    Theo dõi nghệ sĩ
                  </Text>
                </TouchableOpacity>
                <Icon name="dots-horizontal" size={28} color={"#1DDA63"} />
              </View>

              <View className="flex-row items-center space-x-2">
                <TouchableOpacity
                  onPress={playTrack}
                  className="bg-[#1DDA63] w-12 h-12 rounded-full flex-row items-center justify-center"
                >
                  <Icon name="google-play" size={28} color={"#1B1413"} />
                </TouchableOpacity>
                <Text className="text-lg font-semibold text-[#1DDA63]">
                  Phát
                </Text>
              </View>
            </View>
            <Text
              style={{ color: "rgba(255, 255, 255, 0.5)" }}
              className="font-normal text-xs mx-4 mt-2"
            >
              Danh sách
            </Text>
            <View className="bg-[#1DDA63] w-full h-[0.5px] mt-2"></View>

            <View className="m-4 flex-col space-y-4">
              {data?.music?.map((item, index) => {
                const handlePress = async () => {
                  await setCurrentTrack(item);
                  await play(item.audio);
                };
                return (
                  <TouchableOpacity
                    onPress={handlePress}
                    key={index}
                    style={{ backgroundColor: "rgba(255, 255, 255, 0.04)" }}
                    className="w-full h-14 rounded-3xl flex-row items-center px-6 justify-between"
                  >
                    <View>
                      <Text className="text-[#1DDA63] font-semibold text-sm">
                        {item.name}
                      </Text>
                      <Text className="text-white font-normal text-xs">
                        {item.singer}
                      </Text>
                    </View>
                    <View className="flex-row items-center space-x-3">
                      <Icon
                        name="heart-outline"
                        size={28}
                        color={"rgba(255, 255, 255, 0.2)"}
                      />
                      <Icon
                        name="dots-horizontal"
                        size={28}
                        color={"#1DDA63"}
                      />
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </ScrollView>
        {currentTrack && (
          <TouchableOpacity
            onPress={() => setModalVisible(!modalVisible)}
            style={{ backgroundColor: "#1B1413" }}
            className="absolute bottom-2 px-4   w-[100%] h-20  flex-row items-center space-x-4  justify-between "
          >
            <Image source={currentTrack?.img} className="w-16 h-full" />

            <View className="flex-col items-center w-40">
              <Text className="text-[#1DDA63] font-semibold text-xl h-7 ">
                {currentTrack?.name}
              </Text>
              <Text className="text-white font-semibold text-sm">
                {currentTrack?.singer}
              </Text>
            </View>

            <View className="flex-row items-center space-x-3">
              <Icon
                name="heart-outline"
                size={28}
                color={"rgba(255, 255, 255, 0.2)"}
              />
              <TouchableOpacity
                onPress={handlePlayPause}
                className="bg-[#1DDA63] rounded-full w-10 h-10 flex items-center justify-center"
              >
                {isPlaying ? (
                  <Icon name="pause" size={30} color={"white"} />
                ) : (
                  <TouchableOpacity
                    onPress={handlePlayPause}
                    className="bg-[#1DDA63] rounded-full w-10 h-10 flex items-center justify-center"
                  >
                    <Icon name="play" size={30} color={"white"} />
                  </TouchableOpacity>
                )}
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      </View>
      <BottomModal
        visible={modalVisible}
        onHardwareBackPress={() => setModalVisible(false)}
        swipeDirection={["up", "down"]}
        swipeThreshold={200}
      >
        <ModalContent className="w-full h-full  bg-[#1B1413]">
          <View>
            <TouchableOpacity
              onPress={() => setModalVisible(!modalVisible)}
              style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
              className="w-11 h-11 mt-6 rounded-full flex items-center justify-center"
            >
              <Icon name="arrow-down" size={30} color={"#1DDA63"} />
            </TouchableOpacity>

            <Image
              source={currentTrack?.img}
              className="w-full h-96 rounded-3xl mt-6"
            />

            <View className="flex-row items-center justify-between mt-4">
              <Text className="text-2xl font-semibold text-white">
                {currentTrack?.name}
              </Text>
              <Icon
                name="heart-outline"
                size={30}
                color={"rgba(255, 255, 255, 0.2)"}
              />
            </View>
            <Text className="text-base font-semibold text-gray-400">
              {currentTrack?.singer}
            </Text>

            <View style={{ marginTop: 10 }}>
              <View
                style={{
                  width: "100%",
                  marginTop: 10,
                  height: 3,
                  backgroundColor: "gray",
                  borderRadius: 5,
                }}
              >
                <View
                  style={[styles.progressbar, { width: `${progress * 100}%` }]}
                />
                <View
                  style={[
                    {
                      position: "absolute",
                      top: -5,
                      width: circleSize,
                      height: circleSize,
                      borderRadius: circleSize / 2,
                      backgroundColor: "white",
                    },
                    {
                      left: `${progress * 100}%`,
                      marginLeft: -circleSize / 2,
                    },
                  ]}
                />
              </View>
              <View
                style={{
                  marginTop: 12,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{ color: "white", fontSize: 15, color: "#D3D3D3" }}
                >
                  {formatTime(currentTime)}
                </Text>

                <Text
                  style={{ color: "white", fontSize: 15, color: "#D3D3D3" }}
                >
                  {formatTime(totalDuration)}
                </Text>
              </View>
            </View>
          </View>

          <View className="flex-row items-center justify-between mt-8">
            <Icon name="repeat" size={30} color={"#1DDA63"} />
            <TouchableOpacity onPress={playPreviousTrack}>
              <Icon name="skip-previous" size={40} color={"white"} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handlePlayPause}
              className="bg-[#1DDA63] rounded-full w-16 h-16 flex items-center justify-center"
            >
              {isPlaying ? (
                <Icon name="pause" size={50} color={"white"} />
              ) : (
                <TouchableOpacity
                  onPress={handlePlayPause}
                  className="bg-[#1DDA63] rounded-full w-16 h-16 flex items-center justify-center"
                >
                  <Icon name="play" size={50} color={"white"} />
                </TouchableOpacity>
              )}
            </TouchableOpacity>

            <TouchableOpacity onPress={playNextTrack}>
              <Icon name="skip-next" size={40} color={"white"} />
            </TouchableOpacity>
            <Icon name="music-box-multiple" size={30} color={"#1DDA63"} />
          </View>
        </ModalContent>
      </BottomModal>
    </>
  );
};

const styles = StyleSheet.create({
  progressbar: {
    height: "100%",
    backgroundColor: "white",
  },
});

export default PlaylistScreen;
