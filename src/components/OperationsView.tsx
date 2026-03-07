import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useSound } from '../contexts/SoundContext';
import { formatTranslation } from '../translations';
import { useTranslatedOperations, OperationItem } from '../hooks/useTranslatedData';

const OPERATIONS_DATA: OperationItem[] = [
  // Arithmetic Operations
  {
    title: "Arithmetic Operations",
    category: "Operations",
    definition: "Basic mathematical operations for performing calculations with numbers.",
    examples: [
      "+ Addition: 5 + 3 = 8",
      "- Subtraction: 10 - 4 = 6",
      "* Multiplication: 3 * 4 = 12",
      "/ Division: 15 / 3 = 5.0 (always returns float)",
      "// Floor Division: 15 // 4 = 3 (rounds down)",
      "% Modulo: 15 % 4 = 3 (remainder)",
      "** Exponentiation: 2 ** 3 = 8"
    ],
    beginnerSteps: [
      "Step 1: Addition (+) adds two numbers. Type 5 + 3 in Python and you get 8.",
      "Step 2: Subtraction (-) takes the second number from the first. 10 - 4 gives 6.",
      "Step 3: Multiplication (*) repeats a number. 3 * 4 means 3 + 3 + 3 + 3 = 12.",
      "Step 4: Division (/) splits a number into parts. 15 / 3 gives 5.0 — note the decimal; / always gives a float.",
      "Step 5: Floor division (//) divides and drops the decimal. 15 // 4 is 3 (not 3.75).",
      "Step 6: Modulo (%) gives the remainder after division. 15 % 4 is 3 (15 = 3×4 + 3).",
      "Step 7: Exponentiation (**) means 'to the power of'. 2 ** 3 is 2×2×2 = 8."
    ],
    intermediateSteps: [
      "Step 1: Operands and operators — each operation has a left and right operand (e.g. in a + b, a and b are operands, + is the operator).",
      "Step 2: Type of result — +, -, *, ** keep int when both operands are int; / always returns float; // and % return int when both operands are int.",
      "Step 3: Division behaviour — / is true division (float); // is floor division (rounds toward −∞); % satisfies (a // b) * b + (a % b) == a.",
      "Step 4: Negative numbers — // rounds down (e.g. -10 // 3 is -4); % has the sign of the divisor in Python.",
      "Step 5: Precedence — ** is highest, then * / // %, then + -. Use parentheses to force order: (2 + 3) * 4."
    ],
    expertSteps: [
      "Step 1: Python uses __add__, __sub__, __mul__, __truediv__, __floordiv__, __mod__, __pow__ for +, -, *, /, //, %, **; custom types can override these.",
      "Step 2: / always invokes true division (PEP 238); for int-int division use //. from __future__ import division only matters in Python 2.",
      "Step 3: Floor division identity: (a // b) * b + (a % b) == a. For negative b, result of % has the sign of b; // rounds toward −∞.",
      "Step 4: ** has right-to-left grouping: 2 ** 3 ** 2 is 2 ** (3 ** 2) = 2 ** 9 = 512. Zero to a negative power raises ZeroDivisionError.",
      "Step 5: Arbitrary-precision integers mean no overflow; floats are IEEE 754, so use decimal.Decimal or fractions for exact or rational arithmetic when needed."
    ]
  },
  {
    title: "Order of Operations",
    category: "Operations",
    definition: "Python follows PEMDAS: Parentheses, Exponents, Multiplication/Division (left to right), Addition/Subtraction (left to right).",
    examples: [
      "2 + 3 * 4 = 14 (multiplication before addition)",
      "(2 + 3) * 4 = 20 (parentheses first)",
      "10 - 3 + 2 = 9 (left to right)",
      "2 ** 3 * 2 = 16 (exponents before multiplication)"
    ],
    beginnerSteps: [
      "Step 1: Python does not always work left to right. Some operations are done before others.",
      "Step 2: Anything in parentheses ( ) is done first. So (2 + 3) * 4 means: do 2 + 3 = 5, then 5 * 4 = 20.",
      "Step 3: Without parentheses, 2 + 3 * 4 means: do 3 * 4 = 12 first, then 2 + 12 = 14.",
      "Step 4: Exponents (**) come before multiply and divide. So 2 ** 3 * 2 is 8 * 2 = 16.",
      "Step 5: When two operations have the same priority (e.g. + and -), Python goes left to right: 10 - 3 + 2 = 7 + 2 = 9."
    ],
    intermediateSteps: [
      "Step 1: Precedence (highest to lowest): parentheses/brackets; ** (right-associative); +x, -x, ~x; *, /, //, %; +, -; comparison ops; not; and; or.",
      "Step 2: ** groups right to left: 2 ** 3 ** 2 = 2 ** (3 ** 2) = 2 ** 9 = 512.",
      "Step 3: * / // % have equal precedence and are evaluated left to right; same for + and -.",
      "Step 4: Comparison operators (==, !=, <, >, <=, >=) have lower precedence than arithmetic, so 2 + 3 == 5 is (2 + 3) == 5 → True.",
      "Step 5: Use parentheses whenever the intended order might be unclear; they never change the result, only make it explicit."
    ],
    expertSteps: [
      "Step 1: Full precedence table is in the Python reference: expressions. Parentheses, then power, then unary + - ~, then * / // %, then + -, then comparisons, then not, and, or.",
      "Step 2: Chained comparisons (e.g. a < b < c) are evaluated once per operand: a < b and b < c, with b evaluated only once.",
      "Step 3: ** is the only right-associative arithmetic operator; all others are left-associative. 2 ** 3 ** 2 binds as 2 ** (3 ** 2).",
      "Step 4: Operator overloading respects the same precedence; __add__ and __mul__ are still called in expression order determined by precedence.",
      "Step 5: In expression evaluation, short-circuiting applies only to and/or; arithmetic and comparisons always evaluate all operands before applying the operator."
    ]
  },
  {
    title: "Integer vs Float Results",
    category: "Operations",
    definition: "Division (/) always returns a float, even when dividing integers. Floor division (//) returns an integer when both operands are integers.",
    examples: [
      "10 / 2 = 5.0 (float result)",
      "10 // 2 = 5 (integer result)",
      "10 / 3 = 3.333... (float)",
      "10 // 3 = 3 (integer, rounded down)",
      "10.0 // 3 = 3.0 (float result)"
    ],
    beginnerSteps: [
      "Step 1: Normal division (/) always gives a float. So 10 / 2 is 5.0, not 5.",
      "Step 2: Floor division (//) gives a whole number. 10 // 2 is 5, and 10 // 3 is 3 (the .333 is dropped).",
      "Step 3: If you mix int and float (e.g. 10.0 // 3), the result is a float: 3.0.",
      "Step 4: To get an integer from / when you know it divides evenly, use int(): int(10 / 2) is 5.",
      "Step 5: Remember: use / when you want the exact quotient (with decimals); use // when you want how many times one number fits into another."
    ],
    intermediateSteps: [
      "Step 1: PEP 238: / is true division; // is floor division. int / int with / always yields float to avoid confusion.",
      "Step 2: Result type of //: if both operands are int, result is int; if either is float, result is float (e.g. 10.0 // 3 → 3.0).",
      "Step 3: Floor is mathematical floor (toward −∞): -10 // 3 is -4, not -3, because -4 * 3 = -12 ≤ -10.",
      "Step 4: The identity (a // b) * b + (a % b) == a holds; % takes the sign of the divisor.",
      "Step 5: For integer division when both are positive, // is equivalent to int(a / b), but for negatives they can differ in other languages; in Python rely on // and %."
    ],
    expertSteps: [
      "Step 1: __truediv__ (/) and __floordiv__ (//) are distinct; types can override one or both. int implements both; float has no __floordiv__ but gets it from the numeric tower.",
      "Step 2: math.floor(a / b) and a // b differ for negative b: -10 // 3 is -4, math.floor(-10/3) is -4; but (a // b) * b + (a % b) == a with % having divisor sign is the Python guarantee.",
      "Step 3: divmod(a, b) returns (a // b, a % b) in one step; useful when both quotient and remainder are needed without double evaluation.",
      "Step 4: Float precision: 1e20 / 1e-20 is a float; for exact integer division of huge numbers use // to stay in int and avoid float rounding.",
      "Step 5: Type consistency: mixed int/float arithmetic promotes to float; so 10 / 2 is 5.0; 10 // 2 is 5; 10.0 // 2 is 5.0."
    ]
  },
  {
    title: "Assignment Operators",
    category: "Operations",
    definition: "Operators that combine assignment with arithmetic operations.",
    examples: [
      "= Basic assignment: x = 5",
      "+= Add and assign: x += 3 (same as x = x + 3)",
      "-= Subtract and assign: x -= 2 (same as x = x - 2)",
      "*= Multiply and assign: x *= 4 (same as x = x * 4)",
      "/= Divide and assign: x /= 2 (same as x = x / 2)",
      "//= Floor divide and assign: x //= 3",
      "%= Modulo and assign: x %= 5",
      "**= Exponentiate and assign: x **= 2"
    ],
    beginnerSteps: [
      "Step 1: = stores a value in a variable. x = 5 means 'x now holds 5'.",
      "Step 2: += means 'add to the current value'. If x is 5, x += 3 makes x equal to 8 (same as x = x + 3).",
      "Step 3: -=, *=, /= work the same way: subtract, multiply, or divide the variable by the right-hand value and store the result back.",
      "Step 4: //= and %= do floor-divide or modulo and assign: x //= 3 means x = x // 3; x %= 5 means x = x % 5.",
      "Step 5: **= raises the variable to a power and assigns: x **= 2 means x = x ** 2 (e.g. 5 becomes 25)."
    ],
    intermediateSteps: [
      "Step 1: Augmented assignment (op=) is one statement; x += 1 can be more efficient than x = x + 1 for some types (e.g. list.extend vs list + list) and avoids evaluating x twice.",
      "Step 2: For immutable types (int, float, str, tuple), x += y is equivalent to x = x + y; the name is rebound. For mutable types (list), += can mutate in place (list.__iadd__).",
      "Step 3: If a type does not define __iadd__ (or other __iop__), Python falls back to __add__ and normal assignment; the result might be a new object.",
      "Step 4: Multiple targets: a = b = 0 assigns 0 to both; chained op= (e.g. a += b += 1) is invalid — op= is not an expression that yields a value.",
      "Step 5: Assignment is a statement, not an expression; you cannot use = inside an expression (unlike C). Use := (walrus) inside expressions where allowed (e.g. in if/while)."
    ],
    expertSteps: [
      "Step 1: Augmented assignment invokes __iadd__, __isub__, etc. when defined; otherwise __add__, __sub__, etc. plus assignment. In-place mutation is type-dependent.",
      "Step 2: x += y for lists mutates the list and returns self (same object); x = x + y creates a new list. References to the same list elsewhere see the mutation with +=.",
      "Step 3: No chained op=: a += 1 returns None, so (a += 1) is invalid. Use a += 1; b += 1 for two updates.",
      "Step 4: Walrus operator := assigns and returns the value: if (n := len(data)) > 0: ... binds n and uses it. Only valid in certain expression contexts (if, while, comprehensions with PEP 572).",
      "Step 5: Tuple unpacking and *args in assignment: a, *rest, b = seq; multiple assignment is one right-hand evaluation then left-to-right binding; swap with a, b = b, a."
    ]
  },
  {
    title: "Chained Assignment",
    category: "Operations",
    definition: "Assigning the same value to multiple variables in one statement.",
    examples: [
      "x = y = z = 10  # All variables equal 10",
      "a = b = c = []  # All reference the same list object"
    ],
    beginnerSteps: [
      "Step 1: You can set several variables to the same value in one line: x = y = z = 10.",
      "Step 2: Python evaluates the right-hand side once (10), then assigns it to z, then to y, then to x. So x, y, and z all become 10.",
      "Step 3: With numbers or strings this is safe — each variable gets the same value. With a = b = c = [], all three names point to the same list.",
      "Step 4: If you do a = b = c = [] and then a.append(1), then b and c also see [1], because they are the same object.",
      "Step 5: Use chained assignment for simple shared values (e.g. x = y = 0). For mutable objects (list, dict), create separate objects if you need independent copies: a, b, c = [], [], []."
    ],
    intermediateSteps: [
      "Step 1: Chained assignment is right-associative: x = y = z = expr evaluates expr once, then assigns to z, then y, then x. The same object reference is assigned to each.",
      "Step 2: For immutable values (int, str, tuple), sharing the same reference is harmless. For mutable (list, dict, set), all names alias the same object.",
      "Step 3: To get independent mutable objects, use: a, b, c = [], [], [] or [[] for _ in range(3)]. Avoid a = b = c = [] when you plan to mutate and want separate lists.",
      "Step 4: Assignment never copies; it binds a name to an object. Chained assignment binds multiple names to one object.",
      "Step 5: Unpacking is different: x, y = 1, 2 assigns 1 to x and 2 to y from one tuple. a, b = b, a swaps without a temporary variable."
    ],
    expertSteps: [
      "Step 1: The assignment statement evaluates the expression list on the right (single expression in chained case), then performs left-to-right binding of targets. So x = y = f() calls f() once.",
      "Step 2: Target list can be a single name, tuple, or list of targets; nested unpacking is allowed: (a, (b, c)) = (1, (2, 3)). Chained: all targets get the same reference.",
      "Step 3: Mutable default argument pitfall is related: def f(x=[]) reuses the same list; like a = b = [] for default. Use def f(x=None): x = x or [] for fresh list.",
      "Step 4: Augmented assignment (+=) cannot be chained because it does not return a value; a = b += 1 is invalid (b += 1 returns None).",
      "Step 5: Annotation with chaining: x: int = y = 5 is valid; the type hint applies to x. All targets still receive the same object reference."
    ]
  },
  {
    title: "Comparison Operators",
    category: "Operations",
    definition: "Operators that compare values and return boolean results.",
    examples: [
      "== Equal to: 5 == 5 → True",
      "!= Not equal: 5 != 3 → True",
      "< Less than: 3 < 5 → True",
      "> Greater than: 5 > 3 → True",
      "<= Less than or equal: 5 <= 5 → True",
      ">= Greater than or equal: 5 >= 3 → True",
      "Chained: 1 < 5 < 10 → True"
    ],
    beginnerSteps: [
      "Step 1: == checks if two values are equal. 5 == 5 is True, 5 == 3 is False.",
      "Step 2: != means 'not equal'. 5 != 3 is True. Use it when you want to check that values are different.",
      "Step 3: < and > mean less than and greater than. 3 < 5 is True. 5 > 3 is also True.",
      "Step 4: <= means 'less than or equal', >= means 'greater than or equal'. 5 <= 5 is True.",
      "Step 5: You can chain comparisons: 1 < 5 < 10 means '5 is between 1 and 10' and is True. Python checks 1 < 5 and 5 < 10."
    ],
    intermediateSteps: [
      "Step 1: Comparisons return bool (True/False). They have lower precedence than arithmetic, so 2 + 3 == 5 is (2 + 3) == 5 → True.",
      "Step 2: Chained comparisons (a < b < c) are evaluated as a < b and b < c, but b is evaluated only once. So 0 < x < 10 is safe and clear.",
      "Step 3: != is the negation of ==. For custom types you can define __eq__ and __ne__; by default __ne__ delegates to not __eq__.",
      "Step 4: Ordering (<, >, <=, >=) use __lt__, __le__, __gt__, __ge__. If one is missing, Python may use the reverse (e.g. __gt__ from __lt__ with swapped args).",
      "Step 5: Different types: 3 < 5.0 is True (numeric comparison); 3 < 'a' raises TypeError in Python 3. Use consistent types or explicit conversion."
    ],
    expertSteps: [
      "Step 1: Comparison operators can be chained arbitrarily: a < b < c < d. Each intermediate operand is evaluated once; equivalent to (a < b) and (b < c) and (c < d) but with single evaluation of b, c.",
      "Step 2: __eq__ and __hash__: if you define __eq__, consider __hash__; mutable types that define __eq__ should set __hash__ = None to be unhashable.",
      "Step 3: NaN: float('nan') != float('nan') is True; NaN is not equal to itself. Use math.isnan(x) to test for NaN.",
      "Step 4: Rich comparison methods (__lt__, __le__, __gt__, __ge__) can return NotImplemented; Python may try the reflected method (e.g. __gt__ on the other object).",
      "Step 5: functools.total_ordering generates missing ordering methods from __eq__ and one of __lt__, __le__, __gt__, __ge__, reducing boilerplate for ordered types."
    ]
  },
  {
    title: "Logical Operators",
    category: "Operations",
    definition: "Operators that combine boolean expressions using AND, OR, and NOT logic.",
    examples: [
      "and: Returns True if both conditions are True",
      "  (5 > 3) and (10 < 20) → True",
      "or: Returns True if at least one condition is True",
      "  (5 > 10) or (10 < 20) → True",
      "not: Reverses the boolean value",
      "  not (5 > 10) → True",
      "Short-circuit: 'and' and 'or' stop evaluating once result is determined"
    ],
    beginnerSteps: [
      "Step 1: and gives True only when both sides are True. (5 > 3) and (10 < 20) is True and True → True.",
      "Step 2: or gives True if at least one side is True. (5 > 10) or (10 < 20) is False or True → True.",
      "Step 3: not flips True to False and False to True. not (5 > 10) is not False → True.",
      "Step 4: Short-circuit: and stops as soon as it sees False (no need to check the rest); or stops as soon as it sees True.",
      "Step 5: Use these in if conditions: if age >= 18 and has_id: ... Only when both are True does the block run."
    ],
    intermediateSteps: [
      "Step 1: and and or return one of their operands, not necessarily bool. x and y returns x if x is falsy, else y. x or y returns x if x is truthy, else y.",
      "Step 2: Short-circuit means the second operand may never be evaluated. So (x and y) is safe when y has side effects only when x is truthy (e.g. x and x.process()).",
      "Step 3: Precedence: not has higher precedence than and, which is higher than or. So not a and b or c is (not a and b) or c.",
      "Step 4: For actual booleans, use bool() or write explicit conditions. For 'default' values, x or default is a common pattern (use x if x is not None else default if None is possible).",
      "Step 5: Truthiness: [], '', 0, None, False are falsy; non-empty collections, non-zero numbers, and True are truthy. and/or use truthiness, not only type bool."
    ],
    expertSteps: [
      "Step 1: and/or are not guaranteed to return bool; they return the first operand that determines the result. Use bool() or explicit True/False when a strict bool is required (e.g. in type hints or storage).",
      "Step 2: Short-circuit evaluation is part of the language; the right operand is not evaluated if the result is known. So f() or g() may never call g().",
      "Step 3: Chaining: a and b and c returns the first falsy value or the last; a or b or c returns the first truthy value or the last. Useful for fallbacks: x = a or b or c.",
      "Step 4: not has a single operand and returns bool. not x is equivalent to (not x) in expressions. not binds more tightly than and/or.",
      "Step 5: Boolean context: if, while, and the condition in conditional expressions (x if c else y) use truthiness. __bool__ and __len__ (fallback) define truthiness for custom types."
    ]
  },
  {
    title: "Identity vs Equality",
    category: "Operations",
    definition: "is checks if two variables reference the same object, == checks if values are equal.",
    examples: [
      "x = [1, 2, 3]",
      "y = [1, 2, 3]",
      "x == y → True (values are equal)",
      "x is y → False (different objects)",
      "z = x",
      "x is z → True (same object)"
    ],
    beginnerSteps: [
      "Step 1: == asks 'Are these values the same?' So [1, 2, 3] == [1, 2, 3] is True — same contents.",
      "Step 2: is asks 'Is this the same object in memory?' Two lists with the same contents are still two different objects, so x is y is False.",
      "Step 3: If you do z = x, then z and x point to the same list. So x is z is True. Changing the list via x also changes it for z.",
      "Step 4: Use == for comparing values (numbers, strings, list contents). Use is for checking None: if x is None.",
      "Step 5: Never use is for numbers or strings (e.g. x is 5). Small integers and some strings may be cached, but rely on == for value comparison."
    ],
    intermediateSteps: [
      "Step 1: is compares object identity (id(x) == id(y)). Two objects are the same only if they are the same instance. == invokes __eq__ and can be overridden.",
      "Step 2: For singletons like None, True, False, use is: if x is None. It's correct and slightly faster than ==.",
      "Step 3: Immutable types: two equal values might be the same object (e.g. small int caching, string interning) or not. Never depend on identity for immutable value comparison.",
      "Step 4: Default arguments: def f(x=[]) reuses one list object; use def f(x=None): x = x or [] to get a new list each time.",
      "Step 5: is not is the negation of is. 'x is not None' is preferred over 'not (x is None)' and is idiomatic."
    ],
    expertSteps: [
      "Step 1: id(obj) returns the object's memory address (or a unique identifier). a is b is equivalent to id(a) == id(b). Identity is never overridable.",
      "Step 2: __eq__ can be arbitrary; x == y can be True while x is y is False (e.g. two distinct instances that compare equal). For None/True/False, identity and equality coincide.",
      "Step 3: Caching: small integers (-5 to 256 in CPython) and some string literals may be interned, so a = 1; b = 1; a is b can be True. Don't rely on it; use == for values.",
      "Step 4: is is not overloadable; it always compares identity. Use is only for singleton identity (None, True, False, or documented singletons like sentinels).",
      "Step 5: Copy vs reference: b = a makes b the same object as a (identity). b = a.copy() or b = list(a) creates a new object (different identity, possibly equal value)."
    ]
  },
  {
    title: "Membership Operations",
    category: "Operations",
    definition: "Operators that check if an item exists in a sequence or collection.",
    examples: [
      "in: Returns True if item found",
      "  'a' in 'apple' → True",
      "  3 in [1, 2, 3] → True",
      "  'key' in {'key': 'value'} → True",
      "not in: Returns True if item not found",
      "  10 not in [1, 2, 3] → True"
    ],
    beginnerSteps: [
      "Step 1: in checks if something is inside a string, list, or other collection. 'a' in 'apple' is True because 'a' appears in 'apple'.",
      "Step 2: For lists, in checks for an element: 3 in [1, 2, 3] is True. 10 in [1, 2, 3] is False.",
      "Step 3: For dictionaries, in checks keys, not values. 'key' in {'key': 'value'} is True. 'value' in {'key': 'value'} is False unless 'value' is a key.",
      "Step 4: not in is the opposite: True when the item is not present. 10 not in [1, 2, 3] is True.",
      "Step 5: Use in in if statements: if 'x' in name: ... or in loops: for item in collection: ...."
    ],
    intermediateSteps: [
      "Step 1: in invokes __contains__ when defined; otherwise Python may fall back to __iter__ and equality (O(n) scan for sequences).",
      "Step 2: For dict/set, in is O(1) average (hash lookup). For list/tuple/str, in is O(n) (linear search). Choose the right structure for membership checks.",
      "Step 3: Substring: 'ab' in 'abc' is True. For sequences, in checks for a single element or substring (str), not a subsequence of multiple elements in list.",
      "Step 4: not in is equivalent to not (x in y). Same complexity as in.",
      "Step 5: For custom types, implement __contains__(self, item) to support in. Return True or False (or a truthy/falsy value)."
    ],
    expertSteps: [
      "Step 1: __contains__ takes one argument (the item). If not defined, Python uses __iter__ and checks for equality with each element; for sequences, __getitem__ and IndexError can be used in older behaviour.",
      "Step 2: str in checks for substring (contiguous). 'ab' in 'xabz' is True. For bytes, same. For list, in checks element equality: [1,2] in [1,2,3] is False; [1,2] in [[1,2], 3] is True.",
      "Step 3: set/frozenset and dict use hash tables; in is O(1) average, O(n) worst case. list, tuple, str, range use linear search; in is O(n).",
      "Step 4: Membership in generators/iterators consumes the iterator until found or exhausted; use a list/set if you need to check membership multiple times.",
      "Step 5: in with tuple of options: x in (a, b, c) is valid and clear. For many options, a set is faster: x in {a, b, c} (set literal)."
    ]
  },
  {
    title: "Type Operations",
    category: "Operations",
    definition: "Functions and operators for checking and converting data types.",
    examples: [
      "type(): Returns the type of an object",
      "  type(5) → <class 'int'>",
      "isinstance(): Checks if object is instance of type(s)",
      "  isinstance(5, int) → True",
      "  isinstance(5, (int, float)) → True",
      "Dynamic typing: Variables can change types",
      "  x = 5  # x is int",
      "  x = 'hello'  # x is now str"
    ],
    beginnerSteps: [
      "Step 1: type(x) tells you what kind of value x is. type(5) gives <class 'int'>, type('hi') gives <class 'str'>.",
      "Step 2: isinstance(x, SomeType) asks 'Is x a SomeType?' isinstance(5, int) is True. Use it in if checks: if isinstance(x, int): ....",
      "Step 3: You can pass a tuple of types: isinstance(x, (int, float)) is True for numbers. Handy when several types are allowed.",
      "Step 4: Variables don't have a fixed type. You can do x = 5 then x = 'hello'; the variable now holds a string.",
      "Step 5: To convert types, use int(), float(), str(), list(), etc. int('42') is 42; str(42) is '42'."
    ],
    intermediateSteps: [
      "Step 1: type(x) returns the class of x; type(x) is int is a strict check. isinstance(x, int) is True for subclasses of int as well (e.g. bool is a subclass of int).",
      "Step 2: Prefer isinstance for type checks in code; it supports inheritance and (TypeA, TypeB) for multiple types. type(x) == int is stricter (no subclasses).",
      "Step 3: issubclass(A, B) checks if A is a subclass of B. isinstance(x, A) is roughly type(x) is A or issubclass(type(x), A).",
      "Step 4: Callable types: int(), str(), list() construct new objects; they are not casts but constructors. int(3.7) truncates to 3; int('10', 2) parses binary → 2.",
      "Step 5: Type hints (e.g. def f(x: int) -> str) do not change runtime behaviour; use typing and isinstance for runtime checks when needed."
    ],
    expertSteps: [
      "Step 1: type is a metaclass; type(x) is the class of x. type(name, bases, dict) creates a new class. isinstance and issubclass respect the MRO (method resolution order).",
      "Step 2: bool is a subclass of int; isinstance(True, int) is True. So prefer explicit type(x) is bool if you need to exclude bool from int checks.",
      "Step 3: Abstract base classes (collections.abc, numbers): isinstance(x, numbers.Integral) is True for int and bool; use ABCs for structural checks (e.g. Iterable, Sequence).",
      "Step 4: getattr(obj, '__class__') is obj's class; type(obj) is the same. __class__ can be assigned (with care) for dynamic class changes.",
      "Step 5: Type conversion: __int__, __float__, __str__, etc. are used by int(), float(), str(); raise TypeError or return a value. For custom parsing use class methods or constructors."
    ]
  },
  {
    title: "Bitwise Operators",
    category: "Operations",
    definition: "Operators that perform operations on binary representations of integers.",
    examples: [
      "& AND: 5 & 3 = 1 (binary: 101 & 011 = 001)",
      "| OR: 5 | 3 = 7 (binary: 101 | 011 = 111)",
      "^ XOR: 5 ^ 3 = 6 (binary: 101 ^ 011 = 110)",
      "~ NOT: ~5 = -6 (inverts all bits)",
      "<< Left shift: 5 << 1 = 10 (multiply by 2)",
      ">> Right shift: 5 >> 1 = 2 (divide by 2, floor)"
    ],
    beginnerSteps: [
      "Step 1: Numbers are stored in binary. Bitwise operators work on each bit. & (AND): 1 & 1 = 1, otherwise 0. So 5 & 3: 101 & 011 = 001 = 1.",
      "Step 2: | (OR): 0 | 0 = 0, else 1. 5 | 3: 101 | 011 = 111 = 7.",
      "Step 3: ^ (XOR): same bits → 0, different → 1. 5 ^ 3: 101 ^ 011 = 110 = 6.",
      "Step 4: ~ (NOT) flips all bits. ~5 is -6 in Python (two's complement). Use for bit masks.",
      "Step 5: << shifts bits left (multiply by 2 each place): 5 << 1 = 10. >> shifts right (integer divide by 2): 5 >> 1 = 2."
    ],
    intermediateSteps: [
      "Step 1: Operands are converted to integer; result is int. Negative numbers are in two's complement; ~n == -(n+1) for non-negative n.",
      "Step 2: & is used for masking (extract bits): n & 0xFF keeps lowest 8 bits. | sets bits: n | 0x10 sets bit 4. ^ toggles bits.",
      "Step 3: << and >>: a << b is a * (2 ** b); a >> b is a // (2 ** b). Right shift of negative numbers is implementation-defined in C but in Python it's arithmetic (sign-extending).",
      "Step 4: Precedence: ~ has higher precedence than << >>, which are higher than & ^ |. Use parentheses for clarity: (a & b) | c.",
      "Step 5: Bitwise operators have lower precedence than arithmetic; 1 + 2 & 3 is 1 + (2 & 3) = 1 + 2 = 3. Use (1 + 2) & 3 if you mean (3 & 3)."
    ],
    expertSteps: [
      "Step 1: __and__, __or__, __xor__, __invert__, __lshift__, __rshift__ implement & | ^ ~ << >>. int implements all; custom types can override. Bitwise ops require integer operands (or objects with __index__).",
      "Step 2: Arbitrary-precision: Python ints have no fixed width; negative numbers have 'infinite' leading 1s in two's complement. ~x == -x - 1 for int.",
      "Step 3: Left shift can create very large numbers; 1 << 1000 is valid. Right shift of negative: (-5) >> 1 is -3 (floor division by 2 toward −∞).",
      "Step 4: Bit masks: set bit n: x | (1 << n); clear bit n: x & ~(1 << n); toggle: x ^ (1 << n); test: (x >> n) & 1.",
      "Step 5: bin(), oct(), hex() produce string representations. int(s, 2) parses binary. For fixed-width (e.g. 32-bit), use x & 0xFFFFFFFF or ctypes/cstruct for low-level work."
    ]
  }
];

