import moment from 'moment';
import React, {Component, useEffect, useState} from 'react';
import {View, Text, StyleSheet, Touchable} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import firestore from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';

const OrderItem = props => {
  const {item, navigation, index} = props;
  const [timeSlot, setTimeSlot] = useState(null);
  const [difference, setDifference] = useState(6);
  const [deleted, setD] = useState(false);
  const products = useSelector(state => state.product.products);

  useEffect(() => {
    calculateDiff();

    if (item.slot === 'slot1') {
      setTimeSlot('09:00 - 12:00 AM');
    } else if (item.slot === 'slot2') {
      setTimeSlot('12:00 - 03:00 PM');
    } else if (item.slot === 'slot3') {
      setTimeSlot('03:00 - 06:00 PM');
    } else if (item.slot === 'slot4') {
      setTimeSlot('06:00 - 09:00 PM');
    }
  }, [calculateDiff, item.slot]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const calculateDiff = () => {
    const dif = moment().diff(moment(item.date), 'minutes');
    setDifference(dif);
    console.log(dif);
  };

  const handleCancel = async () => {
    console.log(item.id);
    try {
      item.cart.map(c => {
        const i = products.findIndex(p => p.id === c.product.id);
        firestore()
          .collection('products')
          .doc(products[i].id)
          .update({
            inventory: c.quantity + products[i].inventory,
          })
          .then(() => {
            console.log('updated Product', products[i].product_name);
          });
      });

      await firestore()
        .collection('orders')
        .doc(item.id)
        .delete();

      setD(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate('OrderDetails', {data: item})}>
        <View>
          <View style={styles.subView}>
            <Text style={styles.titleText}>Order Date:</Text>
            <Text>{moment(item.date).format('MMMM Do YYYY')}</Text>
          </View>
          <View style={styles.subView}>
            <Text style={styles.titleText}>Order Delivery Day:</Text>
            <Text>{item.day}</Text>
            <Text style={{marginLeft: wp('1%')}}>{timeSlot}</Text>
          </View>
          <View style={styles.subView}>
            <Text style={styles.titleText}>Schedule Type:</Text>
            <Text>{item.scheduleType}</Text>
          </View>
        </View>
      </TouchableOpacity>
      <View style={{position: 'absolute', right: 30}}>
        {difference > 5 ? null : (
          <TouchableOpacity
            style={styles.button}
            disabled={deleted}
            onPress={handleCancel}>
            {deleted ? (
              <Text style={styles.btnText}>Cancelled</Text>
            ) : (
              <Text style={styles.btnText}>Cancel</Text>
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default OrderItem;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginVertical: hp('1.5%'),
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  subView: {
    flexDirection: 'row',
  },
  titleText: {
    marginRight: wp('2%'),
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: 'red',
    padding: 8,
    paddingHorizontal: 20,
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
