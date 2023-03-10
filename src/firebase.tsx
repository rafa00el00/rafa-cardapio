// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const apiKey = import.meta.env.VITE_FIREBASE_API_KEY
const appId = import.meta.env.VITE_FIREBASE_APP_ID
const domain = import.meta.env.VITE_FIREBASE_DOMAIN
const msgSenderId = import.meta.env.VITE_FIREBASE_MSG_SENDER_ID

const firebaseConfig = {
  apiKey: apiKey,
  authDomain: `${domain}.firebaseapp.com`,
  projectId: `${domain}`,
  storageBucket: `${domain}.appspot.com`,
  messagingSenderId: msgSenderId,
  appId: appId
};

// Initialize Firebase
const appFb = initializeApp(firebaseConfig);

// Export firestore database
// It will be imported into your react app whenever it is needed
export const db = getFirestore(appFb);
export const auth = getAuth(appFb);