import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface MethodsViewProps {
  onBack: () => void;
}

export const MethodsView: React.FC<MethodsViewProps> = ({ onBack }) => {
  const { t } = useLanguage();

  const sections = [
    { title: "String methods", examples: [".upper()", ".lower()", ".strip()", ".split()", ".join()", ".find()", ".replace()"] },
    { title: "List methods", examples: [".append()", ".extend()", ".insert()", ".remove()", ".pop()", ".sort()", ".reverse()"] },
    { title: "Dict methods", examples: [".keys()", ".values()", ".items()", ".get()", ".update()", ".pop()"] },
  ];

  return (
    <div className="relative min-h-[400px] animate-in slide-in-from-left duration-300 pb-12">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors border border-white/10"
        >
          <i className="fas fa-arrow-left"></i>
          <span>{t('operations.back')}</span>
        </button>
        <h2 className="text-xl font-black text-white flex items-center gap-2">
          <i className="fas fa-code text-indigo-400"></i> {t('app.methods')}
        </h2>
      </div>
      <p className="text-slate-400 text-sm mb-6">
        Quick reference for common Python built-in methods by type.
      </p>
      <div className="space-y-6">
        {sections.map((section, i) => (
          <div key={i} className="glass rounded-2xl p-4 border border-white/10">
            <h3 className="text-sm font-bold text-indigo-400 uppercase tracking-wider mb-3">{section.title}</h3>
            <div className="flex flex-wrap gap-2">
              {section.examples.map((ex, j) => (
                <code key={j} className="px-2 py-1 bg-slate-800 rounded text-slate-300 text-sm font-mono">
                  {ex}
                </code>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
