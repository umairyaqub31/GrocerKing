/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import Collapsible from 'react-native-collapsible';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import Grid from './Category/Grid';
const ProfileScreen = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [items, setItems] = React.useState([
    {name: 'TURQUOISE', code: '#1abc9c'},
    {name: 'EMERALD', code: '#2ecc71'},
    {name: 'PETER RIVER', code: '#3498db'},
  ]);

  const control = () => {
    setIsCollapsed(!isCollapsed);
  };
  return (
    <View>
      <TouchableOpacity
        style={{
          height: 100,
          marginVertical: 2,
          paddingHorizontal: 20,
          alignItems: 'center',
          flexDirection: 'row',
          // backgroundColor: '#fff',
        }}
        onPress={control}>
        <Image
          style={{width: '20%', height: '50%'}}
          source={require('../assets/product.jpeg')}
        />
        <View>
          <Text style={{marginLeft: 15, fontSize: 20}}>
            Fruits & Vegitables
          </Text>
          <Text style={{marginLeft: 15, fontSize: 15, color: 'gray'}}>
            Fruits Vegitables Potato Tomato
          </Text>
        </View>
      </TouchableOpacity>
      <Collapsible collapsed={isCollapsed} style={{flex: 1}}>
        <Grid />
      </Collapsible>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
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
    color: '#fff',
    fontWeight: '600',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },
});
