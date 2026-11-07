# Compiler Design

Lexical analysis, parsing, syntax-directed translation, runtime environments, intermediate code generation, local optimisation and data-flow analysis. Typically 4–8 marks per paper; a small subject where the questions are very predictable.

<!-- plan:start -->
## Battle plan

Expected **6.7 marks** per paper (4–8 across the 10 papers of 2021–26) · default budget **14 hours** · week 8 of the [13-week plan](#/strategy?h=the-13-week-plan).

| Priority | Topic | Last 10 papers | Learn by | Study, then practise |
|---|---|---|---|---|
| **A** | Parsing (LL/LR) | 24 marks · 9 papers | Solving | [Grammars, FIRST and FOLLOW](#/subjects/cd/notes?h=grammars-first-and-follow) · [LL(1) parsing](#/subjects/cd/notes?h=ll-1-parsing) · [LR parsing](#/subjects/cd/notes?h=lr-parsing) → [31 questions](#/subjects/cd/pyq?topic=parse&years=pre2024) |
| **A** | Syntax-Directed Translation | 12 marks · 7 papers | Solving | [Syntax-directed translation](#/subjects/cd/notes?h=syntax-directed-translation) → [6 questions](#/subjects/cd/pyq?topic=sdt&years=pre2024) |
| **A** | Code Optimization & Data-Flow Analysis | 11 marks · 5 papers | Both | [Code optimisation](#/subjects/cd/notes?h=code-optimisation) · [Data-flow analysis](#/subjects/cd/notes?h=data-flow-analysis) → [11 questions](#/subjects/cd/pyq?topic=opt&years=pre2024) |
| **A** | Intermediate Code & Basic Blocks | 10 marks · 6 papers | Solving | [Intermediate code and basic blocks](#/subjects/cd/notes?h=intermediate-code-and-basic-blocks) → [8 questions](#/subjects/cd/pyq?topic=icg&years=pre2024) |
| **B** | Lexical Analysis & Compiler Phases | 6 marks · 5 papers | Solving | [Phases of a compiler](#/subjects/cd/notes?h=phases-of-a-compiler) · [Lexical analysis](#/subjects/cd/notes?h=lexical-analysis) → [11 questions](#/subjects/cd/pyq?topic=lex&years=pre2024) |
| **B** | Runtime Environments | 4 marks · 3 papers | Both | [Runtime environments](#/subjects/cd/notes?h=runtime-environments) → [8 questions](#/subjects/cd/pyq?topic=runtime&years=pre2024) |

**A**: master it and solve all its 2007–2023 questions. **B**: learn the method, then solve its questions. **C**: read once and keep its recall cards; solve its questions only if time is left. Keep the 2024–2026 papers unseen: they are your full-length mocks.

**How to study it**

- Parsing is 24 of 67 marks: FIRST and FOLLOW, the LL(1) table, LR(0) and SLR item sets. Drill until you can build a table in about 6 minutes.
- Syntax-directed translation, basic blocks and data-flow analysis are mechanical evaluation. At 6.7 marks a paper this is not a subject to defer.
<!-- plan:end -->

```widget
type: weightage-topics
```

```widget
type: weightage-trend
```

## Syllabus (GATE 2027)

> Lexical analysis, parsing, syntax-directed translation. Runtime environments. Intermediate code generation. Local optimisation, Data flow analyses: constant propagation, liveness analysis, common sub expression elimination.

Unchanged from 2026.

## Topic checklist

```widget
type: checklist
```

## How to prepare

1. **Parsing** is half the subject: FIRST and FOLLOW, LL(1) table conflicts, LR(0)/SLR item sets, and the power ordering of LR parsers.
2. **Syntax-directed translation:** evaluate an SDT on an input (order of actions), S- vs L-attributed definitions.
3. **Intermediate code:** count basic blocks, build DAGs, convert to SSA and count variables.
4. **Data-flow analysis:** liveness and available expressions by hand on a small CFG.
5. **Quick marks:** token counting, which phase detects which error, parameter-passing outputs.

## Question patterns to expect

| Pattern | What to practise | Notes |
|---|---|---|
| FIRST / FOLLOW sets, LL(1) table entries | Rules applied mechanically | [FIRST and FOLLOW](#/subjects/cd/notes?h=grammars-first-and-follow), [LL(1)](#/subjects/cd/notes?h=ll-1-parsing) |
| Is the grammar LL(1) / SLR(1) / LALR(1) | Build items; look for conflicts | [LR parsing](#/subjects/cd/notes?h=lr-parsing) |
| Output of an SDT for an input | Follow the reductions | [SDT](#/subjects/cd/notes?h=syntax-directed-translation) |
| Number of basic blocks / DAG nodes / SSA variables | Leaders; shared nodes | [Basic blocks](#/subjects/cd/notes?h=intermediate-code-and-basic-blocks) |
| Live variables at a point | Backward equations | [Data-flow analysis](#/subjects/cd/notes?h=data-flow-analysis) |
| Number of tokens | Longest match | [Lexical analysis](#/subjects/cd/notes?h=lexical-analysis) |

## Go deeper

- Standard text: Aho, Lam, Sethi & Ullman, *Compilers: Principles, Techniques, and Tools* (the Dragon Book).
- Grammars and automata background: [Theory of Computation](#/subjects/toc).
- Drill the [previous-year questions](#/subjects/cd/pyq).
