import React from 'react';
import {View} from 'react-native';
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
import ProfileLocationScreen from './ProfileLocation';
import SearchScreen from './Home/SearchScreen';

import {DrawerContent} from './DrawerContent';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator, HeaderBackButton} from '@react-navigation/stack';
import {Label, Text} from 'native-base';

import Icon from 'react-native-vector-icons/Ionicons';
import {Colors} from '../styles';
import {useSelector} from 'react-redux';

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
const SearchStack = createStackNavigator();

const HomeStackScreen = ({navigation}) => {
  const cart = useSelector(state => state.cart.cart);

  return (
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
          title: 'Home',
          headerLeft: () => (
            <Icon.Button
              name="ios-menu"
              size={25}
              backgroundColor={Colors.primary}
              onPress={() => navigation.openDrawer()}
            />
          ),
          headerRight: () => (
            <View style={{flexDirection: 'row'}}>
              <Icon.Button
                name="search"
                size={25}
                backgroundColor={Colors.primary}
                onPress={() => navigation.navigate('Search')}
              />
              <Icon.Button
                name="ios-cart-outline"
                size={25}
                backgroundColor={Colors.primary}
                onPress={() => navigation.navigate('Cart')}
              />
              {cart.length > 0 && (
                <Label
                  style={{
                    backgroundColor: Colors.primary,
                    position: 'absolute',
                    right: 10,
                    top: 5,
                  }}>
                  <Text style={{color: '#fff'}}>{cart.length}</Text>
                </Label>
              )}
            </View>
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
          headerRight: () => (
            <>
              <Icon.Button
                name="ios-cart-outline"
                size={25}
                backgroundColor={Colors.primary}
                onPress={() => navigation.navigate('Cart')}
              />
              {cart.length > 0 && (
                <Label
                  style={{
                    backgroundColor: Colors.primary,
                    position: 'absolute',
                    right: 10,
                    top: 5,
                  }}>
                  <Text style={{color: '#fff'}}>{cart.length}</Text>
                </Label>
              )}
            </>
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
          headerRight: () => (
            <>
              <Icon.Button
                name="ios-cart-outline"
                size={25}
                backgroundColor={Colors.primary}
                onPress={() => navigation.navigate('Cart')}
              />
              {cart.length > 0 && (
                <Label
                  style={{
                    backgroundColor: Colors.primary,
                    position: 'absolute',
                    right: 10,
                    top: 5,
                  }}>
                  <Text style={{color: '#fff'}}>{cart.length}</Text>
                </Label>
              )}
            </>
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
          headerRight: () => (
            <>
              <Icon.Button
                name="ios-cart-outline"
                size={25}
                backgroundColor={Colors.primary}
                onPress={() => navigation.navigate('Cart')}
              />
              {cart.length > 0 && (
                <Label
                  style={{
                    backgroundColor: Colors.primary,
                    position: 'absolute',
                    right: 10,
                    top: 5,
                  }}>
                  <Text style={{color: '#fff'}}>{cart.length}</Text>
                </Label>
              )}
            </>
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
          headerRight: () => (
            <>
              <Icon.Button
                name="ios-cart-outline"
                size={25}
                backgroundColor={Colors.primary}
                onPress={() => navigation.navigate('Cart')}
              />
              {cart.length > 0 && (
                <Label
                  style={{
                    backgroundColor: Colors.primary,
                    position: 'absolute',
                    right: 10,
                    top: 5,
                  }}>
                  <Text style={{color: '#fff'}}>{cart.length}</Text>
                </Label>
              )}
            </>
          ),
        }}
      />
    </HomeStack.Navigator>
  );
};

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
  </CartStack.Navigator>
);

const WishlistStackScreen = ({navigation}) => {
  const cart = useSelector(state => state.cart.cart);
  return (
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
          title: 'Wishlist',
          headerLeft: () => (
            <Icon.Button
              name="ios-menu"
              size={25}
              backgroundColor={Colors.primary}
              onPress={() => navigation.openDrawer()}
            />
          ),
          headerRight: () => (
            <>
              <Icon.Button
                name="ios-cart-outline"
                size={25}
                backgroundColor={Colors.primary}
                onPress={() => navigation.navigate('Cart')}
              />
              {cart.length > 0 && (
                <Label
                  style={{
                    backgroundColor: Colors.primary,
                    position: 'absolute',
                    right: 10,
                    top: 5,
                  }}>
                  <Text style={{color: '#fff'}}>{cart.length}</Text>
                </Label>
              )}
            </>
          ),
        }}
      />
    </WishlistStack.Navigator>
  );
};

