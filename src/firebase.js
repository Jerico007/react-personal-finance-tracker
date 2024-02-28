import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore ,doc,setDoc} from "firebase/firestore";
import {GoogleAuthProvider,getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAD_cu6v-3kwKePObFppcKrnbJc_Ufg5rM",
  authDomain: "financly-web.firebaseapp.com",
  projectId: "financly-web",
  storageBucket: "financly-web.appspot.com",
  messagingSenderId: "164499778110",
  appId: "1:164499778110:web:780482ffc941fed865ff6f",
  measurementId: "G-K7Y1P6RV13"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth();
const provider = new GoogleAuthProvider();
export  {db,auth,doc,setDoc,provider};