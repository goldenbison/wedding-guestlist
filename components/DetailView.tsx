import React, { useState } from 'react';
import { Guest, Translation } from '../types';
import { UserPlus, ArrowLeft, Trash2, Users } from 'lucide-react';

interface DetailViewProps {
  ownerName: string;
  guests: Guest[];
  translations: Translation;
  onBack: () => void;
  onAddGuest: (name: string, plusOnes: number) => void;
  onRemoveGuest: (id: string) => void;
}

export const DetailView: React.FC<DetailViewProps> = ({ 
  ownerName, 
  guests, 
  translations, 
  onBack, 
  onAddGuest,
  onRemoveGuest 
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState('');
  const [newPlusOnes, setNewPlusOnes] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    onAddGuest(newName, newPlusOnes);
    setNewName('');
    setNewPlusOnes(0);
    setIsAdding(false);
  };

  const totalHeadcount = guests.reduce((sum, g) => sum + 1 + g.plusOnes, 0);

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header Navigation */}
      <button 
        onClick={onBack}
        className="flex items-center text-slate-600 hover:text-slate-900 mb-6 font-semibold transition-colors"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        {translations.back}
      </button>

      {/* Title Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <p className="text-slate-500 text-sm font-medium uppercase tracking-wider">{translations.listOwner}</p>
            <h2 className="text-3xl font-black text-slate-900 mt-1">{ownerName}</h2>
          </div>
          <div className="flex items-center gap-3 bg-primary-50 px-5 py-3 rounded-xl border border-primary-100">
            <Users className="w-6 h-6 text-primary-600" />
            <div>
              <p className="text-xs text-primary-600 font-bold uppercase">{translations.total}</p>
              <p className="text-2xl font-black text-primary-900">{totalHeadcount}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Add Form */}
      {isAdding ? (
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg border border-primary-200 p-6 mb-8 animate-in fade-in slide-in-from-bottom-4">
          <h3 className="text-lg font-bold text-slate-900 mb-4">{translations.addGuest}</h3>
          
          <div className="mb-4">
            <label className="block text-sm font-bold text-slate-700 mb-2">
              {translations.nameLabel}
            </label>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder={translations.guestNamePlaceholder}
              className="w-full p-3 border-2 border-slate-200 rounded-xl focus:border-primary-500 focus:ring-0 outline-none transition-colors font-medium"
              autoFocus
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-bold text-slate-700 mb-2">
              {translations.plusOnesLabel}: <span className="text-primary-600 text-lg">{newPlusOnes}</span>
            </label>
            <input
              type="range"
              min="0"
              max="10"
              value={newPlusOnes}
              onChange={(e) => setNewPlusOnes(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary-500"
            />
            <div className="flex justify-between text-xs text-slate-400 mt-2 font-medium">
              <span>0</span>
              <span>5</span>
              <span>10</span>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={!newName.trim()}
              className="flex-1 bg-primary-600 text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {translations.save}
            </button>
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="flex-1 bg-slate-100 text-slate-700 font-bold py-3 px-4 rounded-xl hover:bg-slate-200 transition-colors"
            >
              {translations.cancel}
            </button>
          </div>
        </form>
      ) : (
        <button
          onClick={() => setIsAdding(true)}
          className="w-full py-4 border-2 border-dashed border-primary-300 rounded-2xl text-primary-600 font-bold hover:bg-primary-50 hover:border-primary-400 transition-all mb-8 flex items-center justify-center gap-2"
        >
          <UserPlus className="w-5 h-5" />
          {translations.addGuest}
        </button>
      )}

      {/* Guest List */}
      <div className="space-y-3">
        {guests.length === 0 ? (
          <div className="text-center py-12 text-slate-400">
            <p className="text-lg">{translations.noGuestsYet}</p>
          </div>
        ) : (
          guests.map((guest) => (
            <div 
              key={guest.id} 
              className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between group"
            >
              <div>
                <h4 className="text-lg font-bold text-slate-900">{guest.name}</h4>
                <p className="text-sm text-slate-500 font-medium">
                   + {guest.plusOnes} {translations.plusOnesLabel.split('(')[0]}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right mr-2">
                    <span className="block text-xs text-slate-400 font-bold uppercase tracking-wider">{translations.total}</span>
                    <span className="text-xl font-black text-slate-900">{1 + guest.plusOnes}</span>
                </div>
                <button
                  onClick={() => onRemoveGuest(guest.id)}
                  className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  aria-label={translations.delete}
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};