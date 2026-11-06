# Computer Organization & Architecture: notes

Exam-focused notes for GATE 2027 Section 3. The 2027 syllabus names ALU design, hardwired vs microprogrammed control and memory interfacing explicitly, and no longer lists secondary storage; the sections below follow that order of importance.

## Instruction set architecture

An **instruction** = opcode + operand fields (addresses, registers, immediates).

| Format | Example | Note |
|---|---|---|
| 3-address | `ADD R1, R2, R3` | Short programs, long instructions |
| 2-address | `ADD R1, R2` (R1 ← R1 + R2) | Most common in CISC |
| 1-address | `ADD X` (AC ← AC + M[X]) | Accumulator machines |
| 0-address | `ADD` | Stack machines (operands on the stack) |

**RISC vs CISC:** RISC has fixed-length instructions, load/store architecture, many registers, simple addressing modes and is easy to pipeline; CISC has variable-length instructions, memory operands and complex modes.

### Expanding opcodes

With an $n$-bit instruction, a field of $k$ bits gives $2^k$ patterns. If some patterns are used as complete opcodes, the unused ones can be extended with more bits.

> [!EXAMPLE] How many one-address instructions?
> 16-bit instructions, 6-bit address fields. There are 15 two-address instructions (opcode = $16 - 12 = 4$ bits → 16 patterns, 15 used). One pattern is left; it extends into the next 6 bits, giving $1 \times 2^6 = 64$ one-address instructions.

### CPU performance

$$\text{CPU time} = \text{IC} \times \text{CPI} \times T_{clk} = \frac{\text{IC} \times \text{CPI}}{f}$$

$$\text{MIPS} = \frac{f}{\text{CPI} \times 10^6}, \qquad \text{CPI}_{avg} = \sum_i \text{CPI}_i \cdot \frac{\text{IC}_i}{\text{IC}}$$

**Amdahl's law:** if a fraction $f$ of execution time is sped up by $s$,

$$\text{Speed-up} = \frac{1}{(1-f) + \dfrac{f}{s}}$$

> [!RECALL] 40% of a program's time is sped up 4×. What is the overall speed-up?
> $\dfrac{1}{0.6 + 0.4/4} = \dfrac{1}{0.7} \approx 1.43$.

## Addressing modes

| Mode | Effective address / operand | Memory references to get operand |
|---|---|---|
| Immediate | operand is in the instruction | 0 |
| Register | operand in register R | 0 |
| Direct (absolute) | EA = A | 1 |
| Indirect | EA = M[A] | 2 |
| Register indirect | EA = R | 1 |
| Indexed | EA = A + R(index) | 1 |
| Base register | EA = R(base) + offset | 1 |
| PC-relative | EA = PC + offset (PC already points to the next instruction) | 1 |
| Auto-increment / decrement | EA = R, then R ± size (or decrement first) | 1 |

Typical uses: arrays → indexed; pointers → register indirect; position-independent code and branches → PC-relative; stacks → auto-increment/decrement; constants → immediate; relocation → base register.

> [!TRAP] PC-relative offsets
> The offset is added to the address of the *next* instruction (PC has already been incremented), unless the question states otherwise. For a 2-word instruction at address 1000 with 2-byte words, the PC is 1004 when the offset is added.

> [!RECALL] Which addressing mode suits array elements, and which suits position-independent branches?
> Indexed for arrays; PC-relative for branches.

> [!RECALL] How many memory accesses does an indirect-mode operand need, excluding the instruction fetch?
> Two: one to read the pointer, one to read the operand.

## ALU design and arithmetic

**Ripple-carry adder:** each full adder waits for the previous carry. For $n$ bits with carry delay $t_c$, delay $\approx n\,t_c$ (plus the last sum).

**Carry-lookahead adder (CLA):** generate $G_i = A_iB_i$, propagate $P_i = A_i \oplus B_i$:

$$C_{i+1} = G_i + P_i C_i, \qquad S_i = P_i \oplus C_i$$

Every carry is a two-level sum-of-products of $G$, $P$ and $C_0$, so delay is constant in $n$ (fan-in permitting): one gate level for $G, P$, two for the carries, one for the sum.

