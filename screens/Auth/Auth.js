/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {StyleSheet} from 'react-native';
import SignUpStackScreen from '../SignUpStackScreen';

import RootStackScreen from '../RootStackScreen';
import auth from '@react-native-firebase/auth';

import MainStack from '../MainStack';

const Auth = () => {
  const [initializing, setInitializing] = useState(true);
  const signedUp = useSelector(state => state.user.signedUp);
  const [User, setUser] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('heere');
    if (User !== null) {
      User.reload();
    }
  }, [signedUp]);

  async function onAuthStateChanged(user) {
    if (user) {
      await user.reload();
    }
    setUser(user);
    dispatch({type: 'ADD_USER', payload: user});
    if (initializing) {
      setInitializing(false);
    }
  }
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, [onAuthStateChanged]);

  // if (user === null) {
  //   console.log('here');
  //   return (
  //     <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
  //       <ActivityIndicator size="large" color="#009387" />
  //     </View>
  //   );
  // }
  return (
    <>
      {!User ? (
        <RootStackScreen />
      ) : (
        <>
          {User.phoneNumber && !User.displayName ? (
            <SignUpStackScreen />
          ) : (
            <MainStack />
          )}
        </>
      )}
    </>
  );
};

export default Auth;

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
});
