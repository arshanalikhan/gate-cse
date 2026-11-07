# Theory of Computation

Finite automata and regular expressions, regular languages and the pumping lemma, context-free grammars and pushdown automata, context-free languages, Turing machines and undecidability. Typically 6–9 marks per paper, with a high share of MSQs.

<!-- plan:start -->
## Battle plan

Expected **7.4 marks** per paper (6–9 across the 10 papers of 2021–26) · default budget **20 hours** · weeks 7–8 of the [13-week plan](#/strategy?h=the-13-week-plan).

| Priority | Topic | Last 10 papers | Learn by | Study, then practise |
|---|---|---|---|---|
| **A** | Finite Automata & Regular Expressions | 27 marks · 10 papers | Solving | [Finite automata](#/subjects/toc/notes?h=finite-automata) · [Regular expressions](#/subjects/toc/notes?h=regular-expressions) → [34 questions](#/subjects/toc/pyq?topic=fa&years=pre2024) |
| **A** | CFGs & Pushdown Automata | 15 marks · 7 papers | Solving | [Context-free grammars](#/subjects/toc/notes?h=context-free-grammars) · [Pushdown automata](#/subjects/toc/notes?h=pushdown-automata) → [10 questions](#/subjects/toc/pyq?topic=cfg&years=pre2024) |
| **A** | Context-Free Languages & Closure | 12 marks · 7 papers | Both | [Context-free languages and closure](#/subjects/toc/notes?h=context-free-languages-and-closure) → [21 questions](#/subjects/toc/pyq?topic=cfl&years=pre2024) |
| **A** | Regular Languages & Properties | 12 marks · 6 papers | Both | [Regular languages and their properties](#/subjects/toc/notes?h=regular-languages-and-their-properties) → [18 questions](#/subjects/toc/pyq?topic=reg&years=pre2024) |
| **B** | Turing Machines & Decidability | 8 marks · 4 papers | Recall | [Turing machines](#/subjects/toc/notes?h=turing-machines) · [Undecidability](#/subjects/toc/notes?h=undecidability) → [29 questions](#/subjects/toc/pyq?topic=tm&years=pre2024) |

**A**: master it and solve all its 2007–2023 questions. **B**: learn the method, then solve its questions. **C**: read once and keep its recall cards; solve its questions only if time is left. Keep the 2024–2026 papers unseen: they are your full-length mocks.

**How to study it**

- Automata (27 marks, every paper) is pure construction: build the DFA, minimise it, count the dead state.
- Closure and decidability MSQs look like theory but follow from a few rules. Learn the rules in the notes, then rebuild the tables from them instead of memorising cells.
<!-- plan:end -->

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
