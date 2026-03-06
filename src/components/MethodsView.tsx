import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useLanguage } from '../contexts/LanguageContext';

interface MethodsViewProps {
  onBack: () => void;
}

const METHOD_CHEAT_SHEET_EN = `# ===================== Python Ultimate Method Cheat Sheet =====================

# HOW TO READ THIS
# - Instance method (most common): obj.method(args)
# - Equivalent form (rare): Type.method(obj, args)
# - Immutable types (str/tuple/bytes): return a NEW value
# - Mutable types (list/dict/set): often mutate IN PLACE and return None
#   Examples: list.sort(), list.reverse(), dict.update(), set.update()
#
# Pro tips:
# - dir(obj) shows available attributes (including methods)
# - help(obj.method) explains arguments and behavior

# ----------------- STRINGS (str) -----------------
s = "python"
s.capitalize()          # 'Python'
s.casefold()            # 'python'
s.center(10, ".")       # '..python..'
s.count("o")            # 1
s.encode("utf-8")       # b'python'
s.endswith("on")        # True
s.expandtabs(4)         # Tabs -> spaces
s.find("th")            # 2 (or -1 if missing)
s.format()              # For format strings only (see f-strings too)
s.format_map({"x": 1})  # Format with dict mapping
s.index("th")           # 2 (ValueError if missing)
s.isalnum()             # True for letters/digits only
s.isalpha()             # True for letters only
s.isascii()             # True if all chars are ASCII
s.isdecimal()           # Decimal digits only (strict)
s.isdigit()             # Digits (includes some unicode)
s.isidentifier()        # Valid variable name?
s.islower()             # True if all cased chars are lowercase
s.isnumeric()           # Numeric chars (broader than digits)
s.isprintable()         # Visible / whitespace-only?
s.isspace()             # Whitespace-only?
s.istitle()             # Titlecase?
s.isupper()             # Uppercase?
"-".join(["a", "b"])    # 'a-b' (join is called on the separator)
s.ljust(10, ".")        # 'python....'
s.lower()               # 'python'
s.lstrip()              # Strip left whitespace
s.partition("th")       # ('py', 'th', 'on')
s.removeprefix("py")    # 'thon' (Py 3.9+)
s.removesuffix("on")    # 'pyth' (Py 3.9+)
s.replace("py", "MY")   # 'MYthon'
s.rfind("o")            # 4
s.rindex("o")           # 4
s.rjust(10, ".")        # '....python'
s.rpartition("th")      # ('py', 'th', 'on')
s.rsplit("t")           # ['py', 'hon']
s.rstrip()              # Strip right whitespace
s.split("t")            # ['py', 'hon']
s.splitlines()          # Split on line breaks
s.startswith("py")      # True
s.strip()               # Strip both ends whitespace
s.swapcase()            # Swap case
s.title()               # 'Python'
s.translate(str.maketrans({"p": "P"}))  # Replace via translation table
s.upper()               # 'PYTHON'
s.zfill(10)             # '0000python'

# ----------------- LISTS (list) -----------------
xs = [3, 1, 2]
xs.append(4)            # in-place, returns None
xs.extend([5, 6])       # in-place, returns None
xs.insert(0, 99)        # in-place, returns None
xs.remove(99)           # in-place, returns None (ValueError if missing)
xs.pop()                # returns removed element
xs.clear()              # in-place, returns None
xs.index(2)             # index of first match (ValueError if missing)
xs.count(2)             # count occurrences
xs.sort()               # in-place, returns None  (use sorted(xs) for a new list)
xs.reverse()            # in-place, returns None  (use reversed(xs) for an iterator)
xs.copy()               # shallow copy

# ----------------- DICTIONARIES (dict) -----------------
d = {"a": 1, "b": 2}
d.clear()
d.copy()
dict.fromkeys(["x", "y"], 0)
d.get("x", 0)
d.items()
d.keys()
d.values()
d.pop("a", None)
d.popitem()
d.setdefault("k", 123)
d.update({"z": 9})      # in-place, returns None

# ----------------- TUPLES (tuple) -----------------
t = (1, 2, 2, 3)
t.count(2)
t.index(3)

# ----------------- SETS (set) -----------------
s1 = {1, 2, 3}
s1.add(4)
s1.clear()
s1.copy()
s1.difference({2})
s1.difference_update({2})
s1.discard(999)         # no error if missing
s1.intersection({1, 2})
s1.intersection_update({1, 2})
s1.isdisjoint({10})
s1.issubset({1, 2, 3, 4})
s1.issuperset({1})
s1.pop()
s1.remove(1)            # KeyError if missing
s1.symmetric_difference({1, 9})
s1.symmetric_difference_update({1, 9})
s1.union({9})
s1.update({10, 11})

# ----------------- FROZENSET -----------------
fs = frozenset({1, 2, 3})
fs2 = fs.union({4})
fs3 = fs.intersection({2, 3})

# ----------------- BYTES & BYTEARRAY -----------------
data = b"hello"
data.decode("utf-8")
data.hex()

buf = bytearray(b"abc")
buf.append(100)         # add one byte
buf.extend(b"ef")       # add many bytes

# ----------------- MEMORYVIEW -----------------
view = memoryview(b"hello")
view.tobytes()
view.tolist()

# ----------------- RANGE -----------------
r = range(1, 10, 2)
len(r)
r[0]
3 in r

# ----------------- NUMBERS -----------------
n = 42
n.bit_length()
(3.5).is_integer()
(3+4j).conjugate()

# ----------------- BOOLEAN -----------------
flag = bool(1)          # True, bool inherits from int

# ----------------- FILE OBJECTS -----------------
with open("example.txt", "w", encoding="utf-8") as f:
    f.write("hello")
    f.flush()

# ----------------- FUNCTIONS -----------------
def f(x: int) -> int:
    return x * 2

f.__name__
f.__annotations__

# ----------------- CLASSES -----------------
class C:
    def __init__(self, x: int) -> None:
        self.x = x

    def __repr__(self) -> str:
        return f"C(x={self.x})"

C(1)

# ----------------- MODULES -----------------
import math
math.__name__

# ----------------- EXCEPTIONS -----------------
try:
    1 / 0
except ZeroDivisionError as e:
    e.add_note("Check your denominator")
`;

