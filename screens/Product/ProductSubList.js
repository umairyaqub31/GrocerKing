/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  useWindowDimensions,
} from 'react-native';
import {useSelector} from 'react-redux';
import ProductItem from './ProductItem';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import TabScreen from './TabScreen';
import ProductListScreen from './ProductsList';
import {sortBy} from 'underscore';

const ProductSubListScreen = props => {
  const {id, name, item} = props.route.params;
  const {navigation} = props;
  console.log('ggggg', item);
  const [Data, setData] = useState([]);
  const products = useSelector(state => state.product.products);
  const productsLoading = useSelector(state => state.product.productsLoading);
  const category = useSelector(state => state.category.category);
  const categoryLoading = useSelector(state => state.category.categoryLoading);
  const [Tabs, setTabs] = useState([]);

  // console.log('categorooooo', category[1].subcategories);

  useEffect(() => {
    const filteredProducts = products.filter(p => p.category_id === id);
    const sortedProducts = sortBy(filteredProducts, 'product_name');
    // console.log(filteredProducts);
    setData(sortedProducts);
  }, [products, id]);

  //   useEffect(() => {
  //     let arr = [];
  //     const length = item.subcategories.length;
  //     if (length > 0) {
  //       item.subcategories.map(s => {
  //         const obj = {
  //           key: s.category_name,
  //           title: s.category_name,
  //         };
  //         arr.push(obj);
  //       });
  //     }

  //     console.log('name Array', arr);
  //     setTabs(arr);
  //   }, [item.subcategories]);

  if (item.subcategories.length > 0) {
    return <TabScreen subcategories={item.subcategories} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{name}</Text>
      <FlatList
        data={Data}
        renderItem={({item}) => (
          <ProductItem item={item} navigation={navigation} />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default ProductSubListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center'
  },
  heading: {margin: wp('5%'), fontWeight: 'bold', fontSize: hp('2%')},
});
