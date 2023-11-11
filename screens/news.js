import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet } from "react-native";
import { Entypo } from '@expo/vector-icons';
import * as Progress from 'react-native-progress';
import axios from 'axios';

const News = () => {

  let positiveRate = 0;
  let negativeRate = 0;
  let [rate, setRate] = useState([positiveRate, negativeRate]);

  const getRateData = async() => {
    axios.get(`https://growthmate.link/api/v1/companies/${company_id}/sentiment`)
    .then(function (response) {
      positiveRate = response.data.positiveRate;
      negativeRate = response.data.negativeRate;
      setRate([positiveRate, negativeRate]);
    });
    };
    console.log("rate: ", rate);


    // companyNewsId, title, description, url, sentiment
    const [data, setData] = useState([]);

    let [posList, setPosList] = useState([]);
    let [negList, setNegList] = useState([]);

    const getList = async() => {
      axios.get(`https://growthmate.link/api/v1/companies/${company_id}/news?cursor=1&size=10`)
      .then(function (response) {

        console.log(response.data);
      });
      };

    useEffect(() => {
      getRateData();
      getList();
    }
    , []);


  return (
    <View style={Styles.container}>      
      <Text style={Styles.title}>기업 뉴스 긍부정 비율</Text>

      <View style={{backgroundColor:"#E7E7E7", marginHorizontal:"5%", borderRadius:7, paddingVertical:"3%", marginBottom:"6%"}}>
        <View style={{flexDirection:"row", marginLeft:"6%"}}>
        <Entypo name="emoji-happy" size={27} color="green" />
        <Progress.Bar progress={rate[0]} width={200} height={27} unfilledColor="#BFBFBF" borderColor="#BFBFBF" borderWidth={0.8} marginLeft="3%"></Progress.Bar>
        <Text style={{fontSize:16, marginLeft:"3%", alignSelf:"center"}}>{((rate[0])*100).toFixed(2)+'%'}</Text>
      </View>

      <View style={{flexDirection:"row",  marginLeft:"6%", marginTop:"2%"}}>
      <Entypo name="emoji-sad" size={27} color="red" />
        <Progress.Bar progress={rate[1]} width={200} height={27} color="red" unfilledColor="#BFBFBF" borderColor="#BFBFBF" borderWidth={0.8} marginLeft="3%"/>        
        <Text style={{fontSize:16, marginLeft:"3%", alignSelf:"center"}}>{((rate[1])*100).toFixed(2)+'%'}</Text>
      </View>      
      </View>

      <Text style={Styles.title}>뉴스</Text>
      <View style={{height:80}}>
        <Text>뉴스가 없습니다.</Text>
      </View>

    </View>
  )
}

export default News;

const Styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginTop:"3%",
  },
  title: {
    fontSize: 19,
    marginLeft:"8%",
    marginTop:"2%",
    marginBottom:"3%",

  },
})