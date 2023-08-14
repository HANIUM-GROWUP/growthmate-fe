import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Compare = () => {

  return (
    <View style={Styles.container}>      
      <Text style={Styles.HomeText}>Compare 동종 업종 내 비교</Text>
    </View>
  )
}

export default Compare;

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