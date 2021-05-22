/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  TextInput,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {Card, Divider} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon1 from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import RadioButtonRN from 'radio-buttons-react-native';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import {clearVoucher} from '../../redux/actions/cartActions';
import {ScrollView} from 'react-native';
import {Colors} from '../../styles';
import ToggleSwitch from 'toggle-switch-react-native';
import firestore from '@react-native-firebase/firestore';
import axios from 'axios';

const CheckoutScreen = ({navigation}) => {
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [slot, setSlot] = useState('slot1');
  const [Items, setItems] = useState([
    {
      label: '09:00 - 12:00 AM',
      value: 'slot1',
    },
    {
      label: '12:00 - 03:00 PM',
      value: 'slot2',
    },
    {
      label: '03:00 - 06:00 PM',
      value: 'slot3',
    },
    {
      label: '06:00 - 09:00 PM',
      value: 'slot4',
    },
  ]);
  const [data, setData] = useState([
    {
      label: 'ASAP',
    },
    {
      label: 'Schedule',
    },
  ]);
  const user = useSelector(state => state.user.user);
  const [selectedType, setSelectedType] = useState('ASAP');
  const [phoneNumber, setPhoneNumber] = useState(
    user.phoneNumber !== null ? user.phoneNumber : null,
  );
  const [total, setTotal] = useState(null);
  const [grandTotal, setGrandTotal] = useState(null);
  const [deliveryFee, setDeliveryFee] = useState(null);
  const [toggleState, setToggleState] = useState(false);
  const [timeSlot, setTimeSlot] = useState(null);
  const [funds, setFunds] = useState(0);
  const [cashback, setcashback] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [showCashback, setShowCashback] = useState(true);

  const dispatch = useDispatch();

  const address = useSelector(state => state.user.address);
  const cart = useSelector(state => state.cart.cart);

  const location = useSelector(state => state.user.location);
  const orderSendLoading = useSelector(state => state.cart.orderSendLoading);
  const orderData = useSelector(state => state.cart.orderData);
  const balance = useSelector(state => state.wallet.balance);
  const voucher = useSelector(state => state.cart.voucher);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };
  const walletControl = isOn => {
    console.log(isOn);
    setToggleState(isOn);
    if (isOn === true) {
      setFunds(balance);
      setGrandTotal(grandTotal - balance);
    } else {
      setGrandTotal(grandTotal + balance);
      setFunds(0);
    }
  };

  useEffect(() => {
    firestore()
      .collection('orders')
      .where('user_id', '==', user.uid)
      .limit(1)
      .get()
      .then(snapshot => {
        if (snapshot.docs.length > 0) {
          setShowCashback(false);
        }
      });
  });

  useEffect(() => {
    if (orderData !== null) {
      if (orderData.slot === 'slot1') {
        setTimeSlot('09:00 - 12:00 AM');
      } else if (orderData.slot === 'slot2') {
        setTimeSlot('12:00 - 03:00 PM');
      } else if (orderData.slot === 'slot3') {
        setTimeSlot('03:00 - 06:00 PM');
      } else if (orderData.slot === 'slot4') {
        setTimeSlot('06:00 - 09:00 PM');
      }
    }
  }, [orderData]);

  const showAlert = (day, sl) => {
    Alert.alert('Order Sent!', `Your order wiil arive at ${day} on ${sl}`, [
      {
        text: 'OK',
        onPress: () => {
          closeAlert();
        },
      },
    ]);
  };

  const closeAlert = async () => {
    dispatch({type: 'ORDER_SEND_RESET'});
    if (funds > 0) {
      await firestore()
        .collection('wallet')
        .doc(user.uid)
        .update({
          balance: 0,
        });

      dispatch({
        type: 'ADD_FUNDS',
        payload: 0,
      });

      setFunds(0);
      console.log('Close');
      navigation.navigate('Home');
    }
  };
  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const onChangePhoneNumber = num => {
    setPhoneNumber(num);
  };

  useEffect(() => {
    dispatch(clearVoucher());
    caculateTotalPrice();
  }, [cart]);

  const handleCheckOut = async () => {
    if (phoneNumber === null) {
      Alert.alert('Phone Number Required!', 'Enter your valid phone number.', [
        {text: 'OK', onPress: () => {}},
      ]);
    } else {
      dispatch({
        type: 'ORDER_SEND_LOADING',
      });
      const config = {
        headers: {
          'Content-type': 'Application/json',
        },
      };

      const body = {
        userName: user.displayName,
        cart,
        user_id: user.uid,
        user_phoneNo: user.phoneNumber,
        lat: location.lat,
        lng: location.lng,
        address,
        voucher: voucher,
        total: grandTotal,
        scheduleType: selectedType,
      };

      const res = await axios.post(
        'https://us-central1-grocery-king-302815.cloudfunctions.net/api/orders',
        body,
        config,
      );

      dispatch({
        type: 'ORDER_SEND',
        payload: res.data,
      });

      let sl = null;
      if (res.data.slot === 'slot1') {
        sl = '09:00 - 12:00 AM';
      } else if (res.data.slot === 'slot2') {
        sl = '12:00 - 03:00 PM';
      } else if (res.data.slot === 'slot3') {
        sl = '03:00 - 06:00 PM';
      } else if (res.data.slot === 'slot4') {
        sl = '06:00 - 09:00 PM';
      }
      showAlert(res.data.day, sl);
      dispatch({
        type: 'RESET_CART',
      });
      navigation.navigate('Home');
    }
  };

  const caculateTotalPrice = () => {
    let tot = 0;
    let dis = 0;
    cart.map(item => {
      if (item.product.sale_price !== null && item.product.sale_price !== '') {
        tot = tot + item.product.sale_price * item.quantity;
        dis =
          dis +
          (item.product.price * item.quantity -
            item.product.sale_price * item.quantity);
      } else {
        tot = tot + item.product.price * item.quantity;
      }
    });

    setTotal(tot);
    setDiscount(dis);

    let cb = 0;
    cb = (tot - funds) * 0.1;

    if (cb > 1000) {
      setcashback(1000);
    } else {
      setcashback(cb.toFixed(0));
    }

    if (tot >= 2000) {
      setDeliveryFee(0);
      setGrandTotal(tot - funds);
    } else {
      setDeliveryFee(100);
      setGrandTotal(tot + 100 - funds);
    }
  };

  const handleVerifyVoucher = () => {
    navigation.navigate('Vouchers', {total: grandTotal});
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Card containerStyle={styles.card1Container}>
          <View style={{flexDirection: 'row'}}>
            <Icon name="location" />
            <Text style={{marginLeft: wp('2%')}}>Your Delivery Address</Text>
            <TouchableOpacity
              style={{position: 'absolute', right: 10}}
              onPress={() => navigation.navigate('CheckoutLocation')}>
              <Icon1 name="edit" size={20} />
            </TouchableOpacity>
          </View>
          <Text style={{marginLeft: wp('5%'), marginTop: hp('2%')}}>
            {address}
          </Text>

          <View style={{flexDirection: 'row', marginTop: hp('2.5%')}}>
            <Icon name="location" />
            <Text style={{marginLeft: wp('2%')}}>Phone Number</Text>
            <Icon1
              name="edit"
              size={20}
              style={{position: 'absolute', right: 10}}
            />
          </View>
          {user !== null && user.isAnonymous ? (
            <TextInput
              style={{borderBottomWidth: 1, marginLeft: wp('5%')}}
              onChangeText={num => onChangePhoneNumber(num)}
              placeholder="Enter Phone Number"
              // value={user.phoneNumber}
            />
          ) : (
            <TextInput
              style={{
                borderBottomWidth: 1,
                marginLeft: wp('5%'),
                color: '#000',
              }}
              // onChangeText={num => onChangePhoneNumber(num)}
              // placeholder="Enter Phone Number"
              editable={false}
              selectTextOnFocus={false}
              value={user !== null ? phoneNumber : null}
            />
          )}
        </Card>

        <RadioButtonRN
          activeColor={Colors.primary}
          animationTypes={['shake']}
          data={data}
          selectedBtn={e => setSelectedType(e.label)}
        />

        {selectedType === 'ASAP' ? null : (
          <>
            <View
              style={{
                marginTop: hp('2%'),
                marginBottom: hp('3%'),
                flexDirection: 'row',
              }}>
              <Icon name="calendar" style={{marginTop: hp('1%')}} />
              <Text style={{marginLeft: wp('2%'), marginTop: hp('1%')}}>
                Delivery Day
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  position: 'absolute',
                  right: wp('5%'),
                  borderWidth: 1,
                  paddingHorizontal: 5,
                  alignItems: 'center',
                }}>
                <Text style={{marginRight: wp('15%')}}>
                  {moment(date).format('MMM Do YY')}
                </Text>
                <TouchableOpacity
                  onPress={showDatepicker}
                  style={{marginTop: hp('0.5%')}}>
                  <Icon name="calendar" size={25} />
                </TouchableOpacity>
              </View>
            </View>

            <View style={{flexDirection: 'row', marginTop: hp('2%')}}>
              <Icon2 name="clock-o" />
              <Text style={{marginLeft: wp('2%')}}>Delivery Window</Text>
              <View
                style={{
                  flex: 1,
                  position: 'absolute',
                  right: 20,
                }}>
                <DropDownPicker
                  items={Items}
                  defaultValue={slot}
                  containerStyle={{
                    height: 40,
                    width: wp('40%'),
                  }}
                  style={{backgroundColor: '#ffffff', borderColor: '#000'}}
                  itemStyle={{
                    justifyContent: 'flex-start',
                  }}
                  dropDownStyle={{backgroundColor: '#ffffff'}}
                  onChangeItem={item => setSlot(item.value)}
                />
              </View>
            </View>
          </>
        )}

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: wp('5%'),
            marginTop: hp('3%'),
            alignItems: 'center',
          }}>
          <View>
            <ToggleSwitch
              isOn={toggleState}
              onColor="green"
              offColor="red"
              label="Use Wallet"
              labelStyle={{color: 'black', fontWeight: '900'}}
              size="small"
              onToggle={isOn => walletControl(isOn)}
            />
          </View>

          <TouchableOpacity
            onPress={handleVerifyVoucher}
            style={{justifyContent: 'center'}}>
            <LinearGradient
              colors={[Colors.primaryLight, Colors.primary]}
              style={[styles.orderBtn, {width: wp('30%'), height: hp('4%')}]}>
              <Text style={styles.btnText}>Use Voucher</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}

        <Text style={styles.titleText}>Payment Method</Text>
        <View style={styles.paymentMethod}>
          <Text>Cash on Delivery</Text>
          <Divider style={styles.divider} />
        </View>

        <View
          style={{
            alignSelf: 'center',
            width: wp('90%'),
            padding: wp('5%'),
          }}>
          <View style={[styles.totalSubView, {paddingTop: 0}]}>
            <Text>Sub Total</Text>
            <Text>{total}</Text>
          </View>
          <View style={styles.totalSubView}>
            <Text>Delivery Fee</Text>
            <Text>{deliveryFee}</Text>
          </View>
          <View style={styles.totalSubView}>
            <Text>Wallet Funds</Text>
            <Text>{funds}</Text>
          </View>

          {showCashback && (
            <View style={styles.totalSubView}>
              <Text>CashBack</Text>
              <Text>{cashback}</Text>
            </View>
          )}

          <View style={styles.totalSubView}>
            <Text>Total Discount</Text>
            <Text>{discount}</Text>
          </View>

          <View style={styles.totalSubView}>
            {voucher !== null && (
              <>
                <Text>Discount Type</Text>
                <Text>{voucher.discount_type}</Text>
              </>
            )}
          </View>

          {voucher !== null && voucher.discount_type === 'flat_rate' && (
            <View style={styles.totalSubView}>
              <Text>{voucher.discount_type}</Text>
              <Text>{voucher.discount_flat}</Text>
            </View>
          )}
          {voucher !== null && voucher.discount_type === 'percentage' && (
            <View style={styles.totalSubView}>
              <Text>{voucher.discount_type}</Text>
              <Text>{voucher.discount_percent}</Text>
            </View>
          )}

          <View
            style={[
              styles.totalSubView,
              {marginTop: hp('1%'), borderTopWidth: 1},
            ]}>
            <Text>Grand Total</Text>
            <Text>{grandTotal}</Text>
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity
        style={{alignSelf: 'center', bottom: 10}}
        onPress={handleCheckOut}>
        <LinearGradient
          colors={[Colors.primaryLight, Colors.primary]}
          style={styles.orderBtn}>
          {orderSendLoading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.btnText}>Place Order</Text>
          )}
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default CheckoutScreen;
const styles = StyleSheet.create({
  container: {flex: 1, paddingHorizontal: wp('2.5%')},
  card1Container: {
    height: hp('20%'),
    width: wp('90%'),
    padding: hp('2%'),
    // justifyContent: 'center',
  },
  card2Container: {
    height: hp('30%'),
    width: wp('93%'),
    // paddingVertical: hp('3%'),
  },
  cardTitle: {
    alignSelf: 'flex-start',
  },
  aBalanceView: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pBalanceView: {
    marginTop: hp('3%'),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: wp('5%'),
  },
  pBalanceSubView: {
    alignItems: 'center',
  },
  button: {
    width: wp('80%'),
    height: hp('4.5%'),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'center',
    elevation: 5,
    marginBottom: hp('5%'),
    marginTop: hp('4%'),
  },
  btnText: {
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
  },
  titleText: {margin: hp('1.5%'), marginTop: hp('2.5%')},
  divider: {
    marginVertical: hp('1%'),
  },
  paymentMethod: {
    backgroundColor: '#ffffff',
    padding: hp('2%'),
  },
  input: {
    // backgroundColor: 'red',
    width: wp('30%'),
    height: hp('4%'),
    // marginBottom:hp('1%'),
    // borderBottomWidth: 2,
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
  totalSubView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: hp('1%'),
  },
});
