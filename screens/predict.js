import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Feather } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';

import API from '../api';
import {LineChart} from "react-native-chart-kit";
import Plotly from 'react-native-plotly';

// 성장 예측 그래프, 오각형, 성장성 지수
const Predict = () => {

  // 성장 예측 그래프
  let years = [];
  let sales = [];
  const [graph, setGraph] = useState([[],[0]]); // 차트에 들어갈 data 지정

  const getGraphData = async() => {
    axios.get(`https://growthmate.link/api/v1/companies/${company_id}/growth`)
    .then(function (response) {
      console.log(response.data);
        for(let i=0; i<response.data.length; i++){
          if(response.data[i].sales != 0){
          years.push(response.data[i].year);
          sales.push(response.data[i].sales/100000000);
          }
    }
      setGraph([years, sales]);
    });
    };
    console.log("graph: ", graph);

    const data = {
      labels: graph[0],
      datasets: [
        {
          data: graph[1],
          color: (opacity = 1) => `rgba(127, 186, 226, 1)`,
          strokeWidth: 3 // optional
        },
    
      ],
      //legend: ["예측 그래프"] // optional
    };
    const chartConfig = {
      backgroundGradientFrom: "white",
      backgroundGradientFromOpacity: 1,
      backgroundGradientTo: "white",
      backgroundGradientToOpacity: 1,
      color: (opacity = 1) => `rgba(55, 55, 55, ${opacity})`,
      strokeWidth: 3,
      barPercentage: 11,
      useShadowColorFromDataset: true,
      decimalPlaces: 0, // 소수점 자리수
    };


  //오각형 지표
  let growth = "성장률";
  let efficiency = "효율성";
  let profitability = "수익성";
  let businessPerformance = "영업성과";
  let stability = "안정성";

  const [five, setFive] = useState([]); // 차트에 들어갈 data 지정

  const getFiveData = async() => {
  axios.get(`https://growthmate.link/api/v1/companies/${company_id}/analyze`)
  .then(function (response) {
    console.log(response.data);
    growth = response.data.growth;
    efficiency = response.data.efficiency;
    profitability = response.data.profitability;
    businessPerformance = response.data.businessPerformance;
    stability = response.data.stability;

    setFive([growth, efficiency, profitability, businessPerformance, stability]);
  });
  }

  useEffect(() => {
    getGraphData();
    getFiveData();
  }
  , []);
console.log(five);

  const dataChart = [ // 차트에 들어갈 data
  {
  type: 'scatterpolar', // chart type
  r: [...five, five[0]],
  theta: ['성장성','안정성','수익성', '효율성', '영업성과', '성장성'], // data category
  fill: 'toself', // fill option
  mode: 'lines',    
  line: {
    color: "#0DBF3C",
  },
  }
]

const layout = { // data를 꾸며주는 layout을 지정!
  //flex: 1,
  width: 300, // chart의 width
  height: 320, // chart의 height
  margin: { // chart에는 기본값으로 margin이 적용되어 있는데, top, bottom, left와는 좀 다르다.
    l: 0,
    r: 0,
    t: 30,
    d: 0,
  },
  polar: {
    radialaxis: { // 방사축
      visible: true, // 방사축 display
      range: [0, 100], // 방사축의 시작값, 끝값
      ticklen: 0,
      tickfont: { // @1-1
        color: 'grey',
        size: 11,
      },
    },
    angularaxis: { // 각축
      rotation: 90, // 차트 회전율 (A가 제일 위로 올 수 있도록)
      color: '#eee', // 각축의 선색
      ticklen: 0, // @2-1
      tickfont: { // @2-2
        color: 'black',
        size: 13,
      },
    },
    gridshape: 'linear',
  },
  
}

  return (
    <View style={Styles.container}>    
<ScrollView>

      <Text style={Styles.HomeText}>성장 예측</Text>
      <View style={{height:240, alignSelf:"center",}}>
      <LineChart
        data={data}
        style={{marginTop: 10}}
        width={340}
        height={200}
        //fromNumber={0}
        fromZero
        chartConfig={chartConfig}
        debug
        yAxisSuffix='억'
      />
        </View>

      <Text style={Styles.HomeText}>오각형 지표</Text>
      <View style={{height:250, width: 300, alignSelf:"center"}}>
      <Plotly 
      data={dataChart} layout={layout}
       debug enableFullPlotly />
</View>

      <View style={{marginBottom:"25%"}}></View>
      </ScrollView>
    </View>
  )
}

export default Predict;

const Styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    marginTop:"4%",
  },
  HomeText: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 5,
  },
})
