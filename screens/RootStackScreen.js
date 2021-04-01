import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {createStackNavigator} from '@react-navigation/stack';

import SplashScreen from './Auth/SplashScreen';
import SignInScreen from './Auth/SignInScreen';
import SignUpScreen from './SignUpScreen';
import LocationScreen from './Location/Location';
import ConfirmCodeScreen from './Auth/ConfirmCode';
import PickLocationScreen from './Auth/PickLocation';

const RootStack = createStackNavigator();

const RootStackScreen = ({navigation}) => (
  <RootStack.Navigator headerMode="none">
    <RootStack.Screen name="SplashScreen" component={SplashScreen} />
    <RootStack.Screen name="SignInScreen" component={SignInScreen} />
    <RootStack.Screen name="SignUpScreen" component={SignUpScreen} />
    <RootStack.Screen name="LocationScreen" component={LocationScreen} />
    <RootStack.Screen name="ConfirmCodeScreen" component={ConfirmCodeScreen} />
  </RootStack.Navigator>
);

export default RootStackScreen;
