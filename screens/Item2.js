/* eslint-disable camelcase */
/* eslint-disable no-nested-ternary */
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Item = props => {
  const {text} = props;
  return (
    <View style={styles.container}>
      <Text>{text}</Text>
    </View>
  );
};

export default Item;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'green',
    height: 300,
    width: 200,
    marginHorizontal: 10,
    marginTop: 5,
  },
});
