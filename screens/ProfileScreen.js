/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Platform,
  StyleSheet,
  ScrollView,
  StatusBar,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Icon1 from 'react-native-vector-icons/MaterialIcons';
import {Colors} from '../styles';
import {useSelector} from 'react-redux';

const ProfileScreen = ({navigation}) => {
  const user = useSelector(state => state.user.user);
  const address = useSelector(state => state.user.address);
  const [data, setData] = useState({
    name: '',
    check_nametextInputChange: false,
    // email: '',
    // check_emailtextInputChange: false,
    address: '',
    check_addresstextInputChange: false,
  });
  console.log(user.isAnonymous);

  useEffect(() => {
    setData({
      name: user.displayName,
      address: address,
    });
  }, []);

  const textInputChange = (val, type) => {
    if (type === 'name') {
      if (val.length !== 0) {
        setData({
          ...data,
          name: val,
          check_nametextInputChange: true,
        });
      } else {
        setData({
          ...data,
          name: val,
          check_nametextInputChange: false,
        });
      }
    } else if (type === 'address') {
      if (val.length !== 0) {
        setData({
          ...data,
          address: val,
          check_addresstextInputChange: true,
        });
      } else {
        setData({
          ...data,
          address: val,
          check_addresstextInputChange: false,
        });
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text_header}>Update Profile</Text>
      </View>
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <ScrollView>
          {user !== null && user.isAnonymous ? (
            <Text>Cannot change profile because you are Guest user.</Text>
          ) : (
            <>
              <Text style={styles.text_footer}>Name</Text>
              <View style={styles.action}>
                <FontAwesome name="user-o" color="#05375a" size={20} />
                <TextInput
                  // placeholder="Your name"
                  editable={false}
                  value={data.name}
                  style={styles.textInput}
                  autoCapitalize="none"
                  onChangeText={val => textInputChange(val, 'name')}
                />
                {data.check_nametextInputChange ? (
                  <Animatable.View animation="bounceIn">
                    <Feather name="check-circle" color="green" size={20} />
                  </Animatable.View>
                ) : null}
              </View>
              <Text
                style={[
                  styles.text_footer,
                  {
                    marginTop: 35,
                  },
                ]}>
                Delivery Address
              </Text>
              <View style={styles.action}>
                <FontAwesome name="address-card-o" color="#05375a" size={20} />
                <TextInput
                  placeholder="Your adress for delivery"
                  value={address}
                  editable={false}
                  style={styles.textInput}
                  autoCapitalize="none"
                  onChangeText={val => textInputChange(val, 'address')}
                />
                {data.check_addresstextInputChange ? (
                  <Animatable.View animation="bounceIn">
                    <Feather name="check-circle" color="green" size={20} />
                  </Animatable.View>
                ) : null}
                <TouchableOpacity
                  onPress={() => navigation.navigate('EditLocation')}>
                  <Icon1 name="edit" size={25} />
                </TouchableOpacity>
              </View>
            </>
          )}

          <View style={styles.button}>
            {user !== null && user.isAnonymous ? (
              <TouchableOpacity
                style={styles.signIn}
                onPress={() => navigation.navigate('Home')}>
                <LinearGradient
                  colors={[Colors.primaryLight, Colors.primary]}
                  style={styles.signIn}>
                  <Text
                    style={[
                      styles.textSign,
                      {
                        color: '#fff',
                      },
                    ]}>
                    Go Back
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.signIn}
                onPress={() =>
                  navigation.navigate('PickLocationScreen', {data: data})
                }>
                <LinearGradient
                  colors={[Colors.primaryLight, Colors.primary]}
                  style={styles.signIn}>
                  <Text
                    style={[
                      styles.textSign,
                      {
                        color: '#fff',
                      },
                    ]}>
                    Proceed
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </Animatable.View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: Platform.OS === 'ios' ? 3 : 5,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  button: {
    alignItems: 'center',
    marginTop: 50,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  textPrivate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
  },
  color_textPrivate: {
    color: 'grey',
  },
});
