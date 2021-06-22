import React from 'react';
import {Animated, View, Text, TouchableOpacity} from 'react-native';
import MenuHeader from './common/MenuHeader';
import colorCode from './constants/colorCode';
import LinearGradient from 'react-native-linear-gradient';
import {normalize} from 'jest-config';

export default function MyTabBar({state, descriptors, navigation, position}) {
  return (
    <>
      <MenuHeader title="Patients" openDrawer={() => navigation.openDrawer()} />
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={{flexDirection: 'row'}}
        colors={[colorCode.backgroundColor, colorCode.light_blue]}>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };
          return (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              // onLongPress={onLongPress}
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              key={index}>
              <Text style={{color: isFocused ? 'white' : 'gray'}}>{label}</Text>
            </TouchableOpacity>
          );
        })}
      </LinearGradient>
    </>
  );
}
