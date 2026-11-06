# Engineering Mathematics: formulae

Revision sheet. Explanations and examples are in the [notes](#/subjects/em/notes).

## Linear algebra

| Quantity | Formula |
|---|---|
| $\det(AB)$, $\det(A^T)$, $\det(kA)$ | $\det A \det B$; $\det A$; $k^n \det A$ |
| $A^{-1}$ | $\operatorname{adj}A / \det A$ |
| $\det(\operatorname{adj}A)$ | $(\det A)^{n-1}$ |
| Rank–nullity | $\operatorname{rank} + \operatorname{nullity} = n$ (columns) |
| $Ax = b$ consistent | $\operatorname{rank}A = \operatorname{rank}[A\mid b]$ |
| Unique solution | rank $= n$ |
| Free variables | $n - \operatorname{rank}$ |
| Homogeneous non-trivial solution | $\det A = 0$ (square) |
| Sum / product of eigenvalues | trace / determinant |
| $2\times2$ characteristic equation | $\lambda^2 - (\operatorname{tr}A)\lambda + \det A = 0$ |
| Eigenvalues of $A^k$, $A^{-1}$, $A + kI$, $kA$ | $\lambda^k$, $1/\lambda$, $\lambda + k$, $k\lambda$ |
| Real symmetric | real $\lambda$, orthogonal eigenvectors |
| Cayley–Hamilton | $p_A(A) = 0$ |
| Doolittle / Crout | unit diagonal in $L$ / in $U$ |

## Calculus

| Quantity | Formula |
|---|---|
| $\lim \frac{\sin x}{x}$, $\lim \frac{1-\cos x}{x^2}$ | 1, $\frac12$ ($x \to 0$) |
| $\lim (1+x)^{1/x}$ ($x\to0$) | $e$ |
| $\lim \frac{a^x - 1}{x}$ ($x\to0$) | $\ln a$ |
| L'Hôpital | $\lim \frac fg = \lim \frac{f'}{g'}$ for $\frac00, \frac\infty\infty$ |
| Max/min (1 variable) | $f' = 0$; $f'' < 0$ max, $> 0$ min; check endpoints |
| Max/min (2 variables) | $rt - s^2 > 0$: max if $r<0$, min if $r>0$; $<0$ saddle |
| Rolle | $f(a) = f(b) \Rightarrow f'(c) = 0$ |
| Lagrange MVT | $f'(c) = \frac{f(b)-f(a)}{b-a}$ |
| Cauchy MVT | $\frac{f'(c)}{g'(c)} = \frac{f(b)-f(a)}{g(b)-g(a)}$ |
| $\int_0^a f(x)\,dx$ | $\int_0^a f(a-x)\,dx$ |
| Odd / even on $[-a, a]$ | $0$ / $2\int_0^a f$ |
| By parts | $\int u\,dv = uv - \int v\,du$ |
| Wallis $\int_0^{\pi/2}\sin^n x\,dx$ | $\frac{n-1}{n}\frac{n-3}{n-2}\cdots\left(\frac\pi2 \text{ even}, 1 \text{ odd}\right)$ |
| $\int_1^\infty x^{-p}dx$ | converges iff $p > 1$ |
| $\int_{-\infty}^\infty e^{-x^2}dx$ | $\sqrt\pi$ |

## Probability

| Quantity | Formula |
|---|---|
| Union | $P(A)+P(B)-P(A\cap B)$ |
| Conditional | $P(A\mid B) = \frac{P(A\cap B)}{P(B)}$ |
| Independence | $P(A\cap B) = P(A)P(B)$ |
| Total probability | $\sum_i P(B\mid A_i)P(A_i)$ |
| Bayes | $\frac{P(B\mid A_j)P(A_j)}{\sum_i P(B\mid A_i)P(A_i)}$ |
| Variance | $E[X^2] - E[X]^2$ |
| Linear transform | $E[aX+b] = aE[X]+b$, $\operatorname{Var}(aX+b) = a^2\operatorname{Var}X$ |
| Sum (independent) | $\operatorname{Var}(X+Y) = \operatorname{Var}X + \operatorname{Var}Y$ |

## Distributions

| Distribution | Mean | Variance |
|---|---|---|
| Uniform $1..n$ | $\frac{n+1}{2}$ | $\frac{n^2-1}{12}$ |
| Bernoulli($p$) | $p$ | $p(1-p)$ |
| Binomial($n,p$) | $np$ | $np(1-p)$ |
| Geometric($p$) | $\frac1p$ | $\frac{1-p}{p^2}$ |
| Poisson($\lambda$) | $\lambda$ | $\lambda$ |
| Uniform($a,b$) | $\frac{a+b}2$ | $\frac{(b-a)^2}{12}$ |
| Exponential($\lambda$) | $\frac1\lambda$ | $\frac1{\lambda^2}$; $P(X>t) = e^{-\lambda t}$ |
| Normal($\mu,\sigma^2$) | $\mu$ | $\sigma^2$; $Z = \frac{X-\mu}{\sigma}$ |
| Normal coverage | 68%, 95%, 99.7% within $1\sigma, 2\sigma, 3\sigma$ | |

## Statistics

| Quantity | Formula |
|---|---|
| Mean | $\bar x = \frac1n\sum x_i$ |
| Population s.d. | $\sqrt{\frac1n\sum(x_i-\bar x)^2}$ |
| Sample s.d. | divide by $n-1$ |
| Empirical relation | mode $\approx 3$ median $- 2$ mean |
| Add $c$ / multiply by $k$ | centre shifts by $c$, s.d. same / everything scales by $k$ (s.d. by $\lvert k\rvert$) |
