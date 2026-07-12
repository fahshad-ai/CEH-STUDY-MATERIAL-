# Domain 6: Wireless Network Hacking

## Sub-Domain: Hacking Wireless Networks

---

## Wireless Concepts

**Key Facts:**
- **802.11 standards**: a (5 GHz, 54 Mbps), b (2.4 GHz, 11 Mbps), g (2.4 GHz, 54 Mbps), n (dual-band, MIMO), ac (5 GHz, Gigabit), ax (Wi-Fi 6).
- **Wireless NIC modes**: Managed (client), Master (AP), Ad-hoc, Monitor (packet capture).
- **SSID** identifies the network; can be hidden but still discoverable.
- **Basic Service Set (BSS)** is one AP; **Extended Service Set (ESS)** is multiple APs sharing same SSID.
- **Channels**: 2.4 GHz has 14 channels (1-11 in US), overlapping; 5 GHz has more non-overlapping channels.

**Common Pitfalls:**
- Hidden SSID is not a security measure; the SSID is still transmitted in probe requests/responses and can be captured.
- MAC filtering is easily bypassed via spoofing.

**Practice Question:**

Which 802.11 standard operates exclusively in the 5 GHz band and supports up to 1 Gbps?
- A) 802.11ac
- B) 802.11n
- C) 802.11b
- D) 802.11g

> **Answer: A** -- 802.11ac operates only in the 5 GHz band and supports gigabit+ speeds. (B: 802.11n works in both 2.4 GHz and 5 GHz and tops out around 600 Mbps; C and D: 802.11b/g operate only in 2.4 GHz.)
---

## Wireless Encryption

**Key Facts:**
- **WEP**: RC4, weak IVs (24-bit), easily cracked (`aircrack-ng` collects IVs).
- **WPA**: TKIP with RC4, improves on WEP but vulnerable to dictionary attacks on PSK (crack with `airolib-ng`).
- **WPA2**: CCMP/AES, strong; vulnerability in WPS (PIN brute-force) and handshake capture + dictionary.
- **WPA3**: SAE (Simultaneous Authentication of Equals), protects against offline dictionary attacks.
- **EAP types for enterprise**: PEAP, EAP-TLS (certificate-based).

**Common Pitfalls:**
- WPA2 is secure, but WPS PIN (8 digits, last digit is checksum) can be cracked in hours via brute-force using tools like Reaver.

**Practice Question:**

A wireless network uses AES encryption and requires a pre-shared key. This is:
- A) WPA2-Personal
- B) WEP
- C) WPA2-Enterprise
- D) WPA

> **Answer: A** -- WPA2-Personal uses AES/CCMP encryption with a pre-shared key (PSK) for authentication. (B: WEP uses RC4, not AES; C: WPA2-Enterprise uses 802.1X/RADIUS authentication, not a pre-shared key; D: WPA primarily uses TKIP, not AES.)
---

## Wireless Threats

**Key Facts:**
- **Rogue AP**: unauthorized AP connected to network, can be used for MITM.
- **Evil twin**: fake AP with same SSID to lure users.
- **Jamming**: DoS by flooding RF with noise.
- **Wardriving**: searching for Wi-Fi networks while moving.
- **Bluejacking**: sending unsolicited messages to Bluetooth devices.

**Common Pitfalls:**
- Evil twin attack does not require physical connection to the network; it just mimics the SSID to capture credentials.

**Practice Question:**

An attacker sets up an AP broadcasting the same SSID as a coffee shop's free Wi-Fi. Users connect and enter passwords which are captured. This is a:
- A) Rogue AP
- B) Wardriving
- C) Jamming
- D) Evil twin

> **Answer: D** -- An evil twin is a fake AP mimicking a legitimate SSID to lure users and capture credentials. (A: a rogue AP is any unauthorized AP connected to the network, not necessarily impersonating another; B: wardriving is searching for networks while moving; C: jamming is denial-of-service via RF interference.)
---

## Wireless Hacking Methodology

**Key Facts:**
1. **Discover wireless networks**: NetStumbler, Kismet.
2. **Gain access**: crack encryption (WEP, WPA) or exploit WPS.
3. **Once connected**: perform network scanning and attacks.
4. **WEP cracking**: collect enough IVs (`aircrack-ng`).
5. **WPA cracking**: capture 4-way handshake, then dictionary/brute-force with `aircrack-ng`.

**Common Pitfalls:**
- The 4-way handshake capture does not require disconnecting; but `aireplay-ng --deauth` can force a client to reconnect and capture handshake faster.

