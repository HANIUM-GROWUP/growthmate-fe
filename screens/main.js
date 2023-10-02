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
import { FlatList } from 'react-native-gesture-handler';
import Company from "./company";

const Main = ({navigation, route}) => {
  //const navigation = useNavigation();
  global.comapany_id = 1;

  let name = "회사이름";
  let imageUrl = "이미지";
  let businessType = "업종";

  axios.get(`${API}/api/v1/companies?cursor=10&size=10&sort=establisDate`)
  .then(function (response) {
    comapany_id = response.data.companyId;
    name = response.data.name;
    imageUrl = response.data.imageUrl;
    businessType = response.data.businessType;
    //console.log(response.data);
  })

  const {params} = route;
  const userInfo = params ? params.getuser : null;
  console.log("info: ", userInfo);
  const user = null; // 일단 임시

  let token = null;

  const asyncToken = async () => {
    try {
      token = await AsyncStorage.getItem("token");
      console.log("token: ", token);
      // 자료가 없을 때 에러처리
    } catch(e) {
      console.log(e);
    }
  };
  asyncToken();
/*
  const rem = async () => {
    try {
      await AsyncStorage.removeItem("token");
      console.log("remove token");
    } catch(e) {
      console.log(e);
    }
  };
  rem();
*/
  // 로그인 여부
const [isLogin, setIsLogin] = useState(false); 
const getLogin = async () => {
	if(await AsyncStorage.getItem('token')!== null){
		setIsLogin(true);
    console.log("async 로그인 됨");
	}
  else {
    setIsLogin(false);
    console.log("로그인 안됨");
  }
};
console.log("isLogin 상태: ", isLogin);

useEffect(() => {
	getLogin();
});

// 기업 flat리스트 데이터
// "comapany_id", "name", "imageUrl", "businessType"

const LIMIT = 10;
const [data, setData] = useState([]);
const [offset, setOffset] = useState(0);
const [loading, setLoading] = useState(false);

const Company = (comapany_id) => {
  navigation.navigate("특정 기업", {comapany_id: comapany_id});
}
/*
const renderItem = ({ item }) => {
  return (
    <View style={{justifyContent:"center", margin: "10%", marginTop:2, maxHeight:350}}>
      <TouchableOpacity onPress={()=> Company(item.companyId, item.name)}
      style={{borderWidth:1, borderRadius:"5", padding:"4%"}}>
      <View style={{flexDirection:"row", marginBottom:"2%"}}>
        <Image source={require(item.imageUrl)} style={{width:80, height:80}}/>
        <Text> {item.name}</Text>
        <View style={{flexDirection:"column", marginLeft:"4%"}}>
        <Text>id: {item.companyId}</Text>
        <Text>업종: {item.businessType}</Text>
      </View></View>
      </TouchableOpacity>
    </View>
  );
};
/*
const getData = () => {
  setLoading(true);
  fetch("https://jsonplaceholder.typicode.com/posts")
  //fetch(`${API}/api/v1/companies?cursor=10&size=10&sort=establisDate`)
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
*/

let isWeb = false;
if (Platform.OS === 'web') {
  isWeb = true;
}

  return (
    <SafeAreaView style={Styles.screen}>
    <View style={Styles.container}>
      <StatusBar style="auto" />
      <View style={{ flexDirection: "row", width:"100%", height:"8%", justifyContent:"center",
    }}>
      <Text style={Styles.TitleText}>GrowthMate</Text>
      <TouchableOpacity style={{alignSelf:"center", marginLeft:"15%",}}
        onPress={() => !isLogin
           ? navigation.navigate("Signin", { screen: 'Signin' }) : navigation.navigate("Profile", { info: userInfo, token: token})}
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

      <View>
      { isWeb ? 
       <Text>web env</Text> 
        : null
      }
      </View>

        <Text>User: {JSON.stringify(userInfo)}</Text>

      <ScrollView pagingEnabled>
        <TouchableOpacity
          onPress={() => Company(comapany_id)}
          style={Styles.comp}
        >
          <Text style={Styles.comptext}>특정 스타트업</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>  Company(comapany_id)}
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