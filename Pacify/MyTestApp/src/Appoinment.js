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
import {userColor,normalize} from './Constants/colorCode';
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import IonicIcon from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';

import LinearGradient from 'react-native-linear-gradient';
import StatusBarComponent from './Constants/StatusBar';
export default class Appoinment extends Component {

  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <StatusBarComponent />
        <LinearGradient
          colors={[userColor.backgroundColor, userColor.light_blue]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={{flex: 0.1, justifyContent: 'center'}}>
          <View
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
              onPress={() => this.props.navigation.openDrawer()}>
              <MaterialIcon name="menu" style={{color: 'white'}} size={35} />
            </TouchableOpacity>
            <TouchableOpacity style={{}}>
              <Text style={{color: 'white', fontSize: normalize(22)}}>Appointments</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>

        <View
          style={{
            flex: 0.9,
          }}>
          <View
            style={{
              marginTop: 5,
              padding: 10,
              flexDirection: 'row',
              borderBottomColor: userColor.light_gray,
              borderBottomWidth: 0.4,
            }}>
            <Image style={styles.proPic} source={require('./Images/pro.jpg')} />
            <Image
              style={{
                position: 'absolute',
                top: Dimensions.get('window').width * 0.2 - 10,
                left: Dimensions.get('window').width * 0.2,
                borderRadius: 50,
                borderWidth: 1,
                borderColor: '#fff',
              }}
              source={require('./Images/online.png')}
            />
            <View
              style={{
                alignItems: 'flex-start',
                paddingLeft: 20,
                width: Dimensions.get('window').width * 0.5,
              }}>
              <Text
                style={{
                  fontFamily: 'Gotham Rounded',
                  fontSize: normalize(18),
                  color: userColor.backgroundColor,
                }}>
                Ratul Bhowmick
              </Text>
              <Text
                style={{
                  fontFamily: 'Gotham Rounded',
                  color: userColor.light_gray,
                  paddingBottom: 5,
                  fontSize:normalize(12)
                }}>
                Gender Violence
              </Text>
              <View style={{flexDirection: 'row', paddingTop: 15}}>
                <FontistoIcon
                  name="calendar"
                  size={20}
                  color={userColor.light_blue}></FontistoIcon>
                <Text
                  style={{
                    fontFamily: 'Gotham Rounded',
                    color: userColor.light_gray,
                    paddingLeft: 5,
                    fontSize: normalize(10),
                  }}>
                  02 Nov 2020
                </Text>
              </View>
            </View>
            <View
              style={{
                alignItems: 'flex-start',
                paddingTop: 15,
                flexDirection: 'row',
                width: Dimensions.get('window').width * 0.3,
              }}>
              <View style={{width: '50%', flexDirection: 'row'}}>
                <SimpleLineIcons
                  name="clock"
                  size={20}
                  color={userColor.light_blue}></SimpleLineIcons>
                <Text style={{paddingLeft: 10, fontSize: normalize(11)}}>11Am</Text>
              </View>

              <View
                style={{
                  width: '50%',
                  justifyContent: 'center',
                  alignSelf: 'center',
                }}>
                <FeatherIcon
                  name="x-circle"
                  size={20}
                  color={userColor.light_gray}></FeatherIcon>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  proPic: {
    height: Dimensions.get('window').width * 0.2,
    width: Dimensions.get('window').width * 0.2,
    borderRadius: (Dimensions.get('window').width * 0.2) / 2,
    borderWidth: 1,
    borderColor: '#fff',
    justifyContent: 'center',
    alignSelf: 'center',
    padding: 15,
  },
});
