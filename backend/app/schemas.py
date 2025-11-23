"""
Pydantic schemas for request/response validation.
"""

from typing import List, Optional

from pydantic import BaseModel, Field, HttpUrl, validator


class ScanRequest(BaseModel):
    """Request schema for repository scanning."""

    repo_url: str = Field(
        ...,
        description="GitHub repository URL to scan",
        example="https://github.com/username/repo"
    )

    @validator("repo_url")
    def validate_github_url(cls, v: str) -> str:
        """Validate that the URL is a GitHub repository."""
        if not v.startswith(("https://github.com/", "http://github.com/")):
            raise ValueError("Only GitHub URLs are currently supported")
        
        # Basic validation of URL structure
        parts = v.rstrip("/").split("/")
        if len(parts) < 5:  # https://github.com/user/repo
            raise ValueError("Invalid GitHub repository URL format")
        
        return v


class Finding(BaseModel):
    """Individual security finding."""

    type: str = Field(..., description="Type of vulnerability (e.g., 'Exposed Secret', 'SQL Injection')")
    severity: str = Field(..., description="Severity level (low, medium, high, critical)")
    file_path: str = Field(..., description="File path where issue was found")
    line_number: Optional[int] = Field(None, description="Line number of the issue")
    description: str = Field(..., description="Description of the vulnerability")
    code_snippet: Optional[str] = Field(None, description="Relevant code snippet")


class SuggestedFix(BaseModel):
    """Suggested fix for a vulnerability."""

    finding_type: str = Field(..., description="Type of vulnerability this fix addresses")
    fix: str = Field(..., description="One-line fix suggestion")
    example: Optional[str] = Field(None, description="Example of fixed code")


class ScanResponse(BaseModel):
    """Response schema for scan results."""

    score: int = Field(
        ...,
        ge=1,
        le=10,
        description="Security score from 1 (terrible) to 10 (perfect)"
    )
    roast: str = Field(..., description="AI-generated humorous roast of the security issues")
    findings: List[Finding] = Field(default_factory=list, description="List of security findings")
    suggested_fixes: List[SuggestedFix] = Field(
        default_factory=list,
        description="List of suggested fixes"
    )
    repo_url: str = Field(..., description="URL of the scanned repository")
    scan_timestamp: str = Field(..., description="ISO timestamp of the scan")


class HealthResponse(BaseModel):
    """Health check response."""

    status: str = Field(..., description="Service status")
    version: str = Field(..., description="API version")
    ai_configured: bool = Field(..., description="Whether AI service is configured")


class ErrorResponse(BaseModel):
    """Error response schema."""

    error: str = Field(..., description="Error message")
    detail: Optional[str] = Field(None, description="Detailed error information")

