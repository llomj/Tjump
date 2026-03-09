/**
 * Translates question text to French when language is 'fr'.
 * Used by IdSearchModal, QuizView, and IdLogView.
 */
export const translateQuestionText = (text: string, language: string): string => {
  if (language !== 'fr') return text;

  const questionTranslations: Record<string, string> = {
    'What is': 'Résultat : ',
    'What is?': 'Résultat : ',
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

/**
 * Translates option text to French when language is 'fr'.
 * Used by QuizView for translating answer options.
 */
export const translateOptionText = (text: string, language: string): string => {
  if (language !== 'fr') return text;

  const optionTranslations: Record<string, string> = {
    // Common answer patterns
    'True': 'Vrai',
    'False': 'Faux',
    'None': 'Aucun',
    'Error': 'Erreur',
    'True, False': 'Vrai, Faux',
    'False, True': 'Faux, Vrai',
    'None, Error': 'Aucun, Erreur',
    'Error, None': 'Erreur, Aucun',
    
    // Common action verbs in options
    'Defines a': 'Définit un',
    'Creates a': 'Crée un',
    'Returns a': 'Retourne un',
    'Returns': 'Retourne',
    'Returns the': 'Retourne le',
    'Returns True': 'Retourne Vrai',
    'Returns False': 'Retourne Faux',
    'Returns None': 'Retourne Aucun',
    'Raises an': 'Lève une',
    'Raises': 'Lève',
    'Prints': 'Affiche',
    'Print': 'Affiche',
    'Outputs': 'Affiche',
    'Output': 'Sortie',
    'Adds': 'Ajoute',
    'Removes': 'Supprime',
    'Updates': 'Met à jour',
    'Creates': 'Crée',
    'Deletes': 'Supprime',
    'Checks': 'Vérifie',
    'Compares': 'Compare',
    'Sorts': 'Trie',
    'Reverses': 'Inverse',
    'Converts': 'Convertit',
    'Extends': 'Étend',
    'Overrides': 'Remplace',
    'Inherits from': 'Hérite de',
    'Implements': 'Implémente',
    'Contains': 'Contient',
    'References': 'Référence',
    'Copies': 'Copie',
    'Deep copies': 'Copie en profondeur',
    'Shallow copy': 'Copie superficielle',
    'Deep copy': 'Copie en profondeur',
    'Mutable': 'Modifiable',
    'Immutable': 'Immuable',
    'Empty': 'Vide',
    'Zero': 'Zéro',
    'Positive': 'Positif',
    'Negative': 'Négatif',
    'Integer': 'Entier',
    'Float': 'Décimal',
    'String': 'Chaîne',
    'Boolean': 'Booléen',
    'List': 'Liste',
    'Tuple': 'Tuple',
    'Dictionary': 'Dictionnaire',
    'Set': 'Ensemble',
    'Class': 'Classe',
    'Object': 'Objet',
    'Function': 'Fonction',
    'Method': 'Méthode',
    'Attribute': 'Attribut',
    'Property': 'Propriété',
    'Exception': 'Exception',
    'Module': 'Module',
    'Package': 'Paquet',
    'Lambda': 'Lambda',
    'Generator': 'Générateur',
    'Iterator': 'Itérateur',
    'Decorator': 'Décorateur',
    'Context manager': 'Gestionnaire de contexte',
    'Yield': 'Yield',
    'Await': 'Await',
    'Async': 'Async',
    'Thread': 'Thread',
    'Process': 'Processus',
    'Lock': 'Verrou',
    'Semaphore': 'Sémaphore',
    'Queue': 'File',
    'Stack': 'Pile',
    'Heap': 'Tas',
    'Queue, Stack': 'File, Pile',
    'Stack, Queue': 'Pile, File',
    'First': 'Premier',
    'Last': 'Dernier',
    'Middle': 'Milieu',
    'Beginning': 'Début',
    'End': 'Fin',
    'Index': 'Index',
    'Value': 'Valeur',
    'Key': 'Clé',
    'Item': 'Élément',
    'Element': 'Élément',
    'New': 'Nouveau',
    'Old': 'Ancien',
    'Current': 'Actuel',
    'Previous': 'Précédent',
    'Next': 'Suivant',
    'Original': 'Original',
    'Modified': 'Modifié',
    'Deep': 'Profond',
    'Shallow': 'Superficiel',
    'By reference': 'Par référence',
    'By value': 'Par valeur',
    'By copy': 'Par copie',
    'In place': 'Sur place',
    'Creates an instance': 'Crée une instance',
    'Creates instance': 'Crée instance',
    'Creates class': 'Crée classe',
    'Defines class': 'Définit classe',
    'Executes code': 'Exécute code',
    'Returns class': 'Retourne classe',
    'Returns object': 'Retourne objet',
    'Returns function': 'Retourne fonction',
    'Returns method': 'Retourne méthode',
    'Returns value': 'Retourne valeur',
    'Returns True or False': 'Retourne Vrai ou Faux',
    'Yes': 'Oui',
    'No': 'Non',
    'A, B, C': 'A, B, C',
    'A only': 'A seulement',
    'B only': 'B seulement',
    'C only': 'C seulement',
    'A and B': 'A et B',
    'A and C': 'A et C',
    'B and C': 'B et C',
    'A, B and C': 'A, B et C',
    'All of the above': 'Tout ce qui précède',
    'None of the above': 'Aucun de ce qui précède',
    'Both A and B': 'A et B tous les deux',
    'Both': 'Les deux',
    'The first': 'Le premier',
    'The second': 'Le deuxième',
    'The third': 'Le troisième',
    'The fourth': 'Le quatrième',
    '1': '1',
    '2': '2',
    '3': '3',
    '4': '4',
    '[]': '[]',
    '{}': '{}',
    '()': '()',
    '(1, 2)': '(1, 2)',
    '[1, 2]': '[1, 2]',
    '{1: 2}': '{1: 2}',
  };

  let translated = text;
  
  // First try exact match
  if (optionTranslations[translated]) {
    return optionTranslations[translated];
  }
  
  // Then try word-by-word translation for partial matches
  for (const [en, fr] of Object.entries(optionTranslations)) {
    // Skip single characters that might cause issues
    if (en.length <= 1) continue;
    
    const pattern = new RegExp(en.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
    translated = translated.replace(pattern, fr);
  }
  
  return translated;
};

/**
 * Translates an array of options to French.
 */
export const translateOptions = (options: string[], language: string): string[] => {
  if (language !== 'fr') return options;
  return options.map(opt => translateOptionText(opt, language));
};
