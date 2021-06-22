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
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import IonicIcon from 'react-native-vector-icons/Ionicons';
import {FlatList} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import colorCode from '../../constants/colorCode';
import normalize from '../../constants/normalize';
import {connect} from 'react-redux';
import OnCall from './OnCall';
const numColumns = 3;

const Data = [
  {
    name: 'Age',
    value: '24yrs',
  },
  {
    name: 'Blood',
    value: 'AB',
  },
  {
    name: 'Profession',
    value: 'Student',
    key: 'profession',
  },
];
const formatData = (data, numColumns) => {
  const numberOfFullRows = Math.floor(data.length / numColumns);

  let numberOfElementsLastRow = data.length - numberOfFullRows * numColumns;
  while (
    numberOfElementsLastRow !== numColumns &&
    numberOfElementsLastRow !== 0
  ) {
    data.push({key: `blank-${numberOfElementsLastRow}`, empty: true});
    numberOfElementsLastRow++;
  }

  return data;
};

function PatientAccount({navigation, userDetails, requestedUser}) {
  console.log(requestedUser, 'asas');
  const renderItem = ({item, index}) => {
    return (
      <View style={styles.item}>
        <Text
          style={{
            fontFamily: 'Gotham Rounded',
            fontSize: normalize(16),
          }}>
          {item.name}
        </Text>
        <Text
          style={{
            fontFamily: 'Gotham Rounded',
            color: colorCode.light_gray,
          }}>
          {item.value}
        </Text>
      </View>
    );
  };
  const onJoinCall = () => {
    navigation.navigate('VideoCall', {
      channel: requestedUser.key,
      patientDetails: userDetails,
      doctorDetails: requestedUser,
      type: 1,
    });
  };
  return (
    <View style={{flex: 1}}>
      <LinearGradient
        colors={[colorCode.backgroundColor, colorCode.light_blue]}
        style={{flex: 1}}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 0.1,
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
            <Text
              style={{
                color: 'white',
                fontSize: normalize(22),
                fontFamily: 'Gotham Rounded',
              }}>
              User Profile
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            margin: normalize(12),
            borderRadius: 10,
            backgroundColor: '#fff',
            elevation: 6,
            flex: 0.9,
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
          />
          <Text
            style={{
              fontFamily: 'Gotham Rounded',
              color: colorCode.text_color,
              fontSize: normalize(15),
              fontWeight: 'bold',
              justifyContent: 'center',
              alignSelf: 'center',
            }}>
            {userDetails.name}
          </Text>

          <FlatList
            style={{
              marginTop: normalize(7),
              maxHeight: '20%',
              minHeight: '20%',
            }}
            data={formatData(Data, numColumns)}
            numColumns={numColumns}
            renderItem={renderItem}
            keyExtractor={item => item.name}
          />
          {requestedUser && (
            <OnCall item={requestedUser} onPress={onJoinCall} />
          )}
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              marginHorizontal: normalize(20),
              borderColor: colorCode.light_blue,
              borderWidth: 1,
              borderRadius: 10,
              alignItems: 'center',
            }}
            onPress={() => navigation.navigate('Invoice')}>
            <View style={{width: '90%', flexDirection: 'row', padding: 10}}>
              <FontistoIcon
                name="umbrella"
                size={normalize(22)}
                style={{padding: 2}}
                color={colorCode.light_blue}
              />
              <Text
                style={{
                  fontFamily: 'Gotham Rounded',
                  fontSize: normalize(16),
                  paddingLeft: normalize(15),
                  color: colorCode.light_gray,
                }}>
                Invoice
              </Text>
            </View>
            <IonicIcon
              name="ios-arrow-forward"
              style={{width: '10%', alignSelf: 'center'}}
              size={normalize(20)}
              color={colorCode.light_blue}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              margin: normalize(20),
              borderColor: colorCode.light_blue,
              borderWidth: 1,
              borderRadius: 10,
              alignItems: 'center',
            }}
            onPress={() => navigation.navigate('FavDoctors')}>
            <View
              style={{
                width: '90%',
                flexDirection: 'row',
                alignItems: 'center',
                padding: 10,
              }}>
              <FontistoIcon
                name="heart-alt"
                size={normalize(20)}
                color={colorCode.light_blue}
              />
              <Text
                style={{
                  fontFamily: 'Gotham Rounded',
                  fontSize: normalize(16),
                  paddingLeft: 15,
                  color: colorCode.light_gray,
                }}>
                Favourite Doctor
              </Text>
            </View>
            <IonicIcon
              name="ios-arrow-forward"
              style={{width: '10%'}}
              size={normalize(20)}
              color={colorCode.light_blue}
            />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  proPic: {
    height: Dimensions.get('window').width * 0.25,
    width: Dimensions.get('window').width * 0.25,
    borderRadius: (Dimensions.get('window').width * 0.25) / 2,
    borderWidth: 1,
    borderColor: '#fff',
    margin: normalize(15),
    justifyContent: 'center',
    alignSelf: 'center',
  },
  item: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1,
    shadowColor: '#000',
    shadowOpacity: 0.9,
    elevation: 4,
    padding: normalize(10),
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
});
function mapState(state) {
  const {userDetails} = state.userReducers;
  const {requestedUser} = state.callingReducer;
  return {userDetails, requestedUser};
}

const actionCreators = {};
export default connect(mapState, actionCreators)(PatientAccount);
