/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Evillcons from 'react-native-vector-icons/EvilIcons';

import Entypo from 'react-native-vector-icons/Entypo';
import normalize from '../../constants/normalize';
import colorCode from '../../constants/colorCode';

import auth from '@react-native-firebase/auth';

import {userAuthActions} from '../../actions';
import ActivityIndicatorComponent from '../../common/ActivityIndicatorComponent';
import {validation} from '../../helpers';
import {userConstants} from '../../constants/userConstants';
import {connect} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
function Login({navigation, storedata, storeLoginAuth, removeSignUpData}) {
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSignUpLoading, setIsEmailSignUpLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onGoogleButtonPress = async () => {
    setIsLoading(true);
    const {
      isNewUser,
      user,
      error,
      providerId,
    } = await userAuthActions.googleSignUp();
    if (error) {
      alert(error);
      setIsLoading(false);
    } else {
      setIsLoading(false);
      console.log(isNewUser, user);
      if (isNewUser) {
        goToSignUpPage(user);
      } else {
        fetchUserInformation(user.uid, 'google');
      }
    }
  };

  const fetchUserInformation = async (uid, type) => {
    try {
      console.log(uid);
      type === 'google' ? setIsLoading(true) : setIsEmailSignUpLoading(true);
      const user = await firestore()
        .collection('Users')
        .doc(uid)
        .get();
      console.log(user._data);
      removeSignUpData();
      storeLoginAuth(user._data);

      type === 'google' ? setIsLoading(false) : setIsEmailSignUpLoading(false);
      goToHomePage(user._data);
    } catch (error) {
      type === 'google' ? setIsLoading(false) : setIsEmailSignUpLoading(false);
      alert('Something went wrong');
    }
  };
  const checkEmailOrPasswordEmpty = () => {
    if (email.length === 0) return {type: false, msg: 'Email Is Empty'};
    if (password.length === 0) return {type: false, msg: 'Password Is Empty'};
    if (!validation.checkValidEmail(email))
      return {type: false, msg: 'Email is not valid'};
    if (password.length < 8)
      return {
        type: false,
        msg: 'Password Is Required Minimum 8 Characters Long',
      };

    return {
      type: true,
    };
  };
  const goToSignUpPage = user => {
    console.log(user);
    const profileInformation = {
      name: user.displayName,
      email: user.email,
      phone_number: user.phoneNumber ? user.phone_number : '',
      photo_url: user.photoURL,
      uid: user.uid,
    };
    storedata(profileInformation);
    navigation.push('doctorOrPatient', {
      screen: 'ChooseOption',
      params: {type: 'google'},
    });
  };
  const goToHomePage = user => {
    navigation.replace(user.type === 1 ? 'PatientHome' : 'DocHome');
  };
  const signIn = async () => {
    const validate = checkEmailOrPasswordEmpty();
    if (validate.type) {
      setIsEmailSignUpLoading(true);
      const {isNewUser, user, error} = await userAuthActions.emailSignIn(
        email,
        password,
      );
      if (error) {
        setIsEmailSignUpLoading(false);
        alert(error);
      } else {
        setIsEmailSignUpLoading(false);
        // navigation.replace('Check');
        fetchUserInformation(user.uid, 'email');
      }
    } else {
      alert(validate.msg);
    }
  };
  return (
    <View style={styles.container}>
      {/* <StatusBarComponent /> */}
      <View style={{flex: 1}}></View>
      <View style={styles.formBody}>
        {/* headder name */}
        <View style={{flex: 1}}>
          <Text
            style={{
              fontFamily: 'Gotham Rounded',
              fontWeight: '400',
              fontSize: normalize(24),
              color: colorCode.backgroundColor,
            }}>
            Sign In
          </Text>
        </View>

        {/* ttext input */}
        <View>
          <TextInput
            style={styles.textInputStyle}
            placeholder="E-Mail"
            value={email}
            onChangeText={text => setEmail(text)}
          />
          <TextInput
            style={styles.textInputStyle}
            placeholder="Password"
            value={password}
            onChangeText={text => setPassword(text)}
            secureTextEntry
          />
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
                width: normalize(15),
                height: normalize(15),
                borderRadius: 15 / 2,
                borderWidth: 2,
                borderColor: colorCode.bordergrey,
                backgroundColor: colorCode.backgroundColor,
                marginStart: 6,
              }}
            />
            <Text style={styles.textStyle1} style={{color: colorCode.grey}}>
              Remember
            </Text>
          </View>
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.textStyle1} style={{color: colorCode.grey}}>
              Forget Password ?
            </Text>
          </TouchableOpacity>
        </View>

        {/*buttons*/}
        <View style={{flex: 3}}>
          <TouchableOpacity onPress={isEmailSignUpLoading ? null : signIn}>
            <LinearGradient
              style={styles.buttonStyle}
              colors={[colorCode.backgroundColor, colorCode.light_blue]}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}>
              {isEmailSignUpLoading ? (
                <ActivityIndicatorComponent size="large" color="white" />
              ) : (
                <Text
                  style={{
                    fontFamily: 'Raleway',
                    fontWeight: 'bold',
                    fontSize: normalize(16),
                    color: colorCode.white,
                  }}>
                  Sign In
                </Text>
              )}
            </LinearGradient>
          </TouchableOpacity>
          <Text
            style={{
              fontFamily: 'Raleway',
              fontSize: normalize(14),
              color: colorCode.grey,
              alignSelf: 'center',
              marginBottom: normalize(20),
            }}>
            Or
          </Text>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={isLoading ? null : onGoogleButtonPress}>
              {isLoading ? (
                <ActivityIndicatorComponent size="small" color="red" />
              ) : (
                <Entypo name="google-" size={normalize(25)} color="red" />
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/*create avvount*/}
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
          <Text style={[styles.textStyle1, {color: colorCode.grey}]}>
            Don 't Have Account ?
          </Text>
          <TouchableOpacity
            onPress={() =>
              navigation.push('doctorOrPatient', {
                screen: 'ChooseOption',
                params: {type: 'normal'},
              })
            }>
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
    backgroundColor: colorCode.white,
    justifyContent: 'center',
  },
  formBody: {
    paddingStart: normalize(25),
    paddingEnd: normalize(25),
    flex: 5,
  },
  textInputStyle: {
    alignItems: 'flex-start',
    paddingStart: normalize(16),
    width: '100%',
    height: normalize(45),
    marginBottom: normalize(20),
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colorCode.bordergrey,
    backgroundColor: colorCode.white,
    fontFamily: 'Gotham Rounded',
    fontSize: normalize(14),
    color: colorCode.grey,
  },
  buttonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: normalize(20),
    width: '100%',
    height: normalize(45),
    borderRadius: 5,
    backgroundColor: '#547896',
  },
  iconButton: {
    width: '48%',
    height: normalize(41),
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colorCode.bordergrey,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle1: {
    fontFamily: 'Gotham Rounded',
    fontWeight: '400',
    fontSize: normalize(14),
    color: colorCode.backgroundColor,
  },
});
function mapState(state) {
  return {};
}
const actionCreators = {
  storedata: user => dispatch =>
    dispatch({type: userConstants.STORE_SIGNUP_DETAILS, user}),
  storeLoginAuth: user => dispatch =>
    dispatch({type: userConstants.STORE_USER_DETAILS, user}),
  removeSignUpData: () => dispatch =>
    dispatch({type: userConstants.REMOVE_SIGNUP_DETAILS}),
};
export default connect(mapState, actionCreators)(Login);
