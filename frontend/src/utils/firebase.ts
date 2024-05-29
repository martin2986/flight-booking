import { initializeApp } from 'firebase/app';
const firebaseConfig = {
  apiKey: process.env.SECRET_FIREBASE_API,
  authDomain: 'https://flyeasy.fadairomartins.com',
  projectId: process.env.SECRET_PROJECT_ID,
  storageBucket: process.env.SECRET_CLOUD_STORAGE_BUCKET,
  messagingSenderId: process.env.SECRET_MESSAGE_ID,
  appId: process.env.SECRET_APP_ID,
};
export const app = initializeApp(firebaseConfig);
