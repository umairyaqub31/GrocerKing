/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  StatusBar,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useTheme} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import auth from '@react-native-firebase/auth';
import {Colors} from '../../styles';

const SplashScreen = ({navigation}) => {
  const {colors} = useTheme();

  const handleLogin = () => {
    auth()
      .signInAnonymously()
      .then(() => {
        console.log('User signed in anonymously');
      })
      .catch(error => {
        if (error.code === 'auth/operation-not-allowed') {
          console.log('Enable anonymous in your firebase console.');
        }

        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />
      <View style={styles.header}>
        <View style={{backgroundColor: '#fff', padding: 50, borderRadius: 200}}>
          <Animatable.Image
            animation="bounceIn"
            duraton="1500"
            source={require('../../assets/images/logo.png')}
            style={styles.logo}
            resizeMode="stretch"
          />
        </View>
      </View>
      <Animatable.View
        style={[
          styles.footer,
          {
            backgroundColor: colors.background,
          },
        ]}
        animation="fadeInUpBig">
        <Text
          style={[
            styles.title,
            {
              color: colors.text,
            },
          ]}>
          Order from wide range of categories!
        </Text>
        <Text
          style={[
            styles.text,
            {alignSelf: 'center', marginTop: hp('10%'), fontSize: 12},
          ]}>
          Ready to order grocery?
        </Text>

        <TouchableOpacity onPress={() => navigation.navigate('SignInScreen')}>
          <LinearGradient
            colors={[Colors.primaryLight, Colors.primary]}
            style={styles.location}>
            <Text style={styles.textSign}>Sign In/Sign Up</Text>
          </LinearGradient>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: hp('2%'),
          }}>
          {/* <Text style={[styles.text, {fontSize: 12}]}>Have an account?</Text> */}
          <TouchableOpacity
            style={{padding: 10}}
            onPress={() => navigation.navigate('LocationScreen')}>
            <Text
              style={{
                color: Colors.primary,
                fontSize: 12,
                marginLeft: 5,
                fontWeight: 'bold',
              }}>
              Login as guest
            </Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

export default SplashScreen;

const {height} = Dimensions.get('screen');
const height_logo = height * 0.15;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#009387',
    backgroundColor: Colors.primary,
  },
  header: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 25,
    paddingHorizontal: 30,
  },
  logo: {
    width: height_logo,
    height: height_logo,
  },
  title: {
    color: '#05375a',
    fontSize: 15,
    //   fontWeight: 'bold',
    alignSelf: 'center',
  },
  text: {
    color: 'grey',
    //   marginTop:5
  },
  signIn: {
    width: 150,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    flexDirection: 'row',
  },
  btn: {
    elevation: 10,
    shadowColor: '#000',
    //   backgroundColor:"transparent"
  },
  location: {
    width: wp('90%'),
    height: hp('5.5%'),
    justifyContent: 'center',
    alignItems: 'center',
    // borderRadius: 50,
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: hp('1%'),
  },
  textSign: {
    color: 'white',
    fontSize: 14,
    //   fontWeight: 'bold'
  },
});
