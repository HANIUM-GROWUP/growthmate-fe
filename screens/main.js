import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, ActivityIndicator } from "react-native";
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
import DropDownPicker from "react-native-dropdown-picker";

const Main = ({navigation, route}) => {

  let name = "회사이름";
  let imageUrl = "이미지";
  let businessType = "업종";

  const {params} = route;
  const userInfo = params ? params.getuser : null;
  console.log("info: ", userInfo);

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
// "company_id", "name", "imageUrl", "businessType"

const LIMIT = 10;
const [data, setData] = useState([]);
const [dataSales, setDataSales] = useState([]);

const [offset, setOffset] = useState(0);
const [loading, setLoading] = useState(false);

const Company = (company_id) => {
  navigation.navigate("특정 기업", {company_id: company_id});
}

const renderItem = ({ item }) => {
  return (
    <View style={{justifyContent:"center", margin: "2%", marginTop:2, maxHeight:330}}>
      <TouchableOpacity onPress={()=> Company(item.companyId)}
      style={{padding:"2%"}}>
      <View style={{flexDirection:"row", marginBottom:"2%", marginLeft:"2%"}}>
        { item.imageUrl === "" ? <View style={{width:80, height:80}}></View> : 
        <Image source={{uri: item.imageUrl}} style={{width:78, height:78, 
          borderRadius:10,}}/>
        }
        <View style={{flexDirection:"column", marginLeft:"6%", marginTop:11}}>
        <Text style={{fontSize:16, fontWeight: 'bold'}}>{item.name}</Text>
        <Text style={{fontSize:13, marginTop:9}}>{item.businessType}</Text>
      </View></View>
      </TouchableOpacity>
    </View>
  );
};

// 설립일순 정렬(default)
const getDataByDate = () => {
  setLoading(true);
  fetch(`https://growthmate.link/api/v1/companies?cursor=10&size=355&sort=establisDate`)
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

// 매출액순 정렬
const getDataBySales = () => {
  setLoading(true);
  fetch(`https://growthmate.link/api/v1/companies?cursor=10&size=355&sort=sales`)
    .then((res) => res.json())
    .then((res) => setDataSales(dataSales.concat(res.slice(offset, offset + LIMIT))))
    .then(() => {
      setOffset(offset + LIMIT);
      setLoading(false);
    })
    .catch((error) => {
      setLoading(false);
      Alert.alert("에러가 났습니다");
    });
};

/*
const sortBy = () => {
  if(sortByDate) {
    //setData([]);
    setDataSales([]);
    getDataBySales();
    setSortByDate(false);
    setSortBySales(true);
  }
  else {
    setData([]);
   // setDataSales([]);
    getDataByDate();
    setSortByDate(true);
    setSortBySales(false);
  }
  console.log("sortByDate: ", sortByDate);
}
      <TouchableOpacity onPress={() => sortBy()}
        style={Styles.sort}
      >
        <Text style={Styles.sortText}>정렬</Text>
      </TouchableOpacity>
*/

const [sortByDate, setSortByDate] = useState(true);
const [sortBySales, setSortBySales] = useState(false);

useEffect(() => {
  if(sortBySales) getDataBySales();
  else getDataByDate();
  console.log("sortByDate: ", sortByDate);
}, []);
const onEndReached = () => {
  if (loading) {
    return; // 로딩 중 계속 호출(fetch) 되는 것을 막는다.
  } else {
    if(sortBySales) getDataBySales();
    else getDataByDate();
  }
};


let isWeb = false;
if (Platform.OS === 'web') {
  isWeb = true;
}

// 정렬 기능
const [open, setOpen] = useState(false);
const [value, setValue] = useState();
const [items, setItems] = useState([
  {label: '설립일순', value: 'date'},
  {label: '자산순', value: 'sale'}
]);

  return (
    <SafeAreaView style={Styles.screen}>
    <View style={Styles.container}>
      <StatusBar style="auto" />
 { isWeb ?     <View style={{ flexDirection: "row", width:"100%", height:"2%", justifyContent:"center",
    }}>
      <Text style={Styles.TitleText}>GrowthMate</Text>
      <TouchableOpacity style={{alignSelf:"center", marginLeft:"15%",}}
        onPress={() => !isLogin
           ? navigation.navigate("Signin", { screen: 'Signin' }) : navigation.navigate("Profile", { info: userInfo, token: token})}
       >
      <AntDesign name="user" size={33} color="black" /></TouchableOpacity>
</View> :
     <View style={{ flexDirection: "row", width:"100%", height:45, justifyContent:"center",
    }}>
      <Text style={Styles.TitleText}>GrowthMate</Text>
      <TouchableOpacity style={{alignSelf:"center", marginLeft:"15%",}}
        onPress={() => !isLogin
           ? navigation.navigate("Signin", { screen: 'Signin' }) : navigation.navigate("Profile", { info: userInfo, token: token})}
       >
      <AntDesign name="user" size={33} color="black" /></TouchableOpacity>
</View>
}
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

      <DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      style={{width: 100, marginLeft:"7%", marginTop:"2%", backgroundColor:"#4FD391", borderRadius:8, borderWidth:0,}}
      placeholder="정렬"
      textStyle={{color:"white"}}
      listItemContainerStyle={{backgroundColor:"#4FD391", }}
      dropDownContainerStyle={{backgroundColor:"#4FD391", width:59, marginLeft:"7%", marginTop:"2%", borderWidth:0,}}
      //defaultValue={value}
      onChangeValue={(value) => {
        if(value === "date") {
          //setData([]);
          navigation.reset({
            routes: [{ name: 'Main' }],
          });
          setDataSales([]);
          getDataByDate();
          setSortByDate(true);
          setSortBySales(false);
          
          console.log("sortByDate: ", sortByDate);
        }
        else {
          navigation.reset({
            routes: [{ name: 'Main', params: { sortBySales: true, sortByDate:false } }],
          });
          setData([]);
          //setDataSales([]);
          getDataBySales();
          setSortByDate(false);
          setSortBySales(true);
        }
      }}
    />

      <View>
      { isWeb ? 
       <Text>web env</Text> 
        : null
      }
      </View>
        <View style={{margin:10}}></View>

    { sortByDate ?
        <FlatList nestedScrollEnabled 
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => String(item.id)}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.8}
        ListFooterComponent={loading && <ActivityIndicator />}
      /> : 
      <FlatList nestedScrollEnabled 
      data={dataSales}
      renderItem={renderItem}
      keyExtractor={(item) => String(item.id)}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.8}
      ListFooterComponent={loading && <ActivityIndicator />}
      />
      }


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
        borderRadius: 5,
        borderWidth: 0.5,
    },
    comptext: {
        fontSize: 15,
        color: 'black',
    },

})