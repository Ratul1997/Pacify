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
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import IonicIcon from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import colorCode from '../../constants/colorCode';
import normalize from '../../constants/normalize';
import BackButton from '../../constants/BackButton';

export default class FavDoctors extends Component {
  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <BackButton
          title="My Doctor"
          onPress={() => this.props.navigation.goBack()}
        />
        <View
          style={{
            flex: 0.9,
          }}>
          <View
            style={{
              marginTop: 5,
              padding: 10,
              flexDirection: 'row',
              borderBottomColor: colorCode.light_gray,
              borderBottomWidth: 0.4,
            }}>
            <Image
              style={styles.proPic}
              source={require('../../Images/pro.jpg')}
            />
            <Image
              style={{
                position: 'absolute',
                top: Dimensions.get('window').width * 0.02,
                left: Dimensions.get('window').width * 0.026,
                borderRadius: 50,
                borderWidth: 1,
                borderColor: '#fff',
              }}
              source={require('../../Images/online.png')}
            />
            <View
              style={{
                alignItems: 'flex-start',
                paddingLeft: 20,
                width: Dimensions.get('window').width * 0.6,
              }}>
              <Text
                style={{
                  fontFamily: 'Gotham Rounded',
                  fontSize: normalize(18),
                  color: colorCode.backgroundColor,
                }}>
                Dr. Ratul
              </Text>
              <Text
                style={{
                  fontFamily: 'Gotham Rounded',
                  color: colorCode.light_gray,
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
                  color={colorCode.light_green}
                  size={17}></SimpleLineIcons>
                <Text
                  style={{
                    fontFamily: 'Gotham Rounded',
                    textAlign: 'center',
                    paddingLeft: 10,
                    color: colorCode.light_gray,
                  }}>
                  BERDEM
                </Text>
              </View>
            </View>
            <View
              style={{
                alignItems: 'center',
                paddingTop: 15,
                justifyContent: 'center',
                width: Dimensions.get('window').width * 0.2,
              }}>
              <FontistoIcon
                name="heart-alt"
                size={20}
                style={{padding: 2}}
                color="red"
              />
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
