/**
 * @format
 * @flow strict-local
 */
import React, {Component, useState, useEffect} from 'react';
import {
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Modal,
  Button,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
} from 'react-native';
import RtcEngine, {
  RtcLocalView,
  RtcRemoteView,
  VideoRenderMode,
  VideoRemoteState,
} from 'react-native-agora';

const videoStateMessage = state => {
  switch (state) {
    case VideoRemoteState.Stopped:
      return {type: 2, msg: 'Video turned off by Host'};

    case VideoRemoteState.Frozen:
      return {type: 3, msg: 'Connection Issue, Please Wait'};

    case VideoRemoteState.Failed:
      return {type: 4, msg: 'Network Error'};
    case VideoRemoteState.Decoding:
      return {type: 1, msg: 'Start'};
  }
};
import {connect} from 'react-redux';
import requestCameraAndAudioPermission from './Permission';
import axios from 'axios';
import OperateButton from './OperateButton';
import RenderVideo from './RenderVideo';
import {doctorActions, patientActions} from '../../actions';
const dimensions = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
};

let socket;
function VideoCall(props) {
  const {navigation, route, userDetails} = props;
  const {channel, patientDetails, doctorDetails} = route.params;
  const [_engine, setEngine] = useState(undefined);
  const [appId, setAppId] = useState('cb594a754b444f8bb17cbd070dff5fbf');
  const [token, setToken] = useState('');
  const [channelName, setChannelName] = useState('');
  const [uid, setUid] = useState(0);
  const [joinSucceed, setJoinSucced] = useState(false);
  const [peerIds, setPeerIds] = useState([]);
  const [isVisible, setIsVisible] = useState(true);
  const [tmpuid, setTmpUid] = useState(channel);
  const [enabledAudio, setEnableAudio] = useState(false);
  const [enabledVideo, setEnableVideo] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeak, setIsSpeak] = useState(true);
  const [isCameraTorch, setIsCameraTorch] = useState(false);
  const [isMute, setIsMute] = useState(true);
  const [showVideo, setShowVideo] = useState(true);
  const [isLoadingJoin, setIsLoadingJoin] = useState(false);
  const [isEnded, setIsEnded] = useState(false);
  const [broadcasterVideoState, setBroadcasterVideoState] = useState(
    VideoRemoteState.Decoding,
  );

  const requestPermission = () => {
    if (Platform.OS === 'android') {
      // Request required permissions from Android
      requestCameraAndAudioPermission()
        .then(() => {
          console.log('requested!');
        })
        .catch(err => console.log(err));
    }
  };

  useEffect(() => {
    init();
    requestPermission();
  }, []);

  /**
   * @name init
   * @description Function to initialize the Rtc Engine, attach event listeners and actions
   */
  const init = async () => {
    const _engine = await RtcEngine.create(appId);
    await _engine.enableVideo();
    await _engine.enableLocalAudio(true);

    _engine.addListener('Warning', warn => {
      console.log('Warning', warn);
    });

    _engine.addListener('Error', err => {
      console.log('Error', err);
      if (err === 17) {
        _engine.leaveChannel().then(_ => {
          setPeerIds([]);
          setJoinSucced(false);
          setIsLoadingJoin(false);
          startCall(channelName, token);
        });
      }
      if (err === 18) {
        _engine.leaveChannel().then(_ => {
          setPeerIds([]);
          setJoinSucced(false);
          setIsLoadingJoin(false);
        });
      }
      if (err === 109) {
        setPeerIds([]);
        setJoinSucced(false);
        setIsLoadingJoin(false);
      }
    });

    _engine.addListener('UserJoined', (uid, elapsed) => {
      console.log('UserJoined', uid, elapsed);
      // Get current peer IDs
      // If new user
      if (peerIds.indexOf(uid) === -1) {
        // Add peer ID to state array
        setPeerIds([...peerIds, uid]);
      }
    });

    _engine.addListener('UserOffline', (uid, reason) => {
      console.log('UserOffline', uid, reason);
      setPeerIds(peerIds.filter(id => id !== uid));
    });

    // If Local user joins RTC channel
    _engine.addListener('JoinChannelSuccess', (channel, uid, elapsed) => {
      console.log('JoinChannelSuccess', channel, uid, elapsed);
      // Set state variable to true

      setIsLoadingJoin(true);
      setJoinSucced(true);
    });

    _engine.addListener('RemoteVideoStateChanged', (uid, state) => {
      setBroadcasterVideoState(state);
      console.log(uid);
    });

    setEngine(_engine);
  };

  const toggleVideo = async () => {
    console.log(showVideo);
    const newShowVideo = !showVideo;

    setShowVideo(newShowVideo);
    if (newShowVideo) {
      await _engine.enableVideo();
      await _engine.startPreview();
    } else {
      await _engine.disableVideo();
      await _engine.stopPreview();
    }
  };
  const getAuthKey = () => {
    console.log('preessed');
    setIsLoading(true);
    axios
      .post('https://videoallapi.medionbd.com/rtcServer', {
        headers: {
          'Content-Type': 'application/json',
        },
        channelName: tmpuid.toLowerCase(),
      })
      .then(res => {
        console.log(res.data);
        setToken(res.data.tokens);
        setIsVisible(false);
        setIsLoading(false);
        setChannelName(tmpuid.toLowerCase());
        startCall(tmpuid.toLowerCase(), res.data.tokens);
      })
      .catch(err => {
        console.log(err);
        setChannelName('');
        setTmpUid('');
        setIsLoading(false);
      });
  };

  const startCall = async (channelName, token) => {
    // Join Channel using null token and channel name

    setIsLoadingJoin(true);
    console.log('data', token, channelName);
    await _engine?.joinChannel(token, channelName, null, 0);
  };

  /**
   * @name endCall
   * @description Function to end the call
   */
  const endCall = async () => {
    await _engine?.leaveChannel();
    setPeerIds([]);
    setJoinSucced(false);
    setIsLoadingJoin(false);
    if (userDetails.type === 2) {
      const {error} = await doctorActions.storeOnHistory(
        patientDetails,
        doctorDetails,
        channelName,
      );
      await doctorActions.sendNotification(
        patientDetails.uid,
        'End',
        JSON.stringify(userDetails),
      );
      if (error) {
        alert('Something Went Wrong');
      } else {
        navigation.goBack();
      }
    } else {
      const {error} = await patientActions.storeOnHistory(
        patientDetails,
        doctorDetails,
        channelName,
      );
      if (error) {
        alert('Something Went Wrong');
      } else {
        navigation.replace('Review', {item: doctorDetails});
      }
    }
  };

  const muteCall = async () => {
    await _engine?.enableLocalAudio(!enabledAudio);
    setEnableAudio(!enabledAudio);
  };

  const disableVideo = async () => {
    setEnableVideo(!enabledVideo);
    await _engine?.enableLocalVideo(!enabledVideo);
  };

  const switchCamera = async () => {
    _engine?.switchCamera();
  };

  const toggleAllRemoteAudioStreams = async () => {
    await _engine?.enableLocalAudio(!isMute);
    setIsMute(!isMute);
  };

  const toggleSpeakerPhone = async () => {
    await engine?.setDefaultAudioRoutetoSpeakerphone(isSpeak);
    setIsSpeak(!isSpeak);
  };

  const toggleCameraTorch = async () => {
    await engine?.setCameraTorchOn(isCameraTorch).then(val => {
      console.log('setCameraTorch', val);
    });
    setIsCameraTorch(!isCameraTorch);
  };

  const _renderVideos = () => {
    return (
      <RenderVideo
        channelName={channelName}
        showVideo={showVideo}
        endCall={endCall}
        switchCamera={switchCamera}
        toggleVideo={toggleVideo}
        toggleSpeakerPhone={toggleSpeakerPhone}
        isSpeak={isSpeak}
        peerIds={peerIds}
        toggleAllRemoteAudioStreams={toggleAllRemoteAudioStreams}
        isMute={isMute}
        videoState={videoStateMessage(broadcasterVideoState)}
      />
    );
  };
 
  const renderChannelNameView = () => {
    return (
      <>
        <Button title="Join" onPress={getAuthKey} />
      </>
    );
  };
  const renderIsLoading = title => {
    return (
      <View style={{flexDirection: 'row'}}>
        <ActivityIndicator size="small" color="blue" />
        <Text>{title}</Text>
      </View>
    );
  };
  return (
    <View style={styles.max}>
      {joinSucceed ? (
        _renderVideos()
      ) : (
        <View
          style={{
            justifyContent: 'space-around',
            alignItems: 'center',
            backgroundColor: 'white',
            height: 200,
            width: '80%',
            borderRadius: 10,
            borderWidth: 1,
            borderColor: '#fff',
            marginTop: 80,
            marginVertical: 40,
            alignSelf: 'center',
          }}>
          {isLoading
            ? renderIsLoading('Preparing Meeting')
            : isLoadingJoin
            ? renderIsLoading('Connecting To Meeting')
            : renderChannelNameView()}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  max: {
    flex: 1,
  },
  buttonHolder: {
    height: 100,
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#0093E9',
    borderRadius: 25,
  },
  buttonText: {
    color: '#fff',
  },
  fullView: {
    width: dimensions.width,
    height: dimensions.height - 100,
  },
  remoteContainer: {
    width: '100%',
    height: 150,
    position: 'absolute',
    top: 5,
  },
  remote: {
    width: 150,
    height: 150,
    marginHorizontal: 2.5,
  },
  noUserText: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: '#0093E9',
  },
});
function mapState(state) {
  const {userDetails} = state.userReducers;
  return {userDetails};
}
const actionCreators = {};
export default connect(mapState, actionCreators)(VideoCall);
