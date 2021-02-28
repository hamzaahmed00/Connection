import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import colors from "../config/colors";

function AppButton({ title, onPress, disabled,  color = "primary" , style}) {
  return (
    <TouchableOpacity
     disabled={disabled}
      style={styles.button}
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.blue,
    borderRadius: 25,
    alignSelf:'center',
   
    alignItems: "center",
   
    padding: 15,
    width: "80%",
    marginVertical: 30, 
  
  },
  text: {
    color: colors.yellow,
    fontSize: 18,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
});

export default AppButton;
