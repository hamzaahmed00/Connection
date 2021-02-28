import RadioButtonRN from "radio-buttons-react-native";
import React, { useContext, useEffect, useState } from "react";
import { View } from "react-native";
import AppText from "./AppText";
import Icon from "react-native-vector-icons/Ionicons";
import * as firebase from "firebase";
import "firebase/firestore";
import AuthContext from "../config/context";
import { StyleSheet } from "react-native";

function InstructionQuestion({ question, data, style, questionId }) {
  const authContext = useContext(AuthContext);
  const userId = authContext.userDetails.docId;
  const [answered, setAnswered] = useState(false);

  async function updateAnswer(a, id, userId) {
    var n = authContext.userDetails.name
    setAnswered(true);
    firebase.default
      .firestore()
      .collection("inst")
      .doc(id)
      .update({
        answers: firebase.firestore.FieldValue.arrayUnion({
          choice: a,
          userId: userId,
          name: n
        }),
      });
  }

  async function checkIfAnswered() {
    console.log("Entering");
    const examRef = await firebase.default
      .firestore()
      .collection("inst")
      .doc(questionId)
      .get();
    let data = [];
    data = examRef.data();
    data = Array.from(data.answers);
    data.forEach((element) => {
      if (element.userId == userId) {
        setAnswered(true);
      }
    });
  }

  useEffect(() => {
    checkIfAnswered();
  }, []);
  return (
    <>
      <View style={style}>
        <View style={answered ? styles.disabled : styles.enabled}></View>
        <AppText>{question}</AppText>
        <RadioButtonRN
          animationTypes={["shake", "rotate"]}
          data={data}
          selectedBtn={(e) => updateAnswer(e.label, questionId, userId)}
          icon={<Icon name="hand-right-outline" size={25} color="#2c9dd1" />}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  disabled: {
    position: "absolute",
    top: 10,
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    zIndex: 100,
    alignSelf: "center",

    opacity: 0.4,
  },
  enabled: {
    position: "absolute",
    top: 10,
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    zIndex: -100,
    alignSelf: "center",

    opacity: 0,
  },
});

export default InstructionQuestion;
