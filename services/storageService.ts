import { ref, onValue, set, get, child } from 'firebase/database';
import { db } from './firebaseConfig';
import { GuestList, Guest, OwnerName, OWNERS } from '../types';

const DB_PATH = 'guestlist';

// Initialize empty structure if DB is empty
const getInitialState = (): GuestList => {
  const initial: GuestList = {};
  OWNERS.forEach(owner => {
    initial[owner] = [];
  });
  return initial;
};

// Subscribe to real-time updates
export const subscribeToGuestList = (callback: (data: GuestList) => void) => {
  const guestsRef = ref(db, DB_PATH);
  
  const unsubscribe = onValue(guestsRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      // Firebase might return arrays as objects if keys are integers, 
      // or undefined for empty lists. We need to ensure the structure matches GuestList
      const cleanData = { ...getInitialState(), ...data };
      
      // Ensure every owner has an array, even if empty in DB
      OWNERS.forEach(owner => {
        if (!cleanData[owner]) cleanData[owner] = [];
        // Convert object-map back to array if firebase stored it weirdly
        if (typeof cleanData[owner] === 'object' && !Array.isArray(cleanData[owner])) {
            cleanData[owner] = Object.values(cleanData[owner]);
        }
      });
      
      callback(cleanData);
    } else {
      // If DB is empty, initialize it
      const initial = getInitialState();
      set(guestsRef, initial);
      callback(initial);
    }
  });

  return unsubscribe; // Return function to stop listening
};

export const addGuestToOwner = async (owner: OwnerName, guest: Guest) => {
  const snapshot = await get(child(ref(db), `${DB_PATH}/${owner}`));
  const currentList: Guest[] = snapshot.val() || [];
  
  const updatedList = [...currentList, guest];
  
  // Write directly to DB. The listener in App.tsx will update the UI automatically.
  await set(ref(db, `${DB_PATH}/${owner}`), updatedList);
};

export const removeGuestFromOwner = async (owner: OwnerName, guestId: string) => {
  const snapshot = await get(child(ref(db), `${DB_PATH}/${owner}`));
  const currentList: Guest[] = snapshot.val() || [];
  
  const updatedList = currentList.filter(g => g.id !== guestId);
  
  await set(ref(db, `${DB_PATH}/${owner}`), updatedList);
};