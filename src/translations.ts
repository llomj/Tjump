export const translations = {
  en: {
    // Navigation & App
    app: {
      title: "PYTHON",
      subtitle: "EXERCISES",
      rank: "Rank",
      glossary: "Glossary",
      learningLog: "Learning Log",
      operations: "Operations & Math",
      methods: "Methods",
      flow: "Flow",
    },
    
    // Evolution Hub
    hub: {
      evolutionStage: "Evolution Stage",
      class: "Class",
      currentGenome: "Current Genome",
      nextMutation: "Next Mutation",
      batchSize: "Batch Size",
      questions: "Questions",
      lastAccuracy: "Last Accuracy",
      stageProgress: "Stage Progress",
      continueMutation: "CONTINUE MUTATION",
      globalProgress: "Global Progress",
      mastery: "Mastery",
      mutationsRemaining: "{count} mutations remaining for next evolution.",
      absorbText: "Absorb 15 new logic structures to strengthen your Python DNA.",
      conceptsText: "unique concepts across the ocean.",
      // Random mode
      randomModeLabel: "Random Mode",
      totalAnswered: "Total Answered",
      correct: "Correct",
      accuracy: "Accuracy",
      evolutionScore: "Evolution Score",
      pointsToNext: "{points} points to {persona}",
      randomModeAbsorbText: "Absorb 15 random questions from all levels to earn evolution points.",
      randomModeDescription: "Questions from all levels. Earn points to evolve through the same 10 personas.",
    },
    
    // Quiz View
    quiz: {
      mutationOf: "MUTATION {current} OF {total}",
      evolution: "Evolution",
      evolutionPoints: "Evolution Points",
      stabilizingGenome: "Stabilizing Genome...",
      sequencingPatterns: "Sequencing 15 unique logic patterns for Stage {level}.",
      sequenceError: "Sequence Error",
      couldNotRetrieve: "Could not retrieve questions for this level.",
      returnToHub: "Return to Hub",
      showExplanation: "Click for detailed explanation",
      hideExplanation: "Click to collapse",
      next: "NEXT",
      finishEvolution: "FINISH EVOLUTION",
      continueMutation: "CONTINUE MUTATION",
      correct: "Correct",
      incorrect: "Incorrect",
      yourAnswer: "Your Answer",
      correctAnswer: "Correct Answer",
      whitespaceHint: "Spaces are shown as · to make padded options distinct.",
    },

    // Code Versatility panel (Level 9+)
    codeVersatility: {
      title: "Code Versatility & Applications",
      patternVersatility: "Pattern Versatility",
      realWorldApplications: "Real-World Applications",
      bestPractices: "Best Practices",
      inheritanceVersatility: "This inheritance pattern is versatile across multiple scenarios: extending base classes, implementing interfaces, creating plugin architectures, and building framework code. The super() pattern allows clean parent method invocation without hardcoding class names, making code more maintainable when inheritance hierarchies change.",
      polymorphismVersatility: "Polymorphism enables code to work with different types through a common interface. This pattern is versatile in API design, plugin systems, factory patterns, and when building extensible frameworks. It allows adding new types without modifying existing code that uses the interface.",
      encapsulationVersatility: "Encapsulation patterns provide controlled access to internal implementation details. This versatility allows protecting invariants, maintaining API stability, enabling refactoring without breaking consumers, and implementing property-based access control with validation or computed values.",
      propertyVersatility: "The property decorator pattern is versatile for computed attributes, validation, lazy evaluation, and maintaining backward compatibility when converting attributes to methods. It's essential in data models, ORMs, and APIs where attribute access needs special handling.",
      abstractVersatility: "Abstract base classes provide versatility in defining interfaces and enforcing method implementations. Useful for plugin architectures, defining contracts in frameworks, ensuring API compliance, and creating clear extension points for library users.",
      defaultVersatility: "This advanced OOP pattern demonstrates versatile application across multiple domains: framework design, library APIs, extensible architectures, and systems requiring clean separation of concerns. Understanding these patterns enables building more maintainable and scalable codebases.",
      inheritanceApps: ["Framework base classes (Django models, Flask views)", "GUI toolkit hierarchies (tkinter, PyQt widget classes)", "ORM model inheritance (SQLAlchemy, Django ORM)", "Exception class hierarchies for error handling", "Plugin systems with base plugin classes"],
      polymorphismApps: ["API design with interface-based contracts", "Strategy pattern implementations", "Dependency injection containers", "Protocol-based type checking (PEP 544)", "Duck typing for cross-type compatibility"],
      encapsulationApps: ["Property-based data validation (Pydantic, attrs)", "ORM field descriptors with validation", "Computed properties in data models", "Lazy-loaded attributes (caching expensive operations)", "API versioning with private implementation details"],
      defaultApps: ["Large-scale application architecture", "Library and framework design", "Extensible plugin systems", "API design and versioning", "Enterprise software patterns"],
      inheritanceBestPractices: ["Use composition over inheritance when possible", "Call super() consistently to maintain MRO chain", "Prefer super() over Parent.method() for flexibility", "Keep inheritance hierarchies shallow (2-3 levels max)", "Document expected method signatures in base classes"],
      polymorphismBestPractices: ["Use isinstance() for type checking, not type()", "Design around interfaces, not concrete classes", "Leverage duck typing for flexibility", "Use ABCs when you need to enforce interfaces", "Favor protocols (PEP 544) for structural typing"],
      encapsulationBestPractices: ["Use leading underscores for internal attributes", "Use @property for computed or validated attributes", "Avoid accessing private attributes from outside", "Provide clear public APIs for necessary access", "Document which attributes are part of the public API"],
      defaultBestPractices: ["Follow SOLID principles in OOP design", "Prefer composition over deep inheritance", "Use type hints for better code clarity", "Write clear docstrings explaining class contracts", "Keep classes focused on a single responsibility"],
    },
    
    // Result Modal
    result: {
      mutationsComplete: "Mutations Complete!",
      geneticsStabilized: "Genetics stabilized for {score} concepts.",
      evolutionGain: "Evolution Gain",
      successRate: "Success Rate",
      evolutionScore: "Evolution Score",
      backToHub: "BACK TO HUB",
      youEarnedStars: "You earned {count} star(s)!",
      levelAccuracy: "Level accuracy: {percent}%",
      gameComplete: "CONGRATULATIONS!",
      gameCompleteSub: "You finished the whole game with 5 stars on every level. Incredible!",
    },
    
    // Random Mode Modal
    randomMode: {
      switchToRandom: "Switch to Random Mode?",
      switchToLevel: "Switch to Level Mode?",
      randomModeDesc: "Questions will be randomly selected from all levels. Your progress and XP will still count toward leveling up.",
      levelModeDesc: "Return to level-based questions. You'll continue from your current level and progress normally.",
      cancel: "Cancel",
      randomMode: "Random Mode",
      levelMode: "Level Mode",
    },
    
    // History Log
    history: {
      learningLog: "LEARNING LOG",
      backToHub: "BACK TO HUB",
      emptyLog: "Your learning log is empty. Start evolving to record your journey!",
      level: "Niveau",
      correct: "Correct",
      incorrect: "Incorrect",
    },
    
    // Glossary View
    glossary: {
      searchPlaceholder: "Search glossary...",
      levelConcept: "Level {range} Concept",
      inDepthDescription: "In-Depth Description",
      implementationExample: "Implementation Example",
      noResults: "No terms found matching \"{search}\"",
    },
    
    // Operations View
    operations: {
      title: "OPERATIONS & MATH",
      back: "BACK",
      operations: "Operations",
      mathConcepts: "Math Concepts",
      searchPlaceholder: "Search {type}...",
      definition: "Definition",
      examples: "Examples",
      gotIt: "GOT IT",
      noItemsFound: "No items found matching \"{search}\"",
    },
    
    // Footer
    footer: {
      copyright: "© 2024 Python Exercises Learn. Interactive Learning Platform.",
    },
    
    // Methods view
    methods: {
      subtitle: "Python Ultimate Method Cheat Sheet — built-in methods by type.",
    },

    // Flow view
    flow: {
      levelProgression: "Level progression: Tadpole → God Whale.",
      levelLabel: "Level",
      referenceTitle: "Python flow, precedence & control reference",
      referenceIntro: "Indentation, loops, scope, clauses, control statements, and order of execution.",
      indentationTitle: "1. Indentation rules",
      indentationBody: "Python uses indentation to define blocks (no braces). Use 4 spaces per level. Same block = same indent. Inner blocks are indented right of the controlling line.",
      forLoopsTitle: "2. for loops — order of execution",
      forLoopsBody: "Order: evaluate iterable once → for each item, assign target → run body. Nested loops: outer iteration first, then inner loop runs to completion for that outer value (outer then inner).",
      whileLoopsTitle: "3. while loops — order of execution",
      whileLoopsBody: "Order: 1) test condition; 2) if True, run body; 3) repeat. Condition is evaluated before each body run (top-of-loop check).",
      globalLocalTitle: "4. Global vs local variables (LEGB)",
      globalLocalBody: "Name lookup order: Local → Enclosing (nonlocal) → Global → Built-in. Assignment to a name inside a function creates a local variable unless declared global/nonlocal.",
      clausesTitle: "5. Clauses: if/elif/else, try/except/finally, with",
      clausesBody: "if/elif/else: first True branch runs, rest skipped. try: run try block; on exception jump to matching except; finally always runs. with: enter context manager, run body, exit (even on exception).",
      returnPrintTitle: "6. return, print, pass, continue, break, yield",
      returnPrintBody: "return: exit function and optionally send a value to the caller. print: write to stdout (side effect), returns None. pass: no-op placeholder. continue: skip to next iteration. break: exit the innermost loop. yield: produce a value in a generator and pause.",
      expressionOrderTitle: "7. Expression order: inner → outer",
      expressionOrderBody: "In expressions, innermost subexpressions are evaluated first (e.g. arguments before the function call, left to right). Operator precedence: ** then unary ± then * / // % then + - then comparisons then not and or.",
      loopElseTitle: "8. Loop else and with",
      loopElseBody: "for/while else: runs only if the loop completes without a break. with: __enter__ then body then __exit__ (order: enter → body → exit).",
      operatorPrecedenceTitle: "9. Operator precedence (high to low)",
      operatorPrecedenceBody: "Parentheses, then **, then unary + - ~, then * / // %, then + -, then shift/bitwise, then comparisons (in, not in, is, is not, <, <=, >, >=, !=, ==), then not, then and, then or. Same level: left to right (except ** right to left).",
      functionCallOrderTitle: "10. Function and method call order",
      functionCallOrderBody: "Arguments are evaluated left to right before the function runs. For chained calls (e.g. a.b().c()), order: evaluate a → b() → then .c() on that result (left to right).",
      shortCircuitTitle: "11. Short-circuit (and / or)",
      shortCircuitBody: "and: evaluate left; if falsy, return it; else return right. or: evaluate left; if truthy, return it; else return right. Right side may not be evaluated.",
      comprehensionsTitle: "12. Comprehensions and decorators order",
      comprehensionsBody: "List comp: iterate over iterable (left to right), evaluate expression for each, build list. Nested comps: outer loop first, inner loop runs fully per outer. Decorators: bottom-up (nearest to def runs first when applying), then top-down when calling.",
    },

    // Persona Stages (these might stay as is, but we can translate)
    personas: {
      tadpole: "Tadpole",
      plankton: "Plankton",
      shrimp: "Shrimp",
      crab: "Crab",
      smallFish: "Small Fish",
      octopus: "Octopus",
      seal: "Seal",
      dolphin: "Dolphin",
      shark: "Shark",
      whale: "Whale",
      godWhale: "God Whale",
    },
    
    // Settings Menu
    settings: {
      searchById: "Search by ID",
      idLog: "ID Log",
      selectLevel: "Select Level",
      switchToLevelMode: "Switch to Level Mode",
      switchToRandomMode: "Switch to Random Mode",
      settings: "Settings",
      previewStarSound: "Preview star sound",
      refreshApp: "Refresh App",
      resetApp: "Reset App",
    },
    
    // Reset App Modal
    resetModal: {
      title: "Reset App?",
      warning: "This will erase all your progress (XP, levels, completed questions, learning log). You will start from zero. This cannot be undone.",
      cancel: "Cancel",
      confirm: "Reset Everything",
    },
    
    // Level Selector
    levelSelector: {
      selectLevel: "Select Level",
      rules: "Rules",
      level: "Level {level}",
      currentLevel: "Current Level",
      highestUnlocked: "Highest Unlocked",
      youAreOnLevel: "You are currently on Level {level}. Complete questions to unlock higher levels.",
      randomModeNote: "You're in Random Mode. The level you select will apply when you switch back to Level Mode.",
      currentLevelInfo: "Current Level: {current} • Highest Unlocked: {highest}",
    },
    
    // ID Search & Log
    idSearch: {
      searchById: "Search by ID",
      enterId: "1-3300...",
      search: "Search",
      saveToLog: "Save to Log",
      saved: "Saved!",
      options: "Options",
      explanation: "Explanation",
      showDetailedExplanation: "Show Detailed Explanation",
      noSavedQuestions: "No saved questions yet. Search by ID and save questions for reference.",
      idLog: "ID Log",
      invalidId: "Please enter a valid ID between 1 and 3300",
      questionNotFound: "Question with ID {id} not found",
    },
    
    // ID Log
    idLog: {
      clickToViewCodon: "Click to view codon explanation",
      codonExplanation: "Codon Explanation",
    },
    
    // Sub-levels (Beginner, Intermediate, Expert)
    subLevels: {
      beginner: "Beginner",
      intermediate: "Intermediate",
      expert: "Expert",
      beginnerCaps: "BEGINNER",
      intermediateCaps: "INTERMEDIATE",
      expertCaps: "EXPERT",
      subLevelComplete: "SUB-LEVEL COMPLETE!",
      masteryAchieved: "MASTERY ACHIEVED",
      beginnerProgress: "BEGINNER PROGRESS",
      intermediateProgress: "INTERMEDIATE PROGRESS",
      expertProgress: "EXPERT PROGRESS",
      masteryProgress: "MASTERY ACHIEVED",
      youEarnedStar: "You earned the {star} star for this stage.",
      continueEvolution: "CONTINUE EVOLUTION",
    },
    
    // Level Descriptions
    levels: {
      level0: "Your very first steps in Python. Learn what Python is, print(), variables, and basic types.",
      level1: "Basic data types and variable assignment. Learn to store and manipulate simple values.",
      level2: "Mathematical operations and expression evaluation. Master arithmetic and precedence rules.",
      level3: "Decision-making with if/elif/else. Understand boolean logic and truth values.",
      level4: "Repetitive execution with for and while loops. Learn to iterate over sequences.",
      level5: "Ordered collections and list operations. Master mutable sequences.",
      level6: "Associative arrays and fast lookups. Learn unordered key-value mappings.",
      level7: "Reusable code blocks with parameters and return values. Master function design.",
      level8: "Object-oriented programming basics. Learn to create and use custom types.",
      level9: "Advanced OOP concepts. Understand class hierarchies and behavior inheritance.",
      level10: "Professional-level patterns and practices. Master scalable code design.",
    },
  },
  
  fr: {
    // Navigation & App
    app: {
      title: "PYTHON",
      subtitle: "EXERCICES",
      rank: "Rang",
      glossary: "Glossaire",
      learningLog: "Journal d'apprentissage",
      operations: "Opérations et Mathématiques",
      methods: "Méthodes",
      flow: "Flux",
    },
    
    // Evolution Hub
    hub: {
      evolutionStage: "Étape d'Évolution",
      class: "Classe",
      currentGenome: "Génome Actuel",
      nextMutation: "Prochaine Mutation",
      batchSize: "Taille du Lot",
      questions: "Questions",
      lastAccuracy: "Précision Dernière",
      stageProgress: "Progression de l'Étape",
      continueMutation: "CONTINUER LA MUTATION",
      globalProgress: "Progression Globale",
      mastery: "Maîtrise",
      mutationsRemaining: "{count} mutations restantes pour la prochaine évolution.",
      absorbText: "Absorbez 15 nouvelles structures logiques pour renforcer votre ADN Python.",
      conceptsText: "concepts uniques à travers l'océan.",
      // Random mode
      randomModeLabel: "Mode Aléatoire",
      totalAnswered: "Total Répondu",
      correct: "Correct",
      accuracy: "Précision",
      evolutionScore: "Score d'Évolution",
      pointsToNext: "{points} points vers {persona}",
      randomModeAbsorbText: "Absorbez 15 questions aléatoires de tous les niveaux pour gagner des points d'évolution.",
      randomModeDescription: "Questions de tous les niveaux. Gagnez des points pour évoluer à travers les mêmes 10 personas.",
    },

    // Quiz View
    quiz: {
      mutationOf: "MUTATION {current} SUR {total}",
      evolution: "Évolution",
      evolutionPoints: "Points d'Évolution",
      stabilizingGenome: "Stabilisation du Génome...",
      sequencingPatterns: "Séquençage de 15 motifs logiques uniques pour l'Étape {level}.",
      sequenceError: "Erreur de Séquence",
      couldNotRetrieve: "Impossible de récupérer les questions pour ce niveau.",
      returnToHub: "Retour au Hub",
      showExplanation: "Cliquez pour l'explication détaillée",
      hideExplanation: "Cliquez pour réduire",
      next: "SUIVANT",
      finishEvolution: "TERMINER L'ÉVOLUTION",
      continueMutation: "CONTINUER LA MUTATION",
      correct: "Correct",
      incorrect: "Incorrect",
      yourAnswer: "Votre Réponse",
      correctAnswer: "Bonne Réponse",
      whitespaceHint: "Les espaces sont affichés en · pour distinguer les options avec padding.",
    },

    // Code Versatility panel (Level 9+)
    codeVersatility: {
      title: "Polyvalence du Code et Applications",
      patternVersatility: "Polyvalence du Modèle",
      realWorldApplications: "Applications Réelles",
      bestPractices: "Bonnes Pratiques",
      inheritanceVersatility: "Ce modèle d'héritage est polyvalent dans plusieurs scénarios : étendre des classes de base, implémenter des interfaces, créer des architectures de plugins et construire du code de framework. Le pattern super() permet une invocation propre des méthodes parentes sans coder en dur les noms de classes, rendant le code plus maintenable lorsque les hiérarchies d'héritage changent.",
      polymorphismVersatility: "Le polymorphisme permet au code de fonctionner avec différents types via une interface commune. Ce modèle est polyvalent dans la conception d'API, les systèmes de plugins, les patterns factory et lors de la construction de frameworks extensibles. Il permet d'ajouter de nouveaux types sans modifier le code existant qui utilise l'interface.",
      encapsulationVersatility: "Les modèles d'encapsulation fournissent un accès contrôlé aux détails d'implémentation internes. Cette polyvalence permet de protéger les invariants, maintenir la stabilité des API, permettre le refactoring sans casser les consommateurs, et implémenter un contrôle d'accès basé sur les propriétés avec validation ou valeurs calculées.",
      propertyVersatility: "Le modèle du décorateur property est polyvalent pour les attributs calculés, la validation, l'évaluation paresseuse et le maintien de la rétrocompatibilité lors de la conversion d'attributs en méthodes. C'est essentiel dans les modèles de données, ORM et API où l'accès aux attributs nécessite un traitement spécial.",
      abstractVersatility: "Les classes de base abstraites offrent une polyvalence pour définir des interfaces et imposer des implémentations de méthodes. Utiles pour les architectures de plugins, définir des contrats dans les frameworks, garantir la conformité des API et créer des points d'extension clairs pour les utilisateurs des bibliothèques.",
      defaultVersatility: "Ce pattern OOP avancé démontre une application polyvalente dans plusieurs domaines : conception de frameworks, API de bibliothèques, architectures extensibles et systèmes nécessitant une séparation claire des préoccupations. Comprendre ces patterns permet de construire des codebases plus maintenables et évolutives.",
      inheritanceApps: ["Classes de base de frameworks (Django models, Flask views)", "Hiérarchies de toolkits GUI (tkinter, classes widgets PyQt)", "Héritage de modèles ORM (SQLAlchemy, Django ORM)", "Hiérarchies de classes d'exceptions pour la gestion d'erreurs", "Systèmes de plugins avec classes de plugins de base"],
      polymorphismApps: ["Conception d'API avec contrats basés sur les interfaces", "Implémentations du pattern Strategy", "Conteneurs d'injection de dépendances", "Vérification de types basée sur les protocoles (PEP 544)", "Duck typing pour la compatibilité entre types"],
      encapsulationApps: ["Validation de données basée sur les propriétés (Pydantic, attrs)", "Descripteurs de champs ORM avec validation", "Propriétés calculées dans les modèles de données", "Attributs chargés paresseusement (cache des opérations coûteuses)", "Versioning d'API avec détails d'implémentation privés"],
      defaultApps: ["Architecture d'applications à grande échelle", "Conception de bibliothèques et frameworks", "Systèmes de plugins extensibles", "Conception et versioning d'API", "Patterns de logiciels d'entreprise"],
      inheritanceBestPractices: ["Privilégiez la composition à l'héritage quand possible", "Appelez super() de manière cohérente pour maintenir la chaîne MRO", "Préférez super() à Parent.method() pour la flexibilité", "Gardez les hiérarchies d'héritage peu profondes (2-3 niveaux max)", "Documentez les signatures de méthodes attendues dans les classes de base"],
      polymorphismBestPractices: ["Utilisez isinstance() pour la vérification de types, pas type()", "Concevez autour des interfaces, pas des classes concrètes", "Exploitez le duck typing pour la flexibilité", "Utilisez les ABC lorsque vous devez imposer des interfaces", "Privilégiez les protocoles (PEP 544) pour le typage structurel"],
      encapsulationBestPractices: ["Utilisez des tirets bas pour les attributs internes", "Utilisez @property pour les attributs calculés ou validés", "Évitez d'accéder aux attributs privés de l'extérieur", "Fournissez des API publiques claires pour les accès nécessaires", "Documentez quels attributs font partie de l'API publique"],
      defaultBestPractices: ["Suivez les principes SOLID en conception OOP", "Privilégiez la composition à l'héritage profond", "Utilisez les indications de type pour plus de clarté", "Écrivez des docstrings clairs expliquant les contrats des classes", "Gardez les classes focalisées sur une seule responsabilité"],
    },
    
    // Result Modal
    result: {
      mutationsComplete: "Mutations Terminées !",
      geneticsStabilized: "Génétique stabilisée pour {score} concepts.",
      evolutionGain: "Gain d'Évolution",
      successRate: "Taux de Réussite",
      evolutionScore: "Score d'Évolution",
      backToHub: "RETOUR AU HUB",
      youEarnedStars: "Vous avez obtenu {count} étoile(s) !",
      levelAccuracy: "Précision du niveau : {percent} %",
      gameComplete: "FÉLICITATIONS !",
      gameCompleteSub: "Vous avez terminé tout le jeu avec 5 étoiles à chaque niveau. Incroyable !",
    },
    
    // Random Mode Modal
    randomMode: {
      switchToRandom: "Passer en Mode Aléatoire ?",
      switchToLevel: "Passer en Mode Niveau ?",
      randomModeDesc: "Les questions seront sélectionnées au hasard parmi tous les niveaux. Votre progression et vos XP compteront toujours pour monter de niveau.",
      levelModeDesc: "Revenir aux questions basées sur les niveaux. Vous continuerez à partir de votre niveau actuel et progresserez normalement.",
      cancel: "Annuler",
      randomMode: "Mode Aléatoire",
      levelMode: "Mode Niveau",
    },
    
    // History Log
    history: {
      learningLog: "JOURNAL D'APPRENTISSAGE",
      backToHub: "RETOUR AU HUB",
      emptyLog: "Votre journal d'apprentissage est vide. Commencez à évoluer pour enregistrer votre parcours !",
      level: "Niveau",
      correct: "Correct",
      incorrect: "Incorrect",
    },
    
    // Glossary View
    glossary: {
      searchPlaceholder: "Rechercher dans le glossaire...",
      levelConcept: "Concept Niveau {range}",
      inDepthDescription: "Description Approfondie",
      implementationExample: "Exemple d'Implémentation",
      noResults: "Aucun terme trouvé correspondant à \"{search}\"",
    },
    
    // Operations View
    operations: {
      title: "OPÉRATIONS ET MATHÉMATIQUES",
      back: "RETOUR",
      operations: "Opérations",
      mathConcepts: "Concepts Mathématiques",
      searchPlaceholder: "Rechercher {type}...",
      definition: "Définition",
      examples: "Exemples",
      gotIt: "COMPRIS",
      noItemsFound: "Aucun élément trouvé correspondant à \"{search}\"",
    },
    
    // Footer
    footer: {
      copyright: "© 2024 Python Exercises Learn. Plateforme d'Apprentissage Interactive.",
    },
    
    // Methods view
    methods: {
      subtitle: "Aide-mémoire ultime des méthodes Python — méthodes intégrées par type.",
    },

    // Flow view
    flow: {
      levelProgression: "Progression des niveaux : Têtard → Baleine Divine.",
      levelLabel: "Niveau",
      referenceTitle: "Référence flux Python, précédence et contrôle",
      referenceIntro: "Indentation, boucles, portée, clauses, instructions de contrôle et ordre d'exécution.",
      indentationTitle: "1. Règles d'indentation",
      indentationBody: "Python utilise l'indentation pour définir les blocs (pas d'accolades). Utilisez 4 espaces par niveau. Même bloc = même indentation. Les blocs internes sont indentés à droite de la ligne de contrôle.",
      forLoopsTitle: "2. Boucles for — ordre d'exécution",
      forLoopsBody: "Ordre : évaluer l'itérable une fois → pour chaque élément, assigner la cible → exécuter le corps. Boucles imbriquées : itération externe d'abord, puis la boucle interne s'exécute entièrement pour cette valeur externe.",
      whileLoopsTitle: "3. Boucles while — ordre d'exécution",
      whileLoopsBody: "Ordre : 1) tester la condition ; 2) si True, exécuter le corps ; 3) répéter. La condition est évaluée avant chaque exécution du corps (vérification en tête de boucle).",
      globalLocalTitle: "4. Variables globales vs locales (LEGB)",
      globalLocalBody: "Ordre de résolution des noms : Local → Enclosant (nonlocal) → Global → Intégré. L'assignation à un nom dans une fonction crée une variable locale sauf si déclarée global/nonlocal.",
      clausesTitle: "5. Clauses : if/elif/else, try/except/finally, with",
      clausesBody: "if/elif/else : la première branche True s'exécute, les autres sont ignorées. try : exécuter le bloc try ; en cas d'exception, sauter vers le except correspondant ; finally s'exécute toujours. with : entrer le gestionnaire de contexte, exécuter le corps, sortir (même en cas d'exception).",
      returnPrintTitle: "6. return, print, pass, continue, break, yield",
      returnPrintBody: "return : quitter la fonction et optionnellement renvoyer une valeur à l'appelant. print : écrire sur stdout (effet de bord), renvoie None. pass : placeholder sans effet. continue : passer à l'itération suivante. break : quitter la boucle la plus imbriquée. yield : produire une valeur dans un générateur et mettre en pause.",
      expressionOrderTitle: "7. Ordre des expressions : intérieur → extérieur",
      expressionOrderBody: "Dans les expressions, les sous-expressions les plus internes sont évaluées en premier (ex. les arguments avant l'appel de fonction, de gauche à droite). Précédence des opérateurs : ** puis unaire ± puis * / // % puis + - puis comparaisons puis not and or.",
      loopElseTitle: "8. else des boucles et with",
      loopElseBody: "for/while else : s'exécute seulement si la boucle se termine sans break. with : __enter__ puis corps puis __exit__ (ordre : entrée → corps → sortie).",
      operatorPrecedenceTitle: "9. Précédence des opérateurs (haut vers bas)",
      operatorPrecedenceBody: "Parenthèses, puis **, puis unaire + - ~, puis * / // %, puis + -, puis décalage/bitwise, puis comparaisons (in, not in, is, is not, <, <=, >, >=, !=, ==), puis not, puis and, puis or. Même niveau : gauche à droite (sauf ** droite à gauche).",
      functionCallOrderTitle: "10. Ordre d'appel des fonctions et méthodes",
      functionCallOrderBody: "Les arguments sont évalués de gauche à droite avant l'exécution de la fonction. Pour les appels chaînés (ex. a.b().c()), ordre : évaluer a → b() → puis .c() sur ce résultat (gauche à droite).",
      shortCircuitTitle: "11. Court-circuit (and / or)",
      shortCircuitBody: "and : évaluer la gauche ; si falsy, la renvoyer ; sinon renvoyer la droite. or : évaluer la gauche ; si truthy, la renvoyer ; sinon renvoyer la droite. Le côté droit peut ne pas être évalué.",
      comprehensionsTitle: "12. Ordre des compréhensions et décorateurs",
      comprehensionsBody: "List comp : itérer sur l'itérable (gauche à droite), évaluer l'expression pour chaque élément, construire la liste. Comps imbriquées : boucle externe d'abord, boucle interne complète par valeur externe. Décorateurs : bas vers haut (le plus proche du def s'applique en premier), puis haut vers bas à l'appel.",
    },

    // Persona Stages
    personas: {
      tadpole: "Têtard",
      plankton: "Plancton",
      shrimp: "Crevette",
      crab: "Crabe",
      smallFish: "Petit Poisson",
      octopus: "Poulpe",
      seal: "Phoque",
      dolphin: "Dauphin",
      shark: "Requin",
      whale: "Baleine",
      godWhale: "Baleine Divine",
    },
    
    // Settings Menu
    settings: {
      searchById: "Rechercher par ID",
      idLog: "Journal ID",
      selectLevel: "Sélectionner le Niveau",
      switchToLevelMode: "Passer en Mode Niveau",
      switchToRandomMode: "Passer en Mode Aléatoire",
      settings: "Paramètres",
      previewStarSound: "Écouter le son d'étoile",
      refreshApp: "Actualiser l'App",
      resetApp: "Réinitialiser l'App",
    },
    
    // Reset App Modal
    resetModal: {
      title: "Réinitialiser l'App ?",
      warning: "Toute votre progression sera effacée (XP, niveaux, questions complétées, journal). Vous repartirez de zéro. Cette action est irréversible.",
      cancel: "Annuler",
      confirm: "Tout Réinitialiser",
    },
    
    // Level Selector
    levelSelector: {
      selectLevel: "Sélectionner le Niveau",
      rules: "Règles",
      level: "Niveau {level}",
      currentLevel: "Niveau Actuel",
      highestUnlocked: "Plus Haut Débloqué",
      youAreOnLevel: "Vous êtes actuellement au Niveau {level}. Complétez des questions pour débloquer des niveaux supérieurs.",
      randomModeNote: "Vous êtes en Mode Aléatoire. Le niveau sélectionné s'appliquera lorsque vous reviendrez au Mode Niveau.",
      currentLevelInfo: "Niveau Actuel: {current} • Plus Haut Débloqué: {highest}",
    },
    
    // ID Search & Log
    idSearch: {
      searchById: "Rechercher par ID",
      enterId: "1-3300...",
      search: "Rechercher",
      saveToLog: "Enregistrer dans le Journal",
      saved: "Enregistré!",
      options: "Options",
      explanation: "Explication",
      showDetailedExplanation: "Afficher l'Explication Détaillée",
      noSavedQuestions: "Aucune question enregistrée pour le moment. Recherchez par ID et enregistrez des questions pour référence.",
      idLog: "Journal ID",
      invalidId: "Veuillez entrer un ID valide entre 1 et 3300",
      questionNotFound: "Question avec l'ID {id} introuvable",
    },
    
    // ID Log
    idLog: {
      clickToViewCodon: "Cliquez pour voir l'explication du codon",
      codonExplanation: "Explication du Codon",
    },
    
    // Sub-levels (Débutant, Intermédiaire, Expert)
    subLevels: {
      beginner: "Débutant",
      intermediate: "Intermédiaire",
      expert: "Expert",
      beginnerCaps: "DÉBUTANT",
      intermediateCaps: "INTERMÉDIAIRE",
      expertCaps: "EXPERT",
      subLevelComplete: "SOUS-NIVEAU TERMINÉ !",
      masteryAchieved: "MAÎTRISE ACQUISE",
      beginnerProgress: "PROGRESSION DÉBUTANT",
      intermediateProgress: "PROGRESSION INTERMÉDIAIRE",
      expertProgress: "PROGRESSION EXPERT",
      masteryProgress: "MAÎTRISE ACQUISE",
      youEarnedStar: "Vous avez obtenu l'étoile {star} pour cette étape.",
      continueEvolution: "CONTINUER L'ÉVOLUTION",
    },
    
    // Level Descriptions
    levels: {
      level0: "Vos tout premiers pas en Python. Découvrez ce qu'est Python, print(), les variables et les types de base.",
      level1: "Types de données de base et assignation de variables. Apprenez à stocker et manipuler des valeurs simples.",
      level2: "Opérations mathématiques et évaluation d'expressions. Maîtrisez l'arithmétique et les règles de précédence.",
      level3: "Prise de décision avec if/elif/else. Comprenez la logique booléenne et les valeurs de vérité.",
      level4: "Exécution répétitive avec les boucles for et while. Apprenez à itérer sur des séquences.",
      level5: "Collections ordonnées et opérations sur les listes. Maîtrisez les séquences mutables.",
      level6: "Tableaux associatifs et recherches rapides. Apprenez les mappages clé-valeur non ordonnés.",
      level7: "Blocs de code réutilisables avec paramètres et valeurs de retour. Maîtrisez la conception de fonctions.",
      level8: "Bases de la programmation orientée objet. Apprenez à créer et utiliser des types personnalisés.",
      level9: "Concepts OOP avancés. Comprenez les hiérarchies de classes et l'héritage de comportement.",
      level10: "Modèles et pratiques de niveau professionnel. Maîtrisez la conception de code évolutif.",
    },
  },
};

// Helper function to replace placeholders
export const formatTranslation = (text: string, replacements: Record<string, string | number>): string => {
  let result = text;
  for (const [key, value] of Object.entries(replacements)) {
    result = result.replace(new RegExp(`\\{${key}\\}`, 'g'), String(value));
  }
  return result;
};
