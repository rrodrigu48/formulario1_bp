// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
 const firebaseConfig = {
    apiKey: "AIzaSyA51CjM7r0zd9EtJE_un5-zTf7xkIeP3kA",
    authDomain: "crup-registro2-bp.firebaseapp.com",
    projectId: "crup-registro2-bp",
    storageBucket: "crup-registro2-bp.appspot.com",
    messagingSenderId: "447686161768",
    appId: "1:447686161768:web:974cbf8fd67826a81152dd"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export{firebase}
