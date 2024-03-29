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
import IonIcons from 'react-native-vector-icons/Ionicons';
import ActivityIndicatorComponent from '../../common/ActivityIndicatorComponent';
function DocHisotory({navigation, userDetails}) {
  const [patientList, setPatientList] = useState([]);
  useEffect(() => {
    const subs = fetchData();
    return () => subs;
  }, []);

  const onCall = item => () => {
    Alert.alert('Are you sure?', 'You Want to start call?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: () => {
          console.log('start Call');
          navigation.navigate('VideoCall', {channel: item.key});
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
        <View style={{width: '80%'}}>
          <Text>{item.name}</Text>
          <Text>{item.profession}</Text>
        </View>
      </View>
    );
  };
  const fetchData = async () => {
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
export default connect(mapState, actionCreators)(DocHisotory);
