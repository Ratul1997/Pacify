import {StyleSheet} from 'react-native';
import {userColor} from './colorCode';

const headerStyle = StyleSheet.create({
  header: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerType2: {
    backgroundColor: userColor.grad1,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontFamily: 'Gotham Rounded',
    fontWeight: '400',
    fontSize: 20,
    color: userColor.white,
  },
});

export default headerStyle;
