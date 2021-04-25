import React, {Component, useEffect} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Text,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getOrders} from '../../redux/actions/cartActions';
import OrderItem from './OrderItem';
// import orderItem from './OrderItem';

const OrderScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user);
  const ordersLoading = useSelector(state => state.cart.ordersLoading);
  const orders = useSelector(state => state.cart.orders);

  useEffect(() => {
    console.log(user.uid);
    dispatch(getOrders(user.uid, 1));
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(getOrders(user.uid, 1));
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [dispatch, navigation, user.uid]);
  return (
    <View style={styles.container}>
      {ordersLoading ? (
        <View>
          <ActivityIndicator size={'large'} />
        </View>
      ) : (
        <>
          {orders.length > 0 ? (
            <FlatList
              data={orders}
              renderItem={({item, index}) => (
                <OrderItem item={item} navigation={navigation} index={index} />
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          ) : (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{fontWeight: 'bold', fontSize: 20}}>
                No Orders Found
              </Text>
            </View>
          )}
        </>
      )}
    </View>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal: 10,
  },
});
