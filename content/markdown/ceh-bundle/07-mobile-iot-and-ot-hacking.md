# Domain 7: Mobile Platform, IoT, and OT Hacking

## Sub-Domain: Hacking Mobile Platforms

---

## Mobile Platform Attack Vectors

**Core Concept:** Mobile devices are targeted via malicious apps, network-based attacks (rogue Wi-Fi), physical attacks (lost/stolen), and OS vulnerabilities. Attackers seek data theft, surveillance, or credential harvesting.

**Key Tools:** Malicious APK generators (SPYNote, AndroRAT). Mobile scanning: zANTI (pen testing), Fing.

**Port Numbers & Protocols:** N/A (common: Wi-Fi, Bluetooth, NFC)

**Common Pitfalls:**
- The biggest mobile threat is insecure app development and users granting excessive permissions.
- Jailbreaking/rooting removes security controls.

**Countermeasures:** Mobile Device Management (MDM), app vetting, user education, encryption, and remote wipe.

**Practice Question:**

An attacker creates a fake banking app and uploads it to a third-party app store. Victims install it and enter credentials. This is an example of:
- A) SIM swapping
- B) Bluebugging
- C) Phishing
- D) Trojan app

> **Answer: D** -- The app masquerades as legitimate but is malicious.
---

## Hacking Android OS

**Core Concept:** Android is open-source, based on Linux. Attack vectors: malware APKs, rooting, exploiting insecure app components (activities, services), and using ADB (Android Debug Bridge) over network.

**Key Tools:**
- ADB: `adb shell` for remote shell
- Metasploit: `android/meterpreter/reverse_tcp` payload
- AndroRAT, DroidJack (RATs)
- drozer (security assessment): `dz> run app.package.list`

**Port Numbers & Protocols:** ADB default port 5555 (TCP).

**Common Pitfalls:**
- Rooting gives superuser access, bypassing security.
- If ADB is enabled over network, `adb connect IP` gives shell.
- APK reverse engineering with apktool.

**Countermeasures:** Disable ADB, do not install apps from unknown sources, use Google Play Protect, keep OS updated, and use encryption.

**Practice Question:**

An attacker uses `adb connect 192.168.1.10` and gets a shell. What must be enabled on the device?
- A) Bluetooth
- B) NFC
- C) USB debugging and network ADB
- D) Wi-Fi only

> **Answer: C** -- ADB over network must be enabled.
---

## Hacking iOS

**Core Concept:** iOS is closed-source, but jailbreaking removes restrictions. Attacks exploit zero-days, malicious profiles, or use iCloud phishing. Tools like Cydia enable unauthorized apps.

**Key Tools:** Cydia Impactor to sideload apps, Xcode, Needle framework (assessment), iFunbox for file access.

**Port Numbers & Protocols:** N/A

**Common Pitfalls:**
- Jailbreaking types: tethered (requires PC to boot), semi-tethered, untethered (permanent).
- Risk of installing enterprise-signed malicious apps.

**Countermeasures:** Do not jailbreak, update iOS, use strong passcode, enable Find My iPhone, and use App Store only.

**Practice Question:**

An employee jailbreaks their iPhone to install unapproved apps. What is the primary security risk?
- A) iCloud backup fails
- B) No 5G
- C) Bypass of iOS security sandbox and app review
- D) Reduced battery life

> **Answer: C** -- Jailbreaking removes security restrictions, making malware installation easier.
---

## Mobile Device Management

**Core Concept:** MDM provides centralized control over mobile devices: enforce policies, push configurations, encrypt, remote wipe, and require passcodes. It mitigates mobile threats.

**Key Tools:** Microsoft Intune, VMware Workspace ONE, MobileIron, Jamf (Apple).

**Port Numbers & Protocols:** N/A

**Common Pitfalls:**
- BYOD (Bring Your Own Device) policies require containerization (separate work and personal data).
- MDM can enforce separation and data loss prevention.

**Countermeasures:** Implement MDM with strong authentication, restrict jailbroken/rooted devices, and regular compliance checks.

**Practice Question:**

An organization allows personal devices but wants to ensure corporate data is isolated and can be remotely wiped without affecting personal data. What solution?
- A) Firewall
- B) MDM with containerization
- C) Antivirus
- D) VPN

> **Answer: B** -- MDM with containerization creates a work profile.
---

## Mobile Security Guidelines and Tools

**Core Concept:** Guidelines: OWASP Mobile Top 10, NIST standards. Tools: MobSF (static analysis), Frida (dynamic instrumentation), zANTI (network testing), AndroBugs (vulnerability scanner).

