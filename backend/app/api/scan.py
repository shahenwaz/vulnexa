"""Routes for scan operations."""

from pathlib import Path

from fastapi import APIRouter, File, HTTPException, UploadFile
from pydantic import BaseModel

from app.services.repo_service import download_github_repo_zip
from app.services.scanner_service import scan_directory
from app.services.storage_service import (
    list_scan_results,
    load_scan_result,
    save_scan_result,
)
from app.services.upload_service import create_temp_zip_path, delete_path, extract_zip_file

router = APIRouter(prefix="/scan", tags=["Scan"])


class ScanRequest(BaseModel):
    """Request body for local directory scanning."""

    directory_path: str


class RepoScanRequest(BaseModel):
    """Request body for repository URL scanning."""

    repo_url: str


@router.post("/local")
def scan_local_directory(payload: ScanRequest):
    """Scan a local directory and save the result as JSON."""
    scan_result = scan_directory(payload.directory_path)

    if "error" in scan_result:
        raise HTTPException(status_code=400, detail=scan_result["error"])

    scan_result["source_type"] = "local_directory"
    scan_result["target"] = payload.directory_path

    saved_to = save_scan_result(scan_result)
    scan_result["saved_to"] = saved_to

    return scan_result


@router.post("/upload")
async def scan_uploaded_zip(file: UploadFile = File(...)):
    """Scan an uploaded ZIP file and save the result as JSON."""
    if not file.filename:
        raise HTTPException(status_code=400, detail="Missing file name")

    if not file.filename.lower().endswith(".zip"):
        raise HTTPException(
            status_code=400, detail="Only ZIP files are supported")

    temp_zip_path = create_temp_zip_path(file.filename)
    extracted_path = ""

    try:
        with temp_zip_path.open("wb") as buffer:
            content = await file.read()
            buffer.write(content)

        extract_name = Path(file.filename).stem
        extracted_path = extract_zip_file(temp_zip_path, extract_name)

        scan_result = scan_directory(extracted_path)

        if "error" not in scan_result:
            saved_to = save_scan_result(scan_result)
            scan_result["saved_to"] = saved_to
            scan_result["source_type"] = "zip_upload"
            scan_result["uploaded_file_name"] = file.filename

        return scan_result

    finally:
        delete_path(str(temp_zip_path))
        if extracted_path:
            delete_path(extracted_path)


@router.post("/repo")
def scan_github_repo(payload: RepoScanRequest):
    """Download a public GitHub repo as ZIP, scan it, and save the result."""
    temp_zip_path = create_temp_zip_path("repo-download.zip")
    extracted_path = ""

    try:
        repo_name = download_github_repo_zip(payload.repo_url, temp_zip_path)
        extracted_path = extract_zip_file(temp_zip_path, repo_name)

        scan_result = scan_directory(extracted_path)

        if "error" in scan_result:
            raise HTTPException(status_code=400, detail=scan_result["error"])

        scan_result["source_type"] = "repo_url"
        scan_result["repo_url"] = payload.repo_url
        scan_result["target"] = payload.repo_url

        saved_to = save_scan_result(scan_result)
        scan_result["saved_to"] = saved_to

        return scan_result

    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc

    finally:
        delete_path(str(temp_zip_path))
        if extracted_path:
            delete_path(extracted_path)


@router.get("")
def get_saved_scans():
    """Return a list of previously saved scans."""
    return {"scans": list_scan_results()}


@router.get("/{scan_id}")
def get_saved_scan(scan_id: str):
    """Return one saved scan by scan ID."""
    scan = load_scan_result(scan_id)

    if scan is None:
        raise HTTPException(status_code=404, detail="Scan not found")

    return scan
