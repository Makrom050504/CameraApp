import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Camera } from "expo-camera";
import * as React from 'react';
import Filelist from './gallery.js'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


export default function App({navigation}) {

  return (
    <View style={styles.container}>
      
      <TouchableOpacity style={styles.mainbutton}  onPress={() => navigation.navigate("Zdjęcia")}>
        <Text style={styles.logo}>
          Camera
          </Text>
      
      
      <Text style={styles.logo}>
        App
      </Text>
      </TouchableOpacity>
      <Text style={styles.opis}>
      show gallery pictures
      {"\n"}
      take picture from camera
      {"\n"}
      save photo to device
      {"\n"}
      delete photos from device
      {"\n"}
      share photos
      </Text>
      
      <StatusBar style="auto" />
      </View>
    
    
  );

}
  
   
      

  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6719b5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    top: -20,
    fontSize: 54,
    alignItems: "center",
    color: 'white',
    fontStyle: "italic",
    fontWeight: "bold"
  },
  opis: {
    top: 50,
    color: "white",
    fontStyle: "italic",
    fontSize: 24,
    textAlign: "center"
  },
  mainbutton: {
   
    alignItems: "center"
  }
});