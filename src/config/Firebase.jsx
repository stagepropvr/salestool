import Firebase from 'firebase';
import "firebase/auth";

const config = {
 apiKey: "AIzaSyDdkRG1b0pyk6pRufX60vrGcejpKAeqjcg",
  authDomain: "propvr.firebaseapp.com",
  databaseURL: "https://realvr-eb62c.firebaseio.com",
  projectId: "realvr-eb62c",
  storageBucket: "realvr-eb62c.appspot.com",
  messagingSenderId: "172924419383",
  appId: "1:172924419383:web:36e814bf67356da9"
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

