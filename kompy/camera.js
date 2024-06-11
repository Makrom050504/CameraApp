import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { Dimensions } from "react-native";
import { ToastAndroid } from "react-native";

export default class Kamera extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasCameraPermission: null,         // przydzielone uprawnienia do używania kamery
            type: Camera.Constants.Type.back,  // typ kamery
            width: Dimensions.get("window").width,
            height: Dimensions.get("window").height
            
            
        };
    }

   async componentDidMount() {

        let { status } = await Camera.requestCameraPermissionsAsync();
        this.setState({ hasCameraPermission: status === 'granted' });
        
    }
    changecamera() {
        this.setState({ type: this.state.type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back });
    }

   async takepicture() {
        if (this.camera) {
            let foto = await this.camera.takePictureAsync();
            console.log(foto.uri);
            let asset = await MediaLibrary.createAssetAsync(foto.uri); // domyślnie zapisuje w folderze DCIM
            ToastAndroid.showWithGravity(
                 'Wykonano zdjęcie!',
                 ToastAndroid.SHORT,
                 ToastAndroid.CENTER
                );
           // alert(JSON.stringify(asset, null, 4))
           }
           
}  
    render() {
        const { hasCameraPermission } = this.state; // podstawienie zmiennej ze state
        if (hasCameraPermission == null) {
            return <View />;
        } else if (hasCameraPermission == false) {
            return <Text>brak dostępu do kamery</Text>;
        } else {
            return (
                <View style={{ flex: 1 }}>
                    <Camera
                        ref={ref => {
                            this.camera = ref; // Uwaga: referencja do kamery używana później
                        }}
                        style={{ flex: 1, aspectRatio: 3 / 4}}
                        type={this.state.type}>
                        <View style={{ flex: 1 }}>
                            {
                                <View>
                                <TouchableOpacity style={{height: 60, width: 60, zIndex:2, position: "absolute", top: this.state.height * 0.8, left: this.state.width*0.4 , backgroundColor: "#6719b5", borderRadius: 50, alignItems: "center" }} onPress={() => this.takepicture()}><Text style={{top: 0, fontStyle: "italic", fontWeight: "bold",color: "white" ,fontSize: 40}}>+</Text></TouchableOpacity>
                                <TouchableOpacity style={{height: 60, width: 60, zIndex:2, position: "absolute", top: this.state.height * 0.8, left: this.state.width*0.7, backgroundColor: "#6719b5", borderRadius: 50, alignItems: "center" }} onPress={() => this.changecamera()}><Text style={{top: 20, fontStyle: "italic", fontWeight: "bold", color: "white"}}>ROT</Text></TouchableOpacity>
                                
                            </View>
                            /* tutaj wstaw buttony do obsługi kamery */}
                        </View>
                    </Camera>
                </View>
            );
        }
    }
}
