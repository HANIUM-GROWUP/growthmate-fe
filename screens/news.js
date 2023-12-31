import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, Alert, TouchableOpacity, ActivityIndicator } from "react-native";
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { Entypo } from '@expo/vector-icons';
import * as Progress from 'react-native-progress';
import axios from 'axios';
import { WebView } from 'react-native-webview';
import * as Linking from 'expo-linking';

const News = () => {

  // 기업 뉴스 긍부정 비율
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


    // 기업 뉴스 리스트 companyNewsId, title, description, url, sentiment
    const LIMIT = 10;
    const [data, setData] = useState([]);
    const [offset, setOffset] = useState(0);
    const [loading, setLoading] = useState(false);

    const link = (url) => {
      Linking.openURL(url);
    }

      const getList = () => {
        setLoading(true);
        fetch(`https://growthmate.link/api/v1/companies/${company_id}/news?&size=100`)
          .then((res) => res.json())
          .then((res) => setData(data.concat(res.slice(offset, offset + LIMIT))))
          .then(() => {
            console.log(data);
            setOffset(offset + LIMIT);
            setLoading(false);
          })
          .catch((error) => {
            setLoading(false);
            Alert.alert("에러가 났습니다");
          });
      };

      const renderItem = ({item}) => {
        if(item.sentiment == "POSITIVE") item.sentiment = "긍정";
        else if(item.sentiment == "NEGATIVE") item.sentiment = "부정";
        else if(item.sentiment == "NEUTRAL") item.sentiment = "중립";

        return(
          <TouchableOpacity onPress={() => link(item.url)}
          style={{marginHorizontal:"5%", marginVertical:"2%", backgroundColor:"#F4F4F4", borderRadius:7, padding:"3%", marginHorizontal:"5%", maxHeight:180,}}>
              <View style={{flexDirection:"row",}}>
              <Text style={{fontSize:15, fontWeight:"bold", width:"92%"}}>{item.title}</Text>
              <Text style={{fontSize:12, marginBottom:"2%"}}>{item.sentiment}</Text>
              </View>
              <Text style={{fontSize:13, marginTop:"2%"}}>{item.description}</Text>
              <View style={{marginLeft:"auto", marginRight:"5%"}}>
              
              </View>
          </TouchableOpacity>
        );
      };

      const onEndReached = () => {
        if (loading) {
          return; // 로딩 중 계속 호출(fetch) 되는 것을 막는다.
        } else {
          getList();
        }
      };

    useEffect(() => {
      getRateData();
      getList();
    }
    , []);


  return (
    <View style={Styles.container}>  
    <ScrollView nestedScrollEnabled>    
      <Text style={Styles.title}>기업 뉴스 긍부정 비율</Text>

      <View style={{backgroundColor:"#F4F4F4", marginHorizontal:"5%", borderRadius:7, paddingVertical:"3%", marginBottom:"6%"}}>
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

      <Text style={Styles.listtitle}>뉴스</Text>
      {data != null ? 
              <FlatList nestedScrollEnabled 
              data={data}
              renderItem={renderItem}
              keyExtractor={(item) => String(item.id)}
              onEndReached={onEndReached}
              onEndReachedThreshold={0.8}
              ListFooterComponent={loading && <ActivityIndicator />}
            />
        :
        <View style={{height:80}}>
        <Text>뉴스가 없습니다.</Text>
      </View>
        }
</ScrollView>
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
    fontSize: 18,
    marginLeft:"8%",
    marginTop:"2%",
    marginBottom:"3%",
  },
  listtitle: {
    fontSize: 18,
    marginLeft:"8%",
    marginTop:"2%",
    marginBottom:"1%",
  },
})