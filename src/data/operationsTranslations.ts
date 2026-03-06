// French translations for operations data
// This file contains French translations for OPERATIONS_DATA and MATH_CONCEPTS_DATA
// Note: Python code examples remain the same in all languages, but comments/descriptions are translated

export interface OperationItem {
  title: string;
  category: string;
  definition: string;
  examples: string[];
  /** Step-by-step explanation for beginners (plain language, no jargon). */
  beginnerSteps?: string[];
  /** Step-by-step explanation for intermediate learners (more detail, some terminology). */
  intermediateSteps?: string[];
  /** Step-by-step explanation for experts (precise, edge cases, implementation notes). */
  expertSteps?: string[];
}

export const OPERATIONS_DATA_FR: OperationItem[] = [
  {
    title: "Opérations arithmétiques",
    category: "Opérations",
    definition: "Opérations mathématiques de base pour effectuer des calculs avec des nombres.",
    examples: [
      "+ Addition : 5 + 3 = 8",
      "- Soustraction : 10 - 4 = 6",
      "* Multiplication : 3 * 4 = 12",
      "/ Division : 15 / 3 = 5.0 (retourne toujours un float)",
      "// Division entière : 15 // 4 = 3 (arrondit vers le bas)",
      "% Modulo : 15 % 4 = 3 (reste)",
      "** Exponentiation : 2 ** 3 = 8"
    ],
    beginnerSteps: [
      "Étape 1 : L'addition (+) ajoute deux nombres. 5 + 3 en Python donne 8.",
      "Étape 2 : La soustraction (-) retire le second du premier. 10 - 4 donne 6.",
      "Étape 3 : La multiplication (*) répète un nombre. 3 * 4 = 3+3+3+3 = 12.",
      "Étape 4 : La division (/) partage en parts. 15 / 3 donne 5.0 — le point décimal : / renvoie toujours un float.",
      "Étape 5 : La division entière (//) divise et supprime les décimales. 15 // 4 = 3 (pas 3,75).",
      "Étape 6 : Le modulo (%) donne le reste après division. 15 % 4 = 3 (15 = 3×4 + 3).",
      "Étape 7 : L'exponentiation (**) signifie « puissance ». 2 ** 3 = 2×2×2 = 8."
    ],
    intermediateSteps: [
      "Étape 1 : Opérandes et opérateurs — chaque opération a un opérande gauche et droit (ex. dans a + b, a et b sont les opérandes, + l'opérateur).",
      "Étape 2 : Type du résultat — +, -, *, ** gardent int si les deux opérandes sont int ; / renvoie toujours float ; // et % renvoient int si les deux sont int.",
      "Étape 3 : Comportement de la division — / est la division réelle (float) ; // est la division entière (arrondi vers −∞) ; % vérifie (a // b) * b + (a % b) == a.",
      "Étape 4 : Nombres négatifs — // arrondit vers le bas (ex. -10 // 3 = -4) ; % a le signe du diviseur en Python.",
      "Étape 5 : Priorité — ** d'abord, puis * / // %, puis + -. Utilisez des parenthèses pour forcer l'ordre : (2 + 3) * 4."
    ],
    expertSteps: [
      "Étape 1 : Python utilise __add__, __sub__, __mul__, __truediv__, __floordiv__, __mod__, __pow__ pour +, -, *, /, //, %, ** ; les types personnalisés peuvent les surcharger.",
      "Étape 2 : / invoque toujours la division réelle (PEP 238) ; pour int/int utilisez //. from __future__ import division ne compte qu'en Python 2.",
      "Étape 3 : Identité de la division entière : (a // b) * b + (a % b) == a. Pour b négatif, le résultat de % a le signe de b ; // arrondit vers −∞.",
      "Étape 4 : ** est évalué de droite à gauche : 2 ** 3 ** 2 = 2 ** (3 ** 2) = 512. Zéro à une puissance négative lève ZeroDivisionError.",
      "Étape 5 : Les entiers à précision arbitraire évitent le dépassement ; pour une arithmétique exacte ou rationnelle, utilisez decimal.Decimal ou fractions."
    ]
  },
  {
    title: "Ordre des opérations",
    category: "Opérations",
    definition: "Python suit PEMDAS : Parenthèses, Exposants, Multiplication/Division (de gauche à droite), Addition/Soustraction (de gauche à droite).",
    examples: [
      "2 + 3 * 4 = 14 (multiplication avant addition)",
      "(2 + 3) * 4 = 20 (parenthèses d'abord)",
      "10 - 3 + 2 = 9 (de gauche à droite)",
      "2 ** 3 * 2 = 16 (exposants avant multiplication)"
    ],
    beginnerSteps: [
      "Étape 1 : Python ne calcule pas toujours de gauche à droite. Certaines opérations sont faites avant d'autres.",
      "Étape 2 : Tout ce qui est entre parenthèses ( ) est calculé en premier. (2 + 3) * 4 : d'abord 2 + 3 = 5, puis 5 * 4 = 20.",
      "Étape 3 : Sans parenthèses, 2 + 3 * 4 : d'abord 3 * 4 = 12, puis 2 + 12 = 14.",
      "Étape 4 : Les exposants (**) viennent avant × et ÷. Donc 2 ** 3 * 2 = 8 * 2 = 16.",
      "Étape 5 : Quand deux opérations ont la même priorité (ex. + et -), Python va de gauche à droite : 10 - 3 + 2 = 7 + 2 = 9."
    ],
    intermediateSteps: [
      "Étape 1 : Priorité (du plus fort au plus faible) : parenthèses ; ** (associatif à droite) ; +x, -x, ~x ; *, /, //, % ; +, - ; comparaisons ; not ; and ; or.",
      "Étape 2 : ** groupe à droite : 2 ** 3 ** 2 = 2 ** (3 ** 2) = 2 ** 9 = 512.",
      "Étape 3 : * / // % ont la même priorité et sont évalués de gauche à droite ; idem pour + et -.",
      "Étape 4 : Les comparaisons (==, !=, <, >, <=, >=) ont une priorité plus basse que l'arithmétique, donc 2 + 3 == 5 donne (2 + 3) == 5 → True.",
      "Étape 5 : Utilisez des parenthèses dès que l'ordre peut prêter à confusion ; elles ne changent pas le résultat, elles le rendent explicite."
    ],
    expertSteps: [
      "Étape 1 : La table de priorité complète est dans la référence Python (expressions). Parenthèses, puis puissance, puis unaire + - ~, puis * / // %, puis + -, puis comparaisons, puis not, and, or.",
      "Étape 2 : Les comparaisons en chaîne (ex. a < b < c) sont évaluées une fois par opérande : a < b and b < c, avec b évalué une seule fois.",
      "Étape 3 : ** est le seul opérateur arithmétique associatif à droite ; les autres sont associatifs à gauche. 2 ** 3 ** 2 se lit 2 ** (3 ** 2).",
      "Étape 4 : La surcharge d'opérateurs respecte la même priorité ; __add__ et __mul__ sont appelés dans l'ordre imposé par la priorité.",
      "Étape 5 : Court-circuit uniquement pour and/or ; l'arithmétique et les comparaisons évaluent toujours tous les opérandes avant d'appliquer l'opérateur."
    ]
  },
  {
    title: "Résultats Entier vs Float",
    category: "Opérations",
    definition: "La division (/) retourne toujours un float, même lors de la division d'entiers. La division entière (//) retourne un entier lorsque les deux opérandes sont des entiers.",
    examples: [
      "10 / 2 = 5.0 (résultat float)",
      "10 // 2 = 5 (résultat entier)",
      "10 / 3 = 3.333... (float)",
      "10 // 3 = 3 (entier, arrondi vers le bas)",
      "10.0 // 3 = 3.0 (résultat float)"
    ],
    beginnerSteps: [
      "Étape 1 : La division (/) donne toujours un float. 10 / 2 = 5.0, pas 5.",
      "Étape 2 : La division entière (//) donne un nombre entier. 10 // 2 = 5, 10 // 3 = 3 (on enlève les décimales).",
      "Étape 3 : Si vous mélangez int et float (ex. 10.0 // 3), le résultat est un float : 3.0.",
      "Étape 4 : Pour obtenir un entier à partir de / quand la division est exacte, utilisez int() : int(10 / 2) = 5.",
      "Étape 5 : Utilisez / pour le quotient exact (avec décimales) ; // pour « combien de fois un nombre en contient un autre »."
    ],
    intermediateSteps: [
      "Étape 1 : PEP 238 : / = division réelle, // = division entière. int / int avec / donne toujours un float.",
      "Étape 2 : Type du résultat de // : si les deux opérandes sont int, résultat int ; si l'un est float, résultat float (ex. 10.0 // 3 → 3.0).",
      "Étape 3 : Arrondi vers le bas (vers −∞) : -10 // 3 = -4, car -4 * 3 = -12 ≤ -10.",
      "Étape 4 : L'identité (a // b) * b + (a % b) == a est respectée ; % prend le signe du diviseur.",
      "Étape 5 : Pour une division entière avec opérandes positifs, // équivaut à int(a / b) ; en Python, s'appuyer sur // et %."
    ],
    expertSteps: [
      "Étape 1 : __truediv__ (/) et __floordiv__ (//) sont distincts ; les types peuvent surcharger l'un ou l'autre. divmod(a, b) renvoie (a // b, a % b).",
      "Étape 2 : math.floor(a / b) et a // b peuvent différer selon le langage ; en Python (a // b) * b + (a % b) == a avec le signe de % = signe du diviseur.",
      "Étape 3 : divmod(a, b) renvoie (a // b, a % b) en une fois ; utile quand quotient et reste sont nécessaires.",
      "Étape 4 : Précision float : pour de très grands entiers, utiliser // évite de passer en float et les erreurs d'arrondi.",
      "Étape 5 : Cohérence de type : l'arithmétique mixte int/float promeut en float ; 10 / 2 = 5.0 ; 10 // 2 = 5 ; 10.0 // 2 = 5.0."
    ]
  },
  {
    title: "Opérateurs d'assignation",
    category: "Opérations",
    definition: "Opérateurs qui combinent l'assignation avec les opérations arithmétiques.",
    examples: [
      "= Assignation de base : x = 5",
      "+= Ajouter et assigner : x += 3 (identique à x = x + 3)",
      "-= Soustraire et assigner : x -= 2 (identique à x = x - 2)",
      "*= Multiplier et assigner : x *= 4 (identique à x = x * 4)",
      "/= Diviser et assigner : x /= 2 (identique à x = x / 2)",
      "//= Diviser entièrement et assigner : x //= 3",
      "%= Modulo et assigner : x %= 5",
      "**= Exponentier et assigner : x **= 2"
    ],
    beginnerSteps: [
      "Étape 1 : = stocke une valeur dans une variable. x = 5 signifie « x vaut maintenant 5 ».",
      "Étape 2 : += signifie « ajouter à la valeur actuelle ». Si x = 5, x += 3 donne x = 8 (équivalent à x = x + 3).",
      "Étape 3 : -=, *=, /= fonctionnent de même : soustraire, multiplier ou diviser la variable par la valeur à droite et stocker le résultat.",
      "Étape 4 : //= et %= font division entière ou modulo puis assignation : x //= 3 signifie x = x // 3 ; x %= 5 signifie x = x % 5.",
      "Étape 5 : **= met la variable à une puissance : x **= 2 signifie x = x ** 2 (ex. 5 devient 25)."
    ],
    intermediateSteps: [
      "Étape 1 : L'assignation augmentée (op=) est une seule instruction ; x += 1 peut être plus efficace que x = x + 1 pour certains types (ex. list.extend) et n'évalue x qu'une fois.",
      "Étape 2 : Pour les types immuables (int, float, str, tuple), x += y équivaut à x = x + y ; le nom est réassigné. Pour les mutables (list), += peut modifier en place (__iadd__).",
      "Étape 3 : Si un type ne définit pas __iadd__, Python utilise __add__ et une assignation normale ; le résultat peut être un nouvel objet.",
      "Étape 4 : Cibles multiples : a = b = 0 assigne 0 aux deux. Enchaîner op= (ex. a += b += 1) est invalide — op= ne renvoie pas de valeur.",
      "Étape 5 : L'assignation est une instruction, pas une expression. Pour assigner dans une expression, utilisez := (opérateur walrus) où c'est autorisé (ex. if, while)."
    ],
    expertSteps: [
      "Étape 1 : L'assignation augmentée appelle __iadd__, __isub__, etc. si définis ; sinon __add__, __sub__, etc. puis assignation. La mutation en place dépend du type.",
      "Étape 2 : Pour les listes, x += y modifie la liste et renvoie self ; x = x + y crée une nouvelle liste. Les autres références à la même liste voient la modification avec +=.",
      "Étape 3 : Pas d'enchaînement op= : a += 1 renvoie None. Pour deux mises à jour, faire a += 1 ; b += 1.",
      "Étape 4 : L'opérateur walrus := assigne et renvoie la valeur : if (n := len(data)) > 0: ... assigne n et l'utilise. Valide seulement dans certains contextes (PEP 572).",
      "Étape 5 : Déballage et * dans l'assignation : a, *rest, b = seq ; l'échange s'écrit a, b = b, a."
    ]
  },
  {
    title: "Assignation en chaîne",
    category: "Opérations",
    definition: "Assigner la même valeur à plusieurs variables en une seule instruction.",
    examples: [
      "x = y = z = 10  # Toutes les variables égalent 10",
      "a = b = c = []  # Toutes référencent le même objet liste"
    ],
    beginnerSteps: [
      "Étape 1 : Vous pouvez donner la même valeur à plusieurs variables en une ligne : x = y = z = 10.",
      "Étape 2 : Python évalue le membre de droite une fois (10), puis l'assigne à z, puis à y, puis à x. Donc x, y et z valent tous 10.",
      "Étape 3 : Avec des nombres ou des chaînes c'est sans risque. Avec a = b = c = [], les trois noms pointent vers la même liste.",
      "Étape 4 : Si vous faites a = b = c = [] puis a.append(1), alors b et c voient aussi [1], car c'est le même objet.",
      "Étape 5 : Utilisez l'assignation en chaîne pour des valeurs partagées simples (ex. x = y = 0). Pour des objets mutables, créez des copies si besoin : a, b, c = [], [], []."
    ],
    intermediateSteps: [
      "Étape 1 : L'assignation en chaîne est associative à droite : x = y = z = expr évalue expr une fois, puis assigne à z, y, x. La même référence est assignée à chaque nom.",
      "Étape 2 : Pour les valeurs immuables (int, str, tuple), partager la référence est sans danger. Pour les mutables (list, dict, set), tous les noms aliasent le même objet.",
      "Étape 3 : Pour des objets mutables indépendants : a, b, c = [], [], [] ou [[] for _ in range(3)]. Évitez a = b = c = [] si vous allez modifier et voulez des listes distinctes.",
      "Étape 4 : L'assignation ne copie jamais ; elle lie un nom à un objet. L'assignation en chaîne lie plusieurs noms au même objet.",
      "Étape 5 : Le déballage est différent : x, y = 1, 2 assigne 1 à x et 2 à y. a, b = b, a échange sans variable temporaire."
    ],
    expertSteps: [
      "Étape 1 : L'instruction d'assignation évalue l'expression à droite (une seule dans le cas en chaîne), puis effectue la liaison des cibles de gauche à droite. x = y = f() n'appelle f() qu'une fois.",
      "Étape 2 : La liste de cibles peut être un nom, un tuple ou une liste de cibles ; déballage imbriqué autorisé : (a, (b, c)) = (1, (2, 3)). En chaîne : toutes les cibles reçoivent la même référence.",
      "Étape 3 : Piège des arguments par défaut mutables : def f(x=[]) réutilise la même liste ; comme a = b = []. Préférez def f(x=None): x = x or [] pour une liste fraîche.",
      "Étape 4 : L'assignation augmentée ne peut pas être enchaînée car elle ne renvoie pas de valeur ; a = b += 1 est invalide.",
      "Étape 5 : Annotation avec chaîne : x: int = y = 5 est valide ; l'annotation de type s'applique à x. Toutes les cibles reçoivent la même référence."
    ]
  },
  {
    title: "Opérateurs de comparaison",
    category: "Opérations",
    definition: "Opérateurs qui comparent des valeurs et retournent des résultats booléens.",
    examples: [
      "== Égal à : 5 == 5 → True",
      "!= Non égal : 5 != 3 → True",
      "< Inférieur à : 3 < 5 → True",
      "> Supérieur à : 5 > 3 → True",
      "<= Inférieur ou égal : 5 <= 5 → True",
      ">= Supérieur ou égal : 5 >= 3 → True",
      "En chaîne : 1 < 5 < 10 → True"
    ],
    beginnerSteps: [
      "Étape 1 : == vérifie si deux valeurs sont égales. 5 == 5 est True, 5 == 3 est False.",
      "Étape 2 : != signifie « différent de ». 5 != 3 est True. Utilisez-le pour vérifier que les valeurs diffèrent.",
      "Étape 3 : < et > signifient inférieur et supérieur. 3 < 5 est True. 5 > 3 est aussi True.",
      "Étape 4 : <= signifie « inférieur ou égal », >= « supérieur ou égal ». 5 <= 5 est True.",
      "Étape 5 : Vous pouvez enchaîner : 1 < 5 < 10 signifie « 5 est entre 1 et 10 » et est True. Python vérifie 1 < 5 et 5 < 10."
    ],
    intermediateSteps: [
      "Étape 1 : Les comparaisons renvoient un bool (True/False). Priorité plus basse que l'arithmétique : 2 + 3 == 5 donne (2 + 3) == 5 → True.",
      "Étape 2 : Les comparaisons en chaîne (a < b < c) sont évaluées comme a < b and b < c, avec b évalué une seule fois. 0 < x < 10 est sûr et lisible.",
      "Étape 3 : != est la négation de ==. Pour les types personnalisés, __eq__ et __ne__ ; par défaut __ne__ délègue à not __eq__.",
      "Étape 4 : Les comparaisons d'ordre (<, >, <=, >=) utilisent __lt__, __le__, __gt__, __ge__. Si l'un manque, Python peut utiliser l'inverse (ex. __gt__ à partir de __lt__ avec arguments échangés).",
      "Étape 5 : Types différents : 3 < 5.0 est True (comparaison numérique) ; 3 < 'a' lève TypeError en Python 3. Utilisez des types cohérents ou des conversions explicites."
    ],
    expertSteps: [
      "Étape 1 : Les comparaisons peuvent être enchaînées : a < b < c < d. Chaque opérande intermédiaire n'est évalué qu'une fois ; équivalent à (a < b) and (b < c) and (c < d) avec une seule évaluation de b et c.",
      "Étape 2 : __eq__ et __hash__ : si vous définissez __eq__, pensez à __hash__ ; les types mutables qui définissent __eq__ devraient avoir __hash__ = None.",
      "Étape 3 : NaN : float('nan') != float('nan') est True ; NaN n'est pas égal à lui-même. Utilisez math.isnan(x) pour tester NaN.",
      "Étape 4 : Les méthodes de comparaison riches peuvent renvoyer NotImplemented ; Python peut essayer la méthode réfléchie sur l'autre objet.",
      "Étape 5 : functools.total_ordering génère les méthodes d'ordre manquantes à partir de __eq__ et d'une parmi __lt__, __le__, __gt__, __ge__."
    ]
  },
  {
    title: "Opérateurs logiques",
    category: "Opérations",
    definition: "Opérateurs qui combinent des expressions booléennes en utilisant la logique ET, OU et NON.",
    examples: [
      "and : Retourne True si les deux conditions sont True",
      "  (5 > 3) and (10 < 20) → True",
      "or : Retourne True si au moins une condition est True",
      "  (5 > 10) or (10 < 20) → True",
      "not : Inverse la valeur booléenne",
      "  not (5 > 10) → True",
      "Court-circuit : 'and' et 'or' s'arrêtent d'évaluer une fois le résultat déterminé"
    ],
    beginnerSteps: [
      "Étape 1 : and donne True seulement si les deux côtés sont True. (5 > 3) and (10 < 20) est True et True → True.",
      "Étape 2 : or donne True si au moins un côté est True. (5 > 10) or (10 < 20) est False or True → True.",
      "Étape 3 : not inverse True en False et False en True. not (5 > 10) est not False → True.",
      "Étape 4 : Court-circuit : and s'arrête dès qu'il voit False ; or s'arrête dès qu'il voit True.",
      "Étape 5 : Utilisez-les dans les conditions if : if age >= 18 and has_id: ... Le bloc ne s'exécute que si les deux sont True."
    ],
    intermediateSteps: [
      "Étape 1 : and et or renvoient l'un de leurs opérandes, pas forcément un bool. x and y renvoie x si x est falsy, sinon y. x or y renvoie x si x est truthy, sinon y.",
      "Étape 2 : Le court-circuit signifie que le second opérande peut ne pas être évalué. (x and y) est sûr quand y a des effets de bord seulement si x est truthy.",
      "Étape 3 : Priorité : not avant and, and avant or. Donc not a and b or c est (not a and b) or c.",
      "Étape 4 : Pour des booléens stricts, utilisez bool() ou des conditions explicites. Pour une valeur par défaut, x or default est courant (préférer x if x is not None else default si None est possible).",
      "Étape 5 : Vérité : [], '', 0, None, False sont falsy ; collections non vides, nombres non nuls et True sont truthy. and/or utilisent la vérité, pas seulement le type bool."
    ],
    expertSteps: [
      "Étape 1 : and/or ne garantissent pas un bool ; ils renvoient le premier opérande qui détermine le résultat. Utilisez bool() ou True/False explicites quand un bool strict est requis.",
      "Étape 2 : L'évaluation en court-circuit fait partie du langage ; l'opérande droit n'est pas évalué si le résultat est connu. f() or g() peut ne jamais appeler g().",
      "Étape 3 : Enchaînement : a and b and c renvoie la première valeur falsy ou la dernière ; a or b or c renvoie la première truthy ou la dernière. Utile pour les replis : x = a or b or c.",
      "Étape 4 : not a un seul opérande et renvoie un bool. not lie plus fort que and/or.",
      "Étape 5 : Contexte booléen : if, while et la condition dans (x if c else y) utilisent la vérité. __bool__ et __len__ (repli) définissent la vérité pour les types personnalisés."
    ]
  },
  {
    title: "Identité vs Égalité",
    category: "Opérations",
    definition: "is vérifie si deux variables référencent le même objet, == vérifie si les valeurs sont égales.",
    examples: [
      "x = [1, 2, 3]",
      "y = [1, 2, 3]",
      "x == y → True (les valeurs sont égales)",
      "x is y → False (objets différents)",
      "z = x",
      "x is z → True (même objet)"
    ],
    beginnerSteps: [
      "Étape 1 : == demande « Ces valeurs sont-elles les mêmes ? » [1, 2, 3] == [1, 2, 3] est True — même contenu.",
      "Étape 2 : is demande « Est-ce le même objet en mémoire ? » Deux listes avec le même contenu sont deux objets différents, donc x is y est False.",
      "Étape 3 : Si vous faites z = x, alors z et x pointent vers la même liste. x is z est True. Modifier la liste via x la modifie aussi pour z.",
      "Étape 4 : Utilisez == pour comparer des valeurs (nombres, chaînes, contenu de listes). Utilisez is pour None : if x is None.",
      "Étape 5 : N'utilisez jamais is pour des nombres ou des chaînes (ex. x is 5). Utilisez == pour la comparaison de valeurs."
    ],
    intermediateSteps: [
      "Étape 1 : is compare l'identité (id(x) == id(y)). Deux objets sont identiques seulement s'ils sont la même instance. == invoque __eq__ et peut être surchargé.",
      "Étape 2 : Pour les singletons None, True, False, utilisez is : if x is None. C'est correct et légèrement plus rapide que ==.",
      "Étape 3 : Types immuables : deux valeurs égales peuvent être le même objet (cache des petits entiers, internement des chaînes) ou non. Ne jamais dépendre de l'identité pour comparer des valeurs.",
      "Étape 4 : Arguments par défaut : def f(x=[]) réutilise une seule liste ; utilisez def f(x=None): x = x or [] pour une nouvelle liste à chaque appel.",
      "Étape 5 : is not est la négation de is. « x is not None » est préféré à « not (x is None) » et est idiomatique."
    ],
    expertSteps: [
      "Étape 1 : id(obj) renvoie l'adresse mémoire (ou un identifiant unique). a is b équivaut à id(a) == id(b). L'identité n'est pas surchargeable.",
      "Étape 2 : __eq__ peut être arbitraire ; x == y peut être True alors que x is y est False (ex. deux instances distinctes qui se comparent égales). Pour None/True/False, identité et égalité coïncident.",
      "Étape 3 : Cache : les petits entiers (-5 à 256 en CPython) et certains littéraux de chaînes peuvent être internés, donc a = 1 ; b = 1 ; a is b peut être True. Ne pas s'y fier ; utiliser == pour les valeurs.",
      "Étape 4 : is n'est pas surchargeable ; il compare toujours l'identité. Utilisez is seulement pour les singletons (None, True, False ou sentinelles documentées).",
      "Étape 5 : Copie vs référence : b = a fait de b le même objet que a. b = a.copy() ou b = list(a) crée un nouvel objet (identité différente, valeur éventuellement égale)."
    ]
  },
  {
    title: "Opérations d'appartenance",
    category: "Opérations",
    definition: "Opérateurs qui vérifient si un élément existe dans une séquence ou une collection.",
    examples: [
      "in : Retourne True si l'élément est trouvé",
      "  'a' in 'apple' → True",
      "  3 in [1, 2, 3] → True",
      "  'key' in {'key': 'value'} → True",
      "not in : Retourne True si l'élément n'est pas trouvé",
      "  10 not in [1, 2, 3] → True"
    ],
    beginnerSteps: [
      "Étape 1 : in vérifie si quelque chose est dans une chaîne, une liste ou une autre collection. 'a' in 'apple' est True car 'a' est dans 'apple'.",
      "Étape 2 : Pour les listes, in vérifie un élément : 3 in [1, 2, 3] est True. 10 in [1, 2, 3] est False.",
      "Étape 3 : Pour les dictionnaires, in vérifie les clés, pas les valeurs. 'key' in {'key': 'value'} est True. 'value' in {'key': 'value'} est False (sauf si 'value' est une clé).",
      "Étape 4 : not in est l'inverse : True quand l'élément est absent. 10 not in [1, 2, 3] est True.",
      "Étape 5 : Utilisez in dans les if : if 'x' in name: ... ou dans les boucles : for item in collection: ...."
    ],
    intermediateSteps: [
      "Étape 1 : in invoque __contains__ si défini ; sinon Python peut utiliser __iter__ et l'égalité (parcours O(n) pour les séquences).",
      "Étape 2 : Pour dict/set, in est O(1) en moyenne (recherche par hachage). Pour list/tuple/str, in est O(n). Choisissez la bonne structure pour les tests d'appartenance.",
      "Étape 3 : Sous-chaîne : 'ab' in 'abc' est True. Pour les séquences, in vérifie un élément ou une sous-chaîne (str), pas une sous-séquence d'éléments dans une list.",
      "Étape 4 : not in équivaut à not (x in y). Même complexité que in.",
      "Étape 5 : Pour les types personnalisés, implémentez __contains__(self, item) pour supporter in. Renvoyez True ou False (ou une valeur truthy/falsy)."
    ],
    expertSteps: [
      "Étape 1 : __contains__ prend un argument (l'élément). S'il n'est pas défini, Python utilise __iter__ et compare avec chaque élément ; pour les séquences, __getitem__ et IndexError peuvent être utilisés.",
      "Étape 2 : in sur str vérifie la sous-chaîne (contiguë). 'ab' in 'xabz' est True. Pour list, in vérifie l'égalité d'éléments : [1,2] in [1,2,3] est False ; [1,2] in [[1,2], 3] est True.",
      "Étape 3 : set/frozenset et dict utilisent des tables de hachage ; in est O(1) en moyenne. list, tuple, str, range font une recherche linéaire ; in est O(n).",
      "Étape 4 : L'appartenance dans un générateur/itérateur consomme l'itérateur jusqu'à trouver ou épuiser ; utilisez une list/set si vous devez tester l'appartenance plusieurs fois.",
      "Étape 5 : in avec un tuple d'options : x in (a, b, c) est valide et clair. Pour beaucoup d'options, un set est plus rapide : x in {a, b, c}."
    ]
  },
  {
    title: "Opérations de type",
    category: "Opérations",
    definition: "Fonctions et opérateurs pour vérifier et convertir les types de données.",
    examples: [
      "type() : Retourne le type d'un objet",
      "  type(5) → <class 'int'>",
      "isinstance() : Vérifie si l'objet est une instance de type(s)",
      "  isinstance(5, int) → True",
      "  isinstance(5, (int, float)) → True",
      "Typage dynamique : Les variables peuvent changer de type",
      "  x = 5  # x est int",
      "  x = 'hello'  # x est maintenant str"
    ],
    beginnerSteps: [
      "Étape 1 : type(x) indique le type de x. type(5) donne <class 'int'>, type('hi') donne <class 'str'>.",
      "Étape 2 : isinstance(x, SomeType) demande « x est-il un SomeType ? » isinstance(5, int) est True. Utilisez dans les if : if isinstance(x, int): ....",
      "Étape 3 : Vous pouvez passer un tuple de types : isinstance(x, (int, float)) est True pour les nombres. Pratique quand plusieurs types sont autorisés.",
      "Étape 4 : Les variables n'ont pas de type fixe. Vous pouvez faire x = 5 puis x = 'hello' ; la variable contient maintenant une chaîne.",
      "Étape 5 : Pour convertir les types : int(), float(), str(), list(), etc. int('42') = 42 ; str(42) = '42'."
    ],
    intermediateSteps: [
      "Étape 1 : type(x) renvoie la classe de x ; type(x) is int est un test strict. isinstance(x, int) est True pour les sous-classes de int (ex. bool est une sous-classe de int).",
      "Étape 2 : Préférez isinstance pour les tests de type ; cela gère l'héritage et (TypeA, TypeB). type(x) == int est plus strict (pas de sous-classes).",
      "Étape 3 : issubclass(A, B) vérifie si A est une sous-classe de B. isinstance(x, A) équivaut à type(x) is A or issubclass(type(x), A).",
      "Étape 4 : Types appelables : int(), str(), list() construisent de nouveaux objets ; ce ne sont pas des casts mais des constructeurs. int(3.7) tronque à 3 ; int('10', 2) parse en binaire → 2.",
      "Étape 5 : Les annotations de type (ex. def f(x: int) -> str) ne changent pas le comportement à l'exécution ; utilisez typing et isinstance pour les contrôles à l'exécution."
    ],
    expertSteps: [
      "Étape 1 : type est une métaclasse ; type(x) est la classe de x. type(name, bases, dict) crée une nouvelle classe. isinstance et issubclass respectent l'ordre de résolution des méthodes (MRO).",
      "Étape 2 : bool est une sous-classe de int ; isinstance(True, int) est True. Préférez type(x) is bool si vous voulez exclure bool des tests sur int.",
      "Étape 3 : Classes de base abstraites (collections.abc, numbers) : isinstance(x, numbers.Integral) est True pour int et bool ; utilisez les ABC pour des contrôles structurels (Iterable, Sequence).",
      "Étape 4 : getattr(obj, '__class__') est la classe de obj ; type(obj) idem. __class__ peut être assigné (avec précaution) pour des changements dynamiques de classe.",
      "Étape 5 : Conversion de type : __int__, __float__, __str__, etc. sont utilisés par int(), float(), str() ; lever TypeError ou renvoyer une valeur. Pour un parsing personnalisé, utilisez des méthodes de classe ou des constructeurs."
    ]
  },
  {
    title: "Opérateurs binaires",
    category: "Opérations",
    definition: "Opérateurs qui effectuent des opérations sur les représentations binaires d'entiers.",
    examples: [
      "& ET : 5 & 3 = 1 (binaire : 101 & 011 = 001)",
      "| OU : 5 | 3 = 7 (binaire : 101 | 011 = 111)",
      "^ OU exclusif : 5 ^ 3 = 6 (binaire : 101 ^ 011 = 110)",
      "~ NON : ~5 = -6 (inverse tous les bits)",
      "<< Décalage à gauche : 5 << 1 = 10 (multiplier par 2)",
      ">> Décalage à droite : 5 >> 1 = 2 (diviser par 2, arrondi)"
    ],
    beginnerSteps: [
      "Étape 1 : Les nombres sont stockés en binaire. Les opérateurs bit à bit agissent sur chaque bit. & (ET) : 1 & 1 = 1, sinon 0. Donc 5 & 3 : 101 & 011 = 001 = 1.",
      "Étape 2 : | (OU) : 0 | 0 = 0, sinon 1. 5 | 3 : 101 | 011 = 111 = 7.",
      "Étape 3 : ^ (OU exclusif) : mêmes bits → 0, différents → 1. 5 ^ 3 : 101 ^ 011 = 110 = 6.",
      "Étape 4 : ~ (NON) inverse tous les bits. ~5 vaut -6 en Python (complément à deux). Utile pour les masques.",
      "Étape 5 : << décale les bits à gauche (multiplier par 2 à chaque position) : 5 << 1 = 10. >> décale à droite (division entière par 2) : 5 >> 1 = 2."
    ],
    intermediateSteps: [
      "Étape 1 : Les opérandes sont convertis en entier ; le résultat est int. Les négatifs sont en complément à deux ; ~n == -(n+1) pour n ≥ 0.",
      "Étape 2 : & sert au masquage (extraire des bits) : n & 0xFF garde les 8 bits de poids faible. | pour mettre des bits : n | 0x10 met le bit 4. ^ pour basculer des bits.",
      "Étape 3 : << et >> : a << b = a * (2 ** b) ; a >> b = a // (2 ** b). Le décalage à droite des négatifs est défini en Python (extension de signe).",
      "Étape 4 : Priorité : ~ avant << >>, puis & ^ |. Utilisez des parenthèses pour la clarté : (a & b) | c.",
      "Étape 5 : Les opérateurs bit à bit ont une priorité plus basse que l'arithmétique ; 1 + 2 & 3 = 1 + (2 & 3) = 3. Utilisez (1 + 2) & 3 si vous voulez 3 & 3."
    ],
    expertSteps: [
      "Étape 1 : __and__, __or__, __xor__, __invert__, __lshift__, __rshift__ implémentent & | ^ ~ << >>. int les implémente tous ; les types personnalisés peuvent les surcharger. Les opérandes doivent être des entiers (ou avoir __index__).",
      "Étape 2 : Précision arbitraire : les int Python n'ont pas de largeur fixe ; les négatifs ont une infinité de 1 en tête en complément à deux. ~x == -x - 1 pour un int.",
      "Étape 3 : Le décalage à gauche peut produire de très grands nombres ; 1 << 1000 est valide. Décalage à droite d'un négatif : (-5) >> 1 = -3 (division entière par 2 vers −∞).",
      "Étape 4 : Masques : mettre le bit n : x | (1 << n) ; effacer : x & ~(1 << n) ; basculer : x ^ (1 << n) ; tester : (x >> n) & 1.",
      "Étape 5 : bin(), oct(), hex() produisent des chaînes. int(s, 2) parse en binaire. Pour une largeur fixe (ex. 32 bits), utilisez x & 0xFFFFFFFF ou ctypes/cstruct."
    ]
  }
];

