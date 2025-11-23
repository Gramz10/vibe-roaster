# Security Policy

**Project:** Vibe-Roaster  
**Version:** 1.0  
**Last Updated:** November 22, 2025

---

## 🔒 Overview

Security is at the core of Vibe-Roaster—ironically, this project exists to help others write more secure code. We take the security of this project extremely seriously and appreciate the security research community's help in keeping it safe.

This document outlines:
- How to report security vulnerabilities
- What to expect from our security response process
- Our security practices and commitments
- Privacy policy for user data

---

## 🚨 Reporting a Vulnerability

### ⚠️ Please DO NOT Report Security Vulnerabilities Publicly

**DO NOT:**
- ❌ Open a public GitHub issue
- ❌ Post in discussions or social media
- ❌ Share details publicly before we've had a chance to fix it

**DO:**
- ✅ Email security reports to: **gerardoram1010@gmail.com**
- ✅ Use subject line: `[SECURITY] Vibe-Roaster - [Brief Description]`
- ✅ Include detailed reproduction steps
- ✅ Allow us reasonable time to fix the issue before public disclosure

### What to Include in Your Report

To help us triage and fix the issue quickly, please include:

1. **Description of the vulnerability**
   - What type of vulnerability is it? (XSS, SQL injection, auth bypass, etc.)
   - What is the potential impact?

2. **Steps to reproduce**
   - Detailed step-by-step instructions
   - Any specific conditions or configurations needed
   - Screenshots or video if applicable

3. **Proof of concept**
   - Sample code or requests
   - Exact URLs and parameters
   - Any tools or scripts used

4. **Your environment**
   - Browser and version (for frontend issues)
   - Operating system
   - Any relevant configuration

5. **Suggested fix** (optional but appreciated)
   - If you have ideas for how to fix it, let us know!

### Example Report Template

```markdown
Subject: [SECURITY] Vibe-Roaster - SQL Injection in Analysis Endpoint

**Vulnerability Type:** SQL Injection

**Affected Component:** Backend API - /api/analysis/start endpoint

**Impact:** High - Potential unauthorized database access

**Description:**
The `repo_url` parameter in the analysis start endpoint is vulnerable 
to SQL injection due to improper input sanitization...

**Steps to Reproduce:**
1. Authenticate as any user
2. Send POST request to /api/analysis/start with payload:
   {"repo_url": "https://github.com/test/repo'; DROP TABLE users; --"}
3. Observe SQL error in response

**Proof of Concept:**
[Include curl command or Postman collection]

**Suggested Fix:**
Use parameterized queries instead of string concatenation in...
```

---

## 📋 Security Response Process

### Our Commitment

When you report a vulnerability, we commit to:

1. **Acknowledgment within 48 hours**
   - We'll confirm we received your report
   - Provide an initial assessment of severity

2. **Regular updates**
   - Status updates every 3-5 business days
   - Let you know when a fix is being worked on

3. **Fix timeline based on severity**
   - **Critical:** Patch within 48 hours
   - **High:** Patch within 1 week
   - **Medium:** Patch within 2 weeks
   - **Low:** Patch in next release cycle

4. **Public disclosure coordination**
   - We'll work with you on disclosure timing
   - Typically 90 days after fix is deployed
   - Credit given to researcher (unless you prefer anonymity)

5. **Recognition**
   - Public acknowledgment in CHANGELOG
   - Added to security researchers hall of fame (if desired)
   - Swag/merchandise (once we have some!)

### Severity Classification

We use the following guidelines to classify vulnerability severity:

**Critical** 🔴
- Remote code execution
- Authentication bypass
- Mass data exposure
- Privilege escalation to admin

**High** 🟠
- SQL injection
- Significant data exposure
- XSS with potential for account takeover
- API key or token exposure

**Medium** 🟡
- CSRF vulnerabilities
- Limited information disclosure
- Denial of service
- Missing security headers

**Low** 🟢
- Minor information disclosure
- Best practice violations
- Low-impact configuration issues

---

## 🛡️ Our Security Practices

### Code Security

**Backend (Python/FastAPI)**
- All dependencies regularly updated (Dependabot)
- Static analysis with Bandit
- Type checking with mypy
- SQL injection prevention via SQLAlchemy ORM
- Input validation with Pydantic schemas
- Rate limiting on all endpoints
- JWT token authentication

**Frontend (React/TypeScript)**
- All dependencies regularly updated
- XSS prevention through React's built-in escaping
- Content Security Policy headers
- No `dangerouslySetInnerHTML` unless absolutely necessary
- Sanitization of user-generated content
- HTTPS-only in production

### Infrastructure Security

**Secrets Management**
- No secrets committed to git (verified with git-secrets)
- Environment variables for all sensitive config
- GitHub tokens encrypted at rest (AES-256-GCM)
- Different secrets for dev/staging/production

**Database Security**
- SSL/TLS connections required
- Least-privilege user accounts
- Regular automated backups
- No direct internet access (private network only)

