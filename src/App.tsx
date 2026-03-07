import React, { useState, useEffect, lazy, Suspense } from 'react';
import { UserStats, PersonaStage, QuestionAttempt } from './types';
import { EvolutionHub } from './components/EvolutionHub';
import { FallingStars } from './components/FallingStars';
import { PersonaIcon } from './components/PersonaIcon';
import { SettingsMenu } from './components/SettingsMenu';
import { IdLogEntry } from './types';
import { LEVELS, XP_PER_QUESTION, QUESTIONS_PER_LEVEL, getStarsForLevel, getStarsFromAccuracyRandom, getRandomModeScore, getPersonaFromRandomScore } from './constants';
import { useLanguage } from './contexts/LanguageContext';
import { SoundProvider, playCutSoundIfEnabled } from './contexts/SoundContext';
import { formatTranslation } from './translations';

const LOCAL_STORAGE_KEY = 'python_exercises_learn_stats_v3_offline';

/** Alex Kidd–style bouncy 8-bit congratulation jingle when user earns a star. */
const playStarCelebrationSound = (): void => {
  if (typeof window === 'undefined') return;
  const AudioContextClass = window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioContextClass) return;

  const ctx = new AudioContextClass();
  if (ctx.state === 'suspended') void ctx.resume();

  const now = ctx.currentTime;
  const masterGain = ctx.createGain();
  masterGain.connect(ctx.destination);
  masterGain.gain.setValueAtTime(0.9, now);
  masterGain.gain.linearRampToValueAtTime(0.01, now + 2.2);

  const punch = (freq: number, start: number, dur: number, vol: number) => {
    const sq = ctx.createOscillator();
    const tri = ctx.createOscillator();
    const g1 = ctx.createGain();
    const g2 = ctx.createGain();
    sq.type = 'square';
    tri.type = 'triangle';
    sq.frequency.setValueAtTime(freq, now + start);
    tri.frequency.setValueAtTime(freq, now + start);
    g1.gain.setValueAtTime(vol, now + start);
    g1.gain.linearRampToValueAtTime(0.01, now + start + dur);
    g2.gain.setValueAtTime(vol * 0.5, now + start);
    g2.gain.linearRampToValueAtTime(0.01, now + start + dur);
    sq.connect(g1);
    tri.connect(g2);
    g1.connect(masterGain);
    g2.connect(masterGain);
    sq.start(now + start);
    tri.start(now + start);
    sq.stop(now + start + dur + 0.02);
    tri.stop(now + start + dur + 0.02);
  };

  const C5 = 523.25, E5 = 659.25, G5 = 783.99, C6 = 1046.5, E6 = 1318.51, G6 = 1567.98;

  punch(C5, 0, 0.07, 0.45);
  punch(E5, 0.09, 0.07, 0.45);
  punch(G5, 0.18, 0.07, 0.45);
  punch(C6, 0.27, 0.12, 0.5);
  punch(E5, 0.42, 0.07, 0.45);
  punch(G5, 0.51, 0.07, 0.45);
  punch(C6, 0.6, 0.07, 0.45);
  punch(E6, 0.69, 0.14, 0.5);
  punch(G5, 0.86, 0.07, 0.45);
  punch(C6, 0.95, 0.07, 0.45);
  punch(E6, 1.04, 0.07, 0.45);
  punch(G6, 1.13, 0.18, 0.5);
  punch(C6, 1.34, 0.22, 0.5);
  punch(G5, 1.58, 0.12, 0.45);

  window.setTimeout(() => void ctx.close(), 2400);
};

/** Upbeat game congratulations fanfare for 5-star (jackpot) completion. */
const playJackpotCelebrationSound = (): void => {
  if (typeof window === 'undefined') return;
  const AudioContextClass = window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioContextClass) return;

  const ctx = new AudioContextClass();
  if (ctx.state === 'suspended') void ctx.resume();

  const now = ctx.currentTime;
  const masterGain = ctx.createGain();
  masterGain.connect(ctx.destination);
  masterGain.gain.setValueAtTime(0.9, now);
  masterGain.gain.linearRampToValueAtTime(0.01, now + 4.5);

  const fanfare = (freq: number, start: number, dur: number, vol: number) => {
    const sq = ctx.createOscillator();
    const tri = ctx.createOscillator();
    const g1 = ctx.createGain();
    const g2 = ctx.createGain();
    sq.type = 'square';
    tri.type = 'triangle';
    sq.frequency.setValueAtTime(freq, now + start);
    tri.frequency.setValueAtTime(freq, now + start);
    g1.gain.setValueAtTime(vol, now + start);
    g1.gain.linearRampToValueAtTime(0.01, now + start + dur);
    g2.gain.setValueAtTime(vol * 0.5, now + start);
    g2.gain.linearRampToValueAtTime(0.01, now + start + dur);
    sq.connect(g1);
    tri.connect(g2);
    g1.connect(masterGain);
    g2.connect(masterGain);
    sq.start(now + start);
    tri.start(now + start);
    sq.stop(now + start + dur + 0.02);
    tri.stop(now + start + dur + 0.02);
  };

  const C5 = 523.25, E5 = 659.25, G5 = 783.99, C6 = 1046.5, E6 = 1318.51, G6 = 1567.98;

  fanfare(C5, 0, 0.2, 0.4);
  fanfare(E5, 0.2, 0.2, 0.4);
  fanfare(G5, 0.4, 0.2, 0.4);
  fanfare(C6, 0.6, 0.5, 0.5);
  fanfare(E5, 1.2, 0.15, 0.4);
  fanfare(G5, 1.35, 0.15, 0.4);
  fanfare(C6, 1.5, 0.15, 0.4);
  fanfare(E6, 1.65, 0.6, 0.5);
  fanfare(G5, 2.35, 0.15, 0.4);
  fanfare(C6, 2.5, 0.15, 0.4);
  fanfare(E6, 2.65, 0.15, 0.4);
  fanfare(G6, 2.8, 0.8, 0.5);
  fanfare(C6, 3.65, 0.6, 0.5);

  window.setTimeout(() => void ctx.close(), 4800);
};

