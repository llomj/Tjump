// --- LEVEL 0: EGG (Literals, values, first steps) - 300 basic questions ---
// Simplest tier: literals, type(), and very simple expressions.

const mk = (q: string, o: string[], c: number, e: string, de?: string) => (_i: number) => ({ q, o, c, e, de });

export const level0Patterns: ((i: number) => { q: string; o: string[]; c: number; e: string; de?: string })[] = [
  // 1-50: type() of literals
  mk("What is type(0)?", ["<class 'int'>", "<class 'float'>", "<class 'str'>", "None"], 0, "0 is an integer.", "Integers are whole numbers. type(0) returns <class 'int'>."),
  mk("What is type(1)?", ["<class 'int'>", "<class 'float'>", "<class 'str'>", "None"], 0, "1 is an integer.", "type(1) returns <class 'int'>."),
  mk("What is type(-5)?", ["<class 'int'>", "<class 'float'>", "<class 'str'>", "None"], 0, "Negative whole numbers are int.", "type(-5) returns <class 'int'>."),
  mk("What is type(3.0)?", ["<class 'float'>", "<class 'int'>", "<class 'str'>", "None"], 0, "Numbers with a decimal point are float.", "type(3.0) returns <class 'float'>."),
  mk("What is type(0.0)?", ["<class 'float'>", "<class 'int'>", "<class 'str'>", "None"], 0, "0.0 is a float.", "type(0.0) returns <class 'float'>."),
  mk("What is type('')?", ["<class 'str'>", "<class 'list'>", "<class 'NoneType'>", "None"], 0, "Empty quotes make a string.", "type('') returns <class 'str'>. The empty string is still a string."),
  mk("What is type('a')?", ["<class 'str'>", "<class 'int'>", "<class 'char'>", "None"], 0, "Single characters are strings in Python.", "type('a') returns <class 'str'>. Python has no separate char type."),
  mk("What is type(True)?", ["<class 'bool'>", "<class 'int'>", "<class 'str'>", "None"], 0, "True is a boolean.", "type(True) returns <class 'bool'>."),
  mk("What is type(False)?", ["<class 'bool'>", "<class 'int'>", "<class 'str'>", "None"], 0, "False is a boolean.", "type(False) returns <class 'bool'>."),
  mk("What is type(None)?", ["<class 'NoneType'>", "<class 'null'>", "<class 'str'>", "None"], 0, "None has type NoneType.", "type(None) returns <class 'NoneType'>."),
  mk("What is type([])?", ["<class 'list'>", "<class 'tuple'>", "<class 'dict'>", "None"], 0, "Square brackets create a list.", "type([]) returns <class 'list'>."),
  mk("What is type(())?", ["<class 'tuple'>", "<class 'list'>", "<class 'dict'>", "None"], 0, "Parentheses create a tuple.", "type(()) returns <class 'tuple'>."),
  mk("What is type({})?", ["<class 'dict'>", "<class 'set'>", "<class 'list'>", "None"], 0, "Curly braces create a dict.", "type({}) returns <class 'dict'>."),
  mk("What is type(set())?", ["<class 'set'>", "<class 'dict'>", "<class 'list'>", "None"], 0, "set() creates an empty set.", "type(set()) returns <class 'set'>."),
  mk("What is type(42)?", ["<class 'int'>", "<class 'float'>", "<class 'str'>", "None"], 0, "42 is an integer.", "type(42) returns <class 'int'>."),
  mk("What is type(100)?", ["<class 'int'>", "<class 'float'>", "<class 'str'>", "None"], 0, "100 is an integer.", "type(100) returns <class 'int'>."),
  mk("What is type(1.5)?", ["<class 'float'>", "<class 'int'>", "<class 'str'>", "None"], 0, "1.5 is a float.", "type(1.5) returns <class 'float'>."),
  mk("What is type('hello')?", ["<class 'str'>", "<class 'int'>", "<class 'list'>", "None"], 0, "Text in quotes is a string.", "type('hello') returns <class 'str'>."),
  mk("What is type([1])?", ["<class 'list'>", "<class 'tuple'>", "<class 'int'>", "None"], 0, "[1] is a list with one item.", "type([1]) returns <class 'list'>."),
  mk("What is type((1,))?", ["<class 'tuple'>", "<class 'list'>", "<class 'int'>", "None"], 0, "(1,) is a tuple. The comma is required.", "type((1,)) returns <class 'tuple'>."),
  mk("What is type({1: 2})?", ["<class 'dict'>", "<class 'set'>", "<class 'list'>", "None"], 0, "{1: 2} is a dictionary.", "type({1: 2}) returns <class 'dict'>."),
  mk("What is type({1, 2})?", ["<class 'set'>", "<class 'dict'>", "<class 'list'>", "None"], 0, "{1, 2} is a set.", "type({1, 2}) returns <class 'set'>."),
  mk("What is type(b'x')?", ["<class 'bytes'>", "<class 'str'>", "<class 'list'>", "None"], 0, "b'x' is bytes.", "type(b'x') returns <class 'bytes'>."),
  mk("What is type(2)?", ["<class 'int'>", "<class 'float'>", "<class 'str'>", "None"], 0, "2 is an integer.", "type(2) returns <class 'int'>."),
  mk("What is type(10)?", ["<class 'int'>", "<class 'float'>", "<class 'str'>", "None"], 0, "10 is an integer.", "type(10) returns <class 'int'>."),
  mk("What is type(-1)?", ["<class 'int'>", "<class 'float'>", "<class 'str'>", "None"], 0, "Negative integers are int.", "type(-1) returns <class 'int'>."),
  mk("What is type(0.5)?", ["<class 'float'>", "<class 'int'>", "<class 'str'>", "None"], 0, "0.5 is a float.", "type(0.5) returns <class 'float'>."),
  mk("What is type(2.5)?", ["<class 'float'>", "<class 'int'>", "<class 'str'>", "None"], 0, "2.5 is a float.", "type(2.5) returns <class 'float'>."),
  mk("What is type('x')?", ["<class 'str'>", "<class 'int'>", "<class 'char'>", "None"], 0, "Single-character string.", "type('x') returns <class 'str'>."),
  mk("What is type(\"\")?", ["<class 'str'>", "<class 'list'>", "<class 'NoneType'>", "None"], 0, "Double quotes also make a string.", "type(\"\") returns <class 'str'>."),
  mk("What is type([0])?", ["<class 'list'>", "<class 'tuple'>", "<class 'int'>", "None"], 0, "[0] is a list.", "type([0]) returns <class 'list'>."),
  mk("What is type([1, 2])?", ["<class 'list'>", "<class 'tuple'>", "<class 'dict'>", "None"], 0, "[1, 2] is a list.", "type([1, 2]) returns <class 'list'>."),
  mk("What is type((1, 2))?", ["<class 'tuple'>", "<class 'list'>", "<class 'dict'>", "None"], 0, "(1, 2) is a tuple.", "type((1, 2)) returns <class 'tuple'>."),
  mk("What is type({'a': 1})?", ["<class 'dict'>", "<class 'set'>", "<class 'list'>", "None"], 0, "{'a': 1} is a dict.", "type({'a': 1}) returns <class 'dict'>."),
  mk("What is type({0})?", ["<class 'set'>", "<class 'dict'>", "<class 'list'>", "None"], 0, "{0} is a set with one element.", "type({0}) returns <class 'set'>."),
  mk("What is type(7)?", ["<class 'int'>", "<class 'float'>", "<class 'str'>", "None"], 0, "7 is an integer.", "type(7) returns <class 'int'>."),
  mk("What is type(99)?", ["<class 'int'>", "<class 'float'>", "<class 'str'>", "None"], 0, "99 is an integer.", "type(99) returns <class 'int'>."),
  mk("What is type(-10)?", ["<class 'int'>", "<class 'float'>", "<class 'str'>", "None"], 0, "Negative integers are int.", "type(-10) returns <class 'int'>."),
  mk("What is type(1.0)?", ["<class 'float'>", "<class 'int'>", "<class 'str'>", "None"], 0, "1.0 has a decimal point, so float.", "type(1.0) returns <class 'float'>."),
  mk("What is type(10.0)?", ["<class 'float'>", "<class 'int'>", "<class 'str'>", "None"], 0, "10.0 is a float.", "type(10.0) returns <class 'float'>."),
  mk("What is type('0')?", ["<class 'str'>", "<class 'int'>", "<class 'float'>", "None"], 0, "'0' in quotes is a string.", "type('0') returns <class 'str'>. Not the integer 0."),
  mk("What is type('1')?", ["<class 'str'>", "<class 'int'>", "<class 'float'>", "None"], 0, "'1' is a string.", "type('1') returns <class 'str'>."),
  mk("What is type([])?", ["<class 'list'>", "<class 'tuple'>", "<class 'dict'>", "None"], 0, "[] is the empty list.", "type([]) returns <class 'list'>."),
  mk("What is type(())?", ["<class 'tuple'>", "<class 'list'>", "<class 'NoneType'>", "None"], 0, "() is the empty tuple.", "type(()) returns <class 'tuple'>."),
  mk("What is type({})?", ["<class 'dict'>", "<class 'set'>", "<class 'list'>", "None"], 0, "{} is the empty dictionary.", "type({}) returns <class 'dict'>. Empty set is set()."),
  mk("What is type(True)?", ["<class 'bool'>", "<class 'int'>", "<class 'str'>", "None"], 0, "True is bool.", "type(True) returns <class 'bool'>."),
  mk("What is type(False)?", ["<class 'bool'>", "<class 'int'>", "<class 'str'>", "None"], 0, "False is bool.", "type(False) returns <class 'bool'>."),
  mk("What is type(None)?", ["<class 'NoneType'>", "<class 'bool'>", "<class 'str'>", "None"], 0, "None is NoneType.", "type(None) returns <class 'NoneType'>."),
  mk("What is type(15)?", ["<class 'int'>", "<class 'float'>", "<class 'str'>", "None"], 0, "15 is an integer.", "type(15) returns <class 'int'>."),
  mk("What is type(3)?", ["<class 'int'>", "<class 'float'>", "<class 'str'>", "None"], 0, "3 is an integer.", "type(3) returns <class 'int'>."),
  mk("What is type(4.0)?", ["<class 'float'>", "<class 'int'>", "<class 'str'>", "None"], 0, "4.0 is a float.", "type(4.0) returns <class 'float'>."),
  mk("What is type('hi')?", ["<class 'str'>", "<class 'list'>", "<class 'int'>", "None"], 0, "'hi' is a string.", "type('hi') returns <class 'str'>."),
  mk("What is type([1, 2, 3])?", ["<class 'list'>", "<class 'tuple'>", "<class 'dict'>", "None"], 0, "[1,2,3] is a list.", "type([1, 2, 3]) returns <class 'list'>."),
  mk("What is type((0,))?", ["<class 'tuple'>", "<class 'list'>", "<class 'int'>", "None"], 0, "(0,) is a one-element tuple.", "type((0,)) returns <class 'tuple'>."),
  mk("What is type(range(3))?", ["<class 'range'>", "<class 'list'>", "<class 'tuple'>", "None"], 0, "range(3) is a range object.", "type(range(3)) returns <class 'range'>."),
  mk("What is type(...)?", ["<class 'ellipsis'>", "<class 'NoneType'>", "<class 'str'>", "None"], 0, "... is the ellipsis literal.", "type(...) returns <class 'ellipsis'> (Ellipsis)."),
];

