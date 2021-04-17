/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import Item from './CartItem';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';
const CartScreen = ({navigation}) => {
  const [Data, setData] = useState([
    {name: 'Potato1', price: '50', id: 1},
    {name: 'Potato2', price: '70', id: 2},
    {name: 'Potato3', price: '100', id: 3},
    {name: 'Potato4', price: '50', id: 1},
    {name: 'Potato5', price: '70', id: 2},
    {name: 'Potato6', price: '100', id: 3},
  ]);
  const cart = useSelector(state => state.cart.cart);

  const close = () => {
    navigation.navigate('Home');
  };
  const handleCheckout = () => {
    if (cart.length > 0) {
      navigation.navigate('Checkout');
    } else {
      Alert.alert('Cart empty!', 'Cannot checkout, because cart is empty.', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    }
  };

  return (
    <View style={{flex: 1}}>
      <View>
        <FlatList
          data={cart}
          renderItem={({item}) => <Item item={item} />}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <View style={styles.buttonView}>
        {/* <TouchableOpacity
          style={[styles.button, {backgroundColor: '#939ba4'}]}
          onPress={close}>
          <Text style={styles.btnText}>Close</Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          style={[
            styles.button,
            {paddingHorizontal: wp('17%'), backgroundColor: '#1A237E'},
          ]}
          onPress={handleCheckout}>
          <Text style={styles.btnText}>Go To Check Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  buttonView: {
    //   borderWidth: 1,
    //   borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: wp('100%'),
    position: 'absolute',
    bottom: 30,
    //   right: 10,
    height: 90,
    // backgroundColor: 'red',
    //   borderRadius: 100,
    // flexDirection: 'row',
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
