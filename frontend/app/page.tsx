"use client";

import { useEffect, useState } from "react";

type Driver = {
  driver: string;
  name: string;
  team: string;
  position: number | null;
};

export default function Home() {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/race/2024/Monaco")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to retrieve race results");
          }

          return response.json();
        })
        .then((data) => {
          setDrivers(data.results);
        })
        .catch((err) => {
          setError(err.message);
        })
        .finally(() => {
          setLoading(false);
        });
  }, []);

  return (
      <main className="min-h-screen bg-neutral-950 p-10 text-white">
        <header className="mb-10">
          <h1 className="text-5xl font-bold tracking-tight">
            INDEX<span className="text-red-500">F1</span>
          </h1>

          <p className="mt-3 text-neutral-400">
            AI-Powered Formula 1 Driver Intelligence
          </p>
        </header>

        <section>
          <h2 className="mb-6 text-2xl font-semibold">
            2024 Monaco Grand Prix
          </h2>

          {loading && <p>Loading race data...</p>}

          {error && (
              <p className="text-red-400">{error}</p>
          )}

          <div className="space-y-3">
            {drivers.map((driver) => (
                <div
                    key={driver.driver}
                    className="flex items-center justify-between rounded-lg border border-neutral-800 bg-neutral-900 p-5"
                >
                  <div>
                    <h3 className="font-semibold">
                      {driver.name}
                    </h3>

                    <p className="text-sm text-neutral-400">
                      {driver.team}
                    </p>
                  </div>

                  <span className="text-2xl font-bold">
                {driver.position ?? "NC"}
              </span>
                </div>
            ))}
          </div>
        </section>
      </main>
  );
}