import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Dimensions } from "react-native";
import * as MediaLibrary from "expo-media-library";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default class Onephoto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: Dimensions.get("window").width,
      height: Dimensions.get("window").height
    };
  }

  async deletephotos() {
  
      await MediaLibrary.deleteAssetsAsync(this.props.route.params.data)
    
  
      this.props.navigation.navigate('Zdjęcia')
   

  }


  render() {
    console.log(this.props.route.params.data.height)
    return (
      <View style={{backgroundColor: "#262329", height: "100%"}}>
        <Image style={{width: 360, height: 640, borderRadius: 10, left: 5, top:5, margin: 5}} source= {{ uri: this.props.route.params.data.uri }}></Image>
        <TouchableOpacity style={{height: 30, width: 100, zIndex:2, backgroundColor: "#6719b5", borderRadius: 10, alignItems: "center", position: "absolute", top: this.state.height * 0.85, left: this.state.width * 0.1 }}><Text style={{top: 5, fontStyle: "italic", fontWeight: "bold", color: "white"}}>Share</Text></TouchableOpacity>   
        <TouchableOpacity  style={{height: 30, width: 100, zIndex:2, backgroundColor: "#6719b5", borderRadius: 10, alignItems: "center", position: "absolute", top: this.state.height * 0.85, right: this.state.width * 0.1 }} onPress={() => this.deletephotos()}><Text style={{top: 5, fontStyle: "italic", fontWeight: "bold", color: "white"}}>Delete</Text></TouchableOpacity>
      
      </View>
    );
  }
}
