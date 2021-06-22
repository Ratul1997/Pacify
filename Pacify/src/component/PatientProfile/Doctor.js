import React, {Component, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FeactherIcon from 'react-native-vector-icons/Feather';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import IonicIcon from 'react-native-vector-icons/Ionicons';
import FontAwsome from 'react-native-vector-icons/FontAwesome';
import normalize from '../../constants/normalize';
import colorCode from '../../constants/colorCode';
import BackButton from '../../constants/BackButton';
import {FlatList} from 'react-native-gesture-handler';
import ActivityIndicatorComponent from '../../common/ActivityIndicatorComponent';
import {Image} from 'react-native-elements';

export default function Doctor(props) {
  const {navigation, route, item, onNavigate} = props;
  // const {item} = route.params;
  return (
    <View style={{height: '50%'}}>
      <View style={{}}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
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
            PlaceholderContent={
              <ActivityIndicatorComponent size="small" color="green" />
            }
          />
          <Image
            style={{
              position: 'absolute',
              right: Dimensions.get('window').width * 0.46,
              borderRadius: 50,
              borderWidth: 1,
              borderColor: '#fff',
            }}
            source={require('../../Images/online.png')}
          />
          <Text
            style={{
              color: colorCode.text_color,
              fontSize: normalize(15),
              fontFamily: 'Gotham Rounded',
              textAlign: 'center',
            }}>
            {item.name}
          </Text>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignSelf: 'center',
            }}>
            <FlatList
              data={item.selected_areas}
              renderItem={items => {
                return (
                  <Text
                    style={{
                      color: colorCode.light_gray,
                      fontSize: normalize(12),
                    }}>
                    {items.item + ', '}
                  </Text>
                );
              }}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={({item, index}) => index}
            />
          </View>
          <Text
            style={{fontFamily: 'Gotham Rounded', color: colorCode.light_gray}}>
            {item.qualifications}
          </Text>
        </View>
        <View
          style={{
            alignItems: 'center',
            backgroundColor: 'white',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              // alignItems: 'center',
              width: '100%',
              padding: 15,
            }}>
            <TouchableOpacity
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <FeactherIcon
                name="phone-call"
                size={25}
                color={colorCode.light_blue}
              />
              <Text
                style={{
                  color: colorCode.text_color,
                  fontFamily: 'Gotham Rounded',
                }}>
                Call
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <FeactherIcon
                name="star"
                size={25}
                color={colorCode.light_blue}
              />
              <Text
                style={{
                  color: colorCode.text_color,
                  fontFamily: 'Gotham Rounded',
                }}>
                {(item.rating / item.total_number).toFixed(2)}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <FontAwsome name="money" size={25} color={colorCode.light_blue} />
              <Text
                style={{
                  color: colorCode.text_color,
                  fontFamily: 'Gotham Rounded',
                }}>
                {item.fees}
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              borderTopColor: colorCode.light_blue,
              borderTopWidth: 1,
            }}>
            <View
              style={{
                width: '90%',
                flexDirection: 'row',
                alignSelf: 'center',
                alignItems: 'center',
              }}>
              <EvilIcons name="user" size={30} color={colorCode.light_blue} />
              <Text
                style={{
                  fontSize: normalize(14),
                  color: colorCode.light_gray,
                  fontFamily: 'Gotham Rounded',
                }}>
                Qualifications & Practice
              </Text>
            </View>
            <IonicIcon
              name="ios-arrow-forward"
              style={{width: '10%'}}
              size={20}
              color={colorCode.light_blue}
            />
          </View>
        </View>
        <View style={{justifyContent: 'center'}}>
          <TouchableOpacity onPress={onNavigate}>
            <LinearGradient
              colors={[colorCode.backgroundColor, colorCode.light_blue]}
              style={{
                backgroundColor: colorCode.backgroundColor,
                justifyContent: 'center',
                width: '60%',
                alignItems: 'center',
                alignSelf: 'center',
                margin: 20,
                borderRadius: 5,
                padding: 15,
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: normalize(14),
                  fontFamily: 'Gotham Rounded',
                }}>
                Book Appointment
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  ImageStyle: {
    height: normalize(80),
    width: normalize(80),
    borderRadius: 50,
    borderWidth: 2,
    borderColor: colorCode.bordergrey,
  },
  proPic: {
    height: normalize(70),
    width: normalize(70),
    borderRadius: 70,
    borderWidth: 1,
    borderColor: '#fff',
    // margin: 15,
    justifyContent: 'center',
    alignSelf: 'center',
    // padding: 15,
  },
});
