import React from 'react';
import MainTabScreen from './MainTabScreen';
import ChatScreen from './Chat/ChatScreen';
import SettingsScreen from './SettingsScreen';
import BookmarkScreen from './BookmarkScreen';
import CartScreen from './Cart/Cart';
import WishListScreen from './WishList/WishList';
import HomeScreen from './Home/HomeScreen';
import ProductScreen from './Product/ProductDetailScreen';
import CategoryScreen from './Category/CategoryScreen';
import ProductListScreen from './Product/ProductsList';
import ProfileScreen from './ProfileScreen';
import WalletScreen from './Wallet/Wallet';
import ClubScreen from './Club/Club';
import CheckoutScreen from './Checkout/Checkout';
import CheckoutLocationScreen from './Checkout/CheckoutLocation';
import PromotionScreen from './Promotions/Promotions';
import OrderScreen from './Orders/Orders';
import OrderDetailsScreen from './Orders/OrderDetails';
import VoucherScreen from './Vouchers/Vouchers';
import ProductSubListScreen from './Product/ProductSubList';

import {DrawerContent} from './DrawerContent';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator, HeaderBackButton} from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/Ionicons';
import {Colors} from '../styles';

const Drawer = createDrawerNavigator();
const CartStack = createStackNavigator();
const WishlistStack = createStackNavigator();
const HomeStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const WalletStack = createStackNavigator();
const ClubStack = createStackNavigator();
const CheckoutStack = createStackNavigator();
const ChatStack = createStackNavigator();
const PromotionStack = createStackNavigator();
const OrderStack = createStackNavigator();
const VoucherStack = createStackNavigator();

const HomeStackScreen = ({navigation}) => (
  <HomeStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: Colors.primary,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
    <HomeStack.Screen
      name="Home"
      component={HomeScreen}
      options={{
        title: 'Overview',
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            backgroundColor={Colors.primary}
            onPress={() => navigation.openDrawer()}
          />
        ),
        headerRight: () => (
          <Icon.Button
            name="ios-cart-outline"
            size={25}
            backgroundColor={Colors.primary}
            onPress={() => navigation.navigate('Cart')}
          />
        ),
      }}
    />
    <HomeStack.Screen
      name="ProductScreen"
      component={ProductScreen}
      options={{
        title: 'Product',
        headerLeft: props => (
          <HeaderBackButton
            {...props}
            onPress={() => {
              navigation.goBack();
            }}
          />
        ),
      }}
    />
    <HomeStack.Screen
      name="CategoryScreen"
      component={CategoryScreen}
      options={{
        title: 'Category',
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            backgroundColor={Colors.primary}
            onPress={() => navigation.openDrawer()}
          />
        ),
      }}
    />
    <HomeStack.Screen
      name="ProductListScreen"
      component={ProductListScreen}
      options={{
        title: 'Products',
        headerLeft: props => (
          <HeaderBackButton
            {...props}
            onPress={() => {
              navigation.goBack();
            }}
          />
        ),
      }}
    />
    <HomeStack.Screen
      name="ProductSubListScreen"
      component={ProductSubListScreen}
      options={{
        title: 'Products',
        headerLeft: props => (
          <HeaderBackButton
            {...props}
            onPress={() => {
              navigation.goBack();
            }}
          />
        ),
      }}
    />
  </HomeStack.Navigator>
);

const CartStackScreen = ({navigation}) => (
  <CartStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: Colors.primary,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
    <CartStack.Screen
      name="Cart"
      component={CartScreen}
      options={{
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            backgroundColor={Colors.primary}
            onPress={() => navigation.openDrawer()}
          />
        ),
      }}
    />
    {/*
    <CartStack.Screen
      name="Checkout"
      component={CheckoutScreen}
      options={{
        headerLeft: props => (
          <HeaderBackButton
            {...props}
            onPress={() => {
              navigation.goBack();
            }}
          />
        ),
      }}
    /> */}
  </CartStack.Navigator>
);

const WishlistStackScreen = ({navigation}) => (
  <WishlistStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: Colors.primary,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
    <WishlistStack.Screen
      name="WishList"
      component={WishListScreen}
      options={{
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            backgroundColor={Colors.primary}
            onPress={() => navigation.openDrawer()}
          />
        ),
        headerRight: () => (
          <Icon.Button
            name="ios-cart-outline"
            size={25}
            backgroundColor={Colors.primary}
            onPress={() => navigation.navigate('Cart')}
          />
        ),
      }}
    />
  </WishlistStack.Navigator>
);

