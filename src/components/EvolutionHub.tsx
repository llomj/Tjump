import React from 'react';
import { UserStats, PersonaStage } from '../types';
import { LEVELS, QUESTIONS_PER_LEVEL, TOTAL_QUESTIONS, getStarsForLevel, getStarsFromAccuracyRandom, getRandomModeScore, getPersonaFromRandomScore, getNextRandomModeThreshold } from '../constants';
import { PersonaIcon } from './PersonaIcon';
import { ProgressBar } from './ProgressBar';
import { useLanguage } from '../contexts/LanguageContext';
import { formatTranslation } from '../translations';

interface EvolutionHubProps {
  stats: UserStats;
  onStartQuiz: () => void;
}

export const EvolutionHub: React.FC<EvolutionHubProps> = ({ stats, onStartQuiz }) => {
  const { t } = useLanguage();
  const randomMode = stats.randomMode ?? false;
  const rm = stats.randomModeStats ?? { totalAnswered: 0, totalCorrect: 0 };
  const randomScore = getRandomModeScore(rm);
  const randomPersona = getPersonaFromRandomScore(randomScore);
  const nextThreshold = getNextRandomModeThreshold(randomScore);
  const currentLevelInfo = LEVELS.find(l => l.level === stats.currentLevel) || LEVELS[0];
  const progress = stats.levelProgress[stats.currentLevel] || 0;

  const totalCompleted = stats.completedQuestionIds.length;
  const totalPossible = TOTAL_QUESTIONS;
  const globalPercentage = Math.round((totalCompleted / totalPossible) * 100);

  const lastAccuracy = stats.lastSessionScore !== undefined && stats.lastSessionTotal
    ? Math.round((stats.lastSessionScore / stats.lastSessionTotal) * 100)
    : null;

  // 5-star rating: level = correct out of 300 (full level); Random mode uses stricter thresholds
  const correct = stats.levelCorrect?.[stats.currentLevel] ?? 0;
  const earnedStars = getStarsForLevel(correct);
  const randomEarnedStars = getStarsFromAccuracyRandom(rm.totalCorrect, rm.totalAnswered);

  // Star tier for labels (level mode only): 1-2 = Beginner, 3-4 = Intermediate, 4-5 = Expert
  const getStarTier = (stars: number): 'beginner' | 'intermediate' | 'expert' => {
    if (stars >= 4) return 'expert';
    if (stars >= 3) return 'intermediate';
    return 'beginner';
  };
  const starTier = getStarTier(earnedStars);

  const displayPersona = randomMode ? randomPersona : currentLevelInfo.persona;
  const starsToShow = randomMode ? randomEarnedStars : earnedStars;

  const renderStars = () => {
    return (
      <div className="flex gap-2 justify-center mt-3">
        {[1, 2, 3, 4, 5].map(starNum => (
          <div
            key={starNum}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500
              ${starNum <= starsToShow
                ? 'bg-amber-400 text-amber-900 shadow-[0_0_15px_rgba(251,191,36,0.5)] scale-110'
                : 'bg-slate-800 text-slate-600 border border-white/5'
              }`}
          >
            <i className={`fas fa-star ${starNum <= starsToShow ? 'animate-pulse' : ''} text-sm`}></i>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <div className="flex flex-col items-center gap-1.5 py-1.5 border-b border-white/5 mb-1">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 text-white">
          <PersonaIcon persona={displayPersona} size="lg" />
        </div>
        <div className="text-center space-y-1">
          <h1 className="text-xl font-black text-white tracking-tight uppercase">
            {randomMode ? t('hub.randomModeLabel') : `${formatTranslation(t('hub.evolutionStage'), { level: stats.currentLevel })} ${stats.currentLevel}`}
          </h1>
          <div className="flex items-center gap-2 justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></span>
            <span className="text-slate-400 font-bold text-[10px] tracking-widest uppercase">
              {displayPersona} {t('hub.class')}
            </span>
          </div>
          {renderStars()}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass rounded-3xl p-8 space-y-6 flex flex-col justify-between min-w-0 overflow-x-auto">
          {randomMode ? (
            <>
              <div className="min-w-0">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <i className="fas fa-shuffle text-indigo-400"></i> {t('hub.randomModeLabel')}
                </h3>
                <p className="text-slate-400 leading-relaxed text-xs">
                  {t('hub.randomModeDescription')}
                </p>
              </div>
              <div className="space-y-4 pt-6 border-t border-white/5 min-w-0">
                {/* 5 stars from average accuracy (stricter thresholds in Random mode) */}
                <div className="flex gap-1.5 justify-center">
                  {[1, 2, 3, 4, 5].map(starNum => (
                    <div
                      key={starNum}
                      className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300
                        ${starNum <= randomEarnedStars
                          ? 'bg-amber-400 text-amber-900 shadow-[0_0_10px_rgba(251,191,36,0.4)]'
                          : 'bg-slate-800 text-slate-600 border border-white/5'
                        }`}
                    >
                      <i className={`fas fa-star ${starNum <= randomEarnedStars ? 'animate-pulse' : ''} text-[10px]`}></i>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-900/50 rounded-2xl p-3 border border-white/5 min-w-0">
                    <div className="text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1 truncate">{t('hub.totalAnswered')}</div>
                    <div className="text-lg font-black text-white truncate">{rm.totalAnswered}</div>
                  </div>
                  <div className="bg-slate-900/50 rounded-2xl p-3 border border-white/5 min-w-0">
                    <div className="text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1 truncate">{t('hub.correct')}</div>
                    <div className="text-lg font-black text-emerald-400 truncate">{rm.totalCorrect}</div>
                  </div>
                  <div className="bg-slate-900/50 rounded-2xl p-3 border border-white/5 col-span-2 min-w-0">
                    <div className="text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1 truncate">{t('hub.accuracy')}</div>
                    <div className="text-lg font-black text-sky-400 truncate">
                      {rm.totalAnswered > 0 ? Math.round((rm.totalCorrect / rm.totalAnswered) * 100) : 0}%
                    </div>
                  </div>
                  <div className="bg-slate-900/50 rounded-2xl p-3 border border-white/5 col-span-2 min-w-0">
                    <div className="text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1 truncate">{t('hub.evolutionScore')}</div>
                    <div className="text-lg font-black text-indigo-400 truncate">{randomScore}</div>
                  </div>
                </div>
                {nextThreshold && (
                  <>
                    <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase tracking-widest gap-2 min-w-0">
                      <span className="truncate">{formatTranslation(t('hub.pointsToNext'), { points: nextThreshold.minScore - randomScore, persona: nextThreshold.persona })}</span>
                      <span className="flex-shrink-0">{randomScore} / {nextThreshold.minScore}</span>
                    </div>
                    <ProgressBar current={randomScore} total={nextThreshold.minScore} colorClass="bg-indigo-500" />
                  </>
                )}
              </div>
            </>
          ) : (
            <>
              <div>
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <i className="fas fa-dna text-indigo-400"></i> {t('hub.currentGenome')}
                </h3>
                <p className="text-slate-400 leading-relaxed text-xs">
                  {t(`levels.level${currentLevelInfo.level}` as any)}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {currentLevelInfo.concepts.map(c => (
                    <span key={c} className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-[9px] font-mono border border-indigo-500/20">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
              <div className="space-y-4 pt-6 border-t border-white/5">
                {/* 5 stars: black until earned, then amber (accuracy-based) */}
                <div className="flex gap-1.5 justify-center">
                  {[1, 2, 3, 4, 5].map(starNum => (
                    <div
                      key={starNum}
                      className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300
                        ${starNum <= earnedStars
                          ? 'bg-amber-400 text-amber-900 shadow-[0_0_10px_rgba(251,191,36,0.4)]'
                          : 'bg-slate-800 text-slate-600 border border-white/5'
                        }`}
                    >
                      <i className={`fas fa-star ${starNum <= earnedStars ? 'animate-pulse' : ''} text-[10px]`}></i>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  <span>
                    {starTier === 'beginner' && t('subLevels.beginnerProgress')}
                    {starTier === 'intermediate' && t('subLevels.intermediateProgress')}
                    {starTier === 'expert' && t('subLevels.expertProgress')}
                  </span>
                  <span>{progress} / {QUESTIONS_PER_LEVEL}</span>
                </div>
                <ProgressBar current={progress} total={QUESTIONS_PER_LEVEL} colorClass="bg-indigo-500" />
                <div className="flex justify-between text-[8px] text-slate-600 font-black tracking-widest px-1">
                  <span>{t('subLevels.beginnerCaps')}</span>
                  <span className="ml-4">{t('subLevels.intermediateCaps')}</span>
                  <span>{t('subLevels.expertCaps')}</span>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="glass rounded-3xl p-8 space-y-6 flex flex-col justify-between min-w-0 overflow-x-auto">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <i className="fas fa-microchip text-indigo-400"></i> {t('hub.nextMutation')}
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-900/50 rounded-2xl p-4 border border-white/5">
                <div className="text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1">{t('hub.batchSize')}</div>
                <div className="text-lg font-black text-white">15 {t('hub.questions')}</div>
              </div>
              <div className="bg-slate-900/50 rounded-2xl p-4 border border-white/5">
                <div className="text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1">{t('hub.lastAccuracy')}</div>
                <div className={`text-lg font-black ${lastAccuracy !== null ? 'text-amber-400' : 'text-slate-700'}`}>
                  {lastAccuracy !== null ? `${lastAccuracy}%` : '---'}
                </div>
              </div>
            </div>

            <p className="text-slate-300 text-xs leading-relaxed">
              {randomMode ? t('hub.randomModeAbsorbText') : `${t('hub.absorbText')} ${formatTranslation(t('hub.mutationsRemaining'), { count: QUESTIONS_PER_LEVEL - progress })}`}
            </p>
          </div>

          <button
            onClick={onStartQuiz}
            className="w-full py-4 bg-indigo-500 hover:bg-indigo-600 text-white rounded-2xl font-black text-lg transition-all transform hover:scale-[1.02] active:scale-95 shadow-2xl shadow-indigo-500/40 flex items-center justify-center gap-3"
          >
            {t('hub.continueMutation')} <i className="fas fa-chevron-right text-sm"></i>
          </button>
        </div>
      </div>

      <div className="glass rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6 border-white/5 min-w-0 overflow-x-auto">
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <div className="w-14 h-14 rounded-2xl bg-slate-800 flex flex-col items-center justify-center border border-white/5 flex-shrink-0">
            <span className="text-xl font-black text-white">{globalPercentage}%</span>
            <span className="text-[7px] font-bold text-slate-500 uppercase tracking-widest">{t('hub.mastery')}</span>
          </div>
          <div className="min-w-0">
            <h4 className="font-bold text-xs text-slate-200 truncate">{t('hub.globalProgress')}</h4>
            <p className="text-[10px] text-slate-500 truncate">{totalCompleted} / {totalPossible} {t('hub.conceptsText')}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 flex-shrink-0">
          <div className="flex gap-1 items-center overflow-x-auto">
            {LEVELS.map(l => {
              const isCurrent = l.level === stats.currentLevel;
              const isPast = l.level < stats.currentLevel;
              return (
                <div
                  key={l.level}
                  className={`w-7 h-7 rounded-full flex items-center justify-center border transition-all duration-300 ${
                    isCurrent ? 'bg-indigo-500/30 border-indigo-400 ring-1 ring-indigo-400/50' :
                    isPast ? 'bg-indigo-500/20 border-indigo-500/40' : 'bg-slate-800/80 border-slate-700'
                  }`}
                  title={`Level ${l.level}: ${l.persona}`}
                >
                  <PersonaIcon persona={l.persona} size="sm" muted={!isPast && !isCurrent} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
