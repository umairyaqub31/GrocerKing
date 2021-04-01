import React, {useState, useCallback, useEffect} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import {useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';

const ChatScreen = () => {
  const room = useSelector(state => state.chat.room);
  const user = useSelector(state => state.user.user);
  const [messages, setMessages] = useState(room.messages);

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

  useEffect(() => {
    firestore()
      .collection('rooms')
      .doc(user.uid)
      .update({
        messages: messages,
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  return (
    <GiftedChat
      messages={messages}
      onSend={message => onSend(message)}
      user={{
        _id: '3qRPo6ggjKUJfWwDe2pyh02v7xR2',
      }}
    />
  );
};
export default ChatScreen;
