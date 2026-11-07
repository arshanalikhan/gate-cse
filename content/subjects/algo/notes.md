# Algorithms: notes

Exam-focused notes for GATE 2027 Section 5. GATE tests three skills here: getting the asymptotic order right, running a standard algorithm by hand (sorting passes, hashing, MST, Dijkstra, DFS), and knowing each algorithm's exact cost and preconditions.

## Asymptotic analysis

| Notation | Meaning | Analogy |
|---|---|---|
| $f = O(g)$ | $f(n) \le c\,g(n)$ for all $n \ge n_0$ | $\le$ |
| $f = \Omega(g)$ | $f(n) \ge c\,g(n)$ for all $n \ge n_0$ | $\ge$ |
| $f = \Theta(g)$ | both | $=$ |
| $f = o(g)$ | $\lim f/g = 0$ | $<$ |
| $f = \omega(g)$ | $\lim f/g = \infty$ | $>$ |

**Growth order** (slowest to fastest):

$$1 \prec \log\log n \prec \log n \prec \sqrt{n} \prec n \prec n\log n \prec n^2 \prec n^3 \prec 2^n \prec n! \prec n^n$$

Useful facts:

- $\log(n!) = \Theta(n \log n)$ (Stirling); $\sum_{i=1}^{n} \frac{1}{i} = \Theta(\log n)$; $\sum_{i=1}^{n} i^k = \Theta(n^{k+1})$.
- $\log_a n = \Theta(\log_b n)$ for constant bases, but $2^{\log_2 n} = n$ while $4^{\log_2 n} = n^2$: bases matter in exponents.
- Any polylog is $o$ of any polynomial: $(\log n)^{100} = o(n^{0.01})$. Any polynomial is $o$ of any exponential.
- To compare two tricky functions, compare their logarithms: $n^{\log n}$ vs $2^{\sqrt n}$ → $\log^2 n$ vs $\sqrt n$, so $n^{\log n} = o(2^{\sqrt n})$.

**Loops:** `for (i = 1; i < n; i *= 2)` runs $\log_2 n$ times; nested `for (i = 1; i <= n; i++) for (j = 1; j <= n; j += i)` runs $\sum n/i = \Theta(n \log n)$ times.

> [!NOTE] Outside the syllabus
> P, NP and NP-completeness are not listed in the 2027 syllabus and have not been asked since 2015.

> [!RECALL] Order these: $n \log n$, $n^{1.01}$, $\sqrt{n}\,\log^2 n$, $2^{\log_2 n}$.
> $\sqrt{n}\log^2 n \prec 2^{\log_2 n} = n \prec n\log n \prec n^{1.01}$.

> [!RECALL] How many times does `for (i = n; i > 1; i = i / 2)` iterate?
> About $\log_2 n$ times, so the loop is $\Theta(\log n)$.

## Recurrence relations

**Master theorem** for $T(n) = a\,T(n/b) + f(n)$ with $a \ge 1$, $b > 1$. Compare $f(n)$ with $n^{\log_b a}$:

| Case | Condition | Result |
|---|---|---|
| 1 | $f(n) = O(n^{\log_b a - \epsilon})$ | $T(n) = \Theta(n^{\log_b a})$ |
| 2 | $f(n) = \Theta(n^{\log_b a} \log^k n)$, $k \ge 0$ | $T(n) = \Theta(n^{\log_b a} \log^{k+1} n)$ |
| 3 | $f(n) = \Omega(n^{\log_b a + \epsilon})$ and $a f(n/b) \le c f(n)$, $c < 1$ | $T(n) = \Theta(f(n))$ |

Recurrences GATE keeps returning to:

