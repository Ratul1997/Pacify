import React, {useEffect} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  BackHandler,
} from 'react-native';

import IonicIcon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import colorCode from '../../constants/colorCode';
import normalize from '../../constants/normalize';
import {userConstants} from '../../constants/userConstants';
import {connect} from 'react-redux';
import {userAuthActions} from '../../actions';
const DATA = [
  {id: '1', title: 'Patient'},
  {id: '2', title: 'Physician'},
];

function ChooseOption({navigation, route, removeData}) {
  const {type} = route.params;
  const onBackNavigation = () => {
    hardwareBackPress();
    navigation.goBack();
  };
  const hardwareBackPress = () => {
    if (type === 'google') {
      const {error} = userAuthActions.signOut();
    }
    removeData();
  };
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', hardwareBackPress);

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', hardwareBackPress);
  }, []);

  const onNavigation = item => () => {
    if (item.id != 2) {
      navigation.navigate('PatientSignUp', {
        type: type === 'google' ? 'google' : 'normal',
      });
    } else {
      navigation.navigate('DocSignUp', {
        type: type === 'google' ? 'google' : 'normal',
      });
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{flex: 0.2, margin: normalize(25)}}
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
          Register as:
        </Text>
        <FlatList
          data={DATA}
          renderItem={({item}) => (
            <TouchableOpacity onPress={onNavigation(item)}>
              <LinearGradient
                style={styles.selection}
                colors={[colorCode.backgroundColor, colorCode.light_blue]}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}>
                <Text
                  style={{
                    fontFamily: 'Segoe UI',
                    fontSize: normalize(24),
                    color: 'rgba(243, 243, 243, 255)',
                  }}>
                  {item.title}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          )}
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
    flex: 0.8,
  },
  selection: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: normalize(50),
    width: '100%',
    height: normalize(80),
    borderRadius: 4,
  },
});
function mapState(state) {
  const {userDetails} = state.signUpReducers;
  return {userDetails};
}
const actionCreators = {
  removeData: () => dispatch =>
    dispatch({type: userConstants.REMOVE_SIGNUP_DETAILS}),
};
export default connect(mapState, actionCreators)(ChooseOption);
