import firebase from 'firebase';

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: 'student-schedule-helper.firebaseapp.com',
  databaseURL: 'https://student-schedule-helper.firebaseio.com',
  projectId: 'student-schedule-helper',
  storageBucket: 'student-schedule-helper.appspot.com',
  messagingSenderId: '811825284125'
};
firebase.initializeApp(config);

export default firebase;
