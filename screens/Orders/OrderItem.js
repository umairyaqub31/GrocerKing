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
    <TouchableOpacity
      onPress={() => navigation.navigate('OrderDetails', {data: item})}
      style={styles.container}>
      <Text style={[styles.titleText, {marginTop: 0}]}>Order Date:</Text>
      <Text>{moment(item.date).format('MMMM Do YYYY')}</Text>
      <Text style={styles.titleText}>Order Delivery Day:</Text>
      <Text numberOfLines={3} ellipsizeMode="tail" style={{width: 200}}>
        On {item.day} in between {timeSlot}
      </Text>
      <Text style={styles.titleText}>Status:</Text>
      <Text>{item.status}</Text>

      <View style={{position: 'absolute', right: 30}}>
        {difference > 5 ? null : (
          <TouchableOpacity
            style={[styles.button, {marginTop: 15}]}
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
    </TouchableOpacity>
  );
};

export default OrderItem;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginVertical: 5,
    marginHorizontal: 10,
    elevation: 5,
    borderRadius: 10,
    shadowRadius: 10,
    shadowOpacity: 0.5,
    shadowColor: '#000',
  },
  subView: {
    flexDirection: 'row',
    marginRight: wp('50%'),
  },
  titleText: {
    marginTop: 10,
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
