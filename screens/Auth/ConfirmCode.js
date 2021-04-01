/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import PhoneInput from 'react-native-phone-number-input';
import OTPInputView from '@twotalltotems/react-native-otp-input';
const background = require('../../assets/images/signInBackground.jpg');

const ConfirmCodeScreen = props => {
  const {confirmation} = props.route.params;
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [value, setValue] = useState('');
  const [formattedValue, setFormattedValue] = useState('');
  const [valid, setValid] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const phoneInput = useRef(null);

  // Handle user state changes

  //   useEffect(() => {
  //     // auth()
  //     //   .signInAnonymously()
  //     //   .then(() => {
  //     //     console.log('User signed in anonymously');
  //     //   })
  //     //   .catch((error) => {
  //     //     if (error.code === 'auth/operation-not-allowed') {
  //     //       console.log('Enable anonymous in your firebase console.');
  //     //     }

  //     //     console.error(error);
  //     //   });
  //     const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
  //     return subscriber; // unsubscribe on unmount
  //   }, []);
  return (
    <View style={styles.container}>
      <ImageBackground source={background} style={styles.image}>
        <SafeAreaView style={styles.wrapper}>
          <OTPInputView
            style={{
              width: '80%',
              height: 200,
            }}
            pinCount={6}
            // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
            // onCodeChanged = {code => { this.setState({code})}}
            autoFocusOnLoad
            codeInputFieldStyle={styles.underlineStyleBase}
            codeInputHighlightStyle={styles.underlineStyleHighLighted}
            onCodeFilled={code => {
              console.log(`Code is ${code}, you are good to go!`);
            }}
          />
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};
export default ConfirmCodeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
  },
  wrapper: {
    flex: 0.5,
    padding: 20,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  message: {},
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
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  borderStyleBase: {
    width: 30,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: '#03DAC6',
  },

  underlineStyleBase: {
    width: 50,
    height: 50,
    borderWidth: 0,
    borderBottomWidth: 5,
    backgroundColor: '#fff',
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
  },

  underlineStyleHighLighted: {
    borderColor: '#03DAC6',
  },
});
