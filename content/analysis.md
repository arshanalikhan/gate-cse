# Topic weightage & trends

Every Computer Science question in **28 GATE CSE papers from 2007 to 2026** was read and tagged with a subject and a topic: **1,605 technical questions** in all. For 2021–2026 the question type and marks come from the official answer keys. This page shows what that data says about where the marks are, and what it means for GATE 2027.

> [!NOTE] What was analysed
> All papers from 2007 to 2026 except two: the 2011 paper and 2017 Set 1 in the source folder are corrupted and can't be opened, and no official copy is online any more. Years with several sets (2014, 2015, 2016, 2021, 2024, 2025, 2026) count every set. Marks are out of the **85 technical marks** of today's paper; the 2007–2009 papers, which had different totals, are scaled to match. General Aptitude has been a fixed 15 marks since 2010.

## The short version

- **No subject is safe to skip.** In 2021–2026 every one of the 11 technical subjects averaged between **6.7 and 9.3 marks**, and none fell below 3 marks in any paper.
- **Programming & Data Structures is the biggest single subject** at 9.3 marks a paper, and the IIT Madras paper of 2019 gave it 12.
- **Mathematics is really 15 marks, not 13.** The official pattern lists Engineering Mathematics at 13 marks, but Discrete + Engineering Mathematics together averaged **15.2 marks** in 2021–2026 (range 12–21).
- **Five topics appeared in all 10 recent papers:** linear algebra, finite automata & regular expressions, paging/TLB, calculus, and number systems.
- **Compiler Design and Digital Logic are rising.** Compiler Design went from 4.5 marks a paper (2014–20) to 6.7 (2021–26); Digital Logic from 5.8 to 7.0. "Skip compilers" is no longer good advice.
- **Algorithms and Discrete Mathematics swing the most** from paper to paper (Algorithms 4–12, Discrete Mathematics 3–15), so prepare them fully even though their average is moderate.
- **MSQs are now about 30% of the technical paper** (16 of 55 questions on average) and they carry no negative marks, but also no partial marks.

```widget
type: weightage-subjects
```

## Subject weightage across three eras

Average marks per paper, out of 85 technical marks. "2019 (IITM)" is the last paper set by IIT Madras, which also sets GATE 2027.

