import React from 'react';
import {View, Text, Button} from 'react-native';
import {userAuthActions} from '../actions';

export default function Abc({navigation}) {
  const signOut = () => {
    const {error} = userAuthActions.signOut();
    if (error) alert('Something Went Wrong');
    else navigation.navigate('Login');
  };
  return (
    <View>
      <Button title="SignOut" onPress={signOut} />
    </View>
  );
}
