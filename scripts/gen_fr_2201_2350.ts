/**
 * Generate French detailed explanations for IDs 2201-2350
 * Run: npx tsx scripts/gen_fr_2201_2350.ts
 */

import * as fs from 'fs';
import { QUESTIONS_BANK } from '../src/questionsBank';

const EN_FR: Record<string, string> = {
  'Key concepts:': 'Concepts clés :',
  'How it works:': 'Comment ça fonctionne :',
  'Examples:': 'Exemple :',
  'Example:': 'Exemple :',
  'Common uses:': 'Usages courants :',
  'Edge cases:': 'Cas limites :',
  'Memory comparison:': 'Comparaison mémoire :',
  'Trade-offs:': 'Compromis :',
  'Composition vs Inheritance:': 'Composition vs héritage :',
  'Fix:': 'Correction :',
  'Best practice:': 'Bonne pratique :',
  'Best practices:': 'Bonnes pratiques :',
  'Equivalent class statement:': 'Instruction de classe équivalente :',
  'Equivalent:': 'Équivalent :',
  'Note:': 'Note :',
  'Scenarios where __del__ may NOT run:': "Scénarios où __del__ peut ne pas s'exécuter :",
  'Without __eq__:': 'Sans __eq__ :',
  'With __eq__:': 'Avec __eq__ :',
  'Example with keyword arguments:': "Exemple avec arguments nommés :",
  'Order of operations:': "Ordre d'opération :",
  returns: 'renvoie',
  Returns: 'Renvoie',
  'Must return': 'Doit retourner',
  'must return': 'doit retourner',
  'is called': 'est appelé',
  'are called': 'sont appelés',
  'Python calls': 'Python appelle',
  'Python falls back to': 'Python utilise en repli',
  'When an': "Lorsqu'un",
  'When a': "Lorsqu'une",
  'when the': 'lorsque le',
  'the method': 'la méthode',
  'The method': 'La méthode',
  'overrides the': 'surcharge le',
  'Overrides the': 'Surcharge le',
  'defines the behavior of': 'définit le comportement de',
  'Defines the behavior of': 'Définit le comportement de',
  'defines the': 'définit le',
  'Defines the': 'Définit le',
  'is the fallback': 'est le repli',
  'is a fallback': 'est un repli',
  'first': 'd\'abord',
  'second': 'ensuite',
  'then': 'puis',
  'triggers': 'déclenche',
  'intercepts': 'intercepte',
  'receives': 'reçoit',
  'object': 'objet',
  'instance': 'instance',
  'class': 'classe',
  'attribute': 'attribut',
  'attributes': 'attributs',
  'assignment': 'assignation',
  'deletion': 'suppression',
  'lookup': 'recherche',
  'access': 'accès',
  'normal': 'normal',
  'every': 'chaque',
  'all': 'tous',
  'only': 'seulement',
  'only when': 'uniquement lorsque',
  'when': 'quand',
  'If': 'Si',
  'if': 'si',
  'creates': 'crée',
  'create': 'créer',
  'created': 'créé',
  'returns': 'retourne',
  'return': 'retourner',
  'returned': 'retourné',
  'stores': 'stocke',
  'stored': 'stocké',
  'shared': 'partagé',
  'different': 'différent',
  'same': 'même',
  'both': 'les deux',
  'either': "l'un ou l'autre",
  'neither': 'aucun',
  'True': 'True',
  'False': 'False',
  'None': 'None',
  'Error': 'Erreur',
};

