# Computer Networks

Layering, switching and performance metrics, error detection, medium access and Ethernet, routing, IPv4 with CIDR, fragmentation and NAT, TCP with flow and congestion control, the socket API, DNS and HTTP. Typically 6–10 marks per paper.

<!-- plan:start -->
## Battle plan

Expected **8.1 marks** per paper (6–10 across the 10 papers of 2021–26) · default budget **22 hours** · weeks 9–10 of the [13-week plan](#/strategy?h=the-13-week-plan).

| Priority | Topic | Last 10 papers | Learn by | Study, then practise |
|---|---|---|---|---|
| **A** | TCP & Congestion Control | 16 marks · 9 papers | Both | [TCP](#/subjects/cn/notes?h=tcp) → [21 questions](#/subjects/cn/pyq?topic=tcp&years=pre2024) |
| **A** | IPv4 Addressing, CIDR & Forwarding | 16 marks · 8 papers | Solving | [IPv4 addressing and CIDR](#/subjects/cn/notes?h=ipv4-addressing-and-cidr) → [21 questions](#/subjects/cn/pyq?topic=ip&years=pre2024) |
| **B** | Flow Control & Sliding Window | 9 marks · 5 papers | Solving | [Flow control and sliding window](#/subjects/cn/notes?h=flow-control-and-sliding-window) → [11 questions](#/subjects/cn/pyq?topic=sw&years=pre2024) |
| **B** | IPv4 Fragmentation | 8 marks · 5 papers | Solving | [IPv4 fragmentation](#/subjects/cn/notes?h=ipv4-fragmentation) → [6 questions](#/subjects/cn/pyq?topic=frag&years=pre2024) |
| **B** | Routing (Distance Vector & Link State) | 6 marks · 4 papers | Both | [Routing](#/subjects/cn/notes?h=routing) → [8 questions](#/subjects/cn/pyq?topic=routing&years=pre2024) |
| **B** | Error Detection & Correction | 6 marks · 3 papers | Solving | [Error detection](#/subjects/cn/notes?h=error-detection) → [6 questions](#/subjects/cn/pyq?topic=dll&years=pre2024) |
| **B** | DNS and HTTP (SMTP, FTP, email dropped) | 5 marks · 4 papers | Recall | [DNS and HTTP](#/subjects/cn/notes?h=dns-and-http) → [13 questions](#/subjects/cn/pyq?topic=app&years=pre2024) |
| **B** | Switching and performance metrics (metrics new in 2027) | 5 marks · 3 papers | Solving | [Switching and performance metrics](#/subjects/cn/notes?h=switching-and-performance-metrics) → [5 questions](#/subjects/cn/pyq?topic=delay&years=pre2024) |
| **B** | MAC and Ethernet (bridging dropped) | 4 marks · 2 papers | Both | [Medium access control and Ethernet](#/subjects/cn/notes?h=medium-access-control-and-ethernet) → [13 questions](#/subjects/cn/pyq?topic=mac&years=pre2024) |
| **B** | Socket API (new in 2027; UDP dropped) | not asked | Recall | [Socket API](#/subjects/cn/notes?h=socket-api) → [3 questions](#/subjects/cn/pyq?topic=udp&years=pre2024) |
| **C** | NAT (ARP, DHCP, ICMP dropped in 2027) | 4 marks · 4 papers | Recall | [Network address translation](#/subjects/cn/notes?h=network-address-translation) → [3 questions](#/subjects/cn/pyq?topic=support&years=pre2024) |
| **C** | Layering (OSI / TCP-IP) | 2 marks · 2 papers | Recall | [Principles of layering](#/subjects/cn/notes?h=principles-of-layering) → [5 questions](#/subjects/cn/pyq?topic=layer&years=pre2024) |
| Out | Network security | outside the 2027 syllabus | Recall | skip |

**A**: master it and solve all its 2007–2023 questions. **B**: learn the method, then solve its questions. **C**: read once and keep its recall cards; solve its questions only if time is left. Keep the 2024–2026 papers unseen: they are your full-length mocks.

**How to study it**

- IPv4 and CIDR (16 marks) and TCP (16) are mostly numericals; then sliding window (9) and fragmentation (8).
- ARP, DHCP, ICMP, UDP, SMTP, FTP and email left the 2027 syllabus: skip them.
- New in 2027: performance metrics (delay and throughput numericals) and the socket API (learn the call order once).
<!-- plan:end -->

```widget
type: weightage-topics
```

```widget
type: weightage-trend
```

## Syllabus (GATE 2027)

> Principles of Layering; Basics of switching (circuit, packet and virtual circuit) and performance metrics; Data link layer: error detection, Medium Access Control, Ethernet; Distance vector and link state routing; IPv4 - Fragmentation, CIDR Notation, Network Address Translation; TCP- flow control and congestion control, socket API; DNS and HTTP.

> [!IMPORTANT] Revised for 2027
> **Dropped:** OSI/TCP-IP stacks by name, framing, Ethernet bridging, flooding and shortest-path routing as named items, ARP, DHCP, ICMP, UDP, SMTP, FTP and email. **Added:** switching performance metrics and the socket API. Topics marked "dropped" in the table view above stay out of the chart. See [what changed](#/syllabus?h=what-changed-from-gate-2026).

## Topic checklist

```widget
type: checklist
```

## How to prepare

1. **IPv4 and CIDR** carry the most marks: block boundaries, host counts, longest-prefix match and fragmentation offsets. Practise binary conversion until it is quick.
2. **TCP:** congestion-window evolution round by round, throughput from window and RTT, handshake sequence numbers.
3. **Sliding window:** efficiency and sequence-number bits; the same algebra shows up in TCP questions.
4. **New for 2027:** delay calculations (transmission vs propagation, store-and-forward over several hops) and which socket call does what.
5. **Then** MAC (ALOHA, CSMA/CD minimum frame), CRC by hand, distance-vector updates, and HTTP timing.

## Question patterns to expect

| Pattern | What to practise | Notes |
|---|---|---|
| Hosts / network / broadcast address of a block | Block size from the prefix | [IPv4 and CIDR](#/subjects/cn/notes?h=ipv4-addressing-and-cidr) |
| Which interface a packet leaves by | Longest-prefix match | [IPv4 and CIDR](#/subjects/cn/notes?h=ipv4-addressing-and-cidr) |
| Fragment sizes, offsets, MF flags | MTU minus header, multiple of 8 | [Fragmentation](#/subjects/cn/notes?h=ipv4-fragmentation) |
| Congestion window after $k$ RTTs | Slow start, avoidance, loss events | [TCP](#/subjects/cn/notes?h=tcp) |
| Link utilisation / window size / sequence bits | $1 + 2a$ | [Sliding window](#/subjects/cn/notes?h=flow-control-and-sliding-window) |
| Total delay to send a file | Transmission + propagation, pipelining | [Switching](#/subjects/cn/notes?h=switching-and-performance-metrics) |
| CRC remainder, Hamming bits | Modulo-2 division | [Error detection](#/subjects/cn/notes?h=error-detection) |

## Go deeper

- Kurose & Ross, *Computer Networking: A Top-Down Approach* (performance, TCP, sockets); Forouzan for data-link details.
- Drill the [previous-year questions](#/subjects/cn/pyq), skipping questions on topics dropped in 2027.
