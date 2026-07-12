# Domain 9: Cryptography

## Sub-Domain: Cryptography

---

## Cryptography Concepts

**Core Concept:** Cryptography secures data confidentiality, integrity, authentication, and non-repudiation. Symmetric encryption uses one key; asymmetric uses key pairs. Hashes verify integrity. Attackers target weak algorithms or implementations.

**Key Tools:** OpenSSL (`openssl enc -aes-256-cbc -in file`), GPG (`gpg -c file`), Hash: `sha256sum`.

**Port Numbers & Protocols:** N/A

**Common Pitfalls:**
- Symmetric is fast for bulk data; asymmetric is used for key exchange and digital signatures.
- Stream cipher encrypts one bit/byte at a time; block cipher encrypts fixed-size blocks.
- Countermeasure: Use strong, modern algorithms (AES, RSA 2048+), keep keys secret, use proper key management.

**Practice Question:**

Which type of encryption algorithm uses the same key for both encryption and decryption?
- A) Digital signature
- B) Asymmetric
- C) Hashing
- D) Symmetric

> **Answer: D** -- Symmetric uses a shared secret.
---

## Encryption Algorithms

**Core Concept:**
- **Symmetric**: DES (obsolete), 3DES (legacy), AES (gold standard).
- **Asymmetric**: RSA, ECC, Diffie-Hellman (key exchange), ElGamal.
- **Hash**: MD5 (broken), SHA-1 (deprecated), SHA-256/512.
- RC4, Blowfish also appear.

**Key Tools:** OpenSSL for algorithm operations. `openssl speed` for benchmarks.

**Port Numbers & Protocols:** N/A

**Common Pitfalls:**
- DES has 56-bit key, AES supports 128/192/256.
- RSA key length 2048+.
- Diffie-Hellman is key agreement, not encryption.
- Countermeasure: Disable legacy algorithms (DES, MD5, RC4) in configurations.

**Practice Question:**

An organization needs to exchange a session key securely over an insecure channel. Which algorithm is designed for this?
- A) Base64
- B) AES
- C) Diffie-Hellman
- D) SHA-256

> **Answer: C** -- Diffie-Hellman allows secure key exchange.
---

## Cryptography Tools

**Core Concept:** Tools implement cryptographic operations. OpenSSL is multi-purpose; GPG/PGP for email/file encryption; VeraCrypt for disk; Hashcat for cracking; Bcrypt for password hashing.

**Key Tools:**
- **OpenSSL**: `openssl req -new -x509 -keyout key.pem` (generate cert)
- **GPG**: `gpg --gen-key`
- **Cryptool**: educational
- **Hashcalc**: calculate hashes

**Port Numbers & Protocols:** N/A

**Common Pitfalls:**
- VeraCrypt for full disk encryption, PGP for email, OpenSSL for SSL/TLS certs.
- Countermeasure: Use these tools to encrypt data at rest and in transit, and manage certificates.

**Practice Question:**

A security analyst needs to create a self-signed certificate for a web server. Which command-line tool would they likely use?
- A) John the Ripper
- B) OpenSSL
- C) Wireshark
- D) Nmap

> **Answer: B** -- OpenSSL can generate X.509 certs.
---

## Public Key Infrastructure (PKI)

**Core Concept:** PKI manages digital certificates using a Certificate Authority (CA). Components: CA, Registration Authority (RA), certificate repository. X.509 standard. Used for SSL/TLS, code signing.

**Key Tools:** OpenSSL (CA creation), Microsoft CA, certutil, keytool (Java).

**Port Numbers & Protocols:** LDAP 389, HTTP 80 for CRL distribution.

**Common Pitfalls:**
- The CA issues the certificate; RA verifies identity.
- Certificate revocation is done via CRL (list) or OCSP (real-time).
- If the CA is compromised, all its certs are suspect.
- Countermeasure: Protect private key of CA, use offline root CA, monitor for unauthorized certs.

**Practice Question:**

A browser needs to check if a website's certificate has been revoked. Which protocol provides real-time status?
- A) CRL
- B) DHCP
- C) OCSP
- D) DNS

