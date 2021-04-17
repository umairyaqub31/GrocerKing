/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Colors} from '../../styles';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector, useDispatch} from 'react-redux';
import moment from 'moment';
import firestore from '@react-native-firebase/firestore';
import {setVoucher} from '../../redux/actions/cartActions';

const VoucherItem = props => {
  const {item, total, navigation} = props;
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user);
  const [applicable, setAppicable] = useState(true);
  const [dbVoucher, setDBVoucher] = useState({});

  useEffect(() => {
    if (item.expiry) {
      if (
        moment() <= moment(item.valid_from) ||
        moment() >= moment(item.vaid_till)
      ) {
        setAppicable(false);
      }
    }

    if (item.minOrder) {
      if (item.minOrderAmount > total) {
        setAppicable(false);
      }
    }

    if (item.limit) {
      checkUsage();
    }
  }, []);

  const checkUsage = async () => {
    const voucherUses = await firestore()
      .collection('users')
      .doc(user.uid)
      .collection('vouchers')
      .doc(item.id)
      .get();

    setDBVoucher(voucherUses);
    if (voucherUses.exists === false) {
      await firestore()
        .collection('users')
        .doc(user.uid)
        .collection('vouchers')
        .doc(item.id)
        .set({
          usage: 0,
        });
    }

    if (voucherUses.exists && voucherUses.data().usage > item.usage) {
      setAppicable(false);
    }
  };

  const handleVoucherPress = async () => {
    dispatch(setVoucher(item));
    navigation.navigate('Checkout');
  };

  return (
    <View style={styles.container}>
      <View style={{width: '60%'}}>
        <Text style={{fontSize: 25}}>{item.voucher_name}</Text>
        <Text style={{}}>{item.description}</Text>
      </View>
      {applicable ? (
        <TouchableOpacity
          onPress={handleVoucherPress}
          style={{justifyContent: 'center'}}>
          <LinearGradient
            colors={[Colors.primaryLight, Colors.primary]}
            style={[styles.orderBtn, {width: wp('30%'), height: hp('4%')}]}>
            <Text style={styles.btnText}>Use Voucher</Text>
          </LinearGradient>
        </TouchableOpacity>
      ) : (
        <Text>Not Applicable</Text>
      )}
    </View>
  );
};

export default VoucherItem;

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
