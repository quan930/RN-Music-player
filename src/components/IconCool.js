import React, {Component} from 'react';
import {Image, Text, View} from 'react-native';

// eslint-disable-next-line no-unused-vars
export default class IconCool extends Component {
    //focused 选中
    //name 名字
    render() {
        if (this.props.name=== '发现'){
            if(this.props.focused){
                return (
                    <View>
                        <Image style={{width: 35, height: 35}} source={require('./../../assets/img/music.png')}/>
                    </View>
                )
            }else {
                return (
                    <View>
                        <Image style={{width: 30, height: 30}} source={require('./../../assets/img/unmusic.png')}/>
                    </View>
                )
            }
        }else if (this.props.name=== ' '){
            if(this.props.focused){
                return (
                    <View style={{height:45,width:45,position: 'relative',top:4}}>
                        <Image style={{width: 45, height: 45}} source={require('./../../assets/img/CD.png')}/>
                    </View>
                )
            }else {
                return (
                    <View style={{height:90,width:90,position: 'relative',bottom:10}}>
                        <Image style={{width: 90, height: 90}} source={require('./../../assets/img/CD.png')}/>
                    </View>
                )
            }
        } else {
            if(this.props.focused){
                return (
                    <View>
                        <Image style={{width: 35, height: 35}} source={require('./../../assets/img/oneself.png')}/>
                    </View>
                )
            }else {
                return (
                    <View>
                        <Image style={{width: 30, height: 30}} source={require('./../../assets/img/unoneself.png')}/>
                    </View>
                )
            }
        }
    }
}
