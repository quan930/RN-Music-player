import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    StatusBar,
    SafeAreaView,
    Dimensions,
    Platform,
    Image,
    Button,
    Alert
} from 'react-native';
import Blink from './src/components/Blink';
import MyInput from './src/components/MyInput';
import MyList from './src/components/MyList';
import NetWorkList from './src/components/NetWorkList';

var str = "ads"
export default class HelloWorldApp extends Component {
    // flex: 1 权重
    render() {
        return (
            <>
                <StatusBar backgroundColor="blue" barStyle="light-content" />
                <SafeAreaView style={styles.mainViewStyle}>
                    {/*<View style={styles.col}>*/}
                    {/*    <Text style={{width:200,height:80,backgroundColor: 'red'}}>1</Text>*/}
                    {/*    <Text style={{width:150,height:100,backgroundColor: 'green'}}>2</Text>*/}
                    {/*    <Text style={{width:70,height:40,backgroundColor: '#ff0'}}>3</Text>*/}
                    {/*    <Text style={{width:100,height:40,backgroundColor: '#f0f'}}>4</Text>*/}
                    {/*</View>*/}
                    {/*<View style={styles.col}>*/}
                    {/*    <Text style={{width:200,flexGrow:1,backgroundColor: 'red'}}>1</Text>*/}
                    {/*    <Text style={{width:150,flexGrow:1,backgroundColor: 'green'}}>2</Text>*/}
                    {/*    <Text style={{width:70,flexGrow:2,backgroundColor: '#ff0'}}>3</Text>*/}
                    {/*    <Text style={{width:100,height:300,flexGrow:1,backgroundColor: '#f0f'}}>4</Text>*/}
                    {/*</View>*/}
                    <View style={styles.col}>
                        <Text>
                            当前屏幕的高度:{Dimensions.get("window").height+"\n"}
                            当前屏幕的宽度:{Dimensions.get("window").width+"\n"}
                            当前屏幕的分辨率:{Dimensions.get("window").scale+"\n"}
                            当前运行平台:{Platform.OS+"\n"}
                        </Text>
                    </View>
                    <View>
                        <Image style={{width:50,height:50}} source={require('./assets/img/music.png')}></Image>
                    </View>
                    <View style={styles.col}>
                        <Button
                            onPress={() => {
                                Alert.alert("你点击了按钮！");
                            }}
                            title="点我！"
                        />
                    </View>
                    {/*<Blink text='闪烁的adadad灯'/>*/}
                    {/*<MyInput/>*/}
                    {/*<MyList/>*/}
                    {/*<NetWorkList/>*/}
                </SafeAreaView>
            </>
        );
    }
}
const styles=StyleSheet.create(
    {
        mainViewStyle:{//主轴
            // flex: 1,
            backgroundColor: '#fff',
            flexDirection:'row',
            flexWrap:'wrap',
            justifyContent:'space-evenly',
            // flexGrow:1
        },
        col:{
            backgroundColor: '#ffdcc6',
            flexDirection:'column',
            flexWrap:'wrap',
            justifyContent: 'space-evenly',
            alignItems:'stretch',
        }
    }
)


