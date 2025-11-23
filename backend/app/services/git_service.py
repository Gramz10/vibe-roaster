"""
Git repository cloning and management service.
"""

import os
import shutil
import tempfile
from pathlib import Path
from typing import Optional

import git
from git.exc import GitCommandError

from ..config import get_settings


class GitService:
    """Service for cloning and managing Git repositories."""

    def __init__(self):
        self.settings = get_settings()

    def clone_repository(self, repo_url: str) -> Path:
        """
        Clone a repository to a temporary directory.

        Args:
            repo_url: GitHub repository URL

        Returns:
            Path: Path to the cloned repository

        Raises:
            ValueError: If repository is too large or clone fails
            GitCommandError: If git operations fail
        """
        # Create temp directory
        temp_dir = tempfile.mkdtemp(dir=self.settings.temp_dir, prefix="repo_")
        repo_path = Path(temp_dir)

        try:
            # Clone with depth=1 for speed (shallow clone)
            repo = git.Repo.clone_from(
                repo_url,
                repo_path,
                depth=1,
                single_branch=True
            )

            # Check repository size
            repo_size_mb = self._get_directory_size(repo_path) / (1024 * 1024)
            if repo_size_mb > self.settings.max_repo_size_mb:
                self.cleanup_repository(repo_path)
                raise ValueError(
                    f"Repository size ({repo_size_mb:.1f}MB) exceeds "
                    f"maximum allowed size ({self.settings.max_repo_size_mb}MB)"
                )

            return repo_path

        except GitCommandError as e:
            # Clean up on failure
            if repo_path.exists():
                self.cleanup_repository(repo_path)
            raise ValueError(f"Failed to clone repository: {str(e)}")

        except Exception as e:
            # Clean up on any failure
            if repo_path.exists():
                self.cleanup_repository(repo_path)
            raise

    def cleanup_repository(self, repo_path: Path) -> None:
        """
        Delete a cloned repository and all its contents.

        Args:
            repo_path: Path to the repository to delete
        """
        try:
            if repo_path.exists():
                # Make sure .git directory is writable before deletion
                git_dir = repo_path / ".git"
                if git_dir.exists():
                    os.chmod(git_dir, 0o755)
                    for root, dirs, files in os.walk(git_dir):
                        for d in dirs:
                            os.chmod(os.path.join(root, d), 0o755)
                        for f in files:
                            os.chmod(os.path.join(root, f), 0o644)

                shutil.rmtree(repo_path)
        except Exception as e:
            # Log error but don't raise - cleanup is best effort
            print(f"Warning: Failed to cleanup repository at {repo_path}: {e}")

    @staticmethod
    def _get_directory_size(path: Path) -> int:
        """
        Calculate total size of a directory in bytes.

        Args:
            path: Directory path

        Returns:
            int: Total size in bytes
        """
        total_size = 0
        for dirpath, dirnames, filenames in os.walk(path):
            for filename in filenames:
                file_path = os.path.join(dirpath, filename)
                # Skip if it's a symbolic link
                if not os.path.islink(file_path):
                    total_size += os.path.getsize(file_path)
        return total_size

    def extract_repo_info(self, repo_url: str) -> tuple[str, str]:
        """
        Extract owner and repo name from GitHub URL.

        Args:
            repo_url: GitHub repository URL

        Returns:
            tuple: (owner, repo_name)
        """
        # Remove .git suffix if present
        url = repo_url.rstrip("/").replace(".git", "")
        parts = url.split("/")
        
        if len(parts) >= 2:
            repo_name = parts[-1]
            owner = parts[-2]
            return owner, repo_name
        
        return "unknown", "unknown"

