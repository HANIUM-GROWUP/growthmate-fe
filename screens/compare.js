import React,  { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import axios from 'axios';
import { BarChart } from "react-native-chart-kit";

const Compare = () => {
  const [rank, setRank] = useState([]);
  let name = "회사이름";
  let my = "나"; // 우리 회사 매출액
  let best = 261109107640.991/100000000; //상위 25% 매출액
  let avg = 90238613585.7056/100000000; //평균 매출액
  let per = "퍼센트"; // 우리 회사 매출액 상위 퍼센트

  const getData = async() => {
  axios.get(`https://growthmate.link/api/v1/companies/${company_id}/comparison`)
  .then(function (response) {
    my = response.data.salesForecast/100000000;
    per = ((response.data.salesForecastPercentage)*100).toFixed(0);
    setRank([my, per]);
    console.log(rank);
  });
  };

  const [info, setInfo] = useState([]); // [name] 회사 이름만 
  const getName = async() => {
    axios.get(`https://growthmate.link/api/v1/companies/${company_id}`)
    .then(function (response) {
      name = response.data.name;
      let lastChar = name.charCodeAt(name.length - 1)
      let isThereLastChar = (lastChar - 0xac00) % 28
      if (isThereLastChar) {
        name = name + '은'
      }
      else {
        name = name + '는'
      }
      setInfo([name]);
    })
  }
  useEffect(() => {
    getData();
    getName();
  }
  , []);

const data = {
  labels: [
    '우리 회사',
    '상위 25%',
    '평균',
  ],
  datasets: [
    {
      data: [rank[0], best, avg],
      color: (opacity = 1) => `rgba(1, 50, 180, 1)`,
    },
  ],
};


  return (
    <View style={Styles.container}>

      <Text style={Styles.HomeText}>{info[0]} 업종 내 상위 {rank[1]}%입니다.</Text>

      <View style={{alignSelf:"center",}}>
      <BarChart
  data={data}
  width={320}
  height={220}
  fromZero={true}
  yAxisSuffix="억"
  chartConfig={{
    backgroundColor: 'white',
    backgroundGradientFrom: 'white',
    backgroundGradientTo: 'white',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(1,1,1, ${opacity})`,
    style: {
      borderRadius: 10,
    },
  }}
  style={{
    marginVertical: 8,
    borderRadius: 10,
  }}
/></View>
    </View>
  )
}

export default Compare;

const Styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  HomeText: {
    fontSize: 18,
    textAlign: "center",
    marginTop:"4%",
    marginBottom:"7%",
  },
})