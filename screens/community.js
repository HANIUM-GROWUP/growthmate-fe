import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { FlatList } from 'react-native-gesture-handler';


const Community = () => {
  const navigation = useNavigation();
    
const writing = () => {
  navigation.navigate("Writing");
};


const viewPost = (id, title, body) => {
  navigation.navigate("ViewPost", {id: id, title: title, body: body});
}

const renderItem = ({ item }) => {
  if (item.title.length > 30) {
    shortTitle = item.title.substring(0, 30) + "...";
  }
  else 
  shortBody = item.title;
  if (item.body.length > 70) {
    shortBody = item.body.substring(0, 70) + "...";
  }
  else
  shortBody = item.body;

  return (
    <View style={{justifyContent:"center", margin: "10%", marginTop:5, maxHeight:350}}>
      <View>
        <Text>user id: {item.userId}</Text>
      </View>
      <TouchableOpacity onPress={()=> viewPost(item.id, item.title, item.body)}
      style={{borderWidth:1, borderRadius:"5", padding:"4%"}}>
      <View>
        <Text>id: {item.id}</Text>
      </View>
      <View>
        <Text> 글 제목: {shortTitle}</Text>
      </View>
      <View>
        <Text> 내용: {shortBody}</Text>
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
  fetch("http://jsonplaceholder.typicode.com/posts")
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
    <View><Text>커뮤니티 화면</Text>
          <TouchableOpacity style={Styles.write} onPress={()=>writing()}>
          <Text style={Styles.writetext}>글 작성</Text>
          </TouchableOpacity>
          <FlatList
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
    marginBottom: "5%",
  },
  writetext: {
    fontSize: 16,
    textAlign: "center",
  },

})