/** Epic "you finished the whole game" fanfare when user has 5 stars on every level. */
const playGameCompleteSound = (): void => {
  if (typeof window === 'undefined') return;
  const AudioContextClass = window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioContextClass) return;

  const ctx = new AudioContextClass();
  if (ctx.state === 'suspended') void ctx.resume();

  const now = ctx.currentTime;
  const masterGain = ctx.createGain();
  masterGain.connect(ctx.destination);
  masterGain.gain.setValueAtTime(0.9, now);
  masterGain.gain.linearRampToValueAtTime(0.01, now + 8);

  const n = (freq: number, start: number, dur: number, vol: number) => {
    const sq = ctx.createOscillator();
    const tri = ctx.createOscillator();
    const g1 = ctx.createGain();
    const g2 = ctx.createGain();
    sq.type = 'square';
    tri.type = 'triangle';
    sq.frequency.setValueAtTime(freq, now + start);
    tri.frequency.setValueAtTime(freq, now + start);
    g1.gain.setValueAtTime(vol, now + start);
    g1.gain.linearRampToValueAtTime(0.01, now + start + dur);
    g2.gain.setValueAtTime(vol * 0.5, now + start);
    g2.gain.linearRampToValueAtTime(0.01, now + start + dur);
    sq.connect(g1);
    tri.connect(g2);
    g1.connect(masterGain);
    g2.connect(masterGain);
    sq.start(now + start);
    tri.start(now + start);
    sq.stop(now + start + dur + 0.02);
    tri.stop(now + start + dur + 0.02);
  };

  const C4 = 261.63, E4 = 329.63, G4 = 392, C5 = 523.25, E5 = 659.25, G5 = 783.99;
  const C6 = 1046.5, E6 = 1318.51, G6 = 1567.98;

  n(C4, 0, 0.25, 0.35);
  n(E4, 0.25, 0.25, 0.35);
  n(G4, 0.5, 0.25, 0.35);
  n(C5, 0.75, 0.5, 0.45);
  n(G4, 1.35, 0.2, 0.35);
  n(C5, 1.55, 0.2, 0.35);
  n(E5, 1.75, 0.2, 0.35);
  n(G5, 1.95, 0.6, 0.5);
  n(C5, 2.6, 0.2, 0.35);
  n(E5, 2.8, 0.2, 0.35);
  n(G5, 3, 0.2, 0.35);
  n(C6, 3.2, 0.7, 0.5);
  n(E5, 4, 0.18, 0.35);
  n(G5, 4.18, 0.18, 0.35);
  n(C6, 4.36, 0.18, 0.35);
  n(E6, 4.54, 0.9, 0.5);
  n(G5, 5.5, 0.2, 0.35);
  n(C6, 5.7, 0.2, 0.35);
  n(E6, 5.9, 0.2, 0.35);
  n(G6, 6.1, 1, 0.5);
  n(C6, 7.2, 1.2, 0.55);

  window.setTimeout(() => void ctx.close(), 8600);
};

/** Unique gaming congratulation melody for Random Mode God Mode (5 stars = 95% of 3300 correct). */
const playGodModeSound = (): void => {
  if (typeof window === 'undefined') return;
  const AudioContextClass = window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioContextClass) return;

  const ctx = new AudioContextClass();
  if (ctx.state === 'suspended') void ctx.resume();

  const now = ctx.currentTime;
  const masterGain = ctx.createGain();
  masterGain.connect(ctx.destination);
  masterGain.gain.setValueAtTime(0.9, now);
  masterGain.gain.linearRampToValueAtTime(0.01, now + 10);

  const hit = (freq: number, start: number, dur: number, vol: number) => {
    const sq = ctx.createOscillator();
    const tri = ctx.createOscillator();
    const g1 = ctx.createGain();
    const g2 = ctx.createGain();
    sq.type = 'square';
    tri.type = 'triangle';
    sq.frequency.setValueAtTime(freq, now + start);
    tri.frequency.setValueAtTime(freq, now + start);
    g1.gain.setValueAtTime(vol, now + start);
    g1.gain.linearRampToValueAtTime(0.01, now + start + dur);
    g2.gain.setValueAtTime(vol * 0.6, now + start);
    g2.gain.linearRampToValueAtTime(0.01, now + start + dur);
    sq.connect(g1);
    tri.connect(g2);
    g1.connect(masterGain);
    g2.connect(masterGain);
    sq.start(now + start);
    tri.start(now + start);
    sq.stop(now + start + dur + 0.02);
    tri.stop(now + start + dur + 0.02);
  };

  const C4 = 261.63, D4 = 293.66, E4 = 329.63, F4 = 349.23, G4 = 392, A4 = 440;
  const C5 = 523.25, D5 = 587.33, E5 = 659.25, G5 = 783.99, A5 = 880;
  const C6 = 1046.5, E6 = 1318.51, G6 = 1567.98;

  hit(C4, 0, 0.15, 0.35);
  hit(E4, 0.15, 0.15, 0.35);
  hit(G4, 0.3, 0.15, 0.4);
  hit(C5, 0.45, 0.5, 0.5);
  hit(C5, 1.1, 0.1, 0.45);
  hit(D5, 1.25, 0.1, 0.45);
  hit(E5, 1.4, 0.4, 0.5);
  hit(G5, 1.9, 0.15, 0.45);
  hit(A5, 2.1, 0.15, 0.45);
  hit(C6, 2.3, 0.7, 0.55);
  hit(E5, 3.2, 0.15, 0.4);
  hit(G5, 3.4, 0.15, 0.4);
  hit(C6, 3.6, 0.2, 0.5);
  hit(E6, 3.9, 1.2, 0.55);
  hit(G5, 5.3, 0.12, 0.4);
  hit(C6, 5.5, 0.12, 0.4);
  hit(E6, 5.7, 0.12, 0.4);
  hit(G6, 5.95, 1.5, 0.55);
  hit(C6, 7.6, 0.5, 0.5);

  window.setTimeout(() => void ctx.close(), 9500);
};

