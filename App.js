import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Camera } from "expo-camera";
import * as React from 'react';
import MAIN from "./kompy/main.js"
import Filelist_pio from "./kompy/gallery.js"
import Kamera from "./kompy/camera.js"
import Onephoto from "./kompy/onephoto.js"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

  export default function App() {

    return (

         <NavigationContainer>
                  <Stack.Navigator>
                      <Stack.Screen name="Main" component={MAIN} options={{headerShown: false}} />
                      <Stack.Screen name="Zdjęcia" component={Filelist_pio} options={{headerStyle: {backgroundColor: "grey"}}} />
                      <Stack.Screen name="Kamera" component={Kamera} options={{headerStyle: {backgroundColor: "grey"}}}/>
                      <Stack.Screen name="Wybrane zdjęcie" component={Onephoto} options={{headerStyle: {backgroundColor: "grey"}}}/>
                               
                  </Stack.Navigator>
              </NavigationContainer>
        
      
    


     
      
           
      
    );
  
  }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
  }
});