import firestore from '@react-native-firebase/firestore';
import axios from 'axios';
export const doctorActions = {
  getPatients,
  updatePatientReq,
  storeOnHistory,
  sendNotification,
  storeNotification,
};
async function getPatients(uid, status) {
  console.log(uid, status);
  try {
    let patients = [];
    const data = await firestore()
      .collection('Users')
      .doc(uid)
      .collection('Patients')
      // Filter results
      .where('status', '==', status)
      .onSnapshot(
        querySnapshot => {
          /* ... */
          // console.log(querySnapshot.size);

          patients = querySnapshot.docs.map(doc => {
            return {...doc.data(), key: doc.id};
          });
          return {patients: patients};
        },
        function(error) {
          return {error: error};
        },
      );
    console.log('sdsd', data);

    return {patients: patients};
  } catch (error) {
    return {error: error};
  }
}

async function updatePatientReq(
  documenetId,
  status,
  patientDetails,
  doctorDetails,
) {
  console.log(patientDetails.uid, doctorDetails.phone_number);
  try {
    if (status === 'Delete') {
      await firestore()
        .collection('Users')
        .doc(doctorDetails.uid)
        .collection('Patients')
        .doc(documenetId)
        .delete();
      await firestore()
        .collection('Users')
        .doc(patientDetails.uid)
        .collection('Appointments')
        .doc(documenetId)
        .delete();

      return {};
    }
    await firestore()
      .collection('Users')
      .doc(doctorDetails.uid)
      .collection('Patients')
      .doc(documenetId)
      .update({
        status: status,
      });
    await firestore()
      .collection('Users')
      .doc(patientDetails.uid)
      .collection('Appointments')
      .doc(documenetId)
      .update({
        status: status,
      });

    return {};
  } catch (err) {
    return {error: err};
  }
}

async function storeOnHistory(patientDetails, doctorDetails, key) {
  try {
    const date = new Date();
    await firestore()
      .collection('Users')
      .doc(doctorDetails.uid)
      .collection('Patients')
      .doc(key)
      .delete();
    await firestore()
      .collection('Users')
      .doc(doctorDetails.uid)
      .collection('History')
      .add({
        ...patientDetails,
        time: date,
      });

    return {};
  } catch (err) {
    return {error: err};
  }
}

async function sendNotification(topicName, msg, type, body, title) {
  try {
    const url = 'https://pacify.diligite.com/' + 'send-notification';
    axios.post(url, {
      topicName: topicName,
      msg: msg,
      type: type,
      body: body,
      title: title,
    });
    return {};
  } catch (error) {
    return {error: error};
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
        content: content,
      });
  } catch (error) {
    return {error: error};
  }
}
