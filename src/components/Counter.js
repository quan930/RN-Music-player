import React, {Component} from 'react';
import {Button, Text, View} from 'react-native';

//计数器
export default class Counter extends Component {
    state = {number: 0};
    render() {
        return (
            <View>
                <Text>{this.state.number.toString()}</Text>
                <Button title={"+1"} onPress={()=>this.add()}/>
            </View>
        )
    }
    add(){
        this.setState({
            number:this.state.number+1
        })
    }
}