| Recurrence | Solution | Example |
|---|---|---|
| $T(n) = T(n/2) + 1$ | $\Theta(\log n)$ | Binary search |
| $T(n) = T(n/2) + n$ | $\Theta(n)$ | |
| $T(n) = 2T(n/2) + 1$ | $\Theta(n)$ | Tree traversal |
| $T(n) = 2T(n/2) + n$ | $\Theta(n \log n)$ | Merge sort |
| $T(n) = 2T(n/2) + n\log n$ | $\Theta(n \log^2 n)$ | |
| $T(n) = 7T(n/2) + n^2$ | $\Theta(n^{\log_2 7}) \approx n^{2.81}$ | Strassen |
| $T(n) = 3T(n/2) + n$ | $\Theta(n^{\log_2 3}) \approx n^{1.585}$ | Karatsuba |
| $T(n) = T(n-1) + 1$ | $\Theta(n)$ | |
| $T(n) = T(n-1) + n$ | $\Theta(n^2)$ | Quick sort worst case |
| $T(n) = 2T(n-1) + 1$ | $\Theta(2^n)$ | Towers of Hanoi ($2^n - 1$ moves) |
| $T(n) = T(\sqrt n) + 1$ | $\Theta(\log\log n)$ | |
| $T(n) = 2T(\sqrt n) + \log n$ | $\Theta(\log n \cdot \log\log n)$ | Substitute $n = 2^m$ |
| $T(n) = T(n/3) + T(2n/3) + n$ | $\Theta(n \log n)$ | Recursion tree |

**Methods:** substitution (guess and prove), recursion tree (sum the cost per level), change of variable ($n = 2^m$ turns $\sqrt n$ into $m/2$), and the master theorem. The master theorem does **not** apply to $T(n) = 2T(n/2) + n/\log n$ (the gap is not polynomial; the answer is $\Theta(n \log\log n)$) or to subtract-and-conquer recurrences.

> [!RECALL] Solve $T(n) = 4T(n/2) + n^2$.
> $n^{\log_2 4} = n^2$ matches $f(n)$: case 2, so $T(n) = \Theta(n^2 \log n)$.

> [!RECALL] Solve $T(n) = 2T(n-1) + 1$ with $T(1) = 1$.
> $T(n) = 2^n - 1$, i.e. $\Theta(2^n)$.

## Searching

| Method | Worst case | Precondition |
|---|---|---|
| Linear search | $n$ comparisons | none |
| Binary search | $\lfloor \log_2 n \rfloor + 1$ comparisons | sorted, random access |
| Search in a BST | $O(h)$ | BST |

**Finding extremes with few comparisons:** maximum needs $n - 1$; maximum and minimum together need $\lceil 3n/2 \rceil - 2$ (compare in pairs); the second largest needs $n + \lceil \log_2 n \rceil - 2$ (tournament).

**Selection:** the $k$-th smallest element can be found in $O(n)$ worst case (median of medians) or $O(n)$ expected (randomised quickselect).

> [!RECALL] Fewest comparisons to find both the maximum and the minimum of 100 numbers?
> $\lceil 3 \cdot 100/2 \rceil - 2 = 148$.

```c
int binary_search(const int a[], int n, int key) {   /* a sorted; O(log n) */
    int lo = 0, hi = n - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (a[mid] == key) return mid;
        if (a[mid] < key) lo = mid + 1; else hi = mid - 1;
    }
    return -1;
}
```

```python
def binary_search(a, key):       # a sorted; O(log n)
    lo, hi = 0, len(a) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if a[mid] == key:
            return mid
        if a[mid] < key:
            lo = mid + 1
        else:
            hi = mid - 1
    return -1
```

## Sorting

| Algorithm | Best | Average | Worst | Stable | In place |
|---|---|---|---|---|---|
| Bubble (with early exit) | $n$ | $n^2$ | $n^2$ | Yes | Yes |
| Selection | $n^2$ | $n^2$ | $n^2$ | No | Yes |
| Insertion | $n$ | $n^2$ | $n^2$ | Yes | Yes |
| Merge | $n\log n$ | $n\log n$ | $n\log n$ | Yes | No ($O(n)$ extra) |
| Quick | $n\log n$ | $n\log n$ | $n^2$ | No | Yes ($O(\log n)$ stack on average) |
| Heap | $n\log n$ | $n\log n$ | $n\log n$ | No | Yes |
| Counting (keys in $0..k$) | $n + k$ | $n + k$ | $n + k$ | Yes | No |
| Radix ($d$ digits, base $k$) | $d(n + k)$ | $d(n + k)$ | $d(n + k)$ | Yes | No |

