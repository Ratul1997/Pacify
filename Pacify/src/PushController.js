import React, {Component, useEffect} from 'react';
import PushNotification from 'react-native-push-notification';
import userConstants from './constants/userConstants';
import {connect} from 'react-redux';
function PushController({startCall, endCall}) {
  useEffect(() => {
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function(token) {
        console.log('TOKEN:', token);
      },

      // (required) Called when a remote or local notification is opened or received
      onNotification: function(notification) {
        console.log('NOTIFICATION:', notification);
        if (notification.foreground) {
          sendLocalNotification(notification);
        }
        processNotifications(notification);

        // process the notification here
      },
      // Android only
      senderID: '415633290918',
      // iOS only
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: true,
    });
  }, []);

  const sendLocalNotification = notification => {
    // PushNotification.localNotification({
    //   title: notification.title,
    //   message: notification.message,
    //   channelId: notification.channelId,
    // });
  };
  const processNotifications = notification => {
    if (notification.data.type) {
      const requestUserInfo = JSON.parse(notification.data.type);
      switch (notification.data.content) {
        case 'Call':
          return startCall(requestUserInfo);
        case 'End':
          return endCall();
        default:
          return;
      }
    }
  };

  return null;
}
function mapState(state) {
  return {};
}
const actionCreators = {
  startCall: user => dispatch => dispatch({type: 'ON_CALLING', user}),
  endCall: () => dispatch => dispatch({type: 'REMOVE_CALLING'}),
};
export default connect(mapState, actionCreators)(PushController);
