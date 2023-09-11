import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, BackHandler, Image, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

import API from '../api';

const Profile = ({navigation, route}) => {

    axios.get(`${API}/api/v1/members/me`,
    {
      headers: {
        'Authorization': 'Bearer ' + route.params.token
      }
    })
    .then(function (response) {
      console.log(response);
      const username = response.data.name;
      const email = response.data.email;
      imageUrl = response.data.picture; // 프로필 사진
    }
    )

    const BackButton = () => {
          navigation.navigate("Main",{ getuser: username, addi:"hmmmm" }) // 화면 이동 변수 전달 test
      };

      const texting = (text) => {
        setUsername(text);
        console.log(username);
      }

      const [username, setUsername] = useState(route.params.info);

      // 이름 수정
      const ChangeUsername = () => {
        if (username.length < 1) {
          alert("닉네임을 입력해주세요.");
          //setUsername(false);
        }
        else if (username.length > 10) {
          alert("닉네임은 10자 이내로 입력해주세요.");
          setUsername(false);
        }
        else{
          alert("닉네임이 변경되었습니다.");
        setUsername(username);
        console.log("save: ",username);
        axios.patch(`${API}/api/v1/members/me`, {
          name: username,
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
      console.log("profile name: ", username);

      const [imageUrl, setImageUrl] = useState(''); // 이미지 주소
      const [status, requestPermission] = ImagePicker.useCameraPermissions();

      // 이미지 업로드
      const uploadImage = async () => {
        if (!status?.granted) {
          const permission = await requestPermission(); // 카메라 권한 요청
          if (!permission.granted) {
            return null;
          }
        }
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
        if (result.cancelled) {
           return null;
        }
        // 이미지 업로드 결과 및 경로
        console.log(result);
        setImageUrl(result.uri);

      // 서버에 요청 보내기
      const localUri = result.uri;
      const filename = localUri.split('/').pop();
      const match = /\.(\w+)$/.exec(filename || '');
      const type = match ? `image/${match[1]}` : `image`;
      const formData = new FormData();
      formData.append('image', { uri: localUri, name: filename, type });

      axios.patch(`${API}/api/v1/posts/{post_id}`,
      {
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
      });

};


    return (
        <SafeAreaView style={Styles.screen}>
        <View style={Styles.container}>     
        <StatusBar style="auto" />
        <TouchableOpacity onPress={() => BackButton()}>
        <Ionicons name="chevron-back" size={33} color="black" />
        </TouchableOpacity>

        <Text style={Styles.HomeText}>내 프로필</Text>
        <View style={{ paddingBottom:"0%",padding:"10%"}}>

        <Image 
        style={{width:110, height:110, borderRadius:100, alignSelf:"center"}}
        source={imageUrl ? { uri: imageUrl } : require("../public/src/profile.png")}
        />
        <TouchableOpacity style={{paddingTop:"2%", alignSelf:"center"}} onPress={uploadImage}>
          <Text>이미지 변경</Text>
        </TouchableOpacity>

        <View style={{flexDirection:"row", paddingLeft:"5%", marginTop:"8%"}}>
        <Text style={{fontSize:14, alignSelf:"center",marginRight:"5%"}}>닉네임</Text>
        <TextInput placeholder={username}  value={username} onChangeText={text => texting(text)}
        style={{fontSize:16, width:"60%", height:40, marginRight:"3%", backgroundColor: '#e8e8e8', borderRadius:8, padding:10}}></TextInput>
        <TouchableOpacity onPress={() => ChangeUsername()}
        style={{backgroundColor:"blue", borderRadius:10, justifyContent:"center", width:"18%"}}>
        <Text style={{fontSize:16, color:"white", textAlign:"center",}}>수정</Text>
        </TouchableOpacity>
        </View>
        
        <View style={{flexDirection:"row", paddingLeft:"3%", marginTop:"6%"}}>
        <Text style={{fontSize:14, marginRight:"4%"}}>구글 계정</Text>
        <Text style={{fontSize:17,}}>example123@gmail.com</Text>
        </View>
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