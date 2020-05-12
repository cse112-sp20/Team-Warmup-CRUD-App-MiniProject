// Your web app's Firebase configuration
var config = {
  apiKey: "AIzaSyA8jCEXgEsLljtkEUg-RCgHaF6i2cag_kY",
  authDomain: "remote-13.firebaseapp.com",
  databaseURL: "https://remote-13.firebaseio.com",
  projectId: "remote-13",
  storageBucket: "remote-13.appspot.com",
  messagingSenderId: "113160307201",
  appId: "1:113160307201:web:fc2dda4c33c5d2ce4ff600",
  measurementId: "G-3F5MRDS2LK"
};
// Initialize Firebase
firebase.initializeApp(config);

// Get the firebase authenticator. 
const auth = firebase.auth();
 
// Get a reference to the database service
const database = firebase.database();