const METHOD_CHEAT_SHEET_FR = `# ===================== Aide-mémoire ultime des méthodes Python =====================

# COMMENT LIRE CETTE LISTE
# - Méthode d’instance (le plus courant) : obj.methode(args)
# - Forme équivalente (rare) : Type.methode(obj, args)
# - Types immuables (str/tuple/bytes) : renvoient une NOUVELLE valeur
# - Types mutables (list/dict/set) : modifient souvent SUR PLACE et renvoient None
#   Exemples : list.sort(), list.reverse(), dict.update(), set.update()
#
# Astuces :
# - dir(obj) montre les attributs (dont les méthodes)
# - help(obj.methode) explique les arguments et le comportement

# ----------------- CHAÎNES (str) -----------------
s = "python"
s.capitalize()          # 'Python'
s.casefold()            # 'python'
s.center(10, ".")       # '..python..'
s.count("o")            # 1
s.encode("utf-8")       # b'python'
s.endswith("on")        # True
s.expandtabs(4)         # Tabulations -> espaces
s.find("th")            # 2 (ou -1 si absent)
s.format()              # Pour chaînes de format uniquement (voir aussi f-strings)
s.format_map({"x": 1})  # Formater avec un mapping
s.index("th")           # 2 (ValueError si absent)
s.isalnum()             # Lettres/chiffres uniquement ?
s.isalpha()             # Lettres uniquement ?
s.isascii()             # ASCII uniquement ?
s.isdecimal()           # Chiffres décimaux (strict)
s.isdigit()             # Chiffres (inclut certains Unicode)
s.isidentifier()        # Nom de variable valide ?
s.islower()             # Minuscules ?
s.isnumeric()           # Numérique ?
s.isprintable()         # Imprimable ?
s.isspace()             # Espaces blancs uniquement ?
s.istitle()             # Titre (titlecase) ?
s.isupper()             # Majuscules ?
"-".join(["a", "b"])    # 'a-b' (join s’appelle sur le séparateur)
s.ljust(10, ".")        # 'python....'
s.lower()               # 'python'
s.lstrip()              # Supprimer à gauche (espaces)
s.partition("th")       # ('py', 'th', 'on')
s.removeprefix("py")    # 'thon' (Py 3.9+)
s.removesuffix("on")    # 'pyth' (Py 3.9+)
s.replace("py", "MY")   # 'MYthon'
s.rfind("o")            # 4
s.rindex("o")           # 4
s.rjust(10, ".")        # '....python'
s.rpartition("th")      # ('py', 'th', 'on')
s.rsplit("t")           # ['py', 'hon']
s.rstrip()              # Supprimer à droite (espaces)
s.split("t")            # ['py', 'hon']
s.splitlines()          # Découper sur les retours à la ligne
s.startswith("py")      # True
s.strip()               # Supprimer aux deux extrémités
s.swapcase()            # Inverser la casse
s.title()               # 'Python'
s.translate(str.maketrans({"p": "P"}))  # Traduction via table
s.upper()               # 'PYTHON'
s.zfill(10)             # '0000python'

# ----------------- LISTES (list) -----------------
xs = [3, 1, 2]
xs.append(4)            # sur place, renvoie None
xs.extend([5, 6])       # sur place, renvoie None
xs.insert(0, 99)        # sur place, renvoie None
xs.remove(99)           # sur place, renvoie None (ValueError si absent)
xs.pop()                # renvoie l’élément supprimé
xs.clear()              # sur place, renvoie None
xs.index(2)             # index de la première occurrence (ValueError si absent)
xs.count(2)             # compter les occurrences
xs.sort()               # sur place, renvoie None (utiliser sorted(xs) pour une nouvelle liste)
xs.reverse()            # sur place, renvoie None (utiliser reversed(xs) pour un itérateur)
xs.copy()               # copie superficielle

# ----------------- DICTIONNAIRES (dict) -----------------
d = {"a": 1, "b": 2}
d.clear()
d.copy()
dict.fromkeys(["x", "y"], 0)
d.get("x", 0)
d.items()
d.keys()
d.values()
d.pop("a", None)
d.popitem()
d.setdefault("k", 123)
d.update({"z": 9})      # sur place, renvoie None

# ----------------- TUPLES (tuple) -----------------
t = (1, 2, 2, 3)
t.count(2)
t.index(3)

# ----------------- ENSEMBLES (set) -----------------
s1 = {1, 2, 3}
s1.add(4)
s1.clear()
s1.copy()
s1.difference({2})
s1.difference_update({2})
s1.discard(999)         # pas d’erreur si absent
s1.intersection({1, 2})
s1.intersection_update({1, 2})
s1.isdisjoint({10})
s1.issubset({1, 2, 3, 4})
s1.issuperset({1})
s1.pop()
s1.remove(1)            # KeyError si absent
s1.symmetric_difference({1, 9})
s1.symmetric_difference_update({1, 9})
s1.union({9})
s1.update({10, 11})

# ----------------- FROZENSET -----------------
fs = frozenset({1, 2, 3})
fs2 = fs.union({4})
fs3 = fs.intersection({2, 3})

# ----------------- BYTES & BYTEARRAY -----------------
data = b"hello"
data.decode("utf-8")
data.hex()

buf = bytearray(b"abc")
buf.append(100)         # ajouter un octet
buf.extend(b"ef")       # ajouter plusieurs octets

# ----------------- MEMORYVIEW -----------------
view = memoryview(b"hello")
view.tobytes()
view.tolist()

# ----------------- RANGE -----------------
r = range(1, 10, 2)
len(r)
r[0]
3 in r

# ----------------- NOMBRES -----------------
n = 42
n.bit_length()
(3.5).is_integer()
(3+4j).conjugate()

# ----------------- BOOLÉEN -----------------
flag = bool(1)          # True, bool hérite de int

# ----------------- OBJETS FICHIER -----------------
with open("exemple.txt", "w", encoding="utf-8") as f:
    f.write("bonjour")
    f.flush()

# ----------------- FONCTIONS -----------------
def f(x: int) -> int:
    return x * 2

f.__name__
f.__annotations__

# ----------------- CLASSES -----------------
class C:
    def __init__(self, x: int) -> None:
        self.x = x

    def __repr__(self) -> str:
        return f"C(x={self.x})"

C(1)

# ----------------- MODULES -----------------
import math
math.__name__

# ----------------- EXCEPTIONS -----------------
try:
    1 / 0
except ZeroDivisionError as e:
    e.add_note("Vérifiez votre dénominateur")
`;

