# General Aptitude: notes

Exam-focused notes for the GA section: 10 questions, 15 marks (five 1-mark, five 2-mark), common to every GATE paper. Aim to finish it in 20 minutes with full marks.

## Verbal aptitude

**Grammar points GATE tests**

- **Subject–verb agreement:** "Each of the students *has*…"; "The number of applicants *is*…" but "A number of applicants *are*…"; "Neither the manager nor the clerks *were*…" (the verb agrees with the nearer subject).
- **Articles:** "an hour", "a university", "an MBA" (sound, not spelling); "the" for something already identified or unique.
- **Tenses:** "If I *had known*, I *would have* come" (past perfect in the if-clause); "He has been working *since* 2020 / *for* five years".
- **Prepositions and conjunctions:** "*despite* the rain" (no "of"); "*although* it rained"; "not only… but also"; "prefer X *to* Y".

**Vocabulary:** read the whole sentence before choosing; the right word must fit both meaning and tone. Learn common confusables: affect/effect, complement/compliment, principal/principle, stationary/stationery, discreet/discrete.

**Reading comprehension:** for "which can be **inferred**", choose only what must be true from the passage; options that are plausible but unstated are wrong. For "which **weakens**", find the option that breaks the link between evidence and conclusion.

**Narrative sequencing (para-jumbles):** find the sentence that introduces the topic (no pronoun or connector pointing backwards), then chain sentences through pronouns ("this", "they"), connectors ("however", "therefore") and time order.

> [!TRAP] Extreme options
> Options with "always", "never", "only" or "all" are usually too strong for inference questions.

> [!RECALL] "The number of errors ___ decreasing." Is or are?
> - [ ] are
> - [ ] Either is correct
> - [x] is
> - [ ] be
>
> "is": "the number" is singular ("a number of errors are…").

## Percentages, ratios and averages

| Situation | Formula |
|---|---|
| Percentage change | $\frac{\text{new} - \text{old}}{\text{old}} \times 100$ |
| Successive changes $a\%$ then $b\%$ | net $a + b + \frac{ab}{100}$ percent |
| Weighted average | $\frac{\sum w_i x_i}{\sum w_i}$ |
| Alligation (mixing prices $c_1 < m < c_2$) | ratio $= (c_2 - m) : (m - c_1)$ |
| Compound interest | $A = P\left(1 + \frac{r}{100}\right)^n$ |
| Work: A in $a$ days, B in $b$ days | together $\frac{ab}{a + b}$ days |
| Average speed, equal distances at $x$ and $y$ | $\frac{2xy}{x + y}$ |
| Relative speed | same direction $\lvert u - v \rvert$; opposite $u + v$ |

> [!EXAMPLE]
> A price rises 20% and then falls 20%: net change $20 - 20 - \frac{400}{100} = -4\%$. A car covers equal distances at 60 and 40 km/h: average $\frac{2 \cdot 60 \cdot 40}{100} = 48$ km/h, not 50.

> [!RECALL] A does a job in 10 days, B in 15. How long together?
> - [ ] 12.5 days
> - [x] 6 days
> - [ ] 25 days
> - [ ] 5 days
>
> $\frac{10 \cdot 15}{25} = 6$ days.

## Powers, logarithms and series

| Rule | Form |
|---|---|
| Exponents | $a^m a^n = a^{m+n}$, $(a^m)^n = a^{mn}$, $a^{-n} = 1/a^n$ |
| Logarithms | $\log(ab) = \log a + \log b$; $\log a^n = n \log a$; $\log_b a = \frac{\log a}{\log b}$ |
| Arithmetic progression | $a_n = a + (n-1)d$, $S_n = \frac{n}{2}(2a + (n-1)d)$ |
| Geometric progression | $a_n = ar^{n-1}$, $S_n = a\frac{r^n - 1}{r - 1}$, $S_\infty = \frac{a}{1 - r}$ ($\lvert r \rvert < 1$) |
| Sum of first $n$ integers / squares | $\frac{n(n+1)}{2}$ / $\frac{n(n+1)(2n+1)}{6}$ |

**Unit digits** repeat with period at most 4: for $7^k$ the cycle is 7, 9, 3, 1.

> [!EXAMPLE]
> Unit digit of $7^{2026}$: $2026 \bmod 4 = 2$, so the second entry of the cycle: **9**.

> [!RECALL] What is $\log_4 8$?
> - [ ] $\tfrac12$
> - [ ] $2$
> - [x] $\tfrac32$
> - [ ] $\tfrac23$
>
> $\frac{\log_2 8}{\log_2 4} = \frac32$.

## Counting and probability

