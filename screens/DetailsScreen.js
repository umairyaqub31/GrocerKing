/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, Button, StyleSheet, ActivityIndicator} from 'react-native';
import {ExpandableListView} from 'react-native-expandable-listview';
import {Image} from 'react-native-elements';

const DetailsScreen = ({navigation}) => {
  const [listDataSource, setListDataSource] = useState([
    {
      id: '42',
      categoryName: 'Item 1',
      customItem: (
        <View
          style={{
            height: 100,
            marginVertical: 2,
            paddingHorizontal: 20,
            alignItems: 'center',
            flexDirection: 'row',
            // backgroundColor: '#fff',
          }}>
          <Image
            style={{width: '20%', height: '50%'}}
            source={require('../assets/product.jpeg')}
            PlaceholderContent={<ActivityIndicator />}
          />
          <View>
            <Text style={{marginLeft: 15, fontSize: 20}}>
              Fruits & Vegitables
            </Text>
            <Text style={{marginLeft: 15, fontSize: 15, color: 'gray'}}>
              Fruits Vegitables Potato Tomato
            </Text>
          </View>
        </View>
      ),
      subCategory: [
        {
          customInnerItem: (
            <View
              style={{
                height: 80,
                marginVertical: 2,
                paddingHorizontal: 20,
                alignItems: 'center',
                flexDirection: 'row',
                // backgroundColor: '#fff',
              }}>
              <Image
                style={{width: '9%', height: '50%'}}
                source={require('../assets/product.jpeg')}
                PlaceholderContent={<ActivityIndicator />}
              />
              <View>
                <Text style={{marginLeft: 15, fontSize: 20}}>Fruits</Text>
              </View>
            </View>
          ),
          id: '1',
          name: 'sub1',
        },
        {
          customInnerItem: (
            <View
              style={{
                height: 80,
                paddingHorizontal: 20,
                alignItems: 'center',
                flexDirection: 'row',
                backgroundColor: '#fff',
              }}>
              <Image
                style={{width: '9%', height: '50%'}}
                source={require('../assets/product.jpeg')}
                PlaceholderContent={<ActivityIndicator />}
              />
              <View>
                <Text style={{marginLeft: 15, fontSize: 20}}>Vegetables</Text>
              </View>
            </View>
          ),
          id: '2',
          name: 'sub2',
        },
      ],
    },
    {
      id: '96',
      categoryName: 'Item 2',
      customItem: (
        <View
          style={{
            height: 100,
            marginVertical: 2,
            paddingHorizontal: 20,
            alignItems: 'center',
            flexDirection: 'row',
            // backgroundColor: '#fff',
          }}>
          <Image
            style={{width: '20%', height: '50%'}}
            source={require('../assets/product.jpeg')}
            PlaceholderContent={<ActivityIndicator />}
          />
          <View>
            <Text style={{marginLeft: 15, fontSize: 20}}>
              Fruits & Vegitables
            </Text>
            <Text style={{marginLeft: 15, fontSize: 15, color: 'gray'}}>
              Fruits Vegitables Potato Tomato
            </Text>
          </View>
        </View>
      ),
      subCategory: [
        {
          customInnerItem: (
            <View
              style={{
                height: 80,
                marginVertical: 2,
                paddingHorizontal: 20,
                alignItems: 'center',
                flexDirection: 'row',
                // backgroundColor: '#fff',
              }}>
              <Image
                style={{width: '9%', height: '50%'}}
                source={require('../assets/product.jpeg')}
                PlaceholderContent={<ActivityIndicator />}
              />
              <View>
                <Text style={{marginLeft: 15, fontSize: 20}}>Fruits</Text>
              </View>
            </View>
          ),
          id: '1',
          name: 'sub1',
        },
        {
          customInnerItem: (
            <View
              style={{
                height: 80,
                paddingHorizontal: 20,
                alignItems: 'center',
                flexDirection: 'row',
                backgroundColor: '#fff',
              }}>
              <Image
                style={{width: '9%', height: '50%'}}
                source={require('../assets/product.jpeg')}
                PlaceholderContent={<ActivityIndicator />}
              />
              <View>
                <Text style={{marginLeft: 15, fontSize: 20}}>Vegetables</Text>
              </View>
            </View>
          ),
          id: '1',
          name: 'sub2',
        },
      ],
    },
  ]);

  function handleItemClick({index}) {
    console.log(index);
  }

  function handleInnerItemClick({innerIndex, item, itemIndex}) {
    console.log(innerIndex, item.subCategory[1].name);
  }
  return (
    <ExpandableListView
      data={listDataSource} // required
      onInnerItemClick={handleInnerItemClick}
      onItemClick={handleItemClick}
      itemContainerStyle={{backgroundColor: '#fff', elevation: 5}}
    />
  );
  // return (
  //   <View style={styles.container}>
  //     <Text>Details Screen</Text>
  //     <Button
  //       title="Go to details screen...again"
  //       onPress={() => navigation.push('Details')}
  //     />
  //     <Button title="Go to home" onPress={() => navigation.navigate('Home')} />
  //     <Button title="Go back" onPress={() => navigation.goBack()} />
  //   </View>
  // );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'blue',
    height: 150,
    marginVertical: 2,
    paddingHorizontal: 20,
    alignItems: 'center',
    flexDirection: 'row',
    // backgroundColor:'gray',
    elevation: 5,
  },
  image: {
    width: '26%',
    height: '80%',
  },
  text1: {
    marginLeft: 15,
    fontSize: 20,
  },
  text2: {
    marginLeft: 15,
    fontSize: 15,
    color: 'gray',
  },
});
