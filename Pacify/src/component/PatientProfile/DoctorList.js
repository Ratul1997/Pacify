/* eslint-disable react-native/no-inline-styles */
import React, {Component, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  Dimensions,
} from 'react-native';

import {Image} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import IonicIcon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FeactherIcon from 'react-native-vector-icons/Feather';
import colorCode from '../../constants/colorCode';
import normalize from '../../constants/normalize';
import firestore from '@react-native-firebase/firestore';
import ModalComponent from '../../common/ModalComponent';
import Doctor from './Doctor';
import {connect} from 'react-redux';
import {userBookingActions, patientActions} from '../../actions';

import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import messaging from '@react-native-firebase/messaging';
import ActivityIndicatorComponent from '../../common/ActivityIndicatorComponent';
const DATA = [
  {
    drName: 'Ratul Votka',
    position: 'Preddictician',
    imageName: require('../../Images/profile.jpg'),
    hospital: 'Dishant Hospital',
    Add: 'Ring Road, Nagpur',
    fee: '1250',
    rating: '5',
  },
];
function DoctorList(props) {
  const {navigation, route, userDetails} = props;
  const {title} = route.params;
  const [doctorList, setDoctorList] = useState([]);
  const [item, setItem] = useState({});
  const [modalVisible, setModal] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [text, setText] = useState('');
  const [tempoData, setTempoData] = useState([]);
  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={styles.flatListItem}
        onPress={() => {
          setModal(true);
          setItem(item);
        }}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            paddingStart: 15,
          }}>
          <Image
            source={
              item.photo_url
                ? {
                    uri: item.photo_url,
                  }
                : require('../../Images/profile.jpg')
            }
            style={styles.ImageStyle}
            PlaceholderContent={
              <ActivityIndicatorComponent size="small" color="green" />
            }
          />
        </View>
        <View style={{flex: 3}}>
          <Text style={styles.nameStyle}>{item.name}</Text>
          <View>
            {item.selected_areas &&
              item.selected_areas.map(items => {
                return (
                  <Text
                    style={{
                      color: colorCode.light_gray,
                      fontSize: normalize(12),
                    }}>
                    {items}
                  </Text>
                );
              })}
          </View>
        </View>

        <View style={{padding: 10}}>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text
              style={{
                fontFamily: 'Gotham Rounded',
                fontSize: normalize(10),
                fontWeight: '400',
                color: colorCode.grad1,
              }}>
              Fee
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
              <Text
                style={{
                  fontFamily: 'Gotham Rounded',
                  fontSize: normalize(10),
                  fontWeight: '400',
                  color: colorCode.grad1,
                }}>
                {item.fees}
              </Text>
              <Text
                style={{
                  fontFamily: 'Gotham Rounded',
                  fontSize: normalize(9),
                  color: colorCode.light_gray,
                }}>
                BDT
              </Text>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <FeactherIcon name="star" size={15} color={colorCode.light_blue} />
            <Text style={{paddingLeft: 5}}>
              {item.rating ? (item.rating / item.total_number).toFixed(2) : 0}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  useEffect(() => {
    const subscriber = fetchData();
    return () => subscriber;
  }, []);

  const fetchData = async () => {
    firestore()
      .collection('Users')
      .where('selected_areas', 'array-contains', title)
      .onSnapshot(
        querySnapshot => {
          /* ... */
          // console.log(querySnapshot.size);

          const doc = querySnapshot.docs.map(doc => {
            return {...doc.data(), key: doc.id};
          });
          setDoctorList(doc);
        },
        function(error) {
          console.log(error);
          alert('Something Went Wrong');
        },
      );
  };
  const onPressCloseModal = () => {
    setModal(false);
  };
  const onNavigate = async () => {
    setModal(false);
    const date = new Date();
    const {error} = await userBookingActions.bookDoctor(
      userDetails,
      item,
      date,
    );
    if (error) {
      alert('Something went wrong');
    } else {
      const {error} = await patientActions.sendNotification(
        item.uid,
        'Request',
        JSON.stringify(userDetails),
      );
      alert('Booking Successfull. Please wait for confirmation.');
    }
  };
  const onChangeText = text => {
    console.log(text);
    setText(text);
    onSearch(text);
  };
  const onSearch = text => {
    const newArray = doctorList.filter(item => {
      if (item.name.includes(text)) return item;
    });
    setTempoData(newArray);
  };
  return (
    <>
      <ModalComponent
        modalVisible={modalVisible}
        onPressCloseModal={onPressCloseModal}>
        <Doctor item={item} navigation={navigation} onNavigate={onNavigate} />
      </ModalComponent>
      <View style={{flex: 1, backgroundColor: colorCode.white}}>
        <LinearGradient
          colors={[colorCode.backgroundColor, colorCode.light_blue]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
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
            onPress={() => props.navigation.goBack()}>
            <IonicIcon
              name="ios-arrow-back"
              style={{color: 'white'}}
              size={25}
            />
          </TouchableOpacity>
          {isSearching ? (
            <View
              style={{
                width: Dimensions.get('window').width * 0.9,
                height: normalize(30),
                backgroundColor: '#fff',
                elevation: 2,
                borderRadius: 10,
                marginTop: normalize(8),
                marginBottom: normalize(5),
                alignItems: 'center',
                flexDirection: 'row',
                paddingStart: normalize(10),
              }}>
              <EvilIcons
                name="search"
                size={25}
                color="#063777"
                onPress={() => {}}
              />
              <TextInput
                style={{padding: normalize(5), fontSize: 16, width: '80%'}}
                placeholder="Type Doctor Name"
                value={text}
                onChangeText={onChangeText}
              />
              <Entypo
                name="cross"
                size={25}
                color="#063777"
                onPress={() => setIsSearching(false)}
              />
            </View>
          ) : (
            <>
              <TouchableOpacity style={{}}>
                <Text style={{color: 'white', fontSize: normalize(22)}}>
                  Doctor
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  right: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => setIsSearching(true)}>
                <AntDesign name="filter" style={{color: 'white'}} size={25} />
              </TouchableOpacity>
            </>
          )}
        </LinearGradient>
        <View style={{flex: 0.9}}>
          <FlatList
            data={isSearching && text.length > 0 ? tempoData : doctorList}
            renderItem={renderItem}
            keyExtractor={({item, index}) => index}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  ImageStyle: {
    height: normalize(50),
    width: normalize(50),
    borderRadius: 50,
    borderWidth: 2,
    borderColor: colorCode.bordergrey,
  },
  nameStyle: {
    color: colorCode.grad1,
    fontSize: normalize(16),
    fontFamily: 'Gotham Rounded',
  },
  flatListItem: {
    // height: normalize(100),
    borderBottomWidth: 1,
    flexDirection: 'row',
    borderColor: colorCode.bordergrey,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    marginVertical: normalize(3),
    paddingVertical: normalize(10),
  },
});
function mapState(state) {
  const {userDetails} = state.userReducers;
  return {userDetails};
}
const actionCreators = {};
export default connect(mapState, actionCreators)(DoctorList);
