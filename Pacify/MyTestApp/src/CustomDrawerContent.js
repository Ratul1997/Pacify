/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {Text, View, Image} from 'react-native';

import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

import {SafeAreaView, NavigationActions} from 'react-navigation';
import {userColor,normalize} from './Constants/colorCode';
import LinearGradient from 'react-native-linear-gradient';
class CustomDrawerContent extends Component {
  constructor(props) {
    super(props);
  }
  navigateToScreen = route => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route,
    });
    this.props.navigation.dispatch(navigateAction);
  };

  render() {
    return (
      <LinearGradient
        style={{flex: 1}}
        colors={[userColor.backgroundColor, userColor.light_blue]}>
        <SafeAreaView style={{flex: 1}}>
          <View
            style={{
              height: 200,
              width: '80%',
              justifyContent: 'flex-end',
              alignItems: 'center',
              alignSelf: 'center',
              marginBottom: 20,
            }}>
            <Image
              style={{
                height: 80,
                width: 80,
                borderRadius: 50,
              }}
              source={require('./Images/pro.jpg')}
            />
            <Text
              style={{
                fontFamily: 'Gotham Rounded',
                fontSize: normalize(23),
                color: 'white',
              }}>
              Kaniz Fatima
            </Text>
          </View>

          <DrawerContentScrollView>
            <DrawerItemList
              {...this.props}
              activeTintColor="white"
              inactiveBackgroundColor="transparent"
              labelStyle={{color: '#ffffff'}}
            />
          </DrawerContentScrollView>
        </SafeAreaView>
      </LinearGradient>
    );
  }
}
export default CustomDrawerContent;
