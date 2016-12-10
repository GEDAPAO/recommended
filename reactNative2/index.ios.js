/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
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
var Icon = require("react-native-vector-icons/FontAwesome");
let Index= require("./Page/Index/Index");
let Reading=require("./Page/Reading/Reading");
let Music=require("./Page/Music/Music");
let Request=require("./Page/Request/request");

let Width=Dimensions.get("window").width;
let Height=Dimensions.get("window").height;
class React1 extends Component{
    constructor(props){
         super(props);
         this.state={
             selected:"home",
         }
     }
    render(){
        return(
            <View style={{flex:1,backgroundColor:'white'}}>
                <TabBarIOS>
                    <Icon.TabBarItemIOS
                        title="首页"
                        iconName="home"
                        iconSize={25}
                        selectedIconName="home"
                        selected={this.state.selected=="home"}
                        onPress={
                            ()=>{
                                this.setState({
                                    selected:"home"
                                });
                            }
                        }
                    >
                        <Index/>
                    </Icon.TabBarItemIOS>

                    <Icon.TabBarItemIOS
                        title="阅读"
                        iconSize={25}
                        iconName="newspaper-o"
                        selectedIconName="newspaper-o"
                        selected={this.state.selected=="newspaper-o"}
                        onPress={
                            ()=>{
                                this.setState({
                                    selected:"newspaper-o"
                                });
                            }
                        }
                    >
                        <Reading/>
                    </Icon.TabBarItemIOS>

                    <Icon.TabBarItemIOS
                        title="音乐"
                        iconName="music"
                        iconSize={25}
                        selectedIconName="music"
                        selected={this.state.selected=="music"}
                        onPress={
                            ()=>{
                                this.setState({
                                    selected:"music"
                                });
                            }
                        }
                    >
                        <Music/>
                    </Icon.TabBarItemIOS>

                    <Icon.TabBarItemIOS
                        title="电影"
                        iconSize={25}
                        iconName="video-camera"
                        selectedIconName="video-camera"
                        selected={this.state.selected=="video-camera"}
                        onPress={
                            ()=>{
                                this.setState({
                                    selected:"video-camera"
                                });
                            }
                        }
                    >
                        <Text>123</Text>
                    </Icon.TabBarItemIOS>
                </TabBarIOS>
            </View>
        )
    }
}

AppRegistry.registerComponent("reactNative2", () => React1);
