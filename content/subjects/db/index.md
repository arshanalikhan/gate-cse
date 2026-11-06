# Databases

The ER model, relational algebra, tuple calculus and SQL, integrity constraints and normal forms, file organisation and B/B+ tree indexes, and transactions with concurrency control. Typically 5–9 marks per paper.

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
