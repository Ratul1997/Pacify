import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import colorCode from '../../constants/colorCode';
import normalize from '../../constants/normalize';

import FontistoIcon from 'react-native-vector-icons/Fontisto';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
export default function OnCall({navigation, item, onPress}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        margin: normalize(20),
        borderColor: colorCode.light_blue,
        borderWidth: 1,
        borderRadius: 10,
        alignItems: 'center',
      }}>
      <View
        style={{
          padding: normalize(10),
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View style={{width: '15%'}}>
          <Image
            style={{
              height: normalize(25),
              width: normalize(25),
              borderRadius: 50,
              margin: normalize(3),
            }}
            source={
              item.photo_url
                ? {
                    uri: item.photo_url,
                  }
                : require('../../Images/profile.jpg')
            }
          />
        </View>
        <View style={{width: '70%'}}>
          <Text
            style={{
              fontFamily: 'Gotham Rounded',
              fontSize: normalize(16),
              color: colorCode.backgroundColor,
              fontStyle: 'italic',
            }}
            numberOfLines={1}>
            {item.name}
            <Text
              style={{
                fontFamily: 'Gotham Rounded',
                fontSize: normalize(15),
                paddingLeft: 5,
              }}>
              is on video call
            </Text>
          </Text>
        </View>

        <View style={{width: '15%'}}>
          <TouchableOpacity
            style={{
              backgroundColor: colorCode.pest,
              height: normalize(20),
              width: normalize(40),
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
            }}
            onPress={onPress}>
            <Text>Join</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
