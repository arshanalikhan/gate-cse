# Theory of Computation: formulae

Revision sheet: the facts and tables MSQs test. Explanations are in the [notes](#/subjects/toc/notes).

## Automata sizes

| Quantity | Value |
|---|---|
| NFA → DFA (subset construction) | at most $2^n$ states |
| Product DFA ($m$ and $n$ states) | $mn$ states |
| Ends with / contains a fixed $w$ | $\lvert w \rvert + 1$ states |
| $n$-th symbol from the end fixed | $2^n$ states |
| Count of a symbol $\equiv 0 \pmod k$ | $k$ states |
| Two counters mod $m$ and mod $n$ | $mn$ states |
| Length exactly $n$ | $n + 2$ states (with dead state) |
| Binary divisible by odd $k$ | $k$ states |

## Regular expressions

| Quantity | Value |
|---|---|
| Arden's theorem | $R = Q + RP \Rightarrow R = QP^*$ ($\varepsilon \notin P$) |
| All strings | $(a+b)^* = (a^*b^*)^* = (a^* + b^*)^*$ |
| Shift | $(ab)^*a = a(ba)^*$ |
| $\varepsilon + aa^*$ | $a^*$ |
| $\varnothing^*$ | $\varepsilon$ |
| No two consecutive b | $(a + ba)^*(\varepsilon + b)$ |

## Grammars

| Quantity | Value |
|---|---|
| CNF derivation length for $\lvert w \rvert = n$ | $2n - 1$ steps |
| GNF derivation length | $n$ steps |
| CYK membership | $O(n^3)$ |
| $a^nb^n$ | $S \to aSb \mid \varepsilon$ |
| Equal a's and b's | $S \to aSbS \mid bSaS \mid \varepsilon$ |
| Inherently ambiguous example | $a^ib^jc^k$, $i = j$ or $j = k$ |

## Which class?

| Language | Class |
|---|---|
| $a^*b^*$, $a^{2n}$, finite sets | regular |
| $a^nb^n$, $ww^R$, palindromes, balanced parentheses | CFL, not regular |
| $wcw^R$, $a^nb^n$ | DCFL |
| $ww^R$, $a^nb^n \cup a^nb^{2n}$ | CFL, not DCFL |
| $a^nb^nc^n$, $ww$, $a^{n^2}$, $a^p$ (prime) | not CFL (context-sensitive) |
| HALT, $A_{TM}$ | RE, not recursive |
| $\overline{A_{TM}}$, $E_{TM}$ | not RE |
| $EQ_{TM}$ | neither RE nor co-RE |

## Closure

| Operation | Reg | DCFL | CFL | CSL | Rec | RE |
|---|---|---|---|---|---|---|
| Union | ✓ | ✗ | ✓ | ✓ | ✓ | ✓ |
| Intersection | ✓ | ✗ | ✗ | ✓ | ✓ | ✓ |
| ∩ Regular | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Complement | ✓ | ✓ | ✗ | ✓ | ✓ | ✗ |
| Concatenation | ✓ | ✗ | ✓ | ✓ | ✓ | ✓ |
| Star | ✓ | ✗ | ✓ | ✓ | ✓ | ✓ |
| Reversal | ✓ | ✗ | ✓ | ✓ | ✓ | ✓ |
| Homomorphism | ✓ | ✗ | ✓ | ✗ | ✗ | ✓ |
| Inverse homomorphism | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |

## Decidability (D = decidable, U = undecidable)

| Problem | Reg | DCFL | CFL | CSL | Rec | RE |
|---|---|---|---|---|---|---|
| Membership | D | D | D | D | D | U |
| Emptiness | D | D | D | U | U | U |
| Finiteness | D | D | D | U | U | U |
| $L = \Sigma^*$ | D | D | U | U | U | U |
| Equivalence | D | D | U | U | U | U |
| Subset | D | U | U | U | U | U |

## Key theorems

| Theorem | Statement |
|---|---|
| Regular pumping lemma | $s = xyz$, $\lvert xy\rvert \le p$, $\lvert y\rvert \ge 1$, $xy^iz \in L$ |
| CFL pumping lemma | $s = uvxyz$, $\lvert vxy\rvert \le p$, $\lvert vy\rvert \ge 1$, $uv^ixy^iz \in L$ |
| Recursive iff | $L$ and $\overline L$ both RE |
| Rice | every non-trivial property of $L(M)$ is undecidable |
| Hierarchy | Reg ⊂ DCFL ⊂ CFL ⊂ CSL ⊂ Rec ⊂ RE |
| Reduction | $A \le_m B$, $A$ undecidable ⟹ $B$ undecidable |