**Key Tools:** MobSF: `mobsf.py upload APK`. Frida: `frida -U -f com.app.name`. zANTI runs on Android.

**Port Numbers & Protocols:** N/A

**Common Pitfalls:**
- OWASP Mobile Top 10 includes improper platform usage, insecure data storage, insecure communication, insecure authentication, insufficient cryptography, etc.

**Countermeasures:** Follow secure coding practices, test apps with static and dynamic analysis, use encrypted storage, and implement certificate pinning.

**Practice Question:**

A mobile app stores user passwords in plaintext in the shared preferences file. Which OWASP Mobile category does this fall under?
- A) Weak server-side controls
- B) Insecure data storage
- C) Client code quality
- D) Insecure communication

> **Answer: B** -- Plaintext sensitive data storage.
---

## Sub-Domain: IoT and OT Hacking

---

## IoT Concepts

**Key Facts:**
- **IoT (Internet of Things)** connects physical devices to internet: sensors, wearables, smart appliances.
- Communication protocols: MQTT, CoAP, Zigbee, Z-Wave, BLE.
- IoT architecture: Perception (sensors), Network, Middleware, Application layers.
- Most IoT devices lack security due to limited processing power and default credentials.
- OWASP IoT Top 10 lists vulnerabilities like weak/default passwords, insecure network services.

**Common Pitfalls:**
- Many IoT devices ship with hardcoded credentials that cannot be changed, making them prime targets for Mirai-like botnets.

**Practice Question:**

Which protocol is a lightweight publish-subscribe messaging protocol designed for constrained devices?
- A) HTTP
- B) SSH
- C) FTP
- D) MQTT

> **Answer: D** -- MQTT is a lightweight publish-subscribe protocol built for constrained IoT devices and low-bandwidth networks. (A, C: HTTP and FTP are heavier, connection-oriented protocols; B: SSH is a secure remote-access protocol, not a messaging protocol.)
---

## IoT Attacks

**Key Facts:**
- Firmware extraction and analysis to find backdoors or hardcoded keys.
- Exploiting insecure web interface or API.
- Sniffing unencrypted communication (Zigbee, BLE).
- Side-channel attacks (power analysis) to extract keys.
- Physical tampering (JTAG, UART) to dump firmware.

**Common Pitfalls:**
- Firmware attacks often involve using tools like binwalk to extract filesystem and find sensitive files (e.g., /etc/shadow).

**Practice Question:**

An attacker uses a serial interface on an IoT device to access the bootloader and extract firmware. This is:
- A) SQL injection
- B) Physical hardware hacking via JTAG/UART
- C) Phishing
- D) XSS

> **Answer: B** -- Accessing a device's JTAG/UART interface to reach the bootloader and dump firmware is physical hardware hacking. (A, C, D: SQL injection, phishing, and XSS are all remote/software-based attacks, not physical hardware access.)
---

## IoT Hacking Methodology

**Key Facts:**
1. **Information gathering** -- identify device, services, ports (Nmap, Shodan).
2. **Vulnerability scanning** -- search for known CVEs.
3. **Exploitation** -- web interface attacks, default credentials, or buffer overflow.
4. **Post-exploitation** -- maintain persistence, spread to other devices.

**Tools**: Shodan, Nmap, Firmwalker, Attify Badge (hardware).

**Common Pitfalls:**
- Shodan can find exposed IoT devices (e.g., MQTT brokers, cameras) with default credentials.

**Practice Question:**

A security researcher uses Shodan to search for "port:1883" and finds many open MQTT brokers. This is part of which phase?
- A) Exploitation
- B) Information gathering
- C) Clearing logs
- D) Post-exploitation

> **Answer: B** -- Searching Shodan for exposed services is passive/OSINT-style information gathering before any exploitation occurs. (A, C, D: exploitation, clearing logs, and post-exploitation all happen after a target has been identified and accessed.)
---

## IoT Attack Countermeasures

**Key Facts:**
- Change default credentials, disable unnecessary services.
- Use strong encryption for communication (TLS for MQTT).
- Regularly update firmware, enable secure boot.
- Network segmentation -- isolate IoT devices on separate VLAN.
- Implement IoT security frameworks (NIST, IoTSF).

**Common Pitfalls:**
- A common mistake is connecting IoT devices to the main corporate network; instead, use a separate VLAN with strict firewall rules.

**Practice Question:**

