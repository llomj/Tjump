import React, { useState, useEffect } from 'react';
import { PersonaStage } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

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
  onPreviewStarSound?: () => void;
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
  onPreviewStarSound,
  onRefreshApp,
  onResetApp
}) => {
  const { t, language } = useLanguage();
  const [rulesExpanded, setRulesExpanded] = useState(false);
  useEffect(() => { if (!isOpen) setRulesExpanded(false); }, [isOpen]);

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

  // Hub view items: Random Mode on top, Select Level under it, then Methods, Flow, then rest
  if (view === 'hub') {
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
    if (onShowIdSearch) {
      menuItems.push({
        icon: 'fa-hashtag',
        label: t('settings.searchById'),
        onClick: () => {
          onShowIdSearch();
          onClose();
        }
      });
    }
    if (onShowIdLog) {
      menuItems.push({
        icon: 'fa-list',
        label: t('settings.idLog'),
        onClick: () => {
          onShowIdLog();
          onClose();
        }
      });
    }
    if (onShowLearningLog) {
      menuItems.push({
        icon: 'fa-book-open',
        label: t('app.learningLog'),
        onClick: () => {
          onShowLearningLog();
          onClose();
        }
      });
    }
  }

  // Quiz view items: Random Mode then Select Level
  if (view === 'quiz') {
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
  }

  // Common items (Glossary only inside Rules for hub/quiz)
  if (onShowLevelSelector && view !== 'hub' && view !== 'quiz') {
    menuItems.push({
      icon: 'fa-layer-group',
      label: t('settings.selectLevel'),
      onClick: () => {
        onShowLevelSelector();
        onClose();
      }
    });
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
  if (onShowGlossary && view !== 'hub' && view !== 'quiz') {
    menuItems.push({
      icon: 'fa-circle-info',
      label: t('app.glossary'),
      onClick: () => {
        onShowGlossary();
        onClose();
      }
    });
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40"
        onClick={onClose}
      />

      {/* Menu - near top-right on mobile, below trigger on desktop */}
      <div className={`z-50 min-w-[200px] ${anchorBottom ? 'fixed top-[max(4rem,env(safe-area-inset-top))] right-4' : 'absolute top-full right-0 mt-2'}`}>
        <div className="glass-settings rounded-2xl p-2 shadow-2xl border border-white/10 animate-in slide-in-from-top-2 duration-200">
          {menuItems.map((item, index) =>
            item.type === 'expandable' && item.children ? (
              <div key={index} className="rounded-xl overflow-hidden">
                <button
                  onClick={() => setRulesExpanded(prev => !prev)}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left text-slate-300 hover:bg-white/10 hover:text-white"
                >
                  <i className={`fas ${item.icon} text-sm w-5 flex-shrink-0 text-indigo-400`}></i>
                  <span className="text-sm font-medium flex-1">{item.label}</span>
                  <i className={`fas fa-chevron-down text-xs text-slate-500 transition-transform ${rulesExpanded ? 'rotate-180' : ''}`}></i>
                </button>
                {rulesExpanded && (
                  <div className="pl-4 pb-1 space-y-0.5 border-l-2 border-white/10 ml-3">
                    {item.children.map((child, i) => (
                      <button
                        key={i}
                        onClick={child.onClick}
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
                onClick={item.onClick}
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

          {/* Preview star celebration sound */}
          {onPreviewStarSound && (
            <>
              <div className="my-2 border-t border-white/10" />
              <button
                onClick={onPreviewStarSound}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left text-slate-300 hover:bg-white/10 hover:text-white"
              >
                <i className="fas fa-volume-high text-sm w-5 flex-shrink-0"></i>
                <span className="text-sm font-medium">{t('settings.previewStarSound')}</span>
              </button>
            </>
          )}

          {/* Refresh App - reloads UI, keeps scoring & progress */}
          {onRefreshApp && (
            <>
              <div className="my-2 border-t border-white/10" />
              <button
                onClick={() => {
                  onRefreshApp();
                  onClose();
                }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left text-slate-300 hover:bg-white/10 hover:text-white"
              >
                <i className="fas fa-arrows-rotate text-sm w-5 flex-shrink-0"></i>
                <span className="text-sm font-medium">{t('settings.refreshApp')}</span>
              </button>
            </>
          )}

          {/* Reset App button - at bottom with warning styling */}
          {onResetApp && (
            <>
              <div className="my-2 border-t border-white/10" />
              <button
                onClick={() => {
                  onResetApp();
                  onClose();
                }}
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
