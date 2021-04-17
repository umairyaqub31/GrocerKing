import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const OrderProductItem = props => {
  const {item} = props;
  return (
    <View style={styles.container}>
      <Text>
        {item.product.product_name} x {item.quantity}
      </Text>
      {item.product.sale_price === null ? (
        <Text> RS {item.product.price * item.quantity}</Text>
      ) : (
        <Text> RS {item.product.sale_price * item.quantity}</Text>
      )}
    </View>
  );
};

export default OrderProductItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: hp('0%'),
  },
  image: {
    width: wp('20%'),
    height: hp('10%'),
    marginRight: wp('3%'),
  },
});
