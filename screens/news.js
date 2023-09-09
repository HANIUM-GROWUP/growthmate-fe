import React from "react";
import { View, Text, StyleSheet } from "react-native";

const News = () => {

  return (
    <View style={Styles.container}>      
      <Text style={Styles.HomeText}>News 언론 긍정 부정 뉴스</Text>
    </View>
  )
}

export default News;

const Styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  HomeText: {
    fontSize: 25,
    textAlign: "center",
  },
})