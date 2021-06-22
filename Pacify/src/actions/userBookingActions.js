import firestore from '@react-native-firebase/firestore';
export const userBookingActions = {
  bookDoctor,
};
async function bookDoctor(patientDetails, doctorDetails, date) {
  try {
    console.log(patientDetails, doctorDetails, date.getTime().toString());
    const key = date.getTime().toString();
    await firestore()
      .collection('Users')
      .doc(doctorDetails.uid)
      .collection('Patients')
      .doc(key)
      .set({
        ...patientDetails,
        status: 'Waiting',
        time: date,
      });
    await firestore()
      .collection('Users')
      .doc(patientDetails.uid)
      .collection('Appointments')
      .doc(key)
      .set({
        ...doctorDetails,
        status: 'Waiting',
        time: date,
      });
    return {};
  } catch (err) {
    return {error: err};
  }
}
