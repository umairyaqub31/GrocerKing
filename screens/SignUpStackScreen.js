import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import SignUpScreen from './SignUpScreen';
import PickLocationScreen from './Auth/PickLocation';
import MainStack from './MainStack';

const SignUpStack = createStackNavigator();

const SignUpStackScreen = ({setUser}) => (
  <SignUpStack.Navigator headerMode="none">
    <SignUpStack.Screen name="SignUpScreen" component={SignUpScreen} />
    <SignUpStack.Screen
      name="PickLocationScreen"
      component={PickLocationScreen}
      setUser={setUser}
    />
    <SignUpStack.Screen name="MainScreen" component={MainStack} />
  </SignUpStack.Navigator>
);

export default SignUpStackScreen;
