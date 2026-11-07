# Digital Logic: notes

Exam-focused notes for GATE 2027 Section 2. The 2027 wording names three minimisation methods (algebraic, Karnaugh map and tabular) and "design of" circuits; number representation, especially IEEE 754, appears in nearly every recent paper.

## Boolean algebra

**Priority A** · last 10 papers: 22 marks, asked in 8 (for Boolean Algebra & Minimization as a whole) · learn by solving · practise: [31 questions from 2007–2023 →](#/subjects/dl/pyq?topic=bool&years=pre2024)

| Law | Form |
|---|---|
| Absorption | $x + xy = x$, $x(x + y) = x$ |
| Redundancy | $x + x'y = x + y$ |
| De Morgan | $(x + y)' = x'y'$, $(xy)' = x' + y'$ |
| Consensus | $xy + x'z + yz = xy + x'z$ |
| XOR | $x \oplus y = x'y + xy'$; $x \oplus x = 0$; $x \oplus 1 = x'$ |
| Duality | swap $+ \leftrightarrow \cdot$ and $0 \leftrightarrow 1$ (not the variables) |

- **Canonical forms:** sum of minterms $\Sigma m(\dots)$ and product of maxterms $\Pi M(\dots)$; the maxterm list is the complement of the minterm list.
- $n$ variables give $2^{2^n}$ Boolean functions; $2^{2^{n-1}}$ of them are **self-dual** ($f^d = f$).
- NAND alone and NOR alone are functionally complete.

> [!EXAMPLE] Algebraic minimisation
> $F = AB + A'C + BC = AB + A'C$ (consensus: $BC$ is covered by the other two terms).

> [!RECALL] Simplify $x + x'y$.
> $x + y$.

> [!RECALL] How many self-dual functions of 3 variables exist?
> $2^{2^{2}} = 16$.

## Karnaugh-map minimisation

**Priority A** · last 10 papers: 22 marks, asked in 8 (for Boolean Algebra & Minimization as a whole) · learn by solving · practise: [31 questions from 2007–2023 →](#/subjects/dl/pyq?topic=bool&years=pre2024)

Cells are ordered in Gray code so neighbours differ in one variable (the map wraps around its edges). Group 1s in rectangles of size $2^k$; each group of $2^k$ cells eliminates $k$ variables.

- **Prime implicant (PI):** a group that cannot be enlarged.
- **Essential PI:** covers some minterm that no other PI covers. A minimal SOP takes all essential PIs, then the fewest others needed.
- **Don't-cares** (X) may be included in a group when they help, and ignored otherwise.
- For a minimal **POS**, group the 0s and complement.

> [!EXAMPLE] Corners and centre
> $F(A,B,C,D) = \Sigma m(0, 2, 5, 7, 8, 10, 13, 15)$. The four corners (0, 2, 8, 10) give $B'D'$; the centre square (5, 7, 13, 15) gives $BD$. $F = B'D' + BD = (B \oplus D)'$.

> [!TRAP] Counting prime implicants
> Count **all** prime implicants, not just the ones in your minimal cover; essential PIs are those forced by a minterm with only one covering PI.

> [!RECALL] A group of 8 cells in a 4-variable K-map leaves how many literals?
> One ($8 = 2^3$ eliminates 3 of the 4 variables).

## Tabular (Quine–McCluskey) method

**Priority A** · last 10 papers: 22 marks, asked in 8 (for Boolean Algebra & Minimization as a whole) · learn by solving · practise: [31 questions from 2007–2023 →](#/subjects/dl/pyq?topic=bool&years=pre2024)

A systematic version of the K-map that works for any number of variables:

1. List the minterms (and don't-cares) in binary, grouped by the number of 1s.
2. Combine terms from adjacent groups that differ in exactly one bit, writing a dash in that position; tick every term that was combined.
3. Repeat on the new list (terms must have dashes in the same positions) until nothing combines. Unticked terms are the **prime implicants**.
4. Build the **prime-implicant chart** (PIs × minterms, without don't-cares); pick essential PIs, then cover the rest (Petrick's method when there is a choice).

> [!EXAMPLE] A cyclic function
> $F(A,B,C) = \Sigma m(0, 1, 2, 5, 6, 7)$. Pairs: 0-1 = 00–, 0-2 = 0–0, 1-5 = –01, 2-6 = –10, 5-7 = 1–1, 6-7 = 11–. Nothing combines further, so there are 6 PIs and none is essential. Two minimal covers of 3 terms: $A'B' + BC' + AC$ or $A'C' + B'C + AB$.

> [!RECALL] In Quine–McCluskey, which two terms can be combined?
> Terms from adjacent groups (one more 1) that differ in exactly one bit position, with dashes in the same places.

## Combinational circuits

**Priority A** · last 10 papers: 11 marks, asked in 6 · learn by solving · practise: [18 questions from 2007–2023 →](#/subjects/dl/pyq?topic=comb&years=pre2024)

| Circuit | Equations / facts |
|---|---|
| Half adder | $S = A \oplus B$, $C = AB$ |
| Full adder | $S = A \oplus B \oplus C_{in}$, $C_{out} = AB + BC_{in} + AC_{in}$ |
| Half subtractor | $D = A \oplus B$, $B_{out} = A'B$ |
| $n$-bit ripple-carry adder | $n$ full adders; carry ripples through all stages |
| $2^n{:}1$ multiplexer | implements any function of $n$ variables (select lines = variables) |
| $2^{n-1}{:}1$ multiplexer | implements any function of $n$ variables, feeding the last variable, its complement, 0 or 1 into the data inputs |
| $n$-to-$2^n$ decoder | one output per minterm; any function = OR of its minterm outputs |
| Priority encoder | outputs the index of the highest-priority active input, plus a valid bit |
| Comparator | $A = B$ when every bit pair matches: $\prod (A_i \odot B_i)$ |

> [!EXAMPLE] Function from a 4:1 MUX
> Implement $F(A,B,C) = \Sigma m(1, 2, 6, 7)$ with $A, B$ on the select lines. For $AB = 00$: minterms 0, 1 → $F = C$; $01$: minterms 2, 3 → $F = C'$; $10$: 4, 5 → $F = 0$; $11$: 6, 7 → $F = 1$. Data inputs: $C, C', 0, 1$.

> [!TRAP] Counting gates
> "Minimum number of 2-input NAND gates" questions require rewriting the whole circuit in NAND form; an XOR alone needs 4 NAND gates.

> [!RECALL] What size of multiplexer implements any 4-variable function if the inputs may be $D$, $D'$, 0 or 1?
> 8:1 (three select lines).

## Sequential circuits

**Priority A** · last 10 papers: 14 marks, asked in 6 · learn by solving · practise: [15 questions from 2007–2023 →](#/subjects/dl/pyq?topic=seq&years=pre2024)

A **latch** is level-triggered; a **flip-flop** is edge-triggered.

| Flip-flop | Characteristic equation | Excitation (Q → Q⁺) |
|---|---|---|
| SR | $Q^+ = S + R'Q$ ($SR = 0$) | 0→0: S=0,R=X · 0→1: S=1,R=0 · 1→0: S=0,R=1 · 1→1: S=X,R=0 |
| JK | $Q^+ = JQ' + K'Q$ | 0→0: J=0,K=X · 0→1: J=1,K=X · 1→0: J=X,K=1 · 1→1: J=X,K=0 |
| D | $Q^+ = D$ | D = Q⁺ |
| T | $Q^+ = T \oplus Q$ | T = Q ⊕ Q⁺ |

- JK with $J = K = 1$ toggles; in a level-triggered JK this causes **race-around**, fixed by master–slave or edge triggering.
- **Counters:** a mod-$N$ counter needs $\lceil \log_2 N \rceil$ flip-flops. A **ripple** (asynchronous) counter's output settles after $n \cdot t_{pd}$, so $f_{max} = \frac{1}{n\,t_{pd}}$; a **synchronous** counter's clock period must cover $t_{pd} + t_{comb} + t_{setup}$.
- **Ring counter:** $n$ flip-flops, $n$ states. **Johnson (twisted-ring) counter:** $n$ flip-flops, $2n$ states.
- **Moore** machine: outputs depend on the state only; **Mealy**: on state and input (often fewer states).

> [!EXAMPLE] Tracing a counter
> Two T flip-flops with $T_0 = 1$ and $T_1 = Q_0$, starting at $Q_1Q_0 = 00$: 00 → 01 → 10 → 11 → 00. A 2-bit up counter.

> [!RECALL] How many states does a 4-flip-flop Johnson counter have?
> 8.

> [!RECALL] Write the characteristic equation of a JK flip-flop.
> $Q^+ = JQ' + K'Q$.

## Number representation

**Priority A** · last 10 papers: 11 marks, asked in 10 · learn by solving · practise: [18 questions from 2007–2023 →](#/subjects/dl/pyq?topic=numsys&years=pre2024)

**Base conversion:** repeated division (integer part) and repeated multiplication (fraction part). Groups of 3 or 4 bits convert directly to octal or hexadecimal.

| Representation ($n$ bits) | Range | Zeros |
|---|---|---|
| Unsigned | $0$ to $2^n - 1$ | one |
| Sign–magnitude | $-(2^{n-1} - 1)$ to $2^{n-1} - 1$ | two |
| 1's complement | $-(2^{n-1} - 1)$ to $2^{n-1} - 1$ | two |
| 2's complement | $-2^{n-1}$ to $2^{n-1} - 1$ | one |

- 2's complement of $x$ = invert all bits and add 1; sign extension copies the sign bit.
- **Overflow** in 2's complement addition happens only when both operands have the same sign and the result's sign differs (carry into MSB ≠ carry out of MSB).
- **Gray code:** $g = b \oplus (b \gg 1)$; consecutive values differ in one bit.
- **BCD** stores each decimal digit in 4 bits (codes 1010–1111 unused); **excess-3** = BCD + 3.

> [!EXAMPLE] Overflow check
> 8-bit: $100 + 50 = 150 > 127$. In binary 01100100 + 00110010 = 10010110, which reads as −106: two positives gave a negative, so overflow.

> [!RECALL] Range of 8-bit 2's complement numbers?
> −128 to 127.

> [!RECALL] Gray code of binary 1011?
> $1011 \oplus 0101 = 1110$.

## Floating point (IEEE 754)

**Priority A** · last 10 papers: 12 marks, asked in 8 · learn by solving · practise: [9 questions from 2007–2023 →](#/subjects/dl/pyq?topic=fp&years=pre2024)

| Format | Sign | Exponent (bias) | Fraction |
|---|---|---|---|
| Single (32-bit) | 1 | 8 (127) | 23 |
| Double (64-bit) | 1 | 11 (1023) | 52 |

Normalised value: $(-1)^s \times 1.f \times 2^{e - \text{bias}}$.

| Exponent field | Fraction | Meaning |
|---|---|---|
| 0 | 0 | ±0 |
| 0 | ≠ 0 | denormal: $(-1)^s \times 0.f \times 2^{1 - \text{bias}}$ |
| 1 … max − 1 | any | normalised number |
| all 1s | 0 | ±∞ |
| all 1s | ≠ 0 | NaN |

Single precision: smallest positive normal $2^{-126}$, smallest denormal $2^{-149}$, largest finite $(2 - 2^{-23}) \times 2^{127}$.

> [!EXAMPLE] Encode −6.25 in single precision
> $6.25 = 110.01_2 = 1.1001_2 \times 2^2$. Sign 1; exponent $2 + 127 = 129 = 10000001$; fraction $1001\,0000\ldots$. Bits: 1 10000001 10010000000000000000000 = **0xC0C80000**.

> [!TRAP] The hidden 1 and the bias
> Normalised numbers have an implicit leading 1 that is not stored; subtract the bias from the stored exponent. Denormals use $2^{1 - \text{bias}}$, not $2^{0 - \text{bias}}$.

> [!RECALL] What does an all-ones exponent with a zero fraction represent?
> Infinity (sign gives +∞ or −∞).
