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
import FastImage from 'react-native-fast-image';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const SliderView = props => {
  const {promotion} = props;
  return (
    <SafeAreaView style={styles.container}>
      <ImageSlider
        loopBothSides
        autoPlayWithInterval={6000}
        images={promotion}
        customSlide={({index, item, style, width}) => (
          // It's important to put style here because it's got offset inside
          <View key={index} style={styles.customSlide}>
            {item.image === undefined ? null : (
              <FastImage
                source={{uri: item.image.image}}
                style={styles.customImage}
              />
            )}
          </View>
        )}
      />
    </SafeAreaView>
  );
};
export default SliderView;

const styles = StyleSheet.create({
  container: {flex: 1},
  content1: {},
  contentText: {},
  customSlide: {height: hp('17%'), width: wp('100%')},
  customImage: {height: hp('17%'), width: wp('100%')},
});
