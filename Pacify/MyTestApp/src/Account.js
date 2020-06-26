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
import {userColor, normalize} from './Constants/colorCode';
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import IonicIcon from 'react-native-vector-icons/Ionicons';
import {FlatList} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import StatusBarComponent from './Constants/StatusBar';
const numColumns = 3;

const Data = [
  {
    name: 'Age',
    value: '24yrs',
  },
  {
    name: 'Blood',
    value: 'AB',
  },
  {
    name: 'Gender',
    value: 'Male',
  },
  {
    name: 'Height',
    value: '174',
  },
  {
    name: 'Weight',
    value: '70kg',
  },
  {
    name: 'Profession',
    value: 'Student',
  },
];

export default class Account extends Component {
  constructor(props) {
    super(props);
  }
  renderItem = ({item, index}) => {
    return (
      <View style={styles.item}>
        <Text
          style={{
            fontFamily: 'Gotham Rounded',
            fontSize: normalize(16),
          }}>
          {item.name}
        </Text>
        <Text
          style={{
            fontFamily: 'Gotham Rounded',
            color: userColor.light_gray,
          }}>
          {item.value}
        </Text>
      </View>
    );
  };
  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBarComponent />
        <LinearGradient
          colors={[userColor.backgroundColor, userColor.light_blue]}
          style={{flex: 1}}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flex: 0.1,
              flexDirection: 'row',
            }}>
            <TouchableOpacity
              style={{
                position: 'absolute',
                top: 0,
                left: 20,
                bottom: 0,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => this.props.navigation.openDrawer()}>
              <MaterialIcon name="menu" style={{color: 'white'}} size={35} />
            </TouchableOpacity>
            <TouchableOpacity style={{}}>
              <Text
                style={{
                  color: 'white',
                  fontSize: normalize(22),
                  fontFamily: 'Gotham Rounded',
                }}>
                User Profile
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              margin: 15,
              borderRadius: 10,
              backgroundColor: '#fff',
              elevation: 6,
              flex: 0.9,
            }}>
            <Image style={styles.proPic} source={require('./Images/pro.jpg')} />
            <Text
              style={{
                fontFamily: 'Gotham Rounded',
                color: userColor.text_color,
                fontSize: normalize(18),
                fontWeight: 'bold',
                justifyContent: 'center',
                alignSelf: 'center',
              }}>
              Kaniz fatima Tonni
            </Text>

            <FlatList
              style={{
                marginTop: 10,
                maxHeight: '30%',
                minHeight: '20%',
              }}
              data={formatData(Data, numColumns)}
              numColumns={numColumns}
              renderItem={this.renderItem}
              keyExtractor={item => item.name}
            />
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                marginLeft: 20,
                marginTop: 20,
                marginRight: 20,
                borderColor: userColor.light_blue,
                borderWidth: 1,
                borderRadius: 10,
              }}
              onPress={() => this.props.navigation.navigate('Invoice')}>
              <View style={{width: '90%', flexDirection: 'row', padding: 10}}>
                <FontistoIcon
                  name="umbrella"
                  size={25}
                  style={{padding: 2}}
                  color={userColor.light_blue}
                />
                <Text
                  style={{
                    fontFamily: 'Gotham Rounded',
                    fontSize: normalize(16),
                    paddingLeft: 15,
                    color: userColor.light_gray,
                  }}>
                  Invoice
                </Text>
              </View>
              <IonicIcon
                name="ios-arrow-forward"
                style={{width: '10%', padding: 10, alignSelf: 'center'}}
                size={20}
                color={userColor.light_blue}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                margin: 20,
                borderColor: userColor.light_blue,
                borderWidth: 1,
                borderRadius: 10,
              }}
              onPress={() => this.props.navigation.navigate('MyDoctors')}>
              <View style={{width: '90%', flexDirection: 'row', padding: 10}}>
                <FontistoIcon
                  name="heart-alt"
                  size={20}
                  style={{padding: 2}}
                  color={userColor.light_blue}
                />
                <Text
                  style={{
                    fontFamily: 'Gotham Rounded',
                    fontSize: normalize(16),
                    paddingLeft: 15,
                    color: userColor.light_gray,
                  }}>
                  Favourite Doctor
                </Text>
              </View>
              <IonicIcon
                name="ios-arrow-forward"
                style={{width: '10%', padding: 10}}
                size={20}
                color={userColor.light_blue}
              />
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  proPic: {
    height: Dimensions.get('window').width * 0.25,
    width: Dimensions.get('window').width * 0.25,
    borderRadius: (Dimensions.get('window').width * 0.25) / 2,
    borderWidth: 1,
    borderColor: '#fff',
    margin: 15,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  item: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1,
    shadowColor: '#000',
    shadowOpacity: 0.9,
    elevation: 4,
    padding: 10,
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
});
const formatData = (data, numColumns) => {
  const numberOfFullRows = Math.floor(data.length / numColumns);

  let numberOfElementsLastRow = data.length - numberOfFullRows * numColumns;
  while (
    numberOfElementsLastRow !== numColumns &&
    numberOfElementsLastRow !== 0
  ) {
    data.push({key: `blank-${numberOfElementsLastRow}`, empty: true});
    numberOfElementsLastRow++;
  }

  return data;
};
