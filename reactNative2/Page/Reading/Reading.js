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
var Icon = require("react-native-vector-icons/FontAwesome");
let Request=require("../Request/request");
let Width=Dimensions.get("window").width;
let Height=Dimensions.get("window").height;


class Reading extends Component{
    constructor(props){
        super(props);
        this.state= {
            SwiperData:null,
            ListData:null,
        }
        this._fetchReadingSwiper()
        this._fetchReadingList()
    }

    _fetchReadingSwiper(){
        var that=this;
        Request.get("http://v3.wufazhuce.com:8000/api/reading/carousel")
            .then(function (response) {
                that.setState({
                    SwiperData:response.data
                })
            })
    }

    _fetchReadingList(){
        var that=this;
        Request.get("http://v3.wufazhuce.com:8000/api/reading/index")
            .then(function (response) {
                that.setState({
                    ListData:response.data
                })
            })
    }


    render(){
        if(this.state.SwiperData==null || this.state.ListData==null){
            return <View><Text>加载中...</Text></View>
        }
        return(
            <View style={{flex:1,marginTop:20}}>
                <View style={{height:38,borderBottomColor:"#eeeeee",borderBottomWidth:2,flexDirection:'row',alignItems:'center',justifyContent:'space-between',paddingLeft:5,paddingRight:5}}>
                    <Image
                        source={require("../../img/sousuo.png")}
                        style={{width:18,height:18}}
                    />
                    <Text style={{fontSize:20}}>阅读</Text>
                    <Image
                        source={require("../../img/user.png")}
                        style={{width:18,height:18}}
                    />
                </View>

                <Swiper height={170}>
                    {
                        this.state.SwiperData.map((value,key)=>{
                            return(
                                <View key={key} style={{flex:1}}>
                                    <Image
                                        style={{height:170}}
                                        source={{uri:value.cover}}
                                    />
                                </View>
                            )
                        })
                    }
                </Swiper>
                <View style={{flex:1,paddingBottom:50}}>
                    <ScrollView>
                        {
                            this.state.ListData.essay.map((value,key)=>{
                                return(
                                    <View key={key} style={{padding:10}}>
                                        <View style={{flexDirection:"row",justifyContent:"space-between",marginTop:10}}>
                                            <Text style={{fontSize:16,color:'#340337'}}>{value.hp_title}</Text>
                                            <View style={styles.btn}>
                                                <Text style={styles.btnText}>短篇</Text>
                                            </View>
                                        </View>
                                        <View style={{marginTop:10}}>
                                            <Text style={{fontSize:14,color:"#98969a"}}>{value.author[0].user_name}</Text>
                                        </View>
                                        <View style={{marginTop:10}}>
                                            <Text style={{fontSize:14,color:"#98969a"}}>{value.guide_word}</Text>
                                        </View>
                                    </View>
                                )
                            })
                        }

                        {
                            this.state.ListData.serial.map((value,key)=>{
                                return(
                                    <View key={key} style={{padding:10}}>
                                        <View style={{flexDirection:"row",justifyContent:"space-between",marginTop:10}}>
                                            <Text style={{fontSize:16,color:'#340337'}}>{value.title}</Text>
                                            <View style={styles.btn}>
                                                <Text style={styles.btnText}>连载</Text>
                                            </View>
                                        </View>
                                        <View style={{marginTop:10}}>
                                            <Text style={{fontSize:14,color:"#98969a"}}>{value.author.user_name}</Text>
                                        </View>
                                        <View style={{marginTop:10}}>
                                            <Text style={{fontSize:14,color:"#98969a"}}>{value.excerpt}</Text>
                                        </View>
                                    </View>
                                )
                            })
                        }

                        {
                            this.state.ListData.question.map((value,key)=>{
                                return(
                                    <View key={key} style={{padding:10}}>
                                        <View style={{flexDirection:"row",justifyContent:"space-between",marginTop:10}}>
                                            <Text style={{fontSize:16,color:'#340337'}}>{value.question_title}</Text>
                                            <View style={styles.btn}>
                                                <Text style={styles.btnText}>问答</Text>
                                            </View>
                                        </View>
                                        <View style={{marginTop:10}}>
                                            <Text style={{fontSize:14,color:"#98969a"}}>{value.answer_title}</Text>
                                        </View>
                                        <View style={{marginTop:10}}>
                                            <Text style={{fontSize:14,color:"#98969a"}}>{value.answer_content}</Text>
                                        </View>
                                    </View>
                                )
                            })
                        }
                    </ScrollView>
                </View>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    btn:{
        height:18,
        borderWidth:1,
        borderColor:'#a5ccfa',
        borderRadius:5,
        alignItems:"center",
        justifyContent:'center',
        width:40
    },
    btnText:{
        color:"#a5ccfa",
        fontSize:13,
        backgroundColor:'transparent'
    }
})

module.exports=Reading;