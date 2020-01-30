import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyBzXG6r4n7s-hNtkpktwFot7aV48l-4_2Q",
  authDomain: "todoapp-70bd7.firebaseapp.com",
  databaseURL: "https://todoapp-70bd7.firebaseio.com",
  projectId: "todoapp-70bd7",
  storageBucket: "todoapp-70bd7.appspot.com",
  messagingSenderId: "611592896816",
  appId: "1:611592896816:web:4b3408db7745cbf326c8f5",
  measurementId: "G-GW5D6S0D0H"
};

const fire = firebase.initializeApp(firebaseConfig);

export default fire;
