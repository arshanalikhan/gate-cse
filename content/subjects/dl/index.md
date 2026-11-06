# Digital Logic

Boolean algebra and minimisation (algebraic, Karnaugh map, tabular), design of combinational and sequential circuits, and number representation with fixed- and floating-point arithmetic. Typically 5–9 marks per paper, often the easiest marks on the paper.

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
