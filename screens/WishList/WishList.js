/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import Item from './WishListItem';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {addToCart} from '../../redux/actions/cartActions';
import {emptyWishist} from '../../redux/actions/wishlistActions';
import firestore from '@react-native-firebase/firestore';

const WishListScreen = () => {
  const [Data, setData] = useState([
    {name: 'Potato1', price: '50', id: 1},
    {name: 'Potato2', price: '70', id: 2},
    {name: 'Potato3', price: '100', id: 3},
    {name: 'Potato4', price: '50', id: 1},
    {name: 'Potato5', price: '70', id: 2},
    {name: 'Potato6', price: '100', id: 3},
  ]);
  const dispatch = useDispatch();
  const wishlist = useSelector(state => state.wishlist.wishlist);
  const user = useSelector(state => state.user.user);

  const addAllToCart = () => {
    wishlist.map(w => {
      dispatch(addToCart(w.product, 1));
    });
    emptyCart();
  };
  const emptyCart = () => {
    firestore()
      .collection('users')
      .doc(user.uid)
      .update({
        wishlist: [],
      });
    dispatch(emptyWishist());
  };
  return (
    <View style={{flex: 1}}>
      <View>
        <FlatList
          data={wishlist}
          renderItem={({item}) => <Item item={item} />}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <View style={styles.buttonView}>
        <TouchableOpacity
          style={[
            styles.button,
            {paddingHorizontal: wp('17%'), backgroundColor: '#febd00'},
          ]}
          onPress={addAllToCart}>
          <Text style={styles.btnText}>Add to Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{marginLeft: wp('3%')}} onPress={emptyCart}>
          <Icon name="delete" size={30} color="#939ba4" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WishListScreen;

const styles = StyleSheet.create({
  buttonView: {
    //   borderWidth: 1,
    //   borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    width: wp('100%'),
    position: 'absolute',
    bottom: 30,
    //   right: 10,
    height: 90,
    // backgroundColor: 'red',
    //   borderRadius: 100,
    flexDirection: 'row',
    paddingHorizontal: wp('7%'),
  },
  button: {
    padding: 15,
    paddingHorizontal: wp('10%'),
    paddingVertical: hp('2%'),
    borderRadius: 5,
  },
  btnText: {
    fontWeight: 'bold',
    color: '#ffffff',
  },
});
