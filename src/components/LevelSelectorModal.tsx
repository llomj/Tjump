import React from 'react';
import { LEVELS, getStarsForLevel } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';
import { formatTranslation } from '../translations';
import { PersonaIcon } from './PersonaIcon';

interface LevelSelectorModalProps {
  currentLevel: number;
  highestUnlockedLevel: number;
  onSelectLevel: (level: number) => void;
  onClose: () => void;
  levelCorrect?: Record<number, number>;
  levelProgress?: Record<number, number>;
  randomMode?: boolean;
  onShowMethods?: () => void;
  onShowFlow?: () => void;
  onShowOperations?: () => void;
  onShowGlossary?: () => void;
}

export const LevelSelectorModal: React.FC<LevelSelectorModalProps> = ({
  currentLevel,
  highestUnlockedLevel,
  onSelectLevel,
  onClose,
  levelCorrect = {},
  levelProgress = {},
  randomMode = false,
  onShowMethods,
  onShowFlow,
  onShowOperations,
  onShowGlossary
}) => {
  const { t } = useLanguage();
  const rulesItems = [
    onShowFlow && { icon: 'fa-diagram-project', label: t('app.flow'), onClick: onShowFlow },
    onShowGlossary && { icon: 'fa-circle-info', label: t('app.glossary'), onClick: onShowGlossary },
    onShowMethods && { icon: 'fa-code', label: t('app.methods'), onClick: onShowMethods },
    onShowOperations && { icon: 'fa-calculator', label: t('app.operations'), onClick: onShowOperations },
  ].filter(Boolean) as Array<{ icon: string; label: string; onClick: () => void }>;
  rulesItems.sort((a, b) => a.label.localeCompare(b.label));

  const handleLevelSelect = (level: number) => {
    if (level <= highestUnlockedLevel) {
      onSelectLevel(level);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="glass rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto space-y-6 animate-in zoom-in duration-300 shadow-2xl border border-white/10">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-black text-white flex items-center gap-3">
            <i className="fas fa-layer-group text-indigo-400"></i> {t('levelSelector.selectLevel')}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {LEVELS.map((levelInfo) => {
            const isLocked = levelInfo.level > highestUnlockedLevel;
            const isCurrent = levelInfo.level === currentLevel;
            const isUnlocked = levelInfo.level <= highestUnlockedLevel;
            const correct = levelCorrect[levelInfo.level] ?? 0;
            const stars = getStarsForLevel(correct);

            return (
              <button
                key={levelInfo.level}
                onClick={() => handleLevelSelect(levelInfo.level)}
                disabled={isLocked}
                className={`
                  relative p-4 rounded-2xl border-2 transition-all
                  ${isCurrent
                    ? 'bg-indigo-500/20 border-indigo-400 shadow-lg shadow-indigo-500/20'
                    : isUnlocked
                      ? 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 cursor-pointer'
                      : 'bg-slate-800/50 border-slate-700/50 opacity-50 cursor-not-allowed'
                  }
                `}
              >
                {isLocked && (
                  <div className="absolute top-2 right-2 flex gap-1">
                    <i className="fas fa-lock text-slate-500 text-xs"></i>
                  </div>
                )}
                <div className="flex flex-col items-center gap-2">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isCurrent
                    ? 'bg-indigo-500 text-white'
                    : isUnlocked
                      ? 'bg-slate-700 text-slate-200'
                      : 'bg-slate-800 text-slate-400'
                    } ${isLocked ? 'grayscale opacity-70' : ''}`}>
                    <PersonaIcon persona={levelInfo.persona} size="lg" muted={isLocked} />
                  </div>
                  {/* Stars under animal icon: earned = yellow, unearned = muted; redoing a level shows new best (e.g. 5 yellow) */}
                  <div className="flex gap-0.5 justify-center">
                    {[1, 2, 3, 4, 5].map(starNum => (
                      <i
                        key={starNum}
                        className={`fas fa-star text-[10px] ${starNum <= stars ? 'text-amber-400' : 'text-slate-700/50'
                          }`}
                      ></i>
                    ))}
                  </div>
                  <div className="text-center">
                    <div className={`text-sm font-black ${isCurrent ? 'text-indigo-400' : isUnlocked ? 'text-white' : 'text-slate-500'
                      }`}>
                      {formatTranslation(t('levelSelector.level'), { level: levelInfo.level })}
                    </div>
                    <div className={`text-[10px] font-bold uppercase tracking-wider mt-1 ${isCurrent ? 'text-indigo-300' : isUnlocked ? 'text-slate-400' : 'text-slate-600'
                      }`}>
                      {levelInfo.persona}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Rules: Flow, Glossary, Methods, Operations & Math (alphabetical) */}
        {rulesItems.length > 0 && (
          <div className="pt-4 border-t border-white/10 space-y-3">
            <h3 className="text-sm font-bold text-slate-400 flex items-center gap-2">
              <i className="fas fa-book text-indigo-400"></i> {t('levelSelector.rules')}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {rulesItems.map((item, i) => (
                <button
                  key={i}
                  onClick={() => { item.onClick(); onClose(); }}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-slate-300 hover:text-white transition-all text-left"
                >
                  <i className={`fas ${item.icon} text-indigo-400`}></i>
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="pt-4 border-t border-white/10 space-y-2">
          {randomMode && (
            <p className="text-xs text-indigo-400 text-center font-medium">
              {t('levelSelector.randomModeNote')}
            </p>
          )}
          <p className="text-xs text-slate-400 text-center">
            {currentLevel === highestUnlockedLevel
              ? formatTranslation(t('levelSelector.youAreOnLevel'), { level: currentLevel })
              : formatTranslation(t('levelSelector.currentLevelInfo'), { current: currentLevel, highest: highestUnlockedLevel })
            }
          </p>
        </div>
      </div>
    </div>
  );
};
