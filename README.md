# CEH Study Material

> A comprehensive, self-contained study bundle covering all 9 CEH exam domains with 154 practice questions and detailed answer explanations.

## What's Inside

This repository contains complete notes for the Certified Ethical Hacker (CEH) exam, organized by the 9 official domains. Each topic includes:

- **Core Concept** — clear explanation of the theory
- **Key Tools** — commands, flags, and tool syntax you need to know
- **Common Pitfalls** — mistakes that trip people up on the exam
- **Practice Question** — MCQ with 4 options and a detailed answer explanation

## Contents

| # | Domain | Questions |
|---|--------|-----------|
| 1 | [Information Security and Ethical Hacking](content/markdown/ceh-bundle/01-information-security-and-ethical-hacking.md) | 6 |
| 2 | [Reconnaissance Techniques](content/markdown/ceh-bundle/02-reconnaissance-techniques.md) | 28 |
| 3 | [System Hacking](content/markdown/ceh-bundle/03-system-hacking.md) | 22 |
| 4 | [Network and Perimeter Hacking](content/markdown/ceh-bundle/04-network-and-perimeter-hacking.md) | 34 |
| 5 | [Web Application Hacking](content/markdown/ceh-bundle/05-web-application-hacking.md) | 29 |
| 6 | [Wireless Network Hacking](content/markdown/ceh-bundle/06-wireless-network-hacking.md) | 8 |
| 7 | [Mobile, IoT, and OT Hacking](content/markdown/ceh-bundle/07-mobile-iot-and-ot-hacking.md) | 13 |
| 8 | [Cloud Computing](content/markdown/ceh-bundle/08-cloud-computing.md) | 6 |
| 9 | [Cryptography](content/markdown/ceh-bundle/09-cryptography.md) | 8 |
| | **Total** | **154** |

## How to Use

1. **Read the markdown files directly** — each domain is a standalone `.md` file you can view on GitHub or any markdown reader.
2. **Download the PDF** — grab [`ceh study material.pdf`](content/pdf/ceh%20study%20material.pdf) for an offline, print-friendly version with a cover page, clickable table of contents, and page numbers.
3. **Skim the review checklist** — [`review-checklist.md`](review-checklist.md) lists every command/syntax and every answer key in one place for rapid self-testing.

## Regenerating the PDF

Requires [Node.js](https://nodejs.org/) and [Google Chrome](https://www.google.com/chrome/).

```bash
npm install
npm run convert
```

Output is written to `content/pdf/`.

## Disclaimer

This is an independent study resource created for exam preparation. It is not affiliated with, endorsed by, or sponsored by EC-Council. CEH is a registered trademark of EC-Council.

## License

This material is provided as-is for personal study use.
