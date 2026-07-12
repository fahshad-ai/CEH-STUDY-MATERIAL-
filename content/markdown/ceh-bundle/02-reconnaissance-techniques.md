# Domain 2: Reconnaissance Techniques

## Sub-Domain: Footprinting and Reconnaissance

---

## Footprinting Concepts

**Core Concept:** Footprinting is the process of gathering as much information as possible about a target system or organization to find ways to infiltrate it. It is passive, non-intrusive, and uses publicly available data. Attackers use it to map the attack surface.

**Key Tools:** `whois` (domain info), `nslookup` (DNS queries), `theHarvester` (email gathering: `theHarvester -d target.com -b google`)

**Port Numbers & Protocols:** DNS (53), HTTP (80), HTTPS (443) -- used as information sources.

**Common Pitfalls:**
- Footprinting can be **passive** (no direct interaction with target network) or **active** (touching target, e.g., social engineering).
- EC-Council considers DNS queries passive reconnaissance even though they may touch the target's DNS server.

**Countermeasures:** Restrict public info: disable directory listings, use generic error pages, scrub metadata from documents, use DNS record obscurity, and train employees on social media risks.

**Practice Question:**

A penetration tester collects employee email addresses from Google, LinkedIn, and company website without sending any packets to the company's network. This activity is:
- A) Scanning
- B) Passive footprinting
- C) Active footprinting
- D) Enumeration

> **Answer: B** -- No direct interaction with target network; passive. (A involves sending probes to the target; C involves direct contact, e.g., social engineering; D is more intrusive.)
---

## Footprinting Methodology

**Core Concept:** The structured process includes: (1) Footprinting through search engines, (2) Footprinting through web services, (3) Website footprinting, (4) Email footprinting, (5) Whois footprinting, (6) DNS footprinting, (7) Network footprinting, (8) Social engineering.

**Key Tools:** Search engines with Google dorking, web services like Netcraft, Whois tools, DNS tools like `dig`.

**Port Numbers & Protocols:** DNS (53), HTTP/HTTPS (80/443).

**Common Pitfalls:**
- The order may be tested; they might ask what step comes after searching for employee emails (often DNS footprinting).
- The methodology is not perfectly linear but the exam expects the listed sequence.

**Countermeasures:** Organizations should limit information leakage at each phase: hide WHOIS info (private registration), sanitize DNS records, avoid exposing internal IPs in DNS, train employees.

**Practice Question:**

According to the CEH footprinting methodology, after performing Whois lookup, what is the immediate next step?
- A) DNS footprinting
- B) Email footprinting
- C) Footprinting through social networking sites
- D) Network footprinting

> **Answer: A** -- The typical sequence is Whois then DNS footprinting.
---

## Footprinting through Search Engines

**Core Concept:** Attackers use search engines (Google, Bing) with advanced operators (Google dorking) to uncover sensitive information accidentally exposed on the web, such as login pages, configuration files, or internal documents.

**Key Tools:** Google search operators like `site:target.com filetype:pdf`, `intitle:"index of"`, `inurl:admin`. Shodan (`shodan host <IP>`).

**Port Numbers & Protocols:** N/A

**Common Pitfalls:**
- Google hacking database (GHDB) is a collection of dork queries.
- `inurl:` finds pages with a specific word in the URL; `intitle:` finds in the title.
- `cache:` shows cached version of a page.

**Countermeasures:** Use robots.txt to disallow sensitive directories (but it is not a security control), enforce authentication, remove sensitive data from public-facing content.

**Practice Question:**

An attacker searches for `"site:example.com intitle:'index of' 'backup.sql'"`. What is the attacker looking for?
- A) SQL injection vulnerabilities
- B) WordPress admin panel
- C) Directory listing of backup database files
- D) DNS zone transfer

> **Answer: C** -- The query reveals directories with backup SQL files.
---

## Footprinting through Web Services

**Core Concept:** Using online services to gather information about target domain, IP ranges, and infrastructure. These include Netcraft (server details, uptime), Shodan (IoT/devices), Censys, and Archive.org (Wayback Machine) to view historical versions of websites.

**Key Tools:** Netcraft site report (`https://sitereport.netcraft.com/?url=target.com`), Shodan search, Censys search, theHarvester, SpiderFoot (`spiderfoot -s target.com`).

**Port Numbers & Protocols:** N/A

**Common Pitfalls:**
- The Wayback Machine (Archive.org) can reveal old versions of a site that may contain sensitive data or forgotten admin panels.

**Countermeasures:** Regularly review archived snapshots and request removal of sensitive content; avoid exposing internal info on public sites.

**Practice Question:**

