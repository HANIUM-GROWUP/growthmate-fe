import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, BackHandler, Image, TextInput, 
  Keyboard, TouchableWithoutFeedback } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from "@react-navigation/native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import { Octicons } from '@expo/vector-icons';

// 커뮤니티 글 작성 페이지

const Writing = () => {
  const navigation = useNavigation();
  
  const BackButton = () => {
    navigation.navigate("특정 기업");
};

// 글 작성 완료 버튼
const DoneButton = () => {
  if (title == '') {
    alert("제목을 입력해주세요.");
    return;
  }
  if (content == '') {
    alert("내용을 입력해주세요.");
    return;
  }
  else {
  axios.post('http://localhost:3000/api/v1/companies/{company id}/posts', {
    title: title,
    content: content,
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
  navigation.navigate("특정 기업");
  }
};

const [title, setTitle] = useState('');
const [content, setContent] = useState('');


  return (
    <SafeAreaView style={Styles.screen}>
      <KeyboardAwareScrollView>
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
    </KeyboardAwareScrollView>
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
    fontSize:16, marginRight:"3%", 
    padding:10, textAlignVertical:"top",
    //height: 320,
  },
})