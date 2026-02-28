// Paste this into DETAILED_EXPLANATIONS_FR in detailedExplanationsTranslations.ts

  2101: `Le mot-clé class définit une nouvelle classe. Si class MyClass: pass, alors this définit une classe nommée MyClass. L'instruction class crée un objet classe, qui sert de modèle pour créer des instances (objets). L'instruction pass est un placeholder qui ne fait rien — elle est utilisée quand le corps d'une classe est vide. Les classes sont fondamentales à la programmation orientée objet en Python, permettant de définir des types personnalisés avec attributs et méthodes.

Définition de classe :
• class MyClass: pass définit une classe nommée MyClass
• class keyword creates class object
• MyClass is the class name
• pass is placeholder (empty body)
• La classe est un modèle pour créer des instances

Comment ça fonctionne :
• class MyClass: pass executes class statement
• Python creates class object named MyClass
• Class object stored in namespace
• Peut servir à créer des instances: obj = MyClass()
• Retourne : class definition (no return value, creates class)

Exemple :
class MyClass: pass          # Defines empty class
class Person: pass            # Defines another class
class Animal: pass           # Defines another class

Usages courants :
• Définition de classe : class MyClass: pass (empty class)
• Blueprint: class defines structure for objects
• Programmation orientée objet
• Types personnalisés

Exemple : class MyClass: pass définit une classe nommée MyClass car the class keyword creates a class object, which serves as a blueprint for creating instances (objects) of that class.
`,
  2102: `Les attributs définis dans le corps de la classe (en dehors des méthodes) sont des attributs de classe. Si class MyClass: x = 1, alors this defines a class MyClass with a class attribute x = 1. Class attributes are shared by all instances of the class - they appartiennent à la classe elle-même, pas aux instances individuelles. All instances can access class attributes, and modifying a class attribute affects all instances (unless an instance has its own attribute that shadows it).

Attribut de classe :
• class MyClass: x = 1 defines class with class attribute x = 1
• x = 1 is class attribute (defined in class body)
• Shared by all instances of MyClass
• Accessible via class: MyClass.x
• Accessible via instance: obj.x (if not shadowed)

Comment ça fonctionne :
• class MyClass: x = 1 executes class statement
• x = 1 creates class attribute
• Attribute stored in class __dict__
• All instances share this attribute
• Retourne : class definition (no return value, creates class)

Exemple :
class MyClass: x = 1         # Class attribute x = 1
MyClass.x                    # 1 (accessed via class)
obj = MyClass()
obj.x                        # 1 (accessed via instance)

Usages courants :
• Class attributes: class MyClass: shared_value = 1
• Shared data: class Counter: count = 0 (shared counter)
• Class-level constants
• Shared state

Exemple : class MyClass: x = 1 defines a class with a class attribute x = 1 car attributes defined in the class body are class attributes, shared by all instances of the class.
`,
  2103: `L'instruction class n'utilise pas l'opérateur d'affectation. If MyClass = class MyClass: pass, alors this lève une SyntaxError car the class statement has its own syntax - you don't use = to assign the class name. La syntaxe correcte est class MyClass: pass, which automatically creates a variable MyClass in the current namespace. The class keyword itself handles the assignment - you don't need (and can't use) an explicit assignment operator.

Class statement syntax:
• MyClass = class MyClass: pass raises SyntaxError
• class statement doesn't use assignment operator
• Correct syntax: class MyClass: pass
• Class name automatically assigned to variable
• SyntaxErreur : invalid syntax

Comment ça fonctionne :
• MyClass = class MyClass: pass attempts to use assignment
• class statement doesn't support assignment operator
• Python parser expects: class ClassName: body
• Encountered = before class keyword
• Raises SyntaxErreur : invalid syntax

Exemple :
class MyClass: pass          # Correct (no =)
MyClass = class MyClass: pass  # SyntaxError (invalid syntax)
# Correct: class MyClass: pass

Usages courants :
• Understanding syntax: class statement doesn't use =
• Définition de classe : class MyClass: pass (correct syntax)
• Syntax errors
• Class statement rules

Exemple : MyClass = class MyClass: pass lève une SyntaxError car the class statement doesn't use the assignment operator - the class keyword automatically creates the variable with the class name.
`,
  2104: `Appeler une classe (avec des parenthèses) crée une instance (objet) de cette classe. Si class MyClass: pass, alors obj = MyClass() crée une instance of MyClass and assigns it to obj. The parentheses () call the class, which triggers instance creation. Classes are callable - quand on appelle them, they create and return a new instance. This is how objects are created in Python - by calling the class constructor.

Création d'instance :
• obj = MyClass() creates instance of MyClass
• MyClass() calls class (creates instance)
• Instance is object of type MyClass
• Assigned to variable obj
• Retourne : new instance object

Comment ça fonctionne :
• MyClass() calls class MyClass
• Class is callable (can be called)
• Calling class creates new instance
• Instance object created and returned
• Assigned to obj
• Retourne : instance object

Exemple :
class MyClass: pass
obj = MyClass()              # Creates instance
obj2 = MyClass()             # Creates another instance
obj is obj2                  # False (different instances)

Usages courants :
• Creating objects: obj = MyClass() (instance creation)
• Object instantiation: instance = ClassName()
• Instance creation
• Programmation orientée objet

Exemple : Si class MyClass: pass, alors obj = MyClass() crée une instance of MyClass car calling a class (using parentheses) creates and returns a new instance (object) of that class.
`,
  2105: `La fonction type() retourne la classe (type) d'un objet. Si class MyClass: pass, alors type(MyClass()) retourne <class '__main__.MyClass'> car MyClass() crée une instance of MyClass, and type() returns the class that the instance belongs to. The output <class '__main__.MyClass'> shows that the instance is of type MyClass, where '__main__' is the module name (the current script).

type() sur une instance :
• type(MyClass()) retourne <class '__main__.MyClass'>
• MyClass() creates instance
• type() returns class of instance
• Returns class object: <class '__main__.MyClass'>
• Shows instance belongs to MyClass class

Comment ça fonctionne :
• MyClass() creates instance of MyClass
• type(instance) checks type of instance
• Instance belongs to MyClass class
• Returns class object: <class '__main__.MyClass'>
• '__main__' is module name (current script)

Exemple :
class MyClass: pass
type(MyClass())              # <class '__main__.MyClass'>
obj = MyClass()
type(obj)                    # <class '__main__.MyClass'>

Usages courants :
• Type checking: if type(obj) == MyClass: ...
• Type inspection: print(type(instance))
• Object type
• Type identification

Exemple : Si class MyClass: pass, alors type(MyClass()) retourne <class '__main__.MyClass'> car type() returns the class that an instance belongs to, and MyClass() crée une instance of MyClass.
`,
  2106: `La fonction isinstance() vérifie si un objet est une instance d'une classe (ou d'une de ses sous-classes). Si class MyClass: pass, alors isinstance(MyClass(), MyClass) returns True car MyClass() crée une instance of MyClass, and isinstance() checks if that instance is an instance of MyClass (which it is). isinstance() is la façon recommandée de vérifier les types en Python, as it also returns True for subclasses.

Vérification isinstance() :
• isinstance(MyClass(), MyClass) returns True
• MyClass() creates instance of MyClass
• isinstance() checks if instance is of type MyClass
• Instance is of type MyClass
• Retourne : True

Comment ça fonctionne :
• MyClass() creates instance of MyClass
• isinstance(instance, MyClass) checks type
• Instance is indeed of type MyClass
• Retourne : True

Exemple :
class MyClass: pass
obj = MyClass()
isinstance(obj, MyClass)     # True (obj is instance of MyClass)
isinstance(obj, object)     # True (all classes inherit from object)

Usages courants :
• Type checking: if isinstance(obj, MyClass): ...
• Instance validation: isinstance(instance, Class)
• Type checking
• Object validation

Exemple : Si class MyClass: pass, alors isinstance(MyClass(), MyClass) returns True car isinstance() checks if an object is an instance of a class, and MyClass() crée une instance of MyClass.
`,
  2107: `Les classes ont un attribut __name__ qui contient le nom de la classe sous forme de chaîne. Si class MyClass: pass, alors MyClass.__name__ returns 'MyClass' car __name__ is a special attribute that stores the class's name. This attribute is automatically set when the class is defined. It's useful for introspection, debugging, or creating dynamic code that needs to know class names.

Attribut __name__ :
• MyClass.__name__ returns 'MyClass'
• __name__ contains class name as string
• Automatically set when class defined
• Returns class name: 'MyClass'
• Useful for introspection

Comment ça fonctionne :
• class MyClass: pass creates class definition
• Python automatically sets MyClass.__name__ = 'MyClass'
• __name__ attribute stores class name
• MyClass.__name__ accesses attribute
• Retourne : 'MyClass'

Exemple :
class MyClass: pass
MyClass.__name__             # 'MyClass' (class name)
class Person: pass
Person.__name__              # 'Person' (class name)

Usages courants :
• Introspection: print(MyClass.__name__) (debugging)
• Dynamic code: code that uses class names
• Class attributes
• Class metadata

Exemple : Si class MyClass: pass, alors MyClass.__name__ returns 'MyClass' car __name__ is a special attribute that stores the class's name as a string, automatically set when the class is defined.
`,
  2108: `Les classes ont un attribut __bases__ qui contient un tuple des classes de base (classes parentes). Si class MyClass: pass, alors MyClass.__bases__ returns (<class 'object'>,) car all classes in Python inherit from object by default. Even if you don't explicitly specify a parent class, Python fait automatiquement de object la classe de base. __bases__ shows the inheritance hierarchy - which classes this class inherits from.

Attribut __bases__ :
• MyClass.__bases__ returns (<class 'object'>,)
• __bases__ contains tuple of base classes
• All classes inherit from object by default
• Returns tuple: (<class 'object'>,)
• Shows inheritance hierarchy

Comment ça fonctionne :
• class MyClass: pass creates class definition
• Pas de classe parente explicite
• Python fait automatiquement de object la classe de base
• MyClass.__bases__ contains tuple of base classes
• Retourne : (<class 'object'>,)

Exemple :
class MyClass: pass
MyClass.__bases__            # (<class 'object'>,) (default inheritance)
class Child(Parent): pass
Child.__bases__              # (<class '__main__.Parent'>,) (explicit inheritance)

Usages courants :
• Inheritance inspection: print(MyClass.__bases__)
• Inheritance hierarchy: check parent classes
• Class attributes
• Inheritance information

Exemple : Si class MyClass: pass, alors MyClass.__bases__ returns (<class 'object'>,) car all classes in Python inherit from object by default, and __bases__ contains a tuple of the base classes.
`,
  2109: `Les classes ont un attribut __module__ qui contient le nom du module où la classe est définie. Si class MyClass: pass, alors MyClass.__module__ returns '__main__' (if defined in the main script) or the module name (if defined in an imported module). The __module__ attribute helps identify where a class was defined, which is useful for introspection and debugging.

Attribut __module__ :
• MyClass.__module__ returns '__main__' or module name
• __module__ contains module name where class defined
• '__main__' if defined in main script
• Module name if defined in imported module
• Useful for introspection

Comment ça fonctionne :
• class MyClass: pass creates class definition
• Python automatically sets MyClass.__module__ = '__main__' (or module name)
• __module__ attribute stores module name
• MyClass.__module__ accesses attribute
• Retourne : '__main__' (or module name)

Exemple :
class MyClass: pass
MyClass.__module__           # '__main__' (if in main script)
# If in module.py: MyClass.__module__ would be 'module'

Usages courants :
• Introspection: print(MyClass.__module__) (debugging)
• Module identification: check where class defined
• Class attributes
• Class metadata

Exemple : Si class MyClass: pass, alors MyClass.__module__ returns '__main__' (if defined in the main script) or the module name (if defined in an imported module) car __module__ contains the name of the module where the class is defined.
`,
  2110: `Les classes sont des objets appelables — on peut les appeler comme des fonctions. Si class MyClass: pass, alors callable(MyClass) returns True car classes are callable - you can call them with parentheses to create instances (e.g., MyClass()). The callable() function checks if an object can be called, and classes are callable car they can be called to create instances. This is how object creation works in Python - classes are callable constructors.

Les classes sont appelables :
• callable(MyClass) returns True
• Classes are callable objects
• Can be called: MyClass() (creates instance)
• callable() checks if object can be called
• Retourne : True

Comment ça fonctionne :
• class MyClass: pass creates class object
• MyClass is a class (callable)
• callable(MyClass) checks if MyClass is callable
• Classes are callable (can be called to create instances)
• Retourne : True

Exemple :
class MyClass: pass
callable(MyClass)            # True (classes are callable)
MyClass()                    # Creates instance (calling class)
callable(5)                 # False (integers not callable)

Usages courants :
• Checking callable: if callable(obj): obj()
• Type checking: is_callable = callable(Class)
• Callable check
• Object inspection

Exemple : Si class MyClass: pass, alors callable(MyClass) returns True car classes are callable objects - they can be called with parentheses to create instances (objects).
`,
  2111: `La méthode __init__ est le constructeur — elle est appelée automatiquement à la création d'une instance. If def __init__(self, x): self.x = x, alors this defines a constructor that takes a parameter x and sets it as an instance attribute. The __init__ method is special - it's called automatically when you create an instance (e.g., MyClass(5)), and it's used to initialize instance attributes. The self parameter refers to the instance being created.

Constructeur __init__ :
• def __init__(self, x): self.x = x defines constructor
• __init__ is special method (constructor)
• Automatically called when instance created
• self refers to instance being created
• Sets instance attributes: self.x = x

Comment ça fonctionne :
• __init__ is special method name
• Called automatically: MyClass(5) calls __init__(self, 5)
• self parameter is instance being created
• x parameter is argument passed: MyClass(5)
• Sets instance attribute: self.x = x
• Retourne : None (constructors don't return values)

Exemple :
class MyClass:
    def __init__(self, x):
        self.x = x
obj = MyClass(5)              # Calls __init__(self, 5)
obj.x                         # 5 (instance attribute set)

Usages courants :
• Constructor: def __init__(self, param): self.attr = param
• Initialization: def __init__(self): self.data = []
• Instance setup
• Object initialization

Exemple : def __init__(self, x): self.x = x defines a constructor car __init__ is the special method that's automatically called when an instance is created, used to initialize instance attributes.
`,
  2112: `La méthode __init__ définit les attributs d'instance à la création d'une instance. Si class MyClass: def __init__(self, x): self.x = x; obj = MyClass(5); obj.x, alors obj.x retourne 5 car MyClass(5) calls __init__(self, 5), which sets self.x = 5, creating an instance attribute x with value 5. The instance attribute can alors be accessed via obj.x.

__init__ définit les attributs :
• class MyClass: def __init__(self, x): self.x = x; obj = MyClass(5); obj.x retourne 5
• MyClass(5) calls __init__(self, 5)
• __init__ sets self.x = 5 (instance attribute)
• obj.x accesses instance attribute
• Retourne : 5

Comment ça fonctionne :
• MyClass(5) creates instance and calls __init__(self, 5)
• __init__ executes: self.x = 5
• Instance attribute x = 5 created on instance
• obj.x accesses instance attribute
• Retourne : 5

Exemple :
class MyClass:
    def __init__(self, x):
        self.x = x
obj = MyClass(5)              # Calls __init__(self, 5), sets obj.x = 5
obj.x                         # 5 (instance attribute)

Usages courants :
• Setting attributes: def __init__(self, x): self.x = x
• Initialization: def __init__(self): self.data = []
• Instance setup
• Object initialization

Exemple : Si class MyClass: def __init__(self, x): self.x = x; obj = MyClass(5); obj.x, alors obj.x retourne 5 car __init__ sets instance attributes when the instance is created, so self.x = 5 crée une instance attribute x with value 5.
`,
  2113: `The __init__ method can have no parameters except self. Si class MyClass: def __init__(self): pass; obj = MyClass(), alors obj = MyClass() crée une instance car __init__ can be defined with only self (no other parameters). When you call MyClass() with no arguments, it calls __init__(self) with no additional arguments. The pass statement does nothing - it's just a placeholder for an empty method body.

__init__ sans paramètres :
• class MyClass: def __init__(self): pass; obj = MyClass() creates instance
• __init__ has only self parameter (no other parameters)
• MyClass() calls __init__(self) with no arguments
• Instance created successfully
• Retourne : instance object

Comment ça fonctionne :
• MyClass() creates instance and calls __init__(self)
• __init__ executes: pass (does nothing)
• Instance created successfully
• Assigned to obj
• Retourne : instance object

Exemple :
class MyClass:
    def __init__(self):
        pass
obj = MyClass()               # Calls __init__(self), creates instance
obj                           # <__main__.MyClass object>

Usages courants :
• Empty constructor: def __init__(self): pass
• No initialization: def __init__(self): (empty body)
• Default initialization
• Simple constructors

Exemple : Si class MyClass: def __init__(self): pass; obj = MyClass(), alors obj = MyClass() crée une instance car __init__ can have no parameters except self, so MyClass() calls __init__(self) and creates the instance.
`,
  2114: `The __init__ method can have multiple parameters. Si class MyClass: def __init__(self, x, y): self.x = x; self.y = y; obj = MyClass(1, 2), alors obj = MyClass(1, 2) crée une instance with x=1, y=2 car __init__ can take multiple parameters. When you call MyClass(1, 2), it calls __init__(self, 1, 2), which sets self.x = 1 and self.y = 2, creating two instance attributes.

__init__ avec plusieurs paramètres :
• class MyClass: def __init__(self, x, y): self.x = x; self.y = y; obj = MyClass(1, 2) creates instance with x=1, y=2
• __init__ has parameters: self, x, y
• MyClass(1, 2) calls __init__(self, 1, 2)
• Sets self.x = 1, self.y = 2
• Retourne : instance object

Comment ça fonctionne :
• MyClass(1, 2) creates instance and calls __init__(self, 1, 2)
• __init__ executes: self.x = 1, self.y = 2
• Instance attributes x = 1, y = 2 created
• Instance created successfully
• Retourne : instance object

Exemple :
class MyClass:
    def __init__(self, x, y):
        self.x = x
        self.y = y
obj = MyClass(1, 2)           # Calls __init__(self, 1, 2), sets obj.x = 1, obj.y = 2
obj.x                         # 1
obj.y                         # 2

Usages courants :
• Multiple parameters: def __init__(self, x, y): self.x = x; self.y = y
• Initialization: def __init__(self, name, age): self.name = name; self.age = age
• Instance setup
• Object initialization

Exemple : Si class MyClass: def __init__(self, x, y): self.x = x; self.y = y; obj = MyClass(1, 2), alors obj = MyClass(1, 2) crée une instance with x=1, y=2 car __init__ can have multiple parameters, and MyClass(1, 2) calls __init__(self, 1, 2), which sets both instance attributes.
`,
  2115: `The __init__ method can have default parameters. Si class MyClass: def __init__(self, x=1): self.x = x; obj = MyClass(), alors obj = MyClass() crée une instance with x=1 car __init__ has a default parameter x=1. When you call MyClass() with no arguments, it uses the default value x=1, so __init__(self, 1) is called, which sets self.x = 1. Default parameters allow you to create instances without providing all arguments.

__init__ avec paramètre par défaut :
• class MyClass: def __init__(self, x=1): self.x = x; obj = MyClass() creates instance with x=1
• __init__ has default parameter: x=1
• MyClass() calls __init__(self, 1) (uses default)
• Sets self.x = 1
• Retourne : instance object

Comment ça fonctionne :
• MyClass() creates instance and calls __init__(self, 1) (default x=1)
• __init__ executes: self.x = 1
• Instance attribute x = 1 created
• Instance created successfully
• Retourne : instance object

Exemple :
class MyClass:
    def __init__(self, x=1):
        self.x = x
obj = MyClass()               # Calls __init__(self, 1), sets obj.x = 1
obj.x                         # 1 (default value used)

Usages courants :
• Default parameters: def __init__(self, x=1): self.x = x
• Optional initialization: def __init__(self, name='Unknown'): self.name = name
• Instance setup
• Flexible constructors

Exemple : Si class MyClass: def __init__(self, x=1): self.x = x; obj = MyClass(), alors obj = MyClass() crée une instance with x=1 car __init__ has a default parameter x=1, so MyClass() uses the default value.
`,
  2116: `Passing an argument to __init__ overrides the default parameter value. Si class MyClass: def __init__(self, x=1): self.x = x; obj = MyClass(5), alors obj = MyClass(5) crée une instance with x=5 car passing 5 as an argument overrides the default value x=1. When you call MyClass(5), it calls __init__(self, 5), which uses the provided argument 5 instead of the default value 1.

Argument overrides default:
• class MyClass: def __init__(self, x=1): self.x = x; obj = MyClass(5) creates instance with x=5
• __init__ has default parameter: x=1
• MyClass(5) calls __init__(self, 5) (overrides default)
• Sets self.x = 5 (not 1)
• Retourne : instance object

Comment ça fonctionne :
• MyClass(5) creates instance and calls __init__(self, 5)
• Argument 5 overrides default x=1
• __init__ executes: self.x = 5
• Instance attribute x = 5 created
• Retourne : instance object

Exemple :
class MyClass:
    def __init__(self, x=1):
        self.x = x
obj = MyClass(5)             # Calls __init__(self, 5), sets obj.x = 5
obj.x                         # 5 (argument overrides default)

Usages courants :
• Overriding defaults: MyClass(5) (overrides default x=1)
• Flexible initialization: def __init__(self, name='Unknown'): self.name = name
• Instance setup
• Optional parameters

Exemple : Si class MyClass: def __init__(self, x=1): self.x = x; obj = MyClass(5), alors obj = MyClass(5) crée une instance with x=5 car passing 5 as an argument overrides the default parameter value x=1.
`,
  2117: `Les attributs d'instance peuvent être définis après la création d'une instance. Si class MyClass: pass; obj = MyClass(); obj.x = 5; obj.x, alors obj.x retourne 5 car you can assign attributes to an instance after it's created. Python allows you to add new attributes to instances dynamically - you don't need to define them in the class or __init__ method. This is called dynamic attribute assignment.

Définition d'attributs après création :
• class MyClass: pass; obj = MyClass(); obj.x = 5; obj.x retourne 5
• obj = MyClass() creates instance
• obj.x = 5 assigns attribute to instance
• obj.x accesses attribute
• Retourne : 5

Comment ça fonctionne :
• MyClass() creates instance
• obj.x = 5 assigns attribute x = 5 to instance
• Attribute stored in instance __dict__
• obj.x accesses attribute
• Retourne : 5

Exemple :
class MyClass: pass
obj = MyClass()               # Creates instance
obj.x = 5                    # Sets attribute after creation
obj.x                        # 5 (attribute accessible)

Usages courants :
• Dynamic attributes: obj.attr = value (set after creation)
• Flexible objects: obj.data = [] (add attributes as needed)
• Instance attributes
• Dynamic assignment

Exemple : Si class MyClass: pass; obj = MyClass(); obj.x = 5; obj.x, alors obj.x retourne 5 car instance attributes can be set after an instance is created, and obj.x = 5 assigns the attribute to the instance.
`,
  2118: `Chaque appel à une classe crée une instance (objet) distincte. Si class MyClass: pass; obj1 = MyClass(); obj2 = MyClass(); obj1 is obj2, alors obj1 is obj2 retourne False car obj1 and obj2 are different instances - each call to MyClass() creates a new, separate object. The is operator checks object identity (whether two variables refer to the same object), and since obj1 and obj2 are different instances, they are not the same object.

Instances différentes :
• obj1 is obj2 retourne False
• obj1 = MyClass() creates first instance
• obj2 = MyClass() creates second instance (different object)
• Each instance is separate object
• is checks identity (same object)
• Retourne : False

Comment ça fonctionne :
• MyClass() creates first instance (obj1)
• MyClass() creates second instance (obj2)
• obj1 and obj2 are different objects
• obj1 is obj2 checks if same object
• Different objects, so returns: False

Exemple :
class MyClass: pass
obj1 = MyClass()             # Creates first instance
obj2 = MyClass()             # Creates second instance (different)
obj1 is obj2                 # False (different instances)

Usages courants :
• Instance identity: obj1 is obj2 (check if same object)
• Object comparison: if obj1 is obj2: (identity check)
• Instance creation
• Object identity

Exemple : Si class MyClass: pass; obj1 = MyClass(); obj2 = MyClass(); obj1 is obj2, alors obj1 is obj2 retourne False car each call to MyClass() creates a separate instance, so obj1 and obj2 are different objects.
`,
  2119: `La fonction hasattr() vérifie si un objet possède un attribut spécifique. Si class MyClass: pass; obj = MyClass(); hasattr(obj, 'x'), alors hasattr(obj, 'x') retourne False car obj doesn't have an attribute 'x' - it was created from an empty class with no attributes defined. hasattr() retourne True si l'objet possède l'attribut (whether it's defined in the class, set in __init__, or added dynamically), and False otherwise.

Vérification hasattr() :
• hasattr(obj, 'x') retourne False
• obj = MyClass() creates instance
• obj has no attribute 'x'
• hasattr() checks if attribute exists
• Retourne : False

Comment ça fonctionne :
• MyClass() creates instance
• obj has no attributes (empty class)
• hasattr(obj, 'x') checks if 'x' exists
• Attribute doesn't exist
• Retourne : False

Exemple :
class MyClass: pass
obj = MyClass()
hasattr(obj, 'x')            # False (no attribute 'x')
obj.x = 5
hasattr(obj, 'x')            # True (attribute 'x' exists)

Usages courants :
• Attribute checking: if hasattr(obj, 'attr'): use obj.attr
• Safe access: hasattr(obj, 'method') and obj.method()
• Attribute existence
• Object inspection

Exemple : Si class MyClass: pass; obj = MyClass(); hasattr(obj, 'x'), alors hasattr(obj, 'x') retourne False car obj doesn't have an attribute 'x', and hasattr() checks if an object has a specific attribute.
`,
  2120: `La fonction hasattr() retourne True si un objet possède un attribut spécifique. Si class MyClass: def __init__(self, x): self.x = x; obj = MyClass(5); hasattr(obj, 'x'), alors hasattr(obj, 'x') retourne True car obj has an attribute 'x' that was set in __init__. When MyClass(5) is called, __init__(self, 5) sets self.x = 5, creating the instance attribute 'x', so hasattr() returns True.

hasattr() retourne True :
• hasattr(obj, 'x') retourne True
• obj = MyClass(5) creates instance with x=5
• __init__ sets self.x = 5 (attribute exists)
• hasattr() checks if attribute exists
• Retourne : True

Comment ça fonctionne :
• MyClass(5) creates instance and calls __init__(self, 5)
• __init__ sets self.x = 5 (creates attribute)
• obj has attribute 'x'
• hasattr(obj, 'x') checks if 'x' exists
• Attribute exists, so returns: True

Exemple :
class MyClass:
    def __init__(self, x):
        self.x = x
obj = MyClass(5)             # Sets obj.x = 5
hasattr(obj, 'x')            # True (attribute 'x' exists)

Usages courants :
• Attribute checking: if hasattr(obj, 'attr'): use obj.attr
• Safe access: hasattr(obj, 'method') and obj.method()
• Attribute existence
• Object inspection

Exemple : Si class MyClass: def __init__(self, x): self.x = x; obj = MyClass(5); hasattr(obj, 'x'), alors hasattr(obj, 'x') retourne True car obj has an attribute 'x' that was set in __init__, so hasattr() returns True when the attribute exists.
`,
  2121: `self est une référence à l'instance (objet) sur laquelle une méthode est appelée. In a method definition like def method(self):, self is the first parameter that refers to the instance. When you call obj.method(), Python passe automatiquement obj as the self argument. self allows methods to access and modify instance attributes and call other instance methods. It's a convention (not a keyword) - you could use any name, mais self est utilisé universellement.

Paramètre self :
• self refers to the instance
• First parameter in instance methods
• Automatically passed when method called
• Allows access to instance attributes: self.x
• Convention (not keyword)

Comment ça fonctionne :
• def method(self): defines instance method
• self is first parameter (refers to instance)
• obj.method() calls method, passes obj as self
• Method can access instance via self
• self.x accesses instance attribute x

Exemple :
class MyClass:
    def method(self):
        return self  # self is the instance
obj = MyClass()
obj.method() is obj  # True (self refers to obj)

Usages courants :
• Instance access: def method(self): return self.x
• Instance modification: def method(self): self.x = 5
• Instance methods
• Programmation orientée objet

Exemple : self in a method is a reference to the instance car quand on appelle obj.method(), Python passe automatiquement obj as the self argument, allowing the method to access and modify the instance.
`,
  2122: `Les méthodes d'instance sont appelées sur les instances (objets). Si class MyClass: def method(self): return 1; obj = MyClass(); obj.method(), alors obj.method() retourne 1 car obj.method() calls the instance method method() on the instance obj. When you call a method on an instance, Python passe automatiquement the instance as the self argument. The method executes and returns its value (1 in this case).

Appel de méthode d'instance :
• obj.method() retourne 1
• obj is instance of MyClass
• method() is instance method
• obj.method() calls method on instance
• Retourne : 1

Comment ça fonctionne :
• obj = MyClass() creates instance
• obj.method() calls method on instance
• Python passes obj as self argument
• Method executes: return 1
• Retourne : 1

Exemple :
class MyClass:
    def method(self):
        return 1
obj = MyClass()
obj.method()                 # 1 (calls method on instance)

Usages courants :
• Method calls: obj.method() (call on instance)
• Instance methods: def method(self): return value
• Programmation orientée objet
• Method invocation

Exemple : Si class MyClass: def method(self): return 1; obj = MyClass(); obj.method(), alors obj.method() retourne 1 car instance methods are called on instances, and obj.method() calls the method on the instance obj.
`,
  2123: `Les méthodes d'instance peuvent être appelées via la classe en passant explicitement l'instance comme premier argument. Si class MyClass: def method(self): return 1; MyClass.method(MyClass()), alors MyClass.method(MyClass()) returns 1 car you can call an instance method through the class by passing the instance as the first argument. MyClass.method is the unbound method (function), and MyClass() crée une instance to pass as self. This is equivalent to obj = MyClass(); obj.method().

Appel via la classe :
• MyClass.method(MyClass()) returns 1
• MyClass.method is unbound method (function)
• MyClass() creates instance
• MyClass.method(instance) calls method with instance as self
• Retourne : 1

Comment ça fonctionne :
• MyClass.method accesses method via class (unbound)
• MyClass() creates instance
• MyClass.method(instance) calls method with instance as self
• Method executes: return 1
• Retourne : 1

Exemple :
class MyClass:
    def method(self):
        return 1
MyClass.method(MyClass())    # 1 (calls via class with instance)
obj = MyClass()
obj.method()                 # 1 (same result, more common)

Usages courants :
• Unbound method call: Class.method(instance)
• Method access: Class.method (gets unbound method)
• Instance methods
• Method invocation

Exemple : Si class MyClass: def method(self): return 1; MyClass.method(MyClass()), alors MyClass.method(MyClass()) returns 1 car instance methods can be called via the class by explicitly passing the instance as the first argument.
`,
  2124: `Instance methods can take parameters in addition to self. Si class MyClass: def method(self, x): return x * 2; obj = MyClass(); obj.method(5), alors obj.method(5) returns 10 car the method takes a parameter x, and quand on appelle obj.method(5), the argument 5 is passed to x. The method alors returns x * 2 = 5 * 2 = 10. Instance methods can have any number of parameters - self is always first, followed by any other parameters.

Méthode d'instance avec paramètre :
• obj.method(5) returns 10
• method(self, x) takes parameter x
• obj.method(5) passes 5 to x
• Method executes: return x * 2 = 5 * 2
• Retourne : 10

Comment ça fonctionne :
• obj.method(5) calls method on instance
• Python passes obj as self, 5 as x
• Method executes: return x * 2
• Evaluates: 5 * 2 = 10
• Retourne : 10

Exemple :
class MyClass:
    def method(self, x):
        return x * 2
obj = MyClass()
obj.method(5)                # 10 (5 * 2)

Usages courants :
• Method parameters: def method(self, x): return x * 2
• Multiple parameters: def method(self, x, y): return x + y
• Instance methods
• Method arguments

Exemple : Si class MyClass: def method(self, x): return x * 2; obj = MyClass(); obj.method(5), alors obj.method(5) returns 10 car instance methods can take parameters, and obj.method(5) passes 5 to x, so the method returns 5 * 2 = 10.
`,
  2125: `Methods can access instance attributes via self. Si class MyClass: def __init__(self, x): self.x = x; def get_x(self): return self.x; obj = MyClass(5); obj.get_x(), alors obj.get_x() returns 5 car the method get_x() accesses the instance attribute self.x. When MyClass(5) is called, __init__ sets self.x = 5, and when obj.get_x() is called, it returns self.x, which is 5. Methods use self to access instance attributes.

La méthode accède à l'attribut d'instance :
• obj.get_x() returns 5
• __init__ sets self.x = 5
• get_x() accesses self.x
• Returns instance attribute value
• Retourne : 5

Comment ça fonctionne :
• MyClass(5) calls __init__(self, 5)
• __init__ sets self.x = 5
• obj.get_x() calls method on instance
• Method accesses self.x (instance attribute)
• Retourne : 5

Exemple :
class MyClass:
    def __init__(self, x):
        self.x = x
    def get_x(self):
        return self.x
obj = MyClass(5)             # Sets obj.x = 5
obj.get_x()                  # 5 (accesses self.x)

Usages courants :
• Accessing attributes: def get_x(self): return self.x
• Getter methods: def get_value(self): return self.value
• Instance methods
• Attribute access

Exemple : Si class MyClass: def __init__(self, x): self.x = x; def get_x(self): return self.x; obj = MyClass(5); obj.get_x(), alors obj.get_x() returns 5 car methods can access instance attributes via self, and get_x() returns self.x, which is 5.
`,
  2126: `self in a method refers to the instance on which the method is called. Si class MyClass: def method(self): return self; obj = MyClass(); obj.method() is obj, alors obj.method() is obj returns True car self in the method refers to the instance obj. When you call obj.method(), Python passes obj as self, so return self returns obj, and obj.method() is obj checks if the returned value is the same object as obj, which it is.

self réfère à l'instance :
• obj.method() is obj returns True
• obj.method() calls method on instance
• Python passes obj as self
• return self returns obj
• obj.method() is obj checks identity
• Retourne : True

Comment ça fonctionne :
• obj.method() calls method on instance
• Python passes obj as self argument
• Method executes: return self (returns obj)
• obj.method() is obj checks if same object
• Same object, so returns: True

Exemple :
class MyClass:
    def method(self):
        return self
obj = MyClass()
obj.method() is obj          # True (self is obj)

Usages courants :
• Self reference: def method(self): return self
• Instance identity: self is the instance
• Instance methods
• Object identity

Exemple : Si class MyClass: def method(self): return self; obj = MyClass(); obj.method() is obj, alors obj.method() is obj returns True car self in a method refers to the instance on which the method is called, so self is obj.
`,
  2127: `Methods can take another instance as a parameter. Si class MyClass: def method(self, other): return self.x + other.x; obj1 = MyClass(); obj1.x = 1; obj2 = MyClass(); obj2.x = 2; obj1.method(obj2), alors obj1.method(obj2) returns 3 car the method takes another instance (other) as a parameter. When obj1.method(obj2) is called, self refers to obj1 and other refers to obj2, so it returns self.x + other.x = 1 + 2 = 3. This allows methods to interact with other instances of the same class.

Méthode avec une autre instance :
• obj1.method(obj2) returns 3
• method(self, other) takes another instance
• obj1.method(obj2) passes obj2 as other
• self refers to obj1, other refers to obj2
• Returns self.x + other.x = 1 + 2 = 3

Comment ça fonctionne :
• obj1.method(obj2) calls method on obj1
• Python passes obj1 as self, obj2 as other
• Method accesses self.x = 1, other.x = 2
• Method executes: return self.x + other.x
• Evaluates: 1 + 2 = 3
• Retourne : 3

Exemple :
class MyClass:
    def method(self, other):
        return self.x + other.x
obj1 = MyClass(); obj1.x = 1
obj2 = MyClass(); obj2.x = 2
obj1.method(obj2)            # 3 (1 + 2)

Usages courants :
• Instance interaction: def method(self, other): return self.x + other.x
• Comparison: def compare(self, other): return self.value > other.value
• Instance methods
• Object interaction

Exemple : Si class MyClass: def method(self, other): return self.x + other.x; obj1 = MyClass(); obj1.x = 1; obj2 = MyClass(); obj2.x = 2; obj1.method(obj2), alors obj1.method(obj2) returns 3 car methods can take another instance as a parameter, and self.x + other.x = 1 + 2 = 3.
`,
  2128: `Accéder à une méthode via la classe retourne une fonction non liée. Si class MyClass: def method(self): return 'instance'; obj = MyClass(); MyClass.method, alors MyClass.method returns <function MyClass.method> car accessing a method through the class (not an instance) returns the unbound method (function). An unbound method is a function that hasn't been bound to a specific instance - you need to pass the instance as the first argument when calling it. This is different from accessing a method through an instance, which returns a bound method.

Méthode non liée :
• MyClass.method returns <function MyClass.method>
• Accessing via class returns unbound function
• Unbound method not tied to instance
• Must pass instance as first argument
• Retourne : function object

Comment ça fonctionne :
• MyClass.method accesses method via class
• Method not bound to instance
• Returns function object (unbound)
• Can be called: MyClass.method(instance)
• Retourne : <function MyClass.method>

Exemple :
class MyClass:
    def method(self):
        return 'instance'
MyClass.method               # <function MyClass.method> (unbound)
obj = MyClass()
MyClass.method(obj)          # 'instance' (pass instance as argument)

Usages courants :
• Méthode non liée : Class.method (function object)
• Method access: Class.method (gets function)
• Instance methods
• Method objects

Exemple : Si class MyClass: def method(self): return 'instance'; obj = MyClass(); MyClass.method, alors MyClass.method returns <function MyClass.method> car accessing a method via the class returns an unbound function (not bound to a specific instance).
`,
  2129: `Accéder à une méthode via une instance retourne une méthode liée. Si class MyClass: def method(self): return 'instance'; obj = MyClass(); obj.method, alors obj.method returns <bound method MyClass.method> car accessing a method through an instance returns a bound method - a method that's bound to that specific instance. When you call a bound method, Python passe automatiquement the instance as self. This is different from accessing a method through the class, which returns an unbound function.

Méthode liée :
• obj.method returns <bound method MyClass.method>
• Accessing via instance returns bound method
• Bound method tied to instance
• Automatically passes instance as self
• Retourne : bound method object

Comment ça fonctionne :
• obj.method accesses method via instance
• Method bound to instance obj
• Returns bound method object
• Can be called: obj.method() (no need to pass self)
• Retourne : <bound method MyClass.method>

Exemple :
class MyClass:
    def method(self):
        return 'instance'
obj = MyClass()
obj.method                  # <bound method MyClass.method> (bound)
obj.method()                 # 'instance' (calls bound method)

Usages courants :
• Méthode liée : obj.method (bound to instance)
• Method access: obj.method (gets bound method)
• Instance methods
• Method objects

Exemple : Si class MyClass: def method(self): return 'instance'; obj = MyClass(); obj.method, alors obj.method returns <bound method MyClass.method> car accessing a method via an instance returns a bound method (bound to that specific instance).
`,
  2130: `Instance methods can have default parameters. Si class MyClass: def method(self, x=1): return x; obj = MyClass(); obj.method(), alors obj.method() retourne 1 car the method has a default parameter x=1. When you call obj.method() with no arguments, it uses the default value x=1, so the method returns 1. Default parameters allow you to call methods without providing all arguments.

Méthode d'instance avec défaut :
• obj.method() retourne 1
• method(self, x=1) has default parameter
• obj.method() uses default x=1
• Method returns x = 1
• Retourne : 1

Comment ça fonctionne :
• obj.method() calls method on instance
• Python passes obj as self
• No argument provided for x, uses default x=1
• Method executes: return x
• Retourne : 1

Exemple :
class MyClass:
    def method(self, x=1):
        return x
obj = MyClass()
obj.method()                # 1 (uses default x=1)
obj.method(5)                # 5 (overrides default)

Usages courants :
• Default parameters: def method(self, x=1): return x
• Optional arguments: def method(self, name='Unknown'): return name
• Instance methods
• Method arguments

Exemple : Si class MyClass: def method(self, x=1): return x; obj = MyClass(); obj.method(), alors obj.method() retourne 1 car instance methods can have default parameters, and obj.method() uses the default value x=1.
`,
  2131: `Les attributs de classe peuvent être accédés directement via la classe. Si class MyClass: x = 1; MyClass.x, alors MyClass.x retourne 1 car x = 1 is a class attribute (defined in the class body), and you can access it through the class name. Class attributes appartiennent à la classe elle-même, pas aux instances individuelles, so they can be accessed via the class name without creating an instance.

Attribut de classe via la classe :
• MyClass.x retourne 1
• x = 1 is class attribute (defined in class body)
• Class attributes belong to class
• Accessible via class name: MyClass.x
• Retourne : 1

Comment ça fonctionne :
• class MyClass: x = 1 creates class with class attribute
• x = 1 stored in class __dict__
• MyClass.x accesses class attribute
• Returns class attribute value
• Retourne : 1

Exemple :
class MyClass: x = 1
MyClass.x                    # 1 (accessed via class)
obj = MyClass()
obj.x                        # 1 (also accessible via instance)

Usages courants :
• Class attributes: class MyClass: shared_value = 1
• Constants: class Config: MAX_SIZE = 100
• Class-level data
• Shared attributes

Exemple : Si class MyClass: x = 1; MyClass.x, alors MyClass.x retourne 1 car class attributes can be accessed directly via the class name, and x = 1 is a class attribute.
`,
  2132: `Les instances peuvent accéder aux attributs de classe. Si class MyClass: x = 1; obj = MyClass(); obj.x, alors obj.x retourne 1 car instances can access class attributes. When you access an attribute on an instance, Python first looks for an instance attribute. If it doesn't find one, it looks for a class attribute. Since obj doesn't have an instance attribute x, it accesses the class attribute x = 1.

L'instance accède à l'attribut de classe :
• obj.x retourne 1
• obj has no instance attribute x
• Python looks for class attribute x
• Finds class attribute x = 1
• Retourne : 1

Comment ça fonctionne :
• obj = MyClass() creates instance
• obj has no instance attribute x
• obj.x looks for attribute x
• Python searches: instance __dict__ (not found) → class __dict__ (found x = 1)
• Returns class attribute value: 1

Exemple :
class MyClass: x = 1
obj = MyClass()
obj.x                        # 1 (accesses class attribute)
MyClass.x                    # 1 (same value, accessed via class)

Usages courants :
• Accessing class attributes: obj.class_attr (via instance)
• Shared data: all instances share class attributes
• Class-level constants
• Shared state

Exemple : Si class MyClass: x = 1; obj = MyClass(); obj.x, alors obj.x retourne 1 car instances can access class attributes, and when obj doesn't have an instance attribute x, it accesses the class attribute x = 1.
`,
  2133: `Définir un attribut d'instance ne modifie pas l'attribut de classe. Si class MyClass: x = 1; obj = MyClass(); obj.x = 2; MyClass.x, alors MyClass.x retourne 1 car obj.x = 2 crée une instance attribute x = 2 on obj, which shadows (hides) the class attribute, but it doesn't modify the class attribute itself. The class attribute MyClass.x remains 1. Instance attributes and class attributes are separate - modifying one doesn't affect the other.

L'attribut d'instance ne modifie pas l'attribut de classe :
• MyClass.x retourne 1
• obj.x = 2 creates instance attribute (doesn't change class attribute)
• Class attribute MyClass.x remains 1
• Instance attribute shadows class attribute
• Retourne : 1

Comment ça fonctionne :
• obj.x = 2 assigns instance attribute x = 2 to obj
• Instance attribute stored in obj.__dict__
• Class attribute MyClass.x remains in class __dict__
• Instance attribute shadows class attribute for obj
• MyClass.x still returns class attribute: 1

Exemple :
class MyClass: x = 1
obj = MyClass()
obj.x = 2                    # Creates instance attribute
MyClass.x                    # 1 (class attribute unchanged)
obj.x                        # 2 (instance attribute)

Usages courants :
• Instance attributes: obj.attr = value (doesn't affect class)
• Shadowing: instance attribute hides class attribute
• Separate storage
• Attribute independence

Exemple : Si class MyClass: x = 1; obj = MyClass(); obj.x = 2; MyClass.x, alors MyClass.x retourne 1 car setting an instance attribute doesn't change the class attribute - they are separate, and the class attribute remains 1.
`,
  2134: `Les attributs d'instance masquent (cachent) les attributs de classe. Si class MyClass: x = 1; obj = MyClass(); obj.x = 2; obj.x, alors obj.x retourne 2 car obj.x = 2 crée une instance attribute x = 2 on obj, which shadows the class attribute x = 1. When you access obj.x, Python first looks for an instance attribute, finds x = 2, and returns it without checking the class attribute. The instance attribute takes precedence over the class attribute.

L'attribut d'instance masque la classe :
• obj.x retourne 2
• obj.x = 2 creates instance attribute x = 2
• Instance attribute shadows class attribute x = 1
• obj.x retourne instance attribute (not class attribute)
• Retourne : 2

Comment ça fonctionne :
• obj.x = 2 assigns instance attribute x = 2 to obj
• Instance attribute stored in obj.__dict__
• obj.x looks for attribute x
• Python searches: instance __dict__ (finds x = 2) → returns 2
• Class attribute x = 1 is shadowed (not accessed)

Exemple :
class MyClass: x = 1
obj = MyClass()
obj.x = 2                    # Creates instance attribute (shadows class)
obj.x                        # 2 (instance attribute, not class attribute)
MyClass.x                    # 1 (class attribute unchanged)

Usages courants :
• Shadowing: instance attribute hides class attribute
• Instance-specific values: obj.attr = value (overrides class)
• Attribute precedence
• Instance attributes

Exemple : Si class MyClass: x = 1; obj = MyClass(); obj.x = 2; obj.x, alors obj.x retourne 2 car instance attributes shadow class attributes, and obj.x = 2 crée une instance attribute that takes precedence over the class attribute.
`,
  2135: `Instance attributes are independent for each instance. Si class MyClass: x = 1; obj1 = MyClass(); obj2 = MyClass(); obj1.x = 2; obj2.x, alors obj2.x returns 1 car instance attributes are stored separately for each instance. Setting obj1.x = 2 only affects obj1 - it crée une instance attribute on obj1 that shadows the class attribute. obj2 still accesses the class attribute x = 1 car it doesn't have its own instance attribute x.

Attributs d'instance indépendants :
• obj2.x returns 1
• obj1.x = 2 only affects obj1
• obj2 has no instance attribute x
• obj2.x accesses class attribute x = 1
• Retourne : 1

Comment ça fonctionne :
• obj1.x = 2 creates instance attribute on obj1 only
• obj2 has no instance attribute x
• obj2.x looks for attribute x
• Python searches: obj2.__dict__ (not found) → class __dict__ (finds x = 1)
• Returns class attribute: 1

Exemple :
class MyClass: x = 1
obj1 = MyClass(); obj2 = MyClass()
obj1.x = 2                   # Only affects obj1
obj1.x                       # 2 (instance attribute)
obj2.x                       # 1 (class attribute)

Usages courants :
• Independent instances: each instance has own attributes
• Instance-specific data: obj1.attr = value1, obj2.attr = value2
• Instance attributes
• Object independence

Exemple : Si class MyClass: x = 1; obj1 = MyClass(); obj2 = MyClass(); obj1.x = 2; obj2.x, alors obj2.x returns 1 car instance attributes are independent per instance, and obj1.x = 2 only affects obj1, so obj2 still accesses the class attribute x = 1.
`,
  2136: `Mutable class attributes (like lists) are shared by all instances. Si class MyClass: x = []; obj1 = MyClass(); obj2 = MyClass(); obj1.x.append(1); obj2.x, alors obj2.x returns [1] car x = [] is a mutable class attribute (a list), and all instances share the same list object. When obj1.x.append(1) modifies the list, it modifies the shared list, so obj2.x also sees the change. This is a common pitfall - mutable class attributes should typically be initialized in __init__ instead.

Attributs de classe mutables partagés :
• obj2.x returns [1]
• x = [] is mutable class attribute (list)
• All instances share same list object
• obj1.x.append(1) modifies shared list
• obj2.x sees same modified list
• Retourne : [1]

Comment ça fonctionne :
• x = [] creates class attribute (list object)
• obj1 and obj2 both reference same list object
• obj1.x.append(1) modifies shared list
• obj2.x accesses same list object
• Retourne : [1] (modified list)

Exemple :
class MyClass: x = []  # Mutable class attribute (shared!)
obj1 = MyClass(); obj2 = MyClass()
obj1.x.append(1)        # Modifies shared list
obj2.x                  # [1] (same list, modified)

Usages courants :
• Understanding pitfalls: mutable class attributes shared
• Best practice: initialize mutable attributes in __init__
• Shared state
• Mutable attributes

Exemple : Si class MyClass: x = []; obj1 = MyClass(); obj2 = MyClass(); obj1.x.append(1); obj2.x, alors obj2.x returns [1] car mutable class attributes are shared by all instances, so modifying the list through one instance affects all instances.
`,
  2137: `Changing a class attribute affects all instances (if they don't have their own instance attribute shadowing it). Si class MyClass: x = 1; MyClass.x = 2; obj = MyClass(); obj.x, alors obj.x retourne 2 car MyClass.x = 2 changes the class attribute, and since obj doesn't have an instance attribute x (it was just created), it accesses the class attribute, which is now 2. All instances that don't shadow the class attribute will see the new value.

Changer l'attribut de classe affecte les instances :
• obj.x retourne 2
• MyClass.x = 2 changes class attribute
• obj has no instance attribute x (just created)
• obj.x accesses class attribute (now 2)
• Retourne : 2

Comment ça fonctionne :
• MyClass.x = 2 modifies class attribute
• obj = MyClass() creates new instance
• obj has no instance attribute x
• obj.x looks for attribute x
• Python searches: obj.__dict__ (not found) → class __dict__ (finds x = 2)
• Returns class attribute: 2

Exemple :
class MyClass: x = 1
MyClass.x = 2                # Changes class attribute
obj = MyClass()
obj.x                        # 2 (accesses class attribute)

Usages courants :
• Changing class attributes: MyClass.attr = new_value
• Shared updates: change affects all instances (if not shadowed)
• Class-level modifications
• Attribute updates

Exemple : Si class MyClass: x = 1; MyClass.x = 2; obj = MyClass(); obj.x, alors obj.x retourne 2 car changing a class attribute affects all instances that don't shadow it, and obj accesses the class attribute, which is now 2.
`,
  2138: `Deleting an instance attribute reveals (unhides) the class attribute. Si class MyClass: x = 1; obj = MyClass(); obj.x = 2; del obj.x; obj.x, alors obj.x retourne 1 car del obj.x deletes the instance attribute x = 2, which was shadowing the class attribute. After deletion, obj no longer has an instance attribute x, so quand on accède obj.x, Python looks for the class attribute and finds x = 1.

Supprimer l'attribut d'instance révèle la classe :
• obj.x retourne 1
• del obj.x deletes instance attribute x = 2
• obj no longer has instance attribute x
• obj.x looks for attribute x
• Python finds class attribute x = 1
• Retourne : 1

Comment ça fonctionne :
• obj.x = 2 creates instance attribute (shadows class)
• del obj.x deletes instance attribute
• obj.__dict__ no longer has 'x'
• obj.x looks for attribute x
• Python searches: obj.__dict__ (not found) → class __dict__ (finds x = 1)
• Returns class attribute: 1

Exemple :
class MyClass: x = 1
obj = MyClass()
obj.x = 2                    # Creates instance attribute (shadows)
del obj.x                    # Deletes instance attribute
obj.x                        # 1 (now accesses class attribute)

Usages courants :
• Revealing class attributes: del obj.attr (removes shadowing)
• Attribute deletion: del obj.attr (removes instance attribute)
• Attribute management
• Shadowing control

Exemple : Si class MyClass: x = 1; obj = MyClass(); obj.x = 2; del obj.x; obj.x, alors obj.x retourne 1 car deleting an instance attribute reveals the class attribute, and after del obj.x, obj accesses the class attribute x = 1.
`,
  2139: `Changing a class attribute affects instances that don't shadow it. Si class MyClass: x = 1; obj = MyClass(); MyClass.x = 2; obj.x, alors obj.x retourne 2 car MyClass.x = 2 changes the class attribute, and since obj doesn't have an instance attribute x (it was just created), it accesses the class attribute, which is now 2. If obj had an instance attribute x that shadowed the class attribute, changing the class attribute wouldn't affect obj.x.

Changing class affects instance:
• obj.x retourne 2
• MyClass.x = 2 changes class attribute
• obj has no instance attribute x (not shadowed)
• obj.x accesses class attribute (now 2)
• Retourne : 2

Comment ça fonctionne :
• obj = MyClass() creates instance (no instance attribute x)
• MyClass.x = 2 modifies class attribute
• obj.x looks for attribute x
• Python searches: obj.__dict__ (not found) → class __dict__ (finds x = 2)
• Returns class attribute: 2

Exemple :
class MyClass: x = 1
obj = MyClass()              # No instance attribute x
MyClass.x = 2                # Changes class attribute
obj.x                        # 2 (accesses class attribute)

Usages courants :
• Class attribute updates: MyClass.attr = new_value
• Shared changes: affects instances (if not shadowed)
• Class-level modifications
• Attribute updates

Exemple : Si class MyClass: x = 1; obj = MyClass(); MyClass.x = 2; obj.x, alors obj.x retourne 2 car changing a class attribute affects instances that don't shadow it, and obj accesses the class attribute, which is now 2.
`,
  2140: `Instance attributes that shadow class attributes are independent - changing the class attribute doesn't affect them. Si class MyClass: x = 1; obj = MyClass(); obj.x = 2; MyClass.x = 3; obj.x, alors obj.x retourne 2 car obj.x = 2 crée une instance attribute that shadows the class attribute. When you change MyClass.x = 3, it only affects the class attribute, not the instance attribute. Since obj has its own instance attribute x = 2, it continues to return 2, not the class attribute value 3.

Attribut d'instance indépendant :
• obj.x retourne 2
• obj.x = 2 creates instance attribute (shadows class)
• MyClass.x = 3 changes class attribute (doesn't affect instance)
• obj.x retourne instance attribute (not class attribute)
• Retourne : 2

Comment ça fonctionne :
• obj.x = 2 creates instance attribute x = 2
• Instance attribute shadows class attribute
• MyClass.x = 3 modifies class attribute (now 3)
• obj.x looks for attribute x
• Python searches: obj.__dict__ (finds x = 2) → returns 2
• Class attribute x = 3 is shadowed (not accessed)

Exemple :
class MyClass: x = 1
obj = MyClass()
obj.x = 2                    # Creates instance attribute (shadows)
MyClass.x = 3                # Changes class attribute
obj.x                        # 2 (instance attribute, not class attribute)
MyClass.x                    # 3 (class attribute)

Usages courants :
• Shadowing: instance attribute hides class attribute
• Independent values: instance attribute independent of class
• Attribute precedence
• Instance attributes

Exemple : Si class MyClass: x = 1; obj = MyClass(); obj.x = 2; MyClass.x = 3; obj.x, alors obj.x retourne 2 car instance attributes that shadow class attributes are independent, and changing the class attribute doesn't affect the instance attribute.
`,
  2141: `Le décorateur @classmethod crée une méthode de classe qui reçoit la classe comme premier argument. Si class MyClass: @classmethod; def method(cls): return cls; MyClass.method(), alors MyClass.method() retourne <class '__main__.MyClass'> car @classmethod makes method() a class method, and cls refers to the class MyClass. When you call MyClass.method(), Python passe automatiquement MyClass as the cls argument, so return cls returns the class object.

Décorateur @classmethod :
• MyClass.method() retourne <class '__main__.MyClass'>
• @classmethod decorator creates class method
• cls parameter refers to class (automatically passed)
• MyClass.method() passes MyClass as cls
• Retourne : class object

Comment ça fonctionne :
• @classmethod decorator modifies method
• method(cls) receives class as first argument
• MyClass.method() calls class method
• Python passes MyClass as cls argument
• Method executes: return cls
• Retourne : <class '__main__.MyClass'>

Exemple :
class MyClass:
    @classmethod
    def method(cls):
        return cls
MyClass.method()             # <class '__main__.MyClass'> (cls is MyClass)

Usages courants :
• Class methods: @classmethod def method(cls): return cls
• Factory methods: @classmethod def create(cls): return cls()
• Class-level operations
• Alternative constructors

Exemple : Si class MyClass: @classmethod; def method(cls): return cls; MyClass.method(), alors MyClass.method() retourne <class '__main__.MyClass'> car @classmethod creates a class method that receives the class as the first argument (cls), and return cls returns the class object.
`,
  2142: `Class methods can be called on instances, but they still receive the class as the first argument, not the instance. Si class MyClass: @classmethod; def method(cls): return cls; obj = MyClass(); obj.method(), alors obj.method() retourne <class '__main__.MyClass'> car even though you call the method on an instance (obj), @classmethod ensures that cls receives the class MyClass, not the instance obj. This is different from instance methods, which receive the instance as self.

Méthode de classe sur l'instance :
• obj.method() retourne <class '__main__.MyClass'>
• obj.method() calls class method on instance
• @classmethod ensures cls receives class (not instance)
• cls is MyClass (not obj)
• Retourne : class object

Comment ça fonctionne :
• obj.method() calls class method on instance
• @classmethod decorator ensures class passed as cls
• Python passes MyClass as cls (not obj)
• Method executes: return cls
• Retourne : <class '__main__.MyClass'>

Exemple :
class MyClass:
    @classmethod
    def method(cls):
        return cls
obj = MyClass()
obj.method()                 # <class '__main__.MyClass'> (cls is class, not instance)
MyClass.method()             # <class '__main__.MyClass'> (same result)

Usages courants :
• Class methods: can be called on instance or class
• Consistent behavior: obj.method() and Class.method() same
• Class-level operations
• Alternative constructors

Exemple : Si class MyClass: @classmethod; def method(cls): return cls; obj = MyClass(); obj.method(), alors obj.method() retourne <class '__main__.MyClass'> car class methods called on instances still receive the class as the first argument, not the instance.
`,
  2143: `Le décorateur @staticmethod crée une méthode statique qui ne requiert ni self ni cls. Si class MyClass: @staticmethod; def method(): return 1; MyClass.method(), alors MyClass.method() retourne 1 car @staticmethod makes method() a static method that doesn't receive self or cls - it's just a regular function that happens to be defined inside a class. Static methods are called like regular functions, but they're accessed through the class.

Décorateur @staticmethod :
• MyClass.method() retourne 1
• @staticmethod decorator creates static method
• method() doesn't receive self or cls
• Called like regular function
• Retourne : 1

Comment ça fonctionne :
• @staticmethod decorator modifies method
• method() has no self or cls parameter
• MyClass.method() calls static method
• No automatic arguments passed
• Method executes: return 1
• Retourne : 1

Exemple :
class MyClass:
    @staticmethod
    def method():
        return 1
MyClass.method()             # 1 (no self or cls needed)

Usages courants :
• Static methods: @staticmethod def method(): return value
• Utility functions: @staticmethod def helper(): ...
• No instance/class needed
• Regular functions in class namespace

Exemple : Si class MyClass: @staticmethod; def method(): return 1; MyClass.method(), alors MyClass.method() retourne 1 car @staticmethod creates a static method that doesn't require self or cls - it's just a regular function accessed through the class.
`,
  2144: `Static methods can be called on both instances and classes. Si class MyClass: @staticmethod; def method(): return 1; obj = MyClass(); obj.method(), alors obj.method() retourne 1 car static methods can be called on instances just like they can be called on classes. When you call a static method on an instance, it works the same way as calling it on the class - no instance or class is passed as an argument. Static methods are essentially regular functions that are accessed through the class namespace.

Méthode statique sur l'instance :
• obj.method() retourne 1
• obj.method() calls static method on instance
• Static method doesn't receive instance or class
• Works same as MyClass.method()
• Retourne : 1

Comment ça fonctionne :
• obj.method() calls static method on instance
• @staticmethod ensures no automatic arguments
• No self or cls passed
• Method executes: return 1
• Retourne : 1 (same as MyClass.method())

Exemple :
class MyClass:
    @staticmethod
    def method():
        return 1
obj = MyClass()
obj.method()                 # 1 (works on instance)
MyClass.method()             # 1 (works on class, same result)

Usages courants :
• Static methods: can be called on instance or class
• Utility functions: @staticmethod def helper(): ...
• No instance/class needed
• Regular functions in class namespace

Exemple : Si class MyClass: @staticmethod; def method(): return 1; obj = MyClass(); obj.method(), alors obj.method() retourne 1 car static methods can be called on instances or classes, and they work the same way in both cases.
`,
  2145: `The key difference is that @classmethod receives the class as the first argument (cls), while @staticmethod receives nothing. @classmethod def method(cls): receives cls (the class) automatically, allowing it to access class attributes and create instances. @staticmethod def method(): receives no automatic arguments - it's just a regular function. Utilisez @classmethod quand vous avez besoin d'accéder à la classe, et @staticmethod quand vous n'avez besoin ni de la classe ni de l'instance.

Difference:
• @classmethod gets cls (class as first argument)
• @staticmethod gets nothing (no automatic arguments)
• classmethod can access class: cls.attr
• staticmethod is just a regular function
• Use classmethod for class operations, staticmethod for utilities

Comment ça fonctionne :
• @classmethod: def method(cls): (cls is class, automatically passed)
• @staticmethod: def method(): (no automatic arguments)
• classmethod(cls): can use cls to access class attributes
• staticmethod(): just a regular function in class namespace

Exemple :
class MyClass:
    x = 1
    @classmethod
    def get_x(cls):
        return cls.x  # Can access class via cls
    @staticmethod
    def add(a, b):
        return a + b  # No cls or self needed

Usages courants :
• @classmethod: factory methods, class-level operations
• @staticmethod: utility functions, no class/instance needed
• Method types
• Decorators

Exemple : The difference is that @classmethod receives the class as the first argument (cls), allowing access to class attributes, while @staticmethod receives nothing and is just a regular function in the class namespace.
`,
  2146: `Class methods can access class attributes via the cls parameter. Si class MyClass: x = 1; @classmethod; def get_x(cls): return cls.x; MyClass.get_x(), alors MyClass.get_x() returns 1 car the class method get_x() receives cls (the class MyClass) as the first argument, and cls.x accesses the class attribute x = 1. This is the main advantage of @classmethod - it allows methods to access and work with class-level data.

La méthode de classe accède à l'attribut de classe :
• MyClass.get_x() returns 1
• @classmethod makes get_x() a class method
• cls parameter receives MyClass (the class)
• cls.x accesses class attribute x = 1
• Retourne : 1

Comment ça fonctionne :
• MyClass.get_x() calls class method
• Python passes MyClass as cls argument
• Method executes: return cls.x
• cls.x accesses class attribute x = 1
• Retourne : 1

Exemple :
class MyClass:
    x = 1
    @classmethod
    def get_x(cls):
        return cls.x  # Accesses class attribute via cls
MyClass.get_x()       # 1 (cls.x accesses class attribute)

Usages courants :
• Accessing class attributes: @classmethod def get_attr(cls): return cls.attr
• Class-level operations: @classmethod def class_operation(cls): ...
• Class methods
• Class attribute access

Exemple : Si class MyClass: x = 1; @classmethod; def get_x(cls): return cls.x; MyClass.get_x(), alors MyClass.get_x() returns 1 car class methods can access class attributes via cls, and cls.x accesses the class attribute x = 1.
`,
  2147: `Class methods can be used as factory methods to create instances. Si class MyClass: @classmethod; def create(cls): return cls(); obj = MyClass.create(), alors MyClass.create() crée une instance car the class method create() receives cls (the class MyClass) as the first argument, and cls() calls the class constructor, creating a new instance. This is a common pattern for alternative constructors or factory methods that create instances in different ways.

Méthode de classe comme fabrique :
• MyClass.create() creates instance
• @classmethod makes create() a class method
• cls parameter receives MyClass (the class)
• cls() calls class constructor (creates instance)
• Retourne : instance object

Comment ça fonctionne :
• MyClass.create() calls class method
• Python passes MyClass as cls argument
• Method executes: return cls()
• cls() calls MyClass() (creates instance)
• Retourne : new instance object

Exemple :
class MyClass:
    @classmethod
    def create(cls):
        return cls()  # Creates instance using cls
obj = MyClass.create()  # Creates instance (factory method)

Usages courants :
• Factory methods: @classmethod def create(cls): return cls()
• Alternative constructors: @classmethod def from_string(cls, s): ...
• Class methods
• Instance creation

Exemple : Si class MyClass: @classmethod; def create(cls): return cls(); obj = MyClass.create(), alors MyClass.create() crée une instance car class methods can be used as factory methods, and cls() calls the class constructor to create a new instance.
`,
  2148: `Static methods can take regular parameters just like regular functions. Si class MyClass: @staticmethod; def add(x, y): return x + y; MyClass.add(1, 2), alors MyClass.add(1, 2) returns 3 car static methods are essentially regular functions - they can take any parameters you define. The @staticmethod decorator doesn't restrict what parameters the method can have - it just prevents self or cls from being automatically passed.

Méthode statique avec paramètres :
• MyClass.add(1, 2) returns 3
• @staticmethod makes add() a static method
• add(x, y) takes regular parameters
• MyClass.add(1, 2) passes 1 and 2 to x and y
• Retourne : 1 + 2 = 3

Comment ça fonctionne :
• MyClass.add(1, 2) calls static method
• No self or cls automatically passed
• Arguments 1 and 2 passed to x and y
• Method executes: return x + y
• Evaluates: 1 + 2 = 3
• Retourne : 3

Exemple :
class MyClass:
    @staticmethod
    def add(x, y):
        return x + y
MyClass.add(1, 2)            # 3 (regular parameters work)

Usages courants :
• Static methods: @staticmethod def helper(x, y): return x + y
• Utility functions: @staticmethod def calculate(a, b): ...
• Regular parameters
• No self/cls needed

Exemple : Si class MyClass: @staticmethod; def add(x, y): return x + y; MyClass.add(1, 2), alors MyClass.add(1, 2) returns 3 car static methods can take regular parameters, and they work just like regular functions.
`,
  2149: `A class can have both instance methods and class methods. Si class MyClass: def method(self): return 1; @classmethod; def class_method(cls): return 2; MyClass.class_method(), alors MyClass.class_method() returns 2 car a class can define multiple types of methods. Instance methods (like method(self)) receive the instance as self, while class methods (like class_method(cls)) receive the class as cls. They coexist in the same class and can be called independently.

Les deux types de méthodes :
• MyClass.class_method() returns 2
• Class has instance method: method(self)
• Class has class method: class_method(cls)
• Both methods coexist in same class
• Retourne : 2

Comment ça fonctionne :
• class MyClass defines both method types
• method(self) is instance method (receives instance)
• class_method(cls) is class method (receives class)
• MyClass.class_method() calls class method
• Retourne : 2

Exemple :
class MyClass:
    def method(self):
        return 1  # Instance method
    @classmethod
    def class_method(cls):
        return 2  # Class method
obj = MyClass()
obj.method()                 # 1 (instance method)
MyClass.class_method()       # 2 (class method)

Usages courants :
• Multiple method types: instance methods and class methods
• Flexible design: different methods for different purposes
• Method types
• Class design

Exemple : Si class MyClass: def method(self): return 1; @classmethod; def class_method(cls): return 2; MyClass.class_method(), alors MyClass.class_method() returns 2 car a class can have both instance methods and class methods, and they coexist in the same class.
`,
  2150: `Static methods work the same whether called on an instance or the class. Si class MyClass: @staticmethod; def method(): return 'static'; obj = MyClass(); obj.method(), alors obj.method() retourne 'static' car static methods don't receive self or cls, so calling them on an instance works exactly the same as calling them on the class. The instance is ignored - the static method is just a regular function accessed through the class namespace.

Méthode statique sur l'instance :
• obj.method() retourne 'static'
• obj.method() calls static method on instance
• Static method doesn't use instance
• Works same as MyClass.method()
• Retourne : 'static'

Comment ça fonctionne :
• obj.method() calls static method on instance
• @staticmethod ensures no self or cls passed
• Instance obj is ignored
• Method executes: return 'static'
• Retourne : 'static' (same as MyClass.method())

Exemple :
class MyClass:
    @staticmethod
    def method():
        return 'static'
obj = MyClass()
obj.method()                 # 'static' (works on instance)
MyClass.method()             # 'static' (works on class, same result)

Usages courants :
• Static methods: work on instance or class
• Utility functions: @staticmethod def helper(): ...
• No instance/class needed
• Consistent behavior

Exemple : Si class MyClass: @staticmethod; def method(): return 'static'; obj = MyClass(); obj.method(), alors obj.method() retourne 'static' car static methods called on instances work the same as when called on the class - the instance is ignored.
`,
  2151: `La méthode __str__ définit la représentation en chaîne d'un objet pour str() et print(). Si class MyClass: def __str__(self): return 'str'; obj = MyClass(); str(obj), alors str(obj) returns 'str' car __str__ is a special method that's called when you use str() or print() on an object. It should return a human-readable string representation of the object.

__str__ method:
• str(obj) returns 'str'
• __str__ defines string representation
• Called by str() and print()
• Should return human-readable string
• Retourne : 'str'

Comment ça fonctionne :
• obj = MyClass() creates instance
• str(obj) calls __str__ method
• __str__ executes: return 'str'
• Returns string representation
• Retourne : 'str'

Exemple :
class MyClass:
    def __str__(self):
        return 'str'
obj = MyClass()
str(obj)                     # 'str' (uses __str__)
print(obj)                   # str (uses __str__)

Usages courants :
• String representation: def __str__(self): return 'readable string'
• User-friendly output: print(obj) uses __str__
• Special methods
• Object representation

Exemple : Si class MyClass: def __str__(self): return 'str'; obj = MyClass(); str(obj), alors str(obj) returns 'str' car __str__ defines the string representation for str() and print().
`,
  2152: `La méthode __repr__ définit la représentation en chaîne « officielle » d'un objet pour repr(). Si class MyClass: def __repr__(self): return 'repr'; obj = MyClass(); repr(obj), alors repr(obj) returns 'repr' car __repr__ is a special method that's called when you use repr() on an object. It should return an unambiguous string representation that ideally could be used to recreate the object. If __str__ is not defined, __repr__ is used as a fallback.

__repr__ method:
• repr(obj) returns 'repr'
• __repr__ defines official string representation
• Called by repr()
• Should return unambiguous string
• Used as fallback if __str__ not defined
• Retourne : 'repr'

Comment ça fonctionne :
• obj = MyClass() creates instance
• repr(obj) calls __repr__ method
• __repr__ executes: return 'repr'
• Returns official string representation
• Retourne : 'repr'

Exemple :
class MyClass:
    def __repr__(self):
        return 'repr'
obj = MyClass()
repr(obj)                    # 'repr' (uses __repr__)

Usages courants :
• Official representation: def __repr__(self): return 'unambiguous string'
• Debugging: repr(obj) shows official representation
• Special methods
• Object representation

Exemple : Si class MyClass: def __repr__(self): return 'repr'; obj = MyClass(); repr(obj), alors repr(obj) returns 'repr' car __repr__ defines the official string representation for repr().
`,
  2153: `print() uses __str__ if available, falling back to __repr__ if __str__ is not defined. Si class MyClass: def __str__(self): return 'str'; def __repr__(self): return 'repr'; obj = MyClass(); print(obj), alors print(obj) outputs str car print() prefers __str__ over __repr__. When both are defined, __str__ is used for user-friendly output, while __repr__ is used for the official representation (e.g., in the REPL or for debugging).

print() uses __str__:
• print(obj) outputs str
• print() prefers __str__ over __repr__
• __str__ is for user-friendly output
• __repr__ is for official representation
• Retourne : str (printed)

Comment ça fonctionne :
• obj = MyClass() creates instance
• print(obj) calls __str__ method (preferred)
• __str__ executes: return 'str'
• print() outputs the string
• Affichage : str

Exemple :
class MyClass:
    def __str__(self):
        return 'str'
    def __repr__(self):
        return 'repr'
obj = MyClass()
print(obj)                   # str (uses __str__)
repr(obj)                    # 'repr' (uses __repr__)

Usages courants :
• User-friendly output: print(obj) uses __str__
• Official representation: repr(obj) uses __repr__
• Special methods
• Object representation

Exemple : Si class MyClass: def __str__(self): return 'str'; def __repr__(self): return 'repr'; obj = MyClass(); print(obj), alors print(obj) outputs str car print() uses __str__ if available, preferring it over __repr__.
`,
  2154: `La méthode __len__ définit le comportement pour len(). Si class MyClass: def __len__(self): return 5; obj = MyClass(); len(obj), alors len(obj) returns 5 car __len__ is a special method that's called when you use len() on an object. It should return a non-negative integer representing the "length" of the object. This is commonly used for container-like objects (lists, strings, custom collections).

__len__ method:
• len(obj) returns 5
• __len__ defines length behavior
• Called by len()
• Should return non-negative integer
• Retourne : 5

Comment ça fonctionne :
• obj = MyClass() creates instance
• len(obj) calls __len__ method
• __len__ executes: return 5
• Returns length value
• Retourne : 5

Exemple :
class MyClass:
    def __len__(self):
        return 5
obj = MyClass()
len(obj)                     # 5 (uses __len__)

Usages courants :
• Length definition: def __len__(self): return length
• Container-like objects: len(obj) for custom collections
• Special methods
• Object length

Exemple : Si class MyClass: def __len__(self): return 5; obj = MyClass(); len(obj), alors len(obj) returns 5 car __len__ defines the behavior for len().
`,
  2155: `La méthode __eq__ définit le comportement pour l'opérateur ==. Si class MyClass: def __eq__(self, other): return True; obj1 = MyClass(); obj2 = MyClass(); obj1 == obj2, alors obj1 == obj2 returns True car __eq__ is a special method that's called when you use == to compare objects. By default (without __eq__), == compares object identity (same as is), but __eq__ allows you to define custom equality logic.

__eq__ method:
• obj1 == obj2 returns True
• __eq__ defines == behavior
• Called by == operator
• Can define custom equality logic
• Retourne : True

Comment ça fonctionne :
• obj1 == obj2 uses == operator
• Python calls obj1.__eq__(obj2)
• __eq__ executes: return True
• Returns comparison result
• Retourne : True

Exemple :
class MyClass:
    def __eq__(self, other):
        return True  # Always equal
obj1 = MyClass(); obj2 = MyClass()
obj1 == obj2                # True (uses __eq__)

Usages courants :
• Custom equality: def __eq__(self, other): return self.value == other.value
• Value comparison: == compares values, not identity
• Special methods
• Operator overloading

Exemple : Si class MyClass: def __eq__(self, other): return True; obj1 = MyClass(); obj2 = MyClass(); obj1 == obj2, alors obj1 == obj2 returns True car __eq__ defines the behavior for the == operator.
`,
  2156: `La méthode __lt__ définit le comportement pour l'opérateur < (inférieur à). Si class MyClass: def __lt__(self, other): return True; obj1 = MyClass(); obj2 = MyClass(); obj1 < obj2, alors obj1 < obj2 returns True car __lt__ is a special method that's called when you use < to compare objects. This is used for ordering and sorting. Python can automatically provide other comparison operators (>, <=, >=) if you define __lt__ and __eq__, or you can define them explicitly.

__lt__ method:
• obj1 < obj2 returns True
• __lt__ defines < behavior
• Called by < operator
• Used for ordering/sorting
• Retourne : True

Comment ça fonctionne :
• obj1 < obj2 uses < operator
• Python calls obj1.__lt__(obj2)
• __lt__ executes: return True
• Returns comparison result
• Retourne : True

Exemple :
class MyClass:
    def __lt__(self, other):
        return True  # Always less than
obj1 = MyClass(); obj2 = MyClass()
obj1 < obj2                 # True (uses __lt__)

Usages courants :
• Custom ordering: def __lt__(self, other): return self.value < other.value
• Sorting: objects can be sorted using <
• Special methods
• Operator overloading

Exemple : Si class MyClass: def __lt__(self, other): return True; obj1 = MyClass(); obj2 = MyClass(); obj1 < obj2, alors obj1 < obj2 returns True car __lt__ defines the behavior for the < operator.
`,
  2157: `La méthode __add__ définit le comportement pour l'opérateur +. Si class MyClass: def __add__(self, other): return 10; obj1 = MyClass(); obj2 = MyClass(); obj1 + obj2, alors obj1 + obj2 returns 10 car __add__ is a special method that's called when you use + to add objects. This allows you to define custom addition behavior for your objects, making them work with the + operator.

__add__ method:
• obj1 + obj2 returns 10
• __add__ defines + behavior
• Called by + operator
• Can define custom addition
• Retourne : 10

Comment ça fonctionne :
• obj1 + obj2 uses + operator
• Python calls obj1.__add__(obj2)
• __add__ executes: return 10
• Returns addition result
• Retourne : 10

Exemple :
class MyClass:
    def __add__(self, other):
        return 10  # Custom addition
obj1 = MyClass(); obj2 = MyClass()
obj1 + obj2                # 10 (uses __add__)

Usages courants :
• Custom addition: def __add__(self, other): return self.value + other.value
• Operator overloading: objects work with + operator
• Special methods
• Arithmetic operations

Exemple : Si class MyClass: def __add__(self, other): return 10; obj1 = MyClass(); obj2 = MyClass(); obj1 + obj2, alors obj1 + obj2 returns 10 car __add__ defines the behavior for the + operator.
`,
  2158: `La méthode __getitem__ définit le comportement pour l'indexation []. Si class MyClass: def __getitem__(self, key): return key * 2; obj = MyClass(); obj[5], alors obj[5] returns 10 car __getitem__ is a special method that's called when you use [] to access elements. This allows you to make your objects work like sequences or mappings (like lists or dictionaries). The key parameter can be an index, a slice, or any other value depending on your use case.

__getitem__ method:
• obj[5] returns 10
• __getitem__ defines [] indexing behavior
• Called by [] operator
• key parameter is the index/key
• Retourne : key * 2 = 5 * 2 = 10

Comment ça fonctionne :
• obj[5] uses [] indexing
• Python calls obj.__getitem__(5)
• __getitem__ executes: return key * 2
• Evaluates: 5 * 2 = 10
• Retourne : 10

Exemple :
class MyClass:
    def __getitem__(self, key):
        return key * 2
obj = MyClass()
obj[5]                      # 10 (uses __getitem__)

Usages courants :
• Indexing: def __getitem__(self, key): return self.data[key]
• Sequence-like objects: make objects work like lists
• Special methods
• Operator overloading

Exemple : Si class MyClass: def __getitem__(self, key): return key * 2; obj = MyClass(); obj[5], alors obj[5] returns 10 car __getitem__ defines the behavior for [] indexing, and key * 2 = 5 * 2 = 10.
`,
  2159: `La méthode __setitem__ définit le comportement pour l'affectation []. Si class MyClass: def __setitem__(self, key, value): self.data = {key: value}; obj = MyClass(); obj[5] = 10; obj.data, alors obj.data returns {5: 10} car __setitem__ is a special method that's called when you use [] to assign values. This allows you to make your objects work like mutable sequences or mappings. The key parameter is the index/key, and value is the value being assigned.

__setitem__ method:
• obj[5] = 10 calls __setitem__
• __setitem__ defines [] assignment behavior
• Called by [] = assignment
• key = 5, value = 10
• Sets self.data = {5: 10}
• Retourne : {5: 10}

Comment ça fonctionne :
• obj[5] = 10 uses [] assignment
• Python calls obj.__setitem__(5, 10)
• __setitem__ executes: self.data = {key: value}
• Sets self.data = {5: 10}
• obj.data returns {5: 10}

Exemple :
class MyClass:
    def __setitem__(self, key, value):
        self.data = {key: value}
obj = MyClass()
obj[5] = 10                 # Calls __setitem__(5, 10)
obj.data                    # {5: 10}

Usages courants :
• Assignment: def __setitem__(self, key, value): self.data[key] = value
• Mutable objects: make objects work like dictionaries
• Special methods
• Operator overloading

Exemple : Si class MyClass: def __setitem__(self, key, value): self.data = {key: value}; obj = MyClass(); obj[5] = 10; obj.data, alors obj.data returns {5: 10} car __setitem__ defines the behavior for [] assignment, and it sets self.data = {5: 10}.
`,
  2160: `La méthode __call__ rend une instance appelable (comme une fonction). Si class MyClass: def __call__(self): return 'called'; obj = MyClass(); obj(), alors obj() returns 'called' car __call__ is a special method that's called when you use () to call an instance. This allows you to make objects that behave like functions - you can call them with parentheses. This is useful for callable objects, function-like classes, or implementing the callable pattern.

__call__ method:
• obj() returns 'called'
• __call__ makes instance callable
• Called by () operator
• Instance can be called like function
• Retourne : 'called'

Comment ça fonctionne :
• obj() calls instance like function
• Python calls obj.__call__()
• __call__ executes: return 'called'
• Returns call result
• Retourne : 'called'

Exemple :
class MyClass:
    def __call__(self):
        return 'called'
obj = MyClass()
obj()                        # 'called' (instance is callable)

Usages courants :
• Callable objects: def __call__(self, *args): return result
• Function-like classes: make classes work like functions
• Special methods
• Operator overloading

Exemple : Si class MyClass: def __call__(self): return 'called'; obj = MyClass(); obj(), alors obj() returns 'called' car __call__ makes an instance callable, allowing you to call it like a function.
`,
  2161: `Le décorateur @property rend une méthode accessible comme un attribut. Si class MyClass: @property; def x(self): return 1; obj = MyClass(); obj.x, alors obj.x retourne 1 car @property converts the method x() into a property, allowing you to access it like an attribute (without parentheses). This provides a clean interface for computed properties or attributes with getters/setters.

@property decorator:
• obj.x retourne 1
• @property makes method accessible as attribute
• No parentheses needed: obj.x (not obj.x())
• Method is called automatically
• Retourne : 1

Comment ça fonctionne :
• @property decorator modifies method
• Method becomes property (accessible as attribute)
• obj.x accesses property (calls method automatically)
• Method executes: return 1
• Retourne : 1

Exemple :
class MyClass:
    @property
    def x(self):
        return 1
obj = MyClass()
obj.x                        # 1 (accessed as attribute, not method)

Usages courants :
• Computed properties: @property def area(self): return self.width * self.height
• Clean interface: obj.attr instead of obj.get_attr()
• Properties
• Attribute-like access

Exemple : Si class MyClass: @property; def x(self): return 1; obj = MyClass(); obj.x, alors obj.x retourne 1 car @property makes the method accessible as an attribute, so you can access it without parentheses.
`,
  2162: `A property without a setter is read-only - you cannot assign to it. Si class MyClass: @property; def x(self): return 1; obj = MyClass(); obj.x = 2, alors obj.x = 2 raises an AttributeError car the property only has a getter (defined by @property), but no setter. To make a property writable, you need to define a setter using @x.setter. Without a setter, the property is read-only.

Property without setter:
• obj.x = 2 raises AttributeError
• Property only has getter (no setter)
• Cannot assign to read-only property
• Raises AttributeErreur : can't set attribute
• Erreur : AttributeError

Comment ça fonctionne :
• obj.x = 2 attempts to assign to property
• Property has no setter defined
• Python cannot set read-only property
• Raises AttributeErreur : can't set attribute

Exemple :
class MyClass:
    @property
    def x(self):
        return 1
obj = MyClass()
obj.x                        # 1 (read works)
obj.x = 2                    # AttributeError (no setter, read-only)

Usages courants :
• Read-only properties: @property def value(self): return self._value
• Computed properties: @property def area(self): return self.width * self.height
• Properties
• Attribute protection

Exemple : Si class MyClass: @property; def x(self): return 1; obj = MyClass(); obj.x = 2, alors obj.x = 2 raises an AttributeError car a property without a setter is read-only and cannot be assigned to.
`,
  2163: `A property with both a getter (@property) and a setter (@x.setter) allows both reading and writing. Si class MyClass: @property; def x(self): return self._x; @x.setter; def x(self, value): self._x = value; obj = MyClass(); obj.x = 5; obj.x, alors obj.x retourne 5 car the property has a setter that stores the value in self._x, and the getter retrieves it. This provides controlled access to attributes with validation or transformation if needed.

Property with setter:
• obj.x = 5 assigns value (uses setter)
• obj.x retourne 5 (uses getter)
• @property defines getter
• @x.setter defines setter
• Retourne : 5

Comment ça fonctionne :
• obj.x = 5 calls setter: @x.setter def x(self, value)
• Setter executes: self._x = value (stores 5)
• obj.x calls getter: @property def x(self)
• Getter executes: return self._x (returns 5)
• Retourne : 5

Exemple :
class MyClass:
    @property
    def x(self):
        return self._x
    @x.setter
    def x(self, value):
        self._x = value
obj = MyClass()
obj.x = 5                    # Uses setter
obj.x                        # 5 (uses getter)

Usages courants :
• Read-write properties: @property with @setter
• Controlled access: validation in setter
• Properties
• Attribute access control

Exemple : Si class MyClass: @property; def x(self): return self._x; @x.setter; def x(self, value): self._x = value; obj = MyClass(); obj.x = 5; obj.x, alors obj.x retourne 5 car the property has both a getter and setter, allowing read and write access.
`,
  2164: `A property setter can transform the value before storing it. Si class MyClass: @property; def x(self): return self._x; @x.setter; def x(self, value): self._x = value * 2; obj = MyClass(); obj.x = 5; obj.x, alors obj.x retourne 10 car the setter multiplies the value by 2 before storing it (self._x = value * 2 = 5 * 2 = 10). This allows you to validate, transform, or process values before they're stored.

Setter transforms value:
• obj.x = 5 calls setter with value = 5
• Setter executes: self._x = value * 2 = 5 * 2 = 10
• obj.x calls getter: return self._x
• Returns stored value: 10
• Retourne : 10

Comment ça fonctionne :
• obj.x = 5 calls setter: @x.setter def x(self, value)
• Setter transforms: self._x = value * 2
• Evaluates: 5 * 2 = 10
• Stores: self._x = 10
• obj.x returns: 10

Exemple :
class MyClass:
    @property
    def x(self):
        return self._x
    @x.setter
    def x(self, value):
        self._x = value * 2  # Transforms value
obj = MyClass()
obj.x = 5                    # Stores 10 (5 * 2)
obj.x                        # 10 (transformed value)

Usages courants :
• Value transformation: @x.setter def x(self, value): self._x = transform(value)
• Validation: @x.setter def x(self, value): if valid: self._x = value
• Properties
• Attribute control

Exemple : Si class MyClass: @property; def x(self): return self._x; @x.setter; def x(self, value): self._x = value * 2; obj = MyClass(); obj.x = 5; obj.x, alors obj.x retourne 10 car the setter transforms the value before storing it (5 * 2 = 10).
`,
  2165: `The @x.deleter decorator defines the behavior for the del statement. Si class MyClass: @property; def x(self): return self._x; @x.deleter; def x(self): del self._x; obj = MyClass(); obj._x = 1; del obj.x; hasattr(obj, '_x'), alors hasattr(obj, '_x') returns False car @x.deleter defines what happens when you delete the property, and del obj.x calls the deleter, which deletes self._x. This provides controlled deletion of attributes.

@deleter decorator:
• del obj.x calls deleter
• @x.deleter defines deletion behavior
• Deleter executes: del self._x
• Attribute _x is deleted
• hasattr(obj, '_x') returns False

Comment ça fonctionne :
• obj._x = 1 sets attribute
• del obj.x calls deleter: @x.deleter def x(self)
• Deleter executes: del self._x
• Attribute _x is deleted
• hasattr(obj, '_x') checks if attribute exists
• Retourne : False

Exemple :
class MyClass:
    @property
    def x(self):
        return self._x
    @x.deleter
    def x(self):
        del self._x
obj = MyClass()
obj._x = 1
del obj.x                    # Calls deleter
hasattr(obj, '_x')          # False (deleted)

Usages courants :
• Controlled deletion: @x.deleter def x(self): cleanup logic
• Property deletion: del obj.property (uses deleter)
• Properties
• Attribute management

Exemple : Si class MyClass: @property; def x(self): return self._x; @x.deleter; def x(self): del self._x; obj = MyClass(); obj._x = 1; del obj.x; hasattr(obj, '_x'), alors hasattr(obj, '_x') returns False car @x.deleter defines the behavior for del, and del obj.x calls the deleter, which deletes self._x.
`,
  2166: `Properties can access "private" attributes (convention: single underscore prefix). Si class MyClass: def __init__(self): self._x = 1; @property; def x(self): return self._x; obj = MyClass(); obj.x, alors obj.x retourne 1 car the property getter accesses the private attribute self._x. The single underscore prefix (_x) is a convention indicating that the attribute is intended for internal use, but it's not enforced by Python - it's just a naming convention.

Property accesses private attribute:
• obj.x retourne 1
• Property getter accesses self._x
• _x is private attribute (convention)
• Single underscore indicates internal use
• Retourne : 1

Comment ça fonctionne :
• __init__ sets self._x = 1
• obj.x calls property getter
• Getter executes: return self._x
• Accesses private attribute _x = 1
• Retourne : 1

Exemple :
class MyClass:
    def __init__(self):
        self._x = 1  # Private attribute (convention)
    @property
    def x(self):
        return self._x  # Accesses private attribute
obj = MyClass()
obj.x                        # 1 (property accesses _x)

Usages courants :
• Encapsulation: @property def value(self): return self._value
• Private attributes: _attr (convention, not enforced)
• Properties
• Attribute access control

Exemple : Si class MyClass: def __init__(self): self._x = 1; @property; def x(self): return self._x; obj = MyClass(); obj.x, alors obj.x retourne 1 car properties can access private attributes (convention: _ prefix), and the getter returns self._x.
`,
  2167: `Accessing a property via the class returns the property object itself, not the property value. Si class MyClass: @property; def x(self): return 1; obj = MyClass(); MyClass.x, alors MyClass.x retourne <property object> car accessing a property through the class (not an instance) returns the property descriptor object, not the result of calling the getter. To get the value, you need to access it through an instance: obj.x.

Property via class:
• MyClass.x retourne <property object>
• Accessing via class returns property object
• Property object is descriptor
• Not the property value
• Retourne : <property object>

Comment ça fonctionne :
• MyClass.x accesses property via class
• Property is descriptor object
• Returns property object (not value)
• obj.x would return value (1)
• Retourne : <property object>

Exemple :
class MyClass:
    @property
    def x(self):
        return 1
MyClass.x                    # <property object> (property descriptor)
obj = MyClass()
obj.x                        # 1 (property value)

Usages courants :
• Property descriptor: MyClass.attr (property object)
• Descriptors: properties are descriptor objects
• Properties
• Object introspection

Exemple : Si class MyClass: @property; def x(self): return 1; obj = MyClass(); MyClass.x, alors MyClass.x retourne <property object> car accessing a property via the class returns the property descriptor object, not the property value.
`,
  2168: `The property() function can be created with a lambda function. Si class MyClass: x = property(lambda self: 1); obj = MyClass(); obj.x, alors obj.x retourne 1 car property() can take a function (or lambda) as the getter argument. This is an alternative way to create properties without using the @property decorator. The lambda function receives self as its argument and returns the property value.

property() with lambda:
• obj.x retourne 1
• property(lambda self: 1) creates property
• Lambda is getter function
• Receives self, returns 1
• Retourne : 1

Comment ça fonctionne :
• property(lambda self: 1) creates property
• Lambda is getter: lambda self: 1
• obj.x accesses property
• Calls lambda with self = obj
• Lambda returns: 1
• Retourne : 1

Exemple :
class MyClass:
    x = property(lambda self: 1)  # Property with lambda
obj = MyClass()
obj.x                        # 1 (lambda returns 1)

Usages courants :
• Simple properties: x = property(lambda self: value)
• Alternative syntax: property() instead of @property
• Properties
• Property creation

Exemple : Si class MyClass: x = property(lambda self: 1); obj = MyClass(); obj.x, alors obj.x retourne 1 car property() can be created with a lambda function, and the lambda serves as the getter.
`,
  2169: `A property can have a default value if the underlying attribute doesn't exist. Si class MyClass: @property; def x(self): return self._x if hasattr(self, '_x') else 0; obj = MyClass(); obj.x, alors obj.x retourne 0 car the property getter checks if self._x exists using hasattr(). If it doesn't exist, it returns the default value 0. This allows properties to work even when the underlying attribute hasn't been set yet.

Property with default:
• obj.x retourne 0
• Property checks if _x exists
• hasattr(self, '_x') returns False
• Returns default value: 0
• Retourne : 0

Comment ça fonctionne :
• obj.x calls property getter
• Getter checks: hasattr(self, '_x')
• _x doesn't exist (not set)
• Returns default: 0
• Retourne : 0

Exemple :
class MyClass:
    @property
    def x(self):
        return self._x if hasattr(self, '_x') else 0
obj = MyClass()
obj.x                        # 0 (default, _x doesn't exist)
obj._x = 5
obj.x                        # 5 (_x exists)

Usages courants :
• Default values: @property def x(self): return self._x if hasattr(self, '_x') else default
• Computed defaults: properties with fallback values
• Properties
• Attribute defaults

Exemple : Si class MyClass: @property; def x(self): return self._x if hasattr(self, '_x') else 0; obj = MyClass(); obj.x, alors obj.x retourne 0 car the property can have a default value if the attribute doesn't exist, and hasattr() checks for existence.
`,
  2170: `A setter that doesn't store the value doesn't change the property. Si class MyClass: @property; def x(self): return 1; @x.setter; def x(self, value): pass; obj = MyClass(); obj.x = 5; obj.x, alors obj.x retourne 1 car the setter has pass (does nothing), so it doesn't store the value. The getter still returns 1, and the assignment obj.x = 5 has no effect car the setter doesn't actually store anything. The value 5 is passed to the setter but ignored.

Setter doesn't store:
• obj.x = 5 calls setter
• Setter executes: pass (does nothing)
• Value 5 is ignored (not stored)
• obj.x calls getter: return 1
• Retourne : 1 (unchanged)

Comment ça fonctionne :
• obj.x = 5 calls setter: @x.setter def x(self, value)
• Setter executes: pass (does nothing)
• Value 5 is not stored
• obj.x calls getter: @property def x(self)
• Getter returns: 1 (unchanged)
• Retourne : 1

Exemple :
class MyClass:
    @property
    def x(self):
        return 1
    @x.setter
    def x(self, value):
        pass  # Doesn't store value
obj = MyClass()
obj.x = 5                    # Calls setter (ignores value)
obj.x                        # 1 (getter unchanged)

Usages courants :
• Read-only simulation: setter that ignores values
• Validation-only setters: setter that validates but doesn't store
• Properties
• Attribute control

Exemple : Si class MyClass: @property; def x(self): return 1; @x.setter; def x(self, value): pass; obj = MyClass(); obj.x = 5; obj.x, alors obj.x retourne 1 car a setter that doesn't store the value doesn't change the property, so the getter still returns 1.
`,
  2171: `La fonction getattr() obtient la valeur d'un attribut depuis un objet. Si class MyClass: pass; obj = MyClass(); obj.x = 1; getattr(obj, 'x'), alors getattr(obj, 'x') returns 1 car getattr() retrieves the value of the attribute 'x' from obj. It's equivalent to obj.x, but allows you to get attributes dynamically using a string name. This is useful when the attribute name is stored in a variable.

getattr() function:
• getattr(obj, 'x') returns 1
• getattr() gets attribute value
• Equivalent to obj.x
• Attribute name is string: 'x'
• Retourne : 1

Comment ça fonctionne :
• obj.x = 1 sets attribute x = 1
• getattr(obj, 'x') gets attribute 'x'
• Searches for attribute 'x' on obj
• Finds x = 1
• Retourne : 1

Exemple :
class MyClass: pass
obj = MyClass()
obj.x = 1
getattr(obj, 'x')            # 1 (gets attribute 'x')
obj.x                        # 1 (equivalent)

Usages courants :
• Dynamic access: getattr(obj, attr_name) (attr_name is variable)
• Attribute retrieval: getattr(obj, 'method')()
• Object introspection
• Dynamic attribute access

Exemple : Si class MyClass: pass; obj = MyClass(); obj.x = 1; getattr(obj, 'x'), alors getattr(obj, 'x') returns 1 car getattr() gets the attribute value from an object, equivalent to obj.x.
`,
  2172: `The getattr() function can take a default value that's returned if the attribute doesn't exist. Si class MyClass: pass; obj = MyClass(); getattr(obj, 'x', 0), alors getattr(obj, 'x', 0) returns 0 car obj doesn't have an attribute 'x', so getattr() returns the default value 0 instead of raising an AttributeError. This is useful for safely accessing attributes that might not exist.

getattr() with default:
• getattr(obj, 'x', 0) returns 0
• obj doesn't have attribute 'x'
• getattr() returns default value: 0
• No AttributeError raised
• Retourne : 0

Comment ça fonctionne :
• getattr(obj, 'x', 0) gets attribute 'x'
• obj doesn't have attribute 'x'
• Attribute not found
• Returns default value: 0
• Retourne : 0

Exemple :
class MyClass: pass
obj = MyClass()
getattr(obj, 'x', 0)         # 0 (default, 'x' doesn't exist)
getattr(obj, 'x')            # AttributeError (no default)
obj.x = 1
getattr(obj, 'x', 0)         # 1 (attribute exists)

Usages courants :
• Safe access: getattr(obj, 'attr', default) (no error if missing)
• Default values: getattr(obj, 'value', 0)
• Object introspection
• Dynamic attribute access

Exemple : Si class MyClass: pass; obj = MyClass(); getattr(obj, 'x', 0), alors getattr(obj, 'x', 0) returns 0 car getattr() with a default returns the default value if the attribute is missing, preventing AttributeError.
`,
  2173: `La fonction setattr() définit la valeur d'un attribut sur un objet. Si class MyClass: pass; obj = MyClass(); setattr(obj, 'x', 1); obj.x, alors obj.x retourne 1 car setattr() sets the attribute 'x' to 1 on obj. It's equivalent to obj.x = 1, but allows you to set attributes dynamically using a string name. This is useful when the attribute name is stored in a variable.

setattr() function:
• setattr(obj, 'x', 1) sets attribute
• obj.x retourne 1
• Equivalent to obj.x = 1
• Attribute name is string: 'x'
• Retourne : 1

Comment ça fonctionne :
• setattr(obj, 'x', 1) sets attribute 'x' = 1
• Creates attribute on obj
• obj.x accesses attribute
• Retourne : 1

Exemple :
class MyClass: pass
obj = MyClass()
setattr(obj, 'x', 1)         # Sets obj.x = 1
obj.x                        # 1 (attribute set)

Usages courants :
• Dynamic assignment: setattr(obj, attr_name, value) (attr_name is variable)
• Attribute setting: setattr(obj, 'value', 5)
• Object introspection
• Dynamic attribute assignment

Exemple : Si class MyClass: pass; obj = MyClass(); setattr(obj, 'x', 1); obj.x, alors obj.x retourne 1 car setattr() sets the attribute value on an object, equivalent to obj.x = 1.
`,
  2174: `La fonction delattr() supprime un attribut d'un objet. Si class MyClass: pass; obj = MyClass(); obj.x = 1; delattr(obj, 'x'); hasattr(obj, 'x'), alors hasattr(obj, 'x') retourne False car delattr() deletes the attribute 'x' from obj. It's equivalent to del obj.x, but allows you to delete attributes dynamically using a string name. After deletion, the attribute no longer exists.

delattr() function:
• delattr(obj, 'x') deletes attribute
• hasattr(obj, 'x') retourne False
• Equivalent to del obj.x
• Attribute name is string: 'x'
• Retourne : False

Comment ça fonctionne :
• obj.x = 1 sets attribute x = 1
• delattr(obj, 'x') deletes attribute 'x'
• Attribute removed from obj
• hasattr(obj, 'x') checks if 'x' exists
• Retourne : False

Exemple :
class MyClass: pass
obj = MyClass()
obj.x = 1
delattr(obj, 'x')            # Deletes obj.x
hasattr(obj, 'x')            # False (attribute deleted)

Usages courants :
• Dynamic deletion: delattr(obj, attr_name) (attr_name is variable)
• Attribute removal: delattr(obj, 'value')
• Object introspection
• Dynamic attribute deletion

Exemple : Si class MyClass: pass; obj = MyClass(); obj.x = 1; delattr(obj, 'x'); hasattr(obj, 'x'), alors hasattr(obj, 'x') retourne False car delattr() deletes the attribute from an object, equivalent to del obj.x.
`,
  2175: `La fonction dir() retourne une liste de noms d'attributs pour un objet. Si class MyClass: pass; obj = MyClass(); dir(obj), alors dir(obj) returns a list of attribute names car dir() lists all attributes (methods, properties, instance attributes, class attributes) that are accessible on the object. This includes attributes from the object's class and its base classes. It's useful for introspection and discovering what attributes an object has.

dir() function:
• dir(obj) returns list of attribute names
• Lists all accessible attributes
• Includes methods, properties, attributes
• Includes class and base class attributes
• Retourne : list

Comment ça fonctionne :
• dir(obj) lists attributes on obj
• Searches instance attributes
• Searches class attributes
• Searches base class attributes
• Returns list of attribute names

Exemple :
class MyClass: pass
obj = MyClass()
dir(obj)                     # ['__class__', '__dict__', ...] (list of attributes)

Usages courants :
• Introspection: dir(obj) (see all attributes)
• Discovery: find available methods/attributes
• Object inspection
• Attribute listing

Exemple : Si class MyClass: pass; obj = MyClass(); dir(obj), alors dir(obj) returns a list of attribute names car dir() lists all accessible attributes on an object, including methods, properties, and attributes from the class and base classes.
`,
  2176: `The dir() function includes class attributes in its list. Si class MyClass: x = 1; obj = MyClass(); 'x' in dir(obj), alors 'x' in dir(obj) returns True car dir() includes class attributes (like x = 1) in addition to instance attributes. When you access dir(obj), it shows attributes from both the instance and the class, so class attributes are visible.

dir() includes class attributes:
• 'x' in dir(obj) returns True
• dir(obj) includes class attributes
• x = 1 is class attribute
• Visible in dir() output
• Retourne : True

Comment ça fonctionne :
• dir(obj) lists attributes
• Includes instance attributes
• Includes class attributes (x = 1)
• 'x' is in the list
• Retourne : True

Exemple :
class MyClass: x = 1
obj = MyClass()
'x' in dir(obj)              # True (class attribute included)
dir(obj)                     # [..., 'x', ...] (includes class attribute)

Usages courants :
• Attribute checking: 'attr' in dir(obj) (check if attribute exists)
• Introspection: dir(obj) shows class and instance attributes
• Object inspection
• Attribute discovery

Exemple : Si class MyClass: x = 1; obj = MyClass(); 'x' in dir(obj), alors 'x' in dir(obj) returns True car dir() includes class attributes in its list, so the class attribute x = 1 is visible.
`,
  2177: `The dir() function includes methods in its list. Si class MyClass: def method(self): pass; obj = MyClass(); 'method' in dir(obj), alors 'method' in dir(obj) returns True car dir() includes methods (like method()) in addition to attributes. Methods are attributes of the class, so they appear in dir() when called on an instance.

dir() includes methods:
• 'method' in dir(obj) returns True
• dir(obj) includes methods
• method() is class method
• Visible in dir() output
• Retourne : True

Comment ça fonctionne :
• dir(obj) lists attributes
• Includes instance attributes
• Includes class methods (method())
• 'method' is in the list
• Retourne : True

Exemple :
class MyClass:
    def method(self): pass
obj = MyClass()
'method' in dir(obj)         # True (method included)
dir(obj)                     # [..., 'method', ...] (includes method)

Usages courants :
• Method checking: 'method' in dir(obj) (check if method exists)
• Introspection: dir(obj) shows methods and attributes
• Object inspection
• Method discovery

Exemple : Si class MyClass: def method(self): pass; obj = MyClass(); 'method' in dir(obj), alors 'method' in dir(obj) returns True car dir() includes methods in its list, so the method() is visible.
`,
  2178: `La fonction vars() retourne l'attribut __dict__, qui contient les attributs d'instance. Si class MyClass: pass; obj = MyClass(); vars(obj), alors vars(obj) returns {} car vars() returns obj.__dict__, which is a dictionary containing the instance's attributes. For a newly created instance with no attributes, __dict__ is empty, so vars() returns an empty dictionary.

vars() function:
• vars(obj) returns {}
• vars() returns __dict__
• __dict__ contains instance attributes
• Empty instance has empty __dict__
• Retourne : {}

Comment ça fonctionne :
• vars(obj) returns obj.__dict__
• __dict__ is dictionary of instance attributes
• obj has no instance attributes
• __dict__ is empty: {}
• Retourne : {}

Exemple :
class MyClass: pass
obj = MyClass()
vars(obj)                    # {} (empty, no instance attributes)
obj.x = 1
vars(obj)                    # {'x': 1} (instance attributes)

Usages courants :
• Instance attributes: vars(obj) (get __dict__)
• Attribute dictionary: vars(obj) shows instance attributes
• Object inspection
• Attribute access

Exemple : Si class MyClass: pass; obj = MyClass(); vars(obj), alors vars(obj) returns {} car vars() returns __dict__, which contains instance attributes, and an empty instance has an empty dictionary.
`,
  2179: `The vars() function returns a dictionary of instance attributes. Si class MyClass: def __init__(self, x): self.x = x; obj = MyClass(5); vars(obj), alors vars(obj) returns {'x': 5} car vars() returns obj.__dict__, which is a dictionary containing all instance attributes. When __init__ sets self.x = 5, it crée une instance attribute x = 5, which is stored in __dict__.

vars() returns instance attributes:
• vars(obj) returns {'x': 5}
• vars() returns __dict__
• __dict__ contains instance attributes
• self.x = 5 creates instance attribute
• Retourne : {'x': 5}

Comment ça fonctionne :
• MyClass(5) calls __init__(self, 5)
• __init__ sets self.x = 5 (instance attribute)
• Instance attribute stored in obj.__dict__
• vars(obj) returns obj.__dict__
• Retourne : {'x': 5}

Exemple :
class MyClass:
    def __init__(self, x):
        self.x = x
obj = MyClass(5)
vars(obj)                    # {'x': 5} (instance attributes)

Usages courants :
• Instance attributes: vars(obj) (get __dict__)
• Attribute dictionary: vars(obj) shows all instance attributes
• Object inspection
• Attribute access

Exemple : Si class MyClass: def __init__(self, x): self.x = x; obj = MyClass(5); vars(obj), alors vars(obj) returns {'x': 5} car vars() returns __dict__, which contains instance attributes, and self.x = 5 crée une instance attribute.
`,
  2180: `The vars() function can be called on a class, returning the class's __dict__. Si class MyClass: x = 1; vars(MyClass), alors vars(MyClass) returns a dictionary with class attributes car vars() returns MyClass.__dict__, which contains class attributes, methods, and other class-level data. This includes x = 1 and other class-level definitions.

vars() on class:
• vars(MyClass) returns dict with class attributes
• vars() returns class __dict__
• __dict__ contains class attributes and methods
• Includes x = 1
• Retourne : dict

Comment ça fonctionne :
• vars(MyClass) returns MyClass.__dict__
• __dict__ is dictionary of class attributes
• Contains class attributes (x = 1)
• Contains methods and other class data
• Retourne : dict

Exemple :
class MyClass: x = 1
vars(MyClass)                # {...'x': 1, ...} (class __dict__)

Usages courants :
• Class attributes: vars(Class) (get class __dict__)
• Class dictionary: vars(Class) shows class attributes and methods
• Object inspection
• Class introspection

Exemple : Si class MyClass: x = 1; vars(MyClass), alors vars(MyClass) returns a dictionary with class attributes car vars() on a class returns the class's __dict__, which contains class attributes, methods, and other class-level data.
`,
  2181: `L'opérateur is vérifie l'identité des objets (si deux variables référencent le même objet). Si class MyClass: pass; obj1 = MyClass(); obj2 = MyClass(); obj1 is obj2, alors obj1 is obj2 retourne False car obj1 and obj2 are different instances - each call to MyClass() creates a new, separate object. The is operator checks if two variables point to the same object in memory, not if they have the same value.

Instances différentes :
• obj1 is obj2 retourne False
• obj1 and obj2 are different instances
• Each MyClass() creates new object
• is checks identity (same object)
• Retourne : False

Comment ça fonctionne :
• MyClass() creates first instance (obj1)
• MyClass() creates second instance (obj2)
• obj1 and obj2 are different objects
• obj1 is obj2 checks if same object
• Different objects, so returns: False

Exemple :
class MyClass: pass
obj1 = MyClass()             # Creates first instance
obj2 = MyClass()             # Creates second instance (different)
obj1 is obj2                 # False (different instances)

Usages courants :
• Identity check: obj1 is obj2 (check if same object)
• Object comparison: if obj1 is obj2: (identity)
• Object identity
• Reference comparison

Exemple : Si class MyClass: pass; obj1 = MyClass(); obj2 = MyClass(); obj1 is obj2, alors obj1 is obj2 retourne False car different instances are not identical - each call to MyClass() creates a separate object.
`,
  2182: `When two variables refer to the same object, is returns True. Si class MyClass: pass; obj1 = MyClass(); obj2 = obj1; obj1 is obj2, alors obj1 is obj2 retourne True car obj2 = obj1 assigns the same object reference to obj2, so both variables point to the same object. The is operator checks object identity, and since obj1 and obj2 refer to the same object, they are identical.

Same object reference:
• obj1 is obj2 retourne True
• obj2 = obj1 assigns same reference
• Both variables point to same object
• is checks identity (same object)
• Retourne : True

Comment ça fonctionne :
• MyClass() creates instance (obj1)
• obj2 = obj1 assigns same reference
• obj1 and obj2 point to same object
• obj1 is obj2 checks if same object
• Same object, so returns: True

Exemple :
class MyClass: pass
obj1 = MyClass()             # Creates instance
obj2 = obj1                  # Assigns same reference
obj1 is obj2                 # True (same object)

Usages courants :
• Reference check: obj1 is obj2 (check if same object)
• Object identity: if obj1 is obj2: (same reference)
• Object identity
• Reference comparison

Exemple : Si class MyClass: pass; obj1 = MyClass(); obj2 = obj1; obj1 is obj2, alors obj1 is obj2 retourne True car the same object reference is identical - both variables point to the same object.
`,
  2183: `By default, the == operator compares object identity (same as is) if __eq__ is not defined. Si class MyClass: pass; obj1 = MyClass(); obj2 = MyClass(); obj1 == obj2, alors obj1 == obj2 returns False car without a custom __eq__ method, == defaults to comparing object identity, which is the same as is. Since obj1 and obj2 are different instances, they are not equal. To define custom equality, you need to implement __eq__.

Default == behavior:
• obj1 == obj2 returns False
• No __eq__ defined
• == defaults to identity comparison (same as is)
• Different instances are not equal
• Retourne : False

Comment ça fonctionne :
• obj1 == obj2 uses == operator
• No __eq__ method defined
• Python uses default identity comparison
• Compares obj1 is obj2 (identity)
• Different objects, so returns: False

Exemple :
class MyClass: pass
obj1 = MyClass(); obj2 = MyClass()
obj1 == obj2                 # False (default: identity comparison)
obj1 is obj2                 # False (same result)

Usages courants :
• Default comparison: == compares identity if no __eq__
• Custom equality: define __eq__ for value comparison
• Object comparison
• Equality operators

Exemple : Si class MyClass: pass; obj1 = MyClass(); obj2 = MyClass(); obj1 == obj2, alors obj1 == obj2 returns False car the default == compares identity (same as is) when __eq__ is not defined, and different instances are not identical.
`,
  2184: `La méthode __eq__ remplace le comportement par défaut de ==. Si class MyClass: def __eq__(self, other): return True; obj1 = MyClass(); obj2 = MyClass(); obj1 == obj2, alors obj1 == obj2 returns True car __eq__ is defined to always return True, overriding the default identity comparison. When you define __eq__, Python uses it for == comparisons instead of the default identity check.

__eq__ overrides ==:
• obj1 == obj2 returns True
• __eq__ defines == behavior
• __eq__ always returns True
• Overrides default identity comparison
• Retourne : True

Comment ça fonctionne :
• obj1 == obj2 uses == operator
• Python calls obj1.__eq__(obj2)
• __eq__ executes: return True
• Returns comparison result
• Retourne : True

Exemple :
class MyClass:
    def __eq__(self, other):
        return True  # Always equal
obj1 = MyClass(); obj2 = MyClass()
obj1 == obj2                # True (uses __eq__)

Usages courants :
• Custom equality: def __eq__(self, other): return self.value == other.value
• Value comparison: == compares values, not identity
• Special methods
• Operator overloading

Exemple : Si class MyClass: def __eq__(self, other): return True; obj1 = MyClass(); obj2 = MyClass(); obj1 == obj2, alors obj1 == obj2 returns True car __eq__ overrides the default == behavior, and it's defined to return True.
`,
  2185: `Si __ne__ n'est pas défini, Python le fournit automatiquement comme négation de __eq__. Si class MyClass: def __eq__(self, other): return True; obj1 = MyClass(); obj2 = MyClass(); obj1 != obj2, alors obj1 != obj2 returns False car __ne__ is not defined, so Python uses not (obj1 == obj2), which is not True = False. This ensures that != is the logical opposite of ==.

__ne__ defaults to not __eq__:
• obj1 != obj2 returns False
• __ne__ not defined
• Python uses not (obj1 == obj2)
• obj1 == obj2 returns True (from __eq__)
• not True = False
• Retourne : False

Comment ça fonctionne :
• obj1 != obj2 uses != operator
• __ne__ not defined
• Python uses not (obj1 == obj2)
• obj1 == obj2 returns True (from __eq__)
• not True = False
• Retourne : False

Exemple :
class MyClass:
    def __eq__(self, other):
        return True
obj1 = MyClass(); obj2 = MyClass()
obj1 != obj2                # False (not (obj1 == obj2) = not True)

Usages courants :
• Automatic __ne__: Python provides not __eq__ if __ne__ not defined
• Logical consistency: != is opposite of ==
• Special methods
• Operator overloading

Exemple : Si class MyClass: def __eq__(self, other): return True; obj1 = MyClass(); obj2 = MyClass(); obj1 != obj2, alors obj1 != obj2 returns False car __ne__ defaults to not __eq__ if not defined, so not True = False.
`,
  2186: `La méthode __hash__ définit la valeur de hachage d'un objet. Si class MyClass: def __hash__(self): return 1; hash(MyClass()), alors hash(MyClass()) returns 1 car __hash__ is a special method that's called when you use hash() on an object. The hash value is used for dictionary keys and set membership. Objects with __hash__ defined can be used as dictionary keys or added to sets.

__hash__ method:
• hash(MyClass()) returns 1
• __hash__ defines hash value
• Called by hash() function
• Returns hash value: 1
• Retourne : 1

Comment ça fonctionne :
• hash(MyClass()) calls hash() function
• Python calls instance.__hash__()
• __hash__ executes: return 1
• Returns hash value
• Retourne : 1

Exemple :
class MyClass:
    def __hash__(self):
        return 1
hash(MyClass())              # 1 (uses __hash__)

Usages courants :
• Hashable objects: def __hash__(self): return hash(self.value)
• Dictionary keys: objects with __hash__ can be dict keys
• Special methods
• Object hashing

Exemple : Si class MyClass: def __hash__(self): return 1; hash(MyClass()), alors hash(MyClass()) returns 1 car __hash__ defines the hash value for an object, used by hash().
`,
  2187: `Defining __eq__ without __hash__ makes an object unhashable. Si class MyClass: def __eq__(self, other): return True; hash(MyClass()), alors hash(MyClass()) raises a TypeError car when you define __eq__ without __hash__, Python sets __hash__ to None, making the object unhashable. This prevents objects from being used as dictionary keys or added to sets. To make an object hashable, you must define both __eq__ and __hash__, or define neither.

__eq__ without __hash__:
• hash(MyClass()) raises TypeError
• __eq__ defined, __hash__ not defined
• Python sets __hash__ = None
• Object becomes unhashable
• Raises TypeError

Comment ça fonctionne :
• hash(MyClass()) calls hash() function
• __eq__ is defined, __hash__ is not
• Python sets __hash__ = None (unhashable)
• hash() cannot hash unhashable object
• Raises TypeErreur : unhashable type

Exemple :
class MyClass:
    def __eq__(self, other):
        return True
hash(MyClass())              # TypeError (unhashable)

Usages courants :
• Understanding hashability: __eq__ without __hash__ makes unhashable
• Hashable objects: define both __eq__ and __hash__
• Special methods
• Object hashing

Exemple : Si class MyClass: def __eq__(self, other): return True; hash(MyClass()), alors hash(MyClass()) raises a TypeError car defining __eq__ without __hash__ makes the object unhashable (Python sets __hash__ = None).
`,
  2188: `Objects with __hash__ defined can be used as dictionary keys. Si class MyClass: def __eq__(self, other): return True; def __hash__(self): return 1; {MyClass(): 1}, alors {MyClass(): 1} creates a dictionary with a MyClass instance as a key car the object has both __eq__ and __hash__ defined, making it hashable. Hashable objects can be used as dictionary keys and added to sets.

Object with __hash__ as dict key:
• {MyClass(): 1} creates dictionary
• MyClass instance is hashable (has __hash__)
• Can be used as dictionary key
• Creates dict: {MyClass instance: 1}
• Retourne : dict

Comment ça fonctionne :
• MyClass() creates instance
• Instance has __eq__ and __hash__ (hashable)
• {MyClass(): 1} uses instance as key
• Dictionary created successfully
• Retourne : {MyClass instance: 1}

Exemple :
class MyClass:
    def __eq__(self, other):
        return True
    def __hash__(self):
        return 1
{MyClass(): 1}               # {MyClass instance: 1} (hashable, can be key)

Usages courants :
• Dictionary keys: {obj: value} (obj must be hashable)
• Sets: {obj} (obj must be hashable)
• Hashable objects
• Object hashing

Exemple : Si class MyClass: def __eq__(self, other): return True; def __hash__(self): return 1; {MyClass(): 1}, alors {MyClass(): 1} creates a dictionary car objects with __hash__ defined can be used as dictionary keys.
`,
  2189: `La fonction id() retourne un identifiant entier unique pour un objet. Si class MyClass: pass; id(MyClass()), alors id(MyClass()) returns a unique integer id car id() returns the memory address (or a unique identifier) of the object. Each object has a unique id, and the id remains constant for the object's lifetime. The id is used internally by Python for object identity checks (is operator uses id()).

id() function:
• id(MyClass()) returns unique integer id
• id() returns object identifier
• Unique for each object
• Represents memory address/identifier
• Retourne : integer

Comment ça fonctionne :
• MyClass() creates instance
• id(instance) gets object identifier
• Returns unique integer
• Used for identity checks
• Retourne : unique integer id

Exemple :
class MyClass: pass
id(MyClass())                # 140234567890 (unique integer id)
obj = MyClass()
id(obj)                      # 140234567891 (different id)

Usages courants :
• Object identity: id(obj1) == id(obj2) (same as obj1 is obj2)
• Unique identifier: id(obj) (object's unique id)
• Object identity
• Memory address

Exemple : Si class MyClass: pass; id(MyClass()), alors id(MyClass()) returns a unique integer id car id() returns a unique identifier for an object, representing its memory address or identifier.
`,
  2190: `Different objects have different ids. Si class MyClass: pass; obj1 = MyClass(); obj2 = MyClass(); id(obj1) == id(obj2), alors id(obj1) == id(obj2) returns False car obj1 and obj2 are different instances, so they have different ids. Each object has a unique id that distinguishes it from all other objects. The id() function returns a unique identifier for each object, and different objects always have different ids.

Different objects, different ids:
• id(obj1) == id(obj2) returns False
• obj1 and obj2 are different instances
• Each object has unique id
• Different objects have different ids
• Retourne : False

Comment ça fonctionne :
• MyClass() creates first instance (obj1)
• MyClass() creates second instance (obj2)
• id(obj1) gets obj1's unique id
• id(obj2) gets obj2's unique id
• Different objects, different ids
• Retourne : False

Exemple :
class MyClass: pass
obj1 = MyClass()             # id(obj1) = 140234567890
obj2 = MyClass()             # id(obj2) = 140234567891 (different)
id(obj1) == id(obj2)         # False (different ids)

Usages courants :
• Identity check: id(obj1) == id(obj2) (same as obj1 is obj2)
• Unique identifiers: different objects have different ids
• Object identity
• Memory addresses

Exemple : Si class MyClass: pass; obj1 = MyClass(); obj2 = MyClass(); id(obj1) == id(obj2), alors id(obj1) == id(obj2) returns False car different objects have different ids - each object has a unique identifier.
`,
  2191: `L'attribut __slots__ restreint les attributs pouvant être définis sur les instances. Si class MyClass: __slots__ = ['x', 'y']; obj = MyClass(); obj.x = 1; obj.z = 2, alors obj.z = 2 raises an AttributeError car __slots__ only allows 'x' and 'y' as instance attributes. Any attempt to set an attribute not in __slots__ raises an AttributeError. This saves memory by preventing the creation of __dict__ for instances.

__slots__ restriction:
• obj.z = 2 raises AttributeError
• __slots__ = ['x', 'y'] restricts allowed attributes
• Only 'x' and 'y' allowed
• 'z' not in __slots__
• Raises AttributeError

Comment ça fonctionne :
• obj.x = 1 works (x in __slots__)
• obj.z = 2 attempts to set 'z'
• 'z' not in __slots__ = ['x', 'y']
• Attribute not allowed
• Raises AttributeErreur : 'MyClass' object has no attribute 'z'

Exemple :
class MyClass:
    __slots__ = ['x', 'y']
obj = MyClass()
obj.x = 1                    # Works (x in __slots__)
obj.z = 2                    # AttributeError (z not in __slots__)

Usages courants :
• Memory optimization: __slots__ = ['attr1', 'attr2'] (saves memory)
• Attribute restriction: prevent dynamic attributes
• Class optimization
• Memory efficiency

Exemple : Si class MyClass: __slots__ = ['x', 'y']; obj = MyClass(); obj.x = 1; obj.z = 2, alors obj.z = 2 raises an AttributeError car __slots__ restricts allowed attributes to only those listed, and 'z' is not in __slots__.
`,
  2192: `Using __slots__ removes the __dict__ attribute from instances, saving memory. Si class MyClass: __slots__ = ['x']; obj = MyClass(); obj.x = 1; vars(obj), alors vars(obj) raises an AttributeError car __slots__ prevents the creation of __dict__ for instances. vars() returns __dict__, but instances with __slots__ don't have __dict__, so it raises an error. This is the memory-saving benefit of __slots__ - instances don't need a dictionary to store attributes.

__slots__ removes __dict__:
• vars(obj) raises AttributeError
• __slots__ prevents __dict__ creation
• Instances don't have __dict__
• vars() requires __dict__
• Raises AttributeError

Comment ça fonctionne :
• obj.x = 1 sets attribute (stored in slots, not __dict__)
• vars(obj) tries to access __dict__
• Instance has no __dict__ (__slots__ prevents it)
• vars() cannot access non-existent __dict__
• Raises AttributeErreur : 'MyClass' object has no attribute '__dict__'

Exemple :
class MyClass:
    __slots__ = ['x']
obj = MyClass()
obj.x = 1
vars(obj)                    # AttributeError (no __dict__)

Usages courants :
• Memory optimization: __slots__ removes __dict__ (saves memory)
• Fixed attributes: __slots__ = ['attr1', 'attr2'] (no dynamic attributes)
• Class optimization
• Memory efficiency

Exemple : Si class MyClass: __slots__ = ['x']; obj = MyClass(); obj.x = 1; vars(obj), alors vars(obj) raises an AttributeError car __slots__ removes __dict__ from instances, and vars() requires __dict__.
`,
  2193: `L'attribut __dict__ contient un dictionnaire des attributs d'instance. Si class MyClass: def __init__(self): self.x = 1; obj = MyClass(); obj.__dict__, alors obj.__dict__ returns {'x': 1} car __dict__ is a dictionary that stores all instance attributes. When __init__ sets self.x = 1, it crée une instance attribute that's stored in obj.__dict__. This is how Python stores instance attributes internally.

__dict__ contains instance attributes:
• obj.__dict__ returns {'x': 1}
• __dict__ is dictionary of instance attributes
• self.x = 1 creates instance attribute
• Stored in obj.__dict__
• Retourne : {'x': 1}

Comment ça fonctionne :
• MyClass() calls __init__(self)
• __init__ sets self.x = 1 (instance attribute)
• Instance attribute stored in obj.__dict__
• obj.__dict__ contains {'x': 1}
• Retourne : {'x': 1}

Exemple :
class MyClass:
    def __init__(self):
        self.x = 1
obj = MyClass()
obj.__dict__                 # {'x': 1} (instance attributes)

Usages courants :
• Instance attributes: obj.__dict__ (get all instance attributes)
• Attribute dictionary: obj.__dict__ shows instance data
• Object inspection
• Attribute access

Exemple : Si class MyClass: def __init__(self): self.x = 1; obj = MyClass(); obj.__dict__, alors obj.__dict__ returns {'x': 1} car __dict__ contains instance attributes, and self.x = 1 crée une instance attribute stored in __dict__.
`,
  2194: `The __dict__ attribute on a class contains class attributes and methods. Si class MyClass: x = 1; MyClass.__dict__, alors MyClass.__dict__ returns a dictionary with class attributes and methods car __dict__ on a class stores all class-level data, including class attributes (like x = 1), methods, and other class metadata. This is the namespace dictionary for the class.

Class __dict__:
• MyClass.__dict__ returns dict with class attributes
• __dict__ contains class-level data
• Includes class attributes (x = 1)
• Includes methods and metadata
• Retourne : dict

Comment ça fonctionne :
• class MyClass: x = 1 creates class
• Class attributes stored in MyClass.__dict__
• __dict__ contains 'x': 1 and other class data
• Returns dictionary of class attributes
• Retourne : dict

Exemple :
class MyClass: x = 1
MyClass.__dict__             # {...'x': 1, ...} (class attributes and methods)

Usages courants :
• Class attributes: MyClass.__dict__ (get all class attributes)
• Class dictionary: MyClass.__dict__ shows class data
• Object inspection
• Class introspection

Exemple : Si class MyClass: x = 1; MyClass.__dict__, alors MyClass.__dict__ returns a dictionary with class attributes car __dict__ on a class contains class attributes, methods, and other class-level data.
`,
  2195: `Methods are stored in the class __dict__. Si class MyClass: def method(self): pass; 'method' in MyClass.__dict__, alors 'method' in MyClass.__dict__ returns True car methods are class attributes, so they're stored in the class's __dict__. When you define a method in a class, it becomes an attribute of the class, stored in MyClass.__dict__.

Methods in class __dict__:
• 'method' in MyClass.__dict__ returns True
• Methods are class attributes
• Stored in class __dict__
• 'method' is in the dictionary
• Retourne : True

Comment ça fonctionne :
• def method(self): pass defines method
• Method becomes class attribute
• Stored in MyClass.__dict__
• 'method' in MyClass.__dict__ checks if key exists
• Retourne : True

Exemple :
class MyClass:
    def method(self): pass
'method' in MyClass.__dict__  # True (method in class __dict__)

Usages courants :
• Method checking: 'method' in MyClass.__dict__ (check if method exists)
• Class introspection: MyClass.__dict__ shows methods
• Object inspection
• Method discovery

Exemple : Si class MyClass: def method(self): pass; 'method' in MyClass.__dict__, alors 'method' in MyClass.__dict__ returns True car methods are stored in the class __dict__ as class attributes.
`,
  2196: `La fonction type() retourne la classe d'une instance. Si class MyClass: pass; obj = MyClass(); type(obj), alors type(obj) returns <class '__main__.MyClass'> car type() returns the class that an instance belongs to. For an instance of MyClass, type() returns the MyClass class object. This is useful for type checking and introspection.

type() sur une instance :
• type(obj) returns <class '__main__.MyClass'>
• type() returns class of instance
• obj is instance of MyClass
• Returns class object
• Retourne : <class '__main__.MyClass'>

Comment ça fonctionne :
• obj = MyClass() creates instance
• type(obj) gets class of instance
• Instance belongs to MyClass class
• Returns class object
• Retourne : <class '__main__.MyClass'>

Exemple :
class MyClass: pass
obj = MyClass()
type(obj)                    # <class '__main__.MyClass'> (class of instance)

Usages courants :
• Type checking: if type(obj) == MyClass: ...
• Type inspection: print(type(instance))
• Object type
• Type identification

Exemple : Si class MyClass: pass; obj = MyClass(); type(obj), alors type(obj) returns <class '__main__.MyClass'> car type() returns the class that an instance belongs to.
`,
  2197: `Les classes sont des instances de type (la métaclasse). Si class MyClass: pass; type(MyClass), alors type(MyClass) returns <class 'type'> car classes themselves are objects, and they are instances of the type class (the metaclass). In Python, everything is an object - classes are objects too, and they are instances of type. This is the foundation of Python's metaclass system.

Classes are instances of type:
• type(MyClass) returns <class 'type'>
• Classes are objects
• Classes are instances of type (metaclass)
• type is the class of classes
• Retourne : <class 'type'>

Comment ça fonctionne :
• class MyClass: pass creates class object
• MyClass is an object (instance of type)
• type(MyClass) gets class of MyClass
• MyClass is instance of type
• Retourne : <class 'type'>

Exemple :
class MyClass: pass
type(MyClass)                # <class 'type'> (classes are instances of type)

Usages courants :
• Metaclass understanding: classes are instances of type
• Type system: type is the class of classes
• Metaclasses
• Type system

Exemple : Si class MyClass: pass; type(MyClass), alors type(MyClass) returns <class 'type'> car classes are instances of type (the metaclass) - classes themselves are objects.
`,
  2198: `Toutes les classes en Python héritent de object par défaut. Si class MyClass: pass; issubclass(MyClass, object), alors issubclass(MyClass, object) returns True car even if you don't explicitly specify a parent class, Python fait automatiquement de object la classe de base. This is why all classes have access to methods like __str__, __repr__, etc. - they inherit from object.

All classes inherit from object:
• issubclass(MyClass, object) returns True
• MyClass inherits from object (default)
• Even without explicit parent
• object is base class
• Retourne : True

Comment ça fonctionne :
• class MyClass: pass creates class
• Pas de classe parente explicite
• Python fait automatiquement de object la classe de base
• issubclass(MyClass, object) checks inheritance
• Retourne : True

Exemple :
class MyClass: pass
issubclass(MyClass, object)  # True (all classes inherit from object)

Usages courants :
• Inheritance check: issubclass(Class, object) (always True)
• Base class: object is base of all classes
• Programmation orientée objet
• Inheritance hierarchy

Exemple : Si class MyClass: pass; issubclass(MyClass, object), alors issubclass(MyClass, object) returns True car all classes inherit from object by default, even if not explicitly specified.
`,
  2199: `Classes are instances of type. Si class MyClass: pass; isinstance(MyClass, type), alors isinstance(MyClass, type) returns True car classes are objects, and they are instances of the type class. In Python, classes are created by the type metaclass, so every class is an instance of type. This is the foundation of Python's metaclass system - classes are objects created by type.

Classes are instances of type:
• isinstance(MyClass, type) returns True
• Classes are objects
• Classes are instances of type
• type is the class of classes
• Retourne : True

Comment ça fonctionne :
• class MyClass: pass creates class object
• MyClass is an object (instance of type)
• isinstance(MyClass, type) checks if MyClass is instance of type
• MyClass is instance of type
• Retourne : True

Exemple :
class MyClass: pass
isinstance(MyClass, type)    # True (classes are instances of type)

Usages courants :
• Metaclass understanding: classes are instances of type
• Type checking: isinstance(Class, type) (always True for classes)
• Metaclasses
• Type system

Exemple : Si class MyClass: pass; isinstance(MyClass, type), alors isinstance(MyClass, type) returns True car classes are instances of type - classes are objects created by the type metaclass.
`,
  2200: `The mro() method returns the Method Resolution Order (MRO) - the inheritance chain showing how Python searches for attributes and methods. Si class MyClass: pass; MyClass.mro(), alors MyClass.mro() returns a list showing the method resolution order car mro() returns the linearization of the inheritance hierarchy. For a simple class with no explicit parents, it shows [MyClass, object] - the class itself and its base class (object).

mro() method:
• MyClass.mro() returns Method Resolution Order list
• mro() returns inheritance chain
• Shows order Python searches for attributes
• [MyClass, object] for simple class
• Retourne : list

Comment ça fonctionne :
• MyClass.mro() calls mro() method
• mro() computes method resolution order
• Shows inheritance chain: [MyClass, object]
• Python searches in this order for attributes
• Retourne : [MyClass, object]

Exemple :
class MyClass: pass
MyClass.mro()                # [<class '__main__.MyClass'>, <class 'object'>]

Usages courants :
• Inheritance chain: MyClass.mro() (see inheritance order)
• Method resolution: understand how Python finds attributes
• Programmation orientée objet
• Inheritance hierarchy

Exemple : Si class MyClass: pass; MyClass.mro(), alors MyClass.mro() returns a Method Resolution Order list car mro() returns the inheritance chain showing how Python searches for attributes and methods, typically [MyClass, object] for a simple class.
`,