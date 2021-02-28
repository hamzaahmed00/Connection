import React, { useContext, useEffect, useState } from "react";
import { FlatList, StyleSheet, View, TouchableHighlight } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Screen from "../components/Screen";
import Card from "../components/Card";
import colors from "../config/colors";
import AppButton from "../components/AppButton";
import AuthContext from "../config/context";
import * as firebase from "firebase";
import "firebase/firestore";

function Feed({ navigation }) {
  const authContext = useContext(AuthContext);
  // console.log(authContext.userDetails)

  //  const data = [
  //      {   id:1,

  //          description: 'hey,',
  //          image1 :require('../assets/profle.jpg'),

  //      },
  //      {
  //          id:2,

  //         description: 'Hello work fellas',
  //         image1 :require('../assets/profle.jpg'),

  //     },
  //     {
  //       id:3,

  //      description: 'Hello work fellas',
  //      image1 :require('../assets/profle.jpg'),

  //  }
  //  ]
  const [listings, setListings] = useState();

  //   const [refreshing, setRefreshing] = useState(false);
  //   const [loading,isLoading]=useState(false)

  async function loadData() {
    console.log("idr tk to agya");
    const postRef = await firebase.firestore().collection("posts").orderBy("time", "desc").get();
    setListings(postRef.docs.map((doc) => ({ id: doc.id, data: doc.data() })));
    postRef.forEach((doc) => {
      console.log("Logged In", listings);
    });
    isLoading(false);
  }

  //   const [listings,setListings] = useState()
  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("posts")
      .onSnapshot((snapshot) => {
        if (snapshot.size) {
          loadData();
        } else {
          console.log("empty");
        }
      });
    return () => {
      unsubscribe();
    };

    // setListings(data.map((item)=>({id:item.id ,image:item.image ,image1:item.image1,  description:item.description})))
  }, [firebase]);

  return (
    <Screen style={styles.screen}>
      <FlatList
        data={listings}
        keyExtractor={(listing) => listing.id.toString()}
        renderItem={({ item }) => (
          <Card
            feedStyle={styles.feedStyle}
            feedImageStyle={styles.feedImageStyle}
            title={item.data.description}
            admin={item.data.admin}
            image={item.data.image}
            image1={item.data.avatar}
            hq={item.data.hq}
          />
        )}
      />
    </Screen>
  );

  function checkVideo(type) {
    var str = String(type);
    if (str.includes("video")) {
      return true;
    } else return false;
  }
  function checkImage(type) {
    var str = String(type);
    if (str.includes("image")) {
      return true;
    } else return false;
  }
}

const styles = StyleSheet.create({
  screen: {
    padding: 20,
    backgroundColor: colors.light,
  },
  feedStyle: {
    borderRadius: 40,
    marginHorizontal: 20,
  },

  feedImageStyle: {
    aspectRatio: 1,
    alignSelf: "center",
    height: "85%",
  },
});

export default Feed;