const SOUND_PREF_KEY = 'python_exercises_sound_v1';
const HAPTIC_PREF_KEY = 'python_exercises_haptic_v1';

/** Short positive jingle when user selects the correct answer. */
const playCorrectAnswerSound = (): void => {
  if (typeof window === 'undefined') return;
  const AudioContextClass = window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioContextClass) return;

  const ctx = new AudioContextClass();
  if (ctx.state === 'suspended') void ctx.resume();

  const now = ctx.currentTime;
  const masterGain = ctx.createGain();
  masterGain.connect(ctx.destination);
  masterGain.gain.setValueAtTime(0.6, now);
  masterGain.gain.linearRampToValueAtTime(0.01, now + 0.35);

  const tone = (freq: number, start: number, dur: number, vol: number) => {
    const sq = ctx.createOscillator();
    const g = ctx.createGain();
    sq.type = 'square';
    sq.frequency.setValueAtTime(freq, now + start);
    g.gain.setValueAtTime(vol, now + start);
    g.gain.linearRampToValueAtTime(0.01, now + start + dur);
    sq.connect(g);
    g.connect(masterGain);
    sq.start(now + start);
    sq.stop(now + start + dur + 0.02);
  };

  const E5 = 659.25, G5 = 783.99, C6 = 1046.5;
  tone(E5, 0, 0.08, 0.4);
  tone(G5, 0.08, 0.08, 0.4);
  tone(C6, 0.16, 0.12, 0.45);

  window.setTimeout(() => void ctx.close(), 400);
};

/** Short "wrong" tone when user selects an incorrect answer. */
const playWrongAnswerSound = (): void => {
  if (typeof window === 'undefined') return;
  const AudioContextClass = window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioContextClass) return;

  const ctx = new AudioContextClass();
  if (ctx.state === 'suspended') void ctx.resume();

  const now = ctx.currentTime;
  const masterGain = ctx.createGain();
  masterGain.connect(ctx.destination);
  masterGain.gain.setValueAtTime(0.5, now);
  masterGain.gain.linearRampToValueAtTime(0.01, now + 0.3);

  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(120, now);
  osc.frequency.linearRampToValueAtTime(80, now + 0.3);
  g.gain.setValueAtTime(0.35, now);
  g.gain.linearRampToValueAtTime(0.01, now + 0.3);
  osc.connect(g);
  g.connect(masterGain);
  osc.start(now);
  osc.stop(now + 0.35);

  window.setTimeout(() => void ctx.close(), 400);
};

const INITIAL_STATS: UserStats = {
  currentLevel: 0,
  xp: 0,
  xpRandom: 0,
  totalAttempts: 0,
  completedQuestionIds: [],
  highestUnlockedLevel: 0,
  levelProgress: {},
  levelCorrect: {},
  history: [],
  idLog: [],
  randomModeStats: { totalAnswered: 0, totalCorrect: 0 },
  randomMode: false
};

const QuizView = lazy(() => import('./components/QuizView').then((module) => ({ default: module.QuizView })));
const HistoryLog = lazy(() => import('./components/HistoryLog').then((module) => ({ default: module.HistoryLog })));
const GlossaryView = lazy(() => import('./components/GlossaryView').then((module) => ({ default: module.GlossaryView })));
const OperationsView = lazy(() => import('./components/OperationsView').then((module) => ({ default: module.OperationsView })));
const IdSearchModal = lazy(() => import('./components/IdSearchModal').then((module) => ({ default: module.IdSearchModal })));
const IdLogView = lazy(() => import('./components/IdLogView').then((module) => ({ default: module.IdLogView })));
const LevelSelectorModal = lazy(() => import('./components/LevelSelectorModal').then((module) => ({ default: module.LevelSelectorModal })));
const MethodsView = lazy(() => import('./components/MethodsView').then((module) => ({ default: module.MethodsView })));
const FlowView = lazy(() => import('./components/FlowView').then((module) => ({ default: module.FlowView })));

const ViewLoading: React.FC = () => (
  <div className="max-w-md mx-auto p-8 glass rounded-3xl text-center text-slate-400">
    <i className="fas fa-spinner fa-spin"></i>
  </div>
);

