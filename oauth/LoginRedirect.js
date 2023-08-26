import { useEffect } from 'react';
import { useNavigation } from "@react-navigation/native";
import { LoginState } from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const LoginRedirect = async () => {
  const navigation = useNavigation();

  //url의 쿼리 스트링에서 accessToken, errorCode 추출
  const accessToken = new URL(window.location.href).searchParams.get(
    'accessToken'
  );
  const errorCode = new URL(window.location.href).searchParams.get('errorCode');

  //로그인 에러 발생
  if (errorCode !== null) {
    if (errorCode === '1001') {
      //이메일 중복 에러
      await AsyncStorage.setItem('accessToken', '');
      await AsyncStorage.setItem('isLogin', 'false');
      await AsyncStorage.setItem('loginState', LoginState[1]);
    } else {
      //다른 로그인 에러
      await AsyncStorage.setItem('accessToken', '');
      await AsyncStorage.setItem('isLogin', 'false');
      await AsyncStorage.setItem('loginState', LoginState[2]);
    }
  } else {
    //로그인 성공
    //로컬스토리지에 accessToken 저장, isLogin = true
    //refreshToken - httpOnly 쿠키로 저장
    await AsyncStorage.setItem('accessToken', 'Bearer ' + accessToken);
    await AsyncStorage.setItem('isLogin', 'true');
    await AsyncStorage.setItem('loginState', LoginState[3]);
  }

  useEffect(() => {
    navigation.navigate('Main', { replace: true });
  }, []);
  return ;
};