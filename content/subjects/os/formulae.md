# Operating System: formulae

One-page revision sheet. Symbols are defined in each table; derivations are in the [notes](#/subjects/os/notes).

## Scheduling

| Quantity | Formula |
|---|---|
| Turnaround time | $TAT = CT - AT$ |
| Waiting time | $WT = TAT - BT$ |
| Response time | $RT = \text{first run} - AT$ |
| Throughput | $\dfrac{\text{processes completed}}{\text{time}}$ |
| CPU utilisation with switch overhead $s$ | $\dfrac{\sum BT}{\sum BT + (\#\text{switches}) \cdot s}$ |
| Burst prediction | $\tau_{n+1} = \alpha t_n + (1-\alpha)\tau_n$ |
| RR: max wait before first run ($n$ processes, quantum $q$) | $(n-1)\,q$ (plus switch overheads) |

Optimal average waiting time: SJF among non-preemptive, SRTF overall.

## Synchronisation and deadlock

| Quantity | Formula |
|---|---|
| Semaphore final value | $S_0 - \#P + \#V$ |
| Deadlock-free if (one resource type, max need $m_i$) | $R \ge \sum_i (m_i - 1) + 1$ |
| Identical needs $m$, $n$ processes | $R \ge n(m-1) + 1$ |
| Max processes for $R$ instances, need $m$ each | $\left\lfloor \dfrac{R-1}{m-1} \right\rfloor$ |
| Banker's need matrix | $\text{Need} = \text{Max} - \text{Allocation}$ |

## Paging

| Quantity | Formula |
|---|---|
| Offset bits | $\log_2 (\text{page size})$ |
| Pages | $2^{\text{VA bits}} / \text{page size}$ |
| Frames | $\text{PA space} / \text{page size}$ |
| Page-table size | $\#\text{pages} \times \text{PTE size}$ |
| Entries per page-table page | $\text{page size} / \text{PTE size}$ |
| Levels needed | $\left\lceil \dfrac{\text{page-number bits}}{\log_2(\text{entries per page})} \right\rceil$ |
| Average internal fragmentation | $\tfrac12$ page per process |
| Optimal page size (overhead $e$ per PTE, avg process size $s$) | $p = \sqrt{2se}$ |

## Access times

| Situation | Effective access time |
|---|---|
| TLB hit $h$, TLB $t$, memory $m$, 1-level table | $h(t+m) + (1-h)(t+2m)$ |
| $k$-level page table | $h(t+m) + (1-h)(t+(k+1)m)$ |
| $k$-level page table, no TLB | $(k+1)\,m$ per reference |
| Page-fault rate $p$, service time $s$ | $(1-p)\,m + p\,s$ |
| Dirty-victim fraction $d$ | service time $= s_{\text{read}} + d \cdot s_{\text{write}}$ |

## Page replacement facts

- FIFO can show **Belady's anomaly**; LRU and OPT (stack algorithms) cannot.
- OPT gives the minimum number of faults; first reference to each page is a compulsory fault.
- Thrashing when $\sum_i |\text{working set}_i| > \text{frames}$.

## File systems

| Quantity | Formula |
|---|---|
| Pointers per index block | $k = B / p$ ($B$ = block size, $p$ = pointer size) |
| Max file size (inode: $d$ direct + single + double + triple) | $(d + k + k^2 + k^3) \times B$ |
| Bit-vector size | $\#\text{blocks}$ bits |
| Disk blocks addressable with $p$-byte pointers | $2^{8p}$ |

## Disk

| Quantity | Formula |
|---|---|
| Access time | seek + rotational latency + transfer |
| Average rotational latency | $\tfrac12 \times \dfrac{60}{\text{RPM}}$ s |
| Transfer time for $b$ bytes | $\dfrac{b}{\text{bytes per track}} \times \text{rotation time}$ |
| Capacity | surfaces × tracks/surface × sectors/track × bytes/sector |

## fork()

| Code | Processes |
|---|---|
| $n$ sequential `fork()` | $2^n$ total, $2^n - 1$ children |
| `fork()` returns | 0 in child, child PID in parent, −1 on failure |