export const MATH_CONCEPTS_DATA_FR: OperationItem[] = [
  {
    title: "Entiers de base et comptage",
    category: "Concepts Mathématiques",
    definition: "Les entiers sont des nombres entiers sans décimales. Python supporte des entiers arbitrairement grands.",
    examples: [
      "Positifs : 1, 2, 3, 100, 1000",
      "Négatifs : -1, -5, -100",
      "Zéro : 0 (comportement spécial dans de nombreuses opérations)",
      "Grands : 999999999999999999 (pas de débordement)"
    ],
    beginnerSteps: [
      "Étape 1 : Imaginez les entiers comme les nombres avec lesquels on compte : ..., -2, -1, 0, 1, 2, 3, ....",
      "Étape 2 : Les entiers positifs sont supérieurs à zéro (1, 2, 3), les entiers négatifs sont inférieurs à zéro (-1, -2, -3) et 0 est au milieu.",
      "Étape 3 : En Python, on écrit les entiers directement (x = 10) et il n’y a pas de maximum fixe : on ne subit pas de débordement comme dans certains autres langages."
    ],
    intermediateSteps: [
      "Étape 1 : Le type int de Python est à précision arbitraire, donc des valeurs comme 10**50 sont représentées exactement.",
      "Étape 2 : Les entiers sont le choix par défaut pour compter dans les boucles, indexer les listes et représenter des tailles (range, len, index).",
      "Étape 3 : Conversions : int('42') convertit une chaîne, int(3.9) tronque vers zéro, et bool(0) est False alors que les autres entiers sont True."
    ],
    expertSteps: [
      "Étape 1 : Les entiers Python utilisent une arithmétique de grands entiers ; les opérations sont exactes mais peuvent devenir plus lentes pour des valeurs énormes.",
      "Étape 2 : Pour les calculs numériques intensifs, des bibliothèques comme NumPy utilisent des entiers machine de largeur fixe, plus rapides mais sujets au débordement.",
      "Étape 3 : Lorsqu’on mélange int et float, les très grands entiers peuvent perdre de la précision en étant convertis en float ; restez en int pour l’arithmétique exacte."
    ]
  },
  {
    title: "Entiers positifs et négatifs",
    category: "Concepts Mathématiques",
    definition: "Les entiers peuvent être positifs, négatifs ou zéro. Les opérations avec des nombres négatifs suivent les règles mathématiques standard.",
    examples: [
      "Addition : 5 + (-3) = 2",
      "Soustraction : 5 - (-3) = 8",
      "Multiplication : 5 * (-3) = -15",
      "Division : -10 / 2 = -5.0",
      "Valeur absolue : abs(-5) = 5"
    ],
    beginnerSteps: [
      "Étape 1 : Un nombre positif est supérieur à zéro, un nombre négatif est inférieur à zéro, et zéro n’est ni positif ni négatif.",
      "Étape 2 : Ajouter un négatif revient à soustraire : 5 + (-3) revient à reculer de 3 cases à partir de 5 pour arriver à 2.",
      "Étape 3 : Multiplier par un négatif inverse le signe : positif × négatif = négatif, négatif × négatif = positif."
    ],
    intermediateSteps: [
      "Étape 1 : L’addition et la soustraction avec des négatifs suivent la droite des nombres : a − (−b) = a + b et a + (−b) = a − b.",
      "Étape 2 : abs(x) renvoie la distance à zéro, toujours positive ; c’est utile pour mesurer des erreurs ou des distances.",
      "Étape 3 : La division avec des négatifs en Python utilise la division réelle pour / et la division entière pour //, ce qui influence le signe et l’arrondi dans les algorithmes."
    ],
    expertSteps: [
      "Étape 1 : Pour // et %, Python garantit (a // b) * b + (a % b) == a même avec des entiers négatifs.",
      "Étape 2 : La gestion cohérente des signes est cruciale dans les algorithmes numériques (recherche de racines, arithmétique modulaire, etc.).",
      "Étape 3 : Quand vous modélisez des dettes, températures ou écarts, encodez clairement la signification des signes plutôt que de vous appuyer uniquement sur les valeurs brutes."
    ]
  },
  {
    title: "Zéro et son comportement spécial",
    category: "Concepts Mathématiques",
    definition: "Zéro a des propriétés uniques dans les opérations mathématiques qui affectent le comportement de Python.",
    examples: [
      "Division par zéro : 10 / 0 → ZeroDivisionError",
      "Multiplication par zéro : 5 * 0 = 0",
      "Addition de zéro : 5 + 0 = 5",
      "Booléen : bool(0) = False (zéro est falsy)",
      "Puissance : 5 ** 0 = 1 (tout nombre à la puissance 0 vaut 1)"
    ],
    beginnerSteps: [
      "Étape 1 : Multiplier n’importe quel nombre par 0 donne toujours 0 ; ajouter 0 ne change pas la valeur.",
      "Étape 2 : Diviser par 0 est interdit ; en Python, 10 / 0 lève une exception ZeroDivisionError au lieu de renvoyer une valeur.",
      "Étape 3 : Dans un contexte booléen, 0 se comporte comme False, tandis que tout entier non nul se comporte comme True."
    ],
    intermediateSteps: [
      "Étape 1 : Zéro est l’élément neutre pour l’addition : pour tout x, x + 0 == x et 0 + x == x.",
      "Étape 2 : Pour les puissances, x ** 0 vaut 1 pour tout x non nul ; 0 ** 0 est mathématiquement ambigu et certains outils le traitent différemment.",
      "Étape 3 : Dans les structures de contrôle, des expressions comme while count: reposent sur le fait que count devienne 0 pour arrêter la boucle."
    ],
    expertSteps: [
      "Étape 1 : La division et le modulo par zéro lèvent toujours une exception en Python ; il est préférable de gérer explicitement ZeroDivisionError plutôt que de renvoyer des sentinelles numériques.",
      "Étape 2 : De nombreux algorithmes s’appuient sur le rôle spécial de 0 comme élément neutre ou absorbant ; documentez clairement ce rôle dans vos fonctions.",
      "Étape 3 : Lors de l’interfaçage avec NumPy ou des bases de données, sachez que leur traitement de 0, NaN ou NULL peut différer de celui des entiers Python."
    ]
  },
  {
    title: "Incrémentation et décrémentation des valeurs",
    category: "Concepts Mathématiques",
    definition: "Modèles communs pour augmenter ou diminuer des valeurs numériques dans les boucles et conditions.",
    examples: [
      "Incrément : x += 1 ou x = x + 1",
      "Décrément : x -= 1 ou x = x - 1",
      "Dans une boucle : for i in range(10): (i s'incrémente automatiquement)",
      "Boucle while : while x < 10: x += 1",
      "Incrément par pas : x += 2 (augmenter de 2)"
    ],
    beginnerSteps: [
      "Étape 1 : Incrémenter signifie augmenter un nombre, souvent de 1 : x += 1 rend x plus grand d’une unité.",
      "Étape 2 : Décrémenter signifie diminuer un nombre : x -= 1 rend x plus petit d’une unité.",
      "Étape 3 : Les boucles suivent souvent le schéma « partir d’une valeur, la modifier un peu à chaque tour, s’arrêter quand une condition est vraie »."
    ],
    intermediateSteps: [
      "Étape 1 : for i in range(n) gère l’incrément pour vous ; i commence à 0 et augmente de 1 jusqu’à n − 1.",
      "Étape 2 : Les boucles while nécessitent une mise à jour manuelle ; vous devez incrémenter ou décrémenter à l’intérieur, sinon la boucle risque de ne jamais se terminer.",
      "Étape 3 : Utiliser différents pas (x += 2, x -= 5) permet de modéliser des compteurs qui sautent des valeurs, comme les nombres pairs ou les comptes à rebours."
    ],
    expertSteps: [
      "Étape 1 : Les erreurs de type off‑by‑one viennent souvent de valeurs initiales ou de conditions d’arrêt incorrectes ; réfléchissez bien aux bornes inclusives/exclusives.",
      "Étape 2 : Préférez range(start, stop, step) dans les boucles for pour les progressions arithmétiques simples ; la logique de mise à jour reste en un seul endroit.",
      "Étape 3 : Dans le code performant, évitez les incréments Python profonds dans des boucles imbriquées en déléguant le travail à des bibliothèques vectorisées quand c’est possible."
    ]
  },
  {
    title: "Utilisation d'entiers dans les boucles et conditions",
    category: "Concepts Mathématiques",
    definition: "Les entiers sont couramment utilisés pour contrôler les itérations de boucles et comme conditions dans le flux de contrôle.",
    examples: [
      "Range : for i in range(5): (0, 1, 2, 3, 4)",
      "Compte à rebours : for i in range(10, 0, -1):",
      "Condition : if count > 0:",
      "Compteur : count = 0; count += 1",
      "Index : items[i] (utiliser un entier comme index)"
    ],
    beginnerSteps: [
      "Étape 1 : Les entiers servent souvent de compteurs dans les boucles : for i in range(5) exécute le bloc avec i = 0, 1, 2, 3 puis 4.",
      "Étape 2 : Les entiers apparaissent aussi dans les conditions, par exemple if count > 0:, pour décider si un bloc de code doit s’exécuter.",
      "Étape 3 : On peut utiliser des entiers pour accéder aux éléments d’une séquence, par exemple items[i] ou name[0]."
    ],
    intermediateSteps: [
      "Étape 1 : La fonction range encode le début, la fin et le pas des séquences d’entiers et c’est la façon idiomatique de piloter les boucles de comptage.",
      "Étape 2 : Les boucles de compte à rebours utilisent un pas négatif, par exemple for i in range(10, 0, -1):, pratique pour les minuteries ou les parcours inversés.",
      "Étape 3 : Des gardes comme if 0 <= index < len(items): protègent contre IndexError en s’assurant que les indices restent dans les bornes."
    ],
    expertSteps: [
      "Étape 1 : La boucle for de Python itère sur n’importe quel itérable ; les entiers apparaissent surtout via range ou enumerate plutôt que par i += 1 manuels.",
      "Étape 2 : Dans les algorithmes, les variables entières de boucle représentent souvent des états ou positions discrets ; utilisez des noms explicites pour clarifier leur rôle.",
      "Étape 3 : Pour optimiser, préférez itérer directement sur les éléments (for x in items) et n’utilisez les indices entiers que lorsque vous avez réellement besoin de la position."
    ]
  },
  {
    title: "Nombres premiers",
    category: "Concepts Mathématiques",
    definition: "Un nombre premier est un nombre naturel supérieur à 1 qui n'a pas de diviseurs positifs autres que 1 et lui-même.",
    examples: [
      "Premiers : 2, 3, 5, 7, 11, 13, 17, 19",
      "Composés : 4, 6, 8, 9, 10 (ont des diviseurs autres que 1 et eux-mêmes)",
      "Vérification : n % i != 0 pour tout i dans range(2, n)",
      "1 n'est ni premier ni composé"
    ]
  },
  {
    title: "Vérifier si un nombre est premier",
    category: "Concepts Mathématiques",
    definition: "Algorithme pour déterminer si un nombre est premier en testant la divisibilité.",
    examples: [
      "Basique : Vérifier la divisibilité de 2 à n-1",
      "Optimisé : Vérifier uniquement jusqu'à √n",
      "def is_prime(n):",
      "    if n < 2: return False",
      "    for i in range(2, int(n**0.5) + 1):",
      "        if n % i == 0: return False",
      "    return True"
    ]
  },
  {
    title: "Génération de séquences de nombres premiers",
    category: "Concepts Mathématiques",
    definition: "Méthodes pour créer des listes ou générateurs de nombres premiers.",
    examples: [
      "Crible d'Ératosthène : Algorithme efficace",
      "Générateur : yield primes un à la fois",
      "Compréhension de liste avec vérification de primalité",
      "Basé sur range : for n in range(2, 100) if is_prime(n)"
    ]
  },
  {
    title: "Facteurs et multiples",
    category: "Concepts Mathématiques",
    definition: "Les facteurs sont des nombres qui divisent uniformément un autre nombre. Les multiples sont des produits d'un nombre.",
    examples: [
      "Facteurs de 12 : [1, 2, 3, 4, 6, 12]",
      "Trouver des facteurs : [i for i in range(1, n+1) if n % i == 0]",
      "Multiples de 3 : 3, 6, 9, 12, 15...",
      "Multiples communs : Nombres divisibles par plusieurs valeurs"
    ]
  },
  {
    title: "Plus Grand Commun Diviseur (PGCD)",
    category: "Concepts Mathématiques",
    definition: "Le plus grand nombre qui divise uniformément deux ou plusieurs entiers.",
    examples: [
      "PGCD de 12 et 18 : 6",
      "Utiliser math.gcd() : import math; math.gcd(12, 18) = 6",
      "Algorithme d'Euclide pour le calcul manuel",
      "Utile pour simplifier les fractions"
    ]
  },
  {
    title: "Plus Petit Commun Multiple (PPCM)",
    category: "Concepts Mathématiques",
    definition: "Le plus petit nombre qui est un multiple de deux ou plusieurs entiers.",
    examples: [
      "PPCM de 4 et 6 : 12",
      "Utiliser math.lcm() : import math; math.lcm(4, 6) = 12",
      "Formule : PPCM(a, b) = (a * b) / PGCD(a, b)",
      "Utile pour trouver les dénominateurs communs"
    ]
  },
  {
    title: "Fractions et nombres rationnels",
    category: "Concepts Mathématiques",
    definition: "Nombres exprimés comme un rapport de deux entiers (numérateur/dénominateur).",
    examples: [
      "Fraction propre : numérateur < dénominateur (1/2)",
      "Fraction impropre : numérateur >= dénominateur (5/3)",
      "Simplification : 4/8 = 1/2 (diviser par PGCD)",
      "Python : from fractions import Fraction",
      "Fraction(1, 2) + Fraction(1, 3) = Fraction(5, 6)"
    ]
  },
  {
    title: "Nombres à virgule flottante et précision",
    category: "Concepts Mathématiques",
    definition: "Les floats représentent des nombres réels mais ont une précision limitée due à la représentation binaire.",
    examples: [
      "Stockage : Format double précision IEEE 754",
      "Erreurs de précision : 0.1 + 0.2 != 0.3",
      "Comparaison : Utiliser abs(a - b) < 0.0001 au lieu de a == b",
      "Formatage : f'{value:.2f}' pour 2 décimales",
      "Module decimal : from decimal import Decimal pour l'arithmétique exacte"
    ]
  },
  {
    title: "Puissances, racines et exposants",
    category: "Concepts Mathématiques",
    definition: "Opérations impliquant l'élévation de nombres à des puissances ou la recherche de racines.",
    examples: [
      "Carré : 5 ** 2 = 25 (5 au carré)",
      "Cube : 3 ** 3 = 27 (3 au cube)",
      "Racine carrée : 25 ** 0.5 = 5.0 ou math.sqrt(25) = 5.0",
      "Racine nième : 8 ** (1/3) = 2.0 (racine cubique)",
      "Exposant : 2 ** 10 = 1024"
    ]
  },
  {
    title: "Arithmétique modulaire",
    category: "Concepts Mathématiques",
    definition: "Système arithmétique où les nombres reviennent après avoir atteint une certaine valeur (le module).",
    examples: [
      "Arithmétique d'horloge : 13 % 12 = 1 (13h)",
      "Pair/impair : n % 2 == 0 (pair), n % 2 == 1 (impair)",
      "Divisibilité : n % 3 == 0 (divisible par 3)",
      "Bouclage : (x + 1) % 10 (cycles 0-9)",
      "Indexation circulaire : items[index % len(items)]"
    ]
  },
  {
    title: "Suites et séries",
    category: "Concepts Mathématiques",
    definition: "Listes ordonnées de nombres suivant un motif ou une règle.",
    examples: [
      "Arithmétique : 2, 5, 8, 11... (ajouter 3 à chaque fois)",
      "  a_n = premier + (n-1) * différence",
      "Géométrique : 2, 6, 18, 54... (multiplier par 3)",
      "  a_n = premier * (ratio ** (n-1))",
      "Fibonacci : 0, 1, 1, 2, 3, 5, 8...",
      "  fib(n) = fib(n-1) + fib(n-2)"
    ]
  },
  {
    title: "Ratios et proportions",
    category: "Concepts Mathématiques",
    definition: "Comparer des quantités et mettre à l'échelle des valeurs proportionnellement.",
    examples: [
      "Ratio : 3:5 (3 pour 5)",
      "Mise à l'échelle : value * scale_factor",
      "Normalisation : (x - min) / (max - min) (plage 0 à 1)",
      "Pourcentage : (part / total) * 100",
      "Proportion : a/b = c/d"
    ]
  },
  {
    title: "Nombres aléatoires et probabilité",
    category: "Concepts Mathématiques",
    definition: "Générer des nombres imprévisibles et modéliser des événements aléatoires.",
    examples: [
      "Entier aléatoire : import random; random.randint(1, 10)",
      "Float aléatoire : random.random() (0.0 à 1.0)",
      "Choix : random.choice([1, 2, 3, 4, 5])",
      "Mélanger : random.shuffle(my_list)",
      "Graine : random.seed(42) pour la reproductibilité"
    ]
  },
  {
    title: "Statistiques de base",
    category: "Concepts Mathématiques",
    definition: "Mesures statistiques pour analyser des collections de données numériques.",
    examples: [
      "Moyenne : sum(numbers) / len(numbers) ou statistics.mean()",
      "Médiane : statistics.median([1, 3, 5, 7, 9]) = 5",
      "Mode : statistics.mode([1, 2, 2, 3]) = 2",
      "Étendue : max(numbers) - min(numbers)",
      "Variance : statistics.variance(numbers)"
    ]
  },
  {
    title: "Systèmes de coordonnées et géométrie",
    category: "Concepts Mathématiques",
    definition: "Représenter des positions et des distances dans un espace 2D ou 3D.",
    examples: [
      "Cartésien : coordonnées (x, y)",
      "Distance : math.sqrt((x2-x1)**2 + (y2-y1)**2)",
      "Coordonnées polaires : (r, θ) - rayon et angle",
      "Formes de base : cercles, rectangles, triangles",
      "Transformations : translation, rotation, mise à l'échelle"
    ]
  },
  {
    title: "Contraintes et limites mathématiques",
    category: "Concepts Mathématiques",
    definition: "Limiter les valeurs à des plages valides et valider les entrées.",
    examples: [
      "Minimum : min(a, b, c)",
      "Maximum : max(a, b, c)",
      "Plage : max(min_val, min(value, max_val))",
      "Validation : if 0 <= value <= 100:",
      "Vérification des limites : if index >= 0 and index < len(list):"
    ]
  }
];
