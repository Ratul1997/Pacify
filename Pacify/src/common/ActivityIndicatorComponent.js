import React from 'react';
import {View, Text, ActivityIndicator} from 'react-native';

export default function ActivityIndicatorComponent({color, size}) {
  return <ActivityIndicator size={size} color={color} />;
}
