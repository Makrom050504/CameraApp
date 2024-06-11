import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, Animated } from 'react-native';

export default class Foto_item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opacity: 1
    };
  }


  render() {
    return (
      <View style={{opacity: this.props.op}}>

<TouchableOpacity onLongPress={() => this.props.choosephoto(this.props.index, this.props.item, this.props.dys)} onPress={() => this.props.nav.navigate('Wybrane zdjęcie', { data: this.props.item})}>
        <Image style={{width: this.props.width, height: this.props.height, margin: 5, }} source= {{ uri: this.props.item.uri }}></Image>
        <Text style={{color: "white", position: "absolute", top: this.props.top, left: this.props.left, fontSize: this.props.fontSize, fontWeight: "bold"}}>{this.props.item.id}</Text>
      </TouchableOpacity>
       
      </View>
    );
  }
}
