import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, TouchableOpacity, Alert} from 'react-native';
import ModalComponent from '../../common/ModalComponent';

import {Image} from 'react-native-elements';
import MenuHeader from '../../common/MenuHeader';
import {doctorActions} from '../../actions';
import firestore from '@react-native-firebase/firestore';
import {connect} from 'react-redux';
import normalize from '../../constants/normalize';
import colorCode from '../../constants/colorCode';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ActivityIndicatorComponent from '../../common/ActivityIndicatorComponent';
function Approved({navigation, userDetails}) {
  const [patientList, setPatientList] = useState([]);
  useEffect(() => {
    const subs = fetchData();
    return () => subs;
  }, []);

  const deleteAppointMent = item => () => {
    Alert.alert('Are you sure?', 'Your patient request will be deleted.', [
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
            );
          }
        },
      },
    ]);
  };

  const renderItem = ({item, index}) => {
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
            onPress={deleteAppointMent(item)}>
            <AntDesign name="delete" size={normalize(15)} color="red" />
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
      // Filter results
      .where('status', '==', 'Approved')
      .onSnapshot(
        querySnapshot => {
          /* ... */
          // console.log(querySnapshot.size);

          const patients = querySnapshot.docs.map(doc => {
            return {...doc.data(), key: doc.id};
          });
          console.log(patients);
          setPatientList(patients);
        },
        function(error) {
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
export default connect(mapState, actionCreators)(Approved);
