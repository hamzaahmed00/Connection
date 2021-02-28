import React, { useContext, useEffect } from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Icon from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import {
  createStackNavigator,
  HeaderBackground,
} from "@react-navigation/stack";

import { useTheme, Avatar } from "react-native-paper";
import { View, Image, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import Exams from "../Screens/Exams";
import Instructions from "../Screens/Instructions";
import Feed from "../Screens/Feed";
import Votes from "../Screens/Votes";
import ProfileScreen from "../Screens/ProfileScreen";
import { colors } from "react-native-elements";
import EditProfile from "../Screens/EditProfile";
import AppText from "../components/AppText";
import AuthContext from "../config/context";

const Tab = createBottomTabNavigator();

const HomeStack = createStackNavigator();
const ExamStack = createStackNavigator();
const InstructionsStack = createStackNavigator();
const VotesStack = createStackNavigator();
const ProfileStack = createStackNavigator();

const TabBar = () => (
  <Tab.Navigator
    screenOptions={{
      headerShowen: false,
    }}
    initialRouteName="Feed"
    activeColor={"#4682b4"}
  >
    <Tab.Screen
      name="Feed"
      component={HomeStackScreen}
      options={{
        tabBarLabel: "Home",
        tabBarColor: colors.white,
        activeBackgroundColor: colors.blue,
        tabBarIcon: ({ color }) => (
          <Icon name="ios-home" color={"#4682b4"} size={24} />
        ),
      }}
    />
    <Tab.Screen
      name="Exams"
      headerShowen={false}
      component={ExamStackScreen}
      options={{
        tabBarLabel: "Exams",
        tabBarColor: colors.white,
        // activeBackgroundColor:colors.blue,
        tabBarIcon: ({ color }) => (
          <Icon name="ios-book" color={"#4682b4"} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Instuctions"
      component={InstructionsStackScreen}
      options={{
        tabBarLabel: "Instructions",
        tabBarColor: colors.white,
        activeBackgroundColor: colors.blue,
        tabBarIcon: ({ color }) => (
          <Icon name="ios-notifications" color={"#4682b4"} size={26} />
        ),
      }}
    />

    <Tab.Screen
      name="Votes"
      component={VotesStackScreen}
      options={{
        tabBarAccessibilityLabel: "Vote",
        tabBarLabel: "Vote",
        tabBarColor: colors.white,
        activeBackgroundColor: colors.blue,
        tabBarIcon: () => <Icon name="checkbox" color={"#4682b4"} size={26} />,
      }}
    />
  </Tab.Navigator>
);

export default TabBar;

const HomeStackScreen = ({ navigation }) => {
  const authContext = useContext(AuthContext);

  const { colors } = useTheme();
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#FFF",
          shadowColor: colors.background, // iOS
          elevation: 10, // Android
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <HomeStack.Screen
        name="Feed"
        component={Feed}
        options={{
          title: "Home",

          headerRight: () => (
            <View style={{ flexDirection: "row", marginRight: 10 }}>
              <TouchableOpacity
                style={{ paddingHorizontal: 10, marginTop: 5 }}
                onPress={() => {
                  navigation.navigate("ProfileStackScreen");
                }}
              >
                <Avatar.Image
                  source={{ uri: authContext.userDetails.image }}
                  size={30}
                ></Avatar.Image>
              </TouchableOpacity>
            </View>
          ),
        }}
      />

      <HomeStack.Screen
        name="ProfileStackScreen"
        component={ProfileStackScreen}
        options={({ route }) => ({
          headerShown: false,
          title: "Profile",
          headerBackTitleVisible: false,
          // headerTitle: false,
          // headerTransparent: true,
          headerTintColor: "#000000",
        })}
      />
    </HomeStack.Navigator>
  );
};

const ExamStackScreen = ({ navigation }) => {
  const authContext = useContext(AuthContext);

  const { colors } = useTheme();
  return (
    <ExamStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#FFF",
          shadowColor: colors.background, // iOS
          elevation: 0, // Android
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <ExamStack.Screen
        name="Exams"
        component={Exams}
        options={{
          title: "Exams",
          headerRight: () => (
            <View style={{ flexDirection: "row", marginRight: 10 }}>
              <TouchableOpacity
                style={{ paddingHorizontal: 10, marginTop: 5 }}
                onPress={() => {
                  navigation.navigate("ProfileStackScreen");
                }}
              >
                <Avatar.Image
                  source={{ uri: authContext.userDetails.image }}
                  size={30}
                ></Avatar.Image>
              </TouchableOpacity>
            </View>
          ),
        }}
      />
    </ExamStack.Navigator>
  );
};

const InstructionsStackScreen = ({ navigation }) => {
  const authContext = useContext(AuthContext);

  const { colors } = useTheme();
  return (
    <InstructionsStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#fff",
          shadowColor: colors.background, // iOS
          elevation: 0, // Android
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <InstructionsStack.Screen
        name="Instructions"
        component={Instructions}
        options={{
          title: "Inst",
          headerRight: () => (
            <View style={{ flexDirection: "row", marginRight: 10 }}>
              <TouchableOpacity
                style={{ paddingHorizontal: 10, marginTop: 5 }}
                onPress={() => {
                  navigation.navigate("ProfileStackScreen");
                }}
              >
                <Avatar.Image
                  source={{ uri: authContext.userDetails.image }}
                  size={30}
                ></Avatar.Image>
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <InstructionsStack.Screen name="Profile" component={ProfileStackScreen} />
    </InstructionsStack.Navigator>
  );
};

const VotesStackScreen = ({ navigation }) => {
  const authContext = useContext(AuthContext);

  const { colors } = useTheme();
  return (
    <VotesStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#fff",
          shadowColor: colors.background, // iOS
          elevation: 0, // Android
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <VotesStack.Screen
        name="Votes"
        component={Votes}
        options={{
          title: "Votes",
          headerRight: () => (
            <View style={{ flexDirection: "row", marginRight: 10 }}>
              <TouchableOpacity
                style={{ paddingHorizontal: 10, marginTop: 5 }}
                onPress={() => {
                  navigation.navigate("ProfileStackScreen");
                }}
              >
                <Avatar.Image
                  source={{ uri: authContext.userDetails.image }}
                  size={30}
                ></Avatar.Image>
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <VotesStack.Screen name="Profile" component={ProfileStackScreen} />
    </VotesStack.Navigator>
  );
};
const ProfileStackScreen = ({ navigation }) => {
  const authContext = useContext(AuthContext);

  const { colors } = useTheme();
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#fff",
          shadowColor: colors.background, // iOS
          elevation: 0, // Android
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <ProfileStack.Screen name="Profile" component={ProfileScreen} />
      <ProfileStack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          title: "Change Password",
        }}
      />
    </ProfileStack.Navigator>
  );
};
