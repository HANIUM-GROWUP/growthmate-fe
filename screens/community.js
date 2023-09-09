import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, Alert} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { FlatList } from 'react-native-gesture-handler';


const Community = () => {
  const navigation = useNavigation();
    
const writing = () => {
  navigation.navigate("WritePost");
};


const viewPost = (id, title, content) => {
  navigation.navigate("ViewPost", {post_id: id, title: title, content: content});
}

const renderItem = ({ item }) => {
  return (
    <View style={{justifyContent:"center", margin: "10%", marginTop:2, maxHeight:350}}>
      <TouchableOpacity onPress={()=> viewPost(item.id, item.title, item.body)}
      style={{borderWidth:1, borderRadius:"5", padding:"4%"}}>
      <View style={{flexDirection:"row", marginBottom:"2%"}}>
        <Text numberOfLines={2} style={{fontSize:16, width:"80%"}}> {item.title}</Text>
        <View style={{flexDirection:"column", marginLeft:"4%"}}>
        <Text>08/13</Text>
        <Text>id: {item.id}</Text>
      </View></View>

      <View>
        <Text numberOfLines={3}> {item.body}</Text>
      </View>
      <View style={{borderWidth:0.3, margin:"3%"}}></View>
      <View>
        <Text>댓글 1개</Text>
      </View>
      </TouchableOpacity>
    </View>
  );
};


const LIMIT = 11;

const [data, setData] = useState([]);
const [offset, setOffset] = useState(0);
const [loading, setLoading] = useState(false);

const getData = () => {
  setLoading(true);
  fetch("https://jsonplaceholder.typicode.com/posts")
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
    <View style={{maxHeight:485}}>
          <TouchableOpacity style={Styles.write} onPress={()=>writing()}>
          <Text style={Styles.writetext}>글 작성</Text>
          </TouchableOpacity>
          <FlatList nestedScrollEnabled 
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => String(item.id)}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.8}
        ListFooterComponent={loading && <ActivityIndicator />}
      />
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
    marginLeft: "73%",
    width: "18%",
    height: 33,
    borderRadius: 10,
    display: "flex",
    justifyContent: "center",
    marginBottom: "3%",
    marginTop: "3%",
  },
  writetext: {
    fontSize: 16,
    textAlign: "center",
  },

})