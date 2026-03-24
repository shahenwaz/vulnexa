"""Routes for CWE lookup operations."""

from fastapi import APIRouter, HTTPException

from app.services.cwe_service import get_cwe_by_id

router = APIRouter(prefix="/cwe", tags=["CWE"])


@router.get("/{cwe_id}")
def fetch_cwe(cwe_id: str):
    """Fetch a CWE item from the MITRE CWE API."""
    try:
        data = get_cwe_by_id(cwe_id)
        return data
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc)) from exc
