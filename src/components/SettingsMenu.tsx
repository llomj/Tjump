import React, { useState, useEffect } from 'react';
import { PersonaStage } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { formatTranslation } from '../translations';
import { APP_VERSION } from '../constants';
import { useSound } from '../contexts/SoundContext';

interface SettingsMenuProps {
  isOpen: boolean;
  onClose: () => void;
  view: 'hub' | 'quiz' | 'log' | 'glossary' | 'methods' | 'flow';
  randomMode?: boolean;
  anchorBottom?: boolean; // When true, menu opens near top-right (mobile-friendly placement)
  onToggleRandomMode?: () => void;
  onShowGlossary?: () => void;
  onShowIdSearch?: () => void;
  onShowIdLog?: () => void;
  onShowLearningLog?: () => void;
  onShowOperations?: () => void;
  onShowMethods?: () => void;
  onShowFlow?: () => void;
  onShowLevelSelector?: () => void;
  onToggleLanguage?: () => void;
  soundEnabled?: boolean;
  hapticEnabled?: boolean;
  lightMode?: boolean;
  onToggleSound?: () => void;
  onToggleHaptic?: () => void;
  onToggleLightMode?: () => void;
  triggerHaptic?: () => void;
  onRefreshApp?: () => void;
  onResetApp?: () => void;
}

