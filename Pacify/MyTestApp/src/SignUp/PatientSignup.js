/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import IonicIcon from 'react-native-vector-icons/Ionicons';
import {userColor, normalize} from '../Constants/colorCode';
import LinearGradient from 'react-native-linear-gradient';
import StatusBarComponent from '../Constants/StatusBar';

const DATA = [
  {id: '1', placeholder: 'Name', type: 'TextInput'},
  {id: '2', placeholder: 'E-mail', type: 'TextInput'},
  {id: '3', placeholder: 'Mobile Number', type: 'TextInput'},
  {id: '4', placeholder: 'Password', type: 'TextInput'},
  {id: '5', placeholder: 'Confirm Password', type: 'TextInput'},
  {id: '6', placeholder: 'Profession', type: 'TextInput'},
  {id: '7', placeholder: 'Sign Up', type: 'button'},
];

function Item({_item, props}) {
  if (_item.type === 'TextInput') {
    return (
      <TextInput
        style={styles.textInputStyle}
        placeholder={_item.placeholder}></TextInput>
    );
  } else if (_item.type === 'button') {
    return (
      <TouchableOpacity
        onPress={() => props.navigation.navigate('patienthome')}>
        <LinearGradient
          style={styles.buttonStyle}
          colors={[userColor.backgroundColor, userColor.light_blue]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}>
          <Text
            style={{
              fontFamily: 'Raleway',
              fontWeight: 'bold',
              fontSize: normalize(16),
              color: 'rgba(255, 255, 255, 255)',
            }}>
            {_item.placeholder}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }
}

export default function App(props) {
  return (
    <View style={styles.container}>
      <StatusBarComponent />
      <View style={{flex: 0.1, margin: 25}}>
        <IonicIcon
          name="ios-arrow-back"
          style={{color: userColor.light_gray}}
          size={35}
          onPress={() => props.navigation.goBack()}
        />
      </View>
      <View style={styles.formBody}>
        <Text
          style={{
            fontFamily: 'Gotham Rounded',
            fontWeight: '400',
            fontSize: normalize(20),
            color: 'rgba(25, 118, 159, 255)',
          }}>
          Sign Up
        </Text>
        <FlatList
          data={DATA}
          renderItem={({item}) => <Item _item={item} props={props} />}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 255)',
  },
  formBody: {
    paddingStart: 28,
    paddingEnd: 28,
    flex: 0.9,
  },
  textInputStyle: {
    alignItems: 'flex-start',
    paddingStart: 16,
    paddingTop: 13,
    width: '100%',
    height: 45,
    marginTop: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(213, 213, 213, 255)',
    backgroundColor: 'rgba(255, 255, 255, 255)',
    fontFamily: 'Gotham Rounded',
    fontSize: normalize(14),
    color: 'rgba(149, 152, 154, 255)',
  },
  buttonStyle: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 28,
    width: '60%',
    height: 45,
    borderRadius: 20.5,
    backgroundColor: '#458796',
  },
});
