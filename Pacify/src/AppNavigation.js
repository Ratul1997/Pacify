import React, {useEffect, useState} from 'react';
import {Text, View, TouchableOpacity, Image, Easing} from 'react-native';

import messaging from '@react-native-firebase/messaging';

import {createDrawerNavigator} from '@react-navigation/drawer';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import {
  createStackNavigator,
  CardStyleInterpolators,
  TransitionPresets,
} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Login from './component/Auth/Login';
import Abc from './component/Abc';
import PatientSignUp from './component/Auth/PatientSignUp';
import DocSignUp from './component/Auth/DocSignUp';
import ChooseOption from './component/Auth/ChooseOption';
import SelectArea from './component/DoctorProfile/SelectArea';
import colorCode from './constants/colorCode';

import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomDrawerContent from './CustomDrawerContent';
import Home from './component/PatientProfile/Home';
import PatientAccount from './component/PatientProfile/PatientAccount';
import DoctorList from './component/PatientProfile/DoctorList';
import Doctor from './component/PatientProfile/Doctor';
import Payment from './component/PatientProfile/Payment';
import AppointMentDetails from './component/PatientProfile/AppointMentDetails';
import Review from './component/PatientProfile/Review';
import {connect} from 'react-redux';
import FavDoctors from './component/PatientProfile/FavDoctors';
import History from './common/History';
import DoctorProfile from './component/DoctorProfile/DoctorProfile';
import Invoice from './common/Invoice';
import WaitingList from './component/DoctorProfile/WaitingList';
import Approved from './component/DoctorProfile/Approved';
import MenuHeader from './common/MenuHeader';
import CompletedPayment from './component/DoctorProfile/CompletedPayment';
import ApprovedList from './component/PatientProfile/ApprovedList';
import Pending from './component/PatientProfile/Pending';
import MyTabBar from './MyTabBar';
import LinearGradient from 'react-native-linear-gradient';
import CompletePayment from './component/PatientProfile/CompletePayment';
import VideoCall from './component/VideoCall/VideoCall';
import DocHisotory from './component/DoctorProfile/DocHisotory';
import EditProfile from './component/DoctorProfile/EditProfile';
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();
function PatientProfile() {
  return (
    <Stack.Navigator
      initialRouteName="patientTabs"
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
      }}>
      <Stack.Screen name="patientTabs" component={PatientTab} />
      <Stack.Screen name="DoctorList" component={DoctorList} />
      <Stack.Screen name="Doctors" component={Doctor} />
      <Stack.Screen name="Payment" component={Payment} />
      <Stack.Screen name="AppointmentDetails" component={AppointMentDetails} />
      <Stack.Screen name="Review" component={Review} />
      <Stack.Screen name="FavDoctors" component={FavDoctors} />
      <Drawer.Screen name="VideoCall" component={VideoCall} />
    </Stack.Navigator>
  );
}
function PatientTab() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        style: {backgroundColor: 'white'},
        activeTintColor: colorCode.light_blue,
        showLabel: false,
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <FeatherIcon name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={PatientAccount}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color, size}) => (
            <AntDesign name="user" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Invoice"
        component={Invoice}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({color, size}) => (
            <FontAwesome name="sliders" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
function PatientDrawers() {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      initialRouteName="Profile"
      drawerPosition="left"
      drawerContentOptions={{
        itemStyle: {
          borderBottomColor: 'white',
          borderBottomWidth: 0.5,
        },
      }}>
      <Drawer.Screen name="Profile" component={PatientProfile} />
      <Drawer.Screen name="Appointments" component={AppointMentStatus} />
      <Drawer.Screen
        name="History"
        component={History}
        initialParams={{type: 1}}
      />
    </Drawer.Navigator>
  );
}

function DoctorProfileStack() {
  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{
        headerShown: false,
      }}>
      <Drawer.Screen name="Profile" component={DoctorProfile} />
      <Drawer.Screen name="EditProfile" component={EditProfile} />
      <Drawer.Screen name="VideoCall" component={VideoCall} />
    </Stack.Navigator>
  );
}
function PatientList({navigation}) {
  return (
    <>
      <MenuHeader title="Patients" openDrawer={() => navigation.openDrawer()} />
      <TopTab.Navigator
        tabBarOptions={{
          activeTintColor: 'black',
          inactiveTintColor: colorCode.bordergrey,
          labelStyle: {fontSize: 12},
        }}>
        <TopTab.Screen name="Waiting" component={WaitingList} />
        <TopTab.Screen name="Approved" component={Approved} />
        <TopTab.Screen name="Completed Payment" component={CompletedPayment} />
        <TopTab.Screen name="History" component={DocHisotory} />
      </TopTab.Navigator>
    </>
  );
}

function AppointMentStatus({navigation}) {
  return (
    <>
      <MenuHeader
        title="Appointments"
        openDrawer={() => navigation.openDrawer()}
      />
      <TopTab.Navigator
        tabBarOptions={{
          activeTintColor: 'black',
          inactiveTintColor: colorCode.bordergrey,
          labelStyle: {fontSize: 12},
        }}>
        <TopTab.Screen name="Pending" component={Pending} />
        <TopTab.Screen name="Approved" component={ApprovedList} />
        <TopTab.Screen name="Completed Payment" component={CompletePayment} />
      </TopTab.Navigator>
    </>
  );
}
function DoctorDrawers() {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      initialRouteName="DoctProfile"
      drawerPosition="left"
      drawerContentOptions={{
        itemStyle: {
          borderBottomColor: 'white',
          borderBottomWidth: 0.5,
        },
      }}>
      <Drawer.Screen name="Profile" component={DoctorProfileStack} />
      <Drawer.Screen name="Patients" component={PatientList} />
      <Drawer.Screen
        name="History"
        component={History}
        initialParams={{type: 2}}
      />
      <Drawer.Screen name="Invoice" component={Invoice} />
    </Drawer.Navigator>
  );
}

function DocOrPatient() {
  return (
    <Stack.Navigator
      initialRouteName="ChooseOption"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="ChooseOption" component={ChooseOption} />
      <Stack.Screen name="PatientSignUp" component={PatientSignUp} />
      <Stack.Screen name="DocSignUp" component={DocSignUp} />
      <Stack.Screen name="PatientHome" component={PatientDrawers} />
      <Stack.Screen name="DocHome" component={DoctorDrawers} />
      <Stack.Screen name="SelectArea" component={SelectArea} />
    </Stack.Navigator>
  );
}
function LandingPage({userDetails, navigation}) {
  const [isCalling, setIsCalling] = useState(false);

  console.log(userDetails);
  return !userDetails.type ? (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="doctorOrPatient" component={DocOrPatient} />
      <Stack.Screen name="SelectArea" component={SelectArea} />
    </Stack.Navigator>
  ) : userDetails.type === 1 ? (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {isCalling ? (
        <View>
          <Text>OK</Text>
        </View>
      ) : (
        <Stack.Screen name="PatientHome" component={PatientDrawers} />
      )}
    </Stack.Navigator>
  ) : (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="DocHome" component={DoctorDrawers} />
    </Stack.Navigator>
  );
}
function mapState(state) {
  const {userDetails} = state.userReducers;
  const {isCalling} = state.callingReducer;
  return {userDetails, isCalling};
}
const actionCreators = {};
export default connect(mapState, actionCreators)(LandingPage);