An organization removed its "/partners" login page after a security review. An attacker uses what service to potentially view the removed page?
- A) The Wayback Machine
- B) Google Dorking
- C) Shodan
- D) Netcraft

> **Answer: A** -- Archive.org stores historical page snapshots.
---

## Footprinting through Social Networking Sites

**Core Concept:** Attackers scrape social media (LinkedIn, Facebook, Twitter) to gather employee names, roles, email addresses, organizational structure, and even technical details from posts. This aids in social engineering and password guessing.

**Key Tools:** theHarvester (`theHarvester -d target.com -b linkedin`), Creepy (geolocation data), Maltego (graphical mapping of relationships).

**Port Numbers & Protocols:** N/A

**Common Pitfalls:**
- LinkedIn is heavily emphasized. Attackers can identify job postings listing technologies used (e.g., "need Cisco admin") to map the infrastructure.
- Employees posting "first day at X" reveals new hires ripe for social engineering.

**Countermeasures:** Enforce social media policy, restrict sharing of work details, conduct awareness training, and use privacy settings.

**Practice Question:**

A hacker searches LinkedIn for employees at a company and finds a network engineer listing his CCNA certification. How can the attacker exploit this?
- A) Password cracking
- B) DNS zone transfer
- C) ARP poisoning
- D) Spear-phishing with a Cisco-themed email

> **Answer: D** -- Knowing the person's role and technology enables targeted phishing.
---

## Website Footprinting

**Core Concept:** Analyzing the target's website to extract information like technologies used, hidden directories, comments in source code, robots.txt, and sitemap. This reveals web server type, CMS, frameworks, and potentially sensitive internal links.

**Key Tools:** `wget` (`wget -r target.com`), HTTrack (clone website), WhatWeb (`whatweb target.com`), browser dev tools to view source.

**Port Numbers & Protocols:** HTTP (80), HTTPS (443).

**Common Pitfalls:**
- Examining robots.txt might reveal hidden/admin directories, but it is not a security control; attackers check it first.
- Comments in HTML may contain database names, passwords left by developers.

**Countermeasures:** Remove developer comments, restrict access to admin panels, use generic error pages, and do not rely on robots.txt for security.

**Practice Question:**

A penetration tester finds the line `<!-- connection string: server=db01; uid=admin; pwd=password -->` in a web page source. What should the organization do?
- A) Use HTTPS
- B) Implement CAPTCHA
- C) Disable directory listing
- D) Delete the comment and change credentials

> **Answer: D** -- The comment exposes database credentials; immediate removal and credential rotation needed.
---

## Email Footprinting

**Core Concept:** Gathering email addresses of employees to launch phishing attacks or guess usernames. Attackers use tools to harvest addresses from web searches, WHOIS, and public mailing lists. They can also trace email headers to map internal servers and IPs.

**Key Tools:** Email extractor tools, `theHarvester -d domain.com -b all`, email tracking services (like readnotify). Analyzing headers manually: examine "Received:" lines.

**Port Numbers & Protocols:** SMTP (25), POP3 (110), IMAP (143).

**Common Pitfalls:**
- Email header analysis can reveal the originating IP, internal server names, and email client.
- Bounce messages may leak internal info.

**Countermeasures:** Implement email filtering, remove internal IPs from headers (use SMTP gateway rewriting), train users to avoid posting corporate emails publicly.

**Practice Question:**

An attacker receives an email from target.com and examines the header: `"Received: from mail.internal.target.com ([192.168.10.25])"`. What information can be inferred?
- A) The email was encrypted
- B) Internal hostname and private IP address
- C) The email is a phishing attempt
- D) The email server is vulnerable to relay

> **Answer: B** -- The header reveals internal naming and IP scheme, aiding network footprinting.
---

## Whois Footprinting

**Core Concept:** Querying WHOIS databases to obtain domain registration information: owner, administrative/technical contacts, email, phone, DNS servers, and registration dates. Used to map key personnel and network infrastructure.

**Key Tools:** `whois target.com` (Linux command), online whois services (whois.domaintools.com).

**Port Numbers & Protocols:** TCP 43 (WHOIS protocol).

**Common Pitfalls:**
- If private registration is used, the registrar's info is displayed instead of the actual owner.
- Even with private registration, the DNS servers listed can be used for further footprinting.

**Countermeasures:** Enable domain privacy/WHOIS protection to hide registrant details. However, DNS server names are still visible.

**Practice Question:**

An ethical hacker runs `whois example.com` and gets no registrant email but sees "ns1.example.com" and "ns2.example.com". What can still be done?
- A) Contact the registrar for the email
- B) Report to law enforcement
- C) Use the DNS servers for DNS footprinting
- D) No further action possible

