import React, {useEffect, useState} from 'react';
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
import {isPointInPolygon} from 'geolib';
import firestore from '@react-native-firebase/firestore';
import {useDispatch, useSelector} from 'react-redux';
import {SignUp} from '../../redux/actions/authActions';
import {Colors} from '../../styles';
const marker = require('../../assets/icons8-marker.png');

const PickLocationScreen = props => {
  const [location, setLocation] = useState(null);
  const [latlng, setLatlng] = useState(null);
  const [loading, setLoading] = useState(false);
  const {navigation} = props;
  const user = useSelector(state => state.user.user);
  const dispatch = useDispatch();
  const signedUp = useSelector(state => state.user.signedUp);

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
    const locality = isPointInPolygon(latlng, poly);
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

        <TouchableOpacity onPress={handleSignUp}>
          <LinearGradient
            colors={[Colors.primaryLight, Colors.primary]}
            style={styles.location}>
            <Text style={styles.textSign}>Sign Up</Text>
          </LinearGradient>
        </TouchableOpacity>
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