// 51-150: simple literal values and very basic expressions
Array.from({ length: 100 }, (_, i) => {
  const idx = i + 51;
  if (idx <= 70) {
    const a = [1, 2, 3, 5, 4, 6, 7, 8, 9, 10][i % 10];
    const b = [1, 1, 2, 2, 3, 3, 0, 1, 2, 0][i % 10];
    const sum = a + b;
    return mk(`What is ${a} + ${b}?`, [String(sum), String(sum - 1), String(sum + 1), "Error"], 0, `${a} + ${b} = ${sum}.`, `Addition: ${a} + ${b} = ${sum}.`);
  }
  if (idx <= 90) {
    const vals = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const v = vals[i % 10];
    return mk(`What is ${v} * 1?`, [String(v), String(v + 1), "0", "Error"], 0, "Multiplying by 1 gives the same number.", `${v} * 1 = ${v}.`);
  }
  if (idx <= 110) {
    const vals = [0, 1, 2, 3, 4, 5];
    const v = vals[i % 6];
    return mk(`What is ${v} * 0?`, ["0", "1", String(v), "Error"], 0, "Any number times 0 is 0.", `${v} * 0 = 0.`);
  }
  const t = ["int", "float", "str", "bool", "list"][i % 5];
  const cls = t === "bool" ? "bool" : t === "list" ? "list" : t;
  return mk(`What is type of a ${t}?`, [`<class '${cls}'>`, "<class 'NoneType'>", "Error", "None"], 0, `A ${t} has type ${cls}.`, `type() of a ${t} value returns <class '${cls}'>.`);
}).forEach(f => level0Patterns.push(f));

