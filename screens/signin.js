import React, {useEffect} from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import API from '../api';
import { EXPO_PUBLIC_FIREBASE_API_KEY, EXPO_PUBLIC_API_KEY, EXPO_PUBLIC_API_ANDROID_KEY } from "@env";

import * as WebBrowser from 'expo-web-browser';
import { ResponseType } from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import { getAuth, GoogleAuthProvider, signInWithCredential, onAuthStateChanged } from 'firebase/auth';

import * as AuthSession from 'expo-auth-session';

WebBrowser.maybeCompleteAuthSession();

const Signin = ({navigation, route}) => {
  let token = null;
  let name, email, pictureUrl;

  let accessToken = null;
  let memberId = 0;

  const asyncAccessToken = async () => {
    try {
      accessToken = await AsyncStorage.getItem("accessToken");
      console.log("access: ", accessToken);
      // 자료가 없을 때 에러처리
    } catch(e) {
      console.log(e);
    }
  };
  asyncAccessToken();
  

const url = "https://auth.expo.io/@dhdld/growup"; // redirect url
const [request, response, promptAsync] = Google.useAuthRequest({
	//clientId: process.env.EXPO_PUBLIC_API_KEY,
  expoClientId: EXPO_PUBLIC_API_KEY,
  iosClientId: EXPO_PUBLIC_API_KEY,
  androidClientId: EXPO_PUBLIC_API_ANDROID_KEY,
  webClientId: EXPO_PUBLIC_API_KEY,
    //redirectUri: url,
    //redirectUri: "https://growthmate.link/oauth2/authorization/google",
  
});

const [userInfo, setUserInfo] = React.useState(null);

  // Google 로그인 처리하는 함수
  const handleSignInWithGoogle = async () => {
    const user = await AsyncStorage.getItem("@user");
    if (!user) {
      if (response?.type === "success") {
        // 인증 요청에 대한 응답이 성공이면, 토큰을 이용하여 유저 정보를 가져옴.
        await getUserInfo(response.authentication?.accessToken);
        //console.log("accessToken: ",response.authentication?.accessToken);
        //token = response.authentication?.accessToken;
        console.log("name: ", name, email, pictureUrl);
        //await AsyncStorage.setItem("token", JSON.stringify(token));
        await toBack();
      }
    } else {
      // 유저 정보가 이미 있으면, 유저 정보를 가져옴.
      setUserInfo(JSON.parse(user));
    }
    
  };

  // 백엔드에 유저 정보를 보내는 함수
  const toBack = async() => {
    axios.post('https://growthmate.link/api/v1/member/login', {
      registrationId: "google",
      name,
      email,
      pictureUrl,
  }
  ).then((res) => {
      console.log(res.data);
      accessToken = res.data.accessToken;
      memberId = res.data.memberId;
      console.log("accessToken: ", accessToken);
      AsyncStorage.setItem("accessToken", JSON.stringify(accessToken));
      AsyncStorage.setItem("memberId", JSON.stringify(memberId));
  }).catch((err) => {
      console.log("error: ",err);
  });
  }


  // 토큰을 이용하여 유저 정보를 가져오는 함수
  const getUserInfo = async (token) => {
    if (!token) return;
    try {
      const response = await fetch(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const userInfoResponse = await response.json();
      // 유저 정보를 AsyncStorage에 저장, 상태업뎃
      await AsyncStorage.setItem("@user", JSON.stringify(userInfoResponse));
      setUserInfo(userInfoResponse);
      name = userInfoResponse.name;
      email = userInfoResponse.email;
      pictureUrl = userInfoResponse.picture;

    } catch (e) {
      console.log(e);
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem("@user");
    setUserInfo(null);
  };

  // Google 인증 응답이 바뀔때마다 실행
  useEffect(() => {
    handleSignInWithGoogle();
  }, [response]);
  

const BackButton = () => {
  if (accessToken!==null) {
    navigation.navigate("Main", { getuser: "test"});
  }
  else{
  navigation.navigate("Main", { getuser: "not"});
  }
};

  return (
    <SafeAreaView style={Styles.screen}>
    <View style={Styles.container}>     
    <StatusBar style="auto" />
    <TouchableOpacity onPress={() => BackButton()}>
        <Ionicons name="chevron-back" size={33} color="black" />
        </TouchableOpacity>
       
      <Text style={Styles.HomeText}>로그인</Text>

      <Text>{JSON.stringify(userInfo, null, 2)}</Text>
      <Button
        disabled={!request}
        title="Login"
        onPress={() => {
          promptAsync();
        }}
      />
      <Button title="logout" onPress={() => handleLogout()} />

    </View>
    </SafeAreaView>
  )
}

export default Signin;

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
  loginBox: {
    alignSelf:"center", 
    marginTop:"45%", 
    display:"flex",
    flexDirection:"row", 
    borderWidth:0.6, borderRadius:7, 
    width:"80%", height:"6%"
  },


})