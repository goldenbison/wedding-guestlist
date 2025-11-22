
import React, { useState, useEffect, useRef } from 'react';
import { Guest, Translation, Language } from '../types';
import { X, Trash2, Plus, Minus, User } from 'lucide-react';
import { OWNER_DISPLAY_NAMES } from '../constants';

interface GuestModalProps {
  ownerName: string;
  guests: Guest[];
  translations: Translation;
  language: Language;
  onClose: () => void;
  onAddGuest: (name: string, plusOnes: number) => void;
  onRemoveGuest: (id: string) => void;
}

export const GuestModal: React.FC<GuestModalProps> = ({ 
  ownerName, 
  guests, 
  translations, 
  language,
  onClose, 
  onAddGuest,
  onRemoveGuest 
}) => {
  const [newName, setNewName] = useState('');
  const [newPlusOnes, setNewPlusOnes] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listEndRef = useRef<HTMLDivElement>(null);

  // Reset form when opening
  useEffect(() => {
    setNewName('');
    setNewPlusOnes(0);
    // Slight delay for animation smooth
    setTimeout(() => inputRef.current?.focus(), 300);
  }, [ownerName]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    onAddGuest(newName, newPlusOnes);
    setNewName('');
    setNewPlusOnes(0);
    inputRef.current?.focus();
    
    // Scroll to bottom to show new entry
    setTimeout(() => {
        listEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const totalHeadcount = guests.reduce((sum, g) => sum + 1 + g.plusOnes, 0);
  const displayName = OWNER_DISPLAY_NAMES[ownerName]?.[language] || ownerName;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-300" 
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-lg bg-white rounded-t-[2.5rem] sm:rounded-[2.5rem] shadow-2xl flex flex-col max-h-[90vh] animate-in slide-in-from-bottom-10 duration-300 overflow-hidden">
        
        {/* Header */}
        <div className="flex-none px-8 pt-8 pb-4 bg-white z-20 flex items-start justify-between">
            <div>
                <h2 className={`font-black text-slate-900 leading-relaxed pb-1 px-1 -mx-1 ${language === Language.KHMER ? 'text-2xl' : 'text-3xl'}`}>
                    {displayName}
                </h2>
                <p className="text-primary-500 font-bold text-base mt-1 uppercase tracking-wider leading-normal pb-1 px-1">
                    {translations.total}: {totalHeadcount}
                </p>
            </div>
            <button 
                onClick={onClose}
                className="p-2 -mr-2 bg-slate-50 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-900 transition-colors"
            >
                <X className="w-8 h-8" />
            </button>
        </div>

        {/* Scrollable List Area */}
        <div className="flex-1 overflow-y-auto px-6 pb-4 space-y-3">
            {guests.length === 0 ? (
                <div className="h-48 flex flex-col items-center justify-center text-slate-300">
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                        <User className="w-8 h-8" strokeWidth={1.5} />
                    </div>
                    <p className="text-base font-bold px-2">{translations.noGuestsYet}</p>
                </div>
            ) : (
                guests.map((guest) => (
                    <div 
                        key={guest.id} 
                        className="bg-white pl-6 pr-4 py-4 rounded-3xl shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-slate-100 flex items-center justify-between group"
                    >
                        <div className="flex-1 min-w-0 pr-4">
                            <h4 className="text-xl font-bold text-slate-900 truncate leading-normal pb-1 px-1 -mx-1">{guest.name}</h4>
                            {guest.plusOnes > 0 && (
                                <div className="flex items-center gap-1.5 text-primary-600 font-bold text-sm mt-1 leading-normal pb-0.5 px-1 -mx-1">
                                    <Plus className="w-3.5 h-3.5" strokeWidth={3} />
                                    <span>{guest.plusOnes} {translations.guests}</span>
                                </div>
                            )}
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="min-w-[2.5rem] h-10 flex items-center justify-center bg-slate-900 text-white font-black rounded-xl text-base pb-0.5">
                                {1 + guest.plusOnes}
                            </div>
                            <button
                                onClick={() => onRemoveGuest(guest.id)}
                                className="p-2 text-slate-300 hover:text-red-500 transition-colors"
                            >
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                ))
            )}
            <div ref={listEndRef} className="h-2" />
        </div>

        {/* Bottom Action Area */}
        <div className="flex-none p-5 bg-slate-50 border-t border-slate-100 pb-8 sm:pb-5">
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <div className="flex gap-3">
                    {/* Name Input */}
                    <div className="flex-1">
                        <input
                            ref={inputRef}
                            type="text"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            placeholder={translations.guestNamePlaceholder}
                            className="w-full h-14 pl-6 pr-4 bg-white rounded-2xl shadow-sm border-2 border-transparent focus:border-primary-500 focus:ring-0 font-bold placeholder:text-slate-300 text-lg text-slate-900 outline-none transition-all pb-1 px-1"
                        />
                    </div>
                    
                    {/* Stepper for Plus Ones */}
                    <div className="flex items-center bg-white rounded-2xl shadow-sm px-2 h-14 border border-slate-100">
                        <button 
                            type="button"
                            onClick={() => setNewPlusOnes(Math.max(0, newPlusOnes - 1))}
                            className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-colors"
                        >
                            <Minus className="w-5 h-5 font-bold" strokeWidth={3} />
                        </button>
                        <div className="w-8 text-center">
                             <span className="text-lg font-black text-slate-900 pb-0.5 block px-1">{newPlusOnes}</span>
                        </div>
                        <button 
                            type="button"
                            onClick={() => setNewPlusOnes(Math.min(10, newPlusOnes + 1))}
                            className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-colors"
                        >
                            <Plus className="w-5 h-5" strokeWidth={3} />
                        </button>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={!newName.trim()}
                    className="w-full h-14 bg-primary-500 text-white font-black text-lg rounded-2xl shadow-lg shadow-primary-200 hover:bg-primary-600 active:scale-[0.98] transition-all disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed flex items-center justify-center gap-2 pb-1 px-1"
                >
                    {translations.addGuest}
                </button>
            </form>
        </div>
      </div>
    </div>
  );
};
