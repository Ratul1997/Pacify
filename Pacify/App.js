/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import AppNavigation from './src/AppNavigation';
import {persistStore, persistReducer} from 'redux-persist';
import {PersistGate} from 'redux-persist/lib/integration/react';
import StatusBarComponent from './src/common/SatusBar';
import {Provider} from 'react-redux';
import messaging from '@react-native-firebase/messaging';

import {store, pReducer} from './src/reducers';
import PushController from './src/PushController';
const App = () => {
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      // alert(remoteMessage.data.content);

      console.log(remoteMessage);
    });

    return unsubscribe;
  }, []);
  return (
    <>
      <StatusBarComponent />
      <Provider store={store}>
        <PersistGate persistor={persistStore(store)}>
          <PushController />
          <NavigationContainer>
            <AppNavigation />
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </>
  );
};

export default App;
