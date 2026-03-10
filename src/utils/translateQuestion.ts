/**
 * Translates question text to French when language is 'fr'.
 */
export const translateQuestionText = (text: string, language: string): string => {
  if (language !== 'fr') return text;

  const questionTranslations: Record<string, string> = {
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
    'In Python': 'En Python',
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
    'True or False': 'Vrai ou Faux',
  };

  let translated = text;
  const sortedEntries = Object.entries(questionTranslations).sort((a, b) => b[0].length - a[0].length);
  
  for (const [en, fr] of sortedEntries) {
    const escaped = en.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const pattern = new RegExp(`^${escaped}|:${escaped}|\\(${escaped}`, 'i');
    if (pattern.test(translated)) {
      translated = translated.replace(pattern, (match) => {
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
 */
export const translateOptionText = (text: string, language: string): string => {
  if (language !== 'fr') return text;

  const optionTranslations: Record<string, string> = {
    'True': 'Vrai',
    'False': 'Faux',
    'None': 'Aucun',
    'Error': 'Erreur',
    'True, False': 'Vrai, Faux',
    'False, True': 'Faux, Vrai',
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
    'Exception': 'Exception',
    'Module': 'Module',
    'Lambda': 'Lambda',
    'Generator': 'Générateur',
    'Iterator': 'Itérateur',
    'Decorator': 'Décorateur',
    'Yield': 'Yield',
    'Queue': 'File',
    'Stack': 'Pile',
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
    'Original': 'Original',
    'By reference': 'Par référence',
    'By value': 'Par valeur',
    'In place': 'Sur place',
    'Creates an instance': 'Crée une instance',
    'Yes': 'Oui',
    'No': 'Non',
    'All of the above': 'Tout ce qui précède',
    'None of the above': 'Aucun de ce qui précède',
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
    'No output': 'Pas de sortie',
    'No error': 'Pas d\'erreur',
    'SyntaxError': 'Erreur de syntaxe',
    'TypeError': 'Erreur de type',
    'ValueError': 'Erreur de valeur',
    'NameError': 'Erreur de nom',
    'IndexError': 'Erreur d\'index',
  };

  let translated = text;
  
  if (optionTranslations[translated]) {
    return optionTranslations[translated];
  }
  
  for (const [en, fr] of Object.entries(optionTranslations)) {
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
