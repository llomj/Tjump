import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useSound } from '../contexts/SoundContext';

interface MarkdownDetailViewProps {
  title: string;
  markdown: string;
  onBack: () => void;
}

export const MarkdownDetailView: React.FC<MarkdownDetailViewProps> = ({ title, markdown, onBack }) => {
  const { t } = useLanguage();
  const { playCutSound } = useSound();

  return (
    <div className="relative min-h-[400px] animate-in slide-in-from-left duration-300 pb-12">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => { playCutSound(); onBack(); }}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors border border-white/10"
        >
          <i className="fas fa-arrow-left"></i>
          <span>{t('operations.back')}</span>
        </button>
        <h2 className="text-xl font-black text-white flex items-center gap-2">
          <i className="fas fa-file-lines text-indigo-400"></i>
          {title}
        </h2>
      </div>

      <div className="glass rounded-3xl p-6 max-h-[70vh] overflow-y-auto border border-white/10">
        <pre className="whitespace-pre-wrap break-words text-sm text-slate-200 leading-relaxed font-mono">
{markdown}
        </pre>
      </div>
    </div>
  );
};

