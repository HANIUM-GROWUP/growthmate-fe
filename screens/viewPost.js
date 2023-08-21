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

const editPost = () => {
  alert("글을 수정합니다.");
};

const deletePost = () => {
  alert("글 삭제");
};

const editComment = () => {
  alert("댓글 수정");
};

const deleteComment = () => {
  alert("댓글 삭제");
};

const [comment, setComment] = useState('');

  return (
    <SafeAreaView style={Styles.screen}>
      <KeyboardAwareScrollView>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}> 
    <View style={Styles.container}>     
    <StatusBar style="auto" />

    <View style={{flexDirection:"row"}}>
    <TouchableOpacity onPress={() => BackButton()}>
        <Ionicons name="chevron-back" size={36} color="black" />
        </TouchableOpacity>
    <Text style={Styles.HomeText}>company name{"\n"}</Text>
    </View>

<View style={{margin:5}}>
    <View style={{flexDirection:"row"}}>
        <Text style={{fontSize:20, fontWeight:"bold", width:"80%"}}>{title}</Text>
        <View style={{flexDirection:"column", alignItems:"flex-end"}}>
        <Text>08/17</Text> 
        <Text style={{fontSize:14,}}>작성자 이름</Text>

        <View style={{flexDirection:"row", opacity:0.7}}>
        <TouchableOpacity onPress={editPost}>
        <Text>수정 </Text>
        </TouchableOpacity>
        <Text>|</Text>
        <TouchableOpacity onPress={deletePost}>
        <Text> 삭제</Text>
        </TouchableOpacity>
        </View>
        </View>
    </View>

    <Text style={{fontSize:16, marginTop:"5%", marginBottom:"5%"}}>{body}</Text>

    <View style={{borderWidth:0.3, margin:"3%"}}></View>
    <Text>comment</Text>

    <View style={Styles.commentBox}>
        <View style={{flexDirection:"column", }}>
        <Text style={{paddingBottom:"3%"}}>작성자</Text>
    <Text>투자 관련 문의 드립니다.............................</Text>
    </View>
    <View style={{flexDirection:"row", paddingTop:"2%"}}>
        <Text>08/17  </Text> 
        <View style={{flexDirection:"row", opacity:0.7,}}>
        <TouchableOpacity onPress={editComment}>
        <Text>수정 </Text>
        </TouchableOpacity>
        <Text>|</Text>
        <TouchableOpacity onPress={deleteComment}>
        <Text> 삭제</Text>
        </TouchableOpacity>
        </View>
        </View>
    </View>

    <View style={{borderWidth:0.3, margin:"1%", opacity:0.4}}></View>

    <View style={Styles.commentBox}>
        <View style={{flexDirection:"column", }}>
        <Text style={{paddingBottom:"3%"}}>작성자22</Text>
    <Text>투자 관련 문의 드립니다2</Text>
    </View>
    <View style={{flexDirection:"row", paddingTop:"2%"}}>
        <Text>08/17  </Text> 
        <View style={{flexDirection:"row", opacity:0.7,}}>
        <TouchableOpacity onPress={editComment}>
        <Text>수정 </Text>
        </TouchableOpacity>
        <Text>|</Text>
        <TouchableOpacity onPress={deleteComment}>
        <Text> 삭제</Text>
        </TouchableOpacity>
        </View>
        </View>
    </View>

    <View style={{borderWidth:0.3, margin:"1%", opacity:0.4}}></View>

    <View style={Styles.commentBox}>
        <View style={{flexDirection:"column", }}>
        <Text style={{paddingBottom:"3%"}}>작성자</Text>
    <Text>투자 관련 문의 드립니다.............................</Text>
    </View>
    <View style={{flexDirection:"row", paddingTop:"2%"}}>
        <Text>08/17  </Text> 
        <View style={{flexDirection:"row", opacity:0.7,}}>
        <TouchableOpacity onPress={editComment}>
        <Text>수정 </Text>
        </TouchableOpacity>
        <Text>|</Text>
        <TouchableOpacity onPress={deleteComment}>
        <Text> 삭제</Text>
        </TouchableOpacity>
        </View>
        </View>
    </View>

    <View style={{borderWidth:0.4, margin:"1%", opacity:0.4}}></View>

    <View style={Styles.commentBox}>
        <View style={{flexDirection:"column", }}>
        <Text style={{paddingBottom:"3%"}}>작성자</Text>
    <Text>투자 관련 문의 드립니다.............................</Text>
    </View>
    <View style={{flexDirection:"row", paddingTop:"2%"}}>
        <Text>08/17  </Text> 
        <View style={{flexDirection:"row", opacity:0.7,}}>
        <TouchableOpacity onPress={editComment}>
        <Text>수정 </Text>
        </TouchableOpacity>
        <Text>|</Text>
        <TouchableOpacity onPress={deleteComment}>
        <Text> 삭제</Text>
        </TouchableOpacity>
        </View>
        </View>
    </View>

    <View style={{borderWidth:0.3, margin:"1%", opacity:0.4}}></View>

      <View style={{flexDirection:"row"}}>
      <TextInput placeholder="댓글 입력하기" onChangeText={text => setComment(text)}
        style={Styles.inputComment}></TextInput>
        <TouchableOpacity style={Styles.commentBtn}>
        <Text style={{fontSize:16, textAlign:'center', textAlignVertical:"center", color:"white", marginTop:"25%"}}>등록</Text>
        </TouchableOpacity>
        </View>

    </View>
    </View>
    </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
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
    marginLeft:"20%",
  },
  inputComment: {
    fontSize:16, width:"85%", height:40, marginRight:"3%", 
    marginTop:"8%",
    padding:10,
    borderRadius:9, backgroundColor: '#e8e8e8',
  },
  commentBtn: {
    width:"14%", 
    height:40, 
    backgroundColor:"lightblue", borderRadius:9,
    marginTop:"8%",
    textAlignVertical:"center",
  },
  styleContent: {
    fontSize:16, width:"100%", height:450, marginRight:"3%", 
    padding:10, textAlignVertical:"top"
  },
  commentBox: {
  margin:"4%",

},
    commentDate: {
        paddingBottom:"2%",
},




})