import React, { Component, useState } from 'react';
import {Alert, Button, Text, TextInput, View, FlatList, Image} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

export default class MyList extends Component{
    arr=[];
    state = {num:0,list:[]};
    render(){
        return (
            <View style={{height:300,padding: 10,flexDirection:'column'}}>
                <Button
                    onPress={() => {
                        this.props.navigation.navigate('Home');
                    }}
                    title="返回！！"
                />
                <Button
                    onPress={() => {
                        this.arr.push({
                            id:this.state.num+1,
                            imag:'./../../assets/img/music.png'
                        });
                        this.setState({
                            num:this.state.num+1,
                            list:this.arr
                        })
                    }}
                    title="点jjj我！"
                />
                <FlatList
                    data={this.state.list}
                    renderItem={({item,index}) =>this._itemView(item,index)}
                    keyExtractor={(item,index)=>this._keyExtractor(item,index)}/>
                <Text style={{padding: 10, fontSize: 42}}>
                    num:{this.state.list.length}
                </Text>
            </View>

        );
    }

    //列表item
    _itemView(item,index){
        // 本地图片的引用require不能拼接，可以用数组，网络图片可以拼接。
        const immm = require('./../../assets/img/music.png')
        return(
            <View>
                <Text>位置:{index}====ID:{item.id}</Text>
                <Image style={{width: 50, height: 50}} source={immm}/>
            </View>
        )
    }

    //指定唯一key
    _keyExtractor(item, index){
        console.log(item)
        return(
            item.id.toString()
        )
    }
}
