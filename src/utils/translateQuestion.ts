/**
 * Translates question text to French when language is 'fr'.
 * Used by IdSearchModal, QuizView, and IdLogView.
 */
export const translateQuestionText = (text: string, language: string): string => {
  if (language !== 'fr') return text;

  const questionTranslations: Record<string, string> = {
    'What is': "Qu'est-ce que c'est",
    'What is?': "Qu'est-ce que c'est ?",
    'What happens when you': 'Que se passe-t-il quand vous',
    'What happens when': 'Que se passe-t-il quand',
    'What happens if': 'Que se passe-t-il si',
    'What happens with': 'Que se passe-t-il avec',
    'What happens to': "Qu'arrive-t-il à",
    'What happens here': 'Que se passe-t-il ici',
    'What happens?': 'Que se passe-t-il ?',
    'What happens': 'Que se passe-t-il',
    'Result of': 'Résultat de',
    'Output of': 'Sortie de',
    'Value of': 'Valeur de',
    'Which': 'Lequel',
    'How': 'Comment',
    'When': 'Quand',
    'Where': 'Où',
    'Why': 'Pourquoi',
    'Can': 'Peut',
    'Does': 'Est-ce que',
    'Is': 'Est',
    'Are': 'Sont',
    'Will': 'Va',
    'Would': 'Serait',
    'Should': 'Devrait',
  };

  let translated = text;
  for (const [en, fr] of Object.entries(questionTranslations)) {
    const pattern = new RegExp(`^${en.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'i');
    if (pattern.test(translated)) {
      translated = translated.replace(pattern, fr);
    }
  }
  return translated;
};
