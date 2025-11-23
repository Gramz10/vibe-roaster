"""
Vibe-Roaster FastAPI Backend

AI-powered security analysis that roasts your code with humor.
"""

import os
from contextlib import asynccontextmanager
from datetime import datetime
from pathlib import Path

from fastapi import FastAPI, HTTPException, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
from slowapi.util import get_remote_address

from .config import get_settings
from .schemas import (
    ErrorResponse,
    HealthResponse,
    ScanRequest,
    ScanResponse,
)
from .services.ai_service import AIService
from .services.git_service import GitService
from .services.scanner_service import ScannerService

# Initialize settings
settings = get_settings()

# Initialize rate limiter
limiter = Limiter(key_func=get_remote_address)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan manager."""
    # Startup: Create temp directory
    os.makedirs(settings.temp_dir, exist_ok=True)
    print(f"🔥 Vibe-Roaster starting up...")
    print(f"📁 Temp directory: {settings.temp_dir}")
    print(f"🤖 AI configured: {settings.has_ai_key}")
    
    yield
    
    # Shutdown: Cleanup (optional - OS will handle temp files)
    print("🔥 Vibe-Roaster shutting down...")


# Initialize FastAPI app
app = FastAPI(
    title="Vibe-Roaster API",
    description="AI-powered security analysis with personality 🔥",
    version="0.1.0",
    lifespan=lifespan,
    docs_url="/docs",
    redoc_url="/redoc",
)

# Add rate limiter to app state
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Custom exception handlers
@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    """Handle HTTP exceptions with consistent error format."""
    return JSONResponse(
        status_code=exc.status_code,
        content=ErrorResponse(
            error=exc.detail,
            detail=None
        ).model_dump()
    )


@app.exception_handler(Exception)
async def general_exception_handler(request: Request, exc: Exception):
    """Handle unexpected exceptions."""
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content=ErrorResponse(
            error="Internal server error",
            detail=str(exc) if settings.debug else None
        ).model_dump()
    )


# Routes
@app.get(
    "/health",
    response_model=HealthResponse,
    tags=["Health"],
    summary="Health check endpoint"
)
async def health_check():
    """
    Check if the API is running and properly configured.
    
    Returns a fun status message and configuration info.
    """
    return HealthResponse(
        status="roasting 🔥",
        version="0.1.0",
        ai_configured=settings.has_ai_key
    )


@app.post(
    "/scan",
    response_model=ScanResponse,
    tags=["Scanning"],
    summary="Scan a GitHub repository for security vulnerabilities",
    status_code=status.HTTP_200_OK
)
@limiter.limit(f"{settings.rate_limit_scans_per_minute}/minute")
async def scan_repository(request: Request, scan_request: ScanRequest):
    """
    Scan a GitHub repository for security vulnerabilities.
    
    This endpoint:
    1. Clones the repository temporarily
    2. Runs TruffleHog (secret scanning) and Semgrep (SAST)
    3. Uses AI to generate a humorous roast of the findings
    4. Calculates a security score (1-10)
    5. Returns findings and suggested fixes
    6. Cleans up the cloned repository
    
    **Rate Limit:** 5 scans per minute per IP address
    
    **Note:** Repositories are never permanently stored - everything is 
    analyzed in memory and immediately deleted for privacy.
    """
    git_service = GitService()
    scanner_service = ScannerService()
    ai_service = AIService()
    
    repo_path: Path = None
    
    try:
        # Step 1: Clone the repository
        print(f"📥 Cloning repository: {scan_request.repo_url}")
        repo_path = git_service.clone_repository(scan_request.repo_url)
        
        # Step 2: Run security scans
        print(f"🔍 Scanning repository...")
        findings = scanner_service.scan_repository(repo_path)
        print(f"✅ Found {len(findings)} potential issues")
        
        # Step 3: Calculate security score
        score = scanner_service.calculate_security_score(findings)
        
        # Step 4: Generate AI roast and fixes
        print(f"🤖 Generating roast with AI...")
        roast, suggested_fixes = ai_service.generate_roast_and_fixes(findings)
        
        # Step 5: Prepare response
        response = ScanResponse(
            score=score,
            roast=roast,
            findings=findings,
            suggested_fixes=suggested_fixes,
            repo_url=scan_request.repo_url,
            scan_timestamp=datetime.utcnow().isoformat() + "Z"
        )
        
        print(f"🎉 Scan complete! Score: {score}/10")
        
        return response
    
    except ValueError as e:
        # Handle validation errors (bad URL, repo too large, etc.)
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )
    
    except Exception as e:
        # Handle unexpected errors
        print(f"❌ Error during scan: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to scan repository. Please try again."
        )
    
    finally:
        # ALWAYS cleanup the cloned repository (privacy + security)
        if repo_path and repo_path.exists():
            print(f"🧹 Cleaning up repository...")
            git_service.cleanup_repository(repo_path)


# Root endpoint
@app.get("/", tags=["Root"])
async def root():
    """Root endpoint with API information."""
    return {
        "message": "🔥 Welcome to Vibe-Roaster API",
        "tagline": "AI that roasts your code's security—so you can fix it before hackers do",
        "docs": "/docs",
        "health": "/health",
        "version": "0.1.0"
    }


if __name__ == "__main__":
    import uvicorn
    
    # Use configurable host - defaults to 127.0.0.1 for security
    # Set HOST=0.0.0.0 in environment for Docker/container deployments
    uvicorn.run(
        "app.main:app",
        host=settings.host,  # Configurable via environment variable
        port=settings.port,
        reload=settings.debug
    )

