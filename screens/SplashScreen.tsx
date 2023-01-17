import React from 'react';
import { StyleSheet, Image, Dimensions, Text, View, StatusBar, } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable'
export const SplashScreenWidth = Dimensions.get('window').width + 250


const SplashScreen = ({ navigation }: any) => {



 setTimeout(() => {
  navigation.replace('Login')
 }, 5000);


 return (
  <View style={styles.SplashContainer}>
   <View>

    <Image style={styles.SplashLogo} source={require('../assets/images/logo-white.png')} />
   </View>
   <Animatable.View
    animation='bounceOutDown'
    delay={4500}>
    <Ionicons style={styles.SplashfingerPrint} name="finger-print" size={780} />
   </Animatable.View>
   <StatusBar hidden={true} />
  </View>
 );
};

export default SplashScreen;

const styles = StyleSheet.create({
 SplashContainer: {
  flex: 1,
  backgroundColor: '#007AFF',
 },

 SplashLogo: {
  width: 176,
  height: 60,
  justifyContent: 'center',
  alignSelf: 'center',
  marginTop: 200,

 },

 SplashfingerPrint: {
  color: 'rgba(255,255,255,0.1)',
  position: 'absolute',
  left: -185,
  top: 20,
  width: SplashScreenWidth,
 },

});

