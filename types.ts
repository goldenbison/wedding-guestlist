
export enum Language {
  KHMER = 'km',
  ENGLISH = 'en'
}

export interface Guest {
  id: string;
  name: string;
  plusOnes: number;
  timestamp: number;
}

export interface GuestList {
  [ownerName: string]: Guest[];
}

export interface Translation {
  title: string;
  date: string;
  totalGuests: string;
  addGuest: string;
  guestNamePlaceholder: string;
  plusOnesLabel: string;
  save: string;
  cancel: string;
  delete: string;
  noGuestsYet: string;
  listOwner: string;
  guests: string;
  total: string;
  back: string;
  nameLabel: string;
  guestCount: string;
  selectToView: string;
}

export const OWNERS = [
  "Victor", 
  "Lakna", 
  "Mak Lux", 
  "Mak Thy", 
  "Pa Nith", 
  "Pa Ty", 
  "Viphou", 
  "Virakboth",
  "Pu Da",
  "Lok Yey",
  "Lok Ta",
  "Ma"
] as const;

export type OwnerName = typeof OWNERS[number];
