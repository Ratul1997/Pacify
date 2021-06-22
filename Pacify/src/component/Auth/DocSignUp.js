/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import IonicIcon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import colorCode from '../../constants/colorCode';
import normalize from '../../constants/normalize';
import {validation} from '../../helpers';
import {userConstants} from '../../constants/userConstants';
import {connect} from 'react-redux';
import {userAuthActions} from '../../actions';
import ActivityIndicatorComponent from '../../common/ActivityIndicatorComponent';

const DATA = [
  {id: '1', placeholder: 'Name', type: 'TextInput', key: 'name'},
  {id: '2', placeholder: 'E-mail', type: 'TextInput', key: 'email'},
  {
    id: '3',
    placeholder: 'Mobile Number',
    type: 'TextInput',
    key: 'phone_number',
  },
  {
    id: '4',
    placeholder: 'Password',
    type: 'TextInput',
    key: 'password',
    secureTextEntry: true,
  },
  {
    id: '5',
    placeholder: 'Confirm Password',
    type: 'TextInput',
    key: 'confirm_password',
    secureTextEntry: true,
  },
  {
    id: '6',
    placeholder: 'BMDC Registration Number',
    type: 'TextInput',
    key: 'registration_number',
  },
  {
    id: '7',
    placeholder: 'Fees Amount',
    type: 'TextInput',
    key: 'fees',
  },
  {
    id: '8',
    placeholder: 'Qualification',
    type: 'TextInput',
    key: 'qualifications',
  },
  {id: '9', placeholder: 'Sign Up', type: 'button'},
];

function DocSignUp({navigation, route, userDetails, storedata}) {
  const {type} = route.params;
  const initialState = {
    name: userDetails.name ? userDetails.name : '',
    email: userDetails.email ? userDetails.email : '',
    phone_number: userDetails.phone_number ? userDetails.phone_number : '',
    password: '',
    confirm_password: '',
    registration_number: '',
    fees: '',
    qualifications: '',
  };
  const [profileInformation, setProfileInformation] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);

  const onBackNavigation = () => {
    navigation.goBack();
  };
  const checkValidation = () => {
    const {email, password, confirm_password} = profileInformation;
    if (email.length === 0) return {type: false, msg: 'Email Is Empty'};
    if (password.length === 0 && type != 'google')
      return {type: false, msg: 'Password Is Empty'};
    if (!validation.checkValidEmail(email))
      return {type: false, msg: 'Email is not valid'};
    if (password.length < 8 && type != 'google')
      return {
        type: false,
        msg: 'Password Is Required Minimum 8 Characters Long',
      };
    if (password != confirm_password && type != 'google')
      return {type: false, msg: 'Password Is not Matched'};

    return {
      type: true,
    };
  };

  const onChangeState = item => text => {
    setProfileInformation({...profileInformation, [item.key]: text});
  };
  const setValue = value => {
    return profileInformation[value];
  };

  const copyData = data => {
    let user = type === 'google' ? userDetails : data;
    user.type = 2;
    user.registration_number = data.registration_number;
    user.fees = data.fees;
    user.qualifications = data.qualifications;
    delete user.password;
    delete user.confirm_password;
    return user;
  };
  const onSignUp = async () => {
    const isValid = checkValidation();

    if (type === 'google') {
      const data = profileInformation;
      const userDetailss = copyData({...data});

      userDetails.acount_type = 'google';
      storedata(userDetailss);
      navigation.push('SelectArea');
    } else {
      if (isValid.type) {
        const data = profileInformation;
        const userDetailss = copyData({...data});
        setIsLoading(true);
        const {user, error} = await userAuthActions.emailSignUp(
          profileInformation.email,
          profileInformation.password,
        );

        setIsLoading(false);
        if (error) {
          alert(error.toString());
        } else {
          userDetailss.uid = user.uid;

          userDetails.acount_type = 'normal';
          storedata(userDetailss);
          navigation.push('SelectArea');
        }
      } else {
        alert(isValid.msg);
      }
    }
  };
  const removeDataObj = (oldArr, toBeDeleted) => {
    const newArr = oldArr.filter(item => {
      if (
        item.key != 'password' &&
        item.key != 'confirm_password' &&
        item.key != 'name' &&
        item.key != 'email'
      )
        return item;
    });
    return newArr;
  };
  const clearData = () => {
    let userData = DATA;
    if (type === 'google') {
      userData = removeDataObj(userData);
    }
    return userData;
  };
  const renderItem = ({item, index}) => {
    if (item.type === 'TextInput') {
      return (
        <TextInput
          style={styles.textInputStyle}
          placeholder={item.placeholder}
          value={setValue(item.key)}
          onChangeText={onChangeState(item)}
          secureTextEntry={item.secureTextEntry}
        />
      );
    } else if (item.type === 'button') {
      return (
        <TouchableOpacity onPress={onSignUp}>
          <LinearGradient
            style={styles.buttonStyle}
            colors={[colorCode.backgroundColor, colorCode.light_blue]}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}>
            {isLoading ? (
              <ActivityIndicatorComponent size="large" color="white" />
            ) : (
              <Text
                style={{
                  fontFamily: 'Raleway',
                  fontWeight: 'bold',
                  fontSize: normalize(16),
                  color: colorCode.white,
                }}>
                {item.placeholder}
              </Text>
            )}
          </LinearGradient>
        </TouchableOpacity>
      );
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{flex: 0.1, margin: normalize(20)}}
        onPress={onBackNavigation}>
        <IonicIcon
          name="ios-arrow-back"
          style={{color: colorCode.light_gray}}
          size={normalize(25)}
        />
      </TouchableOpacity>
      <View style={styles.formBody}>
        <Text
          style={{
            fontFamily: 'Gotham Rounded',
            fontWeight: '400',
            fontSize: normalize(20),
            color: colorCode.backgroundColor,
          }}>
          Sign Up
        </Text>
        <FlatList
          data={clearData()}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorCode.white,
  },
  formBody: {
    paddingStart: normalize(28),
    paddingEnd: normalize(28),
    flex: 0.9,
  },
  textInputStyle: {
    alignItems: 'flex-start',
    paddingStart: normalize(13),
    paddingTop: normalize(10),
    width: '100%',
    height: normalize(40),
    marginTop: normalize(20),
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colorCode.bordergrey,
    backgroundColor: colorCode.white,
    fontFamily: 'Gotham Rounded',
    fontSize: normalize(12),
    color: colorCode.grey,
  },
  buttonStyle: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: normalize(28),
    width: '60%',
    height: normalize(45),
    borderRadius: 20.5,
    backgroundColor: '#458796',
    marginBottom: normalize(20),
  },
});
function mapState(state) {
  const {userDetails} = state.signUpReducers;
  return {userDetails};
}
const actionCreators = {
  storedata: user => dispatch =>
    dispatch({type: userConstants.STORE_SIGNUP_DETAILS, user}),
};
export default connect(mapState, actionCreators)(DocSignUp);
