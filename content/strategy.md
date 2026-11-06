# Preparation strategy

A plan you can actually follow: what to study first, how to split the remaining weeks before February 2027, a daily routine, and the error-tracking system that turns mock tests into marks.

## Principles

1. **Return on investment decides the order.** Study high-weightage, high-repeat topics first (see [topic weightage](#/analysis)). Digital Logic and Compiler Design are small; Engineering + Discrete Mathematics, Programming & DS, OS, COA, Algorithms and Networks carry most of the paper.
2. **Previous-year questions are the real syllabus.** GATE repeats ideas, not questions. After each topic, solve every PYQ on it (each subject's **Previous-year questions** tab).
3. **Active recall beats re-reading.** Close the notes and reproduce the result, the formula or the algorithm on paper.
4. **Every mistake gets logged.** Most marks are lost to the same few misconceptions, repeated. The three-notebook system below makes them visible.
5. **Practise in exam conditions.** 3 hours, virtual calculator, no breaks, negative marking.

## Subject priority

| Priority | Subjects | Why |
|---|---|---|
| **Must master** | Engineering + Discrete Mathematics, Programming & Data Structures, Operating System, Computer Organization, Algorithms | Highest combined weight; questions are predictable in type |
| **High** | Computer Networks, Theory of Computation, Databases | Steady 6–10 marks each; formula- and rule-driven |
| **Finish quickly** | Digital Logic, Compiler Design | Low weight, but the easy questions are very easy; do not skip them |
| **Every day** | General Aptitude | 15 marks for 20 minutes of daily practice |

> [!NOTE] Exact numbers
> The marks-per-subject chart on the [home page](#/) and the [topic weightage](#/analysis) page are computed from every tagged past question. Use them to fine-tune this order.

## If you are starting now: a 13-week plan to February 2027

The first CS session can be as early as **6 February 2027**. From the week of 9 November 2026 that is about 13 weeks. This plan assumes you have seen most subjects once (college courses count); if not, cut the "Finish quickly" subjects to their core topics and keep the mock phase.

| Weeks | Dates | Focus | Daily maths slot |
|---|---|---|---|
| 1–3 | 9 Nov – 29 Nov | **Systems:** Operating System, COA, C programming + data structures | Discrete Mathematics (logic, sets, relations, functions) |
| 4–6 | 30 Nov – 20 Dec | **Core CS:** Algorithms, Databases | Discrete Mathematics (graphs, combinatorics, groups) |
| 7–8 | 21 Dec – 3 Jan | **Theory:** Theory of Computation, Compiler Design | Linear algebra, calculus |
| 9–10 | 4 Jan – 17 Jan | **Networks + Digital Logic** (2027 syllabus topics) | Probability and statistics |
| 11–13 | 18 Jan – exam | **Mocks and revision:** 2–3 full mocks per week, error-log revision, formula sheets | Mixed PYQ sets |

Rules for each week:

- Finish the week's notes by Thursday; Friday–Saturday solve that subject's PYQs (2010 onwards first); Sunday is revision + one sectional test.
- 20 minutes of General Aptitude every day, no exceptions.
- From week 6, one full-length paper every Sunday.

## With 8–12 months: four phases

If you are preparing for a later GATE, use the same order with more room:

| Phase | Length | Subjects | Goal |
|---|---|---|---|
| 1. Systems anchor | ~2 months | OS, COA, C + data structures | Concepts plus all numerical types (scheduling, paging, cache, pipelines) |
| 2. Core engineering | ~2 months | Algorithms, Discrete Maths, Databases | Asymptotics, recurrences, graph algorithms, logic, SQL/RA, normalisation, transactions |
| 3. Networks and theory | ~2 months | Networks, TOC, Engineering Maths | Subnetting, TCP, routing; automata and decidability; probability and linear algebra |
| 4. Execution | last 2 months | Digital Logic, Compiler Design, then mocks only | Clear the small subjects in two weeks, then full mocks and error analysis |

## Daily routine

| Block | Time | What to do |
|---|---|---|
| Morning recall | 45 min | Revise yesterday's formula sheet and notes from memory, then check |
| Practice | 1 hour | 5–10 NAT or MSQ problems from 2021–2026 papers |
| Deep work | 2 hours | New theory and hard problems; phone in another room |
| Night log | 30 min | Write the day's mistakes in the error log; set tomorrow's exact targets |

Protect sleep and exercise. Consistent 4–5 focused hours a day for 13 weeks beats 10-hour days that collapse after two weeks.

## The three-notebook system

1. **Theory vault:** condensed diagrams, flows and the precise edge-case rules that MSQs test (for example "every regular language is context-free, but the complement of a CFL need not be a CFL").
2. **Formula ledger:** every formula and standard result you need, in one place. The **Formulae** page of each subject on this site is a ready-made starting point; add your own.
3. **Autopsy book:** every PYQ or mock question you got wrong or guessed. For each, write the exact logical failure and the principle that fixes it. Re-attempt these questions weekly; this notebook is your highest-value revision material in the last month.

## How to use previous-year questions

- **Topic-wise first:** after finishing a topic, solve its PYQs from the subject's PYQ tab, newest first.
- **Year-wise later:** in the mock phase, take complete past papers (2015–2026) as timed tests.
- **Mark the patterns:** most numerical PYQs follow a handful of templates (effective memory access time, pipeline speed-up, TCP window growth, Bayes, recurrences). Recognising the template is half the solution.

## Mock tests

- Start full-length mocks about six weeks before the exam; take at least 10 in total.
- Take them at the same time of day as your exam session (morning 9:30–12:30 or afternoon 14:30–17:30).
- Spend as long analysing a mock as taking it: classify every lost mark as concept gap, calculation slip, misread or time pressure.
- Use the [predicted 2027 mock](mock/) on this site for the full GATE CBT experience.

## Exam-day tactics

| Pass | Time | What |
|---|---|---|
| 1 | 0–20 min | General Aptitude, all ten questions |
| 2 | 20–90 min | Every question you can solve at once; mark the rest for review |
| 3 | 90–165 min | Marked questions, longest-but-doable first |
| 4 | last 15 min | Fill every NAT (no penalty), re-check MSQ selections, never guess an MCQ blind |

> [!TRAP] Common traps in recent papers
> - **Decidability MSQs** mix Turing-machine properties with context-free languages; know which closure and decision properties hold for each class.
> - **Paging + cache in one question:** a 2-mark NAT may chain TLB, page table and cache. Write the full address-translation path first.
> - **C tracing:** nested recursion with `static` variables and pointer arithmetic. Trace the call stack on paper, one frame per line.
> - **TCP windows:** check whether the window is given in bytes or segments, and where the slow-start threshold is.