> **Answer: C** -- DNS server names are public and can be queried for zone information or IP.
---

## DNS Footprinting

**Core Concept:** Querying DNS servers to obtain information about the target's domain, including A, MX, NS, CNAME, SOA records. Attackers attempt zone transfers (if misconfigured) to list all records, revealing internal IPs and hostnames.

**Key Tools:** `nslookup` (`nslookup -type=any target.com`), `dig` (`dig axfr @ns-server target.com`), DNSRecon (`dnsrecon -d target.com -t axfr`), dnsenum.

**Port Numbers & Protocols:** DNS uses TCP/UDP 53; zone transfer uses TCP 53.

**Common Pitfalls:**
- A successful zone transfer (AXFR) dumps all DNS records, giving the attacker a complete map of subdomains and internal IPs.
- `dig -t AXFR` is a must-know command.

**Countermeasures:** Restrict zone transfers only to authorized secondary DNS servers, use split DNS (internal vs external views).

**Practice Question:**

A penetration tester runs `dig axfr @ns1.target.com target.com` and receives a list of all hostnames and IP addresses. This indicates:
- A) The DNS server is poisoned
- B) Zone transfer is allowed
- C) DNS cache snooping is enabled
- D) The server is patched

> **Answer: B** -- The command attempts a zone transfer, and success indicates misconfiguration.
---

## Network Footprinting

**Core Concept:** Mapping the target's network range, subnets, and network topology using information from ARIN/RIPE, traceroute, and autonomous system (AS) lookups. This provides the attacker with IP blocks to scan.

**Key Tools:** `tracert` (Windows), `traceroute` (Linux), ARIN whois (`whois -h whois.arin.net <IP>`), Robtex, NeoTrace (graphical).

**Port Numbers & Protocols:** ICMP for traceroute; UDP high ports for traceroute default; TCP 80/443 can be used with traceroute options.

**Common Pitfalls:**
- Traceroute uses TTL expired messages; blocking ICMP can disrupt traditional traceroute.
- Attackers can use TCP traceroute on port 80/443 to bypass filters.
- Regional internet registries (RIRs) allocate IP blocks; footprinting includes IP block range discovery.

**Countermeasures:** Filter ICMP time-exceeded at border, but that may break normal operation. Use firewall rules to limit exposure of internal router IPs.

**Practice Question:**

A target network blocks ICMP packets. How can an attacker still perform a traceroute to discover network hops?
- A) Use ARP requests
- B) Use UDP traceroute
- C) Use DNS zone transfer
- D) Use TCP traceroute on port 80

> **Answer: D** -- TCP traceroute (e.g., `traceroute -T -p 80 target.com`) uses TCP SYN packets, bypassing ICMP filters.
---

## Footprinting through Social Engineering

**Core Concept:** Using human interaction to collect information. Attackers may call employees pretending to be tech support, send phishing emails, or use physical methods (dumpster diving) to extract network details, credentials, or internal documentation.

**Key Tools:** No specific tool; techniques include pretexting, tailgating, shoulder surfing. Social Engineering Toolkit (SET) automates phishing campaigns (`setoolkit`).

**Port Numbers & Protocols:** N/A

**Common Pitfalls:**
- Social engineering is considered an **active** footprinting technique because it involves direct interaction with the target organization.
- EC-Council distinguishes technical from human-based social engineering.
- Dumpster diving is a physical form of information gathering.

**Countermeasures:** Security awareness training, strict verification procedures for information disclosure, clean desk policy, shredding sensitive documents.

**Practice Question:**

An attacker calls an employee, claiming to be from the IT help desk, and asks for the employee's username and password to "fix an account issue." This is an example of:
- A) Pretexting
- B) Dumpster diving
- C) Shoulder surfing
- D) Tailgating

> **Answer: A** -- Pretexting involves creating a false scenario to trick the target.
---

## Footprinting Tools

**Core Concept:** A suite of automated tools helps aggregate footprinting information. These include passive reconnaissance tools and frameworks that combine multiple data sources.

**Key Tools:**
- **Maltego** -- graphical link analysis for relationships (launches GUI)
- **Recon-ng** -- module-based (`recon-ng`, then use module)
- **FOCA** -- metadata extraction (`FOCA.exe`)
- **theHarvester** -- email/subdomain gathering
- **OSINT Framework** -- web-based
- **SpiderFoot** (`spiderfoot -s target.com`)

**Port Numbers & Protocols:** N/A

**Common Pitfalls:**
- **theHarvester** is specifically for gathering email addresses and subdomains from public sources.
- **FOCA** is for metadata extraction from documents.
- **Maltego** is for link analysis of people, domains, networks.

