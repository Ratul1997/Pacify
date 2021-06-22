import React, {Component, useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Rating, AirbnbRating} from 'react-native-ratings';
import LinearGradient from 'react-native-linear-gradient';
import BackButton from '../../constants/BackButton';
import colorCode from '../../constants/colorCode';
import normalize from '../../constants/normalize';
import {patientActions} from '../../actions';
import {connect} from 'react-redux';

function Review({navigation, route, userDetails}) {
  const [rating, setRating] = useState(5);
  const {item} = route.params;
  useEffect(() => {
    let isMounted = true;
    return () => {
      isMounted = false;
    };
  }, []);

  const onSubmitRating = async () => {
    const {error} = await patientActions.giveRating(rating, userDetails, item);
    if (error) {
      console.log(error);
    } else {
      navigation.reset({
        index: 0,
        routes: [{name: 'PatientHome'}],
      });
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <BackButton title="Review" onPress={() => navigation.goBack()} />
      <View
        style={{
          flex: 0.9,
          justifyContent: 'center',
        }}>
        <LinearGradient
          colors={[colorCode.backgroundColor, colorCode.light_blue]}
          style={{
            backgroundColor: colorCode.backgroundColor,
            flex: 0.65,
            width: '75%',
            borderRadius: 5,
            justifyContent: 'center',
            alignSelf: 'center',
            marginTop: normalize(12),
          }}>
          <View
            style={{
              padding: normalize(12),
              flex: 1,
              justifyContent: 'flex-start',
            }}>
            <View
              style={{
                padding: normalize(12),
                borderBottomColor: 'white',
                flex: 0.4,
                borderBottomWidth: 0.5,
              }}>
              <Text
                style={{
                  fontSize: normalize(13),
                  color: 'white',
                  textAlign: 'center',
                  padding: normalize(10),
                  fontFamily: 'Gotham Rounded',
                }}>
                Thanks for reviewing!
              </Text>

              <Text
                style={{
                  fontFamily: 'Gotham Rounded',
                  fontSize: normalize(12),
                  color: 'white',
                  textAlign: 'center',
                }}>
                your review helps others
              </Text>

              <Text
                style={{
                  fontFamily: 'Gotham Rounded',
                  fontSize: normalize(12),
                  color: 'white',
                  textAlign: 'center',
                }}>
                to choose a better
              </Text>

              <Text
                style={{
                  fontFamily: 'Gotham Rounded',
                  fontSize: normalize(12),
                  color: 'white',
                  textAlign: 'center',
                }}>
                physician
              </Text>
            </View>
            <View
              style={{
                padding: normalize(12),
                flex: 0.6,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontFamily: 'Gotham Rounded',
                  fontSize: normalize(13),
                  color: 'white',
                  textAlign: 'center',
                }}>
                you've reviewed
              </Text>
              <Text
                style={{
                  fontFamily: 'Gotham Rounded',
                  fontSize: normalize(17),
                  color: 'white',
                }}>
                {item.name}
              </Text>
              <Rating
                ratingCount={5}
                onFinishRating={rating => setRating(rating)}
                ratingBackgroundColor="transparent"
                style={{padding: normalize(12), overflow: 'hidden'}}
              />
              <Text
                style={{
                  fontFamily: 'Gotham Rounded',
                  fontSize: normalize(13),
                  color: 'white',
                  paddingTop: normalize(10),
                }}>
                stars!
              </Text>
            </View>
          </View>
        </LinearGradient>
        <TouchableOpacity
          onPress={onSubmitRating}
          style={{flex: 0.3, justifyContent: 'center'}}>
          <LinearGradient
            colors={[colorCode.backgroundColor, colorCode.light_blue]}
            style={{
              backgroundColor: colorCode.backgroundColor,
              justifyContent: 'center',
              width: '60%',
              alignItems: 'center',
              alignSelf: 'center',
              margin: normalize(17),
              borderRadius: 5,
              padding: normalize(12),
            }}>
            <Text
              style={{
                fontFamily: 'Gotham Rounded',
                color: 'white',
                fontSize: normalize(13),
              }}>
              Back to home
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}
function mapState(state) {
  const {userDetails} = state.userReducers;
  return {userDetails};
}
const actionCreators = {};
export default connect(mapState, actionCreators)(Review);
