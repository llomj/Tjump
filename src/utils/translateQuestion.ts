import { getTranslatedOption } from '../data/optionsFr';
import { getTranslatedQuestion, QUESTIONS_FR } from '../data/questionsFr';

/**
 * Translates question text to French when language is 'fr'.
 * Used by IdSearchModal, QuizView, and IdLogView.
 */
export const translateQuestionText = (text: string, language: string, questionId?: number): string => {
  if (language !== 'fr') return text;

  // First try the full translations from our lookup file
  if (questionId) {
    if (QUESTIONS_FR && QUESTIONS_FR[questionId]) {
      // If the question has a multi-line format, we only want to replace the first line
      // or just return the full translated question if it's not multi-line
      if (!text.includes('\n')) {
        return QUESTIONS_FR[questionId];
      } else {
        // Multi-line question: replace only the first line with the translation
        const lines = text.split('\n');
        lines[0] = QUESTIONS_FR[questionId];
        return lines.join('\n');
      }
    }
  }

  const questionTranslations: Record<string, string> = {
    // Core question patterns
    'What is': 'Quel est le résultat de',
    'What is?': 'Résultat :',
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
    'Evaluate': 'Évaluez',
    'evaluate': 'évaluez',
    'What is the output': 'Quelle est la sortie',
    'What is the result': 'Quel est le résultat',
    'What is the value': 'Quelle est la valeur',
    'What does': 'Que fait',
    'What will': 'Que va',
    'What will be': 'Que sera',
    'What would': 'Que serait',
    'What would be': 'Que serait',
    'What is the': 'Quel est le',
    'What are the': 'Quels sont les',
    'Which of the following': 'Laquelle des suivantes',
    'Which one': 'Laquelle',
    'Which': 'Lequel',
    'How many': 'Combien',
    'How does': 'Comment',
    'How can': 'Comment peut',
    'When does': 'Quand',
    'Where does': 'Où',
    'Why does': 'Pourquoi',
    'Can': 'Peut',
    'Does': 'Est-ce que',
    'Is': 'Est',
    'Are': 'Sont',
    'Will': 'Va',
    'Would': 'Serait',
    'Should': 'Devrait',
    'Do': 'Faire',
    'Does the': 'Le',
    'Is the': 'Le',
    'In Python': 'En Python',
    'in Python': 'en Python',
    'Consider the following code': 'Considérez le code suivant',
    'Given the following': 'Soit le',
    'Given code': 'Soit le code',
    'Code:': 'Code :',
    'What print': 'Ce qu\'affiche',
    'What is printed': 'Ce qui est affiché',
    'What gets printed': 'Ce qui est affiché',
    'What will print': 'Ce qu\'affichera',
    'What does this code do': 'Que fait ce code',
    'What is the purpose': 'Quel est le but',
    'Which statement': 'Quelle affirmation',
    'Which of these': 'Laquelle de ces',
    'Which statement is': 'Quelle affirmation est',
    'Which one is': 'Laquelle est',
    'Choose the': 'Choisissez',
    'Select': 'Sélectionnez',
    'Answer:': 'Réponse :',
    'The method': 'La méthode',
    'The function': 'La fonction',
    'The class': 'La classe',
    'A class': 'Une classe',
    'An object': 'Un objet',
    'The object': 'L\'objet',
    'This code': 'Ce code',
    'After execution': 'Après exécution',
    'Before execution': 'Avant exécution',
    'Starting from': 'À partir de',
    'What is class': 'Qu\'est-ce que class',
    'What is def': 'Qu\'est-ce que def',
    'What is the output of': 'Quelle est la sortie de',
    'What is the return': 'Quelle est la valeur de retour',
    'What is returned': 'Ce qui est retourné',
    'Return value': 'Valeur de retour',
    'None of these': 'Aucune de ces',
    'All of these': 'Toutes ces',
    'Both': 'Les deux',
    'Neither': 'Aucun des deux',
    'True or False': 'Vrai ou Faux',
  };

  let translated = text;
  
  // Try to match from longest to shortest to avoid partial matches
  const sortedEntries = Object.entries(questionTranslations).sort((a, b) => b[0].length - a[0].length);
  
  for (const [en, fr] of sortedEntries) {
    const escaped = en.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    // Match at start of string or after certain punctuation
    const pattern = new RegExp(`^${escaped}|:${escaped}|\\(${escaped}`, 'i');
    if (pattern.test(translated)) {
      translated = translated.replace(pattern, (match) => {
        // Preserve case
        if (match[0] === match[0].toUpperCase()) {
          return fr.charAt(0).toUpperCase() + fr.slice(1);
        }
        return fr;
      });
    }
  }
  
  return translated;
};

/**
 * Translates option text to French when language is 'fr'.
 * Used by QuizView for translating answer options.
 */
export const translateOptionText = (text: string, language: string, questionId?: number): string => {
  if (language !== 'fr') return text;

  // Try exact lookup from optionsFr.ts first
  if (questionId) {
    const translated = getTranslatedOption(text, language, questionId);
    if (translated !== text) return translated;
  }

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
    'Returns None': 'Retourne None',
    'Returns True or False': 'Retourne Vrai ou Faux',
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
    'a': 'a',
    'b': 'b', 
    'c': 'c',
    'd': 'd',
    'A': 'A',
    'B': 'B',
    'C': 'C',
    'D': 'D',
    'The code runs without output': 'Le code s\'exécute sans sortie',
    'The code runs with output': 'Le code s\'exécute avec sortie',
    'The code produces an error': 'Le code produit une erreur',
    'Code runs without error': 'Le code s\'exécute sans erreur',
    'Code produces error': 'Le code produit une erreur',
    'No output': 'Pas de sortie',
    'No error': 'Pas d\'erreur',
    'Compilation error': 'Erreur de compilation',
    'Runtime error': 'Erreur d\'exécution',
    'SyntaxError': 'Erreur de syntaxe',
    'TypeError': 'Erreur de type',
    'ValueError': 'Erreur de valeur',
    'NameError': 'Erreur de nom',
    'IndexError': 'Erreur d\'index',
    'KeyError': 'Erreur de clé',
    'AttributeError': 'Erreur d\'attribut',
    'ZeroDivisionError': 'Erreur de division par zéro',
    'IndentationError': 'Erreur d\'indentation',
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
export const translateOptions = (options: string[], language: string, questionId?: number): string[] => {
  if (language !== 'fr') return options;
  return options.map(opt => translateOptionText(opt, language, questionId));
};