const MATH_CONCEPTS_DATA: OperationItem[] = [
  {
    title: "Basic Integers and Counting",
    category: "Math Concepts",
    definition: "Integers are whole numbers without decimal points. Python supports arbitrarily large integers.",
    examples: [
      "Positive: 1, 2, 3, 100, 1000",
      "Negative: -1, -5, -100",
      "Zero: 0 (special behavior in many operations)",
      "Large: 999999999999999999 (no overflow)"
    ],
    beginnerSteps: [
      "Step 1: Think of integers as the whole numbers you count with: ..., -2, -1, 0, 1, 2, 3, ....",
      "Step 2: Positive integers are greater than zero (1, 2, 3); negative integers are less than zero (-1, -2, -3); zero sits in the middle.",
      "Step 3: In Python you write integers directly (x = 10); there is no fixed maximum size, so you do not get overflow like in some other languages."
    ],
    intermediateSteps: [
      "Step 1: Python’s int type is arbitrary precision, so values like 10**50 are represented exactly rather than wrapping around.",
      "Step 2: Integers are the default choice for counting loops, list indices, and sizes (range, len, and indexing).",
      "Step 3: Conversions: int('42') parses from strings, int(3.9) truncates toward zero, and bool(0) is False while all other ints are True."
    ],
    expertSteps: [
      "Step 1: Python’s integers are implemented with big-integer arithmetic; operations are exact but can become slower for very large values.",
      "Step 2: For high‑performance numeric work, libraries like NumPy use fixed-width machine integers which can overflow but are faster.",
      "Step 3: When mixing ints with floats, very large ints may lose precision when converted to float; prefer staying in int space for exact arithmetic."
    ]
  },
  {
    title: "Positive and Negative Integers",
    category: "Math Concepts",
    definition: "Integers can be positive, negative, or zero. Operations with negative numbers follow standard mathematical rules.",
    examples: [
      "Addition: 5 + (-3) = 2",
      "Subtraction: 5 - (-3) = 8",
      "Multiplication: 5 * (-3) = -15",
      "Division: -10 / 2 = -5.0",
      "Absolute value: abs(-5) = 5"
    ],
    beginnerSteps: [
      "Step 1: A positive number is greater than zero, a negative number is less than zero, and zero is neither positive nor negative.",
      "Step 2: Adding a negative number is like subtracting: 5 + (-3) moves three steps left from 5 to land on 2.",
      "Step 3: Multiplying by a negative flips the sign: positive × negative = negative, negative × negative = positive."
    ],
    intermediateSteps: [
      "Step 1: Addition and subtraction with negatives follow the number line: a − (−b) = a + b, and a + (−b) = a − b.",
      "Step 2: abs(x) returns the distance from zero, which is always non‑negative; this is useful in error and distance calculations.",
      "Step 3: Division with negatives in Python uses true division for / and floor division for //, so sign and rounding rules matter for algorithms."
    ],
    expertSteps: [
      "Step 1: For floor division and modulo, Python guarantees (a // b) * b + (a % b) == a even with negative a or b.",
      "Step 2: Sign handling is consistent across arithmetic operations, which is important when implementing numeric algorithms like root finding or modular arithmetic.",
      "Step 3: When modelling debts, temperatures, or deltas, encode domain rules explicitly instead of relying only on numeric sign for meaning."
    ]
  },
  {
    title: "Zero and its Special Behavior",
    category: "Math Concepts",
    definition: "Zero has unique properties in mathematical operations that affect Python behavior.",
    examples: [
      "Division by zero: 10 / 0 → ZeroDivisionError",
      "Zero multiplication: 5 * 0 = 0",
      "Zero addition: 5 + 0 = 5",
      "Boolean: bool(0) = False (zero is falsy)",
      "Power: 5 ** 0 = 1 (any number to power of 0 is 1)"
    ],
    beginnerSteps: [
      "Step 1: Multiplying any number by 0 always gives 0; adding 0 leaves the number unchanged.",
      "Step 2: Dividing by 0 is not allowed; in Python 10 / 0 raises a ZeroDivisionError instead of returning a value.",
      "Step 3: In boolean contexts, 0 behaves like False, while any non‑zero integer behaves like True."
    ],
    intermediateSteps: [
      "Step 1: Zero is the additive identity: for any number x, x + 0 == x and 0 + x == x.",
      "Step 2: For powers, x ** 0 is 1 for any non‑zero x; 0 ** 0 is mathematically ambiguous and in Python raises a ValueError in some contexts (e.g. numpy) but works as 1 for plain ints.",
      "Step 3: In control flow, expressions like while count: rely on count becoming 0 to stop the loop."
    ],
    expertSteps: [
      "Step 1: Division and modulo by zero always raise exceptions in Python; catching ZeroDivisionError is preferable to returning sentinel numeric values.",
      "Step 2: Many algorithms rely on zero as a neutral element (identity) or absorbing element; explicitly document which role zero plays in each function.",
      "Step 3: When interoperating with NumPy or databases, be aware that their treatment of 0, NaN, or NULL can differ from pure Python integers."
    ]
  },
  {
    title: "Incrementing and Decrementing Values",
    category: "Math Concepts",
    definition: "Common patterns for increasing or decreasing numeric values in loops and conditions.",
    examples: [
      "Increment: x += 1 or x = x + 1",
      "Decrement: x -= 1 or x = x - 1",
      "In loop: for i in range(10): (i increments automatically)",
      "While loop: while x < 10: x += 1",
      "Step increment: x += 2 (increase by 2)"
    ],
    beginnerSteps: [
      "Step 1: Incrementing means increasing a number, usually by 1: x += 1 makes x one larger than before.",
      "Step 2: Decrementing means decreasing a number: x -= 1 makes x one smaller than before.",
      "Step 3: Loops often follow a pattern of \"start at a value, change it a little each time, stop when a condition is met\"."
    ],
    intermediateSteps: [
      "Step 1: for i in range(n) handles incrementing for you; i starts at 0 and increases by 1 until n − 1.",
      "Step 2: while loops require manual updates: you must increment or decrement inside the loop, otherwise you risk an infinite loop.",
      "Step 3: Using different step sizes (x += 2, x -= 5) lets you model counters that skip values, like even numbers or countdown timers."
    ],
    expertSteps: [
      "Step 1: Off‑by‑one errors often come from incorrect initial values or stop conditions; reason carefully about inclusive vs exclusive bounds.",
      "Step 2: Prefer range(start, stop, step) in for loops when the update is a simple arithmetic progression; it keeps the update logic in one place.",
      "Step 3: In performance‑sensitive code, avoid unnecessary Python‑level increments inside deeply nested loops by delegating work to vectorized libraries when possible."
    ]
  },
  {
    title: "Using Integers in Loops and Conditions",
    category: "Math Concepts",
    definition: "Integers are commonly used to control loop iterations and as conditions in control flow.",
    examples: [
      "Range: for i in range(5): (0, 1, 2, 3, 4)",
      "Countdown: for i in range(10, 0, -1):",
      "Condition: if count > 0:",
      "Counter: count = 0; count += 1",
      "Index: items[i] (using integer as index)"
    ],
    beginnerSteps: [
      "Step 1: Integers often act as counters in loops: for i in range(5) runs the body with i equal to 0, 1, 2, 3, and 4.",
      "Step 2: Integers are also used in conditions, such as if count > 0:, to decide whether a block of code should run.",
      "Step 3: You can use integers to index into sequences like lists or strings, for example items[i] or name[0]."
    ],
    intermediateSteps: [
      "Step 1: The range function encodes the start, stop, and step of integer sequences and is the idiomatic way to drive counting loops.",
      "Step 2: Countdown loops use a negative step, e.g. for i in range(10, 0, -1):, and are useful for timers or reverse iteration.",
      "Step 3: Guard conditions like if 0 <= index < len(items): protect against IndexError by ensuring integer indices stay in bounds."
    ],
    expertSteps: [
      "Step 1: Python’s for loop iterates over any iterable; integers usually appear via range or as enumerate indices rather than manual i += 1 patterns.",
      "Step 2: In algorithms, integer loop variables often represent discrete states or positions; make their meaning explicit with descriptive variable names.",
      "Step 3: When optimizing, prefer iterating directly over items (for x in items) and only use integer indices when you truly need positions."
    ]
  },
  {
    title: "Prime Numbers",
    category: "Math Concepts",
    definition: "A prime number is a natural number greater than 1 that has no positive divisors other than 1 and itself.",
    examples: [
      "Primes: 2, 3, 5, 7, 11, 13, 17, 19",
      "Composite: 4, 6, 8, 9, 10 (have divisors other than 1 and itself)",
      "Checking: n % i != 0 for all i in range(2, n)",
      "1 is neither prime nor composite"
    ]
  },
  {
    title: "Checking if a Number is Prime",
    category: "Math Concepts",
    definition: "Algorithm to determine if a number is prime by testing divisibility.",
    examples: [
      "Basic: Check divisibility from 2 to n-1",
      "Optimized: Check only up to √n",
      "def is_prime(n):",
      "    if n < 2: return False",
      "    for i in range(2, int(n**0.5) + 1):",
      "        if n % i == 0: return False",
      "    return True"
    ]
  },
  {
    title: "Generating Prime Sequences",
    category: "Math Concepts",
    definition: "Methods for creating lists or generators of prime numbers.",
    examples: [
      "Sieve of Eratosthenes: Efficient algorithm",
      "Generator: yield primes one at a time",
      "List comprehension with prime check",
      "Range-based: for n in range(2, 100) if is_prime(n)"
    ]
  },
  {
    title: "Factors and Multiples",
    category: "Math Concepts",
    definition: "Factors are numbers that divide evenly into another number. Multiples are products of a number.",
    examples: [
      "Factors of 12: [1, 2, 3, 4, 6, 12]",
      "Finding factors: [i for i in range(1, n+1) if n % i == 0]",
      "Multiples of 3: 3, 6, 9, 12, 15...",
      "Common multiples: Numbers divisible by multiple values"
    ]
  },
  {
    title: "Greatest Common Divisor (GCD)",
    category: "Math Concepts",
    definition: "The largest number that divides evenly into two or more integers.",
    examples: [
      "GCD of 12 and 18: 6",
      "Using math.gcd(): import math; math.gcd(12, 18) = 6",
      "Euclidean algorithm for manual calculation",
      "Useful for simplifying fractions"
    ]
  },
  {
    title: "Least Common Multiple (LCM)",
    category: "Math Concepts",
    definition: "The smallest number that is a multiple of two or more integers.",
    examples: [
      "LCM of 4 and 6: 12",
      "Using math.lcm(): import math; math.lcm(4, 6) = 12",
      "Formula: LCM(a, b) = (a * b) / GCD(a, b)",
      "Useful for finding common denominators"
    ]
  },
  {
    title: "Fractions and Rational Numbers",
    category: "Math Concepts",
    definition: "Numbers expressed as a ratio of two integers (numerator/denominator).",
    examples: [
      "Proper fraction: numerator < denominator (1/2)",
      "Improper fraction: numerator >= denominator (5/3)",
      "Simplifying: 4/8 = 1/2 (divide by GCD)",
      "Python: from fractions import Fraction",
      "Fraction(1, 2) + Fraction(1, 3) = Fraction(5, 6)"
    ]
  },
  {
    title: "Floating-Point Numbers and Precision",
    category: "Math Concepts",
    definition: "Floats represent real numbers but have limited precision due to binary representation.",
    examples: [
      "Storage: IEEE 754 double-precision format",
      "Precision errors: 0.1 + 0.2 != 0.3",
      "Comparing: Use abs(a - b) < 0.0001 instead of a == b",
      "Formatting: f'{value:.2f}' for 2 decimal places",
      "Decimal module: from decimal import Decimal for exact arithmetic"
    ]
  },
  {
    title: "Powers, Roots, and Exponents",
    category: "Math Concepts",
    definition: "Operations involving raising numbers to powers or finding roots.",
    examples: [
      "Square: 5 ** 2 = 25 (5 squared)",
      "Cube: 3 ** 3 = 27 (3 cubed)",
      "Square root: 25 ** 0.5 = 5.0 or math.sqrt(25) = 5.0",
      "Nth root: 8 ** (1/3) = 2.0 (cube root)",
      "Exponent: 2 ** 10 = 1024"
    ]
  },
  {
    title: "Modular Arithmetic",
    category: "Math Concepts",
    definition: "Arithmetic system where numbers wrap around after reaching a certain value (the modulus).",
    examples: [
      "Clock arithmetic: 13 % 12 = 1 (1 PM)",
      "Even/odd: n % 2 == 0 (even), n % 2 == 1 (odd)",
      "Divisibility: n % 3 == 0 (divisible by 3)",
      "Wrapping: (x + 1) % 10 (cycles 0-9)",
      "Circular indexing: items[index % len(items)]"
    ]
  },
  {
    title: "Sequences and Series",
    category: "Math Concepts",
    definition: "Ordered lists of numbers following a pattern or rule.",
    examples: [
      "Arithmetic: 2, 5, 8, 11... (add 3 each time)",
      "  a_n = first + (n-1) * difference",
      "Geometric: 2, 6, 18, 54... (multiply by 3)",
      "  a_n = first * (ratio ** (n-1))",
      "Fibonacci: 0, 1, 1, 2, 3, 5, 8...",
      "  fib(n) = fib(n-1) + fib(n-2)"
    ]
  },
  {
    title: "Ratios and Proportions",
    category: "Math Concepts",
    definition: "Comparing quantities and scaling values proportionally.",
    examples: [
      "Ratio: 3:5 (3 to 5)",
      "Scaling: value * scale_factor",
      "Normalization: (x - min) / (max - min) (0 to 1 range)",
      "Percentage: (part / total) * 100",
      "Proportion: a/b = c/d"
    ]
  },
  {
    title: "Random Numbers and Probability",
    category: "Math Concepts",
    definition: "Generating unpredictable numbers and modeling chance events.",
    examples: [
      "Random integer: import random; random.randint(1, 10)",
      "Random float: random.random() (0.0 to 1.0)",
      "Choice: random.choice([1, 2, 3, 4, 5])",
      "Shuffle: random.shuffle(my_list)",
      "Seed: random.seed(42) for reproducibility"
    ]
  },
  {
    title: "Basic Statistics",
    category: "Math Concepts",
    definition: "Statistical measures for analyzing numeric data collections.",
    examples: [
      "Mean: sum(numbers) / len(numbers) or statistics.mean()",
      "Median: statistics.median([1, 3, 5, 7, 9]) = 5",
      "Mode: statistics.mode([1, 2, 2, 3]) = 2",
      "Range: max(numbers) - min(numbers)",
      "Variance: statistics.variance(numbers)"
    ]
  },
  {
    title: "Coordinate Systems and Geometry",
    category: "Math Concepts",
    definition: "Representing positions and distances in 2D or 3D space.",
    examples: [
      "Cartesian: (x, y) coordinates",
      "Distance: math.sqrt((x2-x1)**2 + (y2-y1)**2)",
      "Polar coordinates: (r, θ) - radius and angle",
      "Basic shapes: circles, rectangles, triangles",
      "Transformations: translation, rotation, scaling"
    ]
  },
  {
    title: "Mathematical Constraints and Bounds",
    category: "Math Concepts",
    definition: "Limiting values to valid ranges and validating inputs.",
    examples: [
      "Minimum: min(a, b, c)",
      "Maximum: max(a, b, c)",
      "Clamping: max(min_val, min(value, max_val))",
      "Validation: if 0 <= value <= 100:",
      "Bounds checking: if index >= 0 and index < len(list):"
    ]
  }
];

