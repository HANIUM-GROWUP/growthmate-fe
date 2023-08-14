import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Intro = () => {

  return (
    <View style={Styles.container}>      
      <Text style={Styles.HomeText}>Intro 기업 소개</Text>
    </View>
  )
}

export default Intro;

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  HomeText: {
    fontSize: 35,
    textAlign: "center",
  },
})