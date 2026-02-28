/**
 * French translations for detailed explanations (IDs 2501-2650).
 * Ready to merge into DETAILED_EXPLANATIONS_FR.
 * Section headers: Concepts clés, Comment ça fonctionne, Exemple, Usages courants
 * Python code blocks preserved unchanged.
 */

export const FR_2501_2650: Record<number, string> = {
  2501: `Toute classe Python hérite implicitement de object. L'attribut __mro__ affiche le tuple des classes que Python parcourt pour résoudre les attributs ou méthodes.

Concepts clés :
• __mro__ retourne l'ordre de résolution des méthodes sous forme de tuple
• Toute classe hérite ultimement de object
• Une classe sans parent explicite a un MRO: (ClassName, object)
• Python utilise la linéarisation C3 pour calculer le MRO

Comment ça fonctionne :
• class A: pass crée une classe qui hérite implicitement de object
• A.__mro__ retourne (<class 'A'>, <class 'object'>)
• Python cherche d'abord dans A, puis dans object

Exemple :
class A: pass
A.__mro__   # (<class 'A'>, <class 'object'>)
A.mro()     # [<class 'A'>, <class 'object'>]  (forme liste)`,
  2502: `Quand B hérite explicitement de A, le MRO les enchaîne: B d'abord, puis A, puis l'objet de base ultime.

Concepts clés :
• L'héritage simple crée une chaîne MRO linéaire
• La classe elle-même est toujours en tête dans son propre MRO
• Les classes parentes suivent dans l'ordre d'héritage
• object est toujours en dernier

Comment ça fonctionne :
• class B(A) signifie que B hérite de A
• B.__mro__ = (<class 'B'>, <class 'A'>, <class 'object'>)
• La recherche d'attribut cherche d'abord dans B, puis A, puis object

Exemple :
class A: pass
class B(A): pass
B.__mro__  # (<class 'B'>, <class 'A'>, <class 'object'>)
len(B.__mro__)  # 3`,
  2503: `Une chaîne d'héritage simple produit un MRO linéaire simple. Chaque classe apparaît une fois dans l'ordre du plus dérivé au plus de base.

Concepts clés :
• C(B) et B(A) forment une chaîne d'héritage linéaire
• Le MRO suit la chaîne de l'enfant au parent ultime
• Chaque classe apparaît exactement une fois dans le MRO
• object est toujours l'entrée finale

Comment ça fonctionne :
• C hérite de B, B hérite de A, A hérite de object
• C.__mro__ = (C, B, A, object)
• La recherche de méthode suit cet ordre exact

Exemple :
class A: pass
class B(A): pass
class C(B): pass
C.__mro__  # (<class 'C'>, <class 'B'>, <class 'A'>, <class 'object'>)`,
  2504: `Quand une classe hérite de plusieurs parents non liés, le MRO les place dans l'ordre où ils apparaissent dans la définition de classe, suivi de object.

Concepts clés :
• C(A, B) signifie que A est vérifié avant B
• L'ordre des classes de base dans la définition de classe compte
• Les parents non liés sont linéarisés de gauche à droite
• object apparaît une fois à la fin

Comment ça fonctionne :
• class C(A, B) — A est le premier parent, B le second
• C.__mro__ = (C, A, B, object)
• Recherche d'attribut : C → A → B → object

Exemple :
class A: pass
class B: pass
class C(A, B): pass
C.__mro__  # (<class 'C'>, <class 'A'>, <class 'B'>, <class 'object'>)`,
  2505: `L'ordre des classes de base détermine directement le MRO. Changer C(A, B) en C(B, A) inverse quel parent est cherché en premier.

Concepts clés :
• C(B, A) signifie que B est vérifié avant A
• C'est l'ordre inverse de C(A, B)
• Le programmeur contrôle la priorité de résolution des méthodes en choisissant l'ordre des bases
• C'est une décision de conception fondamentale en héritage multiple

Comment ça fonctionne :
• class C(B, A) — B est listé en premier, A en second
• C.__mro__ = (C, B, A, object)
• Si A et B définissent une méthode, la version de B est trouvée en premier

Exemple :
class A:
    x = "A"
class B:
    x = "B"
class C(B, A): pass
C.x  # "B" — B vient en premier dans le MRO`,
  2506: `Python a adopté l'algorithme de linéarisation C3 dans Python 2.3 (pour les classes de nouveau style) et c'est le seul algorithme utilisé en Python 3.

Concepts clés :
• La linéarisation C3 garantit un MRO cohérent et prévisible
• Elle préserve l'ordre de priorité local (ordre des bases dans la définition de classe)
• Elle préserve la monotonie (si A précède B dans le MRO d'un parent, A précède aussi B dans le MRO de l'enfant)
• Elle lève TypeError si aucune linéarisation valide n'existe

Comment ça fonctionne :
• C3 fusionne les linéarisations des classes parentes avec la liste des parents
• Il choisit le premier élément de tête qui n'apparaît pas dans la queue d'aucune autre liste
• Ce processus se répète jusqu'à ce que toutes les classes soient linéarisées
• Si aucun élément de tête valide n'est trouvé, TypeError est levée

Exemple :
class A: pass
class B(A): pass
class C(A): pass
class D(B, C): pass
D.__mro__  # (D, B, C, A, object) — C3 produit cet ordre`,
  2507: `Le motif d'héritage en diamant survient quand deux classes (B et C) héritent du même parent (A), et une quatrième classe (D) hérite à la fois de B et C. La linéarisation C3 assure que A n'apparaît qu'une fois, après tous ses enfants.

Concepts clés :
• Diamant : A est l'ancêtre commun de B et C, D hérite à la fois de B et C
• A doit apparaître après B et C dans le MRO (puisque tous deux dépendent de A)
• C3 assure que chaque classe apparaît exactement une fois
• L'ordre des bases de D (B, C) détermine que B précède C

Comment ça fonctionne :
• D(B, C): fusionner le MRO de B (B, A, object) avec celui de C (C, A, object) et les bases [B, C]
• Choisir D d'abord, puis B (tête du MRO de B, pas dans la queue des autres)
• Puis C (tête du MRO de C), puis A, puis object
• Résultat : (D, B, C, A, object)

Exemple :
class A: pass
class B(A): pass
class C(A): pass
class D(B, C): pass
D.__mro__  # (D, B, C, A, object)`,
  2508: `Quand D hérite de B et C (tous deux héritant de A), le MRO est (D, B, C, A, object). La recherche de méthode suit cet ordre.

Concepts clés :
• D ne définit pas f — vérifier le suivant dans le MRO
• B ne définit pas f non plus — vérifier le suivant
• C définit f retournant "C" — trouvé !
• Le f de A retournant "A" n'est jamais atteint car le f de C est trouvé en premier

Comment ça fonctionne :
• D().f() déclenche la recherche de méthode le long du MRO de D: D → B → C → A → object
• D n'a pas f, B n'a pas f, C a f → retourne "C"
• Cela démontre pourquoi le MRO compte: même si B est listé en premier dans les bases de D, La méthode de C l'emporte car B ne la surcharge pas

Exemple :
D.__mro__  # (D, B, C, A, object)
D().f()    # "C" — C est vérifié avant A dans le MRO`,
  2509: `La linéarisation C3 peut échouer quand la hiérarchie d'héritage a des contraintes d'ordre contradictoires. Python lève une TypeError au moment de la création de la classe.

Concepts clés :
• La linéarisation C3 a des règles strictes sur la cohérence de l'ordre
• Si l'ordre des parents contredit le MRO d'une classe de base, ça échoue
• L'erreur est levée quand la classe est définie, pas quand elle est utilisée
• Le message d'erreur indique "Cannot create a consistent method resolution order"

Comment ça fonctionne :
• C3 tente de fusionner les MRO parents en respectant la priorité locale
• Si une classe apparaît comme "tête" dans une liste mais dans la "queue" d'une autre, et aucun choix valide n'existe, ça échoue
• Cela évite une résolution de méthode ambiguë

Exemple :
class A: pass
class B(A): pass
class C(A, B): pass  # TypeError!
# A apparaît avant B dans les bases de C, mais le MRO de B a A après B — contradiction`,
  2510: `C'est l'exemple classique d'un MRO incohérent. Le conflit survient car la liste des bases de C dit "A avant B" mais le MRO propre de B dit "B avant A".

Concepts clés :
• C(A, B) dit : chercher A avant B
• Mais B hérite de A, donc le MRO de B est (B, A, object) — B avant A
• Ces deux contraintes se contredisent
• La linéarisation C3 ne peut satisfaire les deux, donc TypeError est levée

Comment ça fonctionne :
• Pour construire le MRO de C, C3 doit fusionner : le MRO de A (A, object), le MRO de B (B, A, object), et les bases [A, B]
• A est une tête dans le MRO de A, mais A apparaît aussi dans la queue du MRO de B (B, A, object)
• B est une tête dans le MRO de B, mais A doit venir en premier selon la liste des bases de C
• Aucun ordre valide n'existe → TypeError

Exemple :
class A: pass
class B(A): pass
class C(A, B): pass
# TypeError: Cannot create a consistent method resolution order (MRO) for bases A, B`,
  2511: `L'incohérence est un conflit direct entre deux contraintes d'ordre que la linéarisation C3 doit respecter simultanément.

Concepts clés :
• Contrainte 1 (liste des bases de C) : A doit venir avant B
• Contrainte 2 (MRO de B) : B doit venir avant A (puisque B hérite de A)
• Ces deux contraintes sont mutuellement exclusives
• La linéarisation C3 applique les deux, donc ça échoue

Comment ça fonctionne :
• C(A, B) → la liste des bases dit : A, puis B
• B(A) → le MRO de B dit : B, puis A
• Pour le MRO de C, A doit précéder B (ordre de la liste des bases) ET B doit précéder A (linéarisation de B)
• Les deux ne peuvent être vrais → TypeError

Corrigé :
class C(B, A): pass  # Cela fonctionne ! B avant A est cohérent avec le MRO de B
# C.__mro__ = (C, B, A, object)`,
  2512: `Quand B et C surchargent tous deux f, le MRO détermine lequel D utilise. Puisque B précède C dans le MRO de D, La version de B l'emporte.

Concepts clés :
• Le MRO de D est (D, B, C, A, object)
• D ne définit pas f — chercher dans B
• B définit f retournant "B" — trouvé !
• Le f de C et celui de A ne sont jamais atteints

Comment ça fonctionne :
• D(B, C) → B est listé en premier dans les bases
• D().f() → D n'a pas f → vérifier B → B a f → retourner "B"
• Le f("C") de C est masqué car B apparaît plus tôt dans le MRO

Exemple :
D.__mro__  # (D, B, C, A, object)
D().f()    # "B"
# Comparer avec Q8 où B ne définissait PAS f — la méthode de C était alors utilisée`,
  2513: `Une idée reçue fréquente : super() appellerait simplement la classe parente. En réalité, super() délègue à la classe suivante dans la chaîne MRO.

Concepts clés :
• super() retourne un proxy qui délègue à la classe suivante dans le MRO
• "Classe suivante" dépend de la position dans le MRO de la classe actuelle
• Cela permet l'héritage multiple coopératif
• Le MRO est déterminé par la classe réelle de l'instance, pas la classe où super() est écrit

Comment ça fonctionne :
• Dans la classe B, super() pointe vers la classe suivante après B dans le MRO de l'objet actuel
• Si l'objet est de classe D(B, C) avec MRO (D, B, C, A, object), alors super() dans B va vers C, pas A
• C'est pourquoi super() est dit "coopératif" — chaque classe coopère en appelant super()

Exemple :
class A:
    def f(self): return "A"
class B(A):
    def f(self): return super().f() + "B"
class C(A):
    def f(self): return super().f() + "C"
class D(B, C): pass
D().f()  # "ACB" — super() in B goes to C (not A!), super() in C goes to A`,
  2514: `C'est la démonstration classique de super() coopératif dans une hiérarchie en diamant. Chaque appel super() suit le MRO, pas le parent direct.

Concepts clés :
• Le MRO de D est (D, B, C, A, object)
• super() dans B va vers C (suivant dans le MRO de D après B), PAS vers A
• super() dans C va vers A (suivant dans le MRO de D après C)
• La chaîne d'appels construit la chaîne du bas vers le haut

Comment ça fonctionne étape par étape :
1. D().f() → D n'a pas f → appeler B.f() (suivant dans le MRO)
2. B.f(): super().f() + "B" → super() dans B est C (dans le MRO de D)
3. C.f(): super().f() + "C" → super() dans C est A (dans le MRO de D)
4. A.f(): return "A"
5. Retour à C.f(): "A" + "C" = "AC"
6. Retour à B.f(): "AC" + "B" = "ACB"

Exemple :
D().f()  # "ACB"
# L'idée clé : super() dans B va vers C, pas A !`,
  2515: `Utiliser super().__init__() dans une sous-classe assure que l'initialisation du parent s'exécute, configurant les attributs hérités.

Concepts clés :
• B.__init__ appelle super().__init__() qui exécute A.__init__
• A.__init__ définit self.a = "A" sur l'instance
• Puis B.__init__ continue et définit self.b = "B"
• L'instance a les deux attributs : a="A" et b="B"

Comment ça fonctionne :
1. B() crée une nouvelle instance, appelle B.__init__
2. super().__init__() dans B appelle A.__init__(self)
3. A.__init__ définit self.a = "A"
4. De retour dans B.__init__, self.b = "B" est défini
5. B().a accède à l'attribut défini par A → "A"

Exemple :
b = B()
b.a  # "A" — défini par A.__init__
b.b  # "B" — défini par B.__init__`,
  2516: `Sans super(), l'héritage en diamant peut faire exécuter __init__ de l'ancêtre partagé plusieurs fois. Le super() coopératif résout cela en suivant le MRO.

Concepts clés :
• Dans un diamant A ← B, A ← C, B,C ← D, __init__ de A doit s'exécuter une fois
• Si B et C appellent tous deux A.__init__(self) directement, __init__ de A s'exécute deux fois
• Si B et C appellent tous deux super().__init__(), le MRO assure que __init__ de A s'exécute une fois
• C'est le motif "coopératif"

Comment ça fonctionne :
• D.__init__ appelle super().__init__() → va vers B (MRO: D, B, C, A, object)
• B.__init__ appelle super().__init__() → va vers C (pas A !)
• C.__init__ appelle super().__init__() → va vers A
• A.__init__ appelle super().__init__() → va vers object
• Le __init__ de chaque classe s'exécute exactement une fois

Exemple :
class A:
    def __init__(self): print("A"); super().__init__()
class B(A):
    def __init__(self): print("B"); super().__init__()
class C(A):
    def __init__(self): print("C"); super().__init__()
class D(B, C):
    def __init__(self): print("D"); super().__init__()
D()  # affiche D, B, C, A — chacun exactement une fois`,
  2517: `La recherche d'attribut suit le MRO. La première classe dans le MRO qui définit l'attribut l'emporte.

Concepts clés :
• Le MRO de D est (D, B, C, A, object)
• D ne définit pas x — vérifier B
• B définit x = 2 — trouvé ! Retourner 2
• C (pas de x) et A (x=1) ne sont jamais atteints

Comment ça fonctionne :
• D.x déclenche la recherche d'attribut le long du MRO
• D n'a pas x → B a x = 2 → retourner 2
• Même si A a aussi x = 1, B est vérifié en premier

Exemple :
D.__mro__  # (D, B, C, A, object)
D.x        # 2 — de B
C.x        # 1 — C n'a pas x, passe à A`,
  2518: `Quand B ne définit pas x, le MRO continue vers C, qui définit bien x=3. Le x=1 de A est plus bas dans la chaîne et n'est jamais atteint.

Concepts clés :
• Le MRO de D est (D, B, C, A, object)
• D n'a pas x, B n'a pas x, C a x = 3 — trouvé !
• Le x = 1 de A est masqué par le x = 3 de C
• Cela démontre que le MRO n'est pas juste "profondeur d'abord" — les frères comptent

Comment ça fonctionne :
• D.x → D (pas de x) → B (pas de x) → C (x=3) → retourner 3
• Si C n'avait pas non plus x, alors A (x=1) serait trouvé
• Le MRO assure que C est vérifié avant A dans le diamant

Exemple :
D.x  # 3 — de C
B.x  # 1 — B n'a pas x, passe à A (pas C, car C n'est pas dans le MRO de B)
C.x  # 3 — C le définit directement`,
  2519: `Les types intégrés ont aussi des MRO. list est une sous-classe directe de object sans classes intermédiaires.

Concepts clés :
• list hérite directement de object
• list.__mro__ = (<class 'list'>, <class 'object'>)
• De même, tuple.__mro__ = (<class 'tuple'>, <class 'object'>)
• Les types intégrés suivent les mêmes règles MRO que les classes définies par l'utilisateur

Comment ça fonctionne :
• list n'a pas de parent explicite au niveau Python autre que object
• Le MRO est simplement (list, object)
• C'est la même structure que toute classe simple définie par l'utilisateur

Exemple :
list.__mro__   # (<class 'list'>, <class 'object'>)
tuple.__mro__  # (<class 'tuple'>, <class 'object'>)
dict.__mro__   # (<class 'dict'>, <class 'object'>)
str.__mro__    # (<class 'str'>, <class 'object'>)`,
  2520: `Un fait peu connu de Python : bool est une sous-classe de int. True vaut 1 et False vaut 0 dans un contexte entier.

Concepts clés :
• bool hérite de int — c'est voulu
• bool.__mro__ = (<class 'bool'>, <class 'int'>, <class 'object'>)
• True + True = 2, True * 5 = 5 — car bool EST int
• issubclass(bool, int) retourne True

Comment ça fonctionne :
• bool a été ajouté à Python comme sous-classe de int pour la rétrocompatibilité
• True et False sont des instances de bool, qui est une sous-classe de int
• Toutes les opérations int fonctionnent sur les booléens

Exemple :
bool.__mro__         # (<class 'bool'>, <class 'int'>, <class 'object'>)
issubclass(bool, int)  # True
isinstance(True, int)  # True
True + True            # 2`,
  2521: `super() ne retourne pas la classe parente ni une instance de celle-ci. Il retourne un objet proxy spécial qui sait comment transférer les recherches d'attributs vers la classe appropriée dans le MRO.

Concepts clés :
• super() retourne un proxy (pas une classe, pas une instance)
• Le proxy délègue l'accès aux attributs à la classe suivante dans le MRO
• "Classe suivante" est relative à la classe où super() est appelé
• Le proxy utilise le MRO du type réel de l'instance

Comment ça fonctionne :
• super() dans la classe B crée un proxy lié à B et self
• Quand vous appelez super().method(), le proxy trouve method dans la classe suivante après B dans le MRO de self
• Cela permet les appels de méthodes coopératifs à travers la chaîne d'héritage

Exemple :
class A:
    def greet(self): return "Hello"
class B(A):
    def greet(self):
        proxy = super()     # <super: <class 'B'>, <B object>>
        return proxy.greet() + "!"
B().greet()  # "Hello!"`,
  2522: `Python 3 introduced the zero-argument super() as syntactic sugar. The explicit form super(ClassName, self) is equivalent but was required in Python 2.

Concepts clés :
• super() in Python 3 is equivalent to super(CurrentClass, self)
• The first argument specifies "start searching after this class in the MRO"
• The second argument is the object (or class) to bind to
• The explicit form is still useful for advanced patterns (e.g., skipping a class)

Comment ça fonctionne :
• super(B, self) means: find the next class after B in type(self).__mro__
• If self is an instance of D with MRO (D, B, C, A, object), super(B, self) delegates to C
• super() with no arguments uses compiler magic to fill in the current class and self

Exemple :
class B(A):
    def f(self):
        return super().f()          # Python 3 shorthand
        return super(B, self).f()   # Equivalent explicit form`,
  2523: `super().f() dans B délègue à la méthode f de A, qui retourne 1. Le f de B ajoute ensuite 1 pour obtenir 2.

Concepts clés :
• B().f() appelle la méthode f de B
• super().f() dans B appelle la méthode f de A
• A.f() retourne 1
• B.f() retourne 1 + 1 = 2

Comment ça fonctionne :
1. B().f() → appelle B.f(self)
2. super().f() → le proxy délègue à A.f(self) → retourne 1
3. 1 + 1 = 2
4. B.f retourne 2

Exemple :
B().f()  # 2
A().f()  # 1`,
  2524: `Chaque appel super() dans la chaîne ajoute 1 au résultat de la classe suivante dans le MRO.

Concepts clés :
• Le MRO de C est (C, B, A, object)
• C.f() appelle super().f() → B.f()
• B.f() appelle super().f() → A.f()
• Chaque niveau ajoute 1

Comment ça fonctionne :
1. C().f() → C.f(self)
2. super().f() dans C → B.f(self) → super().f() dans B → A.f(self) → 1
3. B.f retourne 1 + 1 = 2
4. C.f retourne 2 + 1 = 3

Exemple :
A().f()  # 1
B().f()  # 2
C().f()  # 3
# Chaque niveau ajoute 1 through the super() chain`,
  2525: `super() n'est pas limité à __init__. Il peut être utilisé dans toute méthode d'instance, méthode de classe ou propriété pour déléguer à la classe suivante dans le MRO.

Concepts clés :
• super() fonctionne dans __init__, les méthodes régulières, les méthodes de classe et les propriétés
• Il suit toujours le MRO quelle que soit la méthode où il est utilisé
• Les usages courants incluent l'extension du comportement du parent dans toute méthode
• La seule restriction est qu'il ne fonctionne pas dans les méthodes statiques (pas de contexte instance/classe)

Comment ça fonctionne :
• super() a besoin d'une référence implicite ou explicite à la classe et à l'instance/classe
• Dans les méthodes d'instance : super() utilise la classe où il est défini et self
• Dans les méthodes de classe : super() utilise la classe où il est défini et cls
• Dans les méthodes statiques : pas de self ni cls disponibles, donc super() ne fonctionne pas

Exemple :
class A:
    def greet(self): return "Hello"
    @classmethod
    def create(cls): return cls()

class B(A):
    def greet(self): return super().greet() + " World"
    @classmethod
    def create(cls): return super().create()

B().greet()   # "Hello World"
B.create()    # <B instance>`,
  2526: `super() fonctionne avec @classmethod. En Python 3, super() dans une méthode de classe utilise automatiquement le bon contexte de classe.

Concepts clés :
• @classmethod reçoit cls au lieu de self
• super() dans une méthode de classe fonctionne toujours correctement
• super().f() délègue à la méthode de classe f de A
• Le résultat est "A" + "B" = "AB"

Comment ça fonctionne :
1. B.f() → appelle la méthode de classe f de B avec cls=B
2. super().f() → le proxy délègue à A.f(cls=B) → retourne "A"
3. "A" + "B" = "AB"
4. B.f() retourne "AB"

Exemple :
A.f()  # "A"
B.f()  # "AB"
# super() dans les classmethods suit les mêmes règles MRO`,
  2527: `super(A, A()) crée un proxy qui cherche les méthodes à partir de la classe après A dans le MRO de A.

Concepts clés :
• Le MRO de A est (A, object)
• super(A, instance) signifie : commencer à chercher après A dans le MRO
• La classe suivante (et seule restante) après A est object
• Donc super(A, A()) fait proxy pour object

Comment ça fonctionne :
• super(A, A()) — premier arg "commencer après A", deuxième arg l'instance
• A.__mro__ = (A, object)
• Après A dans le MRO vient object
• Tout appel de méthode sur ce proxy cherchera dans object

Exemple :
class A: pass
s = super(A, A())
s.__init__    # <method-wrapper '__init__'> — de object
type(s)       # <class 'super'>`,
  2528: `super().__init__() permet à la sous-classe de passer des arguments spécifiques au __init__ du parent tout en ajoutant sa propre initialisation.

Concepts clés :
• B.__init__ prend à la fois x et y
• super().__init__(x) transmet uniquement x à A.__init__
• A définit self.x = x (qui vaut 1)
• B définit ensuite self.y = y (qui vaut 2)
• L'instance a les deux attributs

Comment ça fonctionne :
1. B(1, 2) appelle B.__init__(self, 1, 2)
2. super().__init__(1) appelle A.__init__(self, 1)
3. A définit self.x = 1
4. De retour dans B, self.y = 2
5. b.x = 1, b.y = 2

Exemple :
b = B(1, 2)
b.x  # 1 — défini par A.__init__
b.y  # 2 — défini par B.__init__`,
  2529: `L'ordre des print dépend de l'emplacement de super().__init__() par rapport au print dans B.__init__.

Concepts clés :
• B.__init__ s'exécute : print("B") d'abord, puis super().__init__()
• super().__init__() appelle A.__init__ qui affiche "A"
• Résultat : "B" is printed first, then "A"
• Si super().__init__() était appelé avant print("B"), l'ordre serait inversé

Comment ça fonctionne :
1. B() → B.__init__(self)
2. print("B") → affiche "B"
3. super().__init__() → A.__init__(self)
4. print("A") → affiche "A"
5. Sortie : B, puis A

Exemple :
B()
# Output:
# B
# A`,
  2530: `Cela montre super() utilisé dans une méthode régulière (pas __init__) pour étendre le comportement du parent.

Concepts clés :
• B.greet() appelle super().greet() pour obtenir le résultat de A
• A.greet() retourne "Hello"
• B.greet() concatène " World" pour obtenir "Hello World"
• C'est le motif "étendre le comportement du parent"

Comment ça fonctionne :
1. B().greet() → B.greet(self)
2. super().greet() → A.greet(self) → "Hello"
3. "Hello" + " World" = "Hello World"
4. Retourner "Hello World"

Exemple :
A().greet()  # "Hello"
B().greet()  # "Hello World"
# super() permet de s'appuyer sur l'implémentation du parent`,
  2531: `super() repose sur la connaissance de la classe d'où il est appelé et sur une référence à l'instance ou la classe. Les méthodes statiques ne fournissent ni l'un ni l'autre.

Concepts clés :
• super() sans arguments utilise la magie du compilateur (__class__ et self/cls)
• @staticmethod n'a pas de paramètre self ni cls
• Sans instance ni classe, super() ne peut déterminer la position dans le MRO
• Appeler super() dans une méthode statique lève RuntimeError ou TypeError

Comment ça fonctionne :
• Dans les méthodes d'instance : super() utilise __class__ (implicite) et self
• Dans les méthodes de classe : super() utilise __class__ (implicite) et cls
• Dans les méthodes statiques : pas de self, pas de cls → super() échoue
• On pourrait utiliser super(ClassName, instance) explicitement, mais cela va à l'encontre du but

Exemple :
class A:
    @staticmethod
    def f():
        super().f()  # RuntimeError: super(): no current class
# La solution : ne pas utiliser super() dans les méthodes statiques, ou utiliser @classmethod à la place`,
  2532: `Utiliser super() est la pratique recommandée car cela permet l'héritage multiple coopératif et évite de coder en dur les noms des classes parentes.

Concepts clés :
• super().__init__() suit le MRO — correct pour l'héritage en diamant
• ParentClass.__init__(self) code en dur le parent — fragile, peut causer des appels doubles dans les diamants
• super() s'adapte quand la hiérarchie de classes change
• ParentClass.__init__(self) doit être mis à jour manuellement si l'héritage change

Comment ça fonctionne :
• Dans un diamant (D → B → C → A), super().__init__() dans B appelle C.__init__ (ordre MRO)
• Mais B appelant A.__init__(self) directement saute C entièrement
• Cela peut faire s'exécuter A.__init__ deux fois (une fois depuis B, une fois depuis C)
• super() évite cela en assurant que chaque __init__ s'exécute exactement une fois

Exemple :
# MAUVAIS — parent codé en dur :
class B(A):
    def __init__(self):
        A.__init__(self)  # Casse dans l'héritage en diamant

# BON — super() coopératif :
class B(A):
    def __init__(self):
        super().__init__()  # Suit le MRO correctement`,
  2533: `The cooperative multi-init pattern solves the problem of passing different arguments to different classes in a multiple inheritance chain.

Concepts clés :
• Each class accepts **kwargs in __init__
• Each class extracts (pops) only the arguments it needs
• Remaining kwargs are forwarded to super().__init__(**kw)
• object.__init__() receives empty kwargs at the end

Comment ça fonctionne :
• class A: def __init__(self, **kw): self.a = kw.pop("a", 0); super().__init__(**kw)
• class B: def __init__(self, **kw): self.b = kw.pop("b", 0); super().__init__(**kw)
• class C(A, B): def __init__(self, **kw): super().__init__(**kw)
• C(a=1, b=2) → A pops a=1, passes b=2 to B → B pops b=2, passes {} to object

Exemple :
class A:
    def __init__(self, **kw):
        self.a = kw.pop("a", 0)
        super().__init__(**kw)
class B:
    def __init__(self, **kw):
        self.b = kw.pop("b", 0)
        super().__init__(**kw)
class C(A, B):
    pass
c = C(a=10, b=20)
c.a  # 10
c.b  # 20`,
  2534: `The key rule of cooperative inheritance is that each class in the MRO chain must cooperate by forwarding unhandled arguments.

Concepts clés :
• Each class pops only the keyword arguments it needs
• All remaining kwargs are forwarded via super().__init__(**kw)
• This ensures every class in the MRO gets its required arguments
• object.__init__() at the end should receive no extra kwargs

Comment ça fonctionne :
• Class pops its args: self.x = kw.pop("x", default)
• Forwards the rest: super().__init__(**kw)
• Next class in MRO does the same
• Eventually object.__init__() is reached with empty kwargs

Pourquoi c'est important :
• Without this pattern, multiple inheritance __init__ conflicts are hard to resolve
• Each class only needs to know its own arguments
• Adding a new class to the hierarchy doesn't require modifying existing classes
• The MRO determines which class processes kwargs in which order`,
  2535: `This question traces the full super() call chain in a diamond, showing how each class contributes to the final list.

Concepts clés :
• D's MRO: (D, B, C, A, object)
• super() in D goes to B, super() in B goes to C, super() in C goes to A
• The list is built from the bottom (A) up through each super() return

Comment ça fonctionne étape par étape :
1. D().f() → D.f: return super().f() + ["D"] → calls B.f
2. B.f(): return super().f() + ["B"] → calls C.f (not A!)
3. C.f(): return super().f() + ["C"] → calls A.f
4. A.f(): return []
5. Back to C: [] + ["C"] = ["C"]
6. Back to B: ["C"] + ["B"] = ["C", "B"]
7. Back to D: ["C", "B"] + ["D"] = ["C", "B", "D"]

Exemple :
D().f()  # ['C', 'B', 'D']
# The result reflects the reverse traversal of the MRO (A→C→B→D)`,
  2536: `Multiple inheritance allows a class to combine capabilities from multiple parents. When methods don't conflict, both are simply inherited.

Concepts clés :
• Duck inherits from both Flyable and Swimmable
• Flyable provides fly(), Swimmable provides swim()
• No method name conflicts — both are available on Duck instances
• This is a common pattern for combining orthogonal behaviors

Comment ça fonctionne :
• class Duck(Flyable, Swimmable) inherits all methods from both parents
• d.fly() → found in Flyable → returns "flying"
• d.swim() → found in Swimmable → returns "swimming"
• Duck's MRO: (Duck, Flyable, Swimmable, object)

Exemple :
d = Duck()
d.fly()   # "flying"
d.swim()  # "swimming"
isinstance(d, Flyable)    # True
isinstance(d, Swimmable)  # True`,
  2537: `Mixins are a design pattern in Python for adding functionality to classes without creating deep inheritance hierarchies.

Concepts clés :
• A mixin provides specific functionality (logging, serialization, etc.)
• Mixins are not meant to be instantiated on their own
• They are "mixed in" via multiple inheritance
• Convention: name them with a Mixin suffix (e.g., LogMixin, JSONMixin)

Comment ça fonctionne :
• Define a mixin class with useful methods
• Other classes inherit from the mixin alongside their main parent
• The mixin's methods become available on the child class
• Multiple mixins can be combined

Exemple :
class LogMixin:
    def log(self, msg):
        print(f"[LOG] {msg}")

class SerializeMixin:
    def to_dict(self):
        return self.__dict__

class User(LogMixin, SerializeMixin):
    def __init__(self, name):
        self.name = name

u = User("Alice")
u.log("created")    # [LOG] created
u.to_dict()         # {"name": "Alice"}`,
  2538: `This demonstrates the simplest mixin pattern: a class inherits a utility method from a mixin.

Concepts clés :
• LogMixin provides a log() method
• App inherits from LogMixin, gaining the log() method
• App().log("hello") calls LogMixin.log(self, "hello")
• The f-string formats the message as "LOG: hello"

Comment ça fonctionne :
• class App(LogMixin) inherits all of LogMixin's methods
• App().log("hello") → LogMixin.log(self, "hello")
• f"LOG: {msg}" → f"LOG: hello" → "LOG: hello"

Exemple :
app = App()
app.log("hello")    # "LOG: hello"
app.log("started")  # "LOG: started"`,
  2539: `The JSONMixin provides serialization capabilities to any class that uses it. json.dumps produces a JSON-formatted string with double quotes.

Concepts clés :
• self.__dict__ returns the instance's attribute dictionary: {"name": "Alice"}
• json.dumps() converts a Python dict to a JSON string
• JSON always uses double quotes for strings
• The mixin can be added to any class to provide to_json()

Comment ça fonctionne :
• User("Alice") creates an instance with self.name = "Alice"
• self.__dict__ = {"name": "Alice"}
• json.dumps({"name": "Alice"}) = '{"name": "Alice"}'
• Note : JSON uses double quotes, Python repr uses single quotes

Exemple :
u = User("Alice")
u.__dict__     # {'name': 'Alice'}
u.to_json()    # '{"name": "Alice"}'  (JSON string with double quotes)`,
  2540: `By convention and for correctness, mixins are listed before the main parent class in the inheritance list.

Concepts clés :
• class MyClass(MixinA, MixinB, MainParent) — mixins first
• Left-to-right order determines MRO priority
• Mixin methods override main parent methods if names conflict
• This ensures mixin behavior takes precedence

Comment ça fonctionne :
• MRO processes bases left to right
• class C(Mixin, Base) → MRO: C, Mixin, Base, object
• If both Mixin and Base define method(), Mixin's version is used
• Placing Mixin first gives it priority

Exemple :
class LogMixin:
    def save(self):
        print("logging save")
        return super().save()

class Model:
    def save(self):
        print("saving to DB")

class User(LogMixin, Model):
    pass

User().save()
# Output: "logging save" then "saving to DB"
# LogMixin.save runs first, then calls super().save() → Model.save`,
  2541: `This mixin provides timestamp functionality to any class. Each call to stamp() returns the current datetime.

Concepts clés :
• stamp() is an instance method added by the mixin
• It imports datetime and returns datetime.now()
• The timestamp is generated at call time, not at object creation
• Any class inheriting TimestampMixin gets this method

Comment ça fonctionne :
• class MyClass(TimestampMixin): pass
• MyClass().stamp() calls TimestampMixin.stamp(self)
• datetime.now() returns the current date and time
• Each call returns a new timestamp

Exemple :
class Event(TimestampMixin):
    def __init__(self, name):
        self.name = name

e = Event("meeting")
e.stamp()  # datetime.datetime(2024, 1, 15, 10, 30, 45, ...)
# Returns current datetime each time stamp() is called`,
  2542: `Unlike some languages, Python doesn't raise an error when multiple parents define the same method. The MRO simply determines which one is used.

Concepts clés :
• Multiple parents can have methods with the same name
• Python doesn't raise any error — it uses MRO to resolve the conflict
• The first class in the MRO that defines the method wins
• You can still access shadowed methods explicitly (e.g., ParentB.method(self))

Comment ça fonctionne :
• class C(A, B) where both A and B define f()
• C's MRO: (C, A, B, object)
• C().f() → A.f() is found first (A comes before B in MRO)
• B.f() is shadowed but still accessible via B.f(instance)

Exemple :
class A:
    def greet(self): return "Hello from A"
class B:
    def greet(self): return "Hello from B"
class C(A, B): pass

C().greet()        # "Hello from A" — A is first in MRO
B.greet(C())       # "Hello from B" — explicit call to B's version`,
  2543: `When two unrelated parents both define the same attribute, the order of bases determines which one is used.

Concepts clés :
• C inherits from A and B, both of which define x
• C's MRO: (C, A, B, object)
• C.x → C has no x → A has x = 1 → found! Return 1
• B's x = 2 is shadowed

Comment ça fonctionne :
• Attribute lookup follows the MRO: C → A → B → object
• A is checked before B because A is listed first in C(A, B)
• A.x = 1 is found, so the search stops
• B.x = 2 is never reached

Exemple :
C.x  # 1 — from A (first in bases)
# If you change to class C(B, A): pass
# Then C.x would be 2 — de B (now first)`,
  2544: `Swapping the base order from C(A, B) to C(B, A) changes which parent's attribute is found first.

Concepts clés :
• C's bases are now (B, A) instead of (A, B)
• C's MRO: (C, B, A, object)
• C.x → C has no x → B has x = 2 → found! Return 2
• A's x = 1 is shadowed this time

Comment ça fonctionne :
• The order of bases directly controls the MRO
• C(B, A) means B is searched before A
• B.x = 2 is the first match

Exemple :
class C(B, A): pass
C.x  # 2 — de B
# vs
class C(A, B): pass
C.x  # 1 — from A
# The order of bases is a deliberate design choice`,
  2545: `These two relationships are fundamental OOP concepts that determine how classes relate to each other.

Concepts clés :
• Inheritance ("is-a"): Car is a Vehicle — Car inherits Vehicle's interface and behavior
• Composition ("has-a"): Car has an Engine — Car contains an Engine instance
• Inheritance creates tight coupling between classes
• Composition creates loose coupling and is often preferred

Comment ça fonctionne :
• Inheritance: class Car(Vehicle) — Car IS a Vehicle
• Composition: class Car: def __init__(self): self.engine = Engine() — Car HAS an Engine
• With inheritance, changing Vehicle affects Car
• With composition, Engine can be changed independently

Exemple :
# Inheritance (is-a):
class Vehicle:
    def start(self): return "starting"
class Car(Vehicle): pass  # Car IS a Vehicle

# Composition (has-a):
class Engine:
    def start(self): return "vroom"
class Car:
    def __init__(self):
        self.engine = Engine()  # Car HAS an Engine`,
  2546: `"Favor composition over inheritance" is a well-known design principle. Composition provides more flexibility at the cost of slightly more code.

Concepts clés :
• Composition allows swapping components at runtime
• Inheritance creates a rigid, tightly coupled hierarchy
• Composition makes testing easier (inject mock components)
• Inheritance is appropriate when there's a true "is-a" relationship

Quand utiliser la composition :
• When you want to reuse behavior without committing to a type hierarchy
• When the relationship is "has-a" or "uses-a"
• When you need to change behavior at runtime
• When you want to combine behaviors from multiple sources without MRO complexity

Quand utiliser l'héritage :
• When the relationship is genuinely "is-a" (Dog IS an Animal)
• When you need polymorphism (treat derived types as base type)
• When you want to share interface and implementation

Exemple :
# Composition — flexible:
class Logger:
    def log(self, msg): print(msg)
class App:
    def __init__(self, logger=None):
        self.logger = logger or Logger()  # Can swap loggers!`,
  2547: `This is a textbook example of composition. Car doesn't inherit from Engine; it contains an Engine and delegates work to it.

Concepts clés :
• Car "has-a" Engine (composition)
• Car.start() delegates to self.engine.start()
• Car doesn't inherit Engine's interface — it wraps it
• The Engine can be replaced with a different implementation

Comment ça fonctionne :
• Car.__init__ creates an Engine instance: self.engine = Engine()
• Car.start() calls self.engine.start() and returns the result
• Car is not a subclass of Engine — it's a wrapper/container
• This provides flexibility: you could pass a different engine type

Exemple :
class ElectricEngine:
    def start(self): return "whirr"

class Car:
    def __init__(self, engine):
        self.engine = engine
    def start(self):
        return self.engine.start()

Car(Engine()).start()          # "vroom"
Car(ElectricEngine()).start()  # "whirr"  — swap at runtime!`,
  2548: `This is the simplest form of inheritance. Car is a Vehicle and inherits all of Vehicle's methods.

Concepts clés :
• Car(Vehicle) means Car IS a Vehicle
• Car inherits start() from Vehicle without redefining it
• Car instances are also Vehicle instances
• isinstance(Car(), Vehicle) returns True

Comment ça fonctionne :
• class Car(Vehicle): pass — Car inherits everything from Vehicle
• Car().start() → Vehicle.start(self) → "starting"
• No methods are overridden or added
• Car is a specialization of Vehicle

Exemple :
c = Car()
c.start()                # "starting" — inherited from Vehicle
isinstance(c, Vehicle)   # True — Car IS a Vehicle
isinstance(c, Car)       # True
Car.__mro__              # (Car, Vehicle, object)`,
  2549: `When inheriting from three unrelated parents, the MRO includes the class itself, all three parents in order, and object.

Concepts clés :
• D(A, B, C) inherits from three parents
• D's MRO: (D, A, B, C, object) — 5 entries
• Parents appear in the order listed in the class definition
• object apparaît une fois à la fin

Comment ça fonctionne :
• D is first in its own MRO
• A, B, C follow in the order they appear in D(A, B, C)
• object is the ultimate base, appearing last
• len(D.__mro__) = 5

Exemple :
D.__mro__
# (<class 'D'>, <class 'A'>, <class 'B'>, <class 'C'>, <class 'object'>)
len(D.__mro__)  # 5`,
  2550: `Python allows subclassing built-in types like list, dict, str, int, etc. The subclass inherits all the built-in behavior.

Concepts clés :
• class MyList(list) creates a subclass of the built-in list type
• MyList instances are also list instances
• All list methods (append, pop, sort, etc.) are inherited
• You can override or add methods to customize behavior

Comment ça fonctionne :
• MyList(list) inherits from list
• MyList([1, 2, 3]) creates a MyList initialized with [1, 2, 3]
• isinstance(ml, list) returns True — MyList IS a list
• MyList.__mro__ = (MyList, list, object)

Exemple :
class MyList(list):
    def first(self):
        return self[0] if self else None

ml = MyList([1, 2, 3])
ml.first()            # 1
ml.append(4)          # Works — inherited from list
isinstance(ml, list)  # True
len(ml)               # 4`,
  2551: `You can subclass built-in types like list, dict, str, int, and set to add custom behavior while retaining all original functionality.

Concepts clés :
• class MyList(list): creates a subclass of list
• MyList inherits all list methods (append, pop, len, indexing, etc.)
• The custom first() method uses self[0] — self IS the list
• MyList([1, 2, 3]) creates an instance with elements [1, 2, 3]

Comment ça fonctionne :
1. MyList inherits from list, so MyList([1, 2, 3]) creates a list-like object
2. ml.first() calls the custom method
3. self[0] accesses index 0 of the list itself
4. Returns 1

Exemple :
class MyList(list):
    def first(self):
        return self[0]
    def last(self):
        return self[-1]
ml = MyList([10, 20, 30])
ml.first()   # 10
ml.last()    # 30
ml.append(40)  # inherited method still works

Usages courants :
• Adding convenience methods to built-in types
• Creating domain-specific collection types
• Extending built-in behavior without modifying it`,
  2552: `Even an empty subclass (using pass) inherits every method and behavior from the parent class. MyList gets append, pop, insert, len support, indexing, and everything else list provides.

Concepts clés :
• class MyList(list): pass — inherits everything, adds nothing
• ml.append(4) uses the inherited list.append method
• len(ml) uses the inherited __len__ method
• The subclass instance behaves identically to a regular list

Comment ça fonctionne :
1. MyList([1, 2, 3]) creates a list-like object with 3 elements
2. ml.append(4) adds element 4 using inherited append
3. len(ml) calls inherited __len__, returns 4

Exemple :
class MyList(list): pass
ml = MyList()
ml.append("a")
ml.extend(["b", "c"])
len(ml)        # 3
ml[0]          # "a"
ml.pop()       # "c"

Usages courants :
• Starting point for custom list types
• Type-tagging (isinstance checks)
• Adding methods incrementally`,
  2553: `Subclassing dict lets you add methods that operate on the dictionary data. Since self IS the dict, you can call self.keys(), self.values(), self.items(), and any other dict method inside your custom methods.

Concepts clés :
• MyDict inherits from dict — self is the dictionary
• self.keys() returns the dict's keys
• sorted() returns a sorted list
• MyDict(b=2, a=1) creates a dict with keys 'b' and 'a'

Comment ça fonctionne :
1. MyDict(b=2, a=1) creates {"b": 2, "a": 1}
2. keys_sorted() calls self.keys() → dict_keys(["b", "a"])
3. sorted(["b", "a"]) → ["a", "b"]
4. Returns ["a", "b"]

Exemple :
class MyDict(dict):
    def keys_sorted(self):
        return sorted(self.keys())
    def values_sorted(self):
        return [self[k] for k in self.keys_sorted()]
d = MyDict(c=3, a=1, b=2)
d.keys_sorted()    # ["a", "b", "c"]
d.values_sorted()  # [1, 2, 3]`,
  2554: `Subclassing str lets you add custom string manipulation methods. Since str is immutable, self is the string value itself and you can call any str method on it.

Concepts clés :
• class MyStr(str): creates a subclass of str
• self refers to the string value ("hello")
• self.upper() returns "HELLO" (inherited method)
• Concatenation with "!" gives "HELLO!"

Comment ça fonctionne :
1. MyStr("hello") creates a string subclass instance with value "hello"
2. shout() calls self.upper() → "HELLO"
3. "HELLO" + "!" → "HELLO!"
4. Returns "HELLO!"

Exemple :
class MyStr(str):
    def shout(self):
        return self.upper() + "!"
    def whisper(self):
        return self.lower() + "..."
MyStr("Hello").shout()    # "HELLO!"
MyStr("Hello").whisper()  # "hello..."

Note : str is immutable — methods always return new strings, never modify self.`,
  2555: `You can subclass int to add custom numeric methods. Since int is immutable, the value is set at creation and self holds the integer value.

Concepts clés :
• class MyInt(int): creates a subclass of int
• self is the integer value (4 in this case)
• self % 2 == 0 checks if the value is even
• 4 % 2 == 0 → 0 == 0 → True

Comment ça fonctionne :
1. MyInt(4) creates an int subclass instance with value 4
2. is_even() evaluates self % 2 == 0
3. 4 % 2 → 0, 0 == 0 → True
4. Returns True

Exemple :
class MyInt(int):
    def is_even(self):
        return self % 2 == 0
    def is_positive(self):
        return self > 0
MyInt(4).is_even()      # True
MyInt(3).is_even()      # False
MyInt(-5).is_positive()  # False`,
  2556: `This tests the same is_even() method with an odd number. The modulo operation 3 % 2 produces 1, which is not equal to 0.

Concepts clés :
• self is 3 (the integer value)
• 3 % 2 → 1 (remainder of dividing 3 by 2)
• 1 == 0 → False
• The method correctly identifies 3 as odd

Comment ça fonctionne :
1. MyInt(3) creates an int subclass instance with value 3
2. is_even() evaluates self % 2 == 0
3. 3 % 2 → 1, 1 == 0 → False
4. Returns False

L'approche modulo fonctionne pour tous les entiers :
• Even: 0, 2, 4, -2, -4 → n % 2 == 0 → True
• Odd: 1, 3, 5, -1, -3 → n % 2 != 0 → False`,
  2557: `__missing__ is a special dict method called when a key is not found during __getitem__ lookup. This is exactly how collections.defaultdict works internally.

Concepts clés :
• __missing__(self, key) is called when dict[key] raises KeyError
• It can set a default and return it
• d["x"] += 1 is equivalent to d["x"] = d["x"] + 1
• First d["x"] triggers __missing__, which sets d["x"] = 0 and returns 0

Comment ça fonctionne :
1. d["x"] += 1 expands to d["x"] = d.__getitem__("x") + 1
2. d.__getitem__("x") fails (key missing) → calls __missing__("x")
3. __missing__ sets self["x"] = 0 and returns 0
4. d["x"] = 0 + 1 → d["x"] = 1
5. d["x"] is now 1

Exemple :
d = DefaultDict()
d["a"]        # 0 (__missing__ sets and returns 0)
d["b"] += 5   # 5 (__missing__ returns 0, then 0+5=5)
d             # {"a": 0, "b": 5}

Usages courants :
• Implementing default values for missing keys
• Auto-initializing counters, lists, or nested dicts`,
  2558: `For immutable types like str, int, tuple, you must override __new__ instead of __init__ to customize the value. By the time __init__ runs, the immutable value is already set and cannot be changed.

Concepts clés :
• __new__ is called BEFORE __init__ — it creates the object
• For immutable types, the value is fixed at creation in __new__
• super().__new__(cls, s.upper()) creates a str with the uppercased value
• __init__ cannot modify an already-created immutable object

Comment ça fonctionne :
1. UpperStr("hello") calls UpperStr.__new__(UpperStr, "hello")
2. s.upper() → "HELLO"
3. super().__new__(cls, "HELLO") → creates str with value "HELLO"
4. The returned object is an UpperStr instance with value "HELLO"

Exemple :
class UpperStr(str):
    def __new__(cls, s):
        return super().__new__(cls, s.upper())
UpperStr("hello")    # "HELLO"
UpperStr("World")    # "WORLD"
isinstance(UpperStr("hi"), str)  # True

Usages courants :
• Normalizing immutable values at creation time
• Validating immutable data before object creation
• Creating constrained immutable subtypes`,
  2559: `The object creation protocol in Python has two phases: __new__ (creation) and __init__ (initialization). For immutable types, the value is permanently set during __new__.

Concepts clés :
• __new__ creates and returns a new instance — this is where the value is set
• __init__ initializes an already-created instance — too late for immutables
• Immutable types (str, int, float, tuple, frozenset) cannot be modified after creation
• Mutable types (list, dict, set) can be modified in __init__ because their contents are changeable

Comment ça fonctionne :
1. obj = MyStr("hello") → Python calls MyStr.__new__(MyStr, "hello")
2. __new__ creates the string object with its value — value is now FIXED
3. Python then calls obj.__init__("hello")
4. __init__ cannot change the string value — it's immutable

Exemple :
class UpperStr(str):
    def __init__(self, s):
        pass  # Too late! Value is already "hello", not "HELLO"

class UpperStr(str):
    def __new__(cls, s):
        return super().__new__(cls, s.upper())  # Correct! Sets value to "HELLO"

This is why int, str, tuple subclasses must use __new__ for value customization.`,
  2560: `The 'in' operator calls the __contains__ method. By overriding it in a set subclass, you can customize membership testing behavior while still delegating to the parent implementation.

Concepts clés :
• x in obj calls obj.__contains__(x)
• super().__contains__(item) calls set's original __contains__
• The override here adds no new behavior but demonstrates the hook
• You could add logging, caching, or custom logic before/after the check

Comment ça fonctionne :
1. 1 in MySet({1, 2, 3}) calls MySet.__contains__(myset, 1)
2. The override calls super().__contains__(1) → set.__contains__
3. 1 is in {1, 2, 3} → True
4. Returns True

Exemple :
class LoggedSet(set):
    def __contains__(self, item):
        result = super().__contains__(item)
        print(f"Checked {item}: {result}")
        return result
s = LoggedSet({1, 2, 3})
1 in s  # prints "Checked 1: True", returns True
5 in s  # prints "Checked 5: False", returns False

Usages courants :
• Logging or auditing membership checks
• Case-insensitive containment
• Custom matching logic`,
  2561: `isinstance checks if an object is an instance of a class OR any of its parent classes. Since MyList inherits from list, every MyList instance is also a list instance.

Concepts clés :
• isinstance(obj, cls) returns True if obj is an instance of cls or a subclass of cls
• MyList inherits from list → MyList instances are also list instances
• This is the "is-a" relationship: a MyList IS a list
• This works transitively through the entire inheritance chain

Comment ça fonctionne :
1. MyList([]) creates a MyList instance
2. isinstance checks: is this object a list or a subclass of list?
3. MyList IS a subclass of list → True
4. Returns True

Exemple :
class MyList(list): pass
ml = MyList()
isinstance(ml, MyList)    # True (direct instance)
isinstance(ml, list)      # True (parent class)
isinstance(ml, object)    # True (grandparent — all classes inherit from object)

This is fundamental to polymorphism — subclass instances can be used wherever parent instances are expected.`,
  2562: `isinstance checks upward through the inheritance chain, not downward. A parent class instance is NOT an instance of its child class.

Concepts clés :
• isinstance(obj, cls) checks if obj's type is cls or a SUBCLASS of cls
• list is NOT a subclass of MyList — it's the other way around
• A plain [] is a list, but NOT a MyList
• Inheritance is one-directional: child IS-A parent, but parent IS-NOT-A child

Comment ça fonctionne :
1. [] creates a plain list instance
2. isinstance checks: is list a subclass of MyList? No.
3. list is the PARENT, MyList is the CHILD
4. Returns False

Exemple :
class MyList(list): pass
isinstance([], MyList)       # False (list is not a MyList)
isinstance([], list)         # True (list is a list)
isinstance(MyList([]), list)  # True (MyList IS a list)

This asymmetry is intentional — a Dog is an Animal, but not every Animal is a Dog.`,
  2563: `By overriding append(), you can add custom logic before delegating to the parent. Here, the override prevents duplicate entries, creating a list that behaves like an ordered set.

Concepts clés :
• Override append to add a uniqueness check
• if item not in self uses list's __contains__ to check membership
• super().append(item) calls the original list.append only if item is new
• The second al.append(1) does nothing because 1 is already in the list

Comment ça fonctionne :
1. al.append(1): 1 not in [] → True → super().append(1) → al = [1]
2. al.append(1): 1 not in [1] → False → skip
3. len(al) → 1

Exemple :
al = AutoList()
al.append("a")
al.append("b")
al.append("a")  # skipped
al  # ["a", "b"]
len(al)  # 2

Usages courants :
• Maintaining unique ordered collections
• Preventing duplicate entries in lists
• Implementing set-like behavior with list ordering`,
  2564: `type(obj) returns the exact class that was used to create the object. Even though MyList inherits from list, instances of MyList have type MyList.

Concepts clés :
• type(obj) returns the object's actual class (not any parent class)
• type(obj).__name__ gives the class name as a string
• MyList() creates a MyList instance, so type is MyList
• This differs from isinstance, which checks the full hierarchy

Comment ça fonctionne :
1. MyList() creates an instance of class MyList
2. type(MyList()) returns <class 'MyList'>
3. .__name__ extracts the string "MyList"

Exemple :
class MyList(list): pass
type(MyList())           # <class 'MyList'>
type(MyList()).__name__  # "MyList"
type([]).__name__        # "list"

isinstance vs type :
• isinstance(MyList([]), list) → True (checks hierarchy)
• type(MyList([])) is list → False (checks exact type)`,
  2565: `A subtle gotcha when subclassing built-ins: operations inherited from the parent return instances of the parent type, not the subclass. list.__add__ returns a plain list.

Concepts clés :
• MyList([1]) + [2] calls list.__add__ (inherited, not overridden)
• list.__add__ creates and returns a new list, not a MyList
• The result loses the subclass type
• This applies to many operations: +, *, slicing, etc.

Comment ça fonctionne :
1. MyList([1]) is a MyList instance
2. + [2] calls list.__add__(MyList([1]), [2])
3. list.__add__ creates a new list → [1, 2]
4. The result is type list, NOT MyList
5. type([1, 2]).__name__ → "list"

Exemple :
class MyList(list): pass
ml = MyList([1, 2])
type(ml)           # <class 'MyList'>
type(ml + [3])     # <class 'list'> — not MyList!
type(ml * 2)       # <class 'list'> — not MyList!
type(ml[:1])       # <class 'list'> — not MyList!

To preserve the subclass type, you must override __add__, __mul__, __getitem__, etc.`,
  2566: `__bases__ is a tuple of a class's direct parent classes — NOT the entire ancestor chain. For the full chain, use __mro__.

Concepts clés :
• cls.__bases__ returns a tuple of direct base classes only
• C inherits from B, so C.__bases__ is (B,)
• A is a grandparent of C but NOT in C.__bases__
• For the full hierarchy, use C.__mro__ which includes all ancestors

Comment ça fonctionne :
1. class C(B): means C's direct parent is B
2. C.__bases__ → (<class 'B'>,)
3. C.__bases__[0] → <class 'B'>
4. .__name__ → "B"

Exemple :
class A: pass
class B(A): pass
class C(B): pass
C.__bases__        # (<class 'B'>,) — only direct parent
B.__bases__        # (<class 'A'>,)
A.__bases__        # (<class 'object'>,)
C.__mro__          # (C, B, A, object) — full chain

__bases__ vs __mro__ :
• __bases__: direct parents only
• __mro__: full method resolution order (all ancestors)`,
  2567: `issubclass(cls, parent) returns True if cls is a subclass of parent, even through multiple levels of inheritance. The check is transitive.

Concepts clés :
• issubclass checks the entire inheritance chain, not just direct parents
• C → B → A: C is a subclass of both B and A
• This is transitive: if C ⊂ B and B ⊂ A, then C ⊂ A
• Every class is also a subclass of itself: issubclass(A, A) is True

Comment ça fonctionne :
1. C inherits from B, B inherits from A
2. issubclass(C, A) checks if A appears anywhere in C's ancestry
3. C.__mro__ is (C, B, A, object) — A is present
4. Returns True

Exemple :
issubclass(C, A)       # True (grandparent)
issubclass(C, B)       # True (direct parent)
issubclass(C, C)       # True (class is subclass of itself)
issubclass(C, object)  # True (everything inherits from object)
issubclass(A, C)       # False (A is NOT a subclass of C)`,
  2568: `__subclasses__() is a built-in class method that returns the list of immediate subclasses. It tracks which classes have been defined with A as a parent.

Concepts clés :
• cls.__subclasses__() returns a list of direct child classes
• Only includes classes defined so far (at call time)
• Does NOT include grandchildren or deeper descendants
• Does NOT return instances — only class objects
• Uses weak references internally (deleted classes are removed)

Comment ça fonctionne :
1. Python internally tracks when classes are subclassed
2. __subclasses__() returns the current list of direct subclasses
3. If no classes inherit from A, returns []
4. Only direct children are included, not grandchildren

Exemple :
class A: pass
A.__subclasses__()  # [] (no subclasses yet)

class B(A): pass
class C(A): pass
A.__subclasses__()  # [B, C]

class D(B): pass    # D inherits from B, not directly from A
A.__subclasses__()  # [B, C] — D is NOT included (it's a grandchild)

Usages courants :
• Plugin discovery and registration
• Finding all implementations of a base class
• Auto-registering subclasses`,
  2569: `You can iterate over __subclasses__() to get information about each subclass. Using a set comprehension with __name__ extracts the class names.

Concepts clés :
• A.__subclasses__() returns [B, C] (direct subclasses)
• x.__name__ gets the string name of each class
• set() creates a set of unique names
• A itself is NOT in __subclasses__() — only its children

Comment ça fonctionne :
1. A.__subclasses__() → [<class 'B'>, <class 'C'>]
2. Generator: x.__name__ for each → "B", "C"
3. set(["B", "C"]) → {"B", "C"}

Exemple :
class Shape: pass
class Circle(Shape): pass
class Square(Shape): pass
class Triangle(Shape): pass

names = [cls.__name__ for cls in Shape.__subclasses__()]
# ["Circle", "Square", "Triangle"]

registry = {cls.__name__: cls for cls in Shape.__subclasses__()}
# {"Circle": Circle, "Square": Square, "Triangle": Triangle}
registry["Circle"]()  # creates a Circle instance`,
  2570: `__init_subclass__ is a hook that runs automatically when a class is subclassed. It's called at class definition time, not at instantiation time.

Concepts clés :
• __init_subclass__(cls) is called on the PARENT when a CHILD is defined
• cls is the new subclass being created, not the parent
• Called at class definition time (when 'class A(Base):' is executed)
• Base itself does NOT trigger __init_subclass__
• **kwargs passes through any class keyword arguments

Comment ça fonctionne :
1. class A(Base): pass → calls Base.__init_subclass__(cls=A) → appends "A"
2. class B(Base): pass → calls Base.__init_subclass__(cls=B) → appends "B"
3. Base.registry is now ["A", "B"]

Exemple :
class Plugin:
    plugins = {}
    def __init_subclass__(cls, **kwargs):
        super().__init_subclass__(**kwargs)
        Plugin.plugins[cls.__name__] = cls

class JSONPlugin(Plugin): pass
class XMLPlugin(Plugin): pass
Plugin.plugins  # {"JSONPlugin": JSONPlugin, "XMLPlugin": XMLPlugin}

Usages courants :
• Plugin registration systems
• Auto-discovery of subclasses
• Validation of subclass constraints`,
  2571: `__init_subclass__ is a class-creation hook, not an instance-creation hook. It fires during the class statement execution, before any instances exist.

Concepts clés :
• Triggered by: class Child(Parent): ... (at definition time)
• NOT triggered by: Child() (that calls __init__)
• The parent's __init_subclass__ receives the child class as cls
• Introduced in Python 3.6
• Replaces many uses of metaclasses for simple registration

Comment ça fonctionne :
1. Python encounters class Child(Parent):
2. Python creates the Child class object
3. Python calls Parent.__init_subclass__(cls=Child)
4. The hook runs before the class statement finishes

Chronologie :
class Parent:
    def __init_subclass__(cls):
        print(f"{cls.__name__} created")

class Child(Parent): pass  # prints "Child created" (definition time!)
# No instances have been created yet

Comparaison :
• __init_subclass__: called when class is DEFINED (subclassed)
• __init__: called when instance is CREATED
• __new__: called when instance is ALLOCATED`,
  2572: `Using type(self).__name__ in a parent class method creates polymorphic behavior — the method automatically returns the correct class name for any subclass instance.

Concepts clés :
• type(self) returns the actual runtime class of the object
• When called on a Child instance, type(self) is Child, not Base
• This makes the method polymorphic without overriding
• __name__ extracts the class name as a string

Comment ça fonctionne :
1. Child() creates a Child instance
2. method() is inherited from Base (Child doesn't override it)
3. Inside method, self is the Child instance
4. type(self) → <class 'Child'>
5. type(self).__name__ → "Child"

Exemple :
class Base:
    def method(self):
        return type(self).__name__
class A(Base): pass
class B(Base): pass

Base().method()  # "Base"
A().method()     # "A"
B().method()     # "B"

This pattern is common in __repr__ implementations to make them work correctly for subclasses.`,
  2573: `self.__class__ and type(self) are equivalent for normal classes. Both return the actual runtime type of the object.

Concepts clés :
• self.__class__ returns the same as type(self) for regular classes
• For a Child instance, self.__class__ is Child
• __name__ gives the string name
• Both approaches are polymorphic — they adapt to the actual instance type

Comment ça fonctionne :
1. Child() creates a Child instance
2. method() is inherited from Base
3. self.__class__ → <class 'Child'> (actual type)
4. .__name__ → "Child"

type(self) vs self.__class__ :
• type(self) — the preferred, modern way
• self.__class__ — also works, slightly older style
• Both return the same result for standard classes
• In rare edge cases with old-style classes (Python 2), they could differ
• In Python 3, they are always equivalent

Exemple :
class Base:
    def who(self):
        return self.__class__.__name__
class Sub(Base): pass
Sub().who()  # "Sub"`,
  2574: `When you SET a class attribute on a subclass, it creates a new attribute in the subclass's own namespace. It does NOT modify the parent class attribute.

Concepts clés :
• B initially inherits x from A (B.x looks up A.x → 1)
• B.x = 2 creates a NEW x in B's own __dict__
• A.x is unaffected — it remains 1
• B.x now shadows A.x (B has its own x)
• Reading uses MRO lookup; writing always targets the specified class

Comment ça fonctionne :
1. class A: x = 1 → A.__dict__["x"] = 1
2. class B(A): pass → B.__dict__ has no "x"
3. B.x (before assignment) → looks up MRO → finds A.x → 1
4. B.x = 2 → B.__dict__["x"] = 2 (creates new attribute on B)
5. A.x → still 1 (A.__dict__["x"] unchanged)

Exemple :
class A: x = 1
class B(A): pass
B.x          # 1 (inherited from A)
B.x = 2      # creates B's own x
B.x          # 2 (B's own)
A.x          # 1 (unchanged)
"x" in B.__dict__  # True (B now has its own x)`,
  2575: `This is one of the most common inheritance gotchas in Python. When a subclass inherits a mutable class attribute, both classes share the SAME object.

Concepts clés :
• B doesn't define its own lst, so B.lst resolves to A.lst
• B.lst and A.lst are the SAME list object (same id)
• Mutating B.lst (append, extend, etc.) mutates A.lst too
• This is different from REASSIGNING: B.lst = [] would create a new list

Comment ça fonctionne :
1. A.lst = [] creates one list object
2. B inherits lst — B.lst IS A.lst (same reference)
3. B.lst.append(1) mutates the shared list in-place
4. A.lst → [1] (same object was mutated)

Exemple :
class A: lst = []
class B(A): pass
id(A.lst) == id(B.lst)  # True — same object!
B.lst.append(1)
A.lst  # [1] — both see the change

Fix — give each class its own list:
class A: lst = []
class B(A): lst = []  # B has its own list now
B.lst.append(1)
A.lst  # [] — A is unaffected

This gotcha applies to any mutable class attribute: lists, dicts, sets.`,
  2576: `When a subclass explicitly defines the same attribute, it creates a separate object that shadows the parent's attribute.

Concepts clés :
• B explicitly defines lst = [] in its own class body
• B.lst and A.lst are DIFFERENT list objects
• Mutating B.lst does NOT affect A.lst
• This is the fix for the shared mutable class variable gotcha

Comment ça fonctionne :
1. A.lst = [] creates one list for A
2. B.lst = [] creates a SEPARATE list for B
3. B.lst.append(1) modifies only B's list
4. A.lst → [] (unaffected)
5. B.lst → [1]

Exemple :
class A: lst = []
class B(A): lst = []  # own list
id(A.lst) == id(B.lst)  # False — different objects!
B.lst.append(1)
A.lst  # []
B.lst  # [1]

Bonne pratique : When subclasses need independent mutable state, always redefine the attribute in the subclass or use __init__ to create instance-level attributes.`,
  2577: `The NotImplementedError pattern creates an informal interface: the parent defines a method that raises an error, forcing subclasses to provide their own implementation.

Concepts clés :
• Animal.speak raises NotImplementedError — it's a placeholder
• Dog overrides speak with a concrete implementation
• Method resolution finds Dog.speak first (before Animal.speak)
• The NotImplementedError is never raised because Dog's version runs

Comment ça fonctionne :
1. Dog().speak() → Python looks up speak in Dog first
2. Dog has its own speak → returns "Woof"
3. Animal.speak is never called
4. Returns "Woof"

Exemple :
class Animal:
    def speak(self):
        raise NotImplementedError
class Dog(Animal):
    def speak(self): return "Woof"
class Cat(Animal):
    def speak(self): return "Meow"

Dog().speak()  # "Woof"
Cat().speak()  # "Meow"

This is an informal version of abstract methods — it doesn't prevent Animal() from being instantiated, but calling speak() on a plain Animal will raise an error.`,
  2578: `Unlike abstract methods (ABC), NotImplementedError does not prevent instantiation. You CAN create an Animal() — the error only occurs when you call the method.

Concepts clés :
• Animal() succeeds — the class can be instantiated
• Animal().speak() raises NotImplementedError
• This is a runtime check, not a definition-time check
• The error signals "this method must be overridden in subclasses"

Comment ça fonctionne :
1. Animal() → creates instance (no error)
2. animal.speak() → calls the method
3. raise NotImplementedError → exception raised
4. Program crashes unless caught

Exemple :
a = Animal()       # OK — no error
a.speak()          # NotImplementedError!

try:
    Animal().speak()
except NotImplementedError:
    print("Must override speak()")

This differs from @abstractmethod which prevents instantiation entirely — Animal() would raise TypeError if Animal used ABC.`,
  2579: `These two approaches enforce method overriding at different times: @abstractmethod at instantiation time, NotImplementedError at call time.

Concepts clés :
• @abstractmethod (from abc module): prevents creating instances of the base class
• NotImplementedError: allows creating instances but errors when the method runs
• @abstractmethod is stricter — catches missing overrides earlier
• NotImplementedError is more flexible but can hide bugs until runtime

Comparaison :
from abc import ABC, abstractmethod

class Base1:
    def method(self): raise NotImplementedError
Base1()           # OK (instance created)
Base1().method()  # NotImplementedError at CALL time

class Base2(ABC):
    @abstractmethod
    def method(self): pass
Base2()           # TypeError! Cannot instantiate (DEFINITION time check)

Quand utiliser chacun :
• @abstractmethod: when you want strict enforcement (recommended)
• NotImplementedError: when you need flexibility (e.g., optional overrides)
• @abstractmethod catches errors earlier and is more Pythonic`,
  2580: `This demonstrates inheritance for utility methods. The parent provides generic functionality (serialization) that works with any subclass's attributes.

Concepts clés :
• self.__dict__ returns a dict of instance attributes
• User("Bob").__dict__ → {"name": "Bob"}
• str({"name": "Bob"}) → "{'name': 'Bob'}"
• The serialize method works for ANY subclass with any attributes

Comment ça fonctionne :
1. User("Bob") creates instance with self.name = "Bob"
2. serialize() is inherited from Serializable
3. self.__dict__ → {"name": "Bob"}
4. str({"name": "Bob"}) → "{'name': 'Bob'}"

Exemple :
class Product(Serializable):
    def __init__(self, name, price):
        self.name = name
        self.price = price
Product("Widget", 9.99).serialize()  # "{'name': 'Widget', 'price': 9.99}"

This is a form of the Template Method pattern — the parent defines the algorithm (serialize), and subclasses provide the data (__dict__).`,
  2581: `In Python, a lambda assigned as a class attribute behaves identically to a regular method defined with def. It's stored in the class __dict__ and inherited by subclasses.

Concepts clés :
• f = lambda self: "A" is equivalent to def f(self): return "A"
• Lambdas as class attributes receive self automatically (descriptor protocol)
• B inherits f from A through normal MRO lookup
• B().f() calls A's lambda, which returns "A"

Comment ça fonctionne :
1. A.f is a lambda in A.__dict__
2. B doesn't define f, so B.f resolves to A.f via MRO
3. B().f() → calls lambda with self=B_instance → returns "A"

Exemple :
class A:
    f = lambda self: "A"
    g = lambda self, x: x * 2
class B(A): pass

B().f()    # "A" (inherited lambda)
B().g(5)   # 10 (inherited lambda with parameter)

Note : lambdas as class attributes are uncommon in practice — def is preferred for readability. But they demonstrate that Python treats all callables in the class namespace as potential methods.`,
  2582: `Each class inherits only from its specified parent(s). D inherits from B, so D's method resolution follows B's chain.

Concepts clés :
• D(B) means D inherits from B
• D has no connection to A — they are in separate hierarchies
• D doesn't define f, so MRO lookup goes to B
• B.f returns "B", so D().f() returns "B"

Comment ça fonctionne :
1. D().f() → look for f in D → not found
2. MRO: D → B → object
3. Found f in B → calls B.f(self) → returns "B"
4. A is irrelevant — D doesn't inherit from A

Exemple :
class A:
    def f(self): return "A"
class B:
    def f(self): return "B"
class C(A):
    def f(self): return "C"
class D(B): pass

D().f()  # "B" (inherits from B)
C().f()  # "C" (overrides A.f)
A().f()  # "A" (direct)
B().f()  # "B" (direct)

The inheritance hierarchy determines which methods are available to each class.`,
  2583: `When a classmethod is inherited and called on a subclass, the cls parameter is bound to the subclass, not the class that defined the method.

Concepts clés :
• @classmethod makes cls the first parameter instead of self
• cls is the class the method was CALLED on, not DEFINED in
• B.who() → cls = B (not A)
• This enables polymorphic class methods

Comment ça fonctionne :
1. B.who() calls the inherited classmethod
2. cls is bound to B (the calling class)
3. cls.__name__ → "B"
4. Returns "B"

Exemple :
class A:
    @classmethod
    def who(cls):
        return cls.__name__
class B(A): pass
class C(A): pass

A.who()  # "A"
B.who()  # "B"
C.who()  # "C"

This is crucial for factory methods where the class method needs to create instances of the correct subclass.`,
  2584: `Factory classmethods that use cls() instead of a hardcoded class name automatically create the correct subclass instance. This is a key pattern for polymorphic object creation.

Concepts clés :
• cls() creates an instance of whatever class cls refers to
• B.create() → cls = B → cls() = B() → returns a B instance
• If create used A() instead of cls(), it would always return an A
• This is the factory method pattern

Comment ça fonctionne :
1. B.create() → cls = B
2. cls() → B() → creates a B instance
3. type(B.create()) → <class 'B'>
4. .__name__ → "B"

Exemple :
class Shape:
    @classmethod
    def create(cls):
        return cls()
class Circle(Shape): pass
class Square(Shape): pass

type(Circle.create())  # Circle (not Shape!)
type(Square.create())  # Square (not Shape!)

Anti-pattern (casse l'héritage) :
class Shape:
    @classmethod
    def create(cls):
        return Shape()  # Always returns Shape, not subclass!`,
  2585: `Combining factory classmethods with isinstance confirms that the factory correctly produces subclass instances.

Concepts clés :
• B.create() → cls = B → cls() = B() → B instance
• isinstance(B_instance, B) → True
• isinstance(B_instance, A) → also True (B is a subclass of A)
• The factory produces the right type because it uses cls()

Comment ça fonctionne :
1. B.create() → B() (B instance created via cls())
2. isinstance(B(), B) → True (direct instance)
3. Returns True

Exemple :
obj = B.create()
isinstance(obj, B)       # True (it's a B)
isinstance(obj, A)       # True (B is a subclass of A)
isinstance(obj, object)  # True (everything inherits from object)
type(obj) is B           # True (exact type check)

Factory classmethods preserve the type hierarchy — objects created via create() participate correctly in isinstance checks.`,
  2586: `When a subclass overrides __init__ without calling super().__init__(), the parent's initialization code never runs. Any attributes the parent would set are missing.

Concepts clés :
• B overrides __init__ but doesn't call super().__init__()
• A.__init__ (which sets self.x = 1) is never executed
• b only has y (défini par B.__init__), not x
• hasattr(b, "x") → False because x was never created

Comment ça fonctionne :
1. B() calls B.__init__(self)
2. B.__init__ only sets self.y = 2
3. A.__init__ is NOT called (no super().__init__())
4. self.x is never created
5. hasattr(b, "x") → False

Exemple :
b = B()
b.y        # 2 (défini par B.__init__)
b.x        # AttributeError! (A.__init__ never ran)
hasattr(b, "x")  # False
hasattr(b, "y")  # True

Corrigé : call super().__init__() in B.__init__ to ensure parent initialization runs.`,
  2587: `Calling super().__init__() ensures the parent's initialization runs, setting up all parent attributes before the subclass adds its own.

Concepts clés :
• super().__init__() delegates to A.__init__
• A.__init__ sets self.x = 1
• Then B.__init__ continues and sets self.y = 2
• Both attributes are available on the instance

Comment ça fonctionne :
1. B() calls B.__init__(self)
2. super().__init__() → calls A.__init__(self) → self.x = 1
3. self.y = 2
4. b now has both x and y
5. (b.x, b.y) → (1, 2)

Exemple :
class Base:
    def __init__(self):
        self.base_attr = "from base"
class Child(Base):
    def __init__(self):
        super().__init__()  # MUST call super
        self.child_attr = "from child"
c = Child()
c.base_attr   # "from base"
c.child_attr  # "from child"

Bonne pratique : always call super().__init__() unless you have a specific reason not to.`,
  2588: `When a parent class hardcodes its class name in __repr__, subclasses inherit that hardcoded representation, which can be misleading.

Concepts clés :
• B inherits __repr__ from A
• A.__repr__ always returns the literal string "A()"
• It doesn't check the actual type — it's hardcoded
• repr(B()) calls A.__repr__ → "A()"

Comment ça fonctionne :
1. B() creates a B instance
2. repr(B()) looks for __repr__ → finds A.__repr__ (inherited)
3. A.__repr__ returns "A()" — hardcoded string
4. Returns "A()" even though the object is a B

Exemple :
repr(A())  # "A()"
repr(B())  # "A()" — incorrect for B!

This is why polymorphic __repr__ implementations use type(self).__name__ instead of hardcoding the class name.`,
  2589: `Using type(self).__name__ in __repr__ makes it automatically correct for all subclasses. This is the recommended pattern.

Concepts clés :
• type(self).__name__ returns the actual runtime class name
• For B(), type(self).__name__ is "B"
• f"{type(self).__name__}()" → "B()"
• This works correctly for A, B, and any future subclass

Comment ça fonctionne :
1. B() creates a B instance
2. repr(B()) → calls inherited __repr__
3. type(self) → <class 'B'>
4. type(self).__name__ → "B"
5. f"B()" → "B()"

Exemple :
repr(A())  # "A()" — correct
repr(B())  # "B()" — correct
class C(B): pass
repr(C())  # "C()" — correct for all subclasses!

Bonne pratique : Always use type(self).__name__ or self.__class__.__name__ in __repr__ for subclass-safe representations.`,
  2590: `When __eq__ uses isinstance, it accepts both instances of the class AND instances of any subclass.

Concepts clés :
• A.__eq__ checks isinstance(other, A)
• B is a subclass of A, so B() is an instance of A
• isinstance(B(), A) → True
• Therefore A() == B() → True

Comment ça fonctionne :
1. A() == B() calls A().__eq__(B())
2. isinstance(B(), A) → True (B is a subclass of A)
3. Returns True

Exemple :
class A:
    def __eq__(self, other):
        return isinstance(other, A)
class B(A): pass
A() == A()  # True
A() == B()  # True (B is an A)
A() == 42   # False (42 is not an A)

This is a common pattern for equality in class hierarchies — two objects are "equal" if they belong to the same family.`,
  2591: `B inherits __eq__ from A, so the same isinstance check applies. A() is trivially an instance of A.

Concepts clés :
• B() == A() calls B().__eq__(A())
• B inherits __eq__ from A
• isinstance(A(), A) → True (A is an instance of itself)
• Returns True

Comment ça fonctionne :
1. B() == A() → B().__eq__(A())
2. B doesn't override __eq__, so A.__eq__ is used
3. isinstance(A(), A) → True
4. Returns True

Vérification de symétrie :
A() == B()  # True (B is instance of A)
B() == A()  # True (A is instance of A)
Both return True — equality is symmetric here.

Note : If B overrode __eq__ with different logic, symmetry could break — A() == B() might differ from B() == A(). Maintaining symmetry in __eq__ is important for correctness.`,
  2592: `__init_subclass__ can accept keyword arguments passed in the class definition line. This allows customizable subclass registration.

Concepts clés :
• class B(A, greeting="hi") passes greeting="hi" to __init_subclass__
• __init_subclass__ receives it as the greeting parameter
• cls.greeting = greeting sets B.greeting = "hi"
• The default is "hello" for subclasses that don't pass greeting

Comment ça fonctionne :
1. class B(A, greeting="hi"): triggers A.__init_subclass__(cls=B, greeting="hi")
2. cls.greeting = "hi" → B.greeting = "hi"
3. B.greeting → "hi"

Exemple :
class B(A, greeting="hi"): pass
class C(A): pass  # uses default greeting="hello"
class D(A, greeting="hey"): pass

B.greeting  # "hi"
C.greeting  # "hello" (default)
D.greeting  # "hey"

Usages courants :
• Configuring subclass behavior at definition time
• Plugin registration with parameters
• Framework configuration via class keywords`,
  2593: `Python looks up methods through the class at call time, not at instance creation time. Changing a method on the class affects all existing and future instances.

Concepts clés :
• a.method() looks up method via type(a) (which is A) at CALL time
• A.method is replaced with a new lambda after a is created
• When a.method() runs, it finds the NEW lambda on A
• This is called "monkey-patching"

Comment ça fonctionne :
1. A.method initially returns 1
2. a = A() creates an instance
3. A.method = lambda self: 2 replaces the method on A
4. a.method() → looks up A.method → finds lambda → returns 2

Exemple :
class A:
    def method(self): return 1
a = A()
a.method()  # 1

A.method = lambda self: 2
a.method()  # 2 (resolved at call time!)

b = A()
b.method()  # 2 (also gets the new method)

This works because Python's method lookup is dynamic — it checks the class __dict__ every time the method is accessed.`,
  2594: `Assigning a function directly to an instance attribute creates a regular attribute (not a bound method) that shadows the class method in the lookup order.

Concepts clés :
• a.method = lambda: 2 stores a function in a.__dict__
• Instance attributes are checked BEFORE class attributes in lookup
• The lambda doesn't take self because it's a plain function, not a descriptor
• A.method still exists and works for other instances

Comment ça fonctionne :
1. A.method is a regular method (takes self)
2. a.method = lambda: 2 creates an instance attribute
3. a.method() → checks a.__dict__ first → finds the lambda → calls it
4. The lambda takes no args (no self) → returns 2

Exemple :
class A:
    def method(self): return 1
a = A()
b = A()
a.method = lambda: 2  # only affects a
a.method()  # 2 (instance attribute)
b.method()  # 1 (class method — b is unaffected)

Important: the instance attribute is a plain function, not a bound method. It doesn't receive self automatically.`,
  2595: `a.__class__ returns the class of the instance, which is the same object as A. Modifying attributes through a.__class__ is identical to modifying them directly on A.

Concepts clés :
• a.__class__ returns A (the class object itself)
• a.__class__ is A → True (same object)
• a.__class__.x = 2 is literally A.x = 2
• All instances of A see the change

Comment ça fonctionne :
1. a.__class__ → A
2. a.__class__.x = 2 → A.x = 2
3. A.x → 2

Exemple :
class A: x = 1
a = A()
b = A()
a.__class__.x = 2  # same as A.x = 2
A.x   # 2
b.x   # 2 (all instances see the class attribute change)

Note : This is different from a.x = 2, which creates an instance attribute on a only. a.__class__.x = 2 modifies the class itself.`,
  2596: `__mro__ (Method Resolution Order) is a tuple of all classes in the lookup chain. You can use 'in' to check if a class appears in another class's MRO.

Concepts clés :
• B.__mro__ → (B, A, object)
• A is in this tuple → True
• The MRO includes the class itself, all ancestors, and object
• 'in' performs a membership check on the tuple

Comment ça fonctionne :
1. B.__mro__ → (<class 'B'>, <class 'A'>, <class 'object'>)
2. A in (B, A, object) → True
3. Returns True

Exemple :
class A: pass
class B(A): pass
B.__mro__          # (B, A, object)
A in B.__mro__     # True
B in B.__mro__     # True
object in B.__mro__  # True
B in A.__mro__     # False (B is not an ancestor of A)

issubclass(B, A) is essentially equivalent to A in B.__mro__.`,
  2597: `In Python 3, every class implicitly inherits from object. This means object is always present at the end of every class's MRO.

Concepts clés :
• All classes inherit from object (even if not explicitly stated)
• class A: pass is equivalent to class A(object): pass
• object provides default __init__, __repr__, __eq__, __hash__, etc.
• object is always the last entry in __mro__

Comment ça fonctionne :
1. B.__mro__ → (B, A, object)
2. object in (B, A, object) → True
3. Returns True

Exemple :
class X: pass
X.__mro__           # (X, object)
object in X.__mro__  # True

class Y(X): pass
Y.__mro__           # (Y, X, object)
object in Y.__mro__  # True

int.__mro__          # (int, object)
str.__mro__          # (str, object)

Even built-in types have object at the end of their MRO.`,
  2598: `This is the Template Method design pattern. The parent defines the skeleton of an algorithm (__str__), and subclasses provide specific steps (to_string).

Concepts clés :
• Printable.__str__ calls self.to_string()
• self is a Report instance → Python looks up to_string on Report
• Report.to_string returns "Report"
• The parent defines WHAT to do (__str__), the child defines HOW (to_string)

Comment ça fonctionne :
1. str(Report()) calls Report().__str__()
2. __str__ is inherited from Printable
3. self.to_string() → self is Report instance
4. MRO finds Report.to_string → returns "Report"
5. __str__ returns "Report"

Exemple :
class Printable:
    def __str__(self):
        return self.to_string()
class Report(Printable):
    def to_string(self): return "Report"
class Invoice(Printable):
    def to_string(self): return "Invoice #123"

str(Report())   # "Report"
str(Invoice())  # "Invoice #123"

The Template Method pattern allows the parent to define the algorithm structure while deferring specific steps to subclasses.`,
  2599: `With multiple inheritance, __bases__ contains ALL direct parent classes in the order they were specified.

Concepts clés :
• class C(A, B) inherits from both A and B
• C.__bases__ → (<class 'A'>, <class 'B'>)
• The order matches the class definition order
• len(C.__bases__) → 2

Comment ça fonctionne :
1. class C(A, B): defines C with two parents
2. C.__bases__ → (A, B)
3. len((A, B)) → 2

Exemple :
class A: pass
class B: pass
class C(A, B): pass
C.__bases__    # (<class 'A'>, <class 'B'>)
len(C.__bases__)  # 2

class D(A): pass
D.__bases__    # (<class 'A'>,)
len(D.__bases__)  # 1

The MRO for C(A, B):
C.__mro__  # (C, A, B, object) — linearized order for method lookup`,
  2600: `type is Python's metaclass — the class of all classes. Even type itself inherits from object, creating a fascinating circular relationship at the foundation of Python's type system.

Concepts clés :
• type.__mro__ → (<class 'type'>, <class 'object'>)
• type inherits from object (type is an object)
• type(object) is type (object's class is type)
• This circular relationship is bootstrapped by the Python interpreter

Comment ça fonctionne :
1. type.__mro__ → (type, object)
2. len((type, object)) → 2

La relation type/object :
• isinstance(type, object) → True (type is an object)
• isinstance(object, type) → True (object is a type)
• type(type) is type → True (type is its own metaclass)
• type(object) is type → True

Exemple :
type.__mro__     # (<class 'type'>, <class 'object'>)
type.__bases__   # (<class 'object'>,)
object.__bases__ # () — object has no parent

This is the foundation of Python's object model — everything is an object, and type is the metaclass that creates classes.`,
  2601: `Abstract classes that contain @abstractmethod methods cannot be instantiated directly. Attempting to do so raises TypeError because the abstract method area() has not been implemented in a concrete subclass.

Concepts clés :
• ABC marks a class as abstract
• @abstractmethod marks methods that MUST be overridden
• Instantiating a class with unimplemented abstract methods raises TypeError
• You must create a subclass that implements all abstract methods

Comment ça fonctionne :
• Shape inherits from ABC and declares area() as abstract
• Shape() tries to create an instance
• Python checks __abstractmethods__ and finds area() is not implemented
• Raises TypeError: "Can't instantiate abstract class Shape with abstract method area"

Exemple :
>>> from abc import ABC, abstractmethod
>>> class Shape(ABC):
...     @abstractmethod
...     def area(self): pass
>>> Shape()
TypeError: Can't instantiate abstract class Shape with abstract method area`,
  2602: `When a subclass implements all abstract methods from its ABC parent, it becomes a concrete class that can be instantiated normally.

Concepts clés :
• Circle inherits from Shape (which is abstract)
• Circle provides a concrete implementation of area()
• Since all abstract methods are implemented, Circle can be instantiated
• Calling area() returns 3.14

Comment ça fonctionne :
• Shape declares area() as @abstractmethod
• Circle overrides area() with a concrete implementation returning 3.14
• Circle() succeeds because no abstract methods remain unimplemented
• Circle().area() calls the concrete implementation, returning 3.14

Exemple :
>>> Circle().area()
3.14`,
  2603: `Abstract classes can absolutely contain concrete (non-abstract) methods alongside abstract ones. This is one of the key design benefits of ABCs — they can provide shared implementations that subclasses inherit.

Concepts clés :
• ABCs can have both abstract and concrete methods
• Concrete methods in ABCs work just like regular methods
• Subclasses inherit concrete methods without needing to override them
• Only abstract methods must be overridden before instantiation

Comment ça fonctionne :
• You mark only the methods that MUST be overridden with @abstractmethod
• Other methods are regular concrete methods
• Subclasses get the concrete methods for free via inheritance
• This pattern is called the Template Method design pattern

Exemple :
>>> class Shape(ABC):
...     @abstractmethod
...     def area(self): pass
...     def describe(self):
...         return "I am a shape"
>>> class Circle(Shape):
...     def area(self): return 3.14
>>> Circle().describe()
'I am a shape'`,
  2604: `The concrete method describe() is defined in the abstract class Shape. Since Circle implements the required abstract method area(), it can be instantiated, and it inherits describe() from Shape.

Concepts clés :
• Shape has one abstract method (area) and one concrete method (describe)
• Circle implements area(), satisfying the ABC contract
• Circle inherits describe() without overriding it
• Calling Circle().describe() invokes Shape's describe()

Comment ça fonctionne :
• Circle() creates an instance (all abstract methods implemented)
• Circle().describe() looks for describe in Circle — not found
• Python follows MRO to Shape, finds describe() there
• Returns "I am a shape"

Exemple :
>>> Circle().describe()
'I am a shape'`,
  2605: `Abstract classes can define __init__ just like any other class. Subclasses can (and should) call the parent's __init__ via super().__init__() to ensure proper initialization.

Concepts clés :
• ABCs can have __init__ with initialization logic
• Subclasses call super().__init__() to run the parent init
• __init__ is NOT automatically abstract — it's a regular method
• The ABC still can't be instantiated directly if it has abstract methods

Comment ça fonctionne :
• Define __init__ in the ABC like any normal class
• In the subclass __init__, call super().__init__()
• The parent __init__ runs, setting up shared attributes
• The subclass can then add its own initialization

Exemple :
>>> class Animal(ABC):
...     def __init__(self, name):
...         self.name = name
...     @abstractmethod
...     def speak(self): pass
>>> class Dog(Animal):
...     def __init__(self, name, breed):
...         super().__init__(name)
...         self.breed = breed
...     def speak(self): return "Woof"
>>> d = Dog("Rex", "Lab")
>>> d.name
'Rex'`,
  2606: `If an ABC defines multiple abstract methods, a subclass must implement ALL of them to be concrete. Missing even one abstract method means the subclass is still abstract.

Concepts clés :
• A defines two abstract methods: f() and g()
• B only implements f(), leaving g() unimplemented
• B is still abstract because g() remains unimplemented
• B() raises TypeError

Comment ça fonctionne :
• A.__abstractmethods__ = frozenset({'f', 'g'})
• B implements f(), so B.__abstractmethods__ = frozenset({'g'})
• Since B still has abstract methods, B() raises TypeError
• Error: "Can't instantiate abstract class B with abstract method g"

Exemple :
>>> B()
TypeError: Can't instantiate abstract class B with abstract method g`,
  2607: `When all abstract methods are implemented, the subclass becomes concrete and can be instantiated normally.

Concepts clés :
• A defines two abstract methods: f() and g()
• B implements both f() and g()
• B has no remaining abstract methods, so it's concrete
• B() succeeds and B().f() returns 1

Comment ça fonctionne :
• B overrides f() to return 1 and g() to return 2
• B.__abstractmethods__ = frozenset() (empty — all implemented)
• B() creates an instance successfully
• B().f() calls B's f(), which returns 1

Exemple :
>>> B().f()
1
>>> B().g()
2`,
  2608: `An @abstractmethod can have a body — it's not just a placeholder. Subclasses must still override the method, but they can call the parent's implementation via super().

Concepts clés :
• @abstractmethod can contain actual implementation code
• Subclasses MUST still override the method (it's still abstract)
• Subclasses can call the parent implementation via super().method()
• This provides a default or partial implementation pattern

Comment ça fonctionne :
• Define the abstract method with a body (not just pass)
• Subclass overrides the method (required)
• Subclass can optionally call super().method() to run the parent body
• Useful for providing base behavior that subclasses extend

Exemple :
>>> class A(ABC):
...     @abstractmethod
...     def f(self):
...         return "base"
>>> class B(A):
...     def f(self):
...         return super().f() + " extended"
>>> B().f()
'base extended'`,
  2609: `The abstract method f() in A has a body that returns "base". B overrides f() and calls super().f() to access the parent's implementation, then appends " extended".

Concepts clés :
• A.f() is abstract but has a body returning "base"
• B.f() overrides A.f() (required since it's abstract)
• B.f() calls super().f() to get "base" from the parent
• Concatenation produces "base extended"

Comment ça fonctionne :
• B() creates instance (f is implemented)
• B().f() calls B's f()
• super().f() invokes A.f() which returns "base"
• "base" + " extended" = "base extended"

Exemple :
>>> B().f()
'base extended'`,
  2610: `You can combine @property with @abstractmethod to create an abstract property. The class cannot be instantiated until a subclass provides a concrete implementation of the property.

Concepts clés :
• @property and @abstractmethod can be stacked
• @property must come BEFORE @abstractmethod (outermost decorator)
• The class with an abstract property cannot be instantiated
• Subclasses must implement the property with @property

Comment ça fonctionne :
• A defines x as an abstract property
• A.__abstractmethods__ includes 'x'
• A() raises TypeError because x is not implemented
• A subclass must define x as a @property to be concrete

Exemple :
>>> class B(A):
...     @property
...     def x(self):
...         return 42
>>> B().x
42`,
  2611: `To create an abstract class method, stack @classmethod on top of @abstractmethod. The outermost decorator should be @classmethod.

Concepts clés :
• @classmethod must be the outermost (top) decorator
• @abstractmethod must be the innermost (bottom) decorator
• This forces subclasses to implement a classmethod
• The subclass implementation should also use @classmethod

Comment ça fonctionne :
• @classmethod wraps @abstractmethod
• The method is both abstract (must be overridden) and a classmethod (receives cls)
• Subclasses must override with their own @classmethod
• Instantiation fails until the abstract classmethod is implemented

Exemple :
>>> class A(ABC):
...     @classmethod
...     @abstractmethod
...     def create(cls): pass
>>> class B(A):
...     @classmethod
...     def create(cls):
...         return cls()
>>> B.create()
<B object>`,
  2612: `To create an abstract static method, stack @staticmethod on top of @abstractmethod. The outermost decorator should be @staticmethod.

Concepts clés :
• @staticmethod must be the outermost (top) decorator
• @abstractmethod must be the innermost (bottom) decorator
• This forces subclasses to implement a staticmethod
• The subclass implementation should also use @staticmethod

Comment ça fonctionne :
• @staticmethod wraps @abstractmethod
• The method is both abstract and static (no self or cls)
• Subclasses must override with their own @staticmethod
• Instantiation fails until the abstract staticmethod is implemented

Exemple :
>>> class A(ABC):
...     @staticmethod
...     @abstractmethod
...     def validate(data): pass
>>> class B(A):
...     @staticmethod
...     def validate(data):
...         return len(data) > 0
>>> B.validate([1, 2])
True`,
  2613: `Abstract classes can inherit from other abstract classes, creating a chain of abstraction. Each level can add new abstract methods, and only the final concrete class must implement all of them.

Concepts clés :
• ABC can inherit from another ABC
• Abstract methods accumulate through the chain
• The child ABC can add its own abstract methods
• Only the final concrete subclass must implement ALL abstract methods

Comment ça fonctionne :
• class A(ABC): @abstractmethod def f(): ...
• class B(A): @abstractmethod def g(): ... — B is also abstract
• B inherits f() from A and adds g()
• class C(B): must implement both f() and g()

Exemple :
>>> class A(ABC):
...     @abstractmethod
...     def f(self): pass
>>> class B(A):
...     @abstractmethod
...     def g(self): pass
>>> class C(B):
...     def f(self): return 1
...     def g(self): return 2
>>> C().f()
1`,
  2614: `In a chain of abstract classes, the final concrete class must implement all accumulated abstract methods from the entire hierarchy.

Concepts clés :
• A defines abstract method f()
• B inherits from A and adds abstract method g()
• C must implement both f() and g() to be concrete
• C implements both, so it can be instantiated

Comment ça fonctionne :
• C.__abstractmethods__ would be frozenset() (all implemented)
• C() creates an instance successfully
• C().f() calls C's implementation of f(), returning 1

Exemple :
>>> C().f()
1
>>> C().g()
2`,
  2615: `ABC is a helper class that uses ABCMeta as its metaclass. Writing class Shape(ABC) and class Shape(metaclass=ABCMeta) are functionally equivalent.

Concepts clés :
• ABC is defined as: class ABC(metaclass=ABCMeta)
• Using metaclass=ABCMeta is the older, more explicit way
• Inheriting from ABC is the modern, recommended approach
• Both produce the same result: a class that supports @abstractmethod

Comment ça fonctionne :
• ABCMeta is the metaclass that enables abstract method checking
• ABC is a convenience class with ABCMeta already set
• class Shape(ABC) is shorthand for class Shape(metaclass=ABCMeta)
• Both allow @abstractmethod declarations and prevent instantiation of incomplete subclasses

Exemple :
>>> from abc import ABC, ABCMeta
>>> class A(ABC): pass
>>> class B(metaclass=ABCMeta): pass
>>> type(A)
<class 'abc.ABCMeta'>
>>> type(B)
<class 'abc.ABCMeta'>`,
  2616: `The ABC class is defined with ABCMeta as its metaclass. This is what gives ABC (and its subclasses) the ability to track and enforce abstract methods.

Concepts clés :
• ABC is a class with metaclass=ABCMeta
• ABCMeta is the actual metaclass that does the heavy lifting
• ABCMeta tracks __abstractmethods__ on each class
• ABCMeta prevents instantiation when abstract methods exist

Comment ça fonctionne :
• ABCMeta.__new__ checks for @abstractmethod decorators
• It collects them into __abstractmethods__ (a frozenset)
• On instantiation, ABCMeta.__call__ checks if __abstractmethods__ is non-empty
• If non-empty, raises TypeError

Exemple :
>>> from abc import ABC, ABCMeta
>>> type(ABC)
<class 'abc.ABCMeta'>
>>> ABC.__class__
<class 'abc.ABCMeta'>`,
  2617: `A class that inherits from ABC but defines no @abstractmethod methods is technically concrete and can be instantiated. The ABC base class alone doesn't prevent instantiation — only unimplemented abstract methods do.

Concepts clés :
• Inheriting from ABC doesn't automatically make a class abstract
• Only @abstractmethod methods prevent instantiation
• A class with ABC but no abstract methods is concrete
• A.__abstractmethods__ is frozenset() (empty)

Comment ça fonctionne :
• class A(ABC): pass — no abstract methods declared
• A.__abstractmethods__ is empty
• A() succeeds because there are no unimplemented abstract methods
• The instance is a regular object of type A

Exemple :
>>> from abc import ABC
>>> class A(ABC): pass
>>> a = A()
>>> isinstance(a, A)
True`,
  2618: `The __abstractmethods__ attribute is a frozenset containing the names of all abstract methods that haven't been implemented. Python uses this to decide whether a class can be instantiated.

Concepts clés :
• __abstractmethods__ is automatically maintained by ABCMeta
• It's a frozenset (immutable set) of method name strings
• If non-empty, the class cannot be instantiated
• When a subclass implements a method, it's removed from the set

Comment ça fonctionne :
• ABCMeta scans for @abstractmethod-decorated methods
• Collects their names into __abstractmethods__
• A has f() as abstract, so A.__abstractmethods__ = frozenset({'f'})
• A concrete subclass implementing f() would have frozenset() (empty)

Exemple :
>>> A.__abstractmethods__
frozenset({'f'})
>>> class B(A):
...     def f(self): return 1
>>> B.__abstractmethods__
frozenset()`,
  2619: `The register() method makes a class a "virtual subclass" of the ABC. This means isinstance() and issubclass() will return True, but no actual inheritance of methods or attributes occurs.

Concepts clés :
• register() creates a virtual subclass relationship
• No actual method inheritance happens
• isinstance() and issubclass() checks pass
• The registered class doesn't need to implement abstract methods

Comment ça fonctionne :
• MyABC.register(list) tells Python that list is a virtual subclass of MyABC
• isinstance([], MyABC) returns True
• issubclass(list, MyABC) returns True
• But list doesn't actually get any MyABC methods

Exemple :
>>> MyABC.register(list)
>>> isinstance([], MyABC)
True
>>> issubclass(list, MyABC)
True`,
  2620: `After calling MyABC.register(int), the int type becomes a virtual subclass of MyABC. This makes isinstance(42, MyABC) return True even though int doesn't actually inherit from MyABC.

Concepts clés :
• register() creates a virtual subclass relationship
• isinstance() checks include virtual subclasses
• 42 is an int, and int is a virtual subclass of MyABC
• So isinstance(42, MyABC) returns True

Comment ça fonctionne :
• MyABC.register(int) registers int as virtual subclass
• isinstance(42, MyABC) checks: is 42 an instance of MyABC?
• Python checks actual inheritance — no
• Python checks virtual subclass registry — yes (int is registered)
• Returns True

Exemple :
>>> MyABC.register(int)
>>> isinstance(42, MyABC)
True
>>> issubclass(int, MyABC)
True`,
  2621: `Virtual subclasses (created via register()) only affect isinstance() and issubclass() checks. They do NOT create actual inheritance — no methods or attributes are inherited.

Concepts clés :
• Virtual subclasses pass isinstance() checks — True
• Virtual subclasses pass issubclass() checks — True
• Virtual subclasses do NOT inherit any methods
• Virtual subclasses do NOT inherit any attributes
• There is no actual MRO (method resolution order) connection

Comment ça fonctionne :
• register() adds the class to the ABC's virtual subclass registry
• isinstance/issubclass use __subclasshook__ or the registry to check
• But Python's method resolution (MRO) is unchanged
• The virtual subclass cannot call methods from the ABC

Exemple :
>>> class MyABC(ABC):
...     def greet(self): return "hello"
>>> MyABC.register(int)
>>> isinstance(42, MyABC)
True
>>> (42).greet()
AttributeError: 'int' object has no attribute 'greet'`,
  2622: `The Sized ABC from collections.abc requires a __len__ method. Since list implements __len__, isinstance([], Sized) returns True.

Concepts clés :
• Sized is an ABC that requires __len__
• list has __len__ (len([]) works)
• isinstance checks if the object's class implements the required methods
• Uses __subclasshook__ for structural checking

Comment ça fonctionne :
• Sized defines __subclasshook__ that checks for __len__
• list has __len__, so the check passes
• isinstance([], Sized) returns True
• This is an example of structural checking built into ABCs

Exemple :
>>> from collections.abc import Sized
>>> isinstance([], Sized)
True
>>> isinstance("hello", Sized)
True
>>> isinstance(42, Sized)
False`,
  2623: `The Iterable ABC from collections.abc requires an __iter__ method. Since str implements __iter__, isinstance("hello", Iterable) returns True.

Concepts clés :
• Iterable is an ABC that requires __iter__
• str has __iter__ (you can iterate over characters)
• isinstance checks if the object's class has __iter__
• Uses __subclasshook__ for structural checking

Comment ça fonctionne :
• Iterable defines __subclasshook__ that checks for __iter__
• str has __iter__, so the check passes
• isinstance("hello", Iterable) returns True
• Any object with __iter__ is considered Iterable

Exemple :
>>> from collections.abc import Iterable
>>> isinstance("hello", Iterable)
True
>>> isinstance([1, 2], Iterable)
True
>>> isinstance(42, Iterable)
False`,
  2624: `The Hashable ABC requires a __hash__ method. Lists explicitly set __hash__ = None (because they are mutable), so isinstance([], Hashable) returns False.

Concepts clés :
• Hashable requires __hash__ to be implemented (and not None)
• Mutable types like list set __hash__ = None
• This prevents them from being used as dictionary keys or set elements
• isinstance checks both the presence AND non-None-ness of __hash__

Comment ça fonctionne :
• Hashable.__subclasshook__ checks if __hash__ is not None
• list.__hash__ is None (explicitly disabled)
• isinstance([], Hashable) returns False
• Immutable types like tuple, str, int are Hashable

Exemple :
>>> from collections.abc import Hashable
>>> isinstance([], Hashable)
False
>>> isinstance({}, Hashable)
False
>>> isinstance((), Hashable)
True`,
  2625: `The Hashable ABC requires a __hash__ method. Tuples are immutable and have __hash__ implemented, so isinstance((1, 2), Hashable) returns True.

Concepts clés :
• Tuples are immutable, so they can be hashed
• tuple.__hash__ is implemented (not None)
• isinstance((1, 2), Hashable) returns True
• This is why tuples can be dictionary keys but lists cannot

Comment ça fonctionne :
• Hashable.__subclasshook__ checks for __hash__
• tuple.__hash__ exists and is not None
• isinstance((1, 2), Hashable) returns True
• Note : a tuple containing unhashable items (like lists) will raise TypeError at hash time, but the isinstance check still passes

Exemple :
>>> from collections.abc import Hashable
>>> isinstance((1, 2), Hashable)
True
>>> isinstance("hello", Hashable)
True
>>> hash((1, 2))
-3550055125485641917`,
  2626: `typing.Protocol defines structural interfaces for Python's type system. A class satisfies a Protocol if it has the required methods/attributes, regardless of whether it explicitly inherits from the Protocol.

Concepts clés :
• Protocol enables structural subtyping (duck typing for type checkers)
• No explicit inheritance needed — just matching method signatures
• Introduced in Python 3.8 (PEP 544)
• Used primarily for static type checking with mypy, pyright, etc.

Comment ça fonctionne :
• Define a Protocol class with required method signatures
• Any class with matching methods is considered a subtype
• Type checkers verify structural conformance
• No runtime inheritance relationship required

Exemple :
>>> from typing import Protocol
>>> class Drawable(Protocol):
...     def draw(self) -> str: ...
>>> class Circle:
...     def draw(self) -> str:
...         return "circle"
>>> def render(shape: Drawable):
...     return shape.draw()
>>> render(Circle())
'circle'`,
  2627: `Protocol uses structural subtyping, which means compatibility is determined by the structure of a class (its methods and attributes) rather than its inheritance hierarchy.

Concepts clés :
• Structural subtyping: "if it has the right methods, it matches"
• Based on duck typing philosophy
• No inheritance required
• Checked by static type checkers (mypy, pyright)

Comment ça fonctionne :
• A Protocol defines required methods/attributes
• Any class with those methods/attributes is structurally compatible
• The type checker verifies the match without requiring inheritance
• This is the opposite of nominal subtyping (used by ABC)

Exemple :
• Protocol Drawable requires draw() -> str
• class Sprite has draw() -> str
• Sprite is structurally compatible with Drawable
• No need for class Sprite(Drawable)`,
  2628: `ABC uses nominal subtyping, which means compatibility is determined by the explicit inheritance hierarchy, not by the methods a class happens to have.

Concepts clés :
• Nominal subtyping: "you must explicitly inherit to be a subtype"
• Based on class declarations, not structure
• class Child(Parent) explicitly declares the relationship
• Used by ABC (Abstract Base Class)

Comment ça fonctionne :
• ABC defines abstract methods that must be overridden
• A class must explicitly inherit from the ABC to be considered a subtype
• Even if a class has all the right methods, it's not a subtype without inheriting
• isinstance/issubclass checks require actual or registered inheritance

Comparaison :
• ABC (nominal): class Circle(Shape) required
• Protocol (structural): just having the right methods is enough
• ABC enforces "is-a" relationships explicitly
• Protocol checks "has-a" structure implicitly`,
  2629: `Sprite is considered a Drawable by static type checkers because it has a draw() method with a matching signature. This is structural subtyping — no inheritance required.

Concepts clés :
• Drawable Protocol requires a draw() -> str method
• Sprite has draw() -> str (matches the signature)
• Type checkers see Sprite as compatible with Drawable
• No explicit inheritance (class Sprite(Drawable)) needed

Comment ça fonctionne :
• Static type checker compares Sprite's methods to Drawable's requirements
• Sprite has draw(self) -> str, matching Drawable's requirement
• Type checker accepts Sprite wherever Drawable is expected
• This is the essence of structural subtyping

Exemple :
>>> def render(shape: Drawable) -> str:
...     return shape.draw()
>>> render(Sprite())  # Type checker accepts this
'sprite'`,
  2630: `This demonstrates that Sprite works on its own with its draw() method. When combined with a Protocol, any function expecting a Drawable can accept Sprite without inheritance.

Concepts clés :
• Sprite has a draw() method that returns "sprite"
• No ABC or Protocol inheritance needed for the method to work
• This is standard Python duck typing
• Protocol formalizes this for static type checkers

Comment ça fonctionne :
• Sprite() creates an instance
• .draw() calls the draw method
• Returns "sprite"
• If a Protocol Drawable exists with draw(), Sprite matches it structurally

Exemple :
>>> Sprite().draw()
'sprite'`,
  2631: `Protocol does NOT require a class to explicitly inherit from it. Unlike ABC where you write class Child(MyABC), with Protocol a class just needs to have the right methods and attributes.

Concepts clés :
• No need for class MyClass(MyProtocol)
• Just having matching methods is sufficient
• This is what makes it "structural" subtyping
• Contrasts with ABC's "nominal" subtyping

Comment ça fonctionne :
• Protocol defines required interface (methods/attributes)
• Any class with matching methods is compatible
• No inheritance declaration needed
• Type checker verifies the match purely by structure

Exemple :
• Protocol requires draw() -> str
• class Sprite: def draw(self) -> str: ... — compatible!
• class Sprite(Drawable): — NOT required
• Both approaches make Sprite usable where Drawable is expected`,
  2632: `The @runtime_checkable decorator allows Protocol classes to be used with isinstance() at runtime. Since list has __len__, isinstance([1, 2], HasLen) returns True.

Concepts clés :
• @runtime_checkable enables isinstance() checks with Protocol
• Without it, isinstance() with Protocol raises TypeError
• The check verifies method existence (not signatures)
• [1, 2] is a list, and list has __len__

Comment ça fonctionne :
• @runtime_checkable adds __instancecheck__ to HasLen
• isinstance([1, 2], HasLen) checks if list has __len__
• list.__len__ exists, so the check passes
• Returns True

Exemple :
>>> isinstance([1, 2], HasLen)
True
>>> isinstance("hello", HasLen)
True
>>> isinstance(42, HasLen)
False`,
  2633: `By default, Protocol classes cannot be used with isinstance() at runtime. Adding @runtime_checkable enables this capability.

Concepts clés :
• Default Protocol: only for static type checking (mypy, pyright)
• @runtime_checkable: enables isinstance() at runtime
• isinstance() checks only method/attribute existence, not signatures
• Useful for runtime duck-type checking

Comment ça fonctionne :
• @runtime_checkable modifies the Protocol's metaclass behavior
• Adds __instancecheck__ that checks for required attributes
• isinstance(obj, MyProtocol) now works at runtime
• Only checks if methods exist, not their exact signatures

Exemple :
>>> @runtime_checkable
... class Sizeable(Protocol):
...     def __len__(self) -> int: ...
>>> isinstance([], Sizeable)
True
>>> isinstance(42, Sizeable)
False`,
  2634: `Protocol classes without @runtime_checkable cannot be used with isinstance() at runtime. Attempting to do so raises TypeError.

Concepts clés :
• Protocol without @runtime_checkable is for static type checking only
• isinstance() is a runtime check, which Protocol doesn't support by default
• @runtime_checkable must be explicitly added to enable isinstance()
• This is a deliberate design choice to separate static and runtime checking

Comment ça fonctionne :
• MyProto is a Protocol without @runtime_checkable
• isinstance("hello", MyProto) tries a runtime check
• Protocol's __instancecheck__ raises TypeError
• Error: "Protocols with non-method members don't support issubclass()"

Exemple :
>>> isinstance("hello", MyProto)
TypeError: Protocols with non-method members don't support issubclass()`,
  2635: `This Protocol defines a Comparable interface: any class that has a __lt__ method (less-than comparison) is structurally compatible with Comparable.

Concepts clés :
• Protocol defines structural requirements
• Comparable requires __lt__(self, other) -> bool
• int, float, str all have __lt__ — they're all Comparable
• Custom classes with __lt__ are also Comparable

Comment ça fonctionne :
• Type checker looks for __lt__ method on a class
• If present with compatible signature, the class matches Comparable
• No inheritance from Comparable needed
• Works with built-in types and custom classes alike

Exemple :
>>> class Temperature:
...     def __init__(self, value):
...         self.value = value
...     def __lt__(self, other):
...         return self.value < other.value
>>> def minimum(a: Comparable, b: Comparable):
...     return a if a < b else b
>>> minimum(Temperature(20), Temperature(30)).value
20`,
  2636: `Duck typing is a programming concept where an object's suitability is determined by the presence of certain methods and properties, rather than the object's actual type or inheritance.

Concepts clés :
• "If it walks like a duck and quacks like a duck, it's a duck"
• Focus on behavior (methods), not identity (class hierarchy)
• Core philosophy of Python's dynamic type system
• Protocol formalizes duck typing for static type checkers

Comment ça fonctionne :
• Python doesn't check an object's type before calling methods
• If the method exists, it works; if not, you get AttributeError
• This allows different types to be used interchangeably
• As long as they have the right methods, they "quack like a duck"

Exemple :
>>> class Duck:
...     def quack(self): return "Quack!"
>>> class Person:
...     def quack(self): return "I'm quacking!"
>>> def make_quack(thing):
...     return thing.quack()
>>> make_quack(Duck())
'Quack!'
>>> make_quack(Person())
"I'm quacking!"`,
  2637: `Protocol is Python's way of formalizing duck typing for static type checkers. It bridges the gap between Python's dynamic duck typing and static type analysis.

Concepts clés :
• Duck typing: behavior-based, no type declarations needed
• Protocol: declares expected behavior for type checkers
• Brings duck typing benefits to static analysis
• Introduced in PEP 544 (Python 3.8)

Comment ça fonctionne :
• Without Protocol: duck typing works at runtime but type checkers can't verify it
• With Protocol: you declare the expected interface
• Type checkers verify that passed objects match the Protocol
• Runtime behavior is unchanged — still duck typing

Exemple :
• Before Protocol: def process(obj): obj.run() — type checker can't verify
• With Protocol:
>>> class Runnable(Protocol):
...     def run(self) -> None: ...
>>> def process(obj: Runnable) -> None:
...     obj.run()
• Now type checkers verify that arguments to process() have run()`,
  2638: `The Closable Protocol matches any object that has a close() method with a compatible signature. This includes files, database connections, network sockets, and any custom class with close().

Concepts clés :
• Closable requires close(self) -> None
• Files have close() — they match
• Database connections have close() — they match
• Network sockets have close() — they match
• Any custom class with close() also matches

Comment ça fonctionne :
• Protocol defines the structural interface
• Type checker matches any class with close() -> None
• No inheritance from Closable needed
• Very useful for resource management patterns

Exemple :
>>> class MyResource:
...     def close(self) -> None:
...         print("Closed!")
>>> def cleanup(resource: Closable) -> None:
...     resource.close()
>>> cleanup(MyResource())
Closed!
>>> cleanup(open("test.txt"))  # Also works — files have close()`,
  2639: `Protocol can have default implementations in its methods, but only classes that explicitly inherit from the Protocol will receive those defaults. Structurally matched classes won't get them.

Concepts clés :
• Protocol methods can have bodies (default implementations)
• Only classes that explicitly inherit get the defaults
• Structurally matched classes (no inheritance) don't get defaults
• This is a key difference from ABC default methods

Comment ça fonctionne :
• class MyProto(Protocol): def f(self): return "default"
• class A(MyProto): pass — inherits, gets default f()
• class B: def f(self): return "custom" — structural match, own implementation
• class C: pass — no f(), doesn't match Protocol at all

Exemple :
>>> class Greetable(Protocol):
...     def greet(self) -> str:
...         return "Hello!"
>>> class Polite(Greetable):
...     pass
>>> Polite().greet()
'Hello!'`,
  2640: `This is the fundamental difference between Protocol and ABC:
• Protocol: structural subtyping — "does it have the right methods?"
• ABC: nominal subtyping — "does it inherit from the right class?"

Concepts clés :
• Protocol = structural checks (duck typing formalized)
• ABC = nominal checks (inheritance-based)
• Protocol: no inheritance needed, just matching methods
• ABC: explicit inheritance required (class Child(MyABC))

Comment ça fonctionne :
• Protocol: type checker scans class for required methods/attributes
• ABC: Python checks MRO (method resolution order) for parent class
• Protocol: a class with matching methods IS a subtype
• ABC: a class MUST inherit to be a subtype (or use register())

Tableau comparatif :
• Protocol — based on structure — no inheritance needed — duck typing
• ABC — based on inheritance — explicit subclass needed — nominal typing
• Protocol — Python 3.8+ — typing module
• ABC — Python 2.6+ — abc module`,
  2641: `The Iterator ABC from collections.abc requires two methods: __iter__ and __next__. Together, they define the iterator protocol.

Concepts clés :
• __iter__: returns the iterator itself (usually return self)
• __next__: returns the next value or raises StopIteration
• Every Iterator is also an Iterable (has __iter__)
• Iterable only needs __iter__; Iterator needs both

Comment ça fonctionne :
• __iter__ is called when you use for...in or iter()
• For iterators, __iter__ typically returns self
• __next__ is called each iteration to get the next value
• When exhausted, __next__ raises StopIteration

Exemple :
>>> class Counter:
...     def __init__(self, n):
...         self.n = n
...         self.i = 0
...     def __iter__(self):
...         return self
...     def __next__(self):
...         if self.i >= self.n:
...             raise StopIteration
...         self.i += 1
...         return self.i
>>> list(Counter(3))
[1, 2, 3]`,
  2642: `The Sequence ABC requires you to implement __getitem__ and __len__, and in return provides several mixin methods for free.

Concepts clés :
• Required: __getitem__(self, index) and __len__(self)
• Free mixins: __contains__, __iter__, __reversed__, index, count
• These mixins are implemented using __getitem__ and __len__
• Saves you from implementing common sequence operations

Comment ça fonctionne :
• You implement __getitem__ and __len__ in your subclass
• Sequence uses these to provide __contains__ (in operator)
• __iter__ iterates using __getitem__ with indices 0, 1, 2, ...
• __reversed__ iterates in reverse using __getitem__
• index() finds first occurrence, count() counts occurrences

Exemple :
>>> from collections.abc import Sequence
>>> class MySeq(Sequence):
...     def __init__(self, data):
...         self._data = list(data)
...     def __getitem__(self, idx):
...         return self._data[idx]
...     def __len__(self):
...         return len(self._data)
>>> s = MySeq([1, 2, 3, 2])
>>> 2 in s
True
>>> s.count(2)
2`,
  2643: `MutableSequence extends Sequence by requiring three additional methods and providing several mixin methods for mutation operations.

Concepts clés :
• Inherits from Sequence (needs __getitem__, __len__)
• Additional required: __setitem__, __delitem__, insert
• Free mixins: append, clear, reverse, extend, pop, __iadd__, remove
• These mixins use the required methods to implement common mutations

Comment ça fonctionne :
• __setitem__: enables s[i] = value
• __delitem__: enables del s[i]
• insert: enables s.insert(i, value)
• append is implemented using insert(len(self), value)
• extend uses append repeatedly
• pop uses __getitem__ + __delitem__
• reverse uses __getitem__ + __setitem__

Exemple :
>>> from collections.abc import MutableSequence
>>> class MyList(MutableSequence):
...     def __init__(self): self._data = []
...     def __getitem__(self, i): return self._data[i]
...     def __setitem__(self, i, v): self._data[i] = v
...     def __delitem__(self, i): del self._data[i]
...     def __len__(self): return len(self._data)
...     def insert(self, i, v): self._data.insert(i, v)
>>> m = MyList()
>>> m.append(1)  # Free mixin!
>>> m.extend([2, 3])  # Free mixin!`,
  2644: `The Mapping ABC represents read-only dictionary-like objects. dict implements all required methods, so isinstance({"a": 1}, Mapping) returns True.

Concepts clés :
• Mapping requires __getitem__, __len__, __iter__
• dict has all three methods
• Mapping also provides mixins: __contains__, keys, items, values, get, __eq__, __ne__
• dict is registered as a virtual subclass of Mapping

Comment ça fonctionne :
• isinstance checks if dict satisfies the Mapping interface
• dict has __getitem__ (d[key]), __len__ (len(d)), __iter__ (iterate keys)
• The check passes, returning True
• All standard dict operations conform to the Mapping ABC

Exemple :
>>> from collections.abc import Mapping
>>> isinstance({"a": 1}, Mapping)
True
>>> isinstance([], Mapping)
False`,
  2645: `MutableMapping extends Mapping by requiring __setitem__ and __delitem__. dict implements these, so isinstance({"a": 1}, MutableMapping) returns True.

Concepts clés :
• MutableMapping inherits from Mapping
• Additional required: __setitem__ and __delitem__
• dict supports d[key] = value and del d[key]
• MutableMapping also provides mixins: pop, popitem, clear, update, setdefault

Comment ça fonctionne :
• isinstance checks if dict satisfies MutableMapping
• dict has __getitem__, __len__, __iter__ (from Mapping)
• dict also has __setitem__ and __delitem__ (for mutation)
• The check passes, returning True

Exemple :
>>> from collections.abc import MutableMapping
>>> isinstance({"a": 1}, MutableMapping)
True
>>> isinstance(type("", (), {"__getitem__": None})(), MutableMapping)
False`,
  2646: `The Set ABC represents immutable set-like objects. frozenset implements all required methods (__contains__, __iter__, __len__), so isinstance(frozenset(), Set) returns True.

Concepts clés :
• Set requires __contains__, __iter__, __len__
• frozenset has all three methods
• Set is the immutable set ABC (read-only operations)
• Both set and frozenset satisfy Set

Comment ça fonctionne :
• isinstance checks if frozenset satisfies Set
• frozenset has __contains__ (in operator), __iter__ (iteration), __len__ (length)
• The check passes, returning True
• Set also provides mixins: __le__, __lt__, __eq__, __ne__, __gt__, __ge__, __and__, __or__, __xor__, __sub__, isdisjoint

Exemple :
>>> from collections.abc import Set
>>> isinstance(frozenset(), Set)
True
>>> isinstance(set(), Set)
True`,
  2647: `MutableSet extends Set by requiring add() and discard() methods. frozenset is immutable and doesn't have these methods, so isinstance(frozenset(), MutableSet) returns False.

Concepts clés :
• MutableSet inherits from Set
• Additional required: add() and discard()
• frozenset is immutable — no add() or discard()
• Regular set IS a MutableSet (it has add and discard)

Comment ça fonctionne :
• isinstance checks if frozenset satisfies MutableSet
• frozenset has __contains__, __iter__, __len__ (from Set)
• But frozenset does NOT have add() or discard()
• The check fails, returning False

Exemple :
>>> from collections.abc import MutableSet
>>> isinstance(frozenset(), MutableSet)
False
>>> isinstance(set(), MutableSet)
True`,
  2648: `The Callable ABC matches any object that can be called (has __call__). Lambda functions are callable, so isinstance(lambda: None, Callable) returns True.

Concepts clés :
• Callable checks for __call__ method
• Lambda functions have __call__
• Regular functions have __call__
• Classes with __call__ are also Callable

Comment ça fonctionne :
• isinstance checks if the lambda has __call__
• All functions (including lambdas) have __call__
• The check passes, returning True
• Callable matches functions, methods, classes, and objects with __call__

Exemple :
>>> from collections.abc import Callable
>>> isinstance(lambda: None, Callable)
True
>>> isinstance(print, Callable)
True
>>> isinstance(42, Callable)
False
>>> class Adder:
...     def __call__(self, x): return x + 1
>>> isinstance(Adder(), Callable)
True`,
  2649: `A class can satisfy multiple Protocols simultaneously — it just needs to implement all the methods required by each Protocol. No special syntax or inheritance needed.

Concepts clés :
• Each Protocol defines its own set of required methods
• A class that has ALL methods from multiple Protocols satisfies all of them
• No need to inherit from any Protocol
• This is the power of structural subtyping

Comment ça fonctionne :
• Protocol A requires method f()
• Protocol B requires method g()
• A class with both f() and g() satisfies both A and B
• Type checker accepts the class wherever A or B is expected

Exemple :
>>> class Drawable(Protocol):
...     def draw(self) -> str: ...
>>> class Resizable(Protocol):
...     def resize(self, factor: float) -> None: ...
>>> class Widget:
...     def draw(self) -> str: return "widget"
...     def resize(self, factor: float) -> None: pass
>>> # Widget satisfies BOTH Drawable and Resizable!`,
  2650: `Every Python object satisfies the Printable Protocol because all objects inherit __str__ from the base object class. This means every single object in Python can be converted to a string.

Concepts clés :
• object (the base class of all classes) defines __str__
• Every class in Python inherits from object
• Therefore every object has __str__
• The Printable Protocol is universally satisfied

Comment ça fonctionne :
• Printable requires __str__(self) -> str
• object.__str__ exists and returns a string representation
• Every class inherits __str__ from object (unless overridden)
• So every instance of every class matches the Printable Protocol

Exemple :
>>> str(42)
'42'
>>> str([1, 2, 3])
'[1, 2, 3]'
>>> str(None)
'None'
>>> class Empty: pass
>>> str(Empty())
'<__main__.Empty object at 0x...>'`,
};