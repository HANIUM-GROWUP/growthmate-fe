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

const ViewPost = ({navigation, route}) => {
  //const navigation = useNavigation();
  const BackButton = () => {
    navigation.navigate("특정 기업"); 
};

const id = route.params.id;
const title = route.params.title;
const body = route.params.body;

console.log("id: ", id);
console.log("title: ", title);

const [comment, setComment] = useState('');

  return (
    <SafeAreaView style={Styles.screen}>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}> 
    <View style={Styles.container}>     
    <StatusBar style="auto" />

    <View style={{flexDirection:"row"}}>
    <TouchableOpacity onPress={() => BackButton()}>
        <Ionicons name="chevron-back" size={36} color="black" />
        </TouchableOpacity>
    <Text style={Styles.HomeText}>post{"\n"}</Text>
    </View>

<View style={{margin:7}}>
    <View style={{flexDirection:"row"}}>
        <Text style={{fontSize:20, fontWeight:"bold", width:"80%"}}>{title}</Text>
        <View style={{flexDirection:"column",}}>
        <Text  style={{fontSize:14,}}>작성자 이름</Text>   
        <Text>date</Text> 
        </View>
    </View>

    <Text style={{fontSize:16, marginTop:"5%", marginBottom:"5%"}}>{body}</Text>

    <View style={{borderWidth:0.3, margin:"5%"}}></View>

    <View style={Styles.commentBox}>
        <View style={{flexDirection:"column", width:"80%"}}>
        <Text style={{paddingBottom:"3%"}}>작성자</Text>
    <Text>comment.........................................</Text>
    </View>
    <View style={{flexDirection:"column", marginLeft:"10%"}}>
    <Text style={Styles.commentDate}>08/13</Text>
    <TouchableOpacity >
    <Text>삭제</Text>
    </TouchableOpacity>
    </View>
    </View>

    <View style={Styles.commentBox}>
        <View style={{flexDirection:"column",width:"80%"}}>
        <Text style={{paddingBottom:"3%"}}>작성자</Text>
    <Text>comment22222........</Text>
    </View>
    <View style={{flexDirection:"column", marginLeft:"10%"}}>
    <Text style={Styles.commentDate}>08/13</Text>
    <TouchableOpacity >
    <Text>삭제</Text>
    </TouchableOpacity>
    </View>
    </View>


      <TextInput placeholder="댓글 입력하기" onChangeText={text => setComment(text)}
        style={Styles.inputComment}></TextInput>

    </View>
    </View>
    </TouchableWithoutFeedback>
    </SafeAreaView>
  )
}

export default ViewPost;

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
  inputComment: {
    fontSize:16, width:"100%", height:40, marginRight:"3%", 
    marginTop:"8%",
    padding:10,
    borderRadius:9, backgroundColor: '#e8e8e8',
  },
  styleContent: {
    fontSize:16, width:"100%", height:450, marginRight:"3%", 
    padding:10, textAlignVertical:"top"
  },
  commentBox: {
  margin:"4%",
  flexDirection:"row",

},
    commentDate: {
        paddingBottom:"2%",
},

})