# Databases: notes

Exam-focused notes for GATE 2027 Section 9. Functional dependencies with normal forms and transactions with concurrency control carry most of the marks; SQL and B+ trees follow.

## ER model

**Priority B** · last 10 papers: 5 marks, asked in 5 (for ER Model & Relational Basics as a whole) · learn by solving + recall cards · practise: [13 questions from 2007–2023 →](#/subjects/db/pyq?topic=er&years=pre2024)

**Key idea:** an ER diagram describes entity sets, their attributes and the relationship sets between them; GATE asks how it maps to tables.

- Attributes: simple or composite, single- or multi-valued, stored or derived.
- **Cardinality ratio** (1:1, 1:N, M:N) and **participation** (total = every entity takes part, drawn as a double line; partial otherwise).
- A **weak entity** has no key of its own; it is identified by its owner's key plus a partial key, and always has total participation in its identifying relationship.

**Mapping to relations (minimum number of tables):**

| Construct | Tables |
|---|---|
| Strong entity | one table |
| Weak entity | one table including the owner's key |
| 1:N relationship | no table; put the "1" side's key as a foreign key on the N side |
| 1:1 relationship | no table; foreign key on either side (prefer the total-participation side) |
| M:N relationship | its own table with both keys |
| Multivalued attribute | its own table |

> [!EXAMPLE]
> Entities Student and Course (M:N "enrols"), and Department (1:N "has" Student). Minimum tables: Student (with dept FK), Course, Department, Enrols = 4.

> [!RECALL] How is an M:N relationship represented in the relational model?
> - [ ] Merging both entities into one table
> - [ ] A foreign key on the N side
> - [x] A separate table keyed by both entities' keys
> - [ ] A foreign key on the M side
>
> As a separate table whose key combines the keys of both participating entities.

## Relational model and integrity constraints

**Priority B** · last 10 papers: 5 marks, asked in 5 (for ER Model & Relational Basics as a whole) · learn by solving + recall cards · practise: [13 questions from 2007–2023 →](#/subjects/db/pyq?topic=er&years=pre2024)

| Key | Definition |
|---|---|
| Superkey | set of attributes that uniquely identifies a tuple |
| Candidate key | minimal superkey |
| Primary key | the candidate key chosen; cannot be NULL |
| Foreign key | attributes referring to a key of another (or the same) relation |

- **Entity integrity:** primary-key attributes are never NULL.
- **Referential integrity:** a foreign-key value must match an existing referenced key or be NULL. Deleting a referenced tuple is rejected, cascaded (`ON DELETE CASCADE`) or set to NULL, as declared.
- Number of superkeys of $R$ with $n$ attributes and a single candidate key of $k$ attributes: $2^{n-k}$. With several candidate keys, use inclusion–exclusion.

> [!RECALL] $R(A, B, C, D)$ has candidate keys $A$ and $BC$. How many superkeys?
> - [ ] 11
> - [ ] 12
> - [ ] 8
> - [x] 10
>
> Supersets of $A$: $2^3 = 8$; of $BC$: $2^2 = 4$; of both ($ABC$): $2^1 = 2$. Total $8 + 4 - 2 = 10$.

## Relational algebra

**Priority B** · last 10 papers: 7 marks, asked in 4 · learn by solving · practise: [13 questions from 2007–2023 →](#/subjects/db/pyq?topic=ra&years=pre2024)

| Operator | Meaning |
|---|---|
| $\sigma_{p}(R)$ | rows satisfying $p$ |
| $\pi_{A}(R)$ | columns $A$, **duplicates removed** |
| $R \times S$ | all pairs: $\lvert R\rvert \cdot \lvert S\rvert$ tuples |
| $R \bowtie S$ | natural join on equal common attributes |
| $R \cup S$, $R - S$, $R \cap S$ | set operations on union-compatible relations |
| $\rho$ | rename |
| $R \div S$ | tuples of $R$ (on the non-$S$ attributes) related to **every** tuple of $S$ |
| ⟕, ⟖, ⟗ | left, right, full outer join (pad with NULL) |

- Division answers "for all" questions: students who took **all** courses $= \pi_{sid,cid}(\text{Takes}) \div \pi_{cid}(\text{Course})$.
- $R \div S = \pi_X(R) - \pi_X\bigl((\pi_X(R) \times S) - R\bigr)$, where $X$ = attributes of $R$ not in $S$.
- Natural join of relations with no common attribute is a Cartesian product.

> [!TRAP] Size of a join
> $R \bowtie S$ can have anywhere from 0 to $\lvert R\rvert \cdot \lvert S\rvert$ tuples. If the common attribute is a key of $S$ and a foreign key in $R$ (not NULL), the join has exactly $\lvert R\rvert$ tuples.

> [!RECALL] Which relational-algebra operator expresses "for every"?
> - [ ] Cartesian product ($\times$)
> - [ ] Natural join ($\bowtie$)
> - [ ] Projection ($\pi$)
> - [x] Division ($\div$)
>
> Division ($\div$).

## Tuple relational calculus

**Priority B** · last 10 papers: 4 marks, asked in 2 · learn by solving · practise: [2 questions from 2007–2023 →](#/subjects/db/pyq?topic=trc&years=pre2024)

Queries have the form $\{t \mid P(t)\}$, e.g. employees earning over 50000: $\{t \mid t \in \text{Emp} \land t.\text{salary} > 50000\}$.

- "For all" is written with $\forall$ or as $\lnot\exists \dots \lnot$.
- An expression is **safe** if its result is finite and drawn from values in the database; $\{t \mid \lnot (t \in R)\}$ is unsafe.
- Safe TRC, safe domain calculus and relational algebra have exactly the same expressive power (relational completeness).

> [!RECALL] Why is $\{t \mid \lnot(t \in R)\}$ not allowed?
> - [ ] $R$ might be empty
> - [ ] Tuple calculus does not allow negation
> - [x] It is unsafe: it describes infinitely many tuples not from the database
> - [ ] It returns exactly the tuples of $R$
>
> It is unsafe: it describes infinitely many tuples not drawn from the database.

## SQL

**Priority A** · last 10 papers: 10 marks, asked in 5 · learn by solving · practise: [19 questions from 2007–2023 →](#/subjects/db/pyq?topic=sql&years=pre2024)

Evaluation order of a query: `FROM` → `WHERE` → `GROUP BY` → `HAVING` → `SELECT` → `DISTINCT` → `ORDER BY`.

- SQL tables are **bags**: duplicates stay unless you use `DISTINCT`. `UNION`, `INTERSECT`, `EXCEPT` remove duplicates; `UNION ALL` keeps them.
- `WHERE` filters rows before grouping; `HAVING` filters groups and may use aggregates.
- **NULL:** any comparison with NULL is *unknown*, and `WHERE` keeps only *true* rows, so `salary <> 1000` drops NULL salaries. Use `IS NULL`.
- Aggregates ignore NULLs, except `COUNT(*)` which counts rows. `AVG(x)` divides by the number of non-NULL values.
- `x IN (subquery)`, `EXISTS (subquery)`, `x > ALL (...)`, `x > ANY (...)`. `x > ALL` of an empty set is true; `x NOT IN` a set containing NULL is never true.
- A **correlated** subquery refers to the outer row and is re-evaluated for each outer row.

> [!EXAMPLE] Second highest salary
> `SELECT MAX(salary) FROM Emp WHERE salary < (SELECT MAX(salary) FROM Emp);`

> [!TRAP] COUNT and NULL
> In a table with 10 rows where 3 have NULL `bonus`: `COUNT(*) = 10`, `COUNT(bonus) = 7`, and `AVG(bonus)` averages over 7 values.

> [!RECALL] What does `SELECT COUNT(*) FROM R WHERE x <> 5` count when some `x` are NULL?
> - [ ] All rows, NULLs included
> - [ ] Only the NULL rows
> - [ ] All rows except those with `x = 5`
> - [x] Rows with a non-NULL `x` other than 5
>
> Rows with a non-NULL `x` different from 5; NULL rows evaluate to unknown and are excluded.

## Functional dependencies and keys

**Priority A** · last 10 papers: 21 marks, asked in 9 (for FDs, Keys & Normalization as a whole) · learn by solving · practise: [21 questions from 2007–2023 →](#/subjects/db/pyq?topic=fd&years=pre2024)

$X \to Y$: tuples that agree on $X$ agree on $Y$.

**Armstrong's axioms:** reflexivity ($Y \subseteq X \Rightarrow X \to Y$), augmentation ($X \to Y \Rightarrow XZ \to YZ$), transitivity. Derived: union, decomposition, pseudo-transitivity.

**Attribute closure** $X^+$: start with $X$; repeatedly add the right side of any FD whose left side is inside the current set. $X$ is a superkey iff $X^+$ contains every attribute.

**Finding candidate keys:** attributes that never appear on any right-hand side must be in every key; start from them and add attributes until the closure is everything; check minimality.

**Minimal (canonical) cover:** split right-hand sides into single attributes, remove extraneous left-hand attributes, then remove redundant FDs.

> [!EXAMPLE] Candidate keys
> $R(A, B, C, D)$, $F = \{AB \to C,\; C \to D,\; D \to A\}$. $B$ is on no right-hand side, so it is in every key. $(AB)^+ = ABCD$, $(BC)^+ = BCDA$, $(BD)^+ = BDAC$; $B^+ = B$. Candidate keys: $AB$, $BC$, $BD$.

> [!RECALL] What is $X^+$ used for?
> - [x] Testing superkeys and whether an FD follows from $F$
> - [ ] Checking a schedule for conflicts
> - [ ] Counting the tuples of $R$
> - [ ] Choosing the primary index
>
> Testing whether $X$ is a superkey and whether an FD $X \to Y$ follows from $F$ ($Y \subseteq X^+$).

## Normal forms and decomposition

**Priority A** · last 10 papers: 21 marks, asked in 9 (for FDs, Keys & Normalization as a whole) · learn by solving · practise: [21 questions from 2007–2023 →](#/subjects/db/pyq?topic=fd&years=pre2024)

A **prime** attribute belongs to some candidate key.

| Normal form | Condition (for every non-trivial FD $X \to A$) |
|---|---|
| 1NF | atomic attribute values |
| 2NF | no non-prime attribute depends on a **proper subset** of a candidate key |
| 3NF | $X$ is a superkey **or** $A$ is prime |
| BCNF | $X$ is a superkey |
| 4NF | for every non-trivial MVD $X \twoheadrightarrow Y$, $X$ is a superkey |

BCNF ⊂ 3NF ⊂ 2NF ⊂ 1NF. A relation with only two attributes is always in BCNF.

> [!TIP] Method: the highest normal form in four steps
> 1. Find every candidate key: start from the attributes that appear on no right-hand side and grow them with closures.
> 2. Mark the **prime** attributes (those in some candidate key).
> 3. Split right-hand sides into single attributes. For each non-trivial FD $X \to A$: if $X$ is a superkey, it breaks nothing. Otherwise, if $A$ is prime, it breaks only BCNF. Otherwise, if $X$ is a proper subset of a candidate key, it breaks 2NF. Otherwise it breaks 3NF ($X$ is neither a key nor part of one, and $A$ is non-prime).
> 4. The relation is in the highest form that no FD breaks.

**Decomposition properties**

- **Lossless join** for $R \to (R_1, R_2)$: the common attributes $R_1 \cap R_2$ functionally determine $R_1$ or $R_2$.
- **Dependency preserving:** the union of the FDs projected onto the parts implies all of $F$.
- 3NF synthesis is always lossless and dependency preserving; BCNF decomposition is always lossless but may lose dependencies.

> [!EXAMPLE] Highest normal form
> In the example above ($AB \to C$, $C \to D$, $D \to A$; keys $AB, BC, BD$), every attribute is prime. $C \to D$ and $D \to A$ violate BCNF (their left sides are not superkeys) but satisfy 3NF ($D$ and $A$ are prime). Highest normal form: 3NF.

> [!TRAP] 2NF checks only non-prime attributes
> A partial dependency of a **prime** attribute on part of a key does not violate 2NF or 3NF.

> [!RECALL] When is the decomposition of $R$ into $R_1$ and $R_2$ lossless?
> - [ ] Whenever $R_1 \cup R_2 = R$
> - [ ] When both $R_1$ and $R_2$ are in BCNF
> - [x] When $R_1 \cap R_2$ is a key of $R_1$ or of $R_2$
> - [ ] When $R_1 \cap R_2 = \emptyset$
>
> When $R_1 \cap R_2 \to R_1$ or $R_1 \cap R_2 \to R_2$ holds (the common attributes are a key of one side).

> [!RECALL] Which is guaranteed by BCNF decomposition but not dependency preservation?
> - [ ] Neither
> - [ ] Dependency preservation
> - [x] Lossless join
> - [ ] Both
>
> Lossless join.

## File organisation and indexing

**Priority A** · last 10 papers: 10 marks, asked in 7 · learn by solving · practise: [17 questions from 2007–2023 →](#/subjects/db/pyq?topic=idx&years=pre2024)

**Blocking factor** $bfr = \lfloor B / R \rfloor$ records per block ($B$ = block size, $R$ = record size); a file of $r$ records needs $\lceil r / bfr \rceil$ blocks.

| Index | On | Dense or sparse |
|---|---|---|
| Primary | ordering key field of a sorted file | sparse (one entry per block) |
| Clustering | ordering non-key field | sparse (one entry per distinct value) |
| Secondary | any other field | dense (one entry per record) |

A file has at most one primary or clustering index, but any number of secondary indexes. Binary search on $b$ index blocks costs $\lceil \log_2 b \rceil$ block accesses, plus one for the data block. A **multilevel index** with fan-out $fo$ needs about $\lceil \log_{fo} b \rceil$ levels.

**B-tree of order $p$:** each node has at most $p$ children and $p - 1$ keys; every non-root node is at least half full; all leaves at the same level; keys with record pointers can live in any node.

**B+ tree:** internal nodes hold only keys and child pointers; all record pointers are in the leaves, which are linked for range scans. Order calculations with block size $B$, key size $K$, block-pointer size $P$, record-pointer size $P_r$:

$$\text{internal: } p \cdot P + (p - 1)\,K \le B, \qquad \text{leaf: } p_{leaf}\,(K + P_r) + P \le B$$

> [!EXAMPLE] B+ tree order
> $B = 512$, $K = 9$, $P = 6$, $P_r = 7$: internal $6p + 9(p - 1) \le 512 \Rightarrow p = 34$; leaf $16\,p_{leaf} + 6 \le 512 \Rightarrow p_{leaf} = 31$.

> [!RECALL] Why are B+ trees preferred over B-trees for range queries?
> - [x] Keys sit in linked leaves: one descent, then a sequential leaf scan
> - [ ] B+ trees keep records in internal nodes
> - [ ] B+ trees are always one level shorter
> - [ ] B-trees cannot store duplicate keys
>
> All keys sit in linked leaves, so a range is one descent followed by a sequential leaf scan; internal nodes also hold more keys (higher fan-out, fewer levels).

## Transactions and schedules

**Priority A** · last 10 papers: 16 marks, asked in 8 (for Transactions & Concurrency Control as a whole) · learn by solving · practise: [22 questions from 2007–2023 →](#/subjects/db/pyq?topic=txn&years=pre2024)

**ACID:** atomicity (all or nothing, via logging/undo), consistency, isolation (concurrency control), durability (redo log).

Two operations **conflict** if they belong to different transactions, access the same item, and at least one is a write.

| Property | Test |
|---|---|
| Conflict serialisable | precedence graph ($T_i \to T_j$ for each conflict with $T_i$'s operation first) is acyclic; any topological order is an equivalent serial schedule |
| View serialisable | same initial reads, same reads-from, same final writes as some serial schedule; differs from conflict serialisability only with blind writes |
| Recoverable | if $T_j$ reads an item written by $T_i$, then $T_i$ commits before $T_j$ commits |
| Cascadeless | transactions read only committed data |
| Strict | no item written by an uncommitted transaction is read **or overwritten** |

Strict ⊂ cascadeless ⊂ recoverable. Conflict serialisable ⊂ view serialisable.

> [!TIP] Method: classify a schedule in one pass
> 1. List the conflicting pairs in order and draw the precedence graph. Acyclic means conflict serialisable; a topological order gives the serial schedule.
> 2. If there is a cycle, look for blind writes. Only then can the schedule still be view serialisable.
> 3. For every "$T_j$ reads an item that $T_i$ wrote": if $T_j$ commits before $T_i$, the schedule is not recoverable; if the read comes before $T_i$ commits, it is not cascadeless.
> 4. Strict also forbids overwriting an item whose writer has not yet committed.

> [!EXAMPLE] View but not conflict serialisable
> $r_1(A)\; w_2(A)\; w_1(A)\; w_3(A)$. Conflicts give $T_1 \to T_2$ and $T_2 \to T_1$, a cycle, so it is not conflict serialisable. It is view equivalent to $T_1 T_2 T_3$: $T_1$ reads the initial $A$ and $T_3$ writes last ($T_2$ and $T_3$ are blind writes).

> [!TRAP] Recoverable is about commit order
> A schedule where $T_2$ reads $T_1$'s uncommitted write and then **commits before $T_1$** is not recoverable, even if it is serialisable.

> [!RECALL] What does a cycle in the precedence graph tell you?
> - [x] The schedule is not conflict serialisable
> - [ ] The schedule is not recoverable
> - [ ] The schedule is deadlocked
> - [ ] The schedule is not view serialisable
>
> The schedule is not conflict serialisable (it might still be view serialisable if there are blind writes).

## Concurrency control

**Priority A** · last 10 papers: 16 marks, asked in 8 (for Transactions & Concurrency Control as a whole) · learn by solving · practise: [22 questions from 2007–2023 →](#/subjects/db/pyq?topic=txn&years=pre2024)

| Lock held \ requested | S | X |
|---|---|---|
| S | compatible | conflict |
| X | conflict | conflict |

- **Two-phase locking (2PL):** all lock acquisitions come before any release (growing then shrinking phase). It guarantees conflict serialisability but **not** freedom from deadlock or cascading aborts.
- **Strict 2PL:** hold exclusive locks until commit; schedules are strict (no cascading aborts). **Rigorous 2PL:** hold all locks until commit.
- **Timestamp ordering:** each item keeps the largest read and write timestamps; an operation arriving "too late" aborts its transaction. **Thomas's write rule** ignores an outdated write instead of aborting, allowing some view-serialisable schedules.
- **Deadlock prevention with timestamps** (older = smaller timestamp):

| Scheme | Older requests a lock held by younger | Younger requests a lock held by older |
|---|---|---|
| Wait–die | older waits | younger dies (restarts with the same timestamp) |
| Wound–wait | older wounds (aborts) the younger | younger waits |

> [!RECALL] Does basic 2PL prevent deadlocks?
> - [ ] Yes, always
> - [ ] Only for shared locks
> - [ ] Yes, if locks are released only at commit
> - [x] No
>
> No. It guarantees conflict serialisability; deadlocks can still occur.

> [!RECALL] In wound–wait, what happens when a younger transaction requests a lock held by an older one?
> - [ ] The younger transaction is rolled back
> - [ ] Both are rolled back
> - [ ] The older transaction is rolled back (wounded)
> - [x] The younger transaction waits
>
> The younger transaction waits.
