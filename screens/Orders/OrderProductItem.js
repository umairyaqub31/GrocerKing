import React, {Component} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Image} from 'react-native-elements';
const OrderProductItem = props => {
  const {item} = props;
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri: item.product.images[0].image,
        }}
        PlaceholderContent={<ActivityIndicator />}
      />
      <View>
        <Text>{item.product.product_name}</Text>
        {item.product.sale_price === null ? (
          <Text>{item.product.price}</Text>
        ) : (
          <Text>{item.product.sale_price}</Text>
        )}
      </View>
    </View>
  );
};

export default OrderProductItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'red',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: hp('2%'),
  },
  image: {
    width: wp('20%'),
    height: hp('10%'),
    marginRight: wp('3%'),
  },
});