export const MethodsView: React.FC<MethodsViewProps> = ({ onBack }) => {
  const { t, language } = useLanguage();
  const cheatSheet = language === 'fr' ? METHOD_CHEAT_SHEET_FR : METHOD_CHEAT_SHEET_EN;
  const methodTheme: any = {
    ...oneDark,
    'pre[class*="language-"]': {
      ...(oneDark as any)['pre[class*="language-"]'],
      background: 'transparent',
    },
    'code[class*="language-"]': {
      ...(oneDark as any)['code[class*="language-"]'],
      background: 'transparent',
      color: '#e5e7eb', // slate-200
      textShadow: 'none',
    },
    comment: {
      color: '#94a3b8', // slate-400 (more readable than default "greyed out")
      fontStyle: 'italic',
    },
    keyword: { color: '#fbbf24' },     // amber-400
    builtin: { color: '#93c5fd' },     // blue-300
    function: { color: '#f59e0b' },    // amber-500
    string: { color: '#fde68a' },      // amber-200
    number: { color: '#fca5a5' },      // red-300
    punctuation: { color: '#cbd5e1' }, // slate-300
  };

  return (
    <div className="relative min-h-[400px] animate-in slide-in-from-left duration-300 pb-12">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors border border-white/10"
        >
          <i className="fas fa-arrow-left"></i>
          <span>{t('operations.back')}</span>
        </button>
        <h2 className="text-xl font-black text-white flex items-center gap-2">
          <i className="fas fa-code text-indigo-400"></i> {t('app.methods')}
        </h2>
      </div>
      <p className="text-slate-400 text-sm mb-4">
        {t('methods.subtitle')}
      </p>
      <div className="rounded-2xl border border-white/10 overflow-hidden bg-slate-900/50 max-h-[70vh] overflow-y-auto">
        <SyntaxHighlighter
          language="python"
          style={methodTheme}
          customStyle={{
            padding: '1rem 1.25rem',
            margin: 0,
            background: 'transparent',
            fontSize: '0.8125rem',
            lineHeight: '1.6',
            fontFamily: "'Fira Code', 'Monaco', 'Consolas', monospace",
            minHeight: '100%',
          }}
          codeTagProps={{
            style: {
              fontFamily: "'Fira Code', 'Monaco', 'Consolas', monospace",
              whiteSpace: 'pre',
              display: 'block',
            },
          }}
          PreTag="div"
          showLineNumbers={false}
          wrapLongLines
        >
          {cheatSheet.trim()}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};
