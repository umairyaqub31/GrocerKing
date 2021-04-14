/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useState} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  StatusBar,
  FlatList,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import Item from '../Home/Item';
import CategoryItem from './CategoryItem';
const CategoryScreen = ({navigation}) => {
  const [Data, setData] = useState([1, 2, 3, 4, 5, 6, 7]);

  const {colors} = useTheme();

  const theme = useTheme();

  const renderItem = useCallback(({item}) => <CategoryItem item={item} />, []);

  const keyExtractor = useCallback(item => item.id.toString(), []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Vegitables</Text>
      {/* <ScrollView style={{paddingHorizontal: 15, paddingVertical: 15}}> */}
      <FlatList
        data={Data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        initialNumToRender={3}
        maxToRenderPerBatch={3}
        removeClippedSubviews={true}
        windowSize={5}
        updateCellsBatchingPeriod={100}
      />
      {/* </ScrollView> */}
    </View>
  );
};

export default CategoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center'
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 15,
    marginVertical: 10,
  },
});
