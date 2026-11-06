# Digital Logic: formulae

Revision sheet. Explanations and examples are in the [notes](#/subjects/dl/notes).

## Boolean algebra

| Quantity | Formula |
|---|---|
| Absorption | $x + xy = x$ |
| Redundancy | $x + x'y = x + y$ |
| Consensus | $xy + x'z + yz = xy + x'z$ |
| De Morgan | $(x+y)' = x'y'$; $(xy)' = x' + y'$ |
| XOR | $x'y + xy'$ |
| XNOR | $xy + x'y'$ |
| Functions of $n$ variables | $2^{2^n}$ |
| Self-dual functions | $2^{2^{n-1}}$ |
| Minterms ↔ maxterms | complementary index lists |

## Minimisation

| Quantity | Value |
|---|---|
| Group of $2^k$ cells | eliminates $k$ variables |
| Essential PI | only PI covering some minterm |
| QM combine rule | adjacent groups, differ in one bit, dashes aligned |
| POS from K-map | group 0s, complement |

## Combinational

| Quantity | Formula |
|---|---|
| Full-adder sum | $A \oplus B \oplus C_{in}$ |
| Full-adder carry | $AB + BC_{in} + AC_{in}$ |
| Half-adder | $S = A \oplus B$, $C = AB$ |
| Half-subtractor | $D = A \oplus B$, $B_{out} = A'B$ |
| MUX for $n$ variables | $2^n{:}1$, or $2^{n-1}{:}1$ with $x, x', 0, 1$ inputs |
| Decoder | $n$-to-$2^n$, OR the minterm outputs |
| XOR from NAND | 4 gates |

## Flip-flops

| Type | Characteristic equation |
|---|---|
| SR | $Q^+ = S + R'Q$, $SR = 0$ |
| JK | $Q^+ = JQ' + K'Q$ |
| D | $Q^+ = D$ |
| T | $Q^+ = T \oplus Q$ |

## Counters and timing

| Quantity | Formula |
|---|---|
| Flip-flops for mod-$N$ | $\lceil \log_2 N \rceil$ |
| Ripple counter settle time | $n \cdot t_{pd}$ |
| Ripple counter $f_{max}$ | $\dfrac{1}{n\,t_{pd}}$ |
| Synchronous $f_{max}$ | $\dfrac{1}{t_{pd} + t_{comb} + t_{setup}}$ |
| Ring counter ($n$ FFs) | $n$ states |
| Johnson counter ($n$ FFs) | $2n$ states |

## Number representation ($n$ bits)

| Quantity | Formula |
|---|---|
| Unsigned range | $0 \ldots 2^n - 1$ |
| Sign–magnitude / 1's complement | $-(2^{n-1}-1) \ldots 2^{n-1}-1$ |
| 2's complement | $-2^{n-1} \ldots 2^{n-1}-1$ |
| 2's complement of $x$ | invert bits, add 1 ($= 2^n - x$) |
| Overflow | same-sign operands, different-sign result |
| Gray code | $b \oplus (b \gg 1)$ |
| Excess-3 | BCD $+ 3$ |

## IEEE 754

| Quantity | Formula |
|---|---|
| Single | 1 + 8 + 23 bits, bias 127 |
| Double | 1 + 11 + 52 bits, bias 1023 |
| Normalised value | $(-1)^s \times 1.f \times 2^{e - bias}$ |
| Denormal value | $(-1)^s \times 0.f \times 2^{1 - bias}$ |
| Exponent all 1s | ∞ (fraction 0) or NaN |
| Smallest normal (single) | $2^{-126}$ |
| Smallest denormal (single) | $2^{-149}$ |
| Largest finite (single) | $(2 - 2^{-23}) \times 2^{127}$ |
