import React, {Component} from 'react';
import {FlatList, Text, View, Dimensions, Image, TouchableOpacity, SafeAreaView, StyleSheet} from 'react-native';
import Swiper from 'react-native-swiper'

// eslint-disable-next-line no-unused-vars
export default class Home extends Component {
    state = {
        musicList: [],
        banner:[//默认轮播图
            {imageUrl:"http://p1.music.126.net/mnUmQkpzm7vHbSF2DiK1dg==/109951164809230113.jpg",id:"1430224832"},
            {imageUrl:"http://p1.music.126.net/mnUmQkpzm7vHbSF2DiK1dg==/109951164809230113.jpg",id:"1430224832"},
            {imageUrl:"http://p1.music.126.net/mnUmQkpzm7vHbSF2DiK1dg==/109951164809230113.jpg",id:"1430224832"},
            {imageUrl:"http://p1.music.126.net/mnUmQkpzm7vHbSF2DiK1dg==/109951164809230113.jpg",id:"1430224832"},
            {imageUrl:"http://p1.music.126.net/mnUmQkpzm7vHbSF2DiK1dg==/109951164809230113.jpg",id:"1430224832"}]
    };
    componentDidMount() {
        this._netWork()
        this._netBanner()
    }
    render() {
        return (
            <View style={{ flex: 1}}>
                <View style={{height: 150}}>
                    <Swiper autoplay={true}>
                        <TouchableOpacity onPress={() => this._bannerOnClick(0)}>
                            <Image style={{width:Dimensions.get("window").width,height:150}} source={{uri:this.state.banner[0].imageUrl}}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this._bannerOnClick(1)}>
                            <Image style={{width:Dimensions.get("window").width,height:150}} source={{uri:this.state.banner[1].imageUrl}}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this._bannerOnClick(2)}>
                            <Image style={{width:Dimensions.get("window").width,height:150}} source={{uri:this.state.banner[2].imageUrl}}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this._bannerOnClick(3)}>
                            <Image style={{width:Dimensions.get("window").width,height:150}} source={{uri:this.state.banner[3].imageUrl}}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this._bannerOnClick(4)}>
                            <Image style={{width:Dimensions.get("window").width,height:150}} source={{uri:this.state.banner[4].imageUrl}}/>
                        </TouchableOpacity>

                    </Swiper>
                </View>
                <FlatList
                    style={{flex: 1,flexDirection:"column"}}
                    data={this.state.musicList}
                    renderItem={({item,index}) =>this._itemView(item,index)}
                    keyExtractor={(item,index)=>this._keyExtractor(item,index)}/>
            </View>
        );
    }
    //列表item
    _itemView(item,index){
        let au=""
        item.author.forEach(m=>{
            au=au+m.name
        })
        return(
            <TouchableOpacity onPress={() => this._navigate(item.id,item.name)}>
                <View style={{height:60,width:Dimensions.get("window").width,flexDirection:"row",alignItems:"center",padding:10,paddingLeft:20,borderColor:"#D0E7FF",borderWidth:1}}>
                    <View style={{backgroundColor:"#E8F2FF",height:30,width:30,justifyContent:"center",alignItems:"center",borderColor:"#000",borderRadius:30,borderWidth:1}}>
                        <Text>{index+1}</Text>
                    </View>
                    {/*<Image style={{width:60,height:60}} source={require('./../../assets/img/CD.png')}/>*/}
                    <View style={{flex:1,height:50,flexDirection:"column",justifyContent:"center",paddingLeft:30}}>
                        <View style={{height:25,justifyContent:"center"}}>
                            <Text>{item.name}</Text>
                        </View>
                        <View style={{height:25,justifyContent:"center"}}>
                            <Text>{au}--{item.album.name}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    //歌单
    _netWork(){
        fetch("http://lilq.cn:3000/top/list?idx=1")
            .then((response)=>response.json())
            .then((myjson) => {
                //业务逻辑
                // console.log("网络回调")
                let tracks=[]
                myjson.playlist.tracks.forEach(track =>{
                    let obj={}
                    obj.id = track.id//歌曲id
                    obj.name = track.name//歌曲名称
                    obj.author=track.ar//歌曲作者[]
                    obj.album = track.al//专辑{}
                    // console.log(obj)
                    tracks.push(obj);
                })
                // console.log(tracks.length)
                this.setState({
                    musicList:tracks
                })
            })
            .catch((error) =>{
                console.error(error);
            });
    }
    //指定唯一key
    _keyExtractor(item, index){
        return(
            item.id.toString()
        )
    }
    //轮播图
    _netBanner(){
        fetch("http://lilq.cn:3000/banner")
            .then((response)=>response.json())
            .then((myjson) => {
                //业务逻辑

                let banner=[]
                myjson.banners.forEach(ban =>{
                    if(ban.targetId==0){
                        return
                    }
                    let obj={}
                    obj.imageUrl = ban.imageUrl//图片
                    obj.id = ban.targetId//歌曲id
                    banner.push(obj);
                })
                // console.log(banner.length)
                this.setState({
                    banner:banner
                })
            })
            .catch((error) =>{
                console.error(error);
            });
    }
    //轮播图点击事件
    _bannerOnClick(index){
        //歌曲详情 得到歌曲名称 进行跳转
        fetch("http://lilq.cn:3000/song/detail?ids="+this.state.banner[index].id)
            .then((response)=>response.json())
            .then((myjson) => {
                //业务逻辑
                // console.log("网络回调")
                let name="";
                if (myjson.songs.length !=0){//有内容
                    name = myjson.songs[0].name;
                    // let author=myjson.songs[0].ar//歌曲作者[]
                }
                //跳转music 页面
                this._navigate(this.state.banner[index].id,name)
            })
            .catch((error) =>{
                console.error(error);
            });
    }
    _navigate(id,name){
        this.props.navigation.navigate(' ',{
            id:id,
            name:name
        })
    }
}
