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
        console.log("accessToken: ",response.authentication?.accessToken);
      }
    } else {
      // 유저 정보가 이미 있으면, 유저 정보를 가져옴.
      setUserInfo(JSON.parse(user));
    }
  };

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

let id_token = null;
/*
  useEffect(() => {
    if (response?.type === 'success') {
      id_token = response.params;
      const auth = getAuth();
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential);

      console.log("id_token :", id_token);
      let token = id_token.id_token;
      console.log("token :", token);

      const LoginOk = async () => {
        try {
          const res = await API.post(`${API}/auth/login`, {
            headers: { Authorization: `Bearer ${token}` },
            accessToken: token,
          });
          console.log(res);
        } catch (error) {
          console.error("login error :", error);
        }
      };
      LoginOk();

  AsyncStorage.setItem('token', JSON.stringify(token));

    }
  }, [response]); // response가 바뀔 때마다 실행
  
 /* // auth null error
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const { uid, email, displayName, accessToken } = user;
      console.log("uid :", uid)
      console.log("email :", email)
      console.log("displayName :", displayName)
      console.log("accessToken :", accessToken)
    }
  });
*/

const BackButton = () => {
  if (token!==null) {
    navigation.navigate("Main", { getuser: "test", user_id: "idtest", token: token });
  }
  else{
  navigation.navigate("Main", { getuser: "test", user_id: "notlogin"});
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