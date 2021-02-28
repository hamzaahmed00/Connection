import React, { useContext, useState } from "react";
import AppTextInput from "../components/AppTextInput";
import { Formik } from "formik";
import * as Yup from "yup";
import * as firebase from "firebase";
import "firebase/firestore";

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Image,
  ImageBackground,
  Modal,
  KeyboardAvoidingView,
  ScrollView,
  Keyboard,
} from "react-native";
// import AppButton from "../components/AppButton";
import ErrorAlert from "../components/errorAlert";
import { AppForm, SubmitButton } from "../components/forms";
import Screen from "../components/Screen";
import colors from "../config/colors";
import AuthContext from "../config/context";
import authStorage from "../config/storage";

export default function login({ navigation }) {
  const [open, setOpen] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string().required().email().label("Email"),
    password: Yup.string()
      .required()
      .min(4, "Atleast 4 characters")
      .label("Password"),
  });

  const authContext = useContext(AuthContext);

  const loginUser = async ({ email, password }) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error));
    // const f = firebase.auth().currentUser.reload();

    const userRef = firebase.firestore().collection("user");
    const snapshot = await userRef.where("email", "==", email).get();

    console.log("Process");

    if (snapshot.empty) {
      console.log("No matching documents.");
      return;
    } else {
      let i = 0;
      await snapshot.forEach((doc) => {
        if (password === doc.data().password) {
          let u = doc.data();
          u.docId = doc.id;
          console.log(u);
          authContext.setUserDetails(u);
          console.log(authContext.userDetails);
          authStorage.storeToken(JSON.stringify(u));
          console.log("Login Hello");
        } else {
          console.log("Wrong Password");
        }
      });
    }
    console.log(authContext.userDetails);
    return;
  };
  function forgetPassword(values) {
    var auth = firebase.auth();
    auth
      .sendPasswordResetEmail(values)
      .catch(function () {
        consol.log("Email sent.");
      })
      .catch(function (error) {
        consol.log(error);
      });
  }

  return (
    <ScrollView>
      <Screen>
        <KeyboardAvoidingView>
          <View style={styles.container}>
            <Formik
              initialValues={{ email: "", password: "" }}
              onSubmit={(values) => loginUser(values)}
              validationSchema={validationSchema}
            >
              {({
                handleChange,
                handleSubmit,
                errors,
                setFieldTouched,
                touched,
              }) => (
                <>
                  <AppTextInput
                    autoCapitalize="none"
                    name="email"
                    keyboardType="email-address"
                    autoCorrect={false}
                    textContentType="emailAddress"
                    onBlur={() => setFieldTouched("email")}
                    placeholder="Email Address"
                    icon="email"
                    textContentType="emailAddress"
                    onChangeText={handleChange("email")}
                  />
                  <ErrorAlert error={errors.email} visible={touched.email} />
                  <AppTextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    name="password"
                    onBlur={() => setFieldTouched("password")}
                    secureTextEntry={true}
                    textContentType="password"
                    placeholder="Password"
                    icon="lock"
                    onChangeText={handleChange("password")}
                  />
                  <ErrorAlert
                    error={errors.password}
                    visible={touched.password}
                  />
                  <View>
                    <SubmitButton title="Login" />
                  </View>
                </>
              )}
            </Formik>
          </View>
        </KeyboardAvoidingView>
      </Screen>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 200,
  },
  img: {
    alignSelf: "center",
    width: 190,
    height: 170,
    marginBottom: -100,
  },
  container1: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    marginTop: 20,
  },
  input1: {
    marginTop: 200,
  },
  btn: {
    width: 20,
  },
});
