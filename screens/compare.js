import React,  { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import axios from 'axios';

const Compare = () => {

  let establishmentDate = "설립일";
  let address = "주소";
  let employeeNumber = "직원수";
  let sales = "매출액";
  const [info, setInfo] = useState([]);

  const getData = async() => {
  axios.get(`https://growthmate.link/api/v1/companies/${company_id}`)
  //axios.get(`https://growthmate.link/api/v1/companies/400`)
  .then(function (response) {
    console.log(response);
    establishmentDate = response.data.establishmentDate;
    address = response.data.address;
    employeeNumber = response.data.employeeNumber;
    sales = response.data.sales;

    setInfo([establishmentDate, address, employeeNumber, sales]);
  });
  };
  useEffect(() => {
    getData();
  }
  , []);
  console.log(info);

  return (
    <View style={Styles.container}>      
      <Text style={Styles.HomeText}>Compare 동종 업종 내 비교</Text>
    </View>
  )
}

export default Compare;

const Styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  HomeText: {
    fontSize: 35,
    textAlign: "center",
  },
})