import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';
import { getAuth, Auth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyDemoKeyForLabHubSharedDB2026',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'labhub-medical-production.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'labhub-medical-production',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'labhub-medical-production.appspot.com',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '140762755244',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:140762755244:web:c33d26b31a4c48a5c30c5a'
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

export const db: Firestore = getFirestore(app);
export const storage: FirebaseStorage = getStorage(app);
export const auth: Auth = getAuth(app);
export default app;
