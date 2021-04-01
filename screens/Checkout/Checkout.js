/* eslint-disable react-hooks/exhaustive-deps */
import React, {Component, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Button,
  TextInput,
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
import Icon3 from 'react-native-vector-icons/Feather';
import RadioButtonRN from 'radio-buttons-react-native';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import {checkOutAction, verifyVoucher} from '../../redux/actions/cartActions';
import {ScrollView} from 'react-native';
import {Colors} from '../../styles';

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
  const [selectedType, setSelectedType] = useState('ASAP');
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [vCode, setVCode] = useState(null);
  const [total, setTotal] = useState(null);
  const [grandTotal, setGrandTotal] = useState(null);
  const [deliveryFee, setDeliveryFee] = useState(null);

  const dispatch = useDispatch();

  const address = useSelector(state => state.user.address);
  const cart = useSelector(state => state.cart.cart);
  const user = useSelector(state => state.user.user);
  const location = useSelector(state => state.user.location);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  // const showTimepicker = () => {
  //   showMode('time');
  // };
  const onChangePhoneNumber = num => {
    setPhoneNumber(num);
  };

  const onChangeVoucher = code => {
    setVCode(code);
  };
  useEffect(() => {
    caculateTotalPrice();
  }, [cart]);

  const handleCheckOut = () => {
    console.log('checkOut Pressed');
    // console.log(cart, user, location, address, selectedType);
    dispatch(
      checkOutAction(
        cart,
        user.uid,
        phoneNumber,
        location.lat,
        location.lng,
        address,
        null,
        grandTotal,
        selectedType,
      ),
    );
  };

  const caculateTotalPrice = () => {
    let tot = 0;
    cart.map(item => {
      if (item.product.sale_price !== null && item.product.sale_price !== '') {
        tot = tot + item.product.sale_price * item.quantity;
      } else {
        tot = tot + item.product.price * item.quantity;
      }
    });

    setTotal(tot);

    if (tot >= 2000) {
      setDeliveryFee(0);
      setGrandTotal(tot);
    } else {
      setDeliveryFee(100);
      setGrandTotal(tot + 100);
    }
  };

  const handleVerifyVoucher = () => {
    console.log('verify');
    verifyVoucher(cart, vCode);
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
          <TextInput
            style={{borderBottomWidth: 1, marginLeft: wp('5%')}}
            onChangeText={num => onChangePhoneNumber(num)}
            placeholder="Enter Phone Number"
            // value={'03038285110'}
          />
        </Card>

        <RadioButtonRN
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
                // backgroundColor: 'red',
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
                  // backgroundColor:'red',
                  borderWidth: 1,
                  paddingHorizontal: 5,
                  alignItems: 'center',
                }}>
                {/* <TextInput
                style={styles.input}
                // onChangeText={onChangeText}
                value={'24/3/2021'}
              /> */}
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

        <Text style={{marginTop: hp('3%')}}>Voucher</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: wp('5%'),
          }}>
          <TextInput
            placeholder="Enter Voucher code"
            style={{borderBottomWidth: 1, width: wp('50%')}}
            onChangeText={code => onChangeVoucher(code)}
          />

          <TouchableOpacity
            onPress={handleVerifyVoucher}
            style={{justifyContent: 'center'}}>
            <LinearGradient
              colors={[Colors.primaryLight, Colors.primary]}
              style={[styles.orderBtn, {width: wp('20%'), height: hp('4%')}]}>
              <Text style={styles.btnText}>Verify</Text>
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
            <Text>Discount Type</Text>
            <Text>Sub Total</Text>
          </View>
          <View
            style={[
              styles.totalSubView,
              {marginTop: hp('3%'), borderTopWidth: 1},
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
          <Text style={styles.btnText}>Place Order</Text>
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
