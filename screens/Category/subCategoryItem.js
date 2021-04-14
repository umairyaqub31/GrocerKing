import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import FastImage from 'react-native-fast-image';
// import {Image} from 'react-native-elements';
import {Container, Header, Content, Thumbnail} from 'native-base';
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
      {/* <Image
        style={styles.image}
        source={{uri: item.image.image}}
        // PlaceholderContent={<ActivityIndicator />}
      /> */}

      <FastImage
        style={styles.image}
        source={{
          uri: item.image.image,
          priority: FastImage.priority.normal,
        }}
        // resizeMode={FastImage.resizeMode.contain}
      />

      {/* <Thumbnail square small source={{uri: item.image.image}} /> */}
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
    width: '40%',
    height: '50%',
  },
});
