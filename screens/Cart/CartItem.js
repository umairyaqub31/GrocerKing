import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Feather';
import {useDispatch} from 'react-redux';
import {updateQuantity, removeFromCart} from '../../redux/actions/cartActions';
import {Image} from 'react-native-elements';
const Item = props => {
  const {item} = props;
  const dispatch = useDispatch();
  const update_quantity = quantity => {
    if (quantity === 0) {
      dispatch(removeFromCart(item.product.id));
    } else {
      if (item.product.limit > quantity) {
        dispatch(updateQuantity(quantity, item.product.id));
      } else if (item.product.inventory > quantity) {
        dispatch(updateQuantity(item.product.inventory, item.product.id));
      } else {
        dispatch(updateQuantity(item.product.limit, item.product.id));
      }
    }
  };
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{uri: item.product.images[0].image}}
        PlaceholderContent={<ActivityIndicator />}
      />
      <View style={{marginLeft: wp('5%'), marginRight: wp('50%')}}>
        <Text ellipsizeMode="tail" numberOfLines={2} style={styles.text}>
          {item.product.product_name}
        </Text>
        {item.product.sale_price !== null && item.product.sale_price !== '' ? (
          <View
            style={{
              flexDirection: 'row',
            }}>
            <Text
              style={{
                color: '#1A237E',
                fontSize: 18,
                fontWeight: 'bold',
              }}>
              RS {item.product.sale_price}
            </Text>
          </View>
        ) : (
          <Text
            style={[
              styles.text,
              {color: '#1A237E', fontWeight: 'bold', fontSize: 18},
            ]}>
            RS {item.product.price}
          </Text>
        )}
      </View>

      <View style={styles.buttonView}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => update_quantity(item.quantity - 1)}>
          <Icon name="minus" size={30} color="#1A237E" />
        </TouchableOpacity>
        <Text style={styles.text}>{item.quantity}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => update_quantity(item.quantity + 1)}>
          <Icon name="plus" size={30} color="#1A237E" />
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
    height: 35,
    width: 35,
    borderRadius: 17.5,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
