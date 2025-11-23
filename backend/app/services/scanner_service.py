"""
Security scanning service using TruffleHog and Semgrep.
"""

import json
import subprocess
from pathlib import Path
from typing import List, Dict, Any

from ..schemas import Finding


class ScannerService:
    """Service for running security scans on code."""

    def scan_repository(self, repo_path: Path) -> List[Finding]:
        """
        Run security scans on a repository.

        Args:
            repo_path: Path to the cloned repository

        Returns:
            List[Finding]: List of security findings
        """
        findings: List[Finding] = []

        # Run TruffleHog for secrets
        trufflehog_findings = self._run_trufflehog(repo_path)
        findings.extend(trufflehog_findings)

        # Run Semgrep for code vulnerabilities (SAST)
        semgrep_findings = self._run_semgrep(repo_path)
        findings.extend(semgrep_findings)

        # Run dependency vulnerability scanning
        dependency_findings = self._run_dependency_scan(repo_path)
        findings.extend(dependency_findings)

        # Run Bandit for Python-specific security issues
        bandit_findings = self._run_bandit(repo_path)
        findings.extend(bandit_findings)

        return findings

    def _run_trufflehog(self, repo_path: Path) -> List[Finding]:
        """
        Run TruffleHog to detect exposed secrets.

        Args:
            repo_path: Path to the repository

        Returns:
            List[Finding]: Detected secrets
        """
        findings: List[Finding] = []

        try:
            # Run trufflehog filesystem scan with JSON output
            result = subprocess.run(
                [
                    "trufflehog",
                    "filesystem",
                    str(repo_path),
                    "--json",
                    "--no-update"
                ],
                capture_output=True,
                text=True,
                timeout=60
            )

            # Parse JSON output (each line is a separate JSON object)
            for line in result.stdout.strip().split("\n"):
                if not line:
                    continue
                
                try:
                    secret = json.loads(line)
                    
                    # Extract relevant information
                    source_metadata = secret.get("SourceMetadata", {})
                    file_path = source_metadata.get("Data", {}).get("Filesystem", {}).get("file", "unknown")
                    
                    finding = Finding(
                        type="Exposed Secret",
                        severity="critical",
                        file_path=file_path,
                        line_number=None,
                        description=f"Detected {secret.get('DetectorName', 'secret')} exposed in code",
                        code_snippet=secret.get("Raw", "")[:200]  # Limit snippet length
                    )
                    findings.append(finding)
                
                except json.JSONDecodeError:
                    continue

        except subprocess.TimeoutExpired:
            print("Warning: TruffleHog scan timed out")
        except FileNotFoundError:
            print("Warning: TruffleHog not installed, skipping secret scanning")
        except Exception as e:
            print(f"Warning: TruffleHog scan failed: {e}")

        return findings

    def _run_semgrep(self, repo_path: Path) -> List[Finding]:
        """
        Run Semgrep for SAST (Static Application Security Testing).

        Args:
            repo_path: Path to the repository

        Returns:
            List[Finding]: Detected vulnerabilities
        """
        findings: List[Finding] = []

        try:
            # Run semgrep with security rules
            result = subprocess.run(
                [
                    "semgrep",
                    "scan",
                    "--config=auto",  # Auto-detect and use appropriate rules
                    "--json",
                    "--quiet",
                    str(repo_path)
                ],
                capture_output=True,
                text=True,
                timeout=120
            )

            # Parse JSON output
            if result.stdout:
                output = json.loads(result.stdout)
                results = output.get("results", [])

                for vuln in results:
                    # Map severity
                    severity_map = {
                        "ERROR": "high",
                        "WARNING": "medium",
                        "INFO": "low"
                    }
                    semgrep_severity = vuln.get("extra", {}).get("severity", "WARNING")
                    severity = severity_map.get(semgrep_severity, "medium")

                    # Get code snippet
                    lines = vuln.get("extra", {}).get("lines", "")

                    finding = Finding(
                        type=vuln.get("check_id", "").split(".")[-1].replace("-", " ").title(),
                        severity=severity,
                        file_path=vuln.get("path", "unknown"),
                        line_number=vuln.get("start", {}).get("line"),
                        description=vuln.get("extra", {}).get("message", "Security vulnerability detected"),
                        code_snippet=lines.strip() if lines else None
                    )
                    findings.append(finding)

        except subprocess.TimeoutExpired:
            print("Warning: Semgrep scan timed out")
        except FileNotFoundError:
            print("Warning: Semgrep not installed, skipping SAST scanning")
        except json.JSONDecodeError:
            print("Warning: Failed to parse Semgrep output")
        except Exception as e:
            print(f"Warning: Semgrep scan failed: {e}")

        return findings

    def _run_dependency_scan(self, repo_path: Path) -> List[Finding]:
        """
        Scan for vulnerable dependencies using safety (Python) and npm audit (Node.js).

        Args:
            repo_path: Path to the repository

        Returns:
            List[Finding]: Detected dependency vulnerabilities
        """
        findings: List[Finding] = []

        # Check for Python dependencies (requirements.txt, Pipfile, poetry.lock)
        python_findings = self._scan_python_dependencies(repo_path)
        findings.extend(python_findings)

        # Check for Node.js dependencies (package.json)
        nodejs_findings = self._scan_nodejs_dependencies(repo_path)
        findings.extend(nodejs_findings)

        return findings

    def _scan_python_dependencies(self, repo_path: Path) -> List[Finding]:
        """Scan Python dependencies for known vulnerabilities."""
        findings: List[Finding] = []

        # Look for requirements files
        req_files = [
            repo_path / "requirements.txt",
            repo_path / "requirements-dev.txt",
            repo_path / "Pipfile",
            repo_path / "poetry.lock"
        ]

        for req_file in req_files:
            if not req_file.exists():
                continue

            try:
                # Run safety check (pip-audit is more comprehensive)
                result = subprocess.run(
                    ["pip-audit", "-r", str(req_file), "--format", "json"],
                    capture_output=True,
                    text=True,
                    timeout=60
                )

                if result.stdout:
                    try:
                        data = json.loads(result.stdout)
                        vulnerabilities = data.get("vulnerabilities", [])

                        for vuln in vulnerabilities:
                            finding = Finding(
                                type="Vulnerable Dependency",
                                severity="high" if vuln.get("fix_versions") else "medium",
                                file_path=str(req_file.relative_to(repo_path)),
                                line_number=None,
                                description=f"{vuln.get('name', 'Unknown')} {vuln.get('version', '')} has known vulnerability: {vuln.get('id', '')}",
                                code_snippet=None
                            )
                            findings.append(finding)
                    except json.JSONDecodeError:
                        pass

            except FileNotFoundError:
                # pip-audit not installed, skip
                pass
            except subprocess.TimeoutExpired:
                print(f"Warning: Dependency scan timed out for {req_file.name}")
            except Exception as e:
                print(f"Warning: Failed to scan {req_file.name}: {e}")

        return findings

    def _scan_nodejs_dependencies(self, repo_path: Path) -> List[Finding]:
        """Scan Node.js dependencies for known vulnerabilities."""
        findings: List[Finding] = []

        package_json = repo_path / "package.json"
        if not package_json.exists():
            return findings

        try:
            # Run npm audit
            result = subprocess.run(
                ["npm", "audit", "--json"],
                cwd=repo_path,
                capture_output=True,
                text=True,
                timeout=60
            )

            if result.stdout:
                try:
                    data = json.loads(result.stdout)
                    vulnerabilities = data.get("vulnerabilities", {})

                    for pkg_name, vuln_info in vulnerabilities.items():
                        severity = vuln_info.get("severity", "medium")
                        
                        finding = Finding(
                            type="Vulnerable Dependency",
                            severity=severity,
                            file_path="package.json",
                            line_number=None,
                            description=f"npm package {pkg_name} has {severity} severity vulnerability",
                            code_snippet=None
                        )
                        findings.append(finding)
                except json.JSONDecodeError:
                    pass

        except FileNotFoundError:
            # npm not installed, skip
            pass
        except subprocess.TimeoutExpired:
            print("Warning: npm audit timed out")
        except Exception as e:
            print(f"Warning: npm audit failed: {e}")

        return findings

    def _run_bandit(self, repo_path: Path) -> List[Finding]:
        """
        Run Bandit for Python-specific security issues.

        Args:
            repo_path: Path to the repository

        Returns:
            List[Finding]: Python-specific security findings
        """
        findings: List[Finding] = []

        try:
            # Run bandit on all Python files
            result = subprocess.run(
                [
                    "bandit",
                    "-r",
                    str(repo_path),
                    "-f", "json",
                    "-ll"  # Only report medium and high severity
                ],
                capture_output=True,
                text=True,
                timeout=60
            )

            if result.stdout:
                try:
                    data = json.loads(result.stdout)
                    results = data.get("results", [])

                    for issue in results:
                        # Map Bandit severity to our severity levels
                        severity_map = {
                            "HIGH": "high",
                            "MEDIUM": "medium",
                            "LOW": "low"
                        }
                        severity = severity_map.get(
                            issue.get("issue_severity", "MEDIUM"),
                            "medium"
                        )

                        finding = Finding(
                            type=issue.get("test_id", "Python Security Issue"),
                            severity=severity,
                            file_path=issue.get("filename", "unknown").replace(str(repo_path) + "/", ""),
                            line_number=issue.get("line_number"),
                            description=issue.get("issue_text", "Python security issue detected"),
                            code_snippet=issue.get("code", "")[:200]
                        )
                        findings.append(finding)

                except json.JSONDecodeError:
                    pass

        except FileNotFoundError:
            # Bandit not installed, skip
            print("Warning: Bandit not installed, skipping Python-specific security checks")
        except subprocess.TimeoutExpired:
            print("Warning: Bandit scan timed out")
        except Exception as e:
            print(f"Warning: Bandit scan failed: {e}")

        return findings

    @staticmethod
    def calculate_security_score(findings: List[Finding]) -> int:
        """
        Calculate a security score from 1-10 based on findings.

        Args:
            findings: List of security findings

        Returns:
            int: Security score (1=terrible, 10=perfect)
        """
        if not findings:
            return 10

        # Weight vulnerabilities by severity
        severity_weights = {
            "critical": 3.0,
            "high": 2.0,
            "medium": 1.0,
            "low": 0.5
        }

        total_weight = sum(
            severity_weights.get(f.severity, 1.0)
            for f in findings
        )

        # Calculate score (exponential decay based on total weight)
        # 0 issues = 10, many issues = approaches 1
        score = max(1, int(10 - min(9, total_weight * 1.5)))

        return score

