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
import colorCode from '../../../constants/colorCode';
import normalize from '../../../constants/normalize';
import {validation} from '../../../helpers';
import {userConstants} from '../../../constants/userConstants';
import {connect} from 'react-redux';
import {userAuthActions, patientActions} from '../../../actions';
import ActivityIndicatorComponent from '../../../common/ActivityIndicatorComponent';

const DATA = [
  {id: '1', placeholder: 'Name', type: 'TextInput', key: 'name'},
  {
    id: '3',
    placeholder: 'Mobile Number',
    type: 'TextInput',
    key: 'phone_number',
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
  {id: '9', placeholder: 'Submit', type: 'button'},
];

function Fields({navigation, route, userDetails, updateDetails}) {
  console.log('use', userDetails);
  const initialState = {
    name: userDetails.name ? userDetails.name : '',
    phone_number: userDetails.phone_number ? userDetails.phone_number : '',
    registration_number: userDetails.registration_number
      ? userDetails.registration_number
      : '',
    fees: userDetails.fees ? userDetails.fees : '',
    qualifications: userDetails.qualifications
      ? userDetails.qualifications
      : '',
  };
  const [profileInformation, setProfileInformation] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);

  const onChangeState = item => text => {
    setProfileInformation({...profileInformation, [item.key]: text});
  };
  const setValue = value => {
    return profileInformation[value];
  };

  const onSubmit = async () => {
    setIsLoading(true);
    const data = {
      ...userDetails,
      ...profileInformation,
    };
    const {error} = await patientActions.updateUserInfo(data);
    if (error) {
      console.log(error);
      alert('Something went wrong');
    } else {
      navigation.goBack();
      updateDetails(data);
    }
    setIsLoading(false);
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
        <TouchableOpacity onPress={onSubmit}>
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
      <View style={styles.formBody}>
        <FlatList
          data={DATA}
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
  const {userDetails} = state.userReducers;
  return {userDetails};
}
const actionCreators = {
  updateDetails: user => dispatch =>
    dispatch({type: userConstants.UPDATE_USER_DETAILS, user}),
};
export default connect(mapState, actionCreators)(Fields);
