import { initializeApp } from 'firebase/app';
const firebaseConfig = {
  apiKey: import.meta.env.VITE_SECRET_FIREBASE_API,
  authDomain: import.meta.env.VITE_SECRET_FIRE_DOMAIN,
  projectId: import.meta.env.VITE_SECRET_PROJECT_ID,
  storageBucket: import.meta.env.VITE_SECRET_CLOUD_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_SECRET_MESSAGE_ID,
  appId: import.meta.env.VITE_SECRET_APP_ID,
};
export const app = initializeApp(firebaseConfig);