- Arrangements of $n$ distinct objects: $n!$; choose $r$: $\binom{n}{r}$; circular arrangements: $(n-1)!$.
- Probability = favourable / total for equally likely outcomes; $P(\text{at least one}) = 1 - P(\text{none})$.
- Independent events multiply; mutually exclusive events add.

> [!EXAMPLE]
> Three fair coins: $P(\text{at least one head}) = 1 - \frac18 = \frac78$.

> [!RECALL] In how many ways can 5 people sit around a round table?
> - [ ] 60
> - [x] 24
> - [ ] 120
> - [ ] 12
>
> $4! = 24$.

## Data interpretation

- Read the units and the base year first; check whether values are absolute or percentages.
- Percentage share = part / total × 100; growth from year 1 to year 2 = (Y2 − Y1) / Y1 × 100.
- **Estimate** before calculating: options are often far enough apart that rounding to two significant figures decides the answer.
- For pie charts, $1\% = 3.6^\circ$.

> [!TRAP] Percentage points vs per cent
> A rise from 20% to 25% is 5 percentage points, but a 25% relative increase.

> [!RECALL] A pie-chart sector is 72°. What share of the total is it?
> - [ ] 18%
> - [ ] 72%
> - [ ] 25%
> - [x] 20%
>
> $72 / 360 = 20\%$.

## Mensuration and geometry

| Shape | Area / volume |
|---|---|
| Triangle | $\frac12 bh$; Heron $\sqrt{s(s-a)(s-b)(s-c)}$ |
| Equilateral triangle, side $a$ | $\frac{\sqrt3}{4}a^2$ |
| Circle / sector of angle $\theta$ | $\pi r^2$ / $\frac{\theta}{360^\circ}\pi r^2$ |
| Cylinder | volume $\pi r^2 h$, curved surface $2\pi r h$ |
| Cone | volume $\frac13 \pi r^2 h$, curved surface $\pi r \ell$ |
| Sphere | volume $\frac43 \pi r^3$, surface $4\pi r^2$ |
| Cuboid | volume $lbh$, surface $2(lb + bh + hl)$ |

- Interior angle of a regular $n$-gon: $\frac{(n-2) \times 180^\circ}{n}$; number of diagonals: $\frac{n(n-3)}{2}$.
- Similar figures: lengths scale by $k$, areas by $k^2$, volumes by $k^3$.

> [!RECALL] If every side of a cube is doubled, by what factor does its volume grow?
> - [ ] 6
> - [ ] 2
> - [x] 8
> - [ ] 4
>
> $2^3 = 8$.

## Analytical reasoning

- **Syllogisms:** draw Venn diagrams; a conclusion follows only if it holds in **every** possible diagram. "All A are B; some B are C" does **not** give "some A are C".
- **Deduction vs induction:** deduction guarantees the conclusion from the premises; induction generalises from cases and can be wrong.
- **Number series:** look at differences, ratios, alternating patterns, squares/cubes, primes.
- **Arrangements and puzzles:** tabulate the fixed facts first, then branch on the remaining choices.
- **Clocks:** the angle between the hands at $H$:$M$ is $\lvert 30H - 5.5M \rvert$ (take $360^\circ$ minus it if over $180^\circ$).
- **Calendars:** count odd days (days beyond complete weeks); a normal year has 1 odd day, a leap year 2.

> [!EXAMPLE]
> At 3:40 the hands are $\lvert 90 - 220 \rvert = 130^\circ$ apart.

> [!RECALL] "No A is B; all C are A." Does "no C is B" follow?
> - [x] Yes
> - [ ] No
> - [ ] Cannot be determined
> - [ ] Only if some C exist
>
> Yes: every C lies inside A, which does not meet B.

## Spatial aptitude

- **Rotation** keeps handedness; **mirroring** flips it (a mirror image cannot be obtained by rotating in the plane).
- **Paper folding and punching:** unfold step by step, reflecting each hole across the fold line; each fold doubles the number of holes made by one punch.
- **Cube nets:** faces that are opposite on the cube are never adjacent in the net; in a straight row of three faces, the first and third are opposite.
- **Painted cube** of side $n$ cut into $n^3$ unit cubes:

| Painted faces | Count |
|---|---|
| 3 | 8 (corners) |
| 2 | $12(n-2)$ (edges) |
| 1 | $6(n-2)^2$ (faces) |
| 0 | $(n-2)^3$ (interior) |

> [!EXAMPLE]
> A $4 \times 4 \times 4$ painted cube: 8 with three painted faces, 24 with two, 24 with one, 8 with none (total 64).

> [!RECALL] A square sheet is folded in half twice and one hole is punched. How many holes after unfolding?
> - [x] 4
> - [ ] 8
> - [ ] 3
> - [ ] 2
>
> 4.
