import React from 'react';
import { LEVELS } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';

interface FlowViewProps {
  onBack: () => void;
}

const personaIcons: Record<string, string> = {
  Egg: "fa-egg",
  Plankton: "fa-microbe",
  Shrimp: "fa-shrimp",
  Crab: "fa-crab",
  "Small Fish": "fa-fish",
  Octopus: "fa-octopus",
  Seal: "fa-seal",
  Dolphin: "fa-dolphin",
  Shark: "fa-shark",
  Whale: "fa-whale",
  "God Whale": "fa-globe",
};

export const FlowView: React.FC<FlowViewProps> = ({ onBack }) => {
  const { t } = useLanguage();

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
          <i className="fas fa-route text-indigo-400"></i> {t('app.flow')}
        </h2>
      </div>
      <p className="text-slate-400 text-sm mb-6">
        Level progression: from Egg to God Whale.
      </p>
      <div className="flex flex-col gap-3">
        {LEVELS.map((info, i) => (
          <div key={info.level} className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-slate-300 flex-shrink-0">
              <i className={`fas ${personaIcons[info.persona] || 'fa-circle'} text-sm`}></i>
            </div>
            <div className="flex-1 min-w-0">
              <span className="font-bold text-white">Level {info.level}</span>
              <span className="text-slate-400 ml-2">{info.persona}</span>
            </div>
            {i < LEVELS.length - 1 && (
              <i className="fas fa-chevron-down text-slate-500 text-xs flex-shrink-0"></i>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
