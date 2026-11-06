# Compiler Design

Lexical analysis, parsing, syntax-directed translation, runtime environments, intermediate code generation, local optimisation and data-flow analysis. Typically 4–8 marks per paper; a small subject where the questions are very predictable.

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
