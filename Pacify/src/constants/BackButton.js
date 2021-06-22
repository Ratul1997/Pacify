import React, {Component} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import IonicIcon from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';

import LinearGradient from 'react-native-linear-gradient';
import colorCode from './colorCode';
import normalize from './normalize';
export default class BackButton extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {title} = this.props;
    return (
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
          onPress={this.props.onPress}>
          <IonicIcon name="ios-arrow-back" style={{color: 'white'}} size={25} />
        </TouchableOpacity>
        <TouchableOpacity style={{}}>
          <Text style={{color: 'white', fontSize: normalize(22)}}>{title}</Text>
        </TouchableOpacity>
      </LinearGradient>
    );
  }
}
