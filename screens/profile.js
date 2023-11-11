import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, TextInput, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import API from '../api';

const Profile = ({navigation, route}) => {
  //let username = "닉네임";
  //let email = "이메일";
  //let imageUrl = null;

  let accessToken = null;
  let memberId = null;
  const asyncAccessToken = async () => {
    try {
      accessToken = await AsyncStorage.getItem("accessToken");
      memberId = await AsyncStorage.getItem("memberId");
      getInfo();
      // 자료가 없을 때 에러처리
    } catch(e) {
      console.log(e);
    }
  };
  asyncAccessToken();

  let [getinfo, setInfo] = useState([]); // [name, email, picture]
  const getInfo= async() => {
    if(accessToken == null) {
      console.log("null");
    }
     axios.get(`https://growthmate.link/api/v1/member/me`,
    {
      headers: {
        Authorization: `Bearer ${accessToken.replace(/"/g, "")}`,
      },
    })
    .then(function (response) {
      getname = response.data.name;
      email = response.data.email;
      img = response.data.picture;
      setInfo([getname, email, img]);
    }).catch((err) => {
      console.log("get error: ",err);
  });
  };

  useEffect(() => {
    //asyncAccessToken();
  }, []);
  
    const BackButton = () => {
          navigation.navigate("Main") // 화면 이동 변수 전달 test
      };

      const texting = (text) => {
        setUsername(text);
        console.log(username);
      }

      const [username, setUsername] = useState(getinfo[0]);
      //console.log(" name: ", username);

      // 이름 수정
      const ChangeUsername = () => {
        if (username == "") {
          alert("닉네임을 입력해주세요.");
        }
        else if (username.length > 10) {
          alert("닉네임은 10자 이내로 입력해주세요.");
          setUsername(false);
        }
        else{
          alert("닉네임이 변경되었습니다.");
        setUsername(username);
        console.log("save: ",username);
        axios.patch(`https://growthmate.link/api/v1/member/me`, {
          memberId: memberId,
          name: username,
      }, {
          headers: {
            Authorization: `Bearer ${accessToken.replace(/"/g, "")}`,
          },
        })
        .then(function (response) {
          console.log(response);
        }
        )
        .catch(function (error) {
          console.log(error);
        }
        );
      }
      
      };
      //console.log("profile name: ", username);


const handleLogout = async () => {
  await AsyncStorage.removeItem("accessToken");
};

    return (
        <SafeAreaView style={Styles.screen}>
        <View style={Styles.container}>     
        <StatusBar style="auto" />
        <TouchableOpacity onPress={() => BackButton()}>
        <Ionicons name="chevron-back" size={33} color="black" />
        </TouchableOpacity>

        <Text style={Styles.HomeText}>내 프로필</Text>
        <View style={{padding:"10%"}}>

        <Image 
        style={{width:110, height:110, borderRadius:100, alignSelf:"center"}}
        source={getinfo[2] ? { uri: getinfo[2] } : require("../public/src/profile.png")}
        />

        <View style={{flexDirection:"row", paddingLeft:"5%", marginTop:"8%"}}>
        <Text style={{fontSize:14, alignSelf:"center",marginRight:"5%"}}>닉네임</Text>
        <TextInput placeholder={getinfo[0]}  value={username} onChangeText={text => texting(text)}
        style={{fontSize:16, width:"60%", height:40, marginRight:"3%", backgroundColor: '#e8e8e8', borderRadius:8, padding:10}}></TextInput>
        <TouchableOpacity onPress={() => ChangeUsername()}
        style={{backgroundColor:"blue", borderRadius:8, justifyContent:"center", width:"18%"}}>
        <Text style={{fontSize:16, color:"white", textAlign:"center",}}>수정</Text>
        </TouchableOpacity>
        </View>
        
        <View style={{flexDirection:"row", paddingLeft:"3%", marginTop:"6%", alignItems:"center"}}>
        <Text style={{fontSize:14, marginRight:"4%"}}>구글 계정</Text>
        <Text style={{fontSize:17,}}>{getinfo[1]}</Text>
        </View>

        <TouchableOpacity onPress={() => handleLogout()} style={{marginTop:"15%"}}><Text style={{fontSize:16, textAlign:"center", color:"blue"}}>logout</Text>
        </TouchableOpacity>
        </View>
      </View></SafeAreaView>
    )
  }

export default Profile;

const Styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#fff',
      },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  HomeText: {
    fontSize: 28,
    textAlign: "center",
  },
  BottomText: {
    fontSize: 15,
    color: 'white',
    textAlign: "center",
  },
  category: {
    backgroundColor: "yellow",
    padding: 6,
    width: "20%",
    display: "flex",
    justifyContent: "center",
  },
  cateText: {
    fontSize: 17,
    textAlign: "center",
  },
  write: {
    backgroundColor: "lightgreen",
    marginLeft: "70%",
    width: "20%",
    height: 33,
    borderRadius: 10,
    display: "flex",
    justifyContent: "center",
  },
  writetext: {
    fontSize: 16,
    textAlign: "center",
  },

})