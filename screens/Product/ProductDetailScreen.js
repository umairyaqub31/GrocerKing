/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
// import Slideshow from 'react-native-slideshow';
import Item2 from '../Home/Item2';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  addToWishlist,
  removeFromWishlist,
} from '../../redux/actions/wishlistActions';
import {
  removeFromCart,
  addToCart,
  updateQuantity,
} from '../../redux/actions/cartActions';
import SliderView from './Slider';
import {ScrollView} from 'react-native-gesture-handler';
const ProductScreen = props => {
  const {navigation, route} = props;
  const [Index, setIndex] = useState(-1);
  const [Index1, setIndex1] = useState(-1);

  const {colors} = useTheme();
  const product = route.params;

  const products = useSelector(state => state.product.products);
  const productsLoading = useSelector(state => state.product.productsLoading);
  const wishlist = useSelector(state => state.wishlist.wishlist);
  const cart = useSelector(state => state.cart.cart);
  const user = useSelector(state => state.user.user);
  const dispatch = useDispatch();

  const theme = useTheme();

  useEffect(() => {
    console.log('wishlist', wishlist);
    const index = wishlist.findIndex(p => p.product.id === product.item.id);
    setIndex(index);
  }, [product.item.id, wishlist]);

  useEffect(() => {
    const index = cart.findIndex(p => p.product.id === product.item.id);
    setIndex1(index);
  }, [cart, product.item.id]);

  const add_to_wishlist = () => {
    dispatch(addToWishlist(product.item, user.uid));
  };
  const addItem = () => {
    dispatch(addToCart(product.item, 1));
  };
  const remove_from_wishlist = () => {
    dispatch(removeFromWishlist(product.item.id, user.uid));
  };
  const update_quantity = quantity => {
    if (quantity === 0) {
      setIndex(-1);
      dispatch(removeFromCart(product.item.id));
    } else {
      if (product.item.limit < quantity) {
        dispatch(updateQuantity(product.item.limit, product.item.id));
      } else {
        dispatch(updateQuantity(quantity, product.item.id));
      }
    }
  };
  return (
    <ScrollView style={styles.container}>
      <View
        style={{
          marginTop: '4%',
          backgroundColor: 'transparent',
          paddingVertical: 10,
        }}>
        <SliderView product={product} />
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginTop: hp('2%'),
          marginHorizontal: 20,
          justifyContent: 'space-between',
        }}>
        <View>
          <Text
            ellipsizeMode="tail"
            numberOfLines={2}
            style={[
              styles.text,
              {fontWeight: 'bold', fontSize: 25, width: wp('70%')},
            ]}>
            {product.item.product_name}
          </Text>
          {product.item.sale_price !== null &&
          product.item.sale_price !== '' ? (
            <View
              style={{
                flexDirection: 'row',
              }}>
              <Text
                style={{
                  textDecorationLine: 'line-through',
                  color: '#cccccc',
                  fontSize: 30,
                }}>
                RS {product.item.price}
              </Text>
              <Text
                style={{
                  marginLeft: wp('2%'),
                  color: '#1A237E',
                  fontSize: 30,
                  fontWeight: 'bold',
                }}>
                RS {product.item.sale_price}
              </Text>
            </View>
          ) : (
            <Text
              style={[
                styles.text,
                {color: 'red', fontWeight: 'bold', fontSize: 30},
              ]}>
              RS {product.item.price}
            </Text>
          )}
        </View>
        <View>
          <Text style={[styles.text, {fontSize: 18, color: 'gray'}]}>
            {product.item.inventory} in Stock
          </Text>
          {Index === -1 ? (
            <TouchableOpacity onPress={add_to_wishlist}>
              <Icon name="heart-o" size={hp('4%')} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={remove_from_wishlist}>
              <Icon name="heart" size={hp('4%')} color="#b71c1c" />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View style={{flex: 1, borderRadius: 5}}>
        <Text style={styles.heading}>More Items</Text>
        {productsLoading ? (
          <View>
            <ActivityIndicator size={'large'} />
          </View>
        ) : (
          <View>
            <FlatList
              data={products}
              horizontal
              renderItem={({item}) => (
                <Item2 item={item} navigation={navigation} />
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        )}
        {product.item.inventory > 0 ? (
          <>
            {Index1 === -1 ? (
              <TouchableOpacity style={styles.btn} onPress={addItem}>
                <Text style={styles.btnText}>Add to Cart</Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.buttonView}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => update_quantity(cart[Index1].quantity - 1)}>
                  <Icon name="minus" size={30} color="#1a237e" />
                </TouchableOpacity>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                  {cart[Index1] !== undefined ? (
                    <>{cart[Index1].quantity}</>
                  ) : null}
                </Text>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => update_quantity(cart[Index1].quantity + 1)}>
                  <Icon name="plus" size={30} color="#1a237e" />
                </TouchableOpacity>
              </View>
            )}
          </>
        ) : (
          <Text> Sold Out </Text>
        )}
      </View>
    </ScrollView>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 15,
    marginVertical: 10,
    marginTop: hp('3%'),
  },
  btn: {
    backgroundColor: '#1A237E',
    height: 60,
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp('10%'),
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
  buttonView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: wp('90%'),
    alignSelf: 'center',
    marginTop: hp('10%'),
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: '#1a237e',
  },
  button: {
    height: 35,
    width: 35,
    borderRadius: 17.5,
    backgroundColor: '#eeeeee',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
