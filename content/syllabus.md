# Official syllabus: GATE 2027 CS

The GATE 2027 Computer Science and Information Technology (CS) syllabus, as published by the organising institute, IIT Madras. Wording below is the official text; each section links to its notes on this site.

> [!IMPORTANT] Source
> Official PDFs: [CS syllabus](https://gate2027.iitm.ac.in/static/doc/GATE2027_Syllabus/CS_GATE2027_Syllabus.pdf) and the [GATE 2027 website](https://gate2027.iitm.ac.in/). The CS paper also carries a General Aptitude (GA) section, whose syllabus is at the bottom of this page.

## How the paper maps to the syllabus

| Part | Marks | Questions |
|---|---|---|
| General Aptitude (GA) | 15 | 10 (5 × 1 mark, 5 × 2 marks) |
| Engineering Mathematics (Section 1) | 13 (approx.) | part of the 55 subject questions |
| CS subjects (Sections 2–10) | 72 (approx.) | part of the 55 subject questions |
| **Total** | **100** | **65** |

The 13/72 split between Engineering Mathematics and the CS subjects is the official guideline; individual papers vary by a mark or two. Discrete Mathematics is part of Engineering Mathematics in the syllabus, but past papers ask it like a core CS subject, so it has its own page here.

## Section 1: Engineering Mathematics

> **Discrete Mathematics:** Propositional and first order logic. Sets, relations, functions, partial orders and lattices. Monoids, Groups. Graphs: connectivity, matching, colouring. Combinatorics: counting, recurrence relations, generating functions.
>
> **Linear Algebra:** Matrices, determinants, system of linear equations, eigenvalues and eigenvectors, LU decomposition.
>
> **Calculus:** Limits, continuity and differentiability, Maxima and minima, Mean value theorem, Integration.
>
> **Probability and Statistics:** Random variables, Uniform, normal, exponential, Poisson and binomial distributions. Mean, median, mode and standard deviation. Conditional probability and Bayes theorem.

Study it: [Discrete Mathematics](#/subjects/dm) · [Engineering Mathematics](#/subjects/em) (linear algebra, calculus, probability)

## Section 2: Digital Logic

> Boolean algebra and minimization – algebraic technique, Karnaugh map, tabular method. Design of combinational and sequential circuits. Number representation and arithmetic (fixed and floating point).

Study it: [Digital Logic](#/subjects/dl)

## Section 3: Computer Organization and Architecture

> Instruction set and addressing modes. Design of arithmetic and logic unit (ALU). Design of control unit – hardwired and microprogrammed. Memory interfacing and hierarchy: performance, cache memory mapping. I/O interface (interrupt and DMA). Instruction pipelining, pipeline hazards.

Study it: [Computer Organization & Architecture](#/subjects/coa)

## Section 4: Programming and Data Structures

> Programming in C. Recursion. Arrays, stacks, queues, linked lists, trees, binary search trees, binary heaps, graphs.

Study it: [Programming & Data Structures](#/subjects/pds)

## Section 5: Algorithms

> Searching, sorting, hashing. Asymptotic worst case time and space complexity. Algorithm design techniques: greedy, dynamic programming and divide-and-conquer. Graph traversals, minimum spanning trees, shortest paths.

Study it: [Algorithms](#/subjects/algo)

## Section 6: Theory of Computation

> Regular expressions and finite automata. Context-free grammars and push-down automata. Regular and context-free languages, pumping lemma. Turing machines and undecidability.

Study it: [Theory of Computation](#/subjects/toc)

## Section 7: Compiler Design

> Lexical analysis, parsing, syntax-directed translation. Runtime environments. Intermediate code generation. Local optimisation, Data flow analyses: constant propagation, liveness analysis, common sub expression elimination.

Study it: [Compiler Design](#/subjects/cd)

## Section 8: Operating System

> System calls, processes, threads, inter-process communication, concurrency and synchronization. Deadlock. CPU and I/O scheduling. Memory management and virtual memory. File systems.

Study it: [Operating System](#/subjects/os)

## Section 9: Databases

> ER-model. Relational model: relational algebra, tuple calculus, SQL. Integrity constraints, normal forms. File organization, indexing (e.g., B and B+ trees). Transactions and concurrency control.

Study it: [Databases](#/subjects/db)

## Section 10: Computer Networks

> Principles of Layering; Basics of switching (circuit, packet and virtual circuit) and performance metrics; Data link layer: error detection, Medium Access Control, Ethernet; Distance vector and link state routing; IPv4 - Fragmentation, CIDR Notation, Network Address Translation; TCP- flow control and congestion control, socket API; DNS and HTTP.

Study it: [Computer Networks](#/subjects/cn)

## What changed from GATE 2026

Sections 1, 4, 5, 6, 7, 8 and 9 are unchanged. Three sections were rewritten:

| Section | GATE 2026 wording | What changed for 2027 |
|---|---|---|
| Digital Logic | Boolean algebra. Combinational and sequential circuits. Minimization. Number representations and computer arithmetic (fixed and floating point). | Minimisation methods are now named: algebraic, **Karnaugh map** and **tabular (Quine–McCluskey)**. Circuits are now "design of" combinational and sequential circuits. |
| Computer Organization | Machine instructions and addressing modes. ALU, data-path and control unit. Instruction pipelining, pipeline hazards. Memory hierarchy: cache, main memory and secondary storage; I/O interface (interrupt and DMA mode). | **Added:** design of the ALU, **hardwired vs microprogrammed control**, memory interfacing, memory-hierarchy performance, cache mapping. **Dropped:** secondary storage (disk) as a named topic, and the explicit "data-path". |
| Computer Networks | Concept of layering: OSI and TCP/IP stacks; packet, circuit and virtual-circuit switching; framing, error detection, MAC, Ethernet bridging; shortest path, flooding, distance vector and link state routing; fragmentation, IPv4, CIDR, ARP, DHCP, ICMP, NAT; flow and congestion control, UDP, TCP, sockets; DNS, SMTP, HTTP, FTP, Email. | **Added:** switching **performance metrics** (delay, throughput), **socket API**. **Dropped:** OSI/TCP-IP stacks by name, framing, Ethernet bridging, flooding and shortest-path routing as named items, **ARP, DHCP, ICMP, UDP, SMTP, FTP and Email**. |

> [!TIP] What this means for your preparation
> - **Networks:** spend the saved time on delay/throughput numericals, sliding window, TCP congestion control, CIDR/subnetting and distance-vector/link-state. Read UDP/ARP/ICMP only enough to understand TCP/IP; don't drill them.
> - **COA:** add hardwired vs microprogrammed control-unit design and memory interfacing (chip arrays, address decoding) to your list; disk-access numericals are lower priority now.
> - **Digital Logic:** practise one or two Quine–McCluskey (tabular) minimisations, not just K-maps.

## General Aptitude (GA)

Common to all GATE papers; 15 marks.

> **Verbal Aptitude:** Basic English grammar: tenses, articles, adjectives, prepositions, conjunctions, verb-noun agreement, and other parts of speech. Basic vocabulary: words, idioms, and phrases in context. Reading and comprehension, Narrative sequencing.
>
> **Quantitative Aptitude:** Data interpretation: data graphs (bar graphs, pie charts, and other graphs representing data), 2- and 3-dimensional plots, maps, and tables. Numerical computation and estimation: ratios, percentages, powers, exponents and logarithms, permutations and combinations, and series. Mensuration and geometry, Elementary statistics and probability.
>
> **Analytical Aptitude:** Logic: deduction and induction, Analogy, Numerical relations and reasoning.
>
> **Spatial Aptitude:** Transformation of shapes: translation, rotation, scaling, mirroring, assembling, and grouping; paper folding, cutting, and patterns in 2 and 3 dimensions.

Study it: [General Aptitude](#/subjects/ga)
