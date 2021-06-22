import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, TouchableOpacity, Alert} from 'react-native';

import {Image} from 'react-native-elements';
import ModalComponent from '../../common/ModalComponent';
import MenuHeader from '../../common/MenuHeader';
import {doctorActions} from '../../actions';
import firestore from '@react-native-firebase/firestore';
import {connect} from 'react-redux';
import normalize from '../../constants/normalize';
import colorCode from '../../constants/colorCode';
import Entypo from 'react-native-vector-icons/Entypo';
import {calculation} from '../../helpers';
import ActivityIndicatorComponent from '../../common/ActivityIndicatorComponent';
function Pending({navigation, userDetails}) {
  const [doctorList, setdoctorList] = useState([]);
  useEffect(() => {
    const subs = fetchData();
    return () => subs;
  }, []);

  const renderItem = ({item, index}) => {
    const date = calculation.convertDatetoString(item.time);
    return (
      <View
        style={{
          flexDirection: 'row',
          margin: normalize(10),
          borderBottomColor: colorCode.bordergrey,
          borderBottomWidth: 1,
        }}>
        <View
          style={{
            width: '20%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={
              item.photo_url
                ? {
                    uri: item.photo_url,
                  }
                : require('../../Images/profile.jpg')
            }
            style={{
              height: normalize(50),
              width: normalize(50),
              borderRadius: 50,
              borderWidth: 2,
              borderColor: colorCode.bordergrey,
            }}></Image>
        </View>
        <View style={{width: '80%'}}>
          <Text>{item.name}</Text>
          <Text>{item.qualifications}</Text>
          <Text>
            {date.dateString} at {date.time}
          </Text>
        </View>
      </View>
    );
  };
  const fetchData = async () => {
    firestore()
      .collection('Users')
      .doc(userDetails.uid)
      .collection('Appointments')
      .where('status', '==', 'Waiting')
      .onSnapshot(
        querySnapshot => {
          /* ... */
          // console.log(querySnapshot.size);

          const doctors = querySnapshot.docs.map(doc => {
            return {...doc.data(), key: doc.id};
          });
          setdoctorList(doctors);
        },
        function(error) {
          console.log(error);
          alert('Something Went Wrong');
        },
      );
  };
  return (
    <View>
      <FlatList data={doctorList} renderItem={renderItem} />
    </View>
  );
}
function mapState(state) {
  const {userDetails} = state.userReducers;
  return {userDetails};
}
const actionCreators = {};
export default connect(mapState, actionCreators)(Pending);
