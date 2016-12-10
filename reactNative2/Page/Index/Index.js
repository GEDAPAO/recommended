/**
 * Created by lanou on 16/11/3.
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
    TouchableHighlight
} from "react-native";
import Swiper from 'react-native-swiper';
var Icon = require("react-native-vector-icons/FontAwesome");
let Request=require("../Request/request");
let Width=Dimensions.get("window").width;
let Height=Dimensions.get("window").height;

let arr=[];
let idList=[];
class Index extends Component{
    constructor(props){
        super(props);
        this.state= {
            idList: null,
            idData:null,
            load:false
        }
        this._fetchList();
        //this._fetchData();
    }
    _fetchList(){
        var that=this;
        Request.get("http://v3.wufazhuce.com:8000/api/hp/idlist/0")
            .then(function (response) {
                that.setState({
                    idList:response.data
                })
                idList=response.data
            })
    }

    _fetchData(){
        if(this.state.idList!==null) {
            let arrData=this.state.idList;
            var that = this;
            for (let i = 0; i < arrData.length; i++) {
                Request.get("http://v3.wufazhuce.com:8000/api/hp/detail/"+arrData[i])
                    .then(function (response) {
                        arr.push(response.data)
                        that.setState({
                            idData: arr,
                            load: true
                        })
                    })
            }
        }
    }

    render(){
        if(!this.state.load) {
            this._fetchData();
            return <View><Text>加载中...</Text></View>
        }
        return(
            <View style={{flex:1,marginTop:20}}>
                <View style={{height:38,borderBottomColor:"#eeeeee",borderBottomWidth:2,flexDirection:'row',alignItems:'center',justifyContent:'space-between',paddingLeft:5,paddingRight:5}}>
                    <Image
                        source={require("../../img/sousuo.png")}
                        style={{width:18,height:18}}
                    />
                    <Text style={{fontSize:20}}>ONE</Text>
                    <Image
                        source={require("../../img/user.png")}
                        style={{width:18,height:18}}
                    />
                </View>
                <Swiper>
                    {
                        this.state.idData.map((value,key)=>{
                            return(
                                <View key={key} style={{flex:1,padding:5,}}>
                                <View>
                                    <View style={{padding:5,borderWidth:1,borderColor:'#e5e5e5'}}>
                                        <View>
                                            <Image
                                                style={{width:Width-22,height:(Width-22)*0.8}}
                                                source={{uri:value.hp_img_url}}
                                            />
                                        </View>
                                        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                            <Text style={{color:"#9b999d",fontSize:14}}>{value.hp_title}</Text>
                                            <Text style={{color:"#9b999d",fontSize:14}}>{value.hp_author}</Text>
                                        </View>
                                        <View style={{marginTop:20}}>
                                            <Text style={{fontSize:16,lineHeight:20}}>{value.hp_content}</Text>
                                            <Text style={{color:"#9b999d",fontSize:14,textAlign:'right',marginTop:27}}>{value.hp_makettime}</Text>
                                        </View>
                                    </View>
                                    <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:20}}>
                                        <View style={{flexDirection:'row'}}>
                                            <Image
                                                style={{width:14,height:17,marginLeft:10,marginRight:10}}
                                                source={require('../../img/book.png')}
                                            />
                                            <Text style={{color:"#9b999d",fontSize:14}}>小记</Text>
                                        </View>
                                        <View style={{flexDirection:'row'}}>
                                            <Image
                                                style={{width:16,height:14,marginLeft:10,marginRight:10}}
                                                source={require('../../img/xin.png')}
                                            />
                                            <Text style={{color:"#9b999d",fontSize:14}}>{value.praisenum}</Text>
                                            <Image
                                                style={{width:15,height:17,marginLeft:10,marginRight:10}}
                                                source={require("../../img/fenxiang.png")}
                                            />
                                        </View>
                                    </View>
                                </View></View>
                            )
                        })
                    }
                </Swiper>
            </View>
        )
    }
}


module.exports=Index;