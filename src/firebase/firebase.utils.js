import firebase from 'firebase/app'
import 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyDH_UFxLxEo1w5RuI8R3QHoVkWY2r6Xc0M",
    authDomain: "propvrdb.firebaseapp.com",
    databaseURL: "https://propvrdb.firebaseio.com",
    projectId: "propvrdb",
    storageBucket: "propvrdb.appspot.com",
    messagingSenderId: "638828877215",
    appId: "1:638828877215:web:e15b4b2feea9fd876d59aa",
    measurementId: "G-L2PRD68GYY"
};

firebase.initializeApp(firebaseConfig);
export const firestore = firebase.firestore();

export default firebase;