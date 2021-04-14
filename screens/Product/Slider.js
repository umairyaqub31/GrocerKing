import React, {Component, useState} from 'react';
import ImageSlider from 'react-native-image-slider';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableHighlight,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {SliderBox} from 'react-native-image-slider-box';

const SliderView = props => {
  // const [images, setImages] = useState([
  //   'https://placeimg.com/640/640/nature',
  //   'https://placeimg.com/640/640/people',
  //   'https://placeimg.com/640/640/animals',
  //   'https://placeimg.com/640/640/beer',
  // ]);
  const {product} = props;

  let arr = [];
  product.item.images.map((i, index) => {
    arr.push(i.image);
  });

  return (
    <View style={styles.container}>
      <SliderBox
        images={arr}
        ImageComponentStyle={{width: wp('45%'), height: hp('25%')}}

        // onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
        // currentImageEmitter={index => console.warn(`current pos is: ${index}`)}
      />
    </View>
  );
};
export default SliderView;

const styles = StyleSheet.create({
  container: {flex: 1},
  customSlide: {height: hp('20%'), width: wp('100%')},
  customImage: {height: hp('20%'), width: wp('100%')},
});
