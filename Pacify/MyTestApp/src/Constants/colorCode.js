import {Dimensions, Platform, PixelRatio} from 'react-native';
export const userColor = {
  backgroundColor: '#19769F',
  customDrawer: '#F2F3F4',
  light_gray: '#6E6C6C',
  light_green: 'green',
  light_blue: '#35D8A6',
  border_color: '#5FE5BC',
  text_color: '#19769F',
  pest: 'rgba(95, 229, 188, 255)',
  darkpest: '#208FA0',
  black: '#000',
  white: '#fff',
  darkGrey: 'rgba(61, 61, 61, 255)',
  gard2: '#35D8A6',
  grad1: '#19769F',
  grad3: '#5FE5BC',
  bordergrey: 'rgba(213, 213, 213, 255)',
};

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

// based on iphone 5s's scale
const scale = SCREEN_WIDTH / 320;

export function normalize(size) {
  const newSize = size * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}
