
import React from 'react';
import { Guest, Language } from '../types';
import { OWNER_DISPLAY_NAMES } from '../constants';
import { Users } from 'lucide-react';

interface SummaryCardProps {
  ownerName: string;
  guests: Guest[];
  onClick: () => void;
  language: Language;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({ ownerName, guests, onClick, language }) => {
  const totalCount = guests.reduce((acc, guest) => acc + 1 + guest.plusOnes, 0);
  const displayName = OWNER_DISPLAY_NAMES[ownerName]?.[language] || ownerName;

  return (
    <button 
      onClick={onClick}
      className="group relative flex flex-col items-center justify-between p-5 bg-white rounded-3xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-slate-100 active:scale-[0.98] transition-all duration-300 hover:shadow-md hover:border-primary-200 h-44 w-full overflow-hidden"
    >
      {/* Decorative Background Blob */}
      <div className="absolute -top-10 -right-10 w-24 h-24 bg-primary-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl" />
      
      {/* Top Label */}
      <div className="w-full text-left z-10">
        <h3 className={`font-black text-slate-900 truncate leading-relaxed pb-1 px-1 -mx-1 text-xl`}>
          {displayName}
        </h3>
      </div>
      
      {/* Center Count */}
      <div className="flex flex-col items-center z-10 mt-1">
        <span className="text-5xl font-black text-primary-500 tracking-tighter leading-none px-1">
          {totalCount}
        </span>
      </div>

      {/* Bottom Label */}
      <div className="w-full flex items-center justify-between z-10 mt-auto pt-2">
        <span className="text-sm font-bold text-slate-400 uppercase tracking-widest leading-normal pb-0.5 px-0.5">
          {language === Language.KHMER ? 'ភ្ញៀវ' : 'GUESTS'}
        </span>
        <div className="w-7 h-7 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-primary-50 group-hover:text-primary-500 transition-colors">
            <Users className="w-3.5 h-3.5" />
        </div>
      </div>
    </button>
  );
};
