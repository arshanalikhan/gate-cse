# Predicted GATE CSE 2027 paper

A full 65-question, 100-mark paper in the exact GATE 2027 format, built from the [topic analysis of 28 past papers](#/analysis) and the revised 2027 syllabus. Every question is original and has a worked solution and a note on why its topic is likely.

> [!IMPORTANT] Take it timed first
> The best use of this paper is as a real exam: **[open the CBT mock test](mock/)**, give yourself 3 hours, and only then read the solutions below. The mock applies GATE's negative marking and shows a subject-wise score report.

> [!NOTE] What "predicted" means
> Nobody outside IIT Madras knows the actual questions. This paper predicts **where the marks will be**: the subject weightage, the topics with the highest chance of appearing, and the current mix of MCQ, MSQ and NAT questions. Expect the real paper to test the same ideas in different words and numbers.

## Blueprint

| Subject | Marks | 1-mark | 2-mark | Topics in this paper |
|---|---:|---:|---:|---|
| [Engineering Mathematics](#/subjects/em) | 8 | 2 | 3 | Calculus, Linear Algebra, Probability & Statistics |
| [Discrete Mathematics](#/subjects/dm) | 7 | 1 | 3 | Combinatorics & Counting, First-Order (Predicate) Logic, Graph Theory, Groups & Algebraic Structures |
| [Digital Logic](#/subjects/dl) | 7 | 3 | 2 | Boolean Algebra & Minimization, Floating Point (IEEE 754), Number Systems & Fixed-Point Arithmetic, Sequential Circuits |
| [Computer Organization & Architecture](#/subjects/coa) | 9 | 3 | 3 | ALU, Datapath & Control Unit, Cache Memory, Instruction Set & Addressing Modes, Pipelining & Hazards |
| [Programming & Data Structures](#/subjects/pds) | 10 | 2 | 4 | BST & AVL Trees, Binary Heaps, C Programming, Linked Lists, Recursion, Stacks & Queues |
| [Algorithms](#/subjects/algo) | 8 | 2 | 3 | Asymptotic Analysis, Dynamic Programming, Minimum Spanning Trees, Recurrence Relations, Shortest Paths |
| [Theory of Computation](#/subjects/toc) | 7 | 3 | 2 | Context-Free Languages & Closure, Finite Automata & Regular Expressions, Regular Languages & Properties, Turing Machines & Decidability |
| [Compiler Design](#/subjects/cd) | 6 | 2 | 2 | Code Optimization & Data-Flow Analysis, Lexical Analysis & Compiler Phases, Parsing (LL/LR) |
| [Operating System](#/subjects/os) | 8 | 2 | 3 | CPU Scheduling, Paging, TLB & Page Tables, Processes & Threads, Synchronization & Concurrency, Virtual Memory & Page Replacement |
| [Databases](#/subjects/db) | 7 | 3 | 2 | FDs, Keys & Normalization, File Organization & Indexing (B/B+ Trees), SQL, Transactions & Concurrency Control |
| [Computer Networks](#/subjects/cn) | 8 | 2 | 3 | Flow Control & Sliding Window, IPv4 Addressing, CIDR & Forwarding, IPv4 Fragmentation, TCP & Congestion Control |
| **General Aptitude** | **15** | **5** | **5** | Verbal, quantitative, analytical and spatial aptitude |
| **Total** | **100** | **30** | **35** | |

How the numbers were chosen:

- **Subject marks** follow the weighted 2014–2026 average (recent papers count more; IIT Madras's 2019 paper counts 1.5×), adjusted for the 2027 syllabus: COA gets 9 marks because ALU and control-unit design and memory interfacing were added.
- **Discrete + Engineering Mathematics = 15 marks**, matching the 2021–2026 average of 15.2 rather than the nominal 13.
- **Question types** match the 2021–2026 average for the 55 technical questions: **21 MCQ, 17 MSQ, 17 NAT** (1-mark: 11 MCQ, 8 MSQ, 6 NAT; 2-mark: 10 MCQ, 9 MSQ, 11 NAT). General Aptitude is all MCQ, as in every recent paper.
- **Topics** are the ones asked in most of the last 10 papers (linear algebra, finite automata, paging, cache, pipelining, parsing, TCP, normalization and more), plus topics that are due after a quiet spell (dynamic programming, memory interfacing, microprogrammed control).

## Marking scheme

| Type | 1-mark question | 2-mark question |
|---|---|---|
| MCQ (one correct option) | +1, wrong −1/3 | +2, wrong −2/3 |
| MSQ (one or more correct options) | +1 only if exactly the right set is chosen; no negative marks | +2, same rule |
| NAT (numerical answer) | +1 if within the range; no negative marks | +2, same rule |

## General Aptitude (Q.1–Q.10)

### Q.1 · General Aptitude · 1 mark · MCQ

*Topic: Verbal aptitude*

The committee, along with its two advisers, ______ expected to submit the report by Friday.

- **(A)** are
- **(B)** were
- **(C)** is
- **(D)** have been

<details><summary>Answer and solution</summary>

**Answer: (C)**

The subject is *the committee* (singular). A phrase introduced by *along with* does not change the number of the subject, so the verb is **is**.

*Why this is likely in 2027:* Subject–verb agreement appears in almost every GA section.

</details>

### Q.2 · General Aptitude · 1 mark · MCQ

*Topic: Verbal aptitude*

Cartographer : Map :: Lexicographer : ______

- **(A)** Dictionary
- **(B)** Novel
- **(C)** Calendar
- **(D)** Atlas

<details><summary>Answer and solution</summary>

**Answer: (A)**

A cartographer compiles maps; a lexicographer compiles **dictionaries**.

*Why this is likely in 2027:* Word analogies are a regular 1-mark GA item.

</details>

### Q.3 · General Aptitude · 1 mark · MCQ

*Topic: Quantitative aptitude*

The price of a book is first increased by 20% and then the new price is decreased by 20%. Compared with the original price, the final price is

- **(A)** the same
- **(B)** 4% lower
- **(C)** 4% higher
- **(D)** 2% lower

<details><summary>Answer and solution</summary>

**Answer: (B)**

$1.2 \times 0.8 = 0.96$, so the final price is **4% lower** than the original.

*Why this is likely in 2027:* Successive percentage change is a staple of numerical computation.

</details>

### Q.4 · General Aptitude · 1 mark · MCQ

*Topic: Analytical aptitude*

'Every student who submitted the assignment on time received a bonus mark.' If this statement is true, which one of the following must also be true?

- **(A)** A student who received a bonus mark submitted the assignment on time.
- **(B)** A student who did not receive a bonus mark did not submit the assignment on time.
- **(C)** A student who did not submit the assignment on time did not receive a bonus mark.
- **(D)** No student received a bonus mark without submitting the assignment on time.

<details><summary>Answer and solution</summary>

**Answer: (B)**

The statement is $p \Rightarrow q$ (on time $\Rightarrow$ bonus). Only its **contrapositive** $\neg q \Rightarrow \neg p$ must hold: no bonus $\Rightarrow$ not on time. (A) and (D) are the converse; (C) is the inverse.

*Why this is likely in 2027:* GATE 2026 Set 1 Q5 tested exactly this logical-implication trap.

</details>

### Q.5 · General Aptitude · 1 mark · MCQ

*Topic: Spatial aptitude*

A square sheet of paper is folded in half along a vertical line, then folded in half along a horizontal line, and finally folded along a diagonal of the small square obtained. One hole is punched through all the layers, away from every fold line. When the sheet is unfolded completely, the number of holes in it is

- **(A)** 3
- **(B)** 4
- **(C)** 6
- **(D)** 8

<details><summary>Answer and solution</summary>

**Answer: (D)**

Each fold doubles the number of layers: $2 \to 4 \to 8$. A single punch through 8 layers makes **8** holes.

*Why this is likely in 2027:* Paper folding and punching is the most common spatial-aptitude question.

</details>

### Q.6 · General Aptitude · 2 marks · MCQ

*Topic: Verbal aptitude*

Read the passage and answer the question.

*Cities that expanded their public bus networks between 2010 and 2020 saw a fall in average commute times, but only where dedicated bus lanes were also introduced. In cities that added buses without dedicated lanes, commute times stayed roughly the same, because the extra buses were caught in the same traffic as cars.*

Based **only** on the passage, which one of the following can be inferred?

- **(A)** Adding buses always reduces commute times.
- **(B)** In these cities, dedicated bus lanes were needed for the bus expansion to reduce commute times.
- **(C)** Cars are the main cause of long commutes in all cities.
- **(D)** Cities without bus lanes should stop adding buses.

<details><summary>Answer and solution</summary>

**Answer: (B)**

The passage says commute times fell **only where** bus lanes were added, so in these cities lanes were a necessary condition. (A) contradicts the passage; (C) over-generalises to all cities; (D) is a recommendation the passage never makes.

*Why this is likely in 2027:* Every recent paper has a 2-mark 'infer from the passage' question.

</details>

### Q.7 · General Aptitude · 2 marks · MCQ

*Topic: Quantitative aptitude*

The table gives a factory's production (in thousand units) of two products P and Q.

| Year | 2021 | 2022 | 2023 | 2024 | 2025 |
|---|---:|---:|---:|---:|---:|
| P | 40 | 45 | 50 | 60 | 55 |
| Q | 30 | 35 | 30 | 40 | 45 |

In which year was the percentage increase in total production (P + Q) over the previous year the highest?

- **(A)** 2022
- **(B)** 2023
- **(C)** 2024
- **(D)** 2025

<details><summary>Answer and solution</summary>

**Answer: (C)**

Totals: 70, 80, 80, 100, 100. Increases: 2022: $10/70 = 14.3\%$; 2023: 0%; 2024: $20/80 = 25\%$; 2025: 0%. The highest is **2024**.

*Why this is likely in 2027:* Data interpretation from a table or chart is in every GA section.

</details>

### Q.8 · General Aptitude · 2 marks · MCQ

*Topic: Quantitative aptitude*

Two distinct numbers are chosen at random from $\{1, 2, \ldots, 10\}$. The probability that their sum is even is

- **(A)** $\frac{1}{2}$
- **(B)** $\frac{4}{9}$
- **(C)** $\frac{5}{9}$
- **(D)** $\frac{2}{5}$

<details><summary>Answer and solution</summary>

**Answer: (B)**

The sum is even when both numbers are even or both are odd: $\binom{5}{2} + \binom{5}{2} = 20$ out of $\binom{10}{2} = 45$ pairs, so $P = \frac{20}{45} = \frac{4}{9}$.

*Why this is likely in 2027:* Elementary probability and counting is in the GA syllabus and asked often.

</details>

### Q.9 · General Aptitude · 2 marks · MCQ

*Topic: Analytical aptitude*

Five friends P, Q, R, S and T sit in a row of five seats, all facing north.

- Q sits at one of the two ends.
- R sits in the middle seat.
- P sits immediately to the right of R.
- T does not sit at an end.
- S does not sit next to Q.

Who sits at the end that is **not** occupied by Q?

- **(A)** P
- **(B)** S
- **(C)** T
- **(D)** R

<details><summary>Answer and solution</summary>

**Answer: (B)**

Number the seats 1–5 from left to right (facing north, 'right' is the higher number). R = 3, P = 4. If Q = 1, the free seats are 2 and 5; T is not at an end, so T = 2 and S = 5. If Q = 5, the free seats are 1 and 2; T = 2 and S = 1. Either way the other end holds **S**.

*Why this is likely in 2027:* Seating-arrangement puzzles are the usual 2-mark analytical item.

</details>

### Q.10 · General Aptitude · 2 marks · MCQ

*Topic: Spatial aptitude*

A solid cube of side 4 cm is painted on all six faces and then cut into 64 small cubes of side 1 cm. The number of small cubes with paint on exactly two faces is

- **(A)** 8
- **(B)** 16
- **(C)** 24
- **(D)** 32

<details><summary>Answer and solution</summary>

**Answer: (C)**

Cubes with exactly two painted faces lie on the edges but not at the corners: $12 \text{ edges} \times (4 - 2) = 24$.

*Why this is likely in 2027:* Painted-cube counting is a classic 3-D spatial question.

</details>

## Computer Science: 1-mark questions (Q.11–Q.35)

### Q.11 · Engineering Mathematics · 1 mark · MCQ

*Topic: Linear Algebra*

Let $A = \begin{pmatrix} 2 & 1 \\ 1 & 2 \end{pmatrix}$. The eigenvalues of $A^{5} - 2A$ are

- **(A)** $-1$ and $237$
- **(B)** $1$ and $243$
- **(C)** $-1$ and $241$
- **(D)** $3$ and $237$

<details><summary>Answer and solution</summary>

**Answer: (A)**

The eigenvalues of $A$ are $1$ and $3$ (trace 4, determinant 3). For a polynomial $p(A)$ the eigenvalues are $p(\lambda)$: $1^5 - 2 = -1$ and $3^5 - 6 = 237$.

*Why this is likely in 2027:* Linear algebra appeared in all 10 papers of 2021–2026; eigenvalues of a matrix power came in 2025 (S1 Q41, S2 Q11).

</details>

### Q.12 · Engineering Mathematics · 1 mark · MCQ

*Topic: Probability & Statistics*

A fair die is rolled twice. Given that the sum of the two outcomes is 8, the probability that both outcomes are even is

- **(A)** $\frac{1}{3}$
- **(B)** $\frac{2}{5}$
- **(C)** $\frac{1}{2}$
- **(D)** $\frac{3}{5}$

<details><summary>Answer and solution</summary>

**Answer: (D)**

Sum 8: $(2,6), (3,5), (4,4), (5,3), (6,2)$, five equally likely outcomes. Both even: $(2,6), (4,4), (6,2)$. So $P = \frac{3}{5}$.

*Why this is likely in 2027:* Conditional probability is the single biggest-scoring topic (34 marks in 2021–26).

</details>

### Q.13 · Discrete Mathematics · 1 mark · MCQ

*Topic: First-Order (Predicate) Logic*

Over the domain of all people, let $L(x, y)$ mean '$x$ loves $y$'. Which one of the following formulas expresses 'Everyone loves someone, but no one loves everyone'?

- **(A)** $\forall x\, \exists y\, L(x,y) \;\wedge\; \neg \exists x\, \forall y\, L(x,y)$
- **(B)** $\exists y\, \forall x\, L(x,y) \;\wedge\; \forall x\, \exists y\, \neg L(x,y)$
- **(C)** $\forall x\, \exists y\, L(x,y) \;\wedge\; \exists x\, \forall y\, \neg L(x,y)$
- **(D)** $\forall x\, \exists y\, L(x,y) \;\wedge\; \neg \forall x\, \exists y\, L(x,y)$

<details><summary>Answer and solution</summary>

**Answer: (A)**

'Everyone loves someone' is $\forall x\, \exists y\, L(x,y)$; 'no one loves everyone' is $\neg \exists x\, \forall y\, L(x,y)$. (B) says someone is loved by everyone; (C) says someone loves no one; (D) is a contradiction.

*Why this is likely in 2027:* English-to-predicate-logic translation came in 2024 S2 and 2025 S1, and 2026 S2 Q11.

</details>

### Q.14 · Digital Logic · 1 mark · MSQ

*Topic: Number Systems & Fixed-Point Arithmetic*

In 8-bit two's complement arithmetic, which of the following additions produce an **overflow**?

- **(A)** 0111 0000 + 0001 0000
- **(B)** 1000 0000 + 1111 1111
- **(C)** 0111 1111 + 1000 0000
- **(D)** 1100 0000 + 1100 0000

<details><summary>Answer and solution</summary>

**Answer: (A), (B)**  (select all correct options; no partial marks)

Range is $-128 \ldots 127$. (A) $112 + 16 = 128$: overflow. (B) $-128 + (-1) = -129$: overflow. (C) $127 + (-128) = -1$: no overflow (operands of opposite sign never overflow). (D) $-64 + (-64) = -128$: representable, no overflow.

*Why this is likely in 2027:* Number representation appeared in all 10 recent papers; overflow MSQs in 2022, 2024 S1, 2026 S1 and S2.

</details>

### Q.15 · Digital Logic · 1 mark · NAT

*Topic: Floating Point (IEEE 754)*

The 32-bit IEEE 754 single-precision representation of a number is `0xC1340000`. The value of the number in decimal is ______ (rounded off to two decimal places).

<details><summary>Answer and solution</summary>

**Answer: -11.25**

`C1340000` = `1 10000010 0110100…0`. Sign = 1; exponent = $130 - 127 = 3$; significand = $1.0110100_2 = 1.40625$. Value $= -1.40625 \times 2^3 = -11.25$.

*Why this is likely in 2027:* IEEE 754 conversion was asked in 8 of the 10 recent papers.

</details>

### Q.16 · Digital Logic · 1 mark · NAT

*Topic: Boolean Algebra & Minimization*

The number of prime implicants of $F(A, B, C) = \sum m(1, 3, 4, 6, 7)$ is ______.

<details><summary>Answer and solution</summary>

**Answer: 4**

Combine adjacent minterms (tabular method): $1,3 \to A'C$; $3,7 \to BC$; $4,6 \to AC'$; $6,7 \to AB$. No group of four exists, so there are **4** prime implicants ($A'C$ and $AC'$ are essential).

*Why this is likely in 2027:* The 2027 syllabus now names the tabular (Quine–McCluskey) method explicitly.

</details>

### Q.17 · Computer Organization & Architecture · 1 mark · MCQ

*Topic: Instruction Set & Addressing Modes*

Match each addressing mode with its typical use.

| Addressing mode | Use |
|---|---|
| P. Register indirect | 1. Accessing array elements |
| Q. Indexed | 2. Dereferencing a pointer |
| R. PC-relative | 3. Position-independent branches |
| S. Immediate | 4. Loading constants |

- **(A)** P-2, Q-1, R-3, S-4
- **(B)** P-1, Q-2, R-3, S-4
- **(C)** P-2, Q-3, R-1, S-4
- **(D)** P-4, Q-1, R-3, S-2

<details><summary>Answer and solution</summary>

**Answer: (A)**

Register indirect uses a register holding an address (a pointer). Indexed adds an index to a base (arrays). PC-relative branches work wherever the code is loaded. Immediate operands are constants in the instruction.

*Why this is likely in 2027:* Addressing modes came in 8 of 10 recent papers; GATE 2026 S1 Q14 was a match-the-following on them.

</details>

### Q.18 · Computer Organization & Architecture · 1 mark · NAT

*Topic: Cache Memory*

A 64 KB, 4-way set-associative cache with 32-byte blocks is used with byte-addressable memory and 32-bit physical addresses. The number of bits in the tag field is ______.

<details><summary>Answer and solution</summary>

**Answer: 18**

Sets $= \frac{64\,\text{KB}}{32\,\text{B} \times 4} = 512$, so 9 index bits; block offset = 5 bits. Tag $= 32 - 9 - 5 = 18$.

*Why this is likely in 2027:* Cache address splitting is asked almost every year (9 of 10 recent papers).

</details>

### Q.19 · Computer Organization & Architecture · 1 mark · MSQ

*Topic: ALU, Datapath & Control Unit*

Which of the following statements about control units is/are correct?

- **(A)** A hardwired control unit is generally faster than a microprogrammed control unit.
- **(B)** In a microprogrammed control unit, changing the instruction set requires redesigning the control logic circuit.
- **(C)** For the same set of control signals, horizontal microinstructions are wider than vertical (encoded) microinstructions.
- **(D)** A microprogrammed control unit needs a control memory and a control address register (micro-program counter).

<details><summary>Answer and solution</summary>

**Answer: (A), (C), (D)**  (select all correct options; no partial marks)

(A) Hardwired logic produces signals directly, so it is faster. (B) is false: only the control-memory contents change. (C) Horizontal format uses one bit per signal, so it is wider. (D) Microinstructions are fetched from control memory using a control address register.

*Why this is likely in 2027:* New in the 2027 syllabus: 'Design of control unit – hardwired and microprogrammed'.

</details>

### Q.20 · Programming & Data Structures · 1 mark · NAT

*Topic: C Programming*

Consider the following C program.

```c
#include <stdio.h>
int f(int n) {
    static int s = 0;
    s += n;
    return s;
}
int main(void) {
    int x = f(2);
    int y = f(3);
    int z = f(x);
    printf("%d", x + y + z);
    return 0;
}
```

The value printed is ______.

<details><summary>Answer and solution</summary>

**Answer: 14**

`s` is static, so it keeps its value between calls: `f(2)` returns 2, `f(3)` returns 5, `f(x)` = `f(2)` returns 7. Output $2 + 5 + 7 = 14$.

*Why this is likely in 2027:* C tracing with static variables is IIT Madras's favourite (GATE 2019 had six C programs).

</details>

### Q.21 · Programming & Data Structures · 1 mark · MSQ

*Topic: Binary Heaps*

A binary min-heap holding 10 distinct keys is stored in an array $A[1..10]$ with the root at $A[1]$. Which of the following positions can hold the **largest** key?

- **(A)** 5
- **(B)** 6
- **(C)** 8
- **(D)** 10

<details><summary>Answer and solution</summary>

**Answer: (B), (C), (D)**  (select all correct options; no partial marks)

The largest key must be a leaf. With $n = 10$ the leaves are positions $\lfloor n/2 \rfloor + 1 = 6$ to $10$. Position 5 has child 10, so it is internal.

*Why this is likely in 2027:* Heap index properties were asked in 2023, 2024 S1 and 2026 S1.

</details>

### Q.22 · Algorithms · 1 mark · MCQ

*Topic: Asymptotic Analysis*

Which one of the following lists the functions in increasing order of asymptotic growth?

$f_1 = n^{\log_2 n}$, $\quad f_2 = 2^{\sqrt{n}}$, $\quad f_3 = n^{3}$, $\quad f_4 = (\log_2 n)^{n}$

- **(A)** $f_3, f_1, f_2, f_4$
- **(B)** $f_1, f_3, f_2, f_4$
- **(C)** $f_3, f_2, f_1, f_4$
- **(D)** $f_3, f_1, f_4, f_2$

<details><summary>Answer and solution</summary>

**Answer: (A)**

Compare logarithms: $\log f_3 = 3\log n$, $\log f_1 = (\log n)^2$, $\log f_2 = \sqrt{n}$, $\log f_4 = n \log\log n$. Increasing: $f_3, f_1, f_2, f_4$.

*Why this is likely in 2027:* Growth-rate ordering came in 2021 S1, 2023 and 2026 S2.

</details>

### Q.23 · Algorithms · 1 mark · MSQ

*Topic: Minimum Spanning Trees*

Let $G$ be a connected undirected graph with distinct positive edge weights, and let $T$ be its minimum spanning tree. Which of the following is/are always TRUE?

- **(A)** The lightest edge of $G$ is in $T$.
- **(B)** The heaviest edge of $G$ is never in $T$.
- **(C)** For every cycle of $G$, the heaviest edge on that cycle is not in $T$.
- **(D)** The path in $T$ between any two vertices is a shortest path between them in $G$.

<details><summary>Answer and solution</summary>

**Answer: (A), (C)**  (select all correct options; no partial marks)

(A) follows from the cut property. (B) is false when the heaviest edge is a bridge. (C) is the cycle property (weights distinct). (D) is false: an MST does not preserve shortest paths.

*Why this is likely in 2027:* MST properties were asked in 7 of 10 recent papers, often as MSQs (2022, 2026 S1).

</details>

### Q.24 · Theory of Computation · 1 mark · MCQ

*Topic: Finite Automata & Regular Expressions*

The minimum number of states in a DFA over $\{a, b\}$ that accepts exactly the strings in which the number of $a$'s is divisible by 3 and the number of $b$'s is even is

- **(A)** 5
- **(B)** 6
- **(C)** 7
- **(D)** 8

<details><summary>Answer and solution</summary>

**Answer: (B)**

Track ($\#a \bmod 3$, $\#b \bmod 2$): $3 \times 2 = 6$ states, all reachable and pairwise distinguishable; only $(0,0)$ is accepting.

*Why this is likely in 2027:* Finite automata appeared in all 10 recent papers; minimal-DFA counting is the most common form.

</details>

### Q.25 · Theory of Computation · 1 mark · MSQ

*Topic: Context-Free Languages & Closure*

Let $R$ be a regular language and $L$ a context-free language over the same alphabet. Which of the following are always context-free?

- **(A)** $L \cap R$
- **(B)** $L \cup R$
- **(C)** $\overline{L}$ (complement of $L$)
- **(D)** $L \cdot R$ (concatenation)

<details><summary>Answer and solution</summary>

**Answer: (A), (B), (D)**  (select all correct options; no partial marks)

CFLs are closed under intersection with regular languages, union and concatenation (every regular language is context-free). They are **not** closed under complement.

*Why this is likely in 2027:* Closure properties are a favourite MSQ (2021 S1/S2, 2023, 2025 S2).

</details>

### Q.26 · Theory of Computation · 1 mark · MCQ

*Topic: Turing Machines & Decidability*

Which one of the following problems is **undecidable**?

- **(A)** Given a DFA $D$, is $L(D) = \Sigma^*$?
- **(B)** Given a CFG $G$, is $L(G) = \emptyset$?
- **(C)** Given a CFG $G$, is $L(G) = \Sigma^*$?
- **(D)** Given a CFG $G$ and a string $w$, is $w \in L(G)$?

<details><summary>Answer and solution</summary>

**Answer: (C)**

Universality of CFGs is undecidable. DFA universality, CFG emptiness and CFG membership (CYK) are all decidable.

*Why this is likely in 2027:* Decidability questions about grammars and automata recur (2022, 2025 S2, 2026 S2).

</details>

### Q.27 · Compiler Design · 1 mark · MCQ

*Topic: Lexical Analysis & Compiler Phases*

The number of tokens produced by a C lexical analyser for the statement below is

```c
if (x >= 10) y = x * 2.5;
```

- **(A)** 10
- **(B)** 11
- **(C)** 12
- **(D)** 13

<details><summary>Answer and solution</summary>

**Answer: (C)**

Tokens: `if` `(` `x` `>=` `10` `)` `y` `=` `x` `*` `2.5` `;` — **12** in all (`>=` and `2.5` are single tokens).

*Why this is likely in 2027:* Token counting came in 2026 S2 Q35 and 2023 Q19.

</details>

### Q.28 · Compiler Design · 1 mark · MSQ

*Topic: Parsing (LL/LR)*

Which of the following statements is/are TRUE?

- **(A)** Every LL(1) grammar is unambiguous.
- **(B)** A left-recursive grammar can be LL(1).
- **(C)** Every SLR(1) grammar is also LALR(1).
- **(D)** An LALR(1) parser can have a shift-reduce conflict even when the canonical LR(1) parser for the same grammar has none.

<details><summary>Answer and solution</summary>

**Answer: (A), (C)**  (select all correct options; no partial marks)

(A) An LL(1) table has at most one entry per cell, so the grammar is unambiguous. (B) Left recursion causes FIRST-set clashes, so it is never LL(1). (C) SLR(1) $\subset$ LALR(1). (D) Merging LR(1) states with the same core can add reduce-reduce conflicts but never shift-reduce conflicts.

*Why this is likely in 2027:* Parsing was asked in 9 of 10 recent papers; parser-power MSQs came in 2024 S1 and 2026 S1.

</details>

### Q.29 · Operating System · 1 mark · MCQ

*Topic: Paging, TLB & Page Tables*

A system uses 32-bit virtual addresses, 4 KB pages and 4-byte page-table entries. With a single-level page table, the page table of one process occupies

- **(A)** 1 MB
- **(B)** 2 MB
- **(C)** 4 MB
- **(D)** 8 MB

<details><summary>Answer and solution</summary>

**Answer: (C)**

Pages $= 2^{32} / 2^{12} = 2^{20}$ entries, each 4 bytes: $2^{22}$ bytes = **4 MB**.

*Why this is likely in 2027:* Paging/TLB appeared in every one of the 10 recent papers.

</details>

### Q.30 · Operating System · 1 mark · MSQ

*Topic: Processes & Threads*

Which of the following are shared by all threads of the same process?

- **(A)** Heap
- **(B)** Stack
- **(C)** Open file descriptors
- **(D)** Program counter

<details><summary>Answer and solution</summary>

**Answer: (A), (C)**  (select all correct options; no partial marks)

Threads share the address space (code, globals, heap) and OS resources such as open files. Each thread has its own stack, program counter and registers.

*Why this is likely in 2027:* Thread questions appeared in 2017, 2023 and 2024 S1.

</details>

### Q.31 · Databases · 1 mark · NAT

*Topic: FDs, Keys & Normalization*

A relation $R(A, B, C, D, E)$ has the functional dependencies $\{A \to B,\; B \to A,\; AC \to D,\; D \to E\}$. The number of superkeys of $R$ is ______.

<details><summary>Answer and solution</summary>

**Answer: 12**

$C$ never appears on a right side, so every key contains $C$. $AC^+$ and $BC^+$ are both $ABCDE$, so the candidate keys are $AC$ and $BC$. Supersets of $AC$: $2^3 = 8$; of $BC$: 8; of both ($ABC$): $2^2 = 4$. Superkeys $= 8 + 8 - 4 = 12$.

*Why this is likely in 2027:* Key/superkey counting came in 2022 Q31 and 2026 S1 Q65.

</details>

### Q.32 · Databases · 1 mark · MCQ

*Topic: File Organization & Indexing (B/B+ Trees)*

Which one of the following statements about a B+ tree index is **FALSE**?

- **(A)** All leaves are at the same depth.
- **(B)** Internal nodes hold keys and child pointers only, not pointers to data records.
- **(C)** Leaves are linked to one another, which makes range queries efficient.
- **(D)** A search for a key can end at an internal node.

<details><summary>Answer and solution</summary>

**Answer: (D)**

In a B+ tree every search goes down to a leaf, because the record pointers are only in the leaves. Early termination at an internal node happens in a B-tree, not a B+ tree.

*Why this is likely in 2027:* B/B+ tree questions came in 7 of 10 recent papers (GATE 2019 Q14 was this very idea).

</details>

### Q.33 · Databases · 1 mark · MCQ

*Topic: Transactions & Concurrency Control*

Consider the schedule $S$: $r_1(X),\; w_2(X),\; w_1(X),\; r_2(Y),\; c_1,\; c_2$. Which one of the following is correct?

- **(A)** $S$ is conflict serializable and recoverable.
- **(B)** $S$ is not conflict serializable but is view serializable.
- **(C)** $S$ is neither conflict nor view serializable, but it is recoverable.
- **(D)** $S$ is not recoverable.

<details><summary>Answer and solution</summary>

**Answer: (C)**

$r_1(X)$ before $w_2(X)$ gives $T_1 \to T_2$; $w_2(X)$ before $w_1(X)$ gives $T_2 \to T_1$: a cycle, so not conflict serializable. Serial $T_1T_2$ would make $w_2(X)$ the final write; serial $T_2T_1$ would make $r_1(X)$ read from $T_2$; neither matches, so not view serializable. No transaction reads a value written by another, so $S$ is recoverable.

*Why this is likely in 2027:* Transactions were asked in 8 of 10 recent papers.

</details>

### Q.34 · Computer Networks · 1 mark · MSQ

*Topic: TCP & Congestion Control*

Which of the following statements about TCP is/are correct?

- **(A)** A connection is set up with a three-way handshake.
- **(B)** A SYN segment consumes one sequence number.
- **(C)** The receiver's advertised window is the mechanism TCP uses for congestion control.
- **(D)** TCP offers a byte-stream service, so application message boundaries are not preserved.

<details><summary>Answer and solution</summary>

**Answer: (A), (B), (D)**  (select all correct options; no partial marks)

(C) is false: the advertised window is **flow** control; congestion control uses the congestion window. The other three are standard TCP facts.

*Why this is likely in 2027:* TCP was asked in 9 of 10 recent papers and remains fully in the 2027 syllabus.

</details>

### Q.35 · Computer Networks · 1 mark · NAT

*Topic: IPv4 Addressing, CIDR & Forwarding*

An organisation is assigned the address block 172.20.64.0/19. The number of addresses in this block that can be assigned to hosts (excluding the network and broadcast addresses) is ______.

<details><summary>Answer and solution</summary>

**Answer: 8190**

A /19 leaves $32 - 19 = 13$ host bits: $2^{13} - 2 = 8190$.

*Why this is likely in 2027:* CIDR questions came in 8 of 10 recent papers; CIDR stays in the trimmed 2027 networks syllabus.

</details>

## Computer Science: 2-mark questions (Q.36–Q.65)

### Q.36 · Engineering Mathematics · 2 marks · MSQ

*Topic: Linear Algebra*

Let $A$ be a $3 \times 3$ real matrix with eigenvalues $1$, $2$ and $3$. Which of the following is/are TRUE?

- **(A)** $\det(A) = 6$
- **(B)** $\operatorname{trace}(A^2) = 14$
- **(C)** $A$ is invertible and the eigenvalues of $A^{-1}$ are $1, \tfrac{1}{2}, \tfrac{1}{3}$
- **(D)** $A - 2I$ is invertible

<details><summary>Answer and solution</summary>

**Answer: (A), (B), (C)**  (select all correct options; no partial marks)

$\det A = 1 \cdot 2 \cdot 3 = 6$. $A^2$ has eigenvalues $1, 4, 9$, so its trace is 14. No eigenvalue is 0, so $A^{-1}$ exists with reciprocal eigenvalues. $2$ is an eigenvalue, so $\det(A - 2I) = 0$ and (D) is false.

*Why this is likely in 2027:* Eigenvalue properties are the most-asked linear algebra idea (2022, 2024 S1, 2026 S1).

</details>

### Q.37 · Engineering Mathematics · 2 marks · NAT

*Topic: Probability & Statistics*

The time (in minutes) between successive requests arriving at a server is exponentially distributed with mean 2 minutes. Given that no request has arrived in the first 3 minutes, the probability that no request arrives in the first 5 minutes is ______ (rounded off to three decimal places).

<details><summary>Answer and solution</summary>

**Answer: 0.366 to 0.37**

The exponential distribution is memoryless: $P(T > 5 \mid T > 3) = P(T > 2) = e^{-\lambda \cdot 2}$ with $\lambda = \tfrac{1}{2}$, so $e^{-1} \approx 0.368$.

*Why this is likely in 2027:* Continuous distributions (exponential, normal) came in 2021 S1, 2025 S1 and 2026 S2; IIT Madras favours them.

</details>

### Q.38 · Engineering Mathematics · 2 marks · MSQ

*Topic: Calculus*

Let $f(x) = x^3 - 6x^2 + 9x + 1$ on the interval $[0, 4]$. Which of the following is/are TRUE?

- **(A)** The maximum value of $f$ on $[0, 4]$ is 5, attained at two different points.
- **(B)** $f$ has a local minimum at $x = 3$.
- **(C)** $f$ is increasing on $(1, 3)$.
- **(D)** $f$ has a point of inflection at $x = 2$.

<details><summary>Answer and solution</summary>

**Answer: (A), (B), (D)**  (select all correct options; no partial marks)

$f'(x) = 3(x-1)(x-3)$, $f''(x) = 6x - 12$. $f(0)=1$, $f(1)=5$, $f(3)=1$, $f(4)=5$, so the maximum 5 is reached at $x = 1$ and $x = 4$. $f''(3) = 6 > 0$: local minimum. $f' < 0$ on $(1,3)$, so $f$ decreases there. $f''$ changes sign at $x = 2$: inflection point.

*Why this is likely in 2027:* Calculus appeared in all 10 recent papers; extrema MSQs came in 2023 and 2026 S1.

</details>

### Q.39 · Discrete Mathematics · 2 marks · NAT

*Topic: Graph Theory*

A matching in a graph is a set of edges no two of which share a vertex (the empty set counts as a matching). The number of matchings in the cycle graph $C_8$ is ______.

<details><summary>Answer and solution</summary>

**Answer: 47**

For a path on $n$ vertices the count $m(P_n)$ follows Fibonacci: $m(P_n) = m(P_{n-1}) + m(P_{n-2})$, giving $m(P_6) = 13$, $m(P_8) = 34$. In $C_8$, matchings that avoid a chosen edge $e = uv$ are the matchings of the path $P_8$ (34); those using $e$ are matchings of the remaining path $P_6$ (13). Total $34 + 13 = 47$ (the Lucas number $L_8$).

*Why this is likely in 2027:* GATE 2026 S1 Q57 counted matchings in a path on 8 vertices; the cycle is the natural next step.

</details>

### Q.40 · Discrete Mathematics · 2 marks · NAT

*Topic: Combinatorics & Counting*

The number of ways to put 10 identical balls into 4 distinct boxes so that every box gets at least 1 and at most 4 balls is ______.

<details><summary>Answer and solution</summary>

**Answer: 44**

Let $y_i = x_i - 1$: $y_1 + \dots + y_4 = 6$ with $0 \le y_i \le 3$. Without the upper bound: $\binom{9}{3} = 84$. Subtract solutions with some $y_i \ge 4$: $4 \times \binom{5}{3} = 40$. Two variables $\ge 4$ would need a sum of 8, impossible. Answer $84 - 40 = 44$.

*Why this is likely in 2027:* Counting with constraints (inclusion–exclusion) came in 2021 S1, 2022 and 2025 S1.

</details>

### Q.41 · Discrete Mathematics · 2 marks · MSQ

*Topic: Groups & Algebraic Structures*

Let $G = (\mathbb{Z}_{12}, +_{12})$ be the integers modulo 12 under addition. Which of the following is/are TRUE?

- **(A)** $G$ is cyclic and 5 is a generator of $G$.
- **(B)** $G$ has exactly 4 generators.
- **(C)** $G$ has a subgroup of order 5.
- **(D)** The element 8 has order 3.

<details><summary>Answer and solution</summary>

**Answer: (A), (B), (D)**  (select all correct options; no partial marks)

$k$ generates $\mathbb{Z}_{12}$ iff $\gcd(k, 12) = 1$: the generators are $1, 5, 7, 11$, so (A) and (B) hold. By Lagrange, a subgroup's order divides 12, so no subgroup of order 5. $8, 16 \equiv 4, 24 \equiv 0$: the order of 8 is 3.

*Why this is likely in 2027:* Group questions were asked in 6 of 10 recent papers (2024 S2 Q63 used $\mathbb{Z}_2 	imes \mathbb{Z}_3 	imes \mathbb{Z}_4$).

</details>

### Q.42 · Digital Logic · 2 marks · MCQ

*Topic: Sequential Circuits*

A 3-bit synchronous counter is built from three T flip-flops with outputs $Q_2 Q_1 Q_0$ ($Q_2$ is the most significant bit). Their inputs are $T_2 = Q_1$, $T_1 = Q_0$ and $T_0 = 1$. Starting from $Q_2Q_1Q_0 = 000$, the next four states are

- **(A)** 001, 010, 011, 100
- **(B)** 001, 010, 111, 000
- **(C)** 001, 011, 111, 000
- **(D)** 001, 010, 110, 000

<details><summary>Answer and solution</summary>

**Answer: (B)**

A T flip-flop toggles when $T = 1$. From 000: $T = (0,0,1) \to 001$. From 001: $T = (0,1,1) \to 010$. From 010: $T = (1,0,1) \to 111$. From 111: $T = (1,1,1) \to 000$.

*Why this is likely in 2027:* Sequential-circuit state sequences came in 2021 S1, 2023 and 2025 S1; the 2027 syllabus asks for 'design of sequential circuits'.

</details>

### Q.43 · Digital Logic · 2 marks · MSQ

*Topic: Boolean Algebra & Minimization*

Which of the following are **minimal** sum-of-products expressions for $F(A, B, C) = \sum m(0, 1, 2, 5, 6, 7)$?

- **(A)** $\bar{A}\bar{B} + B\bar{C} + AC$
- **(B)** $\bar{A}\bar{C} + \bar{B}C + AB$
- **(C)** $\bar{A}\bar{B} + \bar{B}C + B\bar{C} + AC$
- **(D)** $\bar{A}\bar{C} + AC + \bar{B}C$

<details><summary>Answer and solution</summary>

**Answer: (A), (B)**  (select all correct options; no partial marks)

The six prime implicants $\bar A\bar B, \bar A\bar C, \bar BC, B\bar C, AC, AB$ each cover two minterms and none is essential (a cyclic map). Three are needed, and the two ways to cover all six minterms with three are (A) and (B). (C) is correct but has four terms. (D) misses minterm 6 ($AB\bar C$).

*Why this is likely in 2027:* K-map minimization with multiple minimal covers was asked in 2026 S1 Q48; the 2027 syllabus names K-maps explicitly.

</details>

### Q.44 · Computer Organization & Architecture · 2 marks · NAT

*Topic: Pipelining & Hazards*

A 5-stage pipeline (IF, ID, EX, MEM, WB) has stage latencies of 200, 150, 250, 300 and 150 ps, and each pipeline register adds 20 ps. A non-pipelined version of the same datapath takes 1050 ps per instruction. Ignoring hazards, the speedup of the pipelined processor over the non-pipelined one when running 1000 instructions is ______ (rounded off to two decimal places).

<details><summary>Answer and solution</summary>

**Answer: 3.25 to 3.29**

Pipelined clock $= \max(\text{stage}) + 20 = 320$ ps. Time $= (5 + 1000 - 1) \times 320 = 321{,}280$ ps. Non-pipelined: $1000 \times 1050 = 1{,}050{,}000$ ps. Speedup $= 1{,}050{,}000 / 321{,}280 \approx 3.27$.

*Why this is likely in 2027:* Pipelining was asked in 9 of 10 recent papers, usually as this kind of 2-mark NAT.

</details>

### Q.45 · Computer Organization & Architecture · 2 marks · MCQ

*Topic: Cache Memory*

A two-level cache has an L1 hit time of 1 ns with hit rate 90%, and an L2 hit time of 10 ns with a local hit rate of 80%. Main memory takes 100 ns. L2 is looked up only on an L1 miss, and memory only on an L2 miss. The average memory access time is

- **(A)** 3.0 ns
- **(B)** 4.0 ns
- **(C)** 5.0 ns
- **(D)** 11.0 ns

<details><summary>Answer and solution</summary>

**Answer: (B)**

$\text{AMAT} = t_{L1} + m_{L1}(t_{L2} + m_{L2} \cdot t_{mem}) = 1 + 0.1 \times (10 + 0.2 \times 100) = 1 + 0.1 \times 30 = 4.0$ ns.

*Why this is likely in 2027:* Two-level cache AMAT came in 2025 S1 Q53 and 2025 S2 Q55.

</details>

### Q.46 · Computer Organization & Architecture · 2 marks · MCQ

*Topic: ALU, Datapath & Control Unit*

A microprogrammed control unit generates 48 control signals, split into 4 mutually exclusive groups of 15, 12, 10 and 11 signals (in each microinstruction at most one signal of a group is active). The control memory holds 1024 microinstructions; each microinstruction has the control field and a next-address field only. If each group is encoded separately (vertical format), the minimum width of a microinstruction is

- **(A)** 22 bits
- **(B)** 26 bits
- **(C)** 48 bits
- **(D)** 58 bits

<details><summary>Answer and solution</summary>

**Answer: (B)**

A group of $k$ signals plus a 'none' code needs $\lceil \log_2(k+1) \rceil$ bits: $15 \to 4$, $12 \to 4$, $10 \to 4$, $11 \to 4$, so 16 bits. Next address: $\log_2 1024 = 10$ bits. Width $= 26$ bits. (Horizontal format would need $48 + 10 = 58$.)

*Why this is likely in 2027:* Microprogrammed control is newly named in the 2027 COA syllabus.

</details>

### Q.47 · Programming & Data Structures · 2 marks · NAT

*Topic: Recursion*

Consider the following C function.

```c
int g(int n) {
    if (n <= 1) return 1;
    if (n % 2 == 0) return g(n / 2) + 1;
    return g(n - 1) + g(n - 2);
}
```

The value returned by `g(7)` is ______.

<details><summary>Answer and solution</summary>

**Answer: 10**

Build up: $g(0) = g(1) = 1$, $g(2) = g(1)+1 = 2$, $g(3) = g(2)+g(1) = 3$, $g(4) = g(2)+1 = 3$, $g(5) = g(4)+g(3) = 6$, $g(6) = g(3)+1 = 4$, $g(7) = g(6)+g(5) = 10$.

*Why this is likely in 2027:* Recursive C functions came in 5 of 10 recent papers (2025 S1 Q61, 2026 S1 Q61, 2026 S2 Q61).

</details>

### Q.48 · Programming & Data Structures · 2 marks · MCQ

*Topic: Linked Lists*

Consider the following C function on a singly linked list (`free` is from `stdlib.h`).

```c
struct node { int val; struct node *next; };

int f(struct node *p) {
    int c = 0;
    while (p != NULL && p->next != NULL) {
        struct node *q = p->next;
        p->next = q->next;
        free(q);
        p = p->next;
        c++;
    }
    return c;
}
```

It is called with a pointer to the list 10 → 20 → 30 → 40 → 50 → 60 → 70. Which one of the following is correct?

- **(A)** It returns 3 and the list becomes 10 → 30 → 50 → 70.
- **(B)** It returns 3 and the list becomes 20 → 40 → 60.
- **(C)** It returns 4 and the list becomes 10 → 30 → 50 → 70.
- **(D)** It returns 3 and the list becomes 10 → 30 → 50.

<details><summary>Answer and solution</summary>

**Answer: (A)**

Each iteration deletes the node after `p` and moves `p` two places: 20, 40 and 60 are freed (c = 3). At 70, `p->next` is `NULL`, so the loop stops. The list is 10 → 30 → 50 → 70.

*Why this is likely in 2027:* Linked-list code came in 2023, 2025 S1 and 2026 S1; IIT Madras likes pointer tracing.

</details>

### Q.49 · Programming & Data Structures · 2 marks · NAT

*Topic: BST & AVL Trees*

The keys 50, 30, 70, 20, 40, 60, 80, 35, 45, 65 are inserted in this order into an empty binary search tree. The root is then deleted, replacing it with its **inorder successor**. In the resulting tree, the sum of the keys at depth 2 (the root is at depth 0) is ______.

<details><summary>Answer and solution</summary>

**Answer: 205**

The inorder successor of 50 is 60 (leftmost node of the right subtree); 60's right child 65 takes 60's old place under 70. New tree: root 60; depth 1: 30, 70; depth 2: 20, 40 (under 30) and 65, 80 (under 70). Sum $= 20 + 40 + 65 + 80 = 205$.

*Why this is likely in 2027:* BST questions appeared in 7 of 10 recent papers.

</details>

### Q.50 · Programming & Data Structures · 2 marks · MSQ

*Topic: Stacks & Queues*

The numbers 1, 2, 3, 4, 5 are pushed onto an initially empty stack in this order. Pops may be done at any time between pushes, and each popped number is printed at once. Which of the following output sequences are possible?

- **(A)** 3 2 5 4 1
- **(B)** 3 1 2 5 4
- **(C)** 1 5 4 3 2
- **(D)** 4 5 3 1 2

<details><summary>Answer and solution</summary>

**Answer: (A), (C)**  (select all correct options; no partial marks)

(A) push 1, 2, 3; pop 3, 2; push 4, 5; pop 5, 4, 1. (C) push 1, pop 1; push 2–5; pop 5, 4, 3, 2. (B) After 3 is popped, 2 is on top, so 1 cannot come next. (D) After 4, 5, 3 are printed, 2 is on top of 1, so 1 cannot come before 2.

*Why this is likely in 2027:* Stack/queue simulations came in 6 of 10 recent papers (2026 S2 Q50 combined a stack and a queue).

</details>

### Q.51 · Algorithms · 2 marks · NAT

*Topic: Dynamic Programming*

Four items have (weight, value) pairs $(1, 1)$, $(3, 4)$, $(4, 5)$ and $(5, 7)$. Each item can be taken at most once (0/1 knapsack). The maximum total value that fits in a knapsack of capacity 7 is ______.

<details><summary>Answer and solution</summary>

**Answer: 9**

Feasible sets of weight $\le 7$: $\{3,4\}$ gives value $4 + 5 = 9$; $\{5, 1\}$ gives 8; $\{3, 1\}$ gives 5; $\{4, 1\}$ gives 6. The best is **9**. Note that greedy by value/weight picks the weight-5 item first and ends at 8.

*Why this is likely in 2027:* Dynamic programming has been quiet since 2021 (3 questions, against 10 before) and is due.

</details>

### Q.52 · Algorithms · 2 marks · MSQ

*Topic: Shortest Paths*

A directed graph has some negative-weight edges but no negative-weight cycle. Which of the following is/are TRUE?

- **(A)** Dijkstra's algorithm may report a distance larger than the true shortest distance for some vertex.
- **(B)** The Bellman–Ford algorithm computes all single-source shortest distances correctly.
- **(C)** Adding the same positive constant to every edge weight (so that all weights become positive) leaves all shortest paths unchanged.
- **(D)** If the graph is acyclic, single-source shortest distances can be found in $O(V + E)$ time by relaxing edges in topological order.

<details><summary>Answer and solution</summary>

**Answer: (A), (B), (D)**  (select all correct options; no partial marks)

(A) Example: $s \to a$ (1), $s \to b$ (2), $b \to a$ ($-2$). Dijkstra finalises $a$ at 1, but the true distance is 0. (B) Bellman–Ford handles negative edges without negative cycles. (C) is false: paths with more edges are penalised more. (D) Topological-order relaxation works for any weights on a DAG.

*Why this is likely in 2027:* Shortest paths have only 3 questions since 2021 but remain core syllabus; GATE 2026 S2 asked the DAG case.

</details>

### Q.53 · Algorithms · 2 marks · MCQ

*Topic: Recurrence Relations*

The solution of the recurrence $T(n) = 4\,T(n/2) + n^2 \log n$, with $T(1) = 1$, is

- **(A)** $\Theta(n^2)$
- **(B)** $\Theta(n^2 \log n)$
- **(C)** $\Theta(n^2 \log^2 n)$
- **(D)** $\Theta(n^3)$

<details><summary>Answer and solution</summary>

**Answer: (C)**

$n^{\log_b a} = n^{\log_2 4} = n^2$ and $f(n) = n^2 \log n = \Theta(n^{\log_b a} \log^{1} n)$. By the extended master theorem, $T(n) = \Theta(n^2 \log^{2} n)$. (Unrolling: $\sum_{i} n^2 \log(n/2^i) = n^2 \cdot \Theta(\log^2 n)$.)

*Why this is likely in 2027:* Recurrences appeared in 6 of 10 recent papers (2024 S1 Q42, 2025 S1 Q20, 2026 S1 Q17).

</details>

### Q.54 · Theory of Computation · 2 marks · MCQ

*Topic: Regular Languages & Properties*

Which one of the following languages over $\{a, b\}$ is regular?

- **(A)** $\{a^n b^n \mid n \ge 0\}$
- **(B)** $\{w \mid w \text{ has as many occurrences of } ab \text{ as of } ba\}$
- **(C)** $\{ww \mid w \in \{a, b\}^*\}$
- **(D)** $\{a^p \mid p \text{ is prime}\}$

<details><summary>Answer and solution</summary>

**Answer: (B)**

In any string the counts of $ab$ and $ba$ differ by at most 1, and they are equal exactly when the string is empty or starts and ends with the same symbol, which a small DFA checks. (A), (C) and (D) are classic non-regular languages (pumping lemma).

*Why this is likely in 2027:* Regular-or-not identification came in 2022, 2024 S1, 2025 S1 and S2.

</details>

### Q.55 · Theory of Computation · 2 marks · MSQ

*Topic: Context-Free Languages & Closure*

Which of the following languages are context-free?

- **(A)** $\{a^i b^j c^k \mid i = j \text{ or } j = k\}$
- **(B)** $\{a^i b^j c^k \mid i = j = k\}$
- **(C)** $\{w w^R \mid w \in \{a, b\}^*\}$
- **(D)** $\{a^i b^j c^i d^j \mid i, j \ge 0\}$

<details><summary>Answer and solution</summary>

**Answer: (A), (C)**  (select all correct options; no partial marks)

(A) is the union of two CFLs. (C) even-length palindromes: $S \to aSa \mid bSb \mid \varepsilon$. (B) needs three equal counts and (D) needs two crossing matches; both fail the CFL pumping lemma.

*Why this is likely in 2027:* CFL identification is a fixture (2022, 2025 S1, 2026 S2 Q48).

</details>

### Q.56 · Compiler Design · 2 marks · NAT

*Topic: Parsing (LL/LR)*

Consider the augmented grammar

$$S' \to S \qquad S \to A\,A \qquad A \to a\,A \mid b$$

The number of states in the canonical **LR(1)** collection of item sets is ______.

<details><summary>Answer and solution</summary>

**Answer: 10**

$I_0$; $I_1 = goto(I_0, S)$; $I_2 = goto(I_0, A)$, whose items have lookahead `$`; $I_3, I_4$ from $a$ and $b$ with lookaheads $a/b$; $I_5$: $S \to AA\cdot$; $I_6, I_7$: the $a$ and $b$ items again, now with lookahead `$`; $I_8$: $A \to aA\cdot$ (lookahead $a/b$); $I_9$: $A \to aA\cdot$ (lookahead `$`). That is **10** states. LALR(1) merges $I_3/I_6$, $I_4/I_7$ and $I_8/I_9$, leaving 7 (the LR(0) count).

*Why this is likely in 2027:* LR item-set counting came in 2021 S2 Q51, 2022 Q29 and 2026 S2 Q41.

</details>

### Q.57 · Compiler Design · 2 marks · MCQ

*Topic: Code Optimization & Data-Flow Analysis*

Consider the basic block

```text
a = b + c
d = a - e
b = d * 2
e = b + c
```

Only `e` is live at the exit of the block. The set of variables live at the **entry** of the block is

- **(A)** $\{b, c\}$
- **(B)** $\{b, c, e\}$
- **(C)** $\{a, b, c, e\}$
- **(D)** $\{c, e\}$

<details><summary>Answer and solution</summary>

**Answer: (B)**

Work backwards with $IN = USE \cup (OUT - DEF)$. After line 4: $\{e\}$. Line 4: $\{b, c\}$. Line 3: $\{c, d\}$. Line 2: $\{a, c, e\}$. Line 1: $(\{a,c,e\} - \{a\}) \cup \{b, c\} = \{b, c, e\}$.

*Why this is likely in 2027:* Liveness and data-flow analysis came in 2021 S2, 2023 and 2026 S2 Q45.

</details>

### Q.58 · Operating System · 2 marks · MSQ

*Topic: Synchronization & Concurrency*

Two processes $P_0$ and $P_1$ share `bool flag[2]` (both initially false) and `int turn`. Process $P_i$ (with $j = 1 - i$) runs:

```c
while (1) {
    flag[i] = true;
    turn = i;                        /* note: i, not j */
    while (flag[j] && turn == i) ;   /* busy wait */
    /* critical section */
    flag[i] = false;
    /* remainder section */
}
```

Which of the following is/are TRUE?

- **(A)** Mutual exclusion is guaranteed.
- **(B)** The two processes can deadlock, each waiting for ever.
- **(C)** If both processes want to enter, the one that wrote `turn` last waits.
- **(D)** A waiting process can be overtaken by the other process an unbounded number of times.

<details><summary>Answer and solution</summary>

**Answer: (A), (C)**  (select all correct options; no partial marks)

This is Peterson's algorithm with `turn` meaning 'who arrived last'. If both are trying, `turn` holds the id of the later writer, and only that process waits, so exactly one enters: mutual exclusion and progress hold. When the other process re-enters it sets `turn` to its own id, which releases the waiter, so waiting is bounded (once).

*Why this is likely in 2027:* Synchronisation is IIT Madras's favourite OS topic; 7 of 10 recent papers asked it.

</details>

### Q.59 · Operating System · 2 marks · NAT

*Topic: Virtual Memory & Page Replacement*

A process with 3 page frames (initially empty) makes the page references

2, 3, 2, 1, 5, 2, 4, 5, 3, 2, 5, 2

The number of page faults under **LRU** replacement is ______.

<details><summary>Answer and solution</summary>

**Answer: 7**

2 fault, 3 fault, 2 hit, 1 fault, 5 fault (evicts 3), 2 hit, 4 fault (evicts 1), 5 hit, 3 fault (evicts 2), 2 fault (evicts 4), 5 hit, 2 hit. Total **7** faults. (For comparison, FIFO gives 9 and optimal replacement gives 6 on this string.)

*Why this is likely in 2027:* Page-replacement traces came in 2022, 2025 S1 and 2025 S2.

</details>

### Q.60 · Operating System · 2 marks · NAT

*Topic: CPU Scheduling*

Four processes arrive with (arrival time, CPU burst) in milliseconds: P1 (0, 9), P2 (1, 4), P3 (2, 2), P4 (4, 3). Using preemptive **shortest remaining time first** scheduling, the average waiting time in milliseconds is ______ (rounded off to two decimal places).

<details><summary>Answer and solution</summary>

**Answer: 3.5**

Gantt chart: P1 0–1, P2 1–2, P3 2–4, P2 4–7, P4 7–10, P1 10–18. Waiting = completion − arrival − burst: P1 $18-0-9 = 9$, P2 $7-1-4 = 2$, P3 $4-2-2 = 0$, P4 $10-4-3 = 3$. Average $= 14/4 = 3.5$. (At $t = 4$, P2 and P4 both have 3 ms left; running P4 first gives waits 9, 5, 0, 0 and the same average.)

*Why this is likely in 2027:* CPU scheduling was asked in 9 of 10 recent papers; SRTF came in GATE 2019 (IIT Madras) and 2025 S2.

</details>

### Q.61 · Databases · 2 marks · MSQ

*Topic: FDs, Keys & Normalization*

A relation $R(A, B, C, D)$ has the functional dependencies $\{A \to B,\; B \to C,\; C \to A,\; A \to D\}$. Which of the following is/are TRUE?

- **(A)** $R$ has exactly three candidate keys.
- **(B)** $R$ is in BCNF.
- **(C)** $R$ is in 3NF but not in BCNF.
- **(D)** Decomposing $R$ into $R_1(A, B, C)$ and $R_2(A, D)$ is lossless and dependency preserving.

<details><summary>Answer and solution</summary>

**Answer: (A), (B), (D)**  (select all correct options; no partial marks)

$A^+ = B^+ = C^+ = ABCD$, and $D$ determines nothing, so the candidate keys are $A$, $B$ and $C$. Every FD has a superkey on the left, so $R$ is in BCNF (hence (C) is false). In the decomposition the common attribute $A$ is a key of $R_2$, so it is lossless; $A \to B$, $B \to C$, $C \to A$ hold in $R_1$ and $A \to D$ in $R_2$, so it preserves dependencies.

*Why this is likely in 2027:* Normalization was asked in 9 of 10 recent papers, often as 2-mark MSQs.

</details>

### Q.62 · Databases · 2 marks · MCQ

*Topic: SQL*

The table `Emp(eid, dept, salary)` contains:

| eid | dept | salary |
|---:|---|---:|
| 1 | CS | 70 |
| 2 | CS | 50 |
| 3 | EE | 60 |
| 4 | EE | 80 |
| 5 | ME | 40 |
| 6 | CS | 90 |
| 7 | ME | NULL |

```sql
SELECT dept, COUNT(*)
FROM Emp e1
WHERE salary > (SELECT AVG(salary) FROM Emp e2 WHERE e2.dept = e1.dept)
GROUP BY dept;
```

The number of rows returned by the query is

- **(A)** 1
- **(B)** 2
- **(C)** 3
- **(D)** 4

<details><summary>Answer and solution</summary>

**Answer: (B)**

`AVG` ignores NULL: CS average 70, EE 70, ME 40. Rows that pass: eid 6 (90 > 70, CS) and eid 4 (80 > 70, EE). ME has none (40 is not > 40, and `NULL > 40` is unknown). The result has 2 groups: (CS, 1) and (EE, 1).

*Why this is likely in 2027:* SQL with correlated subqueries and NULLs came in 2022 Q56, 2025 S1 Q55 and S2 Q54.

</details>

### Q.63 · Computer Networks · 2 marks · NAT

*Topic: Flow Control & Sliding Window*

A 10 Mbps link has a one-way propagation delay of 15 ms. Frames are 1250 bytes long and acknowledgements are negligibly small. Using Go-Back-N, the minimum number of bits needed in the sequence-number field to achieve 100% link utilisation is ______.

<details><summary>Answer and solution</summary>

**Answer: 5**

Transmission time $= 1250 \times 8 / 10^7 = 1$ ms, so $a = 15$. Full utilisation needs a window of $1 + 2a = 31$ frames. Go-Back-N allows a window of $2^k - 1$, so $2^k - 1 \ge 31$ gives $k = 5$.

*Why this is likely in 2027:* Sliding-window sizing came in 2021 S1, 2026 S1 Q45 and 2026 S2 Q65.

</details>

### Q.64 · Computer Networks · 2 marks · MCQ

*Topic: TCP & Congestion Control*

A TCP Reno sender has a timeout when its congestion window is 20 MSS. It sets ssthresh to half of that window and restarts with cwnd = 1 MSS. Treat each RTT as one round: in slow start cwnd doubles each round but never exceeds ssthresh; once cwnd equals ssthresh it grows by 1 MSS per round. The congestion window during the 6th round after the timeout is

- **(A)** 8 MSS
- **(B)** 10 MSS
- **(C)** 11 MSS
- **(D)** 16 MSS

<details><summary>Answer and solution</summary>

**Answer: (C)**

ssthresh $= 10$. Rounds 1–6: 1, 2, 4, 8, then $\min(16, 10) = 10$, then congestion avoidance gives 11.

*Why this is likely in 2027:* TCP congestion control was asked in 9 of 10 recent papers (2024 S2 Q54, 2026 S1 Q44, 2026 S2 Q58).

</details>

### Q.65 · Computer Networks · 2 marks · MCQ

*Topic: IPv4 Fragmentation*

An IPv4 datagram with total length 2400 bytes (20-byte header, no options) must cross a link whose MTU is 1000 bytes. The number of fragments and the fragment-offset field of the **last** fragment are

- **(A)** 3 and 244
- **(B)** 3 and 245
- **(C)** 2 and 122
- **(D)** 3 and 122

<details><summary>Answer and solution</summary>

**Answer: (A)**

Data $= 2380$ bytes. Each fragment carries at most $1000 - 20 = 980$ bytes, rounded down to a multiple of 8: 976. Fragments carry 976, 976 and 428 bytes, at byte offsets 0, 976 and 1952. The offset field counts 8-byte units: $1952 / 8 = 244$.

*Why this is likely in 2027:* IPv4 fragmentation came in 5 of 10 recent papers and stays in the 2027 syllabus.

</details>

## Answer key

| | | | | |
|---|---|---|---|---|
| Q.1: (C) | Q.2: (A) | Q.3: (B) | Q.4: (B) | Q.5: (D) |
| Q.6: (B) | Q.7: (C) | Q.8: (B) | Q.9: (B) | Q.10: (C) |
| Q.11: (A) | Q.12: (D) | Q.13: (A) | Q.14: (A), (B) | Q.15: -11.25 |
| Q.16: 4 | Q.17: (A) | Q.18: 18 | Q.19: (A), (C), (D) | Q.20: 14 |
| Q.21: (B), (C), (D) | Q.22: (A) | Q.23: (A), (C) | Q.24: (B) | Q.25: (A), (B), (D) |
| Q.26: (C) | Q.27: (C) | Q.28: (A), (C) | Q.29: (C) | Q.30: (A), (C) |
| Q.31: 12 | Q.32: (D) | Q.33: (C) | Q.34: (A), (B), (D) | Q.35: 8190 |
| Q.36: (A), (B), (C) | Q.37: 0.366 to 0.37 | Q.38: (A), (B), (D) | Q.39: 47 | Q.40: 44 |
| Q.41: (A), (B), (D) | Q.42: (B) | Q.43: (A), (B) | Q.44: 3.25 to 3.29 | Q.45: (B) |
| Q.46: (B) | Q.47: 10 | Q.48: (A) | Q.49: 205 | Q.50: (A), (C) |
| Q.51: 9 | Q.52: (A), (B), (D) | Q.53: (C) | Q.54: (B) | Q.55: (A), (C) |
| Q.56: 10 | Q.57: (B) | Q.58: (A), (C) | Q.59: 7 | Q.60: 3.5 |
| Q.61: (A), (B), (D) | Q.62: (B) | Q.63: 5 | Q.64: (C) | Q.65: (A) |

> [!TIP] After the paper
> Note every question you got wrong, find its topic in the blueprint, and drill that topic with the subject's **Previous-year questions** tab. Re-attempt the mock after two weeks; your score should rise on the same paper only if the concept, not the answer, stuck.
