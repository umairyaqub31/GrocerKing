import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
const SubCategoryItem = props => {
  const {item, navigation} = props;
  return (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() =>
        navigation.navigate('ProductListScreen', {
          id: item.category_id,
          name: item.category_name,
        })
      }>
      <Image style={styles.image} source={{uri: item.image.image}} />
      <Text style={styles.itemName}>{item.category_name}</Text>
    </TouchableOpacity>
  );
};

export default SubCategoryItem;

const styles = StyleSheet.create({
  itemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    // padding: 10,
    height: 100,
    backgroundColor: '#fff',
  },
  itemName: {
    fontSize: 16,
    color: '#000',
    fontWeight: '600',
  },
  image: {
    width: '20%',
    height: '50%',
  },
});
