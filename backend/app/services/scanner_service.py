"""Service for scanning source files for simple insecure code patterns."""

from pathlib import Path
from typing import TypedDict


class Rule(TypedDict):
    """A scan rule definition."""

    name: str
    pattern: str
    cwe_id: str


class Finding(TypedDict):
    """A single scan result."""

    file: str
    line: int
    matched_text: str
    rule_name: str
    cwe_id: str


class ScanResult(TypedDict, total=False):
    """The result returned by the directory scanner."""

    error: str
    total_findings: int
    scanned_files: int
    findings: list[Finding]


RULES: list[Rule] = [
    {
        "name": "Potential eval usage",
        "pattern": "eval(",
        "cwe_id": "CWE-95",
    },
    {
        "name": "Potential exec usage",
        "pattern": "exec(",
        "cwe_id": "CWE-95",
    },
    {
        "name": "Possible hardcoded password",
        "pattern": "password =",
        "cwe_id": "CWE-798",
    },
    {
        "name": "Possible SQL string query",
        "pattern": "SELECT * FROM",
        "cwe_id": "CWE-89",
    },
]

ALLOWED_EXTENSIONS = {".py", ".js", ".ts", ".tsx", ".jsx"}
IGNORED_DIRS = {
    "node_modules",
    ".next",
    ".git",
    ".venv",
    "dist",
    "build",
    "__pycache__",
}


def scan_directory(directory_path: str) -> ScanResult:
    """Scan a directory recursively for files matching predefined security rules."""
    findings: list[Finding] = []
    scanned_files = 0
    root = Path(directory_path)

    if not root.exists() or not root.is_dir():
        return {"error": "Directory not found"}

    for file_path in root.rglob("*"):
        if not file_path.is_file():
            continue

        if any(part in IGNORED_DIRS for part in file_path.parts):
            continue

        if file_path.suffix.lower() not in ALLOWED_EXTENSIONS:
            continue

        scanned_files += 1

        try:
            content = file_path.read_text(encoding="utf-8", errors="ignore")
        except OSError:
            continue

        for line_number, line in enumerate(content.splitlines(), start=1):
            for rule in RULES:
                if rule["pattern"] in line:
                    findings.append(
                        {
                            "file": str(file_path),
                            "line": line_number,
                            "matched_text": line.strip(),
                            "rule_name": rule["name"],
                            "cwe_id": rule["cwe_id"],
                        }
                    )

    return {
        "total_findings": len(findings),
        "scanned_files": scanned_files,
        "findings": findings,
    }
