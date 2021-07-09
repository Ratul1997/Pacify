/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';

import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import LinearGradient from 'react-native-linear-gradient';
import colorCode from './constants/colorCode';
import normalize from './constants/normalize';
import {userAuthActions} from './actions';
import {userConstants} from './constants/userConstants';
import {connect} from 'react-redux';

import PushNotification from 'react-native-push-notification';
function CustomDrawerContent(props) {
  const {navigation, userDetails, loggedout} = props;

  console.log(userDetails);
  const onLogOut = async () => {
    console.log(userDetails, 'jjjkhikj');
    // PushNotification.unsubscribeFromTopic(userDetails.uid);
    const {error} = await userAuthActions.signOut(userDetails.acount_type);
    if (error) {
    } else {
      loggedout();
      navigation.reset({
        index: 0,
        routes: [{name: 'Login'}],
      });
    }
  };
  return (
    <LinearGradient
      style={{flex: 1}}
      colors={[colorCode.backgroundColor, colorCode.light_blue]}>
      <SafeAreaView style={{flex: 1}}>
        <View
          style={{
            height: normalize(150),
            width: '80%',
            justifyContent: 'flex-end',
            alignItems: 'center',
            alignSelf: 'center',
            marginBottom: normalize(20),
          }}>
          <Image
            style={{
              height: normalize(80),
              width: normalize(80),
              borderRadius: 50,
            }}
            source={
              userDetails.photo_url
                ? {
                    uri: userDetails.photo_url,
                  }
                : require('./Images/profile.jpg')
            }
          />
          <Text
            style={{
              fontFamily: 'Gotham Rounded',
              fontSize: normalize(23),
              color: 'white',
            }}>
            {userDetails.name}
          </Text>
        </View>

        <DrawerContentScrollView>
          <DrawerItemList
            {...props}
            activeTintColor="white"
            inactiveBackgroundColor="transparent"
            labelStyle={{color: '#ffffff'}}
          />
          <TouchableHighlight
            style={{
              marginHorizontal: normalize(10),
              //   margin
              paddingVertical: normalize(10),
            }}
            activeOpacity={1}
            underlayColor="rgba(255, 255, 255, 0.5)"
            onPress={onLogOut}>
            <Text style={{color: 'white', paddingLeft: normalize(8)}}>
              Log Out
            </Text>
          </TouchableHighlight>
        </DrawerContentScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

function mapState(state) {
  const {userDetails} = state.userReducers;
  return {userDetails};
}

const actionCreators = {
  loggedout: () => dispatch => {
    dispatch({type: userConstants.REMOVE_USER_DETAILS});
  },
};
export default connect(mapState, actionCreators)(CustomDrawerContent);
