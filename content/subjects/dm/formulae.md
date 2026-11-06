# Discrete Mathematics: formulae

Revision sheet. Explanations and examples are in the [notes](#/subjects/dm/notes).

## Logic

| Quantity | Formula |
|---|---|
| Implication | $p \to q \equiv \lnot p \lor q \equiv \lnot q \to \lnot p$ |
| Biconditional | $(p \to q) \land (q \to p)$ |
| Boolean functions of $n$ variables | $2^{2^n}$ |
| Negating $\forall$ | $\lnot\forall x\,P \equiv \exists x\,\lnot P$ |
| Negating $\exists$ | $\lnot\exists x\,P \equiv \forall x\,\lnot P$ |
| $\forall$ distributes over | $\land$ (not $\lor$) |
| $\exists$ distributes over | $\lor$ (not $\land$) |
| Valid one-way | $\exists y\,\forall x\,R \to \forall x\,\exists y\,R$ |
| "every $S$ is $P$" / "some $S$ is $P$" | $\forall x(S \to P)$ / $\exists x(S \land P)$ |

## Sets and relations

For a set $A$ with $n$ elements:

| Quantity | Formula |
|---|---|
| Power set | $2^n$ |
| Relations | $2^{n^2}$ |
| Reflexive (or irreflexive) | $2^{n^2 - n}$ |
| Symmetric | $2^{n(n+1)/2}$ |
| Antisymmetric | $2^n\,3^{n(n-1)/2}$ |
| Asymmetric | $3^{n(n-1)/2}$ |
| Reflexive and symmetric | $2^{n(n-1)/2}$ |
| Reflexive and antisymmetric | $3^{n(n-1)/2}$ |
| Equivalence relations | Bell $B_n$: 1, 1, 2, 5, 15, 52, 203 ($n = 0..6$) |

## Functions

From an $n$-element set to an $m$-element set:

| Quantity | Formula |
|---|---|
| All functions | $m^n$ |
| Injective | $m!/(m-n)!$ |
| Surjective | $\sum_{k=0}^m (-1)^k \binom mk (m-k)^n$ |
| Bijective ($m = n$) | $n!$ |
| Pigeonhole | some box has $\ge \lceil n/k \rceil$ |

## Counting

| Quantity | Formula |
|---|---|
| $r$-permutations | $\dfrac{n!}{(n-r)!}$ |
| $r$-combinations | $\binom nr$ |
| With repetition | $\binom{n+r-1}{r}$ |
| Solutions of $x_1 + \dots + x_k = n$, $x_i \ge 0$ | $\binom{n+k-1}{k-1}$ |
| Multiset permutations | $\dfrac{n!}{n_1!\cdots n_k!}$ |
| Circular arrangements | $(n-1)!$ |
| Derangements | $D_n = n!\sum_{k=0}^n \frac{(-1)^k}{k!}$; 0, 1, 2, 9, 44, 265 |
| Derangement recurrence | $D_n = (n-1)(D_{n-1} + D_{n-2})$ |
| Lattice paths | $\binom{m+n}{n}$ |
| Catalan | $\frac{1}{n+1}\binom{2n}{n}$: 1, 1, 2, 5, 14, 42, 132 |
| Inclusion–exclusion (3 sets) | $\sum|A| - \sum|A\cap B| + |A\cap B\cap C|$ |

## Recurrences and generating functions

| Quantity | Formula |
|---|---|
| Distinct roots | $a_n = \alpha r_1^n + \beta r_2^n$ |
| Repeated root | $a_n = (\alpha + \beta n) r^n$ |
| $\sum a^n x^n$ | $\dfrac{1}{1 - ax}$ |
| $\sum (n+1) x^n$ | $\dfrac{1}{(1-x)^2}$ |
| $\sum \binom{n+k-1}{k-1} x^n$ | $\dfrac{1}{(1-x)^k}$ |
| Strings with no "11" of length $n$ | $F_{n+2}$ |
| Towers of Hanoi | $2^n - 1$ |

## Graphs

| Quantity | Formula |
|---|---|
| Handshake | $\sum \deg v = 2E$ |
| Simple labelled graphs on $n$ vertices | $2^{\binom n2}$ |
| Labelled trees | $n^{n-2}$ |
| Edges forcing connectivity | $> \binom{n-1}{2}$ |
| Min edges with $k$ components | $n - k$ |
| Euler's formula | $V - E + F = 2$ (connected planar) |
| Planar bound | $E \le 3V - 6$; $E \le 2V - 4$ without triangles |
| Euler circuit / path | all degrees even / exactly two odd |
| Dirac (Hamiltonian) | $\deg v \ge n/2$ |
| $\chi(K_n)$, $\chi(C_n)$, $\chi(\text{tree})$ | $n$; 2 or 3; 2 |
| Chromatic polynomial: tree, $K_n$, $C_n$ | $k(k-1)^{n-1}$; $k^{\underline n}$; $(k-1)^n + (-1)^n(k-1)$ |
| Independence + vertex cover | $n$ |
| Max matching + min edge cover | $n$ (no isolated vertices) |
| Perfect matchings of $K_{2m}$ | $(2m-1)!!$ |
| König (bipartite) | max matching = min vertex cover |

## Algebra

| Quantity | Formula |
|---|---|
| Lagrange | $|H|$ divides $|G|$; order of $a$ divides $|G|$ |
| Generators of a cyclic group of order $n$ | $\varphi(n)$ |
| Order of $a$ in $(\mathbb{Z}_n, +)$ | $n / \gcd(a, n)$ |
| $(ab)^{-1}$ | $b^{-1}a^{-1}$ |
| $D_n$ Boolean | iff $n$ square-free |
| Distributive lattice | no $M_3$ or $N_5$ sublattice |
| Boolean algebra size | $2^k$ |
