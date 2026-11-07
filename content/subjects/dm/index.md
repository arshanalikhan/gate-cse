# Discrete Mathematics

Propositional and first-order logic, sets, relations and functions, partial orders and lattices, groups, graph theory, and combinatorics with recurrences and generating functions. Officially part of Engineering Mathematics; in practice 3–15 marks per paper, the widest swing of any subject.

<!-- plan:start -->
## Battle plan

Expected **7.4 marks** per paper (3–15 across the 10 papers of 2021–26) · default budget **24 hours** · weeks 6–7 of the [13-week plan](#/strategy?h=the-13-week-plan).

| Priority | Topic | Last 10 papers | Learn by | Study, then practise |
|---|---|---|---|---|
| **A** | Graph Theory | 30 marks · 7 papers | Both | [Graph theory](#/subjects/dm/notes?h=graph-theory) → [38 questions](#/subjects/dm/pyq?topic=graph&years=pre2024) |
| **A** | Groups & Algebraic Structures | 11 marks · 6 papers | Solving | [Groups and algebraic structures](#/subjects/dm/notes?h=groups-and-algebraic-structures) → [13 questions](#/subjects/dm/pyq?topic=group&years=pre2024) |
| **B** | Combinatorics & Counting | 8 marks · 6 papers | Solving | [Combinatorics and counting](#/subjects/dm/notes?h=combinatorics-and-counting) → [21 questions](#/subjects/dm/pyq?topic=comb&years=pre2024) |
| **B** | Recurrences & Generating Functions | 6 marks · 3 papers | Solving | [Recurrences and generating functions](#/subjects/dm/notes?h=recurrences-and-generating-functions) → [12 questions](#/subjects/dm/pyq?topic=recur&years=pre2024) |
| **B** | First-Order (Predicate) Logic | 5 marks · 4 papers | Solving | [First-order logic](#/subjects/dm/notes?h=first-order-logic) → [16 questions](#/subjects/dm/pyq?topic=fol&years=pre2024) |
| **B** | Relations | 5 marks · 3 papers | Solving | [Relations](#/subjects/dm/notes?h=relations) → [11 questions](#/subjects/dm/pyq?topic=rel&years=pre2024) |
| **B** | Functions | 3 marks · 3 papers | Solving | [Functions](#/subjects/dm/notes?h=functions) → [4 questions](#/subjects/dm/pyq?topic=func&years=pre2024) |
| **B** | Propositional Logic | 3 marks · 3 papers | Solving | [Propositional logic](#/subjects/dm/notes?h=propositional-logic) → [15 questions](#/subjects/dm/pyq?topic=plog&years=pre2024) |
| **C** | Partial Orders & Lattices | 3 marks · 2 papers | Both | [Partial orders and lattices](#/subjects/dm/notes?h=partial-orders-and-lattices) → [3 questions](#/subjects/dm/pyq?topic=poset&years=pre2024) |
| **C** | Sets | not asked | Recall | [Sets](#/subjects/dm/notes?h=sets) → [5 questions](#/subjects/dm/pyq?topic=sets&years=pre2024) |

**A**: master it and solve all its 2007–2023 questions. **B**: learn the method, then solve its questions. **C**: read once and keep its recall cards; solve its questions only if time is left. Keep the 2024–2026 papers unseen: they are your full-length mocks.

**How to study it**

- Graph theory is the big one (30 of 74 marks). Most questions fall to a handshake count or a small counterexample (K4, K3,3, C5, the Petersen graph); try that before reaching for a theorem.
- Groups (11 marks) are order, generators and Lagrange: arithmetic, not theory.
- Logic: translate English mechanically, and test validity by hunting a counter-model.
<!-- plan:end -->

```widget
type: weightage-topics
```

```widget
type: weightage-trend
```

## Syllabus (GATE 2027)

> Propositional and first order logic. Sets, relations, functions, partial orders and lattices. Monoids, Groups. Graphs: connectivity, matching, colouring. Combinatorics: counting, recurrence relations, generating functions.

Unchanged from 2026.

## Topic checklist

```widget
type: checklist
```

## How to prepare

1. **Graph theory** is the biggest block: degrees and handshake arguments, connectivity, planarity with Euler's formula, colouring and chromatic polynomials, matchings and covers.
2. **Counting:** stars and bars, inclusion–exclusion, derangements, onto functions. Always decide first whether objects and boxes are distinguishable.
3. **First-order logic:** translating English and spotting which quantifier manipulations are valid only one way.
4. **Groups:** Lagrange's theorem, orders of elements, cyclic groups.
5. **Relations and posets:** property counts and lattice types; quick wins once memorised.

## Question patterns to expect

| Pattern | What to practise | Notes |
|---|---|---|
| Which FOL formula means this sentence | ∀ with →, ∃ with ∧ | [FOL](#/subjects/dm/notes?h=first-order-logic) |
| Is this argument / formula valid | Assume false, derive a contradiction | [Propositional logic](#/subjects/dm/notes?h=propositional-logic) |
| Number of relations / functions with a property | Count choices per pair | [Relations](#/subjects/dm/notes?h=relations), [Functions](#/subjects/dm/notes?h=functions) |
| Chromatic number, matching size, faces | Graph identities | [Graph theory](#/subjects/dm/notes?h=graph-theory) |
| Number of arrangements / solutions | Stars and bars, inclusion–exclusion | [Counting](#/subjects/dm/notes?h=combinatorics-and-counting) |
| Closed form of a recurrence | Characteristic roots, generating functions | [Recurrences](#/subjects/dm/notes?h=recurrences-and-generating-functions) |

## Go deeper

- Standard text: Kenneth Rosen, *Discrete Mathematics and Its Applications*.
- Graph algorithms (BFS, DFS, MST) are in [Algorithms](#/subjects/algo); countability links to [Theory of Computation](#/subjects/toc).
- Drill the [previous-year questions](#/subjects/dm/pyq).
