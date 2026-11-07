# Engineering Mathematics: notes

Exam-focused notes for Linear Algebra, Calculus and Probability & Statistics (GATE 2027 Section 1; Discrete Mathematics has [its own page](#/subjects/dm)). Probability and linear algebra appear in practically every paper.

## Matrices and determinants

**Priority A** · last 10 papers: 29 marks, asked in 10 (for Linear Algebra as a whole) · learn by solving · practise: [37 questions from 2007–2023 →](#/subjects/em/pyq?topic=la&years=pre2024)

**Key idea:** most matrix questions reduce to rank, determinant or eigenvalues; know the shortcuts below.

| Property | Value |
|---|---|
| $\det(AB)$ | $\det A \cdot \det B$ |
| $\det(A^T)$ | $\det A$ |
| $\det(kA)$, $A$ is $n \times n$ | $k^n \det A$ |
| $\det(A^{-1})$ | $1/\det A$ |
| Triangular matrix | product of the diagonal |
| Swap two rows | sign flips |
| Add a multiple of one row to another | unchanged |
| $A^{-1}$ | $\dfrac{\operatorname{adj} A}{\det A}$ |
| $\det(\operatorname{adj} A)$ | $(\det A)^{n-1}$ |

**Rank** = number of linearly independent rows (= columns) = number of non-zero rows in echelon form = size of the largest non-zero minor. $\operatorname{rank}(AB) \le \min(\operatorname{rank} A, \operatorname{rank} B)$; rank + nullity $= n$ (number of columns).

> [!RECALL] $A$ is $3 \times 3$ with $\det A = 2$. What is $\det(2A)$?
> $2^3 \cdot 2 = 16$.

## Systems of linear equations

**Priority A** · last 10 papers: 29 marks, asked in 10 (for Linear Algebra as a whole) · learn by solving · practise: [37 questions from 2007–2023 →](#/subjects/em/pyq?topic=la&years=pre2024)

For $Ax = b$ with $n$ unknowns, compare $r = \operatorname{rank}(A)$ and $r' = \operatorname{rank}([A \mid b])$:

| Condition | Solutions |
|---|---|
| $r < r'$ | none (inconsistent) |
| $r = r' = n$ | exactly one |
| $r = r' < n$ | infinitely many, with $n - r$ free variables |

A homogeneous system $Ax = 0$ always has $x = 0$; it has non-trivial solutions iff $r < n$ (for square $A$: iff $\det A = 0$).

> [!EXAMPLE] Parameter questions
> $x + y + z = 6$, $x + 2y + 3z = 10$, $x + 2y + \lambda z = \mu$. Subtracting the second equation from the third gives $(\lambda - 3)z = \mu - 10$. Unique solution if $\lambda \ne 3$; none if $\lambda = 3, \mu \ne 10$; infinitely many if $\lambda = 3, \mu = 10$.

> [!RECALL] A system has 5 unknowns and $\operatorname{rank}(A) = \operatorname{rank}([A\mid b]) = 3$. How many free variables?
> $5 - 3 = 2$, so infinitely many solutions.

## Eigenvalues and eigenvectors

**Priority A** · last 10 papers: 29 marks, asked in 10 (for Linear Algebra as a whole) · learn by solving · practise: [37 questions from 2007–2023 →](#/subjects/em/pyq?topic=la&years=pre2024)

$Av = \lambda v$ with $v \ne 0$; eigenvalues are roots of $\det(A - \lambda I) = 0$.

| Fact | Value |
|---|---|
| Sum of eigenvalues | trace |
| Product of eigenvalues | determinant |
| Triangular / diagonal matrix | eigenvalues are the diagonal entries |
| $A^k$, $A^{-1}$, $A + kI$, $kA$ | $\lambda^k$, $1/\lambda$, $\lambda + k$, $k\lambda$ (same eigenvectors) |
| $A^T$ | same eigenvalues |
| $2 \times 2$ characteristic equation | $\lambda^2 - (\operatorname{tr} A)\lambda + \det A = 0$ |
| Singular matrix | has eigenvalue 0 |
| Real symmetric | real eigenvalues, orthogonal eigenvectors, always diagonalisable |
| Orthogonal matrix | $\lvert\lambda\rvert = 1$ |
| Idempotent ($A^2 = A$) / nilpotent | eigenvalues 0 or 1 / only 0 |

- **Cayley–Hamilton:** every square matrix satisfies its own characteristic equation (useful for $A^{-1}$ and high powers).
- Eigenvectors for distinct eigenvalues are linearly independent; $A$ is diagonalisable iff it has $n$ independent eigenvectors (geometric = algebraic multiplicity for every eigenvalue).

> [!EXAMPLE] 
> $A = \begin{pmatrix} 2 & 1 \\ 1 & 2 \end{pmatrix}$: $\lambda^2 - 4\lambda + 3 = 0$, so $\lambda = 1, 3$, with eigenvectors $(1, -1)$ and $(1, 1)$. Eigenvalues of $A^2 + I$: $2$ and $10$.

> [!TRAP] Rank from eigenvalues
> The number of non-zero eigenvalues equals the rank only for diagonalisable matrices. $\begin{pmatrix}0&1\\0&0\end{pmatrix}$ has both eigenvalues 0 but rank 1.

> [!RECALL] A $3 \times 3$ matrix has eigenvalues 1, 2, 3. What are $\det A$ and $\operatorname{tr}(A^{-1})$?
> $\det A = 6$; $\operatorname{tr}(A^{-1}) = 1 + \tfrac12 + \tfrac13 = \tfrac{11}{6}$.

## LU decomposition

**Priority A** · last 10 papers: 29 marks, asked in 10 (for Linear Algebra as a whole) · learn by solving · practise: [37 questions from 2007–2023 →](#/subjects/em/pyq?topic=la&years=pre2024)

Write $A = LU$ with $L$ lower and $U$ upper triangular, then solve $Ly = b$ (forward substitution) and $Ux = y$ (back substitution). **Doolittle** puts 1s on the diagonal of $L$; **Crout** puts them on $U$. Without row exchanges the factorisation exists when all leading principal minors are non-zero.

> [!EXAMPLE]
> $A = \begin{pmatrix} 2 & 3 \\ 4 & 7 \end{pmatrix}$: multiplier $\ell_{21} = 4/2 = 2$; $u_{22} = 7 - 2 \cdot 3 = 1$. So $L = \begin{pmatrix} 1 & 0 \\ 2 & 1 \end{pmatrix}$, $U = \begin{pmatrix} 2 & 3 \\ 0 & 1 \end{pmatrix}$.

> [!RECALL] In Doolittle's LU method, which factor has a unit diagonal?
> $L$.

## Limits, continuity and differentiability

**Priority A** · last 10 papers: 15 marks, asked in 10 (for Calculus as a whole) · learn by solving · practise: [30 questions from 2007–2023 →](#/subjects/em/pyq?topic=calc&years=pre2024)

| Standard limit | Value |
|---|---|
| $\lim_{x\to0} \frac{\sin x}{x}$ | 1 |
| $\lim_{x\to0} \frac{1 - \cos x}{x^2}$ | $\tfrac12$ |
| $\lim_{x\to0} (1 + x)^{1/x}$ | $e$ |
| $\lim_{x\to0} \frac{a^x - 1}{x}$ | $\ln a$ |
| $\lim_{x\to\infty} \left(1 + \frac{a}{x}\right)^{x}$ | $e^a$ |

- **L'Hôpital:** for $\frac00$ or $\frac{\infty}{\infty}$, $\lim \frac{f}{g} = \lim \frac{f'}{g'}$. Rewrite $0 \cdot \infty$, $1^\infty$, $0^0$, $\infty^0$ forms first (take logs).
- $f$ is continuous at $a$ iff the left limit, right limit and $f(a)$ all agree.
- Differentiable ⟹ continuous, not conversely: $\lvert x \rvert$ is continuous but not differentiable at 0.

> [!RECALL] Evaluate $\lim_{x\to0} \frac{e^x - 1 - x}{x^2}$.
> L'Hôpital twice: $\frac{e^x}{2} \to \frac12$.

## Maxima and minima

**Priority A** · last 10 papers: 15 marks, asked in 10 (for Calculus as a whole) · learn by solving · practise: [30 questions from 2007–2023 →](#/subjects/em/pyq?topic=calc&years=pre2024)

**One variable:** critical points where $f'(x) = 0$ or $f'$ does not exist; $f'' < 0$ means a local maximum, $f'' > 0$ a local minimum. On a closed interval also check the **endpoints**.

**Two variables:** at a point with $f_x = f_y = 0$, let $r = f_{xx}$, $s = f_{xy}$, $t = f_{yy}$:

| Condition | Point is |
|---|---|
| $rt - s^2 > 0$, $r < 0$ | maximum |
| $rt - s^2 > 0$, $r > 0$ | minimum |
| $rt - s^2 < 0$ | saddle point |
| $rt - s^2 = 0$ | test fails |

> [!EXAMPLE]
> $f(x) = x^3 - 3x$ on $[-2, 2]$: $f'(x) = 3x^2 - 3 = 0$ at $x = \pm1$. Values: $f(-2) = -2$, $f(-1) = 2$, $f(1) = -2$, $f(2) = 2$. Global maximum 2, global minimum −2.

> [!TRAP] Forgetting the endpoints
> The largest value on a closed interval can sit at an endpoint where $f' \ne 0$.

> [!RECALL] What does $rt - s^2 < 0$ say about a critical point of $f(x, y)$?
> It is a saddle point.

## Mean value theorems

**Priority A** · last 10 papers: 15 marks, asked in 10 (for Calculus as a whole) · learn by solving · practise: [30 questions from 2007–2023 →](#/subjects/em/pyq?topic=calc&years=pre2024)

| Theorem | Hypothesis | Conclusion |
|---|---|---|
| Rolle | $f$ continuous on $[a,b]$, differentiable on $(a,b)$, $f(a) = f(b)$ | some $c \in (a,b)$ has $f'(c) = 0$ |
| Lagrange (MVT) | continuous on $[a,b]$, differentiable on $(a,b)$ | $f'(c) = \dfrac{f(b) - f(a)}{b - a}$ |
| Cauchy | $f, g$ as above, $g' \ne 0$ | $\dfrac{f'(c)}{g'(c)} = \dfrac{f(b) - f(a)}{g(b) - g(a)}$ |

> [!RECALL] Find $c$ from the mean value theorem for $f(x) = x^2$ on $[1, 3]$.
> $2c = \frac{9 - 1}{2} = 4$, so $c = 2$.

## Integration

**Priority A** · last 10 papers: 15 marks, asked in 10 (for Calculus as a whole) · learn by solving · practise: [30 questions from 2007–2023 →](#/subjects/em/pyq?topic=calc&years=pre2024)

| Property | Statement |
|---|---|
| Symmetry | $\int_0^a f(x)\,dx = \int_0^a f(a - x)\,dx$ |
| Odd function | $\int_{-a}^{a} f = 0$ |
| Even function | $\int_{-a}^{a} f = 2\int_0^a f$ |
| By parts | $\int u\,dv = uv - \int v\,du$ |
| Wallis | $\int_0^{\pi/2} \sin^n x\,dx = \frac{n-1}{n}\cdot\frac{n-3}{n-2}\cdots \times \left(\frac{\pi}{2} \text{ if } n \text{ even, } 1 \text{ if odd}\right)$ |
| Improper | $\int_1^\infty x^{-p}\,dx$ converges iff $p > 1$; $\int_0^1 x^{-p}\,dx$ converges iff $p < 1$ |
| Gaussian | $\int_{-\infty}^{\infty} e^{-x^2}\,dx = \sqrt{\pi}$ |

> [!EXAMPLE]
> $\int_0^{\pi/2} \sin^4 x\,dx = \frac34 \cdot \frac12 \cdot \frac{\pi}{2} = \frac{3\pi}{16}$. And $\int_0^{\pi} x \sin x\,dx = [-x\cos x + \sin x]_0^{\pi} = \pi$.

> [!RECALL] What is $\int_0^{\pi/2} \frac{\sin x}{\sin x + \cos x}\,dx$?
> $\frac{\pi}{4}$: adding it to the same integral with $x \to \frac{\pi}{2} - x$ gives $\frac{\pi}{2}$.

## Probability basics

**Priority A** · last 10 papers: 34 marks, asked in 9 (for Probability & Statistics as a whole) · learn by solving · practise: [37 questions from 2007–2023 →](#/subjects/em/pyq?topic=prob&years=pre2024)

- $P(A \cup B) = P(A) + P(B) - P(A \cap B)$; $P(A^c) = 1 - P(A)$.
- **Conditional:** $P(A \mid B) = \dfrac{P(A \cap B)}{P(B)}$.
- **Independent:** $P(A \cap B) = P(A)P(B)$. Mutually exclusive events with non-zero probabilities are **never** independent.
- **Total probability:** $P(B) = \sum_i P(B \mid A_i)\,P(A_i)$ for a partition $\{A_i\}$.
- **Bayes:** $P(A_j \mid B) = \dfrac{P(B \mid A_j)\,P(A_j)}{\sum_i P(B \mid A_i)\,P(A_i)}$.

> [!EXAMPLE] Bayes with a medical test
> Prevalence 1%, sensitivity 99%, false-positive rate 5%. $P(\text{ill} \mid +) = \frac{0.99 \times 0.01}{0.99 \times 0.01 + 0.05 \times 0.99} = \frac{0.0099}{0.0594} = \frac16 \approx 0.167$.

> [!TRAP] Base rates
> A highly accurate test for a rare condition still gives mostly false positives. Always weight by the prior.

> [!RECALL] Two fair dice are rolled. Given that the sum is 8, what is the probability that one die shows 3?
> Outcomes with sum 8: (2,6), (3,5), (4,4), (5,3), (6,2). Two contain a 3: $\frac25$.

## Random variables and distributions

**Priority A** · last 10 papers: 34 marks, asked in 9 (for Probability & Statistics as a whole) · learn by solving · practise: [37 questions from 2007–2023 →](#/subjects/em/pyq?topic=prob&years=pre2024)

$E[aX + b] = aE[X] + b$; $\operatorname{Var}(aX + b) = a^2 \operatorname{Var}(X)$; $\operatorname{Var}(X) = E[X^2] - (E[X])^2$. Expectation is always linear: $E[X + Y] = E[X] + E[Y]$ even for dependent variables. $\operatorname{Var}(X + Y) = \operatorname{Var}X + \operatorname{Var}Y$ needs independence (or zero covariance).

| Distribution | PMF / PDF | Mean | Variance |
|---|---|---|---|
| Discrete uniform on $1..n$ | $\frac1n$ | $\frac{n+1}{2}$ | $\frac{n^2 - 1}{12}$ |
| Bernoulli($p$) | $p^x(1-p)^{1-x}$ | $p$ | $p(1-p)$ |
| Binomial($n, p$) | $\binom{n}{k} p^k (1-p)^{n-k}$ | $np$ | $np(1-p)$ |
| Geometric($p$), trials to first success | $(1-p)^{k-1} p$ | $\frac1p$ | $\frac{1-p}{p^2}$ |
| Poisson($\lambda$) | $\frac{e^{-\lambda}\lambda^k}{k!}$ | $\lambda$ | $\lambda$ |
| Uniform($a, b$) | $\frac{1}{b-a}$ | $\frac{a+b}{2}$ | $\frac{(b-a)^2}{12}$ |
| Exponential($\lambda$) | $\lambda e^{-\lambda x}$ | $\frac1\lambda$ | $\frac{1}{\lambda^2}$ |
| Normal($\mu, \sigma^2$) | $\frac{1}{\sigma\sqrt{2\pi}} e^{-\frac{(x-\mu)^2}{2\sigma^2}}$ | $\mu$ | $\sigma^2$ |

- **Exponential** is memoryless: $P(X > s + t \mid X > s) = P(X > t) = e^{-\lambda t}$.
- **Poisson** approximates Binomial($n, p$) with $\lambda = np$ for large $n$, small $p$.
- **Normal:** standardise with $Z = \frac{X - \mu}{\sigma}$; about 68%, 95% and 99.7% of the mass lies within 1, 2 and 3 standard deviations. The sum of independent normals is normal.
- A PDF must integrate to 1: use that to find unknown constants.

> [!EXAMPLE] Variance of a die
> $E[X] = 3.5$, $E[X^2] = \frac{91}{6}$, so $\operatorname{Var}(X) = \frac{91}{6} - \frac{49}{4} = \frac{35}{12}$.

> [!RECALL] Mean and variance of Poisson($\lambda = 4$)?
> Both are 4.

> [!RECALL] A bulb's life is exponential with mean 1000 hours. It has worked 500 hours; probability it lasts 1000 more?
> Memoryless: $e^{-1000/1000} = e^{-1} \approx 0.368$.

## Descriptive statistics

**Priority A** · last 10 papers: 34 marks, asked in 9 (for Probability & Statistics as a whole) · learn by solving · practise: [37 questions from 2007–2023 →](#/subjects/em/pyq?topic=prob&years=pre2024)

- **Mean** $\bar x = \frac{1}{n}\sum x_i$; **median** is the middle value of the sorted data (average of the two middle values for even $n$); **mode** is the most frequent value.
- **Standard deviation** $\sigma = \sqrt{\frac1n \sum (x_i - \bar x)^2}$ (population). Sample s.d. divides by $n - 1$.
- Adding a constant $c$ to every value shifts the mean, median and mode by $c$ and leaves the s.d. unchanged; multiplying by $k$ multiplies all of them (s.d. by $\lvert k \rvert$).
- Empirical relation for moderately skewed data: mode $\approx 3\,$median $- 2\,$mean.

> [!RECALL] Each mark in a test is increased by 5. What happens to the mean and the standard deviation?
> The mean rises by 5; the standard deviation is unchanged.
