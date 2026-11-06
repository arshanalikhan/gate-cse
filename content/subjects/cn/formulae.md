# Computer Networks: formulae

Revision sheet. Explanations and worked examples are in the [notes](#/subjects/cn/notes).

## Delay and throughput

| Quantity | Formula |
|---|---|
| Transmission delay | $L / R$ |
| Propagation delay | $d / s$ |
| Nodal delay | processing + queuing + transmission + propagation |
| Store-and-forward, $N$ links, 1 packet | $N \cdot L/R$ (+ propagation) |
| $P$ packets over $N$ links | $(N + P - 1)\,L/R$ |
| Bandwidth–delay product | $R \times d_{prop}$ |
| Path throughput | bottleneck link rate |
| Traffic intensity | $La/R$ (keep below 1) |

## Sliding window

With $a = T_p / T_t$:

| Quantity | Formula |
|---|---|
| Stop-and-wait efficiency | $\dfrac{1}{1 + 2a}$ |
| Window-$N$ efficiency | $\min\left(1, \dfrac{N}{1 + 2a}\right)$ |
| Window for full utilisation | $1 + 2a$ |
| Throughput | efficiency $\times R$ |
| GBN window with $k$-bit sequence numbers | $\le 2^k - 1$ |
| SR window with $k$-bit sequence numbers | $\le 2^{k-1}$ |
| Sequence bits needed | GBN $\lceil \log_2(N + 1) \rceil$; SR $\lceil \log_2 2N \rceil$ |

## Error detection

| Quantity | Formula |
|---|---|
| Hamming distance $d$ | detects $d - 1$, corrects $\lfloor (d-1)/2 \rfloor$ errors |
| Hamming check bits for $m$ data bits | smallest $r$ with $2^r \ge m + r + 1$ |
| CRC degree $r$ | detects bursts $\le r$; odd errors if $(x+1)$ divides $G$ |
| CRC transmitted frame | data $\cdot\, 2^r$ + remainder of (data $\cdot\, 2^r$) mod $G$ |

## Medium access

| Quantity | Formula |
|---|---|
| Pure ALOHA throughput | $S = Ge^{-2G}$, max $\frac{1}{2e} \approx 0.184$ |
| Slotted ALOHA throughput | $S = Ge^{-G}$, max $\frac1e \approx 0.368$ |
| CSMA/CD minimum frame | $L_{min} = 2\,T_p\,R$ |
| Backoff after $n$-th collision | $K \in \{0, \dots, 2^{\min(n,10)} - 1\}$, wait $512K$ bit times |
| Ethernet frame | 64 to 1518 bytes; payload 46 to 1500 |

## IPv4

| Quantity | Formula |
|---|---|
| Addresses in /$n$ | $2^{32-n}$ |
| Usable hosts | $2^{32-n} - 2$ |
| Mask for /$n$ | $n$ ones followed by $32 - n$ zeros |
| Subnets from $s$ borrowed bits | $2^s$ |
| Forwarding | longest prefix match |
| Private blocks | 10/8, 172.16/12, 192.168/16 |
| Header | 20 to 60 bytes |
| Fragment data size | $\lfloor (MTU - h)/8 \rfloor \times 8$ |
| Fragment offset | data bytes before it $/ 8$ |
| MF flag | 1 on every fragment except the last |

## Routing

| Quantity | Formula |
|---|---|
| Distance vector update | $D_x(y) = \min_v \{c(x,v) + D_v(y)\}$ |
| Link state | flood link costs, run Dijkstra |
| Count-to-infinity | distance vector only |

## TCP

| Quantity | Formula |
|---|---|
| Effective window | $\min(\text{cwnd}, \text{rwnd})$ |
| Throughput | window / RTT |
| Slow start | cwnd doubles per RTT until ssthresh |
| Congestion avoidance | cwnd $+1$ MSS per RTT |
| Timeout | ssthresh $=$ cwnd/2, cwnd $= 1$ MSS |
| 3 duplicate ACKs (Reno) | ssthresh $=$ cwnd/2, cwnd $=$ ssthresh |
| RTT estimate | $(1-\alpha)\,\text{Est} + \alpha\,\text{Sample}$, $\alpha = 0.125$ |
| Timeout interval | EstimatedRTT $+ 4 \times$ DevRTT |
| Wrap-around time | $2^{32} / \text{bytes per second}$ |
| SYN, FIN | each consumes one sequence number |

## HTTP page-load time

Base page plus $n$ small objects:

| Connection | Time |
|---|---|
| Non-persistent, serial | $2(n+1)$ RTT |
| Persistent, no pipelining | $(2 + n)$ RTT |
| Persistent, pipelined | $3$ RTT |

## Ports and sockets

| Item | Value |
|---|---|
| HTTP / HTTPS / DNS | 80 / 443 / 53 |
| TCP server calls | `socket`, `bind`, `listen`, `accept`, `recv`/`send`, `close` |
| TCP client calls | `socket`, `connect`, `send`/`recv`, `close` |
| Connection identity | (src IP, src port, dst IP, dst port) |
