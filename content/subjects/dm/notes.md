# Discrete Mathematics: notes

Exam-focused notes for the Discrete Mathematics part of GATE 2027 Section 1. Graph theory and counting carry the most marks; logic questions are short but full of traps.

## Propositional logic

**Key idea:** a formula is a **tautology** (true in every row), a **contradiction** (false in every row) or a **contingency**. It is **satisfiable** if some row makes it true; **valid** means tautology.

Equivalences to know by heart:

| Law | Form |
|---|---|
| Implication | $p \to q \equiv \lnot p \lor q$ |
| Contrapositive | $p \to q \equiv \lnot q \to \lnot p$ |
| Biconditional | $p \leftrightarrow q \equiv (p \to q) \land (q \to p)$ |
| De Morgan | $\lnot(p \land q) \equiv \lnot p \lor \lnot q$, $\lnot(p \lor q) \equiv \lnot p \land \lnot q$ |
| Exportation | $(p \land q) \to r \equiv p \to (q \to r)$ |
| Absorption | $p \lor (p \land q) \equiv p$ |

The converse $q \to p$ and the inverse $\lnot p \to \lnot q$ are equivalent to each other, **not** to $p \to q$.

**Inference rules:** modus ponens ($p$, $p \to q$ ⊢ $q$), modus tollens ($\lnot q$, $p \to q$ ⊢ $\lnot p$), hypothetical syllogism, disjunctive syllogism, resolution ($p \lor q$, $\lnot p \lor r$ ⊢ $q \lor r$). An argument $P_1, \dots, P_k \vdash C$ is valid iff $(P_1 \land \dots \land P_k) \to C$ is a tautology.

- There are $2^{2^n}$ distinct Boolean functions of $n$ variables.
- $\{\lnot, \land\}$, $\{\lnot, \lor\}$, $\{\to, \lnot\}$, NAND alone and NOR alone are **functionally complete**; $\{\land, \lor\}$ and $\{\leftrightarrow, \lnot\}$ are not.

> [!EXAMPLE] Is $(p \to q) \to ((q \to r) \to (p \to r))$ valid?
> Try to make it false: then $p \to q$ is true, $q \to r$ is true and $p \to r$ is false, so $p = T$, $r = F$. Then $q = T$ (from $p \to q$) and $q \to r$ is false. Contradiction, so the formula is valid.

> [!TRAP] "Unless" and "only if"
> "$p$ only if $q$" is $p \to q$. "$p$ unless $q$" is $\lnot q \to p$, i.e. $p \lor q$. "$p$ is necessary for $q$" is $q \to p$.

> [!RECALL] What is $p \to q$ equivalent to, using only $\lnot$ and $\lor$?
> $\lnot p \lor q$.

> [!RECALL] How many distinct Boolean functions of 3 variables exist?
> $2^{2^3} = 256$.

## First-order logic

**Key idea:** quantifiers range over a domain; negation flips them: $\lnot \forall x\,P(x) \equiv \exists x\,\lnot P(x)$ and $\lnot \exists x\,P(x) \equiv \forall x\,\lnot P(x)$.

**Translating English:** "every $S$ is $P$" is $\forall x\,(S(x) \to P(x))$; "some $S$ is $P$" is $\exists x\,(S(x) \land P(x))$. Writing $\forall x\,(S(x) \land P(x))$ or $\exists x\,(S(x) \to P(x))$ is the classic mistake.

| Statement | Status |
|---|---|
| $\forall x\,(P \land Q) \equiv \forall x\,P \land \forall x\,Q$ | equivalent |
| $\exists x\,(P \lor Q) \equiv \exists x\,P \lor \exists x\,Q$ | equivalent |
| $\forall x\,P \lor \forall x\,Q \;\to\; \forall x\,(P \lor Q)$ | valid, converse is not |
| $\exists x\,(P \land Q) \;\to\; \exists x\,P \land \exists x\,Q$ | valid, converse is not |
| $\exists y\,\forall x\,R(x, y) \;\to\; \forall x\,\exists y\,R(x, y)$ | valid, converse is not |
| $\forall x\,(P(x) \to Q) \equiv \exists x\,P(x) \to Q$ | equivalent ($x$ not free in $Q$) |
| $\exists x\,(P(x) \to Q) \equiv \forall x\,P(x) \to Q$ | equivalent ($x$ not free in $Q$) |

> [!EXAMPLE] Order of quantifiers
> Over the integers, $\forall x\,\exists y\,(y > x)$ is true (pick $y = x + 1$), but $\exists y\,\forall x\,(y > x)$ is false (no largest integer).

> [!TRAP] Checking validity
> To show an FOL statement is **not** valid, build a small counter-model: a domain of one or two elements with the predicates chosen to make the premise true and the conclusion false.