interface OperationsViewProps {
  onBack: () => void;
}

export const OperationsView: React.FC<OperationsViewProps> = ({ onBack }) => {
  const { t } = useLanguage();
  const { playCutSound } = useSound();
  const translatedData = useTranslatedOperations(OPERATIONS_DATA, MATH_CONCEPTS_DATA);
  const [search, setSearch] = useState('');
  const [selectedItem, setSelectedItem] = useState<OperationItem | null>(null);
  const [activeTab, setActiveTab] = useState<'operations' | 'math'>('operations');

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (selectedItem) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedItem]);

  const currentData = activeTab === 'operations' ? translatedData.operations : translatedData.math;
  
  const filteredData = currentData.filter(item => 
    item.title.toLowerCase().includes(search.toLowerCase()) ||
    item.definition.toLowerCase().includes(search.toLowerCase()) ||
    item.examples.some(ex => ex.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="relative min-h-[600px] animate-in slide-in-from-left duration-500 pb-12">
      {/* Detail Overlay */}
      {selectedItem && (
        <div className="fixed inset-0 z-[100] overflow-y-auto overscroll-contain flex justify-center items-start sm:items-center p-4">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-slate-950/85 backdrop-blur-md transition-opacity" 
            onClick={() => { playCutSound(); setSelectedItem(null); }}
          ></div>
          
          {/* Content Box */}
          <div className="glass w-full max-w-2xl my-4 sm:my-8 rounded-3xl p-6 sm:p-10 shadow-2xl relative z-10 border-indigo-500/30 animate-in fade-in zoom-in duration-300">
            <button 
              onClick={() => { playCutSound(); setSelectedItem(null); }}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 flex items-center justify-center rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors border border-white/10"
            >
              <i className="fas fa-times"></i>
            </button>

            <div className="space-y-6 sm:space-y-8">
              <div className="space-y-3 pt-2">
                <span className="inline-block text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em] px-3 py-1 bg-indigo-500/10 rounded-full border border-indigo-500/20">
                  {selectedItem.category}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white">{selectedItem.title}</h3>
              </div>

              <div className="space-y-4">
                <h4 className="text-[11px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                  <i className="fas fa-book-open text-indigo-400"></i> {t('operations.definition')}
                </h4>
                <div className="text-slate-300 leading-relaxed font-medium text-sm sm:text-base">
                  {selectedItem.definition}
                </div>
              </div>

              {(selectedItem.beginnerSteps?.length || selectedItem.intermediateSteps?.length || selectedItem.expertSteps?.length) ? (
                <div className="space-y-6">
                  <h4 className="text-[11px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                    <i className="fas fa-layer-group text-indigo-400"></i> {t('operations.stepByStepDetail')}
                  </h4>
                  <div className="space-y-6">
                    {selectedItem.beginnerSteps && selectedItem.beginnerSteps.length > 0 && (
                      <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4 sm:p-5">
                        <h5 className="text-xs font-black text-amber-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                          <i className="fas fa-seedling"></i> {t('operations.beginnerExplanation')}
                        </h5>
                        <ol className="space-y-2 list-none">
                          {selectedItem.beginnerSteps.map((step, idx) => (
                            <li key={idx} className="text-slate-300 text-sm leading-relaxed flex gap-2">
                              <span className="text-amber-500/80 font-bold shrink-0">{idx + 1}.</span>
                              <span>{step}</span>
                            </li>
                          ))}
                        </ol>
                      </div>
                    )}
                    {selectedItem.intermediateSteps && selectedItem.intermediateSteps.length > 0 && (
                      <div className="rounded-2xl border border-sky-500/20 bg-sky-500/5 p-4 sm:p-5">
                        <h5 className="text-xs font-black text-sky-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                          <i className="fas fa-layer-group"></i> {t('operations.intermediateExplanation')}
                        </h5>
                        <ol className="space-y-2 list-none">
                          {selectedItem.intermediateSteps.map((step, idx) => (
                            <li key={idx} className="text-slate-300 text-sm leading-relaxed flex gap-2">
                              <span className="text-sky-500/80 font-bold shrink-0">{idx + 1}.</span>
                              <span>{step}</span>
                            </li>
                          ))}
                        </ol>
                      </div>
                    )}
                    {selectedItem.expertSteps && selectedItem.expertSteps.length > 0 && (
                      <div className="rounded-2xl border border-indigo-500/20 bg-indigo-500/5 p-4 sm:p-5">
                        <h5 className="text-xs font-black text-indigo-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                          <i className="fas fa-graduation-cap"></i> {t('operations.expertExplanation')}
                        </h5>
                        <ol className="space-y-2 list-none">
                          {selectedItem.expertSteps.map((step, idx) => (
                            <li key={idx} className="text-slate-300 text-sm leading-relaxed flex gap-2">
                              <span className="text-indigo-400/80 font-bold shrink-0">{idx + 1}.</span>
                              <span>{step}</span>
                            </li>
                          ))}
                        </ol>
                      </div>
                    )}
                  </div>
                </div>
              ) : null}

              <div className="space-y-4">
                <h4 className="text-[11px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                  <i className="fas fa-code text-indigo-400"></i> {t('operations.examples')}
                </h4>
                <div className="bg-slate-900 rounded-2xl p-4 sm:p-6 border border-white/5 shadow-inner max-h-[400px] overflow-y-auto">
                  <div className="space-y-2">
                    {selectedItem.examples.map((example, idx) => (
                      <div key={idx} className="text-xs sm:text-sm text-indigo-300 leading-relaxed font-mono whitespace-pre-wrap break-words">
                        {example}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 pb-2">
                <button 
                  onClick={() => { playCutSound(); setSelectedItem(null); }}
                  className="w-full py-4 bg-indigo-500 hover:bg-indigo-600 text-white rounded-2xl font-black transition-all shadow-xl shadow-indigo-500/20 active:scale-95"
                >
                  {t('operations.gotIt')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-black text-white flex items-center gap-3">
          <i className="fas fa-calculator text-indigo-400"></i>           {t('operations.title')}
        </h2>
        <button 
          onClick={() => { playCutSound(); onBack(); }}
          className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-sm font-bold transition-colors"
        >
          {t('operations.back')}
        </button>
      </div>

      {/* Tab Selector */}
      <div className="flex gap-2 mb-6 bg-white/5 p-1 rounded-2xl border border-white/10">
        <button
          onClick={() => {
            playCutSound();
            setActiveTab('operations');
            setSearch('');
            setSelectedItem(null);
          }}
          className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-all ${
            activeTab === 'operations'
              ? 'bg-indigo-500 text-white shadow-lg'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <i className="fas fa-code mr-2"></i> {t('operations.operations')}
        </button>
        <button
          onClick={() => {
            playCutSound();
            setActiveTab('math');
            setSearch('');
            setSelectedItem(null);
          }}
          className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-all ${
            activeTab === 'math'
              ? 'bg-indigo-500 text-white shadow-lg'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <i className="fas fa-calculator mr-2"></i> {t('operations.mathConcepts')}
        </button>
      </div>

      <div className="relative mb-8">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
          <i className="fas fa-search"></i>
        </div>
        <input 
          type="text"
          placeholder={formatTranslation(t('operations.searchPlaceholder'), { type: activeTab === 'operations' ? t('operations.operations').toLowerCase() : t('operations.mathConcepts').toLowerCase() })}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-12 pr-4 py-4 bg-slate-900 border border-white/5 rounded-2xl text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500/50 transition-colors"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredData.map((item, idx) => (
          <div 
            key={idx}
            onClick={() => { playCutSound(); setSelectedItem(item); }}
            className="glass p-5 rounded-2xl space-y-2 hover:border-indigo-500/40 hover:bg-slate-800/80 transition-all cursor-pointer group active:scale-[0.98]"
          >
            <div className="flex justify-between items-start">
              <h4 className="font-bold text-slate-100 group-hover:text-white transition-colors">{item.title}</h4>
              <i className="fas fa-chevron-right text-[10px] text-slate-600 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all"></i>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-2">{item.definition}</p>
            <span className="inline-block text-[8px] font-black text-indigo-500 uppercase px-2 py-0.5 bg-indigo-500/10 rounded">
              {item.category}
            </span>
          </div>
        ))}
        {filteredData.length === 0 && (
          <div className="col-span-full py-12 text-center text-slate-500">
            <i className="fas fa-search-minus text-4xl mb-4 block opacity-20"></i>
            {formatTranslation(t('operations.noItemsFound'), { search })}
          </div>
        )}
      </div>
    </div>
  );
};