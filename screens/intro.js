import React from "react";
import { View, Text, StyleSheet } from "react-native";
import API from '../api';
import axios from 'axios';

const Intro = () => {
  let establishmentDate = "설립일";
  let address = "주소";
  let employeeNumber = "직원수";
  let sales = "매출액";

  axios.get(`${API}/api/v1/companies/${comapany_id}`)
  .then(function (response) {
    console.log(response);
    establishmentDate = response.data.establishmentDate;
    address = response.data.address;
    employeeNumber = response.data.employeeNumber;
    sales = response.data.sales;
  });


  return (
    <View style={Styles.container}>
      <Text>Intro 화면</Text>
      <Text>{establishmentDate}</Text>
      <Text>{address}</Text>
      <Text>{employeeNumber}</Text>
      <Text>{sales}</Text>
    </View>
  )
}

export default Intro;

const Styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  HomeText: {
    fontSize: 35,
    textAlign: "center",
  },
})