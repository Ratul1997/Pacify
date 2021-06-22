import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import RtcEngine, {
  RtcLocalView,
  RtcRemoteView,
  VideoRenderMode,
} from 'react-native-agora';

import OperateButton from './OperateButton';
import normalize from '../../constants/normalize';
export default function RenderVideo(props) {
  const {
    channelName,
    showVideo,
    endCall,
    switchCamera,
    toggleVideo,
    isSpeak,
    toggleSpeakerPhone,
    peerIds,
    toggleAllRemoteAudioStreams,
    isMute,
    videoState,
  } = props;

  const [isSelectedLocalView, setIsSelectedLocalView] = useState(false);
  const [touchOutSide, setTouchOutSide] = useState(false);
  const [isHidden, setIsHidden] = useState(true);

  const renderRemoteVideos = () => {
    return (
      peerIds.length > 0 && (
        <TouchableOpacity
          style={{
            marginTop: normalize(20),
            marginHorizontal: normalize(20),

            width: normalize(80),
            height: normalize(80),
          }}
          onPress={() => setIsSelectedLocalView(!isSelectedLocalView)}>
          {isSelectedLocalView ? (
            <RtcLocalView.SurfaceView
              style={{
                width: normalize(80),
                height: normalize(80),
                marginHorizontal: 2.5,
              }}
              channelId={channelName}
              renderMode={VideoRenderMode.Hidden}
            />
          ) : (
            <RtcRemoteView.TextureView
              style={{
                width: normalize(80),
                height: normalize(80),
                marginHorizontal: 2.5,
              }}
              uid={peerIds[0]}
              channelId={channelName}
              renderMode={VideoRenderMode.Hidden}
              zOrderMediaOverlay={true}
            />
          )}
        </TouchableOpacity>
      )
    );
  };

  const setOutSideTouch = () => {
    console.log('press');
    setIsHidden(!isHidden);
  };
  return (
    <>
      {showVideo ? (
        <TouchableWithoutFeedback onPress={setOutSideTouch}>
          {!isSelectedLocalView ? (
            <RtcLocalView.SurfaceView
              style={{height: '100%', width: '100%', position: 'absolute'}}
              channelId={channelName}
              renderMode={VideoRenderMode.Hidden}
            />
          ) : (
            <RtcRemoteView.TextureView
              style={{height: '100%', width: '100%', position: 'absolute'}}
              uid={peerIds[0]}
              channelId={channelName}
              renderMode={VideoRenderMode.Hidden}
              zOrderMediaOverlay={true}
            />
          )}
        </TouchableWithoutFeedback>
      ) : (
        <View style={{height: '100%', width: '100%', position: 'absolute'}} />
      )}

      {renderRemoteVideos()}
      {isHidden ? (
        <OperateButton
          endCall={endCall}
          switchCamera={switchCamera}
          toggleVideo={toggleVideo}
          showVideo={showVideo}
          isSpeak={isSpeak}
          toggleSpeakerPhone={toggleSpeakerPhone}
          toggleAllRemoteAudioStreams={toggleAllRemoteAudioStreams}
          isMute={isMute}
        />
      ) : null}
    </>
  );
}