**Countermeasures:** Disable access to metadata in public documents, use Data Loss Prevention (DLP) systems to monitor sensitive data leakage.

**Practice Question:**

A security analyst wants to automatically gather email addresses, employee names, and subdomains from multiple search engines. Which tool is best suited?
- A) Wireshark
- B) John the Ripper
- C) Nmap
- D) theHarvester

> **Answer: D** -- theHarvester is purpose-built for that task.
---

## Footprinting Countermeasures

**Core Concept:** Prevent information leakage by limiting publicly available data, training employees, and implementing technical controls. The goal is to reduce the attack surface discovered during reconnaissance.

**Key Tools:** N/A. Practices include using domain privacy, disabling zone transfers, removing metadata from documents, configuring web servers to hide version info, and employing social media guidelines.

**Port Numbers & Protocols:** N/A

**Common Pitfalls:**
- To prevent Google dorking, use robots.txt but better to avoid exposing sensitive content.
- To prevent Whois info leakage, enable domain privacy.
- To prevent DNS zone transfers, restrict AXFR.

**Countermeasures:** Implement all technical and administrative controls across each footprinting vector. Regularly search for your own organization's exposed data.

**Practice Question:**

Which is the best defense against an attacker using theHarvester to collect corporate email addresses?
- A) Use strong passwords
- B) Restrict email addresses published on public websites and social media
- C) Implement a firewall
- D) Disable ICMP

> **Answer: B** -- Removing public email addresses prevents harvesting.
---

## Sub-Domain: Scanning Networks

---

## Network Scanning Concepts

**Core Concept:** Network scanning discovers live hosts, open ports, and services. It bridges footprinting and enumeration. Key concepts include the TCP three-way handshake (SYN, SYN/ACK, ACK), scan types (SYN stealth, full connect, Xmas, NULL, FIN), and IDS evasion. ICMP ping sweep, TCP ping, and UDP scanning (slow and unreliable because UDP is connectionless) are fundamental techniques.

**How It Works:**
1. **Host discovery** -- which IPs are alive, using ICMP echo requests or TCP SYN to common ports.
2. **Port scanning** -- find open ports by sending probes; SYN scan sends SYN, if SYN/ACK received the port is open, RST received means port closed; no response or ICMP unreachable means filtered.
3. **Service and version detection** (banner grabbing).

**Key Tools:** Nmap (`nmap -sS -p 1-1000 192.168.1.0/24` for SYN stealth scan), Hping3 (`hping3 -S -p 80 10.0.0.1`), NetScanTools Pro, Angry IP Scanner.

**Port Numbers & Protocols:** FTP 21, SSH 22, Telnet 23, SMTP 25, DNS 53, HTTP 80, HTTPS 443, SMB 445, RDP 3389.

**Common Pitfalls:**
- **TCP Full Connect** (`-sT`) completes the handshake (logged by apps).
- **Stealth SYN** (`-sS`) is half-open, not logged by some apps.
- **UDP scan** (`-sU`) is slow; open ports may not reply, closed ports get ICMP port unreachable.

**Countermeasures:** Firewalls filter and limit ICMP, IDS/IPS detect rapid connections, use of port knocking.

**Practice Question:**

A security analyst runs `nmap -sS -p 22,80,443 10.10.10.5` and sees: `22/tcp open`, `80/tcp filtered`, `443/tcp closed`. What does "filtered" indicate?
- A) The port is open but firewall blocks access to the scanner
- B) The service is disabled
- C) Nmap cannot determine if the port is open because no response was received
- D) The host is down

> **Answer: C** -- "Filtered" means a firewall dropped the probe, so Nmap could not confirm open/closed.
---

## Scanning Tools

**Core Concept:** Nmap is the industry standard for port scanning and host discovery. Other tools include Hping3 for packet crafting, Netcat for banner grabbing, Masscan for ultra-fast scanning. Nmap's scripting engine (NSE) extends functionality for vulnerability detection.

**Key Tools:**
- **Nmap**: `nmap -sV -O 192.168.1.1` (version and OS detection)
- **Netcat**: `nc -nv 10.0.0.1 80` then `HEAD / HTTP/1.0` (banner grab)
- **Hping3**: `hping3 -S -p 80 --flood target` (DoS testing)
- **Masscan**: `masscan -p80,443 10.0.0.0/8 --rate=10000` (fast scan of large ranges)

**Port Numbers & Protocols:** N/A (uses standard ports)

**Common Pitfalls:**
- Nmap options: `-sS` SYN scan, `-sT` TCP connect, `-sU` UDP scan, `-sV` version, `-O` OS detection, `-Pn` skip host discovery, `-p` port range.
- Nmap NSE uses `--script` option (e.g., `--script=http-headers`).
- Nmap output states: open, closed, filtered, open|filtered (UDP).
- Hping3 can bypass some firewall rules by using fragment packets.