Facts GATE checks:

- Any comparison sort needs $\lceil \log_2 n! \rceil = \Omega(n \log n)$ comparisons in the worst case.
- **Insertion sort** does exactly as many swaps as there are **inversions** (pairs $i < j$ with $a_i > a_j$); at most $\binom{n}{2}$. It is fastest on nearly sorted input.
- **Selection sort** makes at most $n - 1$ swaps: the best choice when writes are expensive.
- **Quick sort** is $\Theta(n^2)$ when every pivot is the smallest or largest element (e.g. sorted input with first-element pivot). Any constant-ratio split (even 1 : 99) still gives $\Theta(n \log n)$.
- Merging two sorted lists of lengths $m$ and $n$ takes at most $m + n - 1$ comparisons.
- Merge sort makes $\Theta(n\log n)$ comparisons even on sorted input (unless it checks for an already-sorted split).

> [!EXAMPLE] Quick sort partition (Lomuto, last element as pivot)
> Array 7 2 9 4 5, pivot 5: scan 7 (stay), 2 (swap to front), 9 (stay), 4 (swap) → 2 4 9 7 5 → put the pivot after the small part → 2 4 **5** 7 9. The pivot is now in its final position.

> [!RECALL] How many swaps does insertion sort make on 4 3 2 1?
> 6, the number of inversions $\binom{4}{2}$.

> [!RECALL] Which of merge, quick, heap and insertion sort are stable?
> Merge and insertion sort.

```c
/* quicksort, Lomuto partition with the last element as pivot */
int partition(int a[], int lo, int hi) {
    int p = a[hi], i = lo - 1;
    for (int j = lo; j < hi; j++)
        if (a[j] <= p) { i++; int t = a[i]; a[i] = a[j]; a[j] = t; }
    int t = a[i + 1]; a[i + 1] = a[hi]; a[hi] = t;
    return i + 1;
}
void quicksort(int a[], int lo, int hi) {
    if (lo < hi) {
        int p = partition(a, lo, hi);
        quicksort(a, lo, p - 1); quicksort(a, p + 1, hi);
    }
}
```

```python
def merge_sort(a):               # O(n log n), stable
    if len(a) <= 1:
        return a
    mid = len(a) // 2
    left, right = merge_sort(a[:mid]), merge_sort(a[mid:])
    out, i, j = [], 0, 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            out.append(left[i]); i += 1
        else:
            out.append(right[j]); j += 1
    return out + left[i:] + right[j:]
```

## Hashing

A hash table with $m$ slots holding $n$ keys has load factor $\alpha = n/m$.

**Chaining:** each slot holds a list. Under simple uniform hashing, an unsuccessful search examines $\Theta(1 + \alpha)$ elements on average; a successful one about $1 + \alpha/2$.

**Open addressing** (all keys in the table, $\alpha < 1$):

| Probe sequence | Formula | Weakness |
|---|---|---|
| Linear probing | $h(k, i) = (h(k) + i) \bmod m$ | Primary clustering |
| Quadratic probing | $h(k, i) = (h(k) + c_1 i + c_2 i^2) \bmod m$ | Secondary clustering; may not reach every slot |
| Double hashing | $h(k, i) = (h_1(k) + i\,h_2(k)) \bmod m$ | $h_2(k)$ must be coprime with $m$ |

With uniform hashing, expected probes are at most $\frac{1}{1-\alpha}$ for an unsuccessful search and $\frac{1}{\alpha}\ln\frac{1}{1-\alpha}$ for a successful one.

**Deletion** in open addressing needs a "deleted" marker; otherwise later searches stop early.

**Probability questions** ($n$ keys hashed uniformly into $m$ slots):

- Expected number of empty slots: $m\left(1 - \frac1m\right)^n$.
- Expected number of colliding pairs: $\binom{n}{2}\frac{1}{m}$.
- Probability that the first three insertions land in different slots: $\frac{m-1}{m}\cdot\frac{m-2}{m}$.

