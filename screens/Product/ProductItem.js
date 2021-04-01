import React, {Component} from 'react';
import {TouchableOpacity, Image, View, Text, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const ProductItem = props => {
  const {item} = props;
  return (
    <View style={styles.container} onPress={() => console.log('Pressed')}>
      <Image style={styles.image} source={{uri: item.images[0].image}} />
      <View>
        <Text style={styles.text}>{item.product_name}</Text>
        <Text style={styles.text}>{item.price}</Text>
        {/* <Text style={{marginLeft: 15, fontSize: 15, color: 'gray'}}>
            Fruits Vegitables Potato Tomato
          </Text> */}
      </View>

      <View style={styles.buttonView}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.btnText}>Add To Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    // backgroundColor: '#f2f2f2',
    padding: wp('2%'),
    borderBottomWidth: 1.5,
    borderBottomColor: '#f2f2f2',
    paddingVertical: hp('2%'),
    alignItems: 'center',
  },
  text: {fontSize: hp('2.5%'), color: '#212121'},
  image: {
    width: wp('15%'),
    height: hp('5%'),
    marginLeft: wp('1%'),
  },
  buttonView: {
    position: 'absolute',
    right: wp('7%'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: wp('25%'),
  },
  button: {
    height: hp('4%'),
    width: wp('25%'),
    borderRadius: 5,
    backgroundColor: '#febd00',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontWeight: 'bold',
    color: '#fff',
  },
});
