import firebase from 'firebase/compat/app';
import { getDatabase } from 'firebase/database';

// Using hardcoded configuration to ensure deployment works immediately.
const firebaseConfig = {
  apiKey: "AIzaSyBcpryD1YY0YBAF6drySou0T6grGtMHZFA",
  authDomain: "wedding-guestlist-e5a6c.firebaseapp.com",
  databaseURL: "https://wedding-guestlist-e5a6c-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "wedding-guestlist-e5a6c",
  storageBucket: "wedding-guestlist-e5a6c.firebasestorage.app",
  messagingSenderId: "51436709712",
  appId: "1:51436709712:web:a46cbf4da783d2102fee55",
  measurementId: "G-RP0P9V5ZVW"
};

// Fix: Use compat initializeApp to resolve missing export error in some environments
const app = firebase.initializeApp(firebaseConfig);
// Cast to any to avoid type mismatch between compat App and modular FirebaseApp
export const db = getDatabase(app as any);