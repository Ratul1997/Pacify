import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import normalize from '../../../constants/normalize';
import Entypo from 'react-native-vector-icons/Entypo';
import colorCode from '../../../constants/colorCode';

import {Image} from 'react-native-elements';
import DocumentPicker from 'react-native-document-picker';
import ActivityIndicatorComponent from '../../../common/ActivityIndicatorComponent';
import {patientActions} from '../../../actions';
import {userConstants} from '../../../constants/userConstants';

function ImageUpload({userDetails, updateDetails}) {
  const [singleFile, setSingleFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const selectFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        // Provide which type of file you want user to pick
        type: [DocumentPicker.types.images],
        // There can me more options as well
        // DocumentPicker.types.allFiles
        // DocumentPicker.types.images
        // DocumentPicker.types.plainText
        // DocumentPicker.types.audio
        // DocumentPicker.types.pdf
      });
      // Printing the log realted to the file

      console.log('res : ' + JSON.stringify(res));

      // Setting the state to show single file attributes
      // setSingleFile(res);
      upload(res);
    } catch (err) {
      setSingleFile(null);
      // Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        // If user canceled the document selection
        alert('Canceled');
      } else {
        // For Unknown Error
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };

  const upload = async singleFile => {
    console.log('click');
    // Check if any file is selected or not

    if (singleFile != null) {
      // If file selected then create FormData
      const fileToUpload = singleFile;
      const data = new FormData();
      data.append('name', 'Image Upload');
      data.append('file_attachment', fileToUpload);
      // Please change file upload URL
      const url = 'https://videoallapi.medionbd.com/';
      setIsLoading(true);
      try {
        let res = await fetch('https://videoallapi.medionbd.com/upload.php', {
          method: 'post',
          body: data,
          headers: {
            'Content-Type': 'multipart/form-data; ',
          },
        });
        let responseJson = await res.json();
        if (responseJson.status == 1) {
          const data = {
            ...userDetails,
            photo_url: url + responseJson.data[0],
          };
          const {error} = await patientActions.updateUserInfo(data);
          updateDetails(data);
          alert('Upload Successful');
        } else {
          alert(responseJson.msg);
        }
      } catch (error) {
        alert('Some Thing Went Wrong');
      }
    } else {
      // If no file selected the show alert
      alert('Please Select File first');
    }
    setIsLoading(false);
  };

  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: normalize(20),
      }}>
      <Image
        style={{
          height: normalize(100),
          width: normalize(100),
          borderRadius: normalize(50),
        }}
        PlaceholderContent={
          <ActivityIndicatorComponent size="small" color="green" />
        }
        placeholderStyle={{
          height: normalize(100),
          width: normalize(100),
          borderRadius: normalize(50),
        }}
        source={
          userDetails.photo_url
            ? {
                uri: userDetails.photo_url,
              }
            : require('../../../Images/profile.jpg')
        }
      />
      <TouchableOpacity
        style={{
          position: 'absolute',
          right: '35%',
          bottom: 0,
          backgroundColor: colorCode.backgroundColor,
          borderRadius: 100,
          height: normalize(25),
          width: normalize(25),
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={isLoading ? null : selectFile}>
        {isLoading ? (
          <ActivityIndicatorComponent size="small" color="white" />
        ) : (
          <Entypo name="camera" size={normalize(15)} color="white" />
        )}
      </TouchableOpacity>
    </View>
  );
}
function mapState(state) {
  const {userDetails} = state.userReducers;
  return {userDetails};
}

const actionCreators = {
  updateDetails: user => dispatch =>
    dispatch({type: userConstants.UPDATE_USER_DETAILS, user}),
};
export default connect(mapState, actionCreators)(ImageUpload);
