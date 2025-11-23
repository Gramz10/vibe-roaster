"""
Configuration management for Vibe-Roaster backend.
"""

from functools import lru_cache
from typing import Optional

from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""

    # Application
    app_name: str = "Vibe-Roaster"
    environment: str = "development"
    debug: bool = True
    api_version: str = "v1"

    # API Keys
    grok_api_key: Optional[str] = None
    openai_api_key: Optional[str] = None

    # CORS
    allowed_origins: str = "http://localhost:5173,http://localhost:3000"

    # Rate Limiting
    rate_limit_scans_per_minute: int = 5
    rate_limit_enabled: bool = True

    # Analysis Settings
    max_repo_size_mb: int = 500
    analysis_timeout_seconds: int = 300
    temp_dir: str = "/tmp/vibe-roaster"  # nosec B108 - Temp dir with restricted permissions set in code
    
    # Server Configuration
    host: str = "127.0.0.1"  # Bind to localhost by default for security
    port: int = 8000

    # Logging
    log_level: str = "INFO"

    class Config:
        env_file = ".env"
        case_sensitive = False

    @property
    def cors_origins(self) -> list[str]:
        """Parse CORS origins from comma-separated string."""
        return [origin.strip() for origin in self.allowed_origins.split(",")]

    @property
    def has_ai_key(self) -> bool:
        """Check if any AI API key is configured."""
        return bool(self.grok_api_key or self.openai_api_key)


@lru_cache()
def get_settings() -> Settings:
    """
    Get cached settings instance.
    
    Returns:
        Settings: Application settings
    """
    return Settings()

