/* eslint-disable react-native/no-inline-styles */
import React, {Component, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {userColor, normalize} from '../Constants/colorCode';
import BackButton from '../Constants/BackButton';
import LinearGradient from 'react-native-linear-gradient';
import FeactherIcon from 'react-native-vector-icons/Feather';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import IonicIcon from 'react-native-vector-icons/Ionicons';
import StatusBarComponent from '../Constants/StatusBar';
import FontAwsome from 'react-native-vector-icons/FontAwesome';
import {BlurView, VibrancyView} from '@react-native-community/blur';

export default function Doctor(props) {
  return (
    <View style={{flex: 1}}>
      <BlurView
        style={{position: 'absolute', left: 0, top: 0, bottom: 0, right: 0}}
        blurRadius={1}
        blurType="dark"
        blurRadius={10}
      />
      <StatusBarComponent />
      <BackButton title="Doctor" onPress={() => props.navigation.goBack()} />
      <View
        style={{
          flex: 0.7,
        }}>
        <View
          style={{
            flex: 0.4,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
          }}>
          <Image style={styles.proPic} source={require('../Images/pro.jpg')} />
          <Image
            style={{
              position: 'absolute',
              top: Dimensions.get('window').width * 0.07,
              left: Dimensions.get('window').width * 0.35,
              borderRadius: 50,
              borderWidth: 1,
              borderColor: '#fff',
            }}
            source={require('../Images/online.png')}
          />
          <Text
            style={{
              color: userColor.text_color,
              fontSize: normalize(15),
              fontFamily: 'Gotham Rounded',
              textAlign: 'center',
            }}>
            Ratul Votka
          </Text>
          <Text
            style={{fontFamily: 'Gotham Rounded', color: userColor.light_gray}}>
            Predictionist
          </Text>
          <Text
            style={{fontFamily: 'Gotham Rounded', color: userColor.light_gray}}>
            MBBS
          </Text>
        </View>
        <View
          style={{
            flex: 0.3,
            alignItems: 'center',
            backgroundColor: 'white',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              // alignItems: 'center',
              width: '100%',
              padding: 15,
            }}>
            <TouchableOpacity
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <FeactherIcon
                name="phone-call"
                size={25}
                color={userColor.light_blue}
              />
              <Text
                style={{
                  color: userColor.text_color,
                  fontFamily: 'Gotham Rounded',
                }}>
                Call
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <FeactherIcon
                name="star"
                size={25}
                color={userColor.light_blue}
              />
              <Text
                style={{
                  color: userColor.text_color,
                  fontFamily: 'Gotham Rounded',
                }}>
                (75236 )
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <FontAwsome name="money" size={25} color={userColor.light_blue} />
              <Text
                style={{
                  color: userColor.text_color,
                  fontFamily: 'Gotham Rounded',
                }}>
                1520
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              borderTopColor: userColor.light_blue,
              borderTopWidth: 1,
            }}>
            <View style={{width: '90%', flexDirection: 'row', padding: 10}}>
              <EvilIcons
                name="user"
                size={30}
                style={{padding: 2}}
                color={userColor.light_blue}
              />
              <Text
                style={{
                  fontSize: normalize(14),
                  paddingLeft: 15,
                  color: userColor.light_gray,
                  fontFamily: 'Gotham Rounded',
                }}>
                Qualifications & Practice
              </Text>
            </View>
            <IonicIcon
              name="ios-arrow-forward"
              style={{width: '10%', padding: 10}}
              size={20}
              color={userColor.light_blue}
            />
          </View>
        </View>
        <View style={{flex: 0.2, justifyContent: 'center'}}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Payment')}>
            <LinearGradient
              colors={[userColor.backgroundColor, userColor.light_blue]}
              style={{
                backgroundColor: userColor.backgroundColor,
                justifyContent: 'center',
                width: '60%',
                alignItems: 'center',
                alignSelf: 'center',
                margin: 20,
                height: Dimensions.get('window').width * 0.1,
                borderRadius: 5,
                padding: 15,
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: normalize(14),
                  fontFamily: 'Gotham Rounded',
                }}>
                Book Appointment
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  ImageStyle: {
    height: 100,
    width: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: userColor.bordergrey,
  },
  proPic: {
    height: Dimensions.get('window').width * 0.2,
    width: Dimensions.get('window').width * 0.2,
    borderRadius: (Dimensions.get('window').width * 0.2) / 2,
    borderWidth: 1,
    borderColor: '#fff',
    margin: 15,
    justifyContent: 'center',
    alignSelf: 'center',
    padding: 15,
  },
});
