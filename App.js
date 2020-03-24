import * as React from 'react';
import {Alert, Button, Dimensions, Image, Platform, SafeAreaView, StatusBar, Text, View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Video from 'react-native-video';
import IconCool from './src/components/IconCool';
import MyList from './src/components/MyList';
import Music from './src/components/Music';
import Counter from './src/components/Counter';
import Home from './src/components/Home';
import MyAnimated from './src/components/MyAnimated';
import Background from './src/components/Background';

//#3489FF 深 D0E7FF 中 E8F2FF 浅
//主页面
function HomeScreen({navigation}) {
    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView  style={{ backgroundColor:"#E8F2FF",flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Home navigation={navigation}/>
            </SafeAreaView>
        </>
    );
}
//设置页面
function SettingsScreen(counter) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Background/>
        </View>
    );
}
//音乐页面
function MusicScreen({route,navigation}) {
    const { id } = route.params;
    const { name } = route.params;
    // console.log("id为"+id)
    return (
        <>
            <Music name={name} id={id}/>
        </>
    );
}
//音乐跳转页面
function DetailsScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Details!</Text>
        </View>
    );
}

//music 栈
const MusicStack = createStackNavigator();
function MusicStackScreen() {
    return (
        <MusicStack.Navigator>
            <MusicStack.Screen name=" " component={MusicScreen} options={{ title: "aaaaa",header:null}}/>
            <MusicStack.Screen name="DetailsScreen" component={DetailsScreen}/>
        </MusicStack.Navigator>
    );
}

const Tab = createBottomTabNavigator();
export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                // 屏幕上的选项
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        return (
                          <IconCool name={route.name} focused={focused}/>
                        );
                    },
                })}
                tabBarOptions={{
                    tabBarVisible:true,
                    // 1296db
                    activeTintColor: '#1296db',
                    inactiveTintColor: 'gray',
                }}
            >
                <Tab.Screen name="发现" component={HomeScreen}/>
                <Tab.Screen name=" " component={MusicScreen} initialParams={{ id:"347230",name:"海阔天空"}}/>
                <Tab.Screen name="Settings" component={SettingsScreen}/>
            </Tab.Navigator>
        </NavigationContainer>
    );
}
