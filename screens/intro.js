import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Intro = () => {

  return (
    <View style={Styles.container}>
      <Text>Intro 화면</Text>
    </View>
  )
}

export default Intro;

const Styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  HomeText: {
    fontSize: 35,
    textAlign: "center",
  },
})