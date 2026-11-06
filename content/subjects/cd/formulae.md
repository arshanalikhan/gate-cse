# Compiler Design: formulae

Revision sheet: rules, tables and equations. Explanations are in the [notes](#/subjects/cd/notes).

## Grammar transformations

| Quantity | Rule |
|---|---|
| Remove left recursion $A \to A\alpha \mid \beta$ | $A \to \beta A'$, $A' \to \alpha A' \mid \varepsilon$ |
| Left factoring $A \to \alpha\beta_1 \mid \alpha\beta_2$ | $A \to \alpha A'$, $A' \to \beta_1 \mid \beta_2$ |
| FOLLOW from $B \to \alpha A \beta$ | FIRST($\beta$) − {ε} ⊆ FOLLOW($A$) |
| FOLLOW when $\beta \Rightarrow^* \varepsilon$ | FOLLOW($B$) ⊆ FOLLOW($A$) |
| Start symbol | \$ ∈ FOLLOW(S) |

## LL(1)

| Quantity | Rule |
|---|---|
| Table entry for $A \to \alpha$ | $M[A, a]$ for $a \in$ FIRST($\alpha$); if ε ∈ FIRST($\alpha$), also $a \in$ FOLLOW($A$) |
| LL(1) condition 1 | FIRST($\alpha$) ∩ FIRST($\beta$) = ∅ |
| LL(1) condition 2 | at most one alternative derives ε |
| LL(1) condition 3 | $\beta \Rightarrow^* \varepsilon$ ⟹ FIRST($\alpha$) ∩ FOLLOW($A$) = ∅ |
| Never LL(1) | left-recursive or ambiguous grammars |

## LR family

| Quantity | Rule |
|---|---|
| Power | LR(0) ⊂ SLR(1) ⊂ LALR(1) ⊂ CLR(1) |
| LL(1) vs LR(1) | every LL(1) grammar is LR(1) |
| States | LR(0) = SLR = LALR ≤ CLR |
| LR(0) reduce | on every symbol |
| SLR reduce $A \to \alpha\cdot$ | on FOLLOW($A$) |
| LALR / CLR reduce | on the item's lookahead |
| LALR merge can add | reduce–reduce conflicts only |
| Ambiguous grammar | not LR($k$) for any $k$ |

## Syntax-directed translation

| Quantity | Rule |
|---|---|
| S-attributed | synthesised only; postorder / LR |
| L-attributed | inherited from parent and left siblings; one DFS pass / LL |
| Action order (end-of-production actions) | order of reductions = postorder |

## Intermediate code

| Quantity | Rule |
|---|---|
| Leaders | first instruction; jump targets; instruction after a jump |
| Basic block | from a leader up to the next leader |
| Quadruple | op, arg1, arg2, result |
| Triple | op, arg1, arg2 (result = position) |
| SSA | one assignment per variable name |
| DAG nodes | distinct leaves + distinct (op, children) pairs |

## Runtime

| Quantity | Rule |
|---|---|
| Recursion needs | stack (not static) allocation |
| Static scoping | access links |
| Dynamic scoping | control links / most recent binding |
| Value–result | copy in, copy back on return |
| Call by name | re-evaluate the argument at each use |

## Data-flow equations

| Analysis | Direction, meet | Equations |
|---|---|---|
| Reaching definitions | forward, ∪ | $\text{OUT} = \text{gen} \cup (\text{IN} - \text{kill})$ |
| Live variables | backward, ∪ | $\text{IN} = \text{use} \cup (\text{OUT} - \text{def})$ |
| Available expressions | forward, ∩ | $\text{OUT} = \text{gen} \cup (\text{IN} - \text{kill})$; init full set |
| Constant propagation | forward, lattice meet | ⊤ (undefined) ⊒ constants ⊒ ⊥ (not a constant) |

## Optimisations

| Name | Effect |
|---|---|
| Constant folding | evaluate constant expressions at compile time |
| Constant / copy propagation | substitute known values / copies |
| CSE | reuse an available expression |
| Dead-code elimination | drop unused assignments |
| Strength reduction | replace costly ops (`*`, `/`) by cheaper (`+`, shifts) |
| Code motion | hoist loop-invariant code |
