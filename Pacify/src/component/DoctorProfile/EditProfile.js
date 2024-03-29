import React from 'react';
import {View, Text} from 'react-native';
import MenuHeader from './../../common/MenuHeader';
import ImageUpload from './EditProfiles/ImageUpload';
import BackButton from '../../constants/BackButton';
import Fields from './EditProfiles/Fields';
export default function EditProfile({navigation}) {
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <BackButton title="Edit Profile" onPress={() => navigation.goBack()} />
      <ImageUpload />
      <Fields navigation={navigation} />
    </View>
  );
}
