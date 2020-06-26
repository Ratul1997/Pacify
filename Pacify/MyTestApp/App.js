import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Navigator,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigation from './src/AppNavigation';
import Home from './src/Patient/Home';

class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <AppNavigation />
      </NavigationContainer>
    );
  }
}

export default App;
