import React, {Component, useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import colorCode from '../../constants/colorCode';
import normalize from '../../constants/normalize';
import {validation} from '../../helpers';
import {connect} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import ActivityIndicatorComponent from '../../common/ActivityIndicatorComponent';
import {userConstants} from '../../constants/userConstants';
const Data = [
  {
    id: 1,
    title: 'Drug Addiction',
    imageName: require('../../assets/drugs.png'),
  },
  {
    id: 2,
    title: 'Parenting',
    imageName: require('../../assets/Parentings.png'),
  },
  {
    id: 3,
    title: 'Family Problem',
    imageName: require('../../assets/familys.png'),
  },
  {
    id: 4,
    title: 'Gender Violence',
    imageName: require('../../assets/genders.png'),
  },
  {
    id: 5,
    title: 'Career Issues',
    imageName: require('../../assets/careers.png'),
  },
  {
    id: 6,
    title: 'Depression',
    imageName: require('../../assets/Depressions.png'),
  },
];
function SelectArea({
  navigation,
  userDetails,
  storedata,
  removeSignUpData,
  storeLoginData,
}) {
  console.log(userDetails);
  const [selectedArea, setSelectedArea] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const renderItem = ({item}) => {
    const borderColor = validation.findFromArray(selectedArea, item.id)
      ? colorCode.backgroundColor
      : 'white';
    const onSelect = () => {
      if (!validation.findFromArray(selectedArea, item.id)) {
        setSelectedArea([...validation.insertIntoArray(selectedArea, item.id)]);
      } else {
        setSelectedArea([...validation.deleteFromArray(selectedArea, item.id)]);
      }
    };
    return (
      <TouchableOpacity
        style={{
          marginTop: normalize(20),
          marginHorizontal: normalize(5),
          justifyContent: 'center',
          alignItems: 'center',
          width: '48%',
          height: normalize(150),
          borderRadius: normalize(4),
          borderWidth: 3,
          alignSelf: 'center',
          elevation: 3,
          borderColor,
          backgroundColor: 'white',
        }}
        onPress={onSelect}>
        <Image source={item.imageName} />
        <Text
          style={{
            color: colorCode.darkGrey,
            fontSize: normalize(14),
            marginTop: normalize(5),
            fontFamily: 'Gotham Rounded',
          }}>
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };

  const getSpecializeDataFromId = array => {
    const lists = [
      'Drug Addiction',
      'Parenting',
      'Family Problem',
      'Gender Violence',
      'Career Issues',
      'Depression',
    ];
    let newArray = [];
    for (let i = 0; i < array.length; i++) {
      newArray.push(lists[array[i] - 1]);
    }
    return newArray;
  };
  const onPressSelectArea = async () => {
    const doctorData = userDetails;
    doctorData.selected_areas = getSpecializeDataFromId(selectedArea.sort());

    setLoading(true);
    try {
      await firestore()
        .collection('Users')
        .doc(userDetails.uid)
        .set({
          ...doctorData,
          rating: 0,
        });

      setLoading(false);
      removeSignUpData();
      storeLoginData(userDetails);
      navigation.reset({
        index: 0,
        routes: [{name: 'DocHome'}],
      });
    } catch (err) {
      setLoading(false);
      console.log(err);
      alert('Something Went Wrong');
    }
  };
  return (
    <View style={{flex: 1, backgroundColor: colorCode.white}}>
      <FlatList
        style={{
          height: '80%',
          margin: normalize(5),
          width: '90%',
          alignSelf: 'center',
          //   backgroundColor: 'red',
        }}
        contentContainerStyle={{
          alignItems: 'center',
        }}
        data={Data}
        numColumns={2}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <View style={{height: '20%', justifyContent: 'center'}}>
        <TouchableOpacity onPress={onPressSelectArea}>
          <LinearGradient
            colors={[colorCode.backgroundColor, colorCode.light_blue]}
            style={{
              backgroundColor: colorCode.backgroundColor,
              justifyContent: 'center',
              width: '60%',
              alignItems: 'center',
              alignSelf: 'center',
              margin: normalize(20),
              height: normalize(50),
              borderRadius: normalize(25),
              padding: normalize(15),
            }}>
            {isLoading ? (
              <ActivityIndicatorComponent size="large" color="white" />
            ) : (
              <Text
                style={{
                  fontFamily: 'Gotham Rounded',
                  color: 'white',
                  fontSize: normalize(16),
                }}>
                Select Your Area
              </Text>
            )}
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  itemStyle: {
    marginTop: normalize(20),
    marginHorizontal: normalize(5),
    justifyContent: 'center',
    alignItems: 'center',
    width: '48%',
    height: normalize(150),
    borderRadius: normalize(4),
    borderWidth: normalize(1),
    alignSelf: 'center',
    elevation: 1,
  },
});

function mapState(state) {
  const {userDetails} = state.signUpReducers;
  return {userDetails};
}
const actionCreators = {
  storedata: user => dispatch =>
    dispatch({type: userConstants.STORE_SIGNUP_DETAILS, user}),
  removeSignUpData: () => dispatch =>
    dispatch({type: userConstants.REMOVE_SIGNUP_DETAILS}),
  storeLoginData: user => dispatch =>
    dispatch({type: userConstants.STORE_USER_DETAILS, user}),
};
export default connect(mapState, actionCreators)(SelectArea);
