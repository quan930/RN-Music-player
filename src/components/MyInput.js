import React, { Component, useState } from 'react';
import { Text, TextInput, View } from 'react-native';

export default class MyInput extends Component{
    state = {text:'请输入',setText:''};
    render(){
        return (
            <View style={{padding: 10}}>
                <TextInput
                    style={{height: 40}}
                    placeholder="Type here to translate!"
                    onChangeText={text =>{
                        this.setState({setText:text})
                    }}
                    defaultValue={this.state.setText}
                />
                <Text style={{padding: 10, fontSize: 42}}>
                    {}
                </Text>
                <Text style={{padding: 10, fontSize: 42}}>
                    {this.state.setText.split(' ').map((word) => word && '🍕').join(' ')}
                </Text>
            </View>
        );
    }
}
