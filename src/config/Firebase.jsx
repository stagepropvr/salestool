import Firebase from 'firebase';
import "firebase/auth";

const config = {
    apiKey: "AIzaSyBFxRtxrD3jM6WfLSVksicZGadFgUQ9tVM",
    authDomain: "socio-8c7cf.firebaseapp.com",
    databaseURL: "https://socio-8c7cf.firebaseio.com",
    projectId: "socio-8c7cf",
    storageBucket: "socio-8c7cf.appspot.com",
    messagingSenderId: "971172228538",
    appId: "1:971172228538:web:0729d10ad3b47df8748183"
};

const fire = Firebase.initializeApp(config);
export default fire;
