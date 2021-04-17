/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import Collapsible from 'react-native-collapsible';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import Grid from './Grid';
import FastImage from 'react-native-fast-image';
const CategoryItem = props => {
  const {item, navigation} = props;
  const [isCollapsed, setIsCollapsed] = useState(true);
  // console.log('Category', item);
  const control = () => {
    if (item.subcategories.length > 0) {
      setIsCollapsed(!isCollapsed);
    } else {
      navigation.navigate('ProductListScreen', {
        id: item.category_id,
        name: item.category_name,
      });
    }
  };
  return (
    <View>
      <TouchableOpacity style={styles.container} onPress={control}>
        <FastImage
          style={styles.image}
          source={{
            uri: item.image.image,
            priority: FastImage.priority.high,
          }}
          resizeMode={FastImage.resizeMode.contain}
        />
        <View>
          <Text style={styles.text}>{item.category_name}</Text>
          {/* <Text style={{marginLeft: 15, fontSize: 15, color: 'gray'}}>
            Fruits Vegitables Potato Tomato
          </Text> */}
        </View>
      </TouchableOpacity>
      <Collapsible collapsed={isCollapsed} style={{flex: 1}}>
        <Grid
          subcategories={item.subcategories}
          navigation={navigation}
          mainId={item.category_id}
        />
      </Collapsible>
    </View>
  );
};

export default CategoryItem;

const styles = StyleSheet.create({
  container: {
    height: 170,
    marginVertical: 2,
    paddingHorizontal: 20,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#fff',
    // borderBottomWidth:1,
    // borderTopWidth:1
  },
  text: {marginLeft: 20, fontSize: 23},
  gridView: {
    marginTop: 10,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 10,
    height: 150,
  },
  itemName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },
  image: {
    width: '22%',
    height: '50%',
  },
});
