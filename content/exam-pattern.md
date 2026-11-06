# Exam pattern & scoring

How the GATE 2027 CS paper is structured, how each question type is marked, and how your raw marks become a GATE score.

## The paper at a glance

| Item | GATE 2027 CS |
|---|---|
| Organising institute | IIT Madras |
| Mode | Computer-based test (CBT) at an exam centre |
| Duration | 3 hours (180 minutes) |
| Questions | 65 |
| Total marks | 100 |
| Sections | General Aptitude (15 marks) + Engineering Mathematics (≈13) + CS subjects (≈72) |
| Question types | MCQ, MSQ, NAT |
| Calculator | On-screen virtual scientific calculator only |
| Sessions | CS is held in two sessions (CS1, CS2) since 2024; marks are normalised across sessions |
| Exam days | 6, 7, 13, 14, 20, 21 Feb 2027 (paper-wise schedule to be announced) |
| Results | 19 Mar 2027 |
| Score validity | 3 years from the date of results |

## Question types

| Type | What you do | Negative marking | Partial marks |
|---|---|---|---|
| **MCQ**: multiple choice | Pick the one correct option out of four | Yes: −1/3 for a 1-mark question, −2/3 for a 2-mark question | – |
| **MSQ**: multiple select | Pick every correct option; one or more of the four are correct | None | None: you must select exactly the correct set |
| **NAT**: numerical answer | Type a number with the on-screen keypad | None | None: answer must fall in the accepted range |

### Marking scheme

$$
\text{MCQ: } +1 \text{ or } +2 \text{ if correct}, \quad -\tfrac{1}{3} \text{ or } -\tfrac{2}{3} \text{ if wrong}, \quad 0 \text{ if unattempted}
$$

| Section | 1-mark questions | 2-mark questions | Marks |
|---|---|---|---|
| General Aptitude | 5 | 5 | 15 |
| Engineering Mathematics + CS | 25 | 30 | 85 |
| **Total** | **30** | **35** | **100** |

> [!TRAP] Where candidates lose marks
> - **MSQ is all-or-nothing.** Selecting three options when four are correct scores zero. Tick only options you can justify; but there is no penalty for trying.
> - **NAT precision.** If the question says "rounded off to two decimal places", type exactly that. The accepted range is usually tight. Never leave a NAT blank: there is no negative marking.
> - **Guessing MCQs.** A random guess among four options has expected value $\tfrac14(+1) + \tfrac34(-\tfrac13) = 0$. If you can eliminate even one option, guessing becomes positive: $\tfrac13(+1) + \tfrac23(-\tfrac13) = +\tfrac19$.

## The exam screen

The CBT interface shows a question palette. Learn its states before the exam (the [mock test](mock/) uses the same scheme):

| Palette state | Meaning | Evaluated? |
|---|---|---|
| Not visited | You have not opened the question | No |
| Not answered | Opened, no answer saved | No |
| Answered | Answer saved | Yes |
| Marked for review | No answer, flagged | No |
| Answered and marked for review | Answer saved and flagged | **Yes** |

- Use **Save & Next** to save an answer; just clicking an option and moving away may not save it.
- A scribble pad is provided at the centre; you cannot bring paper.
- The virtual calculator is slow compared with a physical one. Practise with the official [online virtual calculator](https://gate2027.iitm.ac.in/) on the GATE site so that it does not cost you time.

## From marks to GATE score

### Step 1: normalisation (multi-session papers)

Because CS runs in two sessions with different question papers, raw marks are normalised so that a harder session is not penalised. The normalised mark of candidate $j$ in session $i$ is

$$
\widehat{M}_{ij} = \frac{\overline{M}_t^{\,g} - M_q^{\,g}}{\overline{M}_{ti} - M_{iq}}\,\bigl(M_{ij} - M_{iq}\bigr) + M_q^{\,g}
$$

| Symbol | Meaning |
|---|---|
| $M_{ij}$ | actual marks of candidate $j$ in session $i$ |
| $\overline{M}_t^{\,g}$ | average marks of the top 0.1% of candidates across all sessions |
| $M_q^{\,g}$ | mean + standard deviation of marks of all candidates across all sessions |
| $\overline{M}_{ti}$ | average marks of the top 0.1% of candidates in session $i$ |
| $M_{iq}$ | mean + standard deviation of marks of candidates in session $i$ |

### Step 2: the GATE score (out of 1000)

$$
\text{GATE score} = S_q + \bigl(S_t - S_q\bigr)\,\frac{M - M_q}{\overline{M}_t - M_q}
$$

| Symbol | Meaning |
|---|---|
| $M$ | your (normalised) marks out of 100 |
| $M_q$ | qualifying marks for the general category |
| $\overline{M}_t$ | mean marks of the top 0.1% of candidates (top 10 if fewer than 10,000 appear) |
| $S_q = 350$ | score given to someone exactly at the qualifying mark |
| $S_t = 900$ | score given to someone at $\overline{M}_t$ |

The score is linear in your marks: every extra mark above the cut-off is worth the same number of score points. Rank, not score, decides most admissions and PSU shortlists.

### Qualifying marks

| Category | Qualifying mark |
|---|---|
| General | $\max(25,\ \mu + \sigma)$, where $\mu$ and $\sigma$ are the mean and standard deviation of all marks |
| OBC-NCL, EWS | 90% of the general qualifying mark |
| SC, ST, PwD | two-thirds of the general qualifying mark |

Recent CS general-category qualifying marks (from the official result notifications; confirm on the GATE site):

| Year | 2021 | 2022 | 2023 | 2024 | 2025 |
|---|---|---|---|---|---|
| General cut-off | 26.1 | 25.0 | 32.5 | 27.6 | 29.2 |

> [!NOTE] Qualifying is not the goal
> Clearing the cut-off only makes you "GATE qualified". IIT M.Tech admissions and PSU shortlists usually need a rank in the low hundreds to low thousands, which in recent CS papers has meant roughly 55–75+ marks. Plan your preparation for that range.

## Two papers and the score card

- You may appear in up to **two papers** from the permitted combinations (CS is most often paired with DA, Data Science and AI). See the official two-paper list before registering in future years.
- The score card shows marks out of 100, GATE score out of 1000 and All-India rank.

## Exam-day checklist

1. Admit card (printed) and the original photo ID you registered with.
2. Reach the centre before the reporting time; late entry is refused.
3. No calculator, watch, phone or paper is allowed. You get a scribble pad and the on-screen calculator.
4. In the first minute, scan the GA section; it is the fastest 15 marks on the paper.
5. Keep 10 minutes at the end to review "marked for review" questions and fill every NAT.
