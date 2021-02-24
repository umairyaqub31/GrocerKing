/* eslint-disable camelcase */
/* eslint-disable no-nested-ternary */
import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Item = props => {
  const {text, navigation} = props;
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('CategoryScreen')}>
      <Image style={styles.image} source={require('../assets/product.jpeg')} />
      <View>
        <Text style={styles.text1}>Fruits & Vegitables</Text>
        <Text style={styles.text2}>Fruits Vegitables Potato Tomato</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Item;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'blue',
    height: 150,
    marginVertical: 2,
    paddingHorizontal: 20,
    alignItems: 'center',
    flexDirection: 'row',
    // backgroundColor:'gray',
    elevation: 5,
  },
  image: {
    width: '26%',
    height: '80%',
  },
  text1: {
    marginLeft: 15,
    fontSize: 20,
  },
  text2: {
    marginLeft: 15,
    fontSize: 15,
    color: 'gray',
  },
});
