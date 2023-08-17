import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Predict = () => {

  return (
    <View style={Styles.container}>     
      <Text style={Styles.HomeText}>Predict 성장 예측</Text>
    </View>
  )
}

export default Predict;

const Styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  HomeText: {
    fontSize: 20,
    textAlign: "center",
  },
})