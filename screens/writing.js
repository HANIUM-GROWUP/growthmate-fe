import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, BackHandler, Image, TextInput, 
  Keyboard, TouchableWithoutFeedback } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import { Octicons } from '@expo/vector-icons';

const Writing = () => {
  const navigation = useNavigation();
  
  const BackButton = () => {
    navigation.navigate("특정 기업");
};

const DoneButton = () => {
  navigation.navigate("특정 기업");
};

const [title, setTitle] = useState('');
const [content, setContent] = useState('');


  return (
    <SafeAreaView style={Styles.screen}>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}> 
    <View style={Styles.container}>     
    <StatusBar style="auto" />

    <View style={{flexDirection:"row"}}>
    <TouchableOpacity onPress={() => BackButton()}>
    <AntDesign name="close" size={29} color="black" />
    </TouchableOpacity>
    <Text style={Styles.HomeText}>글 작성 {"\n"}</Text>
    <TouchableOpacity onPress={() => DoneButton()} style={Styles.done}>
    <Text style={Styles.donetext}>완료</Text>
    </TouchableOpacity>
    </View>

      <TextInput placeholder="제목을 입력하세요"  value={title} onChangeText={text => setTitle(text)}
        style={Styles.styleTitle}></TextInput>
        <View style={{borderWidth:0.3, margin:7}}></View>
<TextInput placeholder="내용을 입력하세요" multiline={true} value={content} onChangeText={text => setContent(text)}
        style={Styles.styleContent}></TextInput>

    </View>
    </TouchableWithoutFeedback>
    </SafeAreaView>
  )
}

export default Writing;

const Styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    padding: "4%",
  },
  HomeText: {
    fontSize: 21,
    textAlign: "center",
    marginLeft:"32%",
  },
  done: {
    backgroundColor: "lightgreen",
    marginLeft: "27%",
    width: 50,
    height: 33,
    borderRadius: 10,
    display: "flex",
    justifyContent: "center",
  },
  donetext: {
    fontSize: 16,
    textAlign: "center",
  },
  styleTitle: {
    fontSize:16, width:"100%", height:40, marginRight:"3%", 
    padding:10
  },
  styleContent: {
    fontSize:16, width:"100%", height:450, marginRight:"3%", 
    padding:10, textAlignVertical:"top"
  },
})