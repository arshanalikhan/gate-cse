# Algorithms

Asymptotic analysis and recurrences, searching, sorting and hashing, greedy, dynamic programming and divide-and-conquer design, graph traversals, minimum spanning trees and shortest paths. Typically 4–12 marks per paper.

<!-- plan:start -->
## Battle plan

Expected **7.7 marks** per paper (4–12 across the 10 papers of 2021–26) · default budget **22 hours** · weeks 5–6 of the [13-week plan](#/strategy?h=the-13-week-plan).

| Priority | Topic | Last 10 papers | Learn by | Study, then practise |
|---|---|---|---|---|
| **A** | Minimum Spanning Trees | 15 marks · 7 papers | Solving | [Minimum spanning trees](#/subjects/algo/notes?h=minimum-spanning-trees) → [17 questions](#/subjects/algo/pyq?topic=mst&years=pre2024) |
| **A** | Graph Traversal (BFS/DFS) | 15 marks · 6 papers | Solving | [Graph traversal](#/subjects/algo/notes?h=graph-traversal) → [14 questions](#/subjects/algo/pyq?topic=traversal&years=pre2024) |
| **B** | Recurrence Relations | 9 marks · 6 papers | Solving | [Recurrence relations](#/subjects/algo/notes?h=recurrence-relations) → [9 questions](#/subjects/algo/pyq?topic=recur&years=pre2024) |
| **B** | Searching & Sorting | 9 marks · 6 papers | Both | [Searching](#/subjects/algo/notes?h=searching) · [Sorting](#/subjects/algo/notes?h=sorting) → [28 questions](#/subjects/algo/pyq?topic=sort&years=pre2024) |
| **B** | Hashing | 8 marks · 6 papers | Solving | [Hashing](#/subjects/algo/notes?h=hashing) → [12 questions](#/subjects/algo/pyq?topic=hash&years=pre2024) |
| **B** | Asymptotic Analysis | 8 marks · 4 papers | Solving | [Asymptotic analysis](#/subjects/algo/notes?h=asymptotic-analysis) → [19 questions](#/subjects/algo/pyq?topic=asym&years=pre2024) |
| **B** | Shortest Paths | 6 marks · 3 papers | Solving | [Shortest paths](#/subjects/algo/notes?h=shortest-paths) → [8 questions](#/subjects/algo/pyq?topic=sp&years=pre2024) |
| **B** | Dynamic Programming | 5 marks · 3 papers | Solving | [Dynamic programming](#/subjects/algo/notes?h=dynamic-programming) → [11 questions](#/subjects/algo/pyq?topic=dp&years=pre2024) |
| **C** | Greedy Algorithms | 2 marks · 1 paper | Solving | [Greedy algorithms](#/subjects/algo/notes?h=greedy-algorithms) → [8 questions](#/subjects/algo/pyq?topic=greedy&years=pre2024) |
| **C** | Divide & Conquer | not asked | Solving | [Divide and conquer](#/subjects/algo/notes?h=divide-and-conquer) → [1 question](#/subjects/algo/pyq?topic=dnc&years=pre2024) |
| Out | P, NP and complexity classes | outside the 2027 syllabus | Recall | skip |

**A**: master it and solve all its 2007–2023 questions. **B**: learn the method, then solve its questions. **C**: read once and keep its recall cards; solve its questions only if time is left. Keep the 2024–2026 papers unseen: they are your full-length mocks.

**How to study it**

- Graph traversal and minimum spanning trees give 30 of 77 marks: run BFS, DFS, Prim, Kruskal and Dijkstra by hand on small graphs until it is mechanical.
- Recurrences, sorting, hashing and asymptotics give 8–9 marks each: master theorem, comparison counts, probe sequences.
- Divide and conquer and greedy algorithms outside MSTs are rare now: read once.
<!-- plan:end -->

```widget
type: weightage-topics
```

```widget
type: weightage-trend
```

## Syllabus (GATE 2027)

> Searching, sorting, hashing. Asymptotic worst case time and space complexity. Algorithm design techniques: greedy, dynamic programming and divide-and-conquer. Graph traversals, minimum spanning trees, shortest paths.

Unchanged from 2026. P, NP and NP-completeness are not listed.

## Topic checklist

```widget
type: checklist
```

## How to prepare

1. **Asymptotics and recurrences first.** Every other topic asks "what is the time complexity", so ordering functions and solving recurrences must be automatic.
2. **Sorting:** know the comparison/swap counts and the best/worst inputs for each algorithm, not just the big-O table.
3. **Graphs carry the most marks recently:** MST properties (cut and cycle), BFS/DFS edge classification and topological order, Dijkstra by hand.
4. **Hashing:** simulate linear probing and chaining; expected-value questions on uniform hashing.
5. **DP:** fill small LCS, knapsack and matrix-chain tables by hand; recognise when greedy fails.

## Question patterns to expect

| Pattern | What to practise | Notes |
|---|---|---|
| Time complexity of a code fragment | Count loop iterations; sum series | [Asymptotics](#/subjects/algo/notes?h=asymptotic-analysis) |
| Solve a recurrence | Master theorem, recursion tree, substitution | [Recurrences](#/subjects/algo/notes?h=recurrence-relations) |
| Which statements about MSTs are true | Cut and cycle properties, uniqueness | [MST](#/subjects/algo/notes?h=minimum-spanning-trees) |
| Weight of the MST / order Prim adds edges | Run Kruskal and Prim by hand | [MST](#/subjects/algo/notes?h=minimum-spanning-trees) |
| Shortest-path distances, order of extraction | Dijkstra / Bellman–Ford tables | [Shortest paths](#/subjects/algo/notes?h=shortest-paths) |
| Final hash table, number of probes | Probe sequences | [Hashing](#/subjects/algo/notes?h=hashing) |
| Number of comparisons / swaps | Sorting facts and inversions | [Sorting](#/subjects/algo/notes?h=sorting) |

## Go deeper

- Standard text: Cormen, Leiserson, Rivest & Stein, *Introduction to Algorithms* (CLRS).
- Data structures used here (heaps, BSTs, graph representations) are in [Programming & Data Structures](#/subjects/pds).
- Drill the [previous-year questions](#/subjects/algo/pyq).
