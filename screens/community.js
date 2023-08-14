import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Community = () => {

  return (
    <View style={Styles.container}>      
      <Text style={Styles.HomeText}>Community dd</Text>
    </View>
  )
}

export default Community;

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