| Subject | 2007–13 | 2014–20 | 2021–26 | Range 2021–26 | 2019 (IITM) | Trend |
|---|---:|---:|---:|---:|---:|---|
| [Programming & Data Structures](#/subjects/pds) | 7.8 | 10.8 | **9.3** | 6–12 | 12 | high; 10–12 in 2025–26 |
| [Computer Organization & Architecture](#/subjects/coa) | 8.5 | 6.8 | **8.3** | 5–10 | 4 | rising |
| [Computer Networks](#/subjects/cn) | 7.5 | 8.4 | **8.1** | 6–10 | 9 | steady |
| [Operating System](#/subjects/os) | 7.8 | 7.7 | **8.0** | 6–10 | 10 | steady |
| [Engineering Mathematics](#/subjects/em) | 6.1 | 8.0 | **7.8** | 6–9 | 9 | steady |
| [Algorithms](#/subjects/algo) | 10.5 | 8.9 | **7.7** | 4–12 | 6 | falling |
| [Discrete Mathematics](#/subjects/dm) | 9.0 | 9.2 | **7.4** | 3–15 | 6 | falling |
| [Theory of Computation](#/subjects/toc) | 7.1 | 7.1 | **7.4** | 6–9 | 8 | steady |
| [Databases](#/subjects/db) | 8.0 | 6.9 | **7.3** | 5–9 | 8 | steady |
| [Digital Logic](#/subjects/dl) | 5.1 | 5.8 | **7.0** | 5–9 | 7 | rising |
| [Compiler Design](#/subjects/cd) | 5.0 | 4.5 | **6.7** | 4–8 | 6 | rising |

Before 2016 the syllabus also had Software Engineering, Web Technologies and numerical methods; those took about 2.7 marks a paper in 2007–13 and have not been asked since 2015.

### Paper by paper, 2021–2026

| Subject | 2021 S1 | 2021 S2 | 2022 | 2023 | 2024 S1 | 2024 S2 | 2025 S1 | 2025 S2 | 2026 S1 | 2026 S2 |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| PDS | 6 | 8 | 9 | 9 | 8 | 10 | 9 | 12 | 12 | 10 |
| COA | 5 | 8 | 7 | 8 | 10 | 10 | 8 | 9 | 9 | 9 |
| CN | 9 | 7 | 10 | 8 | 9 | 9 | 6 | 6 | 8 | 9 |
| OS | 6 | 7 | 10 | 9 | 8 | 8 | 8 | 7 | 8 | 9 |
| EM | 8 | 9 | 6 | 6 | 8 | 6 | 9 | 9 | 8 | 9 |
| ALGO | 12 | 10 | 4 | 4 | 7 | 5 | 9 | 8 | 8 | 10 |
| DM | 9 | 4 | 15 | 12 | 6 | 8 | 6 | 3 | 7 | 4 |
| TOC | 8 | 9 | 8 | 8 | 7 | 7 | 8 | 7 | 6 | 6 |
| DB | 8 | 8 | 7 | 5 | 8 | 8 | 8 | 9 | 6 | 6 |
| DL | 6 | 7 | 5 | 8 | 6 | 6 | 8 | 9 | 8 | 7 |
| CD | 8 | 8 | 4 | 8 | 8 | 8 | 6 | 6 | 5 | 6 |

Programming & Data Structures has climbed to 10–12 marks in the last three papers, and COA has held at 8–10 since 2024.

## How the paper is built now

Since MSQs arrived in 2021, the 55 technical questions split like this on average (counts of questions, official answer keys):

| | MCQ | MSQ | NAT | Total |
|---|---:|---:|---:|---:|
| 1-mark (25 questions) | 11.4 | 7.5 | 6.1 | 25 |
| 2-mark (30 questions) | 10.6 | 8.5 | 10.9 | 30 |
| **All technical** | **22.0** | **16.0** | **17.0** | **55** |

The mix moves a lot between papers: 2026 Set 1 had **24 MSQs**, 2024 Set 2 had only 2 one-mark NATs, and 2025 Set 1 had 15 two-mark NATs. Expect MSQ-heavy sets.

> [!IMPORTANT] What this means for scoring
> Only MCQs carry negative marks (−1/3 for a 1-mark MCQ, −2/3 for a 2-mark MCQ). In a typical recent paper that is the 10 GA questions plus about 22 technical MCQs. The other ~33 technical questions (MSQ + NAT) can be answered with no penalty, but an MSQ only scores if you mark exactly the right set of options. Attempt every NAT and MSQ you have worked through, and guess on an MCQ only when you can eliminate options.

## The 30 most reliable topics (2021–2026)

Ranked by how many of the 10 recent papers asked at least one question on the topic, then by marks. Topics dropped from the 2027 syllabus are left out.

| # | Topic | Subject | Papers (of 10) | Questions | Marks | Asked since 2007 |
|---:|---|---|---:|---:|---:|---:|
| 1 | Linear Algebra | EM | 10 | 20 | 29 | 49 |
| 2 | Finite Automata & Regular Expressions | TOC | 10 | 17 | 27 | 45 |
| 3 | Paging, TLB & Page Tables | OS | 10 | 11 | 19 | 22 |
| 4 | Calculus | EM | 10 | 13 | 15 | 38 |
| 5 | Number Systems & Fixed-Point Arithmetic | DL | 10 | 10 | 11 | 24 |
| 6 | Probability & Statistics | EM | 9 | 21 | 34 | 51 |
| 7 | C Programming | PDS | 9 | 20 | 29 | 59 |
| 8 | Cache Memory | COA | 9 | 16 | 28 | 44 |
| 9 | Parsing (LL/LR) | CD | 9 | 15 | 24 | 41 |
| 10 | FDs, Keys & Normalization | DB | 9 | 13 | 21 | 30 |
| 11 | Pipelining & Hazards | COA | 9 | 11 | 18 | 32 |
| 12 | TCP & Congestion Control | CN | 9 | 10 | 16 | 26 |
| 13 | CPU Scheduling | OS | 9 | 9 | 13 | 24 |
| 14 | Boolean Algebra & Minimization | DL | 8 | 13 | 22 | 44 |
| 15 | Instruction Set & Addressing Modes | COA | 8 | 10 | 17 | 21 |
| 16 | IPv4 Addressing, CIDR & Forwarding | CN | 8 | 10 | 16 | 28 |
| 17 | Transactions & Concurrency Control | DB | 8 | 11 | 16 | 29 |
| 18 | Floating Point (IEEE 754) | DL | 8 | 8 | 12 | 13 |
| 19 | Graph Theory | DM | 7 | 17 | 30 | 47 |
| 20 | Minimum Spanning Trees | ALGO | 7 | 9 | 15 | 24 |
| 21 | CFGs & Pushdown Automata | TOC | 7 | 9 | 15 | 16 |
| 22 | Synchronization & Concurrency | OS | 7 | 7 | 13 | 25 |
| 23 | BST & AVL Trees | PDS | 7 | 8 | 12 | 22 |
| 24 | Context-Free Languages & Closure | TOC | 7 | 8 | 12 | 23 |
| 25 | Syntax-Directed Translation | CD | 7 | 7 | 12 | 10 |
| 26 | File Organization & Indexing (B/B+ Trees) | DB | 7 | 7 | 10 | 22 |
| 27 | I/O, Interrupts & DMA | COA | 7 | 7 | 7 | 13 |
| 28 | Graph Traversal (BFS/DFS) | ALGO | 6 | 8 | 15 | 20 |
| 29 | Sequential Circuits | DL | 6 | 8 | 14 | 19 |
| 30 | Binary Heaps | PDS | 6 | 8 | 12 | 22 |

Probability & Statistics, Graph Theory and C Programming bring the most marks: each was worth about 3 marks a paper in 2021–2026.

### Quiet topics that may come back

These were asked often before 2021 but rarely since. Examiners rotate topics, so do not drop them; a 2-mark question on any of them would surprise few people.

- **Dynamic Programming**: 10 questions before 2021, only 3 since (last in 2026). LCS, 0/1 knapsack, matrix-chain and LIS are all fair game.
- **Propositional Logic**: 13 questions before 2021, 3 since.
- **Main Memory & Interfacing**: 10 before 2021, 1 since, and the 2027 syllabus now names *memory interfacing* explicitly. Chip-select decoding and memory-chip counting are likely.
- **Greedy Algorithms**: 7 before 2021, 1 since (Huffman coding, activity selection, fractional knapsack).
- **Relations, Recurrences & Generating Functions**: steady before 2021, fewer since.
- **Shortest Paths and Runtime Environments**: 3 questions each since 2021, but both are core syllabus.

## What the 2027 syllabus change does

IIT Madras revised the syllabus for 2027. Seven sections are unchanged; three were rewritten. The [syllabus page](#/syllabus) has the full text.

| Section | Change for 2027 | Effect on this analysis |
|---|---|---|
| Digital Logic | Names *K-map* and the *tabular (Quine–McCluskey) method*; "design of" combinational and sequential circuits | Minimization questions stay; expect prime-implicant counting and circuit design |
| COA | Adds *ALU design*, *hardwired and microprogrammed control unit*, *memory interfacing*; drops "main memory and secondary storage" | Control-word and microinstruction sizing, chip-select decoding come back; disk-geometry numericals (3 since 2021) move out of COA |
| Computer Networks | Keeps layering, switching and *performance metrics*, error detection, MAC, Ethernet, DV/LS routing, IPv4 fragmentation, CIDR, NAT, TCP flow/congestion control, *socket API*, DNS and HTTP. Drops framing, bridging, flooding, ARP, DHCP, ICMP, UDP, SMTP, FTP, email | The three ARP/DHCP questions asked since 2021 would now be out of syllabus; delay/throughput numericals and socket calls gain |

## The IIT Madras factor

IIT Madras set GATE 2011, 2019 and now 2027. The 2019 paper (the last one IITM set) leaned on fundamentals rather than long calculations:

- **12 marks of Programming & Data Structures**, the most of any subject: six short C programs to trace (pointers, `static`, recursion, loops) and a max-heap question.
- **10 marks of Operating Systems**: `fork()`, semaphores, SRTF, inode file sizes, TLB reach and a resource-allocation snapshot.
- **15 marks of mathematics** (Discrete + Engineering), with three probability questions.
- **Only 4 marks of COA**, the lowest in the dataset.

One paper is a thin sample, so the prediction weights 2019 only 1.5 times a normal paper. Still, the message for 2027 is clear: trace C code fluently and know OS synchronisation cold.

## Subject by subject

Each chart shows marks per topic across 2021–2026; the subject page has the full topic list, notes and formula sheet.

### Programming & Data Structures
C programming (pointers, `static`, scope, recursion) is asked in 9 of 10 recent papers. Heaps, BSTs and stack/queue simulations fill the rest.

```widget
type: weightage-topics
subject: PDS
metric: recent
```

### Computer Organization & Architecture
Cache and pipelining questions are almost guaranteed, usually as 2-mark NATs. Addressing modes and instruction encoding appeared in 8 of 10 papers.

```widget
type: weightage-topics
subject: COA
metric: recent
```

### Operating System
Paging/TLB was asked in every recent paper; scheduling in 9 of 10. Synchronisation is the favourite 2-mark MSQ.

```widget
type: weightage-topics
subject: OS
metric: recent
```

### Computer Networks
TCP congestion control, CIDR/forwarding and fragmentation dominate; with the trimmed 2027 syllabus these become even more central.

```widget
type: weightage-topics
subject: CN
metric: recent
```

### Engineering Mathematics
Linear algebra and calculus appeared in all 10 recent papers; probability brings the most marks of any single topic.

```widget
type: weightage-topics
subject: EM
metric: recent
```

### Discrete Mathematics
Graph theory is the anchor (17 questions since 2021). Logic, groups and counting rotate.

```widget
type: weightage-topics
subject: DM
metric: recent
```

### Algorithms
MSTs, graph traversal, hashing and recurrences come up most. Dynamic programming has been quiet since 2021 and is due.

```widget
type: weightage-topics
subject: ALGO
metric: recent
```

### Theory of Computation
Finite automata and regular expressions appeared in every recent paper. Closure properties and decidability arrive as MSQs.

```widget
type: weightage-topics
subject: TOC
metric: recent
```

### Databases
Normalization and transactions are near-certain; expect one B+ tree question and one SQL or relational algebra question.

```widget
type: weightage-topics
subject: DB
metric: recent
```

### Digital Logic
Number representation (two's complement, IEEE 754) is asked every year; K-map minimization almost every year.

```widget
type: weightage-topics
subject: DL
metric: recent
```

### Compiler Design
Parsing (FIRST/FOLLOW, LL(1), LR items) is the core; SDT and data-flow analysis are the other regulars.

```widget
type: weightage-topics
subject: CD
metric: recent
```

## How the prediction is made

The [predicted 2027 paper](#/predicted-2027) uses these numbers:

1. **Subject marks**: a weighted average of 2014–2026 papers, each year weighted $0.8^{\,2026-\text{year}}$ (so 2026 counts 1, 2021 counts 0.33), with the IIT Madras 2019 paper weighted 1.5×. Then adjusted for the 2027 syllabus: COA up, Computer Networks unchanged in marks but narrower in topics.
2. **Topics inside a subject**: chosen by hit rate (papers out of 10 that asked the topic), then by topics that are due.
3. **Question types**: the 2021–2026 averages above, so 21 MCQs, 17 MSQs and 17 NATs among the 55 technical questions.

The result is a blueprint of where the marks are most likely to sit, not a guarantee of exact questions.

> [!TIP] Using this page
> Start with the topics in the top-30 table, then use each subject's **Previous-year questions** tab to practise exactly those topics. The [past papers page](#/papers) has every paper and official answer key used here.
