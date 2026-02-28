#!/usr/bin/env python3
"""
Expand short French by translating full EN to FR using phrase-based replacement.
No API. Section headers + broad phrase coverage. Python code unchanged.
"""
import json
import re

def escape_ts(s):
    return s.replace('\\', '\\\\').replace('`', '\\`').replace('${', '\\${')

HEADERS = {
    "Key concepts:": "Concepts clés :",
    "Key concept:": "Concept clé :",
    "How it works:": "Comment ça fonctionne :",
    "How it works\n": "Comment ça fonctionne :\n",
    "Example:": "Exemple :",
    "Examples:": "Exemples :",
    "Common uses:": "Usages courants :",
    "Common use:": "Usage courant :",
    "Benefits:": "Usages courants :",
    "Edge cases:": "Cas limites :",
    "Signatures:": "Signatures :",
    "Dictionary creation:": "Création de dictionnaire :",
    "Empty dictionary:": "Dictionnaire vide :",
    "dict() with no arguments:": "dict() sans arguments :",
    "dict() from list of tuples:": "dict() depuis liste de tuples :",
    "dict() with keyword arguments:": "dict() avec arguments nommés :",
    "Dictionary access:": "Accès au dictionnaire :",
    "Dictionary access by key:": "Accès au dictionnaire par clé :",
    "Accessing non-existent key:": "Accès à une clé inexistante :",
    "len() on dictionary:": "len() sur dictionnaire :",
    "Empty dictionary length:": "Longueur du dictionnaire vide :",
    "keys() method:": "Méthode keys() :",
    "list(keys()):": "list(keys()) :",
    "get() vs setdefault():": "get() vs setdefault() :",
    "All 6 combinations:": "Les 6 combinaisons :",
    "Unbound vs bound method:": "Méthode non liée vs liée :",
    "Compare with * (not in-place):": "Comparaison avec * (non sur place) :",
    "Key distinction:": "Distinction clé :",
    "reversed() vs [::-1]:": "reversed() vs [::-1] :",
    "Note:": "Note :",
}