> [!RECALL] Write "no student failed" in FOL.
> $\lnot \exists x\,(S(x) \land F(x))$, equivalently $\forall x\,(S(x) \to \lnot F(x))$.

> [!RECALL] Is $\forall x\,(P(x) \lor Q(x)) \to \forall x\,P(x) \lor \forall x\,Q(x)$ valid?
> No. Domain {a, b} with $P(a), Q(b)$ true and $P(b), Q(a)$ false is a counter-model.

## Sets

| Fact | Value |
|---|---|
| $\lvert \mathcal{P}(A) \rvert$ | $2^{\lvert A \rvert}$ |
| $\lvert A \cup B \rvert$ | $\lvert A \rvert + \lvert B \rvert - \lvert A \cap B \rvert$ |
| $\lvert A \cup B \cup C \rvert$ | $\sum \lvert A \rvert - \sum \lvert A \cap B \rvert + \lvert A \cap B \cap C \rvert$ |
| $\lvert A \times B \rvert$ | $\lvert A \rvert \cdot \lvert B \rvert$ |

**Countability:** $\mathbb{N}$, $\mathbb{Z}$, $\mathbb{Q}$, finite strings over a finite alphabet, and the set of all programs (Turing machines) are countable. $\mathbb{R}$, $\mathcal{P}(\mathbb{N})$ and the set of all functions $\mathbb{N} \to \{0, 1\}$ (all languages over an alphabet) are uncountable. That gap is why some languages are not recognised by any Turing machine.

> [!RECALL] Is the set of all languages over {0, 1} countable?
> No. It is $\mathcal{P}(\Sigma^*)$, uncountable, while the set of Turing machines is countable.

## Relations

A relation $R$ on a set $A$ with $n$ elements is a subset of $A \times A$.

| Property | Definition | Count on $n$ elements |
|---|---|---|
| Any relation | | $2^{n^2}$ |
| Reflexive | $(a, a) \in R$ for all $a$ | $2^{n^2 - n}$ |
| Irreflexive | no $(a, a)$ | $2^{n^2 - n}$ |
| Symmetric | $aRb \Rightarrow bRa$ | $2^{n(n+1)/2}$ |
| Antisymmetric | $aRb \land bRa \Rightarrow a = b$ | $2^n \cdot 3^{n(n-1)/2}$ |
| Asymmetric | $aRb \Rightarrow \lnot bRa$ | $3^{n(n-1)/2}$ |
| Reflexive and symmetric | | $2^{n(n-1)/2}$ |
| Equivalence relations | reflexive, symmetric, transitive | Bell number $B_n$: 1, 2, 5, 15, 52, 203 |

