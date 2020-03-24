import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
    SafeAreaView,
    View,
    Text,
    StatusBar,
    Button,
    Alert,
    Dimensions
} from 'react-native';

const App: () => React$Node = () => {
    return (
        <NavigationContainer>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={{justifyContent:"center",height:Dimensions.get("window").height}}>
                <View >
                    <Button
                        onPress={() => {
                            Alert.alert("你点击了按钮！");
                        }}
                        title="点我！"
                    />
                </View>
            </SafeAreaView>
        </NavigationContainer>
    );
};
export default App;
