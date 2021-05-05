import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import MapView from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
const marker = require('../assets/icons8-marker.png');
import {Image} from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
import {isPointInPolygon} from 'geolib';
import {updateProfile} from '../redux/actions/profileActions';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Colors} from '../styles';
import {setLocationAddress} from '../redux/actions/userAction';

const ProfileLocationScreen = props => {
  const [location, setLocation] = useState(null);
  const [latlng, setLatlng] = useState(null);
  const {navigation} = props;
  const user = useSelector(state => state.user.user);
  const loc = useSelector(state => state.user.location);
  const addr = useSelector(state => state.user.address);
  const dispatch = useDispatch();
  const signedUp = useSelector(state => state.user.signedUp);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState(null);
  const mapRef = useRef();

  const onRegionChange = region => {
    setLatlng({
      lat: region.latitude,
      lng: region.longitude,
    });
  };

  useEffect(() => {
    console.log('loc', loc);
    setLocation(loc);
    setAddress(addr);
  }, []);

  const gotToMyLocation = () => {
    console.log(mapRef);
    Geolocation.getCurrentPosition(
      ({coords}) => {
        console.log('curent location: ', coords);
        if (mapRef) {
          console.log('curent location: ', coords);
          mapRef.current.animateToRegion(
            {
              latitude: coords.latitude,
              longitude: coords.longitude,
              latitudeDelta: 0.009,
              longitudeDelta: 0.009,
            },
            2000,
          );
        }
      },
      // error => console.log(error),
      // {enableHighAccuracy: false},
    );
  };
  const handleChangeAddress = text => {
    console.log(text);
    setAddress(text);
  };

  const handleUpdate = async () => {
    setLoading(true);
    const snapshot = await firestore()
      .collection('settings')
      .doc('admin')
      .get();
    const poly = snapshot.data().locality;
    const locality = isPointInPolygon(latlng, poly);
    if (locality) {
      if (user !== null) {
        dispatch(updateProfile(user.uid, latlng.lat, latlng.lng, address));
        navigation.navigate('Profile');
      }
    } else {
      setLoading(false);
      Alert.alert('Location', 'Cannot Deliver to your location', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    }
  };

  if (location === null || location === undefined) {
    return (
      <View>
        <ActivityIndicator size="large" />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <MapView
          ref={mapRef}
          initialRegion={{
            latitude: location.lat,
            longitude: location.lng,
            latitudeDelta: 0.009,
            longitudeDelta: 0.009,
          }}
          style={styles.map}
          zoomEnabled={true}
          onRegionChangeComplete={onRegionChange}
        />
        <View style={styles.markerFixed}>
          <Image
            style={styles.marker}
            source={marker}
            PlaceholderContent={<ActivityIndicator />}
          />
        </View>

        <TextInput
          style={{
            backgroundColor: '#fff',
            width: wp('90%'),
            marginBottom: hp('2%'),
            paddingHorizontal: wp('4%'),
            elevation: 5,
          }}
          value={address}
          onChangeText={text => handleChangeAddress(text)}
          placeholder={'Address'}
        />

        <TouchableOpacity
          onPress={gotToMyLocation}
          style={{
            width: 60,
            height: 60,
            position: 'absolute',
            bottom: 200,
            right: 20,
            borderRadius: 30,
            backgroundColor: '#d2d2d2',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Icon name="location-arrow" size={30} />
        </TouchableOpacity>
        <Text
          style={{
            position: 'absolute',
            bottom: 180,
            right: 20,
            fontWeight: 'bold',
          }}>
          Auto Detect
        </Text>

        <TouchableOpacity onPress={() => handleUpdate()}>
          <LinearGradient
            colors={[Colors.primary, Colors.primary]}
            style={styles.location}>
            <Text style={styles.textSign}>Confirm</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  }
};
export default ProfileLocationScreen;
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  location: {
    width: wp('90%'),
    height: hp('5.5%'),
    justifyContent: 'center',
    alignItems: 'center',
    // borderRadius: 50,
    flexDirection: 'row',
    alignSelf: 'center',
    elevation: 5,
    marginBottom: hp('5%'),
  },
  textSign: {
    color: 'white',
    fontSize: 19,
    fontWeight: 'bold',
  },
  markerFixed: {
    left: '50%',
    marginLeft: -24,
    marginTop: -48,
    position: 'absolute',
    top: '50%',
  },
  marker: {
    height: 48,
    width: 48,
  },
});
