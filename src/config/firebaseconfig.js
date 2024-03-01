import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCoE7WDYZnG9AewYVI3MYqZM5F2w_sAwMM",
  authDomain: "zuber-c20f7.firebaseapp.com",
  projectId: "zuber-c20f7",
  storageBucket: "zuber-c20f7.appspot.com",
  messagingSenderId: "486506842932",
  appId: "1:486506842932:web:1539bab3ae02d0a8353361",
  measurementId: "G-88QM3W8VJB"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase