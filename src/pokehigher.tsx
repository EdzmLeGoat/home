// "use client" directive enables client-side interactivity
"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

// SafeImage: shows external image but falls back to local placeholder on error or when src is null
function SafeImage({
  src,
  alt,
  width,
  height,
}: {
  src: string | null;
  alt: string;
  width: number;
  height: number;
}) {
  const [failed, setFailed] = useState<boolean>(!src);

  // reset failure state whenever src changes so new images are retried
  useEffect(() => {
    // defer to avoid synchronous setState inside effect
    const t = setTimeout(() => setFailed(!src), 0);
    return () => clearTimeout(t);
  }, [src]);

  const displaySrc = failed ? "/file.svg" : (src as string);

  return (
    <Image
      key={displaySrc}
      src={displaySrc}
      alt={alt}
      width={width}
      height={height}
      onError={() => setFailed(true)}
    />
  );
}

type Pokemon = {
  statNumber: number;
  statName: string;
  name: string;
  image: string | null;
};

export default function Home() {
  const [p1, setP1] = useState<Pokemon | null>(null);
  const [p2, setP2] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(false);
  const [streak, setStreak] = useState(0);
  // initialize deterministically (same on server and client)
  const [best, setBest] = useState<number>(0);
  // then load persisted best after mount to avoid hydration mismatch
  useEffect(() => {
    try {
      const raw = localStorage.getItem("poke-higher-best");
      if (raw) {
        // defer setState to avoid synchronous setState within the effect (prevents lint/hydration warnings)
        setTimeout(() => setBest(Number(raw)), 0);
      }
    } catch (err) {
      console.error("Failed to read best from localStorage", err);
    }
  }, []);

  const [totalGuesses, setTotalGuesses] = useState(0);
  const [correctGuesses, setCorrectGuesses] = useState(0);
  const [statName, setStatName] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [correctNumber, setCorrectNumber] = useState<number | null>(null);
  const [lastCorrect, setLastCorrect] = useState<boolean | null>(null);

  // persist best when it changes
  useEffect(() => {
    try {
      localStorage.setItem("poke-higher-best", String(best));
    } catch (e) {
      console.error("Failed to write best to localStorage", e);
    }
  }, [best]);

  async function loadPair() {
    setLoading(true);
    setShowResult(false);
    setLastCorrect(null);
    try {
      const res = await fetch("/api/two-pokemon", { method: "POST" });
      const json = await res.json();
      setP1(json.p1);
      setP2(json.p2);
      setStatName(
        json.statName ?? json.p1?.statName ?? json.p2?.statName ?? null,
      );
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    (async () => {
      setLoading(true);
      setShowResult(false);
      setLastCorrect(null);
      try {
        const res = await fetch("/api/two-pokemon", { method: "POST" });
        const json = await res.json();
        setP1(json.p1);
        setP2(json.p2);
        setStatName(
          json.statName ?? json.p1?.statName ?? json.p2?.statName ?? null,
        );
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function handleChoose(choice: 1 | 2) {
    if (!p1 || !p2) return;
    const chosen = choice === 1 ? p1 : p2;
    const other = choice === 1 ? p2 : p1;
    setCorrectNumber(
      chosen.statNumber == other.statNumber
        ? choice
        : p1.statNumber >= p2.statNumber
          ? 1
          : 2,
    );
    const correct = chosen.statNumber >= other.statNumber;
    setLastCorrect(correct);
    setShowResult(true);

    // update overall stats
    setTotalGuesses((s) => s + 1);
    if (correct) setCorrectGuesses((s) => s + 1);

    if (correct) {
      const ns = streak + 1;
      setStreak(ns);
      if (ns > best) setBest(ns);
    } else {
      setStreak(0);
    }

    // after every guess request a new pair from the backend
    try {
      const res = await fetch("/api/two-pokemon", { method: "POST" });
      const json = await res.json();
      // show the result briefly, then swap to the new pair
      setTimeout(() => {
        setP1(json.p1);
        setP2(json.p2);
        setStatName(
          json.statName ?? json.p1?.statName ?? json.p2?.statName ?? null,
        );
        setShowResult(false);
        setLastCorrect(null);
      }, 1200);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-gradient-to-b from-blue-500 to-sky-200 dark:from-slate-900 dark:to-black font-sans min-h-screen p-6">
      <main className="flex flex-col items-center gap-8 w-full max-w-3xl bg-white p-8 rounded shadow">
        <h1 className="text-2xl font-semibold text-zinc-600">
          Higher Stat: Pick Which Pokémon Has a Higher Stat
        </h1>

        <div className="flex items-center gap-6">
          <div className="text-sm text-zinc-600">Current streak: {streak}</div>
          <div className="text-sm text-zinc-600">Best: {best}</div>
          <div className="text-sm text-zinc-600">Guesses: {totalGuesses}</div>
          <div className="text-sm text-zinc-600">Correct: {correctGuesses}</div>
          <div className="text-sm text-zinc-600">
            Accuracy:{" "}
            {totalGuesses
              ? Math.round((correctGuesses / totalGuesses) * 100)
              : 0}
            %
          </div>
          <button
            onClick={() => {
              setBest(0);
              try {
                localStorage.removeItem("poke-higher-best");
              } catch (e) {
                console.error(e);
              }
            }}
            className="ml-2 px-2 py-1 text-xs rounded border text-zinc-600 hover:bg-zinc-100"
          >
            Reset Best
          </button>
        </div>

        <div className="w-full text-center text-lg text-zinc-700">
          {p1 && p2 ? (
            <div>
              <div className="mb-2">
                Stat:{" "}
                <strong>
                  {statName ?? p1?.statName ?? p2?.statName ?? "stat"}
                </strong>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <button
                  onClick={() => handleChoose(1)}
                  className={`flex flex-col items-center gap-2 p-4 rounded border hover:shadow ${
                    showResult && correctNumber === 1
                      ? "ring-2 ring-green-400"
                      : ""
                  }`}
                >
                  <SafeImage
                    src={p1.image}
                    alt={p1.name}
                    width={144}
                    height={144}
                  />
                  <div className="font-medium">{p1.name}</div>
                  <div className="text-sm text-zinc-500">
                    {showResult ? `Value: ${p1.statNumber}` : "Click to guess"}
                  </div>
                </button>

                <button
                  onClick={() => handleChoose(2)}
                  className={`flex flex-col items-center gap-2 p-4 rounded border hover:shadow ${
                    showResult && correctNumber === 2
                      ? "ring-2 ring-green-400"
                      : ""
                  }`}
                >
                  <SafeImage
                    src={p2.image}
                    alt={p2.name}
                    width={144}
                    height={144}
                  />
                  <div className="font-medium">{p2.name}</div>
                  <div className="text-sm text-zinc-500">
                    {showResult ? `Value: ${p2.statNumber}` : "Click to guess"}
                  </div>
                </button>
              </div>

              {showResult && (
                <div className="mt-4 text-sm">
                  {lastCorrect ? (
                    <span className="text-green-600">Correct! +1 streak</span>
                  ) : (
                    <span className="text-red-600">Wrong — streak reset</span>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="py-12">
              {loading ? "Loading..." : "Click below to start"}
            </div>
          )}
        </div>

        <div className="flex gap-4">
          <button
            onClick={loadPair}
            className="px-4 py-2 rounded bg-zinc-900 text-white"
          >
            New Pair
          </button>
        </div>
      </main>
    </div>
  );
}
