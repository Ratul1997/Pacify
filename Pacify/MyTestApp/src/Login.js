/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import BackButton from './Constants/BackButton';
import LinearGradient from 'react-native-linear-gradient';
import {userColor, normalize} from './Constants/colorCode';
import Evillcons from 'react-native-vector-icons/EvilIcons';

import Entypo from 'react-native-vector-icons/Entypo';
import StatusBarComponent from './Constants/StatusBar';
export default function App(props) {
  return (
    <View style={styles.container}>
      <StatusBarComponent />
      <View style={{flex: 1}}></View>
      <View style={styles.formBody}>
        {/* headder name */}
        <View style={{flex: 1}}>
          <Text
            style={{
              fontFamily: 'Gotham Rounded',
              fontWeight: '400',
              fontSize: normalize(24),
              color: 'rgba(25, 118, 159, 255)',
            }}>
            Sign In
          </Text>
        </View>

        {/* ttext input */}
        <View>
          <TextInput style={styles.textInputStyle} placeholder="E-Mail" />
          <TextInput style={styles.textInputStyle} placeholder="Password" />
        </View>

        {/*remember and frogot password*/}
        <View
          style={{
            flex: 0.5,
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={{
                width: 15,
                height: 15,
                borderRadius: 15 / 2,
                borderWidth: 2,
                borderColor: 'rgba(213, 213, 213, 255)',
                backgroundColor: 'rgba(25, 118, 159, 255)',
                marginStart: 6,
              }}
            />
            <Text
              style={styles.textStyle1}
              style={{color: 'rgba(149, 152, 154, 255)'}}>
              Remember
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('forgetpass')}>
            <Text
              style={styles.textStyle1}
              style={{color: 'rgba(149, 152, 154, 255)'}}>
              Forget Password ?
            </Text>
          </TouchableOpacity>
        </View>

        {/*buttons*/}
        <View style={{flex: 3}}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('doctorOrPatient')}>
            <LinearGradient
              style={styles.buttonStyle}
              colors={[userColor.backgroundColor, userColor.light_blue]}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}>
              <Text
                style={{
                  fontFamily: 'Raleway',
                  fontWeight: 'bold',
                  fontSize: normalize(16),
                  color: 'rgba(255, 255, 255, 255)',
                }}>
                Sign In
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          <Text
            style={{
              fontFamily: 'Raleway',
              fontSize: normalize(14),
              color: 'rgba(149, 152, 154, 255)',
              alignSelf: 'center',
              marginBottom: 20,
            }}>
            Or
          </Text>
          <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
            <TouchableOpacity style={styles.iconButton}>
              <Evillcons name="sc-facebook" size={30} color="blue" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Entypo name="google-" size={25} color="red" />
            </TouchableOpacity>
          </View>
        </View>

        {/*create avvount*/}
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
          <Text
            style={styles.textStyle1}
            style={{color: 'rgba(149, 152, 154, 255)'}}>
            Don 't Have Account ?
          </Text>
          <TouchableOpacity>
            <Text style={styles.textStyle1}>Create Account.</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 255)',
  },
  formBody: {
    paddingStart: 28,
    paddingEnd: 28,
    flex: 5,
  },
  textInputStyle: {
    alignItems: 'flex-start',
    paddingStart: 16,
    width: '100%',
    height: 45,
    marginBottom: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(213, 213, 213, 255)',
    backgroundColor: 'rgba(255, 255, 255, 255)',
    fontFamily: 'Gotham Rounded',
    fontSize: normalize(14),
    color: 'rgba(149, 152, 154, 255)',
  },
  buttonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    width: '100%',
    height: 45,
    borderRadius: 5,
    backgroundColor: '#547896',
  },
  iconButton: {
    width: '48%',
    height: 41,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(213, 213, 213, 255)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle1: {
    fontFamily: 'Gotham Rounded',
    fontWeight: '400',
    fontSize: normalize(14),
    color: 'rgba(25, 118, 159, 255)',
  },
});
