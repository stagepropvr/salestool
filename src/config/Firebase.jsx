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

// const config = {
//     apiKey: "AIzaSyDH_UFxLxEo1w5RuI8R3QHoVkWY2r6Xc0M",
//     authDomain: "propvrdb.firebaseapp.com",
//     databaseURL: "https://propvrdb.firebaseio.com",
//     projectId: "propvrdb",
//     storageBucket: "propvrdb.appspot.com",
//     messagingSenderId: "638828877215",
//     appId: "1:638828877215:web:e15b4b2feea9fd876d59aa",
//     measurementId: "G-L2PRD68GYY"
// }

export {Firebase};
const fire = Firebase.initializeApp(config);
export default fire;

