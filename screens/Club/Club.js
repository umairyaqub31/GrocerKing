import React, {Component} from 'react';
import {ScrollView} from 'react-native';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Card, Divider} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FAQsView from './FAQs';

const ClubScreen = () => {
  return (
    <ScrollView style={styles.containe}>
      <View style={{alignSelf: 'center', padding: hp('10%')}}>
        <Text>Club</Text>
      </View>

      <Text style={{alignSelf: 'center', fontSize: hp('1.9%'), color: 'gray'}}>
        Select the plan wich suits your needs
      </Text>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: hp('2%'),
        }}>
        <Card
          containerStyle={{
            width: wp('31%'),
            height: hp('16%'),
            margin: hp('0.5%'),
          }}>
          <Card.Title style={styles.cardTitle}>3 Months</Card.Title>
          <Card.Divider />
          <View style={{alignSelf: 'center'}}>
            <Text style={styles.cardContent}>299 PKR</Text>
          </View>
          <TouchableOpacity onPress={() => {}}>
            <LinearGradient
              colors={['#08d4c4', '#01ab9d']}
              style={[
                styles.button,
                {
                  width: wp('27%'),
                  marginTop: 0,
                  position: 'absolute',
                  top: hp('2.7%'),
                  height: hp('3%'),
                },
              ]}>
              <Text style={styles.btnText}>SELECT</Text>
            </LinearGradient>
          </TouchableOpacity>
        </Card>

        <Card
          containerStyle={{
            width: wp('31%'),
            height: hp('16%'),
            margin: hp('0.5%'),
          }}>
          <Card.Title style={styles.cardTitle}>6 Months</Card.Title>
          <Card.Divider />
          <View style={{alignSelf: 'center'}}>
            <Text style={styles.cardContent}>499 PKR</Text>
          </View>
          <TouchableOpacity onPress={() => {}}>
            <LinearGradient
              colors={['#08d4c4', '#01ab9d']}
              style={[
                styles.button,
                {
                  width: wp('27%'),
                  marginTop: 0,
                  position: 'absolute',
                  top: hp('2.7%'),
                  height: hp('3%'),
                },
              ]}>
              <Text style={styles.btnText}>SELECT</Text>
            </LinearGradient>
          </TouchableOpacity>
        </Card>

        <Card
          containerStyle={{
            width: wp('31%'),
            height: hp('16%'),
            margin: hp('0.5%'),
          }}>
          <Card.Title style={styles.cardTitle}>12 Months</Card.Title>
          <Card.Divider />
          <View style={{alignSelf: 'center'}}>
            <Text style={styles.cardContent}>899 PKR</Text>
          </View>
          <TouchableOpacity onPress={() => {}}>
            <LinearGradient
              colors={['#08d4c4', '#01ab9d']}
              style={[
                styles.button,
                {
                  width: wp('27%'),
                  marginTop: 0,
                  position: 'absolute',
                  top: hp('2.7%'),
                  height: hp('3%'),
                },
              ]}>
              <Text style={styles.btnText}>SELECT</Text>
            </LinearGradient>
          </TouchableOpacity>
        </Card>
      </View>

      <Text
        style={{
          marginTop: hp('5%'),
          alignSelf: 'center',
          fontSize: hp('1.9%'),
          color: 'gray',
        }}>
        You can cancel anytime within 15 days
      </Text>

      <Card containerStyle={styles.card1Container}>
        <View style={{marginBottom: hp('2%')}}>
          <Text style={{color: '#01ab9d', fontSize: hp('2%')}}>
            No Delivery Charge
          </Text>
          <Text style={{color: 'gray'}}>On order above 299</Text>
        </View>
        <View style={{marginBottom: hp('2%')}}>
          <Text style={{color: '#01ab9d', fontSize: hp('2%')}}>
            No Delivery Charge
          </Text>
          <Text style={{color: 'gray'}}>On order above 299</Text>
        </View>
        <View>
          <Text style={{color: '#01ab9d', fontSize: hp('2%')}}>
            No Delivery Charge
          </Text>
          <Text style={{color: 'gray'}}>On order above 299</Text>
        </View>
      </Card>

      <Text style={{margin: 20, fontSize: hp('2%')}}>FAQs</Text>

      <FAQsView />
    </ScrollView>
  );
};

export default ClubScreen;
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
    // alignSelf: 'flex-start',
    color: '#01ab9d',
    fontSize: hp('2%'),
  },
  cardContent: {
    fontSize: hp('1.9%'),
    fontWeight: 'bold',
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
    marginTop: hp('2%'),
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
});
