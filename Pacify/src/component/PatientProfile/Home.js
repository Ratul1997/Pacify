import React, {Component, useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import colorCode from '../../constants/colorCode';
import normalize from '../../constants/normalize';
import {connect} from 'react-redux';
import messaging from '@react-native-firebase/messaging';
import {userConstants} from '../../constants/userConstants';
import OnCall from './OnCall';
import {patientActions} from '../../actions';

const Data = [
  {
    id: '1',
    title: 'Drug Addiction',
    imageName: require('../../assets/drugs.png'),
  },
  {
    id: '2',
    title: 'Parenting',
    imageName: require('../../assets/Parentings.png'),
  },
  {
    id: '3',
    title: 'Family Problem',
    imageName: require('../../assets/familys.png'),
  },
  {
    id: '4',
    title: 'Gender Violence',
    imageName: require('../../assets/genders.png'),
  },
  {
    id: '5',
    title: 'Career Issues',
    imageName: require('../../assets/careers.png'),
  },
  {
    id: '6',
    title: 'Depression',
    imageName: require('../../assets/Depressions.png'),
  },
];
function Home({navigation, userDetails, startCall, endCall, requestedUser}) {
  useEffect(() => {
    messaging().subscribeToTopic(userDetails.uid);
  }, []);
  console.log(requestedUser)
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      // alert(remoteMessage.data.content);

      const requestUserInfo = JSON.parse(remoteMessage.data.type);
      notifications(
        requestUserInfo,
        remoteMessage.sentTime,
        remoteMessage.data.content,
      );
      switch (remoteMessage.data.content) {
        case 'Call':
          return startCall(requestUserInfo);
        case 'End':
          return endCall();
        default:
          return;
      }
    });

    return unsubscribe;
  }, []);

  const notifications = async (requestUserInfo, time, content) => {
    let msg = '';

    if (content === 'Call') {
      msg = 'has started call';
    } else if (content === 'End') {
      msg = 'has ended call';
    } else if (content === 'Request') {
      msg = 'has requested a booking';
    } else if (content === 'Approved') {
      msg = 'has approved your appointment';
    } else if (content === 'Delete') {
      msg = 'has cancelled your appointment';
    }

    const {error} = await patientActions.storeNotification(
      userDetails,
      time,
      requestUserInfo,
      msg,
    );
    console.log(error);
  };
  const onJoinCall = () => {
    navigation.navigate('VideoCall', {
      channel: requestedUser.key,
      patientDetails: userDetails,
      doctorDetails: requestedUser,
      type: 1,
    });
  };
  return (
    <View style={{flex: 1, backgroundColor: colorCode.white}}>
      <LinearGradient
        colors={[colorCode.backgroundColor, colorCode.light_blue]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={{
          flex: 0.1,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          style={{
            position: 'absolute',
            top: 0,
            left: 20,
            bottom: 0,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => navigation.openDrawer()}>
          <MaterialIcon
            name="menu"
            style={{color: 'white'}}
            size={normalize(25)}
          />
        </TouchableOpacity>
        <TouchableOpacity style={{}}>
          <Text style={{color: 'white', fontSize: normalize(22)}}>
            Select Service
          </Text>
        </TouchableOpacity>
      </LinearGradient>
      {requestedUser && <OnCall item={requestedUser} onPress={onJoinCall} />}
      <FlatList
        style={{alignSelf: 'center', flex: 0.9, marginBottom: normalize(10)}}
        data={Data}
        numColumns={2}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.itemStyle}
            onPress={() =>
              navigation.navigate('DoctorList', {title: item.title})
            }>
            <Image source={item.imageName} />
            <Text
              style={{
                color: colorCode.darkGrey,
                fontSize: normalize(13),
                marginTop: normalize(5),
                fontFamily: 'Gotham Rounded',
              }}>
              {item.title}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  itemStyle: {
    marginTop: normalize(18),
    marginEnd: normalize(7),
    marginStart: normalize(7),
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width * 0.4,
    height: normalize(140),
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colorCode.pest,
    backgroundColor: colorCode.white,
    elevation: 4,
  },
});
function mapState(state) {
  const {userDetails} = state.userReducers;
  const {requestedUser} = state.callingReducer;
  return {userDetails, requestedUser};
}
const actionCreators = {
  startCall: user => dispatch =>
    dispatch({type: userConstants.ON_CALLING, user}),
  endCall: () => dispatch => dispatch({type: userConstants.REMOVE_CALLING}),
};
export default connect(mapState, actionCreators)(Home);
