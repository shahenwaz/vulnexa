"""Service for downloading public GitHub repositories as ZIP archives."""

from pathlib import Path
from urllib.parse import urlparse

import requests


def parse_github_repo_url(repo_url: str) -> tuple[str, str]:
    """Extract owner and repo name from a GitHub repository URL."""
    parsed = urlparse(repo_url.strip())

    if parsed.netloc not in {"github.com", "www.github.com"}:
        raise ValueError("Only github.com repository URLs are supported")

    path_parts = [part for part in parsed.path.strip("/").split("/") if part]

    if len(path_parts) < 2:
        raise ValueError("Invalid GitHub repository URL")

    owner = path_parts[0]
    repo = path_parts[1].replace(".git", "")

    return owner, repo


def download_github_repo_zip(repo_url: str, destination: Path) -> str:
    """Download a public GitHub repository ZIP archive to the given path."""
    owner, repo = parse_github_repo_url(repo_url)

    # Try main first, then master as a fallback.
    archive_urls = [
        f"https://github.com/{owner}/{repo}/archive/refs/heads/main.zip",
        f"https://github.com/{owner}/{repo}/archive/refs/heads/master.zip",
    ]

    last_error = None

    for archive_url in archive_urls:
        try:
            response = requests.get(
                archive_url, timeout=60, allow_redirects=True)
            if response.status_code == 200:
                with destination.open("wb") as file:
                    file.write(response.content)
                return repo
        except requests.RequestException as exc:
            last_error = exc

    if last_error is not None:
        raise ValueError(
            "Could not download the GitHub repository ZIP") from last_error

    raise ValueError("Could not download the GitHub repository ZIP")
