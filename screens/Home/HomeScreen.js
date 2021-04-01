/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  StatusBar,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import Item from './Item';
import Item2 from './Item2';
import {getCategories} from '../../redux/actions/categoryActions';
import {
  getPromotions,
  addPromotion,
  emptyPromotions,
} from '../../redux/actions/promotionActions';
import {
  getProducts,
  addProducts,
  updateProducts,
} from '../../redux/actions/productActions';
import {getWishlist} from '../../redux/actions/wishlistActions';
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
const HomeScreen = ({navigation}) => {
  const [Data, setData] = useState([1, 2, 3, 4, 5, 6, 7]);

  const {colors} = useTheme();

  const theme = useTheme();

  const [position, setPosition] = useState(1);
  const [interval, setInterval] = useState(null);
  const [dataSource, setDataSource] = useState([
    {url: 'http://placeimg.com/640/480/any'},
    {url: 'http://placeimg.com/640/480/any'},
  ]);

  const dispatch = useDispatch();

  const products = useSelector(state => state.product.products);
  const productsLoading = useSelector(state => state.product.productsLoading);
  const promotion = useSelector(state => state.promotion.promotion);
  const promotionLoading = useSelector(
    state => state.promotion.promotionLoading,
  );
  const category = useSelector(state => state.category.category);
  const categoryLoading = useSelector(state => state.category.categoryLoading);
  const user = useSelector(state => state.user.user);
  const address = useSelector(state => state.user.address);
  const location = useSelector(state => state.user.location);

  const _storeData = async (add, loc) => {
    console.log('stored');
    try {
      await AsyncStorage.setItem('lat', loc.lat.toString());
      await AsyncStorage.setItem('lng', loc.lng.toString());
      await AsyncStorage.setItem('add', add);
    } catch (error) {
      // Error saving data
    }
  };

  const _retrieveData = async () => {
    console.log('hereRetrieve');
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
  }, [dispatch]);

  useEffect(() => {
    let chatObserver = null;
    if (user !== null) {
      chatObserver = firestore()
        .collection('rooms')
        .doc(user.uid)
        .onSnapshot(snap => {
          if (snap.exists) {
            dispatch(addRoom(snap.data()));
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
    }

    return () => {
      if (chatObserver !== null) {
        chatObserver();
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
        console.log('hereeeeeeeee');
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

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />
      {/* <StatusBar backgroundColor={Colors.primary}barStyle={theme.dark ? 'light-content' : 'dark-content'} /> */}
      <ScrollView style={{paddingHorizontal: 15, paddingVertical: 15}}>
        <View style={{borderRadius: 5}}>
          {productsLoading ? (
            <View>
              <ActivityIndicator size={'large'} />
            </View>
          ) : (
            <View style={styles.productView}>
              <Text style={styles.viewTitleText}>Featured Product</Text>
              <FlatList
                data={products}
                horizontal
                renderItem={({item}) => (
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
                )}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          )}
        </View>

        {/* <>
          {promotionLoading ? (
            <View>
              <ActivityIndicator size={'large'} />
            </View>
          ) : ( */}
        {promotion.length > 0 ? <SliderView promotion={promotion} /> : null}
        <View style={{borderRadius: 5}}>
          {productsLoading ? (
            <View>
              <ActivityIndicator size={'large'} />
            </View>
          ) : (
            <View style={styles.productView}>
              <Text style={styles.viewTitleText}>Top Sellers</Text>
              <FlatList
                data={products}
                horizontal
                renderItem={({item}) => (
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
                )}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          )}
        </View>

        <View>
          {categoryLoading ? (
            <View>
              <ActivityIndicator size={'large'} />
            </View>
          ) : (
            <FlatList
              data={category}
              renderItem={({item}) => (
                <CategoryItem item={item} navigation={navigation} />
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          )}
        </View>

        {/* <CategoryItem /> */}
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

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
});
