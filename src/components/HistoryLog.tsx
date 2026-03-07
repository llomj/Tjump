import React from 'react';
import { QuestionAttempt } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { useSound } from '../contexts/SoundContext';
import { formatCodeSnippet, splitQuestion } from '../utils/questionDisplay';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface HistoryLogProps {
  history: QuestionAttempt[];
  onBack: () => void;
  onSaveToIdLog?: (entry: { id: number; question: string; correctAnswer: string; explanation: string }) => void;
  savedIdLogIds?: number[];
}

export const HistoryLog: React.FC<HistoryLogProps> = ({ history, onBack, onSaveToIdLog, savedIdLogIds = [] }) => {
  const { t, language } = useLanguage();
  const { playCutSound } = useSound();
  const sortedHistory = [...history].sort((a, b) => b.timestamp - a.timestamp);

  return (
    <div className="space-y-6 animate-in slide-in-from-right duration-500">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-black text-white flex items-center gap-3">
          <i className="fas fa-book-open text-indigo-400"></i> {t('history.learningLog')}
        </h2>
        <button 
          onClick={() => { playCutSound(); onBack(); }}
          className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-sm font-bold transition-colors"
        >
          {t('history.backToHub')}
        </button>
      </div>

      {sortedHistory.length === 0 ? (
        <div className="glass rounded-3xl p-12 text-center space-y-4">
          <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto text-slate-500 text-2xl">
            <i className="fas fa-ghost"></i>
          </div>
          <p className="text-slate-500 font-medium">{t('history.emptyLog')}</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {sortedHistory.map((attempt) => (
            <div 
              key={`${attempt.id}-${attempt.timestamp}`}
              className={`glass rounded-2xl p-5 border-l-4 transition-all hover:translate-x-1 ${
                attempt.isCorrect ? 'border-l-emerald-500' : 'border-l-rose-500'
              }`}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-widest ${
                    attempt.isCorrect ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'
                  }`}>
                    {t('history.level')} {attempt.level} • {attempt.isCorrect ? t('history.correct') : t('history.incorrect')}
                  </span>
                  {onSaveToIdLog && (
                    <button
                      type="button"
                      onClick={() => { playCutSound(); onSaveToIdLog({
                        id: attempt.id,
                        question: attempt.question,
                        correctAnswer: attempt.correctOption,
                        explanation: attempt.explanation
                      }); }}
                      className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border transition-colors ${
                        savedIdLogIds.includes(attempt.id)
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                          : 'bg-slate-700/50 text-slate-300 border-slate-600/50 hover:bg-slate-700/70'
                      }`}
                      title={savedIdLogIds.includes(attempt.id) ? t('idSearch.saved') : t('idSearch.saveToLog')}
                    >
                      <i className={`fas ${savedIdLogIds.includes(attempt.id) ? 'fa-check' : 'fa-bookmark'} text-[9px]`}></i>
                      {t('idSearch.idLog')}
                    </button>
                  )}
                </div>
                <span className="text-[10px] text-slate-500 font-mono">
                  {new Date(attempt.timestamp).toLocaleDateString()}
                </span>
              </div>
              
              <div className="mb-3">
                <div className="max-h-[45vh] overflow-y-auto overflow-x-hidden bg-slate-800 rounded-lg">
                  {(() => {
                    const { prefix, code } = splitQuestion(attempt.question, language);
                    if (code) {
                      return (
                        <div className="flex flex-col">
                          {prefix && (
                            <div className="px-4 pt-4 pb-2 border-b border-slate-700/50">
                              <p className="text-white text-lg font-medium leading-relaxed">{prefix}</p>
                            </div>
                          )}
                          <div className="overflow-x-auto flex-1">
                            <SyntaxHighlighter
                              language="python"
                              style={oneDark}
                              customStyle={{
                                padding: '1rem',
                                margin: 0,
                                background: 'transparent',
                                fontSize: '0.875rem',
                                lineHeight: '1.75',
                                fontFamily: "'Fira Code', monospace"
                              }}
                              codeTagProps={{
                                style: {
                                  fontFamily: "'Fira Code', monospace",
                                  whiteSpace: 'pre',
                                  display: 'block'
                                }
                              }}
                              PreTag="div"
                            >
                              {formatCodeSnippet(code)}
                            </SyntaxHighlighter>
                          </div>
                        </div>
                      );
                    }
                    return (
                      <p className="text-slate-200 font-bold p-4 leading-tight">
                        {attempt.question}
                      </p>
                    );
                  })()}
                </div>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className={`text-xs p-2 rounded-lg flex items-center gap-2 ${
                  attempt.isCorrect ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
                }`}>
                  <i className={`fas ${attempt.isCorrect ? 'fa-check' : 'fa-times'}`}></i>
                  <span>{t('quiz.yourAnswer')}: {attempt.selectedOption}</span>
                </div>
                {!attempt.isCorrect && (
                  <div className="text-xs p-2 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center gap-2">
                    <i className="fas fa-check"></i>
                    <span>{t('quiz.correctAnswer')}: {attempt.correctOption}</span>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-white/5">
                <p className="text-[11px] text-slate-400 leading-relaxed italic">
                  {attempt.explanation}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};