const ProfileStackScreen = ({navigation}) => {
  const cart = useSelector(state => state.cart.cart);
  return (
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
          headerRight: () => (
            <>
              <Icon.Button
                name="ios-cart-outline"
                size={25}
                backgroundColor={Colors.primary}
                onPress={() => navigation.navigate('Cart')}
              />
              {cart.length > 0 && (
                <Label
                  style={{
                    backgroundColor: Colors.primary,
                    position: 'absolute',
                    right: 10,
                    top: 5,
                  }}>
                  <Text style={{color: '#fff'}}>{cart.length}</Text>
                </Label>
              )}
            </>
          ),
        }}
      />

      <ProfileStack.Screen
        name="EditLocation"
        component={ProfileLocationScreen}
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
            <>
              <Icon.Button
                name="ios-cart-outline"
                size={25}
                backgroundColor={Colors.primary}
                onPress={() => navigation.navigate('Cart')}
              />
              {cart.length > 0 && (
                <Label
                  style={{
                    backgroundColor: Colors.primary,
                    position: 'absolute',
                    right: 10,
                    top: 5,
                  }}>
                  <Text style={{color: '#fff'}}>{cart.length}</Text>
                </Label>
              )}
            </>
          ),
        }}
      />
    </ProfileStack.Navigator>
  );
};

const WalletStackScreen = ({navigation}) => {
  const cart = useSelector(state => state.cart.cart);
  return (
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
          headerRight: () => (
            <>
              <Icon.Button
                name="ios-cart-outline"
                size={25}
                backgroundColor={Colors.primary}
                onPress={() => navigation.navigate('Cart')}
              />
              {cart.length > 0 && (
                <Label
                  style={{
                    backgroundColor: Colors.primary,
                    position: 'absolute',
                    right: 10,
                    top: 5,
                  }}>
                  <Text style={{color: '#fff'}}>{cart.length}</Text>
                </Label>
              )}
            </>
          ),
        }}
      />
    </WalletStack.Navigator>
  );
};

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
        title: 'Set Location',
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

const SearchStackScreen = ({navigation}) => {
  const cart = useSelector(state => state.cart.cart);
  return (
    <SearchStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.primary,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <SearchStack.Screen
        name="Search"
        component={SearchScreen}
        options={{
          headerLeft: props => (
            <HeaderBackButton
              {...props}
              onPress={() => {
                navigation.goBack();
              }}
            />
          ),
          headerRight: () => (
            <>
              <Icon.Button
                name="ios-cart-outline"
                size={25}
                backgroundColor={Colors.primary}
                onPress={() => navigation.navigate('Cart')}
              />
              {cart.length > 0 && (
                <Label
                  style={{
                    backgroundColor: Colors.primary,
                    position: 'absolute',
                    right: 10,
                    top: 5,
                  }}>
                  <Text style={{color: '#fff'}}>{cart.length}</Text>
                </Label>
              )}
            </>
          ),
        }}
      />
    </SearchStack.Navigator>
  );
};

const PromotionStackScreen = ({navigation}) => {
  const cart = useSelector(state => state.cart.cart);
  return (
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
          headerRight: () => (
            <>
              <Icon.Button
                name="ios-cart-outline"
                size={25}
                backgroundColor={Colors.primary}
                onPress={() => navigation.navigate('Cart')}
              />
              {cart.length > 0 && (
                <Label
                  style={{
                    backgroundColor: Colors.primary,
                    position: 'absolute',
                    right: 10,
                    top: 5,
                  }}>
                  <Text style={{color: '#fff'}}>{cart.length}</Text>
                </Label>
              )}
            </>
          ),
        }}
      />
    </PromotionStack.Navigator>
  );
};

const OrderStackScreen = ({navigation}) => {
  const cart = useSelector(state => state.cart.cart);
  return (
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
          headerRight: () => (
            <>
              <Icon.Button
                name="ios-cart-outline"
                size={25}
                backgroundColor={Colors.primary}
                onPress={() => navigation.navigate('Cart')}
              />
              {cart.length > 0 && (
                <Label
                  style={{
                    backgroundColor: Colors.primary,
                    position: 'absolute',
                    right: 10,
                    top: 5,
                  }}>
                  <Text style={{color: '#fff'}}>{cart.length}</Text>
                </Label>
              )}
            </>
          ),
        }}
      />
      <OrderStack.Screen
        name="OrderDetails"
        component={OrderDetailsScreen}
        options={{
          title: 'Order Details',
          headerLeft: props => (
            <HeaderBackButton
              {...props}
              onPress={() => {
                navigation.goBack();
              }}
            />
          ),
          headerRight: () => (
            <>
              <Icon.Button
                name="ios-cart-outline"
                size={25}
                backgroundColor={Colors.primary}
                onPress={() => navigation.navigate('Cart')}
              />
            </>
          ),
        }}
      />
    </OrderStack.Navigator>
  );
};

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
        headerRight: () => (
          <>
            <Icon.Button
              name="ios-cart-outline"
              size={25}
              backgroundColor={Colors.primary}
              onPress={() => navigation.navigate('Cart')}
            />
          </>
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
      <Drawer.Screen name="Search" component={SearchStackScreen} />
    </Drawer.Navigator>
  );
};

export default MainStack;
