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
import {userColor,normalize} from '../Constants/colorCode';
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import IonicIcon from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import LinearGradient from 'react-native-linear-gradient';
import StatusBarComponent from '../Constants/StatusBar';
export default class DoctorProfile extends Component {

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
              <Text
                style={{
                  color: 'white',
                  fontSize: normalize(22),
                  fontFamily: 'Gotham Rounded',
                }}>
                Profile
              </Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>

        <View
          style={{
            flex: 0.9,
          }}>
          <View
            style={{
              marginTop: 15,
              padding: 15,
              flexDirection: 'row',
              borderBottomColor: userColor.light_gray,
              borderBottomWidth: 0.5,
            }}>
            <Image
              style={styles.proPic}
              source={require('../Images/pro.jpg')}
            />
            <Image
              style={{
                position: 'absolute',
                top: Dimensions.get('window').width * 0.09,
                left: Dimensions.get('window').width * 0.08,
                borderRadius: 50,
                borderWidth: 1,
                borderColor: '#fff',
              }}
              source={require('../Images/online.png')}
            />
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'flex-start',
                padding: 15,
              }}>
              <Text
                style={{
                  fontSize: normalize(18),
                  color: userColor.backgroundColor,
                  fontFamily: 'Gotham Rounded',
                }}>
                Dr. Faruq Alam
              </Text>
              <Text
                style={{
                  fontFamily: 'Gotham Rounded',
                  color: userColor.light_gray,
                  fontSize:normalize(12)
                }}>
                Psychiatrist, Gender Violence
              </Text>
            </View>
          </View>
          <View
            style={{
              padding: 15,
              borderBottomColor: userColor.light_gray,
              borderBottomWidth: 0.5,
            }}>
            <Text
              style={{
                fontFamily: 'Gotham Rounded',
                fontSize: normalize(18),
                color: userColor.backgroundColor,
              }}>
              Fees
            </Text>
            <Text
              style={{
                fontFamily: 'Gotham Rounded',
                color: userColor.light_gray,
                paddingLeft: 10,
                fontSize:normalize(12)
              }}>
              BDT 1500
            </Text>
          </View>
          <View
            style={{
              padding: 15,
              borderBottomColor: userColor.light_gray,
              borderBottomWidth: 0.5,
            }}>
            <Text
              style={{
                fontFamily: 'Gotham Rounded',
                fontSize: normalize(18),
                color: userColor.backgroundColor,
              }}>
              Address & Timing
            </Text>
            <View
              style={{
                paddingLeft: 10,
                paddingTop: 10,
                flexDirection: 'row',
                alignContent: 'center',
              }}>
              <SimpleLineIcons
                name="location-pin"
                color={userColor.light_green}
                size={17}></SimpleLineIcons>
              <Text
                style={{
                  fontFamily: 'Gotham Rounded',
                  textAlign: 'center',
                  paddingLeft: 10,
                  fontSize:normalize(12),
                  color: userColor.light_gray,
                }}>
                BERDEM
              </Text>
            </View>
            <View
              style={{
                paddingLeft: 10,
                paddingTop: 5,
                flexDirection: 'row',
                alignContent: 'center',
              }}>
              <SimpleLineIcons
                name="clock"
                color={userColor.light_green}
                size={17}></SimpleLineIcons>
              <Text
                style={{
                  fontFamily: 'Gotham Rounded',
                  textAlign: 'center',
                  paddingLeft: 10,
                  fontSize:normalize(12),
                  color: userColor.light_gray,
                }}>
                11:00 AM to 1.00 PM
              </Text>
            </View>
          </View>
          <View
            style={{
              padding: 15,
              borderBottomColor: userColor.light_gray,
              borderBottomWidth: 0.5,
            }}>
            <Text
              style={{
                fontFamily: 'Gotham Rounded',
                fontSize: normalize(18),
                color: userColor.backgroundColor,
              }}>
              Certifications
            </Text>

            <View
              style={{
                paddingLeft: 10,
                paddingTop: 10,
                flexDirection: 'row',
                alignContent: 'center',
              }}>
              <Text
                style={{
                  fontFamily: 'Gotham Rounded',
                  textAlign: 'center',
                  paddingLeft: 10,
                  fontSize:normalize(12),
                  color: userColor.light_gray,
                }}>
                FCPS
              </Text>
            </View>
            <View
              style={{
                paddingLeft: 10,
                paddingTop: 5,
                flexDirection: 'row',
                alignContent: 'center',
              }}>
              <Text
                style={{
                  fontFamily: 'Gotham Rounded',
                  textAlign: 'center',
                  paddingLeft: 10,
                  fontSize:normalize(12),
                  color: userColor.light_gray,
                }}>
                MBBS
              </Text>
            </View>
          </View>
          <LinearGradient
            colors={[userColor.backgroundColor, userColor.light_blue]}
            style={{
              backgroundColor: userColor.backgroundColor,
              justifyContent: 'center',
              width: '50%',
              alignItems: 'center',
              alignSelf: 'center',
              margin: 20,
              height: Dimensions.get('window').width * 0.1,
              borderRadius: 5,
              padding: 15,
            }}>
            <TouchableOpacity>
              <Text style={{color: 'white', fontSize: normalize(16)}}>Edit Profile</Text>
            </TouchableOpacity>
          </LinearGradient>
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
    margin: 15,
    justifyContent: 'center',
    alignSelf: 'center',
    padding: 15,
  },
});
