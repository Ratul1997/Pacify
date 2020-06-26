/* eslint-disable react-native/no-inline-styles */
import React, {Component, useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

import {FlatList} from 'react-native-gesture-handler';
import {userColor, normalize} from '../Constants/colorCode';
import headerStyle from '../Constants/headerStyle';
import BackButton from '../Constants/BackButton';
import LinearGradient from 'react-native-linear-gradient';
import IonicIcon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FeactherIcon from 'react-native-vector-icons/Feather';
import StatusBarComponent from '../Constants/StatusBar';

const DATA = [
  {
    drName: 'Ratul Votka',
    position: 'Preddictician',
    imageName: require('../Images/profile.jpg'),
    hospital: 'Dishant Hospital',
    Add: 'Ring Road, Nagpur',
    fee: '1250',
    rating: '5',
  },
];

function Item({item, props}) {
  return (
    <TouchableOpacity
      style={styles.flatListItem}
      onPress={() => props.navigation.navigate('selectedDoctor')}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          paddingStart: 15,
        }}>
        <Image
          source={require('../Images/profile.jpg')}
          style={styles.ImageStyle}
        />
      </View>
      <View style={{flex: 3, paddingStart: 10, marginTop: 15}}>
        <Text style={styles.nameStyle}>{item.drName}</Text>
        <Text style={{color: userColor.light_gray, fontSize: normalize(12)}}>
          {item.position}
        </Text>
        <View style={{flexDirection: 'row'}}>
          {/*location Icon*/}
          <Text style={{color: userColor.darkGrey, fontSize: normalize(10)}}>
            {item.hospital},{' '}
          </Text>
          <Text style={{color: userColor.darkGrey, fontSize: normalize(10)}}>
            {item.Add}
          </Text>
        </View>
      </View>

      <View style={{padding: 10}}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text
            style={{
              fontFamily: 'Gotham Rounded',
              fontSize: normalize(10),
              fontWeight: '400',
              color: userColor.grad1,
            }}>
            Fee
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
            <Text
              style={{
                fontFamily: 'Gotham Rounded',
                fontSize: normalize(10),
                fontWeight: '400',
                color: userColor.grad1,
              }}>
              {item.fee}{' '}
            </Text>
            <Text
              style={{
                fontFamily: 'Gotham Rounded',
                fontSize: normalize(9),
                color: userColor.light_gray,
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
          <FeactherIcon name="star" size={15} color={userColor.light_blue} />
          <Text style={{paddingLeft: 5}}>{item.rating}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default function App(props) {
  return (
    <View style={{flex: 1, backgroundColor: userColor.white}}>
      <StatusBarComponent />
      <LinearGradient
        colors={[userColor.backgroundColor, userColor.light_blue]}
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
          <IonicIcon name="ios-arrow-back" style={{color: 'white'}} size={25} />
        </TouchableOpacity>
        <TouchableOpacity style={{}}>
          <Text style={{color: 'white', fontSize: normalize(22)}}>Doctor</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <AntDesign name="filter" style={{color: 'white'}} size={25} />
        </TouchableOpacity>
      </LinearGradient>
      <View style={{flex: 0.9}}>
        <FlatList
          data={DATA}
          renderItem={({item}) => <Item item={item} props={props} />}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  ImageStyle: {
    height: 70,
    width: 70,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: userColor.bordergrey,
  },
  nameStyle: {
    color: userColor.grad1,
    fontSize: normalize(16),
    fontFamily: 'Gotham Rounded',
  },
  flatListItem: {
    height: 100,
    borderBottomWidth: 1,
    flexDirection: 'row',
    borderColor: userColor.bordergrey,
  },
});
