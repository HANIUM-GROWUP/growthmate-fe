import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, BackHandler, Image, TextInput, 
  Keyboard, TouchableWithoutFeedback } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import { Octicons } from '@expo/vector-icons';
import API from '../api';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 커뮤니티 글 수정 페이지

const EditPost = ({navigation, route}) => {
  const {params} = route;
  post_id = params ? params.post_id : null;

  let accessToken =null;

  const asyncAccessToken = async () => {
    try {
      accessToken = await AsyncStorage.getItem("accessToken");
      // 자료가 없을 때 에러처리
    } catch(e) {
      console.log(e);
    }
  };
  asyncAccessToken();

  
  const BackButton = () => {
    navigation.goBack();
};

const pastTitle = route.params.title;
const pastContent = route.params.content;

const [title, setTitle] = useState(pastTitle);
const [content, setContent] = useState(pastContent);


// 글 수정 버튼
const DoneButton = async() => {
  if (title == '' || content == '') {
    alert("제목과 내용을 모두 입력해주세요.");
    return;
  }
  else {
  axios.patch(`https://growthmate.link/api/v1/posts/${post_id}`, {
    title: title,
    content: content,
  },
  {headers: {
    Authorization: `Bearer ${accessToken.replace(/"/g, "")}`,
    }})
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log("edit: ", error);
  });
  navigation.navigate("특정 기업", {title: title, content: content, company_id: global.company_id});
  }
};
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
    <Text style={Styles.HomeText}>글 수정 {"\n"}</Text>
    {title == '' || content == '' ? 
    <TouchableOpacity style={Styles.done} disabled>
    <Text style={Styles.donetext}>완료</Text>
    </TouchableOpacity>
    :
    <TouchableOpacity onPress={() => DoneButton()} style={Styles.done}>
    <Text style={Styles.donetext}>완료</Text>
    </TouchableOpacity>
    }
    </View>

      <TextInput defaultValue={pastTitle} onChangeText={text => setTitle(text)}
        style={Styles.styleTitle}></TextInput>
        <View style={{borderWidth:0.3, margin:7}}></View>
<TextInput defaultValue={pastContent} multiline={true} onChangeText={text => setContent(text)}
        style={Styles.styleContent}></TextInput>

    </View>
    </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}

export default EditPost;

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
    marginLeft: "auto",
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
    padding:10, textAlignVertical:"top"
  },
})