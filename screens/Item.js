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
    backgroundColor: 'blue',
    height: 200,
    marginVertical: 10,
  },
});
