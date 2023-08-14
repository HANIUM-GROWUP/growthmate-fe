import React, {useEffect} from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import axios from 'axios';
import API from '../api';

import * as WebBrowser from 'expo-web-browser';
import { ResponseType } from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import { getAuth, GoogleAuthProvider, signInWithCredential, onAuthStateChanged } from 'firebase/auth';

import * as AuthSession from 'expo-auth-session';

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: "growup-394504.firebaseapp.com",
  projectId: "growup-394504",
  storageBucket: "growup-394504.appspot.com",
  messagingSenderId: "530534892230",
  appId: "1:530534892230:web:f26a2e9ca278b853e2cdc7",
  measurementId: "G-Z8XEH4N56P"
};

// Initialize Firebase
const fbase = initializeApp(firebaseConfig);
const db = getAnalytics(fbase);
export {db};

WebBrowser.maybeCompleteAuthSession();


const Signin = (navigation) => {
  //const navigation = useNavigation();

  const url = "https://auth.expo.io/@dhdld/growup";
const [request, response, promptAsync] = Google.useAuthRequest({
	clientId: process.env.EXPO_PUBLIC_google_clientId,
  androidClientId: process.env.EXPO_PUBLIC_google_androidClientId,
    redirectUri: url,
    scopes: ['openid', 'profile', 'email'],
    responseType: 'id_token',
});
  /*
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest(
    {
	clientId: process.env.EXPO_PUBLIC_google_clientId,
  androidClientId: process.env.EXPO_PUBLIC_google_androidClientId,
    },
  );
*/
  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const auth = getAuth();
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential);

      console.log("id_token :", id_token);
      console.log("response :", response);

      const LoginOk = async () => {
        try {
          const res = await API.post('/auth/login', {
            accessToken: id_token,
          });
          console.log(res);
        } catch (error) {
          console.error("login error :", error);
        }
      };

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
  navigation.navigate("Main", { getuser: "test",});

};

  return (
    <SafeAreaView style={Styles.screen}>
    <View style={Styles.container}>     
    <StatusBar style="auto" />
    <TouchableOpacity onPress={() => BackButton()}>
        <Ionicons name="chevron-back" size={36} color="black" />
        </TouchableOpacity>
       
      <Text style={Styles.HomeText}>google 로그인 화면</Text>

      <TouchableOpacity disabled={!request}
          onPress={() => {
            promptAsync();
          }}          
          style={{alignSelf:"center", marginTop:"60%"}}>
      <Image 
        source={require("../image/login.png")}
      />
        </TouchableOpacity>

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
  NextBottom: {
    backgroundColor: "purple",
    padding: 10,
    marginTop: "20%",
    width: "50%",
    alignSelf: "center",
    borderRadius: 10,
  },
  BottomText: {
    fontSize: 15,
    color: 'white',
    textAlign: "center",
  }
})