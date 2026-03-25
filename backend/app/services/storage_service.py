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
    file_path = DATA_DIR / f"{scan_id}.json"

    if not file_path.exists():
        return None

    with file_path.open("r", encoding="utf-8") as file:
        return json.load(file)
