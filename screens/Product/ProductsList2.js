/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useSelector} from 'react-redux';
import ProductItem from './ProductItem';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const ProductListScreen2 = props => {
  const {id, name} = props;
  const [Data, setData] = useState([]);
  const products = useSelector(state => state.product.products);
  const productsLoading = useSelector(state => state.product.productsLoading);

  useEffect(() => {
    const filteredProducts = products.filter(p => p.category_id === id);
    // console.log(filteredProducts);
    setData(filteredProducts);
  }, [products, id]);

  return (
    <View style={styles.container}>
      <FlatList
        data={Data}
        renderItem={({item}) => <ProductItem item={item} />}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default ProductListScreen2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center'
  },
  heading: {margin: wp('5%'), fontWeight: 'bold', fontSize: hp('2%')},
});