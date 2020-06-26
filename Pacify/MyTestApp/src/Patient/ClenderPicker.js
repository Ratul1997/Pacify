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
import {userColor} from '../Constants/colorCode';
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import IonicIcon from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import BackButton from '../Constants/BackButton';
import LinearGradient from 'react-native-linear-gradient';
import StatusBarComponent from '../Constants/StatusBar';

export default class ClenderPicker extends Component {
  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <StatusBarComponent />
        <BackButton
          title="Book Appointment"
          onPress={() => this.props.navigation.goBack()}
        />

        <View
          style={{
            flex: 0.7,
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              height: '80%',
              borderRadius: 5,
              justifyContent: 'flex-start',
              alignSelf: 'center',
            }}>
            <CalendarList
              firstDay={1}
              onPressArrowLeft={substractMonth => substractMonth()}
              onPressArrowRight={addMonth => addMonth()}
            />
          </View>
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
                <Text style={{color: 'white', fontSize: 18}}>Next</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </View>
      </View>
    );
  }
}
