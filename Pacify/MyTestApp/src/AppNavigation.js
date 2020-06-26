/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View, TouchableOpacity, Image, Easing} from 'react-native';

import {createDrawerNavigator} from '@react-navigation/drawer';
import Account from './Account';
import {
  createStackNavigator,
  CardStyleInterpolators,
  TransitionPresets,
} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Appoinment from './Appoinment';
import Doctorlist from './Patient/Doctorlist';
import Home from './Patient/Home';
import Login from './Login';
import DocOrPatient from './SignUp/DocOrPatient';
import PatientSignup from './SignUp/PatientSignup';
import DoctorSignUp from './SignUp/DoctorSignUp';


import CustomDrawerContent from './CustomDrawerContent';
import {userColor} from './Constants/colorCode';
import Invoice from './Invoice';
import DoctorProfile from './Doctor/DoctorProfile';
import MyDoctors from './Patient/MyDoctors';
import AppointMentDetails from './Patient/AppointMentDetails';
import Payment from './Patient/Payment';
import Reviewd from './Patient/Reviewd';
import ClenderPicker from './Patient/ClenderPicker';
import TimePicker from './Patient/TimePicker';
import ForgetPassword from './ForgetPassword';
import SelectArea from './Doctor/SelectArea';
import History from './Doctor/History';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Doctor from './Patient/Doctor';

const Tab = createBottomTabNavigator();
const StackPatientHome = createStackNavigator();
const TabPatient = createBottomTabNavigator();
const StackApp = createStackNavigator();
const DoctorDrawer = createDrawerNavigator();
const PatientDrawer = createDrawerNavigator();
const SignUpStack = createStackNavigator();
const PatientProfileStack = createStackNavigator();

function HomePagePatient() {
  return (
    <StackPatientHome.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        ...TransitionPresets.SlideFromRightIOS,
      }}>
      <StackPatientHome.Screen name="Home" component={Home} />
      <StackPatientHome.Screen name="Doctor" component={Doctorlist} />
      <StackPatientHome.Screen name="Payment" component={Payment} />
      <StackPatientHome.Screen
        name="AppointmentDetails"
        component={AppointMentDetails}
      />
      <StackPatientHome.Screen name="Review" component={Reviewd} />

      <StackApp.Screen name="selectedDoctor" component={Doctor} />
    </StackPatientHome.Navigator>
  );
}

function PatientProfile() {
  return (
    <PatientProfileStack.Navigator
      initialRouteName="Account"
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        ...TransitionPresets.SlideFromRightIOS,
      }}>
      <PatientProfileStack.Screen name="Account" component={Account} />
      <PatientProfileStack.Screen name="Invoice" component={Invoice} />
      <PatientProfileStack.Screen name="MyDoctors" component={MyDoctors} />
    </PatientProfileStack.Navigator>
  );
}
function PatientTab() {
  return (
    <TabPatient.Navigator
      tabBarOptions={{
        style: {backgroundColor: 'white'},
        activeTintColor: userColor.light_blue,
        showLabel: false,
      }}>
      <TabPatient.Screen
        name="Home"
        component={HomePagePatient}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <FeatherIcon name="home" color={color} size={size} />
          ),
        }}
      />
      <TabPatient.Screen
        name="Account"
        component={PatientProfile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color, size}) => (
            <AntDesign name="user" color={color} size={size} />
          ),
        }}
      />
      <TabPatient.Screen
        name="Invoice"
        component={Invoice}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({color, size}) => (
            <FontAwesome name="sliders" color={color} size={size} />
          ),
        }}
      />
    </TabPatient.Navigator>
  );
}
function PatientDrawers() {
  return (
    <PatientDrawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      initialRouteName="Profile"
      drawerPosition="left"
      drawerContentOptions={{
        itemStyle: {
          borderBottomColor: 'white',
          borderBottomWidth: 0.5,
        },
      }}>
      <PatientDrawer.Screen name="Profile" component={PatientTab} />
      <PatientDrawer.Screen name="Appointments" component={Appoinment} />
      <PatientDrawer.Screen name="History" component={History} />
    </PatientDrawer.Navigator>
  );
}

function DoctorHome() {
  return (
    <DoctorDrawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      initialRouteName="Profile"
      drawerPosition="left"
      drawerContentOptions={{
        itemStyle: {
          borderBottomColor: 'white',
          borderBottomWidth: 0.5,
        },
      }}>
      <DoctorDrawer.Screen name="Profile" component={DoctorProfile} />
      <DoctorDrawer.Screen name="Appointment" component={Appoinment} />
      <DoctorDrawer.Screen name="History" component={History} />
    </DoctorDrawer.Navigator>
  );
}
function DocOrPatientSignUp() {
  return (
    <SignUpStack.Navigator
      initialRouteName="doctorOrPatient"
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        ...TransitionPresets.SlideFromRightIOS,
      }}>
      <SignUpStack.Screen name="doctorOrPatient" component={DocOrPatient} />
      <SignUpStack.Screen name="patientSignUp" component={PatientSignup} />
      <SignUpStack.Screen name="doctorSignup" component={DoctorSignUp} />
      <SignUpStack.Screen name="patienthome" component={PatientDrawers} />
      <SignUpStack.Screen name="selectarea" component={SelectArea} />
      <SignUpStack.Screen name="doctorhome" component={DoctorHome} />
    </SignUpStack.Navigator>
  );
}

function LandingPage() {
  return (
    <StackApp.Navigator
      initialRouteName="login"
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        ...TransitionPresets.SlideFromRightIOS,
      }}>
      <StackApp.Screen name="login" component={Login} />
      <StackApp.Screen name="doctorOrPatient" component={DocOrPatientSignUp} />
      <StackApp.Screen name="forgetpass" component={ForgetPassword} />
    </StackApp.Navigator>
  );
}
export default LandingPage;
