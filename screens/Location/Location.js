import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import MapView from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import auth from '@react-native-firebase/auth';
import {isPointInPolygon} from 'geolib';
import firestore from '@react-native-firebase/firestore';
import {useDispatch} from 'react-redux';
const marker = require('../../assets/icons8-marker.png');

const LocationScreen = props => {
  const [location, setLocation] = useState(null);
  const [latlng, setLatlng] = useState(null);
  const {navigation} = props;
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState(null);
  const dispatch = useDispatch();
  // function onAuthStateChanged(user) {
  //   setUser(user);
  //   if (initializing) {
  //     setInitializing(false);
  //   }
  // }

  const handleProceed = async () => {
    setLoading(true);
    const snapshot = await firestore()
      .collection('settings')
      .doc('admin')
      .get();
    const poly = snapshot.data().locality;
    const locality = isPointInPolygon(latlng, poly);

    if (locality) {
      auth()
        .signInAnonymously()
        .then(() => {
          console.log('User signed in anonymously');
          const obj = {
            lat: location.coords.latitude,
            lng: location.coords.longitude,
          };
          dispatch({type: 'SET_ADDRESS', payload: address});
          dispatch({type: 'SET_LOCATION', payload: obj});
          // setLoading(false);
        })
        .catch(error => {
          if (error.code === 'auth/operation-not-allowed') {
            console.log('Enable anonymous in your firebase console.');
            setLoading(false);
          }

          console.error(error);
        });
    } else {
      setLoading(false);
      Alert.alert('Location', 'Cannot Deliver to your location', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    }
  };

  const onRegionChange = region => {
    setLatlng({
      lat: region.latitude,
      lng: region.longitude,
    });
  };
  const onChangeAddress = text => {
    setAddress(text);
  };

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        const locate = position;
        setLocation(locate);
        setLatlng({
          lat: locate.coords.latitude,
          lng: locate.coords.longitude,
        });
      },
      error => Alert.alert(error.message),
      {enableHighAccuracy: false},
    );
  }, []);

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
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.009,
            longitudeDelta: 0.009,
          }}
          style={styles.map}
          zoomEnabled={true}
          onRegionChangeComplete={onRegionChange}
        />
        <View style={styles.markerFixed}>
          <Image style={styles.marker} source={marker} />
        </View>

        {loading ? <ActivityIndicator size={'large'} /> : null}

        <TextInput
          style={{
            backgroundColor: '#fff',
            width: wp('90%'),
            marginBottom: hp('2%'),
            paddingHorizontal: wp('4%'),
            elevation: 5,
          }}
          onChangeText={text => onChangeAddress(text)}
          placeholder={'Address'}
        />

        <TouchableOpacity onPress={handleProceed}>
          <LinearGradient
            colors={['#08d4c4', '#01ab9d']}
            style={styles.location}>
            <Text style={styles.textSign}>Proceed</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  }
};
export default LocationScreen;
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