"""Main FastAPI application for the Vulnexa backend."""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.cwe import router as cwe_router
from app.api.scan import router as scan_router

app = FastAPI(
    title="Vulnexa Backend",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(cwe_router)
app.include_router(scan_router)


@app.get("/")
def read_root():
    """Return a welcome message."""
    return {"message": "Welcome to Vulnexa backend"}


@app.get("/health")
def health_check():
    """Return backend health status."""
    return {"status": "ok"}
