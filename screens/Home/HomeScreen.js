/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  FlatList,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import Item2 from './Item2';
import {getCategories} from '../../redux/actions/categoryActions';
import {
  addPromotion,
  emptyPromotions,
} from '../../redux/actions/promotionActions';
import {
  addProducts,
  updateProducts,
  emptyProducts,
} from '../../redux/actions/productActions';
import {useDispatch, useSelector} from 'react-redux';
import DetailsScreen from '../DetailsScreen';
import CategoryItem from '../Category/CategoryItem';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import SliderView from './Slider';
import firestore from '@react-native-firebase/firestore';
import {addRoom} from '../../redux/actions/chatActions';
import {
  setLocationAddress,
  getLocationAddress,
} from '../../redux/actions/userAction';
import AsyncStorage from '@react-native-community/async-storage';
// import firestore from '@react-native-firebase/firestore';
import {Colors} from '../../styles';
import Splash from '../Splash';
import {sortBy} from 'underscore';
import messaging from '@react-native-firebase/messaging';
import axios from 'axios';
import FeedBackComponent from '../../components/feedBackComponent';

const HomeScreen = ({navigation}) => {
  const {colors} = useTheme();

  const theme = useTheme();
  const dispatch = useDispatch();

  const products = useSelector(state => state.product.products);
  const featuredProducts = products.filter(p => p.isFeatured === true);
  const productsLoading = useSelector(state => state.product.productsLoading);
  const promotion = useSelector(state => state.promotion.promotion);
  const category = useSelector(state => state.category.category);
  const categoryLoading = useSelector(state => state.category.categoryLoading);
  const user = useSelector(state => state.user.user);
  const address = useSelector(state => state.user.address);
  const location = useSelector(state => state.user.location);
  const [data, setData] = useState([]);

  const [topProducts, setTopProducts] = useState([]);
  const [sortedCategories, setSortedCategories] = useState([]);

  const sendToken = async () => {
    const token = await messaging().getToken();
    const body = {
      token,
    };
    const res = await axios.post(
      `https://us-central1-grocery-king-302815.cloudfunctions.net/api/users/token/${user.uid}`,
      body,
    );
  };

  useEffect(() => {
    sendToken();

    const sortedProducts = sortBy(products, 'sold');
    let temp = [];

    if (productsLoading === false && products.length > 11) {
      for (let i = 9; i >= 0; i--) {
        temp.push(sortedProducts[i]);
      }
    }

    setTopProducts(temp);
  }, [products]);

  const _storeData = async (add, loc) => {
    try {
      await AsyncStorage.setItem('lat', loc.lat.toString());
      await AsyncStorage.setItem('lng', loc.lng.toString());
      await AsyncStorage.setItem('add', add);
    } catch (error) {
      // Error saving data
    }
  };

  const _retrieveData = async () => {
    try {
      const ad = await AsyncStorage.getItem('add');
      const lat = await AsyncStorage.getItem('lat');
      const lng = await AsyncStorage.getItem('lng');
      const obj = {
        lat: parseFloat(lat),
        lng: parseFloat(lng),
      };
      dispatch(setLocationAddress(ad, obj));
    } catch (error) {
      // Error retrieving data
    }
  };

  useEffect(() => {
    dispatch(getCategories());

    firestore()
      .collection('promotions')
      .get()
      .then(snapshot => {
        snapshot.forEach(promotion => {
          dispatch(addPromotion(promotion.data()));
        });
      });

    const observer = firestore()
      .collection('products')
      .onSnapshot(snap => {
        if (snap !== null) {
          snap.docChanges().forEach(change => {
            const product = {
              id: change.doc.id,
              ...change.doc.data(),
            };

            if (change.type === 'added') {
              dispatch(addProducts(product));
            }

            if (change.type === 'modified') {
              console.log('updated', product);
              dispatch(updateProducts(product));
            }
          });
        }
      });

    return () => {
      observer();
      dispatch(emptyPromotions());
      dispatch(emptyProducts());
    };
  }, [dispatch]);

  useEffect(() => {
    let chatObserver = null;
    let walletObserver = null;
    if (user !== null) {
      chatObserver = firestore()
        .collection('rooms')
        .doc(user.uid)
        .onSnapshot(snap => {
          if (snap.exists) {
            let obj = {
              roomName: snap.data().roomName,
              lastMessage: snap.data().lastMessage,
              messages: [],
            };
            snap.data().messages.map(message => {
              let m = {
                createdAt: new Date(message.createdAt.toDate()),
                _id: message._id,
                text: message.text,
                user: message.user,
              };

              obj.messages.push(m);
            });

            dispatch(addRoom(obj));
          } else {
            firestore()
              .collection('rooms')
              .doc(user.uid)
              .set({
                roomName: user.displayName ? user.displayName : user.uid,
                lastMessage: null,
                messages: [],
              });
          }
        });

      walletObserver = firestore()
        .collection('wallet')
        .doc(user.uid)
        .onSnapshot(snap => {
          if (snap.exists) {
            dispatch({
              type: 'ADD_FUNDS',
              payload: snap.data().balance,
            });
          } else {
            firestore()
              .collection('wallet')
              .doc(user.uid)
              .set({
                balance: 0,
              });
          }
        });
    }

    return () => {
      if (chatObserver !== null) {
        chatObserver();
      }

      if (walletObserver !== null) {
        walletObserver();
      }
    };
  }, [dispatch, user]);

  useEffect(() => {
    if (user !== null && user.isAnonymous) {
      if (address !== null) {
        // dispatch(setLocationAddress(address, location, user.uid));
        _storeData(address, location);
        dispatch(setLocationAddress(address, location));
      } else {
        // dispatch(getLocationAddress(user.uid));
        _retrieveData();
      }
    } else if (user !== null) {
      firestore()
        .collection('users')
        .doc(user.uid)
        .get()
        .then(snapshot => {
          const a = snapshot.data().address;
          const l = {
            lat: snapshot.data().lat,
            lng: snapshot.data().lng,
          };
          const wishlist = snapshot.data().wishlist;

          dispatch({type: 'GET_WISHLIST', payload: wishlist});
          dispatch({type: 'SET_ADDRESS', payload: a});
          dispatch({type: 'SET_LOCATION', payload: l});
        });
    }
  }, [user]);

  useEffect(() => {
    const sc = sortBy(category, 'category_name');
    setSortedCategories(sc);
  }, [category]);

  const renderItem = useCallback(
    ({item}) => (
      <Item2
        pric={item.price}
        product_name={item.product_name}
        inventory={item.inventory}
        navigation={navigation}
        images={item.images}
        sale_price={item.sale_price}
        isFeatured={item.isFeatured}
        item={item}
      />
    ),
    [],
  );

  const renderItem1 = useCallback(
    ({item}) => <CategoryItem item={item} navigation={navigation} />,
    [],
  );

  const keyExtractor = useCallback(item => item.id.toString(), []);
  const keyExtractor1 = useCallback(item => item.category_id.toString(), []);

  if (productsLoading) {
    return <Splash />;
  }

  return (
    <ScrollView style={styles.container}>
      <>
        {productsLoading ? (
          <View>
            <ActivityIndicator size={'large'} />
          </View>
        ) : (
          <View style={styles.productView}>
            <Text style={styles.viewTitleText}>Featured Products</Text>
            <FlatList
              data={featuredProducts}
              horizontal
              initialNumToRender={6}
              maxToRenderPerBatch={6}
              removeClippedSubviews={true}
              windowSize={5}
              updateCellsBatchingPeriod={100}
              renderItem={renderItem}
              keyExtractor={keyExtractor}
            />
          </View>
        )}
      </>

      <View>
        <Text style={[styles.viewTitleText, {marginLeft: 16}]}>Promotions</Text>
      </View>

      <>{promotion.length > 0 ? <SliderView promotion={promotion} /> : null}</>

      <>
        {productsLoading ? (
          <View>
            <ActivityIndicator size={'large'} />
          </View>
        ) : (
          <View style={styles.productView}>
            <Text style={styles.viewTitleText}>Best Sellers</Text>
            <FlatList
              data={topProducts}
              horizontal
              initialNumToRender={10}
              maxToRenderPerBatch={10}
              removeClippedSubviews={true}
              windowSize={5}
              updateCellsBatchingPeriod={100}
              renderItem={renderItem}
              keyExtractor={keyExtractor}
            />
          </View>
        )}
      </>

      <View>
        <Text style={styles.viewTitleText}> Categories </Text>
        {categoryLoading ? (
          <View>
            <ActivityIndicator size={'large'} />
          </View>
        ) : (
          <>
            <FlatList
              data={sortedCategories}
              removeClippedSubviews={true}
              windowSize={5}
              updateCellsBatchingPeriod={100}
              renderItem={renderItem1}
              keyExtractor={keyExtractor1}
            />
            <FeedBackComponent />
          </>
        )}
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const {height} = Dimensions.get('screen');
const height_logo = height * 0.15;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#f5f5f5',
    // alignItems: 'center',
    // justifyContent: 'center'
  },
  viewTitleText: {
    fontSize: hp('2%'),
    marginBottom: hp('1%'),
  },
  productView: {
    backgroundColor: '#F5F5F5',
    padding: 15,
  },
  logo: {
    width: height_logo,
    height: height_logo,
  },
});
