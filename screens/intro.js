import React,  { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import API from '../api';
import axios from 'axios';

const Intro = () => {
  let establishmentDate = "설립일";
  let address = "주소";
  let employeeNumber = "직원수";
  let sales = "매출액";
  const [info, setInfo] = useState([]);

  const getData = async() => {
  axios.get(`https://growthmate.link/api/v1/companies/${company_id}`)
  .then(function (response) {
    //console.log(response);
    establishmentDate = response.data.establishmentDate;
    address = response.data.address;
    employeeNumber = response.data.employeeNumber;
    sales = response.data.sales;

    if(establishmentDate == null || establishmentDate == "") {
      establishmentDate = "-";
    }
    if(address == null || address == "") {
      address = "-";
    }
    if(employeeNumber == null || employeeNumber == 0) {
      employeeNumber = "-";
    }
    setInfo([establishmentDate, address, employeeNumber, sales]);
  });
  };
  useEffect(() => {
    getData();
  }
  , []);
  console.log("info",info);

  function numberToKorean(number){ // 매출액 억단위 계산
    let inputNumber  = number < 0 ? false : number;
    let unitWords    = ['', '만', '억', '조'];
    let splitUnit    = 10000;
    let splitCount   = unitWords.length;
    let resultArray  = [];
    let resultString = '';

    for (let i = 0; i < splitCount; i++){
      let unitResult = (inputNumber % Math.pow(splitUnit, i + 1)) / Math.pow(splitUnit, i);
        unitResult = Math.floor(unitResult);
        if (unitResult > 0){
            resultArray[i] = unitResult;
        }
    }

    for (let i = 0; i < resultArray.length; i++){
        if(!resultArray[i]) continue;
        resultString = String(resultArray[i]) + unitWords[i] + resultString;
    }

    if(number == 0 || number == null) {
      resultString = "-";
    }

    return resultString;
}

  return (
    <View style={Styles.container}>

      <Text>회사 설립일</Text>
      <Text style={{fontSize:15}}>{info[0]}</Text>

      <View style={{height: 30}}></View>

      <Text>주소</Text>
      <Text style={{fontSize:15}}>{info[1]}</Text>
      <View style={{height: 30}}></View>

      <Text>직원수</Text>
      <Text style={{fontSize:15}}>약 {info[2]}명</Text>
      <View style={{height: 30}}></View>

      <Text>매출액</Text>
      <Text style={{fontSize:15}}>{numberToKorean(info[3])}원</Text>
    </View>
  )
}

export default Intro;

const Styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 10,
  },
  HomeText: {
    fontSize: 35,
    textAlign: "center",
  },
})