import { GuestList, Guest, OwnerName, OWNERS } from '../types';

const STORAGE_KEY = 'wedding_guestlist_v1';

// Initialize empty structure
const getInitialState = (): GuestList => {
  const initial: GuestList = {};
  OWNERS.forEach(owner => {
    initial[owner] = [];
  });
  return initial;
};

export const getGuestList = (): GuestList => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return getInitialState();
    return JSON.parse(stored);
  } catch (e) {
    console.error("Failed to load guest list", e);
    return getInitialState();
  }
};

export const saveGuestList = (list: GuestList) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch (e) {
    console.error("Failed to save guest list", e);
  }
};

export const addGuestToOwner = (owner: OwnerName, guest: Guest): GuestList => {
  const currentList = getGuestList();
  if (!currentList[owner]) currentList[owner] = [];
  
  currentList[owner].push(guest);
  saveGuestList(currentList);
  return currentList;
};

export const removeGuestFromOwner = (owner: OwnerName, guestId: string): GuestList => {
  const currentList = getGuestList();
  if (!currentList[owner]) return currentList;

  currentList[owner] = currentList[owner].filter(g => g.id !== guestId);
  saveGuestList(currentList);
  return currentList;
};
