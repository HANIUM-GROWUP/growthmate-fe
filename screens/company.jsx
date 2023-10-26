import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { FlatList } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API from '../api';

import Intro from "./intro";
import Community from './community';
import Predict from './predict';
import Compare from './compare';
import News from './news';
import axios from 'axios';


const Company = ({navigation, route}) => {
  const {params} = route;
  company_id = params ? params.company_id : null;
  console.log("company_id: ", company_id);


  let name = "회사명";
  let imageUrl = "image";
  let businessType = "업종";
  const [info, setInfo] = useState([]);

  const getData = async() => {
  axios.get(`https://growthmate.link/api/v1/companies/${company_id}`)
  .then(function (response) {
    name = response.data.name;
    imageUrl = response.data.imageUrl;
    businessType = response.data.businessType;

    setInfo([name, imageUrl, businessType]);
  })
}
useEffect(() => {
  getData();
}
, []);
console.log("info: ", info);

  const [introing, setIntro] = useState(true);
  const [predicting, setPredict] = useState(false);
  const [comparing, setCompare] = useState(false);
  const [newsing, setNews] = useState(false);
  const [communitying, setCommunity] = useState(false);

  const intro = () => {
    setIntro(true);
    setPredict(false);
    setCompare(false);
    setNews(false);
    setCommunity(false);
  }
  const predict = () => {
    setPredict(true);
    setIntro(false);
    setCompare(false);
    setNews(false);
    setCommunity(false);
  }
  const compare = () => {
    setCompare(true);
    setIntro(false);
    setPredict(false);
    setNews(false);
    setCommunity(false);
  }
  const news = () => {
    setNews(true);
    setIntro(false);
    setPredict(false);
    setCompare(false);
    setCommunity(false);
  }
  const community = () => {
    setCommunity(true);
    setIntro(false);
    setPredict(false);
    setCompare(false);
    setNews(false);
  }


  const BackButton = () => {
    navigation.navigate("Main");
};


let isWeb = false;
if (Platform.OS === 'web') {
  isWeb = true;
}
    return (
      <SafeAreaView style={Styles.screen}>
{ !isWeb ?
      <View style={Styles.container}>    
      <View style={{flex:1}}> 
      <StatusBar style="auto" />
      <TouchableOpacity onPress={() => BackButton()}>
      <Ionicons name="chevron-back" size={33} color="black" />
      </TouchableOpacity>
      <View style={{flexDirection:"row", paddingBottom:"2%", padding:"4%", marginLeft:"4%", paddingTop:"2%"}}>
      <Image source={{uri: `${info[1]}`}} style={{width:100, height:100}}/>
      <View style={{flexDirection:"column", paddingLeft:"7%", paddingTop:"5%", flex:1}}>
      <Text style={{fontSize:20, paddingBottom:"9%"}}>{info[0]}</Text>
      <Text style={{fontSize:15}}>{info[2]}</Text>
        </View>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{maxHeight:"26%", borderBottomWidth:0.4}}>
          <TouchableOpacity style={Styles.category} onPress={intro}>
          <Text style={Styles.cateText}>기업 소개</Text>
          </TouchableOpacity>
          <TouchableOpacity style={Styles.category} onPress={predict}>
          <Text style={Styles.cateText}>예측 분석</Text>
          </TouchableOpacity>
          <TouchableOpacity style={Styles.category} onPress={compare}>
          <Text style={Styles.cateText}>업종내 비교</Text>
          </TouchableOpacity>
          <TouchableOpacity style={Styles.category} onPress={news}>
          <Text style={Styles.cateText}>언론</Text>
          </TouchableOpacity>
          <TouchableOpacity style={Styles.category} onPress={community}>
          <Text style={Styles.cateText}>커뮤니티</Text>
          </TouchableOpacity>
        </ScrollView>

        </View>
        <View style={{flex: 2.4}}>
          {introing ? <Intro /> : null}
          {predicting ? <Predict /> : null}
          {comparing ? <Compare /> : null}
          {newsing ? <News /> : null}
          {communitying ? <Community />  : null}
          
        </View>
      </View>
    :
    // Web
    <View style={Styles.container}>    

    <StatusBar style="auto" />
    <TouchableOpacity onPress={() => BackButton()}>
    <Ionicons name="chevron-back" size={33} color="black" />
    </TouchableOpacity>
      <View style={{flexDirection:"row", paddingBottom:"2%", padding:"5%", marginLeft:"4%", paddingTop:"2%"}}>
      <Image source={{uri: `${info[1]}`}} style={{width:100, height:100}}/>
      <View style={{flexDirection:"column", paddingLeft:"5%", paddingTop:"5%", flex:1, height:40}}>
      <Text style={{fontSize:20, paddingBottom:"9%"}}>{info[0]}</Text>
      <Text style={{fontSize:16, }}>{info[2]}</Text>
      </View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{maxHeight:"18%", borderBottomWidth:0.4}}>
        <TouchableOpacity style={Styles.category} onPress={intro}>
        <Text style={Styles.cateText}>기업 소개</Text>
        </TouchableOpacity>
        <TouchableOpacity style={Styles.category} onPress={predict}>
        <Text style={Styles.cateText}>예측 분석</Text>
        </TouchableOpacity>
        <TouchableOpacity style={Styles.category} onPress={compare}>
        <Text style={Styles.cateText}>업종내 비교</Text>
        </TouchableOpacity>
        <TouchableOpacity style={Styles.category} onPress={news}>
        <Text style={Styles.cateText}>언론</Text>
        </TouchableOpacity>
        <TouchableOpacity style={Styles.category} onPress={community}>
        <Text style={Styles.cateText}>커뮤니티</Text>
        </TouchableOpacity>
      </ScrollView>

        {introing ? <Intro /> : null}
        {predicting ? <Predict /> : null}
        {comparing ? <Compare /> : null}
        {newsing ? <News /> : null}
        {communitying ? <Community />  : null}
    </View>
    
    
    }
      </SafeAreaView>
    )
  }

export default Company;

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
    fontSize: 27,
    textAlign: "center",
  },
  BottomText: {
    fontSize: 15,
    color: 'white',
    textAlign: "center",
  },
  category: {
    padding: 14,
    //width: 88,
    justifyContent: "center",
  },
  cateText: {
    fontSize: 17,
    textAlign: "center",
    
  },
})