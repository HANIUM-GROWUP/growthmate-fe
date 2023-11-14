import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, Alert} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FlatList } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Community = () => {
  const navigation = useNavigation();

  const asyncAccessToken = async () => {
    try {
      accessToken = await AsyncStorage.getItem("accessToken");
      memberId = await AsyncStorage.getItem("memberId");
      // 자료가 없을 때 에러처리
    } catch(e) {
      console.log(e);
    }
  };
  asyncAccessToken();
    

const writing = () => {
  if(accessToken === null) {
    Alert.alert("로그인이 필요합니다.");
  } else
  navigation.navigate("WritePost");
};

//let post_id = 0;
const viewPost = (post_id) => {
  navigation.navigate("ViewPost", {post_id: post_id});
}

// "postId",	"writer", "title", "preview", "createDate", "commentCount"
const renderItem = ({ item }) => {
  return (
    <View style={{justifyContent:"center", margin: "7%", marginTop:2, maxHeight:350}}>
      <TouchableOpacity onPress={()=> viewPost(item.postId)}
      style={{borderRadius:7, padding:"4%", backgroundColor:"#F4F4F4"}}>
      <View style={{flexDirection:"row", marginBottom:"2%"}}>
        <Text numberOfLines={2} style={{fontSize:16, width:"73%"}}> {item.title}</Text>
        <View style={{flexDirection:"column", marginLeft:"4%"}}>
        <Text>{(item.createDate).slice(0,10).replace(/-/g, '.')}</Text>
        <Text style={{textAlign:"right"}}>{item.writer}</Text>
      </View></View>

      <View>
        <Text numberOfLines={3}> {item.preview}</Text>
      </View>
      <View style={{borderWidth:0.3, margin:"3%"}}></View>
      <View>
        <Text>댓글 {item.commentCount}개</Text>
      </View>
      </TouchableOpacity>
    </View>
  );
};

const LIMIT = 10;
const [data, setData] = useState([]);
const [offset, setOffset] = useState(0);
const [loading, setLoading] = useState(false);

const getData = () => {
  setLoading(true);
  fetch(`https://growthmate.link/api/v1/companies/${company_id}/posts?cursor=10&size=200`)
    .then((res) => res.json())
    .then((res) => setData(data.concat(res.slice(offset, offset + LIMIT))))
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


  return (
    <View style={{maxHeight:485, marginTop:"4%"}}>
          <TouchableOpacity style={Styles.write} onPress={()=>writing()}>
          <Entypo name="plus" size={29} color="black" />
          </TouchableOpacity>
{ data.length === 0 ? <View style={{alignSelf:"center", marginTop:"2%"}}><Text>게시글이 없습니다.</Text></View> :
          <FlatList nestedScrollEnabled 
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => String(item.id)}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.8}
        ListFooterComponent={loading && <ActivityIndicator />}
      />}
    </View>

  )
}

export default Community;

const Styles = StyleSheet.create({
  HomeText: {
    fontSize: 35,
    textAlign: "center",
  },
  write: {
    backgroundColor: "lightgreen",
    marginLeft: "80%",
    width: 0,
    height: 0,
    borderRadius: 15,
    //display: "flex",
    justifyContent: "center",
    //marginBottom: "3%",
    marginTop: "98%",
    alignItems: "center",
    position: "absolute",
    zIndex: 1,
    
  },
  writetext: {
    fontSize: 16,
    textAlign: "center",
  },

})