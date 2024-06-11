import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, Animated } from 'react-native';
import { Dimensions } from "react-native";
import * as MediaLibrary from "expo-media-library";
import { useState } from 'react';
import Foto_item from './foto_item';
import { ToastAndroid } from "react-native";

export default class Fileslist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: []
      , 
      //zmienne do obsługi wybranych zdjęć
      choosen: [],
      opacities: [],
      delphotos: [],


      // zmienne do obsługi layoutu
      layout: 5,
      width: 66 ,
      height: 66,
      left: 8,
      top: 55,
      fontSize: 10,
      
      
    };
  }

  
  async loadphotos() {
    let { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== 'granted') {
        alert('brak uprawnień do czytania image-ów z galerii')
    }
    const album = await MediaLibrary.getAlbumAsync("DCIM")
    let obj = await MediaLibrary.getAssetsAsync({
      sortBy: [[MediaLibrary.SortBy.creationTime, false]], 
      first: 100, // ilość pobranych assetów
      mediaType: 'photo', // typ pobieranych danych, photo jest domyślne
      album: album
  });

  let op = []
  let ch = []
      obj.assets.forEach(()=> {
        op.push(1)
        ch.push(false)
      })
  

      this.setState({photos: obj.assets, opacities: op, choosen: ch})
      //alert(JSON.stringify(this.state.photos, null, 5))
      //alert(JSON.stringify(this.state.opacities, null, 5))
      this.props.navigation.addListener('focus', () => {
        this.refreshgallery()
      })
  }


  async componentDidMount() {
        this.loadphotos()
      }

      changelayout() {
         if (this.state.layout == 5) {
          this.setState({width: Dimensions.get('window').width * 0.95 , height: 100, top: 350, left: 290, fontSize: 12})
            this.setState({layout: 1})
          }
          else {
            this.setState({width: 66 , height: 66, top: 55, left: 8})
            this.setState({layout: 5})
          }
         
      }

      refreshgallery() {
        this.componentDidMount()
      }

      choosephoto(indeksik, cos, dys) {
        //zaznaczanie zdjęć
      let arr = indeksik
      let arr2 = dys.state.choosen
      let arrop = dys.state.opacities
      if (arr2[arr]) {
        arrop[arr] = 1
        arr2[arr] = false
      }
      else {
        arr2[arr] = true
        arrop[arr] = 0.5
      }
      ToastAndroid.showWithGravity(
        'Wybrano zdjęcie!',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
       );
      dys.setState({choosen: arr2, opacities: arrop})
      //alert(JSON.stringify(this.state.choosen, null, 5))
    ////////////////////////////////////////////////////


    //dane do usuwania zdjęć
    let arro = cos
    let arr3 = dys.state.delphotos
   // alert(JSON.stringify(cos, null, 5))
    if (arr3.includes(cos)) {
      arr3.splice(arr3.indexOf(cos), 1)

    }
    else {
      arr3.push(cos)
    }
    dys.setState({delphotos: arr3});
    ////////////////////////////////////////////////////

      //alert(JSON.stringify(dys.state.delphotos, null, 5))
      //this.setState({photos: this.state.photos})
      //this.forceUpdate()
      
      }

        //usuwanie zdjęć


      deletephotos () {
        let arr = this.state.delphotos
        console.log(this.state.delphotos);
        let arr2 = this.state.photos
        let arrop = this.state.opacities
        console.log(arr2+"aARRARA2222");
        arr.sort(function(a, b){return b-a})
        for (let i = 0; i < arr.length; i++) {
        //  arr2.splice(arr2.indexOf(arr[i]), 1

          MediaLibrary.deleteAssetsAsync(arr[i])
        }

        // for (let i = 0; i < arrop.length; i++) {
        //   arrop[i] = 1
        // }

        //alert(JSON.stringify(arr2, null, 5))
      
        this.setState({ opacities: arrop})
        this.setState({delphotos: []})
        this.loadphotos()
      };


  render() {
    return (
       
      


   <View style={{backgroundColor: "white", height: "100%"}}>
<TouchableOpacity style={{height: 30, color: "white", width: 100,  left: 20, top: 10, zIndex:2, backgroundColor: "#6719b5", borderRadius: 10, alignItems: "center" }} onPress={() => this.changelayout()}><Text style={{top: 5, fontStyle: "italic",color: "white", fontWeight: "bold"}}>Layout</Text></TouchableOpacity>   
<TouchableOpacity style={{height: 30,color: "white", top: 10, position: "absolute", left: 140,  width: 100, zIndex:2, backgroundColor: "#6719b5", borderRadius: 10, alignItems: "center" }} onPress={() => this.props.navigation.navigate('Kamera')}><Text style={{top: 5,color: "white", fontStyle: "italic", fontWeight: "bold"}}>Kamera</Text></TouchableOpacity>
<TouchableOpacity style={{height: 30,  color: "white", top: 10, position: "absolute", left: 260,width: 100, zIndex:2, backgroundColor: "#6719b5", borderRadius: 10, alignItems: "center" }} onPress={() => this.deletephotos()}><Text style={{top: 5, fontStyle: "italic",color: "white", fontWeight: "bold"}}>Delete</Text></TouchableOpacity>
      
     <FlatList numColumns={this.state.layout} style={{top: 20,left:5 }} key={this.state.layout} data={this.state.photos}
     renderItem={({item, index}) => 
      
      <Foto_item style={{}} op={this.state.opacities[index]} nav={this.props.navigation} dys={this} delphotos={this.deletephotos} choosephoto={this.choosephoto} item={item} index={index} height={this.state.width} fontSize={this.state.fontSize} width={this.state.width} top={this.state.top} left={this.state.left} layout={this.state.layout}></Foto_item>
      }
     >
     </FlatList>
    
    </View>
    );
  }
}





