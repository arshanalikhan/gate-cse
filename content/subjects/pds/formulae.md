# Programming & Data Structures: formulae

Revision sheet. Explanations and examples are in the [notes](#/subjects/pds/notes).

## C rules to remember

| Rule | Value |
|---|---|
| `-7 / 2`, `-7 % 2` | `-3`, `-1` (truncate toward zero; remainder has the dividend's sign) |
| `-1 > 1u` | true (signed converted to unsigned) |
| `a[i]` | `*(a + i)` = `i[a]` |
| `a[i][j]` | `*(*(a + i) + j)` |
| `int *p; p + k` | address $+\,k \times$ `sizeof(int)` |
| `*p++` | `*(p++)` |
| `sizeof("abc")`, `strlen("abc")` | 4, 3 |
| `static` local | initialised once, keeps its value across calls, default 0 |
| `printf(...)` return value | number of characters printed |

## Array addressing

| Layout | Address of $A[i][j]$ ($m$ rows, $n$ columns, base $B$, element size $w$, lower bounds $l_r, l_c$) |
|---|---|
| Row-major | $B + [(i - l_r)\,n + (j - l_c)]\,w$ |
| Column-major | $B + [(j - l_c)\,m + (i - l_r)]\,w$ |
| 3-D row-major $A[p][q][r]$ | $B + (i\,q\,r + j\,r + k)\,w$ (zero-based) |
| Lower-triangular, row-wise, 1-based | position $\dfrac{i(i-1)}{2} + j$; total $\dfrac{n(n+1)}{2}$ |

## Counting

| Quantity | Value |
|---|---|
| Catalan number | $C_n = \dfrac{1}{n+1}\dbinom{2n}{n}$: 1, 1, 2, 5, 14, 42, 132 |
| Stack permutations of $1..n$ | $C_n$ |
| Binary-tree shapes with $n$ nodes | $C_n$ |
| BSTs on $n$ distinct keys | $C_n$ |
| Labelled binary trees | $n!\,C_n$ |
| Naive `fib(n)` calls (base cases 0, 1) | $2F_{n+1} - 1$ |

## Queues

| Quantity | Value |
|---|---|
| Circular queue (size $n$) empty | `front == rear` |
| Circular queue full | `(rear + 1) % n == front` (capacity $n - 1$) |
| Elements | `(rear - front + n) % n` |

## Binary trees (height of one node = 0)

| Quantity | Value |
|---|---|
| Max nodes at level $\ell$ | $2^{\ell}$ |
| Max nodes, height $h$ | $2^{h+1} - 1$ |
| Min height, $n$ nodes | $\lceil \log_2(n+1) \rceil - 1$ |
| Leaves | $n_0 = n_2 + 1$ |
| Null pointers | $n + 1$ |
| Full tree with $i$ internal nodes | $i + 1$ leaves, $2i + 1$ nodes |
| Unique reconstruction | inorder + (preorder or postorder) |

## AVL

| Quantity | Value |
|---|---|
| Min nodes $N(h)$ | $N(h-1) + N(h-2) + 1$, $N(0)=1$, $N(1)=2$ → 1, 2, 4, 7, 12, 20, 33, 54 |
| Max height | $\approx 1.44 \log_2 n$ |
| Rotations per insertion | at most one single or double rotation |

## Heaps

| Quantity | Value |
|---|---|
| Parent / children (1-based) | $\lfloor i/2 \rfloor$ / $2i$, $2i+1$ |
| Parent / children (0-based) | $\lfloor (i-1)/2 \rfloor$ / $2i+1$, $2i+2$ |
| Leaves (1-based) | indices $\lfloor n/2 \rfloor + 1 \ldots n$; count $\lceil n/2 \rceil$ |
| Height | $\lfloor \log_2 n \rfloor$ |
| Build heap (bottom-up) | $O(n)$ |
| Insert, delete-min | $O(\log n)$ |
| Max in a min-heap | $O(n)$, among the leaves |

## Complexity of common operations

| Structure | Search | Insert | Delete |
|---|---|---|---|
| Unsorted array | $O(n)$ | $O(1)$ at end | $O(n)$ |
| Sorted array | $O(\log n)$ | $O(n)$ | $O(n)$ |
| Singly linked list | $O(n)$ | $O(1)$ at head | $O(n)$ (find predecessor) |
| BST (balanced / worst) | $O(\log n)$ / $O(n)$ | $O(\log n)$ / $O(n)$ | $O(\log n)$ / $O(n)$ |
| Binary heap | $O(n)$ | $O(\log n)$ | $O(\log n)$ (root) |

## Graph representation

| Quantity | Adjacency matrix | Adjacency list |
|---|---|---|
| Space | $\Theta(V^2)$ | $\Theta(V + E)$ |
| Edge check | $O(1)$ | $O(\deg u)$ |
| Handshake lemma | $\sum_v \deg v = 2E$ | |
| Max edges, simple undirected | $\binom{V}{2}$ | |
