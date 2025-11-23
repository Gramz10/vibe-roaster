"""
AI service for generating roasts using Claude or OpenAI.
"""

import random
from typing import List, Optional

from ..config import get_settings
from ..schemas import Finding, SuggestedFix


class AIService:
    """Service for generating AI-powered roasts and fixes."""

    def __init__(self):
        self.settings = get_settings()
        
        # Different roast personalities for variety
        self.roast_personalities = [
            {
                "name": "savage_tech_bro",
                "system": "You are a sarcastic Silicon Valley tech bro who roasts code like it's a failed startup pitch.",
                "style": "Use startup/tech metaphors, be brutally honest, reference tech culture"
            },
            {
                "name": "disappointed_professor",
                "system": "You are a disappointed computer science professor who expected better from your students.",
                "style": "Academic disappointment, reference classic CS concepts, educational but harsh"
            },
            {
                "name": "hacker_comedian",
                "system": "You are a witty hacker who finds security holes hilarious and roasts them with internet humor.",
                "style": "Memes, hacker culture references, dark humor, technically accurate"
            },
            {
                "name": "security_chef",
                "system": "You are Gordon Ramsay but for code security - passionate, loud, and brutally honest.",
                "style": "Cooking/kitchen metaphors, passionate anger, 'IT'S RAW!' energy"
            },
            {
                "name": "snarky_ai",
                "system": "You are a snarky AI that's seen too much bad code and has developed a sardonic personality.",
                "style": "Existential humor, AI references, clever wordplay, deadpan sarcasm"
            }
        ]

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

            # Pick a random personality for variety
            personality = random.choice(self.roast_personalities)
            
            # Vary the prompt structure
            prompt_templates = [
                f"""You are a {personality['name'].replace('_', ' ')}. {personality['system']}

Roast this terrible code! Here are the security findings:
{findings_summary}

Write a SHORT, SAVAGE roast (max 3 sentences) using {personality['style']}. Then provide specific fixes.

Format:
ROAST: [Your 3-sentence burn]
FIXES:
1. [Type]: [One-line fix]
...""",
                
                f"""Security audit complete. Time for the roast! 🔥

Context: {personality['system']}
Style: {personality['style']}

Vulnerabilities found:
{findings_summary}

Deliver a HILARIOUS 3-sentence security roast that would make developers cry (but learn). Follow with actionable fixes.

ROAST: [Your comedy gold here]
FIXES: [Your wisdom here]""",
                
                f"""Imagine you're {personality['name'].replace('_', ' ')} reviewing this code.

{findings_summary}

Task: Write the most MEMORABLE and FUNNY 3-sentence roast possible. {personality['style']}. Be brutal but educational.

Output format:
ROAST: [3 sentences of pure fire]
FIXES: [Numbered list of solutions]"""
            ]
            
            selected_prompt = random.choice(prompt_templates)

            response = client.chat.completions.create(
                model="grok-beta",
                messages=[
                    {
                        "role": "system",
                        "content": personality["system"]
                    },
                    {"role": "user", "content": selected_prompt}
                ],
                max_tokens=1024,
                temperature=random.uniform(0.85, 1.1),  # Higher temp for more creativity
                presence_penalty=0.6,  # Encourage new topics/phrases
                frequency_penalty=0.3   # Reduce repetition
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

            # Use same personality system for consistency
            personality = random.choice(self.roast_personalities)
            
            # Vary the prompt
            prompt_variants = [
                f"""Channel your inner {personality['name'].replace('_', ' ')}. {personality['system']}

Code audit findings:
{findings_summary}

Deliver a UNIQUE, HILARIOUS 3-sentence roast. Style: {personality['style']}

Then provide fixes.

ROAST: [Your masterpiece]
FIXES: [Your solutions]""",
                
                f"""Security roast time! 🔥

Your persona: {personality['system']}
Your style: {personality['style']}

The disasters:
{findings_summary}

Create an ORIGINAL, SAVAGE 3-sentence roast that developers will remember forever. Then list fixes.

ROAST: [Make it hurt]
FIXES: [Make it better]""",
                
                f"""You're {personality['name'].replace('_', ' ')} and you just found these vulnerabilities:

{findings_summary}

React with a CREATIVE, FUNNY 3-sentence roast using {personality['style']}. Be original and memorable!

Format:
ROAST: [Your fire]
FIXES: [Your wisdom]"""
            ]
            
            selected_prompt = random.choice(prompt_variants)

            response = client.chat.completions.create(
                model="gpt-4o",  # Using GPT-4o (faster and better than GPT-4)
                messages=[
                    {
                        "role": "system",
                        "content": personality["system"]
                    },
                    {"role": "user", "content": selected_prompt}
                ],
                max_tokens=1024,
                temperature=random.uniform(0.9, 1.2),  # Higher temp for variety
                presence_penalty=0.6,  # Encourage diverse content
                frequency_penalty=0.4   # Reduce repetition more than Grok
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
        
        # Multiple roast variations for each severity level
        critical_roasts = [
            f"🚨 {critical_count} critical issue(s) found! Your code is leaking secrets like a sieve in a rainstorm. Even script kiddies would have a field day with this.",
            f"💀 Holy smokes, {critical_count} critical vulnerabilities! Your security is more Swiss cheese than software. Time to panic (and patch)!",
            f"🔥 {critical_count} critical issues detected! This code has more holes than a golf course. Bobby Tables is typing your URL right now.",
            f"⚡ {critical_count} CRITICAL problems! Your app's security is like a screen door on a submarine. Patch this before the internet finds out!",
            f"🎯 {critical_count} critical disasters! This isn't defense in depth, it's defense in 'please hack me'. Fix this immediately!"
        ]
        
        high_roasts = [
            f"⚠️ Detected {high_count} high-severity issue(s). Your security practices need serious work. Time to crack open those OWASP Top 10 docs!",
            f"🟠 {high_count} high-severity problems! Your code's security is about as strong as a wet paper bag. Let's level up!",
            f"📢 {high_count} high-severity findings! Did you learn security from a YouTube tutorial made in 2005? Time for an upgrade!",
            f"🎪 {high_count} high-risk issues! Your security is giving circus vibes - entertaining but dangerous. Let's tighten this up!",
            f"⚡ {high_count} high-severity vulnerabilities! This code has 'pwn me' written all over it. Security 101 awaits!"
        ]
        
        medium_roasts = [
            f"Found {len(findings)} security issue(s). Nothing catastrophic, but you're not winning any security awards either. Clean this up before someone less friendly finds it.",
            f"📝 {len(findings)} issues discovered. Not terrible, but definitely not production-ready. A little polish and you'll be golden!",
            f"🔍 {len(findings)} problems detected. You're in the security B-league right now. Let's get you to the majors!",
            f"⚠️ {len(findings)} security concerns. Your code is like a house with unlocked windows - probably fine, but why risk it?",
            f"🎯 {len(findings)} findings logged. Not a disaster, but not impressive either. Time to show off those security skills!"
        ]
        
        # Select random roast based on severity
        if critical_count > 0:
            roast = random.choice(critical_roasts)
        elif high_count > 0:
            roast = random.choice(high_roasts)
        else:
            roast = random.choice(medium_roasts)

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

