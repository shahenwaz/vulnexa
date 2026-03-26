"""Service for saving and loading scan results as JSON files."""

import json
from pathlib import Path
from typing import Any


DATA_DIR = Path("data/scans")


def ensure_data_dir() -> None:
    """Create the scan storage directory if it does not exist."""
    DATA_DIR.mkdir(parents=True, exist_ok=True)


def save_scan_result(scan_result: dict[str, Any]) -> str:
    """Save a scan result to a JSON file and return the saved file path."""
    ensure_data_dir()

    scan_id = scan_result["scan_id"]
    file_path = DATA_DIR / f"{scan_id}.json"

    with file_path.open("w", encoding="utf-8") as file:
        json.dump(scan_result, file, indent=2, ensure_ascii=False)

    return str(file_path)


def load_scan_result(scan_id: str) -> dict[str, Any] | None:
    """Load a scan result by scan ID."""
    ensure_data_dir()

    file_path = DATA_DIR / f"{scan_id}.json"

    if not file_path.exists():
        return None

    with file_path.open("r", encoding="utf-8") as file:
        return json.load(file)


def list_scan_results() -> list[dict[str, Any]]:
    """Return a lightweight list of saved scan summaries."""
    ensure_data_dir()

    scans: list[dict[str, Any]] = []

    for file_path in sorted(DATA_DIR.glob("*.json"), reverse=True):
        with file_path.open("r", encoding="utf-8") as file:
            scan = json.load(file)

            scans.append(
                {
                    "scan_id": scan["scan_id"],
                    "target": scan["target"],
                    "status": scan["status"],
                    "scanned_at": scan.get("scanned_at"),
                    "summary": scan["summary"],
                    "scanned_files": scan.get("scanned_files", 0),
                    "source_type": scan.get("source_type"),
                    "uploaded_file_name": scan.get("uploaded_file_name"),
                    "repo_url": scan.get("repo_url"),
                }
            )

    return scans
