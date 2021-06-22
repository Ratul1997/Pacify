/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StatusBar,
  StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import colorCode from '../constants/colorCode';

export default class StatusBarComponent extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const StatusBarHeight = StatusBar.currentHeight;
    return (
      <View>
        <StatusBar
          barStyle="light-content"
          translucent={true}
          backgroundColor="transparent"
        />
        <View style={{height: StatusBarHeight, width: '100%'}}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={[colorCode.backgroundColor, colorCode.light_blue]}
            style={style.Container}></LinearGradient>
        </View>
      </View>
    );
  }
}
const style = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#2980b9',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
