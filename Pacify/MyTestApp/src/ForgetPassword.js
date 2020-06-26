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
import IonicIcon from 'react-native-vector-icons/Ionicons';
import {userColor} from './Constants/colorCode';
import LinearGradient from 'react-native-linear-gradient';
import StatusBarComponent from './Constants/StatusBar';

export default function ForgetPassword(props) {
  return (
    <View style={styles.container}>
      <StatusBarComponent />
      <View style={{flex: 0.2, margin: 25}}>
        <IonicIcon
          name="ios-arrow-back"
          style={{color: userColor.light_gray}}
          size={35}
          onPress={() => props.navigation.goBack()}
        />
      </View>
      <View style={styles.formBody}>
        <Text
          style={{
            fontFamily: 'Gotham Rounded',
            fontWeight: '400',
            fontSize: 24,
            color: 'rgba(25, 118, 159, 255)',
          }}>
          Forgot Password
        </Text>
        <Text
          style={{
            fontFamily: 'Gotham Rounded',
            fontWeight: '300',
            fontSize: 16,
            marginTop: 10,
            color: 'rgba(149, 152, 154, 255)',
          }}>
          We just need your register e - mail ID to send reset link
        </Text>
        <TextInput style={styles.textInputStyle} placeholder="E-Mail" />
        <LinearGradient
          style={styles.buttonStyle}
          colors={[userColor.backgroundColor, userColor.light_blue]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}>
          <TouchableOpacity>
            <Text
              style={{
                fontFamily: 'Raleway',
                fontWeight: 'bold',
                fontSize: 16,
                color: 'rgba(255, 255, 255, 255)',
              }}>
              Reset Password
            </Text>
          </TouchableOpacity>
        </LinearGradient>
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
    flex: 0.6,
  },
  textInputStyle: {
    alignItems: 'flex-start',
    paddingStart: 16,
    width: '100%',
    height: 45,
    marginTop: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(213, 213, 213, 255)',
    backgroundColor: 'rgba(255, 255, 255, 255)',
    fontFamily: 'Gotham Rounded',
    fontSize: 14,
    color: 'rgba(149, 152, 154, 255)',
  },
  buttonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 32,
    width: '100%',
    height: 45,
    borderRadius: 5,
    backgroundColor: '#547896',
  },
});
