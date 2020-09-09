import firebase from 'firebase/app';
import 'firebase/firebase-firestore';
import 'firebase/auth';
import 'firebase/storage';
 
 // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDVnwYJnM8nzmZYkyZhzOLgKAa-KEwPfU4",
    authDomain: "react-dev-connect.firebaseapp.com",
    databaseURL: "https://react-dev-connect.firebaseio.com",
    projectId: "react-dev-connect",
    storageBucket: "react-dev-connect.appspot.com",
    messagingSenderId: "579745601994",
    appId: "1:579745601994:web:5a20c3c7cc2be60d221733",
    measurementId: "G-JH4DLJRQBY"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
 
 export  const storage = firebase.storage();

  export  {   firebase as default};  