// Fill to 300 with more variety (151-300)
const more: Array<[string, string[], number, string]> = [
  ["What is 1 + 1?", ["2", "1", "0", "11"], 0, "1 + 1 = 2."],
  ["What is 2 * 3?", ["6", "5", "8", "1"], 0, "2 * 3 = 6."],
  ["What is 10 - 4?", ["6", "5", "14", "40"], 0, "10 - 4 = 6."],
  ["What is 8 // 2?", ["4", "4.0", "3", "Error"], 0, "Integer division: 8 // 2 = 4."],
  ["What is 9 % 4?", ["1", "2", "3", "0"], 0, "Remainder: 9 % 4 = 1."],
  ["What is 2 ** 3?", ["8", "6", "9", "5"], 0, "2 ** 3 = 8 (2 to the power of 3)."],
  ["What is len('')?", ["0", "1", "None", "Error"], 0, "Empty string has length 0."],
  ["What is len('a')?", ["1", "0", "2", "Error"], 0, "One character has length 1."],
  ["What is len('ab')?", ["2", "1", "3", "Error"], 0, "Two characters have length 2."],
  ["What is len([])?", ["0", "1", "None", "Error"], 0, "Empty list has length 0."],
  ["What is len([1])?", ["1", "0", "2", "Error"], 0, "List with one item has length 1."],
  ["What is len([1, 2])?", ["2", "1", "3", "Error"], 0, "List with two items has length 2."],
  ["What is bool(0)?", ["False", "True", "0", "Error"], 0, "0 is falsy."],
  ["What is bool(1)?", ["True", "False", "1", "Error"], 0, "Non-zero numbers are truthy."],
  ["What is bool('')?", ["False", "True", "''", "Error"], 0, "Empty string is falsy."],
  ["What is bool('x')?", ["True", "False", "1", "Error"], 0, "Non-empty string is truthy."],
  ["What is bool([])?", ["False", "True", "[]", "Error"], 0, "Empty list is falsy."],
  ["What is bool([1])?", ["True", "False", "1", "Error"], 0, "Non-empty list is truthy."],
  ["What is int(3.7)?", ["3", "4", "3.7", "Error"], 0, "int() truncates toward zero."],
  ["What is float(2)?", ["2.0", "2", "2.00", "Error"], 0, "float(2) is 2.0."],
  ["What is str(5)?", ["'5'", "5", "5.0", "Error"], 0, "str(5) converts to string '5'."],
  ["What is 5 + 5?", ["10", "55", "5", "Error"], 0, "5 + 5 = 10."],
  ["What is 3 * 4?", ["12", "7", "81", "Error"], 0, "3 * 4 = 12."],
  ["What is 20 // 5?", ["4", "4.0", "5", "Error"], 0, "20 // 5 = 4."],
  ["What is 7 % 2?", ["1", "3", "2", "0"], 0, "7 % 2 = 1 (remainder)."],
  ["What is 2 ** 4?", ["16", "8", "6", "Error"], 0, "2 ** 4 = 16."],
  ["What is -(-3)?", ["3", "-3", "0", "Error"], 0, "Negative of -3 is 3."],
  ["What is abs(-4)?", ["4", "-4", "0", "Error"], 0, "abs(-4) = 4."],
  ["What is min(1, 2)?", ["1", "2", "0", "Error"], 0, "min(1, 2) = 1."],
  ["What is max(1, 2)?", ["2", "1", "0", "Error"], 0, "max(1, 2) = 2."],
  ["What is round(3.2)?", ["3", "3.0", "4", "Error"], 0, "round(3.2) = 3."],
  ["What is round(3.8)?", ["4", "3", "4.0", "Error"], 0, "round(3.8) = 4."],
  ["What is 'a' in 'abc'?", ["True", "False", "1", "Error"], 0, "'a' is in 'abc'."],
  ["What is 'd' in 'abc'?", ["False", "True", "0", "Error"], 0, "'d' is not in 'abc'."],
  ["What is 1 in [1, 2]?", ["True", "False", "1", "Error"], 0, "1 is in the list."],
  ["What is 3 in [1, 2]?", ["False", "True", "0", "Error"], 0, "3 is not in the list."],
  ["What is 2 == 2?", ["True", "False", "1", "Error"], 0, "2 equals 2."],
  ["What is 2 == 3?", ["False", "True", "0", "Error"], 0, "2 does not equal 3."],
  ["What is 2 != 3?", ["True", "False", "1", "Error"], 0, "2 is not equal to 3."],
  ["What is 2 < 3?", ["True", "False", "1", "Error"], 0, "2 is less than 3."],
  ["What is 3 > 2?", ["True", "False", "1", "Error"], 0, "3 is greater than 2."],
  ["What is 2 <= 2?", ["True", "False", "1", "Error"], 0, "2 is less than or equal to 2."],
  ["What is 3 >= 3?", ["True", "False", "1", "Error"], 0, "3 is greater than or equal to 3."],
  ["What is not False?", ["True", "False", "None", "Error"], 0, "not False is True."],
  ["What is not True?", ["False", "True", "None", "Error"], 0, "not True is False."],
  ["What is True and True?", ["True", "False", "None", "Error"], 0, "Both true."],
  ["What is True and False?", ["False", "True", "None", "Error"], 0, "And is false if one is false."],
  ["What is True or False?", ["True", "False", "None", "Error"], 0, "Or is true if one is true."],
  ["What is False or False?", ["False", "True", "None", "Error"], 0, "Both false."],
  ["What is 0 == False?", ["True", "False", "None", "Error"], 0, "In Python, 0 == False is True (value equality)."],
  ["What is 1 == True?", ["True", "False", "None", "Error"], 0, "1 == True is True."],
  ["What is '' == False?", ["False", "True", "None", "Error"], 0, "Empty string is not equal to False."],
  ["What is None is None?", ["True", "False", "None", "Error"], 0, "None is the only None."],
  ["What is 1 + 2 * 3?", ["7", "9", "5", "Error"], 0, "Multiplication before addition: 2*3=6, 1+6=7."],
  ["What is (1 + 2) * 3?", ["9", "7", "6", "Error"], 0, "Parentheses first: 1+2=3, 3*3=9."],
  ["What is 10 / 2?", ["5.0", "5", "5.00", "Error"], 0, "Division in Python 3 gives float: 5.0."],
  ["What is 10 // 3?", ["3", "3.0", "4", "Error"], 0, "Integer division: 10 // 3 = 3."],
  ["What is 10 % 3?", ["1", "0", "3", "Error"], 0, "Remainder: 10 % 3 = 1."],
  ["What is 'a' + 'b'?", ["'ab'", "'a b'", "'ba'", "Error"], 0, "String concatenation: 'a' + 'b' = 'ab'."],
  ["What is 'x' * 3?", ["'xxx'", "'x x x'", "3", "Error"], 0, "String repetition: 'x' * 3 = 'xxx'."],
  ["What is [1] + [2]?", ["[1, 2]", "[3]", "[2, 1]", "Error"], 0, "List concatenation: [1] + [2] = [1, 2]."],
  ["What is (1,) + (2,)?", ["(1, 2)", "(3)", "(2, 1)", "Error"], 0, "Tuple concatenation: (1,) + (2,) = (1, 2)."],
  ["What is 'hi'[0]?", ["'h'", "'i'", "0", "Error"], 0, "First character: 'hi'[0] = 'h'."],
  ["What is 'hi'[1]?", ["'i'", "'h'", "1", "Error"], 0, "Second character: 'hi'[1] = 'i'."],
  ["What is 'hi'[-1]?", ["'i'", "'h'", "-1", "Error"], 0, "Last character: 'hi'[-1] = 'i'."],
  ["What is [10, 20][0]?", ["10", "20", "0", "Error"], 0, "First element: [10, 20][0] = 10."],
  ["What is [10, 20][1]?", ["20", "10", "1", "Error"], 0, "Second element: [10, 20][1] = 20."],
  ["What is [5, 6, 7][-1]?", ["7", "5", "6", "Error"], 0, "Last element: [5,6,7][-1] = 7."],
  ["What is 'abc'[1:2]?", ["'b'", "'ab'", "'bc'", "Error"], 0, "Slice: 'abc'[1:2] = 'b'."],
  ["What is 'abc'[:2]?", ["'ab'", "'abc'", "'a'", "Error"], 0, "From start: 'abc'[:2] = 'ab'."],
  ["What is 'abc'[1:]?", ["'bc'", "'ab'", "'abc'", "Error"], 0, "To end: 'abc'[1:] = 'bc'."],
  ["What is list('ab')?", ["['a', 'b']", "'ab'", "['ab']", "Error"], 0, "list('ab') = ['a', 'b']."],
  ["What is tuple([1, 2])?", ["(1, 2)", "[1, 2]", "(2, 1)", "Error"], 0, "tuple([1, 2]) = (1, 2)."],
  ["What is set([1, 1, 2])?", ["{1, 2}", "[1, 2]", "{1, 1, 2}", "Error"], 0, "set removes duplicates: {1, 2}."],
  ["What is dict()?", ["{}", "[]", "None", "Error"], 0, "dict() creates an empty dict."],
  ["What is list()?", ["[]", "()", "None", "Error"], 0, "list() creates an empty list."],
  ["What is str(10)?", ["'10'", "10", "10.0", "Error"], 0, "str(10) = '10'."],
  ["What is int('5')?", ["5", "'5'", "5.0", "Error"], 0, "int('5') = 5."],
  ["What is float('2.5')?", ["2.5", "2", "'2.5'", "Error"], 0, "float('2.5') = 2.5."],
  ["What is 4 ** 0.5?", ["2.0", "2", "0.5", "Error"], 0, "Square root of 4 is 2.0."],
  ["What is 0 ** 5?", ["0", "1", "5", "Error"], 0, "0 to any positive power is 0."],
  ["What is 5 ** 0?", ["1", "0", "5", "Error"], 0, "Any number to power 0 is 1."],
  ["What is 2 < 5?", ["True", "False", "1", "Error"], 0, "2 is less than 5."],
  ["What is 5 > 2?", ["True", "False", "1", "Error"], 0, "5 is greater than 2."],
  ["What is 3 <= 3?", ["True", "False", "1", "Error"], 0, "3 <= 3 is True."],
  ["What is 4 >= 5?", ["False", "True", "0", "Error"], 0, "4 >= 5 is False."],
  ["What is 1 != 1?", ["False", "True", "0", "Error"], 0, "1 equals 1, so 1 != 1 is False."],
  ["What is 0 or 5?", ["5", "0", "True", "Error"], 0, "0 or 5: first falsy, so 5."],
  ["What is 3 or 0?", ["3", "0", "True", "Error"], 0, "3 or 0: first truthy, so 3."],
  ["What is 0 and 5?", ["0", "5", "False", "Error"], 0, "0 and 5: short-circuit to 0."],
  ["What is 3 and 4?", ["4", "3", "True", "Error"], 0, "3 and 4: both truthy, returns last: 4."],
  ["What is len((1, 2))?", ["2", "1", "3", "Error"], 0, "Tuple of two elements has length 2."],
  ["What is len({1, 2})?", ["2", "1", "3", "Error"], 0, "Set of two elements has length 2."],
  ["What is len({1: 2})?", ["1", "2", "0", "Error"], 0, "Dict with one key has length 1."],
  ["What is sum([1, 2, 3])?", ["6", "5", "7", "Error"], 0, "sum([1, 2, 3]) = 6."],
  ["What is sum([])?", ["0", "None", "Error", "1"], 0, "sum([]) = 0."],
  ["What is min(3, 1, 2)?", ["1", "2", "3", "Error"], 0, "min(3, 1, 2) = 1."],
  ["What is max(3, 1, 2)?", ["3", "2", "1", "Error"], 0, "max(3, 1, 2) = 3."],
  ["What is abs(5)?", ["5", "-5", "0", "Error"], 0, "abs(5) = 5."],
  ["What is pow(2, 3)?", ["8", "6", "9", "Error"], 0, "pow(2, 3) = 8."],
  ["What is divmod(7, 2)?", ["(3, 1)", "(3.5, 0)", "(4, 1)", "Error"], 0, "divmod(7, 2) = (3, 1): quotient and remainder."],
  ["What is 3 in (1, 2, 3)?", ["True", "False", "1", "Error"], 0, "3 is in the tuple."],
  ["What is 0 not in [1, 2]?", ["True", "False", "1", "Error"], 0, "0 is not in [1, 2]."],
  ["What is 'ab' == 'ab'?", ["True", "False", "1", "Error"], 0, "Equal strings."],
  ["What is [1] == [1]?", ["True", "False", "1", "Error"], 0, "Equal lists (by value)."],
  ["What is (1,) == (1,)?", ["True", "False", "1", "Error"], 0, "Equal tuples."],
  ["What is type(2 + 2)?", ["<class 'int'>", "<class 'float'>", "<class 'str'>", "None"], 0, "2 + 2 is 4, an int."],
  ["What is type(2 + 2.0)?", ["<class 'float'>", "<class 'int'>", "<class 'str'>", "None"], 0, "int + float gives float."],
  ["What is type(2.0 + 2.0)?", ["<class 'float'>", "<class 'int'>", "<class 'str'>", "None"], 0, "float + float is float."],
  ["What is type('a' * 2)?", ["<class 'str'>", "<class 'int'>", "<class 'list'>", "None"], 0, "'a' * 2 = 'aa', a string."],
  ["What is type([1] * 2)?", ["<class 'list'>", "<class 'tuple'>", "<class 'int'>", "None"], 0, "[1] * 2 = [1, 1], a list."],
  ["What is type(True + True)?", ["<class 'int'>", "<class 'bool'>", "<class 'str'>", "None"], 0, "True + True = 2 (bool is subclass of int)."],
  ["What is type(len(''))?", ["<class 'int'>", "<class 'float'>", "<class 'str'>", "None"], 0, "len() returns an integer."],
  ["What is type(3.14)?", ["<class 'float'>", "<class 'int'>", "<class 'str'>", "None"], 0, "3.14 is a float."],
  ["What is type('3.14')?", ["<class 'str'>", "<class 'float'>", "<class 'int'>", "None"], 0, "'3.14' is a string."],
  ["What is type(0)?", ["<class 'int'>", "<class 'float'>", "<class 'bool'>", "None"], 0, "0 is an int."],
  ["What is type(1)?", ["<class 'int'>", "<class 'float'>", "<class 'bool'>", "None"], 0, "1 is an int."],
];
more.forEach(([q, o, c, e]) => level0Patterns.push(mk(q, o, c, e)));

// Pad to exactly 300
while (level0Patterns.length < 300) {
  const i = level0Patterns.length;
  const a = (i % 10) + 1;
  const b = (i % 7) + 1;
  level0Patterns.push(mk(
    `What is ${a} + ${b}?`,
    [String(a + b), String(a + b - 1), String(a + b + 1), "Error"],
    0,
    `${a} + ${b} = ${a + b}.`
  ));
}
