import axios from 'axios';
import React, { PureComponent, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';

import API from '../api';
import Plotly from 'react-native-plotly';

// 성장 예측 그래프, 오각형, 성장성 지수
const Predict = () => {
  let growth = "성장률";
  let effiency = "효율성";
  let profitability = "수익성";
  let technology = "기술력";
  let financialStability = "재무성";

  axios.get(`${API}/api/v1/companies/${company_id}/analyze`)
  .then(function (response) {
    console.log(response);
    growth = response.data.growth;
    effiency = response.data.effiency;
    profitability = response.data.profitability;
    technology = response.data.technology;
    financialStability = response.data.financialStability;
  });
  
  const data = [ // 차트에 들어갈 data 지정
  {
  type: 'scatterpolar', // chart type
  r: [70, 88, 49, 68, 55, 70], // data
  //r: [growth, effiency, profitability, technology, financialStability, growth];
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


// 성장성 지수
const [sun, setSun] = useState(true); // test 중. 나중에 false로 변경
const [cloud, setCloud] = useState(false);
const [rain, setRain] = useState(false);

if(growth > 70){
  setSun(true);
}
else if(growth > 50){
  setCloud(true);
}
else if(growth > 0){
  setRain(true);
}

  return (
    <View style={Styles.container}>    
<ScrollView>
      <Text style={Styles.HomeText}>성장 예측 그래프</Text>
      <Text>성장률</Text>
      <View style={{height:200, width: 300, alignSelf:"center"}}>

        </View>


      <Text style={Styles.HomeText}>오각형 지표</Text>
      <View style={{height:250, width: 300, alignSelf:"center"}}>
      <Plotly 
      data={data} layout={layout}
       debug enableFullPlotly />
</View>

<View style={{alignSelf:"center", marginTop:50}}>
      <Text style={Styles.HomeText}>성장성 지수</Text>
      <View style={{height:200, width: 300, flexDirection:"row", marginTop:20, marginLeft:50}}>
        {sun ? <Feather name="sun" size={40} color="black" /> : null}
        {cloud ? <Fontisto name="cloudy" size={40} color="black" /> : null}
        {rain ? <Fontisto name="rain" size={40} color="black" /> : null}
        <Text style={{fontSize:32, textAlign:"center", marginLeft:30}}>27%</Text>
        </View>
        </View>

      </ScrollView>
    </View>
  )
}

export default Predict;

const Styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  HomeText: {
    fontSize: 20,
    textAlign: "center",
  },
})
