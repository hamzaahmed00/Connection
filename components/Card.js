import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AppText from "./AppText";
import colors from "../config/colors";
import { Avatar } from "react-native-paper";
import { Colors } from "react-native/Libraries/NewAppScreen";

function Card({
  title,
  subTitle,
  image,
  image1,
  hq,
  isImage,
  admin,
  video,
  isVideo,
  feedImageStyle,
  feedStyle,
  isFeedPost = false,
  like,
  onLikePress,
  onPress,
}) {
  const [mute, setMute] = useState(false);
  return (
    <View style={[styles.card, feedStyle]}>
      <View
        style={{ padding: 10, borderRadius: 7, backgroundColor: "#4682b4" }}
      >
        <View style={{ flexDirection: "row" }}>
          {image1 && <Avatar.Image size={40} source={{ uri: image1 }} />}
          {admin && (
            <AppText style={{ marginTop: 10, marginLeft: 10, color: "white" }}>
              {admin}
            </AppText>
          )}
        </View>
        {hq && (
          <AppText style={{ color: "white", fontWeight: "bold" }}>
            Head Office
          </AppText>
        )}
      </View>
      <View style={styles.detailsContainer}>
        <TouchableWithoutFeedback onPress={onPress}>
          <AppText style={styles.title}>{title}</AppText>
        </TouchableWithoutFeedback>
        <AppText style={styles.subTitle}>{subTitle}</AppText>
      </View>
      <View style={{ alignItems: "center" }}>
        {image && (
          <TouchableWithoutFeedback onPress={onPress}>
            <Image
              resizeMethod="scale"
              resizeMode="contain"
              style={[styles.image]}
              source={{ uri: image }}
            />
          </TouchableWithoutFeedback>
        )}
        {isVideo && (
          <TouchableWithoutFeedback
            onPress={() => {
              setMute(!mute);
            }}
          >
            <Video
              source={{ uri: image }}
              rate={1.0}
              volume={1.0}
              isMuted={!mute}
              resizeMode="contain"
              isLooping={mute}
              shouldPlay={mute}
              style={{ width: 300, height: 300 }}
            />
          </TouchableWithoutFeedback>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 20,
    borderRadius: 15,
    backgroundColor: colors.white,
    overflow: "hidden",
  },
  detailsContainer: {
    marginTop: 100,
  },

  image: {
    aspectRatio: 1,
    height: 500,
    width: 500,
    alignSelf: "center",
  },
  subTitle: {
    color: colors.secondary,
    fontWeight: "bold",
  },
  title: {
    marginTop: -100,
    padding: 10,
  },
});

export default Card;
