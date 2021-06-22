/* eslint-disable react-native/no-inline-styles */
import React, {Component, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import LinearGradient from 'react-native-linear-gradient';
import colorCode from '../../constants/colorCode';
import normalize from '../../constants/normalize';
import {connect} from 'react-redux';
import messaging from '@react-native-firebase/messaging';

import PushNotification from 'react-native-push-notification';
import {Image} from 'react-native-elements';
import {doctorActions} from '../../actions';
import ActivityIndicatorComponent from '../../common/ActivityIndicatorComponent';
function DoctorProfile({navigation, userDetails}) {
  useEffect(() => {
    PushNotification.subscribeToTopic(userDetails.uid);
  }, []);
  // useEffect(() => {
  //   const unsubscribe = messaging().onMessage(async remoteMessage => {
  //     // alert(remoteMessage.data.content);

  //     const {content} = remoteMessage.data;
  //     const requestUserInfo = JSON.parse(remoteMessage.data.type);
  //     notifications(
  //       requestUserInfo,
  //       remoteMessage.sentTime,
  //       remoteMessage.data.content,
  //     );
  //   });

  //   return unsubscribe;
  // }, []);
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
    } else if (content === 'Paid') {
      msg = 'has paid your fees';
    }
    await doctorActions.storeNotification(
      userDetails,
      time,
      requestUserInfo,
      msg,
    );
  };
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
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
          <Text style={{color: 'white', fontSize: normalize(22)}}>Profile</Text>
        </TouchableOpacity>
      </LinearGradient>

      <View
        style={{
          flex: 0.9,
        }}>
        <View
          style={{
            marginTop: normalize(15),
            padding: normalize(15),
            flexDirection: 'row',
            borderBottomColor: colorCode.light_gray,
            borderBottomWidth: 0.5,
          }}>
          <Image
            style={styles.proPic}
            source={
              userDetails.photo_url
                ? {
                    uri: userDetails.photo_url,
                  }
                : require('../../Images/profile.jpg')
            }
            PlaceholderContent={
              <ActivityIndicatorComponent size="small" color="green" />
            }
            placeholderStyle={{
              height: Dimensions.get('window').width * 0.2,
              width: Dimensions.get('window').width * 0.2,
              borderRadius: (Dimensions.get('window').width * 0.2) / 2,
            }}
          />
          <Image
            style={{
              position: 'absolute',
              top: Dimensions.get('window').width * 0.09,
              left: Dimensions.get('window').width * 0.08,
              borderRadius: 50,
              borderWidth: 1,
              borderColor: '#fff',
            }}
            source={require('../../Images/online.png')}
          />
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'flex-start',
            }}>
            <Text
              style={{
                fontSize: normalize(18),
                color: colorCode.backgroundColor,
                fontFamily: 'Gotham Rounded',
              }}>
              {userDetails.name}
            </Text>

            <View style={{flexDirection: 'column'}}>
              {userDetails.selected_areas &&
                userDetails.selected_areas.map((items, key) => {
                  return (
                    <Text
                      style={{
                        color: colorCode.light_gray,
                        fontSize: normalize(12),
                      }}
                      key={key}>
                      {items + ', '}
                    </Text>
                  );
                })}
            </View>
          </View>
        </View>
        <View
          style={{
            padding: normalize(15),
            borderBottomColor: colorCode.light_gray,
            borderBottomWidth: 0.5,
          }}>
          <Text
            style={{
              fontFamily: 'Gotham Rounded',
              fontSize: normalize(18),
              color: colorCode.backgroundColor,
            }}>
            Fees
          </Text>
          <Text
            style={{
              fontFamily: 'Gotham Rounded',
              color: colorCode.light_gray,
              paddingLeft: normalize(10),
              fontSize: normalize(12),
            }}>
            BDT {userDetails.fees}
          </Text>
        </View>
        <View
          style={{
            padding: normalize(15),
            borderBottomColor: colorCode.light_gray,
            borderBottomWidth: 0.5,
          }}>
          <Text
            style={{
              fontFamily: 'Gotham Rounded',
              fontSize: normalize(18),
              color: colorCode.backgroundColor,
            }}>
            Address & Timing
          </Text>
          <View
            style={{
              paddingLeft: normalize(10),
              paddingTop: normalize(10),
              flexDirection: 'row',
              alignContent: 'center',
            }}>
            <SimpleLineIcons
              name="location-pin"
              color={colorCode.light_green}
              size={17}></SimpleLineIcons>
            <Text
              style={{
                fontFamily: 'Gotham Rounded',
                textAlign: 'center',
                paddingLeft: normalize(10),
                fontSize: normalize(12),
                color: colorCode.light_gray,
              }}>
              BERDEM
            </Text>
          </View>
          <View
            style={{
              paddingLeft: normalize(10),
              paddingTop: normalize(5),
              flexDirection: 'row',
              alignContent: 'center',
            }}>
            <SimpleLineIcons
              name="clock"
              color={colorCode.light_green}
              size={17}></SimpleLineIcons>
            <Text
              style={{
                fontFamily: 'Gotham Rounded',
                textAlign: 'center',
                paddingLeft: normalize(10),
                fontSize: normalize(12),
                color: colorCode.light_gray,
              }}>
              11:00 AM to 1.00 PM
            </Text>
          </View>
        </View>
        <View
          style={{
            padding: normalize(15),
            borderBottomColor: colorCode.light_gray,
            borderBottomWidth: 0.5,
          }}>
          <Text
            style={{
              fontFamily: 'Gotham Rounded',
              fontSize: normalize(18),
              color: colorCode.backgroundColor,
            }}>
            Certifications
          </Text>

          <View
            style={{
              paddingLeft: normalize(10),
              paddingTop: normalize(10),
              flexDirection: 'row',
              alignContent: 'center',
            }}>
            <Text
              style={{
                fontFamily: 'Gotham Rounded',
                textAlign: 'center',
                paddingLeft: normalize(10),
                fontSize: normalize(12),
                color: colorCode.light_gray,
              }}>
              {userDetails.qualifications}
            </Text>
          </View>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
          <LinearGradient
            colors={[colorCode.backgroundColor, colorCode.light_blue]}
            style={{
              backgroundColor: colorCode.backgroundColor,
              justifyContent: 'center',
              width: '50%',
              alignItems: 'center',
              alignSelf: 'center',
              margin: normalize(20),
              borderRadius: normalize(5),
              padding: normalize(15),
            }}>
            <Text style={{color: 'white', fontSize: normalize(16)}}>
              Edit Profile
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  proPic: {
    height: Dimensions.get('window').width * 0.2,
    width: Dimensions.get('window').width * 0.2,
    borderRadius: (Dimensions.get('window').width * 0.2) / 2,
    borderWidth: 1,
    borderColor: '#fff',
    margin: normalize(15),
    justifyContent: 'center',
    alignSelf: 'center',
    padding: normalize(15),
  },
});
function mapState(state) {
  const {userDetails} = state.userReducers;
  return {userDetails};
}

const actionCreators = {};
export default connect(mapState, actionCreators)(DoctorProfile);
