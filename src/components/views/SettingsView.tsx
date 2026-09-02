import React, { useState } from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { Target, Palette, Check, Save } from 'lucide-react';
import { ThemePreset } from '../../types/dashboard';

export const SettingsView: React.FC = () => {
  const {
    revenueTarget,
    setRevenueTarget,
    themePreset,
    setThemePreset,
    triggerConfetti
  } = useDashboard();

  const [targetInput, setTargetInput] = useState<number>(revenueTarget);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  const handleSaveTarget = (e: React.FormEvent) => {
    e.preventDefault();
    setRevenueTarget(targetInput);
    setSavedSuccess(true);
    triggerConfetti();
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const themes: { id: ThemePreset; name: string; gradient: string }[] = [
    { id: 'indigo', name: 'Indigo Executive', gradient: 'from-indigo-600 to-indigo-800' },
    { id: 'emerald', name: 'Emerald Growth', gradient: 'from-emerald-600 to-teal-800' },
    { id: 'cyber', name: 'Cyber Neon', gradient: 'from-cyan-500 to-blue-700' },
    { id: 'sunset', name: 'Sunset Coral', gradient: 'from-rose-500 to-amber-600' },
  ];

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Target Revenue Configuration */}
      <div className="bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 rounded-2xl p-6 shadow-xs transition-colors">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              Annual / Quarterly Sales Revenue Benchmark Target
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Set the global target goal used for quota attainment progress across all views
            </p>
          </div>
        </div>

        <form onSubmit={handleSaveTarget} className="flex flex-col sm:flex-row items-end gap-3 mt-4">
          <div className="flex-1">
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
              Target Revenue Goal ($ USD)
            </label>
            <input
              type="number"
              step="50000"
              value={targetInput}
              onChange={e => setTargetInput(Number(e.target.value))}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white font-bold text-sm"
            />
          </div>

          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center space-x-2 shadow-md shadow-indigo-600/30 transition-all shrink-0"
          >
            <Save className="w-4 h-4" />
            <span>Update Revenue Goal</span>
          </button>
        </form>

        {savedSuccess && (
          <p className="text-xs font-bold text-emerald-500 mt-3 flex items-center space-x-1">
            <Check className="w-4 h-4" />
            <span>Revenue target updated successfully! Dashboard progress recalculated.</span>
          </p>
        )}
      </div>

      {/* Visual Theme Preset Switcher */}
      <div className="bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 rounded-2xl p-6 shadow-xs transition-colors">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400">
            <Palette className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              Color Accent Palette
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Customize visual identity and theme accents
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
          {themes.map(t => {
            const active = themePreset === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setThemePreset(t.id)}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  active
                    ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/40 ring-2 ring-indigo-500/30'
                    : 'border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-700/50'
                }`}
              >
                <div className={`h-8 w-full rounded-xl bg-gradient-to-r ${t.gradient} mb-3`} />
                <p className="font-bold text-slate-900 dark:text-white text-xs flex items-center justify-between">
                  <span>{t.name}</span>
                  {active && <Check className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
