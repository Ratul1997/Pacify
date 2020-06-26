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
import {userColor, normalize} from '../Constants/colorCode';
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import IonicIcon from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import BackButton from '../Constants/BackButton';
import StatusBarComponent from '../Constants/StatusBar';
export default class AppointMentDetails extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <StatusBarComponent />
        <BackButton
          title="Appointment Details"
          onPress={() => this.props.navigation.goBack()}
        />

        <View
          style={{
            flex: 0.9,
          }}>
          <View
            style={{
              marginLeft: 15,
              marginRight: 15,
              padding: 10,
              flexDirection: 'row',
              flex: 0.2,
            }}>
            <Image
              style={styles.proPic}
              source={require('../Images/pro.jpg')}
            />
            <View
              style={{
                alignItems: 'flex-start',
                justifyContent: 'center',
                paddingLeft: 20,
                width: Dimensions.get('window').width * 0.7,
              }}>
              <Text
                style={{
                  fontFamily: 'Gotham Rounded',
                  fontSize: normalize(16),
                  color: userColor.backgroundColor,
                }}>
                Dr. Ratul
              </Text>
              <Text
                style={{
                  fontFamily: 'Gotham Rounded',
                  color: userColor.light_gray,
                  paddingBottom: 5,
                }}>
                Gender Violence
              </Text>
              <View
                style={{
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
                    color: userColor.light_gray,
                  }}>
                  BERDEM
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              flex: 0.6,
              marginLeft: 15,
              marginRight: 15,
              marginBottom: 15,
              borderRadius: 5,
              borderWidth: 1,
              elevation: 2,
              borderColor: userColor.border_color,
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}>
            <View style={{flexDirection: 'row', margin: 15, flex: 0.1}}>
              <FontistoIcon
                name="calendar"
                size={20}
                color={userColor.light_green}></FontistoIcon>
              <Text
                style={{
                  fontFamily: 'Gotham Rounded',
                  color: userColor.light_gray,
                  paddingLeft: 5,
                  fontSize: normalize(10),
                  paddingLeft: 15,
                }}>
                02 Nov 2020
              </Text>
            </View>
            <View
              style={{
                flex: 0.7,
                marginLeft: 15,
                marginRight: 15,
                borderTopColor: userColor.light_gray,
                borderBottomWidth: 0.5,
                borderTopWidth: 0.5,
              }}>
              <View
                style={{
                  width: '50%',
                  flexDirection: 'row',
                  paddingTop: 15,
                  paddingBottom: 15,
                }}>
                <SimpleLineIcons
                  name="clock"
                  size={25}
                  color={userColor.light_green}></SimpleLineIcons>
                <Text
                  style={{
                    fontFamily: 'Gotham Rounded',
                    paddingLeft: 15,
                    fontSize: normalize(13),
                  }}>
                  11Am
                </Text>
              </View>
              <Text
                style={{
                  fontFamily: 'Gotham Rounded',
                  color: userColor.backgroundColor,
                  fontSize: normalize(15),
                  paddingTop: 15,
                }}>
                Services
              </Text>
              <Text
                style={{
                  fontFamily: 'Gotham Rounded',
                  color: userColor.light_gray,
                  fontSize: normalize(15),
                  paddingTop: 5,
                }}>
                Conversation
              </Text>
              <Text
                style={{
                  fontFamily: 'Gotham Rounded',
                  color: userColor.light_gray,
                  fontSize: normalize(15),
                  paddingTop: 5,
                }}>
                15 min
              </Text>
              <View
                style={{
                  fontFamily: 'Gotham Rounded',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  paddingTop: normalize(10),
                }}>
                <Text
                  style={{
                    fontFamily: 'Gotham Rounded',
                    color: userColor.light_gray,
                    fontSize: normalize(16),
                    paddingTop: 5,
                    alignSelf: 'baseline',
                  }}>
                  Payable amount:
                </Text>
                <Text
                  style={{
                    fontFamily: 'Gotham Rounded',
                    color: userColor.light_gray,
                    fontSize: normalize(16),
                    paddingTop: 5,
                    alignSelf: 'baseline',
                  }}>
                  BDT 1250
                </Text>
              </View>
            </View>
            <View
              style={{
                flex: 0.2,
                marginLeft: 15,
                marginRight: 15,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  fontFamily: 'Gotham Rounded',
                  color: userColor.light_gray,
                  fontSize: normalize(16),
                  paddingTop: 5,
                  alignSelf: 'baseline',
                }}>
                Total
              </Text>
              <Text
                style={{
                  fontFamily: 'Gotham Rounded',
                  color: userColor.light_gray,
                  fontSize: normalize(16),
                  paddingTop: 5,
                  alignSelf: 'baseline',
                }}>
                BDT 1250
              </Text>
            </View>
          </View>
          <View style={{flex: 0.2}}>
            <TouchableOpacity
              style={{
                justifyContent: 'center',
                width: '80%',
                alignItems: 'center',
                alignSelf: 'center',
                margin: 20,
                height: Dimensions.get('window').width * 0.1,
                borderRadius: 5,
                padding: 15,
                borderColor: userColor.backgroundColor,
                borderWidth: 1,
              }}
              onPress={() => this.props.navigation.navigate('Review')}>
              <Text
                style={{
                  fontFamily: 'Gotham Rounded',
                  color: 'red',
                  fontSize: normalize(16),
                }}>
                Cancel Appointment
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  proPic: {
    height: Dimensions.get('window').width * 0.25,
    width: Dimensions.get('window').width * 0.25,
    borderRadius: (Dimensions.get('window').width * 0.25) / 2,
    borderWidth: 1,
    borderColor: '#fff',
    justifyContent: 'center',
    alignSelf: 'center',
    padding: 15,
  },
});
