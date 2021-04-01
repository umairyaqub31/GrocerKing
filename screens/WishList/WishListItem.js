import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {removeFromWishlist} from '../../redux/actions/wishlistActions';
import {addToCart} from '../../redux/actions/cartActions';
const Item = props => {
  const {item} = props;
  const dispatch = useDispatch();
  const wishlist = useSelector(state => state.wishlist.wishlist);
  const user = useSelector(state => state.user.user);
  const remove_from_wishlist = () => {
    dispatch(removeFromWishlist(item.product.id, user.uid));
  };
  const add_to_cart = () => {
    dispatch(addToCart(item.product, 1));
    remove_from_wishlist();
  };
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{uri: item.product.images[0].image}}
      />
      <View style={{marginLeft: wp('5%')}}>
        <Text style={styles.text}>{item.product.product_name}</Text>
        <Text style={[styles.text, {fontSize: hp('1.7%')}]}>
          {item.product.price}
        </Text>
      </View>

      <View style={styles.buttonView}>
        <TouchableOpacity style={styles.button} onPress={add_to_cart}>
          <Text style={styles.btnText}>Add To Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{marginLeft: wp('2%')}}
          onPress={remove_from_wishlist}>
          <Icon name="delete" size={25} color="#939ba4" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Item;

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
  image: {
    width: wp('15%'),
    height: hp('5%'),
    marginLeft: wp('1%'),
  },
  text: {
    fontSize: hp('2.5%'),
    color: '#212121',
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
    width: wp('20%'),
    borderRadius: 5,
    backgroundColor: '#febd00',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontWeight: 'bold',
    color: '#fff',
  },
});
