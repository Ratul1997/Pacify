import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import colorCode from '../constants/colorCode';
import normalize from '../constants/normalize';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';

export default function MenuHeader({openDrawer, title}) {
  return (
    <LinearGradient
      colors={[colorCode.backgroundColor, colorCode.light_blue]}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      style={{
        flex: 0.1,
        justifyContent: 'center',
        alignItems: 'center',
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
        onPress={openDrawer}>
        <MaterialIcon
          name="menu"
          style={{color: 'white'}}
          size={normalize(25)}
        />
      </TouchableOpacity>
      <TouchableOpacity style={{}}>
        <Text style={{color: 'white', fontSize: normalize(22)}}>{title}</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}
