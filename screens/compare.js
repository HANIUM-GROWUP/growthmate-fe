import React,  { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import axios from 'axios';
import { BarChart } from "react-native-chart-kit";

const Compare = () => {
  const [rank, setRank] = useState([]);
  let name = "회사이름";
  let my = "나";
  let best = 261109107640.991/100000000; //상위 25%
  let avg = 90238613585.7056/100000000; //평균
  let per = "퍼센트";

  const getData = async() => {
  axios.get(`https://growthmate.link/api/v1/companies/${company_id}/comparison`)
  .then(function (response) {
    console.log(response);

    my = response.data.my/100000000;
    per = response.data.per;
    setRank([my, per]);
  });
  };
  useEffect(() => {
    getData();
  }
  , []);


  return (
    <View style={Styles.container}>

      <Text style={Styles.HomeText}>{name}은 업종 내에서 {per}%입니다.</Text>

      <View style={{alignSelf:"center",}}>
      <BarChart
  data={{
    labels: [
      '우리 회사',
      '상위 25%',
      '평균',
    ],
    datasets: [
      {
        data: [49500155092/100000000, best, avg],
      },
    ],
  }}
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
    fontSize: 20,
    textAlign: "center",
    marginTop:"4%",
    marginBottom:"7%",
  },
})