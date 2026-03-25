"""Service for handling uploaded ZIP files for scanning."""

import shutil
import zipfile
from pathlib import Path
from tempfile import mkdtemp


UPLOAD_ROOT = Path("data/uploads")


def ensure_upload_dir() -> None:
    """Create the upload storage directory if it does not exist."""
    UPLOAD_ROOT.mkdir(parents=True, exist_ok=True)


def extract_zip_file(zip_file_path: Path, extract_name: str) -> str:
    """Extract a ZIP file into a dedicated folder and return that folder path."""
    ensure_upload_dir()

    extract_path = UPLOAD_ROOT / extract_name

    if extract_path.exists():
        shutil.rmtree(extract_path)

    extract_path.mkdir(parents=True, exist_ok=True)

    with zipfile.ZipFile(zip_file_path, "r") as zip_ref:
        zip_ref.extractall(extract_path)

    return str(extract_path)


def create_temp_zip_path(filename: str) -> Path:
    """Create a temporary path for an uploaded ZIP file."""
    temp_dir = Path(mkdtemp())
    return temp_dir / filename


def delete_path(path: str) -> None:
    """Delete a file or directory path if it exists."""
    target = Path(path)

    if target.is_dir():
        shutil.rmtree(target, ignore_errors=True)
    elif target.is_file():
        target.unlink(missing_ok=True)
