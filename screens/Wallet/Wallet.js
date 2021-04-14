import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Card, Divider} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';
const WalletScreen = () => {
  const balance = useSelector(state => state.wallet.balance);
  return (
    <View style={styles.containe}>
      <Card containerStyle={styles.card1Container}>
        <View style={styles.aBalanceView}>
          <Text style={{fontSize: hp('2.5%'), color: 'gray'}}>
            Available Balance
          </Text>
          <Text style={{color: 'green', fontSize: hp('2%')}}>
            PKR {balance}
          </Text>
        </View>
        {/* <View style={styles.pBalanceView}>
          <View style={styles.pBalanceSubView}>
            <Text style={{color: 'gray'}}>Personal Balance</Text>
            <Text style={{color: 'green', fontSize: hp('1.5%')}}>PKR 0</Text>
          </View>
          <View style={styles.pBalanceSubView}>
            <Text style={{color: 'gray'}}>Promotional Balance</Text>
            <Text style={{color: 'green', fontSize: hp('1.5%')}}>PKR 0</Text>
          </View>
        </View> */}
      </Card>

      <Text style={styles.titleText}>Current Payment Method</Text>
      <View style={styles.paymentMethod}>
        <Text style={{color: 'gray'}}>Cash on Delivery</Text>
        <Divider style={styles.divider} />
      </View>
    </View>
  );
};

export default WalletScreen;
const styles = StyleSheet.create({
  containe: {flex: 1},
  card1Container: {
    height: hp('22%'),
    width: wp('93%'),
    justifyContent: 'center',
  },
  card2Container: {
    height: hp('18%'),
    width: wp('93%'),
  },
  cardTitle: {
    alignSelf: 'flex-start',
    color: 'gray',
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
  titleText: {
    margin: hp('1.5%'),
    marginTop: hp('2.5%'),
    color: 'gray',
    fontSize: hp('1.7%'),
  },
  divider: {
    marginVertical: hp('1%'),
  },
  paymentMethod: {
    backgroundColor: '#ffffff',
    padding: hp('2%'),
  },
});
