import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD0kQ7bjDimljcjY4Fnm4Xo7kgViiChOxw",
  authDomain: "chatapp-76e8d.firebaseapp.com",
  projectId: "chatapp-76e8d",
  storageBucket: "chatapp-76e8d.appspot.com",
  messagingSenderId: "268121974090",
  appId: "1:268121974090:web:6b74492e1e4a785c900db3",
  measurementId: "G-8W63573PMR"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);


const db = firebaseApp.firestore();
const auth = firebase.auth();



const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
