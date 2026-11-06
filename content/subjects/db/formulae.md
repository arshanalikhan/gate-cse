# Databases: formulae

Revision sheet. Explanations and examples are in the [notes](#/subjects/db/notes).

## Keys and ER mapping

| Quantity | Value |
|---|---|
| Superkeys with one candidate key of $k$ of $n$ attributes | $2^{n-k}$ |
| Superkeys with two keys $K_1, K_2$ | $2^{n-\lvert K_1\rvert} + 2^{n-\lvert K_2\rvert} - 2^{n-\lvert K_1 \cup K_2\rvert}$ |
| 1:N relationship | foreign key on the N side, no extra table |
| M:N relationship | separate table |
| Multivalued attribute | separate table |
| Weak entity | table with owner's key + partial key |

## Relational algebra

| Quantity | Value |
|---|---|
| $\lvert R \times S \rvert$ | $\lvert R\rvert \cdot \lvert S\rvert$ |
| $\lvert R \bowtie S \rvert$ | between 0 and $\lvert R\rvert \cdot \lvert S\rvert$ |
| FK join (non-null FK in $R$ → key of $S$) | exactly $\lvert R\rvert$ |
| $\lvert \pi_A(R)\rvert$ | $\le \lvert R\rvert$ (duplicates removed) |
| Division | $\pi_X(R) - \pi_X((\pi_X(R) \times S) - R)$ |
| "for all" | division, or $\lnot\exists\,\lnot$ in TRC |

## SQL

| Rule | Value |
|---|---|
| Clause order of evaluation | FROM, WHERE, GROUP BY, HAVING, SELECT, DISTINCT, ORDER BY |
| Comparison with NULL | unknown (row dropped by WHERE) |
| `COUNT(*)` vs `COUNT(col)` | all rows vs non-NULL values |
| `AVG(col)` | sum of non-NULL / count of non-NULL |
| `UNION` vs `UNION ALL` | removes vs keeps duplicates |
| `x > ALL (empty)` | true |
| `x NOT IN (… NULL …)` | never true |

## Functional dependencies

| Quantity | Value |
|---|---|
| Armstrong's axioms | reflexivity, augmentation, transitivity |
| Derived rules | union, decomposition, pseudo-transitivity |
| Superkey test | $X^+ = R$ |
| $F \models X \to Y$ | $Y \subseteq X^+$ |
| Always in every key | attributes on no right-hand side |

## Normal forms (FD $X \to A$, non-trivial)

| Form | Condition |
|---|---|
| 2NF | no non-prime $A$ depends on a proper subset of a key |
| 3NF | $X$ superkey or $A$ prime |
| BCNF | $X$ superkey |
| Lossless binary split | $R_1 \cap R_2 \to R_1$ or $\to R_2$ |
| 3NF synthesis | lossless + dependency preserving |
| BCNF decomposition | lossless, maybe not dependency preserving |

## Files and indexes

| Quantity | Formula |
|---|---|
| Blocking factor | $\lfloor B / R \rfloor$ |
| Blocks for $r$ records | $\lceil r / bfr \rceil$ |
| Binary search on $b$ blocks | $\lceil \log_2 b \rceil$ accesses |
| Primary index entries | number of data blocks (sparse) |
| Secondary index entries | number of records (dense) |
| Multilevel index levels | $\lceil \log_{fo} b \rceil$ |
| B+ internal order $p$ | $pP + (p-1)K \le B$ |
| B+ leaf order | $p_{leaf}(K + P_r) + P \le B$ |
| B-tree order $p$ node | $\le p$ children, $\le p - 1$ keys, $\ge \lceil p/2 \rceil$ children (non-root) |

## Transactions

| Property | Test |
|---|---|
| Conflict | different transactions, same item, at least one write |
| Conflict serialisable | acyclic precedence graph |
| View serialisable | same initial reads, reads-from, final writes as a serial schedule |
| Recoverable | writer commits before reader commits |
| Cascadeless | read only committed data |
| Hierarchy | strict ⊂ cascadeless ⊂ recoverable; CSR ⊂ VSR |
| 2PL | growing then shrinking; ensures CSR, not deadlock-freedom |
| Strict 2PL | X locks held to commit; strict schedules |
| Wait–die | older waits, younger dies |
| Wound–wait | older wounds younger, younger waits |