function translateSection(text: string): string {
  let out = text;
  for (const [en, fr] of Object.entries(EN_FR)) {
    const re = new RegExp(en.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
    out = out.replace(re, fr);
  }
  return out;
}

// Additional phrase translations for Level 8 content
const PHRASE_MAP: Record<string, string> = {
  'Without __eq__, == checks identity (is), not value equality': 'Sans __eq__, == vérifie l\'identité (is), pas l\'égalité des valeurs',
  'Two separate V(1) objects are different objects but equal by value here': 'Deux V(1) distincts sont des objets différents mais égaux par valeur ici',
  '__eq__ receives the other operand as the second argument': '__eq__ reçoit l\'autre opérande comme second argument',
  'V(1) creates an instance with x = 1': 'V(1) crée une instance avec x = 1',
  'V(1) == V(1) calls __eq__ on the left operand': 'V(1) == V(1) appelle __eq__ sur l\'opérande de gauche',
  'self.x == o.x evaluates 1 == 1': 'self.x == o.x évalue 1 == 1',
  'Result: True': 'Résultat : True',
  'In Python 3, if you define __eq__ but not __ne__, Python auto-generates __ne__ as the negation of __eq__': 'En Python 3, si vous définissez __eq__ mais pas __ne__, Python génère __ne__ comme négation de __eq__',
  'Defining __ne__ explicitly gives full control over inequality': 'Définir __ne__ explicitement donne un contrôle total sur l\'inégalité',
  '__ne__ receives the right operand as the second argument': '__ne__ reçoit l\'opérande de droite comme second argument',
  'V(1) has x = 1, V(2) has x = 2': 'V(1) a x = 1, V(2) a x = 2',
  'V(1) != V(2) calls __ne__ on the left operand': 'V(1) != V(2) appelle __ne__ sur l\'opérande de gauche',
  'self.x != o.x evaluates 1 != 2': 'self.x != o.x évalue 1 != 2',
  'Custom inequality logic': 'Logique d\'inégalité personnalisée',
  'Usually paired with __eq__ for consistency': 'Souvent associé à __eq__ pour la cohérence',
  'Filtering and conditional checks': 'Filtrage et vérifications conditionnelles',
  'Used by sorted() and sort() when comparing objects': 'Utilisé par sorted() et sort() pour comparer des objets',
  'Part of the rich comparison methods (__lt__, __le__, __gt__, __ge__, __eq__, __ne__)': 'Fait partie des méthodes de comparaison riches (__lt__, __le__, __gt__, __ge__, __eq__, __ne__)',
  'functools.total_ordering can auto-generate the rest if __eq__ and one ordering method are defined': 'functools.total_ordering peut générer le reste si __eq__ et une méthode d\'ordre sont définies',
  'V(1) < V(2) calls __lt__ on the left operand': 'V(1) < V(2) appelle __lt__ sur l\'opérande de gauche',
  'self.x < o.x evaluates 1 < 2': 'self.x < o.x évalue 1 < 2',
  'Enabling sorting of custom objects': 'Activer le tri d\'objets personnalisés',
  'Ordered comparisons in data structures': 'Comparaisons ordonnées dans les structures de données',
  'Priority queues and binary search': 'Files de priorité et recherche binaire',
  'Boundary case: equal values return True for <=': 'Cas limite : des valeurs égales retournent True pour <=',
  'Part of the six rich comparison methods': 'Fait partie des six méthodes de comparaison riches',
  'Can be auto-generated with functools.total_ordering': 'Peut être généré avec functools.total_ordering',
  'Both V(2) instances have x = 2': 'Les deux instances V(2) ont x = 2',
  'V(2) <= V(2) calls __le__ on the left operand': 'V(2) <= V(2) appelle __le__ sur l\'opérande de gauche',
  'self.x <= o.x evaluates 2 <= 2': 'self.x <= o.x évalue 2 <= 2',
  'Range checks and boundary conditions': 'Vérifications de plage et conditions aux limites',
  'Sorted data validation': 'Validation de données triées',
  'Comparison chains like V(1) <= V(2) <= V(3)': 'Chaînes de comparaison comme V(1) <= V(2) <= V(3)',
  'Called when using > between instances of the class': 'Appelé lors de l\'utilisation de > entre instances de la classe',
  'Should return True or False (or NotImplemented)': 'Doit retourner True ou False (ou NotImplemented)',
  'Part of the rich comparison protocol alongside __lt__, __le__, __ge__, __eq__, __ne__': 'Fait partie du protocole de comparaison riche avec __lt__, __le__, __ge__, __eq__, __ne__',
  'Value-based equality for custom objects': 'Égalité basée sur la valeur pour objets personnalisés',
  'Needed for using objects in sets or as dict keys (with __hash__)': 'Nécessaire pour utiliser des objets dans des ensembles ou comme clés de dict (avec __hash__)',
  'Data classes and model comparisons': 'Classes de données et comparaisons de modèles',
  'The __eq__ method defines custom equality behavior': "La méthode __eq__ définit le comportement d'égalité personnalisé",
  'When Python evaluates V(1) == V(1), it calls': 'Quand Python évalue V(1) == V(1), il appelle',
  'which compares self.x == o.x, i.e. 1 == 1, returning True': 'qui compare self.x == o.x, soit 1 == 1, et retourne True',
  'The __ne__ method defines the behavior of the != operator': 'La méthode __ne__ définit le comportement de l\'opérateur !=',
  'When V(1) != V(2) is evaluated, Python calls': 'Quand V(1) != V(2) est évalué, Python appelle',
  'which checks self.x != o.x, i.e. 1 != 2, returning True': 'qui vérifie self.x != o.x, soit 1 != 2, et retourne True',
  'The __lt__ method defines the behavior of the < (less than) operator': 'La méthode __lt__ définit le comportement de l\'opérateur < (inférieur à)',
  'When V(1) < V(2) is evaluated, Python calls': 'Quand V(1) < V(2) est évalué, Python appelle',
  'which checks self.x < o.x, i.e. 1 < 2, returning True': 'qui vérifie self.x < o.x, soit 1 < 2, et retourne True',
  'The __le__ method defines the behavior of the <= (less than or equal to) operator': 'La méthode __le__ définit le comportement de l\'opérateur <= (inférieur ou égal)',
  'When V(2) <= V(2) is evaluated, Python calls': 'Quand V(2) <= V(2) est évalué, Python appelle',
  'which checks self.x <= o.x, i.e. 2 <= 2, returning True': 'qui vérifie self.x <= o.x, soit 2 <= 2, et retourne True',
  'Defining __gt__ on a class allows instances to be compared using the > operator': 'Définir __gt__ sur une classe permet de comparer les instances avec l\'opérateur >',
  'When you write a > b, Python calls a.__gt__(b)': 'Quand vous écrivez a > b, Python appelle a.__gt__(b)',
  'This is one of the six rich comparison methods': 'C\'est l\'une des six méthodes de comparaison riches',
};

// More comprehensive translation for common phrases
function translateBlock(de: string): string {
  let out = de;
  for (const [en, fr] of Object.entries(PHRASE_MAP)) {
    out = out.split(en).join(fr);
  }
  out = out
    .replace(/^Key concepts:\s*$/gm, 'Concepts clés :')
    .replace(/^How it works:\s*$/gm, 'Comment ça fonctionne :')
    .replace(/^Examples:\s*$/gm, 'Exemple :')
    .replace(/^Example:\s*$/gm, 'Exemple :')
    .replace(/^Common uses:\s*$/gm, 'Usages courants :')
    .replace(/^Edge cases:\s*$/gm, 'Cas limites :')
    .replace(/^Memory comparison:\s*$/gm, 'Comparaison mémoire :')
    .replace(/^Trade-offs:\s*$/gm, 'Compromis :')
    .replace(/^Composition vs Inheritance:\s*$/gm, 'Composition vs héritage :')
    .replace(/^Best practice:\s*$/gm, 'Bonne pratique :')
    .replace(/^Best practices:\s*$/gm, 'Bonnes pratiques :')
    .replace(/^Fix:\s*$/gm, 'Correction :')
    .replace(/^Note:\s*$/gm, 'Note :')
    .replace(/^Equivalent:\s*$/gm, 'Équivalent :')
    .replace(/^Equivalent class statement:\s*$/gm, 'Instruction de classe équivalente :')
    .replace(/^Scenarios where __del__ may NOT run:\s*$/gm, "Scénarios où __del__ peut ne pas s'exécuter :")
    .replace(/^Without __eq__:\s*$/gm, 'Sans __eq__ :')
    .replace(/^With __eq__:\s*$/gm, 'Avec __eq__ :');

  // Translate common bullet points
  out = out
    .replace(/\• __eq__ overrides the == operator/g, '• __eq__ surcharge l\'opérateur ==')
    .replace(/\• __ne__ overrides the != operator/g, '• __ne__ surcharge l\'opérateur !=')
    .replace(/\• __lt__ overrides the < operator/g, '• __lt__ surcharge l\'opérateur <')
    .replace(/\• __le__ overrides the <= operator/g, '• __le__ surcharge l\'opérateur <=')
    .replace(/\• __gt__ overrides the > operator/g, '• __gt__ surcharge l\'opérateur >')
    .replace(/\• __add__ overrides the \+ operator/g, '• __add__ surcharge l\'opérateur +')
    .replace(/\• __mul__ overrides the \* operator/g, '• __mul__ surcharge l\'opérateur *')
    .replace(/\• __sub__ overrides the binary - operator/g, '• __sub__ surcharge l\'opérateur binaire -')
    .replace(/\• __neg__ overrides the unary - operator/g, '• __neg__ surcharge l\'opérateur unaire -')
    .replace(/\• __abs__ overrides the built-in abs\(\)/g, '• __abs__ surcharge la fonction intégrée abs()')
    .replace(/\• __floordiv__ overrides the \/\/ operator/g, '• __floordiv__ surcharge l\'opérateur //')
    .replace(/\• __mod__ overrides the % operator/g, '• __mod__ surcharge l\'opérateur %')
    .replace(/\• __pow__ overrides the \*\* operator/g, '• __pow__ surcharge l\'opérateur **')
    .replace(/\• __repr__ is the developer-facing string representation/g, '• __repr__ est la représentation chaîne pour les développeurs')
    .replace(/\• __str__ is for user-friendly display/g, '• __str__ est pour l\'affichage convivial')
    .replace(/\• __bool__ defines truthiness for custom objects/g, '• __bool__ définit la véracité des objets personnalisés')
    .replace(/\• __len__\(\) == 0 → falsy/g, '• __len__() == 0 → falsy')
    .replace(/\• __len__\(\) > 0 → truthy/g, '• __len__() > 0 → truthy')
    .replace(/\• __contains__ overrides the 'in' operator/g, "• __contains__ surcharge l'opérateur 'in'")
    .replace(/\• An iterator must implement both __iter__ and __next__/g, '• Un itérateur doit implémenter __iter__ et __next__')
    .replace(/\• __enter__ is called when entering the 'with' block/g, "• __enter__ est appelé à l'entrée du bloc 'with'")
    .replace(/\• __exit__ is called when leaving the 'with' block/g, "• __exit__ est appelé à la sortie du bloc 'with'")
    .replace(/\• __new__ runs first — it creates and returns the raw instance/g, '• __new__ s\'exécute en premier — il crée et retourne l\'instance brute')
    .replace(/\• __init__ runs second — it receives the instance and initializes it/g, '• __init__ s\'exécute ensuite — il reçoit l\'instance et l\'initialise')
    .replace(/\• Shallow copy: new container, same contents/g, '• Copie superficielle : nouveau conteneur, mêmes contenus')
    .replace(/\• Deep copy: new container AND new contents \(recursively\)/g, '• Copie profonde : nouveau conteneur ET nouveaux contenus (récursivement)')
    .replace(/\• copy\.copy\(obj\) checks for obj\.__copy__\(\) first/g, '• copy.copy(obj) vérifie d\'abord obj.__copy__()')
    .replace(/\• Without __eq__: C\(1\) == C\(1\) is False \(different objects\)/g, '• Sans __eq__ : C(1) == C(1) est False (objets différents)')
    .replace(/\• With __eq__: comparison uses your custom logic/g, '• Avec __eq__ : la comparaison utilise votre logique personnalisée')
    .replace(/\• The 'is' operator checks object identity/g, "• L'opérateur 'is' vérifie l'identité des objets")
    .replace(/\• Class variables are shared by all instances/g, '• Les variables de classe sont partagées par toutes les instances')
    .replace(/\• self\.data = \[\].*creates a NEW list each time/g, '• self.data = [] dans __init__ crée une NOUVELLE liste à chaque fois');

  return out;
}

const range = QUESTIONS_BANK.filter((q) => q.id >= 2201 && q.id <= 2350);
const lines: string[] = [];

for (const q of range) {
  const de = q.detailedExplanation ?? '';
  const fr = translateBlock(de);
  const escaped = fr.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
  lines.push(`  ${q.id}: \`${escaped}\`,`);
}

const block = lines.join('\n');
fs.writeFileSync('scripts/fr_2201_2350_generated.txt', block);
console.log('Wrote scripts/fr_2201_2350_generated.txt');
