import { decode, encode } from 'base-64';
import './timerConfig';
global.addEventListener = (x) => x;
if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}

import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC1jKOFLhfQoZD3xJISSPnSW9-4SyYPpjY",
  authDomain: "chekout-delivery.firebaseapp.com",
  databaseURL: "https://chekout-delivery.firebaseio.com",
  projectId: "chekout-delivery",
  storageBucket: "chekout-delivery.appspot.com",
  messagingSenderId: "223987454895",
  appId: "1:223987454895:web:1bf87c694c9c8b0052555a",
  measurementId: "G-RRC1V8MPKC"
};

if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);

export { firebase };