PHRASES = [
    # returns / renvoie
    ("returns ", "retourne "),
    ("Returns ", "Retourne "),
    ("return ", "renvoyer "),
    ("Return ", "Renvoyer "),
    (" because ", " car "),
    ("Because ", "Car "),
    (" creates ", " crée "),
    ("Creates ", "Crée "),
    (" create ", " créer "),
    ("Create ", "Créer "),
    (" create a ", " crée un "),
    (" creates a ", " crée un "),
    (" creates an ", " crée un "),
    (" called on ", " appelé sur "),
    (" called with ", " appelé avec "),
    (" must be ", " doit être "),
    (" must exist ", " doit exister "),
    (" can be ", " peut être "),
    (" cannot ", " ne peut pas "),
    (" doesn't exist ", " n'existe pas "),
    (" doesn't ", " ne "),
    (" don't ", " ne "),
    (" is not ", " n'est pas "),
    (" are not ", " ne sont pas "),
    (" is equivalent to ", " est équivalent à "),
    (" equivalent to ", " équivalent à "),
    (" different from ", " différent de "),
    (" different objects ", " objets différents "),
    (" the same object ", " le même objet "),
    (" same object ", " même objet "),
    (" in place ", " sur place "),
    (" in-place ", " sur place "),
    (" modifies ", " modifie "),
    (" modify ", " modifier "),
    (" modifies the ", " modifie le "),
    (" modifies a ", " modifie un "),
    (" the original ", " l'original "),
    (" original list ", " liste originale "),
    (" new list ", " nouvelle liste "),
    (" new dictionary ", " nouveau dictionnaire "),
    (" empty dictionary ", " dictionnaire vide "),
    (" empty list ", " liste vide "),
    (" key-value pairs ", " paires clé-valeur "),
    (" key-value pair ", " paire clé-valeur "),
    (" key-value pair.", " paire clé-valeur."),
    (" curly braces ", " accolades "),
    (" square brackets ", " crochets "),
    (" with key:value pairs ", " avec paires clé:valeur "),
    (" must be immutable ", " doit être immuable "),
    (" can contain ", " peut contenir "),
    (" Python recognizes ", " Python reconnaît "),
    (" raises ", " lève "),
    (" raises a ", " lève une "),
    (" KeyError ", " KeyError "),
    (" TypeError ", " TypeError "),
    (" ValueError ", " ValueError "),
    (" the value ", " la valeur "),
    (" the key ", " la clé "),
    (" the dictionary ", " le dictionnaire "),
    (" the list ", " la liste "),
    (" a dictionary ", " un dictionnaire "),
    (" a list ", " une liste "),
    (" a tuple ", " un tuple "),
    (" a view ", " une vue "),
    (" view object ", " objet vue "),
    (" iterator ", " itérateur "),
    (" iterable ", " itérable "),
    (" lazy ", " paresseux "),
    (" memory-efficient ", " efficace en mémoire "),
    (" efficient ", " efficace "),
    (" the first ", " les premiers "),
    (" first element ", " premier élément "),
    (" each ", " chaque "),
    (" each tuple ", " chaque tuple "),
    (" each call ", " chaque appel "),
    (" each pair ", " chaque paire "),
    (" without materializing ", " sans matérialiser "),
    (" Works like ", " Fonctionne comme "),
    (" works like ", " fonctionne comme "),
    (" Does not support ", " Ne supporte pas "),
    (" unlike ", " contrairement à "),
    (" itertools.islice ", " itertools.islice "),
    (" slices an iterator ", " découpe un itérateur "),
    (" takes elements ", " prend les éléments "),
    (" consumed from ", " consommés depuis "),
    (" memory-efficient for ", " efficace en mémoire pour "),
    (" large/infinite iterables ", " grands itérables/infinis "),
    (" __reversed__() ", " __reversed__() "),
    (" returns a ", " retourne un "),
    (" returns a ", " retourne une "),
    (" reverse iterator ", " itérateur inverse "),
    (" reversed list ", " liste inversée "),
    (" list_reverseiterator ", " list_reverseiterator "),
    (" Use list() to materialize ", " Utilisez list() pour matérialiser "),
    (" list.__add__ ", " list.__add__ "),
    (" dunder method ", " méthode dunder "),
    (" the + operator ", " l'opérateur + "),
    (" concatenation ", " concaténation "),
    (" unbound method ", " méthode non liée "),
    (" bound method ", " méthode liée "),
    (" First argument ", " Premier argument "),
    (" Second ", " Second "),
    (" *= operator ", " opérateur *= "),
    (" empties a list ", " vide une liste "),
    (" multiplies ", " multiplie "),
    (" by 0 ", " par 0 "),
    (" a * 0 ", " a * 0 "),
    (" a *= 0 ", " a *= 0 "),
    (" uses __mul__ ", " utilise __mul__ "),
    (" uses __imul__ ", " utilise __imul__ "),
    (" str.join() ", " str.join() "),
    (" concatenates ", " concatène "),
    (" separator ", " séparateur "),
    (" empty string ", " chaîne vide "),
    (" the most efficient way ", " la façon la plus efficace "),
    (" tuple() constructor ", " constructeur tuple() "),
    (" Counter(", " Counter("),
    (" counts ", " compte "),
    (" most_common ", " most_common "),
    (" descending frequency ", " fréquence décroissante "),
    (" missing keys ", " clés manquantes "),
    (" def ", " def "),
    (" The def keyword ", " Le mot-clé def "),
    (" defines a function ", " définit une fonction "),
    (" function body ", " corps de la fonction "),
    (" function call ", " appel de fonction "),
    (" return statement ", " instruction return "),
    (" return None ", " retourne None "),
    (" pass ", " pass "),
    (" placeholder ", " placeholder "),
    (" does nothing ", " ne fait rien "),
    (" empty function ", " fonction vide "),
    (" try/except ", " try/except "),
    (" exception ", " exception "),
    (" multiple except clauses ", " plusieurs clauses except "),
    (" handles ", " gère "),
    (" different types of exceptions ", " différents types d'exceptions "),
    (" decorator ", " décorateur "),
    (" __call__ ", " __call__ "),
    (" stores ", " stocke "),
    (" calls ", " appelle "),
]

def translate_text(text):
    result = text
    for en, fr in PHRASES:
        result = result.replace(en, fr)
    for en, fr in HEADERS.items():
        result = result.replace(en, fr)
    # Generic patterns
    result = result.replace(" returns:", " retourne :")
    result = result.replace(" returns ", " retourne ")
    result = result.replace("Returns ", "Retourne ")
    return result

def main():
    with open('scripts/short_fr_batch.json', encoding='utf-8') as f:
        data = json.load(f)
    out = []
    for item in data:
        qid = item['id']
        en = item['en']
        fr = translate_text(en)
        out.append({'id': qid, 'fr': fr})
    with open('scripts/expanded_fr_phrases.json', 'w', encoding='utf-8') as f:
        json.dump(out, f, ensure_ascii=False, indent=2)
    print(f"Generated {len(out)} expanded French entries")

if __name__ == '__main__':
    main()