const ProfileStackScreen = ({navigation}) => (
  <ProfileStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: Colors.primary,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
    <ProfileStack.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            backgroundColor={Colors.primary}
            onPress={() => navigation.openDrawer()}
          />
        ),
      }}
    />
  </ProfileStack.Navigator>
);

const WalletStackScreen = ({navigation}) => (
  <WalletStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: Colors.primary,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
    <WalletStack.Screen
      name="Wallet"
      component={WalletScreen}
      options={{
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            backgroundColor={Colors.primary}
            onPress={() => navigation.openDrawer()}
          />
        ),
      }}
    />
  </WalletStack.Navigator>
);

const CheckoutStackScreen = ({navigation}) => (
  <CheckoutStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: Colors.primary,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
    <CheckoutStack.Screen
      name="Checkout"
      component={CheckoutScreen}
      options={{
        headerLeft: props => (
          <HeaderBackButton
            {...props}
            onPress={() => {
              navigation.goBack();
            }}
          />
        ),
      }}
    />
    <CheckoutStack.Screen
      name="CheckoutLocation"
      component={CheckoutLocationScreen}
      options={{
        headerLeft: props => (
          <HeaderBackButton
            {...props}
            onPress={() => {
              navigation.goBack();
            }}
          />
        ),
      }}
    />
    <CheckoutStack.Screen
      name="Vouchers"
      component={VoucherScreen}
      // options={{
      //   headerLeft: props => (
      //     <HeaderBackButton
      //       {...props}
      //       onPress={() => {
      //         navigation.goBack();
      //       }}
      //     />
      //   ),
      // }}
    />
  </CheckoutStack.Navigator>
);

const ChatStackScreen = ({navigation}) => (
  <ChatStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: Colors.primary,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
    <ChatStack.Screen
      name="Chat"
      component={ChatScreen}
      options={{
        headerLeft: props => (
          <HeaderBackButton
            {...props}
            onPress={() => {
              navigation.goBack();
            }}
          />
        ),
      }}
    />
  </ChatStack.Navigator>
);

const PromotionStackScreen = ({navigation}) => (
  <PromotionStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: Colors.primary,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
    <PromotionStack.Screen
      name="Promotions"
      component={PromotionScreen}
      options={{
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            backgroundColor={Colors.primary}
            onPress={() => navigation.openDrawer()}
          />
        ),
      }}
    />
  </PromotionStack.Navigator>
);

const OrderStackScreen = ({navigation}) => (
  <OrderStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: Colors.primary,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
    <OrderStack.Screen
      name="Orders"
      component={OrderScreen}
      options={{
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            backgroundColor={Colors.primary}
            onPress={() => navigation.openDrawer()}
          />
        ),
      }}
    />
    <OrderStack.Screen
      name="OrderDetails"
      component={OrderDetailsScreen}
      options={{
        headerLeft: props => (
          <HeaderBackButton
            {...props}
            onPress={() => {
              navigation.goBack();
            }}
          />
        ),
      }}
    />
  </OrderStack.Navigator>
);

const VoucherStackScreen = ({navigation}) => (
  <VoucherStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: Colors.primary,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
    <VoucherStack.Screen
      name="Vouchers"
      component={VoucherScreen}
      options={{
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            backgroundColor={Colors.primary}
            onPress={() => navigation.openDrawer()}
          />
        ),
      }}
    />
  </VoucherStack.Navigator>
);

const MainStack = () => {
  return (
    <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen name="Home" component={HomeStackScreen} />
      <Drawer.Screen name="SettingsScreen" component={SettingsScreen} />
      <Drawer.Screen name="BookmarkScreen" component={BookmarkScreen} />
      <Drawer.Screen name="Cart" component={CartStackScreen} />
      <Drawer.Screen name="WishList" component={WishlistStackScreen} />
      <Drawer.Screen name="Profile" component={ProfileStackScreen} />
      <Drawer.Screen name="Wallet" component={WalletStackScreen} />
      <Drawer.Screen name="Checkout" component={CheckoutStackScreen} />
      <Drawer.Screen name="Chat" component={ChatStackScreen} />
      <Drawer.Screen name="Promotions" component={PromotionStackScreen} />
      <Drawer.Screen name="Orders" component={OrderStackScreen} />
      <Drawer.Screen name="Vouchers" component={VoucherStackScreen} />
    </Drawer.Navigator>
  );
};

export default MainStack;
