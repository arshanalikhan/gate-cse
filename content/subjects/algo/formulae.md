# Algorithms: formulae

Revision sheet. Explanations and worked examples are in the [notes](#/subjects/algo/notes).

## Growth and sums

| Fact | Value |
|---|---|
| Order | $1 \prec \log\log n \prec \log n \prec \sqrt n \prec n \prec n\log n \prec n^2 \prec 2^n \prec n! \prec n^n$ |
| $\log(n!)$ | $\Theta(n \log n)$ |
| $\sum_{i=1}^n 1/i$ | $\Theta(\log n)$ |
| $\sum_{i=1}^n i^k$ | $\Theta(n^{k+1})$ |
| $\sum_{i=0}^{\log n} 2^i$ | $\Theta(n)$ |
| $a^{\log_b n}$ | $n^{\log_b a}$ |

## Master theorem

For $T(n) = aT(n/b) + f(n)$:

| Compare $f(n)$ with $n^{\log_b a}$ | Result |
|---|---|
| polynomially smaller | $\Theta(n^{\log_b a})$ |
| $\Theta(n^{\log_b a}\log^k n)$ | $\Theta(n^{\log_b a}\log^{k+1} n)$ |
| polynomially larger (+ regularity) | $\Theta(f(n))$ |

## Standard recurrences

| Recurrence | Solution |
|---|---|
| $T(n/2) + 1$ | $\log n$ |
| $T(n/2) + n$ | $n$ |
| $2T(n/2) + 1$ | $n$ |
| $2T(n/2) + n$ | $n \log n$ |
| $2T(n/2) + n\log n$ | $n\log^2 n$ |
| $2T(n/2) + n/\log n$ | $n \log\log n$ |
| $3T(n/2) + n$ | $n^{\log_2 3}$ |
| $4T(n/2) + n^2$ | $n^2 \log n$ |
| $7T(n/2) + n^2$ | $n^{\log_2 7}$ |
| $T(n-1) + 1$ | $n$ |
| $T(n-1) + n$ | $n^2$ |
| $2T(n-1) + 1$ | $2^n$ |
| $T(\sqrt n) + 1$ | $\log\log n$ |
| $2T(\sqrt n) + \log n$ | $\log n \log\log n$ |
| $T(n/3) + T(2n/3) + n$ | $n \log n$ |

## Comparison counts

| Task | Comparisons |
|---|---|
| Binary search (worst) | $\lfloor \log_2 n \rfloor + 1$ |
| Maximum | $n - 1$ |
| Maximum and minimum | $\lceil 3n/2 \rceil - 2$ |
| Second largest | $n + \lceil \log_2 n \rceil - 2$ |
| Merge lists of sizes $m, n$ | $\le m + n - 1$ (at least $\min(m, n)$) |
| Comparison-sort lower bound | $\lceil \log_2 n! \rceil$ |
| Insertion-sort swaps | number of inversions, $\le \binom{n}{2}$ |
| Selection-sort swaps | $\le n - 1$ |

## Sorting

| Algorithm | Best | Average | Worst | Stable | In place |
|---|---|---|---|---|---|
| Bubble | $n$ | $n^2$ | $n^2$ | ✓ | ✓ |
| Selection | $n^2$ | $n^2$ | $n^2$ | ✗ | ✓ |
| Insertion | $n$ | $n^2$ | $n^2$ | ✓ | ✓ |
| Merge | $n \log n$ | $n \log n$ | $n \log n$ | ✓ | ✗ |
| Quick | $n \log n$ | $n \log n$ | $n^2$ | ✗ | ✓ |
| Heap | $n \log n$ | $n \log n$ | $n \log n$ | ✗ | ✓ |
| Counting | $n + k$ | | | ✓ | ✗ |
| Radix | $d(n + k)$ | | | ✓ | ✗ |

## Hashing (load factor α = n/m)

| Quantity | Value |
|---|---|
| Chaining, unsuccessful search | $\Theta(1 + \alpha)$ |
| Chaining, successful search | $\approx 1 + \alpha/2$ |
| Open addressing, unsuccessful (uniform) | $\le \dfrac{1}{1 - \alpha}$ |
| Open addressing, successful (uniform) | $\dfrac{1}{\alpha}\ln\dfrac{1}{1-\alpha}$ |
| Linear / quadratic / double hashing | $h + i$; $h + c_1 i + c_2 i^2$; $h_1 + i h_2$ (all mod $m$) |
| Expected empty slots | $m(1 - 1/m)^n$ |
| Expected colliding pairs | $\binom{n}{2}/m$ |

## Dynamic programming

| Problem | Time |
|---|---|
| LCS | $O(mn)$ |
| 0/1 knapsack | $O(nW)$ |
| Subset sum | $O(nS)$ |
| Matrix chain ($n$ matrices) | $O(n^3)$; parenthesisations $C_{n-1}$ |
| Edit distance | $O(mn)$ |
| LIS | $O(n^2)$ or $O(n \log n)$ |
| Matrix-chain cost of $A_{p\times q}B_{q\times r}$ | $pqr$ multiplications |

## Graphs

| Algorithm | Time | Note |
|---|---|---|
| BFS, DFS | $O(V + E)$ list, $O(V^2)$ matrix | |
| Topological sort | $O(V + E)$ | DAG only |
| SCC (Kosaraju / Tarjan) | $O(V + E)$ | |
| Kruskal | $O(E \log V)$ | union–find |
| Prim | $O(E \log V)$ heap; $O(V^2)$ array | |
| Dijkstra | $O((V+E)\log V)$ heap; $O(V^2)$ array | weights $\ge 0$ |
| Bellman–Ford | $O(VE)$ | negative edges; detects negative cycles |
| DAG shortest path | $O(V + E)$ | any weights |
| Floyd–Warshall | $O(V^3)$ | all pairs |
| Spanning trees of $K_n$ | $n^{n-2}$ | Cayley |
| Edges in a spanning tree | $V - 1$ | |

## Greedy

| Problem | Rule |
|---|---|
| Activity selection | earliest finish first |
| Fractional knapsack | max value/weight first |
| Huffman | merge two least frequent; avg length $\sum p_i \ell_i$ |
| Optimal merge | merge two smallest; cost = sum of internal nodes |
