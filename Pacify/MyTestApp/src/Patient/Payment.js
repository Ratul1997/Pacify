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
import FeatherIcon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import BackButton from '../Constants/BackButton';
import StatusBarComponent from '../Constants/StatusBar';
export default class Payment extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <StatusBarComponent />
        <BackButton
          title="Payment"
          onPress={() => this.props.navigation.goBack()}
        />
        <View
          style={{
            flex: 0.9,
          }}>
          <View style={{flex: 0.3, justifyContent: 'center'}}>
            <TouchableOpacity
              style={{
                justifyContent: 'center',
                width: '55%',
                alignItems: 'center',
                alignSelf: 'center',
                margin: 20,
                height: Dimensions.get('window').width * 0.1,
                borderRadius: 5,
                padding: 15,
                backgroundColor: userColor.backgroundColor,
              }} onPress={()=>this.props.navigation.navigate('AppointmentDetails')}>
              <Text
                style={{
                  fontFamily: 'Gotham Rounded',
                  color: 'white',
                  fontSize: normalize(16),
                }}>
                Complete Payment
              </Text>
            </TouchableOpacity>
          </View>
          <LinearGradient
            colors={[userColor.backgroundColor, userColor.light_blue]}
            style={{
              backgroundColor: userColor.backgroundColor,
              flex: 0.65,
              width: '75%',
              borderRadius: 5,
              justifyContent: 'center',
              alignSelf: 'center',
            }}>
            <View
              style={{
                padding: 15,
                flex: 1,
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  padding: 15,
                  flex: 0.3,
                  borderBottomColor: 'white',
                  borderBottomWidth: 0.3,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignContent: 'center',
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Gotham Rounded',
                      fontSize: normalize(33),
                      color: 'white',
                    }}>
                    BDT
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Gotham Rounded',
                      fontSize: normalize(33),
                      color: 'white',
                      paddingLeft: 5,
                    }}>
                    830
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: normalize(12),
                    color: 'white',
                    padding: 5,
                    textAlign: 'center',
                    fontFamily: 'Gotham Rounded',
                  }}>
                  For a single conversation
                </Text>
              </View>
              <View
                style={{
                  padding: 15,
                  backgroundColor: 'transparent',
                  flex: 0.4,
                  justifyContent: 'space-around',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: 'Gotham Rounded',
                    fontSize: normalize(20),
                    color: 'white',
                  }}>
                  Pof. X
                </Text>
                <Text
                  style={{
                    fontFamily: 'Gotham Rounded',
                    fontSize: normalize(20),
                    color: 'white',
                    paddingLeft: 5,
                  }}>
                  Duration: 15min
                </Text>
              </View>
              <View
                style={{
                  padding: 15,
                  flex: 0.2,
                  justifyContent: 'center',
                }}>
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
                    borderColor: 'white',
                    borderWidth: 1,
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Gotham Rounded',
                      color: 'white',
                      fontSize: normalize(20),
                    }}>
                    Pay
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </LinearGradient>
        </View>
      </View>
    );
  }
}
