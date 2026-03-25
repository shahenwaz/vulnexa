"""Routes for local scan operations."""

from fastapi import APIRouter
from pydantic import BaseModel

from app.services.scanner_service import scan_directory
from app.services.storage_service import save_scan_result

router = APIRouter(prefix="/scan", tags=["Scan"])


class ScanRequest(BaseModel):
    """Request body for local directory scanning."""

    directory_path: str


@router.post("/local")
def scan_local_directory(payload: ScanRequest):
    """Scan a local directory and save the result as JSON."""
    scan_result = scan_directory(payload.directory_path)

    if "error" not in scan_result:
        saved_to = save_scan_result(scan_result)
        scan_result["saved_to"] = saved_to

    return scan_result
