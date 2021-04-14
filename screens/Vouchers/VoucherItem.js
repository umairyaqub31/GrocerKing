import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Colors} from '../../styles';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
const VoucherItem = props => {
  const {item} = props;
  console.log('itemmmmm', item);
  return (
    <View>
      <Text>{item.voucher_name}</Text>
      <Text>{item.description}</Text>
      {/* <Text>{discount_flat}</Text> */}

      <TouchableOpacity
        // onPress={handleVerifyVoucher}
        style={{justifyContent: 'center'}}>
        <LinearGradient
          colors={[Colors.primaryLight, Colors.primary]}
          style={[styles.orderBtn, {width: wp('30%'), height: hp('4%')}]}>
          <Text style={styles.btnText}>Use Voucher</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default VoucherItem;

const styles = StyleSheet.create({
  orderBtn: {
    width: wp('90%'),
    height: hp('5.5%'),
    justifyContent: 'center',
    alignItems: 'center',
    // borderRadius: 50,
    // flexDirection: 'row',
    alignSelf: 'center',
    elevation: 5,
    // marginBottom: hp('5%'),
  },
  btnText: {
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
  },
});
