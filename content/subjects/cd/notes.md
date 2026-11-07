# Compiler Design: notes

Exam-focused notes for GATE 2027 Section 7. Parsing (FIRST/FOLLOW, LL(1) and LR tables) is the biggest topic; syntax-directed translation, basic blocks and data-flow analysis are the steady second tier.

## Phases of a compiler

**Priority B** · last 10 papers: 6 marks, asked in 5 (for Lexical Analysis & Compiler Phases as a whole) · learn by solving · practise: [11 questions from 2007–2023 →](#/subjects/cd/pyq?topic=lex&years=pre2024)

| Phase | Input → output | Typical errors caught |
|---|---|---|
| Lexical analysis | characters → tokens | illegal characters, malformed literals |
| Syntax analysis (parsing) | tokens → parse tree | missing `;`, unbalanced brackets |
| Semantic analysis | parse tree → annotated tree | type mismatch, undeclared variable, wrong argument count |
| Intermediate code generation | annotated tree → three-address code | |
| Code optimisation | IR → better IR | |
| Code generation | IR → target code | register allocation, instruction selection |

The **symbol table** is used by every phase. The front end (lexing to IR) depends on the source language; the back end depends on the target machine.

> [!RECALL] Which phase detects "variable used but not declared"?
> - [ ] Lexical analysis
> - [ ] Code generation
> - [x] Semantic analysis
> - [ ] Syntax analysis
>
> Semantic analysis.

## Lexical analysis

**Priority B** · last 10 papers: 6 marks, asked in 5 (for Lexical Analysis & Compiler Phases as a whole) · learn by solving · practise: [11 questions from 2007–2023 →](#/subjects/cd/pyq?topic=lex&years=pre2024)

Tokens are described by regular expressions and recognised by a DFA. When several patterns match, the lexer takes the **longest match**; among equal-length matches, the pattern listed first wins (that is how keywords beat identifiers).

**Counting tokens:** keywords, identifiers, constants, string literals, operators and punctuation each count as one token; whitespace and comments count as none.

> [!EXAMPLE]
> `printf("%d", x);` has 7 tokens: `printf` `(` `"%d"` `,` `x` `)` `;`.

> [!TRAP] Multi-character operators
> `a+++b` is lexed as `a ++ + b` (longest match), giving 4 tokens; `x<=y` has 3 tokens, not 4.

> [!RECALL] How many tokens are in `int a = b + 10;`?
> - [ ] 8
> - [ ] 6
> - [x] 7
> - [ ] 5
>
> 7: `int` `a` `=` `b` `+` `10` `;`.

## Grammars, FIRST and FOLLOW

**Priority A** · last 10 papers: 24 marks, asked in 9 (for Parsing (LL/LR) as a whole) · learn by solving · practise: [31 questions from 2007–2023 →](#/subjects/cd/pyq?topic=parse&years=pre2024)

**Left recursion** $A \to A\alpha \mid \beta$ breaks top-down parsers. Remove it:

$$A \to \beta A', \qquad A' \to \alpha A' \mid \varepsilon$$

**Left factoring** $A \to \alpha\beta_1 \mid \alpha\beta_2$ becomes $A \to \alpha A'$, $A' \to \beta_1 \mid \beta_2$.

**FIRST($\alpha$):** terminals that can begin a string derived from $\alpha$ (plus ε if $\alpha \Rightarrow^* \varepsilon$).
**FOLLOW($A$):** terminals that can appear immediately after $A$ in some sentential form; \$ is in FOLLOW(start).

Rules for FOLLOW: for $B \to \alpha A \beta$, add FIRST($\beta$) − {ε} to FOLLOW($A$); if $\beta \Rightarrow^* \varepsilon$ (or $\beta$ is empty), add FOLLOW($B$) to FOLLOW($A$).

> [!EXAMPLE] Expression grammar
> $E \to TE'$, $E' \to +TE' \mid \varepsilon$, $T \to FT'$, $T' \to *FT' \mid \varepsilon$, $F \to (E) \mid \text{id}$.
>
> FIRST: $E, T, F$: { (, id }; $E'$: { +, ε }; $T'$: { *, ε }.
> FOLLOW: $E, E'$: { ), \$ }; $T, T'$: { +, ), \$ }; $F$: { *, +, ), \$ }.

> [!RECALL] Remove left recursion from $E \to E + T \mid T$.
> - [ ] $E \to +TE' \mid T$
> - [x] $E \to TE'$, $E' \to +TE' \mid \varepsilon$
> - [ ] $E \to E'T$, $E' \to E' + \mid \varepsilon$
> - [ ] $E \to TE'$, $E' \to +E' \mid \varepsilon$
>
> $E \to TE'$, $E' \to +TE' \mid \varepsilon$.

## LL(1) parsing

**Priority A** · last 10 papers: 24 marks, asked in 9 (for Parsing (LL/LR) as a whole) · learn by solving · practise: [31 questions from 2007–2023 →](#/subjects/cd/pyq?topic=parse&years=pre2024)

Predictive parsing table $M[A, a]$: for each production $A \to \alpha$, put it in $M[A, a]$ for every $a \in$ FIRST($\alpha$); if ε ∈ FIRST($\alpha$), also for every $a \in$ FOLLOW($A$).

A grammar is **LL(1)** iff the table has no multiply-defined entry, i.e. for every pair of alternatives $A \to \alpha \mid \beta$:

1. FIRST($\alpha$) ∩ FIRST($\beta$) = ∅;
2. at most one of them derives ε;
3. if $\beta \Rightarrow^* \varepsilon$, then FIRST($\alpha$) ∩ FOLLOW($A$) = ∅.

Left-recursive and ambiguous grammars are never LL(1). Recursive-descent parsers implement LL grammars with one procedure per non-terminal.

> [!EXAMPLE] Not LL(1)
> $S \to aSb \mid ab$: both alternatives start with $a$, so $M[S, a]$ has two entries. Left-factoring gives $S \to aS'$, $S' \to Sb \mid b$, which is LL(1).

> [!RECALL] When is the grammar with $A \to \alpha \mid \varepsilon$ LL(1) (other rules fine)?
> - [ ] Always, because $\varepsilon$ rules never conflict
> - [x] FIRST($\alpha$) ∩ FOLLOW($A$) = ∅
> - [ ] FOLLOW($\alpha$) ∩ FOLLOW($A$) = ∅
> - [ ] FIRST($\alpha$) ∩ FIRST($A$) = ∅
>
> When FIRST($\alpha$) ∩ FOLLOW($A$) = ∅.

## LR parsing

**Priority A** · last 10 papers: 24 marks, asked in 9 (for Parsing (LL/LR) as a whole) · learn by solving · practise: [31 questions from 2007–2023 →](#/subjects/cd/pyq?topic=parse&years=pre2024)

Bottom-up shift-reduce parsers find the **handle** (the right side to reduce) and trace a rightmost derivation in reverse. Conflicts are **shift–reduce** or **reduce–reduce**.

| Parser | Items | Reduce $A \to \alpha\cdot$ on |
|---|---|---|
| LR(0) | LR(0) items | every input symbol |
| SLR(1) | LR(0) items | symbols in FOLLOW($A$) |
| LALR(1) | LR(1) items, states with the same core merged | the item's lookahead set |
| CLR(1) / LR(1) | LR(1) items | the item's lookahead |

- Power: LR(0) ⊂ SLR(1) ⊂ LALR(1) ⊂ LR(1); every LL(1) grammar is LR(1) (LL(1) and LALR(1) are incomparable). No ambiguous grammar is LR($k$).
- Number of states: LR(0) = SLR(1) = LALR(1) ≤ CLR(1).
- Merging LR(1) states into LALR(1) can create **reduce–reduce** conflicts but never shift–reduce conflicts that were not already there.
- **Operator-precedence** parsing handles grammars with no ε-productions and no two adjacent non-terminals.

> [!TIP] Method: which parsers accept this grammar?
> 1. Ambiguous? Then no LL or LR parser does; stop.
> 2. Left-recursive, or two alternatives sharing a FIRST symbol? Then not LL(1). Otherwise check the three LL(1) conditions above.
> 3. Build the LR(0) item sets. If no state holds a completed item together with a terminal shift or a second completed item, the grammar is LR(0).
> 4. For the remaining conflicts, reduce $A \to \alpha\cdot$ only on FOLLOW($A$). None left: SLR(1).
> 5. Still conflicts: build the LR(1) items. None: CLR(1). None after merging states with the same core: LALR(1).

> [!EXAMPLE] Building LR(0) items
> For $S' \to S$, $S \to (S) \mid a$: $I_0 = \text{closure}(\{S' \to \cdot S\}) = \{S' \to \cdot S,\ S \to \cdot(S),\ S \to \cdot a\}$. goto($I_0$, a) = $\{S \to a\cdot\}$; goto($I_0$, ( ) = $\{S \to (\cdot S),\ S \to \cdot(S),\ S \to \cdot a\}$.

> [!TRAP] Conflicts appear in the items, not the grammar
> Decide "is the grammar SLR(1)?" by building the item sets: a state containing both $A \to \alpha\cdot$ and $B \to \beta \cdot a\gamma$ has an SLR shift–reduce conflict only if $a \in$ FOLLOW($A$).

> [!RECALL] Which conflicts can merging LR(1) states into LALR(1) introduce?
> - [ ] Only shift–reduce conflicts
> - [ ] Both kinds
> - [x] Only reduce–reduce conflicts
> - [ ] Neither
>
> Only reduce–reduce conflicts.

> [!RECALL] Order LR(0), SLR(1), LALR(1) and CLR(1) by power.
> - [ ] LR(0) ⊂ SLR(1) ⊂ CLR(1) ⊂ LALR(1)
> - [ ] LR(0) ⊂ LALR(1) ⊂ SLR(1) ⊂ CLR(1)
> - [x] LR(0) ⊂ SLR(1) ⊂ LALR(1) ⊂ CLR(1)
> - [ ] SLR(1) ⊂ LR(0) ⊂ LALR(1) ⊂ CLR(1)
>
> LR(0) ⊂ SLR(1) ⊂ LALR(1) ⊂ CLR(1).

## Syntax-directed translation

**Priority A** · last 10 papers: 12 marks, asked in 7 · learn by solving · practise: [6 questions from 2007–2023 →](#/subjects/cd/pyq?topic=sdt&years=pre2024)

An SDD attaches attributes to grammar symbols and semantic rules to productions.

- **Synthesised** attribute: computed from the children (and the node itself).
- **Inherited** attribute: computed from the parent and/or siblings.
- **S-attributed:** only synthesised attributes; evaluate bottom-up (postorder) during LR parsing.
- **L-attributed:** inherited attributes depend only on the parent's inherited attributes and **left** siblings; evaluable in one left-to-right depth-first pass, so suitable for LL parsing. Every S-attributed SDD is L-attributed.

> [!EXAMPLE] Printing postfix
> $E \to E + T\ \{\text{print}('+')\}$, $E \to T$, $T \to T * F\ \{\text{print}('*')\}$, $T \to F$, $F \to \text{num}\ \{\text{print(num)}\}$. Input `2 + 3 * 4` prints `2 3 4 * +`: actions run when each production is reduced.

> [!TRAP] Evaluate in reduction order
> With actions at the ends of productions, the output order is the order in which the bottom-up parser **reduces**, which is the postorder of the parse tree, not the left-to-right order of the input.

> [!RECALL] Can an L-attributed SDD use an attribute of a right sibling?
> - [ ] Yes, if the attribute is synthesized
> - [ ] Yes, any sibling
> - [ ] Only in bottom-up parsing
> - [x] No; only the parent's inherited and left siblings' attributes
>
> No; only the parent's inherited attributes and left siblings' attributes.

## Intermediate code and basic blocks

**Priority A** · last 10 papers: 10 marks, asked in 6 · learn by solving · practise: [8 questions from 2007–2023 →](#/subjects/cd/pyq?topic=icg&years=pre2024)

**Three-address code** has at most one operator on the right: `x = y op z`, `x = op y`, `goto L`, `if x relop y goto L`, `param x`, `call p, n`.

| Representation | Fields | Note |
|---|---|---|
| Quadruples | op, arg1, arg2, result | easy to move instructions |
| Triples | op, arg1, arg2 (results referred to by position) | compact; moving code breaks references |
| Indirect triples | list of pointers to triples | reorder by permuting pointers |

- **SSA form:** every variable is assigned exactly once (rename each definition: $x_1, x_2, \dots$; φ-functions merge values at joins).
- **DAG** of a basic block shares common subexpressions: identical (op, operands) nodes are created once.

**Basic blocks:** leaders are (1) the first instruction, (2) any target of a jump, (3) any instruction right after a jump. Each block runs from a leader up to the next leader. The **control-flow graph** connects blocks by possible jumps and fall-through.

> [!EXAMPLE] Counting basic blocks
> ```text
> 1: i = 1
> 2: t1 = i * 4
> 3: if t1 > 40 goto 7
> 4: x = x + t1
> 5: i = i + 1
> 6: goto 2
> 7: print x
> ```
> Leaders: 1, 2 (jump target), 4 (after a jump), 7 (jump target). Basic blocks: {1}, {2, 3}, {4, 5, 6}, {7}: four blocks.

> [!RECALL] How many nodes does the DAG for `t1 = a + b; t2 = a + b; t3 = t1 * t2` have?
> - [ ] 3
> - [x] 4
> - [ ] 6
> - [ ] 5
>
> 4: leaves a and b, one shared + node, and the * node.

## Runtime environments

**Priority B** · last 10 papers: 4 marks, asked in 3 · learn by solving + recall cards · practise: [8 questions from 2007–2023 →](#/subjects/cd/pyq?topic=runtime&years=pre2024)

An **activation record** (stack frame) holds: actual parameters, returned value, control link (caller's frame), access link (frame of the lexically enclosing procedure), saved machine status (return address, registers), local data and temporaries.

- **Static allocation** cannot support recursion; **stack allocation** handles recursion; **heap allocation** serves data that outlives its procedure.
- **Static (lexical) scoping** resolves names through access links; **dynamic scoping** uses the most recent active binding (follow the control links).

| Parameter passing | Callee sees | Effect on caller's variable |
|---|---|---|
| Call by value | a copy | none |
| Call by reference | the address | updated immediately |
| Call by value–result | a copy, copied back on return | updated on return |
| Call by name | the unevaluated expression, re-evaluated at each use | as if textually substituted |

> [!EXAMPLE] Value–result vs reference
> `void f(int x, int y) { x = x + 1; y = y + 1; }` called as `f(a, a)` with `a = 1`: by reference `a` becomes 3; by value–result each copy becomes 2 and `a` ends as 2.

> [!RECALL] Which allocation strategy cannot support recursive procedures?
> - [ ] Stack allocation
> - [ ] None of them
> - [x] Static allocation
> - [ ] Heap allocation
>
> Static allocation.

## Code optimisation

**Priority A** · last 10 papers: 11 marks, asked in 5 (for Code Optimization & Data-Flow Analysis as a whole) · learn by solving + recall cards · practise: [11 questions from 2007–2023 →](#/subjects/cd/pyq?topic=opt&years=pre2024)

| Technique | Example |
|---|---|
| Constant folding | `x = 3 * 4` → `x = 12` |
| Constant propagation | `a = 5; b = a + 2` → `b = 7` |
| Copy propagation | `y = x; z = y + 1` → `z = x + 1` |
| Common-subexpression elimination | reuse an already computed `a + b` |
| Dead-code elimination | remove assignments whose value is never used |
| Strength reduction | `i * 4` → repeated `+ 4`; `x * 2` → `x << 1` |
| Loop-invariant code motion | move a computation that does not change inside the loop to before it |
| Induction-variable elimination | replace a derived counter by an existing one |
| Loop unrolling | fewer iterations, less branch overhead |
| Peephole optimisation | redundant loads/stores, jumps to jumps, algebraic identities |

**Local** optimisation works inside one basic block (DAGs make it easy); **global** optimisation works across the CFG using data-flow analysis.

> [!RECALL] Which optimisation turns `x * 8` into `x << 3`?
> - [x] Strength reduction
> - [ ] Loop-invariant code motion
> - [ ] Copy propagation
> - [ ] Constant folding
>
> Strength reduction.

## Data-flow analysis

**Priority A** · last 10 papers: 11 marks, asked in 5 (for Code Optimization & Data-Flow Analysis as a whole) · learn by solving + recall cards · practise: [11 questions from 2007–2023 →](#/subjects/cd/pyq?topic=opt&years=pre2024)

Each analysis has a direction, a meet operator, and a transfer function per block. Iterate the equations until nothing changes (fixed point).

| Analysis | Direction | Meet | Equations | Used for |
|---|---|---|---|---|
| Reaching definitions | forward | ∪ | $\text{OUT}[B] = \text{gen}[B] \cup (\text{IN}[B] - \text{kill}[B])$, $\text{IN}[B] = \bigcup_{p \in pred} \text{OUT}[p]$ | constant/copy propagation, use–def chains |
| Live variables | backward | ∪ | $\text{IN}[B] = \text{use}[B] \cup (\text{OUT}[B] - \text{def}[B])$, $\text{OUT}[B] = \bigcup_{s \in succ} \text{IN}[s]$ | register allocation, dead-code elimination |
| Available expressions | forward | ∩ | $\text{OUT}[B] = \text{e\_gen}[B] \cup (\text{IN}[B] - \text{e\_kill}[B])$, $\text{IN}[B] = \bigcap_{p \in pred} \text{OUT}[p]$ | global common-subexpression elimination |
| Constant propagation | forward | lattice meet (undefined ⊤, constant, not-a-constant ⊥) | | replacing variables by constants |

`use[B]` = variables read in $B$ before any write in $B$; `def[B]` = variables written in $B$ before any read.

> [!EXAMPLE] Liveness in straight-line code
> ```text
> 1: a = b + c
> 2: d = a + e
> 3: return d
> ```
> Working backwards: live before 3 = {d}; before 2 = {a, e}; before 1 = {b, c, e}.

> [!TRAP] Union vs intersection
> "May" analyses (reaching definitions, liveness) use union; "must" analyses (available expressions) use intersection, so the initial value of IN/OUT for available expressions is the full set (except at entry).

> [!RECALL] Is liveness a forward or backward analysis, and what is its meet?
> - [ ] Forward, with intersection
> - [x] Backward, with union
> - [ ] Forward, with union
> - [ ] Backward, with intersection
>
> Backward, with union.