**API Security**
- HTTPS only (TLS 1.3)
- CORS properly configured (no wildcards in prod)
- Authentication required for all sensitive endpoints
- Rate limiting per user and per IP
- Request size limits
- Timeout protection

**Dependency Management**
- Automated security scanning (Dependabot, Snyk)
- No known high/critical vulnerabilities in dependencies
- Regular dependency updates
- Lock files committed (requirements.txt, package-lock.json)

### Development Practices

**Code Review**
- All changes reviewed by at least one other developer
- Security-focused review for sensitive changes
- Automated tests must pass before merge

**Testing**
- Unit tests for security-critical functions
- Integration tests for authentication flows
- Penetration testing before major releases

**Deployment**
- Automated CI/CD pipeline
- Staging environment for testing
- Rollback capability for quick incident response
- Zero-downtime deployments

---

## 🔐 Privacy Policy

### Data We Collect

**User Account Data**
- GitHub username and ID (required for authentication)
- Email address (from GitHub, optional)
- Avatar URL (from GitHub)
- GitHub access token (encrypted)

**Analysis Data**
- Repository URLs you choose to analyze
- Analysis results (vulnerabilities found, roast text)
- Timestamps of analyses

**Technical Data**
- IP address (for rate limiting and abuse prevention)
- User agent string
- API request logs (retained for 30 days)

### Data We DO NOT Collect

- ❌ Your source code (analyzed in memory only, never stored)
- ❌ Passwords (we use OAuth, so we never see your GitHub password)
- ❌ Personal browsing history
- ❌ Device fingerprints
- ❌ Third-party tracking cookies

### How We Use Your Data

**For Functionality**
- Authenticate you via GitHub OAuth
- Clone and analyze repositories you select
- Store analysis results for your reference
- Generate AI roasts based on code patterns

**For Security & Operations**
- Prevent abuse and rate limit violations
- Debug issues and improve the service
- Monitor for security incidents

**For Communication**
- Send service-related notifications (optional)
- Respond to support requests

### Data Sharing

We share your data with:

**OpenAI** (for AI roast generation)
- Only vulnerability context is sent (not full source code)
- No PII is sent
- Subject to OpenAI's data usage policy

**GitHub** (for repository access)
- Your OAuth token is used to access repos on your behalf
- Only repos you explicitly select are accessed

**We DO NOT:**
- ❌ Sell your data to third parties
- ❌ Use your code for AI training
- ❌ Share analysis results publicly (unless you opt-in)

### Data Retention

- **Source Code:** Deleted immediately after analysis (never stored)
- **Analysis Results:** Retained indefinitely (unless you delete them)
- **GitHub Tokens:** Deleted when you disconnect your account
- **Logs:** Retained for 30 days, then automatically purged

### Your Rights

You have the right to:
- ✅ Access your data (export available in dashboard)
- ✅ Delete your account and all associated data
- ✅ Opt out of optional communications
- ✅ Request data portability (JSON export)

To exercise these rights, email: gerardoram1010@gmail.com

### Compliance

- **GDPR** (EU): We comply with GDPR requirements
- **CCPA** (California): We honor California privacy rights
- **Data Processing:** Hosted in US data centers (subject to US laws)

---

## 🔍 Security Audits

### Current Status
- **Last Security Review:** November 22, 2025
- **Last Penetration Test:** Not yet conducted (pre-launch)
- **Last Dependency Audit:** November 22, 2025

### Planned Audits
- Pre-launch security review: December 2025
- Post-launch penetration test: Q1 2026
- Annual security audit thereafter

---

## 📊 Vulnerability Disclosure History

No vulnerabilities have been reported or fixed yet (project is in initial development).

Once vulnerabilities are discovered and fixed, they will be listed here with:
- Date discovered
- Date fixed
- Severity rating
- Credit to researcher (if applicable)
- Brief description of impact

---

## 🏆 Security Researchers Hall of Fame

Thank you to the following researchers who have helped make Vibe-Roaster more secure:

_No submissions yet - be the first!_

---

## 🔗 Security Resources

### Learn More
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [CWE Top 25](https://cwe.mitre.org/top25/)
- [Anthropic API Security](https://docs.anthropic.com/claude/docs/security)

### Our Security Tools
- **SAST:** Bandit (Python), ESLint security plugin
- **Dependency Scanning:** Dependabot, Snyk
- **Secrets Detection:** git-secrets
- **Container Scanning:** Docker Scout

---

## 📧 Contact

**Security Email:** gerardoram1010@gmail.com  
**PGP Key:** Coming soon  
**Expected Response Time:** Within 48 hours

For non-security issues, please use:
- **Bug Reports:** [GitHub Issues](https://github.com/Gramz10/vibe-roaster/issues)
- **Feature Requests:** [GitHub Discussions](https://github.com/Gramz10/vibe-roaster/discussions)
- **General Questions:** gerardoram1010@gmail.com

---

## 📜 Legal

This security policy is subject to change. Material changes will be announced via:
- GitHub release notes
- Email to registered users (for significant changes)

Last update: November 22, 2025

---

<div align="center">

**Thank you for helping keep Vibe-Roaster and its users safe! 🙏**

</div>

