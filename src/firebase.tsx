// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const apiKey = import.meta.env.FIREBASE_API_KEY
const appId = import.meta.env.FIREBASE_APP_ID
const domain = import.meta.env.VITE_FIREBASE_DOMAIN
const msgSenderId = import.meta.env.FIREBASE_MSG_SENDER_ID

console.log(apiKey)
console.log(import.meta.env)
const firebaseConfig = {
  apiKey: apiKey,
  authDomain: `${domain}.firebaseapp.com`,
  projectId: `${domain}`,
  storageBucket: `${domain}.appspot.com`,
  messagingSenderId: msgSenderId,
  appId: appId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export firestore database
// It will be imported into your react app whenever it is needed
export const db = getFirestore(app);