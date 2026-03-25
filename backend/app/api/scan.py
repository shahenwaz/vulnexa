from fastapi import APIRouter
from pydantic import BaseModel
from app.services.scanner_service import scan_directory

router = APIRouter(prefix="/scan", tags=["Scan"])


class ScanRequest(BaseModel):
    directory_path: str


@router.post("/local")
def scan_local_directory(payload: ScanRequest):
    return scan_directory(payload.directory_path)
