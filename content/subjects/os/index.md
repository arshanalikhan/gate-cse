# Operating System

Processes and threads, synchronisation, deadlock, CPU scheduling, memory management, virtual memory and file systems. Typically 6–10 marks per paper, most of it as 2-mark numericals and code-reasoning questions.

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