**Overflow (two's complement addition):** $V = C_{n} \oplus C_{n-1}$ (carry into vs out of the sign bit); equivalently, adding two numbers of the same sign gives a result of the other sign.

**Booth's multiplication** recodes the multiplier by looking at bit pairs $(Q_0, Q_{-1})$: 10 → subtract multiplicand, 01 → add multiplicand, 00/11 → nothing; then arithmetic shift right. Additions + subtractions = number of 0↔1 transitions in the multiplier read with an extra 0 appended on the right. Worst case: alternating bits 0101….

**ALU control:** function-select lines choose the operation; status flags (Z, N, C, V) feed the control unit for conditional branches.

> [!RECALL] How is two's-complement overflow detected from the carries?
> $V = C_n \oplus C_{n-1}$: the carry into the sign bit differs from the carry out of it.

## Control unit design

The control unit issues the control signals for each step (micro-operation) of the fetch–decode–execute cycle, e.g. fetch: `MAR ← PC`; `MDR ← M[MAR], PC ← PC + 1`; `IR ← MDR`.

| | Hardwired | Microprogrammed |
|---|---|---|
| Implementation | Combinational logic + sequence counter / state machine | Control words stored in a control memory |
| Speed | Faster | Slower (control-memory fetch each step) |
| Flexibility | Hard to change | Change by rewriting the microprogram |
| Typical use | RISC | CISC |

### Microinstruction formats

- **Horizontal:** one bit per control signal. Wide words, maximum parallelism, no decoding.
- **Vertical:** signals grouped into fields of mutually exclusive signals, each field encoded. A field with $k$ signals needs $\lceil \log_2 (k+1) \rceil$ bits if "no signal" must be representable, otherwise $\lceil \log_2 k \rceil$. Narrow words, decoding delay.

**Control word** = control field + condition-select field + next-address field.

$$\text{next-address bits} = \log_2(\text{control-memory words}), \qquad \text{condition bits} = \lceil \log_2(\#\text{conditions}) \rceil$$

> [!EXAMPLE] Control-memory sizing
> 48 control signals, 16 status conditions to test, 512 microinstructions in a horizontal format: control field 48 bits, condition select $\lceil \log_2 16 \rceil = 4$ bits, next address $\log_2 512 = 9$ bits. Word = 61 bits; control memory = $512 \times 61$ bits.

> [!RECALL] Horizontal vs vertical microcode: which is wider, and which needs decoders?
> Horizontal is wider (one bit per control signal); vertical encodes groups of signals and needs decoders.

> [!RECALL] Which control unit is faster, and which is easier to modify?
> Hardwired is faster; microprogrammed is easier to modify.

## Memory interfacing

Building a memory of $W$ words × $b$ bits from chips of $w$ words × $c$ bits:

$$\#\text{chips} = \frac{W}{w} \times \frac{b}{c}$$

- Chips in a **row** share address lines and supply different bit-slices of the word ($b/c$ chips per row).
- **Rows** are selected by a decoder driven by the high-order address bits: $\log_2 (W/w)$ bits.
- Each chip takes $\log_2 w$ address bits; total address bits $= \log_2 W$.

> [!EXAMPLE] 
> A 64K × 16 memory from 16K × 8 chips: $\frac{64K}{16K} \times \frac{16}{8} = 4 \times 2 = 8$ chips; a 2-to-4 decoder on the top 2 of the 16 address bits selects the row; the low 14 bits go to every chip.

**Interleaving:** with $k$ modules, low-order interleaving puts consecutive words in consecutive modules, so a block of $k$ words can be fetched in about one access time; high-order interleaving puts consecutive words in the same module.

> [!RECALL] How many 32K × 8 chips build a 256K × 32 memory, and what selects the rows?
> $\frac{256}{32} \times \frac{32}{8} = 8 \times 4 = 32$ chips; a 3-to-8 decoder selects one of the 8 rows.

## Memory hierarchy performance

Registers → cache → main memory → (disk). Works because of **temporal** and **spatial locality**.

**Average memory access time:**

$$\text{AMAT} = t_{hit} + m \times t_{miss\ penalty}$$

Two common models for a cache (access time $t_c$, hit ratio $h$) in front of memory ($t_m$):

| Model | Average access time |
|---|---|
| Hierarchical (look in cache first, then memory) | $T = h\,t_c + (1-h)(t_c + t_m) = t_c + (1-h)\,t_m$ |
| Simultaneous (search both in parallel) | $T = h\,t_c + (1-h)\,t_m$ |

On a miss the whole block is brought in: if memory transfers one word per access and a block has $B$ words, miss penalty $\approx B \times t_m$ (or $t_m$ + $(B-1) \times$ burst time if the question says so).

Two-level cache (L1 hit $h_1$, L2 local hit $h_2$), hierarchical:

$$T = t_1 + (1-h_1)\bigl[t_2 + (1-h_2)\,t_m\bigr]$$

> [!TRAP] Which model?
> Read whether the question says "on a miss the word is first brought to the cache" (hierarchical) or "accessed simultaneously". Also check whether the hit ratio for L2 is local (of L1 misses) or global.

> [!RECALL] Cache 10 ns, memory 100 ns, hit ratio 0.9, hierarchical access. Average access time?
> $10 + 0.1 \times 100 = 20$ ns.

## Cache memory mapping

Physical address split (byte-addressable, block size $B$ bytes, $L$ lines, $k$-way):

| Mapping | Address fields |
|---|---|
| Direct | Tag \| Line index ($\log_2 L$) \| Block offset ($\log_2 B$) |
| $k$-way set associative | Tag \| Set index ($\log_2 \frac{L}{k}$) \| Block offset |
| Fully associative | Tag \| Block offset |

$$\text{tag bits} = \text{address bits} - \text{index bits} - \text{offset bits}$$

**Tag directory size** $= L \times (\text{tag} + \text{valid} + \text{dirty (write-back)} + \text{replacement bits})$.

> [!EXAMPLE] 4-way set associative
> 32-bit addresses, 64 KB cache, 64-byte blocks, 4-way. Lines $= 2^{16}/2^6 = 1024$; sets $= 256$ → 8 index bits; offset 6 bits; tag $= 32 - 8 - 6 = 18$ bits.

**Mapping a block:** direct: line $= (\text{block no.}) \bmod L$; set associative: set $= (\text{block no.}) \bmod (L/k)$.

**Replacement:** LRU (needs $\log_2 k!$ bits per set in theory; usually $\log_2 k$ bits per line as counters), FIFO, random. Direct mapping needs no replacement policy.

**Write policies:**

| Policy | On a write hit | Usually paired with |
|---|---|---|
| Write-through | Update cache and memory | No-write-allocate |
| Write-back | Update cache only; set dirty bit; write block back on eviction | Write-allocate |

**Miss types (3 Cs):** compulsory (first access), capacity (cache too small), conflict (too many blocks map to one set; zero in fully associative).

> [!PYQ] Typical questions
> Tag/index/offset bit counts; number of misses for an access sequence (simulate per set); AMAT with given miss penalty; hit ratio for a loop over an array (spatial locality: one miss per block).

> [!RECALL] 16 KB direct-mapped cache, 32-byte blocks, 32-bit addresses: tag, index and offset bits?
> 512 lines: index 9, offset 5, tag 18.

> [!RECALL] Which kind of miss never occurs in a fully associative cache?
> Conflict misses.

## Instruction pipelining

A $k$-stage pipeline with cycle time $t_p$ (= slowest stage + latch delay) executing $n$ instructions:

$$T_{pipe} = (k + n - 1)\,t_p$$

$$\text{Speed-up} = \frac{n \cdot t_{n}}{(k + n - 1)\,t_p} \xrightarrow{\; n \to \infty \;} \frac{t_n}{t_p}$$

where $t_n$ is the time per instruction without pipelining (sum of stage delays, without latches). For equal stages and no latch delay the limit is $k$.

$$\text{Efficiency} = \frac{\text{Speed-up}}{k}, \qquad \text{Throughput} = \frac{n}{(k+n-1)\,t_p}$$

With stalls, average CPI $= 1 + \text{stall cycles per instruction}$ and

$$\text{Speed-up} = \frac{\text{CPI}_{unpipelined} \times T_{unpipelined\ clock}}{\text{CPI}_{pipelined} \times T_{pipelined\ clock}}$$

> [!RECALL] A 5-stage pipeline runs 100 instructions with no stalls. How many cycles?
> $5 + 100 - 1 = 104$.

## Pipeline hazards

| Hazard | Cause | Remedies |
|---|---|---|
| Structural | Two instructions need the same hardware in one cycle (e.g. one memory port) | Duplicate resources, separate I- and D-caches, stall |
| Data | An instruction needs a result not yet written | Forwarding (bypassing), stalls, compiler scheduling |
| Control | The next instruction is unknown until a branch resolves | Stall, predict, delayed branch, resolve branches earlier |

**Data dependences** (instruction $i$ before $j$):

- **RAW** (true dependence): $j$ reads what $i$ writes. The only one that causes stalls in a simple in-order pipeline.
- **WAR** (anti-dependence): $j$ writes what $i$ reads.
- **WAW** (output dependence): both write the same register.

WAR and WAW matter with out-of-order execution and are removed by register renaming.

**Forwarding:** results are passed from the EX/MEM or MEM/WB latch straight to the ALU input. A **load followed by a dependent instruction** still needs one stall in the classic 5-stage pipeline (the value is available only after MEM).

**Branch penalty:** if a branch is resolved in stage $s$, the penalty is $s - 1$ cycles when the pipeline flushes. With branch frequency $b$ and penalty $p$:

$$\text{CPI} = 1 + b \cdot p \quad (\text{if all branches stall}), \qquad \text{CPI} = 1 + b \cdot q \cdot p \quad (\text{only a fraction } q \text{ mispredicted / taken})$$

> [!EXAMPLE] Counting cycles with dependences
> 5-stage pipeline (IF ID EX MEM WB), full forwarding. `LW R1, 0(R2)` then `ADD R3, R1, R4`: the ADD needs R1 at the start of its EX, but the load has it only at the end of MEM → 1 stall. Without forwarding (write in the first half of WB, read in the second half of ID) the ADD stalls 2 cycles.

> [!RECALL] Which data hazard stalls a simple in-order pipeline?
> RAW (true dependence). WAR and WAW matter only with out-of-order execution.

> [!RECALL] With full forwarding, how many stalls follow a load whose result the next instruction uses (classic 5-stage pipeline)?
> One.

## I/O interface, interrupts and DMA

| Technique | CPU involvement |
|---|---|
| Programmed I/O | CPU busy-waits (polls) the device status |
| Interrupt-driven I/O | Device interrupts when ready; CPU moves each word |
| DMA | DMA controller moves a whole block; CPU interrupted once per block |

**Interrupt handling:** finish current instruction → save PC and status → identify the source (polling, **vectored** interrupt, or **daisy chain** where priority is position on the chain) → run the ISR → restore and return.

**DMA modes:**

- **Burst (block) mode:** DMA holds the bus for the entire block; CPU cannot use the bus meanwhile.
- **Cycle stealing:** DMA takes the bus for one word at a time, interleaved with CPU cycles.
- **Transparent:** DMA uses the bus only when the CPU does not need it.

If the device needs time $X$ to prepare data and the bus transfer takes $Y$, the fraction of time the CPU is blocked is $\frac{Y}{X+Y}$ in burst mode; with cycle stealing (one word per stolen cycle) it is commonly computed as $\frac{Y}{X}$. Follow the definitions the question gives.

> [!EXAMPLE] Interrupt overhead
> A device raises 2,000 interrupts per second and each service routine takes 50 µs. Fraction of CPU time spent: $2000 \times 50 \times 10^{-6} = 0.1$, i.e. 10%.

> [!RECALL] In which DMA mode does the controller hold the bus for a whole block?
> Burst (block) mode.

## Secondary storage

The 2027 syllabus no longer names secondary storage under COA, but disk timing still appears through OS file-system and I/O questions:

$$\text{access time} = \text{seek} + \tfrac12 \text{ rotation} + \text{transfer}, \qquad \text{capacity} = \text{surfaces} \times \text{tracks} \times \text{sectors} \times \text{bytes per sector}$$

See [OS: disk and I/O scheduling](#/subjects/os/notes?h=disk-and-i-o-scheduling).
