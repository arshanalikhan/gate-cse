# Databases

The ER model, relational algebra, tuple calculus and SQL, integrity constraints and normal forms, file organisation and B/B+ tree indexes, and transactions with concurrency control. Typically 5–9 marks per paper.

<!-- plan:start -->
## Battle plan

Expected **7.3 marks** per paper (5–9 across the 10 papers of 2021–26) · default budget **20 hours** · weeks 8–9 of the [13-week plan](#/strategy?h=the-13-week-plan).

| Priority | Topic | Last 10 papers | Learn by | Study, then practise |
|---|---|---|---|---|
| **A** | FDs, Keys & Normalization | 21 marks · 9 papers | Solving | [Functional dependencies and keys](#/subjects/db/notes?h=functional-dependencies-and-keys) · [Normal forms and decomposition](#/subjects/db/notes?h=normal-forms-and-decomposition) → [21 questions](#/subjects/db/pyq?topic=fd&years=pre2024) |
| **A** | Transactions & Concurrency Control | 16 marks · 8 papers | Solving | [Transactions and schedules](#/subjects/db/notes?h=transactions-and-schedules) · [Concurrency control](#/subjects/db/notes?h=concurrency-control) → [22 questions](#/subjects/db/pyq?topic=txn&years=pre2024) |
| **A** | File Organization & Indexing (B/B+ Trees) | 10 marks · 7 papers | Solving | [File organisation and indexing](#/subjects/db/notes?h=file-organisation-and-indexing) → [17 questions](#/subjects/db/pyq?topic=idx&years=pre2024) |
| **A** | SQL | 10 marks · 5 papers | Solving | [SQL](#/subjects/db/notes?h=sql) → [19 questions](#/subjects/db/pyq?topic=sql&years=pre2024) |
| **B** | Relational Algebra | 7 marks · 4 papers | Solving | [Relational algebra](#/subjects/db/notes?h=relational-algebra) → [13 questions](#/subjects/db/pyq?topic=ra&years=pre2024) |
| **B** | ER Model & Relational Basics | 5 marks · 5 papers | Both | [ER model](#/subjects/db/notes?h=er-model) · [Relational model and integrity constraints](#/subjects/db/notes?h=relational-model-and-integrity-constraints) → [13 questions](#/subjects/db/pyq?topic=er&years=pre2024) |
| **B** | Tuple Relational Calculus | 4 marks · 2 papers | Solving | [Tuple relational calculus](#/subjects/db/notes?h=tuple-relational-calculus) → [2 questions](#/subjects/db/pyq?topic=trc&years=pre2024) |

**A**: master it and solve all its 2007–2023 questions. **B**: learn the method, then solve its questions. **C**: read once and keep its recall cards; solve its questions only if time is left. Keep the 2024–2026 papers unseen: they are your full-length mocks.

**How to study it**

- Functional dependencies and normal forms (21 marks) are an algorithm: closures, candidate keys, prime attributes, then the four-step test in the notes.
- Transactions (16): draw the precedence graph; decide recoverable, cascadeless and strict from the order of commits.
- SQL and B+ trees (10 each): run the query on a three-row table; solve the B+ order inequalities.
<!-- plan:end -->

```widget
type: weightage-topics
```

```widget
type: weightage-trend
```

## Syllabus (GATE 2027)

> ER-model. Relational model: relational algebra, tuple calculus, SQL. Integrity constraints, normal forms. File organization, indexing (e.g., B and B+ trees). Transactions and concurrency control.

Unchanged from 2026.

## Topic checklist

```widget
type: checklist
```

## How to prepare

1. **Functional dependencies and normal forms** are asked almost every year: closures, candidate keys, highest normal form, lossless and dependency-preserving decompositions.
2. **Transactions:** precedence graphs, recoverability classes, 2PL and timestamp schemes. Read every schedule operation by operation.
3. **SQL:** output-of-query questions with NULLs, GROUP BY/HAVING, nested and correlated subqueries; evaluate on the given table by hand.
4. **Indexing:** B+ tree order and height calculations, number of block accesses, insertion with splits.
5. **Relational algebra / TRC:** division and "for all" queries; equivalence of expressions.

## Question patterns to expect

| Pattern | What to practise | Notes |
|---|---|---|
| Candidate keys / highest normal form | Closures; 2NF, 3NF, BCNF tests | [FDs](#/subjects/db/notes?h=functional-dependencies-and-keys), [Normal forms](#/subjects/db/notes?h=normal-forms-and-decomposition) |
| Is the schedule conflict serialisable / recoverable | Precedence graph; commit order | [Schedules](#/subjects/db/notes?h=transactions-and-schedules) |
| Output of an SQL query | NULL logic, grouping, subqueries | [SQL](#/subjects/db/notes?h=sql) |
| Order / height of a B+ tree; block accesses | Node-size inequalities | [Indexing](#/subjects/db/notes?h=file-organisation-and-indexing) |
| Minimum number of tables | ER-to-relational mapping | [ER model](#/subjects/db/notes?h=er-model) |
| What a relational-algebra query returns | Division, joins, projections | [Relational algebra](#/subjects/db/notes?h=relational-algebra) |

## Go deeper

- Standard text: Silberschatz, Korth & Sudarshan, *Database System Concepts* ([companion site](https://db-book.com/)).
- Drill the [previous-year questions](#/subjects/db/pyq).
