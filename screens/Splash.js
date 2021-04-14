import React, {Component} from 'react';
import {View, StyleSheet, Dimensions, StatusBar} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {Colors} from '../styles';
const Splash = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.primary,
      }}>
      <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />
      <View
        style={{
          backgroundColor: '#fff',
          padding: 50,
          borderRadius: 200,
        }}>
        <Animatable.Image
          animation="bounceIn"
          duraton="1500"
          source={require('../assets/images/logo.png')}
          style={styles.logo}
          resizeMode="stretch"
        />
      </View>
    </View>
  );
};

export default Splash;

const {height} = Dimensions.get('screen');
const height_logo = height * 0.15;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'gray',
  },
  logo: {
    width: height_logo,
    height: height_logo,
  },
});
