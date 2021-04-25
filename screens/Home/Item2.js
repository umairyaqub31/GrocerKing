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
import FastImage from 'react-native-fast-image';
import {Badge} from 'native-base';

const Item = props => {
  const {navigation, item} = props;
  let image = item.images[0].image;
  const [Index, setIndex] = useState(-1);
  const [off, setOff] = useState(0);
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart.cart);
  const addItem = () => {
    dispatch(addToCart(item, 1));
  };

  useEffect(() => {
    const index = cart.findIndex(p => p.product.id === item.id);
    setIndex(index);
  }, [cart]);

  useEffect(() => {
    if (item.sale_price !== null && item.sale_price !== '') {
      const per = item.price - item.sale_price;
      const perOff = (per / item.price) * 100;
      setOff(perOff.toFixed(0));
    }
  });

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
    <View style={styles.container}>
      <>
        {item.inventory > 0 ? null : (
          <View style={[styles.overlay, {height: hp('50%')}]}>
            <FastImage
              style={[styles.image, {height: hp('10%')}]}
              source={require('../../assets/images/soldOut.png')}
              resizeMode={FastImage.resizeMode.contain}
            />
            <Image />
          </View>
        )}
      </>
      <TouchableOpacity
        onPress={() => navigation.navigate('ProductScreen', {item: item})}>
        <View style={styles.imageView}>
          <FastImage
            style={styles.image}
            source={{
              uri: image,
              priority: FastImage.priority.high,
            }}
            resizeMode={FastImage.resizeMode.contain}
          />
        </View>
        <View style={{paddingVertical: hp('1%'), paddingHorizontal: wp('2%')}}>
          <Text
            ellipsizeMode="tail"
            numberOfLines={1}
            style={[styles.text, {width: 150}]}>
            {item.product_name}
          </Text>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              paddingHorizontal: wp('2%'),
            }}>
            {item.sale_price !== null && item.sale_price !== '' ? (
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    textDecorationLine: 'line-through',
                    color: '#cccccc',
                    fontSize: 12,
                  }}>
                  RS {item.price}
                </Text>
                <Text
                  style={{
                    marginLeft: wp('2%'),
                    color: '#1A237E',
                    fontSize: 12,
                    fontWeight: 'bold',
                  }}>
                  RS {item.sale_price}
                </Text>
              </View>
            ) : (
              <Text
                style={{
                  color: '#1A237E',
                  fontSize: 12,
                  fontWeight: 'bold',
                }}>
                RS {item.price}
              </Text>
            )}
          </View>

          {off !== 0 ? (
            <Badge
              style={{
                backgroundColor: '#1A237E',
                marginTop: 5,
              }}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 10,
                  fontWeight: 'bold',
                }}>
                {off} % Off!
              </Text>
            </Badge>
          ) : (
            <View
              style={{
                marginTop: 31,
              }}></View>
          )}
        </View>
      </TouchableOpacity>

      {Index === -1 ? (
        <View
          style={{
            // backgroundColor: 'red',
            // position: 'absolute',
            // bottom: 7,
            alignSelf: 'center',
            width: wp('35%'),
            paddingBottom: 20,
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
                // position: 'absolute',
                // bottom: 7,
                alignSelf: 'center',
                width: wp('35%'),
                borderWidth: 1,
                paddingHorizontal: 10,
                paddingVertical: 0,
                borderColor: '#1A237E',
                marginBottom: 18,
              }}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => update_quantity(cart[Index].quantity - 1)}>
                <Icon name="minus" size={30} color="#1A237E" />
              </TouchableOpacity>
              <Text style={{fontSize: 26, color: '#1A237E'}}>
                {cart[Index] !== undefined ? <>{cart[Index].quantity}</> : null}
              </Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => update_quantity(cart[Index].quantity + 1)}>
                <Icon name="plus" size={30} color="#1A237E" />
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
    flex: 1,
    backgroundColor: '#ffffff',
    // height: hp('30%'),
    // width: wp('40%'),
    marginHorizontal: wp('1%'),
    elevation: 5,
    shadowOpacity: 0.5,
    marginBottom: 2,
    // paddingVertical: hp('1%'),
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
    backgroundColor: '#1A237E',
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
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
    backgroundColor: '#fff',
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
    // width: wp('40%'),
    zIndex: 10,
  },
});
