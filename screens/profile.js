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

const Profile = ({navigation, route}) => {
    //const navigation = useNavigation();

    const BackButton = () => {
          navigation.navigate("Main",{ getuser: username, addi:"hmmmm" }) 
      };

      const texting = (text) => {
        if (text.length == 0) {
          setUsername(false);
        }
        else{
        setUsername(text);
        console.log(username);
        }
      }

//      const [username, setUsername] = useState('');
      const [username, setUsername] = useState(route.params.info);
      const ChangeUsername = () => {
        if (username=="") {
          alert("닉네임을 입력해주세요.");
          setUsername(false);
        }
        else{
        setUsername(username); // 이걸 db에 저장
        console.log(username);
      }
      
      };
      console.log("profile: ",username);

      const [imageUrl, setImageUrl] = useState(''); // 이미지 주소
      const [status, requestPermission] = ImagePicker.useCameraPermissions();

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
/*
      await axios({
        method: 'post',
        url: {url}, //api 주소
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
      });
*/
};


    return (
        <SafeAreaView style={Styles.screen}>
        <View style={Styles.container}>     
        <StatusBar style="auto" />
        <TouchableOpacity onPress={() => BackButton()}>
        <Ionicons name="chevron-back" size={36} color="black" />
        </TouchableOpacity>

        <Text style={Styles.HomeText}>내 프로필</Text>
        <View style={{ paddingBottom:"0%",padding:"10%"}}>

        <Image 
        style={{width:110, height:110, borderRadius:100, alignSelf:"center"}}
        source={imageUrl ? { uri: imageUrl } : require("../image/profile.png")}
        />
        <TouchableOpacity style={{paddingTop:"2%", alignSelf:"center"}} onPress={uploadImage}>
          <Text>이미지 변경</Text>
        </TouchableOpacity>
        
        <View style={{flexDirection:"row", paddingLeft:"5%", marginTop:"8%"}}>
        <Text style={{fontSize:14, alignSelf:"center",marginRight:"5%"}}>닉네임</Text>
        <TextInput placeholder="이름을 입력하세요"  value={username} onChangeText={text => texting(text)}
        style={{fontSize:16, width:"60%", height:40, marginRight:"3%", backgroundColor: '#e8e8e8', borderRadius:8}}></TextInput>
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
    fontSize: 30,
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