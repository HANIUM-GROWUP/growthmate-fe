import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchHeader from "./searchheader";
import { SearchContextProvider } from "./SearchContext";
import { SearchBar } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import API from '../api';

import { AntDesign } from '@expo/vector-icons';

const Main = ({navigation, route}) => {
  //const navigation = useNavigation();

  axios.get(`${API}/api/v1/companies?cursor=10&size=10&sort=establisDate`)
  .then(function (response) {
    console.log(response);
  })

  const {params} = route;
  const userInfo = params ? params.getuser : null;
  console.log("info: ", userInfo);
  const user=null; // 구글로그인 화면 이동 오류로 일단 임시

  const saveId = async id => {
    try {
        await AsyncStorage.setItem('user_id', JSON.stringify(id));
    } catch (e) {
        console.error(e);
    }
}
const [isLogin, setIsLogin] = useState(false); // 로그인 여부
const getLogin = async () => {
	if(await AsyncStorage.getItem('user_id')!== null){
		setIsLogin(true);
	}
  else {
    setIsLogin(false);
  }
};

useEffect(() => {
	getLogin();
});

  return (
    <SafeAreaView style={Styles.screen}>
    <View style={Styles.container}>
      <StatusBar style="auto" />
      <View style={{ flexDirection: "row", width:"100%", height:"8%", justifyContent:"center",
    }}>
      <Text style={Styles.TitleText}>GrowthMate</Text>
      <TouchableOpacity style={{alignSelf:"center", marginLeft:"15%",}}
        onPress={() => !isLogin
           ? navigation.navigate("Signin", { screen: 'Signin' }) : navigation.navigate("Profile", { info: userInfo})}
       >
      <AntDesign name="user" size={33} color="black" /></TouchableOpacity>
</View>
        <SearchBar
          round
          lightTheme
          containerStyle={{backgroundColor: 'white',
          borderBottomColor: 'transparent',
          borderTopColor: 'transparent'
        }}
          searchIcon={{ size: 24 }}
          onChangeText={(text) => searchFilterFunction(text)}
          onClear={(text) => searchFilterFunction('')}
          placeholder="Search..."
        />     

      <TouchableOpacity
        style={Styles.sort}
      >
        <Text style={Styles.sortText}>정렬</Text>
      </TouchableOpacity>

      
        <Text>User: {JSON.stringify(userInfo)}</Text>

      <ScrollView pagingEnabled>
        <TouchableOpacity
          onPress={() => navigation.navigate("특정 기업", { screen: 'Company' })}
          style={Styles.comp}
        >
          <Text style={Styles.comptext}>특정 스타트업</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("특정 기업", { screen: 'Company' })}
          style={Styles.comp}
        >
          <Text style={Styles.comptext}>이미지 / 스타트업 기업 이름</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("특정 기업", { screen: 'Company' })}
          style={Styles.comp}
        >
          <Text style={Styles.comptext}>특정 스타트업</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("특정 기업", { screen: 'Company' })}
          style={Styles.comp}
        >
          <Text style={Styles.comptext}>특정 스타트업</Text>
        </TouchableOpacity>
      </ScrollView>

    </View>
    </SafeAreaView>
  )
}

export default Main;

const Styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  TitleText: {
    fontSize: 30,
    alignSelf:"center",
    marginLeft:"20%",
  },
  middleText: {
    fontSize: 20,
    textAlign: "center",
    },
  BottomText: {
    fontSize: 15,
    color: 'white',
    textAlign: "center",
  },
    sortText: {
    fontSize: 15,
    color: 'white',
    textAlign: "center",
    },
  sort: {
        backgroundColor: "green",
        padding: 10,
        marginTop: "2%",
        marginLeft: "7%",
        width: "13%",
        borderRadius: 10,
        },
    comp: {
        padding: 20,
        marginTop: "5%",
        marginLeft: "7%",
        width: "85%",
        borderRadius: 10,
        borderWidth: 0.5,
    },
    comptext: {
        fontSize: 15,
        color: 'black',
    },

})