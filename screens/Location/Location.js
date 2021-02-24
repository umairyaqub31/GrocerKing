import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import MapView from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import auth from '@react-native-firebase/auth';

const LocationScreen = props => {
  const [location, setLocation] = useState(null);
  const {navigation} = props;

  // function onAuthStateChanged(user) {
  //   setUser(user);
  //   if (initializing) {
  //     setInitializing(false);
  //   }
  // }

  const handleProceed = () => {
    auth()
      .signInAnonymously()
      .then(() => {
        console.log('User signed in anonymously');
      })
      .catch(error => {
        if (error.code === 'auth/operation-not-allowed') {
          console.log('Enable anonymous in your firebase console.');
        }

        console.error(error);
      });
  };

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        const locate = position;
        setLocation(locate);
      },
      error => Alert.alert(error.message),
      {enableHighAccuracy: true},
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
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          style={styles.map}
          zoomEnabled={true}>
          <MapView.Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
          />
        </MapView>
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
});
