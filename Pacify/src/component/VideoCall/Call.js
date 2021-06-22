import React, {useState, useEffect} from 'react';
import {View, Text, Button} from 'react-native';

import io from 'socket.io-client';

let socket;
export default function Call() {
  const ENDPOINT = 'https://videoallapi.medionbd.com';
  const [isEnded, setIsEnded] = useState(true);

  useEffect(() => {
    defineSOcket();
  }, []);

  useEffect(() => {
    socket.on('endedCall', type => {
      console.log(type);
      setIsEnded(true);
    });
  }, [isEnded]);

  const onCall = () => {
    socket.emit('join', {channelName: 'ok'});
    setIsEnded(false);
  };
  const defineSOcket = () => {
    socket = io(ENDPOINT, {
      transports: ['websocket', 'polling', 'flashsocket'],
    });
    socket.emit('ok');
  };
  const onEnd = () => {
    socket.emit('onEndCall', {channelName: 'ok'});
  };
  return (
    <View>
      <Button title="Call" onPress={onCall} />
      {!isEnded && <Button title="End" onPress={onEnd} />}
    </View>
  );
}
