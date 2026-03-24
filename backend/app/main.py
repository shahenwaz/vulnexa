"""Main FastAPI application for the Vulnexa backend."""

from fastapi import FastAPI

from app.api.cwe import router as cwe_router

app = FastAPI(
    title="Vulnexa Backend",
    version="0.1.0",
)

app.include_router(cwe_router)


@app.get("/")
def read_root():
    """Return a welcome message."""
    return {
        "message": "Welcome to Vulnexa backend"
    }


@app.get("/health")
def health_check():
    """Return backend health status."""
    return {
        "status": "ok"
    }
