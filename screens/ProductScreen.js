/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import Slideshow from 'react-native-slideshow';
import Item2 from './Item2';
const ProductScreen = ({navigation}) => {
  const [Data, setData] = useState([1, 2, 3, 4, 5, 6, 7]);

  const {colors} = useTheme();

  const theme = useTheme();
  return (
    <View style={styles.container}>
      <View style={{height: 200, marginTop: '4%'}}>
        <Slideshow
          dataSource={[
            {url: require('../assets/product.jpeg')},
            {url: 'http://placeimg.com/640/480/any'},
            {url: require('../assets/product.jpeg')},
          ]}
          height={350}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 170,
          marginHorizontal: 20,
          justifyContent: 'space-between',
        }}>
        <Text
          style={[
            styles.text,
            {color: 'red', fontWeight: 'bold', fontSize: 30},
          ]}>
          RS 1,598
        </Text>
        <Text style={[styles.text, {fontSize: 18, color: 'gray'}]}>
          12 piece
        </Text>
      </View>
      <View style={{height: 310, borderRadius: 5}}>
        <Text style={styles.heading}>More Items</Text>
        <View>
          <FlatList
            data={Data}
            horizontal
            renderItem={({item}) => (
              <Item2 text={item} navigation={navigation} />
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => console.log('Pressed')}>
          <Text style={styles.btnText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductScreen;

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
  btn: {
    backgroundColor: 'green',
    height: 60,
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    // marginBottom: 20,
    marginTop: 10,
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
