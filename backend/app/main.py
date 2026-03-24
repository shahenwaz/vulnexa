from fastapi import FastAPI

app = FastAPI(
    title="Vulnexa Backend",
    version="0.1.0"
)


@app.get("/")
def read_root():
    return {
        "message": "Welcome to Vulnexa backend"
    }


@app.get("/health")
def health_check():
    return {
        "status": "ok"
    }
