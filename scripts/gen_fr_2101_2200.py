#!/usr/bin/env python3
"""Generate French detailed explanations for IDs 2101-2200 from extract_2101_2200.json."""
import json
import sys

def escape_ts(s):
    """Escape backticks and $ for TypeScript template literals."""
    return s.replace('\\', '\\\\').replace('${', '\\${').replace('`', '\\`')

# Section headers (Key concepts -> Concepts clés, etc.)
HEADERS = {
    "Key concepts:": "Concepts clés :",
    "How it works:": "Comment ça fonctionne :",
    "Example:": "Exemple :",
    "Examples:": "Exemples :",
    "Common uses:": "Usages courants :",
}

# Phrase translations - order matters (longer first)
# Level 8 specific phrases (class, __init__, self, hasattr, @classmethod, @staticmethod, etc.)
PHRASES = [
    # Level 8 - Class basics
    ("The class keyword defines a new class.", "Le mot-clé class définit une nouvelle classe."),
    ("The class statement creates a class object, which is a blueprint for creating instances (objects).",
     "L'instruction class crée un objet classe, qui sert de modèle pour créer des instances (objets)."),
    ("Attributes defined in the class body (outside methods) are class attributes.",
     "Les attributs définis dans le corps de la classe (en dehors des méthodes) sont des attributs de classe."),
    ("Class attributes are shared by all instances of the class.",
     "Les attributs de classe sont partagés par toutes les instances de la classe."),
    ("The class statement doesn't use the assignment operator.",
     "L'instruction class n'utilise pas l'opérateur d'affectation."),
    ("Calling a class (using parentheses) creates an instance (object) of that class.",
     "Appeler une classe (avec des parenthèses) crée une instance (objet) de cette classe."),
    ("The type() function returns the class (type) of an object.",
     "La fonction type() retourne la classe (type) d'un objet."),
    ("The isinstance() function checks if an object is an instance of a class (or any of its subclasses).",
     "La fonction isinstance() vérifie si un objet est une instance d'une classe (ou d'une de ses sous-classes)."),
    ("Classes have a __name__ attribute that contains the class name as a string.",
     "Les classes ont un attribut __name__ qui contient le nom de la classe sous forme de chaîne."),
    ("Classes have a __bases__ attribute that contains a tuple of base classes (parent classes).",
     "Les classes ont un attribut __bases__ qui contient un tuple des classes de base (classes parentes)."),
    ("Classes have a __module__ attribute that contains the name of the module where the class is defined.",
     "Les classes ont un attribut __module__ qui contient le nom du module où la classe est définie."),
    ("Classes are callable objects - they can be called like functions.",
     "Les classes sont des objets appelables — on peut les appeler comme des fonctions."),
    ("The __init__ method is the constructor - it's automatically called when an instance is created.",
     "La méthode __init__ est le constructeur — elle est appelée automatiquement à la création d'une instance."),
    ("The __init__ method sets instance attributes when an instance is created.",
     "La méthode __init__ définit les attributs d'instance à la création d'une instance."),
    ("Instance attributes can be set after an instance is created.",
     "Les attributs d'instance peuvent être définis après la création d'une instance."),
    ("Each call to a class creates a separate instance (object).",
     "Chaque appel à une classe crée une instance (objet) distincte."),
    ("The hasattr() function checks if an object has a specific attribute.",
     "La fonction hasattr() vérifie si un objet possède un attribut spécifique."),
    ("The hasattr() function returns True if an object has a specific attribute.",
     "La fonction hasattr() retourne True si un objet possède un attribut spécifique."),
    ("self is a reference to the instance (object) on which a method is called.",
     "self est une référence à l'instance (objet) sur laquelle une méthode est appelée."),
    ("Instance methods are called on instances (objects).",
     "Les méthodes d'instance sont appelées sur les instances (objets)."),
    ("Instance methods can be called via the class by explicitly passing the instance as the first argument.",
     "Les méthodes d'instance peuvent être appelées via la classe en passant explicitement l'instance comme premier argument."),
    ("Accessing a method via the class returns an unbound function.",
     "Accéder à une méthode via la classe retourne une fonction non liée."),
    ("Accessing a method via an instance returns a bound method.",
     "Accéder à une méthode via une instance retourne une méthode liée."),
    ("Class attributes can be accessed directly via the class.",
     "Les attributs de classe peuvent être accédés directement via la classe."),
    ("Instances can access class attributes.",
     "Les instances peuvent accéder aux attributs de classe."),
    ("Setting an instance attribute doesn't change the class attribute.",
     "Définir un attribut d'instance ne modifie pas l'attribut de classe."),
    ("Instance attributes shadow (hide) class attributes.",
     "Les attributs d'instance masquent (cachent) les attributs de classe."),
    ("The @classmethod decorator creates a class method that receives the class as the first argument.",
     "Le décorateur @classmethod crée une méthode de classe qui reçoit la classe comme premier argument."),
    ("The @staticmethod decorator creates a static method that doesn't require self or cls.",
     "Le décorateur @staticmethod crée une méthode statique qui ne requiert ni self ni cls."),
    # Shared with 2151-2200 (getattr, setattr, dir, vars, __eq__, __hash__, id, __slots__, __dict__, type, mro)
    ("The getattr() function gets an attribute value from an object.",
     "La fonction getattr() obtient la valeur d'un attribut depuis un objet."),
    ("The setattr() function sets an attribute value on an object.",
     "La fonction setattr() définit la valeur d'un attribut sur un objet."),
    ("The delattr() function deletes an attribute from an object.",
     "La fonction delattr() supprime un attribut d'un objet."),
    ("The dir() function returns a list of attribute names for an object.",
     "La fonction dir() retourne une liste de noms d'attributs pour un objet."),
    ("The vars() function returns the __dict__ attribute, which contains instance attributes.",
     "La fonction vars() retourne l'attribut __dict__, qui contient les attributs d'instance."),
    ("The is operator checks object identity (whether two variables refer to the same object).",
     "L'opérateur is vérifie l'identité des objets (si deux variables référencent le même objet)."),
    ("The __eq__ method overrides the default == behavior.",
     "La méthode __eq__ remplace le comportement par défaut de ==."),
    ("If __ne__ is not defined, Python automatically provides it as the negation of __eq__.",
     "Si __ne__ n'est pas défini, Python le fournit automatiquement comme négation de __eq__."),
    ("The __hash__ method defines the hash value for an object.",
     "La méthode __hash__ définit la valeur de hachage d'un objet."),
    ("The id() function returns a unique integer identifier for an object.",
     "La fonction id() retourne un identifiant entier unique pour un objet."),
    ("The __slots__ attribute restricts which attributes can be set on instances.",
     "L'attribut __slots__ restreint les attributs pouvant être définis sur les instances."),
    ("The __dict__ attribute contains a dictionary of instance attributes.",
     "L'attribut __dict__ contient un dictionnaire des attributs d'instance."),
    ("The type() function returns the class of an instance.",
     "La fonction type() retourne la classe d'une instance."),
    ("Classes are instances of type (the metaclass).",
     "Les classes sont des instances de type (la métaclasse)."),
    ("All classes in Python inherit from object by default.",
     "Toutes les classes en Python héritent de object par défaut."),
    ("The mro() method returns the Method Resolution Order (MRO) - the inheritance chain.",
     "La méthode mro() retourne l'ordre de résolution des méthodes (MRO) — la chaîne d'héritage."),
    # __str__, __repr__, __len__, __eq__, __lt__, __add__, __getitem__, __setitem__, __call__, @property (for 2151+)
    ("The __str__ method defines the string representation of an object for str() and print().",
     "La méthode __str__ définit la représentation en chaîne d'un objet pour str() et print()."),
    ("The __repr__ method defines the \"official\" string representation of an object for repr().",
     "La méthode __repr__ définit la représentation en chaîne « officielle » d'un objet pour repr()."),
    ("The __len__ method defines the behavior for len().",
     "La méthode __len__ définit le comportement pour len()."),
    ("The __eq__ method defines the behavior for the == operator.",
     "La méthode __eq__ définit le comportement pour l'opérateur ==."),
    ("The __lt__ method defines the behavior for the < (less than) operator.",
     "La méthode __lt__ définit le comportement pour l'opérateur < (inférieur à)."),
    ("The __add__ method defines the behavior for the + operator.",
     "La méthode __add__ définit le comportement pour l'opérateur +."),
    ("The __getitem__ method defines the behavior for [] indexing.",
     "La méthode __getitem__ définit le comportement pour l'indexation []."),
    ("The __setitem__ method defines the behavior for [] assignment.",
     "La méthode __setitem__ définit le comportement pour l'affectation []."),
    ("The __call__ method makes an instance callable (like a function).",
     "La méthode __call__ rend une instance appelable (comme une fonction)."),
    ("The @property decorator makes a method accessible as an attribute.",
     "Le décorateur @property rend une méthode accessible comme un attribut."),
    # Additional Level 8 phrases
    ("The pass statement is a placeholder that does nothing - it's used when a class body is empty.",
     "L'instruction pass est un placeholder qui ne fait rien — elle est utilisée quand le corps d'une classe est vide."),
    ("Classes are fundamental to object-oriented programming in Python, allowing you to define custom types with attributes and methods.",
     "Les classes sont fondamentales à la programmation orientée objet en Python, permettant de définir des types personnalisés avec attributs et méthodes."),
    ("defines a class named", "définit une classe nommée"),
    ("creates a class named", "crée une classe nommée"),
    ("creates an instance", "crée une instance"),
    ("Object-oriented programming", "Programmation orientée objet"),
    ("Custom types", "Types personnalisés"),
    ("Class is blueprint for creating instances", "La classe est un modèle pour créer des instances"),
    ("can be used to create instances", "peut servir à créer des instances"),
    ("Can be used to create instances", "Peut servir à créer des instances"),
    ("belong to the class itself, not to individual instances", "appartiennent à la classe elle-même, pas aux instances individuelles"),
    ("The correct syntax is", "La syntaxe correcte est"),
    ("raises a SyntaxError", "lève une SyntaxError"),
    (" because ", " car "),
    ("when you call", "quand on appelle"),
    ("when you access", "quand on accède"),
    ("when you call a method on an instance", "quand on appelle une méthode sur une instance"),
    ("Python automatically passes", "Python passe automatiquement"),
    ("it's a convention (not a keyword)", "c'est une convention (pas un mot-clé)"),
    ("but self is universally used", "mais self est utilisé universellement"),
    ("No explicit parent class specified", "Pas de classe parente explicite"),
    ("Python automatically makes object the base class", "Python fait automatiquement de object la classe de base"),
    ("returns True if the object has the attribute", "retourne True si l'objet possède l'attribut"),
    ("returns False otherwise", "retourne False sinon"),
    ("Use @classmethod when you need access to the class, and @staticmethod when you don't need the class or instance.",
     "Utilisez @classmethod quand vous avez besoin d'accéder à la classe, et @staticmethod quand vous n'avez besoin ni de la classe ni de l'instance."),
    ("the recommended way to check types in Python", "la façon recommandée de vérifier les types en Python"),
    ("because it also returns True for subclasses", "car elle retourne aussi True pour les sous-classes"),
    # Bullet/subsection headers - Level 8
    ("Class definition:", "Définition de classe :"),
    ("Class attribute:", "Attribut de classe :"),
    ("Instance creation:", "Création d'instance :"),
    ("type() on instance:", "type() sur une instance :"),
    ("isinstance() check:", "Vérification isinstance() :"),
    ("__name__ attribute:", "Attribut __name__ :"),
    ("__bases__ attribute:", "Attribut __bases__ :"),
    ("__module__ attribute:", "Attribut __module__ :"),
    ("Classes are callable:", "Les classes sont appelables :"),
    ("__init__ constructor:", "Constructeur __init__ :"),
    ("__init__ sets attributes:", "__init__ définit les attributs :"),
    ("__init__ with no parameters:", "__init__ sans paramètres :"),
    ("__init__ with multiple parameters:", "__init__ avec plusieurs paramètres :"),
    ("__init__ with default parameter:", "__init__ avec paramètre par défaut :"),
    ("Setting attributes after creation:", "Définition d'attributs après création :"),
    ("Different instances:", "Instances différentes :"),
    ("hasattr() check:", "Vérification hasattr() :"),
    ("hasattr() returns True:", "hasattr() retourne True :"),
    ("self parameter:", "Paramètre self :"),
    ("Instance method call:", "Appel de méthode d'instance :"),
    ("Calling via class:", "Appel via la classe :"),
    ("Instance method with parameter:", "Méthode d'instance avec paramètre :"),
    ("Method accesses instance attribute:", "La méthode accède à l'attribut d'instance :"),
    ("self refers to instance:", "self réfère à l'instance :"),
    ("Method with other instance:", "Méthode avec une autre instance :"),
    ("Unbound method:", "Méthode non liée :"),
    ("Bound method:", "Méthode liée :"),
    ("Instance method with default:", "Méthode d'instance avec défaut :"),
    ("Class attribute via class:", "Attribut de classe via la classe :"),
    ("Instance accesses class attribute:", "L'instance accède à l'attribut de classe :"),
    ("Instance attribute doesn't change class attribute:", "L'attribut d'instance ne modifie pas l'attribut de classe :"),
    ("Instance attribute shadows class:", "L'attribut d'instance masque la classe :"),
    ("Instance attributes independent:", "Attributs d'instance indépendants :"),
    ("Mutable class attributes shared:", "Attributs de classe mutables partagés :"),
    ("Changing class attribute affects instances:", "Changer l'attribut de classe affecte les instances :"),
    ("Deleting instance attribute reveals class:", "Supprimer l'attribut d'instance révèle la classe :"),
    ("Instance attribute independent:", "Attribut d'instance indépendant :"),
    ("@classmethod decorator:", "Décorateur @classmethod :"),
    ("Class method on instance:", "Méthode de classe sur l'instance :"),
    ("@staticmethod decorator:", "Décorateur @staticmethod :"),
    ("Static method on instance:", "Méthode statique sur l'instance :"),
    ("Class method accesses class attribute:", "La méthode de classe accède à l'attribut de classe :"),
    ("Class method as factory:", "Méthode de classe comme fabrique :"),
    ("Static method with parameters:", "Méthode statique avec paramètres :"),
    ("Both method types:", "Les deux types de méthodes :"),
]