**Countermeasures:** Use IDS/IPS with updated signatures, configure firewalls to limit scan responses.

**Practice Question:**

To perform a UDP scan on the top 100 ports and avoid sending any ICMP ping, which Nmap command should be used?
- A) `nmap -sU -F 192.168.1.1`
- B) `nmap -sS -Pn 192.168.1.1`
- C) `nmap -sT -p 1-100 192.168.1.1`
- D) `nmap -sU -Pn --top-ports 100 192.168.1.1`

> **Answer: D** -- `-sU` for UDP, `-Pn` to skip host discovery, `--top-ports 100` for most common ports.
---

## Host Discovery

**Core Concept:** Host discovery identifies live systems on a network. Techniques include ICMP ping sweep, TCP SYN/ACK ping, UDP ping, and ARP scan (on local network). Nmap's default uses ICMP echo and TCP SYN to port 443. Blocking ICMP is common, so TCP probes are more reliable.

**Key Tools:**
- **Nmap**: `nmap -sn 192.168.1.0/24` (ping scan, host discovery only)
- **arp-scan**: `arp-scan --localnet`
- **fping**: `fping -g 192.168.1.0/24` (mass ping)

**Port Numbers & Protocols:** N/A

**Common Pitfalls:**
- `-sn` disables port scan after discovery.
- `-Pn` skips host discovery entirely (assumes all hosts up).
- ARP scan only works on the local subnet (same broadcast domain).
- TCP SYN ping uses port 80 by default; can be changed with `-PS`.

**Countermeasures:** Use network segmentation and monitor for unusual scan patterns.

**Practice Question:**

An internal penetration tester wants to discover all live hosts on the local Ethernet without sending any IP packets. Which Nmap option is best?
- A) `nmap -sP 192.168.1.0/24`
- B) `nmap -Pn 192.168.1.0/24`
- C) `nmap -sn -PR 192.168.1.0/24`
- D) `nmap -sn -PS 192.168.1.0/24`

> **Answer: C** -- `-PR` performs ARP scan, which uses Layer 2 ARP requests, not IP packets.
---

## Port and Service Discovery

**Core Concept:** Port scanning reveals which TCP/UDP ports are open. Service discovery identifies the application and version behind the port, often by banner grabbing or sending specific probes. This enables vulnerability mapping.

**Key Tools:**
- **Nmap**: `nmap -sV -p 21,22,80 10.0.0.1` (version detection)
- **Nmap scripts**: `--script=banner`
- **Netcat**: `nc -v target 22` (banner grab)
- **Amap**: `amap -b 10.0.0.1 80` (application mapper)

**Port Numbers & Protocols:** Common service ports (21, 22, 23, 25, 53, 80, 443, etc.)

**Common Pitfalls:**
- Banner grabbing is active reconnaissance.
- Version detection can be intrusive.
- Nmap `-sV --version-intensity 0-9` controls intensity.
- `-A` enables OS and service detection.
- An open port does not guarantee the service is the standard one.

**Countermeasures:** Disable banners, use banners with generic information, keep services updated.

**Practice Question:**

An Nmap scan shows port 8080 as open with "http-proxy" service. To manually verify, what command would an attacker likely use?
- A) `nslookup 8080`
- B) `tracert -p 8080`
- C) `telnet 10.0.0.1 8080` then `HEAD / HTTP/1.0`
- D) `ping 8080`

> **Answer: C** -- Connecting with telnet or netcat and sending an HTTP request banner-grabs the response.
---

## OS Discovery (Banner Grabbing/OS Fingerprinting)

**Core Concept:** OS fingerprinting determines the operating system of a target by analyzing network responses (TTL, TCP window size, IP ID sequence). Active fingerprinting sends crafted packets and compares to a signature database; passive fingerprinting observes traffic without sending packets.

**Key Tools:**
- **Nmap**: `nmap -O 10.0.0.1` (OS detection; requires at least one open and one closed port)
- **p0f**: `p0f -i eth0` (passive, listens)
- **Netcat** for banner grabbing: `nc 10.0.0.1 22`

**Port Numbers & Protocols:** N/A

**Common Pitfalls:**
- TTL values: Linux/Unix 64, Windows 128, Cisco 255.
- Nmap `-O` requires at least one open TCP port and one closed TCP port to build fingerprint.
- Passive fingerprinting cannot be detected.

**Countermeasures:** Modify TTL, use a firewall proxy to hide real OS.

**Practice Question:**

