# Operating System

Processes and threads, synchronisation, deadlock, CPU scheduling, memory management, virtual memory and file systems. Typically 6–10 marks per paper, most of it as 2-mark numericals and code-reasoning questions.

<!-- plan:start -->
## Battle plan

Expected **8 marks** per paper (6–10 across the 10 papers of 2021–26) · default budget **18 hours** · week 3 of the [13-week plan](#/strategy?h=the-13-week-plan).

| Priority | Topic | Last 10 papers | Learn by | Study, then practise |
|---|---|---|---|---|
| **A** | Paging, TLB & Page Tables | 19 marks · 10 papers | Solving | [Memory management and paging](#/subjects/os/notes?h=memory-management-and-paging) → [15 questions](#/subjects/os/pyq?topic=paging&years=pre2024) |
| **A** | CPU Scheduling | 13 marks · 9 papers | Solving | [CPU scheduling](#/subjects/os/notes?h=cpu-scheduling) → [19 questions](#/subjects/os/pyq?topic=sched&years=pre2024) |
| **A** | Synchronization & Concurrency | 13 marks · 7 papers | Solving | [Process synchronisation](#/subjects/os/notes?h=process-synchronisation) → [22 questions](#/subjects/os/pyq?topic=sync&years=pre2024) |
| **B** | Virtual Memory & Page Replacement | 8 marks · 4 papers | Solving | [Virtual memory](#/subjects/os/notes?h=virtual-memory) → [15 questions](#/subjects/os/pyq?topic=vm&years=pre2024) |
| **B** | Deadlock | 7 marks · 4 papers | Solving | [Deadlock](#/subjects/os/notes?h=deadlock) → [14 questions](#/subjects/os/pyq?topic=deadlock&years=pre2024) |
| **B** | File Systems | 7 marks · 4 papers | Solving | [File systems](#/subjects/os/notes?h=file-systems) → [8 questions](#/subjects/os/pyq?topic=fs&years=pre2024) |
| **B** | System Calls & fork() | 6 marks · 4 papers | Solving | [Processes and system calls](#/subjects/os/notes?h=processes-and-system-calls) → [5 questions](#/subjects/os/pyq?topic=fork&years=pre2024) |
| **B** | Processes & Threads | 5 marks · 4 papers | Recall | [Processes and system calls](#/subjects/os/notes?h=processes-and-system-calls) · [Threads](#/subjects/os/notes?h=threads) → [7 questions](#/subjects/os/pyq?topic=proc&years=pre2024) |
| **C** | Contiguous Memory Allocation | 2 marks · 1 paper | Solving | [Memory management and paging](#/subjects/os/notes?h=memory-management-and-paging) → [2 questions](#/subjects/os/pyq?topic=mem&years=pre2024) |
| **C** | Disk Scheduling | not asked | Solving | [Disk and I/O scheduling](#/subjects/os/notes?h=disk-and-i-o-scheduling) → [5 questions](#/subjects/os/pyq?topic=disk&years=pre2024) |

**A**: master it and solve all its 2007–2023 questions. **B**: learn the method, then solve its questions. **C**: read once and keep its recall cards; solve its questions only if time is left. Keep the 2024–2026 papers unseen: they are your full-length mocks.

**How to study it**

- Paging (19 marks, every paper), scheduling (13) and synchronisation (13) are solve-type: address split, table size, levels, then access time; a Gantt chart for every scheduling question; check mutual exclusion, progress and bounded waiting one at a time.
- Process and thread facts give about 5 marks as 1-mark MSQs. Keep them in the recall cards instead of rereading the section.
<!-- plan:end -->

```widget
type: weightage-topics
```

```widget
type: weightage-trend
```

## Syllabus (GATE 2027)

> System calls, processes, threads, inter-process communication, concurrency and synchronization. Deadlock. CPU and I/O scheduling. Memory management and virtual memory. File systems.

Unchanged from 2026.

## Topic checklist

Tick topics as you finish them (also possible from the notes page). Saved in this browser only.

```widget
type: checklist
```

## How to prepare

1. **Paging, TLB and page tables** appear in practically every recent paper. Be fluent with address splitting, page-table size, multilevel paging and effective access time.
2. **CPU scheduling:** draw Gantt charts for FCFS, SJF, SRTF, RR and priority quickly and without errors; know the tie-break rules.
3. **Synchronisation** carries the most marks over the years: semaphores, Peterson's algorithm, which code snippets satisfy mutual exclusion / progress / bounded waiting, and race-condition value ranges.
4. **Deadlock:** Banker's safety check and the "minimum resources" formula.
5. **Virtual memory:** FIFO, LRU and optimal fault counts; Belady's anomaly; effective access time with page faults.
6. **Finish with** `fork()` counting, file-system allocation (inode max file size) and disk scheduling.

## Question patterns to expect

| Pattern | What to practise | Notes |
|---|---|---|
| Effective memory access time with TLB / page faults | Write the formula from the access path, then substitute | [Paging](#/subjects/os/notes?h=memory-management-and-paging) |
| Average waiting / turnaround time | SRTF and RR Gantt charts with arrival times | [Scheduling](#/subjects/os/notes?h=cpu-scheduling) |
| Which semaphore code is correct | Check each requirement separately; look for deadlock by ordering | [Synchronisation](#/subjects/os/notes?h=process-synchronisation) |
| Number of page faults | Simulate with a table, one column per reference | [Virtual memory](#/subjects/os/notes?h=virtual-memory) |
| Safe state / minimum instances | Banker's safety loop; $\sum(m_i - 1) + 1$ | [Deadlock](#/subjects/os/notes?h=deadlock) |
| How many times is "x" printed | Process tree for `fork()` | [Processes](#/subjects/os/notes?h=processes-and-system-calls) |

## Go deeper

- Standard text: Silberschatz, Galvin & Gagne, *Operating System Concepts*.
- Free: [Operating Systems: Three Easy Pieces](https://pages.cs.wisc.edu/~remzi/OSTEP/) for concurrency and virtual memory.
- Then drill this subject's [previous-year questions](#/subjects/os/pyq).
