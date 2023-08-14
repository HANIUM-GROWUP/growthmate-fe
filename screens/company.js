import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";


const Company = () => {
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

    return (
      <View style={Styles.container}>
        <Text style={Styles.HomeText}>특정 스타트업 기업 화면</Text>
        <View style={{flexDirection:"row", padding:"8%"}}>
        <Text style={{fontSize:18,}}>기업 이미지</Text>
        <View style={{flexDirection:"column", paddingLeft:"30%"}}>
        <Text style={{fontSize:18, paddingBottom:"3%"}}>기업명</Text>
        <Text style={{fontSize:18, }}>업종</Text>
        </View>
        </View>

        <ScrollView pagingEnabled horizontal style={{maxHeight:"9%", borderBottomWidth:0.4}}>
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
          {introing ? <View><Text>기업 소개 선택했을 시 화면. {"\n"} 소개... </Text></View> : null}
          {predicting ? <View><Text>예측 선택.{"\n"}성장 예측 그래프, {"\n"}피드백.</Text></View> : null}
          {comparing ? <View><Text>비교 선택. {"\n"}동일 업종 내 비교 그래프.</Text></View> : null}
          {newsing ? <View><Text>언론 선택. {"\n"}긍정/부정 뉴스 비율. {"\n"}긍정적 기사. {"\n"}부정적 기사.</Text></View> : null}
          {communitying ? <View><Text>커뮤니티 선택. {"\n"}커뮤니티 게시판.</Text>
          <TouchableOpacity style={Styles.write} >
          <Text style={Styles.writetext}>글 작성</Text>
          </TouchableOpacity>
          
          </View> : null}

        </View>
      </View>
    )
  }

export default Company;

const Styles = StyleSheet.create({
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