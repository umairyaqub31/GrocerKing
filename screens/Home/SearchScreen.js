/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  StatusBar,
  FlatList,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import SearchInput, {createFilter} from 'react-native-search-filter';
import {useSelector} from 'react-redux';
import ProductItem from '../Product/ProductItem';

const KEYS_TO_FILTERS = ['product_name'];

const SearchScreen = ({navigation}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const products = useSelector(state => state.product.products);
  const [data, setData] = useState([]);

  const searchUpdated = term => {
    setSearchTerm(term);
    const filteredProducts = products.filter(
      createFilter(term, KEYS_TO_FILTERS),
    );
    console.log(filteredProducts);
    setData(filteredProducts);
  };

  useEffect(() => {
    if (searchTerm === '') {
      setData([]);
    }
  }, [searchTerm]);

  return (
    <View style={styles.container}>
      <SearchInput
        onChangeText={term => {
          searchUpdated(term);
        }}
        style={styles.searchInput}
        placeholder="Type a message to search"
      />

      <FlatList
        data={data}
        renderItem={({item}) => (
          <ProductItem item={item} navigation={navigation} />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center'
  },
  searchInput: {
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
    height: 70,
    color: '#000',
  },
});
