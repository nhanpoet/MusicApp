import React, { useEffect, useRef } from "react";
import { View, Animated, Easing, Image, Dimensions } from "react-native";
import * as Animatable from "react-native-animatable";

const LoadingScreen = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const fadeIn = Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    });

    const rotate = Animated.timing(rotateAnim, {
      toValue: 1,
      duration: 2000,
      easing: Easing.linear,
      useNativeDriver: true,
    });

    const sequenceAnimation = Animated.sequence([fadeIn, rotate]);

    const loopAnimation = Animated.loop(sequenceAnimation);

    loopAnimation.start();

    // Redirect to another screen after a certain delay
    const redirectTimeout = setTimeout(() => {
      navigation.navigate("Main");
    }, 3000);

    // Clean up the animation and timeout
    return () => {
      loopAnimation.stop();
      clearTimeout(redirectTimeout);
    };
  }, [fadeAnim, rotateAnim, navigation]);

  const rotateZ = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const scale = fadeAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.5, 1.5, 1],
  });

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "black",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Animatable.Image
        source={require("../../assets/images/loading.png")}
        style={{
          opacity: fadeAnim,
          transform: [{ rotateZ }, { scale }],
        }}
        className="w-48 h-48"
        animation="fadeIn"
        duration={1000}
        useNativeDriver
      />
    </View>
  );
};

export default LoadingScreen;
