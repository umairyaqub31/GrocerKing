/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import Collapsible from 'react-native-collapsible';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import Grid from './Grid';
// import storage from '@react-native-firebase/storage';
const CategoryItem = props => {
  const {item, navigation} = props;
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [items, setItems] = React.useState([
    {name: 'TURQUOISE', code: '#1abc9c'},
    {name: 'EMERALD', code: '#2ecc71'},
    {name: 'PETER RIVER', code: '#3498db'},
  ]);
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
        <Image
          style={{width: '20%', height: '50%'}}
          source={{uri: item.image.image}}
        />
        <View>
          <Text style={styles.text}>{item.category_name}</Text>
          {/* <Text style={{marginLeft: 15, fontSize: 15, color: 'gray'}}>
            Fruits Vegitables Potato Tomato
          </Text> */}
        </View>
      </TouchableOpacity>
      <Collapsible collapsed={isCollapsed} style={{flex: 1}}>
        <Grid subcategories={item.subcategories} navigation={navigation} />
      </Collapsible>
    </View>
  );
};

export default CategoryItem;

const styles = StyleSheet.create({
  container: {
    height: 100,
    marginVertical: 2,
    paddingHorizontal: 20,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#fff',
    // borderBottomWidth:1,
    // borderTopWidth:1
  },
  text: {marginLeft: 15, fontSize: 20},
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
});
