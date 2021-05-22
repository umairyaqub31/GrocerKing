import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Colors} from '../styles';
import {useSelector} from 'react-redux';
import axios from 'axios';

const FeedBackComponent = props => {
  const [items, setItems] = useState([
    {name: "Couldn't find my item"},
    {name: 'Prices are high'},
    {name: 'Prices are reasonable'},
    {name: 'Other'},
  ]);

  const [selected, setSelected] = useState(-1);
  const [message, setMessage] = useState('');
  const user = useSelector(state => state.user.user);

  const onItemSelect = index => {
    console.log('index', index);
    setSelected(index);
  };

  const sendFeedback = async () => {
    const config = {
      headers: {
        'Content-type': 'Application/json',
      },
    };

    const body = {
      subject: items[selected].name,
      message: message,
      name: user.displayName,
      userId: user.uid,
    };

    const res = await axios.post(
      'https://us-central1-grocery-king-302815.cloudfunctions.net/api/users/feedback',
      body,
      config,
    );
    console.log('response', res.data);
    Alert.alert(`FeedBack ${res.data}!`, 'Thanks for your feedBack.', [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);
    setSelected(-1);
    setMessage('');
  };

  const onSubmit = () => {
    if (selected !== -1) {
      sendFeedback();
    } else {
      Alert.alert('Subject Missing!', 'Please a subject box first!', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <Text style={styles.headingText}>FeedBack</Text>
      </View>

      {items.map((i, index) => (
        <TouchableOpacity
          key={index}
          style={index === selected ? styles.selectedSubject : styles.subject}
          onPress={() => onItemSelect(index)}>
          <Text style={styles.subjectText}>{i.name}</Text>
        </TouchableOpacity>
      ))}

      <TextInput
        style={styles.input}
        placeholder="For any quries let us know"
        onChangeText={text => setMessage(text)}
        multiline={true}
        value={message}
        numberOfLines={5}
      />

      <TouchableOpacity style={styles.submitButton} onPress={onSubmit}>
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FeedBackComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  heading: {
    backgroundColor: '#ffd54f',
    alignItems: 'center',
    paddingVertical: 20,
  },
  headingText: {
    color: 'gray',
    fontSize: 15,
  },
  input: {
    marginVertical: 10,
    borderWidth: 1,
    borderColor: 'gray',
    paddingHorizontal: 20,
  },
  submitButton: {
    backgroundColor: Colors.primary,
    alignItems: 'center',
    paddingVertical: 15,
    elevation: 5,
  },
  submitText: {
    color: '#fff',
  },
  subject: {
    borderWidth: 1,
    // width: 200,
    alignItems: 'center',
    paddingVertical: 10,
    marginTop: 15,
    marginBottom: 5,
    borderColor: 'gray',
    marginHorizontal: 10,
  },
  selectedSubject: {
    borderWidth: 1,
    // width: 200,
    alignItems: 'center',
    paddingVertical: 10,
    marginTop: 15,
    marginBottom: 5,
    borderColor: '#FFE082',
    marginHorizontal: 10,
    backgroundColor: '#FFE082',
  },
  subjectText: {
    color: 'gray',
  },
});
