# Computer Networks: notes

Exam-focused notes for GATE 2027 Section 10, which was trimmed this year: UDP, ARP, DHCP, ICMP, SMTP, FTP and email are no longer listed, while switching performance metrics and the socket API were added. IPv4/CIDR and TCP remain the two biggest topics.

## Principles of layering

**Priority C** (skim) · last 10 papers: 2 marks, asked in 2 · learn by recall cards · practise: [5 questions from 2007–2023 →](#/subjects/cn/pyq?topic=layer&years=pre2024)

**Key idea:** each layer offers a service to the layer above using only the service of the layer below; each adds its own header (**encapsulation**) and talks to its peer layer on the other host through a protocol.

| TCP/IP layer | OSI equivalent | Unit | Example protocols | Device |
|---|---|---|---|---|
| Application | Application, presentation, session | Message | HTTP, DNS | Host |
| Transport | Transport | Segment | TCP | Host |
| Network | Network | Datagram (packet) | IPv4 | Router |
| Link | Data link | Frame | Ethernet | Switch |
| Physical | Physical | Bit | | Hub, repeater |

- Routers process up to the network layer, switches up to the link layer, hubs only the physical layer.
- Flow and error control can exist at several layers (link and transport); routing exists only at the network layer.

> [!RECALL] Which layer's header contains the port numbers, and which contains the TTL?
> - [x] Transport for ports; network for TTL
> - [ ] Data link for ports; network for TTL
> - [ ] Both in the network layer
> - [ ] Network for ports; transport for TTL
>
> Transport (TCP) for ports; network (IP) for TTL.

## Switching and performance metrics

**Priority B** · last 10 papers: 5 marks, asked in 3 · learn by solving · practise: [5 questions from 2007–2023 →](#/subjects/cn/pyq?topic=delay&years=pre2024)

| | Circuit switching | Packet switching (datagram) | Virtual circuit |
|---|---|---|---|
| Setup | Yes, reserves resources | No | Yes, path fixed, resources usually not reserved |
| Path per packet | Fixed | Can differ; may arrive out of order | Fixed; in order |
| Header | — | Full destination address | Short VC identifier |
| Waste | Idle reserved capacity | Queuing delay, loss | |

**Delay components** for one packet of $L$ bits on one link of rate $R$, length $d$, propagation speed $s$:

$$d_{trans} = \frac{L}{R}, \qquad d_{prop} = \frac{d}{s}, \qquad d_{nodal} = d_{proc} + d_{queue} + d_{trans} + d_{prop}$$

- **Store-and-forward** over $N$ links: one packet takes $N \cdot \frac{L}{R}$ (plus propagation). $P$ packets back to back take $(N + P - 1)\frac{L}{R}$.
- **Throughput** of a path = rate of its bottleneck link.
- **Bandwidth–delay product** $R \times d_{prop}$ = bits "in flight" on the link.
- Traffic intensity $\frac{La}{R}$ (packet arrival rate $a$): queuing delay grows without bound as it approaches 1.

> [!EXAMPLE] Splitting a message into packets
> A 3 Mb message crosses 3 links of 1 Mbps (2 routers). Sent whole: $3 \times 3 = 9$ s. Split into 3 packets of 1 Mb: $(3 + 3 - 1) \times 1 = 5$ s. Pipelining across links is why packet switching wins.

> [!RECALL] What limits the end-to-end throughput of a path of links?
> - [ ] The average of the link rates
> - [ ] The fastest link
> - [x] The slowest (bottleneck) link
> - [ ] The sum of the link rates
>
> The slowest (bottleneck) link.

## Flow control and sliding window

**Priority B** · last 10 papers: 9 marks, asked in 5 · learn by solving · practise: [11 questions from 2007–2023 →](#/subjects/cn/pyq?topic=sw&years=pre2024)

Let $T_t = L/R$ (frame transmission time), $T_p$ = propagation delay, $a = T_p / T_t$. Ignore ACK transmission time unless given.

| Protocol | Sender window | Receiver window | Efficiency | Sequence numbers with $k$ bits |
|---|---|---|---|---|
| Stop-and-wait | 1 | 1 | $\dfrac{1}{1 + 2a}$ | 1 bit suffices |
| Go-Back-N | $N$ | 1 | $\min\left(1, \dfrac{N}{1+2a}\right)$ | $N \le 2^k - 1$ |
| Selective Repeat | $N$ | $N$ | $\min\left(1, \dfrac{N}{1+2a}\right)$ | $N \le 2^{k-1}$ |

Full utilisation needs $N \ge 1 + 2a$. Throughput $= \eta \times R$. On an error, GBN resends the lost frame **and every frame after it**; SR resends only the lost one.

> [!EXAMPLE] Window and sequence bits
> 1 Mbps link, 1000-bit frames, 10 ms propagation: $T_t = 1$ ms, $a = 10$. Stop-and-wait efficiency $= 1/21 \approx 4.8\%$. Full utilisation needs a window of 21: GBN needs $2^k - 1 \ge 21$, so $k = 5$ bits; SR needs $2^{k-1} \ge 21$, so $k = 6$ bits.

> [!RECALL] Why must the Selective Repeat window be at most half the sequence space?
> - [ ] To keep utilisation at 50%
> - [ ] Because the sender buffer is half the size
> - [x] Otherwise retransmitted old frames could be accepted as new ones
> - [ ] To halve the number of ACKs
>
> Otherwise, if all ACKs are lost, retransmitted old frames carry numbers the receiver now expects as new frames and wrongly accepts them.

## Error detection

**Priority B** · last 10 papers: 6 marks, asked in 3 · learn by solving · practise: [6 questions from 2007–2023 →](#/subjects/cn/pyq?topic=dll&years=pre2024)

| Method | Detects |
|---|---|
| Single parity bit | all odd numbers of bit errors |
| 2-D parity | all 1-, 2-, 3-bit errors; corrects single-bit errors |
| Internet checksum | one's-complement sum of 16-bit words, then complemented |
| CRC with a degree-$r$ generator | all single-bit errors, all bursts of length $\le r$, all odd-count errors if $(x + 1)$ divides the generator |

**CRC procedure:** append $r$ zeros to the data, divide by the generator using XOR (modulo-2) long division, and replace the zeros with the $r$-bit remainder. The receiver divides the whole frame; a zero remainder means "no error detected".

**Hamming distance** $d$ of a code: it detects up to $d - 1$ errors and corrects up to $\lfloor (d - 1)/2 \rfloor$. A single-error-correcting Hamming code for $m$ data bits needs $r$ check bits with $2^r \ge m + r + 1$.

> [!EXAMPLE] CRC
> Data 1101011011, generator 10011 ($x^4 + x + 1$). Divide 1101011011**0000** by 10011: remainder 1110. Transmit 11010110111110.

> [!RECALL] How many check bits does a Hamming code need for 8 data bits?
> - [ ] 8
> - [ ] 3
> - [x] 4
> - [ ] 5
>
> 4, since $2^4 = 16 \ge 8 + 4 + 1$.

## Medium access control and Ethernet

**Priority B** · last 10 papers: 4 marks, asked in 2 · learn by solving + recall cards · practise: [13 questions from 2007–2023 →](#/subjects/cn/pyq?topic=mac&years=pre2024)

**Random access**

| Protocol | Maximum throughput |
|---|---|
| Pure ALOHA | $\frac{1}{2e} \approx 18.4\%$ at offered load $G = 0.5$ ($S = Ge^{-2G}$) |
| Slotted ALOHA | $\frac1e \approx 36.8\%$ at $G = 1$ ($S = Ge^{-G}$) |

**CSMA/CD (classic Ethernet):** listen before sending, abort on collision. To detect every collision the sender must still be transmitting after a round trip:

$$T_t \ge 2T_p \quad\Longrightarrow\quad L_{min} = 2 \times T_p \times R$$

Efficiency falls as $a = T_p/T_t$ grows (long cables, fast links, short frames).

**Binary exponential backoff:** after the $n$-th collision, pick $K$ uniformly from $\{0, \dots, 2^{\min(n, 10)} - 1\}$ and wait $K \times 512$ bit times.

**Ethernet facts:** 48-bit MAC addresses; frame 64–1518 bytes (header + CRC, no preamble); payload 46–1500 bytes; switches learn source addresses and forward by destination (flood if unknown).

**Controlled access:** token passing and polling avoid collisions at the cost of token/poll overhead. Wireless LANs use CSMA/CA because a radio cannot detect collisions while sending.

> [!EXAMPLE] Minimum frame size
> 10 Mbps, 2.5 km cable, signal speed $2 \times 10^8$ m/s: $T_p = 12.5\,\mu$s, so $L_{min} = 2 \times 12.5 \times 10^{-6} \times 10^7 = 250$ bits.

> [!RECALL] Maximum throughput of slotted ALOHA, and at what load?
> - [ ] $1/e$ at $G = 0.5$
> - [ ] $1/(2e) \approx 0.184$ at $G = 0.5$
> - [x] $1/e \approx 0.368$ at $G = 1$
> - [ ] $0.5$ at $G = 1$
>
> $1/e \approx 0.368$ at $G = 1$ frame per slot.

## Routing

**Priority B** · last 10 papers: 6 marks, asked in 4 · learn by solving + recall cards · practise: [8 questions from 2007–2023 →](#/subjects/cn/pyq?topic=routing&years=pre2024)

| | Distance vector | Link state |
|---|---|---|
| Knowledge | Each router knows only its neighbours' distance vectors | Each router learns the full topology (flooded link-state packets) |
| Computation | Bellman–Ford: $D_x(y) = \min_v \{c(x, v) + D_v(y)\}$ | Dijkstra on the full graph |
| Convergence | Slow; **count-to-infinity** after link failures | Fast |
| Message cost | Small, to neighbours only | Flooding to all routers |
| Example | RIP | OSPF |

**Count-to-infinity** happens when a link fails and two neighbours keep advertising stale routes through each other; split horizon and poisoned reverse remove the two-node loops but not longer ones.

> [!EXAMPLE] One distance-vector update
> Router A has neighbours B (cost 2) and C (cost 5). B reports $D_B(X) = 4$, C reports $D_C(X) = 1$. Then $D_A(X) = \min(2 + 4, 5 + 1) = 6$, via either neighbour.

> [!RECALL] Which routing approach suffers from count-to-infinity?
> - [ ] Link state
> - [x] Distance vector
> - [ ] Flooding
> - [ ] Path vector (BGP)
>
> Distance vector.

## IPv4 addressing and CIDR

**Priority A** · last 10 papers: 16 marks, asked in 8 · learn by solving · practise: [21 questions from 2007–2023 →](#/subjects/cn/pyq?topic=ip&years=pre2024)

An IPv4 address is 32 bits. In CIDR notation $a.b.c.d/n$, the first $n$ bits are the network prefix.

| Quantity | Formula |
|---|---|
| Addresses in a /$n$ block | $2^{32-n}$ |
| Usable hosts | $2^{32-n} - 2$ (network and broadcast addresses excluded) |
| Network address | host bits all 0 |
| Broadcast address | host bits all 1 |
| Subnets from borrowing $s$ bits | $2^s$ |

Old classes for reference: A 0.0.0.0–127.255.255.255 (/8), B 128–191 (/16), C 192–223 (/24), D 224–239 (multicast). Private ranges: 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16.

**Forwarding uses longest-prefix match:** among all table entries matching the destination, choose the one with the longest prefix.

> [!EXAMPLE] A /18 block
> 200.10.64.0/18: mask 255.255.192.0; the third octet moves in blocks of 64, so the block is 200.10.64.0 – 200.10.127.255. Usable hosts $2^{14} - 2 = 16382$.

> [!EXAMPLE] Longest-prefix match
> Table: 10.0.0.0/8 → A, 10.1.0.0/16 → B, 10.1.2.0/24 → C. Destination 10.1.2.5 → C; 10.1.9.9 → B; 10.200.0.1 → A.

> [!TRAP] An address ending in .255 is not always a broadcast address
> With /20 the third octet moves in blocks of 16, so 172.16.40.255/20 lies in the block 172.16.32.0 – 172.16.47.255. It is an ordinary host address; the block's broadcast address is 172.16.47.255. Always find the block boundaries first.

> [!RECALL] How many usable host addresses does a /27 have?
> - [ ] 32
> - [ ] 62
> - [x] 30
> - [ ] 14
>
> $2^5 - 2 = 30$.

## IPv4 fragmentation

**Priority B** · last 10 papers: 8 marks, asked in 5 · learn by solving · practise: [6 questions from 2007–2023 →](#/subjects/cn/pyq?topic=frag&years=pre2024)

The IPv4 header is 20 bytes (up to 60 with options). Relevant fields: identification, flags (**DF** don't fragment, **MF** more fragments), **fragment offset** in units of 8 bytes, TTL, protocol, header checksum.

Fragmenting a datagram for a link with MTU $M$ and header $h$:

- data per fragment $= \left\lfloor \frac{M - h}{8} \right\rfloor \times 8$ (every fragment except the last carries a multiple of 8 data bytes);
- offset of a fragment $= \frac{\text{bytes of data before it}}{8}$;
- MF = 1 on all fragments except the last; reassembly happens only at the destination.

> [!EXAMPLE] 4000-byte datagram, MTU 1500
> Data = 3980 bytes, header 20. Each fragment carries at most 1480 data bytes: fragments of 1480, 1480 and 1020 bytes of data; total lengths 1500, 1500, 1040; offsets 0, 185, 370; MF = 1, 1, 0.

> [!RECALL] A fragment has offset 100 and MF = 0. What do you know?
> - [ ] It is the first fragment and more follow
> - [x] It is the last fragment; 800 bytes of data came before it
> - [ ] It is the last fragment; 100 bytes came before it
> - [ ] It is a middle fragment; 800 bytes came before it
>
> It is the last fragment, and 800 bytes of data came before it.

## Network address translation

**Priority C** (skim) · last 10 papers: 4 marks, asked in 4 · learn by recall cards · practise: [3 questions from 2007–2023 →](#/subjects/cn/pyq?topic=support&years=pre2024)

A NAT router lets many hosts with private addresses share one public address. Outgoing packets get their (private IP, port) replaced by (public IP, new port); the NAT table maps replies back. Consequences: hosts behind NAT cannot be reached unless a mapping exists (port forwarding), and NAT violates the end-to-end principle because the router rewrites transport-layer ports.

> [!RECALL] Which header fields does a NAT router rewrite on an outgoing TCP segment?
> - [ ] Only the MAC addresses
> - [x] Source IP address and source port
> - [ ] Destination IP address and destination port
> - [ ] Source IP address only
>
> The source IP address and source port (and therefore the IP and TCP checksums).

## TCP

**Priority A** · last 10 papers: 16 marks, asked in 9 · learn by solving + recall cards · practise: [21 questions from 2007–2023 →](#/subjects/cn/pyq?topic=tcp&years=pre2024)

**Connection management:** three-way handshake SYN → SYN-ACK → ACK. SYN and FIN each consume one sequence number. Sequence numbers count **bytes**; an ACK carries the next byte expected (cumulative).

**Flow control:** the receiver advertises a window (rwnd) so the sender never overruns its buffer.

**Congestion control** (window in MSS units):

| Event | Action |
|---|---|
| Slow start (cwnd < ssthresh) | cwnd doubles every RTT (+1 MSS per ACK) |
| Congestion avoidance (cwnd ≥ ssthresh) | cwnd grows by 1 MSS per RTT |
| Timeout | ssthresh = cwnd/2; cwnd = 1 MSS; slow start again |
| 3 duplicate ACKs (Reno) | ssthresh = cwnd/2; cwnd = ssthresh (fast recovery); Tahoe treats it like a timeout |

The sender's effective window is $\min(\text{cwnd}, \text{rwnd})$; throughput $\approx \frac{\text{window}}{\text{RTT}}$.

**Timers:** $\text{EstimatedRTT} = (1 - \alpha)\,\text{EstimatedRTT} + \alpha\,\text{SampleRTT}$ ($\alpha = 0.125$); $\text{DevRTT} = (1-\beta)\text{DevRTT} + \beta\,\lvert \text{Sample} - \text{Estimated} \rvert$ ($\beta = 0.25$); $\text{Timeout} = \text{EstimatedRTT} + 4\,\text{DevRTT}$. Karn's rule: do not take RTT samples from retransmitted segments.

**Sequence wrap-around:** the 32-bit sequence space wraps after $2^{32}$ bytes, i.e. after $\frac{2^{32}}{\text{bandwidth in bytes/s}}$ seconds.

> [!EXAMPLE] Slow start to congestion avoidance
> MSS = 1 KB, ssthresh = 16 KB, cwnd starts at 1 MSS, no losses. Window per RTT: 1, 2, 4, 8, 16, 17, 18, 19, 20 … After 8 RTTs the window is 20 KB.

> [!TRAP] Bytes or segments
> Read whether windows and thresholds are in bytes or in MSS, and whether the question counts the RTT in which the window *reaches* a value or the one in which it is *used*.

> [!RECALL] What happens to cwnd and ssthresh on a timeout?
> - [x] ssthresh = cwnd/2, cwnd = 1 MSS
> - [ ] ssthresh unchanged, cwnd = 1 MSS
> - [ ] cwnd halves, ssthresh unchanged
> - [ ] ssthresh = cwnd/2, cwnd = ssthresh
>
> ssthresh becomes half the current cwnd, and cwnd drops to 1 MSS (slow start restarts).

> [!RECALL] Maximum throughput with a 64 KB window and a 100 ms RTT?
> - [ ] 320 KB/s ≈ 2.6 Mbps
> - [ ] 6.4 MB/s ≈ 52 Mbps
> - [ ] 64 KB/s ≈ 0.52 Mbps
> - [x] 640 KB/s ≈ 5.2 Mbps
>
> $64 \text{ KB} / 0.1 \text{ s} = 640$ KB/s ≈ 5.2 Mbps.

## Socket API

**Priority B** · not asked in the last 10 papers · learn by recall cards · practise: [3 questions from 2007–2023 →](#/subjects/cn/pyq?topic=udp&years=pre2024)

| Server (TCP) | Client (TCP) |
|---|---|
| `socket()` → `bind()` to a port → `listen()` → `accept()` | `socket()` → `connect()` |
| `accept()` blocks until a client connects and returns a **new** socket for that connection | `connect()` performs the three-way handshake |
| `recv()` / `send()` on the new socket | `send()` / `recv()` |
| `close()` | `close()` |

- `SOCK_STREAM` = TCP (reliable byte stream, no message boundaries); `SOCK_DGRAM` = UDP (datagrams, use `sendto()`/`recvfrom()`, no `listen`/`accept`).
- The listening socket keeps accepting new clients; each `accept()` returns a separate connected socket, which is how one server port serves many clients.
- A TCP connection is identified by the 4-tuple (source IP, source port, destination IP, destination port).

> [!RECALL] Which socket call returns a new socket descriptor on the server side?
> - [x] `accept()`
> - [ ] `listen()`
> - [ ] `connect()`
> - [ ] `bind()`
>
> `accept()`.

## DNS and HTTP

**Priority B** · last 10 papers: 5 marks, asked in 4 · learn by recall cards · practise: [13 questions from 2007–2023 →](#/subjects/cn/pyq?topic=app&years=pre2024)

**DNS** maps names to addresses through a hierarchy: root → top-level domain (TLD) → authoritative servers, with a local resolver that caches answers for their TTL. A **recursive** query asks a server to find the full answer; an **iterative** query returns a referral to the next server. Common records: A (IPv4 address), AAAA (IPv6), NS (name server), CNAME (alias), MX (mail server). DNS normally runs over UDP port 53.

**HTTP** (over TCP, port 80; HTTPS on 443) is stateless request/response; cookies add state. Methods: GET, POST, HEAD, PUT, DELETE. Status codes: 200 OK, 301 Moved Permanently, 304 Not Modified, 404 Not Found, 500 Internal Server Error.

Fetching a page with a base HTML file and $n$ small objects (transmission time ignored):

| Connection type | Time |
|---|---|
| Non-persistent, one at a time | $2\,\text{RTT} \times (n + 1)$ |
| Persistent, no pipelining | $2\,\text{RTT} + n\,\text{RTT}$ |
| Persistent with pipelining | $2\,\text{RTT} + 1\,\text{RTT}$ |

(Add the DNS lookup time if the address is not cached.)

> [!EXAMPLE]
> Base page plus 10 images, RTT 50 ms: non-persistent serial $22 \times 50 = 1100$ ms; persistent without pipelining $12 \times 50 = 600$ ms; with pipelining $3 \times 50 = 150$ ms.

> [!RECALL] Why does each object cost 2 RTTs with non-persistent HTTP?
> - [ ] Two RTTs for the TCP handshake
> - [x] One RTT to open the TCP connection, one for request and response
> - [ ] One RTT for the request, one for the ACK
> - [ ] One RTT for DNS, one for the request
>
> One RTT to open the TCP connection, one for the request and response.
