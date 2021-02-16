/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  StatusBar,
  FlatList,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import Item from './Item';
import Item2 from './Item2';

const HomeScreen = ({navigation}) => {
  const [Data, setData] = useState([1, 2, 3, 4, 5, 6, 7]);

  const {colors} = useTheme();

  const theme = useTheme();

  return (
    <View style={styles.container}>
      <StatusBar barStyle={theme.dark ? 'light-content' : 'dark-content'} />
      <ScrollView style={{paddingHorizontal: 15, paddingVertical: 15}}>
        <View style={{backgroundColor: 'red', height: 310, borderRadius: 5}}>
          <View style={{elevation:5}}>
            <FlatList
              data={Data}
              horizontal
              renderItem={({item}) => <Item2 text={item} />}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </View>

        <FlatList
          data={Data}
          renderItem={({item}) => <Item text={item} />}
          keyExtractor={(item, index) => index.toString()}
        />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center'
  },
});
