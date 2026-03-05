import React from 'react';
import { PersonaStage } from '../types';

interface PersonaBadgeProps {
  stage: PersonaStage;
  size?: 'sm' | 'md' | 'lg';
}

// Font Awesome 6 Free: Use available free icons (fas) and approximations for Pro-only animals
const personaIconStyle: Record<PersonaStage, string> = {
  [PersonaStage.EGG]: "fas",
  [PersonaStage.PLANKTON]: "fas",
  [PersonaStage.SHRIMP]: "fas",
  [PersonaStage.CRAB]: "fas",
  [PersonaStage.SMALL_FISH]: "fas",
  [PersonaStage.OCTOPUS]: "fa-brands", // octopus-deploy is a brand icon
  [PersonaStage.SEAL]: "fas",
  [PersonaStage.DOLPHIN]: "fas",
  [PersonaStage.SHARK]: "fas",
  [PersonaStage.WHALE]: "fas",
  [PersonaStage.GOD_WHALE]: "fas",
};
const personaIcons: Record<PersonaStage, string> = {
  [PersonaStage.EGG]: "fa-egg",
  [PersonaStage.PLANKTON]: "fa-microbe",
  [PersonaStage.SHRIMP]: "fa-shrimp",
  [PersonaStage.CRAB]: "fa-hand-peace", // approximation for PRO fa-crab
  [PersonaStage.SMALL_FISH]: "fa-fish",
  [PersonaStage.OCTOPUS]: "fa-octopus-deploy", // brand icon substitution 
  [PersonaStage.SEAL]: "fa-water", // approximation for PRO fa-seal
  [PersonaStage.DOLPHIN]: "fa-dolphin",
  [PersonaStage.SHARK]: "fa-shield-halved", // approximation for PRO fa-shark
  [PersonaStage.WHALE]: "fa-cloud", // approximation for PRO fa-whale
  [PersonaStage.GOD_WHALE]: "fa-globe",
};

export const PersonaBadge: React.FC<PersonaBadgeProps> = ({ stage, size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-12 h-12 text-xl',
    lg: 'w-20 h-20 text-4xl',
  };
  const style = personaIconStyle[stage] || 'fas';
  const icon = personaIcons[stage] || 'fa-fish';

  return (
    <div className={`flex flex-col items-center justify-center`}>
      <div className={`${sizeClasses[size]} rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20`}>
        <i className={`${style} ${icon} text-white`}></i>
      </div>
    </div>
  );
};