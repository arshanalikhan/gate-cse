# Programming & Data Structures

C programming, recursion, arrays, stacks, queues, linked lists, trees, binary search trees, binary heaps and graphs. The highest-weightage technical subject in recent papers, usually 6–12 marks, and much of it is reading C code carefully.

<!-- plan:start -->
## Battle plan

Expected **9.3 marks** per paper (6–12 across the 10 papers of 2021–26) · default budget **24 hours** · week 4 of the [13-week plan](#/strategy?h=the-13-week-plan).

| Priority | Topic | Last 10 papers | Learn by | Study, then practise |
|---|---|---|---|---|
| **A** | C Programming | 29 marks · 9 papers | Solving | [C essentials](#/subjects/pds/notes?h=c-essentials) · [Pointers and arrays](#/subjects/pds/notes?h=pointers-and-arrays) → [43 questions](#/subjects/pds/pyq?topic=c&years=pre2024) |
| **A** | BST & AVL Trees | 12 marks · 7 papers | Solving | [Binary search trees and AVL trees](#/subjects/pds/notes?h=binary-search-trees-and-avl-trees) → [16 questions](#/subjects/pds/pyq?topic=bst&years=pre2024) |
| **A** | Binary Heaps | 12 marks · 6 papers | Solving | [Binary heaps](#/subjects/pds/notes?h=binary-heaps) → [17 questions](#/subjects/pds/pyq?topic=heap&years=pre2024) |
| **A** | Stacks & Queues | 11 marks · 6 papers | Solving | [Stacks](#/subjects/pds/notes?h=stacks) · [Queues](#/subjects/pds/notes?h=queues) → [12 questions](#/subjects/pds/pyq?topic=stackq&years=pre2024) |
| **A** | Recursion | 10 marks · 5 papers | Solving | [Recursion](#/subjects/pds/notes?h=recursion) → [16 questions](#/subjects/pds/pyq?topic=recursion&years=pre2024) |
| **B** | Linked Lists | 8 marks · 5 papers | Solving | [Linked lists](#/subjects/pds/notes?h=linked-lists) → [7 questions](#/subjects/pds/pyq?topic=ll&years=pre2024) |
| **B** | Binary Trees | 6 marks · 5 papers | Solving | [Binary trees](#/subjects/pds/notes?h=binary-trees) → [19 questions](#/subjects/pds/pyq?topic=tree&years=pre2024) |
| **B** | Arrays | 5 marks · 3 papers | Solving | [Arrays](#/subjects/pds/notes?h=arrays) → [9 questions](#/subjects/pds/pyq?topic=array&years=pre2024) |
| **C** | Graph Representation | not asked | Recall | [Graph representation](#/subjects/pds/notes?h=graph-representation) → [1 question](#/subjects/pds/pyq?topic=graphds&years=pre2024) |

**A**: master it and solve all its 2007–2023 questions. **B**: learn the method, then solve its questions. **C**: read once and keep its recall cards; solve its questions only if time is left. Keep the 2024–2026 papers unseen: they are your full-length mocks.

**How to study it**

- C tracing carries 29 of the 93 marks. Trace with a frame table (one row per call: arguments, locals, statics, return value), never in your head.
- BST/AVL, heaps and stacks/queues (35 marks) are counting and simulation: learn the formulas, then simulate on paper.
- GATE prints C. Where the notes show C and Python tabs, trace the C version.
<!-- plan:end -->

```widget
type: weightage-topics
```

```widget
type: weightage-trend
```

## Syllabus (GATE 2027)

> Programming in C. Recursion. Arrays, stacks, queues, linked lists, trees, binary search trees, binary heaps, graphs.

Unchanged from 2026.

## Topic checklist

```widget
type: checklist
```

## How to prepare

1. **C tracing is the single biggest source of marks.** Practise output questions with pointers, 2-D arrays, `static` variables, recursion and short-circuit operators until you trace them without mistakes. Write every variable's value on paper.
2. **Recursion:** draw the call tree; know which statements run on the way down and which on the way back.
3. **Heaps and BSTs** are asked almost every year: insert/delete sequences, array representation, valid-heap checks, number of BSTs, AVL rotations.
4. **Trees:** counting results (leaves, null pointers, heights) and traversal reconstruction.
5. **Stacks and queues:** infix/postfix conversion, stack permutations, circular-queue conditions.
6. **Linked lists:** pointer manipulation code (reversal, insertion) and the cost of each operation.

## Question patterns to expect

| Pattern | What to practise | Notes |
|---|---|---|
| Output of a C program | Pointer arithmetic, `static`, 2-D arrays, precedence | [C essentials](#/subjects/pds/notes?h=c-essentials), [Pointers](#/subjects/pds/notes?h=pointers-and-arrays) |
| Value returned by a recursive function | Call tree, static variables | [Recursion](#/subjects/pds/notes?h=recursion) |
| Heap after a sequence of operations | Sift up / sift down by hand | [Heaps](#/subjects/pds/notes?h=binary-heaps) |
| Number of nodes / leaves / BSTs | Tree identities, Catalan numbers | [Trees](#/subjects/pds/notes?h=binary-trees) |
| Postfix value / stack contents | Conversion and evaluation algorithms | [Stacks](#/subjects/pds/notes?h=stacks) |
| What a list-manipulation function does | Trace pointer updates node by node | [Linked lists](#/subjects/pds/notes?h=linked-lists) |

## Go deeper

- Standard texts: Kernighan & Ritchie, *The C Programming Language*; Cormen et al. for data structures.
- Continue with [Algorithms](#/subjects/algo), which builds on heaps, hashing and graphs.
- Drill the [previous-year questions](#/subjects/pds/pyq).
