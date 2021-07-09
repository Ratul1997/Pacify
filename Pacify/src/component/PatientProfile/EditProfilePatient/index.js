import React from 'react';
import {View, Text} from 'react-native';
import BackButton from '../../../constants/BackButton';
import ImageUpload from '../../DoctorProfile/EditProfiles/ImageUpload';
import Fields from './Fields';
export default function EditProfilePatient({navigation}) {
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <BackButton title="Edit Profile" onPress={() => navigation.goBack()} />
      <ImageUpload />
      <Fields navigation={navigation} />
    </View>
  );
}
