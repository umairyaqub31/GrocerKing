import React, {useEffect, useState} from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';

import {
  addToCart,
  updateQuantity,
  removeFromCart,
} from '../../redux/actions/cartActions';
import Icon from 'react-native-vector-icons/Feather';
import {Image} from 'react-native-elements';

const ProductItem = props => {
  const {item, navigation} = props;
  const dispatch = useDispatch();
  const [Index, setIndex] = useState(-1);
  const cart = useSelector(state => state.cart.cart);
  useEffect(() => {
    console.log(item);
    const index = cart.findIndex(p => p.product.id === item.id);
    setIndex(index);
  }, [cart, item.id]);

  const addItem = () => {
    dispatch(addToCart(item, 1));
  };

  const update_quantity = quantity => {
    if (quantity === 0) {
      setIndex(-1);
      dispatch(removeFromCart(item.id));
    } else {
      if (item.limit < quantity) {
        dispatch(updateQuantity(item.limit, item.id));
      } else if (item.inventory < quantity) {
        dispatch(updateQuantity(item.inventory, item.id));
      } else {
        dispatch(updateQuantity(quantity, item.id));
      }
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('ProductScreen', {item: item})}>
      <Image
        style={styles.image}
        source={{uri: item.images[0].image}}
        PlaceholderContent={<ActivityIndicator />}
      />
      <View style={{marginLeft: wp('2%')}}>
        <Text
          ellipsizeMode="tail"
          numberOfLines={2}
          style={[styles.text, {marginRight: wp('55%')}]}>
          {item.product_name}
        </Text>
        {item.sale_price !== null && item.sale_price !== '' ? (
          <View
            style={{
              flexDirection: 'row',
            }}>
            <Text
              style={{
                textDecorationLine: 'line-through',
                color: '#cccccc',
                fontSize: 18,
              }}>
              RS {item.price}
            </Text>
            <Text
              style={{
                marginLeft: wp('2%'),
                color: '#1A237E',
                fontSize: 18,
                fontWeight: 'bold',
              }}>
              RS {item.sale_price}
            </Text>
          </View>
        ) : (
          <Text
            style={[
              styles.text,
              {color: '#1A237E', fontWeight: 'bold', fontSize: 18},
            ]}>
            RS {item.price}
          </Text>
        )}
      </View>

      {item.inventory > 0 ? (
        <>
          {Index === -1 ? (
            <View style={styles.buttonView}>
              <TouchableOpacity style={styles.button} onPress={addItem}>
                <Text style={styles.btnText}>Add To Cart</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.buttonView}>
              <TouchableOpacity
                style={styles.button1}
                onPress={() => update_quantity(cart[Index].quantity - 1)}>
                <Icon name="minus" size={30} color="#1A237E" />
              </TouchableOpacity>
              <>
                {cart[Index] !== undefined && (
                  <Text style={styles.text}>{cart[Index].quantity}</Text>
                )}
              </>
              <TouchableOpacity
                style={styles.button1}
                onPress={() => update_quantity(cart[Index].quantity + 1)}>
                <Icon name="plus" size={30} color="#1A237E" />
              </TouchableOpacity>
            </View>
          )}
        </>
      ) : (
        <View style={{right: wp('10%')}}>
          <Text style={{fontSize: 14, color: 'red'}}>Sold Out!</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'center',
    // backgroundColor: '#f2f2f2',
    padding: wp('0%'),
    borderBottomWidth: 1.5,
    borderBottomColor: '#f2f2f2',
    marginVertical: hp('0.5%'),
    maxWidth: wp('98%'),
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 15,
    elevation: 1,
  },
  text: {fontSize: hp('2.5%'), color: '#212121'},
  image: {
    width: wp('25%'),
    height: hp('15%'),
    marginLeft: wp('2%'),
    resizeMode: 'contain',
  },
  buttonView: {
    position: 'absolute',
    right: wp('2.5%'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: wp('25%'),
  },
  button: {
    height: hp('4%'),
    width: wp('25%'),
    borderRadius: 5,
    backgroundColor: '#1A237E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button1: {
    height: 35,
    width: 35,
    borderRadius: 17.5,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontWeight: 'bold',
    color: '#fff',
  },
});
