import * as firebase from 'firebase';
import 'firebase/storage';

var firebaseConfig = {
    apiKey: "AIzaSyCXM5yBRgSvdEB19Ra_NHQ7f2YcakHkYXU",
    authDomain: "charifa-firebase.firebaseapp.com",
    projectId: "charifa-firebase",
    storageBucket: "charifa-firebase.appspot.com",
    messagingSenderId: "918875475984",
    appId: "1:918875475984:web:95c166bee0e1f1f1847a95"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export const database = firebase.firestore();