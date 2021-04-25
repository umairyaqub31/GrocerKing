/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useState, useEffect} from 'react';
import {StyleSheet, View, Text, FlatList} from 'react-native';
import {FlatGrid} from 'react-native-super-grid';
import SubCategoryItem from '../Category/subCategoryItem';
import {sortBy} from 'underscore';

export default function Grid(props) {
  const {subcategories, navigation, mainId} = props;
  const [sorted, setSorted] = useState([]);
  // console.log('Subbbb', subcategories);

  useEffect(() => {
    const sortedCategories = sortBy(subcategories, 'category_name');
    setSorted(sortedCategories);
  }, []);

  const renderItem = useCallback(
    ({item}) => (
      <SubCategoryItem item={item} navigation={navigation} mainId={mainId} />
    ),
    [mainId, navigation],
  );

  const keyExtractor = useCallback(item => item.category_id.toString(), []);
  return (
    <FlatGrid
      itemDimension={120}
      data={sorted}
      style={styles.gridView}
      spacing={10}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
    />
  );
}

const styles = StyleSheet.create({
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
    color: '#000',
    fontWeight: '600',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#000',
  },
});
