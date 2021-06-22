import firestore from '@react-native-firebase/firestore';
import axios from 'axios';
export const patientActions = {
  onCompletePayment,
  giveRating,
  sendNotification,
  storeOnHistory,
  storeNotification,
  updateUserInfo,
};
async function onCompletePayment(status, patientDetails, doctorDetails) {
  try {
    await firestore()
      .collection('Users')
      .doc(doctorDetails.uid)
      .collection('Patients')
      .doc(doctorDetails.key)
      .update({
        status: status,
      });
    await firestore()
      .collection('Users')
      .doc(patientDetails.uid)
      .collection('Appointments')
      .doc(doctorDetails.key)
      .update({
        status: status,
      });

    return {};
  } catch (err) {
    return {error: err};
  }
}

async function giveRating(rating, patientDetails, doctorDetails) {
  try {
    await firestore()
      .collection('Users')
      .doc(doctorDetails.uid)
      .collection('Reviews')
      .add({
        rating: rating,
        patientId: patientDetails.uid,
      });

    const snapshot = await firestore()
      .collection('Users')
      .doc(doctorDetails.uid)
      .collection('Reviews')
      .get();
    const totalDoc = snapshot.docs.length;
    let totalRating = 0;
    snapshot.docs.map(doc => {
      totalRating = totalRating + doc.data().rating;
    });

    await firestore()
      .collection('Users')
      .doc(doctorDetails.uid)
      .update({
        rating: totalRating,
        total_number: totalDoc,
      });

    return {};
  } catch (err) {
    return {error: err};
  }
}

async function sendNotification(topicName, msg, type) {
  try {
    const url = 'https://pacify.diligite.com/' + 'send-notification';
    axios.post(url, {
      topicName: topicName,
      msg: msg,
      type: type,
    });
    return {};
  } catch (error) {
    return {error: error};
  }
}

async function storeOnHistory(patientDetails, doctorDetails, key) {
  try {
    const date = new Date();
    await firestore()
      .collection('Users')
      .doc(patientDetails.uid)
      .collection('Appointments')
      .doc(key)
      .delete();
    await firestore()
      .collection('Users')
      .doc(patientDetails.uid)
      .collection('History')
      .add({
        ...doctorDetails,
        time: date,
      });

    return {};
  } catch (err) {
    return {error: err};
  }
}

async function storeNotification(userDetails, time, requestedUser, content) {
  try {
    await firestore()
      .collection('Users')
      .doc(userDetails.uid)
      .collection('Notifications')
      .doc(time.toString())
      .set({
        ...requestedUser,
        msg: content,
      });
  } catch (error) {
    return {error: error};
  }
}

async function updateUserInfo(userDetails) {
  try {
    await firestore()
      .collection('Users')
      .doc(userDetails.uid)
      .update({
        ...userDetails,
      });
    return {};
  } catch (error) {
    return {error: error};
  }
}
