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
  const {item} = props;
  const dispatch = useDispatch();
  const [Index, setIndex] = useState(-1);
  const cart = useSelector(state => state.cart.cart);
  useEffect(() => {
    const index = cart.findIndex(p => p.product.id === item.id);
    setIndex(index);
  }, [cart, item.id]);

  const addItem = () => {
    dispatch(addToCart(item, 1));
  };

  const update_quantity = quantity => {
    console.log('quantity', quantity);
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
    <View style={styles.container} onPress={() => console.log('Pressed')}>
      <Image
        style={styles.image}
        source={{uri: item.images[0].image}}
        PlaceholderContent={<ActivityIndicator />}
      />
      <View style={{marginLeft: wp('2%')}}>
        <Text
          ellipsizeMode="tail"
          numberOfLines={2}
          style={[styles.text, {marginRight: wp('50%')}]}>
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
              {color: 'red', fontWeight: 'bold', fontSize: 18},
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
              <Text style={styles.text}>{cart[Index].quantity}</Text>
              <TouchableOpacity
                style={styles.button1}
                onPress={() => update_quantity(cart[Index].quantity + 1)}>
                <Icon name="plus" size={30} color="#1A237E" />
              </TouchableOpacity>
            </View>
          )}
        </>
      ) : (
        <Text style={{fontSize: 20, color: 'red'}}> Sold Out! </Text>
      )}
    </View>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    // backgroundColor: '#f2f2f2',
    padding: wp('2%'),
    borderBottomWidth: 1.5,
    borderBottomColor: '#f2f2f2',
    paddingVertical: hp('2%'),
    alignItems: 'center',
  },
  text: {fontSize: hp('2.5%'), color: '#212121'},
  image: {
    width: wp('15%'),
    height: hp('5%'),
    marginLeft: wp('1%'),
  },
  buttonView: {
    position: 'absolute',
    right: wp('7%'),
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
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontWeight: 'bold',
    color: '#fff',
  },
});