> [!EXAMPLE] Linear probing by hand
> $m = 10$, $h(k) = k \bmod 10$, insert 43, 23, 53, 15, 25: 43 → 3, 23 → 4, 53 → 5, 15 → 6 (5 taken), 25 → 7. Notice how one cluster (3–7) keeps growing.

> [!RECALL] What condition must $h_2$ satisfy in double hashing?
> $h_2(k) \ne 0$ and $\gcd(h_2(k), m) = 1$, so the probe sequence visits every slot (easy if $m$ is prime).

> [!RECALL] Expected unsuccessful-search probes in open addressing at load factor 0.75?
> At most $\frac{1}{1 - 0.75} = 4$.

```c
/* open addressing with linear probing; -1 marks an empty slot */
#define M 11
int table[M];
void init(void) { for (int i = 0; i < M; i++) table[i] = -1; }
int insert_key(int key) {
    for (int i = 0; i < M; i++) {
        int slot = (key % M + i) % M;
        if (table[slot] == -1) { table[slot] = key; return slot; }
    }
    return -1;                   /* table full */
}
```

```python
M = 11
table = [None] * M

def insert_key(key):             # linear probing: h(k, i) = (k mod M + i) mod M
    for i in range(M):
        slot = (key % M + i) % M
        if table[slot] is None:
            table[slot] = key
            return slot
    return -1
```

## Divide and conquer

Split into subproblems, solve recursively, combine.

| Algorithm | Recurrence | Time |
|---|---|---|
| Binary search | $T(n/2) + 1$ | $\Theta(\log n)$ |
| Merge sort | $2T(n/2) + n$ | $\Theta(n \log n)$ |
| Quick sort (balanced) | $2T(n/2) + n$ | $\Theta(n \log n)$ |
| Max and min | $2T(n/2) + 2$ | $3n/2 - 2$ comparisons |
| Karatsuba multiplication | $3T(n/2) + n$ | $\Theta(n^{1.585})$ |
| Strassen matrix multiplication | $7T(n/2) + n^2$ | $\Theta(n^{2.81})$ |
| Closest pair of points | $2T(n/2) + n$ | $\Theta(n \log n)$ |
| Power $x^n$ by squaring | $T(n/2) + 1$ | $\Theta(\log n)$ multiplications |
| Counting inversions (merge-based) | $2T(n/2) + n$ | $\Theta(n \log n)$ |

> [!RECALL] Why is Strassen's algorithm $O(n^{2.81})$?
> It multiplies two $n \times n$ matrices with 7 half-size products instead of 8: $T(n) = 7T(n/2) + \Theta(n^2) = \Theta(n^{\log_2 7})$.

```c
/* fast exponentiation: x^n in O(log n) multiplications */
long long power(long long x, int n) {
    if (n == 0) return 1;
    long long half = power(x, n / 2);
    return n % 2 ? half * half * x : half * half;
}
```

```python
def power(x, n):                 # x^n in O(log n) multiplications
    if n == 0:
        return 1
    half = power(x, n // 2)
    return half * half * x if n % 2 else half * half
```

## Greedy algorithms

Make the locally best choice and never revisit it. Correctness needs the **greedy-choice property** and **optimal substructure** (usually shown by an exchange argument).

| Problem | Greedy rule | Time |
|---|---|---|
| Activity selection | Earliest finish time first | $O(n \log n)$ |
| Fractional knapsack | Highest value/weight ratio first | $O(n \log n)$ |
| Huffman coding | Merge the two least frequent symbols repeatedly | $O(n \log n)$ |
| Optimal merge pattern | Merge the two smallest files repeatedly | $O(n \log n)$ |
| Job sequencing with deadlines | Highest profit first, latest free slot before its deadline | $O(n^2)$ simple |
| MST (Prim, Kruskal), Dijkstra | See below | |

Greedy fails for **0/1 knapsack** (use DP) and for coin change with arbitrary denominations.

**Huffman:** average code length $= \sum_i p_i \ell_i$, where $\ell_i$ is the depth of symbol $i$. The two least frequent symbols are siblings at the deepest level; the code is prefix-free.

