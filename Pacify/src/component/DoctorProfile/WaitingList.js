import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, TouchableOpacity, Alert} from 'react-native';
import ModalComponent from '../../common/ModalComponent';
import MenuHeader from '../../common/MenuHeader';
import {doctorActions} from '../../actions';
import firestore from '@react-native-firebase/firestore';
import {connect} from 'react-redux';
import normalize from '../../constants/normalize';
import colorCode from '../../constants/colorCode';
import Entypo from 'react-native-vector-icons/Entypo';
import {Image} from 'react-native-elements';
import ActivityIndicatorComponent from '../../common/ActivityIndicatorComponent';
import {calculation} from '../../helpers';
function WaitingList({navigation, userDetails}) {
  const [patientList, setPatientList] = useState([]);
  useEffect(() => {
    const subs = fetchData();
    return () => subs;
  }, []);

  const updateData = item => () => {
    console.log(item);
    Alert.alert('Are you sure?', 'Your patient request will be accepted.', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: () => {
          const {error} = doctorActions.updatePatientReq(
            item.key,
            'Approved',
            item,
            userDetails,
          );
          if (error) {
            alert('Something Went Wrong');
          } else {
            const {error} = doctorActions.sendNotification(
              item.uid,
              'Approved',
              JSON.stringify(userDetails),
              `${userDetails.name} has approved appointment.`,
              'Appointment',
            );
            alert('Please wait for confirming payment');
          }
        },
      },
    ]);
  };
  const cancelReq = item => () => {
    console.log(item, userDetails);
    Alert.alert('Are you sure?', 'Your patient request will be canceled.', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: () => {
          const {error} = doctorActions.updatePatientReq(
            item.key,
            'Delete',
            item,
            userDetails,
          );
          if (error) {
            alert('Something Went Wrong');
          } else {
            const {error} = doctorActions.sendNotification(
              item.uid,
              'Delete',
              JSON.stringify(userDetails),
              `${userDetails.name} has cancelled appointment.`,
              'Appointment',
            );
          }
        },
      },
    ]);
  };
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
            PlaceholderContent={
              <ActivityIndicatorComponent size="small" color="green" />
            }
            style={{
              height: normalize(50),
              width: normalize(50),
              borderRadius: 50,
              borderWidth: 2,
              borderColor: colorCode.bordergrey,
            }}></Image>
        </View>
        <View style={{width: '60%'}}>
          <Text>{item.name}</Text>
          <Text>{item.profession}</Text>
          <Text>
            {date.dateString} at {date.time}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            width: '20%',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={{
              width: normalize(25),
              height: normalize(25),
              borderRadius: 25,
              borderColor: 'red',
              borderWidth: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={cancelReq(item)}>
            <Entypo name="cross" size={normalize(20)} color="red" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: normalize(25),
              height: normalize(25),
              borderRadius: 25,
              borderColor: 'green',
              borderWidth: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={updateData(item)}>
            <Entypo name="check" size={normalize(20)} color="green" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const fetchData = async () => {
    firestore()
      .collection('Users')
      .doc(userDetails.uid)
      .collection('Patients')
      .where('status', '==', 'Waiting')
      .onSnapshot(
        querySnapshot => {
          /* ... */
          // console.log(querySnapshot.size);

          const patients = querySnapshot.docs.map(doc => {
            return {...doc.data(), key: doc.id};
          });
          setPatientList(patients);
        },
        function(error) {
          console.log(error);
          alert('Something Went Wrong');
        },
      );
  };
  return (
    <View>
      <FlatList data={patientList} renderItem={renderItem} />
    </View>
  );
}
function mapState(state) {
  const {userDetails} = state.userReducers;
  return {userDetails};
}
const actionCreators = {};
export default connect(mapState, actionCreators)(WaitingList);
