
import { Language, Translation } from './types';

export const WEDDING_DATE = "14-15 Nov 2026";

export const TRANSLATIONS: Record<Language, Translation> = {
  [Language.KHMER]: {
    title: "វិកទ័រ & លក្ខណា", // Victor & Lakna
    date: "១៤-១៥ វិច្ឆិកា ២០២៦", // 14-15 Nov 2026
    totalGuests: "ភ្ញៀវសរុប",
    addGuest: "បន្ថែម",
    guestNamePlaceholder: "ឈ្មោះភ្ញៀវ...",
    plusOnesLabel: "អ្នកមកជាមួយ",
    save: "រក្សាទុក",
    cancel: "បិទ",
    delete: "លុប",
    noGuestsYet: "មិនទាន់មានភ្ញៀវ",
    listOwner: "បញ្ជីរបស់",
    guests: "ភ្ញៀវ",
    total: "សរុប",
    back: "ត្រឡប់",
    nameLabel: "ឈ្មោះ",
    guestCount: "ចំនួន",
    selectToView: "សូមចុចលើឈ្មោះដើម្បីមើល ឬបញ្ចូលភ្ញៀវ"
  },
  [Language.ENGLISH]: {
    title: "Victor & Lakna",
    date: "14-15 Nov 2026",
    totalGuests: "Total Guests",
    addGuest: "Add Guest",
    guestNamePlaceholder: "Guest Name...",
    plusOnesLabel: "Plus Ones",
    save: "Save",
    cancel: "Close",
    delete: "Delete",
    noGuestsYet: "No guests yet",
    listOwner: "List by",
    guests: "Guests",
    total: "Total",
    back: "Back",
    nameLabel: "Name",
    guestCount: "Count",
    selectToView: "Please select to view/enter guests"
  }
};

// Mapping English IDs to Khmer Display names for the "Localized" feel
export const OWNER_DISPLAY_NAMES: Record<string, Record<Language, string>> = {
  "Victor": { [Language.ENGLISH]: "Victor", [Language.KHMER]: "វិកទ័រ" },
  "Lakna": { [Language.ENGLISH]: "Lakna", [Language.KHMER]: "លក្ខណា" },
    "Mak Lux": { [Language.ENGLISH]: "Mak Lux", [Language.KHMER]: "ម៉ាក់ លុច" },
  "Mak Thy": { [Language.ENGLISH]: "Mak Thy", [Language.KHMER]: "ម៉ាក់ ធី" },

  "Pa Ty": { [Language.ENGLISH]: "Pa Ty", [Language.KHMER]: "ប៉ា ទី" },
  "Pa Nith": { [Language.ENGLISH]: "Pa Nith", [Language.KHMER]: "ប៉ា និត" },
  "Viphou": { [Language.ENGLISH]: "Viphou", [Language.KHMER]: "វិភូ" },
  "Virakboth": { [Language.ENGLISH]: "Virakboth", [Language.KHMER]: "វិរៈបុត្រ" },
  "Pu Da": { [Language.ENGLISH]: "Pu Da", [Language.KHMER]: "ពូ ដា" },
  "Lok Ta": { [Language.ENGLISH]: "Lok Ta", [Language.KHMER]: "លោកតា" },
  "Lok Yey": { [Language.ENGLISH]: "Lok Yey", [Language.KHMER]: "លោកយាយ" },
  "Ma": { [Language.ENGLISH]: "Ma", [Language.KHMER]: "ម៉ា" }
};