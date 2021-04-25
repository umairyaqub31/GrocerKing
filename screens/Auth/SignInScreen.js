/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Dimensions,
  Animated,
  Alert,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import * as Animatable from 'react-native-animatable';
import PhoneInput from 'react-native-phone-number-input';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import Spinner from 'react-native-loading-spinner-overlay';
import LinearGradient from 'react-native-linear-gradient';
import {useTheme} from '@react-navigation/native';
import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {Colors} from '../../styles';
import {wktToPolygon} from 'geolib';

const background = require('../../assets/images/signInBackground.jpg');

const SignInScreen = ({navigation}) => {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [value, setValue] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [valid, setValid] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [confirm, setConfirm] = useState(null);
  const phoneInput = useRef(null);
  const codeInput = useRef(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [timer, setTimer] = useState(false);
  const [c, setCode] = useState('');
  // Handle user state changes
  const background = require('../../assets/images/signInBackground.jpg');
  const {colors} = useTheme();

  async function signInWithPhoneNumber() {
    setTimer(false);
    if (phoneNumber !== null && phoneNumber !== '') {
      setLoading(true);
      try {
        const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
        setConfirm(confirmation);
        setLoading(false);
      } catch (err) {
        Alert.alert(
          'Invalid Phone Number!',
          'Please Enter a valid Phone Number.',
          [{text: 'OK', onPress: () => setLoading(false)}],
        );
      }
      // navigation.navigate('ConfirmCodeScreen', {confirmation});
    } else {
      Alert.alert(
        'Invalid Phone Number!',
        'Please Enter a valid Phone Number.',
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
      );
    }
  }

  const handleCompleteTimer = () => {
    setTimer(true);
  };

  async function confirmCode(code) {
    try {
      setLoading(true);
      await confirm.confirm(code);
      setLoading(false);
      // navigation.navigate('SignUpScreen');
    } catch (error) {
      Alert.alert('Invalid Code', 'Please enter a valid code number', [
        {text: 'OK', onPress: () => setLoading(false)},
      ]);
    }
  }
  if (!confirm) {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />
        <View style={styles.header}>
          <View
            style={{backgroundColor: '#fff', padding: 50, borderRadius: 200}}>
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
          <SafeAreaView style={styles.wrapper}>
            <PhoneInput
              ref={phoneInput}
              defaultValue={value}
              defaultCode="PK"
              layout="first"
              onChangeText={text => {
                setValue(text);
              }}
              onChangeFormattedText={text => {
                setPhoneNumber(text);
              }}
              withDarkTheme
              withShadow
              autoFocus
            />
            <TouchableOpacity onPress={signInWithPhoneNumber}>
              <LinearGradient
                colors={[Colors.primaryLight, Colors.primary]}
                style={styles.button}>
                <Text style={styles.btnText}>Proceed</Text>
              </LinearGradient>
            </TouchableOpacity>
            <Spinner
              visible={loading}
              textContent={'Loading...'}
              textStyle={styles.spinnerTextStyle}
            />
          </SafeAreaView>
        </Animatable.View>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />
        <View style={styles.header}>
          <View
            style={{backgroundColor: '#fff', padding: 50, borderRadius: 200}}>
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
          <SafeAreaView style={styles.wrapper}>
            <OTPInputView
              ref={codeInput}
              style={{
                width: wp('80%'),
                height: hp('10%'),
                alignSelf: 'center',
              }}
              pinCount={6}
              code={c}
              editable
              codeInputFieldStyle={{color: '#000', fontSize: 19}}
              keyboardAppearance={'default'}
              keyboardType={'number-pad'} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
              onCodeChanged={code => {
                setCode(code);
              }}
              autoFocusOnLoad={false}
              onCodeFilled={code => {
                confirmCode(code);
              }}
            />
            {timer === false ? (
              <View style={{alignSelf: 'center'}}>
                <CountdownCircleTimer
                  isPlaying
                  size={50}
                  strokeWidth={5}
                  duration={60}
                  onComplete={handleCompleteTimer}
                  colors={[
                    ['#004777', 0.4],
                    ['#F7B801', 0.4],
                    ['#A30000', 0.2],
                  ]}>
                  {({remainingTime, animatedColor}) => (
                    <Animated.Text style={{color: animatedColor}}>
                      {remainingTime}
                    </Animated.Text>
                  )}
                </CountdownCircleTimer>
              </View>
            ) : (
              <TouchableOpacity onPress={signInWithPhoneNumber}>
                <LinearGradient
                  colors={[Colors.primaryLight, Colors.primary]}
                  style={styles.button}>
                  <Text style={styles.btnText}>Resend Code</Text>
                </LinearGradient>
              </TouchableOpacity>
            )}

            <Spinner
              visible={loading}
              textContent={'Loading...'}
              textStyle={styles.spinnerTextStyle}
            />
          </SafeAreaView>
        </Animatable.View>
      </View>
    );
  }
};
export default SignInScreen;

const {height} = Dimensions.get('screen');
const height_logo = height * 0.15;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#009387',
    backgroundColor: Colors.primary,
  },
  wrapper: {
    padding: 20,
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#009387',
    height: 60,
    width: 300,
    marginTop: 40,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  spinnerTextStyle: {
    color: '#FFF',
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
  underlineStyleBase: {
    backgroundColor: Colors.primary,
  },
  underlineStyleHighLighted: {
    borderColor: '#03DAC6',
  },
});
