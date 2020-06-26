import React, {Component, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import {userColor,normalize} from '../Constants/colorCode';
import LinearGradient from 'react-native-linear-gradient';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import StatusBarComponent from '../Constants/StatusBar';

const Data = [
  {
    id: '1',
    title: 'Drug Addiction',
    imageName: require('../../assets/drug.png'),
  },
  {
    id: '2',
    title: 'Parenting',
    imageName: require('../../assets/Parenting.png'),
  },
  {
    id: '3',
    title: 'Family Problem',
    imageName: require('../../assets/family.png'),
  },
  {
    id: '4',
    title: 'Gender Violence',
    imageName: require('../../assets/gender.png'),
  },
  {
    id: '5',
    title: 'Career Issues',
    imageName: require('../../assets/career.png'),
  },
  {
    id: '6',
    title: 'Depression',
    imageName: require('../../assets/Depression.png'),
  },
];
class Home extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={{flex: 1, backgroundColor: userColor.white}}>
        <StatusBarComponent />
        <LinearGradient
          colors={[userColor.backgroundColor, userColor.light_blue]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={{
            flex: 0.1,
            justifyContent: 'center',
            alignItems: 'center',
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
            <Text style={{color: 'white', fontSize: normalize(22)}}>Select Service</Text>
          </TouchableOpacity>
        </LinearGradient>

        <FlatList
          style={{alignSelf: 'center', flex: 0.9}}
          data={Data}
          numColumns={2}
          renderItem={({item}) => (
            <TouchableOpacity style={styles.itemStyle} onPress={()=>this.props.navigation.navigate('Doctor')}>
              <Image source={item.imageName} />
              <Text
                style={{
                  color: userColor.darkGrey,
                  fontSize: normalize(13),
                  marginTop: 5,
                  fontFamily: 'Gotham Rounded',
                }}>
                {item.title}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  itemStyle: {
    marginTop: 20,
    marginEnd: 10,
    marginStart: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width * 0.4,
    height: 150,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: userColor.pest,
    backgroundColor: userColor.white,
    elevation: 4,
  },
});

export default Home;