> [!EXAMPLE] Huffman code lengths
> Frequencies a:45, b:13, c:12, d:16, e:9, f:5. Merges: 5+9=14, 12+13=25, 14+16=30, 25+30=55, 45+55=100. Code lengths: a 1, b 3, c 3, d 3, e 4, f 4. Average $= (45 + 3(13+12+16) + 4(9+5))/100 = 2.24$ bits.

> [!RECALL] Which knapsack problem does greedy solve optimally?
> Fractional knapsack (by value/weight ratio). 0/1 knapsack needs dynamic programming.

```c
/* activity selection: activities already sorted by finish time */
int select_activities(const int start[], const int finish[], int n) {
    int count = 1, last = finish[0];
    for (int i = 1; i < n; i++)
        if (start[i] >= last) { count++; last = finish[i]; }
    return count;
}
```

```python
import heapq

def huffman_cost(freqs):         # total bits = sum of merge costs
    h = list(freqs)
    heapq.heapify(h)
    cost = 0
    while len(h) > 1:
        a, b = heapq.heappop(h), heapq.heappop(h)
        cost += a + b
        heapq.heappush(h, a + b)
    return cost
```

## Dynamic programming

Use DP when the problem has **optimal substructure** and **overlapping subproblems**. Define the state, write the recurrence, fix the evaluation order, then read off the answer (and reconstruct the choice if asked).

| Problem | Recurrence | Time |
|---|---|---|
| Longest common subsequence | $c[i][j] = c[i-1][j-1] + 1$ if $x_i = y_j$, else $\max(c[i-1][j], c[i][j-1])$ | $O(mn)$ |
| 0/1 knapsack (capacity $W$) | $K[i][w] = \max(K[i-1][w],\ v_i + K[i-1][w - w_i])$ | $O(nW)$, pseudo-polynomial |
| Subset sum to $S$ | $T[i][s] = T[i-1][s] \lor T[i-1][s - a_i]$ | $O(nS)$ |
| Matrix-chain multiplication | $m[i][j] = \min_{i \le k < j} m[i][k] + m[k+1][j] + p_{i-1} p_k p_j$ | $O(n^3)$ |
| Edit distance | $\min$(insert, delete, replace) of the three neighbours $+1$, or diagonal if equal | $O(mn)$ |
| Longest increasing subsequence | $L[i] = 1 + \max\{L[j] : j < i, a_j < a_i\}$ | $O(n^2)$, or $O(n\log n)$ |
| Floyd–Warshall | $d_k[i][j] = \min(d_{k-1}[i][j],\ d_{k-1}[i][k] + d_{k-1}[k][j])$ | $O(V^3)$ |
| Bellman–Ford | relax all edges $V - 1$ times | $O(VE)$ |

Number of ways to fully parenthesise a chain of $n$ matrices: Catalan $C_{n-1}$.

> [!EXAMPLE] Matrix chain
> Dimensions $10 \times 30$, $30 \times 5$, $5 \times 60$. $(AB)C$: $10\cdot30\cdot5 + 10\cdot5\cdot60 = 1500 + 3000 = 4500$. $A(BC)$: $30\cdot5\cdot60 + 10\cdot30\cdot60 = 9000 + 18000 = 27000$. Optimal: 4500 scalar multiplications.

> [!RECALL] Why is the $O(nW)$ knapsack algorithm not polynomial?
> $W$ is a number, not an input size: it takes only $\log W$ bits to write, so $O(nW)$ is exponential in the input length (pseudo-polynomial).

> [!RECALL] LCS of ABCBDAB and BDCABA has what length?
> 4 (for example BCBA).

```c
/* length of the longest common subsequence: O(mn) */
int lcs(const char *x, const char *y) {
    int m = strlen(x), n = strlen(y);
    int L[m + 1][n + 1];
    for (int i = 0; i <= m; i++)
        for (int j = 0; j <= n; j++)
            L[i][j] = (i == 0 || j == 0) ? 0
                    : x[i - 1] == y[j - 1] ? L[i - 1][j - 1] + 1
                    : (L[i - 1][j] > L[i][j - 1] ? L[i - 1][j] : L[i][j - 1]);
    return L[m][n];
}
```

