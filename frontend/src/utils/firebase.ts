// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'mern-auth-db741.firebaseapp.com',
  projectId: 'mern-auth-db741',
  storageBucket: 'mern-auth-db741.appspot.com',
  messagingSenderId: '1002597819683',
  appId: '1:1002597819683:web:0b6373ed58c2ba6f169896',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
