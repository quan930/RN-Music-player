import React, {Component} from 'react';
import {Text, View, Animated, Easing, Image, Button} from 'react-native';

// eslint-disable-next-line no-unused-vars
export default class MyAnimated extends Component {
    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
        if (this.props.rotation!=this.state.rotation){
            this._spin()
        }
    }
    state = {
        spinValue: new Animated.Value(0),
    }
    spinAnimated = Animated.timing(this.state.spinValue, {
        toValue: 1,
        duration: 6000,
        easing: Easing.inOut(Easing.linear)
    })
    _spining() {
        if (this.props.rotation) {
            this.state.spinValue.setValue(0)
            this.spinAnimated.start(() => {
                this._spining()
            })
        }
    }

    //旋转动画
    _spin() {
        this.setState({
            rotation : this.props.rotation
        })
        if (this.props.rotation) {
            this.spinAnimated.start(() => {
                this.spinAnimated = Animated.timing(this.state.spinValue, {
                    toValue: 1,
                    duration: 6000,
                    easing: Easing.inOut(Easing.linear)
                })
                this._spining()
            })
        } else {
            this.state.spinValue.stopAnimation((oneTimeRotate) => {
                this.spinAnimated = Animated.timing(this.state.spinValue, {
                    toValue: 1,
                    duration: (1 - oneTimeRotate) * 6000,
                    easing: Easing.inOut(Easing.linear)
                })
            })
        }
    }
    componentDidMount() {
        this._spin()
    }
    render() {
        return (
            <View>
                <Image
                    style={{width: 260, height: 260, alignSelf: 'center'}}
                    source={require('./../../assets/img/bgCD.png')}
                />
                <Animated.Image
                    style={{
                        width: 170,
                        height: 170,
                        borderRadius: 85,
                        alignSelf: 'center',
                        position: 'absolute', top: 45,
                        transform: [{rotate: this.state.spinValue.interpolate({
                                inputRange: [0, 1],
                                outputRange: ['0deg', '360deg']
                            })}]
                    }}
                    source={{uri:this.props.uri}}/>
            </View>
        )
    }
}
