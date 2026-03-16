import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useSound } from '../contexts/SoundContext';
import { PhilosophyTags } from '../types';

export type SectionKind = 'epistemology' | 'arguments' | 'debates' | 'transcripts' | 'evaluations';

export interface SectionItem {
  id: string;
  title: string;
  summary: string;
  tags: PhilosophyTags;
  markdown?: string;
}

interface SectionListViewProps {
  kind: SectionKind;
  items: SectionItem[];
  onBack: () => void;
  onSelectItem?: (item: SectionItem) => void;
}

export const SectionListView: React.FC<SectionListViewProps> = ({ kind, items, onBack, onSelectItem }) => {
  const { t } = useLanguage();
  const { playCutSound } = useSound();

  const titleIcon: Record<SectionKind, string> = {
    epistemology: 'fa-brain',
    arguments: 'fa-scale-balanced',
    debates: 'fa-microphone-lines',
    transcripts: 'fa-file-lines',
    evaluations: 'fa-gavel',
  };

  const titleText: Record<SectionKind, string> = {
    epistemology: 'Epistemology',
    arguments: 'Arguments',
    debates: 'Debates',
    transcripts: 'Transcript Library',
    evaluations: 'Logic Evaluations',
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-right duration-500">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => { playCutSound(); onBack(); }}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors border border-white/10"
        >
          <i className="fas fa-arrow-left"></i>
          <span>{t('operations.back')}</span>
        </button>
        <h2 className="text-xl font-black text-white flex items-center gap-2">
          <i className={`fas ${titleIcon[kind]} text-indigo-400`}></i>
          {titleText[kind]}
        </h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map(item => (
          <div
            key={item.id}
            role={onSelectItem ? 'button' : undefined}
            tabIndex={onSelectItem ? 0 : undefined}
            onClick={() => { if (onSelectItem) { playCutSound(); onSelectItem(item); } }}
            onKeyDown={(e) => { if (onSelectItem && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); playCutSound(); onSelectItem(item); } }}
            className={`glass p-5 rounded-2xl space-y-2 hover:border-indigo-500/40 hover:bg-slate-800/80 transition-all ${onSelectItem ? 'cursor-pointer active:scale-[0.98]' : 'cursor-default'}`}
          >
            <div className="flex justify-between items-start gap-2">
              <h3 className="font-bold text-slate-100 text-sm leading-snug">
                {item.title}
              </h3>
              <span className="text-[8px] font-black text-slate-500 uppercase px-2 py-0.5 bg-white/5 rounded whitespace-nowrap">
                {item.tags.topic}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-3">
              {item.summary}
            </p>
          </div>
        ))}
        {items.length === 0 && (
          <div className="col-span-full py-12 text-center text-slate-500">
            <i className="fas fa-circle-info text-3xl mb-3 opacity-30"></i>
            <p className="text-sm">No items yet — connect content/index.json to populate this section.</p>
          </div>
        )}
      </div>
    </div>
  );
};