```python
def knapsack(weights, values, cap):     # 0/1 knapsack, O(n * cap)
    best = [0] * (cap + 1)
    for w, v in zip(weights, values):
        for c in range(cap, w - 1, -1):  # backwards: each item used once
            best[c] = max(best[c], best[c - w] + v)
    return best[cap]
```

## Graph traversal

| | BFS | DFS |
|---|---|---|
| Data structure | Queue | Stack / recursion |
| Time | $O(V + E)$ (list), $O(V^2)$ (matrix) | same |
| Finds | Shortest paths (edge count) in unweighted graphs | Cycles, topological order, SCCs, articulation points |

**DFS edge classes (directed graph):** tree, **back** (to an ancestor), forward (to a descendant), cross (everything else). A directed graph has a cycle **iff** DFS finds a back edge. In an undirected graph DFS produces only tree and back edges; BFS non-tree edges join vertices whose levels differ by at most 1.

**Parenthesis theorem:** for any two vertices, the DFS intervals [discovery, finish] are either disjoint or nested.

**Topological sort** (DAGs only): output vertices in decreasing DFS finish time, or repeatedly remove a vertex of in-degree 0 (Kahn). A DAG has a unique topological order iff it has a Hamiltonian path.

**Strongly connected components:** Kosaraju runs DFS, then DFS on the transpose in decreasing finish order: $O(V + E)$. The condensation (one node per SCC) is a DAG.

**Articulation points** (undirected): the DFS root if it has at least two children; a non-root $u$ if some child $v$ has $\text{low}[v] \ge \text{disc}[u]$. Edge $(u, v)$ is a **bridge** if $\text{low}[v] > \text{disc}[u]$.

> [!RECALL] Which DFS edge type proves a directed graph has a cycle?
> A back edge.

> [!RECALL] What does BFS from $s$ compute in an unweighted graph?
> The minimum number of edges from $s$ to every reachable vertex (and a shortest-path tree).

```c
/* BFS on an adjacency matrix; dist[v] = edges from s (-1 if unreachable) */
#define V 6
void bfs(int adj[V][V], int s, int dist[V]) {
    int queue[V], head = 0, tail = 0;
    for (int v = 0; v < V; v++) dist[v] = -1;
    dist[s] = 0; queue[tail++] = s;
    while (head < tail) {
        int u = queue[head++];
        for (int v = 0; v < V; v++)
            if (adj[u][v] && dist[v] == -1) { dist[v] = dist[u] + 1; queue[tail++] = v; }
    }
}
```

```python
from collections import deque

def bfs(graph, s):               # graph: dict vertex -> list of neighbours
    dist = {s: 0}
    q = deque([s])
    while q:
        u = q.popleft()
        for v in graph[u]:
            if v not in dist:
                dist[v] = dist[u] + 1
                q.append(v)
    return dist

def dfs(graph, u, seen=None):    # recursive DFS, returns visit order
    seen = [] if seen is None else seen
    seen.append(u)
    for v in graph[u]:
        if v not in seen:
            dfs(graph, v, seen)
    return seen
```

## Minimum spanning trees

A spanning tree of a connected graph has $V - 1$ edges.

- **Cut property:** the lightest edge crossing any cut belongs to some MST (to every MST if it is the unique lightest).
- **Cycle property:** the strictly heaviest edge on any cycle belongs to no MST.
- All edge weights distinct ⟹ the MST is unique.
- Adding a constant to every edge, or applying any increasing function to the weights, does not change which trees are minimum. (It **does** change shortest paths.)

| Algorithm | Idea | Time |
|---|---|---|
| Kruskal | Sort edges; add the next edge unless it forms a cycle (union–find) | $O(E \log E) = O(E \log V)$ |
| Prim | Grow one tree; add the lightest edge leaving it | $O(E \log V)$ binary heap; $O(V^2)$ array; $O(E + V\log V)$ Fibonacci heap |

**Counting:** $K_n$ has $n^{n-2}$ spanning trees (Cayley).