const App: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const [stats, setStats] = useState<UserStats>(INITIAL_STATS);
  const [view, setView] = useState<'hub' | 'quiz' | 'log' | 'glossary' | 'methods' | 'flow'>('hub');
  const [showResult, setShowResult] = useState<{
    score: number;
    total: number;
    starEarned: number | null;
    levelAccuracyPercent?: number;
    allLevelsFiveStars?: boolean;
    randomMode?: boolean;
    prevScore?: number;
    newScore?: number;
    newPersona?: PersonaStage;
    godMode?: boolean;
  } | null>(null);
  const [randomizeTrigger, setRandomizeTrigger] = useState(0);
  const [showRandomModeModal, setShowRandomModeModal] = useState(false);
  const randomMode = stats.randomMode ?? false;
  const [showOperations, setShowOperations] = useState(false);
  const [showIdSearch, setShowIdSearch] = useState(false);
  const [showIdLog, setShowIdLog] = useState(false);
  const [showLevelSelector, setShowLevelSelector] = useState(false);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [showResetConfirmModal, setShowResetConfirmModal] = useState(false);
  const [openSettingsOnBack, setOpenSettingsOnBack] = useState(false);

  const [soundEnabled, setSoundEnabled] = useState(() => {
    try {
      const v = localStorage.getItem(SOUND_PREF_KEY);
      return v === null ? true : v === 'true';
    } catch {
      return true;
    }
  });
  const [hapticEnabled, setHapticEnabled] = useState(() => {
    try {
      const v = localStorage.getItem(HAPTIC_PREF_KEY);
      return v === null ? true : v === 'true';
    } catch {
      return true;
    }
  });

  const triggerHaptic = () => {
    if (!hapticEnabled || typeof navigator === 'undefined' || !navigator.vibrate) return;
    try {
      navigator.vibrate(10);
    } catch (_) {}
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'fr' : 'en');
  };

  const handleLevelChange = (level: number) => {
    setStats(prev => ({
      ...prev,
      currentLevel: level
    }));
  };

  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (!parsed.history) parsed.history = [];
        if (!parsed.completedQuestionIds) parsed.completedQuestionIds = [];
        if (!parsed.idLog) parsed.idLog = [];
        if (parsed.totalAttempts === undefined) parsed.totalAttempts = parsed.history.length || 0;
        // Migration: levelCorrect for 5-star accuracy (Option A: start at 0 so stars reflect actual accuracy)
        if (!parsed.levelCorrect) parsed.levelCorrect = {};
        // Migration: Random mode stats for dual-mode progression
        if (!parsed.randomModeStats) {
          parsed.randomModeStats = { totalAnswered: 0, totalCorrect: 0 };
        }
        if (parsed.randomMode === undefined) parsed.randomMode = false;
        if (parsed.xpRandom === undefined) parsed.xpRandom = 0;
        setStats(parsed);
      } catch (e) {
        console.error("Corrupted state, resetting", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(stats));
  }, [stats]);

  useEffect(() => {
    try {
      localStorage.setItem(SOUND_PREF_KEY, String(soundEnabled));
    } catch (_) {}
  }, [soundEnabled]);

  useEffect(() => {
    try {
      localStorage.setItem(HAPTIC_PREF_KEY, String(hapticEnabled));
    } catch (_) {}
  }, [hapticEnabled]);

  useEffect(() => {
    if (!soundEnabled) return;
    if (showResult?.godMode) {
      playGodModeSound();
    } else if (showResult?.starEarned === 5 && showResult?.allLevelsFiveStars) {
      playGameCompleteSound();
    } else if (showResult?.starEarned === 5) {
      playJackpotCelebrationSound();
    } else if (showResult?.starEarned) {
      playStarCelebrationSound();
    }
  }, [soundEnabled, showResult?.starEarned, showResult?.allLevelsFiveStars, showResult?.godMode]);

  const currentLevelInfo = LEVELS.find(l => l.level === stats.currentLevel) || LEVELS[0];
  const currentPersona = (stats.randomMode && stats.randomModeStats)
    ? getPersonaFromRandomScore(getRandomModeScore(stats.randomModeStats))
    : currentLevelInfo.persona;
  const currentProgress = stats.levelProgress[stats.currentLevel] || 0;

  const handleStartEvolution = () => {
    setView('quiz');
    setShowResult(null);
  };

  const handleRandomModeToggle = () => {
    if (!randomMode) {
      // Show modal to confirm random mode
      setShowRandomModeModal(true);
    } else {
      // Show modal to confirm going back to level mode
      setShowRandomModeModal(true);
    }
  };

  const confirmRandomMode = () => {
    setStats(prev => ({ ...prev, randomMode: true }));
    setShowRandomModeModal(false);
    setRandomizeTrigger(prev => prev + 1);
  };

  const confirmLevelMode = () => {
    setStats(prev => ({ ...prev, randomMode: false }));
    setShowRandomModeModal(false);
    setRandomizeTrigger(prev => prev + 1);
  };

  const confirmResetApp = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    setStats(INITIAL_STATS);
    setView('hub');
    setShowResetModal(false);
    setShowResetConfirmModal(false);
    setShowSettingsMenu(false);
    setShowResult(null);
    setRandomizeTrigger(prev => prev + 1);
  };

  const recordAttempt = (attempt: QuestionAttempt) => {
    setStats(prev => ({
      ...prev,
      totalAttempts: (prev.totalAttempts ?? 0) + 1,
      history: [attempt, ...prev.history].slice(0, 1000),
      completedQuestionIds: attempt.isCorrect && !prev.completedQuestionIds.includes(attempt.id)
        ? [...prev.completedQuestionIds, attempt.id]
        : prev.completedQuestionIds
    }));
  };

  const saveToIdLog = (entry: { id: number; question: string; correctAnswer: string; explanation: string }) => {
    const idLogEntry: IdLogEntry = {
      ...entry,
      timestamp: Date.now()
    };

    setStats(prev => ({
      ...prev,
      idLog: [idLogEntry, ...prev.idLog.filter(e => e.id !== entry.id)].slice(0, 1000)
    }));
  };

  const handleQuizComplete = (score: number) => {
    const total = 15;
    const xpGained = score * XP_PER_QUESTION;

    if (randomMode) {
      // Random mode: update randomModeStats and xpRandom only; level xp unchanged
      setStats(prev => {
        const newXpRandom = (prev.xpRandom ?? 0) + xpGained;
        const rm = prev.randomModeStats ?? { totalAnswered: 0, totalCorrect: 0 };
        const newTotalAnswered = rm.totalAnswered + total;
        const newTotalCorrect = rm.totalCorrect + score;
        const newRm = {
          ...rm,
          totalAnswered: newTotalAnswered,
          totalCorrect: newTotalCorrect,
          lastSessionScore: score,
          lastSessionTotal: total
        };
        const prevScore = getRandomModeScore(rm);
        const newScore = getRandomModeScore(newRm);
        return {
          ...prev,
          xpRandom: newXpRandom,
          randomModeStats: newRm,
          lastSessionScore: score,
          lastSessionTotal: total
        };
      });

      const rm = stats.randomModeStats ?? { totalAnswered: 0, totalCorrect: 0 };
      const prevScore = getRandomModeScore(rm);
      const prevRandomStars = getStarsFromAccuracyRandom(rm.totalCorrect);
      const newTotalAnswered = rm.totalAnswered + total;
      const newTotalCorrect = rm.totalCorrect + score;
      const newScore = Math.floor(newTotalCorrect * (newTotalCorrect / newTotalAnswered));
      const newRandomStars = getStarsFromAccuracyRandom(newTotalCorrect);
      const starEarned = newRandomStars > prevRandomStars ? newRandomStars : null;
      const godMode = starEarned === 5;

      setShowResult({
        score,
        total,
        starEarned,
        randomMode: true,
        prevScore,
        newScore,
        newPersona: getPersonaFromRandomScore(newScore),
        godMode: godMode || undefined
      });
    } else {
      // Level mode: update levelProgress, levelCorrect, currentLevel; stars from accuracy (5-star)
      const currentLevelProgress = stats.levelProgress[stats.currentLevel] || 0;
      const currentLevelCorrect = stats.levelCorrect?.[stats.currentLevel] || 0;
      const prevStars = getStarsForLevel(currentLevelCorrect);

      setStats(prev => {
        const newXp = prev.xp + xpGained;
        const currProgress = prev.levelProgress[prev.currentLevel] || 0;
        const newLevelProgress = Math.min(QUESTIONS_PER_LEVEL, currProgress + total);
        const currCorrect = prev.levelCorrect?.[prev.currentLevel] || 0;
        const newLevelCorrect = currCorrect + score;

        const updatedLevelProgress = {
          ...prev.levelProgress,
          [prev.currentLevel]: newLevelProgress
        };
        const updatedLevelCorrect = {
          ...(prev.levelCorrect || {}),
          [prev.currentLevel]: newLevelCorrect
        };

        let newLevel = prev.currentLevel;
        if (newLevelProgress >= QUESTIONS_PER_LEVEL && newLevel < 10) {
          newLevel += 1;
        }

        return {
          ...prev,
          xp: newXp,
          currentLevel: newLevel,
          highestUnlockedLevel: Math.max(prev.highestUnlockedLevel, newLevel),
          levelProgress: updatedLevelProgress,
          levelCorrect: updatedLevelCorrect,
          lastSessionScore: score,
          lastSessionTotal: total
        };
      });

      const newLevelProgress = Math.min(QUESTIONS_PER_LEVEL, currentLevelProgress + total);
      const newLevelCorrect = currentLevelCorrect + score;
      const newStars = getStarsForLevel(newLevelCorrect);
      const starEarned = newStars > prevStars ? newStars : null;
      const levelAccuracyPercent = newLevelProgress > 0 ? Math.round((newLevelCorrect / newLevelProgress) * 100) : undefined;

      const allLevelsFiveStars = starEarned === 5 && LEVELS.every(level => {
        const correct = level.level === stats.currentLevel ? newLevelCorrect : (stats.levelCorrect?.[level.level] ?? 0);
        return getStarsForLevel(correct) === 5;
      });

      setShowResult({ score, total, starEarned, levelAccuracyPercent, allLevelsFiveStars: allLevelsFiveStars || undefined });
    }

    setView('hub');
  };

  return (
    <SoundProvider soundEnabled={soundEnabled}>
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-indigo-500/30 pb-28">
      {(showResult?.starEarned === 5 || showResult?.godMode) && (
        <FallingStars count={showResult?.godMode ? 250 : showResult?.allLevelsFiveStars ? 120 : 50} />
      )}
      <nav className="pt-[env(safe-area-inset-top)] px-2 pb-1.5 flex items-center justify-between border-b border-white/5 sticky top-0 z-50 glass">
        <div className="flex w-full items-center gap-4">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => { playCutSoundIfEnabled(); setView('hub'); }}>
            <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <i className="fas fa-terminal text-white text-xs"></i>
            </div>
            <span className="font-bold text-lg tracking-tight hidden sm:inline">{t('app.title')}<span className="text-indigo-400">{t('app.subtitle')}</span></span>
          </div>

          <div className="h-8 w-[1px] bg-white/10 mx-2 hidden sm:block"></div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-3 bg-white/5 px-3 py-1.5 rounded-2xl border border-white/10">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white">
                <PersonaIcon persona={currentPersona} size="sm" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-none">{t('app.rank')}</span>
                <span className="text-sm font-bold text-slate-200 leading-tight">{currentPersona}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <i className="fas fa-bolt text-amber-400 text-sm"></i>
              <span className="text-sm font-bold text-indigo-400">
                {(randomMode ? (stats.xpRandom ?? 0) : stats.xp).toLocaleString()}
              </span>
            </div>
          </div>

          <div
            className="ml-auto flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10"
            title="Answer Count"
          >
            <i className="fas fa-hashtag text-slate-400 text-sm"></i>
            <span className="text-sm font-bold text-slate-200">{(stats.totalAttempts ?? stats.history.length).toLocaleString()}</span>
          </div>
        </div>

      </nav>

      {/* Settings at bottom - pb lifts gear above iPhone home-indicator; min 2rem when env is 0 in PWA */}
      <div className="fixed bottom-0 left-0 right-0 z-40 flex justify-center pb-[max(2rem,env(safe-area-inset-bottom))] pt-2 bg-gradient-to-t from-slate-950 to-transparent">
        <button
          onClick={() => { playCutSoundIfEnabled(); setShowSettingsMenu(!showSettingsMenu); }}
          className="w-16 h-16 flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all shadow-lg min-w-[64px] min-h-[64px]"
          title={t('settings.settings')}
        >
          <i className="fas fa-gear text-xl"></i>
        </button>
      </div>
      <SettingsMenu
        isOpen={showSettingsMenu}
        onClose={() => setShowSettingsMenu(false)}
        view={view}
        anchorBottom
        randomMode={randomMode}
        onToggleRandomMode={handleRandomModeToggle}
        onShowGlossary={() => { setOpenSettingsOnBack(true); setView('glossary'); }}
        onShowIdSearch={() => setShowIdSearch(true)}
        onShowIdLog={() => setShowIdLog(true)}
        onShowLearningLog={() => { setOpenSettingsOnBack(true); setView('log'); }}
        onShowLevelSelector={() => setShowLevelSelector(true)}
        onShowMethods={() => { setOpenSettingsOnBack(true); setView('methods'); }}
        onShowFlow={() => { setOpenSettingsOnBack(true); setView('flow'); }}
        onShowOperations={() => { setOpenSettingsOnBack(true); setShowOperations(true); }}
        onToggleLanguage={toggleLanguage}
        soundEnabled={soundEnabled}
        hapticEnabled={hapticEnabled}
        onToggleSound={() => setSoundEnabled(s => !s)}
        onToggleHaptic={() => setHapticEnabled(h => !h)}
        triggerHaptic={triggerHaptic}
        onRefreshApp={() => window.location.reload()}
        onResetApp={() => setShowResetModal(true)}
      />

      <main className="container mx-auto px-4 py-1 max-w-4xl min-h-[calc(100dvh-160px)]">
        {view === 'quiz' ? (
          <Suspense fallback={<ViewLoading />}>
            <QuizView
              level={stats.currentLevel}
              currentProgress={currentProgress}
              completedIds={stats.completedQuestionIds}
              onAttempt={recordAttempt}
              onComplete={handleQuizComplete}
              onExit={() => setView('hub')}
              randomizeTrigger={randomizeTrigger}
              randomMode={randomMode}
              randomModeStats={stats.randomModeStats}
              onSaveToIdLog={saveToIdLog}
              savedIdLogIds={stats.idLog.map(entry => entry.id)}
              earnedStars={randomMode
                ? getStarsFromAccuracyRandom(stats.randomModeStats?.totalCorrect ?? 0)
                : getStarsForLevel(stats.levelCorrect?.[stats.currentLevel] ?? 0)}
              soundEnabled={soundEnabled}
              hapticEnabled={hapticEnabled}
              onPlayCorrectSound={playCorrectAnswerSound}
              onPlayWrongSound={playWrongAnswerSound}
              triggerHaptic={triggerHaptic}
            />
          </Suspense>
        ) : view === 'log' ? (
          <Suspense fallback={<ViewLoading />}>
            <HistoryLog
              history={stats.history}
              onBack={() => setView('hub')}
              onSaveToIdLog={saveToIdLog}
              savedIdLogIds={stats.idLog.map(e => e.id)}
            />
          </Suspense>
        ) : view === 'glossary' ? (
          <Suspense fallback={<ViewLoading />}>
            <GlossaryView onBack={() => { setView('hub'); if (openSettingsOnBack) { setShowSettingsMenu(true); setOpenSettingsOnBack(false); } }} />
          </Suspense>
        ) : view === 'methods' ? (
          <Suspense fallback={<ViewLoading />}>
            <MethodsView onBack={() => { setView('hub'); if (openSettingsOnBack) { setShowSettingsMenu(true); setOpenSettingsOnBack(false); } }} />
          </Suspense>
        ) : view === 'flow' ? (
          <Suspense fallback={<ViewLoading />}>
            <FlowView onBack={() => { setView('hub'); if (openSettingsOnBack) { setShowSettingsMenu(true); setOpenSettingsOnBack(false); } }} />
          </Suspense>
        ) : showResult ? (
          <div className="max-w-md mx-auto p-10 glass rounded-3xl text-center space-y-6 animate-in zoom-in duration-500 shadow-2xl relative overflow-hidden">
            {showResult.starEarned && (
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-amber-500/10 animate-pulse"></div>
              </div>
            )}

            {showResult.starEarned ? (
              <div className="w-28 h-28 rounded-full bg-amber-400/20 text-amber-400 flex items-center justify-center text-6xl mx-auto shadow-[0_0_40px_rgba(251,191,36,0.3)] border border-amber-400/50 relative">
                <i className="fas fa-star animate-[spin_4s_linear_infinite]"></i>
                <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center border-2 border-amber-400 text-lg font-black text-amber-400 z-10">
                  {showResult.starEarned}
                </div>
              </div>
            ) : (
              <div className="w-24 h-24 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center text-5xl mx-auto shadow-2xl shadow-emerald-500/20 border border-emerald-500/30">
                <i className="fas fa-arrow-up-right-dots"></i>
              </div>
            )}

            <div className="relative z-10">
            {showResult.starEarned ? (
              <>
                  <h2 className={`text-3xl font-black mb-2 bg-clip-text ${showResult.godMode ? 'text-amber-300' : 'text-amber-400'}`}>
                    {showResult.godMode ? t('result.godMode') : showResult.allLevelsFiveStars ? t('result.gameComplete') : t('subLevels.subLevelComplete')}
                  </h2>
                  <p className="text-slate-300">
                    {showResult.godMode ? t('result.godModeSub') : showResult.allLevelsFiveStars ? t('result.gameCompleteSub') : formatTranslation(t('result.youEarnedStars'), { count: showResult.starEarned })}
                  </p>
                  {!showResult.allLevelsFiveStars && !showResult.godMode && showResult.levelAccuracyPercent !== undefined && (
                    <p className="text-slate-400 text-sm mt-1">
                      {formatTranslation(t('result.levelAccuracy'), { percent: showResult.levelAccuracyPercent })}
                    </p>
                  )}
                </>
              ) : (
                <>
                  <h2 className="text-3xl font-bold mb-2">{t('result.mutationsComplete')}</h2>
                  <p className="text-slate-400">{formatTranslation(t('result.geneticsStabilized'), { score: showResult.score })}</p>
                </>
              )}
            </div>

            <div className="py-4 px-6 bg-white/5 rounded-2xl flex flex-wrap justify-around gap-4 border border-white/5 relative z-10">
              <div>
                <div className="text-xs text-slate-500 uppercase font-bold mb-1 tracking-wider">{t('result.evolutionGain')}</div>
                <div className="text-2xl font-black text-amber-400">+{showResult.score * XP_PER_QUESTION} XP</div>
              </div>
              <div>
                <div className="text-xs text-slate-500 uppercase font-bold mb-1 tracking-wider">{t('result.successRate')}</div>
                <div className="text-2xl font-black text-sky-400">{Math.round((showResult.score / showResult.total) * 100)}%</div>
              </div>
              {showResult.randomMode && showResult.prevScore !== undefined && showResult.newScore !== undefined && showResult.newPersona && (
                <div className="w-full mt-2 pt-2 border-t border-white/10">
                  <div className="text-xs text-slate-500 uppercase font-bold mb-1 tracking-wider">{t('result.evolutionScore')}</div>
                  <div className="text-lg font-black text-indigo-400">
                    {showResult.prevScore} → {showResult.newScore} <span className="text-slate-400 font-normal">({showResult.newPersona})</span>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => { playCutSoundIfEnabled(); setShowResult(null); }}
              className={`w-full py-4 rounded-2xl font-bold text-white transition-all transform active:scale-95 shadow-xl relative z-10 ${showResult.starEarned
                ? 'bg-amber-500 hover:bg-amber-600 shadow-amber-500/30 text-amber-950 text-lg'
                : 'bg-indigo-500 hover:bg-indigo-600 shadow-indigo-500/30'
                }`}
            >
              {showResult.starEarned ? t('subLevels.continueEvolution') : t('result.backToHub')}
            </button>
          </div>
        ) : (
          <EvolutionHub
            stats={stats}
            onStartQuiz={handleStartEvolution}
          />
        )}
      </main>

      <footer className="mt-auto border-t border-white/5 p-8 text-center text-slate-600 text-sm">
        <p>{t('footer.copyright')}</p>
      </footer>

      {/* Operations View Modal */}
      {showOperations && (
        <div className="fixed inset-0 z-[100] bg-slate-950 overflow-y-auto">
          <div className="container mx-auto px-4 py-8 max-w-4xl">
            <Suspense fallback={<ViewLoading />}>
              <OperationsView onBack={() => { setShowOperations(false); if (openSettingsOnBack) { setShowSettingsMenu(true); setOpenSettingsOnBack(false); } }} />
            </Suspense>
          </div>
        </div>
      )}

      {/* Reset App Confirmation Modal */}
      {showResetModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
          <div className="glass rounded-3xl p-8 max-w-md w-full space-y-6 animate-in zoom-in duration-300 shadow-2xl border border-amber-500/20">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center text-3xl bg-amber-500/20 text-amber-400">
                <i className="fas fa-triangle-exclamation"></i>
              </div>
              <h2 className="text-2xl font-black text-white">
                {t('resetModal.title')}
              </h2>
              <p className="text-slate-400 leading-relaxed">
                {t('resetModal.warning')}
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => { playCutSoundIfEnabled(); setShowResetModal(false); }}
                className="flex-1 py-3 bg-white/5 hover:bg-white/10 rounded-xl font-bold text-white transition-all border border-white/10"
              >
                {t('resetModal.cancel')}
              </button>
              <button
                onClick={() => { playCutSoundIfEnabled(); setShowResetModal(false); setShowResetConfirmModal(true); }}
                className="flex-1 py-3 bg-amber-500 hover:bg-amber-600 rounded-xl font-bold text-white transition-all shadow-xl shadow-amber-500/30"
              >
                {t('resetModal.confirm')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reset App Second Confirmation Modal */}
      {showResetConfirmModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[70] flex items-center justify-center p-4">
          <div className="glass rounded-3xl p-8 max-w-md w-full space-y-6 animate-in zoom-in duration-300 shadow-2xl border border-amber-500/30">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center text-3xl bg-amber-500/20 text-amber-400">
                <i className="fas fa-triangle-exclamation"></i>
              </div>
              <h2 className="text-xl font-black text-white">
                {t('resetModal.confirmSure')}
              </h2>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => { playCutSoundIfEnabled(); setShowResetConfirmModal(false); }}
                className="flex-1 py-3 bg-white/5 hover:bg-white/10 rounded-xl font-bold text-white transition-all border border-white/10"
              >
                {t('resetModal.cancel')}
              </button>
              <button
                onClick={() => { playCutSoundIfEnabled(); confirmResetApp(); }}
                className="flex-1 py-3 bg-amber-500 hover:bg-amber-600 rounded-xl font-bold text-white transition-all shadow-xl shadow-amber-500/30"
              >
                {t('resetModal.confirmYes')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Random Mode Confirmation Modal */}
      {showRandomModeModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass rounded-3xl p-8 max-w-md w-full space-y-6 animate-in zoom-in duration-300 shadow-2xl border border-white/10">
            <div className="text-center space-y-4">
              <div className={`w-16 h-16 rounded-full mx-auto flex items-center justify-center text-3xl ${randomMode ? 'bg-indigo-500/20 text-indigo-400' : 'bg-green-500/20 text-green-400'
                }`}>
                <i className={`fas ${randomMode ? 'fa-layer-group' : 'fa-shuffle'}`}></i>
              </div>
              <h2 className="text-2xl font-black text-white">
                {randomMode ? t('randomMode.switchToLevel') : t('randomMode.switchToRandom')}
              </h2>
              <p className="text-slate-400 leading-relaxed">
                {randomMode ? t('randomMode.levelModeDesc') : t('randomMode.randomModeDesc')}
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => { playCutSoundIfEnabled(); setShowRandomModeModal(false); }}
                className="flex-1 py-3 bg-white/5 hover:bg-white/10 rounded-xl font-bold text-white transition-all border border-white/10"
              >
                {t('randomMode.cancel')}
              </button>
              <button
                onClick={() => { playCutSoundIfEnabled(); (randomMode ? confirmLevelMode : confirmRandomMode)(); }}
                className={`flex-1 py-3 rounded-xl font-bold text-white transition-all ${randomMode
                  ? 'bg-indigo-500 hover:bg-indigo-600 shadow-xl shadow-indigo-500/30'
                  : 'bg-green-500 hover:bg-green-600 shadow-xl shadow-green-500/30'
                  }`}
              >
                {randomMode ? t('randomMode.levelMode') : t('randomMode.randomMode')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ID Search Modal */}
      {showIdSearch && (
        <Suspense fallback={<ViewLoading />}>
          <IdSearchModal
            onClose={() => setShowIdSearch(false)}
            onSaveToLog={saveToIdLog}
          />
        </Suspense>
      )}

      {/* ID Log View */}
      {showIdLog && (
        <Suspense fallback={<ViewLoading />}>
          <IdLogView
            entries={stats.idLog}
            onClose={() => setShowIdLog(false)}
          />
        </Suspense>
      )}

      {/* Level Selector Modal */}
      {showLevelSelector && (
        <Suspense fallback={<ViewLoading />}>
          <LevelSelectorModal
            currentLevel={stats.currentLevel}
            highestUnlockedLevel={stats.highestUnlockedLevel}
            onSelectLevel={handleLevelChange}
            onClose={() => setShowLevelSelector(false)}
            levelCorrect={stats.levelCorrect}
            levelProgress={stats.levelProgress}
            randomMode={randomMode}
            onShowMethods={() => { setShowLevelSelector(false); setOpenSettingsOnBack(true); setView('methods'); }}
            onShowFlow={() => { setShowLevelSelector(false); setOpenSettingsOnBack(true); setView('flow'); }}
            onShowOperations={() => { setShowLevelSelector(false); setOpenSettingsOnBack(true); setShowOperations(true); }}
            onShowGlossary={() => { setShowLevelSelector(false); setOpenSettingsOnBack(true); setView('glossary'); }}
          />
        </Suspense>
      )}
    </div>
    </SoundProvider>
  );
};

export default App;
