import { StatusBar } from 'expo-status-bar';
import React ,{useContext,useEffect,useState} from 'react';
import { StyleSheet, Text, View, LogBox } from 'react-native';
import Login from './Screens/Login';
import Feed from './Screens/Feed';
import Instructions from './Screens/Instructions';
import Exams from './Screens/Exams'
import { NavigationContainer } from '@react-navigation/native';
import * as firebase from 'firebase';
import 'firebase/firestore';
import AuthContext from './config/context';
import TabBar from './navigation/TabBar';
import storage from './config/storage';
// import { AppLoading} from "expo";
import AppLoading from 'expo-app-loading'
import {navigationRef} from './navigation/rootNavigation'
LogBox.ignoreAllLogs();

 




const firebaseConfig = {
  apiKey: "AIzaSyChETdD91w8SK5_6b9mB3utmwgbmvW3-pM",
  authDomain: "connection-6692a.firebaseapp.com",
  projectId: "connection-6692a",
  storageBucket: "connection-6692a.appspot.com",
  messagingSenderId: "707043999808",
  appId: "1:707043999808:web:a2e5418f029947096cdfa5",
  measurementId: "G-CE2QJW6R6B"
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  console.log("hogya")
}




export default function app() {
  
  
  const [isReady,setIsReady]=useState(false)
  const [user,setUser]=useState(firebase.auth().currentUser)
  const [userDetails,setUserDetails]=useState()
  
  firebase.auth().onAuthStateChanged(function(fUser) {
    if (fUser) {
      setUser(fUser)
    } else {
      setUser(null)
    }
  });
  

  const restoreToken = async () => {
    try {
      const u = await firebase.auth().currentUser
      setUser(u)
      const token = JSON.parse(await storage.getToken())
      if(!token) return
      setUserDetails(token)
      console.log(token)
      
    } catch (error) {
      console.log(error)
    }
  }
  
  // const handleError = async  () =>{
  //   console.log("ERORR")
  // }


  if(!isReady){ 
    return (
      <View>
        {/* <Text>{err}</Text> */}
      <AppLoading
        startAsync={restoreToken}
        onFinish={() => setIsReady(true)}
        onError={console.warn}        
        />
        </View>
    );
  }
  else return (
    <AuthContext.Provider value = {{userDetails, setUserDetails}}>
   <NavigationContainer ref ={navigationRef}>
      
     {userDetails ? <TabBar/>:<Login/>}  
  
   {/* <MapScreen /> */}
   </NavigationContainer>
   </AuthContext.Provider>
   
   
  
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
