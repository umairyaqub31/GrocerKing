import React, {Component} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const PromotionItem = props => {
  const {item} = props;
  console.log(item.image.image);
  return (
    <View style={styles.container}>
      <Image
        style={{width: wp('95%'), height: hp('20%')}}
        source={{
          uri: item.image.image,
        }}
      />
    </View>
  );
};

export default PromotionItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp('3%'),
    alignItems: 'center',
  },
});
