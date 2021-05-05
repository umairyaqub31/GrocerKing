/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet, Dimensions, Image} from 'react-native';
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from 'react-native-paper';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon1 from 'react-native-vector-icons/FontAwesome';

import {AuthContext} from '../components/context';
import auth from '@react-native-firebase/auth';
import {useDispatch, useSelector} from 'react-redux';
import {Colors} from '../styles';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export function DrawerContent(props) {
  const paperTheme = useTheme();
  const {width} = Dimensions.get('window');
  const {signOut, toggleTheme} = React.useContext(AuthContext);
  const user = useSelector(state => state.user.user);
  const dispatch = useDispatch();
  const handleSignOut = () => {
    auth()
      .signOut()
      .then(() => {
        dispatch({type: 'RESET_CART'});
        dispatch({type: 'EMPTY_WISHIST'});
        dispatch({type: 'RESET_USER'});
      });
  };

  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{flexDirection: 'row', marginTop: 15}}>
              <View
                style={{
                  backgroundColor: Colors.primaryLight,
                  width: 60,
                  height: 60,
                  borderRadius: 30,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderWidth: 1,
                  borderColor: Colors.primary,
                  elevation: 5,
                }}>
                <Image
                  source={require('../assets/images/logo1.png')}
                  style={{width: 42, height: 28}}
                />
              </View>
              <View style={{marginLeft: 15, flexDirection: 'column'}}>
                {user !== null ? (
                  <Title style={styles.title}>{user.displayName}</Title>
                ) : (
                  <Title style={styles.title}>Guest</Title>
                )}

                {/* <Caption style={styles.caption}>@j_doe</Caption> */}
              </View>
            </View>
          </View>

          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="home-outline" color={color} size={size} />
              )}
              label="Home"
              onPress={() => {
                props.navigation.navigate('Home');
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="account-outline" color={color} size={size} />
              )}
              label="Profile"
              onPress={() => {
                props.navigation.navigate('Profile');
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <Icon1 name="heart-o" color={color} size={size} />
              )}
              label="Wishlist"
              onPress={() => {
                props.navigation.navigate('WishList');
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <Ionicons name="wallet-outline" color={color} size={size} />
              )}
              label="Wallet"
              onPress={() => {
                props.navigation.navigate('Wallet');
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="bookmark-outline" color={color} size={size} />
              )}
              label="Promotions"
              onPress={() => {
                props.navigation.navigate('Promotions');
              }}
            />

            <DrawerItem
              icon={({color, size}) => (
                <Ionicons name="clipboard-outline" color={color} size={size} />
              )}
              label="Orders History"
              onPress={() => {
                props.navigation.navigate('Orders');
              }}
            />

            <DrawerItem
              icon={({color, size}) => (
                <MaterialIcons name="feedback" color={color} size={size} />
              )}
              label="Feedbacks"
              onPress={() => {
                props.navigation.navigate('FeedBack');
              }}
            />

            {/* <DrawerItem
              icon={({color, size}) => (
                <Icon name="bookmark-outline" color={color} size={size} />
              )}
              label="Club"
              onPress={() => {
                props.navigation.navigate('Club');
              }}
            /> */}
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="account-check-outline" color={color} size={size} />
              )}
              label="Live Chat"
              onPress={() => {
                props.navigation.navigate('Chat');
              }}
            />
          </Drawer.Section>
          {/* <Drawer.Section title="Preferences">
            <TouchableRipple
              onPress={() => {
                toggleTheme();
              }}>
              <View style={styles.preference}>
                <Text>Dark Theme</Text>
                <View pointerEvents="none">
                  <Switch value={paperTheme.dark} />
                </View>
              </View>
            </TouchableRipple>
          </Drawer.Section> */}
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({color, size}) => (
            <Icon name="exit-to-app" color={color} size={size} />
          )}
          label="Sign Out"
          onPress={handleSignOut}
        />
      </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: hp('2%'),
    marginTop: hp('2%'),
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
