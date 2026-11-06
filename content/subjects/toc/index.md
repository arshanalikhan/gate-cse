# Theory of Computation

Finite automata and regular expressions, regular languages and the pumping lemma, context-free grammars and pushdown automata, context-free languages, Turing machines and undecidability. Typically 6–9 marks per paper, with a high share of MSQs.

```widget
type: weightage-topics
```

```widget
type: weightage-trend
```

## Syllabus (GATE 2027)

> Regular expressions and finite automata. Context-free grammars and push-down automata. Regular and context-free languages, pumping lemma. Turing machines and undecidability.

Unchanged from 2026.

## Topic checklist

```widget
type: checklist
```

## How to prepare

1. **Finite automata and regular expressions** appear in every recent paper: minimal DFA state counts, regex equivalence, NFA-to-DFA conversion.
2. **Classify languages fast:** for each standard language, know whether it is regular, DCFL, CFL, recursive or RE, and why.
3. **Memorise the closure and decision tables** ([formulae](#/subjects/toc/formulae)); MSQs combine several entries in one question.
4. **Undecidability:** Rice's theorem and the difference between properties of a language and properties of a machine.
5. **Grammars:** write CFGs for standard languages and spot ambiguity.

## Question patterns to expect

| Pattern | What to practise | Notes |
|---|---|---|
| Number of states in the minimal DFA | Construct, then minimise; count the dead state | [Finite automata](#/subjects/toc/notes?h=finite-automata) |
| Which regular expression denotes this language | Test short strings against each option | [Regular expressions](#/subjects/toc/notes?h=regular-expressions) |
| Which languages are regular / context-free | Pumping and closure arguments | [Regular languages](#/subjects/toc/notes?h=regular-languages-and-their-properties), [CFLs](#/subjects/toc/notes?h=context-free-languages-and-closure) |
| Which problems are decidable | Decision table, Rice's theorem | [Undecidability](#/subjects/toc/notes?h=undecidability) |
| Language of a given grammar or PDA | Generate short strings | [Grammars](#/subjects/toc/notes?h=context-free-grammars) |

## Go deeper

- Peter Linz, *An Introduction to Formal Languages and Automata*; Michael Sipser, *Introduction to the Theory of Computation* (decidability).
- Countability background is in [Discrete Mathematics](#/subjects/dm/notes?h=sets).
- Drill the [previous-year questions](#/subjects/toc/pyq).
