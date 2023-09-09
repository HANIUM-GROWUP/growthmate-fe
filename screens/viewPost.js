import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, BackHandler, Image, TextInput, Alert,
  Keyboard, TouchableWithoutFeedback, ActivityIndicator, KeyboardAvoidingView, Dimensions } from "react-native";
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
import { FlatList } from 'react-native-gesture-handler';
import constants from '../constants';

const ViewPost = ({navigation, route}) => {
  const BackButton = () => {
    navigation.navigate("특정 기업"); 
};

let writer = "작성자 이름";
let title = "제목";
let postContent = "내용";
let postCreatedDate = "작성 날짜";
//게시글 상세 조회 
  axios.get('http://localhost:3000/api/v1/posts/{post_id}')
  .then(function (response) {
    console.log(response.data);
    writer = response.data.writer;
    title = response.data.title;
    postContent = response.data.content;
    postCreatedDate = response.data.createdDate;
    if (response.data.writer == user_id) { // 내가 쓴 글인지 확인
      setIsMyPost(true);
    }}
  );

let commentId = "댓글 아이디";
let commentWriter = "댓글 작성자";
let commentContent = "댓글 내용";
let commentCreatedDate = "댓글 작성 날짜";
// 댓글 조회
  axios.get('http://localhost:3000/api/v1/posts/{post_id}/comments?cursor=10&size=10')
  .then(function (response) {
    console.log(response);
    commentId = response.data.commentId;
    commentWriter = response.data.writer;
    commentContent = response.data.content;
    commentCreatedDate = response.data.createdDate;
    if (response.data.writer == user_id) { // 내가 쓴 댓글인지 확인
      setIsMyComment(true);
    }
  });


  // 댓글 flatlist
const renderCommentItem = ({ item }) => {
  return (
    <View>
    <View >
      <View>
      <Text style={{fontSize:16, marginBottom:"2%"}}> 작성자 {item.email}</Text>
      <Text style={{fontSize:16,}}> {item.body}</Text>
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
    <View style={{borderWidth:0.3, margin:"1%", opacity:0.4, marginVertical:"5%"}}></View>
        </View>
  )};

const LIMIT = 11;
const [commentData, setData] = useState([]);
const [offset, setOffset] = useState(0);
const [loading, setLoading] = useState(false);

const getData = () => {
  setLoading(true);
  fetch("https://jsonplaceholder.typicode.com/comments")
    .then((res) => res.json())
    .then((res) => setData(commentData.concat(res.slice(offset, offset + LIMIT))))
    .then(() => {
      setOffset(offset + LIMIT);
      setLoading(false);
    })
    .catch((error) => {
      setLoading(false);
      Alert.alert("에러가 났습니다");
    });
};

useEffect(() => {
  getData();
}, []);
const onEndReached = () => {
  if (loading) {
    return; // 로딩 중 계속 호출(fetch) 되는 것을 막는다.
  } else {
    getData();
  }
};

// 글
const post_id = route.params.post_id;
title = route.params.title;
content = route.params.content;

console.log("post_id: ", post_id);
console.log("title: ", title);

const [isMyPost, setIsMyPost] = useState(true); // 내가 쓴 글인지 확인
const [isMyComment, setIsMyComment] = useState(true); // 내가 쓴 댓글인지 확인


const editPost = () => {
  navigation.navigate("EditPost", {post_id: post_id, title: title, content: content});
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
      axios.delete('http://localhost:3000/api/v1/comments/{comment_id}');
      this.refresh();
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
    <View style={Styles.screen}>
      <KeyboardAvoidingView behavior="height" keyboardVerticalOffset={(constants.height)/10}
      //keyboardVerticalOffset={152}
      >
      <View style={{maxHeight:650}}>
      <ScrollView>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}> 
    <View style={Styles.container}>     
    <StatusBar style="auto" />

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



    <Text style={{fontSize:16, marginTop:"5%", marginBottom:"5%"}}>{content}</Text>

    <View style={{borderWidth:0.3, margin:"3%"}}></View>
    <Text style={{marginBottom:"4%"}}>comment</Text>

    <FlatList nestedScrollEnabled 
        data={commentData}
        renderItem={renderCommentItem}
        keyExtractor={(item) => String(item.id)}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.8}
        ListFooterComponent={loading && <ActivityIndicator />}
      />


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



    </View>
    </View>
    </TouchableWithoutFeedback>

    </ScrollView>
    </View>


    <View style={{flexDirection:"row", backgroundColor:"white", }}>
      <TextInput placeholder="댓글 입력하기" onChangeText={text => setComment(text)}
        style={Styles.inputComment}></TextInput>
        <TouchableOpacity style={Styles.commentBtn} onPress={() => uploadComment()}>
        <Text style={{fontSize:16, textAlign:'center', textAlignVertical:"center", color:"white", marginTop:"25%"}}>등록</Text>
        </TouchableOpacity>
        </View>

</KeyboardAvoidingView>
    </View>
  )
}

export default ViewPost;

const Styles = StyleSheet.create({
  screen: {
    //flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    padding: "4%",
  },
  inputComment: {
    fontSize:16, width:"83%", height:40, 
    marginRight:"1%", 
    marginVertical:"4%",
    padding:10,
    borderRadius:9, backgroundColor: '#e8e8e8',
    marginLeft:"2%",
  },
  commentBtn: {
    width:"12%", 
    height:40, 
    backgroundColor:"lightblue", borderRadius:9,
    marginVertical:"4%",
    textAlignVertical:"center",
  },
  commentBox: {
  margin:"4%",
},
  commentDate: {
      paddingBottom:"2%",
},


})