A security analyst runs `nmap -O 192.168.1.100` and gets: "OS details: Linux 2.6.32 -- 3.10". The scan also shows port 22/tcp open and 23/tcp closed. Why did it succeed?
- A) Because the host responded to ICMP
- B) Because the target runs Linux
- C) Because port 23 was open
- D) Because at least one open and one closed port were found

> **Answer: D** -- Nmap's OS detection needs both an open and a closed TCP port to differentiate implementations.
---

## Scanning Beyond IDS and Firewall

**Core Concept:** Attackers use evasion techniques to avoid detection by IDS/IPS and bypass firewall rules. Methods include packet fragmentation, decoy scanning, source port manipulation, idle scan, timing adjustments, and using proxies.

**Key Tools:**
- **Nmap fragmentation**: `-f` (fragment packets), `--mtu`
- **Decoy**: `-D decoy1,decoy2,ME`
- **Idle scan**: `-sI zombie_ip`
- **Timing**: `-T0` (paranoid) to `-T5` (insane)
- **Source port**: `--source-port 53`

**Port Numbers & Protocols:** N/A

**Common Pitfalls:**
- Idle scan is completely silent from attacker's real IP; requires a zombie with sequential IP ID generation.
- Nmap decoy scan: the real attacker IP is still in the list, but target sees many IPs.
- `--data-length` appends random data to avoid signature detection.

**Countermeasures:** IDS that does packet reassembly, stateful firewalls that detect decoys by mismatched TCP sequence numbers.

**Practice Question:**

An attacker wants to scan a target without revealing his own IP. He identifies a zombie host 10.0.0.50 with predictable IP IDs. Which Nmap scan accomplishes this?
- A) `nmap -D 10.0.0.50 10.10.10.10`
- B) `nmap -sS 10.0.0.50`
- C) `nmap -sI 10.0.0.50 10.10.10.10`
- D) `nmap -sA 10.10.10.10`

> **Answer: C** -- `-sI` idle scan uses the zombie to scan the target; the target sees the zombie's IP.
---

## Network Scanning Countermeasures

**Core Concept:** Defense against scanning includes properly configuring firewalls, using IDS/IPS to alert on scan patterns, disabling unnecessary services, employing port knocking, and filtering ICMP. The goal is to reduce information leakage and slow down attackers.

**Key Tools:**
- **iptables**: `iptables -A INPUT -p tcp --tcp-flags ALL NONE -j DROP` (drop NULL scans)
- **Snort**: `alert tcp any any -> any 80 (msg:"SYN scan"; flags:S; threshold: type both, track by_src, count 20, seconds 5;)`
- **PortSentry** (detects and blocks scanning IPs)

**Port Numbers & Protocols:** N/A

**Common Pitfalls:**
- Blocking ICMP echo requests only prevents ping sweep, not TCP scans.
- The best defense is closing all unnecessary ports and using IDS.
- A closed port sends RST; an open port completes handshake; a firewall that drops packets prevents open ports from being distinguished from filtered.

**Countermeasures:** Rate limiting scan responses, detecting NULL/Xmas scans, and deploying IDS/IPS.

**Practice Question:**

Which firewall rule would best thwart a TCP NULL scan?
- A) Drop all ICMP echo requests
- B) Drop SYN packets
- C) Allow all TCP traffic
- D) Drop packets with no TCP flags set

> **Answer: D** -- NULL scan sends packets with no flags; dropping them prevents response.
---

## Sub-Domain: Enumeration

---

## Enumeration Concepts

**Core Concept:** Enumeration is the process of extracting valid accounts, shared resources, and application details from a system. It is active and more intrusive than scanning, establishing connections to services. Attackers use it to find user names, group memberships, network shares, and SNMP data.

**Key Tools:**
- **enum4linux**: `enum4linux -U -S target` (user and share enumeration)
- **SMBclient**: `smbclient -L //target -N` (list shares)
- **Nmap NSE scripts**: `nmap --script=smb-enum-shares,smb-enum-users -p445 target`
- **SNMPwalk**: `snmpwalk -c public -v1 target`
- **LDAPsearch**: `ldapsearch -x -h target -b "dc=domain,dc=com"`

**Port Numbers & Protocols:** NetBIOS 137-139, SMB 445, LDAP 389, SNMP 161.

**Common Pitfalls:**
- Enumeration uses valid connections, so it is logged.
- Windows SMB null sessions (NetBIOS port 139 and SMB 445) are a primary vector.
- Countermeasure: Disable SMBv1, restrict null sessions, use SNMPv3 with authentication, and lock out accounts after failed attempts.

**Practice Question:**

An attacker establishes a null session to a target's port 445 and lists user accounts. Which service was exploited?
- A) Telnet
- B) SMB
- C) LDAP
- D) SNMP

