# Digital Logic

Boolean algebra and minimisation (algebraic, Karnaugh map, tabular), design of combinational and sequential circuits, and number representation with fixed- and floating-point arithmetic. Typically 5–9 marks per paper, often the easiest marks on the paper.

<!-- plan:start -->
## Battle plan

Expected **7 marks** per paper (5–9 across the 10 papers of 2021–26) · default budget **12 hours** · week 1 of the [13-week plan](#/strategy?h=the-13-week-plan).

| Priority | Topic | Last 10 papers | Learn by | Study, then practise |
|---|---|---|---|---|
| **A** | Boolean Algebra & Minimization | 22 marks · 8 papers | Solving | [Boolean algebra](#/subjects/dl/notes?h=boolean-algebra) · [Karnaugh-map minimisation](#/subjects/dl/notes?h=karnaugh-map-minimisation) · [Tabular (Quine–McCluskey) method](#/subjects/dl/notes?h=tabular-quine-mccluskey-method) → [31 questions](#/subjects/dl/pyq?topic=bool&years=pre2024) |
| **A** | Sequential Circuits | 14 marks · 6 papers | Solving | [Sequential circuits](#/subjects/dl/notes?h=sequential-circuits) → [15 questions](#/subjects/dl/pyq?topic=seq&years=pre2024) |
| **A** | Floating Point (IEEE 754) | 12 marks · 8 papers | Solving | [Floating point (IEEE 754)](#/subjects/dl/notes?h=floating-point-ieee-754) → [9 questions](#/subjects/dl/pyq?topic=fp&years=pre2024) |
| **A** | Number Systems & Fixed-Point Arithmetic | 11 marks · 10 papers | Solving | [Number representation](#/subjects/dl/notes?h=number-representation) → [18 questions](#/subjects/dl/pyq?topic=numsys&years=pre2024) |
| **A** | Combinational Circuits | 11 marks · 6 papers | Solving | [Combinational circuits](#/subjects/dl/notes?h=combinational-circuits) → [18 questions](#/subjects/dl/pyq?topic=comb&years=pre2024) |

**A**: master it and solve all its 2007–2023 questions. **B**: learn the method, then solve its questions. **C**: read once and keep its recall cards; solve its questions only if time is left. Keep the 2024–2026 papers unseen: they are your full-length mocks.

**How to study it**

- Every topic here is a procedure: K-map and Quine–McCluskey, multiplexer and decoder design, flip-flop and counter tracing, base conversion, IEEE 754 encoding. That is why it returns the most marks per hour in the syllabus: do it first.
- For each procedure, solve 3 past questions, then time yourself: a 2-mark question should take under 4 minutes.
<!-- plan:end -->

```widget
type: weightage-topics
```

```widget
type: weightage-trend
```

## Syllabus (GATE 2027)

> Boolean algebra and minimization – algebraic technique, Karnaugh map, tabular method. Design of combinational and sequential circuits. Number representation and arithmetic (fixed and floating point).

> [!IMPORTANT] Revised for 2027
> The minimisation methods are now named explicitly, including the **tabular (Quine–McCluskey)** method, and circuits are "design of" combinational and sequential circuits. See [what changed](#/syllabus?h=what-changed-from-gate-2026).

## Topic checklist

```widget
type: checklist
```

## How to prepare

1. **Number representation** appears in every recent paper: 2's complement ranges and overflow, base conversion, IEEE 754 encoding and special values.
2. **Minimisation:** K-maps with don't-cares, counting prime and essential prime implicants, and one or two full Quine–McCluskey runs.
3. **Combinational design:** adders, multiplexer and decoder implementations of a given function, gate counts.
4. **Sequential circuits:** flip-flop equations and excitation tables, counter state sequences, maximum clock frequency.

## Question patterns to expect

| Pattern | What to practise | Notes |
|---|---|---|
| Minimal SOP / number of PIs or EPIs | K-map grouping, QM chart | [K-maps](#/subjects/dl/notes?h=karnaugh-map-minimisation), [Tabular](#/subjects/dl/notes?h=tabular-quine-mccluskey-method) |
| Function realised by a MUX/decoder circuit | Expand per select value | [Combinational](#/subjects/dl/notes?h=combinational-circuits) |
| Sequence of states of a counter | Next-state table from flip-flop inputs | [Sequential](#/subjects/dl/notes?h=sequential-circuits) |
| IEEE 754 encoding / value of a bit pattern | Bias, hidden bit, special cases | [Floating point](#/subjects/dl/notes?h=floating-point-ieee-754) |
| Range, overflow, conversion | Signed representations | [Number representation](#/subjects/dl/notes?h=number-representation) |

## Go deeper

- Standard text: M. Morris Mano, *Digital Design*.
- Booth's multiplication and carry-lookahead adders are in [COA](#/subjects/coa/notes?h=alu-design-and-arithmetic).
- Drill the [previous-year questions](#/subjects/dl/pyq).
