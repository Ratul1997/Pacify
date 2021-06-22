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
import BackButton from '../../constants/BackButton';
import colorCode from '../../constants/colorCode';
import normalize from '../../constants/normalize';

export default function AppointMentDetails({route, navigation}) {
  const {item} = route.params;
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <BackButton
        title="Appointment Details"
        onPress={() => navigation.goBack()}
      />

      <View
        style={{
          flex: 0.9,
        }}>
        <View
          style={{
            marginLeft: normalize(12),
            marginRight: normalize(12),
            padding: normalize(10),
            flexDirection: 'row',
            flex: 0.2,
          }}>
          <Image
            style={styles.proPic}
            source={
              item.photo_url
                ? {
                    uri: item.photo_url,
                  }
                : require('../../Images/profile.jpg')
            }
          />
          <View
            style={{
              alignItems: 'flex-start',
              justifyContent: 'center',
              paddingLeft: normalize(17),
              width: Dimensions.get('window').width * 0.7,
            }}>
            <Text
              style={{
                fontFamily: 'Gotham Rounded',
                fontSize: normalize(13),
                color: colorCode.backgroundColor,
              }}>
              {item.name}
            </Text>
            <Text
              style={{
                fontFamily: 'Gotham Rounded',
                color: colorCode.light_gray,
                paddingBottom: normalize(5),
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
                size={normalize(17)}></SimpleLineIcons>
              <Text
                style={{
                  fontFamily: 'Gotham Rounded',
                  textAlign: 'center',
                  paddingLeft: normalize(10),
                  color: colorCode.light_gray,
                }}>
                BERDEM
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            flex: 0.6,
            marginLeft: normalize(12),
            marginRight: normalize(12),
            marginBottom: normalize(12),
            borderRadius: 5,
            borderWidth: 1,
            elevation: 2,
            borderColor: colorCode.border_color,
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}>
          <View
            style={{flexDirection: 'row', margin: normalize(12), flex: 0.1}}>
            <FontistoIcon
              name="calendar"
              size={normalize(17)}
              color={colorCode.light_green}></FontistoIcon>
            <Text
              style={{
                fontFamily: 'Gotham Rounded',
                color: colorCode.light_gray,
                paddingLeft: 5,
                fontSize: normalize(10),
                paddingLeft: normalize(12),
              }}>
              02 Nov 1717
            </Text>
          </View>
          <View
            style={{
              flex: 0.7,
              marginLeft: normalize(12),
              marginRight: normalize(12),
              borderTopColor: colorCode.light_gray,
              borderBottomWidth: 0.5,
              borderTopWidth: 0.5,
            }}>
            <View
              style={{
                width: '50%',
                flexDirection: 'row',
                paddingTop: normalize(12),
                paddingBottom: normalize(12),
              }}>
              <SimpleLineIcons
                name="clock"
                size={normalize(22)}
                color={colorCode.light_green}></SimpleLineIcons>
              <Text
                style={{
                  fontFamily: 'Gotham Rounded',
                  paddingLeft: normalize(12),
                  fontSize: normalize(13),
                }}>
                11Am
              </Text>
            </View>
            <Text
              style={{
                fontFamily: 'Gotham Rounded',
                color: colorCode.backgroundColor,
                fontSize: normalize(12),
                paddingTop: normalize(12),
              }}>
              Services
            </Text>
            <Text
              style={{
                fontFamily: 'Gotham Rounded',
                color: colorCode.light_gray,
                fontSize: normalize(12),
                paddingTop: 5,
              }}>
              Conversation
            </Text>
            <Text
              style={{
                fontFamily: 'Gotham Rounded',
                color: colorCode.light_gray,
                fontSize: normalize(12),
                paddingTop: 5,
              }}>
              12 min
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
                  color: colorCode.light_gray,
                  fontSize: normalize(13),
                  paddingTop: 5,
                  alignSelf: 'baseline',
                }}>
                Payable amount:
              </Text>
              <Text
                style={{
                  fontFamily: 'Gotham Rounded',
                  color: colorCode.light_gray,
                  fontSize: normalize(13),
                  paddingTop: 5,
                  alignSelf: 'baseline',
                }}>
                BDT 1220
              </Text>
            </View>
          </View>
          <View
            style={{
              flex: 0.2,
              marginLeft: normalize(12),
              marginRight: normalize(12),
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                fontFamily: 'Gotham Rounded',
                color: colorCode.light_gray,
                fontSize: normalize(13),
                paddingTop: 5,
                alignSelf: 'baseline',
              }}>
              Total
            </Text>
            <Text
              style={{
                fontFamily: 'Gotham Rounded',
                color: colorCode.light_gray,
                fontSize: normalize(13),
                paddingTop: 5,
                alignSelf: 'baseline',
              }}>
              BDT 1220
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
              margin: normalize(17),
              borderRadius: 5,
              padding: normalize(12),
              borderColor: colorCode.backgroundColor,
              borderWidth: 1,
            }}
            onPress={() => navigation.navigate('Review', {item: item})}>
            <Text
              style={{
                fontFamily: 'Gotham Rounded',
                color: 'red',
                fontSize: normalize(13),
              }}>
              Cancel Appointment
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  proPic: {
    height: Dimensions.get('window').width * 0.22,
    width: Dimensions.get('window').width * 0.22,
    borderRadius: (Dimensions.get('window').width * 0.22) / 2,
    borderWidth: 1,
    borderColor: '#fff',
    justifyContent: 'center',
    alignSelf: 'center',
    padding: normalize(12),
  },
});
