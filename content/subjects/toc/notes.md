# Theory of Computation: notes

Exam-focused notes for GATE 2027 Section 6. Two kinds of question dominate: constructing or counting automata for a given language, and MSQs about which languages are regular / context-free / decidable and which closure or decision properties hold.

## Finite automata

**Priority A** · last 10 papers: 27 marks, asked in 10 (for Finite Automata & Regular Expressions as a whole) · learn by solving · practise: [34 questions from 2007–2023 →](#/subjects/toc/pyq?topic=fa&years=pre2024)

**Key idea:** a DFA has exactly one move per (state, symbol); an NFA may have zero, one or many, plus ε-moves. Both accept exactly the **regular languages**.

- **Subset construction** turns an $n$-state NFA into a DFA with at most $2^n$ states (the bound is reached, e.g. "the $n$-th symbol from the end is 1" needs $2^n$ DFA states but only $n + 1$ NFA states).
- **Minimisation:** merge equivalent states by partition refinement (split groups until states in a group agree on acceptance and on which group each symbol leads to). The minimal DFA is unique up to renaming.
- **Product construction:** run two DFAs in parallel ($m \times n$ states) for union, intersection or difference.

Minimal DFA sizes worth memorising (alphabet $\{a, b\}$ unless stated):

| Language | Minimal DFA states |
|---|---|
| Strings ending in a fixed string $w$ | $\lvert w \rvert + 1$ |
| Strings containing a fixed substring $w$ | $\lvert w \rvert + 1$ |
| $\#_a(w) \equiv 0 \pmod k$ | $k$ |
| $\#_a(w) \bmod m = 0$ and $\#_b(w) \bmod n = 0$ | $mn$ |
| Binary numbers divisible by $k$ (read MSB first) | at most $k$ ($k$ when $k$ is odd) |
| $n$-th symbol from the end is $a$ | $2^n$ |
| Length exactly $n$ | $n + 2$ (including a dead state) |
| $\lvert w \rvert \equiv 0 \pmod k$ | $k$ |

> [!EXAMPLE] Divisible by 3
> Read a binary number left to right; state = value mod 3. On bit $b$, the next state is $(2q + b) \bmod 3$: from 0: 0→0, 1→1; from 1: 0→2, 1→0; from 2: 0→1, 1→2. Accept in state 0. Three states.

> [!TRAP] Count the dead state
> GATE asks for the number of states of the *minimal DFA*, which is complete, so include the dead (trap) state whenever some input must be rejected forever.

> [!RECALL] Minimal DFA states for strings over {a, b} whose 3rd symbol from the end is a?
> $2^3 = 8$.

> [!RECALL] Minimal DFA states for strings over {a, b} containing "aba"?
> 4.

## Regular expressions

**Priority A** · last 10 papers: 27 marks, asked in 10 (for Finite Automata & Regular Expressions as a whole) · learn by solving · practise: [34 questions from 2007–2023 →](#/subjects/toc/pyq?topic=fa&years=pre2024)

Operators: union $+$, concatenation, Kleene star $^*$ (and $r^+ = rr^*$).

| Identity | |
|---|---|
| $(a + b)^* = (a^* b^*)^* = (a^* + b^*)^*$ | all strings |
| $(ab)^* a = a(ba)^*$ | shifting |
| $\varepsilon + a a^* = a^*$ | |
| $(r^*)^* = r^*$, $\varnothing^* = \varepsilon$ | |
| $r\varnothing = \varnothing$, $r\varepsilon = r$ | |

**Arden's theorem:** if $P$ does not contain $\varepsilon$, the equation $R = Q + RP$ has the unique solution $R = QP^*$. It converts a DFA into a regular expression by solving one equation per state.

> [!EXAMPLE] No two consecutive b's
> Over $\{a, b\}$: $(a + ba)^*(\varepsilon + b)$. Each b must be followed by an a, except possibly a final b.

> [!TRAP] Equivalent-looking expressions
> $(a + b)^*$ and $a^* + b^*$ differ ($ab$ is only in the first). $(a^*b)^*$ cannot end in $a$ unless empty, so it is not $(a + b)^*$.

> [!RECALL] Solve $R = Q + RP$ (with $\varepsilon \notin P$).
> $R = QP^*$.

## Regular languages and their properties

**Priority A** · last 10 papers: 12 marks, asked in 6 · learn by solving + recall cards · practise: [18 questions from 2007–2023 →](#/subjects/toc/pyq?topic=reg&years=pre2024)

**Closure:** union, intersection, complement, difference, concatenation, star, reversal, homomorphism, inverse homomorphism, quotient by any language. All finite languages are regular.

**Decision problems** for regular languages are all decidable: membership, emptiness, finiteness, equivalence, universality, subset.

**Pumping lemma (regular):** if $L$ is regular, there is $p$ such that every $s \in L$ with $\lvert s \rvert \ge p$ splits as $s = xyz$ with $\lvert xy \rvert \le p$, $\lvert y \rvert \ge 1$, and $xy^iz \in L$ for all $i \ge 0$. Use it (by contradiction) to prove a language is **not** regular; it can never prove regularity.

| Language | Regular? | Reason |
|---|---|---|
| $a^n b^n$ | No | needs unbounded counting |
| $a^m b^n$ ($m, n \ge 0$) | Yes | $a^*b^*$ |
| $a^m b^n$, $m \ne n$ | No | complement-of-$a^nb^n$ argument within $a^*b^*$ |
| Equal numbers of a and b | No | |
| $\#_a \equiv \#_b \pmod 3$ | Yes | finite counter |
| $ww$, $ww^R$, palindromes | No | |
| $a^{n^2}$, $a^p$ ($p$ prime) | No | gaps between lengths grow |
| $a^{2n}$, $a^{3n+1}$ | Yes | periodic lengths |
| $\{w x w^R : w, x \in \{a,b\}^+\}$ | Yes | equals strings starting and ending with the same symbol, length ≥ 3 |

> [!EXAMPLE] Pumping $a^nb^n$
> Take $s = a^pb^p$. Because $\lvert xy \rvert \le p$, $y$ is a non-empty block of a's. Then $xy^2z$ has more a's than b's, so it is not in $L$. Contradiction: $L$ is not regular.

> [!TRAP] Hidden regularity
> Languages defined with variables can collapse to something simple: $\{w x w^R\}$ with non-empty $w$ and $x$ only requires the first and last symbols to match.

> [!RECALL] Is $\{a^m b^n : m \ge n\}$ regular?
> No (pump the a's down in $a^pb^p$).

> [!RECALL] Is the intersection of two regular languages always regular? Of a regular and a non-regular one?
> Yes; not necessarily (it may or may not be regular).

## Context-free grammars

**Priority A** · last 10 papers: 15 marks, asked in 7 (for CFGs & Pushdown Automata as a whole) · learn by solving · practise: [10 questions from 2007–2023 →](#/subjects/toc/pyq?topic=cfg&years=pre2024)

A CFG has rules $A \to \alpha$. A grammar is **ambiguous** if some string has two different leftmost derivations (parse trees). Some CFLs are **inherently ambiguous**, e.g. $\{a^ib^jc^k : i = j \text{ or } j = k\}$.

Standard grammars:

| Language | Grammar |
|---|---|
| $a^n b^n$ | $S \to aSb \mid \varepsilon$ |
| Palindromes over {a, b} | $S \to aSa \mid bSb \mid a \mid b \mid \varepsilon$ |
| Equal numbers of a and b | $S \to aSbS \mid bSaS \mid \varepsilon$ |
| Balanced parentheses | $S \to (S)S \mid \varepsilon$ |
| $a^i b^j$, $i \ge j$ | $S \to aS \mid aSb \mid \varepsilon$ |

**Normal forms:** Chomsky normal form ($A \to BC$ or $A \to a$): a string of length $n$ has a derivation of exactly $2n - 1$ steps and a parse tree of height at least $\lceil \log_2 n \rceil + 1$. Greibach normal form ($A \to a\alpha$): exactly $n$ steps. Simplify first: remove ε-productions, unit productions and useless symbols.

**Membership:** the CYK algorithm decides $w \in L(G)$ for a CNF grammar in $O(n^3)$.

> [!RECALL] How many steps derive a string of length 6 in a CNF grammar?
> $2 \cdot 6 - 1 = 11$.

## Pushdown automata

**Priority A** · last 10 papers: 15 marks, asked in 7 (for CFGs & Pushdown Automata as a whole) · learn by solving · practise: [10 questions from 2007–2023 →](#/subjects/toc/pyq?topic=cfg&years=pre2024)

A PDA is an NFA with a stack. Nondeterministic PDAs accept exactly the CFLs; acceptance by final state and by empty stack are equivalent for NPDAs.

**Deterministic PDAs** accept the **deterministic CFLs** (DCFLs), a proper subset of the CFLs: every DCFL has an unambiguous grammar, and a DPDA accepting by empty stack can only accept prefix-free languages.

| Language | Needs |
|---|---|
| $a^n b^n$ | DPDA |
| $wcw^R$ (centre marker) | DPDA |
| $ww^R$ (no marker) | NPDA (not a DCFL) |
| $a^nb^n \cup a^nb^{2n}$ | NPDA (not a DCFL) |
| $a^nb^nc^n$ | not context-free |

> [!RECALL] Are DPDAs as powerful as NPDAs?
> No. $ww^R$ is context-free but not deterministic context-free.

## Context-free languages and closure

**Priority A** · last 10 papers: 12 marks, asked in 7 · learn by solving + recall cards · practise: [21 questions from 2007–2023 →](#/subjects/toc/pyq?topic=cfl&years=pre2024)

**Pumping lemma (CFL):** every long enough $s \in L$ splits as $uvxyz$ with $\lvert vxy \rvert \le p$, $\lvert vy \rvert \ge 1$, and $uv^ixy^iz \in L$ for all $i \ge 0$. It shows $a^nb^nc^n$, $ww$, $a^{n^2}$ and $a^p$ ($p$ prime) are not context-free.

> [!KEY] Derive, don't memorise: the closure table from four rules
> 1. **Regular:** closed under everything below. A DFA is complemented by swapping accepting states, and two DFAs run in parallel.
> 2. **CFL:** closed under what a grammar or a PDA can build: union ($S \to S_1 \mid S_2$), concatenation ($S \to S_1 S_2$), star, reversal (reverse every right-hand side), homomorphism, inverse homomorphism, and intersection with a regular language (run the PDA and a DFA together). Not intersection: $\{a^nb^nc^m\} \cap \{a^mb^nc^n\} = \{a^nb^nc^n\}$. So not complement either, because union plus complement would give intersection.
> 3. **DCFL:** keeps complement (a DPDA that reads its whole input can swap accepting states), intersection with a regular language and inverse homomorphism. It loses everything that needs a guess: union, intersection, concatenation, star, reversal, homomorphism.
> 4. **Recursive and CSL:** closed under everything except homomorphism (erasing symbols can turn a decidable check into an unbounded search). **RE:** closed under everything except complement, since $\overline{A_{TM}}$ is not RE.
>
> Rebuild the table from these rules, then check it against the one below.

| Operation | Regular | DCFL | CFL | CSL | Recursive | RE |
|---|---|---|---|---|---|---|
| Union | ✓ | ✗ | ✓ | ✓ | ✓ | ✓ |
| Intersection | ✓ | ✗ | ✗ | ✓ | ✓ | ✓ |
| Intersection with a regular language | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Complement | ✓ | ✓ | ✗ | ✓ | ✓ | ✗ |
| Concatenation | ✓ | ✗ | ✓ | ✓ | ✓ | ✓ |
| Kleene star | ✓ | ✗ | ✓ | ✓ | ✓ | ✓ |
| Reversal | ✓ | ✗ | ✓ | ✓ | ✓ | ✓ |
| Homomorphism | ✓ | ✗ | ✓ | ✗ | ✗ | ✓ |
| Inverse homomorphism | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |

> [!EXAMPLE] Using closure to prove non-context-freeness
> $L = \{w \in \{a,b,c\}^* : \#_a = \#_b = \#_c\}$. If $L$ were context-free, then $L \cap a^*b^*c^* = a^nb^nc^n$ would be too (CFLs are closed under intersection with regular languages). It is not, so $L$ is not context-free.

> [!TRAP] Union of two DCFLs
> $a^nb^n$ and $a^nb^{2n}$ are both DCFLs, but their union is not: DCFLs are closed under complement, not under union or intersection.

> [!RECALL] Which classes are closed under complement: CFL, DCFL, recursive, RE?
> DCFL and recursive. CFL and RE are not.

## Turing machines

**Priority B** · last 10 papers: 8 marks, asked in 4 (for Turing Machines & Decidability as a whole) · learn by recall cards · practise: [29 questions from 2007–2023 →](#/subjects/toc/pyq?topic=tm&years=pre2024)

A Turing machine has an infinite tape and a read/write head. Multi-tape, multi-head and nondeterministic TMs are no more powerful (they accept the same languages). A **linear bounded automaton** (tape limited to the input) accepts the context-sensitive languages.

- **Recursive (decidable)** language: some TM halts on every input and accepts exactly $L$.
- **Recursively enumerable (RE, semi-decidable):** some TM accepts exactly the strings of $L$ but may loop on strings outside it.
- $L$ is recursive iff both $L$ and $\overline{L}$ are RE.
- Chomsky hierarchy: Regular ⊂ DCFL ⊂ CFL ⊂ CSL ⊂ Recursive ⊂ RE, all inclusions proper.
- There are only countably many TMs but uncountably many languages, so most languages are not even RE.

> [!RECALL] If $L$ and its complement are both recursively enumerable, what is $L$?
> Recursive (decidable).

## Undecidability

**Priority B** · last 10 papers: 8 marks, asked in 4 (for Turing Machines & Decidability as a whole) · learn by recall cards · practise: [29 questions from 2007–2023 →](#/subjects/toc/pyq?topic=tm&years=pre2024)

**The halting problem** $\text{HALT} = \{\langle M, w\rangle : M \text{ halts on } w\}$ is RE but not recursive; so is $A_{TM}$ (does $M$ accept $w$). Their complements are not RE.

**Rice's theorem:** every non-trivial property of the **language** recognised by a TM is undecidable. "Is $L(M)$ empty / finite / regular / equal to $\Sigma^*$?" are all undecidable. Properties of the machine itself ("does $M$ have 10 states?", "does $M$ move left within 100 steps on input ε?") are not covered and are often decidable.

**Decision problems**

> [!KEY] Derive, don't memorise: the decision table in three rules
> 1. **Regular:** everything is decidable. A DFA is finite: minimise and compare.
> 2. **CFL:** only questions about one grammar's own strings are decidable: membership (CYK), emptiness (does the start symbol generate any string?) and finiteness (is there a cycle among the useful variables?). Anything that compares two languages, or asks whether $L = \Sigma^*$, is undecidable. DCFLs get universality back (complement, then test emptiness) and, by a deep 1997 result, equivalence; subset stays undecidable.
> 3. **CSL and above:** only membership is decidable, and for RE not even that. Every non-trivial property of the language of a Turing machine is undecidable (Rice's theorem).

| Problem | Regular | DCFL | CFL | CSL | Recursive | RE |
|---|---|---|---|---|---|---|
| Membership $w \in L$ | D | D | D | D | D | U |
| Emptiness | D | D | D | U | U | U |
| Finiteness | D | D | D | U | U | U |
| Universality $L = \Sigma^*$ | D | D | U | U | U | U |
| Equivalence $L_1 = L_2$ | D | D | U | U | U | U |
| Subset $L_1 \subseteq L_2$ | D | U | U | U | U | U |

Also undecidable for CFGs: ambiguity of a grammar, whether $L(G)$ is regular, whether two CFLs intersect. **Post's correspondence problem** is undecidable and is the usual tool for proving CFG problems undecidable.

**Reductions:** if $A \le_m B$ (a computable map sends yes-instances of $A$ to yes-instances of $B$) and $A$ is undecidable, then $B$ is undecidable; if $B$ is decidable, so is $A$.

| Problem about TMs | Status |
|---|---|
| $A_{TM}$, HALT | RE, not recursive |
| $\overline{A_{TM}}$ | not RE |
| $E_{TM}$ (is $L(M) = \varnothing$?) | not RE (its complement is RE) |
| $EQ_{TM}$ | neither RE nor co-RE |
| Does $M$ halt on ε within $k$ steps? | decidable |

> [!TRAP] Machine vs language
> "Does $M$ ever write a 1?" or "does $M$ halt on all inputs?" are about behaviour, not only the language, but they are still undecidable (reduce from HALT). Rice's theorem is only a shortcut for language properties; argue by reduction otherwise.

> [!RECALL] Is "$L(M)$ is regular" decidable for a Turing machine $M$?
> No, by Rice's theorem (it is a non-trivial property of the language).

> [!RECALL] Is equivalence of two context-free grammars decidable?
> No. (It is decidable for DFAs and, remarkably, for DPDAs.)