> **Answer: C** -- OCSP provides online certificate status.
---

## Email Encryption

**Core Concept:** Encrypting email ensures confidentiality (only recipient can read) and integrity. PGP and S/MIME are standards. PGP uses web of trust, S/MIME uses hierarchical CA.

**Key Tools:** PGP/GnuPG (`gpg --encrypt --recipient user@example.com file`), S/MIME built into email clients, Mailvelope (browser).

**Port Numbers & Protocols:** SMTP 25/587, IMAP 143, POP3 110.

**Common Pitfalls:**
- PGP uses a combination of symmetric (session key) and asymmetric (key exchange).
- PGP uses IDEA or AES for symmetric; RSA for public key.
- S/MIME uses X.509 certs.

**Countermeasures:** Use email encryption for sensitive data, enforce policies.

**Practice Question:**

Which email encryption protocol uses a distributed trust model (web of trust) instead of a central CA?
- A) S/MIME
- B) IPsec
- C) SSL/TLS
- D) PGP

> **Answer: D** -- PGP uses web of trust.
---

## Disk Encryption

**Core Concept:** Full disk encryption (FDE) protects data at rest. If a device is lost, data remains unreadable without key. Tools: BitLocker (Windows), FileVault (macOS), LUKS (Linux), VeraCrypt.

**Key Tools:**
- BitLocker: `manage-bde -on C:`
- VeraCrypt: create encrypted volume
- LUKS: `cryptsetup luksFormat /dev/sda1`

**Port Numbers & Protocols:** N/A

**Common Pitfalls:**
- TPM (Trusted Platform Module) stores BitLocker keys securely. Without TPM, a USB key or PIN is needed.
- Cold boot attacks against disk encryption.

**Countermeasures:** Use strong passphrases, enable Secure Boot, combine TPM with PIN.

**Practice Question:**

A laptop with BitLocker enabled is stolen. What prevents the thief from accessing the data?
- A) Antivirus
- B) Strong Windows password
- C) BIOS password
- D) The disk is encrypted and requires the decryption key

> **Answer: D** -- Full disk encryption secures data even if OS password is bypassed.
---

## Cryptanalysis

**Core Concept:** Cryptanalysis is the study of breaking cryptographic systems. Methods: brute-force, ciphertext-only, known-plaintext, chosen-plaintext, man-in-the-middle, side-channel, birthday attack on hashes.

**Key Tools:** Hashcat (brute-force), John the Ripper, Cryptool, Wireshark.

**Port Numbers & Protocols:** N/A

**Common Pitfalls:**
- Birthday attack exploits collision probability in hash functions (related to 2^(n/2) for n-bit hash).
- Side-channel attacks measure physical info (power, timing).
- Known-plaintext uses known pairs to break encryption.

**Countermeasures:** Use long keys, strong algorithms, avoid vulnerable implementations, use constant-time operations.

**Practice Question:**

An attacker intercepts encrypted messages and also knows some plaintext portions (e.g., header). They use this to derive the key. What type of attack?
- A) Brute-force
- B) Known-plaintext
- C) Replay
- D) Chosen-ciphertext

> **Answer: B** -- Known-plaintext uses known pairs to break encryption.
---

## Cryptography Attack Countermeasures

**Core Concept:** Use strong, standard algorithms; keep keys private; use key rotation; employ proper PKI; implement salt for password hashing; use authenticated encryption; and use TLS 1.3 for communications.

**Key Tools:** Configure server to disable weak ciphers (e.g., Apache `SSLCipherSuite`), HSTS, certificate pinning. Hash passwords with bcrypt/scrypt/PBKDF2.

**Port Numbers & Protocols:** N/A

**Common Pitfalls:**
- Salting prevents rainbow table attacks by adding random data to each password hash.
- Countermeasure against MitM on TLS is certificate pinning.

**Countermeasures:** Regular security audits and compliance with standards like PCI DSS (strong encryption).

**Practice Question:**

To defend against rainbow table attacks on password databases, what should be used?
- A) Long passwords
- B) A unique salt per password
- C) MD5 hashing
- D) Strong encryption

> **Answer: B** -- Salting makes precomputed tables ineffective.