import React, { useContext, useEffect, useState } from "react";
import { KeyboardAvoidingView, StyleSheet } from "react-native";
import * as Yup from "yup";
// import * as Location from 'expo-location'
import * as firebase from "firebase"
import 'firebase/firestore';


import {
  AppForm as Form,
  AppFormField as FormField,
  AppFormPicker as Picker,
  SubmitButton,
} from "../components/forms";
// import FormImagePicker from "../components/forms/FormImagePicker";
import Screen from "../components/Screen";
//import useLocation from "../hooks/useLocation";
import AuthContext from "../config/context";
import authStorage from '../config/storage'
import { ScrollView } from "react-native-gesture-handler";


const validationSchema = Yup.object().shape({
  password: Yup.string().required().min(6).label("password")
});



function Profile({navigation}) {
  //const location = useLocation();
  // const [imageUri,setImageUri]=useState()
  const authContext = useContext(AuthContext)
  

  // async function uploadImageAsync(uri, values) {
  //   const blob = await new Promise((resolve, reject) => {
  //     const xhr = new XMLHttpRequest();
  //     xhr.onload = function() {
  //       resolve(xhr.response);
  //     };
  //     xhr.onerror = function(e) {
  //       console.log(e);
  //       reject(new TypeError('Network request failed'));
  //     };
  //     xhr.responseType = 'blob';
  //     xhr.open('GET', uri, true);
  //     xhr.send(null);
  //   });
  
  //   const ref = firebase
  //     .storage()
  //     .ref().child("profileImage"+authContext.userDetails.uid)
  
  //   const snapshot = await ref.put(blob);
  
  //   // We're done with the blob, close and release it
  //   blob.close();
  //   let imageref= await snapshot.ref.getDownloadURL();
  //   console.log(imageref)
  //   let databasevalues = {...values, images: imageref, time: firebase.firestore.FieldValue.serverTimestamp()}

  //   return await snapshot.ref.getDownloadURL();
  // }


//   const handleSubmit = async (values) => {
//     navigation.goBack()
//     console.log(values)
//     const image = await uploadImageAsync(values.image[0], values)
//     values.image = image
//     const userRef =firebase.firestore().collection("user")
//     const snapshot = await userRef.where('email', '==', values.email ).get()
//     if (!snapshot.empty) {
//       firebase.firestore().collection('user').doc(authContext.userDetails.docId).update(values).then(storeUser(values.email))
      
//     }
//     else {
//       console.log("Already Registered")
      
//     }  
//   }

// async function storeUser (email) {
//   const userRef =firebase.firestore().collection("user")
//   const snapshot = await userRef.where('email', '==', email ).get()
//   await snapshot.forEach(doc => {
//     if(email === doc.data().email){
//       let u = doc.data();
//       u.docId = doc.id
//       console.log(u)
      
//       authStorage.storeToken(JSON.stringify(u))
//       console.log("Hello")
//       authContext.setUserDetails(u);
//       console.log(authContext.userDetails)
//     }
//     else{
//       console.log("Error While Saving")
//     }
//   });
//   console.log(authContext.userDetails)
//   return
// }
// Ask signed in user for current password.
 const handleChange = async (values)=>{
   console.log(values)
   console.log(authContext.userDetails)
   await  firebase.firestore().collection('user').doc(authContext.userDetails.docId).update({password:values.password})
   console.log("hey")
   navigation.goBack();
   alert('done')
    
  }

  return (
    <ScrollView>
      <KeyboardAvoidingView>


    <Screen style={styles.container}>
      <Form
        initialValues={{password:''}}
        validationSchema={validationSchema}
        onSubmit={(values)=>handleChange(values)}
      >
      
        
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="key"
          name="password"
          // defaultValue = {authContext.userDetails.email}
          secureTextEntry={true}
         

          editable ={true}
        />
        
       
        


        <SubmitButton title="Savee"  />
      </Form>
    </Screen>
          </KeyboardAvoidingView>
</ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
export default Profile ;
