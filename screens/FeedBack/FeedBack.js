import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';
import {ScrollView} from 'react-native-gesture-handler';
import {Colors} from '../../styles';

const FeedBackScreen = ({navigation}) => {
  const user = useSelector(state => state.user.user);
  const [feedBacks, setFeedBacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    firestore()
      .collection('feedback')
      .where('userId', '==', user.uid)
      .get()
      .then(snap => {
        let temp = [];
        snap.docs.forEach(feedback => {
          let obj = feedback.data();
          temp.push(obj);
        });
        setFeedBacks(temp);
        setLoading(false);
      });

    const unsubscribe = navigation.addListener('focus', () => {
      firestore()
        .collection('feedback')
        .where('userId', '==', user.uid)
        .get()
        .then(snap => {
          let temp = [];
          snap.docs.forEach(feedback => {
            let obj = feedback.data();
            temp.push(obj);
          });
          setFeedBacks(temp);
          setLoading(false);
        });
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  return (
    <>
      {loading ? (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      ) : (
        <>
          {feedBacks.length > 0 ? (
            <ScrollView>
              {feedBacks.map(f => (
                <View style={styles.container}>
                  <Text style={styles.titleText}>Subject:</Text>
                  <Text style={styles.text}>{f.subject}</Text>

                  <Text style={styles.titleText}>Message:</Text>
                  <Text style={styles.text}>{f.message}</Text>

                  <Text style={styles.titleText}>Reply:</Text>
                  {f.reply !== undefined ? (
                    <Text style={styles.text}>{f.reply}</Text>
                  ) : (
                    <Text style={styles.text}>No reply</Text>
                  )}
                </View>
              ))}
            </ScrollView>
          ) : (
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{fontWeight: 'bold'}}>No Feedbacks!</Text>
            </View>
          )}
        </>
      )}
    </>
  );
};
export default FeedBackScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginVertical: 5,
    marginHorizontal: 5,
    backgroundColor: '#fff',
    elevation: 5,
    borderRadius: 5,
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  text: {
    fontSize: 16,
  },
});