def translate_text(text):
    """Apply phrase-level translations. Python code blocks stay unchanged."""
    result = text
    for en, fr in PHRASES:
        result = result.replace(en, fr)
    # Conditional: "If X then Y because Z" -> "Si X alors Y car Z"
    result = result.replace("If class ", "Si class ")
    result = result.replace(" then obj = MyClass() ", " alors obj = MyClass() ")
    result = result.replace(" then obj.x ", " alors obj.x ")
    result = result.replace(" then obj1 is obj2 ", " alors obj1 is obj2 ")
    result = result.replace(" then MyClass.x ", " alors MyClass.x ")
    result = result.replace(" then obj2.x ", " alors obj2.x ")
    result = result.replace(" then obj.method() ", " alors obj.method() ")
    result = result.replace(" then obj.method(5) ", " alors obj.method(5) ")
    result = result.replace(" then obj.get_x() ", " alors obj.get_x() ")
    result = result.replace(" then obj.method() is obj ", " alors obj.method() is obj ")
    result = result.replace(" then obj1.method(obj2) ", " alors obj1.method(obj2) ")
    result = result.replace(" then MyClass.method ", " alors MyClass.method ")
    result = result.replace(" then obj.method ", " alors obj.method ")
    result = result.replace(" then hasattr(obj, 'x') ", " alors hasattr(obj, 'x') ")
    result = result.replace(" then type(MyClass()) ", " alors type(MyClass()) ")
    result = result.replace(" then isinstance(MyClass(), MyClass) ", " alors isinstance(MyClass(), MyClass) ")
    result = result.replace(" then MyClass.__name__ ", " alors MyClass.__name__ ")
    result = result.replace(" then MyClass.__bases__ ", " alors MyClass.__bases__ ")
    result = result.replace(" then MyClass.__module__ ", " alors MyClass.__module__ ")
    result = result.replace(" then callable(MyClass) ", " alors callable(MyClass) ")
    result = result.replace(" then obj.x = 5; obj.x ", " alors obj.x = 5; obj.x ")
    result = result.replace(" then obj.x = 2; MyClass.x ", " alors obj.x = 2; MyClass.x ")
    result = result.replace(" then obj1.x = 2; obj2.x ", " alors obj1.x = 2; obj2.x ")
    result = result.replace(" then obj1.x.append(1); obj2.x ", " alors obj1.x.append(1); obj2.x ")
    result = result.replace(" then MyClass.x = 2; obj.x ", " alors MyClass.x = 2; obj.x ")
    result = result.replace(" then del obj.x; obj.x ", " alors del obj.x; obj.x ")
    result = result.replace(" then obj.x = 2; MyClass.x = 3; obj.x ", " alors obj.x = 2; MyClass.x = 3; obj.x ")
    result = result.replace(" then MyClass.method() ", " alors MyClass.method() ")
    result = result.replace(" then obj.method() ", " alors obj.method() ")
    result = result.replace(" then MyClass.get_x() ", " alors MyClass.get_x() ")
    result = result.replace(" then MyClass.add(1, 2) ", " alors MyClass.add(1, 2) ")
    result = result.replace(" then MyClass.class_method() ", " alors MyClass.class_method() ")
    result = result.replace(" then str(obj) ", " alors str(obj) ")
    result = result.replace(" then repr(obj) ", " alors repr(obj) ")
    result = result.replace(" then print(obj) ", " alors print(obj) ")
    result = result.replace(" then len(obj) ", " alors len(obj) ")
    result = result.replace(" then obj1 == obj2 ", " alors obj1 == obj2 ")
    result = result.replace(" then dir(obj) ", " alors dir(obj) ")
    result = result.replace(" then vars(obj) ", " alors vars(obj) ")
    result = result.replace(" then getattr(obj, 'x') ", " alors getattr(obj, 'x') ")
    result = result.replace(" then setattr(obj, 'x', 1); obj.x ", " alors setattr(obj, 'x', 1); obj.x ")
    result = result.replace(" then delattr(obj, 'x'); hasattr(obj, 'x') ", " alors delattr(obj, 'x'); hasattr(obj, 'x') ")
    result = result.replace(" then ", " alors ")  # catch-all
    # Returns / Output - "X returns Y" -> "X retourne Y"
    result = result.replace("obj.x returns ", "obj.x retourne ")
    result = result.replace("obj.method() returns ", "obj.method() retourne ")
    result = result.replace("MyClass.x returns ", "MyClass.x retourne ")
    result = result.replace("type(MyClass()) returns ", "type(MyClass()) retourne ")
    result = result.replace("hasattr(obj, 'x') returns ", "hasattr(obj, 'x') retourne ")
    result = result.replace("obj1 is obj2 returns ", "obj1 is obj2 retourne ")
    result = result.replace("MyClass.method() returns ", "MyClass.method() retourne ")
    result = result.replace("obj.method() returns ", "obj.method() retourne ")
    result = result.replace("Returns: ", "Retourne : ")
    result = result.replace("• Returns: ", "• Retourne : ")
    result = result.replace("Output: ", "Affichage : ")
    result = result.replace("• Output: ", "• Affichage : ")
    result = result.replace("Error: ", "Erreur : ")
    result = result.replace("• Error: ", "• Erreur : ")
    # Section headers
    for en, fr in HEADERS.items():
        result = result.replace(en, fr)
    return result

def main():
    with open('scripts/extract_2101_2200.json') as f:
        raw = json.load(f)
    # Convert array [{"id": 2101, "e": "...", "de": "..."}, ...] to dict by id
    data = {str(item['id']): item for item in raw}

    lines = []
    for i in range(2101, 2201):
        key = str(i)
        if key not in data:
            continue
        de = data[key]['de']
        translated = translate_text(de)
        escaped = escape_ts(translated)
        lines.append(f"  {i}: `{escaped}`,")

    out = "\n".join(lines)
    if len(sys.argv) > 1 and sys.argv[1] == '--file':
        with open('scripts/fr_detailed_2101_2200.ts', 'w') as f:
            f.write("// Paste this into DETAILED_EXPLANATIONS_FR in detailedExplanationsTranslations.ts\n\n")
            f.write(out)
        print(f"Written to scripts/fr_detailed_2101_2200.ts ({len(lines)} entries)")
    else:
        print(out)

if __name__ == '__main__':
    main()
