/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import colorCode from '../../constants/colorCode';
import normalize from '../../constants/normalize';
import BackButton from '../../constants/BackButton';
import {connect} from 'react-redux';
import {patientActions} from '../../actions';
function Payment({navigation, route, userDetails}) {
  const {item} = route.params;
  const onCompletePayment = async () => {
    const {error} = await patientActions.onCompletePayment(
      'Complete',
      userDetails,
      item,
    );
    if (error) {
      alert('Something Went Wrong');
    } else {
      const {error} = patientActions.sendNotification(
        item.uid,
        'Paid',
        JSON.stringify(userDetails),
      );
      navigation.goBack();
    }
  };
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <BackButton title="Payment" onPress={() => navigation.goBack()} />
      <View
        style={{
          flex: 0.9,
        }}>
        <View style={{flex: 0.3, justifyContent: 'center'}}>
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              width: '55%',
              alignItems: 'center',
              alignSelf: 'center',
              margin: normalize(20),
              borderRadius: 5,
              padding: normalize(15),
              backgroundColor: colorCode.backgroundColor,
            }}
            onPress={onCompletePayment}>
            <Text
              style={{
                fontFamily: 'Gotham Rounded',
                color: 'white',
                fontSize: normalize(16),
              }}>
              Complete Payment
            </Text>
          </TouchableOpacity>
        </View>
        <LinearGradient
          colors={[colorCode.backgroundColor, colorCode.light_blue]}
          style={{
            backgroundColor: colorCode.backgroundColor,
            flex: 0.65,
            width: '75%',
            borderRadius: 5,
            justifyContent: 'center',
            alignSelf: 'center',
          }}>
          <View
            style={{
              padding: normalize(15),
              flex: 1,
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                padding: normalize(15),
                flex: 0.3,
                borderBottomColor: 'white',
                borderBottomWidth: 0.3,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignContent: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: 'Gotham Rounded',
                    fontSize: normalize(20),
                    color: 'white',
                  }}>
                  BDT
                </Text>
                <Text
                  style={{
                    fontFamily: 'Gotham Rounded',
                    fontSize: normalize(20),
                    color: 'white',
                    paddingLeft: normalize(5),
                  }}>
                  {item.fees}
                </Text>
              </View>
              <Text
                style={{
                  fontSize: normalize(12),
                  color: 'white',
                  padding: normalize(5),
                  textAlign: 'center',
                  fontFamily: 'Gotham Rounded',
                }}>
                For a single conversation
              </Text>
            </View>
            <View
              style={{
                padding: normalize(15),
                backgroundColor: 'transparent',
                flex: 0.4,
                justifyContent: 'space-around',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontFamily: 'Gotham Rounded',
                  fontSize: normalize(17),
                  color: 'white',
                  textAlign: 'center',
                }}>
                {item.name}
              </Text>
              <Text
                style={{
                  fontFamily: 'Gotham Rounded',
                  fontSize: normalize(17),
                  color: 'white',
                  paddingLeft: normalize(5),
                }}>
                Duration: 15min
              </Text>
            </View>
            <TouchableOpacity
              style={{
                justifyContent: 'center',
                width: '80%',
                alignItems: 'center',
                alignSelf: 'center',
                margin: normalize(20),
                borderRadius: 5,
                padding: normalize(15),
                borderColor: 'white',
                borderWidth: 1,
              }}>
              <Text
                style={{
                  fontFamily: 'Gotham Rounded',
                  color: 'white',
                  fontSize: normalize(20),
                }}>
                Pay
              </Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    </View>
  );
}
function mapState(state) {
  const {userDetails} = state.userReducers;
  return {userDetails};
}
const actionCreators = {};
export default connect(mapState, actionCreators)(Payment);
