import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import {createImageProgress} from 'react-native-image-progress';
import FastImage from 'react-native-fast-image';
import * as Progress from 'react-native-progress';
const Image = createImageProgress(FastImage);

const SubCategoryItem = props => {
  const {item, navigation, mainId} = props;
  return (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() =>
        navigation.navigate('ProductSubListScreen', {
          id: item.category_id,
          name: item.category_name,
          item: item,
        })
      }>
      <FastImage
        style={styles.image}
        source={{
          uri: item.image.image,
          priority: FastImage.priority.high,
        }}
        resizeMode={FastImage.resizeMode.contain}
      />

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
    height: 100,
    backgroundColor: '#fff',
  },
  itemName: {
    fontSize: 16,
    color: '#000',
    fontWeight: '600',
  },
  image: {
    width: '40%',
    height: '50%',
  },
});
