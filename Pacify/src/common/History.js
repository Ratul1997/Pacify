import React, {Component, useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';

import colorCode from '../constants/colorCode';
import normalize from '../constants/normalize';
import BackButton from '../constants/BackButton';

import firestore from '@react-native-firebase/firestore';
import {connect} from 'react-redux';
import MenuHeader from './MenuHeader';
import {calculation} from '../helpers';

function History({navigation, userDetails, route}) {
  const [list, setlist] = useState([]);
  console.log(route);
  useEffect(() => {
    const subs = userDetails.type === 2 ? fetchData() : fetchData();
    return () => subs;
  }, []);

  const renderItem = ({item}) => {
    const date = calculation.convertDatetoString(item.time);
    return (
      <View
        style={{
          marginTop: normalize(17),
          marginRight: normalize(12),
          marginLeft: normalize(12),
          marginBottom: normalize(12),
          borderRadius: normalize(7),
          backgroundColor: '#fff',
          elevation: 6,
          borderColor: colorCode.border_color,
          borderWidth: 1,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: normalize(12),
            marginRight: normalize(12),
            borderBottomColor: colorCode.light_gray,
            borderBottomWidth: 0.5,
            padding: normalize(7),
          }}>
          <Text
            style={{
              fontFamily: 'Gotham Rounded',
              color: colorCode.text_color,
              fontSize: normalize(18),
            }}>
            Date:
          </Text>
          <Text
            style={{
              fontFamily: 'Gotham Rounded',
              color: colorCode.text_color,
              fontSize: normalize(18),
              paddingLeft: normalize(5),
            }}>
            {date.dateString}
          </Text>
        </View>
        <View
          style={{
            marginLeft: normalize(6),
            marginRight: normalize(12),
            padding: normalize(7),
          }}>
          <Text
            style={{
              fontFamily: 'Gotham Rounded',
              color: colorCode.light_gray,
              fontSize: normalize(13),
            }}>
            Full Name
          </Text>
          <Text style={{fontFamily: 'Gotham Rounded', fontSize: normalize(18)}}>
            {userDetails.type === 2 ? item.name : userDetails.name}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginLeft: normalize(6),
            padding: normalize(7),
          }}>
          <View
            style={{
              width: '50%',
            }}>
            <Text
              style={{
                fontFamily: 'Gotham Rounded',
                color: colorCode.light_gray,
                fontSize: normalize(13),
              }}>
              Time
            </Text>
            <Text
              style={{fontFamily: 'Gotham Rounded', fontSize: normalize(18)}}>
              {date.time}
            </Text>
          </View>
          <View
            style={{
              width: '50%',
            }}>
            <Text
              style={{
                fontFamily: 'Gotham Rounded',
                color: colorCode.light_gray,
                fontSize: normalize(13),
              }}>
              Doctor
            </Text>
            <Text
              style={{fontFamily: 'Gotham Rounded', fontSize: normalize(18)}}>
              {userDetails.type === 2 ? userDetails.name : item.name}
            </Text>
          </View>
        </View>
      </View>
    );
  };
  const fetchData = async () => {
    console.log('sd', userDetails);
    firestore()
      .collection('Users')
      .doc(userDetails.uid)
      .collection('History')
      .onSnapshot(
        querySnapshot => {
          /* ... */
          // console.log(querySnapshot.size);

          const patients = querySnapshot.docs.map(doc => {
            return {...doc.data(), key: doc.id};
          });
          setlist(patients);
        },
        function(error) {
          console.log(error);
          alert('Something Went Wrong');
        },
      );
  };
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <MenuHeader title="History" openDrawer={() => navigation.openDrawer()} />
      <View style={{flex: 0.9}}>
        <FlatList data={list} renderItem={renderItem} />
      </View>
    </View>
  );
}
function mapState(state) {
  const {userDetails} = state.userReducers;
  return {userDetails};
}
const actionCreators = {};
export default connect(mapState, actionCreators)(History);
