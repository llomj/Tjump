import React, { createContext, useContext, useCallback, useEffect, ReactNode } from 'react';

interface SoundContextType {
  playCutSound: () => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

/** Call this from anywhere (e.g. App) to play cut sound when sound is on. */
let playCutSoundRef: { current: (() => void) | null } = { current: null };
export const playCutSoundIfEnabled = (): void => {
  playCutSoundRef.current?.();
};

/** Short crisp "cut" sound for button/window interactions. Plays only when soundEnabled. */
const createPlayCutSound = (soundEnabled: boolean): (() => void) => {
  return () => {
    if (!soundEnabled) return;
    if (typeof window === 'undefined') return;
    const AudioContextClass = window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;

    const ctx = new AudioContextClass();
    if (ctx.state === 'suspended') void ctx.resume();

    const now = ctx.currentTime;
    const masterGain = ctx.createGain();
    masterGain.connect(ctx.destination);
    masterGain.gain.setValueAtTime(0.25, now);
    masterGain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);

    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1200, now);
    g.gain.setValueAtTime(0.4, now);
    g.gain.exponentialRampToValueAtTime(0.01, now + 0.04);
    osc.connect(g);
    g.connect(masterGain);
    osc.start(now);
    osc.stop(now + 0.05);

    window.setTimeout(() => void ctx.close(), 80);
  };
};

interface SoundProviderProps {
  children: ReactNode;
  soundEnabled: boolean;
}

export const SoundProvider: React.FC<SoundProviderProps> = ({ children, soundEnabled }) => {
  const playCutSound = useCallback(createPlayCutSound(soundEnabled), [soundEnabled]);

  useEffect(() => {
    playCutSoundRef.current = playCutSound;
    return () => { playCutSoundRef.current = null; };
  }, [playCutSound]);

  return (
    <SoundContext.Provider value={{ playCutSound }}>
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => {
  const context = useContext(SoundContext);
  if (context === undefined) {
    return { playCutSound: () => {} };
  }
  return context;
};