**Practice Question:**

To crack WEP, an attacker needs to capture a large number of:
- A) Beacon frames
- B) Data packets with weak initialization vectors
- C) SSIDs
- D) ACKs

> **Answer: B** -- WEP's RC4 implementation reuses a small (24-bit) IV space; capturing enough IVs lets tools like aircrack-ng statistically recover the key. (A, C, D: beacon frames, SSIDs, and ACKs don't contain the IV data needed for the attack.)
---

## Wireless Hacking Tools

**Key Facts:**
- **Aircrack-ng suite**: `airmon-ng` (monitor mode), `airodump-ng` (capture), `aireplay-ng` (inject), `aircrack-ng` (crack).
- **Kismet**: wireless network detector, sniffer, and IDS.
- **NetStumbler**: Windows, discovers networks (only for active, not monitor mode).
- **Reaver**: brute-forces WPS PIN.
- **Wifite**: automated tool for wireless attacks.

**Common Pitfalls:**
- `airmon-ng` puts card into monitor mode (e.g., `airmon-ng start wlan0`). If the card does not support monitor mode, many tools will not work.

**Practice Question:**

Which tool is specifically used to brute-force the WPS PIN?
- A) Wireshark
- B) Nmap
- C) Aircrack-ng
- D) Reaver

> **Answer: D** -- Reaver is purpose-built to brute-force the WPS PIN. (A: Wireshark is a packet analyzer; B: Nmap is a port/network scanner; C: Aircrack-ng cracks WEP/WPA keys but doesn't brute-force WPS PINs.)
---

## Bluetooth Hacking

**Key Facts:**
- Bluetooth operates at 2.4 GHz, range 10-100m depending on class.
- **Bluejacking**: sending unsolicited messages.
- **Bluesnarfing**: unauthorized access to device data (contacts, calendar).
- **Bluebugging**: taking control of device to make calls, send messages.
- **Tools**: hcitool, btscanner, BlueSmack (DoS).

**Common Pitfalls:**
- Bluesnarfing steals data; Bluebugging gives full control.

**Practice Question:**

An attacker connects to a phone and remotely makes calls without the owner's knowledge. This is:
- A) Bluebugging
- B) Bluesnarfing
- C) Bluejacking
- D) Bluecasing

> **Answer: A** -- Bluebugging gives an attacker remote control of a device's functions (like placing calls) without the owner's knowledge. (B: bluesnarfing is unauthorized theft of data such as contacts or messages; C: bluejacking is sending unsolicited messages/files, not gaining control; D: bluecasing isn't a standard, widely used term, included here as a distractor.)
---

## Wireless Attack Countermeasures

**Key Facts:**
- Use WPA2/WPA3-Enterprise with strong passwords, disable WPS.
- Use 802.1X with RADIUS for authentication.
- Disabling SSID broadcast is not effective; instead use strong encryption.
- Enable wireless IDS/IPS to detect rogue APs.
- Keep AP firmware updated and change default credentials.

**Common Pitfalls:**
- Disabling SSID broadcast does not prevent hackers from discovering the network; it just does not appear in beacon frames but probe responses still reveal it.

**Practice Question:**

Which is the most effective method to secure a Wi-Fi network?
- A) WPA2/3 with strong passphrase
- B) Use static IPs
- C) MAC filtering
- D) Disable SSID broadcast

> **Answer: A** -- Strong encryption (WPA2/WPA3) with a robust passphrase is the primary defense. (B: static IPs don't affect wireless security; C: MAC filtering is trivially bypassed via spoofing; D: hiding the SSID doesn't stop it from being seen in probe requests.)
---

## Wireless Security Tools

**Key Facts:**
- Kismet can be used as wireless IDS to detect attacks.
- AirDefense (commercial) monitors for rogue devices.
- Wireshark with appropriate drivers can capture wireless frames.
- Aruba Networks, Cisco CleanAir for RF management.
- AirMagnet for spectrum analysis.

**Common Pitfalls:**
- A wireless intrusion prevention system (WIPS) can automatically block rogue APs by sending deauthentication frames.

**Practice Question:**

Which tool can be used to detect and locate rogue access points?
- A) Hydra
- B) Aircrack-ng
- C) Kismet
- D) Nmap

> **Answer: C** -- Kismet is a wireless network detector and intrusion detection tool that can identify rogue APs. (A: Hydra is a password-cracking tool; B: Aircrack-ng cracks Wi-Fi encryption keys; D: Nmap is a network/port scanner, not built for wireless detection.)