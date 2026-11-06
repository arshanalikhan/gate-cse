# Computer Organization & Architecture

Instruction sets and addressing, ALU and control-unit design, memory interfacing, the memory hierarchy and cache mapping, I/O with interrupts and DMA, and pipelining. Typically 5–10 marks per paper, mostly numerical.

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
