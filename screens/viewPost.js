import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, BackHandler, Image, TextInput, Alert,
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

//게시글 상세 조회 
  axios.get('http://localhost:3000/api/v1/posts/{post_id}')
  .then(function (response) {
    console.log(response.data);
    if (response.data.writer == user_id) {
      setIsMyPost(true);
    }
  }
  );

// 댓글 조회
  axios.get('http://localhost:3000/api/v1/posts/{post_id}/comments?cursor=10&size=10')
  .then(function (response) {
    console.log(response);
    if (response.data.writer == user_id) {
      setIsMyComment(true);
    }
  }
  );


const post_id = route.params.post_id;
const title = route.params.title;
const body = route.params.body;

console.log("post_id: ", post_id);
console.log("title: ", title);

const [isMyPost, setIsMyPost] = useState(true); // 내가 쓴 글인지 확인
const [isMyComment, setIsMyComment] = useState(false); // 내가 쓴 댓글인지 확인


const editPost = () => {
  navigation.navigate("EditPost", {post_id: post_id, title: title, body: body});
};

const deletePost = () => {
  Alert.alert("글을 삭제합니다.", "", [
    {text: "Cancel"},
    {text: "Yes", style: "destructive",
    onPress: async() => {
  axios.delete('http://localhost:3000/api/v1/posts/{post_id}');
  navigation.navigate("특정 기업");
    },},
  ]);
};

const editComment = () => {
  Alert.alert("댓글을 수정합니다.", "", [
    {text: "Cancel"},
    {text: "Yes",
    onPress: async() => {
      axios.patch('http://localhost:3000/api/v1/comments/{comment_id}') 
      
    },},
  ]);
};

const deleteComment = () => {
  Alert.alert("댓글을 삭제합니다.", "", [
    {text: "Cancel"},
    {text: "Yes", style: "destructive",
    onPress: async() => {
      axios.delete('http://localhost:3000/api/v1/comments/{comment_id}')
    },},
  ]);
};

const [comment, setComment] = useState('');

// 댓글 등록
const uploadComment = () => {
  alert("댓글을 등록합니다.");
  axios.post('http://localhost:3000/api/v1/posts/{post_id}/comments', {
    content: comment,
  })
  .then(function (response) {
    console.log(response);
  }
  )
  .catch(function (error) {
    console.log(error);
  });
};


  return (
    <SafeAreaView style={Styles.screen}>
      <KeyboardAwareScrollView>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}> 
    <View style={Styles.container}>     
    <StatusBar style="auto" />

    <View style={{flexDirection:"row"}}>
    <TouchableOpacity onPress={() => BackButton()}>
        <Ionicons name="chevron-back" size={33} color="black" />
        </TouchableOpacity>
    <Text style={Styles.HomeText}>company name{"\n"}</Text>
    </View>

<View style={{margin:5}}>
    <View style={{flexDirection:"row"}}>
        <Text style={{fontSize:20, fontWeight:"bold", width:"80%"}}>{title}</Text>
        <View style={{flexDirection:"column", alignItems:"flex-end"}}>
        <Text>08/17</Text> 
        <Text style={{fontSize:14,}}>작성자 이름</Text>

        {isMyPost ? (
        <View style={{flexDirection:"row", opacity:0.7}}>
        <TouchableOpacity onPress={editPost}>
        <Text>수정 </Text>
        </TouchableOpacity>
        <Text>|</Text>
        <TouchableOpacity onPress={deletePost}>
        <Text> 삭제</Text>
        </TouchableOpacity>
        </View>
        ) : ( <View></View> )
        }
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
        {isMyComment ? (
        <View style={{flexDirection:"row", opacity:0.7,}}>
        <TouchableOpacity onPress={editComment}>
        <Text>수정 </Text>
        </TouchableOpacity>
        <Text>|</Text>
        <TouchableOpacity onPress={deleteComment}>
        <Text> 삭제</Text>
        </TouchableOpacity>
        </View>
        ) : ( <View></View> )
        }
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
        {isMyComment ? (
        <View style={{flexDirection:"row", opacity:0.7,}}>
        <TouchableOpacity onPress={editComment}>
        <Text>수정 </Text>
        </TouchableOpacity>
        <Text>|</Text>
        <TouchableOpacity onPress={deleteComment}>
        <Text> 삭제</Text>
        </TouchableOpacity>
        </View>
        ) : ( <View></View> )
        }
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
        <TouchableOpacity style={Styles.commentBtn} onPress={() => uploadComment()}>
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