import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { AntDesign } from '@expo/vector-icons';

// 스플래시, 로딩 화면
const Splash = ({navigation, route}) => {


  return (
    <SafeAreaView style={Styles.screen}>
    <View style={Styles.container}>
      <StatusBar style="auto" />
      <View style={{ flexDirection: "row", backgroundColor:"lightgreen", width:"100%", height:"8%",
    }}>
      <Text style={Styles.TitleText}>GrowthMate splash 화면</Text>
      <TouchableOpacity style={{alignSelf:"center", marginLeft:"15%",}}
        onPress={() => isLogin
           ? navigation.navigate("Signin", { screen: 'Signin' }) : navigation.navigate("Profile", { info: userInfo})}
       >
      <AntDesign name="user" size={33} color="black" /></TouchableOpacity>
</View>

    </View>
    </SafeAreaView>
  )
}

export default Splash;

const Styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  TitleText: {
    fontSize: 30,
    alignSelf:"center",
    marginLeft:"20%",
  },
  middleText: {
    fontSize: 20,
    textAlign: "center",
    },
  NextBottom: {
    backgroundColor: "purple",
    padding: 12,
    marginTop: "10%",
    width: "25%",
    marginLeft: "67%",
    borderRadius: 10,
  },
  BottomText: {
    fontSize: 15,
    color: 'white',
    textAlign: "center",
  },
    sortText: {
    fontSize: 15,
    color: 'white',
    textAlign: "center",
    },
  sort: {
        backgroundColor: "green",
        padding: 10,
        marginTop: "2%",
        marginLeft: "7%",
        width: "17%",
        borderRadius: 10,
        },
    comp: {
        padding: 20,
        marginTop: "5%",
        marginLeft: "7%",
        width: "85%",
        borderRadius: 10,
        borderWidth: 0.5,
    },
    comptext: {
        fontSize: 15,
        color: 'black',
    },

})