from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.services.fastf1_service import get_race_results

app = FastAPI(
    title="IndexF1 API",
    description="AI-Powered Formula 1 Driver Intelligence Platform",
    version="0.1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {
        "application": "IndexF1",
        "message": "Welcome to IndexF1 API",
        "status": "online"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }

@app.get("/race/{year}/{grand_prix}")
def race_results(year: int, grand_prix: str):

    results = get_race_results(year, grand_prix)

    return {
        "season": year,
        "grand_prix": grand_prix,
        "results": results
    }