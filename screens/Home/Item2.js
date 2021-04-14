/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable camelcase */
/* eslint-disable no-nested-ternary */
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {
  addToCart,
  updateQuantity,
  removeFromCart,
} from '../../redux/actions/cartActions';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Feather';
import {Image} from 'react-native-elements';
const Item = props => {
  const {navigation, item} = props;
  let image = item.images[0].image;
  const [Index, setIndex] = useState(-1);
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart.cart);
  const addItem = () => {
    dispatch(addToCart(item, 1));
  };

  useEffect(() => {
    const index = cart.findIndex(p => p.product.id === item.id);
    setIndex(index);
  }, [cart]);

  const update_quantity = quantity => {
    console.log('quantity', quantity);
    if (quantity === 0) {
      setIndex(-1);
      dispatch(removeFromCart(item.id));
    } else {
      if (item.limit < quantity) {
        dispatch(updateQuantity(item.limit, item.id));
      } else {
        dispatch(updateQuantity(quantity, item.id));
      }
    }
  };
  return (
    <View style={styles.container}>
      <>
        {item.inventory > 0 ? null : (
          <View style={[styles.overlay, {height: hp('50%')}]}>
            <Image
              style={[styles.image, {height: hp('10%')}]}
              source={require('../../assets/images/soldOut.png')}
            />
          </View>
        )}
      </>
      <TouchableOpacity
        onPress={() => navigation.navigate('ProductScreen', {item: item})}>
        <View style={styles.imageView}>
          <Image
            style={styles.image}
            source={{uri: image}}
            PlaceholderContent={<ActivityIndicator />}
          />
        </View>
        <View style={{paddingVertical: hp('1%'), paddingHorizontal: wp('2%')}}>
          <Text ellipsizeMode="tail" numberOfLines={1} style={styles.text}>
            {item.product_name}
          </Text>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text
              style={[
                styles.text,
                {
                  color: 'red',
                  fontWeight: 'bold',
                },
              ]}>
              RS
            </Text>
            {item.sale_price !== null ? (
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginLeft: wp('2%'),
                  }}>
                  <Text style={{textDecorationLine: 'line-through'}}>
                    {item.price}
                  </Text>
                  <Text
                    style={{
                      marginLeft: wp('2%'),
                      color: 'red',
                      fontSize: 19,
                    }}>
                    {item.sale_price}
                  </Text>
                </View>
              </View>
            ) : (
              <Text style={{marginLeft: wp('2%'), color: 'red', fontSize: 19}}>
                {item.price}
              </Text>
            )}
          </View>
        </View>
      </TouchableOpacity>

      {Index === -1 ? (
        <View
          style={{
            // backgroundColor: 'red',
            position: 'absolute',
            bottom: 7,
            alignSelf: 'center',
            width: wp('35%'),
          }}>
          <TouchableOpacity style={styles.btn} onPress={addItem}>
            <Text style={styles.btnText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          {Index !== -1 ? (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                position: 'absolute',
                bottom: 7,
                alignSelf: 'center',
                width: wp('35%'),
              }}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => update_quantity(cart[Index].quantity - 1)}>
                <Icon name="minus" size={30} color="#fff" />
              </TouchableOpacity>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                {cart[Index] !== undefined ? <>{cart[Index].quantity}</> : null}
              </Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => update_quantity(cart[Index].quantity + 1)}>
                <Icon name="plus" size={30} color="#fff" />
              </TouchableOpacity>
            </View>
          ) : null}
        </>
      )}
    </View>
  );
};

export default Item;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    height: hp('30%'),
    width: wp('40%'),
    marginHorizontal: wp('1%'),
    paddingVertical: hp('1%'),
  },
  imageView: {
    height: wp('26%'),
    justifyContent: 'center',
    alignSelf: 'center',
  },
  image: {
    height: hp('13%'),
    width: wp('20%'),
    alignSelf: 'center',
    margin: 50,
  },
  detailView: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp('1%'),
    justifyContent: 'space-between',
  },
  text: {
    marginLeft: 12,
    fontSize: 18,
  },
  btn: {
    backgroundColor: '#388E3C',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttonView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: wp('25%'),
    alignSelf: 'center',
  },
  button: {
    height: 35,
    width: 35,
    borderRadius: 17.5,
    backgroundColor: '#939ba4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    opacity: 0.5,
    backgroundColor: 'black',
    width: wp('40%'),
    zIndex: 10,
  },
});
