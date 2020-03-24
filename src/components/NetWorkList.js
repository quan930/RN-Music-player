import React, { Component, useState } from 'react';
import {Alert, Button, Text, TextInput, View, FlatList, Image} from 'react-native';

export default class NetWorkList extends Component{
    arr=[];
    state = {num:0,list:[]};
    //挂载函数
    componentDidMount(){
        this._netWork()
    }

    render(){
        return (
            <View style={{padding: 10}}>
                <Button
                    onPress={() => this._netWork()}
                    title="网络请求"
                />
                <FlatList
                    style={{height:100}}
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
        return(
            <View>
                <Text>位置:{index}====ID:{item.id}====name:{item.name}===age:{item.age}</Text>
            </View>
        )
    }

    //指定唯一key
    _keyExtractor(item, index){
        return(
            item.id.toString()
        )
    }

    _netWork(){
        fetch("http://lilq.cn:3000/top/list?idx=1")
            .then((response)=>response.json())
            .then((myjson) => {
                //业务逻辑
                console.log("网络回调")
                console.log(myjson.playlist)
            })
            .catch((error) =>{
                console.error(error);
            });
    }
}
