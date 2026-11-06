# Computer Networks

Layering, switching and performance metrics, error detection, medium access and Ethernet, routing, IPv4 with CIDR, fragmentation and NAT, TCP with flow and congestion control, the socket API, DNS and HTTP. Typically 6–10 marks per paper.

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
