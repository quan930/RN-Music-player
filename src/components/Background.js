import React, { Component } from "react";
import {View, Image, Text, StyleSheet, Dimensions, findNodeHandle, SafeAreaView} from 'react-native';
import { BlurView } from "@react-native-community/blur";
import Music from './Music';

// eslint-disable-next-line no-unused-vars
export default class Background extends Component {
    state={
        viewRef: null
    }
    render() {
        return (
            <>
                <View style={styles.container}>
                    <Image
                        ref={img => {
                            this.backgroundImage = img;
                        }}
                        source={{ uri:"https://p2.music.126.net/JZ0L_3ZMY8UgFCEUN5d_tw==/109951164795031716.jpg" }}
                        style={styles.absolute}
                        onLoadEnd={() => this.imageLoaded()}/>
                    {this._renderBlurView()}
                </View>
                <SafeAreaView  style={{ flex: 1, width:Dimensions.get("window").width,justifyContent: 'center', alignItems: 'center'}}>
                    <Text>Hi, I am some unblurred text</Text>
                </SafeAreaView>
            </>
        );
    }
    imageLoaded() {
        console.log("绑定")
        this.setState({ viewRef: findNodeHandle(this.backgroundImage) });
    }
    _renderBlurView() {
        if (this.state.viewRef === null) {
            return <Text>hello world</Text>;
        }
        return(
            <BlurView
                style={styles.absolute}
                viewRef={this.state.viewRef}
                blurType="light"
                blurAmount={10}
            />
        );
    }
}
const styles = StyleSheet.create({
    container: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    },
    absolute: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    }
});
