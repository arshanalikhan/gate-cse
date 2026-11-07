# Preparation strategy

A plan for the time left before February 2027: the score to aim for, the order of subjects with an hour budget for each, how to study when logic comes faster than theory, a daily routine, and the mock schedule.

## The target

- **AIR under 100** has needed roughly **70–75 marks out of 100** in recent CS papers. These are third-party marks-versus-rank estimates; the organising institute does not publish the table.
- Aim for **75**: 13 of 15 in General Aptitude and about 62 of the 85 technical marks.
- That leaves an error budget of about 25 marks across the whole paper, negative marking and slips included. Every technical subject is worth 6.7–9.3 marks a paper, so dropping one subject spends a third of that budget. **Skip topics, never subjects.** Each subject's overview has a "Battle plan" table that ranks its topics as A (master), B (method plus questions) or C (skim).

## Where the marks are

Average marks per paper over the 10 papers of 2021–2026 (range in brackets), and the default study budget used by the plan below:

| Subject | Marks per paper | Default hours | Plan week |
|---|---|---|---|
| [Digital Logic](#/subjects/dl) | 7.0 (5–9) | 12 | 1 |
| [Engineering Mathematics](#/subjects/em) | 7.8 (6–9) | 12 | 1 |
| [Computer Organization](#/subjects/coa) | 8.3 (5–10) | 22 | 2 |
| [Operating System](#/subjects/os) | 8.0 (6–10) | 18 | 3 |
| [Programming & Data Structures](#/subjects/pds) | 9.3 (6–12) | 24 | 4 |
| [Algorithms](#/subjects/algo) | 7.7 (4–12) | 22 | 5–6 |
| [Discrete Mathematics](#/subjects/dm) | 7.4 (3–15) | 24 | 6–7 |
| [Theory of Computation](#/subjects/toc) | 7.4 (6–9) | 20 | 7–8 |
| [Compiler Design](#/subjects/cd) | 6.7 (4–8) | 14 | 8 |
| [Databases](#/subjects/db) | 7.3 (5–9) | 20 | 8–9 |
| [Computer Networks](#/subjects/cn) | 8.1 (6–10) | 22 | 9–10 |
| [General Aptitude](#/subjects/ga) | 15 | 20 minutes a day | every day |

The spread is flat: no technical subject is "small". Digital Logic and Compiler Design are often called low-weight, but they averaged 7.0 and 6.7 marks, the same as Databases and Theory of Computation, and both are almost entirely procedures (K-maps, IEEE 754, FIRST/FOLLOW, parsing tables). That makes them the cheapest marks in the syllabus, so the plan does them early instead of deferring them. The numbers come from the [topic weightage](#/analysis) analysis of every past question.

## How to study when logic comes faster than theory

Most GATE CS marks come from procedures and numericals: every Battle-plan table marks each topic as learnt by **solving**, by **recall**, or both. Use a different loop for each.

1. **Solve first, read second** (solve-type topics, most of the paper). Attempt two or three past questions on the topic cold, then read the notes section, then finish the topic's questions. A failed attempt before studying improves what you learn from the reading (pretesting effect: Richland, Kornell & Kao 2009; review in Pan & Carpenter 2023), and once you have some skill, solving problems teaches more than studying worked examples (expertise reversal: Kalyuga et al. 2003).
2. **Derive, don't memorise** (theory). Where the notes say "derive, don't memorise", learn the two or three rules that generate a table (closure and decidability, normal forms, parser power) and rebuild the table from them. What you generate is remembered better than what you read (generation effect, meta-analysis d ≈ 0.40: Bertsch et al. 2007), and explaining why a fact holds helps further (self-explanation, g ≈ 0.55: Bisra et al. 2018).
3. **Retrieve and space what is left.** The facts that don't reduce to a rule are in the recall cards. Answer them from memory when the home-page review queue says they are due (retrieval practice, g ≈ 0.6: Adesope et al. 2017; spacing: Cepeda et al. 2008). Don't reread notes as revision.
4. **Interleave finished subjects.** Mixed sets of past questions make you choose the method, which is what the exam tests (interleaving meta-analysis, g ≈ 0.42: Brunmair & Richter 2019; mathematics: Rohrer & Taylor 2007).
5. **Log every miss.** Most lost marks come from the same few misconceptions, repeated. The three notebooks below make them visible.

## The 13-week plan

**Day 0, Sunday 8 November: diagnostic.** Take the [predicted 2027 paper](mock/) as a timed 3-hour mock. Each subject's progress report then shows your score. If you score 70% or more in a subject and have already solved its past questions, halve its block and give the hours to your weakest subject. Otherwise keep the default order below.

The hours assume about 4–4½ focused hours on weekdays and 7 on weekend days, about 35 a week: roughly 24 hours on the week's subject (19 in a mock week), the rest on General Aptitude, review and the error log.

| Week | Dates | Main block: notes and past questions | Full mock (3 h + 2 h analysis) |
|---|---|---|---|
| 1 | 9–15 Nov | Digital Logic (12 h), then Engineering Mathematics (12 h) | |
| 2 | 16–22 Nov | Computer Organization (22 h) | |
| 3 | 23–29 Nov | Operating System (18 h) | Sun 29 Nov: GATE 2024 Set 1 |
| 4 | 30 Nov – 6 Dec | Programming & Data Structures (24 h) | |
| 5 | 7–13 Dec | Algorithms (22 h, finishes early in week 6) | Sun 13 Dec: GATE 2024 Set 2 |
| 6 | 14–20 Dec | Discrete Mathematics (24 h, finishes early in week 7) | |
| 7 | 21–27 Dec | Theory of Computation (20 h, finishes early in week 8) | Sun 27 Dec: GATE 2025 Set 1 |
| 8 | 28 Dec – 3 Jan | Compiler Design (14 h), then start Databases | |
| 9 | 4–10 Jan | Databases (20 h in all), then start Computer Networks | Sun 10 Jan: GATE 2025 Set 2 |
| 10 | 11–17 Jan | Computer Networks (22 h in all) | Sun 17 Jan: GATE 2026 Set 1 |
| 11 | 18–24 Jan | Repair: the three subjects that lost the most marks in mocks 1–5 | Midweek: GATE 2026 Set 2; Sunday: a test-series mock |
| 12 | 25–31 Jan | Repair, the autopsy book, every formula sheet in self-test mode | Two test-series mocks |
| 13 | 1–5 Feb | Light: one mock early in the week, the review queue, sleep shifted to your exam slot | Exams from Sat 6 Feb |

Why this order:

- **Digital Logic and Engineering Mathematics first:** the most marks per hour (procedures and short calculations), and a fast start.
- **Prerequisites before what uses them:** caches before paging (COA, then OS), data structures before algorithms, graph algorithms before graph theory, automata and grammars before lexing and parsing (TOC, then CD).
- **Databases and Networks last among the new subjects:** nothing else depends on them, and most of their marks are numericals (CIDR, TCP windows, normal forms, schedules).

Rules that keep the plan alive:

- **Running late?** If a block overruns by more than two days, drop its Priority C topics and the pre-2014 questions on its Priority B topics. Never push the next subject back.
- **Repair weeks:** in each repair subject, redo the questions you marked "Got it wrong" (the "My result" filter on the PYQ tab), then its Priority A questions from 2014–2023.
- **The 2024–2026 papers stay unseen** until their mock date. Practise by topic only on 2007–2023: the PYQ tab's "Before 2024 (topic practice)" filter does this, and every Battle-plan link opens with it.

## Daily routine

| Block | Time | What to do |
|---|---|---|
| Morning review | 45 min | The home-page review queue (recall cards and topic self-tests that are due), then one formula sheet in self-test mode |
| Practice | 60 min | 40 minutes of past questions on the week's topics (from week 3, every third day a mixed set from finished subjects), then 20 minutes of General Aptitude |
| Deep work | 2 h | The week's subject, solve-first: three questions cold, the notes section, then the rest of the topic's questions. Phone in another room |
| Night log | 30 min | Write the day's misses in the autopsy book; set tomorrow's exact topics |

On weekends, make the deep-work block 4–5 hours. Protect sleep and exercise: sleep consolidates what you studied that day (Diekelmann & Born 2010), and steady 4–5 focused hours a day for 13 weeks beat 10-hour days that collapse after two.

## The three-notebook system

1. **Theory vault:** the rules that generate the facts (closure, decidability, normal forms), diagrams, and the precise edge cases that MSQs test, for example "every regular language is context-free, but the complement of a CFL need not be a CFL".
2. **Formula ledger:** every formula and standard result you need. Each subject's **Formulae** page is the starting point; add your own.
3. **Autopsy book:** every past or mock question you got wrong or guessed. Write the exact logical failure and the principle that fixes it, and re-attempt these questions weekly. In the last month this is your highest-value revision.

## Mock tests

- **Seven full papers under exam conditions:** the day-0 diagnostic and the six 2024–2026 sets on the dates above. Add a test series for weeks 11–13 if you have one; if not, retake the predicted paper after week 10.
- **Same time of day as your exam slot** (forenoon 9:30–12:30 or afternoon 14:30–17:30), with the on-screen virtual calculator only.
- **Analyse as long as you test.** Classify every lost mark: concept gap (back to the notes section and five of its questions), calculation slip (add a check step), misread (underline what is asked before solving) or time pressure (apply the pass system below).
- The [past papers page](#/papers) lists the papers and official keys for scoring.

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

## Sources

Adesope, Trevisan & Sundararajan 2017, Rev. Educ. Res. · Bertsch et al. 2007, Memory & Cognition 35:201 · Bisra et al. 2018, Educ. Psychol. Rev. 30:703 · Brunmair & Richter 2019, Psychol. Bull. 145:1029 · Cepeda et al. 2008, Psychol. Sci. 19:1095 · Diekelmann & Born 2010, Nat. Rev. Neurosci. 11:114 · Kalyuga, Ayres, Chandler & Sweller 2003, Educ. Psychol. 38:23 · Pan & Carpenter 2023, Educ. Psychol. Rev. 35:97 · Richland, Kornell & Kao 2009, J. Exp. Psychol. Appl. 15:243 · Rohrer & Taylor 2007, Instr. Sci. 35:481. Rank estimates: [Physics Wallah](https://www.pw.live/gate/exams/gate-marks-vs-rank) and [Careers360](https://engineering.careers360.com/articles/gate-cse-marks-vs-rank-2026) marks-versus-rank tables.