- An **equivalence relation** corresponds exactly to a **partition** of $A$ into equivalence classes.
- Closures: reflexive closure $R \cup I$; symmetric closure $R \cup R^{-1}$; transitive closure $R^+$ (Warshall's algorithm, $O(n^3)$).
- Antisymmetric is **not** the opposite of symmetric: the empty relation and the identity relation are both.

> [!EXAMPLE] Checking transitivity
> $R = \{(1,2), (2,3), (1,3), (3,3)\}$ on {1, 2, 3}: every pair $(a,b), (b,c)$ has $(a,c)$: $(1,2),(2,3) \to (1,3)$ ✓, $(2,3),(3,3) \to (2,3)$ ✓, $(1,3),(3,3) \to (1,3)$ ✓. Transitive, not reflexive.

> [!RECALL] How many symmetric relations are there on a 3-element set?
> $2^{3 \cdot 4 / 2} = 2^6 = 64$.

> [!RECALL] How many equivalence relations are there on a 4-element set?
> The Bell number $B_4 = 15$.

## Functions

| Kind | Count from an $n$-set to an $m$-set |
|---|---|
| All functions | $m^n$ |
| One-to-one (injective), $n \le m$ | $\dfrac{m!}{(m-n)!}$ |
| Onto (surjective), $n \ge m$ | $\sum_{k=0}^{m} (-1)^k \binom{m}{k} (m-k)^n$ |
| Bijective, $n = m$ | $n!$ |

- If $g \circ f$ is injective then $f$ is injective; if $g \circ f$ is surjective then $g$ is surjective.
- A function has an inverse iff it is a bijection.
- **Pigeonhole:** placing $n$ items into $k$ boxes puts at least $\lceil n/k \rceil$ in some box.

> [!EXAMPLE] Onto functions
> From a 4-set onto a 3-set: $3^4 - \binom31 2^4 + \binom32 1^4 = 81 - 48 + 3 = 36$.

> [!RECALL] Number of one-to-one functions from a 3-set to a 5-set?
> $5 \cdot 4 \cdot 3 = 60$.

## Partial orders and lattices

A **partial order** is reflexive, antisymmetric and transitive; draw it as a **Hasse diagram** (omit loops and transitive edges, larger elements higher).

- **Maximal** element: nothing above it. **Greatest** element: above everything (unique if it exists). Same for minimal/least.
- **Chain:** totally ordered subset. **Antichain:** pairwise incomparable subset. Dilworth: the minimum number of chains covering a poset equals the size of its largest antichain.
- **Lattice:** every pair has a least upper bound (join $\lor$) and a greatest lower bound (meet $\land$).
- **Distributive** lattice: has no sublattice isomorphic to the diamond $M_3$ or the pentagon $N_5$.
- **Complemented:** bounded, and every element $a$ has $b$ with $a \lor b = 1$, $a \land b = 0$. In a distributive lattice complements are unique.
- **Boolean algebra** = complemented distributive lattice; isomorphic to $(\mathcal{P}(S), \subseteq)$, so it has $2^k$ elements.

**Divisor lattice $D_n$** (divisors of $n$ ordered by divisibility; join = lcm, meet = gcd): always distributive; complemented (hence Boolean) iff $n$ is square-free. $D_{30}$ is Boolean, $D_{12}$ is not.

> [!TRAP] Maximal is not greatest
> In the poset {2, 3, 6, 9} under divisibility, 6 and 9 are both maximal, so there is no greatest element.

> [!RECALL] Is the divisor lattice $D_{36}$ complemented?
> No: 36 is not square-free (6 has no complement).

## Groups and algebraic structures

| Structure | Axioms |
|---|---|
| Semigroup | closure, associativity |
| Monoid | + identity |
| Group | + every element has an inverse |
| Abelian group | + commutativity |

- Identity and inverses are unique; $(ab)^{-1} = b^{-1}a^{-1}$; cancellation laws hold.
- **Lagrange:** the order of a subgroup (and of any element) divides the order of the group. A group of prime order is cyclic.
- Every group of order at most 5 is abelian.
- A cyclic group of order $n$ has $\varphi(n)$ generators and exactly one subgroup of each order dividing $n$.
- $(\mathbb{Z}_n, +)$ is a group; $(\mathbb{Z}_n \setminus \{0\}, \times)$ is a group iff $n$ is prime. The units modulo $n$ form a group of order $\varphi(n)$.

> [!EXAMPLE] Order of an element
> In $(\mathbb{Z}_{12}, +)$ the element 8 has order $12/\gcd(8, 12) = 3$: $8, 16 \equiv 4, 24 \equiv 0$.

> [!RECALL] How many generators does a cyclic group of order 10 have?
> $\varphi(10) = 4$.

> [!RECALL] Can a group of order 15 have a subgroup of order 4?
> No: 4 does not divide 15 (Lagrange).

## Graph theory

**Basics:** $\sum \deg(v) = 2E$, so the number of odd-degree vertices is even. A simple graph on $n$ labelled vertices: $2^{\binom n2}$ possibilities. A tree has $n - 1$ edges; there are $n^{n-2}$ labelled trees.

**Connectivity:** a simple graph with $n$ vertices and more than $\binom{n-1}{2}$ edges is connected. With $k$ components it has at least $n - k$ edges.

**Euler and Hamilton**

| | Condition (connected graph) |
|---|---|
| Euler circuit | every vertex has even degree |
| Euler path (not circuit) | exactly two vertices of odd degree |
| Hamiltonian cycle (sufficient, Dirac) | every degree $\ge n/2$, $n \ge 3$ |

**Planarity:** for a connected planar graph $V - E + F = 2$; if simple with $V \ge 3$ then $E \le 3V - 6$, and $E \le 2V - 4$ if there are no triangles. $K_5$ and $K_{3,3}$ are not planar (Kuratowski).

**Colouring:** $\chi(G) = 2$ iff $G$ is bipartite with at least one edge iff it has no odd cycle. $\chi(K_n) = n$; $\chi(C_n) = 2$ for even $n$, 3 for odd $n$; trees have $\chi = 2$; planar graphs have $\chi \le 4$.

| Graph | Chromatic polynomial $P(k)$ |
|---|---|
| Tree on $n$ vertices | $k(k-1)^{n-1}$ |
| Complete graph $K_n$ | $k(k-1)(k-2)\cdots(k-n+1)$ |
| Cycle $C_n$ | $(k-1)^n + (-1)^n (k-1)$ |

**Matching and covers** (graph with $n$ vertices, no isolated vertices):

- independence number + vertex cover number $= n$;
- maximum matching + minimum edge cover $= n$ (Gallai);
- bipartite graphs: maximum matching = minimum vertex cover (König); Hall's condition for a perfect matching;
- $K_{2m}$ has $(2m-1)!! = \frac{(2m)!}{2^m m!}$ perfect matchings.

> [!EXAMPLE] Euler's formula
> A connected planar graph with 10 vertices, each of degree 3, has $E = 15$ edges, so $F = 2 - V + E = 7$ faces.

> [!TRAP] Degree sequences
> A sequence is a valid simple-graph degree sequence only if its sum is even **and** it passes Havel–Hakimi (repeatedly remove the largest $d$, subtract 1 from the next $d$ entries). (3, 3, 3, 1) has an even sum but fails.

> [!RECALL] When does a connected graph have an Euler circuit?
> When every vertex has even degree.

> [!RECALL] Maximum edges in a simple planar graph with 8 vertices?
> $3 \cdot 8 - 6 = 18$.

> [!RECALL] Number of proper 3-colourings of a path with 4 vertices?
> A path is a tree: $3 \cdot 2^3 = 24$.

## Combinatorics and counting

| Count | Formula |
|---|---|
| Arrangements of $r$ out of $n$ | $P(n, r) = \dfrac{n!}{(n-r)!}$ |
| Selections of $r$ out of $n$ | $\binom{n}{r}$ |
| Selections with repetition (stars and bars) | $\binom{n + r - 1}{r}$ |
| Non-negative integer solutions of $x_1 + \dots + x_k = n$ | $\binom{n + k - 1}{k - 1}$ |
| Arrangements of a multiset | $\dfrac{n!}{n_1!\,n_2! \cdots}$ |
| Circular arrangements | $(n - 1)!$ ($\frac{(n-1)!}{2}$ if reflections are the same) |
| Derangements | $D_n = n! \sum_{k=0}^{n} \frac{(-1)^k}{k!}$: $D_3 = 2, D_4 = 9, D_5 = 44$ |
| Lattice paths from (0, 0) to (m, n) | $\binom{m+n}{n}$ |
| Catalan number | $C_n = \frac{1}{n+1}\binom{2n}{n}$ |

**Inclusion–exclusion** counts "at least one" by alternating sums; it is how derangements and onto functions are derived.

> [!EXAMPLE] Stars and bars
> Solutions of $x_1 + x_2 + x_3 = 10$ with every $x_i \ge 1$: substitute $y_i = x_i - 1$ to get $y_1 + y_2 + y_3 = 7$: $\binom{9}{2} = 36$.

> [!TRAP] Distinguishable or not?
> Decide first whether the objects and the boxes are distinguishable. Identical balls into distinct boxes is stars and bars; distinct balls into distinct boxes is $k^n$; distinct balls into identical boxes uses Stirling numbers.

> [!RECALL] In how many ways can 5 letters go into 5 envelopes with none in the right one?
> $D_5 = 44$.

> [!RECALL] How many ways to choose 3 scoops from 5 ice-cream flavours, repeats allowed?
> $\binom{5 + 3 - 1}{3} = \binom{7}{3} = 35$.

## Recurrences and generating functions

**Linear homogeneous recurrences** $a_n = c_1 a_{n-1} + c_2 a_{n-2}$: solve the characteristic equation $r^2 = c_1 r + c_2$.

- Distinct roots $r_1, r_2$: $a_n = \alpha r_1^n + \beta r_2^n$.
- Repeated root $r$: $a_n = (\alpha + \beta n) r^n$.
- Non-homogeneous ($+ f(n)$): add a particular solution of the same form as $f(n)$, multiplied by $n$ if it collides with a root.

**Generating functions**

| Sequence | Generating function |
|---|---|
| $1, 1, 1, \dots$ | $\dfrac{1}{1-x}$ |
| $1, a, a^2, \dots$ | $\dfrac{1}{1-ax}$ |
| $1, 2, 3, \dots$ ($a_n = n+1$) | $\dfrac{1}{(1-x)^2}$ |
| $\binom{n+k-1}{k-1}$ | $\dfrac{1}{(1-x)^k}$ |
| $\binom{m}{n}$ | $(1+x)^m$ |

> [!EXAMPLE] Binary strings without "11"
> Let $a_n$ count length-$n$ strings with no two adjacent 1s. A string ends in 0 (any valid string of length $n-1$ before it) or in 01: $a_n = a_{n-1} + a_{n-2}$, $a_1 = 2$, $a_2 = 3$. So $a_n = F_{n+2}$; $a_5 = 13$.

> [!RECALL] Solve $a_n = 4a_{n-1} - 4a_{n-2}$.
> Root 2 is repeated: $a_n = (\alpha + \beta n)\,2^n$.

> [!RECALL] What is the coefficient of $x^n$ in $\frac{1}{(1-x)^2}$?
> $n + 1$.
