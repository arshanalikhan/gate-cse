# Computer Organization & Architecture

Instruction sets and addressing, ALU and control-unit design, memory interfacing, the memory hierarchy and cache mapping, I/O with interrupts and DMA, and pipelining. Typically 5–10 marks per paper, mostly numerical.

<!-- plan:start -->
## Battle plan

Expected **8.3 marks** per paper (5–10 across the 10 papers of 2021–26) · default budget **22 hours** · week 2 of the [13-week plan](#/strategy?h=the-13-week-plan).

| Priority | Topic | Last 10 papers | Learn by | Study, then practise |
|---|---|---|---|---|
| **A** | Cache Memory | 28 marks · 9 papers | Solving | [Memory hierarchy performance](#/subjects/coa/notes?h=memory-hierarchy-performance) · [Cache memory mapping](#/subjects/coa/notes?h=cache-memory-mapping) → [36 questions](#/subjects/coa/pyq?topic=cache&years=pre2024) |
| **A** | Pipelining & Hazards | 18 marks · 9 papers | Solving | [Instruction pipelining](#/subjects/coa/notes?h=instruction-pipelining) · [Pipeline hazards](#/subjects/coa/notes?h=pipeline-hazards) → [25 questions](#/subjects/coa/pyq?topic=pipe&years=pre2024) |
| **A** | Instruction Set & Addressing Modes | 17 marks · 8 papers | Both | [Instruction set architecture](#/subjects/coa/notes?h=instruction-set-architecture) · [Addressing modes](#/subjects/coa/notes?h=addressing-modes) → [14 questions](#/subjects/coa/pyq?topic=isa&years=pre2024) |
| **A** | I/O, Interrupts & DMA | 7 marks · 7 papers | Both | [I/O interface, interrupts and DMA](#/subjects/coa/notes?h=i-o-interface-interrupts-and-dma) → [11 questions](#/subjects/coa/pyq?topic=io&years=pre2024) |
| **B** | Disk access time (asked via OS now) | 6 marks · 3 papers | Solving | [Secondary storage](#/subjects/coa/notes?h=secondary-storage) → [8 questions](#/subjects/coa/pyq?topic=disk&years=pre2024) |
| **B** | CPU Performance (CPI, Amdahl) | 4 marks · 2 papers | Solving | [Instruction set architecture](#/subjects/coa/notes?h=instruction-set-architecture) → [1 question](#/subjects/coa/pyq?topic=perf&years=pre2024) |
| **B** | Memory interfacing (new 2027 wording) | 2 marks · 1 paper | Solving | [Memory interfacing](#/subjects/coa/notes?h=memory-interfacing) → [10 questions](#/subjects/coa/pyq?topic=mem&years=pre2024) |
| **B** | ALU and control-unit design (new 2027 wording) | 1 mark · 1 paper | Both | [ALU design and arithmetic](#/subjects/coa/notes?h=alu-design-and-arithmetic) · [Control unit design](#/subjects/coa/notes?h=control-unit-design) → [2 questions](#/subjects/coa/pyq?topic=datapath&years=pre2024) |

**A**: master it and solve all its 2007–2023 questions. **B**: learn the method, then solve its questions. **C**: read once and keep its recall cards; solve its questions only if time is left. Keep the 2024–2026 papers unseen: they are your full-length mocks.

**How to study it**

- Cache first (28 of 83 marks): address split, miss counting by simulation, average access time. Then pipelining (18), then instruction formats and addressing modes (17).
- Hardwired versus microprogrammed control and memory interfacing are newly named in 2027 and have little past data: learn the sizing methods once and solve 3–4 questions each.
- Disk-time numericals still gave 6 marks in 2024–26 through file and I/O questions: quick wins.
<!-- plan:end -->

```widget
type: weightage-topics
```

```widget
type: weightage-trend
```

## Syllabus (GATE 2027)

> Instruction set and addressing modes. Design of arithmetic and logic unit (ALU). Design of control unit – hardwired and microprogrammed. Memory interfacing and hierarchy: performance, cache memory mapping. I/O interface (interrupt and DMA). Instruction pipelining, pipeline hazards.

> [!IMPORTANT] Revised for 2027
> New explicit topics: ALU design, hardwired vs microprogrammed control, memory interfacing and hierarchy performance. Secondary storage (disk) is no longer listed. Past papers rarely asked control-unit design, so expect the examiners to test the new wording with fresh questions. See [what changed](#/syllabus?h=what-changed-from-gate-2026).

## Topic checklist

```widget
type: checklist
```

## How to prepare

1. **Cache memory** is the largest topic by far: address splitting, tag-directory size, hit/miss simulation, AMAT.
2. **Pipelining:** speed-up with latches and unequal stages, cycle counting with stalls, branch penalties, forwarding.
3. **Instruction set and addressing modes:** effective-address calculation, expanding opcodes, which mode suits which construct.
4. **New for 2027:** microinstruction formats and control-memory sizing; memory interfacing with chip arrays and decoders; carry-lookahead and Booth's multiplication.
5. **I/O:** interrupt overhead and DMA percentages.

## Question patterns to expect

| Pattern | What to practise | Notes |
|---|---|---|
| Tag / index / offset bits, tag memory size | Address split for direct, set-associative, fully associative | [Cache mapping](#/subjects/coa/notes?h=cache-memory-mapping) |
| Hits and misses for an access sequence | Simulate per set with LRU | [Cache mapping](#/subjects/coa/notes?h=cache-memory-mapping) |
| Average memory access time | Hierarchical vs simultaneous; multi-level | [Hierarchy](#/subjects/coa/notes?h=memory-hierarchy-performance) |
| Pipeline speed-up / cycles for a program | $(k+n-1)$ cycles plus stalls | [Pipelining](#/subjects/coa/notes?h=instruction-pipelining) |
| Stalls due to dependences or branches | RAW detection, forwarding paths, branch penalty | [Hazards](#/subjects/coa/notes?h=pipeline-hazards) |
| Control word width / control memory size | Horizontal vs vertical encoding | [Control unit](#/subjects/coa/notes?h=control-unit-design) |
| Number of chips, decoder size | Rows × columns of chips | [Interfacing](#/subjects/coa/notes?h=memory-interfacing) |

## Go deeper

- Standard texts: Hamacher et al., *Computer Organization*; Patterson & Hennessy, *Computer Organization and Design*.
- Pair this subject with [OS paging](#/subjects/os/notes?h=memory-management-and-paging): recent papers combine TLB, page tables and caches in one question.
- Drill the [previous-year questions](#/subjects/coa/pyq).
