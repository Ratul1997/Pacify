/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {userColor, normalize} from './Constants/colorCode';
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import IonicIcon from 'react-native-vector-icons/Ionicons';
import {FlatList} from 'react-native-gesture-handler';

import LinearGradient from 'react-native-linear-gradient';
import BackButton from './Constants/BackButton';
import StatusBarComponent from './Constants/StatusBar';
export default class Invoice extends Component {
  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <StatusBarComponent />
        <BackButton
          title="Invoice"
          onPress={() => this.props.navigation.goBack()}
        />

        <View
          style={{
            marginTop: 20,
            marginRight: 15,
            marginLeft: 15,
            marginBottom: 15,
            borderRadius: 10,
            backgroundColor: '#fff',
            elevation: 6,
            flex: 0.45,
            padding: 5,
            borderColor: userColor.border_color,
            borderWidth: 1,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: 15,
              marginRight: 15,
              borderBottomColor: userColor.light_gray,
              borderBottomWidth: 0.5,
              padding: 10,
            }}>
            <Text
              style={{
                fontFamily: 'Gotham Rounded',
                color: userColor.text_color,
                fontSize: normalize(18),
              }}>
              Date:
            </Text>
            <Text
              style={{
                fontFamily: 'Gotham Rounded',
                color: userColor.text_color,
                fontSize: normalize(18),
                paddingLeft: 5,
              }}>
              11-12-2020
            </Text>
          </View>
          <View
            style={{
              marginLeft: 6,
              marginRight: 15,
              padding: 10,
            }}>
            <Text
              style={{
                fontFamily: 'Gotham Rounded',
                color: userColor.light_gray,
                fontSize: normalize(13),
              }}>
              Full Name
            </Text>
            <Text
              style={{fontFamily: 'Gotham Rounded', fontSize: normalize(18)}}>
              Ratul Bhowmick
            </Text>
          </View>
          <View style={{flexDirection: 'row', marginLeft: 6, padding: 10}}>
            <View
              style={{
                width: '50%',
              }}>
              <Text
                style={{
                  fontFamily: 'Gotham Rounded',
                  color: userColor.light_gray,
                  fontSize: normalize(13),
                }}>
                Txlr Id
              </Text>
              <Text
                style={{fontFamily: 'Gotham Rounded', fontSize: normalize(18)}}>
                JN7866540
              </Text>
            </View>
            <View
              style={{
                width: '50%',
              }}>
              <Text
                style={{
                  fontFamily: 'Gotham Rounded',
                  color: userColor.light_gray,
                  fontSize: normalize(13),
                }}>
                Receipt No.
              </Text>
              <Text
                style={{fontFamily: 'Gotham Rounded', fontSize: normalize(18)}}>
                #6785
              </Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', marginLeft: 6, padding: 10}}>
            <View
              style={{
                width: '50%',
              }}>
              <Text
                style={{
                  fontFamily: 'Gotham Rounded',
                  color: userColor.light_gray,
                  fontSize: normalize(13),
                }}>
                Date
              </Text>
              <Text
                style={{fontFamily: 'Gotham Rounded', fontSize: normalize(18)}}>
                18/2087
              </Text>
            </View>
            <View
              style={{
                width: '50%',
              }}>
              <Text
                style={{
                  fontFamily: 'Gotham Rounded',
                  color: userColor.light_gray,
                  fontSize: normalize(13),
                }}>
                Doctor
              </Text>
              <Text
                style={{fontFamily: 'Gotham Rounded', fontSize: normalize(18)}}>
                Prof. X
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
