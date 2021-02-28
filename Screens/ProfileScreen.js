// Screen for profile of the user, to show users details

import React, { useContext } from "react";
import { View, SafeAreaView, StyleSheet } from "react-native";
import Screen from "../components/Screen";
import { ScrollView } from "react-native-gesture-handler";
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from "react-native-paper";

import * as firebase from "firebase";
import "firebase/firestore";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import authStorage from "../config/storage";
import AuthContext from "../config/context";
import { Navigation } from "react-native-navigation";

const ProfileScreen = ({ props, navigation }) => {
  const authContext = useContext(AuthContext);
  console.log(authContext.userDetails);

  return (
    <ScrollView {...props}>
      <Screen>
        <SafeAreaView style={styles.container}>
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: "row", marginTop: 15 }}>
              {
                <Avatar.Image
                  source={{ uri: authContext.userDetails.image }}
                  size={80}
                />
              }
              <View style={{ marginLeft: 20 }}>
                <Title
                  style={[
                    styles.title,
                    {
                      marginTop: 15,
                      marginBottom: 5,
                    },
                  ]}
                >
                  {authContext.userDetails.name}
                </Title>
                <Caption style={styles.caption}></Caption>
              </View>
            </View>
          </View>

          <View style={styles.userInfoSection}>
            <View style={styles.row}>
              <Icon name="map-marker-radius" color="#4682b4" size={20} />
              <Text style={{ color: "#777777", marginLeft: 20 }}>
                {authContext.userDetails.address}
              </Text>
            </View>
            <View style={styles.row}>
              <Icon name="desk" color="#4682b4" size={20} />
              <Text style={{ color: "#777777", marginLeft: 20 }}>
                {authContext.userDetails.position}
              </Text>
            </View>
            <View style={styles.row}>
              <Icon name="email" color="#4682b4" size={20} />
              <Text style={{ color: "#777777", marginLeft: 20 }}>
                {authContext.userDetails.email}
              </Text>
            </View>
          </View>

          <View style={styles.menuWrapper}>
            {
              <TouchableRipple
                onPress={() => {
                  navigation.navigate("EditProfile");
                }}
              >
                <View style={styles.menuItem}>
                  <Icon name="key-outline" color="#4682b4" size={25} />
                  <Text style={styles.menuItemText}>Change Password</Text>
                </View>
              </TouchableRipple>
            }

            <TouchableRipple
              onPress={() => {
                authContext.setUserDetails(null);
                authStorage.removeToken();
                firebase.auth().signOut();
              }}
            >
              <View style={styles.menuItem}>
                <Icon name="logout" color="#4682b4" size={25} />
                <Text style={styles.menuItemText}>Logout</Text>
              </View>
            </TouchableRipple>
          </View>
        </SafeAreaView>
      </Screen>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: "#dddddd",
    borderBottomWidth: 1,
    borderTopColor: "#dddddd",
    borderTopWidth: 1,
    flexDirection: "row",
    height: 100,
  },
  infoBox: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: "#777777",
    marginLeft: 20,
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 26,
  },
});
