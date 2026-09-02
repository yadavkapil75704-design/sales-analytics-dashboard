import React from 'react';
import { X, Bookmark, ArrowRight } from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';
import { SavedViewPreset } from '../../types/dashboard';

interface SavedViewsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SavedViewsModal: React.FC<SavedViewsModalProps> = ({ isOpen, onClose }) => {
  const { savedPresets, applySavedPreset, triggerConfetti } = useDashboard();

  if (!isOpen) return null;

  const handleSelect = (preset: SavedViewPreset) => {
    applySavedPreset(preset);
    triggerConfetti();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-800 rounded-3xl max-w-md w-full border border-slate-200 dark:border-slate-700 shadow-2xl overflow-hidden">
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bookmark className="w-5 h-5 text-indigo-500" />
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              Saved Filter Views
            </h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-3">
          {savedPresets.map(preset => (
            <button
              key={preset.id}
              onClick={() => handleSelect(preset)}
              className="w-full text-left p-4 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-indigo-500 bg-slate-50/50 dark:bg-slate-800/60 hover:bg-indigo-50/40 dark:hover:bg-indigo-950/40 transition-all group"
            >
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                  {preset.name}
                </h4>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-transform group-hover:translate-x-1" />
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {preset.description}
              </p>
              <div className="mt-2.5 flex flex-wrap gap-1.5 text-[10px]">
                {preset.filters.region !== 'All' && (
                  <span className="px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold">
                    {preset.filters.region}
                  </span>
                )}
                {preset.filters.segment !== 'All' && (
                  <span className="px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold">
                    {preset.filters.segment}
                  </span>
                )}
                {preset.filters.channel !== 'All' && (
                  <span className="px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold">
                    {preset.filters.channel}
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
