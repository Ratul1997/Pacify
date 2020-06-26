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
  {id: '1', title: 'Patient'},
  {id: '2', title: 'Physician'},
];

export default function App(props) {
  return (
    <View style={styles.container}>
      <StatusBarComponent />
      <View style={{flex: 0.2, margin: 25}}>
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
            color: userColor.backgroundColor,
          }}>
          Register as:
        </Text>
        <FlatList
          data={DATA}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate(
                  item.id != 2 ? 'patientSignUp' : 'doctorSignup',
                )
              }>
              <LinearGradient
                style={styles.selection}
                colors={[userColor.backgroundColor, userColor.light_blue]}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}>
                <Text
                  style={{
                    fontFamily: 'Segoe UI',
                    fontSize: normalize(24),
                    color: 'rgba(243, 243, 243, 255)',
                  }}>
                  {item.title}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          )}
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
    flex: 0.8,
  },
  selection: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    width: '100%',
    height: 100,
    borderRadius: 4,
  },
});
