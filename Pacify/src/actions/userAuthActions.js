export const userAuthActions = {
  googleSignUp,
  emailSignUp,
  signOut,
  emailSignIn,
  storeUserInfo,
  sendNotifications,
};
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import firestore from '@react-native-firebase/firestore';
import axios from 'axios';
GoogleSignin.configure({
  webClientId:
    '415633290918-bask4hu2781duqj6ebeho3bfqk0654id.apps.googleusercontent.com',
});
async function googleSignUp() {
  try {
    const {idToken} = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    const {additionalUserInfo, user} = await auth().signInWithCredential(
      googleCredential,
    );
    const {isNewUser, providerId} = additionalUserInfo;
    return {isNewUser, user, providerId};
  } catch (error) {
    return {error};
  }
}

async function emailSignUp(email, password) {
  try {
    const {
      additionalUserInfo,
      user,
    } = await auth().createUserWithEmailAndPassword(email, password);
    const isNewUser = additionalUserInfo.isNewUser;

    console.log('ujuj', user);
    return {user, additionalUserInfo};
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      console.log('That email address is already in use!');
    }

    if (error.code === 'auth/invalid-email') {
      console.log('That email address is invalid!');
    }
    return {error};
  }
}

async function emailSignIn(email, password) {
  try {
    const {additionalUserInfo, user} = await auth().signInWithEmailAndPassword(
      email,
      password,
    );
    const isNewUser = additionalUserInfo.isNewUser;
    return {isNewUser, user, additionalUserInfo};
  } catch (error) {
    return {error};
  }
}

async function signOut(acount_type) {
  try {
    if (acount_type === 'google') await GoogleSignin.signOut();
    await auth().signOut();
    return {};
  } catch (error) {
    return {error};
  }
}

async function storeUserInfo(data, uid) {
  try {
    await firestore()
      .collection('Users')
      .doc(uid)
      .set({
        ...data,
      });
    return {};
  } catch (error) {
    return {error};
  }
}

async function sendNotifications(topic, title, body) {
  try {
    const formdata = new FormData();
    formdata.append('to', '/topics/' + topic);
    const obj = {
      body: 'This is an FCM notification message!',
      title: 'FCM Message',
    };
    formdata.append('notification', obj);
    await axios.post('https://fcm.googleapis.com/fcm/send', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'key=' + 'AIzaSyCyW69s6icgIzRRGpFeSdhBhDug1COYFT0',
      },
      formdata,
    });
    return {};
  } catch (error) {
    return {error: error};
  }
}
