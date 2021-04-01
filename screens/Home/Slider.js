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
import Icon from 'react-native-vector-icons/FontAwesome';
const SliderView = props => {
  const [images, setImages] = useState([
    'https://placeimg.com/640/640/nature',
    'https://placeimg.com/640/640/people',
    'https://placeimg.com/640/640/animals',
    'https://placeimg.com/640/640/beer',
  ]);
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
                              <Image
              source={{uri: item.image.image}}
              style={styles.customImage}
            />
              )}
          </View>
        )}
        // customButtons={(position, move) => (
        //   <View style={styles.buttons}>
        //     {images.map((image, index) => {
        //       return (
        //         <TouchableHighlight
        //           key={index}
        //           underlayColor="#ccc"
        //           onPress={() => move(index)}
        //           style={styles.button}>
        //           <Icon
        //             name="dot-circle-o"
        //             style={[
        //               styles.btnText,
        //               position === index && styles.buttonSelected,
        //             ]}
        //           />
        //           {/* <Text
        //             style={[
        //               styles.btnText,
        //               position === index && styles.buttonSelected,
        //             ]}>
        //             {index + 1}
        //           </Text> */}
        //         </TouchableHighlight>
        //       );
        //     })}
        //   </View>
        // )}
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
  buttons: {
    flexDirection: 'row',
    alignSelf: 'center',
    zIndex: 1,
    justifyContent: 'space-between',
    // marginTop: hp('-3%'),
  },
  button: {
    // marginHorizontal: 10,
    width: 20,
    height: 20,
    marginTop: hp('0.5%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    color: '#000000',
  },
  buttonSelected: {color: 'red'},
  content2: {},
});
