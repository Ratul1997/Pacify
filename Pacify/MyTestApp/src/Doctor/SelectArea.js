import React, {Component, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import {userColor, normalize} from '../Constants/colorCode';
import LinearGradient from 'react-native-linear-gradient';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import StatusBarComponent from '../Constants/StatusBar';
const Data = [
  {
    id: '1',
    title: 'Drug Addiction',
    imageName: require('../../assets/drug.png'),
  },
  {
    id: '2',
    title: 'Parenting',
    imageName: require('../../assets/Parenting.png'),
  },
  {
    id: '3',
    title: 'Family Problem',
    imageName: require('../../assets/family.png'),
  },
  {
    id: '4',
    title: 'Gender Violence',
    imageName: require('../../assets/gender.png'),
  },
  {
    id: '5',
    title: 'Career Issues',
    imageName: require('../../assets/career.png'),
  },
  {
    id: '6',
    title: 'Depression',
    imageName: require('../../assets/Depression.png'),
  },
];
function SelectArea(props) {
  return (
    <View style={{flex: 1, backgroundColor: userColor.white}}>
      <StatusBarComponent />
      <FlatList
        style={{height: '80%', margin: 5, alignSelf: 'center'}}
        data={Data}
        numColumns={2}
        renderItem={({item}) => (
          <TouchableOpacity style={styles.itemStyle}>
            <Image source={item.imageName} />
            <Text
              style={{
                color: userColor.darkGrey,
                fontSize: normalize(14),
                marginTop: 5,
                fontFamily: 'Gotham Rounded',
              }}>
              {item.title}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
      />
      <View style={{height: '20%', justifyContent: 'center'}}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('doctorhome')}>
          <LinearGradient
            colors={[userColor.backgroundColor, userColor.light_blue]}
            style={{
              backgroundColor: userColor.backgroundColor,
              justifyContent: 'center',
              width: '60%',
              alignItems: 'center',
              alignSelf: 'center',
              margin: 20,
              height: Dimensions.get('window').width * 0.1,
              borderRadius: 25,
              padding: 15,
            }}>
            <Text
              style={{
                fontFamily: 'Gotham Rounded',
                color: 'white',
                fontSize: normalize(16),
              }}>
              Select Your Area
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  itemStyle: {
    marginTop: 20,
    marginEnd: 10,
    marginStart: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width * 0.4,
    height: 150,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: userColor.pest,
    backgroundColor: userColor.white,
    elevation: 4,
  },
});

export default SelectArea;
