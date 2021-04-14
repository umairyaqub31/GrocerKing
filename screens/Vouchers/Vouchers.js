import React, {Component, useEffect} from 'react';
import {View, Text, FlatList} from 'react-native';
import VoucherItem from './VoucherItem';
import firestore from '@react-native-firebase/firestore';
import {useDispatch, useSelector} from 'react-redux';

const VoucherScreen = () => {
  const vouchers = useSelector(state => state.voucher.vouchers);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({type: 'START_VOUCHER_LOADING'});
    firestore()
      .collection('vouchers')
      .get()
      .then(snapshot => {
        snapshot.docs.map(v => {
          let obj = {
            id: v.id,
            ...v.data(),
          };
          dispatch({type: 'ADD_VOUCHER', payload: obj});
        });
        dispatch({type: 'STOP_VOUCHER_LOADING'});
      });
    return () => {
      dispatch({type: 'CLEAR_VOUCHER'});
    };
  }, [dispatch]);

  return (
    <View>
      <Text>Vouchers</Text>
      <FlatList
        data={vouchers}
        renderItem={({item, index}) => <VoucherItem item={item} />}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default VoucherScreen;
