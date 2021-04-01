import React, {Component, useState} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import PromotionItem from './PromotionItem';

const PromotionScreen = () => {
  const promotions = useSelector(state => state.promotion.promotion);
  return (
    <View style={styles.container}>
      <FlatList
        data={promotions}
        renderItem={({item}) => <PromotionItem item={item} />}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default PromotionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
