import React from "react"; 
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';

import Splash from "./screens/splash";
import Main from "./screens/main";
import Signin from "./screens/signin";
import Company from "./screens/company";

import Profile from "./screens/profile";

import Intro from "./screens/intro";
import Predict from "./screens/predict";
import Compare from "./screens/compare";
import News from "./screens/news";
import Community from "./screens/community";

import Writing from "./screens/writing";
import ViewPost from "./screens/viewPost";
import EditPost from "./screens/editPost";

import SearchHeader from "./screens/searchheader";

const Stack = createStackNavigator();

function StackScreen() {
    const navigation = useNavigation();
    return (
        <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Splash" component={Splash} options={{headerShown: false}}/>
        <Stack.Screen name="Main" component={Main} options={{headerShown: false}}/>
        <Stack.Screen name="Signin" component={Signin}  options={{headerShown: false}}/>
        <Stack.Screen name="Profile" component={Profile} options={{headerShown: false}}/>
        <Stack.Screen name="특정 기업" component={Company}  options={{headerShown: false}}/>
        <Stack.Screen name="Intro" component={Intro}  options={{headerShown: false}}/>

        <Stack.Screen name="Writing" component={Writing}  options={{headerShown: false}}/>
        <Stack.Screen name="ViewPost" component={ViewPost} options={{title: "post", headerBackTitleVisible:false,
    headerLeft: () => (
        <TouchableOpacity
            onPress={() => {
                navigation.navigate("특정 기업");
            }}
            style={{ marginLeft: 10 }}
        >
            <Ionicons name="chevron-back" size={33} color="black" />
        </TouchableOpacity>
    )
    }}/>
        <Stack.Screen name="EditPost" component={EditPost}  options={{headerShown: false}}/>

        </Stack.Navigator>
    );
}

function Navigation() {
    return (
        <NavigationContainer>
            <StackScreen>
            </StackScreen>
        </NavigationContainer>
    );
}

export default Navigation;
