# Programming & Data Structures: notes

Exam-focused notes for GATE 2027 Section 4. Most marks here come from **tracing C code**: pointers, recursion, static variables and arrays. Assume a 32-bit `int`, 8-bit `char` and that the code compiles unless told otherwise.

## C essentials

**Priority A** · last 10 papers: 29 marks, asked in 9 (for C Programming as a whole) · learn by solving · practise: [43 questions from 2007–2023 →](#/subjects/pds/pyq?topic=c&years=pre2024)

### Operators and evaluation

Precedence, high to low (associativity in brackets):

1. `()` `[]` `->` `.` postfix `++` `--` (left to right)
2. prefix `++` `--`, unary `+` `-` `!` `~` `*` `&` `sizeof`, casts (right to left)
3. `*` `/` `%` · 4. `+` `-` · 5. `<<` `>>` · 6. `<` `<=` `>` `>=` · 7. `==` `!=`
8. `&` · 9. `^` · 10. `|` · 11. `&&` · 12. `||` · 13. `?:` (right to left) · 14. assignments (right to left) · 15. `,`

- `&&` and `||` **short-circuit** and evaluate left to right; `a || b++` does not increment `b` when `a` is non-zero.
- Integer division truncates toward zero: `-7 / 2 == -3`, and `-7 % 2 == -1` (the remainder takes the sign of the dividend).
- Modifying a variable twice between sequence points (`i = i++ + ++i`) is **undefined behaviour**; GATE avoids it, so suspect your reading if you see it.
- Mixed signed/unsigned comparisons convert the signed value to unsigned: `-1 > 1u` is true.
- `printf` returns the number of characters printed; assignment expressions have the assigned value (`if (x = 0)` is false).
- `switch` cases fall through until a `break`.

### Storage classes, scope and lifetime

| Class | Scope | Lifetime | Default value |
|---|---|---|---|
| `auto` (local) | Block | Until the block exits | Garbage |
| `static` local | Block | Whole program; initialised **once** | 0 |
| `static` global | File | Whole program | 0 |
| `extern` / global | Program | Whole program | 0 |
| `register` | Block | Block; cannot take its address | Garbage |

> [!EXAMPLE] A static counter survives across calls
> ```c
> int count(int n) {
>     static int calls = 0;
>     calls++;
>     if (n <= 1) return calls;
>     int a = count(n - 1);
>     return a + calls;
> }
> ```
> First call `count(3)`: `calls` becomes 1, 2, 3 on the way down; `count(1)` returns 3, `count(2)` returns 3 + 3 = 6, `count(3)` returns 6 + 3 = 9. A second call `count(3)` in the same run starts with `calls = 3` and returns 18.

**Parameter passing:** C is always call-by-value. Passing a pointer lets the callee modify the caller's object. Arrays are passed as a pointer to their first element.

**Scope rules:** C uses static (lexical) scoping; an inner declaration hides an outer one of the same name within its block. Questions sometimes ask what the output would be under *dynamic* scoping: then a free variable refers to the most recent active binding on the call stack.

> [!RECALL] What are `-7 / 2` and `-7 % 2` in C?
> - [ ] `-3` and `1`
> - [x] `-3` and `-1`
> - [ ] `-4` and `-1`
> - [ ] `-4` and `1`
>
> `-3` and `-1`.

> [!RECALL] Default value and lifetime of a `static` local variable?
> - [ ] Garbage; it is re-created on every call
> - [x] 0; it lives for the whole run and is initialised once
> - [ ] 0; it is re-created on every call
> - [ ] Garbage; it lives for the whole run
>
> 0; it lives for the whole run and is initialised only once.

## Pointers and arrays

**Priority A** · last 10 papers: 29 marks, asked in 9 (for C Programming as a whole) · learn by solving · practise: [43 questions from 2007–2023 →](#/subjects/pds/pyq?topic=c&years=pre2024)

- `a[i]` is `*(a + i)`; an array name decays to a pointer to its first element (except with `sizeof` and `&`).
- Pointer arithmetic scales by the pointee size: if `int *p = 1000`, then `p + 1 == 1004`.
- `*p++` means `*(p++)`: use the value, then move the pointer. `++*p` and `(*p)++` increment the pointee.
- `sizeof(arr)` inside the declaring function is the whole array; inside a function receiving it as a parameter it is the size of a pointer.
- A string literal `"abc"` occupies 4 bytes (with `'\0'`); `strlen("abc") == 3`.

**Two-dimensional arrays.** For `int a[3][4]`: `a` has type `int (*)[4]`, so `a + 1` advances by one row (16 bytes); `*(a + i) + j` points to `a[i][j]`; `a[i][j] == *(*(a + i) + j)`.

| Declaration | Meaning |
|---|---|
| `int *p[10]` | array of 10 pointers to int |
| `int (*p)[10]` | pointer to an array of 10 ints |
| `int *f(int)` | function returning a pointer to int |
| `int (*f)(int)` | pointer to a function taking int, returning int |
| `const int *p` | pointer to a constant int (cannot change `*p`) |
| `int *const p` | constant pointer (cannot change `p`) |

> [!TRAP] Swapping through pointers
> `void swap(int *a, int *b) { int *t = a; a = b; b = t; }` swaps only the local copies of the pointers; the caller sees no change. Swapping requires `int t = *a; *a = *b; *b = t;`.

> [!RECALL] What is the difference between `int *p[10]` and `int (*p)[10]`?
> - [ ] A pointer to an array of 10 ints vs an array of 10 pointers
> - [ ] Both are pointers to an array of 10 ints
> - [ ] Both are arrays of 10 pointers
> - [x] An array of 10 pointers vs a pointer to an array of 10 ints
>
> The first is an array of 10 pointers to int; the second is a single pointer to an array of 10 ints.

## Recursion

**Priority A** · last 10 papers: 10 marks, asked in 5 · learn by solving · practise: [16 questions from 2007–2023 →](#/subjects/pds/pyq?topic=recursion&years=pre2024)

Trace recursion with a **call tree** (or an explicit stack, one frame per line). For each call record the parameters, local variables, and the value returned.

- Number of calls for naive Fibonacci with `fib(0)`, `fib(1)` as base cases: $C(n) = C(n-1) + C(n-2) + 1$, which solves to $C(n) = 2F_{n+1} - 1$.
- **Tail recursion** (the recursive call is the last action) can be turned into a loop.
- Output order: statements **before** the recursive call print on the way down, statements **after** it print on the way back up.

> [!TIP] Method: trace C with a frame table
> Write one row per call, in call order: arguments, locals, the line where the call paused, and the value returned. Keep `static` and global variables in a separate box shared by every row. Fill a row's return value only when that call finishes, then go back up one row. Output before the recursive call appears in call order; output after it appears in return order.

> [!EXAMPLE] Printing on the way up
> ```c
> void p(int n) { if (n == 0) return; p(n / 2); printf("%d", n % 2); }
> ```
> `p(6)` prints `110`, the binary form of 6: the remainders are printed as the calls return.

> [!RECALL] How many calls does naive `fib(5)` make, with `fib(0)` and `fib(1)` as base cases?
> - [x] 15
> - [ ] 8
> - [ ] 16
> - [ ] 9
>
> $2F_6 - 1 = 2 \times 8 - 1 = 15$.

```c
/* Tower of Hanoi: 2^n - 1 moves */
void hanoi(int n, char from, char to, char via) {
    if (n == 0) return;
    hanoi(n - 1, from, via, to);
    printf("move disk %d: %c -> %c\n", n, from, to);
    hanoi(n - 1, via, to, from);
}
```

```python
# Tower of Hanoi: 2^n - 1 moves
def hanoi(n, src="A", dst="C", via="B", moves=None):
    moves = [] if moves is None else moves
    if n:
        hanoi(n - 1, src, via, dst, moves)
        moves.append((n, src, dst))
        hanoi(n - 1, via, dst, src, moves)
    return moves
```

## Arrays

**Priority B** · last 10 papers: 5 marks, asked in 3 · learn by solving · practise: [9 questions from 2007–2023 →](#/subjects/pds/pyq?topic=array&years=pre2024)

**Address calculation** for `A[lr..ur][lc..uc]` with element size $w$, $m$ rows and $n$ columns:

$$\text{row-major: } \text{addr}(A[i][j]) = B + \bigl[(i - l_r)\,n + (j - l_c)\bigr] w$$

$$\text{column-major: } \text{addr}(A[i][j]) = B + \bigl[(j - l_c)\,m + (i - l_r)\bigr] w$$

C uses row-major order. For 3-D `A[p][q][r]` in row-major order, element `[i][j][k]` is at offset $(i\,q\,r + j\,r + k)\,w$.

**Lower-triangular matrix** of order $n$ stored row-wise: element $(i, j)$ with $i \ge j$ (1-indexed) is at position $\frac{i(i-1)}{2} + j$; total elements $\frac{n(n+1)}{2}$.

> [!RECALL] Address of `A[2][3]` in `int A[5][6]`, row-major, base 1000, 4-byte int, 0-based?
> - [ ] 1072
> - [ ] 1052
> - [ ] 1015
> - [x] 1060
>
> $1000 + (2 \times 6 + 3) \times 4 = 1060$.

```c
/* Row-major 2-D array: address of a[i][j] = base + (i*cols + j) * sizeof(int) */
int sum2d(int rows, int cols, int a[rows][cols]) {
    int s = 0;
    for (int i = 0; i < rows; i++)
        for (int j = 0; j < cols; j++)
            s += a[i][j];
    return s;
}
```

```python
# Python lists of lists; the row-major offset formula is the same idea
def offset(i, j, cols, elem_size=4, base=0):
    return base + (i * cols + j) * elem_size

def sum2d(a):
    return sum(sum(row) for row in a)
```

## Stacks

**Priority A** · last 10 papers: 11 marks, asked in 6 (for Stacks & Queues as a whole) · learn by solving · practise: [12 questions from 2007–2023 →](#/subjects/pds/pyq?topic=stackq&years=pre2024)

LIFO; `push`, `pop`, `top` are $O(1)$. Applications: function calls, expression conversion and evaluation, parenthesis matching, undo, DFS.

**Infix → postfix:** scan left to right; output operands; push `(`; on `)` pop until `(`; on an operator pop while the stack top has higher precedence (or equal precedence and the incoming operator is left-associative), then push. `^` is right-associative.

> [!EXAMPLE] Conversion and evaluation
> `a + b * (c - d) / e` → `a b c d - * e / +`.
> Evaluate postfix `6 2 3 + - 3 8 2 / + *`: 2+3=5, 6−5=1, 8/2=4, 3+4=7, 1×7 = **7**.

**Stack permutations:** the number of output orders obtainable by pushing $1, 2, \dots, n$ in order (popping at any time) is the Catalan number $C_n = \frac{1}{n+1}\binom{2n}{n}$. An output is impossible exactly when it contains a pattern $\dots c \dots a \dots b \dots$ with $a < b < c$ (e.g. 3, 1, 2).

> [!RECALL] Can a stack turn input 1 2 3 into output 3 1 2?
> - [ ] Only if 3 is pushed first
> - [ ] Yes, by pushing all three first
> - [x] No
> - [ ] Yes
>
> No. After 3 is popped, 2 sits above 1 on the stack, so 1 cannot come out before 2.

```c
#define MAX 100
int stack[MAX], top = -1;
void push(int x) { if (top < MAX - 1) stack[++top] = x; }
int  pop(void)   { return top >= 0 ? stack[top--] : -1; }

/* evaluate a postfix expression of single digits, e.g. "23*5+" = 11 */
int eval_postfix(const char *s) {
    for (; *s; s++) {
        if (*s >= '0' && *s <= '9') push(*s - '0');
        else {
            int b = pop(), a = pop();
            push(*s == '+' ? a + b : *s == '-' ? a - b : *s == '*' ? a * b : a / b);
        }
    }
    return pop();
}
```

```python
# a Python list is a stack: append = push, pop = pop
def eval_postfix(expr):
    st = []
    for ch in expr:
        if ch.isdigit():
            st.append(int(ch))
        else:
            b, a = st.pop(), st.pop()
            st.append({'+': a + b, '-': a - b, '*': a * b, '/': a // b}[ch])
    return st.pop()
```

## Queues

**Priority A** · last 10 papers: 11 marks, asked in 6 (for Stacks & Queues as a whole) · learn by solving · practise: [12 questions from 2007–2023 →](#/subjects/pds/pyq?topic=stackq&years=pre2024)

FIFO; `enqueue` at the rear, `dequeue` at the front.

**Circular queue** in an array of size $n$ (one slot kept empty): empty when `front == rear`; full when `(rear + 1) % n == front`; capacity $n - 1$; number of elements `(rear - front + n) % n`.

| Variant | Note |
|---|---|
| Deque | Insert/delete at both ends; input- or output-restricted versions |
| Priority queue | Remove highest priority first; implement with a binary heap |
| Queue with two stacks | Enqueue = push on S1; dequeue = pop S2, refilling S2 from S1 when empty. Amortised $O(1)$ |
| Stack with two queues | One of push/pop becomes $O(n)$ |

> [!RECALL] When is a circular queue in an array of size $n$ full?
> - [x] `(rear + 1) % n == front`
> - [ ] `rear == n - 1`
> - [ ] `(front + 1) % n == rear`
> - [ ] `rear == front`
>
> When `(rear + 1) % n == front`; it holds at most $n - 1$ elements.

```c
/* circular queue holding at most N-1 items */
#define N 8
int q[N], front = 0, rear = 0;
int enqueue(int x) {
    if ((rear + 1) % N == front) return 0;   /* full */
    q[rear] = x; rear = (rear + 1) % N; return 1;
}
int dequeue(int *x) {
    if (front == rear) return 0;             /* empty */
    *x = q[front]; front = (front + 1) % N; return 1;
}
```

```python
from collections import deque   # O(1) at both ends

q = deque()
q.append(10); q.append(20)      # enqueue
first = q.popleft()             # dequeue -> 10
```

## Linked lists

**Priority B** · last 10 papers: 8 marks, asked in 5 · learn by solving · practise: [7 questions from 2007–2023 →](#/subjects/pds/pyq?topic=ll&years=pre2024)

| Operation | Singly linked | Doubly linked |
|---|---|---|
| Insert/delete at head | $O(1)$ | $O(1)$ |
| Delete a given node (pointer known) | $O(n)$ (need predecessor), or copy-next trick if not last | $O(1)$ |
| Search | $O(n)$ | $O(n)$ |
| Insert at tail | $O(1)$ with a tail pointer | $O(1)$ |

Classic routines: in-place reversal with three pointers (`prev`, `cur`, `next`); middle node with slow/fast pointers; cycle detection with Floyd's algorithm (slow moves 1, fast moves 2); merging two sorted lists in $O(m + n)$.

```c
struct node *reverse(struct node *head) {
    struct node *prev = NULL, *cur = head, *next;
    while (cur) { next = cur->next; cur->next = prev; prev = cur; cur = next; }
    return prev;
}
```

```python
class Node:
    def __init__(self, val, nxt=None):
        self.val, self.next = val, nxt

def reverse(head):
    prev, cur = None, head
    while cur:
        cur.next, prev, cur = prev, cur, cur.next
    return prev
```

> [!RECALL] Cost of deleting a node of a singly linked list when you only have a pointer to it?
> - [ ] Always $O(n)$
> - [x] $O(1)$ by copying the next node into it (not for the last node)
> - [ ] $O(\log n)$
> - [ ] Always $O(1)$, even for the last node
>
> $O(1)$ by copying the next node into it and deleting the next node (impossible for the last node); otherwise $O(n)$ to find the predecessor.

## Binary trees

**Priority B** · last 10 papers: 6 marks, asked in 5 · learn by solving · practise: [19 questions from 2007–2023 →](#/subjects/pds/pyq?topic=tree&years=pre2024)

Height of a single node is 0 (edges on the longest root-to-leaf path).

| Property | Value |
|---|---|
| Max nodes with height $h$ | $2^{h+1} - 1$ |
| Min height with $n$ nodes | $\lceil \log_2(n+1) \rceil - 1$ |
| Leaves vs degree-2 nodes | $n_0 = n_2 + 1$ |
| Null child pointers with $n$ nodes | $n + 1$ |
| Full binary tree with $i$ internal nodes | $i + 1$ leaves, $2i + 1$ nodes |
| Distinct tree shapes with $n$ nodes | Catalan $C_n$ |
| Labelled binary trees with $n$ nodes | $n! \cdot C_n$ |

**Traversals:** preorder (N L R), inorder (L N R), postorder (L R N), level order (BFS with a queue). All are $O(n)$.

**Reconstruction:** inorder together with preorder or postorder determines a binary tree uniquely; preorder + postorder does not (unless every node has 0 or 2 children).

**Expression trees:** inorder gives infix (needs parentheses), preorder gives prefix, postorder gives postfix.

> [!RECALL] A binary tree has 20 leaves. How many nodes have two children?
> - [x] 19
> - [ ] 10
> - [ ] 20
> - [ ] 21
>
> 19, since $n_0 = n_2 + 1$.

> [!RECALL] Which pairs of traversals determine a binary tree uniquely?
> - [x] Inorder with preorder, or inorder with postorder
> - [ ] Preorder with postorder
> - [ ] Inorder alone
> - [ ] Any two of the three
>
> Inorder with preorder, or inorder with postorder.

```c
struct tnode { int key; struct tnode *left, *right; };

void inorder(struct tnode *t) {          /* left, root, right */
    if (!t) return;
    inorder(t->left); printf("%d ", t->key); inorder(t->right);
}
int height(struct tnode *t) {            /* edges on the longest root-leaf path */
    if (!t) return -1;
    int l = height(t->left), r = height(t->right);
    return 1 + (l > r ? l : r);
}
```

```python
class TNode:
    def __init__(self, key, left=None, right=None):
        self.key, self.left, self.right = key, left, right

def inorder(t):                          # left, root, right
    return inorder(t.left) + [t.key] + inorder(t.right) if t else []

def height(t):                           # edges on the longest root-leaf path
    return -1 if t is None else 1 + max(height(t.left), height(t.right))
```

## Binary search trees and AVL trees

**Priority A** · last 10 papers: 12 marks, asked in 7 · learn by solving · practise: [16 questions from 2007–2023 →](#/subjects/pds/pyq?topic=bst&years=pre2024)

**BST property:** left subtree keys < node < right subtree keys. Inorder traversal is sorted. Search, insert and delete are $O(h)$: $O(\log n)$ when balanced, $O(n)$ in the worst case (sorted insertions build a chain).

**Deletion:** leaf → remove; one child → splice; two children → replace with the inorder successor (minimum of the right subtree) or predecessor, then delete that node.

- Number of BSTs on $n$ distinct keys: $C_n$.
- Given a preorder of a BST, the tree is unique (insert the keys in that order).

**AVL tree:** every node has balance factor $|h_L - h_R| \le 1$. Insertion fixes imbalance with one single (LL, RR) or double (LR, RL) rotation.

Minimum nodes in an AVL tree of height $h$:

$$N(h) = N(h-1) + N(h-2) + 1, \quad N(0) = 1,\; N(1) = 2$$

giving 1, 2, 4, 7, 12, 20, 33, …; the height is at most about $1.44 \log_2 n$.

> [!RECALL] Minimum number of nodes in an AVL tree of height 4?
> - [ ] 15
> - [ ] 20
> - [ ] 7
> - [x] 12
>
> 12 (sequence 1, 2, 4, 7, 12).

> [!RECALL] How many BSTs can be built from the keys 1–4?
> - [ ] 5
> - [ ] 24
> - [ ] 16
> - [x] 14
>
> $C_4 = 14$.

```c
struct tnode *insert(struct tnode *t, int key) {
    if (!t) {
        t = malloc(sizeof *t); t->key = key; t->left = t->right = NULL;
    } else if (key < t->key) t->left = insert(t->left, key);
    else if (key > t->key)   t->right = insert(t->right, key);
    return t;
}
struct tnode *search(struct tnode *t, int key) {
    while (t && t->key != key) t = key < t->key ? t->left : t->right;
    return t;
}
```

```python
def insert(t, key):
    if t is None:
        return TNode(key)
    if key < t.key:
        t.left = insert(t.left, key)
    elif key > t.key:
        t.right = insert(t.right, key)
    return t

def search(t, key):
    while t and t.key != key:
        t = t.left if key < t.key else t.right
    return t
```

## Binary heaps

**Priority A** · last 10 papers: 12 marks, asked in 6 · learn by solving · practise: [17 questions from 2007–2023 →](#/subjects/pds/pyq?topic=heap&years=pre2024)

A **complete** binary tree with the heap property (min-heap: parent ≤ children). Stored in an array:

| Indexing | Parent | Left child | Right child |
|---|---|---|---|
| 1-based | $\lfloor i/2 \rfloor$ | $2i$ | $2i + 1$ |
| 0-based | $\lfloor (i-1)/2 \rfloor$ | $2i + 1$ | $2i + 2$ |

| Operation | Time |
|---|---|
| Find min (min-heap) | $O(1)$ |
| Insert (sift up) | $O(\log n)$ |
| Delete min (move last to root, sift down) | $O(\log n)$ |
| Build heap from $n$ keys (bottom-up) | $O(n)$ |
| Find max in a min-heap | $O(n)$ (it is among the $\lceil n/2 \rceil$ leaves) |
| Heapsort | $O(n \log n)$, in place, not stable |

- Leaves occupy indices $\lfloor n/2 \rfloor + 1 \ldots n$ (1-based); height is $\lfloor \log_2 n \rfloor$.
- Building by repeated insertion is $O(n \log n)$; bottom-up `heapify` is $O(n)$.
- Checking whether an array is a heap: test every parent against its children.

> [!TRAP] Is it a valid heap?
> An array like `[10, 8, 9, 7, 3, 6, 5]` must be checked at **every** parent: 10 ≥ 8, 9; 8 ≥ 7, 3; 9 ≥ 6, 5, so it is a max-heap. A single violation anywhere disqualifies it.

> [!RECALL] Time to build a binary heap bottom-up from $n$ unsorted keys?
> - [ ] $O(n \log n)$
> - [ ] $O(n^2)$
> - [x] $O(n)$
> - [ ] $O(\log n)$
>
> $O(n)$.

> [!RECALL] Where is the maximum of a min-heap?
> - [ ] At the last index, so $O(1)$
> - [x] In one of the leaves; finding it takes $O(n)$
> - [ ] At the root
> - [ ] In one of the root's children, so $O(1)$
>
> In one of the leaves (indices $\lfloor n/2 \rfloor + 1 \ldots n$), so finding it takes $O(n)$.

```c
/* max-heap in a[1..n]: children of i are 2i and 2i+1 */
void sift_down(int a[], int n, int i) {
    while (2 * i <= n) {
        int c = 2 * i;
        if (c < n && a[c + 1] > a[c]) c++;
        if (a[i] >= a[c]) break;
        int t = a[i]; a[i] = a[c]; a[c] = t;
        i = c;
    }
}
void build_heap(int a[], int n) {        /* O(n) */
    for (int i = n / 2; i >= 1; i--) sift_down(a, n, i);
}
```

```python
import heapq                     # min-heap on a plain list (0-indexed)

a = [5, 3, 8, 1, 9]
heapq.heapify(a)                 # O(n) build
smallest = heapq.heappop(a)      # O(log n)
heapq.heappush(a, 0)

# max-heap trick: store negatives
mx = [-x for x in [5, 3, 8]]; heapq.heapify(mx)
largest = -mx[0]
```

## Graph representation

**Priority C** (skim) · not asked in the last 10 papers · learn by recall cards · practise: [1 question from 2007–2023 →](#/subjects/pds/pyq?topic=graphds&years=pre2024)

| | Adjacency matrix | Adjacency list |
|---|---|---|
| Space | $O(V^2)$ | $O(V + E)$ |
| Edge $(u, v)$ exists? | $O(1)$ | $O(\deg u)$ |
| Visit all neighbours | $O(V)$ | $O(\deg u)$ |
| Best for | Dense graphs | Sparse graphs |

Handshake lemma: $\sum_v \deg(v) = 2|E|$. Traversals (BFS, DFS) and graph algorithms are in [Algorithms](#/subjects/algo/notes?h=graph-traversal).

> [!RECALL] Space used by an adjacency list vs an adjacency matrix?
> - [ ] $\Theta(E)$ vs $\Theta(E^2)$
> - [x] $\Theta(V + E)$ vs $\Theta(V^2)$
> - [ ] $\Theta(VE)$ vs $\Theta(V^2)$
> - [ ] $\Theta(V^2)$ vs $\Theta(V + E)$
>
> $\Theta(V + E)$ vs $\Theta(V^2)$.

```c
/* adjacency matrix: O(V^2) space; adjacency list: O(V + E) */
#define V 5
int adj[V][V];
void add_edge(int u, int v) { adj[u][v] = adj[v][u] = 1; }   /* undirected */
int degree(int u) {
    int d = 0;
    for (int v = 0; v < V; v++) d += adj[u][v];
    return d;
}
```

```python
from collections import defaultdict

graph = defaultdict(list)        # adjacency list
def add_edge(u, v):              # undirected
    graph[u].append(v)
    graph[v].append(u)

add_edge(0, 1); add_edge(0, 2); add_edge(1, 2)
```

