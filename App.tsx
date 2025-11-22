
import React, { useState, useEffect } from 'react';
import { GuestList, Language, OWNERS, OwnerName, Guest } from './types';
import { TRANSLATIONS } from './constants';
import { subscribeToGuestList, addGuestToOwner, removeGuestFromOwner } from './services/storageService';
import { SummaryCard } from './components/SummaryCard';
import { GuestModal } from './components/GuestModal';
import { Globe, Heart } from 'lucide-react';

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>(Language.KHMER);
  const [guestList, setGuestList] = useState<GuestList>({});
  const [selectedOwner, setSelectedOwner] = useState<OwnerName | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Subscribe to Real-time Firebase updates on mount
  useEffect(() => {
    const unsubscribe = subscribeToGuestList((data) => {
      setGuestList(data);
      setIsLoading(false);
    });

    // Cleanup listener when app closes
    return () => unsubscribe();
  }, []);

  const t = TRANSLATIONS[language];

  const handleLanguageToggle = () => {
    setLanguage(prev => prev === Language.KHMER ? Language.ENGLISH : Language.KHMER);
  };

  const handleAddGuest = async (name: string, plusOnes: number) => {
    if (!selectedOwner) return;
    
    const newGuest: Guest = {
      id: crypto.randomUUID(),
      name,
      plusOnes,
      timestamp: Date.now()
    };

    // We don't need to set state manually here.
    // We send to Firebase, Firebase updates, the listener triggers, and React updates.
    await addGuestToOwner(selectedOwner, newGuest);
  };

  const handleRemoveGuest = async (id: string) => {
    if (!selectedOwner) return;
    await removeGuestFromOwner(selectedOwner, id);
  };

  // Calculate Grand Total
  const grandTotal = (Object.values(guestList) as Guest[][]).reduce((total, list) => {
    // Ensure list is an array before reducing (safety check)
    const validList = Array.isArray(list) ? list : [];
    return total + validList.reduce((subTotal, guest) => subTotal + 1 + guest.plusOnes, 0);
  }, 0);

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center bg-primary-50">
        <div className="w-10 h-10 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-primary-200">
      
      {/* Floating Header */}
      <div className="fixed top-0 left-0 right-0 z-40 px-4 pt-4 pb-2 pointer-events-none">
        <div className="max-w-md mx-auto bg-white/90 backdrop-blur-xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] rounded-[2rem] px-5 py-4 flex items-center justify-between pointer-events-auto border border-white/50">
          <div className="flex flex-col justify-center min-h-[2.5rem]">
             <h1 className={`font-black text-slate-900 leading-normal pb-0.5 ${language === Language.KHMER ? 'text-xl' : 'text-2xl'}`}>
               {t.title}
             </h1>
             <div className="flex items-center gap-1.5 mt-0.5">
                <Heart className="w-3.5 h-3.5 text-primary-500 fill-primary-500" />
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest leading-none pt-0.5">{t.date}</p>
             </div>
          </div>
          
          <button 
            onClick={handleLanguageToggle}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-50 text-slate-600 font-bold text-base hover:bg-primary-50 hover:text-primary-600 transition-colors border border-slate-100"
          >
            <Globe className="w-4 h-4" />
            <span className="pb-0.5">{language === Language.KHMER ? 'EN' : 'ខ្មែរ'}</span>
          </button>
        </div>
      </div>

      {/* Hero Section with padding for fixed header */}
      <div className="pt-32 pb-8 px-6">
        <div className="max-w-md mx-auto text-center">
          <div className="inline-flex flex-col items-center justify-center relative">
             <div className="absolute -inset-4 bg-primary-100/50 rounded-full blur-2xl opacity-50"></div>
             <span className="relative text-7xl font-black text-slate-900 tracking-tighter leading-none">
              {grandTotal}
             </span>
             <span className="relative text-base font-black text-primary-500 uppercase tracking-[0.2em] mt-3 leading-loose pb-1">
               {t.totalGuests}
             </span>
          </div>
          
          <p className="mt-6 text-slate-400 text-base font-bold uppercase tracking-widest opacity-80 leading-relaxed px-4">
             {t.selectToView}
          </p>
        </div>
      </div>

      {/* Main Grid */}
      <main className="max-w-md mx-auto px-4 pb-safe-bottom mb-16">
        <div className="grid grid-cols-2 gap-4">
          {OWNERS.map((owner) => (
            <SummaryCard
              key={owner}
              ownerName={owner}
              guests={guestList[owner] || []}
              onClick={() => setSelectedOwner(owner)}
              language={language}
            />
          ))}
        </div>
        
        <div className="mt-16 text-center pb-10">
            <div className="inline-block h-1.5 w-16 bg-slate-200 rounded-full mb-5"></div>
            <p className="text-slate-300 text-base font-bold uppercase tracking-widest leading-loose">
               {t.date}
            </p>
        </div>
      </main>

      {/* Modal */}
      {selectedOwner && (
        <GuestModal
          ownerName={selectedOwner}
          guests={guestList[selectedOwner] || []}
          translations={t}
          language={language}
          onClose={() => setSelectedOwner(null)}
          onAddGuest={handleAddGuest}
          onRemoveGuest={handleRemoveGuest}
        />
      )}
    </div>
  );
};

export default App;
