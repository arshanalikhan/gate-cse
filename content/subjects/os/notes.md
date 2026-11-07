# Operating System: notes

Exam-focused notes for GATE 2027 Section 8. Each topic ends with the question patterns GATE uses. Use **Mark studied** to track your progress.

## Processes and system calls

**Priority B** · last 10 papers: 11 marks, asked in 6 (System Calls & fork() 6, Processes & Threads 5) · learn by solving + recall cards · practise: [System Calls & fork(): 5 questions from 2007–2023 →](#/subjects/os/pyq?topic=fork&years=pre2024) · [Processes & Threads: 7 questions from 2007–2023 →](#/subjects/os/pyq?topic=proc&years=pre2024)

A **process** is a program in execution: code, data, heap, stack, plus its **process control block (PCB)** (state, program counter, registers, scheduling info, memory-management info, open files).

**States:** new → ready → running → (waiting ↔ ready) → terminated. *Running → waiting* (I/O or event wait) and *running → terminated* (exit) are caused by the process itself; *running → ready* comes from a timer interrupt or preemption.

**Schedulers:** long-term (admits jobs, controls degree of multiprogramming), short-term (CPU scheduler, runs very often), medium-term (swaps processes out/in).

**Context switch:** saving the PCB of one process and loading another. It is pure overhead; it involves the kernel, so it needs a mode switch.

**System calls** are the interface from user mode to kernel mode, entered through a trap (software interrupt). Typical calls: `fork`, `exec`, `wait`, `exit`, `open`, `read`, `write`. A mode switch (user ↔ kernel) is cheaper than a context switch (process ↔ process).

### fork()

`fork()` creates a child that is a copy of the parent. It returns **0 in the child** and the **child's PID (> 0) in the parent**, or −1 on failure.

- $n$ sequential `fork()` calls → $2^n$ processes in total, $2^n - 1$ of them new children.
- Each process has its own copy of variables after the fork; changes in one are not seen by the other.

```c
int main() {
    for (int i = 0; i < 3; i++)
        fork();
    printf("hi\n");   // printed 2^3 = 8 times
}
```

> [!TRAP] Counting with conditions
> With `if (fork() && fork()) fork();` evaluate short-circuiting per process: the child of the first `fork()` gets 0 and skips the rest. Draw the process tree; don't apply $2^n$ blindly.

### Inter-process communication

| Mechanism | Notes |
|---|---|
| Shared memory | Fastest after setup; needs explicit synchronisation |
| Message passing | Kernel-mediated `send`/`receive`; blocking or non-blocking |
| Pipes | Unidirectional byte stream between related processes |

> [!RECALL] What does `fork()` return in the parent and in the child?
> - [ ] The parent's PID in the child, 0 in the parent
> - [ ] 0 in the parent, the child's PID in the child
> - [x] The child's PID in the parent, 0 in the child
> - [ ] 1 in both
>
> The child's PID (> 0) in the parent, 0 in the child, and −1 if the call fails.

> [!RECALL] How many processes exist after $n$ sequential `fork()` calls?
> - [ ] $2^n - 1$
> - [x] $2^n$
> - [ ] $2n$
> - [ ] $n + 1$
>
> $2^n$ in total, of which $2^n - 1$ were created by the forks.

## Threads

**Priority B** · last 10 papers: 5 marks, asked in 4 (for Processes & Threads as a whole) · learn by recall cards · practise: [7 questions from 2007–2023 →](#/subjects/os/pyq?topic=proc&years=pre2024)

A **thread** is a unit of CPU scheduling inside a process. Threads of a process **share** code, data (globals), heap and open files; each has its **own** stack, registers and program counter.

| | User-level threads | Kernel-level threads |
|---|---|---|
| Managed by | Thread library in user space | Kernel |
| Switch cost | Low (no kernel involvement) | Higher |
| Blocking system call | Blocks the whole process (many-to-one) | Blocks only that thread |
| Multicore parallelism | No (many-to-one) | Yes |

Mapping models: many-to-one, one-to-one (Linux, Windows), many-to-many.

> [!PYQ] Typical questions
> Which resources are shared among threads (stack is **not**); which of a set of operations needs a kernel trap; why a blocking call in a user-level thread blocks the process.

> [!RECALL] Which of these do threads of one process **not** share: heap, global variables, stack, open files?
> - [ ] Open files
> - [x] The stack
> - [ ] Global variables
> - [ ] The heap
>
> The stack (each thread also has its own registers and program counter).

## CPU scheduling

**Priority A** · last 10 papers: 13 marks, asked in 9 · learn by solving · practise: [19 questions from 2007–2023 →](#/subjects/os/pyq?topic=sched&years=pre2024)

Definitions for each process:

- **Turnaround time** $= \text{completion} - \text{arrival}$
- **Waiting time** $= \text{turnaround} - \text{burst}$
- **Response time** $= \text{first time on CPU} - \text{arrival}$

| Algorithm | Preemptive? | Key property |
|---|---|---|
| FCFS | No | Simple; convoy effect (short jobs stuck behind a long one) |
| SJF | No | Minimum average waiting time among non-preemptive schedules |
| SRTF (preemptive SJF) | Yes | Minimum average waiting time overall; needs burst prediction; starvation possible |
| Round Robin (quantum $q$) | Yes | Good response time; $q \to \infty$ gives FCFS, tiny $q$ means heavy context-switch overhead |
| Priority | Either | Starvation of low priority; fixed by **ageing** |
| Multilevel (feedback) queue | Yes | Separate queues; feedback version moves processes between queues |

**Exponential averaging** for predicting the next CPU burst:

$$\tau_{n+1} = \alpha\, t_n + (1 - \alpha)\, \tau_n, \qquad 0 \le \alpha \le 1$$

> [!EXAMPLE] SRTF in one table
> P1 (arrival 0, burst 8), P2 (1, 4), P3 (2, 9), P4 (3, 5).
> Gantt: P1 0–1, P2 1–5, P4 5–10, P1 10–17, P3 17–26.
> Waiting times: P1 = 17−0−8 = 9, P2 = 5−1−4 = 0, P3 = 26−2−9 = 15, P4 = 10−3−5 = 2. Average = 26/4 = 6.5.

> [!TRAP] Read the tie-break and the overhead
> Questions state how ties are broken (lower PID first) and whether context-switch time counts. With overhead $s$ per switch and $n$ switches, CPU utilisation is $\frac{\text{useful time}}{\text{useful time} + n s}$.

> [!RECALL] Which algorithm gives the minimum average waiting time, and what is its drawback?
> - [ ] Round Robin; high context-switch overhead
> - [ ] FCFS; the convoy effect
> - [ ] Priority scheduling; it needs aging
> - [x] SRTF; it needs burst lengths in advance and can starve long jobs
>
> SRTF (SJF among non-preemptive algorithms). It needs burst lengths in advance and can starve long jobs.

> [!RECALL] What does Round Robin turn into when the time quantum is very large?
> - [ ] Priority scheduling
> - [x] FCFS
> - [ ] SJF
> - [ ] SRTF
>
> FCFS.

## Process synchronisation

**Priority A** · last 10 papers: 13 marks, asked in 7 · learn by solving · practise: [22 questions from 2007–2023 →](#/subjects/os/pyq?topic=sync&years=pre2024)

A **race condition** occurs when the result depends on the interleaving of operations on shared data. A **critical section (CS)** solution must give:

1. **Mutual exclusion:** at most one process in the CS.
2. **Progress:** if no one is in the CS, the choice of who enters next cannot be postponed indefinitely, and only processes wanting to enter take part in it.
3. **Bounded waiting:** a bound exists on how many times others can enter before a waiting process gets in.

(No assumption about speeds or number of CPUs.)

### Peterson's solution (two processes)

```c
// shared: bool flag[2] = {false, false}; int turn;
// process i (j = 1 - i)
flag[i] = true;
turn = j;
while (flag[j] && turn == j)
    ;            // busy wait
/* critical section */
flag[i] = false;
```

Satisfies all three requirements. Swapping the order of `flag[i] = true` and `turn = j` breaks mutual exclusion.

### Hardware support

- **Test-and-set** and **compare-and-swap** are atomic. A simple TSL spin lock gives mutual exclusion and progress but **not** bounded waiting.
- Disabling interrupts works only on a uniprocessor and is unsafe in user mode.

### Semaphores

An integer $S$ accessed only through atomic `wait` (P) and `signal` (V):

```c
wait(S):   S = S - 1;  if (S < 0) block this process;
signal(S): S = S + 1;  if (S <= 0) wake one blocked process;
```

With this blocking implementation, a negative value $-k$ means $k$ processes are waiting.

- **Binary semaphore / mutex:** values 0, 1; used for mutual exclusion.
- **Counting semaphore:** initialised to the number of available resources.
- Final value after a sequence: $S_{final} = S_0 - (\#P) + (\#V)$, if no process blocks indefinitely.

### Classic problems

**Bounded buffer (producer–consumer):** `mutex = 1`, `empty = N`, `full = 0`.

```c
// producer                // consumer
wait(empty);               wait(full);
wait(mutex);               wait(mutex);
  insert item;               remove item;
signal(mutex);             signal(mutex);
signal(full);              signal(empty);
```

Swapping `wait(empty)` and `wait(mutex)` in the producer can deadlock (producer holds `mutex` while waiting for a slot that only the blocked consumer could free).

**Readers–writers:** many readers may read together; a writer needs exclusive access. The first-readers solution can starve writers.

**Dining philosophers:** each philosopher grabbing left then right fork can deadlock. Fixes: at most $n-1$ philosophers at the table, pick up both forks atomically, or one philosopher picks right first (break circular wait).

### Checking a synchronisation question

Test each property on its own, by trying to break it with one schedule:

1. **Mutual exclusion:** find an interleaving that puts both processes in the critical section. Look for a check-then-set that is not atomic.
2. **Progress:** with only one process trying to enter, can it be kept out? Strict alternation on a shared `turn` fails here.
3. **Bounded waiting:** can one process re-enter again and again while the other waits?
4. **Deadlock:** can both wait for each other forever, for example both set their flag and both spin?

One counter-schedule disproves a property. To prove one, argue from the variable that breaks the tie (`turn` in Peterson's solution).

> [!EXAMPLE] Smallest and largest final value of a shared counter
> `x = 0`; P1 and P2 each run `for (i = 0; i < 5; i++) x = x + 1;`, and each increment is load, add, store. **Largest:** 10, with no overlap. **Smallest:** 2. P1 loads 0 and stalls; P2 runs four iterations (x = 4); P1 stores 1; P2 loads 1 and stalls; P1 runs its other four iterations; P2 stores 2. It cannot be 1: every store writes at least 1, and the last store comes from a process's last iteration, whose load follows that process's own earlier store, so it reads at least 1.

> [!PYQ] Typical questions
> Which of these code snippets guarantees mutual exclusion / progress / deadlock freedom; the minimum or maximum final value of a shared variable when two processes run `x = x + 1` with no lock (load, add, store interleavings); counting semaphore final values.

> [!RECALL] Name the three requirements of a critical-section solution.
> - [ ] Mutual exclusion, no preemption, circular wait
> - [ ] Mutual exclusion, hold and wait, bounded waiting
> - [ ] Progress, fairness, deadlock freedom
> - [x] Mutual exclusion, progress, bounded waiting
>
> Mutual exclusion, progress, bounded waiting.

> [!RECALL] Which requirement does a plain test-and-set spin lock fail?
> - [ ] Progress
> - [x] Bounded waiting
> - [ ] Mutual exclusion
> - [ ] None of them
>
> Bounded waiting: a process can lose the race for the lock indefinitely.

## Deadlock

**Priority B** · last 10 papers: 7 marks, asked in 4 · learn by solving · practise: [14 questions from 2007–2023 →](#/subjects/os/pyq?topic=deadlock&years=pre2024)

**Necessary conditions** (all four must hold): mutual exclusion, hold and wait, no preemption, circular wait.

**Resource-allocation graph:** a cycle is necessary for deadlock; with one instance per resource type it is also sufficient.

**Handling:**

| Strategy | Idea |
|---|---|
| Prevention | Break one of the four conditions (e.g. order all resources, request in increasing order → no circular wait) |
| Avoidance | Grant a request only if the state stays **safe** (Banker's algorithm) |
| Detection + recovery | Let deadlocks happen, detect cycles / run detection algorithm, then kill or preempt |
| Ignore | "Ostrich" approach (most general-purpose OSes) |

### Banker's algorithm

$$\text{Need} = \text{Max} - \text{Allocation}$$

Safety check: start with `Work = Available`. Repeatedly find a process with `Need ≤ Work`, pretend it finishes (`Work += Allocation`), and mark it done. The state is safe if all processes finish. An unsafe state is not necessarily deadlocked; it only *may* lead to deadlock.

### Minimum resources to avoid deadlock

$n$ processes, process $i$ needs at most $m_i$ instances of one resource type. Deadlock is impossible if

$$R \ge \sum_{i=1}^{n} (m_i - 1) + 1$$

For identical needs $m$: $R \ge n(m-1) + 1$. Conversely, the maximum number of processes that can deadlock-free share $R$ instances when each needs $m$ is $\left\lfloor \frac{R-1}{m-1} \right\rfloor$.

> [!RECALL] Minimum instances of a resource so that 3 processes, each needing up to 4, can never deadlock?
> - [ ] 4
> - [x] 10
> - [ ] 9
> - [ ] 12
>
> $3 \times (4 - 1) + 1 = 10$.

> [!RECALL] Does an unsafe state mean the system is deadlocked?
> - [ ] No; an unsafe state can never deadlock
> - [ ] Yes, always
> - [ ] Yes, if any process is waiting
> - [x] No; deadlock is possible but not certain
>
> No. Deadlock is possible from an unsafe state; a safe state guarantees it can be avoided.

## Memory management and paging

**Priority A** · last 10 papers: 21 marks, asked in 10 (Paging, TLB & Page Tables 19, Contiguous Memory Allocation 2) · learn by solving · practise: [Paging, TLB & Page Tables: 15 questions from 2007–2023 →](#/subjects/os/pyq?topic=paging&years=pre2024) · [Contiguous Memory Allocation: 2 questions from 2007–2023 →](#/subjects/os/pyq?topic=mem&years=pre2024)

**Contiguous allocation:** first-fit, best-fit, worst-fit. External fragmentation (free memory split into holes) is solved by compaction or paging. **Internal fragmentation** is wasted space inside an allocated unit (last page of a process wastes on average half a page).

### Paging

Logical address = page number $p$ + offset $d$. Physical address = frame number $f$ + offset $d$.

| Quantity | Formula |
|---|---|
| Offset bits | $\log_2(\text{page size})$ |
| Number of pages | $\dfrac{\text{virtual address space}}{\text{page size}}$ |
| Number of frames | $\dfrac{\text{physical memory}}{\text{page size}}$ |
| Page-table size | $\text{number of pages} \times \text{PTE size}$ |
| PTE size (minimum) | frame-number bits + valid/dirty/protection bits, rounded up to bytes |

> [!EXAMPLE] Single-level page table
> 32-bit virtual address, 4 KB pages, 4-byte PTE. Offset = 12 bits, pages = $2^{20}$, page table = $2^{20} \times 4$ B = 4 MB per process.

**Multilevel paging** keeps each table level within one page: entries per page $= \frac{\text{page size}}{\text{PTE size}}$, so each level resolves $\log_2$ of that many bits. Number of levels $= \left\lceil \frac{\text{page-number bits}}{\text{bits per level}} \right\rceil$.

> [!EXAMPLE] How many levels?
> 46-bit virtual addresses, 8 KB pages, 4-byte entries. The offset takes 13 bits, so the page number has 33 bits. One page holds $2^{13}/4 = 2^{11}$ entries, so each level resolves 11 bits: $\lceil 33/11 \rceil = 3$ levels. Without a TLB every reference then costs 3 page-table accesses plus 1 for the data.

**Inverted page table:** one entry per physical frame (not per virtual page); size independent of virtual space; lookup by hashing on (PID, page).

### TLB and effective memory access time

TLB hit ratio $h$, TLB access time $t$, memory access time $m$, single-level page table:

$$\text{EMAT} = h\,(t + m) + (1 - h)\,(t + 2m)$$

With a $k$-level page table, a TLB miss costs $k$ memory accesses for the walk: $\text{EMAT} = h(t+m) + (1-h)(t + (k+1)m)$. If TLB lookup happens in parallel with memory, drop $t$ from the miss term (read the question).

### Segmentation

Logical address = (segment, offset). Segment table entry has base and limit; offset ≥ limit → trap. Segmentation has external fragmentation; **segmented paging** pages each segment.

> [!RECALL] Effective memory access time with TLB hit ratio $h$, TLB time $t$, memory time $m$ and a single-level page table?
> - [x] $h(t + m) + (1 - h)(t + 2m)$
> - [ ] $h(t + m) + (1 - h) \cdot 2m$
> - [ ] $ht + (1 - h)(t + m)$
> - [ ] $h(t + m) + (1 - h)(2t + 2m)$
>
> $h(t + m) + (1 - h)(t + 2m)$.

> [!RECALL] Page-table size for a 32-bit virtual address, 4 KB pages and 4-byte entries?
> - [ ] 4 KB
> - [ ] 1 MB
> - [ ] 16 MB
> - [x] 4 MB
>
> $2^{20}$ entries × 4 B = 4 MB.

## Virtual memory

**Priority B** · last 10 papers: 8 marks, asked in 4 · learn by solving · practise: [15 questions from 2007–2023 →](#/subjects/os/pyq?topic=vm&years=pre2024)

**Demand paging** loads a page only when referenced. On a **page fault**: trap, find a free frame (or evict one), read the page from disk, update the table, restart the instruction.

$$\text{EAT} = (1 - p)\, m + p \cdot s$$

$p$ = page-fault rate, $m$ = memory access time, $s$ = page-fault service time (include the write-back of a dirty victim if the question gives it).

### Page replacement

| Algorithm | Evicts | Notes |
|---|---|---|
| FIFO | Oldest loaded page | Suffers **Belady's anomaly** (more frames can cause more faults) |
| Optimal (OPT) | Page used farthest in the future | Fewest faults; benchmark only |
| LRU | Least recently used page | Stack algorithm: no Belady's anomaly |
| LRU approximations | Clock / second chance using the reference bit | Practical |

> [!EXAMPLE] FIFO vs LRU, 3 frames
> Reference string 7 0 1 2 0 3 0 4 2 3 0 3 2: FIFO gives 10 faults, LRU gives 9, OPT gives 7.

**Thrashing:** the process spends more time paging than executing because it has fewer frames than its working set. Fixes: reduce the degree of multiprogramming, working-set model, page-fault-frequency control.

**Working set** $W(t, \Delta)$: pages referenced in the last $\Delta$ references. If $\sum_i \lvert W_i \rvert$ exceeds the number of available frames, thrashing follows.

> [!TRAP] Count the first loads
> The first reference to each page is always a fault (compulsory miss) unless the question says the frames are pre-loaded.

> [!RECALL] Which page-replacement algorithm can show Belady's anomaly?
> - [ ] LRU
> - [ ] OPT
> - [ ] All three
> - [x] FIFO
>
> FIFO. LRU and OPT are stack algorithms and cannot.

> [!RECALL] What causes thrashing?
> - [ ] The TLB is too small
> - [ ] The page size is too large
> - [x] Processes hold fewer frames than their working sets
> - [ ] Too many processes are CPU-bound
>
> Processes hold fewer frames than their working sets, so they fault continuously and the CPU sits idle waiting for paging.

## File systems

**Priority B** · last 10 papers: 7 marks, asked in 4 · learn by solving · practise: [8 questions from 2007–2023 →](#/subjects/os/pyq?topic=fs&years=pre2024)

**Allocation methods**

| Method | Random access | Problems |
|---|---|---|
| Contiguous | Fast | External fragmentation, file growth |
| Linked (and FAT) | Slow (must follow links; FAT keeps links in a table) | Pointer overhead, reliability |
| Indexed (inode) | Fast | Index-block overhead |

**Unix inode:** $d$ direct pointers, one single-, one double- and one triple-indirect pointer. With block size $B$ and pointer size $p$, each index block holds $k = B/p$ pointers:

$$\text{max file size} = \bigl(d + k + k^2 + k^3\bigr) \times B$$

**Free-space management:** bit vector (1 bit per block), linked list, grouping, counting.

**Directory structures:** single-level, two-level, tree, acyclic graph (shared files via links), general graph.

> [!RECALL] Max file size with 10 direct, one single-indirect and one double-indirect pointer, 1 KB blocks and 4-byte pointers?
> - [ ] ≈ 64 KB
> - [x] ≈ 64.3 MB
> - [ ] ≈ 16 GB
> - [ ] ≈ 266 KB
>
> Each index block holds 256 pointers: $(10 + 256 + 256^2) \times 1$ KB = 65,802 KB ≈ 64.3 MB.

## Disk and I/O scheduling

**Priority C** (skim) · not asked in the last 10 papers · learn by solving · practise: [5 questions from 2007–2023 →](#/subjects/os/pyq?topic=disk&years=pre2024)

Disk access time $=$ seek time $+$ rotational latency $+$ transfer time. Average rotational latency is half a revolution: $\frac{1}{2} \cdot \frac{60}{\text{RPM}}$ s.

| Algorithm | Behaviour |
|---|---|
| FCFS | Requests in arrival order |
| SSTF | Nearest request next; may starve far requests |
| SCAN (elevator) | Sweep to the end of the disk, then reverse |
| C-SCAN | Sweep one way, jump back to the start, sweep again |
| LOOK / C-LOOK | Like SCAN / C-SCAN but turn at the last request, not the disk end |

> [!EXAMPLE] Head movement
> Head at 50, requests 82, 170, 43, 140, 24, 16, 190 (cylinders 0–199). SSTF order: 43, 24, 16, 82, 140, 170, 190 → movement $7 + 19 + 8 + 66 + 58 + 30 + 20 = 208$.

**I/O techniques:** programmed I/O (CPU polls), interrupt-driven I/O, DMA (device transfers blocks directly to memory; CPU is interrupted once per block). Buffering, spooling and caching hide device latency.

> [!RECALL] Average rotational latency of a 7200 RPM disk?
> - [ ] ≈ 8.33 ms
> - [x] ≈ 4.17 ms
> - [ ] ≈ 0.14 ms
> - [ ] ≈ 2.08 ms
>
> Half a revolution: $\tfrac12 \times \tfrac{60}{7200}$ s ≈ 4.17 ms.
