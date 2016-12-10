/**
 * Created by lanou on 16/11/8.
 */
import React, { Component } from "react";
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
    Image,
    TabBarIOS,
    Dimensions,
    Navigator,
    TouchableHighlight,
    ScrollView
} from "react-native";
import Swiper from 'react-native-swiper';
var ScrollableTabView = require('react-native-scrollable-tab-view');
var Icon = require("react-native-vector-icons/FontAwesome");
let Request=require("../Request/request");
let Width=Dimensions.get("window").width;
let Height=Dimensions.get("window").height;

let arr=[];
class Music extends Component{
    constructor(props){
        super(props);
        this.state= {
            MusicId:null,
            MusicData:null,
            load:false
        }
        this._fetchMusicId()
    }

    _fetchMusicId(){
        var that=this;
        Request.get("http://v3.wufazhuce.com:8000/api/music/idlist/0")
            .then(function (response) {
                that.setState({
                    MusicId:response.data
                })
            })
    }

    _fetchMusicData(){
        if(this.state.MusicId!==null) {
            let arrMusicData=this.state.MusicId;
            var that = this;
            for (let i = 0; i < this.state.MusicId.length; i++) {
                Request.get("http://v3.wufazhuce.com:8000/api/music/detail/"+arrMusicData[i])
                    .then(function (response) {
                        arr.push(response.data)
                        that.setState({
                            MusicData: arr,
                            load: true
                        })
                    })
            }
        }
    }


    render(){
        if(!this.state.load) {
            this._fetchMusicData();
            return <View><Text>加载中...</Text></View>
        }
        console.log(this.state.MusicData)
        return(
            <View style={{flex:1,marginTop:20}}>
                <View style={{height:38,borderBottomColor:"#eeeeee",borderBottomWidth:2,flexDirection:'row',alignItems:'center',justifyContent:'space-between',paddingLeft:5,paddingRight:5}}>
                    <Image
                        source={require("../../img/sousuo.png")}
                        style={{width:18,height:18}}
                    />
                    <Text style={{fontSize:20}}>音乐</Text>
                    <Image
                        source={require("../../img/user.png")}
                        style={{width:18,height:18}}
                    />
                </View>

                <Swiper>
                    {

                        this.state.MusicData.map((value, key)=> {
                            return(
                                <View style={{flex:1}} key={key}>
                                    <View style={{height:210}}>
                                        <Image
                                            style={{height:210}}
                                            source={{uri:value.cover}}
                                        />
                                    </View>
                                    <View style={styles.author}>
                                        <View style={{flex:1}}>
                                            <View style={{flexDirection:'row',alignItems:"center",marginBottom:12}}>
                                                <View style={{borderRadius:25,overflow:"hidden",marginRight:10}}>
                                                    <Image
                                                        style={{width:50,height:50}}
                                                        source={{uri:value.author.web_url}}
                                                    />
                                                </View>
                                                <View>
                                                    <Text style={{fontSize:12,color:'#85c0f1',marginBottom:5}}>{value.author.user_name}</Text>
                                                    <Text style={{fontSize:12,color:'#908e93'}}>{value.author.desc}</Text>
                                                </View>
                                            </View>
                                            <View>
                                                <Text style={{fontSize:14,color:'#443046'}}>{value.title}</Text>
                                            </View>
                                        </View>
                                        <View style={{flex:1}}>
                                            <View style={{flexDirection:'row',justifyContent:'flex-end',alignItems:'center'}}>
                                                <Image
                                                    style={{width:16,height:16,marginRight:5}}
                                                    source={require('../../img/xia.png')}
                                                />
                                                <Text style={{fontSize:12,color:"#ff5e00"}}>虾米音乐</Text>
                                            </View>
                                            <View style={{justifyContent:'flex-end',marginTop:5,backgroundColor:'yellow'}}>
                                                <Image
                                                    style={{width:38,height:38,position:'absolute',right:0}}
                                                    source={require('../../img/play.png')}
                                                />
                                            </View>
                                            <View style={{position:'absolute',bottom:0,right:0}}>
                                                <Text style={{textAlign:'right',fontSize:12,color:'#908e93'}}>{value.maketime}</Text>
                                            </View>
                                        </View>
                                    </View>

                                    <View style={{flex:1,padding:10}}>
                                        <ScrollableTabView
                                            tabBarUnderlineStyle={{backgroundColor:'transparent'}}
                                            tabBarActiveTextColor="#8eb6e6"
                                            tabBarInactiveTextColor="#7b787e"
                                        >
                                            <View tabLabel="音乐故事" style={{flex:1}}>
                                                <ScrollView>
                                                    <View style={{paddingBottom:110}}>
                                                        <Text style={{fontSize:16,color:"#554357",marginTop:10}}>{value.story_title}</Text>
                                                        <Text style={{fontSize:14,color:"#6eb5ef",marginTop:10,marginBottom:10}}>{value.story_author.user_name}</Text>
                                                        <Text style={{fontSize:16,color:"#554357"}}>{value.story}</Text>
                                                    </View>
                                                </ScrollView>
                                            </View>
                                            <View tabLabel="歌词"></View>
                                            <View tabLabel="专辑信息"></View>
                                        </ScrollableTabView>
                                    </View>
                                </View>
                            )
                        })

                    }
                </Swiper>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    author:{
        height:100,
        marginTop:-20,
        marginLeft:10,
        marginRight:10,
        borderWidth:2,
        borderColor:"#dadada",
        backgroundColor:'white',
        flexDirection:"row",
        justifyContent:"space-between",
        padding:8
    }
})

module.exports=Music;