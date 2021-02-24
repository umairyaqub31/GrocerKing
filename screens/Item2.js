/* eslint-disable react-native/no-inline-styles */
/* eslint-disable camelcase */
/* eslint-disable no-nested-ternary */
import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Item = props => {
  const {text, navigation} = props;
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('ProductScreen')}>
        <Image
          style={styles.image}
          source={require('../assets/product.jpeg')}
        />
        <Text style={[styles.text, {marginTop: 7}]}>Olpers Milk</Text>
        <Text style={styles.text}>12 piece</Text>
        <Text style={[styles.text, {color: 'red', fontWeight: 'bold'}]}>
          RS 1,598
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => console.log('Pressed')}>
        <Text style={styles.btnText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Item;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: 300,
    width: 170,
    marginHorizontal: 10,
    marginTop: 5,
    justifyContent: 'center',
    elevation: 5,
    marginBottom: 5,
  },
  image: {
    width: '80%',
    height: '65%',
    alignSelf: 'center',
  },
  text: {
    marginLeft: 12,
    fontSize: 18,
  },
  btn: {
    backgroundColor: 'green',
    height: 40,
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    // marginBottom: 20,
    marginTop: -20,
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
