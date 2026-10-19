from pathlib import Path

import fastf1

CACHE_DIR = Path(__file__).resolve().parents[2] / ".fastf1_cache"
CACHE_DIR.mkdir(parents=True, exist_ok=True)

fastf1.Cache.enable_cache(str(CACHE_DIR))


def get_race_results(year: int, grand_prix: str):
    session = fastf1.get_session(year, grand_prix, "R")

    session.load(
        laps=False,
        telemetry=False,
        weather=False,
        messages=False
    )

    drivers = []

    for _, driver in session.results.iterrows():
        position = driver["Position"]

        drivers.append({
            "driver": driver["Abbreviation"],
            "name": driver["FullName"],
            "team": driver["TeamName"],
            "position": int(position) if position > 0 else None
        })

    return drivers