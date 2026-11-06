# Algorithms

Asymptotic analysis and recurrences, searching, sorting and hashing, greedy, dynamic programming and divide-and-conquer design, graph traversals, minimum spanning trees and shortest paths. Typically 4–12 marks per paper.

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
