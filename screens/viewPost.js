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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

const ViewPost = ({navigation, route}) => {

  const {params} = route;
  post_id = params ? params.post_id : null;

  let accessToken = "";
  let memberId = 0;
  
  const asyncAccessToken = async () => {
    try {
      accessToken = await AsyncStorage.getItem("accessToken");
      memberId = await AsyncStorage.getItem("memberId");
      getPost();
      // 자료가 없을 때 에러처리
    } catch(e) {
      console.log(e);
    }
  };
  asyncAccessToken();



let commentId = "댓글 아이디";
let commentWriter = "댓글 작성자";
let commentContent = "댓글 내용";
let commentCreateddDate = "댓글 작성 날짜";
  // 댓글 flatlist commentId, commentWriter, commentContent, commentCreateddDate
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
        {item.isMine == "True" ? (
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

const getComment = () => {
  setLoading(true);
  fetch(`https://growthmate.link/api/v1/posts/${post_id}/comments?cursor=10&size=20`)
    .then((res) => res.json())
    .then((res) => 
    setData(commentData.concat(res.slice(offset, offset + LIMIT))))
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
  asyncAccessToken();
  getPost();
  //getComment(); 
}, []);
const onEndReached = () => {
  if (loading) {
    return; // 로딩 중 계속 호출(fetch) 되는 것을 막는다.
  } else {
    getComment();
  }
};

// 글
let writer = "작성자 이름";
let title = "제목";
let content = "내용";
let postCreateDate = "작성 날짜";

let [info, setInfo] = useState([]);
//게시글 상세 조회 
const getPost = async() => {
  if (accessToken == "") {
    axios.get(`https://growthmate.link/api/v1/posts/${post_id}`)
    .then(function (response) {
      writer = response.data.writer;
      title = response.data.title;
      content = response.data.content;
      postCreateDate = response.data.createDate.slice(0,10).replace(/-/g, ".");
  
      setInfo([writer, title, content, postCreateDate]);
      if (response.data.isMine == true) { 
        setIsMyPost(true);
      }
  }) 
    .catch(function (error) {
      console.log("gett", error);
    });
  }
  else {
  axios.get(`https://growthmate.link/api/v1/posts/${post_id}`,
  {headers: {
    Authorization: `Bearer ${accessToken.replace(/"/g, "")}`,
  }
})
  .then(function (response) {
    writer = response.data.writer;
    title = response.data.title;
    content = response.data.content;
    postCreateDate = response.data.createDate.slice(0,10).replace(/-/g, ".");

    setInfo([writer, title, content, postCreateDate]);
    if (response.data.isMine == true) { 
      setIsMyPost(true);
    }
}) 
  .catch(function (error) {
    console.log("gett", error);
  });
}
};


const [isMyPost, setIsMyPost] = useState(false); // 내가 쓴 글인지 확인
const [isMyComment, setIsMyComment] = useState(false); // 내가 쓴 댓글인지 확인

const editPost = () => {
  navigation.navigate("EditPost", {post_id: post_id, title: info[1], content: info[2]});
};

const deletePost = () => {
  Alert.alert("글을 삭제합니다.", "", [
    {text: "Cancel"},
    {text: "Yes", style: "destructive",
    onPress: async() => {
  axios.delete(`https://growthmate.link/api/v1/posts/${post_id}`,
  {headers: {
    Authorization: `Bearer ${accessToken.replace(/"/g, "")}`,
  }
});
  navigation.navigate("특정 기업", {company_id: company_id});
    },},
  ]);
};

const editComment = () => {
  Alert.alert("댓글을 수정합니다.", "", [
    {text: "Cancel"},
    {text: "Yes",
    onPress: async() => {
      axios.patch(`https://growthmate.link/api/v1/comments/${comment_id}`) 

    },},
  ]);
};

const deleteComment = () => {
  Alert.alert("댓글을 삭제합니다.", "", [
    {text: "Cancel"},
    {text: "Yes", style: "destructive",
    onPress: async() => {
      axios.delete(`https://growthmate.link/api/v1/comments/${comment_id}`);
      this.refresh();
    },},
  ]);
};

const [comment, setComment] = useState('');

// 댓글 등록
const uploadComment = () => {
  console.log("댓글 등록", accessToken)
  if(accessToken == null || accessToken == "") {
    Alert.alert("로그인이 필요한 서비스입니다.");
    return;
  }
  else {
  alert("댓글을 등록합니다.");
  axios.post(`https://growthmate.link/api/v1/posts/${post_id}/comments`, {
    content: comment,
  },
  {headers: {
    Authorization: `Bearer ${accessToken.replace(/"/g, "")}`,
    }})
  .then(function (response) {
    console.log(response);
  }
  )
  .catch(function (error) {
    console.log(error);
  });
  }
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
        <Text style={{fontSize:20, fontWeight:"bold", width:"80%"}}>{info[1]}</Text>
        <View style={{flexDirection:"column", alignItems:"flex-end"}}>
        <Text>{info[3]}</Text> 
        <Text style={{fontSize:14,}}>{info[0]}</Text>

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



    <Text style={{fontSize:16, marginTop:"5%", marginBottom:"5%"}}>{info[2]}</Text>

    <View style={{borderWidth:0.3, margin:"3%"}}></View>
    <Text style={{marginBottom:"4%"}}>comment</Text>


{ commentData != null ?
    <FlatList nestedScrollEnabled 
        data={commentData}
        renderItem={renderCommentItem}
        keyExtractor={(item) => String(item.id)}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.8}
        ListFooterComponent={loading && <ActivityIndicator />}
      />
      :
      <View style={{height:80}}>
      <Text>댓글이 없습니다.</Text>
    </View>
}
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

        <View style={{height:500}}></View>

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