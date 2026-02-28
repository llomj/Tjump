  // IDs 2851-3000: re, itertools, json, pathlib, logging, unittest, exceptions, PEP 8, asyncio, Pythonic
  2851: `The .group(n) méthode renvoie the text matched by the nth capturing group. Group nombres start at 1. Group 0 is special et renvoie the entier match.

Concepts clés :
• .group(0) = entier match
• .group(1) = premier parenthesized group
• .group(2) = second parenthesized group
• Lève IndexError si group nombre doesn't exist

Comment ça fonctionne :
• Pattern: (\\w+)@(\\w+) correspond à "user@host"
• Group 1: (\\w+) avant @ captures "user"
• Group 2: (\\w+) après @ captures "host"
• .group(1) renvoie "user"

Exemple :
import re
m = re.match(r"(\\w+)@(\\w+)", "user@host")
print(m.group(0))  # "user@host"
print(m.group(1))  # "user"
print(m.group(2))  # "host"`,
  2852: `Quand re.sub() reçoit a fonction (or lambda) as the replacement argument, it calls that fonction pour chaque match, passing the Match objet. The fonction's return valeur is used as the replacement chaîne.

Concepts clés :
• re.sub(pattern, fonction, chaîne) calls fonction pour chaque match
• The fonction reçoit a Match objet as argument
• The fonction's return valeur remplace the match
• m.group() renvoie the matched text
• .upper() convertit a chaîne vers uppercase

Comment ça fonctionne :
• r"(\\w+)" correspond à chaque word: "hello", then "world"
• Pour "hello": lambda reçoit match, m.group() = "hello", .upper() = "HELLO"
• Pour "world": lambda reçoit match, m.group() = "world", .upper() = "WORLD"
• Space between words is pas matched, so it's preserved
• Résultat : "HELLO WORLD"

Exemple :
import re
result = re.sub(r"(\\w+)", lambda m: m.group().upper(), "hello world")
print(result)  # "HELLO WORLD"

# Another example: capitalize premier letter
result = re.sub(r"\\b\\w", lambda m: m.group().upper(), "hello world")
print(result)  # "Hello World"`,
  2853: `The r prefix crée a raw chaîne literal where backslashes are treated as literal backslash caractères, pas as escape sequences. This is essential pour regex because regex patterns use backslashes extensively (\\d, \\w, \\s, etc.), et sans r, Python would try vers interpret them first.

Concepts clés :
• r"\\d" is the raw chaîne containing two caractères: \\ et d
• "\\d" sans r would be interpreted by Python first
• Raw chaînes prevent double-escaping issues
• Sans r, you'd need "\\\\d" vers get the regex \\d

Comment ça fonctionne :
• r"\\n" is literally backslash + n (regex newline pattern)
• "\\n" is a unique newline caractère (Python escape)
• r"\\d+" is backslash + d + plus (regex digit pattern)
• "\\d+" might work by accident mais is pas reliable

Exemple :
import re
# These are equivalent:
re.search(r"\\d+", "abc123")  # Raw chaîne (preferred)
re.search("\\\\d+", "abc123")  # Regular chaîne (needs double escape)

# Difference matters avec \\n:
re.search(r"\\n", text)   # Correspond à literal newline in text
re.search("\\n", text)    # Also correspond à newline (by coincidence)
re.search(r"\\\\n", text)  # Correspond à literal backslash + n

Usages courants :
• Always use raw chaînes pour regex patterns
• Avoids confusion between Python escapes et regex escapes
• Makes patterns more readable`,
  2854: `itertools.chain prend multiple iterables et produit éléments depuis chaque one in order, as si they were a unique iterable. It does pas create nested structures — it flattens one niveau of nesting.

Concepts clés :
• chain(iter1, iter2, ...) produit éléments depuis iter1, then iter2, etc.
• Chaque argument must be an iterable
• Elements are yielded lazily (one at a time)
• Seulement flattens one niveau — nested listes inside remain nested

Comment ça fonctionne :
1. chain([1,2], [3,4], [5]) prend three listes
2. Produit 1, 2 depuis premier liste
3. Then 3, 4 depuis second liste
4. Then 5 depuis third liste
5. Résultat : [1, 2, 3, 4, 5]

Exemple :
from itertools import chain
list(chain("AB", "CD"))       # ['A', 'B', 'C', 'D']
list(chain([1], [2], [3,4]))  # [1, 2, 3, 4]
list(chain(range(3), range(3,6)))  # [0, 1, 2, 3, 4, 5]

Usages courants :
• Combining multiple sequences sans copying
• Flattening a known nombre of iterables
• Processing items depuis multiple sources as one stream`,
  2855: `chain.from_iterable is an alternate constructor that accepte a unique iterable whose éléments are themselves iterables. This is useful quand you have a liste of listes (or any nested iterable) et want vers flatten it one niveau.

Concepts clés :
• chain.from_iterable(iterable_of_iterables) — prend ONE argument
• Contrairement à chain(*args) which prend multiple arguments
• Useful quand the nombre of sub-iterables is unknown ou dynamic
• Still seulement flattens one niveau

Comment ça fonctionne :
1. chain.from_iterable([[1,2],[3,4]]) reçoit one liste containing two sublists
2. Produit 1, 2 depuis [1,2]
3. Then produit 3, 4 depuis [3,4]
4. Résultat : [1, 2, 3, 4]

Exemple :
from itertools import chain
nested = [[1, 2], [3, 4], [5]]
list(chain.from_iterable(nested))  # [1, 2, 3, 4, 5]

# Équivalent à:
list(chain(*nested))  # same résultat mais requiert unpacking

Usages courants :
• Flattening a liste of listes
• Processing dynamically generated groups of items
• More memory-efficient than chain(*big_list) pour large entrées`,
  2856: `itertools.product computes the Cartesian product of entrée iterables, which is tous possible ordered pairs (or tuples) combining one élément depuis chaque entrée.

Concepts clés :
• product(A, B) produit tous (a, b) where a ∈ A et b ∈ B
• Équivalent à nested for-loops
• Résultat length = len(A) × len(B)
• Can take more than 2 iterables: product(A, B, C) produit 3-tuples

Comment ça fonctionne :
1. product("AB", "12") pairs chaque caractère depuis "AB" avec chaque depuis "12"
2. A avec 1 → ("A","1")
3. A avec 2 → ("A","2")
4. B avec 1 → ("B","1")
5. B avec 2 → ("B","2")
6. Résultat : [("A","1"), ("A","2"), ("B","1"), ("B","2")]

Exemple :
from itertools import product
list(product([0,1], repeat=2))
# [(0,0), (0,1), (1,0), (1,1)]

list(product("AB", "CD", "EF"))
# 8 tuples: ("A","C","E"), ("A","C","F"), ...

Usages courants :
• Generating tous combinations of paramètres
• Replacing nested loops
• Testing tous entrée combinations`,
  2857: `itertools.permutations renvoie tous possible orderings (arrangements) of the entrée éléments. Pour n distinct éléments, there are n! (n factorial) permutations.

Concepts clés :
• permutations(iterable) génère tous orderings of tous éléments
• permutations(iterable, r) génère r-length orderings
• Pour "ABC" avec 3 caractères: 3! = 3 × 2 × 1 = 6 permutations
• Chaque permutation is a tuple

Comment ça fonctionne :
1. permutations("ABC") génère tous orderings of A, B, C
2. ('A','B','C'), ('A','C','B'), ('B','A','C'), ('B','C','A'), ('C','A','B'), ('C','B','A')
3. That's 6 tuples total
4. len(...) renvoie 6

Exemple :
from itertools import permutations
list(permutations("AB"))
# [('A','B'), ('B','A')] — 2! = 2

list(permutations("ABC", 2))
# [('A','B'), ('A','C'), ('B','A'), ('B','C'), ('C','A'), ('C','B')] — 6

Usages courants :
• Generating tous possible orderings
• Solving combinatorial problems
• Brute-force search over arrangements`,
  2858: `itertools.combinations renvoie r-length subsequences of éléments depuis the entrée iterable, in sorted order et sans repeated éléments. Contrairement à permutations, order doesn't matter: (A,B) is included mais (B,A) is not.

Concepts clés :
• combinations(iterable, r) — choose r éléments depuis the iterable
• Order doesn't matter: (A,B) et (B,A) are the same combination
• Number of combinations: C(n, r) = n! / (r! × (n-r)!)
• C(3, 2) = 3! / (2! × 1!) = 3

Comment ça fonctionne :
1. combinations("ABC", 2) picks tous 2-element subsets
2. ("A","B"), ("A","C"), ("B","C")
3. Note: ("B","A") is NOT included (already covered by ("A","B"))
4. Elements maintain their original order depuis the entrée

Exemple :
from itertools import combinations
list(combinations(range(4), 2))
# [(0,1), (0,2), (0,3), (1,2), (1,3), (2,3)]

list(combinations("ABCD", 3))
# [('A','B','C'), ('A','B','D'), ('A','C','D'), ('B','C','D')]

Usages courants :
• Choosing subsets depuis a collection
• Lottery nombre combinations
• Testing pairs of items`,
  2859: `combinations_with_replacement renvoie r-length subsequences where individual éléments may repeat. Contrairement à regular combinations, the same élément can appear multiple times in a unique combination.

Concepts clés :
• combinations_with_replacement(iterable, r) — choose r éléments, repeats allowed
• Still maintains sorted order (no (B,A) si (A,B) exists)
• More résultats than regular combinations
• Pour n éléments choosing r: C(n+r-1, r)

Comment ça fonctionne :
1. combinations_with_replacement("AB", 2) picks 2 éléments, allowing repeats
2. ("A","A") — A chosen twice
3. ("A","B") — one of each
4. ("B","B") — B chosen twice
5. Résultat : [("A","A"), ("A","B"), ("B","B")]

Exemple :
from itertools import combinations_with_replacement
list(combinations_with_replacement("ABC", 2))
# [('A','A'), ('A','B'), ('A','C'), ('B','B'), ('B','C'), ('C','C')]

Usages courants :
• Multisets et bags
• Dice rolls (where order doesn't matter)
• Sampling avec replacement`,
  2860: `itertools.repeat renvoie an iterator that produit the same objet over et over. Quand a count is specified, it produit exactly that many times. Sans a count, it repeats infinitely.

Concepts clés :
• repeat(object, times) — produit objet exactly 'times' times
• repeat(object) sans times — repeats infinitely (use avec islice ou zip)
• Useful as a constant argument in map() ou zip()
• Returns an iterator, pas a liste

Comment ça fonctionne :
1. repeat("x", 3) crée an iterator
2. Premier next() call produit "x"
3. Second next() call produit "x"
4. Third next() call produit "x"
5. StopIteration après 3 produit
6. liste(...) collects: ["x", "x", "x"]

Exemple :
from itertools import repeat
list(repeat(0, 5))      # [0, 0, 0, 0, 0]
list(repeat([1,2], 2))  # [[1,2], [1,2]] — same objet repeated

Usages courants :
• Providing constant valeurs vers map/zip
• Creating fixed-length sequences of the same valeur
• Par défaut fill valeurs in algorithms`,
  2861: `itertools.count crée an infinite counter that starts at a given valeur et increments by a step. Since it's infinite, you must use it avec something that limits consumption (like islice, zip, ou a manual break).

Concepts clés :
• count(start=0, step=1) — par défaut start is 0, par défaut step is 1
• Produit an infinite sequence: start, start+step, start+2*step, ...
• Doit être limité externally (islice, zip, liste comprehension avec range, etc.)
• Works avec floats too: count(0.5, 0.1)

Comment ça fonctionne :
1. count(10, 2) crée a counter starting at 10, step 2
2. Premier next(c) → 10
3. Second next(c) → 12
4. Third next(c) → 14
5. Fourth next(c) → 16
6. Résultat : [10, 12, 14, 16]

Exemple :
from itertools import count, islice
list(islice(count(1, 3), 5))  # [1, 4, 7, 10, 13]
list(islice(count(0, -1), 4)) # [0, -1, -2, -3]

Usages courants :
• Generating sequential IDs
• Creating arithmetic progressions
• Pairing avec zip pour enumeration alternatives`,
  2862: `itertools.cycle prend an iterable et renvoie an infinite iterator that repeats the éléments of the iterable endlessly. It premier consumes the entier iterable (saving a copy), then produit éléments depuis the saved copy in a loop.

Concepts clés :
• cycle(iterable) — repeats the iterable's éléments forever
• Saves a copy of the iterable internally
• Doit être limité externally vers avoid infinite loops
• Useful pour round-robin scheduling

Comment ça fonctionne :
1. cycle("AB") saves ['A', 'B'] internally
2. Yields: A, B, A, B, A, B, A, B, ... (forever)
3. [next(c) pour _ in range(5)] prend exactly 5 éléments
4. Résultat : ["A", "B", "A", "B", "A"]

Exemple :
from itertools import cycle, islice
colors = cycle(["red", "green", "blue"])
list(islice(colors, 7))
# ['red', 'green', 'blue', 'red', 'green', 'blue', 'red']

Usages courants :
• Round-robin scheduling
• Alternating between states
• Repeating patterns in data processing`,
  2863: `itertools.islice works like regular slicing mais on any iterator, including infinite ones. It prend start, stop, et step arguments similaire à slice notation.

Concepts clés :
• islice(iterable, stop) — take premier 'stop' éléments
• islice(iterable, start, stop) — skip 'start', take jusqu'à 'stop'
• islice(iterable, start, stop, step) — avec step like [start:stop:step]
• Fonctionne sur any iterator, pas just sequences
• Consumes éléments depuis the underlying iterator

Comment ça fonctionne :
1. islice(range(100), 0, 10, 3) slices range(100)
2. Start at index 0, stop avant 10, step of 3
3. Indices selected: 0, 3, 6, 9
4. Values at those indices: 0, 3, 6, 9
5. Résultat : [0, 3, 6, 9]

Exemple :
from itertools import islice, count
list(islice(count(), 5))           # [0, 1, 2, 3, 4]
list(islice("ABCDEFG", 2, 5))     # ['C', 'D', 'E']
list(islice(range(20), 0, 20, 4)) # [0, 4, 8, 12, 16]

Usages courants :
• Taking premier N items depuis an infinite iterator
• Skipping items at the start
• Sampling tout Nth item depuis a stream`,
  2864: `itertools.accumulate renvoie running accumulated résultats. By par défaut it sums, mais you can pass a custom binary fonction. Here, the lambda multiplies, producing a running product.

Concepts clés :
• accumulate(iterable) — running sum by par défaut
• accumulate(iterable, func) — apply func vers accumulate valeurs
• Premier élément is always yielded as-is
• Chaque subsequent élément is func(accumulated, next_element)

Comment ça fonctionne :
1. Start avec premier élément: 1
2. func(1, 2) = 1 * 2 = 2
3. func(2, 3) = 2 * 3 = 6
4. func(6, 4) = 6 * 4 = 24
5. Résultat : [1, 2, 6, 24]

Exemple :
from itertools import accumulate
import operator
list(accumulate([1,2,3,4]))               # [1, 3, 6, 10] — running sum
list(accumulate([1,2,3,4], operator.mul))  # [1, 2, 6, 24] — running product
list(accumulate([3,1,4,1,5], max))         # [3, 3, 4, 4, 5] — running max

Usages courants :
• Running totals et cumulative sums
• Running products
• Running max/min valeurs`,
  2865: `itertools.takewhile produit éléments depuis an iterable as long as the predicate fonction renvoie True. It stops immediately quand the predicate renvoie False pour the premier time — even si later éléments would satisfy the predicate.

Concepts clés :
• takewhile(predicate, iterable) — produit while predicate is True
• Stops at the FIRST False — does NOT resume
• Elements après the premier False are never seen
• Similaire à a "break" condition in a loop

Comment ça fonctionne :
1. Check 1: 1 < 5 → True → yield 1
2. Check 3: 3 < 5 → True → yield 3
3. Check 5: 5 < 5 → False → STOP immediately
4. 2 et 4 are never checked even though they're < 5
5. Résultat : [1, 3]

Exemple :
from itertools import takewhile
list(takewhile(str.islower, "abcDef"))  # ['a', 'b', 'c']
list(takewhile(lambda x: x > 0, [3, 2, 1, 0, -1, 5]))  # [3, 2, 1]

Usages courants :
• Reading data jusqu'à a sentinel valeur
• Processing sorted data up vers a threshold
• Taking a prefix that satisfies a condition`,
  2866: `itertools.dropwhile is the complement of takewhile. It drops éléments depuis the iterable as long as the predicate is True, then produit ALL remaining éléments regardless of whether they satisfy the predicate.

Concepts clés :
• dropwhile(predicate, iterable) — drops while predicate is True
• Once predicate renvoie False, produit EVERYTHING remaining
• Does NOT filter — just skips a prefix
• Later éléments are yielded even si they would satisfy the predicate

Comment ça fonctionne :
1. Check 1: 1 < 5 → True → drop
2. Check 3: 3 < 5 → True → drop
3. Check 5: 5 < 5 → False → yield 5 et everything after
4. Yields: 5, 2, 4 (2 et 4 are yielded even though they're < 5)
5. Résultat : [5, 2, 4]

Exemple :
from itertools import dropwhile
list(dropwhile(str.islower, "abcDef"))  # ['D', 'e', 'f']
list(dropwhile(lambda x: x > 0, [3, 2, 0, -1, 5]))  # [0, -1, 5]

Usages courants :
• Skipping headers in data fichiers
• Ignoring leading whitespace ou noise
• Finding the premier élément that doesn't match a condition`,
  2867: `itertools.compress filters éléments depuis a data iterable using a corresponding selector iterable. An élément is included seulement si its corresponding selector valeur is truthy.

Concepts clés :
• compress(data, selectors) — pairs data avec selectors
• Element is yielded si its selector is truthy (1, True, non-zero, etc.)
• Element is skipped si its selector is falsy (0, False, None, etc.)
• Stops quand either data ou selectors is exhausted

Comment ça fonctionne :
1. Pair: A→1, B→0, C→1, D→0, E→1
2. A: selector 1 (truthy) → yield "A"
3. B: selector 0 (falsy) → skip
4. C: selector 1 (truthy) → yield "C"
5. D: selector 0 (falsy) → skip
6. E: selector 1 (truthy) → yield "E"
7. Résultat : ["A", "C", "E"]

Exemple :
from itertools import compress
data = range(10)
selectors = [1,0,0,1,0,1,0,0,1,0]
list(compress(data, selectors))  # [0, 3, 5, 8]

Usages courants :
• Applying a boolean mask vers data
• Selecting éléments based on external criteria
• Filtering avec precomputed conditions`,
  2868: `itertools.zip_longest works like zip mais continues jusqu'à the LONGEST iterable is exhausted, filling missing valeurs avec a specified fillvalue (default None).

Concepts clés :
• zip_longest(*iterables, fillvalue=None) — zip vers longest
• Regular zip stops at shortest iterable
• zip_longest fills missing valeurs avec fillvalue
• Par défaut fillvalue is None

Comment ça fonctionne :
1. [1,2] has 2 éléments, [3,4,5] has 3 éléments
2. Pair 1: (1, 3)
3. Pair 2: (2, 4)
4. [1,2] is exhausted, mais [3,4,5] has one more élément
5. Pair 3: (0, 5) — 0 is the fillvalue replacing the missing élément
6. Résultat : [(1,3), (2,4), (0,5)]

Exemple :
from itertools import zip_longest
list(zip_longest("AB", "XYZ", fillvalue="-"))
# [('A','X'), ('B','Y'), ('-','Z')]

list(zip_longest([1], [2,3], [4,5,6]))
# [(1,2,4), (None,3,5), (None,None,6)]

Usages courants :
• Aligning data of different lengths
• Parallel iteration where tous éléments matter
• Matrix operations avec uneven rows`,
  2869: `itertools.starmap is like map, mais instead of passing chaque élément as a unique argument, it unpacks chaque élément (which must be an iterable) as multiple arguments vers the fonction.

Concepts clés :
• starmap(function, iterable_of_iterables)
• Chaque élément of the iterable is unpacked avec * into the fonction
• Équivalent à: (func(*args) pour args in iterable)
• Name comes depuis the * (star) used in unpacking

Comment ça fonctionne :
1. starmap(pow, [(2,3), (3,2)])
2. Premier tuple (2,3) → pow(2, 3) = 2³ = 8
3. Second tuple (3,2) → pow(3, 2) = 3² = 9
4. Résultat : [8, 9]

Exemple :
from itertools import starmap
list(starmap(max, [(1,5,3), (2,8,4)]))  # [5, 8]
list(starmap(str.replace, [("hello", "l", "L"), ("world", "o", "0")]))
# ["heLLo", "w0rld"]

Usages courants :
• Applying fonctions avec multiple arguments vers data
• Processing rows of a table/matrix
• Replacing loops that unpack tuples`,
  2870: `json.dumps convertit a Python objet vers a JSON-formatted chaîne. The indent paramètre controls pretty-printing: quand set, it adds newlines et indentation vers make the sortie human-readable.

Concepts clés :
• json.dumps(obj) — compact single-line sortie by par défaut
• json.dumps(obj, indent=n) — pretty-printed avec n spaces per niveau
• indent=None (default) — no pretty-printing
• indent=0 — newlines mais no indentation

Comment ça fonctionne :
1. json.dumps({"a": 1}, indent=2) produces:
{
  "a": 1
}
2. Chaque nesting niveau is indented by 2 additional spaces
3. Keys et valeurs are on separate lignes pour readability

Exemple :
import json
data = {"name": "Alice", "scores": [90, 85]}
print(json.dumps(data, indent=4))
# {
#     "name": "Alice",
#     "scores": [
#         90,
#         85
#     ]
# }

Usages courants :
• Writing human-readable JSON config fichiers
• Debugging JSON data
• Logging structured data`,
  2871: `The sort_keys paramètre in json.dumps sorts the dictionnaire clés alphabetically in the sortie. This is useful pour producing deterministic, reproducible JSON sortie regardless of insertion order.

Concepts clés :
• sort_keys=True — clés appear in alphabetical order
• sort_keys=False (default) — clés appear in insertion order
• Seulement affects dictionnaire clé ordering, pas liste élément ordering
• Useful pour comparing JSON sorties ou version control

Comment ça fonctionne :
1. Input dict: {"b": 2, "a": 1} (insertion order: b first)
2. sort_keys=True sorts clés: "a" avant "b"
3. Output: '{"a": 1, "b": 2}'

Exemple :
import json
data = {"z": 1, "m": 2, "a": 3}
json.dumps(data, sort_keys=True)   # '{"a": 3, "m": 2, "z": 1}'
json.dumps(data, sort_keys=False)  # '{"z": 1, "m": 2, "a": 3}'

Usages courants :
• Deterministic serialization pour hashing ou comparison
• Clean diffs in version control
• Canonical JSON representation`,
  2872: `json.dumps convertit any JSON-serializable Python objet vers a JSON chaîne. Lists become JSON arrays. The par défaut separator inclut a space après commas et après colons.

Concepts clés :
• json.dumps renvoie a STRING, pas a liste
• Python listes become JSON arrays
• Par défaut separators: ", " (comma-space) et ": " (colon-space)
• The résultat is a chaîne representation of the JSON array

Comment ça fonctionne :
1. json.dumps([1, 2, 3]) convertit the liste vers a JSON chaîne
2. Par défaut separator après comma inclut a space
3. Résultat : '[1, 2, 3]' (a chaîne, pas a liste)

Exemple :
import json
json.dumps([1, 2, 3])        # '[1, 2, 3]'
json.dumps(["a", "b"])       # '["a", "b"]'
type(json.dumps([1, 2, 3]))  # <class 'str'>

Usages courants :
• Serializing data pour APIs
• Storing structured data as chaînes
• Sending data over network protocols`,
  2873: `JSON has its own set of data types that differ depuis Python's. json.dumps gère the mapping between Python et JSON types automatically.

Concepts clés :
• Python None → JSON null
• Python True → JSON true
• Python False → JSON false
• Python dict → JSON objet
• Python liste → JSON array
• Python str → JSON chaîne
• Python int/float → JSON nombre

Comment ça fonctionne :
1. json.dumps(None) convertit Python's None vers JSON
2. JSON's equivalent of None is null (lowercase)
3. Résultat : 'null' (a chaîne containing the word null)

Exemple :
import json
json.dumps(None)    # 'null'
json.dumps(True)    # 'true'
json.dumps(False)   # 'false'
json.loads('null')  # None (reverse mapping)

Usages courants :
• Representing absent valeurs in JSON APIs
• Serializing optionnel fields
• Interoperability between Python et JSON`,
  2874: `JSON booleans are lowercase (true/false), unlike Python's capitalized booleans (True/False). json.dumps gère this conversion automatically.

Concepts clés :
• Python True → JSON true (lowercase)
• Python False → JSON false (lowercase)
• This is a common source of confusion between Python et JSON
• json.loads('true') convertit back vers Python True

Comment ça fonctionne :
1. json.dumps(True) convertit Python's True vers JSON format
2. JSON requiert lowercase: true, pas True
3. Résultat : 'true'

Exemple :
import json
json.dumps(True)           # 'true'
json.dumps(False)          # 'false'
json.dumps({"flag": True}) # '{"flag": true}'
json.loads('true')         # True
json.loads('false')        # False

Usages courants :
• Boolean fields in API responses
• Configuration fichiers
• Feature flags in JSON`,
  2875: `json.loads parse a JSON chaîne et renvoie the corresponding Python objet. JSON null is converted vers Python's None.

Concepts clés :
• json.loads(string) — parse JSON chaîne vers Python objet
• JSON null → Python None
• JSON true → Python True
• JSON false → Python False
• Reverse of json.dumps

Comment ça fonctionne :
1. json.loads("null") parse the JSON chaîne "null"
2. JSON null maps vers Python None
3. Résultat : None

Exemple :
import json
json.loads("null")           # None
json.loads("true")           # True
json.loads("42")             # 42
json.loads('"hello"')        # 'hello'
json.loads('[1, 2, 3]')      # [1, 2, 3]
json.loads('{"a": 1}')       # {'a': 1}

Usages courants :
• Parsing API responses
• Reading JSON configuration fichiers
• Deserializing stored data`,
  2876: `json.loads convertit JSON primitives vers their Python equivalents. JSON's lowercase true becomes Python's capitalized True.

Concepts clés :
• json.loads("true") → True (Python bool)
• json.loads("false") → False (Python bool)
• The entrée must be valid JSON — "True" (capitalized) would cause an erreur
• json.loads is strict about JSON syntax

Comment ça fonctionne :
1. json.loads("true") parse the JSON valeur true
2. JSON true → Python True
3. Résultat : True (the Python boolean)

Exemple :
import json
json.loads("true")   # True
json.loads("false")  # False
# json.loads("True")  # JSONDecodeError — pas valid JSON!

Usages courants :
• Parsing boolean valeurs depuis JSON APIs
• Processing feature flags
• Handling boolean configuration valeurs`,
  2877: `json.loads parse a JSON-formatted chaîne et renvoie the corresponding Python data structure. JSON arrays become Python listes, et JSON nombres become Python ints ou floats.

Concepts clés :
• JSON arrays → Python listes
• JSON nombres (no decimal) → Python int
• JSON nombres (with decimal) → Python float
• The chaîne must contain valid JSON

Comment ça fonctionne :
1. json.loads("[1, 2, 3]") parse the JSON array
2. JSON array [1, 2, 3] becomes Python liste [1, 2, 3]
3. Chaque nombre is converted vers a Python int
4. Résultat : [1, 2, 3] (a Python liste, pas a chaîne)

Exemple :
import json
json.loads("[1, 2, 3]")           # [1, 2, 3]
json.loads('["a", "b", "c"]')     # ['a', 'b', 'c']
json.loads('[1, 2.5, "three"]')   # [1, 2.5, 'three']
type(json.loads("[1, 2, 3]"))     # <class 'list'>

Usages courants :
• Parsing liste data depuis JSON APIs
• Processing array-format configuration
• Converting stored JSON arrays back vers Python listes`,
  2878: `JSON seulement prend en charge a limited set of data types: objets, arrays, chaînes, nombres, booleans, et null. Python sets have no JSON equivalent, so json.dumps lève a TypeError.

Concepts clés :
• JSON-serializable types: dict, liste, str, int, float, bool, None
• NOT serializable: set, tuple (but tuple is converted vers array), bytes, custom objets
• Actually, tuples ARE serialized as JSON arrays — mais sets are NOT
• Vers serialize a set, convert it vers a liste first: json.dumps(list(my_set))

Comment ça fonctionne :
1. json.dumps({1, 2, 3}) tries vers serialize a Python set
2. Sets have no JSON equivalent
3. Lève TypeError: Object of type set is pas JSON serializable

Exemple :
import json
# json.dumps({1, 2, 3})     # TypeError!
json.dumps(list({1, 2, 3})) # '[1, 2, 3]' — convert vers liste first
json.dumps((1, 2, 3))       # '[1, 2, 3]' — tuples work (become arrays)

Solution de contournement — custom encoder:
class SetEncoder(json.JSONEncoder):
    def par défaut(self, obj):
        si isinstance(obj, set):
            return liste(obj)
        return super().default(obj)

json.dumps({1, 2, 3}, cls=SetEncoder)  # '[1, 2, 3]'

Usages courants :
• Understanding JSON type limitations
• Building custom JSON encoders pour non-standard types
• Converting data avant serialization`,
  2879: `The separators paramètre in json.dumps controls the caractères used between items et between clés et valeurs. The par défaut is (", ", ": ") which inclut spaces. Using (",", ":") removes spaces pour compact sortie.

Concepts clés :
• separators=(item_separator, clé_separator)
• Default: (", ", ": ") — spaces après commas et colons
• Compact: (",", ":") — no spaces
• Useful pour minimizing JSON size in network transmission

Comment ça fonctionne :
1. json.dumps({"a": 1}, separators=(",", ":"))
2. Item separator "," — no space après comma between clé-value pairs
3. Key separator ":" — no space après colon between clé et valeur
4. Résultat : '{"a":1}' (compact, no extra whitespace)

Exemple :
import json
data = {"a": 1, "b": [2, 3]}
json.dumps(data)                          # '{"a": 1, "b": [2, 3]}'
json.dumps(data, separators=(",", ":"))   # '{"a":1,"b":[2,3]}'

Usages courants :
• Minimizing JSON payload size pour APIs
• Reducing bandwidth in network communication
• Compact storage format`,
  2880: `pathlib.Path.name is a property that renvoie the final component of the path as a chaîne. It's the fichiername (or dernier directory name) sans any parent directories.

Concepts clés :
• Path.name — the dernier component of the path
• Pour fichiers: renvoie the fichiername avec extension
• Pour directories: renvoie the directory name
• Returns a chaîne, pas a Path objet

Comment ça fonctionne :
1. Path("a/b/c") crée a path objet
2. .name renvoie the dernier component: "c"
3. It strips tous parent directories

Exemple :
from pathlib import Path
Path("a/b/c").name          # 'c'
Path("/home/user/file.txt").name  # 'file.txt'
Path("file.py").name        # 'file.py'
Path("/").name              # ''

Usages courants :
• Extracting fichiername depuis a full path
• Getting the dernier directory in a path
• File management et processing`,
  2881: `pathlib.Path.suffix renvoie the fichier extension of the final component, including the leading dot. Si there is no extension, it renvoie an empty chaîne.

Concepts clés :
• Path.suffix — extension avec the dot
• Returns "" si no extension
• Seulement renvoie the LAST extension (for .tar.gz, renvoie .gz)
• Use .suffixes pour tous extensions

Comment ça fonctionne :
1. Path("a/b/c.txt") crée a path
2. .suffix renvoie ".txt" (with the dot)
3. Pas "txt" — the dot is included

Exemple :
from pathlib import Path
Path("file.txt").suffix        # '.txt'
Path("file.tar.gz").suffix     # '.gz' (last only)
Path("file").suffix            # '' (no extension)
Path(".hidden").suffix         # '' (dotfile, pas extension)

Usages courants :
• Checking fichier types by extension
• Filtering fichiers by type
• Conditional processing based on fichier format`,
  2882: `pathlib.Path.stem renvoie the final path component sans its extension. It's équivalent à Path.name minus Path.suffix.

Concepts clés :
• Path.stem — name sans extension
• Path.name = Path.stem + Path.suffix
• Pour multiple extensions (.tar.gz), stem is "file.tar"
• Returns a chaîne

Comment ça fonctionne :
1. Path("a/b/c.txt") crée a path
2. .name is "c.txt"
3. .suffix is ".txt"
4. .stem is "c" (name minus suffix)

Exemple :
from pathlib import Path
Path("report.pdf").stem         # 'report'
Path("archive.tar.gz").stem     # 'archive.tar' (removes seulement dernier suffix)
Path("noext").stem              # 'noext'
Path("/home/user/file.py").stem # 'file'

Usages courants :
• Getting base fichiername pour renaming
• Creating sortie fichiernames avec different extensions
• Processing fichiers sans caring about their type`,
  2883: `pathlib.Path overloads the / (division) operator vers join path segments. This fournit a clean, readable syntax pour building paths.

Concepts clés :
• Path / chaîne — joins path avec chaîne segment
• Path / Path — joins two Path objets
• Équivalent à Path.joinpath()
• Returns a new Path objet (paths are immutable)

Comment ça fonctionne :
1. Path("a/b") crée a path
2. / "c.txt" joins "c.txt" as a child
3. Résultat : Path("a/b/c.txt")

Exemple :
from pathlib import Path
base = Path("/home/user")
base / "docs" / "file.txt"     # Path('/home/user/docs/file.txt')
Path("src") / Path("main.py")  # Path('src/main.py')

# Si right side is absolute, it remplace the left:
Path("a/b") / "/c"             # Path('/c')

Usages courants :
• Building fichier paths dynamically
• Constructing paths in a readable way
• Cross-platform path construction`,
  2884: `pathlib.Path.parent renvoie a new Path representing the parent directory. It strips the dernier component of the path.

Concepts clés :
• Path.parent — immediate parent directory
• Path.parents — sequence of tous ancestor directories
• Returns a Path objet, pas a chaîne
• Does pas check si the path actually exists

Comment ça fonctionne :
1. Path("a/b/c") represents path a/b/c
2. .parent removes the dernier component ("c")
3. Résultat : Path("a/b")

Exemple :
from pathlib import Path
Path("/home/user/file.txt").parent    # Path('/home/user')
Path("/home/user/file.txt").parent.parent  # Path('/home')
Path("a").parent                      # Path('.')

# .parents gives tous ancestors:
p = Path("/a/b/c/d")
list(p.parents)  # [Path('/a/b/c'), Path('/a/b'), Path('/a'), Path('/')]

Usages courants :
• Navigating directory hierarchies
• Creating sibling fichiers
• Finding project root directories`,
  2885: `pathlib.Path.parts renvoie a tuple containing tous the individual components of the path. Pour absolute paths, the root (/ ou drive letter) is included as the premier élément.

Concepts clés :
• Path.parts — tuple of path components
• Relative paths: just the directories et fichiername
• Absolute paths: root is included as premier élément
• Returns a tuple, pas a liste

Comment ça fonctionne :
1. Path("a/b/c") is a relative path avec 3 components
2. .parts splits into individual components
3. Résultat : ("a", "b", "c")

Exemple :
from pathlib import Path
Path("a/b/c").parts            # ('a', 'b', 'c')
Path("/usr/local/bin").parts   # ('/', 'usr', 'local', 'bin')
Path("file.txt").parts         # ('file.txt',)

Usages courants :
• Inspecting individual path components
• Checking si a specific directory is in the path
• Reconstructing paths depuis parts`,
  2886: `pathlib.Path.suffixes renvoie a liste of tous the fichier extensions in the path's final component. Contrairement à .suffix which seulement renvoie the dernier extension, .suffixes captures tous of them.

Concepts clés :
• Path.suffixes — liste of tous extensions
• Path.suffix — seulement the dernier extension
• Chaque extension inclut its leading dot
• Returns a liste of chaînes

Comment ça fonctionne :
1. Path("file.tar.gz") has two extensions
2. .suffixes renvoie [".tar", ".gz"]
3. Compare: .suffix renvoie just ".gz"

Exemple :
from pathlib import Path
Path("file.tar.gz").suffixes     # ['.tar', '.gz']
Path("file.txt").suffixes        # ['.txt']
Path("file").suffixes            # []
Path("my.backup.2024.zip").suffixes  # ['.backup', '.2024', '.zip']

Usages courants :
• Detecting compound extensions like .tar.gz
• Processing fichiers avec multiple extensions
• Stripping tous extensions depuis a fichiername`,
  2887: `os.path.join intelligently joins path components using the correct separator pour the current operating system. On Unix/macOS it uses /, on Windows it uses \\.

Concepts clés :
• os.path.join(path1, path2, ...) — joins avec OS separator
• Gère trailing/leading separators correctly
• Si a component is absolute, previous components are discarded
• Returns a chaîne (not a Path objet)

Comment ça fonctionne :
1. os.path.join("a", "b", "c") joins three components
2. On Unix: uses / as separator
3. Résultat : "a/b/c"

Exemple :
import os.path
os.path.join("home", "user", "file.txt")  # 'home/user/file.txt'
os.path.join("/home", "user")             # '/home/user'
os.path.join("a", "/b", "c")             # '/b/c' (absolute resets)

Usages courants :
• Building fichier paths in a cross-platform way
• Older alternative vers pathlib.Path / operator
• Working avec os module fonctions that expect chaîne paths`,
  2888: `os.path.splitext splits a path into a (root, extension) tuple. The extension inclut the dot. Si there's no extension, the second élément is an empty chaîne.

Concepts clés :
• Returns a tuple: (root, ext)
• Extension inclut the dot
• Seulement splits the LAST dot: "file.tar.gz" → ("file.tar", ".gz")
• No extension: ("file", "")

Comment ça fonctionne :
1. os.path.splitext("file.txt") splits at the dernier dot
2. Root: "file"
3. Extension: ".txt" (with dot)
4. Résultat : ("file", ".txt")

Exemple :
import os.path
os.path.splitext("file.txt")         # ('file', '.txt')
os.path.splitext("archive.tar.gz")   # ('archive.tar', '.gz')
os.path.splitext("noext")            # ('noext', '')
os.path.splitext("/path/to/file.py") # ('/path/to/file', '.py')

Usages courants :
• Extracting fichier extensions
• Changing fichier extensions
• Checking fichier types`,
  2889: `os.path.basename renvoie the dernier component of a path — the fichiername ou dernier directory name. It's équivalent à Path.name in pathlib.

Concepts clés :
• os.path.basename(path) — renvoie dernier path component
• Équivalent à the part après the dernier separator
• Returns empty chaîne pour paths ending in separator
• Returns a chaîne

Comment ça fonctionne :
1. os.path.basename("/a/b/c.txt")
2. Splits at dernier separator /
3. Returns everything after: "c.txt"

Exemple :
import os.path
os.path.basename("/a/b/c.txt")   # 'c.txt'
os.path.basename("/a/b/c/")      # '' (trailing separator)
os.path.basename("file.py")      # 'file.py'

Usages courants :
• Extracting fichiernames depuis full paths
• Logging just the fichiername
• File processing pipelines`,
  2890: `os.path.dirname renvoie everything avant the dernier path separator — the directory containing the fichier. It's équivalent à Path.parent in pathlib (but renvoie a chaîne).

Concepts clés :
• os.path.dirname(path) — directory portion
• os.path.basename(path) — fichiername portion
• Together: dirname + basename = full path
• Returns a chaîne

Comment ça fonctionne :
1. os.path.dirname("/a/b/c.txt")
2. Splits at dernier separator /
3. Returns everything before: "/a/b"

Exemple :
import os.path
os.path.dirname("/a/b/c.txt")    # '/a/b'
os.path.dirname("/a/b/")         # '/a/b'
os.path.dirname("file.txt")      # '' (no directory)

# dirname + basename = full path
path = "/a/b/c.txt"
os.path.dirname(path) + "/" + os.path.basename(path)
# '/a/b/c.txt'

Usages courants :
• Extracting the directory of a fichier
• Navigating vers parent directories
• Constructing sibling fichier paths`,
  2891: `os.sep is a chaîne constant containing the caractère used by the operating system vers separate path components. On Unix-based systems (Linux, macOS) it's /, on Windows it's \\.

Concepts clés :
• os.sep — path separator: "/" on Unix, "\\" on Windows
• os.altsep — alternative separator (None on Unix, "/" on Windows)
• os.pathsep — PATH variable separator: ":" on Unix, ";" on Windows
• Use os.path.join ou pathlib instead of manual chaîne concatenation

Comment ça fonctionne :
1. On Unix/macOS, paths use / as separator
2. os.sep renvoie "/"
3. On Windows, os.sep renvoie "\\\\"

Exemple :
import os
print(os.sep)      # '/' on Unix, '\\' on Windows
print(os.pathsep)  # ':' on Unix, ';' on Windows

# Avoid this:
path = "a" + os.sep + "b"  # 'a/b'
# Prefer this:
path = os.path.join("a", "b")  # 'a/b' (more portable)

Usages courants :
• Understanding OS-specific path behavior
• Splitting paths manually (prefer os.path.split instead)
• Cross-platform path utilities`,
  2892: `pathlib.Path.with_suffix renvoie a new Path avec the suffix (extension) changed. Si the original path has no suffix, the new suffix is appended.

Concepts clés :
• with_suffix(new_suffix) — remplace the extension
• The new suffix must include the dot: ".md" pas "md"
• with_suffix("") removes the extension entirely
• Returns a new Path (paths are immutable)

Comment ça fonctionne :
1. Path("a.txt") has suffix ".txt"
2. .with_suffix(".md") remplace ".txt" avec ".md"
3. Résultat : Path("a.md")

Exemple :
from pathlib import Path
Path("report.txt").with_suffix(".pdf")   # Path('report.pdf')
Path("archive.tar.gz").with_suffix(".bz2")  # Path('archive.tar.bz2')
Path("file.txt").with_suffix("")         # Path('file') — removes extension
Path("noext").with_suffix(".py")         # Path('noext.py') — adds extension

Usages courants :
• Converting fichier formats (change extension avant saving)
• Creating sortie fichiers avec different extensions
• Generating companion fichiers (.py → .pyc)`,
  2893: `The chaîne module fournit several useful chaîne constants. ascii_lowercase contient tous 26 lowercase English letters depuis 'a' vers 'z'.

Concepts clés :
• chaîne.ascii_lowercase — "abcdefghijklmnopqrstuvwxyz"
• It's a constant chaîne, pas a fonction
• Contient exactly 26 caractères
• Seulement ASCII letters — no accented caractères

Comment ça fonctionne :
1. import chaîne loads the chaîne module
2. chaîne.ascii_lowercase is a pre-defined constant
3. Value: "abcdefghijklmnopqrstuvwxyz"

Exemple :
import chaîne
string.ascii_lowercase  # 'abcdefghijklmnopqrstuvwxyz'
len(string.ascii_lowercase)  # 26
'a' in chaîne.ascii_lowercase  # True
'A' in chaîne.ascii_lowercase  # False

Usages courants :
• Validating that a chaîne contient seulement lowercase letters
• Generating random chaînes
• Character rotation ciphers (Caesar cipher, ROT13)`,
  2894: `string.ascii_uppercase contient tous 26 uppercase English letters depuis 'A' vers 'Z'. It's the uppercase counterpart of chaîne.ascii_lowercase.

Concepts clés :
• chaîne.ascii_uppercase — "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
• Exactly 26 caractères
• Seulement ASCII uppercase letters
• Counterpart: chaîne.ascii_lowercase

Comment ça fonctionne :
1. chaîne.ascii_uppercase is a pre-defined constant
2. Value: "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

Exemple :
import chaîne
string.ascii_uppercase  # 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
len(string.ascii_uppercase)  # 26
'Z' in chaîne.ascii_uppercase  # True
'z' in chaîne.ascii_uppercase  # False

Usages courants :
• Validating uppercase entrée
• Password strength checking
• Encoding/decoding algorithms`,
  2895: `string.digits contient tous 10 decimal digit caractères depuis '0' vers '9'. It's useful pour validating numeric entrée ou generating random numeric chaînes.

Concepts clés :
• chaîne.digits — "0123456789"
• Starts avec '0', pas '1'
• Contient 10 caractères
• Seulement ASCII digits — no unicode numerals

Comment ça fonctionne :
1. chaîne.digits is a pre-defined constant
2. Value: "0123456789"

Exemple :
import chaîne
string.digits            # '0123456789'
len(string.digits)       # 10
'5' in chaîne.digits     # True
'a' in chaîne.digits     # False

# Check si chaîne is tous digits:
all(c in chaîne.digits pour c in "12345")  # True
all(c in chaîne.digits pour c in "123a5")  # False

Usages courants :
• Validating numeric chaînes
• Generating random PINs ou codes
• Stripping non-digit caractères`,
  2896: `string.punctuation contient tous ASCII caractères that are considered punctuation — caractères that are printable mais are neither letters nor digits.

Concepts clés :
• chaîne.punctuation — tous ASCII punctuation
• Contains: !"#$%&'()*+,-./:;<=>?@[\\]^_\`{|}~
• 32 caractères total
• Does pas include space (space is in chaîne.whitespace)

Comment ça fonctionne :
1. chaîne.punctuation is a pre-defined constant
2. Contient tout printable ASCII caractère that is pas a letter, digit, ou whitespace
3. Les deux '!' et '@' are included

Exemple :
import chaîne
string.punctuation  # '!"#$%&\\'()*+,-./:;<=>?@[\\\\]^_\`{|}~'
len(string.punctuation)  # 32
'!' in chaîne.punctuation   # True
'@' in chaîne.punctuation   # True
' ' in chaîne.punctuation   # False (space is whitespace)

Usages courants :
• Stripping punctuation depuis text
• Password validation (checking pour special caractères)
• Text preprocessing pour NLP`,
  2897: `string.ascii_letters is the concatenation of chaîne.ascii_lowercase et chaîne.ascii_uppercase, containing tous 52 ASCII letters.

Concepts clés :
• chaîne.ascii_letters = chaîne.ascii_lowercase + chaîne.ascii_uppercase
• "abcdefghijklmnopqrstuvwxyz" + "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
• Total: 26 + 26 = 52 caractères
• Does pas include digits, punctuation, ou whitespace

Comment ça fonctionne :
1. chaîne.ascii_letters contient tous 52 ASCII letters
2. len(string.ascii_letters) renvoie 52
3. 26 lowercase + 26 uppercase = 52

Exemple :
import chaîne
string.ascii_letters  # 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
len(string.ascii_letters)  # 52
'a' in chaîne.ascii_letters  # True
'Z' in chaîne.ascii_letters  # True
'5' in chaîne.ascii_letters  # False

Usages courants :
• Validating alphabetic entrée
• Generating random alphanumeric chaînes (with chaîne.digits)
• Character classification`,
  2898: `string.hexdigits contient tous caractères that are valid in hexadecimal representation: the 10 decimal digits (0-9) plus lowercase (a-f) et uppercase (A-F) hex letters.

Concepts clés :
• chaîne.hexdigits — "0123456789abcdefABCDEF"
• Contient 22 caractères total
• Includes les deux lowercase et uppercase hex letters
• Hexadecimal uses base 16: 0-9 et A-F

Comment ça fonctionne :
1. chaîne.hexdigits is a pre-defined constant
2. Value: "0123456789abcdefABCDEF"
3. Contient digits 0-9, then a-f, then A-F

Exemple :
import chaîne
string.hexdigits  # '0123456789abcdefABCDEF'
len(string.hexdigits)  # 22
'f' in chaîne.hexdigits  # True
'F' in chaîne.hexdigits  # True
'g' in chaîne.hexdigits  # False

# Validate hex chaîne:
all(c in chaîne.hexdigits pour c in "1a2B3c")  # True
all(c in chaîne.hexdigits pour c in "1g2h")    # False

Usages courants :
• Validating hexadecimal chaînes
• Parsing color codes (#FF0000)
• Working avec hex-encoded data`,
  2899: `string.whitespace contient tous ASCII caractères considered whitespace. These are caractères that create blank space in text sortie.

Concepts clés :
• chaîne.whitespace — contient 6 whitespace caractères
• Space ' ', Tab '\\t', Newline '\\n'
• Carriage Return '\\r', Form Feed '\\x0c', Vertical Tab '\\x0b'
• These are the same caractères that str.split() splits on by par défaut

Comment ça fonctionne :
1. chaîne.whitespace is a pre-defined constant
2. Contains: ' \\t\\n\\r\\x0b\\x0c'
3. These caractères tous produce "blank" space in sortie

Exemple :
import chaîne
string.whitespace     # ' \\t\\n\\r\\x0b\\x0c'
len(string.whitespace)  # 6
' ' in chaîne.whitespace   # True
'\\t' in chaîne.whitespace  # True
'\\n' in chaîne.whitespace  # True

# Check si caractère is whitespace:
all(c in chaîne.whitespace pour c in " \\t\\n")  # True

Usages courants :
• Custom whitespace stripping
• Tokenization et parsing
• Detecting whitespace-only chaînes`,
  2900: `textwrap.wrap breaks a long chaîne into a liste of lignes, where chaque ligne is at most 'width' caractères long. It breaks at word boundaries (spaces) vers avoid splitting words.

Concepts clés :
• textwrap.wrap(text, width=70) — renvoie a liste of chaînes
• Par défaut width is 70 caractères
• Breaks at word boundaries (whitespace)
• Returns a liste of lignes sans trailing newlines

Comment ça fonctionne :
1. textwrap.wrap("hello world foo bar", width=10)
2. Breaks text so no ligne exceeds 10 caractères
3. Breaks at spaces: ["hello", "world foo", "bar"] ou similar
4. Returns a liste of wrapped lignes

Exemple :
import textwrap
textwrap.wrap("hello world foo bar", width=10)
# ['hello', 'world foo', 'bar']

textwrap.wrap("The quick brown fox jumps over the lazy dog", width=15)
# ['The quick brown', 'fox jumps over', 'the lazy dog']

# textwrap.fill is similar mais joins avec newlines:
textwrap.fill("hello world foo bar", width=10)
# 'hello\\nworld foo\\nbar'

Usages courants :
• Formatting text pour terminal sortie
• Creating fixed-width text displays
• Email formatting`,
  2901: `textwrap.dedent removes any common leading whitespace depuis tous lignes in the text. It inspects tous non-empty lignes, finds the longest common whitespace prefix, et removes it.

Concepts clés :
• dedent finds the COMMON leading whitespace across tous lignes
• Seulement removes whitespace that appears in EVERY non-empty ligne
• Empty lignes are ignored quand computing the common prefix
• Useful pour cleaning up triple-quoted chaînes in code

Comment ça fonctionne :
1. Input: "  hello\\n  world"
2. Line 1: "  hello" (2 spaces leading)
3. Line 2: "  world" (2 spaces leading)
4. Common leading whitespace: 2 spaces
5. Remove 2 spaces depuis chaque ligne
6. Résultat : "hello\\nworld"

Exemple :
import textwrap
s = """
    def foo():
        return 42
"""
print(textwrap.dedent(s))
# \\ndef foo():\\n    return 42\\n
# (4 spaces removed depuis chaque ligne, leaving relative indentation intact)

Usages courants :
• Cleaning up multi-line chaînes defined in indented code
• Formatting docstrings
• Template processing`,
  2902: `string.Template fournit a simpler chaîne substitution mechanism than str.format ou f-strings. Variables are marked avec $ prefix et replaced using substitute() ou safe_substitute().

Concepts clés :
• Template("$var") — marks variables avec $
• .substitute(var=value) — remplace variables, lève KeyError si missing
• .safe_substitute(var=value) — remplace what it can, leaves missing $vars as-is
• Simpler et safer than % formatting pour user-supplied templates

Comment ça fonctionne :
1. Template("Hello $name") crée a template avec variable $name
2. .substitute(name="World") remplace $name avec "World"
3. Résultat : "Hello World"

Exemple :
from chaîne import Template
t = Template("$greeting, $name!")
t.substitute(greeting="Hi", name="Alice")   # 'Hi, Alice!'
t.safe_substitute(greeting="Hi")            # 'Hi, $name!' (missing var kept)

# Use braces pour adjacent text:
You can use braces like Template("$\\{noun}ification") pour adjacent text.

# $$ pour literal dollar sign:
Template("Price: $$100").substitute()  # 'Price: $100'

Usages courants :
• User-defined templates (safer than eval/exec)
• Simple mail merge operations
• Configuration fichier templates
• Cases where f-strings ou .format are too powerful/risky`,
  2903: `Python's logging module définit exactly 5 standard logging niveaus, chaque avec a numeric valeur. They are, depuis lowest vers highest severity: DEBUG (10), INFO (20), WARNING (30), ERROR (40), et CRITICAL (50). These niveaus allow developers vers categorize log messages by severity et filter sortie accordingly.

Concepts clés :
• DEBUG (10) — detailed diagnostic information
• INFO (20) — confirmation that things are working
• WARNING (30) — something unexpected happened, mais the software still works
• ERROR (40) — a serious problem, some fonction failed
• CRITICAL (50) — a very serious erreur, program may pas continue

Comment ça fonctionne :
• Chaque niveau has a numeric valeur (multiples of 10)
• Setting a niveau filters out messages below that severity
• Custom niveaus can be added mais these 5 are standard
• The par défaut niveau is WARNING

Exemple :
>>> import logging
>>> logging.DEBUG
10
>>> logging.INFO
20
>>> logging.WARNING
30
>>> logging.ERROR
40
>>> logging.CRITICAL
50

Usages courants :
• DEBUG pour development diagnostics
• INFO pour runtime confirmations
• WARNING pour recoverable issues
• ERROR pour failures
• CRITICAL pour fatal problems`,
  2904: `By par défaut, the logging module is set vers WARNING niveau. This means seulement messages at WARNING, ERROR, et CRITICAL severity are displayed. DEBUG et INFO messages are silently ignored sauf si you explicitly configure a lower niveau.

Concepts clés :
• Par défaut niveau is WARNING (numeric valeur 30)
• Messages below WARNING are suppressed by par défaut
• This is why logging.debug() et logging.info() produce no sortie sans configuration
• Use logging.basicConfig(level=logging.DEBUG) vers see tous messages

Comment ça fonctionne :
• Quand you call logging.warning("msg"), it appears
• Quand you call logging.info("msg"), nothing happens (below threshold)
• Quand you call logging.debug("msg"), nothing happens (below threshold)
• You must configure the niveau vers see lower-severity messages

Exemple :
>>> import logging
>>> logging.warning("This appears")
WARNING:root:This appears
>>> logging.info("This is hidden")
>>> logging.debug("This is also hidden")

Usages courants :
• Production systems typically use WARNING ou ERROR
• Development uses DEBUG vers see everything
• Testing often uses INFO pour moderate verbosity`,
  2905: `Chaque logging niveau in Python has a corresponding integer valeur. DEBUG is the lowest standard niveau avec a numeric valeur of 10. These numeric valeurs determine the severity hierarchy et are used internally vers compare et filter messages.

Concepts clés :
• logging.DEBUG = 10
• Lowest of the 5 standard niveaus
• Used pour detailed diagnostic information
• Messages at this niveau are typically seulement useful pendant development

Comment ça fonctionne :
• Levels are compared numerically: DEBUG(10) < INFO(20) < WARNING(30) < ERROR(40) < CRITICAL(50)
• Quand a logger's niveau is set vers X, seulement messages avec niveau >= X are processed
• Setting niveau vers DEBUG shows tous standard messages

Exemple :
>>> import logging
>>> logging.DEBUG
10
>>> logging.getLevelName(10)
'DEBUG'
>>> logging.getLevelName('DEBUG')
10`,
  2906: `logging.INFO is the second-lowest standard logging niveau avec a numeric valeur of 20. It is used pour general informational messages that confirm the program is working as expected.

Concepts clés :
• logging.INFO = 20
• Second niveau above DEBUG
• Used pour confirmation that things are working as expected
• Pas shown by par défaut (default niveau is WARNING = 30)

Comment ça fonctionne :
• INFO messages are suppressed by par défaut
• Vers see INFO messages: logging.basicConfig(level=logging.INFO)
• INFO is appropriate pour tracking program flow in normal operation

Exemple :
>>> import logging
>>> logging.INFO
20
>>> logging.basicConfig(level=logging.INFO)
>>> logging.info("Server started")
INFO:root:Server started`,
  2907: `logging.WARNING has a numeric valeur of 30 et is the par défaut logging niveau. It indique something unexpected happened ou a potential problem, mais the program can still continue operating.

Concepts clés :
• logging.WARNING = 30
• This is the par défaut niveau — messages at WARNING et above are shown
• Indique something unexpected ou potentially harmful
• Program still fonctions despite the warning

Comment ça fonctionne :
• WARNING messages are shown by par défaut (no configuration needed)
• Signals issues that should be investigated mais are pas critical
• Commonly used pour deprecation notices, resource usage alerts

Exemple :
>>> import logging
>>> logging.WARNING
30
>>> logging.warning("Disk space low")
WARNING:root:Disk space low`,
  2908: `logging.ERROR has a numeric valeur of 40. It indique a more serious problem — the software has pas been able vers perform some fonction.

Concepts clés :
• logging.ERROR = 40
• Second-highest standard niveau
• Indique a significant problem that prevented a fonction depuis completing
• Program may still run, mais something definitely failed

Comment ça fonctionne :
• ERROR messages indicate failure of a specific operation
• Always shown at par défaut niveau (40 >= 30)
• Used quand catching exceptions that prevent normal operation

Exemple :
>>> import logging
>>> logging.ERROR
40
>>> logging.error("Database connection failed")
ERROR:root:Database connection failed`,
  2909: `logging.CRITICAL has a numeric valeur of 50 et is the highest standard logging niveau. It indique a very serious erreur that may prevent the program depuis continuing vers run.

Concepts clés :
• logging.CRITICAL = 50
• Highest standard logging niveau
• Indique a fatal erreur — the program may pas be able vers continue
• Reserved pour the most severe issues

Comment ça fonctionne :
• CRITICAL messages indicate the program itself may be unable vers continue
• Always displayed regardless of configured niveau (unless logging is disabled entirely)
• Used pour system-level failures, unrecoverable erreurs

Exemple :
>>> import logging
>>> logging.CRITICAL
50
>>> logging.critical("System out of memory")
CRITICAL:root:System out of memory`,
  2910: `logging.basicConfig() is a convenience fonction that configures the root logger. Quand called avec niveau=logging.DEBUG, it sets the minimum severity threshold vers DEBUG (10), meaning tous standard log messages (DEBUG, INFO, WARNING, ERROR, CRITICAL) will be displayed.

Concepts clés :
• basicConfig configures the root logger (the top-level logger)
• niveau=logging.DEBUG sets the threshold vers 10
• Tous messages avec niveau >= 10 will be shown
• Can seulement effectively be called once (subsequent calls are ignored si handlers exist)

Comment ça fonctionne :
• Sets the root logger's niveau vers DEBUG
• Adds a StreamHandler (console sortie) si none exists
• Après this call, logging.debug("msg") will produce sortie
• Sans this call, debug/info messages are suppressed

Exemple :
>>> import logging
>>> logging.basicConfig(level=logging.DEBUG)
>>> logging.debug("Now visible!")
DEBUG:root:Now visible!
>>> logging.info("Also visible!")
INFO:root:Also visible!

Usages courants :
• Quick setup pour development
• Accepte format, fichiername, fichiermode, datefmt paramètres
• logging.basicConfig(filename='app.log', niveau=logging.DEBUG)`,
  2911: `A logging Handler is responsible pour dispatching log records vers their final destination. Different handler types send records vers different sorties — the console, fichiers, network sockets, email, etc.

Concepts clés :
• Handlers determine WHERE log messages go
• StreamHandler sends vers console (stdout/stderr)
• FileHandler sends vers a fichier
• Multiple handlers can be attached vers one logger
• Chaque handler can have its own niveau et formatter

Comment ça fonctionne :
• Logger crée a LogRecord
• LogRecord is passed vers tous attached handlers
• Chaque handler vérifie its own niveau filter
• Si the record passes, the handler formats et emits it

Exemple :
>>> import logging
>>> logger = logging.getLogger('myapp')
>>> console_handler = logging.StreamHandler()
>>> fichier_handler = logging.FileHandler('app.log')
>>> logger.addHandler(console_handler)
>>> logger.addHandler(file_handler)

Common handler types:
• StreamHandler — console sortie
• FileHandler — write vers fichier
• RotatingFileHandler — fichier avec size-based rotation
• SMTPHandler — send email alerts
• SocketHandler — send over network`,
  2912: `A logging Formatter définit the structure et content of the final log sortie chaîne. It détermine what information is included (timestamp, niveau, message, module name, etc.) et how it is arranged.

Concepts clés :
• Formatters determine HOW log messages look
• Applied vers handlers, pas loggers directly
• Use format chaînes avec special LogRecord attributes
• Common attributes: %(asctime)s, %(levelname)s, %(message)s, %(name)s

Comment ça fonctionne :
• Create a Formatter avec a format chaîne
• Attach the Formatter vers a Handler
• Quand the handler emits a record, the formatter produit the final chaîne

Exemple :
>>> import logging
>>> formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
>>> handler = logging.StreamHandler()
>>> handler.setFormatter(formatter)
>>> logger = logging.getLogger('myapp')
>>> logger.addHandler(handler)
>>> logger.warning("Test")
2024-01-15 10:30:00,123 - myapp - WARNING - Test

Common format attributes:
• %(asctime)s — human-readable timestamp
• %(levelname)s — niveau name (DEBUG, INFO, etc.)
• %(message)s — the log message
• %(name)s — logger name
• %(filename)s — source fichier name
• %(lineno)d — ligne nombre`,
  2913: `Using __name__ as the logger name crée a logger that is named après the current module (e.g., 'mypackage.mymodule'). This permet hierarchical logging where child loggers inherit settings depuis parent loggers based on the dot-separated naming convention.

Concepts clés :
• __name__ is the module's fully qualified name (e.g., 'mypackage.utils')
• Logger names use dot notation pour hierarchy: 'a.b' is a child of 'a'
• Child loggers propagate messages vers parent loggers
• The root logger is the ancestor of tous loggers

Comment ça fonctionne :
• In mypackage/utils.py, __name__ is 'mypackage.utils'
• logging.getLogger('mypackage.utils') crée a logger in the hierarchy
• Settings on 'mypackage' logger apply vers tous 'mypackage.*' loggers
• This permet configuring logging per-package ou per-module

Exemple :
# In mypackage/utils.py
import logging
logger = logging.getLogger(__name__)  # logger named 'mypackage.utils'
logger.info("Processing data")

# Configure at package niveau
pkg_logger = logging.getLogger('mypackage')
pkg_logger.setLevel(logging.DEBUG)  # Affects tous mypackage.* loggers

Usages courants :
• Best practice pour library et application logging
• Permet per-module log configuration
• Makes log sortie show which module generated chaque message`,
  2914: `A unique logger can have any nombre of handlers attached vers it. Chaque handler independently processes log records, so you can send the same log message vers multiple destinations simultaneously.

Concepts clés :
• No limit on the nombre of handlers per logger
• Chaque handler can have its own niveau et formatter
• Common pattern: console handler pour development + fichier handler pour persistence
• Handlers process records independently

Comment ça fonctionne :
• Logger reçoit a log message
• Message is passed vers ALL attached handlers
• Chaque handler applies its own niveau filter
• Chaque handler uses its own formatter
• Output goes vers chaque handler's destination

Exemple :
>>> import logging
>>> logger = logging.getLogger('myapp')
>>> logger.setLevel(logging.DEBUG)
>>>
>>> console = logging.StreamHandler()
>>> console.setLevel(logging.WARNING)
>>>
>>> fichier_h = logging.FileHandler('debug.log')
>>> fichier_h.setLevel(logging.DEBUG)
>>>
>>> logger.addHandler(console)
>>> logger.addHandler(file_h)
>>>
>>> logger.debug("Seulement in fichier")
>>> logger.warning("In les deux console et fichier")

Usages courants :
• Console (WARNING+) + fichier (DEBUG+) pour development
• File + email (CRITICAL) pour production alerts
• Rotating fichier + syslog pour server applications`,
  2915: `logging.exception() is like logging.error() mais automatically inclut the exception traceback in the log sortie. It should seulement be called depuis within an exception handler (except block).

Concepts clés :
• Logs at ERROR niveau (same as logging.error)
• Automatically appends the current exception's traceback
• Doit être appelé inside an except block
• Équivalent à logging.error("msg", exc_info=True)

Comment ça fonctionne :
• Captures the current exception via sys.exc_info()
• Formats the full traceback
• Appends it vers the log message
• Produit multi-line sortie showing the erreur chain

Exemple :
>>> import logging
>>> try:
...     résultat = 1 / 0
... except ZeroDivisionError:
...     logging.exception("Calculation failed")
ERROR:root:Calculation failed
Traceback (most recent call last):
  File "<stdin>", ligne 2, in <module>
ZeroDivisionError: division by zero

Usages courants :
• Logging caught exceptions avec full traceback pour debugging
• Production erreur reporting
• Preferred over logging.error quand you want stack trace details`,
  2916: `The logging module fournit a robust, flexible framework pour emitting log messages, whereas print() simply writes vers stdout. Logging has features that print lacks entirely.

Concepts clés :
• Logging has severity niveaus (DEBUG through CRITICAL)
• Logging has handlers (console, fichier, network, email, etc.)
• Logging has formatters (custom sortie format)
• Logging can be configured externally (config fichiers, dictConfig)
• print() writes vers stdout avec no filtering ou routing

Comment ça fonctionne :
• print() always sorties vers stdout (unless redirected)
• Logging routes messages through a configurable pipeline
• Log niveaus allow filtering sans changing code
• Handlers allow routing vers multiple destinations
• Configuration can be changed at deployment time

Exemple :
# print - no control
print("User logged in")  # Always prints vers stdout

# logging - full control
import logging
logging.info("User logged in")  # Can be filtered, routed, formatted

Usages courants :
• print() pour quick debugging (remove avant committing)
• logging pour production applications
• logging pour libraries (let the consumer configure sortie)
• logging pour long-running services avec structured sortie`,
  2917: `logging.FileHandler crée a handler objet that sends log sortie vers a disk fichier. You attach it vers a logger vers direct log messages vers a fichier instead of (or in addition to) the console.

Concepts clés :
• Crée a handler that writes vers the specified fichier
• File is opened in append mode ('a') by par défaut
• Can specify mode='w' vers overwrite on chaque run
• Must be attached vers a logger avec addHandler()

Comment ça fonctionne :
• FileHandler("app.log") opens (or creates) app.log
• Quand a log record is emitted through this handler, it writes vers the fichier
• Par défaut mode is 'a' (append), so logs accumulate across runs
• The handler can have its own niveau et formatter

Exemple :
>>> import logging
>>> logger = logging.getLogger('myapp')
>>> handler = logging.FileHandler('app.log')
>>> handler.setLevel(logging.ERROR)
>>> formatter = logging.Formatter('%(asctime)s %(levelname)s %(message)s')
>>> handler.setFormatter(formatter)
>>> logger.addHandler(handler)
>>> logger.error("This goes vers app.log")

Usages courants :
• Persisting logs pour later analysis
• Production logging vers rotating fichiers
• Audit trails et compliance logging
• Combining avec RotatingFileHandler pour size management`,
  2918: `assertEqual(a, b) vérifie that a == b. Si the valeurs are pas equal, the test fails avec a detailed message showing les deux valeurs. It is the most commonly used assertion in unittest.

Concepts clés :
• Uses == operator pour comparison (not 'is')
• Fails avec AssertionError si valeurs differ
• Shows les deux expected et actual valeurs in failure message
• Works avec any types that support ==

Comment ça fonctionne :
• Evaluates a == b
• Si True, the test passes silently
• Si False, lève AssertionError avec diagnostic info
• Optionnel third argument: self.assertEqual(a, b, "custom message")

Exemple :
>>> import unittest
>>> class TestMath(unittest.TestCase):
...     def test_add(self):
...         self.assertEqual(1 + 1, 2)      # passes
...         self.assertEqual("ab", "a" + "b")  # passes
...         self.assertEqual([1,2], [1,2])     # passes

Usages courants :
• Verifying fonction return valeurs
• Checking computed résultats match expected valeurs
• Comparing data structures pour equality`,
  2919: `assertTrue(expr) vérifie that bool(expr) is True. It uses Python's truthiness rules, so any truthy valeur passes — pas just the literal True.

Concepts clés :
• Vérifie bool(expr) is True
• Any truthy valeur passes (non-zero nombres, non-empty containers, etc.)
• Fails avec AssertionError si expr is falsy
• Less informative failure messages than assertEqual

Comment ça fonctionne :
• Evaluates bool(expr)
• Si truthy, test passes
• Si falsy, lève AssertionError
• Failure message just says "False is pas true" — pas very descriptive

Exemple :
>>> self.assertTrue(1 == 1)     # passes (True is truthy)
>>> self.assertTrue([1, 2, 3])  # passes (non-empty liste is truthy)
>>> self.assertTrue(42)         # passes (non-zero int is truthy)
>>> self.assertTrue("")         # FAILS (empty chaîne is falsy)
>>> self.assertTrue(0)          # FAILS (zero is falsy)

Usages courants :
• Checking boolean conditions
• Verifying predicates
• Prefer assertEqual quand comparing specific valeurs (better failure messages)`,
  2920: `assertFalse(expr) vérifie that bool(expr) is False. It passes pour any falsy valeur — pas just the literal False.

Concepts clés :
• Vérifie bool(expr) is False
• Any falsy valeur passes: 0, None, "", [], {}, False, etc.
• Fails avec AssertionError si expr is truthy
• Opposite of assertTrue

Comment ça fonctionne :
• Evaluates bool(expr)
• Si falsy, test passes
• Si truthy, lève AssertionError
• Failure message: "True is pas false"

Exemple :
>>> self.assertFalse(1 == 2)   # passes (False is falsy)
>>> self.assertFalse("")       # passes (empty chaîne is falsy)
>>> self.assertFalse(0)        # passes (zero is falsy)
>>> self.assertFalse(None)     # passes (None is falsy)
>>> self.assertFalse([1])      # FAILS (non-empty liste is truthy)

Usages courants :
• Verifying a condition does pas hold
• Checking that a fonction renvoie a falsy valeur
• Negative test cases`,
  2921: `assertIs(a, b) vérifie that a is b — that les deux variables reference the exact same objet in memory. This is stricter than assertEqual, which seulement vérifie valeur equality.

Concepts clés :
• Uses the 'is' operator (identity check)
• a is b means id(a) == id(b)
• Different depuis assertEqual which uses ==
• Two equal valeurs can be different objets

Comment ça fonctionne :
• Vérifie si a et b point vers the same objet in memory
• Passes seulement si they are the same objet (same id)
• Fails si they are different objets, even avec equal valeurs

Exemple :
>>> a = [1, 2, 3]
>>> b = a
>>> c = [1, 2, 3]
>>> self.assertIs(a, b)    # passes (same objet)
>>> self.assertIs(a, c)    # FAILS (equal mais different objets)
>>> self.assertIs(None, None)  # passes (None is a singleton)

Usages courants :
• Verifying singleton patterns
• Checking None identity (prefer assertIsNone)
• Verifying that two references point vers the same objet`,
  2922: `assertIsNone(x) vérifie that x is None. It uses the 'is' operator internally, checking identity rather than equality. Since None is a singleton in Python, this is the correct way vers test pour None.

Concepts clés :
• Équivalent à assertIs(x, None)
• Uses identity check (is), pas equality (==)
• None is a singleton — there is seulement one None objet
• Preferred over assertEqual(x, None)

Comment ça fonctionne :
• Vérifie x is None
• Passes si x is the None singleton
• Fails pour any other valeur, including 0, False, "", []

Exemple :
>>> self.assertIsNone(None)            # passes
>>> self.assertIsNone(some_func())     # passes si func renvoie None
>>> self.assertIsNone(0)               # FAILS (0 is pas None)
>>> self.assertIsNone(False)           # FAILS (False is pas None)

Usages courants :
• Checking fonctions that return None
• Verifying optionnel attributes are unset
• Testing par défaut return valeurs`,
  2923: `assertIn(a, b) vérifie that a in b is True. It works avec any container ou iterable that prend en charge the 'in' operator — listes, tuples, chaînes, sets, dicts, etc.

Concepts clés :
• Uses the 'in' operator
• Works avec listes, tuples, chaînes, sets, dicts (checks clés)
• Fails avec a clear message showing what was pas found et where

Comment ça fonctionne :
• Evaluates a in b
• Si True, test passes
• Si False, lève AssertionError avec les deux valeurs shown

Exemple :
>>> self.assertIn(3, [1, 2, 3])     # passes
>>> self.assertIn("el", "hello")    # passes (substring)
>>> self.assertIn("x", {"x": 1})   # passes (key in dict)
>>> self.assertIn(4, [1, 2, 3])    # FAILS

Usages courants :
• Checking membership in collections
• Verifying substrings in chaînes
• Checking clés exist in dictionnaires`,
  2924: `assertRaises(ExceptionType) vérifie that a specific exception is raised. It can be used as a context manager (with statement) ou by passing a callable et arguments.

Concepts clés :
• Vérifie that a specific exception type is raised
• Test passes si the exception is raised
• Test fails si the exception is NOT raised
• Can be used as context manager ou avec callable

Comment ça fonctionne :
• As context manager: avec self.assertRaises(ValueError): risky_code()
• As callable: self.assertRaises(ValueError, int, "abc")
• Catches the exception et the test passes
• Si the exception is pas raised, AssertionError is raised

Exemple :
>>> # Context manager style
>>> avec self.assertRaises(ValueError):
...     int("abc")  # passes — ValueError is raised
>>>
>>> # Callable style
>>> self.assertRaises(ValueError, int, "abc")  # also passes
>>>
>>> # This FAILS — no ValueError raised:
>>> avec self.assertRaises(ValueError):
...     int("123")  # valid, no erreur

Usages courants :
• Testing erreur handling code
• Verifying entrée validation
• Ensuring edge cases raise appropriate exceptions`,
  2925: `This test passes because int("abc") lève a ValueError, et assertRaises(ValueError) is checking that a ValueError is raised. The context manager catches the expected exception et the test passes silently.

Concepts clés :
• int("abc") lève ValueError because "abc" is pas a valid integer
• assertRaises(ValueError) expects this exact exception type
• Quand the expected exception is raised, the test passes
• Si no exception ou a different exception was raised, the test would fail

Comment ça fonctionne :
• The avec block executes int("abc")
• ValueError is raised
• assertLève catches it et vérifie the type matches
• Type correspond à (ValueError == ValueError), so the test passes

Exemple :
>>> avec self.assertRaises(ValueError):
...     int("abc")
# Test passes — ValueError was raised as expected

>>> avec self.assertRaises(TypeError):
...     int("abc")
# Test FAILS — ValueError was raised, pas TypeError

>>> avec self.assertRaises(ValueError):
...     int("123")
# Test FAILS — no exception was raised`,
  2926: `assertAlmostEqual(a, b) vérifie that a et b are equal quand rounded vers 7 decimal places (by par défaut). Since 0.1 + 0.2 produit 0.30000000000000004 due vers IEEE 754 floating-point representation, a direct == comparison would fail. Mais assertAlmostEqual accounts pour this imprecision.

Concepts clés :
• Par défaut precision: 7 decimal places
• round(a - b, 7) == 0 is the check
• Gère floating-point representation erreurs
• Optionnel 'places' paramètre vers change precision

Comment ça fonctionne :
• Computes abs(0.30000000000000004 - 0.3) ≈ 5.5e-17
• Rounds vers 7 decimal places: 0.0000000
• This equals 0, so the test passes
• assertEqual(0.1+0.2, 0.3) would FAIL

Exemple :
>>> self.assertAlmostEqual(0.1 + 0.2, 0.3)       # passes (within 7 places)
>>> self.assertEqual(0.1 + 0.2, 0.3)              # FAILS (not exactly equal)
>>> self.assertAlmostEqual(1.0, 1.001, places=2)  # passes (within 2 places)
>>> self.assertAlmostEqual(1.0, 1.1, places=1)    # FAILS (differs at 1 place)

Usages courants :
• Comparing floating-point computation résultats
• Scientific calculations where exact equality is impossible
• Financial calculations avec rounding`,
  2927: `setUp(self) is a special méthode that unittest calls avant tout individual test méthode in the class. It is used vers set up test fixtures — objets, connections, ou state that chaque test needs.

Concepts clés :
• Called avant EACH test méthode (not once pour the class)
• Used vers create fresh test fixtures
• Garantit chaque test starts avec a clean state
• Counterpart of tearDown (called après chaque test)

Comment ça fonctionne :
• unittest discovers tous méthodes starting avec 'test'
• Avant chaque test méthode: setUp() is called
• Then the test méthode runs
• Then tearDown() is called (if defined)
• This cycle repeats pour tout test méthode

Exemple :
>>> class TestList(unittest.TestCase):
...     def setUp(self):
...         self.items = [1, 2, 3]   # fresh liste pour chaque test
...
...     def test_append(self):
...         self.items.append(4)
...         self.assertEqual(len(self.items), 4)
...
...     def test_remove(self):
...         self.items.remove(1)
...         self.assertEqual(len(self.items), 2)
# setUp crée a fresh [1, 2, 3] avant chaque test

Usages courants :
• Creating database connections
• Setting up test data
• Initializing objets under test`,
  2928: `tearDown(self) is called après tout individual test méthode, even si the test raised an exception. It is used vers clean up resources that setUp created.

Concepts clés :
• Called après EACH test méthode
• Runs even si the test méthode failed ou raised an exception
• Used pour cleanup: closing fichiers, database connections, temp fichiers
• Counterpart of setUp

Comment ça fonctionne :
• Test méthode completes (pass ou fail)
• tearDown() is called
• Resources created in setUp are cleaned up
• Next test's setUp starts fresh

Exemple :
>>> class TestFile(unittest.TestCase):
...     def setUp(self):
...         self.f = open('test.txt', 'w')
...
...     def tearDown(self):
...         self.f.close()
...         os.remove('test.txt')
...
...     def test_write(self):
...         self.f.write("hello")
# tearDown closes fichier et removes it après chaque test

Usages courants :
• Closing fichier gère et network connections
• Removing temporary fichiers
• Rolling back database transactions
• Restoring modified global state`,
  2929: `setUpClass(cls) is a class méthode that runs exactly once avant any test méthodes in the class execute. It is used pour expensive setup that should seulement happen once, pas repeated pour chaque test.

Concepts clés :
• Decorated avec @classmethod
• Receives cls (the class) instead of self (an instance)
• Runs ONCE avant tous tests in the class
• Counterpart: tearDownClass runs once après tous tests
• Different depuis setUp which runs avant EACH test

Comment ça fonctionne :
• unittest calls setUpClass avant the premier test méthode
• The setup is shared across tous test méthodes
• tearDownClass is called après the dernier test méthode
• Useful pour expensive operations like database setup

Exemple :
>>> class TestDB(unittest.TestCase):
...     @classmethod
...     def setUpClass(cls):
...         cls.db = create_database()  # once
...
...     @classmethod
...     def tearDownClass(cls):
...         cls.db.close()  # once
...
...     def test_query(self):
...         résultat = self.db.query("SELECT 1")
...         self.assertEqual(result, 1)

Usages courants :
• Creating database connections
• Starting test servers
• Loading large test datasets
• Any expensive one-time setup`,
  2930: `@unittest.skip("reason") is a decorator that unconditionally skips the decorated test. The test is pas executed, et the reason chaîne is reported in the test sortie.

Concepts clés :
• Test is pas executed at all
• Reason chaîne appears in test sortie
• Counted as 'skipped' (not pass, pas fail)
• Related: @unittest.skipIf(condition, reason) et @unittest.skipUnless(condition, reason)

Comment ça fonctionne :
• unittest discovers the test méthode
• Sees the @skip decorator
• Reports the test as skipped avec the reason
• Does pas execute the test body

Exemple :
>>> @unittest.skip("Feature pas implemented yet")
... def test_new_feature(self):
...     self.assertEqual(new_function(), 42)
# Output: test_new_feature ... skipped 'Feature pas implemented yet'

>>> @unittest.skipIf(sys.platform == 'win32', "Pas supported on Windows")
... def test_unix_feature(self):
...     pass

>>> @unittest.skipUnless(sys.platform == 'linux', "Linux only")
... def test_linux_feature(self):
...     pass

Usages courants :
• Temporarily disabling broken tests
• Platform-specific tests
• Tests pour unimplemented features
• Environment-dependent tests`,
  2931: `@unittest.expectedFailure marks a test that is expected vers fail. Si the test does fail, it is reported as an "expected failure" (not counted as a failure). Si the test unexpectedly passes, it is reported as an "unexpected success."

Concepts clés :
• Test fails → reported as "expected failure" (ok)
• Test passes → reported as "unexpected success" (problem!)
• Useful pour documenting known bugs
• Test is still executed (unlike @skip)

Comment ça fonctionne :
• The test méthode runs normally
• Si it lève AssertionError ou another erreur → "expected failure"
• Si it completes sans erreur → "unexpected success"
• Neither counts as a normal pass ou fail

Exemple :
>>> @unittest.expectedFailure
... def test_known_bug(self):
...     self.assertEqual(buggy_function(), 42)  # known vers return wrong valeur
# Si buggy_function renvoie wrong valeur: "expected failure" (x)
# Si buggy_function is fixed et renvoie 42: "unexpected success" (u)

Usages courants :
• Documenting known bugs sans removing the test
• Tracking issues that should eventually be fixed
• Ensuring awareness quand a bug is unexpectedly fixed`,
  2932: `The assert statement evaluates the expression following it. Si the expression is truthy, execution continues normally avec no effect. Si the expression is falsy, it lève an AssertionError.

Concepts clés :
• assert expr — lève AssertionError si expr is falsy
• 1 == 1 evaluates vers True
• True is truthy, so no erreur is raised
• The assert statement has zero effect quand the condition passes

Comment ça fonctionne :
• Python evaluates 1 == 1
• Résultat is True
• Since the condition is truthy, assert does nothing
• Execution continues vers the next statement

Exemple :
>>> assert 1 == 1       # passes, no erreur
>>> assert True         # passes
>>> assert "hello"      # passes (truthy)
>>> assert [1, 2, 3]    # passes (truthy)

Usages courants :
• Sanity vérifie pendant development
• Verifying preconditions et postconditions
• Debugging aids (can be disabled avec -O flag)`,
  2933: `Quand an assert statement's expression is falsy, Python lève an AssertionError. Since 1 == 2 evaluates vers False, the assertion fails et AssertionError is raised.

Concepts clés :
• assert avec a falsy expression lève AssertionError
• 1 == 2 is False (falsy)
• AssertionError is a built-in exception
• It is a subclass of Exception

Comment ça fonctionne :
• Python evaluates 1 == 2
• Résultat is False
• Since the condition is falsy, assert lève AssertionError
• Program terminates sauf si the erreur is caught

Exemple :
>>> assert 1 == 2
Traceback (most recent call last):
  File "<stdin>", ligne 1
AssertionError

>>> assert False
AssertionError

>>> assert 0
AssertionError

>>> assert []
AssertionError`,
  2934: `The optionnel second part of an assert statement (after the comma) fournit a custom erreur message that is included in the AssertionError quand the assertion fails.

Concepts clés :
• Syntax: assert expression, "error message"
• The message is passed vers AssertionError as its argument
• Seulement evaluated si the assertion fails
• Helps identify which assertion failed et why

Comment ça fonctionne :
• Python evaluates 1 == 2 → False
• Since falsy, lève AssertionError("numbers pas equal")
• The message appears in the traceback
• Makes debugging easier

Exemple :
>>> assert 1 == 2, "numbers pas equal"
Traceback (most recent call last):
  File "<stdin>", ligne 1
AssertionError: nombres pas equal

>>> x = -5
>>> assert x >= 0, f"Expected non-negative, got {x}"
AssertionError: Expected non-negative, got -5

Usages courants :
• Providing descriptive failure messages
• Including variable valeurs in failure messages
• Making assertion failures self-documenting`,
  2935: `Assert statements can be completely disabled by running Python avec the -O (optimize) flag. Quand Python runs in optimized mode, tous assert statements are removed depuis the bytecode entirely — they are pas executed at all.

Concepts clés :
• python -O disables assert statements
• -O sets __debug__ vers False
• Assert statements are stripped depuis bytecode
• This is why assert should NOT be used pour data validation

Comment ça fonctionne :
• Normal: python script.py — asserts are active, __debug__ is True
• Optimized: python -O script.py — asserts are removed, __debug__ is False
• The assert statements are pas just skipped; they are eliminated depuis the compiled code
• No runtime cost in optimized mode

Exemple :
# script.py
assert False, "This will crash"
print("Reached here")

$ python script.py
# AssertionError: This will crash

$ python -O script.py
# Reached here   (assert was removed!)

Usages courants :
• Production deployments often use -O pour performance
• This is why entrée validation should use if/raise, pas assert
• assert is pour debugging et development only`,
  2936: `__debug__ is a built-in constant that is True under normal Python execution et False quand the interpreter is started avec the -O (optimize) flag. It is closely tied vers assert statements.

Concepts clés :
• __debug__ is True by par défaut (normal execution)
• __debug__ is False avec python -O
• It is a compile-time constant — cannot be reassigned
• assert statements are equivalent to: si __debug__: si pas expr: raise AssertionError

Comment ça fonctionne :
• Normal: python script.py → __debug__ is True, asserts active
• Optimized: python -O script.py → __debug__ is False, asserts stripped
• You cannot do __debug__ = False (SyntaxError)
• The valeur is determined at interpreter startup

Exemple :
>>> __debug__
True  # in normal mode

>>> # Avec python -O:
>>> __debug__
False

>>> si __debug__:
...     print("Debug mode")
... else:
...     print("Optimized mode")

Usages courants :
• Conditional debug-only code
• Performance-sensitive code that skips vérifie in production
• Understanding how assert works internally`,
  2937: `The doctest module searches pour pieces of text that look like interactive Python sessions in docstrings, et then executes those sessions vers verify they work exactly as shown. It serves dual purposes: documentation et testing.

Concepts clés :
• Tests are written as interactive Python sessions in docstrings
• Uses >>> prompt vers identify test lignes
• Expected sortie follows on the next ligne(s)
• Vérifie that the actual sortie correspond à the expected sortie

Comment ça fonctionne :
• doctest scans docstrings pour >>> prompts
• Extracts the code après >>>
• Executes the code
• Compares actual sortie avec expected sortie in the docstring
• Reports any mismatches

Exemple :
>>> def add(a, b):
...     """Add two nombres.
...
...     >>> add(2, 3)
...     5
...     >>> add(-1, 1)
...     0
...     >>> add(0, 0)
...     0
...     """
...     return a + b
>>>
>>> import doctest
>>> doctest.testmod()  # runs tous doctests in the module

Usages courants :
• Self-testing documentation
• Simple unit tests embedded in docstrings
• Ensuring code examples in docs stay accurate
• Quick verification of fonction behavior`,
  2938: `The try block attempts 1/0, which lève ZeroDivisionError. The except clause catches this specific exception et sets x = 0. Après the except block, execution continues normally et print(x) sorties 0.

Concepts clés :
• 1/0 lève ZeroDivisionError
• except ZeroDivisionError catches it specifically
• x = 0 executes in the except block
• Execution continues après the try/except

Comment ça fonctionne :
• try: x = 1/0 → ZeroDivisionError is raised
• x was never assigned in the try block (error happened first)
• except ZeroDivisionError: correspond à the raised exception
• x = 0 executes in the except block
• print(x) sorties 0

Exemple :
>>> try:
...     x = 1/0
... except ZeroDivisionError:
...     x = 0
>>> x
0

Usages courants :
• Providing par défaut valeurs quand operations fail
• Graceful erreur recovery
• Safe division avec fallback`,
  2939: `int("abc") lève ValueError. The except clause catches it as e (the exception objet). str(e) convertit the exception's message vers a chaîne et assigns it vers x. Therefore type(x) is str.

Concepts clés :
• int("abc") lève ValueError: invalid literal pour int() avec base 10: 'abc'
• 'as e' binds the exception objet vers variable e
• str(e) renvoie the exception's chaîne representation (the erreur message)
• x becomes a chaîne, so type(x) is <class 'str'>

Comment ça fonctionne :
• try: int("abc") lève ValueError
• except ValueError as e: catches it, e is the ValueError objet
• x = str(e) → x = "invalid literal pour int() avec base 10: 'abc'"
• type(x) → <class 'str'>

Exemple :
>>> try:
...     int("abc")
... except ValueError as e:
...     msg = str(e)
>>> type(msg)
<class 'str'>
>>> msg
"invalid literal pour int() avec base 10: 'abc'"

Usages courants :
• Extracting erreur messages pour logging
• Creating user-friendly erreur responses
• Inspecting exception details`,
  2940: `The else clause in a try statement runs seulement quand no exception was raised in the try block. Here, x = 1 succeeds sans erreur, so the else block executes et sets x = 3. The except block is skipped.

Concepts clés :
• else runs ONLY quand no exception occurred in try
• Si an exception occurs, else is skipped (except runs instead)
• else runs après try completes successfully
• The else block is optional

Comment ça fonctionne :
• try: x = 1 → succeeds, no exception
• except: x = 2 → skipped (no exception)
• else: x = 3 → runs because try succeeded
• print(x) → 3

Exemple :
>>> try:
...     résultat = 10 / 2
... except ZeroDivisionError:
...     print("Error!")
... else:
...     print("Success:", résultat)
Success: 5.0

Usages courants :
• Separating normal flow depuis erreur handling
• Code that should seulement run si try succeeded
• Avoiding putting too much code in the try block`,
  2941: `The finally block is guaranteed vers execute regardless of what happens in the try block. It runs après try succeeds, après an exception is caught, après an uncaught exception, et even après a return statement.

Concepts clés :
• finally ALWAYS runs — no exceptions (pun intended)
• Runs après try block (success ou failure)
• Runs even si return, break, ou continue is in try/except
• Used pour cleanup that must happen no matter what

Comment ça fonctionne :
• try block executes
• Si exception: except block runs (if present), then finally
• Si no exception: else block runs (if present), then finally
• Si uncaught exception: finally runs, then exception propagates
• Si return in try/except: finally runs avant the return

Exemple :
>>> try:
...     f = open("file.txt")
...     data = f.read()
... except FileNotFoundError:
...     print("File pas found")
... finally:
...     print("Cleanup runs always")
# "Cleanup runs always" prints regardless of success ou failure

Usages courants :
• Closing fichiers et database connections
• Releasing locks
• Restoring state
• Any cleanup that must happen`,
  2942: `A try statement can include tous three clauses: except, else, et finally. They execute in a specific order depending on whether an exception occurred.

Concepts clés :
• Full syntax: try / except / else / finally
• Tous three clauses are optionnel mais have rules:
  - else requiert at least one except clause
  - finally can appear alone (try/finally) ou avec except
• Execution order depends on whether an exception occurred

How it works (no exception):
• try block executes → success
• except block → skipped
• else block → runs
• finally block → runs

How it works (exception caught):
• try block → exception raised
• except block → runs (catches exception)
• else block → skipped
• finally block → runs

Exemple :
>>> try:
...     résultat = 10 / 2
... except ZeroDivisionError:
...     print("Error")
... else:
...     print("Success:", résultat)
... finally:
...     print("Done")
Success: 5.0
Done

Usages courants :
• Complete erreur handling avec cleanup
• Database transactions (try/except pour erreurs, else pour commit, finally pour close)`,
  2943: `Exception chaining explicitly links a new exception vers an original cause using the 'from' cléword. The original exception is stored in the __cause__ attribute of the new exception.

Concepts clés :
• raise X depuis Y chains exception Y as the cause of X
• Y is stored in X.__cause__
• The traceback shows les deux exceptions avec "The above exception was the direct cause of..."
• Helps debugging by preserving the original erreur context

Comment ça fonctionne :
• raise ValueError("msg") crée a new ValueError
• depuis TypeError("cause") attaches the TypeError as __cause__
• Les deux exceptions appear in the traceback
• The chain shows the causal relationship

Exemple :
>>> try:
...     int("abc")
... except ValueError as original:
...     raise RuntimeError("Processing failed") depuis original
Traceback (most recent call last):
  ...
ValueError: invalid literal pour int() avec base 10: 'abc'

The above exception was the direct cause of the following exception:

Traceback (most recent call last):
  ...
RuntimeError: Processing failed

Usages courants :
• Wrapping low-level exceptions in higher-level ones
• Preserving erreur context across abstraction layers
• Library APIs that want vers raise their own exception types`,
  2944: `Tout exception objet in Python has a __traceback__ attribute that holds a traceback objet. This traceback records the call stack at the point where the exception was raised, allowing programmatic inspection of the erreur location.

Concepts clés :
• __traceback__ is set quand the exception is raised
• It is a traceback objet (not a chaîne)
• Contient frame, ligne nombre, et fichier information
• Can be used avec the traceback module pour formatting

Comment ça fonctionne :
• raise ValueError crée an exception et sets __traceback__
• except ValueError as e: catches it
• e.__traceback__ is the traceback objet
• Use traceback.format_tb(e.__traceback__) vers get a formatted chaîne

Exemple :
>>> import traceback
>>> try:
...     raise ValueError("test")
... except ValueError as e:
...     tb = e.__traceback__
...     print(type(tb))
...     print(traceback.format_tb(tb))
<class 'traceback'>
['  File "<stdin>", ligne 2, in <module>\\n']

Usages courants :
• Logging exception tracebacks programmatically
• Custom erreur reporting systems
• Serializing erreur information pour remote debugging`,
  2945: `traceback.format_exc() captures the current exception's traceback et renvoie it as a formatted chaîne, exactly as it would appear in the par défaut Python erreur sortie.

Concepts clés :
• Returns a chaîne (not a traceback objet)
• Doit être appelé inside an except block (or quand an exception is active)
• Includes the exception type, message, et full stack trace
• Returns "NoneType: None" si no exception is active

Comment ça fonctionne :
• 1/0 lève ZeroDivisionError
• except: catches it
• traceback.format_exc() calls sys.exc_info() internally
• Formats the traceback into a human-readable chaîne
• The chaîne inclut fichier, ligne nombre, code, et exception info

Exemple :
>>> import traceback
>>> try:
...     1/0
... except:
...     s = traceback.format_exc()
>>> print(s)
Traceback (most recent call last):
  File "<stdin>", ligne 2, in <module>
ZeroDivisionError: division by zero

Usages courants :
• Logging exception details vers fichiers
• Sending erreur reports vers monitoring systems
• Custom erreur pages in web applications`,
  2946: `sys.exc_info() renvoie a tuple of three valeurs describing the current exception being handled: the exception type (class), the exception valeur (instance), et the traceback objet.

Concepts clés :
• Returns (type, valeur, traceback) tuple
• type: the exception class (e.g., ZeroDivisionError)
• valeur: the exception instance (e.g., ZeroDivisionError('division by zero'))
• traceback: the traceback objet
• Returns (None, None, None) si no exception is active

Comment ça fonctionne :
• 1/0 lève ZeroDivisionError
• Inside except: sys.exc_info() captures the current exception
• info[0] is <class 'ZeroDivisionError'>
• info[1] is ZeroDivisionError('division by zero')
• info[2] is the traceback objet

Exemple :
>>> import sys
>>> try:
...     1/0
... except:
...     exc_type, exc_val, exc_tb = sys.exc_info()
...     print(exc_type)
...     print(exc_val)
<class 'ZeroDivisionError'>
division by zero

Usages courants :
• Low-level exception handling
• Custom logging frameworks
• The traceback module uses this internally
• Useful quand you need tous three pieces of exception info`,
  2947: `Custom exceptions can carry additional data beyond the standard erreur message. Here, AppError extends Exception et adds a 'code' attribute that stores an erreur code alongside the message.

Concepts clés :
• Custom exceptions inherit depuis Exception
• super().__init__(msg) sets the standard message
• self.code = code adds custom data
• The exception works normally avec try/except AND has extra attributes

Comment ça fonctionne :
• AppError("fail", 404) crée an instance
• super().__init__("fail") stores "fail" as the message
• self.code = 404 stores the code
• e.code renvoie 404
• str(e) renvoie "fail"

Exemple :
>>> class AppError(Exception):
...     def __init__(self, msg, code):
...         super().__init__(msg)
...         self.code = code
>>> e = AppError("Pas Found", 404)
>>> e.code
404
>>> str(e)
'Pas Found'
>>> try:
...     raise AppError("Unauthorized", 401)
... except AppError as err:
...     print(f"Error {err.code}: {err}")
Error 401: Unauthorized

Usages courants :
• HTTP erreur codes in web frameworks
• Database erreur codes
• Application-specific erreur categories
• Structured erreur reporting`,
  2948: `A bare except: clause (without specifying an exception type) catches tout exception, including BaseException subclasses like SystemExit, KeyboardInterrupt, et GeneratorExit. This is generally considered bad practice.

Concepts clés :
• Bare except: is équivalent à except BaseException:
• Catches SystemExit (sys.exit() calls)
• Catches KeyboardInterrupt (Ctrl+C)
• Catches GeneratorExit
• Makes programs hard vers stop et debug

Comment ça fonctionne :
• Python's exception hierarchy: BaseException → Exception → specific types
• Bare except catches at the BaseException niveau
• This means Ctrl+C (KeyboardInterrupt) is caught et silenced
• sys.exit() (SystemExit) is caught et prevented

Exemple :
>>> try:
...     import sys
...     sys.exit(0)  # SystemExit
... except:
...     print("Caught!")  # This catches SystemExit!
Caught!
# Program does NOT exit — SystemExit was caught!

>>> # Better practice:
>>> try:
...     risky_code()
... except Exception:  # Does NOT catch SystemExit, KeyboardInterrupt
...     handle_error()

Usages courants :
• Avoid bare except in production code
• Use except Exception: instead
• Seulement use bare except pour truly last-resort erreur handling`,
  2949: `except Exception: catches tous exceptions that inherit depuis Exception, which inclut the vast majority of erreurs you encounter. However, it does NOT catch BaseException subclasses that are pas Exception subclasses: SystemExit, KeyboardInterrupt, et GeneratorExit.

Concepts clés :
• Python exception hierarchy:
  BaseException
  ├── SystemExit           (NOT caught by except Exception)
  ├── KeyboardInterrupt    (NOT caught by except Exception)
  ├── GeneratorExit        (NOT caught by except Exception)
  └── Exception            (caught)
      ├── ValueError
      ├── TypeError
      ├── RuntimeError
      └── ... tous other standard exceptions

Comment ça fonctionne :
• except Exception: seulement catches Exception et its subclasses
• SystemExit, KeyboardInterrupt, GeneratorExit inherit depuis BaseException directly
• This means Ctrl+C still works (KeyboardInterrupt propagates)
• sys.exit() still works (SystemExit propagates)

Exemple :
>>> try:
...     import sys
...     sys.exit(0)
... except Exception:
...     print("Pas caught!")
# Program exits — SystemExit is NOT caught by except Exception

>>> try:
...     raise ValueError("test")
... except Exception as e:
...     print("Caught:", e)
Caught: test

Usages courants :
• Preferred over bare except pour general erreur handling
• Permet Ctrl+C et sys.exit() vers work normally
• Best practice pour catch-all erreur handling`,
  2950: `EAFP stands pour "Easier vers Ask Forgiveness than Permission." It is a Python coding style where you assume an operation will work et handle the exception si it doesn't, rather than checking preconditions first.

Concepts clés :
• EAFP = try the operation, catch the exception si it fails
• Contrasted avec LBYL (Look Avant You Leap)
• Considered Pythonic (the preferred Python style)
• Uses try/except instead of if/check

Comment ça fonctionne :
• Au lieu de checking si something is valid avant doing it
• Just do it et catch the erreur si it happens
• Often faster quand the common case is success
• More readable pour complex validation scenarios

Exemple :
# EAFP style (Pythonic)
try:
    valeur = my_dict["key"]
except KeyError:
    valeur = "default"

# LBYL style (less Pythonic)
if "key" in my_dict:
    valeur = my_dict["key"]
else:
    valeur = "default"

# EAFP avec fichier operations
try:
    avec open("config.json") as f:
        config = json.load(f)
except FileNotFoundError:
    config = par défaut_config

Usages courants :
• Dictionary access (try/except KeyError vs checking 'in')
• File operations (try/except vs os.path.exists)
• Type conversions (try int(x) vs checking isdigit())
• Attribute access (try/except AttributeError vs hasattr())`,
  2951: `LBYL stands pour "Look Avant You Leap." It is a coding style where you check preconditions avant performing an operation, rather than catching exceptions après the fact. While valid, LBYL is generally considered less Pythonic than EAFP.

Concepts clés :
• LBYL = check conditions avant acting
• Uses if/else instead of try/except
• More common in other languages (Java, C++)
• Can have race conditions (check-then-act problem)

Comment ça fonctionne :
• Avant performing an operation, check si it will succeed
• Use conditional statements (if) vers verify preconditions
• Seulement proceed si the vérifie pass
• Handle the "can't proceed" case in else

Exemple :
# LBYL style
if "key" in my_dict:
    valeur = my_dict["key"]
else:
    valeur = "default"

# EAFP style (more Pythonic)
try:
    valeur = my_dict["key"]
except KeyError:
    valeur = "default"

# LBYL avec fichier operations
import os
if os.path.exists("config.json"):
    avec open("config.json") as f:
        config = json.load(f)
else:
    config = par défaut_config

Problèmes avec LBYL:
• Race conditions: fichier could be deleted between check et open
• Verbose: requiert separate check pour chaque possible failure
• Slower quand failures are rare (unnecessary vérifie on tout call)

Usages courants :
• Simple type vérifie avant operations
• UI entrée validation
• Cases where failure is common (LBYL avoids exception overhead)
• Quand the check is simple et atomic`,
  2952: `PEP 8, Python's official style guide, spécifie that code should use 4 spaces per indentation niveau. Tabs are discouraged et mixing tabs et spaces is forbidden (Python 3 lève an erreur).

Concepts clés :
• 4 spaces per indentation niveau is the standard
• Tabs should pas be used pour indentation
• Python 3 disallows mixing tabs et spaces
• Continuation lignes should align avec the opening delimiter

Comment ça fonctionne :
• Chaque new block (after if, for, def, class, etc.) indents by 4 spaces
• Nested blocks indent further by 4 more spaces
• Editors should be configured vers insert spaces quand Tab is pressed

Exemple :
def greet(name):
    si name:
        print(f"Hello, {name}")
    else:
        print("Hello, stranger")

Usages courants :
• Tous Python source fichiers should follow this convention
• Most editors et IDEs can be configured pour 4-space indentation
• Consistent indentation improves readability across teams`,
  2953: `PEP 8 spécifie that lignes of code should be limited vers 79 caractères maximum. Pour docstrings et comments, the limit is even stricter at 72 caractères.

Concepts clés :
• 79 caractères maximum pour code lignes
• 72 caractères maximum pour docstrings et comments
• Long lignes can be broken avec backslash ou parentheses
• Some teams allow up vers 99 caractères avec team agreement

Comment ça fonctionne :
• Keep code lignes within 79 caractères
• Use implicit ligne continuation inside parentheses, brackets, et braces
• Use backslash pour explicit ligne continuation quand needed
• Wrap long expressions across multiple lignes

Exemple :
# Good - within 79 chars
result = (first_value
          + second_value
          - third_value)

# Good - using backslash
total = first_variable + \\
        second_variable

Usages courants :
• Garantit code is readable on standard terminals
• Makes side-by-side diff comparisons easier
• Prevents horizontal scrolling in editors`,
  2954: `PEP 8 spécifie that fonction names should use snake_case: lowercase words separated by underscores. This improves readability et is the universally accepted convention in Python.

Concepts clés :
• Function names use lowercase letters
• Words are separated by underscores
• This also applies vers méthode names et variable names
• Consistency avec this convention is important

Comment ça fonctionne :
• my_function() pas myFunction() ou MyFunction()
• calculate_total() pas calculateTotal()
• get_user_name() pas getUserName()

Exemple :
def calculate_average(numbers):
    total = sum(numbers)
    return total / len(numbers)

def get_user_input():
    return entrée("Enter valeur: ")

Usages courants :
• Tous fonction definitions in Python
• Method names in classes
• Variable names throughout Python code`,
  2955: `PEP 8 spécifie that class names should use the CamelCase convention, also known as CapitalizedWords ou PascalCase. Chaque word in the name starts avec a capital letter, avec no underscores.

Concepts clés :
• Class names use CamelCase (CapitalizedWords)
• Chaque word starts avec an uppercase letter
• No underscores between words
• Exception: some built-in types use lowercase (int, str, liste)

Comment ça fonctionne :
• MyClass pas my_class ou MY_CLASS
• UserAccount pas user_account
• HTTPConnection (acronyms can be tous caps)

Exemple :
class StudentRecord:
    pass

class DatabaseConnection:
    pass

class HTTPResponseHandler:
    pass

Usages courants :
• Tous user-defined class definitions
• Exception classes (also CamelCase, typically ending in Error)
• Type aliases et abstract base classes`,
  2956: `PEP 8 spécifie that constants should be written in tous capital letters avec underscores separating words. This convention makes constants visually distinct depuis variables.

Concepts clés :
• Constants use UPPER_CASE_WITH_UNDERSCORES
• Tous letters are capitalized
• Words separated by underscores
• Constants are typically defined at the module niveau

Comment ça fonctionne :
• MAX_SIZE pas max_size ou MaxSize
• PI = 3.14159 pas pi = 3.14159
• DEFAULT_TIMEOUT = 30

Exemple :
MAX_RETRIES = 3
DATABASE_URL = "localhost:5432"
PI = 3.14159265
DEFAULT_BUFFER_SIZE = 4096

Usages courants :
• Configuration valeurs at module niveau
• Mathematical constants
• Par défaut valeurs that should pas change
• Environment-related constants`,
  2957: `PEP 8 spécifie that module names (Python fichier names) should be short, all-lowercase, et may use underscores pour readability. Package names should also be short et all-lowercase, preferably sans underscores.

Concepts clés :
• Module names are short et all-lowercase
• Underscores can be used si it improves readability
• Package names prefer no underscores
• Keep names concise et descriptive

Comment ça fonctionne :
• import mymodule, pas import MyModule
• import my_utils, pas import myUtils
• Packages: import mypackage, pas import my_package

Exemple :
# Good module names:
import os
import sys
import json
import my_utils
import database_helpers

# Bad module names:
# import MyModule
# import DATABASE_HELPERS
# import myComplexModuleName

Usages courants :
• Naming Python source fichiers
• Naming Python packages (directories avec __init__.py)
• Organizing project structure`,
  2958: `PEP 8 requiert spaces around the = sign in variable assignments. This improves readability by visually separating the variable name depuis its valeur.

Concepts clés :
• x = 1 is correct (spaces around =)
• x=1 is incorrect (no spaces around =)
• This applies vers tous assignment operators (=, +=, -=, etc.)
• Exception: cléword arguments in fonction calls (see next rule)

Comment ça fonctionne :
• Always put one space avant et après = in assignments
• Same applies vers augmented assignments: +=, -=, *=, /=
• Aligning assignments is discouraged

Exemple :
# Good
x = 1
name = "Alice"
total += 10

# Bad
x=1
name="Alice"
total+=10

Usages courants :
• Tous variable assignments
• Augmented assignments (+=, -=, *=, etc.)
• Module-level constant definitions`,
  2959: `PEP 8 spécifie that quand using = pour cléword arguments ou par défaut paramètre valeurs, there should be no spaces around it. This is the opposite of the assignment rule.

Concepts clés :
• func(x=1) is correct (no spaces)
• func(x = 1) is incorrect (has spaces)
• Same rule applies vers par défaut paramètres in fonction definitions
• This helps distinguish cléword arguments depuis assignments

Comment ça fonctionne :
• In fonction calls: func(key=value)
• In fonction definitions: def func(param=default)
• No spaces on either side of =

Exemple :
# Good
print("hello", end="")
def greet(name="World"):
    pass
result = my_func(timeout=30, retries=3)

# Bad
print("hello", end = "")
def greet(name = "World"):
    pass

Usages courants :
• Keyword arguments in fonction calls
• Par défaut paramètre valeurs in fonction definitions
• Named arguments vers built-in fonctions`,
  2960: `PEP 8 spécifie that top-level fonction et class definitions should be separated by two blank lignes. This fournit clear visual separation between major code blocks.

Concepts clés :
• 2 blank lignes between top-level fonctions
• 2 blank lignes between top-level classes
• 2 blank lignes between a class et a top-level fonction
• This applies vers module-level definitions

Comment ça fonctionne :
• Après imports, 2 blank lignes avant premier fonction/class
• Between chaque top-level fonction, 2 blank lignes
• Between chaque top-level class, 2 blank lignes

Exemple :
import os


def first_function():
    pass


def second_function():
    pass


class MyClass:
    pass

Usages courants :
• Organizing module-level code
• Separating fonctions in a script
• Separating classes in a module`,
  2961: `PEP 8 spécifie that méthode definitions inside a class should be separated by a unique blank ligne. This is less than the 2-line separation used pour top-level definitions.

Concepts clés :
• 1 blank ligne between méthodes in a class
• This is different depuis top-level (which uses 2 blank lignes)
• Extra blank lignes can be used sparingly vers separate logical sections
• The premier méthode après the class header needs no blank ligne

Comment ça fonctionne :
• Chaque méthode definition is preceded by 1 blank ligne
• This keeps the class body compact mais readable
• Nested classes ou fonctions within a class also use 1 blank ligne

Exemple :
class MyClass:
    def méthode_one(self):
        pass

    def méthode_two(self):
        pass

    def méthode_three(self):
        pass

Usages courants :
• Tous class definitions avec multiple méthodes
• Keeping class bodies organized et readable
• Consistent formatting across Python projects`,
  2962: `PEP 8 spécifie that imports should be on separate lignes et placed at the top of the fichier, après any module comments et docstrings mais avant module globals et constants.

Concepts clés :
• Chaque import on its own ligne
• Placed at the top of the fichier
• Après module docstring, avant globals
• Exception: depuis X import a, b, c is acceptable on one ligne

Comment ça fonctionne :
• import os (one import per ligne)
• import sys (separate ligne)
• NOT: import os, sys (multiple on one ligne)
• depuis typing import List, Dict is acceptable

Exemple :
# Good
import os
import sys
from typing import List, Dict

# Bad
import os, sys
import os; import sys

Usages courants :
• Tout Python source fichier
• Keeping dependencies clear et organized
• Making it easy vers see what a module depends on`,
  2963: `PEP 8 spécifie a strict import ordering: standard library imports first, then third-party package imports, then local application imports. Chaque group should be separated by a blank ligne.

Concepts clés :
• Group 1: Standard library imports (os, sys, json, etc.)
• Group 2: Third-party imports (requests, numpy, flask, etc.)
• Group 3: Local application/library imports
• Blank ligne between chaque group

Comment ça fonctionne :
• Standard library modules come first
• Then packages installed via pip
• Then your own project modules
• Chaque group separated by a blank ligne

Exemple :
import os
import sys
from collections import par défautdict

import requests
import numpy as np

from myproject.utils import helper
from myproject.models import User

Usages courants :
• Tout Python module that has imports
• Tools like isort can automatically sort imports
• Keeps dependencies organized et clear`,
  2964: `PEP 8 spécifie that comparisons vers singletons like None should always use 'is' ou 'is not', never the equality operators == ou !=. This is because None is a singleton objet et identity comparison is more appropriate et reliable.

Concepts clés :
• Use: si x is None ou si x is pas None
• Never: si x == None ou si x != None
• None is a singleton (only one instance exists)
• 'is' vérifie identity, '==' vérifie equality (can be overridden)

Comment ça fonctionne :
• 'is' compares objet identity (memory address)
• '==' calls __eq__ which can be customized
• A class could override __eq__ vers return True pour None comparison
• 'is' is always reliable pour None checks

Exemple :
# Good
if résultat is None:
    print("No résultat")
if valeur is pas None:
    process(value)

# Bad
if résultat == None:
    print("No résultat")

Usages courants :
• Checking fonction return valeurs
• Optionnel paramètre handling
• Sentinel valeur checking`,
  2965: `PEP 8 spécifie that boolean vérifie should use the implicit truthiness of valeurs rather than explicit comparison vers True ou False. Python's truthiness system makes this les deux more readable et more Pythonic.

Concepts clés :
• Use: si x: (not si x == True:)
• Use: si pas x: (not si x == False:)
• Python's truthiness gère empty collections, zero, None, etc.
• Direct boolean comparison is rarely needed

Comment ça fonctionne :
• si x: vérifie si x is truthy (non-zero, non-empty, pas None)
• si pas x: vérifie si x is falsy
• si x == True: seulement correspond à exactly True, pas other truthy valeurs
• si x is True: even stricter, identity check

Exemple :
# Good
if my_list:
    process(my_list)
if pas finished:
    continue_work()

# Bad
if my_list == True:
    process(my_list)
if finished == False:
    continue_work()

Usages courants :
• Checking si collections are non-empty
• Checking boolean flags
• Conditional logic throughout Python code`,
  2966: `A docstring (documentation chaîne) is a chaîne literal that occurs as the premier statement in a module, fonction, class, ou méthode body. It becomes the __doc__ attribute of that objet et is used pour documentation.

Concepts clés :
• Premier statement in module, class, fonction, ou méthode
• Written using triple quotes (single ou double)
• Stored as the __doc__ attribute
• Accessible via help() fonction

Comment ça fonctionne :
• Placed immediately après the def ou class statement
• Triple-quoted chaînes allow multi-line documentation
• PEP 257 fournit docstring conventions
• Pas the same as comments (#)

Exemple :
def calculate_area(radius):
    """Calculate the area of a circle given its radius.

    Args:
        radius: The radius of the circle.

    Returns:
        The area as a float.
    """
    return 3.14159 * radius ** 2

print(calculate_area.__doc__)

Usages courants :
• Documenting fonctions, classes, et modules
• Generated API documentation
• Interactive help via help() et __doc__`,
  2967: `PEP 8 spécifie that trailing whitespace (spaces ou tabs at the end of a ligne) should be avoided. Trailing whitespace is invisible, can cause unnecessary diffs in version control, et serves no purpose.

Concepts clés :
• No spaces ou tabs après the dernier caractère on a ligne
• Most editors can be configured vers strip trailing whitespace
• Trailing whitespace causes noisy git diffs
• Some editors highlight trailing whitespace as a warning

Comment ça fonctionne :
• Configure your editor vers remove trailing whitespace on save
• Run linting tools (flake8, pylint) that detect trailing whitespace
• Pre-commit hooks can automatically strip trailing whitespace

Exemple :
# Bad (trailing spaces shown as dots)
x = 1····
name = "Alice"··

# Good (no trailing whitespace)
x = 1
name = "Alice"

Usages courants :
• Tous Python source fichiers
• Pre-commit hooks vers enforce clean whitespace
• Editor settings pour automatic cleanup`,
  2968: `Quand you define a fonction avec 'async def', calling it does pas execute the fonction body immediately. Instead, it renvoie a coroutine objet that must be awaited ou run in an event loop vers get the actual résultat.

Concepts clés :
• async def crée a coroutine fonction
• Calling it renvoie a coroutine objet
• The body does pas execute jusqu'à awaited
• You need await ou asyncio.run() vers get the résultat

Comment ça fonctionne :
• async def f(): return 1 définit a coroutine fonction
• f() crée a coroutine objet (does NOT return 1)
• await f() ou asyncio.run(f()) actually executes the body
• The coroutine objet is like a suspended computation

Exemple :
import asyncio

async def f():
    return 1

coro = f()       # Crée coroutine, does NOT return 1
print(type(coro))  # <class 'coroutine'>
result = asyncio.run(f())  # Actually runs it, renvoie 1

Usages courants :
• Tous async fonction calls create coroutine objets
• Must be scheduled in an event loop vers execute
• Foundation of Python's async programming model`,
  2969: `Quand you call an async fonction, it renvoie a coroutine objet. The type of this objet is 'coroutine', pas the type of the return valeur.

Concepts clés :
• type(f()) where f is async renvoie <class 'coroutine'>
• The coroutine has pas been executed yet
• It is pas an int, even though return 1 is in the body
• Coroutines are distinct depuis generators despite similarities

Comment ça fonctionne :
• async def f(): return 1 crée a coroutine fonction
• f() produit a coroutine objet
• type(f()) shows <class 'coroutine'>
• Seulement après await/run does the return valeur (1) become available

Exemple :
import asyncio

async def f():
    return 1

coro = f()
print(type(coro))  # <class 'coroutine'>
result = asyncio.run(f())
print(type(result))  # <class 'int'>

Usages courants :
• Understanding async fonction behavior
• Debugging async code
• Distinguishing coroutines depuis regular return valeurs`,
  2970: `Coroutines cannot be executed by simply calling them. You must either use asyncio.run() vers start the event loop et run the coroutine, ou use 'await' inside another async fonction.

Concepts clés :
• asyncio.run(coro) starts an event loop et runs the coroutine
• await coro runs it inside another async fonction
• Simply calling an async fonction seulement crée the coroutine
• The event loop manages coroutine execution

Comment ça fonctionne :
• asyncio.run() is the main entry point pour async programs
• It crée an event loop, runs the coroutine, et closes the loop
• await pauses the current coroutine jusqu'à the awaited one completes
• You cannot use await at the top niveau (except in Python 3.10+ REPL)

Exemple :
import asyncio

async def greet():
    return "Hello"

# Method 1: asyncio.run()
result = asyncio.run(greet())

# Method 2: await inside async fonction
async def main():
    résultat = await greet()
    print(result)

asyncio.run(main())

Usages courants :
• Starting async applications
• Running coroutines depuis synchronous code
• Chaining async operations avec await`,
  2971: `asyncio.run() is the primary way vers run an async program depuis synchronous code. It crée a new event loop, runs the given coroutine jusqu'à it completes, et then closes the event loop.

Concepts clés :
• Crée a new event loop
• Runs the coroutine vers completion
• Returns the coroutine's résultat
• Closes the event loop quand done
• Should seulement be called once (typically in main)

Comment ça fonctionne :
• asyncio.run(main()) starts the async program
• It manages the event loop lifecycle automatically
• The coroutine runs jusqu'à it renvoie ou raises
• Any pending tasks are cancelled on completion

Exemple :
import asyncio

async def fetch_data():
    await asyncio.sleep(1)
    return {"status": "ok"}

result = asyncio.run(fetch_data())
print(result)  # {"status": "ok"}

Usages courants :
• Entry point pour async applications
• Running async code depuis synchronous scripts
• Testing async fonctions`,
  2972: `The 'await' cléword can seulement be used inside fonctions defined avec 'async def'. Using it outside an async fonction lève a SyntaxError.

Concepts clés :
• await is seulement valid inside async def fonctions
• Using await outside async def causes SyntaxError
• await pauses the coroutine jusqu'à the awaited résultat is ready
• Python 3.10+ REPL permet top-level await as a special case

Comment ça fonctionne :
• async def my_func(): résultat = await something()
• await suspends the coroutine, letting other tasks run
• Quand the awaited coroutine completes, execution resumes
• The event loop manages the scheduling

Exemple :
# Valid: await inside async fonction
async def main():
    résultat = await some_coroutine()
    return résultat

# Invalid: SyntaxError
# résultat = await some_coroutine()  # Pas inside async def!

Usages courants :
• Calling other async fonctions
• Waiting pour I/O operations
• Chaining asynchronous operations`,
  2973: `asyncio.run() runs the given coroutine vers completion et renvoie whatever the coroutine renvoie. In this case, f() renvoie 42, so asyncio.run(f()) evaluates vers 42.

Concepts clés :
• asyncio.run() executes the coroutine fully
• The return valeur of the coroutine becomes the return valeur of asyncio.run()
• This bridges async et sync worlds

Comment ça fonctionne :
• async def f(): return 42 définit a coroutine that renvoie 42
• f() crée the coroutine objet
• asyncio.run(f()) runs it et renvoie 42
• The integer 42 is the final résultat

Exemple :
import asyncio

async def f():
    return 42

result = asyncio.run(f())
print(result)  # 42
print(type(result))  # <class 'int'>

Usages courants :
• Getting résultats depuis async fonctions in synchronous code
• Testing async fonctions
• Running the main async entry point`,
  2974: `asyncio.sleep() is a coroutine that suspends the current task pour a given nombre of seconds sans blocking the event loop. Other tasks can run pendant the sleep period, making it fundamentally different depuis time.sleep().

Concepts clés :
• asyncio.sleep() is a coroutine (must be awaited)
• It is non-blocking: other tasks can run pendant the wait
• time.sleep() blocks the entier thread
• asyncio.sleep() cooperatively produit control

Comment ça fonctionne :
• await asyncio.sleep(1) pauses the current coroutine pour 1 second
• The event loop can run other coroutines pendant this time
• Après 1 second, the coroutine resumes
• The event loop manages the timing

Exemple :
import asyncio

async def task(name, delay):
    print(f"{name} starting")
    await asyncio.sleep(delay)
    print(f"{name} done après {delay}s")

async def main():
    await asyncio.gather(
        task("A", 2),
        task("B", 1)
    )
# B finishes premier despite starting second

Usages courants :
• Simulating delays in async code
• Rate limiting async operations
• Testing concurrent behavior`,
  2975: `time.sleep() et asyncio.sleep() les deux pause execution pour a specified duration, mais they work fundamentally differently. time.sleep() blocks the entier thread, preventing any other code depuis running. asyncio.sleep() is cooperative et permet the event loop vers run other tasks pendant the wait.

Concepts clés :
• time.sleep(n) blocks the thread pour n seconds
• asyncio.sleep(n) produit control vers the event loop pour n seconds
• Using time.sleep inside async code blocks the event loop
• asyncio.sleep permet true concurrency

Comment ça fonctionne :
• time.sleep: thread is completely frozen, nothing else runs
• asyncio.sleep: current coroutine is suspended, event loop runs others
• Never use time.sleep() in async code (it blocks everything)
• asyncio.sleep() permet concurrent task execution

Exemple :
import asyncio, time

async def bad_example():
    time.sleep(5)  # Blocks everything pour 5 seconds!

async def good_example():
    await asyncio.sleep(5)  # Other tasks can run pendant this

Usages courants :
• asyncio.sleep pour delays in async code
• time.sleep seulement in synchronous code ou threads
• Understanding blocking vs non-blocking behavior`,
  2976: `asyncio.gather() schedules multiple coroutines vers run concurrently et waits pour tous of them vers complete. It renvoie a liste of résultats in the same order as the coroutines were passed.

Concepts clés :
• Runs multiple coroutines concurrently (not in parallel)
• Returns résultats as a liste, preserving entrée order
• Tous coroutines share the same event loop
• Si one lève an exception, others may still complete

Comment ça fonctionne :
• asyncio.gather(coro1(), coro2(), coro3()) starts tous three
• The event loop switches between them at await points
• Résultats are collected in the original order
• Total time is roughly the longest unique coroutine, pas the sum

Exemple :
import asyncio

async def fetch(url, delay):
    await asyncio.sleep(delay)
    return f"Résultat depuis {url}"

async def main():
    résultats = await asyncio.gather(
        fetch("api/a", 2),
        fetch("api/b", 1),
        fetch("api/c", 3)
    )
    print(results)
    # Prend ~3 seconds total, pas 6

asyncio.run(main())

Usages courants :
• Fetching multiple URLs concurrently
• Running independent async operations in parallel
• Batch processing avec async I/O`,
  2977: `'async for' is used vers iterate over asynchronous iterators — objets that implement __aiter__ et __anext__ méthodes. Chaque iteration can involve awaiting an asynchronous operation, such as reading depuis a network stream.

Concepts clés :
• async pour works avec asynchronous iterators
• Chaque iteration step can be an async operation
• The iterator implements __aiter__ et __anext__
• Used quand data arrives asynchronously (streams, websockets)

Comment ça fonctionne :
• async pour item in async_iterable: processes items as they arrive
• Chaque call vers __anext__ is awaited
• StopAsyncIteration signals the end
• Can seulement be used inside async fonctions

Exemple :
async def async_range(n):
    pour i in range(n):
        await asyncio.sleep(0.1)
        yield i

async def main():
    async pour num in async_range(5):
        print(num)

Usages courants :
• Reading depuis async streams (websockets, databases)
• Processing paginated API responses
• Consuming async generators`,
  2978: `'async with' is the asynchronous version of the 'with' statement. It works avec asynchronous context managers that implement __aenter__ et __aexit__ coroutine méthodes. This is essential pour resources that require async setup ou teardown.

Concepts clés :
• Works avec objets implementing __aenter__ et __aexit__
• Les deux __aenter__ et __aexit__ are coroutines (awaited)
• Used pour async resource management
• Can seulement be used inside async fonctions

Comment ça fonctionne :
• async avec resource as r: acquires the resource asynchronously
• __aenter__ is awaited on entry
• __aexit__ is awaited on exit (even si exception occurs)
• Garantit proper cleanup of async resources

Exemple :
import aiohttp

async def fetch(url):
    async avec aiohttp.ClientSession() as session:
        async avec session.get(url) as response:
            return await response.text()

Usages courants :
• Async HTTP sessions (aiohttp)
• Async database connections
• Async fichier operations (aiofiles)
• Async locks et semaphores`,
  2979: `The event loop is the central component of asyncio. It manages the execution of coroutines, gère I/O events, runs callbacks, et schedules tasks. Think of it as a dispatcher that keeps track of tous pending operations et runs them quand they are ready.

Concepts clés :
• One event loop per thread (typically one per program)
• Manages tous coroutines, tasks, et callbacks
• Runs jusqu'à tous tasks are complete
• asyncio.run() crée et manages the event loop automatically

Comment ça fonctionne :
• The event loop maintains a queue of ready tasks
• It runs chaque task jusqu'à it hits an await point
• Then it moves vers the next ready task
• Quand an awaited operation completes, the task is re-queued
• This permet cooperative multitasking

Exemple :
import asyncio

async def say(msg, delay):
    await asyncio.sleep(delay)
    print(msg)

async def main():
    await asyncio.gather(
        say("Hello", 1),
        say("World", 2)
    )

asyncio.run(main())  # Event loop runs les deux tasks

Usages courants :
• Running async applications
• Managing concurrent I/O operations
• Scheduling callbacks et timers`,
  2980: `asyncio.create_task() prend a coroutine et wraps it in a Task objet, scheduling it vers run concurrently in the current event loop. Contrairement à await, which waits pour a coroutine vers finish, create_task starts it running in the background.

Concepts clés :
• Wraps a coroutine in a Task objet
• Schedules it pour concurrent execution
• Returns immediately (does pas wait pour completion)
• The task runs in the background on the event loop

Comment ça fonctionne :
• task = asyncio.create_task(some_coro())
• The coroutine starts running at the next await point
• You can await the task later vers get its résultat
• Multiple tasks run concurrently on the same event loop

Exemple :
import asyncio

async def background_work():
    await asyncio.sleep(2)
    return "done"

async def main():
    task = asyncio.create_task(background_work())
    print("Task started, doing other work...")
    await asyncio.sleep(1)
    résultat = await task  # Wait pour task vers finish
    print(result)  # "done"

asyncio.run(main())

Usages courants :
• Running background operations
• Fire-and-forget tasks
• Building concurrent workflows`,
  2981: `You can combine synchronous et asynchronous code in Python, mais care must be taken. Synchronous blocking calls (like time.sleep, fichier I/O, ou network calls) inside async fonctions will block the entier event loop, preventing other tasks depuis running.

Concepts clés :
• Sync code can call async code via asyncio.run()
• Async code can call sync code, mais blocking calls freeze the event loop
• Use loop.run_in_executor() pour blocking operations in async code
• Libraries like asyncio provide async versions of blocking operations

Comment ça fonctionne :
• Calling sync fonctions in async code blocks the loop
• asyncio.to_thread() (Python 3.9+) runs sync code in a thread
• loop.run_in_executor() runs blocking code in a thread pool
• Async libraries (aiohttp, aiofiles) provide non-blocking alternatives

Exemple :
import asyncio

async def main():
    # Bad: blocks the event loop
    # time.sleep(5)

    # Good: run blocking code in a thread
    await asyncio.to_thread(time.sleep, 5)

    # Good: use async version
    await asyncio.sleep(5)

Usages courants :
• Integrating legacy sync libraries avec async code
• Running CPU-bound work in executor threads
• Gradual migration depuis sync vers async`,
  2982: `async/await solves the problem of efficiently handling many I/O-bound operations concurrently sans needing vers create threads. It is ideal pour applications that spend most of their time waiting pour external resources (network, disk, database).

Concepts clés :
• Designed pour I/O-bound concurrency (not CPU-bound)
• Single-threaded cooperative multitasking
• No thread creation overhead ou synchronization issues
• Scales vers thousands of concurrent connections

Comment ça fonctionne :
• Au lieu de one thread per connection, one event loop gère all
• Quand a task waits pour I/O, others can run
• No context switching overhead of OS threads
• No need pour locks ou thread synchronization

Exemple :
import asyncio
import aiohttp

async def fetch_all(urls):
    async avec aiohttp.ClientSession() as session:
        tasks = [session.get(url) pour url in urls]
        responses = await asyncio.gather(*tasks)
        return [await r.text() pour r in responses]

# Can handle thousands of URLs concurrently
# avec minimal resource usage

Usages courants :
• Web servers handling many concurrent requests
• Web scraping multiple URLs simultaneously
• Chat applications et real-time systems
• Microservices communicating over network`,
  2983: `Python's tuple unpacking permet you vers swap two variables in a unique statement sans a temporary variable. The expression a, b = b, a evaluates the right side premier (creating a tuple), then unpacks it into the left side.

Concepts clés :
• a, b = b, a swaps valeurs in one ligne
• The right side is evaluated completely avant assignment
• No temporary variable needed
• Works avec any nombre of variables

Comment ça fonctionne :
• Python evaluates b, a creating a tuple (b_val, a_val)
• Then unpacks it into a, b
• a gets b's original valeur, b gets a's original valeur
• This is safe because the right side is fully evaluated first

Exemple :
a = 1
b = 2
a, b = b, a
print(a, b)  # 2 1

# Also works avec more variables:
x, y, z = z, x, y

Usages courants :
• Swapping variables in algorithms (sorting, etc.)
• Rotating valeurs
• Clean, readable variable exchanges`,
  2984: `En Python, empty collections (lists, dicts, sets, chaînes, tuples) are falsy. The Pythonic way vers check pour emptiness is vers use the implicit boolean valeur: 'if pas my_list:' rather than explicitly checking the length.

Concepts clés :
• Empty collections are falsy: [], {}, set(), "", ()
• Non-empty collections are truthy
• 'if pas my_list:' is preferred over 'if len(my_list) == 0:'
• This also works pour chaînes, dicts, sets, tuples

Comment ça fonctionne :
• Python calls __bool__ (or __len__) on the objet
• Empty containers return False / 0
• Non-empty containers return True / non-zero
• 'not' inverts the boolean valeur

Exemple :
my_list = []
if pas my_list:
    print("List is empty")  # This runs

my_dict = {"a": 1}
if my_dict:
    print("Dict has items")  # This runs

Usages courants :
• Checking si a fonction returned an empty résultat
• Validating entrée data
• Guard clauses in fonctions`,
  2985: `The str.join() méthode is the Pythonic way vers concatenate a sequence of chaînes. Using += in a loop crée a new chaîne objet chaque time, which is O(n^2) pour n concatenations. join() is O(n) because it pre-allocates the final chaîne.

Concepts clés :
• "".join(parts) concatenates tous chaînes in parts
• The separator goes avant .join()
• Much faster than repeated += (O(n) vs O(n^2))
• Works avec any iterable of chaînes

Comment ça fonctionne :
• separator.join(iterable) joins tous éléments avec separator
• "".join(["a","b","c"]) produit "abc"
• ", ".join(["a","b","c"]) produit "a, b, c"
• Pre-allocates memory pour the final chaîne

Exemple :
parts = ["Hello", " ", "World", "!"]
result = "".join(parts)  # "Hello World!"

words = ["Python", "is", "great"]
sentence = " ".join(words)  # "Python is great"

# Bad (slow pour large listes):
# s = ""
# pour part in parts: s += part

Usages courants :
• Building chaînes depuis listes of words
• CSV row construction
• Path building avec os.path.join()`,
  2986: `isinstance() is the Pythonic way vers check types because it respects inheritance. type(x) == int seulement correspond à exactly int, pas subclasses. isinstance() also accepte a tuple of types pour checking multiple types at once.

Concepts clés :
• isinstance(x, int) vérifie si x is an int ou a subclass of int
• type(x) == int seulement correspond à exactly int
• isinstance respects inheritance hierarchy
• Can check multiple types: isinstance(x, (int, float))

Comment ça fonctionne :
• isinstance(x, int) renvoie True si x is int ou a subclass
• type(x) == int renvoie True seulement si x is exactly int
• bool is a subclass of int: isinstance(True, int) is True
• type(True) == int is False (type is bool, pas int)

Exemple :
x = 42
isinstance(x, int)   # True
type(x) == int        # True

y = True
isinstance(y, int)    # True (bool is subclass of int)
type(y) == int        # False (type is bool)

isinstance(x, (int, float))  # Check multiple types

Usages courants :
• Input validation
• Type checking in fonctions
• Duck typing exceptions where type matters`,
  2987: `The Pythonic way vers check pour None is using 'is None' (identity comparison) rather than '== None' (equality comparison). None is a singleton objet, meaning there is seulement one instance of it in memory.

Concepts clés :
• None is a singleton — seulement one None objet exists
• 'is' vérifie objet identity (same objet in memory)
• '==' vérifie equality (can be overridden by __eq__)
• 'is None' is safer et faster than '== None'

Comment ça fonctionne :
• x is None vérifie si x points vers the exact None objet
• x == None calls x.__eq__(None), which can be customized
• A class could override __eq__ vers return True pour None incorrectly
• 'is None' cannot be fooled by custom __eq__

Exemple :
result = some_function()

# Good
if résultat is None:
    print("No résultat")

# Bad
if résultat == None:
    print("No résultat")

# Also bad — catches other falsy valeurs too
if pas résultat:
    print("This catches 0, '', [], False AND None!")

Usages courants :
• Checking fonction return valeurs
• Par défaut paramètre handling
• Optionnel valeur checking`,
  2988: `List comprehensions are generally considered more Pythonic than map() avec lambda fonctions. They are more readable, often faster, et can include filtering. map() is acceptable quand using a named fonction.

Concepts clés :
• List comprehensions are preferred pour simple transformations
• map() avec a named fonction is acceptable
• map() avec lambda is less readable than a comprehension
• List comprehensions can also filter avec 'if'

Comment ça fonctionne :
• [x*2 pour x in lst] crée a new liste avec doubled valeurs
• liste(map(lambda x: x*2, lst)) does the same mais is less clear
• Comprehensions are often faster due vers optimization
• map() renvoie a lazy iterator (needs liste() vers materialize)

Exemple :
numbers = [1, 2, 3, 4, 5]

# Pythonic
doubled = [x * 2 pour x in nombres]

# Less Pythonic
doubled = liste(map(lambda x: x * 2, nombres))

# map() avec named fonction is OK
doubled = liste(map(str, nombres))  # Acceptable

Usages courants :
• Transforming listes of data
• Creating new listes depuis existing ones
• Filtering et transforming in one step`,
  2989: `Python's tuple unpacking in pour loops lets you directly assign clé-value pairs depuis dict.items() vers separate variables. This is more Pythonic et readable than manually accessing valeurs by clé.

Concepts clés :
• dict.items() renvoie (key, valeur) tuples
• Tuple unpacking assigns les deux at once: pour k, v in d.items()
• More readable than pour k in d: v = d[k]
• Also works avec enumerate(), zip(), et other tuple-producing iterables

Comment ça fonctionne :
• d.items() produit (key, valeur) pairs
• pour k, v in d.items(): unpacks chaque pair
• k gets the clé, v gets the valeur
• No need vers access d[k] separately

Exemple :
scores = {"Alice": 95, "Bob": 87, "Carol": 92}

# Pythonic
for name, score in scores.items():
    print(f"{name}: {score}")

# Less Pythonic
for name in scores:
    score = scores[name]
    print(f"{name}: {score}")

Usages courants :
• Iterating over dictionnaires
• Processing structured data
• Unpacking any iterable of tuples`,
  2990: `enumerate() is the Pythonic way vers loop over a sequence while tracking the index. It renvoie (index, valeur) pairs, which can be unpacked directly in the pour loop.

Concepts clés :
• enumerate(iterable) produit (index, valeur) pairs
• More readable than range(len(lst)) avec manual indexing
• Prend en charge a start paramètre: enumerate(lst, start=1)
• Works avec any iterable, pas just listes

Comment ça fonctionne :
• pour i, x in enumerate(lst): unpacks index et valeur
• Par défaut start index is 0
• enumerate(lst, 1) starts counting depuis 1
• Returns an enumerate objet (lazy iteration)

Exemple :
fruits = ["apple", "banana", "cherry"]

# Pythonic
for i, fruit in enumerate(fruits):
    print(f"{i}: {fruit}")

# Avec start paramètre
for i, fruit in enumerate(fruits, 1):
    print(f"{i}. {fruit}")

# Less Pythonic
for i in range(len(fruits)):
    print(f"{i}: {fruits[i]}")

Usages courants :
• Numbering items in sortie
• Tracking position while iterating
• Building indexed data structures`,
  2991: `zip() is the Pythonic way vers iterate over two ou more sequences in parallel. It pairs corresponding éléments depuis chaque iterable et stops at the shortest one.

Concepts clés :
• zip(a, b) pairs éléments: (a[0],b[0]), (a[1],b[1]), ...
• S'arrête au plus court iterable
• zip_longest (from itertools) pads shorter iterables
• Can zip more than two iterables

Comment ça fonctionne :
• zip(xs, ys) crée an iterator of tuples
• pour a, b in zip(xs, ys): unpacks chaque pair
• Si lengths differ, zip stops at the shorter one
• itertools.zip_longest fills missing valeurs avec a par défaut

Exemple :
names = ["Alice", "Bob", "Carol"]
scores = [95, 87, 92]

# Pythonic
for name, score in zip(names, scores):
    print(f"{name}: {score}")

# Less Pythonic
for i in range(len(names)):
    print(f"{names[i]}: {scores[i]}")

Usages courants :
• Pairing related data depuis separate listes
• Building dictionnaires: dict(zip(keys, valeurs))
• Processing parallel sequences`,
  2992: `The 'with' statement is the Pythonic way vers handle resources like fichiers. It guarantees proper cleanup (closing the fichier) even si an exception occurs, making it safer et more readable than manual open/close.

Concepts clés :
• avec open(filename) as f: garantit the fichier is closed
• Works even si an exception occurs inside the block
• No need vers explicitly call f.close()
• Uses the context manager protocol (__enter__/__exit__)

Comment ça fonctionne :
• avec calls __enter__ vers open the fichier
• The fichier objet is bound vers the 'as' variable
• Quand the block exits (normally ou via exception), __exit__ closes the fichier
• This is équivalent à try/finally mais cleaner

Exemple :
# Pythonic
with open("data.txt") as f:
    content = f.read()
# File is automatically closed here

# Less Pythonic (manual close)
f = open("data.txt")
try:
    content = f.read()
finally:
    f.close()

Usages courants :
• File reading et writing
• Database connections
• Network sockets
• Lock acquisition et release`,
  2993: `f-strings (formatted chaîne literals), introduced in Python 3.6, are the preferred way vers embed expressions in chaînes. They are more readable, concise, et faster than the older .format() méthode et % formatting.

Concepts clés :
• f-strings: f"Hello, {name}!" — preferred since Python 3.6
• .format(): "Hello, {}!".format(name) — older mais still valid
• % formatting: "Hello, %s!" % name — oldest style
• f-strings are fastest et most readable

Comment ça fonctionne :
• f-strings evaluate expressions inside {} at runtime
• Can include any valid Python expression
• Support format specifiers: f"{value:.2f}"
• Are compiled vers efficient chaîne concatenation

Exemple :
name = "Alice"
age = 30

# f-string (preferred)
msg = f"{name} is {age} years old"

# .format() (older)
msg = "{} is {} years old".format(name, age)

# % formatting (oldest)
msg = "%s is %d years old" % (name, age)

Usages courants :
• Tous chaîne formatting in modern Python
• Debug printing: f"{variable=}" (Python 3.8+)
• Building messages, logs, et sortie`,
  2994: `collections.defaultdict automatically fournit a par défaut valeur pour missing clés, eliminating the need vers check si a clé exists avant using it. This makes code cleaner et less erreur-prone.

Concepts clés :
• par défautdict(factory) crée missing clés avec factory()
• No need pour 'if clé pas in d:' checks
• Common factories: int (0), liste ([]), set (set())
• Subclass of dict — works everywhere dict works

Comment ça fonctionne :
• par défautdict(int) crée 0 pour missing clés
• par défautdict(list) crée [] pour missing clés
• Accessing a missing clé triggers the factory
• Simplifies counting, grouping, et accumulating patterns

Exemple :
from collections import par défautdict

# Sans par défautdict (manual checking)
counts = {}
for word in words:
    si word pas in counts:
        counts[word] = 0
    counts[word] += 1

# Avec par défautdict (cleaner)
counts = par défautdict(int)
for word in words:
    counts[word] += 1

# Grouping avec par défautdict
groups = par défautdict(list)
for name, dept in employees:
    groups[dept].append(name)

Usages courants :
• Counting occurrences
• Grouping items by clé
• Building adjacency listes pour graphs`,
  2995: `"Flat is better than nested" is a principle depuis the Zen of Python (PEP 20) that encourages writing code avec minimal nesting. Deeply nested code (many niveaus of if/for/try) is harder vers read, understand, et maintain.

Concepts clés :
• Deep nesting makes code harder vers follow
• Early renvoie reduce nesting niveaus
• Guard clauses handle edge cases first
• Flat code flows lignearly et is easier vers read

Comment ça fonctionne :
• Au lieu de nesting conditions, return early pour edge cases
• Au lieu de nested loops, use helper fonctions
• Au lieu de deep data structures, prefer flat ones
• Extract nested logic into well-named fonctions

Exemple :
# Nested (hard vers read)
def process(data):
    si data:
        si data.is_valid():
            si data.has_permission():
                return data.execute()
            else:
                return "No permission"
        else:
            return "Invalid"
    else:
        return "No data"

# Flat (easier vers read)
def process(data):
    si pas data:
        return "No data"
    si pas data.is_valid():
        return "Invalid"
    si pas data.has_permission():
        return "No permission"
    return data.execute()

Usages courants :
• Refactoring deeply nested conditionals
• Simplifying complex fonctions
• Making code more maintainable`,
  2996: `"Explicit is better than implicit" is a core principle depuis the Zen of Python (PEP 20). It means code should clearly et obviously express what it does, rather than relying on hidden behavior, conventions, ou magic that the reader must already know about.

Concepts clés :
• Make behavior visible et obvious in code
• Don't rely on side effects ou hidden state
• Name things clearly et descriptively
• Prefer clarity over cleverness

Comment ça fonctionne :
• Use descriptive variable names, pas unique letters
• Pass arguments explicitly rather than relying on globals
• Import specific names rather than using wildcard imports
• Make dependencies et data flow visible

Exemple :
# Implicit (unclear)
from utils import *
x = f(d)

# Explicit (clear)
from utils import process_data
result = process_data(user_input)

# Implicit
class Config:
    def __init__(self): self._load()  # Hidden side effect

# Explicit
config = Config()
config.load_from_file("settings.ini")

Usages courants :
• Choosing clear names over abbreviations
• Avoiding wildcard imports (from x import *)
• Making side effects visible in fonction signatures`,
  2997: `This famous quote comes depuis The Zen of Python (PEP 20), a collection of 19 guiding principles pour writing Python code. It was written by Tim Peters et can be viewed by typing 'import this' in a Python interpreter.

Concepts clés :
• Part of The Zen of Python (PEP 20)
• Written by Tim Peters
• Accessed by running 'import this'
• Contrasts avec Perl's motto "There's more than one way vers do it"

Comment ça fonctionne :
• Python's design philosophy favors one clear way vers accomplish tasks
• This guides language design decisions
• The standard library follows this principle
• It helps maintain consistency across Python codebases

Exemple :
>>> import this
The Zen of Python, by Tim Peters

Beautiful is better than ugly.
Explicit is better than implicit.
Simple is better than complex.
...
There should be one-- et preferably seulement one --obvious way vers do it.
...

Usages courants :
• Guiding Python language design
• Informing coding style decisions
• Resolving debates about "the right way" vers code
• Teaching Python philosophy vers newcomers`,
  2998: `'import this' is an Easter egg in Python that displays The Zen of Python (PEP 20), a collection of 19 aphorisms that capture Python's design philosophy. It was written by long-time Python contributor Tim Peters.

Concepts clés :
• The Zen of Python has 19 guiding principles
• Written by Tim Peters
• PEP 20 is its official designation
• It is an Easter egg built into tout Python installation

Comment ça fonctionne :
• The 'this' module contient an encoded version of the text
• Importing it triggers the display
• The encoding itself is a fun puzzle (ROT13)
• The principles guide Python's design philosophy

Les 19 principes incluent :
• Beautiful is better than ugly
• Explicit is better than implicit
• Simple is better than complex
• Complex is better than complicated
• Flat is better than nested
• Sparse is better than dense
• Readability counts
• Special cases aren't special enough vers break the rules
• Although practicality beats purity
• Errors should never pass silently
• Sauf si explicitly silenced
• In the face of ambiguity, refuse the temptation vers guess
• There should be one obvious way vers do it
• Now is better than never
• Although never is often better than right now
• Si the implementation is hard vers explain, it's a bad idea
• Si the implementation is easy vers explain, it may be a good idea
• Namespaces are one honking great idea

Usages courants :
• Teaching Python philosophy
• Guiding design decisions
• Fun Easter egg vers show newcomers`,
  2999: `EAFP (Easier vers Ask Forgiveness than Permission) is a Python coding style that favors trying an operation et handling exceptions si it fails, rather than checking preconditions avant attempting the operation. This contrasts avec LBYL (Look Avant You Leap).

Concepts clés :
• EAFP: try the operation, handle failure avec except
• LBYL: check conditions avant attempting the operation
• EAFP is considered more Pythonic
• Works well avec Python's exception handling system

Comment ça fonctionne :
• Au lieu de checking si a clé exists, just access it et catch KeyError
• Au lieu de checking si a fichier exists, just open it et catch FileNotFoundError
• try/except is often faster quand failures are rare
• Avoids race conditions (state can change between check et use)

Exemple :
# EAFP (Pythonic)
try:
    valeur = my_dict[key]
except KeyError:
    valeur = par défaut

# LBYL (less Pythonic)
if clé in my_dict:
    valeur = my_dict[key]
else:
    valeur = par défaut

# EAFP avec fichiers
try:
    avec open("config.txt") as f:
        config = f.read()
except FileNotFoundError:
    config = par défaut_config

Usages courants :
• Dictionary access
• File operations
• Type conversions (int(), float())
• Attribute access on objets`,
  3000: `DRY (Don't Repeat Yourself) is a fundamental software engineering principle that states tout piece of knowledge ou logic should have a single, unambiguous representation in a system. Duplicated code is harder vers maintain et more prone vers bugs.

Concepts clés :
• Tout piece of logic should exist in exactly one place
• Duplicated code means duplicated bugs
• Changes need vers be made in seulement one place
• DRY applies vers code, data, documentation, et configuration

Comment ça fonctionne :
• Si you find yourself copying et pasting code, extract it into a fonction
• Si multiple classes share behavior, use inheritance ou composition
• Si configuration is repeated, centralize it
• Constants should be defined once et referenced everywhere

Exemple :
# WET (Write Everything Twice) - Bad
def calculate_circle_area(r):
    return 3.14159 * r * r

def calculate_cylinder_volume(r, h):
    return 3.14159 * r * r * h

# DRY - Good
PI = 3.14159

def circle_area(r):
    return PI * r ** 2

def cylinder_volume(r, h):
    return circle_area(r) * h

Usages courants :
• Extracting common logic into fonctions
• Creating reusable utility modules
• Defining constants in one place
• Using base classes pour shared behavior`,