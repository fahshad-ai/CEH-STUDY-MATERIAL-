# Domain 1: Information Security and Ethical Hacking Overview

## Sub-Domain: Introduction to Ethical Hacking

---

## Information Security Overview

**Core Concept:** Information security protects data confidentiality, integrity, and availability (the CIA triad). Attackers target weaknesses in these pillars to steal, alter, or deny access to information assets, making defense essential.

**Key Tools:** N/A (conceptual). For risk assessment, the NIST Risk Management Framework (RMF) is commonly used.

**Port Numbers & Protocols:** N/A

**Common Pitfalls:**
- Students often confuse **authentication** (verifying identity) with **authorization** (granting access).
- EC-Council tests that **non-repudiation** is the assurance that a party cannot deny an action, not just logging.

**Countermeasures:** Implement defense-in-depth: administrative, technical, and physical controls layered to cover all CIA aspects.

**Practice Question:**

A company's database is encrypted and backed up daily. An attacker deletes the live data, but it is restored within minutes. Which security property was temporarily lost?
- A) Availability
- B) Integrity
- C) Non-repudiation
- D) Confidentiality

> **Answer: A** -- Availability was lost because data was inaccessible until restored. (B: data was not altered, so integrity was intact; C: non-repudiation concerns proof of action, not access; D: no data was disclosed, so confidentiality was intact.)
---

## Hacking Methodologies and Frameworks

**Core Concept:** Hacking frameworks provide a structured approach to penetration testing. Attackers follow phases: reconnaissance, scanning, gaining access, maintaining access, and clearing tracks. CEH emphasizes the CEH Hacking Methodology (5 phases) as the exam baseline.

**Key Tools:** N/A (methodology). The Penetration Testing Execution Standard (PTES) is a common framework.

**Port Numbers & Protocols:** N/A

**Common Pitfalls:**
- EC-Council's 5 phases are exactly: **Reconnaissance, Scanning, Gaining Access, Maintaining Access, Clearing Tracks**.
- Do not mix in "Reporting" or "Remediation" as a phase in the hacking methodology; those are part of the ethical hacking lifecycle but not the attacker's methodology.

**Countermeasures:** Understand the adversary's playbook to design controls aligned to each phase (e.g., minimize footprinting exposure, detect scanning, prevent privilege escalation).

**Practice Question:**

An ethical hacker completes network scanning and obtains a shell on the target. According to CEH's hacking methodology, which phase comes next?
- A) Reporting
- B) Reconnaissance
- C) Clearing Tracks
- D) Maintaining Access

> **Answer: D** -- After gaining access, the next step is maintaining access (backdoors). (A is not part of the attacker's 5-phase methodology; B is the first phase; C is the last phase.)
---

## Hacking Concepts

**Core Concept:** Hacking refers to exploiting vulnerabilities in systems to gain unauthorized access. Hackers are classified as:
- **Black Hat** -- malicious intent
- **White Hat** -- ethical, authorized testing
- **Gray Hat** -- borderline, may act without permission but without malicious intent

EC-Council also includes hacktivists and state-sponsored groups.

**Key Tools:** N/A (conceptual). Vulnerability scanners like Nessus are used by ethical hackers.

**Port Numbers & Protocols:** N/A

**Common Pitfalls:**
- A **vulnerability** is a weakness; an **exploit** is the code or technique that uses the weakness.
- A **threat** is the potential danger; a **risk** is the impact/likelihood.
- Script kiddies use pre-written tools but may not understand them.

**Countermeasures:** Ethical hacking uses the same tools as malicious hacking but within a legal framework with explicit written permission.

**Practice Question:**

An attacker discovers a SQL injection flaw in a web app and writes a script to extract user data. The SQL injection flaw is an example of a:
- A) Vulnerability
- B) Risk
- C) Exploit
- D) Threat

> **Answer: A** -- The flaw is the vulnerability. (B combines probability and impact; C is the script that exploits it; D is the threat actor.)
---

## Ethical Hacking Concepts

**Core Concept:** Ethical hacking is conducted with proper authorization to test systems' security posture. It follows strict rules of engagement, a defined scope, and ends with a report. An ethical hacker must keep data confidential and respect legal boundaries.

**Key Tools:** N/A (concept). Common testing frameworks: OSSTMM, PTES.

**Port Numbers & Protocols:** N/A

**Common Pitfalls:**
- The most important element is **written permission** (the "get out of jail free card").
- Testing without explicit authorization is illegal, even if the intent is good.
- A non-disclosure agreement (NDA) is mandatory before testing.

**Countermeasures:** Organizations should have a vulnerability management program that includes periodic ethical hacking engagements.

**Practice Question:**

A pen tester is hired to assess network security. The tester launches an attack that crashes the production server, causing outage. Legally, the tester is protected because:
- A) The tester had a written agreement and authorization
- B) The attack was in the scope
- C) The tester acted ethically
- D) The tester followed OSSTMM

> **Answer: A** -- Written authorization (contract) provides legal protection. Scope alone does not cover negligence; ethical intent does not absolve liability; OSSTMM is a framework, not legal authority.
---

## Information Security Controls

**Core Concept:** Controls are safeguards to mitigate risks. They are categorized as:
- **Physical** -- locks, guards
- **Technical** -- firewalls, encryption
- **Administrative** -- policies, training

They can also be classified by function: preventive, detective, deterrent, corrective, or compensating.

**Key Tools:** N/A (concept). Access control models: DAC, MAC, RBAC.

**Port Numbers & Protocols:** N/A

**Common Pitfalls:**
- **Preventive** controls stop incidents before they occur (e.g., firewall deny rule).
- **Detective** controls identify incidents (e.g., IDS alerts).
- **Deterrent** controls discourage (e.g., warning banners).
- **Corrective** controls restore after an incident (e.g., backups).
- **Compensating** controls are alternatives when primary control is not feasible.

**Countermeasures:** Implement defense-in-depth with multiple overlapping controls; regularly test controls via vulnerability assessments.

**Practice Question:**

A company installs a security camera at the server room entrance. This camera is primarily which type of control?
- A) Detective
- B) Deterrent
- C) Corrective
- D) Preventive

> **Answer: A** -- A camera records activity to detect unauthorized access. It may also have a deterrent effect, but its primary function is detection (recording evidence).
---

## Information Security Laws and Standards

**Core Concept:** Laws and standards govern data protection and cybercrime. Key regulations:
- **GDPR** -- EU privacy
- **HIPAA** -- US healthcare
- **PCI DSS** -- payment card security
- **SOX** -- financial integrity

ISO/IEC 27001 provides an Information Security Management System (ISMS) framework.

**Key Tools:** N/A. Compliance check: OpenSCAP can audit against standards (`oscap xccdf eval --profile <profile> <benchmark>`).

**Port Numbers & Protocols:** N/A

**Common Pitfalls:**
- PCI DSS is specifically for credit card data protection; it mandates encryption of cardholder data in transit and at rest.
- HIPAA protects health information.
- Know which regulation applies to which industry.

**Countermeasures:** Implement data classification, access controls, and encryption to meet legal/regulatory requirements; conduct regular compliance audits.

**Practice Question:**

A healthcare provider's database containing patient medical records is breached. Which regulation was primarily violated?
- A) PCI DSS
- B) SOX
- C) HIPAA
- D) GDPR

> **Answer: C** -- HIPAA protects health information. (GDPR is European data privacy; PCI DSS is cardholder data; SOX is financial reporting integrity.)