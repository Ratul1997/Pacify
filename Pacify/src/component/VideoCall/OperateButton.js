import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Dimensions} from 'react-native';

import Feather from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colorCode from '../../constants/colorCode';
import normalize from '../../constants/normalize';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const BtnEndCall = () => (
  <MaterialIcon name="call-end" size={normalize(25)} color="white" />
);
const BtnReceiveCall = () => (
  <MaterialIcon name="call" size={normalize(25)} color="white" />
);
const BtnUnMute = () => (
  <Ionicons name="mic" size={normalize(25)} color="white" />
);
const BtnSpeaker = () => (
  <Ionicons name="volume-medium-sharp" size={normalize(25)} color="white" />
);
const BtnSwitchCamera = () => (
  <MaterialIcon name="flip-camera-android" size={normalize(15)} color="white" />
);
const EnableCamera = () => (
  <Ionicons name="camera" size={normalize(15)} color="white" />
);
const DisableCamera = () => (
  <Feather name="camera-off" size={normalize(15)} color="white" />
);
const BtnMute = () => (
  <Ionicons name="mic-off" size={normalize(25)} color="white" />
);
const BtnHeadSpeaker = () => (
  <Ionicons name="volume-mute" size={normalize(25)} color="white" />
);

export default function OperateButton(props) {
  const isCalling = false;

  const {
    endCall,
    switchCamera,
    toggleVideo,
    showVideo,
    isSpeak,
    toggleSpeakerPhone,
    isMute,
    toggleAllRemoteAudioStreams,
  } = props;

  const [showEndCall, setShowEndCall] = useState(false);

  const toggleEndCall = () => {
    setShowEndCall(!showEndCall);
  };
  return (
    <>
      <TouchableOpacity
        style={{
          height: normalize(30),
          width: normalize(30),
          borderRadius: 30,
          backgroundColor: 'gray',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          right: normalize(50),
          top: normalize(15),
        }}
        onPress={switchCamera}>
        <BtnSwitchCamera />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          height: normalize(30),
          width: normalize(30),
          borderRadius: 30,
          backgroundColor: 'gray',
          justifyContent: 'center',
          alignItems: 'center',
          top: normalize(15),
          position: 'absolute',
          right: normalize(15),
        }}
        onPress={toggleVideo}>
        {showVideo ? <DisableCamera /> : <EnableCamera />}
      </TouchableOpacity>
      {showEndCall && (
        <View
          style={{
            height: normalize(100),
            width: normalize(150),
            borderRadius: 10,
            position: 'absolute',
            backgroundColor: '#484848',
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 4,
            borderColor: 'black',
            top: HEIGHT / 3,
            left: WIDTH / 3.5,
          }}>
          <TouchableOpacity
            style={{
              height: normalize(50),
              width: normalize(150),
              borderRadius: 10,
              backgroundColor: 'red',
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 4,
              borderColor: 'black',
            }}
            onPress={endCall}>
            <Text style={{fontSize: normalize(15), color: 'white'}}>
              Leave Call
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              height: normalize(50),
              width: normalize(150),
              borderRadius: 50,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={toggleEndCall}>
            <Text style={{fontSize: normalize(15), color: 'white'}}>
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      )}
      <View
        style={{
          flexDirection: 'row',
          position: 'absolute',
          bottom: normalize(20),
          justifyContent: 'center',
          alignItems: 'center',
          //   backgroundColor:'red',
          width: '70%',
          alignSelf: 'center',
        }}>
        {/* {isCalling ? (
          <TouchableOpacity
            style={{
              height: normalize(50),
              width: normalize(50),
              borderRadius: 30,
              backgroundColor: 'green',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <BtnReceiveCall />
          </TouchableOpacity>
        ) : (
          <>
            <TouchableOpacity
              style={{
                height: normalize(50),
                width: normalize(50),
                borderRadius: 50,
                backgroundColor: 'gray',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={toggleAllRemoteAudioStreams}>
              {!isMute ? <BtnUnMute /> : <BtnMute />}
            </TouchableOpacity>
          </>
        )} */}

        <TouchableOpacity
          style={{
            height: normalize(50),
            width: normalize(50),
            borderRadius: 50,
            backgroundColor: 'red',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={toggleEndCall}>
          <BtnEndCall />
        </TouchableOpacity>
      </View>
    </>
  );
}