export const SettingsMenu: React.FC<SettingsMenuProps> = ({
  isOpen,
  onClose,
  view,
  randomMode = false,
  anchorBottom = false,
  onToggleRandomMode,
  onShowGlossary,
  onShowIdSearch,
  onShowIdLog,
  onShowLearningLog,
  onShowOperations,
  onShowMethods,
  onShowFlow,
  onShowLevelSelector,
  onToggleLanguage,
  soundEnabled = true,
  hapticEnabled = true,
  lightMode = false,
  onToggleSound,
  onToggleHaptic,
  onToggleLightMode,
  triggerHaptic,
  onRefreshApp,
  onResetApp
}) => {
  const { t, language } = useLanguage();
  const { playCutSound } = useSound();
  const [rulesExpanded, setRulesExpanded] = useState(false);
  const [logExpanded, setLogExpanded] = useState(false);
  const [settingsExpanded, setSettingsExpanded] = useState(false);
  useEffect(() => {
    if (!isOpen) {
      setRulesExpanded(false);
      setLogExpanded(false);
      setSettingsExpanded(false);
    }
  }, [isOpen]);

  const withHaptic = (fn?: () => void) => () => {
    playCutSound();
    triggerHaptic?.();
    fn?.();
  };

  if (!isOpen) return null;

  const menuItems: Array<{
    icon: string;
    label: string;
    onClick?: () => void;
    active?: boolean;
    highlight?: boolean;
    type?: 'item' | 'section' | 'expandable';
    children?: Array<{ icon: string; label: string; onClick: () => void }>;
  }> = [];

  // Core items: Random Mode on top, Select Level under it, then Rules, then logs.
  if (onToggleRandomMode) {
    menuItems.push({
      icon: 'fa-shuffle',
      label: randomMode ? t('settings.switchToLevelMode') : t('settings.switchToRandomMode'),
      onClick: () => {
        onToggleRandomMode();
        onClose();
      }
    });
  }

  if (onShowLevelSelector) {
    menuItems.push({
      icon: 'fa-layer-group',
      label: t('settings.selectLevel'),
      onClick: () => {
        onShowLevelSelector();
        onClose();
      }
    });
  }

  // Rules (under Select Level): expandable — Flow, Glossary, Methods, Operations & Math (alphabetical)
  if (onShowMethods || onShowFlow || onShowOperations || onShowGlossary) {
    const rulesChildren: Array<{ icon: string; label: string; onClick: () => void }> = [];
    if (onShowFlow) rulesChildren.push({ icon: 'fa-diagram-project', label: t('app.flow'), onClick: () => { onShowFlow(); onClose(); } });
    if (onShowGlossary) rulesChildren.push({ icon: 'fa-circle-info', label: t('app.glossary'), onClick: () => { onShowGlossary(); onClose(); } });
    if (onShowMethods) rulesChildren.push({ icon: 'fa-code', label: t('app.methods'), onClick: () => { onShowMethods(); onClose(); } });
    if (onShowOperations) rulesChildren.push({ icon: 'fa-calculator', label: t('app.operations'), onClick: () => { onShowOperations(); onClose(); } });
    rulesChildren.sort((a, b) => a.label.localeCompare(b.label));
    menuItems.push({ icon: 'fa-book', label: t('levelSelector.rules'), type: 'expandable', children: rulesChildren });
  }

  // Log group: expandable wrapper for Search by ID, ID Log, Learning Log
  if (onShowIdSearch || onShowIdLog || onShowLearningLog) {
    const logChildren: Array<{ icon: string; label: string; onClick: () => void }> = [];
    if (onShowIdSearch) {
      logChildren.push({
        icon: 'fa-hashtag',
        label: t('settings.searchById'),
        onClick: () => { onShowIdSearch(); onClose(); }
      });
    }
    if (onShowIdLog) {
      logChildren.push({
        icon: 'fa-list',
        label: t('settings.idLog'),
        onClick: () => { onShowIdLog(); onClose(); }
      });
    }
    if (onShowLearningLog) {
      logChildren.push({
        icon: 'fa-book-open',
        label: t('app.learningLog'),
        onClick: () => { onShowLearningLog(); onClose(); }
      });
    }
    menuItems.push({ icon: 'fa-book-open', label: 'Log', type: 'expandable', children: logChildren });
  }

  if (onToggleLanguage) {
    menuItems.push({
      icon: 'fa-language',
      label: language === 'en' ? 'Français' : 'English',
      onClick: () => {
        onToggleLanguage();
        onClose();
      }
    });
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40"
        onClick={() => { playCutSound(); onClose(); }}
      />

      {/* Menu - near top-right on mobile, below trigger on desktop */}
      <div className={`z-50 min-w-[200px] ${anchorBottom ? 'fixed top-[max(4rem,env(safe-area-inset-top))] right-4' : 'absolute top-full right-0 mt-2'}`}>
        <div className="glass-settings rounded-2xl p-2 shadow-2xl border border-white/10 animate-in slide-in-from-top-2 duration-200">
          {menuItems.map((item, index) =>
            item.type === 'expandable' && item.children ? (
              <div key={index} className="rounded-xl overflow-hidden">
                <button
                  onClick={withHaptic(() => {
                    if (item.label === t('levelSelector.rules')) {
                      setRulesExpanded(prev => !prev);
                    } else if (item.label === 'Log') {
                      setLogExpanded(prev => !prev);
                    }
                  })}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left text-slate-300 hover:bg-white/10 hover:text-white"
                >
                  <i className={`fas ${item.icon} text-sm w-5 flex-shrink-0 text-indigo-400`}></i>
                  <span className="text-sm font-medium flex-1">{item.label}</span>
                  <i
                    className={`fas fa-chevron-down text-xs text-slate-500 transition-transform ${
                      (item.label === t('levelSelector.rules') && rulesExpanded) ||
                      (item.label === 'Log' && logExpanded)
                        ? 'rotate-180'
                        : ''
                    }`}
                  ></i>
                </button>
                {((item.label === t('levelSelector.rules') && rulesExpanded) ||
                  (item.label === 'Log' && logExpanded)) && (
                  <div className="pl-4 pb-1 space-y-0.5 border-l-2 border-white/10 ml-3">
                    {item.children.map((child, i) => (
                      <button
                        key={i}
                        onClick={withHaptic(child.onClick)}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left text-slate-400 hover:bg-white/10 hover:text-white transition-all text-sm"
                      >
                        <i className={`fas ${child.icon} text-xs w-4 flex-shrink-0`}></i>
                        <span className="font-medium">{child.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : item.type === 'section' ? (
              <div
                key={index}
                className="flex items-center gap-3 px-4 py-2 mt-1 first:mt-0"
              >
                <i className={`fas ${item.icon} text-sm w-5 flex-shrink-0 text-indigo-400`}></i>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{item.label}</span>
              </div>
            ) : (
              <button
                key={index}
                onClick={withHaptic(item.onClick)}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left
                  ${item.active
                    ? 'bg-indigo-500/20 text-indigo-400'
                    : item.highlight
                      ? 'bg-green-500/10 text-green-400 hover:bg-green-500/20'
                      : 'text-slate-300 hover:bg-white/10 hover:text-white'
                  }
                `}
              >
                <i className={`fas ${item.icon} text-sm w-5 flex-shrink-0`}></i>
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            )
          )}

          {/* Settings section: wrapped under a single Settings icon (sound, haptic, theme, refresh) */}
          {(onToggleSound != null || onToggleHaptic != null || onToggleLightMode != null || onRefreshApp) && (
            <>
              <div className="my-2 border-t border-white/10" />
              <button
                onClick={withHaptic(() => setSettingsExpanded(prev => !prev))}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left text-slate-300 hover:bg-white/10 hover:text-white"
              >
                <i className="fas fa-gear text-sm w-5 flex-shrink-0 text-indigo-400"></i>
                <span className="text-sm font-medium flex-1">{t('settings.settings')}</span>
                <i className={`fas fa-chevron-down text-xs text-slate-500 transition-transform ${settingsExpanded ? 'rotate-180' : ''}`}></i>
              </button>
              {settingsExpanded && (
                <>
                  {(onToggleSound != null || onToggleHaptic != null || onToggleLightMode != null) && (
                    <>
                      <div className="flex items-center gap-3 px-4 py-2">
                        <i className="fas fa-volume-high text-sm w-5 flex-shrink-0 text-indigo-400"></i>
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t('settings.soundSection')}</span>
                      </div>
                      {onToggleSound != null && (
                        <button
                          onClick={withHaptic(onToggleSound)}
                          className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl transition-all text-left text-slate-300 hover:bg-white/10 hover:text-white"
                        >
                          <span className="text-sm font-medium">{t('settings.soundEffects')}</span>
                          <span className={`w-10 h-6 rounded-full transition-colors flex-shrink-0 ${soundEnabled ? 'bg-indigo-500' : 'bg-slate-600'}`}>
                            <span className={`block w-5 h-5 mt-0.5 rounded-full bg-white shadow transition-transform ${soundEnabled ? 'translate-x-5' : 'translate-x-0.5'}`} />
                          </span>
                        </button>
                      )}
                      {onToggleHaptic != null && (
                        <button
                          onClick={withHaptic(onToggleHaptic)}
                          className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl transition-all text-left text-slate-300 hover:bg-white/10 hover:text-white"
                        >
                          <span className="text-sm font-medium">{t('settings.hapticFeedback')}</span>
                          <span className={`w-10 h-6 rounded-full transition-colors flex-shrink-0 ${hapticEnabled ? 'bg-indigo-500' : 'bg-slate-600'}`}>
                            <span className={`block w-5 h-5 mt-0.5 rounded-full bg-white shadow transition-transform ${hapticEnabled ? 'translate-x-5' : 'translate-x-0.5'}`} />
                          </span>
                        </button>
                      )}
                      {onToggleLightMode != null && (
                        <button
                          onClick={withHaptic(onToggleLightMode)}
                          className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl transition-all text-left text-slate-300 hover:bg-white/10 hover:text-white"
                        >
                          <span className="flex items-center gap-3">
                            <i className="fas fa-palette text-sm w-5 flex-shrink-0 text-indigo-400"></i>
                            <span className="text-sm font-medium">{t('settings.theme')}</span>
                          </span>
                          <span className={`w-10 h-6 rounded-full transition-colors flex-shrink-0 ${lightMode ? 'bg-indigo-500' : 'bg-slate-600'}`}>
                            <span className={`block w-5 h-5 mt-0.5 rounded-full bg-white shadow transition-transform ${lightMode ? 'translate-x-5' : 'translate-x-0.5'}`} />
                          </span>
                        </button>
                      )}
                    </>
                  )}
                  {onRefreshApp && (
                    <button
                      onClick={withHaptic(() => {
                        onRefreshApp!();
                        onClose();
                      })}
                      className="w-full flex flex-col items-start gap-0.5 px-4 py-3 rounded-xl transition-all text-left text-slate-300 hover:bg-white/10 hover:text-white"
                    >
                      <span className="flex items-center gap-3 w-full">
                        <i className="fas fa-arrows-rotate text-sm w-5 flex-shrink-0"></i>
                        <span className="text-sm font-medium">{t('settings.refreshApp')}</span>
                      </span>
                      <span className="text-[10px] text-slate-500 pl-8">
                        {formatTranslation(t('settings.appVersion'), { version: APP_VERSION })}
                      </span>
                    </button>
                  )}
                </>
              )}
            </>
          )}

          {/* Reset App button - at bottom with warning styling */}
          {onResetApp && (
            <>
              <div className="my-2 border-t border-white/10" />
              <button
                onClick={withHaptic(() => {
                  onResetApp!();
                  onClose();
                })}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left text-amber-400 hover:bg-amber-500/10 hover:text-amber-300"
              >
                <i className="fas fa-rotate-left text-sm w-5 flex-shrink-0"></i>
                <span className="text-sm font-medium">{t('settings.resetApp')}</span>
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};
