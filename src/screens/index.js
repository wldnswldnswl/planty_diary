import React, { Component } from 'react'; 
import LoginScreen from './LoginScreen'; 
import JoinScreen from './JoinScreen'; 
import FindInfoScreen from './FindInfoScreen'; 
import ContentsScreen from './CustomerSupportItem/ContentsScreen';
import HomeScreen from './HomeScreen'; 
import ToDoListScreen from './ToDoListScreen';
// import ToDoScreen from './ToDoScreen';
import DiaryScreen from './DiaryScreen';
import NoticeScreen from './NoticeScreen';
import DrawerScreen from './drawer';
import {
    AsyncStorage
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, createAppContainer } from '@react-navigation/stack'; 
import * as Common from '../common/common'; 
import Amplify from 'aws-amplify';
// import awsConfig from '../aws-exports';
const awsConfig = {
    "aws_project_region": "ap-northeast-2",
    "aws_dynamodb_all_tables_region": "ap-northeast-2",
    "aws_dynamodb_table_schemas": [
        {
            "tableName": "members-develop",
            "region": "ap-northeast-2"
        },
        {
            "tableName": "calendar-develop",
            "region": "ap-northeast-2"
        }
    ],
    "aws_cloud_logic_custom": [
        {
            "name": "ApiMembers",
            "endpoint": "https://lb9lhx8833.execute-api.ap-northeast-2.amazonaws.com/develop",
            "region": "ap-northeast-2"
        },
        {
            "name": "ApiCalendar",
            "endpoint": "https://0csm9ncs83.execute-api.ap-northeast-2.amazonaws.com/develop",
            "region": "ap-northeast-2"
        }
    ]
};

const Stack  = createStackNavigator();
Common.setCalendarConfig(); // react-native-calendars 환경설정
Amplify.configure(awsConfig); // Amplify 환경설정

export default function MyStack() {
    return (
        // 화면목록
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}> 
                {/* 1. 로그인 관련 화면 */}
                <Stack.Screen name = "Login" component={LoginScreen} />
                <Stack.Screen name = "Join" component={JoinScreen} />
                <Stack.Screen name = "FindInfo" component={FindInfoScreen} />

                {/* 2. 캘린더 화면 */}
                <Stack.Screen name = "Home" component={DrawerScreen} /> 
                <Stack.Screen name = "Diary" component={DiaryScreen} /> 

                {/* 3. 할일 화면 */}
                {/* <Stack.Screen name = "ToDo" component={ToDoScreen} />  */}

                {/* 4. 고객지원 내용*/}
                {/* <Stack.Screen name="ToDoList" component={ToDoListScreen} /> */}
                <Stack.Screen name="Contents" component={ContentsScreen} />
                <Stack.Screen name="Notice" component={NoticeScreen} />
            </Stack.Navigator>  

            
        </NavigationContainer>                       
    )
}

