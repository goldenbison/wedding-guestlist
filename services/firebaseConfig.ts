import { initializeApp } from 'firebase/app';
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

// Initialize Firebase using the standard modular SDK
const app = initializeApp(firebaseConfig);

// Export the database instance
export const db = getDatabase(app);