> **Answer: B** -- Null session is an unauthenticated connection to Windows SMB service on port 445 (or 139).
---

## NetBIOS Enumeration

**Core Concept:** NetBIOS over TCP/IP (NBT) allows legacy Windows systems to share resources. Attackers use NetBIOS name lookups and null sessions to retrieve the NetBIOS name table, list domain names, and enumerate shares and users.

**Key Tools:**
- **nbtstat**: `nbtstat -A 192.168.1.10` (reveals names and services)
- **Net view**: `net view \\192.168.1.10` (list shares)
- **Nmap**: `nmap -sU -p 137 --script nbstat.nse target`

**Port Numbers & Protocols:** NetBIOS name service 137, datagram 138, session 139. Direct SMB uses port 445.

**Common Pitfalls:**
- nbtstat output flags: `<00>` workstation service, `<20>` file server service, `<03>` messenger (username).
- EC-Council often asks about `nbtstat -a <name>` vs `-A <IP>`.

**Countermeasures:** Disable NetBIOS over TCP/IP if not needed, or block ports 137-139 at firewall.

**Practice Question:**

An attacker runs `nbtstat -A 10.0.0.5` and sees `<00> UNIQUE`, `<20> UNIQUE`, `<03> UNIQUE`. What can be concluded?
- A) The system is a file server with a user logged in
- B) The system has port 445 closed
- C) The system is a domain controller
- D) The system is a Linux machine

> **Answer: A** -- `<20>` indicates file sharing service; `<03>` indicates the messenger service user.
---

## SNMP Enumeration

**Core Concept:** SNMP (Simple Network Management Protocol) allows management of network devices. Attackers exploit default community strings (public/private) to read device configurations, user accounts, and network information.

**Key Tools:**
- **snmpwalk**: `snmpwalk -c public -v1 10.0.0.1` (walks entire MIB tree)
- **snmpcheck**: `snmp-check 10.0.0.1 -c public`
- **Nmap**: `nmap -sU -p 161 --script=snmp* 10.0.0.1`
- **Onesixyone**: fast SNMP community string scanner

**Port Numbers & Protocols:** UDP 161 (SNMP).

**Common Pitfalls:**
- Community strings: **public** (read-only), **private** (read-write).
- SNMPv1/v2c send community strings in clear text; SNMPv3 encrypts.
- The specific countermeasure is to use SNMPv3, restrict to specific IPs, and use complex community strings.

**Practice Question:**

A penetration tester scans the target with `nmap -sU -p 161 --script snmp-info` and finds a device with community string "public". What risk does this pose?
- A) A denial-of-service can be launched
- B) Configuration and sensitive data can be read
- C) The device can be rebooted
- D) Passwords can be changed

> **Answer: B** -- "public" is read-only, allows reading sensitive data. Read-write ("private") would allow changes.
---

## LDAP Enumeration

**Core Concept:** LDAP (Lightweight Directory Access Protocol) provides access to directory services like Active Directory. Attackers query LDAP anonymously or with compromised credentials to list users, groups, computers, and organizational structure.

**Key Tools:**
- **ldapsearch**: `ldapsearch -x -h 10.0.0.1 -b "dc=example,dc=com"` (anonymous query)
- **Nmap**: `nmap -p 389 --script ldap-search --script-args 'ldap.base="dc=example,dc=com"'`
- **Softerra LDAP Browser** (GUI)

**Port Numbers & Protocols:** LDAP 389, LDAPS 636.

**Common Pitfalls:**
- Anonymous LDAP access is a misconfiguration.
- Base DN is critical; null bind or simple authentication.
- Countermeasure: Require authenticated binds, disable anonymous lookups, use LDAPS or StartTLS.

**Practice Question:**

An auditor finds that the command `ldapsearch -x -h 10.1.1.5 -b "dc=internal,dc=corp"` returns a list of all users without prompting for credentials. What is the issue?
- A) Weak password policy
- B) Anonymous LDAP bind is enabled
- C) Missing firewall rule
- D) Open SSH port

> **Answer: B** -- `-x` is simple authentication, no credentials provided, so anonymous bind is allowed.
---

## NTP and NFS Enumeration

**Core Concept:** NTP (Network Time Protocol) can leak internal hostnames and IPs via monlist query. NFS (Network File System) exports file systems; misconfigured NFS allows unauthorized mounting and access to sensitive files.

**Key Tools:**
- **ntpq**: `ntpq -c monlist <target>` (if vulnerable, returns list of recent clients)
- **NFS**: `showmount -e 10.0.0.1` lists exports; `mount -t nfs 10.0.0.1:/exported /mnt` to mount
- **Nmap**: `nmap -sU -p 123 --script ntp-monlist`; `nmap -p 2049 --script nfs-showmount`