> [!TRAP] Prim's order vs Kruskal's order
> A question may ask which edge sequence *could* be produced. Kruskal adds edges in non-decreasing weight order globally; Prim adds edges that are always connected to the current tree. Check both properties.

> [!RECALL] If every edge weight is increased by 5, does the MST change? Do shortest paths?
> The MST does not change (every spanning tree gains $5(V-1)$). Shortest paths can change, because paths with more edges gain more.

```c
/* Kruskal: edges sorted by weight, union-find to skip cycles */
struct edge { int u, v, w; };
int parent[100];
int find(int x) { return parent[x] == x ? x : (parent[x] = find(parent[x])); }
int kruskal(struct edge e[], int m, int n) {   /* e sorted by w */
    int total = 0;
    for (int i = 0; i < n; i++) parent[i] = i;
    for (int i = 0; i < m; i++) {
        int a = find(e[i].u), b = find(e[i].v);
        if (a != b) { parent[a] = b; total += e[i].w; }
    }
    return total;
}
```

```python
def kruskal(n, edges):           # edges: (w, u, v); returns MST weight
    parent = list(range(n))
    def find(x):
        while parent[x] != x:
            parent[x] = parent[parent[x]]
            x = parent[x]
        return x
    total = 0
    for w, u, v in sorted(edges):
        a, b = find(u), find(v)
        if a != b:
            parent[a] = b
            total += w
    return total
```

## Shortest paths

All algorithms rely on **relaxation**: if $d[u] + w(u, v) < d[v]$ then set $d[v] = d[u] + w(u, v)$.

| Algorithm | Handles | Time |
|---|---|---|
| BFS | Unweighted graphs | $O(V + E)$ |
| Dijkstra | Non-negative weights | $O((V + E)\log V)$ binary heap; $O(V^2)$ array |
| Bellman–Ford | Negative edges; detects negative cycles reachable from the source | $O(VE)$ |
| DAG shortest paths | Any weights on a DAG (relax in topological order) | $O(V + E)$ |
| Floyd–Warshall | All pairs; negative edges, no negative cycles | $O(V^3)$ |

- Dijkstra can give wrong answers with negative edges even without negative cycles.
- Bellman–Ford: after $V - 1$ rounds, any further improvement means a negative cycle.
- Longest path is easy only on DAGs (negate weights and use the DAG algorithm).

> [!EXAMPLE] Dijkstra by hand
> Edges: s→a 4, s→b 1, b→a 2, a→c 1, b→c 5. Extract s (0): a = 4, b = 1. Extract b (1): a = min(4, 3) = 3, c = 6. Extract a (3): c = min(6, 4) = 4. Extract c (4). Order of extraction: s, b, a, c.

> [!RECALL] Which single-source algorithm works with negative edge weights but no negative cycles, and at what cost?
> Bellman–Ford, $O(VE)$ (or $O(V+E)$ if the graph is a DAG).

```c
/* Dijkstra with an adjacency matrix: O(V^2); weights must be >= 0 */
#define V 5
#define INF 1000000
void dijkstra(int w[V][V], int s, int dist[V]) {
    int done[V] = {0};
    for (int v = 0; v < V; v++) dist[v] = INF;
    dist[s] = 0;
    for (int k = 0; k < V; k++) {
        int u = -1;
        for (int v = 0; v < V; v++)
            if (!done[v] && (u == -1 || dist[v] < dist[u])) u = v;
        done[u] = 1;
        for (int v = 0; v < V; v++)
            if (w[u][v] && dist[u] + w[u][v] < dist[v]) dist[v] = dist[u] + w[u][v];
    }
}
```

```python
import heapq

def dijkstra(graph, s):          # graph: u -> [(v, w)], w >= 0; O((V + E) log V)
    dist = {s: 0}
    pq = [(0, s)]
    while pq:
        d, u = heapq.heappop(pq)
        if d > dist.get(u, float('inf')):
            continue             # stale entry
        for v, w in graph[u]:
            if d + w < dist.get(v, float('inf')):
                dist[v] = d + w
                heapq.heappush(pq, (d + w, v))
    return dist
```

