import React, {Component, useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList, ScrollView} from 'react-native';
import OrderProductItem from './OrderProductItem';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import moment from 'moment';
const OrderDetailsScreen = props => {
  const {data} = props.route.params;
  const [timeSlot, setTimeSlot] = useState(null);
  console.log('detail', data);

  useEffect(() => {
    if (data.slot === 'slot1') {
      setTimeSlot('09:00 - 12:00 AM');
    } else if (data.slot === 'slot2') {
      setTimeSlot('12:00 - 03:00 PM');
    } else if (data.slot === 'slot3') {
      setTimeSlot('03:00 - 06:00 PM');
    } else if (data.slot === 'slot4') {
      setTimeSlot('06:00 - 09:00 PM');
    }
  }, [data.slot]);
  return (
    <ScrollView style={styles.container}>
      <Text
        style={{fontWeight: 'bold', marginVertical: hp('2%'), fontSize: 15}}>
        Products
      </Text>
      <View style={styles.productView}>
        <FlatList
          data={data.cart}
          renderItem={({item, index}) => <OrderProductItem item={item} />}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <View>
        <View style={styles.subView}>
          <Text style={styles.titleText}>Order Date:</Text>
          <Text>{moment(data.date).format('MMMM Do YYYY')}</Text>
        </View>
        <View style={styles.subView}>
          <Text style={styles.titleText}>Order Delivery Day:</Text>
          <Text>{data.day}</Text>
          <Text style={{marginLeft: wp('1%')}}>{timeSlot}</Text>
        </View>
        <View style={styles.subView}>
          <Text style={styles.titleText}>Schedule Type:</Text>
          <Text>{data.scheduleType}</Text>
        </View>
        <View style={styles.subView}>
          <Text style={styles.titleText}>Address:</Text>
          <Text>{data.address}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default OrderDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  productView: {
    backgroundColor: '#fff',
  },
  subView: {
    flexDirection: 'row',
    marginVertical: hp('2%'),
  },
  titleText: {
    marginRight: wp('2%'),
    fontWeight: 'bold',
  },
});
