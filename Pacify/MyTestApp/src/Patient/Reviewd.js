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
import {Rating, AirbnbRating} from 'react-native-ratings';
import BackButton from '../Constants/BackButton';
import LinearGradient from 'react-native-linear-gradient';
import StatusBarComponent from '../Constants/StatusBar';

export default class Reviewd extends Component {
  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <StatusBarComponent />
        <BackButton
          title="Reviewed"
          onPress={() => this.props.navigation.goBack()}
        />
        <View
          style={{
            flex: 0.9,
            justifyContent: 'center',
          }}>
          <LinearGradient
            colors={[userColor.backgroundColor, userColor.light_blue]}
            style={{
              backgroundColor: userColor.backgroundColor,
              flex: 0.65,
              width: '75%',
              borderRadius: 5,
              justifyContent: 'center',
              alignSelf: 'center',
              marginTop: 15,
            }}>
            <View
              style={{
                padding: 15,
                flex: 1,
                justifyContent: 'flex-start',
              }}>
              <View
                style={{
                  padding: 15,
                  borderBottomColor: 'white',
                  flex: 0.4,
                  borderBottomWidth: 0.5,
                }}>
                <Text
                  style={{
                    fontSize: normalize(16),
                    color: 'white',
                    textAlign: 'center',
                    padding: 10,
                    fontFamily: 'Gotham Rounded',
                  }}>
                  Thanks for reviewing!
                </Text>

                <Text
                  style={{
                    fontFamily: 'Gotham Rounded',
                    fontSize: normalize(12),
                    color: 'white',
                    textAlign: 'center',
                  }}>
                  your review helps others
                </Text>

                <Text
                  style={{
                    fontFamily: 'Gotham Rounded',
                    fontSize: normalize(12),
                    color: 'white',
                    textAlign: 'center',
                  }}>
                  to choose a better
                </Text>

                <Text
                  style={{
                    fontFamily: 'Gotham Rounded',
                    fontSize: normalize(12),
                    color: 'white',
                    textAlign: 'center',
                  }}>
                  physician
                </Text>
              </View>
              <View
                style={{
                  padding: 15,
                  flex: 0.6,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: 'Gotham Rounded',
                    fontSize: normalize(16),
                    color: 'white',
                    textAlign: 'center',
                  }}>
                  you've reviewed
                </Text>
                <Text
                  style={{
                    fontFamily: 'Gotham Rounded',
                    fontSize: normalize(20),
                    color: 'white',
                  }}>
                  Pof. X
                </Text>
                <Rating
                  ratingCount={5}
                  onFinishRating={this.ratingCompleted}
                  ratingBackgroundColor="transparent"
                  style={{padding: 15, overflow: 'hidden'}}
                />
                <Text
                  style={{
                    fontFamily: 'Gotham Rounded',
                    fontSize: normalize(16),
                    color: 'white',
                    paddingTop: 10,
                  }}>
                  stars!
                </Text>
              </View>
            </View>
          </LinearGradient>
          <View style={{flex: 0.3, justifyContent: 'center'}}>
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
                borderRadius: 5,
                padding: 15,
              }}>
              <TouchableOpacity>
                <Text
                  style={{
                    fontFamily: 'Gotham Rounded',
                    color: 'white',
                    fontSize: normalize(16),
                  }}>
                  Back to home
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </View>
      </View>
    );
  }
}
