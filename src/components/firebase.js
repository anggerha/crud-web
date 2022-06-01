import firebase from 'firebase/app';
import 'firebase/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyBYHbL1bcsqQq15FITpmMSK0hT8o-JgmFc",
    authDomain: "crud-web-540a7.firebaseapp.com",
    projectId: "crud-web-540a7",
    storageBucket: "crud-web-540a7.appspot.com",
    messagingSenderId: "651378638476",
    appId: "1:651378638476:web:ab0544d082621ea4f245a9",
    measurementId: "G-L95YH79ZMT"
}
const firebaseApp = firebase.initializeApp(firebaseConfig);
export const db = firebaseApp.firestore();

export default firebase