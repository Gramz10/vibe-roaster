"""
AI service for generating roasts using Claude or OpenAI.
"""

from typing import List, Optional

from ..config import get_settings
from ..schemas import Finding, SuggestedFix


class AIService:
    """Service for generating AI-powered roasts and fixes."""

    def __init__(self):
        self.settings = get_settings()

    def generate_roast_and_fixes(
        self,
        findings: List[Finding]
    ) -> tuple[str, List[SuggestedFix]]:
        """
        Generate a roast and suggested fixes for security findings.

        Args:
            findings: List of security findings

        Returns:
            tuple: (roast_text, suggested_fixes)
        """
        if not findings:
            return (
                "🎉 Congrats! Your code is cleaner than a whistle in a sanitization factory. "
                "No vulnerabilities found - you actually read the security docs!",
                []
            )

        # Prepare findings summary for AI
        findings_summary = self._format_findings_for_ai(findings)

        # Try Grok first, fall back to OpenAI, then rule-based
        if self.settings.grok_api_key:
            return self._generate_with_grok(findings_summary, findings)
        elif self.settings.openai_api_key:
            return self._generate_with_openai(findings_summary, findings)
        else:
            # Fallback to rule-based roast if no AI key
            return self._generate_fallback_roast(findings)

    def _format_findings_for_ai(self, findings: List[Finding]) -> str:
        """Format findings into a readable summary for AI."""
        summary_lines = []
        
        for i, finding in enumerate(findings, 1):
            summary_lines.append(
                f"{i}. {finding.type} ({finding.severity}) in {finding.file_path}: "
                f"{finding.description}"
            )
        
        return "\n".join(summary_lines)

    def _generate_with_grok(
        self,
        findings_summary: str,
        findings: List[Finding]
    ) -> tuple[str, List[SuggestedFix]]:
        """Generate roast using xAI's Grok."""
        try:
            from openai import OpenAI

            # Grok uses OpenAI-compatible API
            client = OpenAI(
                api_key=self.settings.grok_api_key,
                base_url="https://api.x.ai/v1"
            )

            prompt = f"""You are a savage but helpful security expert. 

Your task: Turn these raw vulnerability findings into a SHORT, HILARIOUS roast (max 3 sentences) followed by specific one-line fixes.

Be funny, sarcastic, and memorable - but stay accurate and helpful. Use metaphors and exaggeration.

Findings:
{findings_summary}

Format your response as:
ROAST: [3 sentences of savage but funny commentary]

FIXES:
1. [Finding type]: [One-line fix suggestion]
2. [Finding type]: [One-line fix suggestion]
...

Go!"""

            response = client.chat.completions.create(
                model="grok-beta",
                messages=[
                    {
                        "role": "system",
                        "content": "You are a witty security expert who delivers harsh but helpful code reviews with humor."
                    },
                    {"role": "user", "content": prompt}
                ],
                max_tokens=1024,
                temperature=0.8
            )

            response_text = response.choices[0].message.content

            # Parse response
            roast, fixes = self._parse_ai_response(response_text, findings)
            return roast, fixes

        except Exception as e:
            print(f"Error generating roast with Grok: {e}")
            # Try OpenAI fallback
            if self.settings.openai_api_key:
                return self._generate_with_openai(findings_summary, findings)
            else:
                return self._generate_fallback_roast(findings)

    def _generate_with_openai(
        self,
        findings_summary: str,
        findings: List[Finding]
    ) -> tuple[str, List[SuggestedFix]]:
        """Generate roast using OpenAI."""
        try:
            from openai import OpenAI

            client = OpenAI(api_key=self.settings.openai_api_key)

            prompt = f"""You are a savage but helpful security expert. 

Your task: Turn these raw vulnerability findings into a SHORT, HILARIOUS roast (max 3 sentences) followed by specific one-line fixes.

Be funny, sarcastic, and memorable - but stay accurate and helpful. Use metaphors and exaggeration.

Findings:
{findings_summary}

Format your response as:
ROAST: [3 sentences of savage but funny commentary]

FIXES:
1. [Finding type]: [One-line fix suggestion]
2. [Finding type]: [One-line fix suggestion]
...

Go!"""

            response = client.chat.completions.create(
                model="gpt-4o",  # Using GPT-4o (faster and better than GPT-4)
                messages=[
                    {
                        "role": "system",
                        "content": "You are a witty security expert who delivers harsh but helpful code reviews with humor."
                    },
                    {"role": "user", "content": prompt}
                ],
                max_tokens=1024,
                temperature=0.8
            )

            response_text = response.choices[0].message.content

            # Parse response
            roast, fixes = self._parse_ai_response(response_text, findings)
            return roast, fixes

        except Exception as e:
            print(f"Error generating roast with OpenAI: {e}")
            return self._generate_fallback_roast(findings)

    def _parse_ai_response(
        self,
        response: str,
        findings: List[Finding]
    ) -> tuple[str, List[SuggestedFix]]:
        """Parse AI response into roast and fixes."""
        roast = ""
        fixes: List[SuggestedFix] = []

        lines = response.strip().split("\n")
        in_fixes_section = False

        for line in lines:
            line = line.strip()
            
            if line.startswith("ROAST:"):
                roast = line.replace("ROAST:", "").strip()
            elif roast and not in_fixes_section and not line.startswith("FIXES"):
                # Multi-line roast
                roast += " " + line
            elif line.startswith("FIXES"):
                in_fixes_section = True
            elif in_fixes_section and line and line[0].isdigit():
                # Parse fix line: "1. SQL Injection: Use parameterized queries"
                parts = line.split(":", 1)
                if len(parts) == 2:
                    finding_type = parts[0].split(".", 1)[-1].strip()
                    fix_text = parts[1].strip()
                    fixes.append(
                        SuggestedFix(
                            finding_type=finding_type,
                            fix=fix_text,
                            example=None
                        )
                    )

        # If parsing failed, use fallback
        if not roast:
            roast, fixes = self._generate_fallback_roast(findings)

        return roast, fixes

    def _generate_fallback_roast(
        self,
        findings: List[Finding]
    ) -> tuple[str, List[SuggestedFix]]:
        """Generate a rule-based roast when AI is unavailable."""
        critical_count = sum(1 for f in findings if f.severity == "critical")
        high_count = sum(1 for f in findings if f.severity == "high")
        
        # Generate roast based on severity
        if critical_count > 0:
            roast = (
                f"🚨 Found {critical_count} critical issue(s)! "
                f"Your code is leaking secrets like a sieve in a rainstorm. "
                f"Even script kiddies would have a field day with this."
            )
        elif high_count > 0:
            roast = (
                f"⚠️ Detected {high_count} high-severity issue(s). "
                f"Your security practices need serious work. "
                f"Time to crack open those OWASP Top 10 docs!"
            )
        else:
            roast = (
                f"Found {len(findings)} security issue(s). "
                f"Nothing catastrophic, but you're not winning any security awards either. "
                f"Clean this up before someone less friendly finds it."
            )

        # Generate generic fixes
        fixes = []
        finding_types_seen = set()
        
        for finding in findings:
            if finding.type not in finding_types_seen:
                fix_text = self._get_generic_fix(finding.type)
                fixes.append(
                    SuggestedFix(
                        finding_type=finding.type,
                        fix=fix_text,
                        example=None
                    )
                )
                finding_types_seen.add(finding.type)

        return roast, fixes

    @staticmethod
    def _get_generic_fix(finding_type: str) -> str:
        """Get a generic fix suggestion for a finding type."""
        fix_map = {
            "Exposed Secret": "Move secrets to environment variables and use a secrets manager",
            "SQL Injection": "Use parameterized queries or an ORM with prepared statements",
            "XSS": "Sanitize user input and use context-aware output encoding",
            "CSRF": "Implement CSRF tokens for all state-changing operations",
            "Path Traversal": "Validate and sanitize file paths, use allowlists",
            "Command Injection": "Avoid shell execution; use parameterized APIs instead",
            "Insecure Deserialization": "Validate input and avoid deserializing untrusted data",
            "Weak Crypto": "Use strong, modern cryptographic algorithms (e.g., AES-256, RSA-2048+)",
        }
        
        return fix_map.get(finding_type, "Review security best practices for this vulnerability type")

