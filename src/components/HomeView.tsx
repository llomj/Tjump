import React from 'react';
import { useSound } from '../contexts/SoundContext';
import { PersonaIcon } from './PersonaIcon';
import { PersonaStage } from '../types';

interface HomeViewProps {
  currentPersona: PersonaStage;
  onOpenEpistemology: () => void;
  onOpenArguments: () => void;
  onOpenDebates: () => void;
  onOpenMindMap: () => void;
  onOpenEvaluations: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  currentPersona,
  onOpenEpistemology,
  onOpenArguments,
  onOpenDebates,
  onOpenMindMap,
  onOpenEvaluations,
}) => {
  const { playCutSound } = useSound();

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <div className="flex flex-col items-center gap-2 py-2 border-b border-white/5 mb-4">
        <div className="w-16 h-16 rounded-2xl evolution-gradient flex items-center justify-center shadow-lg shadow-indigo-500/30 text-white">
          <PersonaIcon persona={currentPersona} size="lg" />
        </div>
        <div className="text-center space-y-1">
          <h1 className="text-xl font-black text-white tracking-tight uppercase">
            TJump Philosophy Explorer
          </h1>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Offline map of TJump&apos;s debates, arguments, and epistemology. Browse transcripts, structured concepts, and logical evaluations without any live AI.
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => { playCutSound(); onOpenEpistemology(); }}
          className="glass rounded-3xl p-5 flex flex-col items-start gap-3 hover:border-indigo-500/40 hover:bg-slate-800/80 transition-all text-left cursor-pointer active:scale-[0.98]"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-indigo-500/20 flex items-center justify-center text-indigo-300">
              <i className="fas fa-brain"></i>
            </div>
            <div>
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400">
                Epistemology
              </div>
              <div className="text-sm font-bold text-slate-100">
                Knowledge, justification, and TJump&apos;s probability-first view.
              </div>
            </div>
          </div>
          <p className="text-xs text-slate-400">
            Concepts like foundationalism, coherentism, reliabilism, and TJump&apos;s critiques of infallible foundations.
          </p>
        </button>

        <button
          type="button"
          onClick={() => { playCutSound(); onOpenArguments(); }}
          className="glass rounded-3xl p-5 flex flex-col items-start gap-3 hover:border-indigo-500/40 hover:bg-slate-800/80 transition-all text-left cursor-pointer active:scale-[0.98]"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-amber-500/20 flex items-center justify-center text-amber-300">
              <i className="fas fa-scale-balanced"></i>
            </div>
            <div>
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-400">
                Arguments
              </div>
              <div className="text-sm font-bold text-slate-100">
                Cosmological, fine-tuning, moral, and more.
              </div>
            </div>
          </div>
          <p className="text-xs text-slate-400">
            Standard philosophical arguments with premise structure, TJump responses, counterarguments, and logical scores.
          </p>
        </button>

        <button
          type="button"
          onClick={() => { playCutSound(); onOpenDebates(); }}
          className="glass rounded-3xl p-5 flex flex-col items-start gap-3 hover:border-indigo-500/40 hover:bg-slate-800/80 transition-all text-left cursor-pointer active:scale-[0.98]"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-300">
              <i className="fas fa-comments"></i>
            </div>
            <div>
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400">
                Debates & Transcripts
              </div>
              <div className="text-sm font-bold text-slate-100">
                Cleaned segments from YouTube debates.
              </div>
            </div>
          </div>
          <p className="text-xs text-slate-400">
            Timestamped excerpts linked to concepts and arguments so every claim is traceable back to a concrete exchange.
          </p>
        </button>

        <button
          type="button"
          onClick={() => { playCutSound(); onOpenMindMap(); }}
          className="glass rounded-3xl p-5 flex flex-col items-start gap-3 hover:border-indigo-500/40 hover:bg-slate-800/80 transition-all text-left cursor-pointer active:scale-[0.98]"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-sky-500/20 flex items-center justify-center text-sky-300">
              <i className="fas fa-sitemap"></i>
            </div>
            <div>
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-sky-400">
                Mind Map
              </div>
              <div className="text-sm font-bold text-slate-100">
                Visual map of how ideas connect.
              </div>
            </div>
          </div>
          <p className="text-xs text-slate-400">
            A tree of topics, arguments, and debate methods backed by a JSON structure so the whole explorer works offline.
          </p>
        </button>

        <button
          type="button"
          onClick={() => { playCutSound(); onOpenEvaluations(); }}
          className="glass rounded-3xl p-5 flex flex-col items-start gap-3 hover:border-amber-500/40 hover:bg-slate-800/80 transition-all text-left cursor-pointer active:scale-[0.98] sm:col-span-2"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-amber-500/20 flex items-center justify-center text-amber-300">
              <i className="fas fa-gavel"></i>
            </div>
            <div>
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-400">
                Logic Evaluations
              </div>
              <div className="text-sm font-bold text-slate-100">
                Pre-written validity, soundness, coherence, and fallacy analysis (no live AI).
              </div>
            </div>
          </div>
          <p className="text-xs text-slate-400">
            Static &quot;AI Judge&quot; style scores and verdicts for each argument — all authored ahead of time.
          </p>
        </button>
      </div>
    </div>
  );
};

