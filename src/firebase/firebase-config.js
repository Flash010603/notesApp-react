import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'


const firebaseConfig = {
    apiKey: "AIzaSyDrKlFNI662qr8686z0QmYG2lL64OvL8hI",
    authDomain: "notes-react-a13a9.firebaseapp.com",
    projectId: "notes-react-a13a9",
    storageBucket: "notes-react-a13a9.appspot.com",
    messagingSenderId: "348114485920",
    appId: "1:348114485920:web:c77e29eec4a7f355d67fc5"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export{
    db,
    googleAuthProvider,
    firebase
}
