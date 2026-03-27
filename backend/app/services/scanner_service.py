"""Service for scanning source files for simple insecure code patterns."""

from datetime import datetime
from pathlib import Path
import secrets
from typing import Literal, TypedDict

from app.services.cwe_service import get_cwe_summary


Severity = Literal["critical", "high", "medium", "low"]


class Rule(TypedDict):
    """A scan rule definition."""

    name: str
    pattern: str
    cwe_id: str
    severity: Severity


class CweSummary(TypedDict):
    """A simplified CWE summary."""

    id: str
    name: str
    description: str


class Finding(TypedDict):
    """A single scan result."""

    id: str
    title: str
    severity: Severity
    file: str
    line: int
    matched_text: str
    cwe_id: str
    cwe_name: str
    description: str


class Summary(TypedDict):
    """Summary counts for a completed scan."""

    total_findings: int
    critical: int
    high: int
    medium: int
    low: int


class ScanResult(TypedDict, total=False):
    """The result returned by the directory scanner."""

    error: str
    scan_id: str
    project_key: str
    target: str
    status: str
    scanned_at: str
    summary: Summary
    findings: list[Finding]
    scanned_files: int
    saved_to: str
    source_type: str
    uploaded_file_name: str
    repo_url: str


RULES: list[Rule] = [
    {
        "name": "Potential eval usage",
        "pattern": "eval(",
        "cwe_id": "CWE-95",
        "severity": "high",
    },
    {
        "name": "Potential exec usage",
        "pattern": "exec(",
        "cwe_id": "CWE-95",
        "severity": "high",
    },
    {
        "name": "Possible hardcoded password",
        "pattern": "password =",
        "cwe_id": "CWE-798",
        "severity": "critical",
    },
    {
        "name": "Possible SQL string query",
        "pattern": "SELECT * FROM",
        "cwe_id": "CWE-89",
        "severity": "high",
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


def build_summary(findings: list[Finding]) -> Summary:
    """Build severity counts from findings."""
    summary: Summary = {
        "total_findings": len(findings),
        "critical": 0,
        "high": 0,
        "medium": 0,
        "low": 0,
    }

    for finding in findings:
        severity = finding["severity"]
        summary[severity] += 1

    return summary


def generate_scan_id() -> str:
    """Generate a short readable unique scan ID."""
    date_part = datetime.now().strftime("%Y%m%d")
    random_part = secrets.token_hex(2).upper()
    return f"SCN-{date_part}-{random_part}"


def scan_directory(directory_path: str) -> ScanResult:
    """Scan a directory recursively for files matching predefined security rules."""
    findings: list[Finding] = []
    cwe_cache: dict[str, CweSummary] = {}
    scanned_files = 0

    root = Path(directory_path)

    if not root.exists() or not root.is_dir():
        return {"error": "Directory not found"}

    finding_counter = 1

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
                    cwe_id = rule["cwe_id"]

                    if cwe_id not in cwe_cache:
                        cwe_cache[cwe_id] = get_cwe_summary(cwe_id)

                    cwe_details = cwe_cache[cwe_id]

                    findings.append(
                        {
                            "id": f"finding-{finding_counter:03}",
                            "title": rule["name"],
                            "severity": rule["severity"],
                            "file": str(file_path.relative_to(root)).replace("\\", "/"),
                            "line": line_number,
                            "matched_text": line.strip(),
                            "cwe_id": cwe_id,
                            "cwe_name": cwe_details["name"],
                            "description": cwe_details["description"],
                        }
                    )
                    finding_counter += 1

    scan_result: ScanResult = {
        "scan_id": generate_scan_id(),
        "target": str(root),
        "status": "completed",
        "scanned_at": datetime.now().isoformat(),
        "summary": build_summary(findings),
        "findings": findings,
        "scanned_files": scanned_files,
    }

    return scan_result
