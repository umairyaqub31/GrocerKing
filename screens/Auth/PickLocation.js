import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from 'react-native';
import MapView from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {isPointInPolygon,isPointWithinRadius} from 'geolib';
import firestore from '@react-native-firebase/firestore';
import {useDispatch, useSelector} from 'react-redux';
import {SignUp} from '../../redux/actions/authActions';
import {Colors} from '../../styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
const marker = require('../../assets/icons8-marker.png');
const PickLocationScreen = props => {
  const [location, setLocation] = useState(null);
  const [latlng, setLatlng] = useState(null);
  const [loading, setLoading] = useState(false);
  const {navigation} = props;
  const user = useSelector(state => state.user.user);
  const dispatch = useDispatch();
  const signedUp = useSelector(state => state.user.signedUp);
  const mapRef = useRef();

  useEffect(() => {
    if (signedUp) {
      console.log('here');
      user.reload();
    }
  }, [signedUp, user]);
  const handleSignUp = async () => {
    setLoading(true);
    const snapshot = await firestore()
      .collection('settings')
      .doc('admin')
      .get();
    const poly = snapshot.data().locality;
    let locality = false;
    poly.map(circle => {
      let temp = isPointWithinRadius(location,{
        latitude:circle.lat,
        longitude: circle.lng,
      }, circle.radius);
      if(temp === true) {
        locality = true;
      }
    })
    if (locality) {
      dispatch(SignUp(props.route.params.data, user.uid, latlng));
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
      // error => alert('Error: Are location services on?'),
      // {enableHighAccuracy: true},
    );
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
          ref={mapRef}
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

        <TouchableOpacity onPress={handleSignUp}>
          <LinearGradient
            colors={[Colors.primaryLight, Colors.primary]}
            style={styles.location}>
            <Text style={styles.textSign}>Sign Up</Text>
          </LinearGradient>
        </TouchableOpacity>
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
      </View>
    );
  }
};
export default PickLocationScreen;
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
