import React, {Component} from 'react';
import {
    Button,
    Text,
    View,
    TouchableOpacity,
    Image,
    Slider,
    Dimensions,
    ScrollView,
    StyleSheet,
    Animated, Easing,
    TouchableWithoutFeedback, Platform, findNodeHandle, SafeAreaView,
} from 'react-native';
import { BlurView, VibrancyView } from "@react-native-community/blur";
import Video from 'react-native-video';
import MyAnimated from './MyAnimated';

//没有默认音乐如何处理
// eslint-disable-next-line no-unused-vars
export default class Music extends Component {
    state = {
        rate: 0,            //音乐播放控制
        musicUrl:"http://lilq.cn/music/te.mp3",//默认音乐防止问题
        isplayBtn:require('./../../assets/img/start.png'),
        duration: 0,        //歌曲长度
        sliderValue: 0,     //Slide的value
        currentTime: 0.0,   //当前播放时间
        lyrObj: [],     //当前歌词
        isShow:true,
        id:"",//歌曲id
        name:"",//歌曲名称
        //动画
        isAnimated:false,//是否显示
        spinValue: new Animated.Value(0),
        // rotation:false,//开始旋转
        // isAnimatedStartOrStop:false,
        musicPic:"https://p2.music.126.net/JZ0L_3ZMY8UgFCEUN5d_tw==/109951164795031716.jpg",//图片
    };

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
        if (this.props.id!=this.state.id){
            console.log("更新歌曲")
            this._loadMusic(this.props.id,this.props.name)
        }
    }

    componentWillMount(){
        this._loadMusic(this.props.id,this.props.name)
        console.log("加载加载")
    }

    render() {
        return (
            <>
                <View style={styles.container}>
                    <Image
                        ref={img => {
                            this.backgroundImage = img;
                        }}
                        source={{ uri:this.state.musicPic}}
                        style={{width:Dimensions.get("window").width,height:Dimensions.get("window").height,position: "absolute"}}
                        // style={{width:Dimensions.get("window").width,height:Dimensions.get("window").width,position: "absolute",top: (Dimensions.get("window").height-Dimensions.get("window").width)/3}}
                        onLoadEnd={() => this._imageLoaded()}/>
                    {this._renderBlurView()}
                </View>
                <SafeAreaView  style={{ flex: 1, width:Dimensions.get("window").width,justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center',flexDirection:"column-reverse",paddingBottom:25}}>
                        <Video
                            source={{uri:this.state.musicUrl}}   // Can be a URL or a local file.
                            ref='video'                  //申明方便调用
                            rate={this.state.rate}       // 控制暂停/播放，0 代表暂停paused, 1代表播放normal.
                            volume={1.0}                 // 声音的放大倍数，0 代表没有声音，就是静音muted, 1 代表正常音量 normal，更大的数字表示放大的倍数
                            muted={false}                // true代表静音，默认为false.
                            paused={false}               // true代表暂停，默认为false
                            repeat={true}                // 是否重复播放
                            playInBackground={false}     // 当app转到后台运行的时候，播放是否暂停
                            playWhenInactive={false}
                            onProgress={(e) => this.onProgress(e)}
                            onLoad={(e) => this.onLoad(e)}//音乐加载回调
                        />
                        {/*//切换按钮*/}
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around',alignItems:'center',width:Dimensions.get("window").width}}>
                            <View style={{paddingLeft:30}}>
                                <TouchableOpacity onPress={() => {
                                    console.log("上lll一曲")
                                }}>
                                    <Image source={require('../../assets/img/up.png')} style={{ width: 45, height: 45}} />
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity onPress={() => this._playAction()}>
                                <Image source={this.state.isplayBtn} style={{ width: 70, height: 70 }} />
                            </TouchableOpacity>
                            <View style={{paddingRight:30}}>
                                <TouchableOpacity onPress={() => this._down()}>
                                    <Image source={require('./../../assets/img/down.png')} style={{ width: 45, height: 45}}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                        {/*//进度条*/}
                        <View style={{paddingLeft:10,paddingRight:10,flexDirection:"row",alignItems:"center",width:Dimensions.get("window").width}}>
                            <Text style={{color:"#fff"}}>{this._formatTime(Math.floor(this.state.currentTime))}</Text>
                            <Slider
                                ref='slider'
                                style={{ flex:1,marginLeft: 1, marginRight: 1,height:50}}
                                value={this.state.sliderValue}
                                maximumValue={this.state.duration}
                                step={1}
                                minimumTrackTintColor='#fff'
                                onValueChange={(value) => {
                                    this.setState({
                                        currentTime: value
                                    })
                                }
                                }
                                onSlidingComplete={(value) => {
                                    this.refs.video.seek(value)
                                }}
                            />
                            <Text style={{color:"#fff"}}>{this._formatTime(Math.floor(this.state.duration))}</Text>
                        </View>
                        {/*歌词*/}
                        {this._lyricOrAnimated()}
                        {/*title 头部*/}
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around',alignItems:'center',width:Dimensions.get("window").width,height: 50,paddingTop:10}}>
                            <Text style={{height: 40, color: '#fff',fontSize:25 }}>{this.props.name}</Text>
                        </View>
                    </View>
                </SafeAreaView>
            </>
        );
    }

    //背景
    _renderBlurView() {
        if (this.state.viewRef === null) {
            return <Text>hello world</Text>;
        }
        return(
            <BlurView
                style={styles.absolute}
                viewRef={this.state.viewRef}
                blurType="dark"
                blurAmount={Platform.OS === 'ios'?20:10}
            />
        );
    }
    //图片加载回调用于背景处理
    _imageLoaded() {
        this.setState({viewRef: findNodeHandle(this.backgroundImage)})
    }

    //歌词或者动画 view
    _lyricOrAnimated(){
        if (this.state.isAnimated){
            //动画
            return (
                <View style={{flex:1, justifyContent:"center",alignItems: 'center',width:Dimensions.get("window").width}}>
                    <TouchableOpacity onPress={()=>{
                        this.setState({
                            isAnimated:false
                        })
                    }}>
                        <MyAnimated rotation={this.state.rate===0?false:true} uri={this.state.musicPic}/>
                    </TouchableOpacity>
                </View>
            )
        }
        return(
            <View style={{flex:1, alignItems: 'center',width:Dimensions.get("window").width,padding:20}}>
                <ScrollView style={{width:Dimensions.get("window").width}}
                            automaticallyAdjustContentInsets={false}
                            ref={(scrollView) => { this._scrollView = scrollView }}>
                    <TouchableOpacity onPress={() => {
                        this.setState({
                            isAnimated:true
                        })
                    }}>
                        {this._renderItem()}
                    </TouchableOpacity>
                </ScrollView>
                <TouchableOpacity onPress={() => {
                    this.setState({
                        isAnimated:true
                    })
                }}>
                </TouchableOpacity>
            </View>
        )
    }

    //音乐播放按钮点击 播放暂停
    _playAction(){
        if(this.state.rate===0){
            this.setState({
                rate: 1.0,
                isplayBtn:require('./../../assets/img/stop.png'),
            })
        }else {
            this.setState({
                rate: 0,
                isplayBtn:require('./../../assets/img/start.png'),
            })
        }
    }

    // 播放器加载好时调用,其中有一些信息带过来
    onLoad = (data) => {
        console.log("音乐加载"+data.duration)
        this.setState({
            duration: data.duration,
            sliderValue: 0,         //slider 初始化
            currentTime: 0.0,
        });
        // //歌词
        // fetch("http://lilq.cn:3000/lyric?id=347230")
        //     .then((response)=>response.json())
        //     .then((myjson) => {
        //         //业务逻辑
        //         this._loadLyric(myjson.lrc)
        //     })
        //     .catch((error) =>{
        //         console.error(error);
        //     });
    }

    //播放器每隔250ms调用一次 播放器播放监听
    onProgress = (data) => {
        let val = parseInt(data.currentTime)
        // console.log("时间"+data.currentTime+typeof data.currentTime)
        this.setState({
            sliderValue: val,
            currentTime: data.currentTime
        })
    }
    //把秒数转换为时间类型
    _formatTime(time) {
        // 71s -> 01:11
        let min = Math.floor(time / 60)
        let second = time - min * 60
        min = min >= 10 ? min : '0' + min
        second = second >= 10 ? second : '0' + second
        return min + ':' + second
    }

    //下一曲
    _down(){
        fetch("http://lilq.cn:3000/song/url?id=347230")
            .then((response)=>response.json())
            .then((myjson) => {
                //业务逻辑
                console.log("网络回调"+myjson.data[0].url)
                this.setState({
                    musicUrl:myjson.data[0].url
                })
            })
            .catch((error) =>{
                console.error(error);
            });
    }

    //加载音乐
    _loadMusic(id,name){
        this.setState({
            sliderValue:0,
            currentTime: 0.0,
            lyrObj:[]
        })
        //获取音乐Url
        console.log(id)
        //可能不存在 url !!!
        fetch("http://lilq.cn:3000/song/url?id="+id)
            .then((response)=>response.json())
            .then((myjson) => {
                //业务逻辑
                // console.log("网络回调...."+myjson.data[0].url)
                this.setState({
                    musicUrl:myjson.data[0].url
                })
            })
            .catch((error) =>{
                console.error(error);
            });
        //歌词 可能不存在 歌词!!!
        fetch("http://lilq.cn:3000/lyric?id="+id)
            .then((response)=>response.json())
            .then((myjson) => {
                //加载歌词
                if (myjson.nolyric==true){
                    //无歌词
                }else {
                    this._loadLyric(myjson.lrc)
                }
            })
            .catch((error) =>{
                console.error(error);
            });
        //加载图片
        fetch("http://lilq.cn:3000/song/detail?ids="+id)
            .then((response)=>response.json())
            .then((myjson) => {
                //加载图片
                let url = myjson.songs[0].al.picUrl;
                // console.log("图片"+url);
                this.setState({
                    musicPic:url
                })
            })
            .catch((error) =>{
                console.error(error);
            });
        this.setState({
            id:id,
            name:name,
        })
    }

    //歌词
    _loadLyric(lrc){
        let lyrObj=[]
        if(lrc.lyric==null){
            console.log("aaa")
        }
        let lry = lrc.lyric
        let lryAry = lry.split('\n')   //按照换行符切数组
        // console.log("歌词"+JSON.stringify(lryAry))
        lryAry.forEach(function (val, index) {
            var obj = {}   //用于存放一行歌词
            val = val.replace(/(^\s*)|(\s*$)/g, '')    //正则,去除前后空格
            // console.log(val)
            let indeofLastTime = val.indexOf(']')  // ]的下标
            let timeStr = val.substring(1, indeofLastTime) //把时间切出来 0:04.19
            let minSec = ''
            let timeMsIndex = timeStr.indexOf('.')  // .的下标
            let ms;//毫秒
            if (timeMsIndex !== -1) {
                //存在毫秒 0:04.19
                minSec = timeStr.substring(1, val.indexOf('.')-1)  // 0:04.
                ms = parseInt(timeStr.substring(timeMsIndex + 1, indeofLastTime))  //毫秒值 19
            } else {
                //不存在毫秒 0:04
                minSec = timeStr
                ms = 0
            }
            // minSec 现在的格式为 mm:ss
            let curTime = minSec.split(':')  // [0,04]
            obj.currentTime = (parseInt(curTime[0])*60+parseInt(curTime[1]))+"."+ms;
            // console.log("歌词时间"+obj.currentTime)
            obj.txt = val.substring(indeofLastTime + 1, val.length) //歌词文本: 留下唇印的嘴
            obj.txt = obj.txt.replace(/(^\s*)|(\s*$)/g, '')
            lyrObj.push(obj)
        })
        this.setState({
            lyrObj:lyrObj
        })
        // console.log("歌词"+JSON.stringify(lyrObj))
    }

    //歌词view
    _renderItem() {
        // 数组
        var itemAry = [];
        //第一行
        if (this.state.lyrObj.length<1){
            return
        }
        if(this.state.currentTime>=this.state.lyrObj[0].currentTime&&this.state.currentTime<this.state.lyrObj[1].currentTime){
            itemAry.push(
                <View key={0} style={{
                    height: 275,
                    alignItems: 'center',
                    paddingTop:250,
                }}>
                    <Text style={{height: 40, color: '#fbff14',fontSize:25 }}>{this.state.lyrObj[0].txt}</Text>
                </View>
            );
        }else {
            itemAry.push(
                <View key={0} style={{
                    height: 275,
                    alignItems: 'center',
                    paddingTop:250,
                }}>

                    <Text style={{ height: 40,color: '#fff' ,fontSize:17}}>{this.state.lyrObj[0].txt}</Text>
                </View>
            );
        }
        //中间
        for (var i = 1; i < this.state.lyrObj.length-1; i++) {
            var item = this.state.lyrObj[i].txt
            if(this.state.currentTime>=this.state.lyrObj[i].currentTime&&this.state.currentTime<this.state.lyrObj[i+1].currentTime){
                itemAry.push(
                    <View key={i} style={styles.itemStyle}>

                        <Text style={{height: 40, color: '#fbff14',fontSize:25 }}>{item}</Text>
                    </View>
                );
                if(this._scrollView != null){
                    this._scrollView.scrollTo({ x: 0, y: (40 * i), animated: false });
                }

            }else {
                itemAry.push(
                    <View key={i} style={styles.itemStyle}>

                        <Text style={{height: 40, color: '#fff',fontSize:17 }}>{item}</Text>
                    </View>
                );
            }
        }
        //最后一行
        // itemAry.push(
        //     <View key={lyrObj.length-1} style={styles.itemStyle}>
        //         <Text style={{ color: '#fff',fontSize:20 }}>{lyrObj[lyrObj.length-1]}</Text>
        //     </View>
        // );
        return itemAry;
    }
}
const deviceInfo = {
    deviceWidth: Dimensions.get('window').width,
    deviceHeight: Platform.OS === 'ios' ? Dimensions.get('window').height : Dimensions.get('window').height - 24
}
const styles = StyleSheet.create({
    itemStyle: {
        // height: 25,
        height: 40,
        alignItems: 'center',
    },
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
})
