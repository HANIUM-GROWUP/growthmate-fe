import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image,ActivityIndicator} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { FlatList } from 'react-native-gesture-handler';

import Intro from "./intro";
import Community from './community';
import Predict from './predict';
import Compare from './compare';
import News from './news';


const Company = ({navigation, route}) => {

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

    return (
      <SafeAreaView style={Styles.screen}>
      <View style={Styles.container}>     
      <StatusBar style="auto" />
      <TouchableOpacity onPress={() => BackButton()}>
      <Ionicons name="chevron-back" size={33} color="black" />
      </TouchableOpacity>
        <View style={{flexDirection:"row", padding:"5%", marginLeft:"4%", paddingTop:"2%"}}>
        <Image source={require("./image/bitmango.png")} style={{width:100, height:100}}/>
        <View style={{flexDirection:"column", paddingLeft:"10%", paddingTop:"5%"}}>
        <Text style={{fontSize:20, paddingBottom:"10%"}}>비트망고</Text>
        <Text style={{fontSize:16, }}>정보통신업</Text>
        </View>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{maxHeight:"9%", borderBottomWidth:0.4}}>
          <TouchableOpacity style={Styles.category} onPress={intro}>
          <Text style={Styles.cateText}>기업 소개</Text>
          </TouchableOpacity>
          <TouchableOpacity style={Styles.category} onPress={predict}>
          <Text style={Styles.cateText}>예측 분석, 피드백</Text>
          </TouchableOpacity>
          <TouchableOpacity style={Styles.category} onPress={compare}>
          <Text style={Styles.cateText}>동일 업종내 비교</Text>
          </TouchableOpacity>
          <TouchableOpacity style={Styles.category} onPress={news}>
          <Text style={Styles.cateText}>언론</Text>
          </TouchableOpacity>
          <TouchableOpacity style={Styles.category} onPress={community}>
          <Text style={Styles.cateText}>커뮤니티</Text>
          </TouchableOpacity>
        </ScrollView>


        <View>
          {introing ? <Intro /> : null}
          {predicting ? <Predict /> : null}
          {comparing ? <Compare /> : null}
          {newsing ? <News /> : null}
          {communitying ? <Community />  : null}
        </View>
      </View></SafeAreaView>
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
    padding: 6,
    width: 93,
    justifyContent: "center",
  },
  cateText: {
    fontSize: 17,
    textAlign: "center",
    
  },
})