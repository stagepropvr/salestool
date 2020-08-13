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


export {Firebase};
const fire = Firebase.initializeApp(config);
export default fire;