**Port Numbers & Protocols:** NTP 123, NFS 2049.

**Common Pitfalls:**
- NTP monlist is a known amplification vector; also reveals IP addresses of clients.
- For NFS, restrict exports to specific hosts and use `nosuid` mount option.

**Practice Question:**

An attacker runs `showmount -e 192.168.1.100` and sees `/data *`. What does the asterisk mean?
- A) The share requires authentication
- B) The share is encrypted
- C) The share is a pseudo file system
- D) The share is accessible to any host

> **Answer: D** -- The asterisk denotes no IP restriction; any client can mount.
---

## SMTP and DNS Enumeration

**Core Concept:** SMTP enumeration verifies email addresses and internal users using VRFY/EXPN commands. DNS enumeration goes beyond footprinting to query internal DNS records, perform cache snooping, and exploit zone transfers to fully map infrastructure.

**Key Tools:**
- **SMTP**: `nc -nv 10.0.0.1 25` then `VRFY`/`EXPN`
- **smtp-user-enum**: `smtp-user-enum -M VRFY -u root -t 10.0.0.1`
- **DNS**: `dnsrecon -d example.com -t axfr`, `dnsenum example.com`
- **DNS cache snooping**: `dig +norecurse @ns A target.com`

**Port Numbers & Protocols:** SMTP 25, DNS 53.

**Common Pitfalls:**
- VRFY validates a single user; EXPN expands a mailing list.
- SMTP enumeration can also determine mail server software via banner.
- DNS countermeasure: restrict zone transfers, disable recursion on public DNS servers.

**Practice Question:**

A penetration tester connects to port 25 and issues "EXPN admin". What information does this attempt to retrieve?
- A) Verify if admin user exists
- B) Retrieve server version
- C) Test for open relay
- D) List email addresses of members in the admin mailing list

> **Answer: D** -- EXPN expands a mailing list to show its members. (A is VRFY.)
---

## Other Enumeration Techniques

**Core Concept:** This covers enumeration on various services: IPsec (using ike-scan), VoIP (SIP enumeration with svmap), RPC/Portmapper (rpcbind on port 111), Unix/Linux user enumeration via finger (79) and rwho (513), Telnet/FTP banner grabbing, TFTP (UDP 69), SMB, IPv6 neighbor discovery, and BGP routing table queries.

**Key Tools:**
- **IPsec**: `ike-scan -M 10.0.0.1`
- **VoIP**: `svmap 10.0.0.0/24` (from SIPVicious)
- **RPC**: `rpcinfo -p 10.0.0.1` or `nmap -sR`
- **Unix**: `finger @10.0.0.1` or `finger -l root@target`
- **BGP**: BGPdump, looking glass queries

**Port Numbers & Protocols:** RPC portmapper 111 (TCP/UDP), finger 79, TFTP 69, Telnet 23, FTP 21, BGP 179. SIP uses 5060/5061.

**Common Pitfalls:**
- RPC enumeration reveals NFS, NIS.
- EC-Council often asks about the `finger` command for user enumeration.

**Practice Question:**

An attacker runs `rpcinfo -p 192.168.1.50` and sees program 100005 version 1 (mountd). What can be inferred?
- A) The host is a domain controller
- B) The host is running NFS and mountd is available
- C) The host has a web server
- D) The host is a database server

> **Answer: B** -- mountd is part of NFS, indicating NFS shares.
---

## Enumeration Countermeasures

**Core Concept:** Disable unnecessary services, enforce authentication for queries, restrict access via firewalls, and monitor for enumeration attempts. Apply secure configurations: SNMPv3, disable null sessions, restrict RPC, disable SMTP VRFY, and use encryption.

**Key Tools:**
- Group Policy for Windows (null session restrictions)
- iptables: `iptables -A INPUT -p tcp --dport 139 -j DROP`
- Snort rules for detection
- Nessus checks for misconfigurations

**Port Numbers & Protocols:** N/A

**Common Pitfalls:**
- For SNMP: disable default communities, use ACL.
- For LDAP: disable anonymous bind.
- For SMTP: disable VRFY/EXPN.
- For DNS: restrict zone transfers.
- For NFS: export with limited hosts.

**Practice Question:**

Which configuration change best prevents an attacker from using null sessions to enumerate users on a Windows server?
- A) Set RestrictAnonymous registry key to 1
- B) Disable ICMP
- C) Disable port 445
- D) Use SNMPv3

> **Answer: A** -- Setting `RestrictAnonymous=1` in Windows prevents anonymous SMB enumeration without authentication.