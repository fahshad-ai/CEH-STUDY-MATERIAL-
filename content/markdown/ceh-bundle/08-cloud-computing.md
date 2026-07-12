# Domain 8: Cloud Computing

## Sub-Domain: Cloud Computing

---

## Cloud Computing Concepts

**Key Facts:**
- **Service models**: IaaS (VM), PaaS (platform), SaaS (software). Responsibility shared.
- **Deployment models**: Public, Private, Hybrid, Community.
- **Essential characteristics**: on-demand self-service, broad network access, resource pooling, rapid elasticity, measured service.
- Cloud security relies on **shared responsibility model**: provider secures infrastructure, customer secures data/app.
- Virtualization enables multi-tenancy; hypervisor creates VMs.

**Common Pitfalls:**
- In IaaS, customer is responsible for OS and application security; in SaaS, provider secures most, but customer manages data and user access.

**Practice Question:**

In which cloud service model does the customer manage the operating system and applications?
- A) SaaS
- B) IaaS
- C) None
- D) PaaS

> **Answer: B** -- In IaaS, the provider manages only the physical infrastructure; the customer is responsible for the OS, middleware, and applications. (A: in SaaS the provider manages everything including the application; D: in PaaS the provider manages the OS/runtime, leaving the customer just the application and data; C is not applicable.)
---

## Container Technology

**Key Facts:**
- Containers package applications with dependencies, share host OS kernel, lighter than VMs.
- Docker is the most popular; images from Dockerfile; `docker run` to launch.
- Orchestration with Kubernetes: manages container clusters, pods, services.
- Security risks: image vulnerabilities, misconfigured exposed APIs, privilege escalation.
- Containers run in isolated namespaces and cgroups; escape is a major attack.

**Common Pitfalls:**
- A container escape attack allows the attacker to break out of the container and access the host OS.
- Docker socket `/var/run/docker.sock` exposure is dangerous.

**Practice Question:**

An attacker compromises a container and finds that `/var/run/docker.sock` is mounted. This can allow:
- A) XSS
- B) DDoS
- C) SQL injection
- D) Container escape and host compromise

> **Answer: D** -- Access to /var/run/docker.sock effectively grants root-equivalent control of the host, enabling container escape. (A, B, C: XSS, DDoS, and SQL injection are unrelated attack types, not a consequence of Docker socket exposure.)
---

## Serverless Computing

**Key Facts:**
- **Function-as-a-Service (FaaS)**: AWS Lambda, Azure Functions. Code runs in stateless containers.
- No server provisioning; auto-scales. Billed per execution.
- Security concerns: event injection, insecure dependencies, overly permissive roles, and data exposure.
- Attacks: function event data tampering, denial of wallet (cost), and insecure storage.
- Logging and monitoring is crucial because traditional network security controls do not apply.

**Common Pitfalls:**
- Serverless functions can be triggered by cloud events (S3 bucket upload); if input not validated, attacker can inject malicious payload.

**Practice Question:**

A serverless function is triggered by an HTTP request and processes user-supplied data without sanitization, leading to code execution. This is:
- A) SQL injection
- B) Injection vulnerability in serverless function
- C) ARP spoofing
- D) XSS

> **Answer: B** -- Unsanitized user input processed by a serverless function leading to code execution is an injection vulnerability specific to that serverless context. (A, D: SQL injection and XSS are more specific injection subtypes not confirmed here; C: ARP spoofing is a local network attack, unrelated.)
---

## Cloud Computing Threats

**Key Facts:**
- **Data breach**: due to misconfigured storage buckets (S3, Blob).
- **Insecure APIs**: weak authentication, excessive permissions.
- **Account hijacking**: phishing cloud credentials.
- **Insider threats**: cloud admins abuse privileges.
- **Denial of Service**: resource exhaustion, cost inflation.

**Common Pitfalls:**
- Misconfigured AWS S3 bucket with public read/write is a common cause of data leaks.
- The exam may ask about the shared responsibility model.

**Practice Question:**

A company's AWS S3 bucket containing customer PII is set to "public" for read access. This is:
- A) A DDoS attack
- B) Malware
- C) A security misconfiguration
- D) Phishing

> **Answer: C** -- A publicly readable S3 bucket holding PII is a classic cloud security misconfiguration. (A, B, D: DDoS, malware, and phishing are different attack types, not the root cause here.)
---

## Cloud Hacking

**Key Facts:**
- Exploiting misconfigured cloud resources using tools like ScoutSuite, Prowler, Pacu.
- Credential harvesting via phishing or metadata service (AWS instance metadata at 169.254.169.254).
- SSRF attacks on internal cloud metadata endpoints can retrieve IAM credentials.
- Container breakout and lateral movement in Kubernetes.
- Tools: Pacu (AWS exploitation framework), kube-hunter for Kubernetes.

**Common Pitfalls:**
- The instance metadata endpoint (169.254.169.254) provides temporary credentials to the instance; if a web app is vulnerable to SSRF, attacker can steal those credentials.

**Practice Question:**

An attacker exploits an SSRF vulnerability in a web app to request `http://169.254.169.254/latest/meta-data/iam/security-credentials/` and obtains AWS keys. This attack targets:
- A) DNS
- B) SMTP
- C) SQL server
- D) Cloud instance metadata service

> **Answer: D** -- 169.254.169.254 is the cloud instance metadata service endpoint; SSRF to this address can leak IAM credentials. (A, B, C: DNS, SMTP, and SQL server are unrelated to this specific link-local metadata address.)
---

## Cloud Security

**Key Facts:**
- **Identity and Access Management (IAM)**: least privilege, MFA, rotate keys.
- **Encryption**: at rest and in transit, using KMS/HSM.
- **Network security**: security groups, NACLs, VPC segmentation.
- **Logging and monitoring**: CloudTrail, GuardDuty.
- **Compliance**: follow standards like ISO 27001, CSA STAR.

**Common Pitfalls:**
- Cloud security responsibility depends on service model.
- Always validate that storage buckets are not publicly accessible.

**Practice Question:**

To prevent unauthorized access to AWS resources, which practice is essential?
- A) Use IAM policies with least privilege and enable MFA
- B) Enable public access
- C) Use default VPC
- D) Share root credentials

> **Answer: A** -- Least-privilege IAM policies combined with MFA are the core controls for securing AWS resource access. (B, C, D: enabling public access, using default VPCs, and sharing root credentials all increase risk rather than reduce it.)