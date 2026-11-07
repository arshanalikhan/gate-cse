# Computer Organization & Architecture: formulae

Revision sheet. Explanations and worked examples are in the [notes](#/subjects/coa/notes).

## Performance

| Quantity | Formula |
|---|---|
| CPU time | $\text{IC} \times \text{CPI} \times T_{clk} = \dfrac{\text{IC} \times \text{CPI}}{f}$ |
| Average CPI | $\sum_i \text{CPI}_i \times (\text{fraction of instructions of class } i)$ |
| MIPS | $\dfrac{f}{\text{CPI} \times 10^6}$ |
| Amdahl's law | $S = \dfrac{1}{(1-f) + f/s}$; limit $\dfrac{1}{1-f}$ as $s \to \infty$ |

## Instruction formats

| Quantity | Formula |
|---|---|
| Opcode bits for $N$ instructions | $\lceil \log_2 N \rceil$ |
| Register field for $R$ registers | $\lceil \log_2 R \rceil$ |
| Expanding opcode: leftover patterns | $2^{k} - (\text{used})$, each extends by the freed field: $\times 2^{\text{field}}$ |

## Arithmetic and ALU

| Quantity | Formula |
|---|---|
| Ripple-carry delay ($n$ bits) | $\approx n \cdot t_{carry}$ |
| CLA carries | $C_{i+1} = G_i + P_i C_i$, $G_i = A_iB_i$, $P_i = A_i \oplus B_i$ |
| Overflow | $V = C_n \oplus C_{n-1}$ |
| Booth: add/sub operations | number of $01$/$10$ transitions in multiplier (with $Q_{-1}=0$) |

## Control unit

| Quantity | Formula |
|---|---|
| Horizontal control field | one bit per control signal |
| Vertical field with $k$ exclusive signals | $\lceil \log_2(k+1) \rceil$ bits (with a "none" code) |
| Next-address field | $\log_2(\text{control-memory words})$ |
| Condition-select field | $\lceil \log_2(\#\text{conditions}) \rceil$ |
| Control-memory size | words $\times$ (control + condition + next-address bits) |

## Memory interfacing

| Quantity | Formula |
|---|---|
| Chips for $W \times b$ from $w \times c$ | $\dfrac{W}{w} \times \dfrac{b}{c}$ |
| Chip-select decoder inputs | $\log_2 (W / w)$ |
| Address bits | $\log_2 W$ (word-addressable) |

## Cache

| Quantity | Formula |
|---|---|
| Lines | $\dfrac{\text{cache size}}{\text{block size}}$ |
| Sets ($k$-way) | $\dfrac{\text{lines}}{k}$ |
| Offset bits | $\log_2(\text{block size})$ |
| Index bits | $\log_2(\text{lines})$ direct; $\log_2(\text{sets})$ set-associative; 0 fully associative |
| Tag bits | address bits − index − offset |
| Tag directory | lines × (tag + valid + dirty + replacement bits) |
| Block → line / set | $\text{block no.} \bmod \text{lines}$ / $\bmod\ \text{sets}$ |
| AMAT | $t_{hit} + \text{miss rate} \times \text{miss penalty}$ |
| Hierarchical access | $t_c + (1-h)\,t_m$ |
| Simultaneous access | $h\,t_c + (1-h)\,t_m$ |
| Two-level (hierarchical) | $t_1 + (1-h_1)\,[\,t_2 + (1-h_2)\,t_m\,]$ |
| Miss penalty (block of $B$ words, one word per access) | $B \times t_m$ |
| Misses for one in-order scan of $N$ bytes (block $b$ bytes, cold cache) | $N / b$ |
| CPI with cache misses | $\text{CPI}_{base} + (\text{memory refs per instruction}) \times \text{miss rate} \times \text{miss penalty}$ |

## Pipelining

| Quantity | Formula |
|---|---|
| Cycle time | max stage delay + latch delay |
| Time for $n$ instructions, $k$ stages | $(k + n - 1)\, t_p$ |
| Speed-up | $\dfrac{n\, t_n}{(k+n-1)\, t_p}$, limit $\dfrac{t_n}{t_p}$ |
| Efficiency | $\dfrac{\text{speed-up}}{k}$ |
| Throughput | $\dfrac{n}{(k+n-1)\,t_p}$ |
| CPI with stalls | $1 + \text{stall cycles per instruction}$ |
| Branch penalty (resolved in stage $s$) | $s - 1$ cycles |
| CPI with branches | $1 + (\text{branch fraction}) \times (\text{fraction that stall}) \times \text{penalty}$ |

Load-use with forwarding in the 5-stage pipeline: 1 stall. RAW causes stalls; WAR and WAW need out-of-order execution to matter.

## I/O and DMA

| Quantity | Formula |
|---|---|
| CPU fraction for interrupts | interrupt rate × service time |
| Polling overhead | polling rate × cycles per poll / clock rate |
| DMA, burst mode, CPU blocked | $\dfrac{Y}{X + Y}$ ($X$ = prepare time, $Y$ = transfer time) |
| DMA, cycle stealing, CPU blocked | $\dfrac{Y}{X}$ (usual textbook convention) |
| Transfer time | $\dfrac{\text{block size}}{\text{bandwidth}}$ |

## Disk (now mainly via OS)

| Quantity | Formula |
|---|---|
| Access time | seek + rotational latency + transfer |
| Average rotational latency | $\tfrac12 \times \dfrac{60}{\text{RPM}}$ s |
| Capacity | surfaces × tracks × sectors × bytes/sector |