What is the most effective way to prevent an attacker from brute-forcing the password of an IoT device's admin panel?
- A) Change default password and implement account lockout
- B) Use MQTT
- C) Disable Wi-Fi
- D) Hide the device

> **Answer: A** -- Changing default credentials and adding account lockout directly blocks brute-force login attempts. (B: MQTT is unrelated to admin panel authentication; C and D: disabling Wi-Fi or hiding the device don't fix the underlying weak-credential issue and aren't practical.)
---

## OT Concepts

**Key Facts:**
- **OT (Operational Technology)** controls physical processes: SCADA, ICS, PLCs, DCS.
- Purdue model layers: Enterprise (IT) and Industrial (OT) zones, DMZ in between.
- Protocols: Modbus, DNP3, Profinet, OPC, Ethernet/IP.
- OT systems prioritize availability and integrity over confidentiality.
- IT/OT convergence increases attack surface.

**Common Pitfalls:**
- OT systems often cannot be patched frequently due to uptime requirements, making them vulnerable.
- The Stuxnet attack targeted Siemens PLCs.

**Practice Question:**

Which protocol is commonly used in SCADA systems for communication between master and remote terminal units?
- A) Modbus
- B) HTTP
- C) SMTP
- D) DNS

> **Answer: A** -- Modbus is a standard protocol for communication between SCADA master stations and remote terminal units (RTUs). (B, C, D: HTTP, SMTP, and DNS are general-purpose internet protocols, not industrial control protocols.)
---

## OT Attacks

**Key Facts:**
- **Stuxnet** worm targeted Iranian nuclear centrifuges via Siemens S7 PLCs.
- **Crashoverride/Industroyer** disrupted Ukraine's power grid using ICS protocols.
- Attacks often start in IT network, pivot to OT via DMZ.
- HMI (Human-Machine Interface) compromise allows altering setpoints.
- PLC logic injection can cause physical destruction.

**Common Pitfalls:**
- Stuxnet used four zero-days and spread via USB; it altered the speed of centrifuges while reporting normal values to HMI.

**Practice Question:**

What was the primary delivery method of the Stuxnet worm into the air-gapped Natanz facility?
- A) RDP brute-force
- B) Infected USB drives
- C) Phishing email
- D) SQL injection

> **Answer: B** -- Stuxnet was introduced into the air-gapped Natanz facility via infected USB drives, since the network had no direct internet connection. (A, C, D: RDP brute-force, phishing, and SQL injection all require network connectivity that an air-gapped facility doesn't have.)
---

## OT Hacking Methodology

**Key Facts:**
1. **Reconnaissance**: discover OT devices with Shodan, Google dorks (e.g., "PLC").
2. **Scanning**: Modbus/TCP scan with Nmap scripts (`modbus-discover`).
3. **Exploitation**: weak authentication, default credentials on HMIs/PLCs, or protocol vulnerabilities.
4. **Lateral movement**: from IT to OT via dual-homed hosts.

**Tools**: Metasploit modules (SCADA), ModbusPal (simulator), PLCscan.

**Common Pitfalls:**
- Tools like PLCscan can read/write Modbus registers without authentication on many devices.

**Practice Question:**

An attacker uses Nmap script `modbus-discover` and gets device ID and coil status. This indicates:
- A) DNS service
- B) SNMP enabled
- C) HTTP server
- D) Modbus service is running and accessible without authentication

> **Answer: D** -- A response to the modbus-discover script confirms an exposed, unauthenticated Modbus service. (A, B, C: DNS, SNMP, and HTTP are unrelated to Modbus-specific probes.)
---

## OT Attack Countermeasures

**Key Facts:**
- Network segmentation with firewalls and DMZ between IT and OT.
- Disable unused services on PLCs and HMIs, enforce authentication.
- Use application whitelisting and change control on OT systems.
- Monitor OT network for anomalies (e.g., unexpected Modbus write commands).
- Regular vulnerability assessments and patch management (in scheduled maintenance).

**Common Pitfalls:**
- The Purdue model recommends that OT devices should not directly connect to the internet; all communications should pass through a secure DMZ.

**Practice Question:**

According to best practices, where should a SCADA server be placed to protect it from internet attacks?
- A) In the cloud without firewall
- B) Directly on the internet
- C) In the OT network, behind a firewall with a DMZ
- D) On the same subnet as guest Wi-Fi

> **Answer: C** -- Best practice segments OT/SCADA systems from the internet using a firewall and DMZ (per the Purdue Model). (A, B, D: placing it in the cloud without a firewall, directly on the internet, or on a guest Wi-Fi subnet all expose it directly to attack.)