import React, { useEffect, useState, useMemo, useCallback } from "react";
import "./App.css";
import NavBar from "./navbar";

type EvalState = "absent" | "present" | "correct" | "";

const NUM_ROWS = 6;
const NUM_COLS = 10;

function randomFrom<T>(arr: T[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function evaluateGuess(guess: string, target: string): EvalState[] {
  const result: EvalState[] = Array(NUM_COLS).fill("");
  const targetChars = target.split("");
  const guessChars = guess.split("");

  // First pass: correct positions
  const targetCharCounts: Record<string, number> = {};
  for (const ch of targetChars)
    targetCharCounts[ch] = (targetCharCounts[ch] || 0) + 1;

  for (let i = 0; i < NUM_COLS; i++) {
    const g = guessChars[i] || "";
    const t = targetChars[i] || "";
    if (g && t && g === t) {
      result[i] = "correct";
      targetCharCounts[g]!--;
    }
  }

  // Second pass: present vs absent
  for (let i = 0; i < NUM_COLS; i++) {
    if (result[i] === "correct") continue;
    const g = guessChars[i] || "";
    if (!g) {
      result[i] = "";
      continue;
    }
    if (targetCharCounts[g] && targetCharCounts[g] > 0) {
      result[i] = "present";
      targetCharCounts[g]!--;
    } else {
      result[i] = "absent";
    }
  }

  return result;
}

function Square({
  letter,
  evalState,
  animate,
  animationDelay,
}: {
  letter: string;
  evalState: EvalState;
  animate?: boolean;
  animationDelay?: number;
}) {
  const baseStyle: React.CSSProperties = {
    width: 44,
    height: 52,
    border: "2px solid #3a3a3c",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 20,
    fontWeight: 700,
    textTransform: "uppercase",
    margin: 4,
    boxSizing: "border-box",
    background: "#121213",
    color: "#ffffff",
    transformOrigin: "center",
    position: "relative",
    overflow: "hidden",
  };

  const colorStyles: Record<Exclude<EvalState, "">, React.CSSProperties> & {
    "": React.CSSProperties;
  } = {
    "": { background: "#121213", borderColor: "#3a3a3c" },
    absent: { background: "#3a3a3c", borderColor: "#3a3a3c" },
    present: { background: "#b59f3b", borderColor: "#b59f3b" },
    correct: { background: "#538d4e", borderColor: "#538d4e" },
  };

  // front: neutral face; back: revealed colored face
  const frontStyle: React.CSSProperties = {
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#121213",
    color: "#fff",
    borderRadius: 0,
    boxSizing: "border-box",
  };

  const backStyle: React.CSSProperties = {
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    borderRadius: 0,
    boxSizing: "border-box",
    ...(colorStyles[evalState] || {}),
  };

  const innerAnimationStyle: React.CSSProperties = animate
    ? {
        animation: `pordle-flip 600ms cubic-bezier(.2,.8,.2,1) ${
          animationDelay || 0
        }ms both`,
      }
    : {};

  const frontAnimStyle: React.CSSProperties = animate
    ? {
        animation: `pordle-front-fade 600ms linear ${animationDelay || 0}ms both`,
      }
    : {};

  const backAnimStyle: React.CSSProperties = animate
    ? {
        animation: `pordle-back-fade 600ms linear ${animationDelay || 0}ms both`,
      }
    : {};

  return (
    <div
      style={{
        ...baseStyle,
        borderColor: (colorStyles[evalState] || {}).borderColor || "#3a3a3c",
      }}
    >
      <div
        className={animate ? "pordle-flip" : undefined}
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          ...innerAnimationStyle,
        }}
      >
        <div style={{ ...frontStyle, ...frontAnimStyle }}>{letter}</div>
        <div style={{ ...backStyle, ...backAnimStyle }}>{letter}</div>
      </div>
    </div>
  );
}

function Row({
  letters,
  evalStates,
  animateStates,
}: {
  letters: string[];
  evalStates?: EvalState[];
  animateStates?: boolean[];
}) {
  return (
    <div style={{ display: "flex" }}>
      {Array.from({ length: NUM_COLS }).map((_, i) => (
        <Square
          key={i}
          letter={letters[i] || ""}
          evalState={(evalStates && evalStates[i]) || ""}
          animate={(animateStates && animateStates[i]) || false}
          animationDelay={i * 150}
        />
      ))}
    </div>
  );
}

function Toast({
  message,
  onReset,
}: {
  message: React.ReactNode;
  onReset: () => void;
}) {
  return (
    <div
      style={{
        position: "fixed",
        top: 16,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 50,
      }}
    >
      <div
        style={{
          background: "#111827",
          color: "white",
          padding: "12px 16px",
          borderRadius: 8,
          boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
          display: "flex",
          gap: 12,
          alignItems: "center",
        }}
      >
        <div>{message}</div>
        <button
          onClick={onReset}
          style={{
            padding: "6px 10px",
            borderRadius: 6,
            border: "none",
            cursor: "pointer",
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

function usePokemonList() {
  const [list, setList] = useState<string[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // per-generation map (1..9)
  const [genMap, setGenMap] = useState<Record<number, string[]>>({});
  const [genAll, setGenAll] = useState<string[]>([]);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        setLoading(true);

        // our json files are gen_1 to gen_9, so the names will be populated in the genPromises below. But we also have a "full" list of all Pokémon names in a single file.
        //actually i'd rather just fetch from the gen_files instead of going through the big one and then doing the gen ones, since that's unnecessary loading time

        const names: string[] = [];

        // Now fetch generation-specific lists (1..9)
        const genNums = Array.from({ length: 9 }).map((_, i) => i + 1);
        const genPromises = genNums.map(async (g) => {
          try {
            const genUrl = `/home/pokejson/gen_${g}.json`;
            const r = await fetch(genUrl);
            const d = await r.json();
            // json files returns a list of species objects, each with a name, id, and generation property. We only care about the name property for our purposes.
            const speciesList = d.results as {
              name: string;
              id: number;
              generation: string;
            }[];
            console.log(
              `Loaded generation ${g} with ${speciesList.length} species`,
            );

            const genNames = speciesList
              .map((s) =>
                s.name.includes("-") ? s.name.split("-")[0] : s.name,
              )
              .map((n) => n.trim())
              .filter(
                (n) => /^[a-z]+$/.test(n) && n.length >= 7 && n.length <= 10,
              )
              .map((n) => n.toLowerCase());

            genNames.forEach((n) => names.push(n));

            // dedupe per generation
            const deduped = Array.from(new Set(genNames));
            return { gen: g, names: deduped } as {
              gen: number;
              names: string[];
            };
          } catch (e) {
            console.warn(`Failed to load generation ${g}:`, e);
            return { gen: g, names: [] } as { gen: number; names: string[] };
          }
        });

        const genResults = await Promise.all(genPromises);
        if (!cancelled) {
          const map: Record<number, string[]> = {};
          genResults.forEach((gr) => {
            map[gr.gen] = gr.names;
          });
          // combined list of all generation species (deduped)
          const combined = Array.from(
            new Set(genResults.flatMap((g) => g.names)),
          );
          setGenMap(map);
          setGenAll(combined);
          setList(combined);
        }
      } catch (err) {
        if (!cancelled) {
          const msg = err instanceof Error ? err.message : String(err);
          setError(msg);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return { list, genMap, genAll, loading, error };
}

function AppInner() {
  const { list, genMap } = usePokemonList();
  const [seed, setSeed] = useState(0);
  // which generations are allowed for selecting the ANSWER (1-indexed 1..9)
  const [genToggles, setGenToggles] = useState<boolean[]>(() => {
    try {
      if (typeof window !== "undefined") {
        const raw = localStorage.getItem("pordle.genToggles");
        if (raw) {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed) && parsed.length === 9)
            return parsed.map(Boolean);
        }
      }
    } catch {
      // ignore and fallback to defaults
    }
    return Array.from({ length: 9 }).map(() => true);
  });
  // persist toggles
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem("pordle.genToggles", JSON.stringify(genToggles));
      }
    } catch {
      // ignore
    }
  }, [genToggles]);
  const [showSettings, setShowSettings] = useState(false);

  // counts of allowed names per generation (intersected with guessable list)
  const genCounts = useMemo(() => {
    return Array.from({ length: 9 }).map((_, i) => {
      const names = genMap[i + 1] || [];
      return names.filter((n) => new Set(list || []).has(n)).length;
    });
  }, [genMap, list]);

  const allowedSet = useMemo(() => new Set(list || []), [list]);
  // compute allowed answers based on selected generations
  const allowedAnswers = useMemo(() => {
    // gather names from selected generations
    const selectedGens = genToggles
      .map((on, idx) => (on ? genMap[idx + 1] || [] : []))
      .flat();
    // intersection with guessable list (allowedSet)
    const chosen = Array.from(new Set(selectedGens)).filter(
      (n) => allowedSet.has(n) as boolean,
    );
    // if nothing selected or intersection empty, fallback to full guessable list
    if (!chosen || chosen.length === 0) return list || [];
    return chosen;
  }, [genMap, genToggles, allowedSet, list]);

  const target = useMemo(() => {
    if (!allowedAnswers || allowedAnswers.length === 0) return null;
    return randomFrom(allowedAnswers);
  }, [allowedAnswers, seed]);

  const [guesses, setGuesses] = useState<string[]>([]);
  const [evals, setEvals] = useState<EvalState[][]>([]);
  const [current, setCurrent] = useState("");
  const [toast, setToast] = useState<React.ReactNode | null>(null);

  // derive keyboard key colors from past guesses and their evaluations
  const keyColors = useMemo(() => {
    const map: Record<string, EvalState | ""> = {};
    "abcdefghijklmnopqrstuvwxyz".split("").forEach((c) => (map[c] = ""));
    const rank = (s: EvalState | "") =>
      s === "correct" ? 3 : s === "present" ? 2 : s === "absent" ? 1 : 0;
    for (let r = 0; r < guesses.length; r++) {
      const g = guesses[r] || "";
      const e = evals[r] || [];
      for (let i = 0; i < g.length; i++) {
        const letter = g[i];
        const state = (e[i] || "") as EvalState | "";
        if (rank(state) > rank(map[letter] || "")) map[letter] = state;
      }
    }
    return map;
  }, [guesses, evals]);

  const keyStyleFor = (ch: string, isWide = false): React.CSSProperties => {
    const state = keyColors[ch] || "";
    const bgMap: Record<string, string> = {
      "": "#818384",
      absent: "#3a3a3c",
      present: "#b59f3b",
      correct: "#538d4e",
    };
    const bg = bgMap[state];
    return {
      padding: isWide ? "8px 14px" : "8px 10px",
      borderRadius: 6,
      border: "none",
      cursor: "pointer",
      textTransform: "uppercase",
      background: bg,
      color: "#ffffff",
      fontWeight: state === "correct" || isWide ? 700 : 600,
      pointerEvents: "auto",
    };
  };

  const reset = useCallback(() => {
    setSeed((s) => s + 1);
    setGuesses([]);
    setEvals([]);
    setCurrent("");
    setToast(null);
    if (typeof document !== "undefined") {
      const el = document.activeElement as HTMLElement | null;
      if (el && typeof el.blur === "function") el.blur();
    }
  }, [setGuesses, setEvals]);

  const submitGuess = useCallback(() => {
    if (!target) return;
    const guess = current.toLowerCase();
    if (guess.length === 0) return;
    if (guess.length < 7 || guess.length > 10) {
      setToast("Guess must be between 7 and 10 letters");
      setTimeout(() => setToast(null), 2000);
      return;
    }
    if (!allowedSet.has(guess)) {
      setToast("Your guess has to be a valid Pokémon");
      setTimeout(() => setToast(null), 2000);
      return;
    }

    setGuesses((prev) => {
      if (prev.length >= NUM_ROWS) return prev;
      return [...prev, guess];
    });

    setEvals((prev) => {
      if (prev.length >= NUM_ROWS) return prev;
      return [...prev, evaluateGuess(guess, target)];
    });

    setCurrent("");

    // determine win/loss
    if (guess === target) {
      setToast(
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <div>You won 🎉</div>
          <div style={{ fontSize: 13, opacity: 0.9 }}>
            The Pokémon was {target}
          </div>
        </div>,
      );
      return;
    }

    // if this was the last allowed guess, show lose toast after state updates
    setTimeout(() => {
      const latestLen = guesses.length + 1; // we just added one
      if (latestLen >= NUM_ROWS) {
        setToast(
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <div>You lost 😞</div>
            <div style={{ fontSize: 13, opacity: 0.9 }}>
              The Pokémon was {target}
            </div>
          </div>,
        );
      }
    }, 50);
  }, [allowedSet, current, guesses.length, target]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const key = e.key;
      if (key === "Enter") {
        // submit guess on Enter
        submitGuess();
      } else if (key === "Backspace") {
        // remove last letter on Backspace
        setCurrent((prev) => prev.slice(0, -1));
      } else if (key.length === 1 && /[a-z]/i.test(key)) {
        // add letter to guess
        setCurrent((prev) => prev + key.toLowerCase());
      }
    },
    [submitGuess],
  );

  useEffect(() => {
    function handle(e: KeyboardEvent) {
      handleKeyDown(e);
    }
    window.addEventListener("keydown", handle);
    return () => {
      window.removeEventListener("keydown", handle);
    };
  }, [handleKeyDown]);

  return (
    <div className="pordle-app">
      {/* Settings button (top-right) */}
      <div style={{ position: "absolute", top: 12, right: 12, zIndex: 60 }}>
        <button
          onClick={() => setShowSettings((s) => !s)}
          style={{
            padding: "8px 10px",
            borderRadius: 8,
            border: "none",
            cursor: "pointer",
            background: "#374151",
            color: "#fff",
            fontWeight: 700,
          }}
        >
          Settings
        </button>
      </div>

      {showSettings && (
        <div
          style={{
            position: "fixed",
            top: 56,
            right: 16,
            background: "#0b1220",
            padding: 12,
            borderRadius: 8,
            boxShadow: "0 6px 20px rgba(0,0,0,0.4)",
            zIndex: 70,
            color: "#fff",
            minWidth: 220,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 8,
            }}
          >
            <div style={{ fontWeight: 700 }}>Generations</div>
            <div
              title={"Counts reflect Pokémon filtered to 7–10 letters"}
              style={{ color: "#9ca3af", fontSize: 13, cursor: "help" }}
            >
              ⓘ
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
            <button
              onClick={() =>
                setGenToggles(Array.from({ length: 9 }).map(() => true))
              }
              style={{
                padding: "6px 8px",
                borderRadius: 6,
                border: "none",
                cursor: "pointer",
              }}
            >
              Select all
            </button>
            <button
              onClick={() =>
                setGenToggles(Array.from({ length: 9 }).map(() => false))
              }
              style={{
                padding: "6px 8px",
                borderRadius: 6,
                border: "none",
                cursor: "pointer",
              }}
            >
              Select none
            </button>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 8,
            }}
          >
            {Array.from({ length: 9 }).map((_, i) => {
              const gen = i + 1;
              return (
                <label
                  key={gen}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={!!genToggles[i]}
                    onChange={() =>
                      setGenToggles((prev) => {
                        const copy = prev.slice();
                        copy[i] = !copy[i];
                        return copy;
                      })
                    }
                  />
                  <span style={{ fontSize: 13, userSelect: "none" }}>
                    G{gen}{" "}
                    <span
                      style={{
                        fontWeight: 400,
                        fontSize: 12,
                        color: "#9ca3af",
                      }}
                    >
                      ({genCounts[i]})
                    </span>
                  </span>
                </label>
              );
            })}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: 10,
              gap: 8,
            }}
          >
            <button
              onClick={() => setShowSettings(false)}
              style={{
                padding: "6px 10px",
                borderRadius: 6,
                border: "none",
                cursor: "pointer",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div
        style={{
          fontSize: 32,
          fontWeight: 700,
          textAlign: "center",
          marginTop: 32,
          marginBottom: 24,
          color: "#ffffff",
        }}
      >
        Pordle
      </div>
      <div
        style={{
          fontSize: 18,
          textAlign: "center",
          marginBottom: 32,
          color: "#ffffff",
        }}
      >
        Guess the Pokémon in {NUM_ROWS} tries
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
          alignItems: "center",
          marginBottom: 32,
        }}
      >
        {Array.from({ length: NUM_ROWS }).map((_, r) => {
          // show submitted guesses for rows < guesses.length
          // show the live `current` input for the active row (r === guesses.length)
          const letters =
            r < guesses.length
              ? guesses[r].split("")
              : r === guesses.length
                ? current.split("")
                : [];
          const evalStates = evals[r] || [];
          // only animate tiles when the row has evaluation states (i.e. a submitted row)
          const animateStates = Array.from({ length: NUM_COLS }, (_, i) =>
            r < guesses.length ? !!evalStates[i] : false,
          );
          return (
            <Row
              key={r}
              letters={letters}
              evalStates={evalStates}
              animateStates={animateStates}
            />
          );
        })}
      </div>
      <div style={{ marginTop: 18 }}>
        <div style={{ color: "#cbd5e1", marginBottom: 8 }}>
          Type letters, Backspace, Enter to submit. You can also click buttons
          below.
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", gap: 6, justifyContent: "center" }}>
            {"qwertyuiop".split("").map((ch) => (
              <button
                key={ch}
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                }}
                onMouseUp={() =>
                  setCurrent((c) => (c.length < NUM_COLS ? c + ch : c))
                }
                style={keyStyleFor(ch)}
              >
                {ch}
              </button>
            ))}
          </div>

          <div style={{ display: "flex", gap: 6, justifyContent: "center" }}>
            {"asdfghjkl".split("").map((ch) => (
              <button
                key={ch}
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                }}
                onMouseUp={() =>
                  setCurrent((c) => (c.length < NUM_COLS ? c + ch : c))
                }
                style={keyStyleFor(ch)}
              >
                {ch}
              </button>
            ))}
          </div>

          <div style={{ display: "flex", gap: 6, justifyContent: "center" }}>
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onMouseUp={() => submitGuess()}
              style={keyStyleFor("", true)}
            >
              Enter
            </button>

            {"zxcvbnm".split("").map((ch) => (
              <button
                key={ch}
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onMouseUp={() =>
                  setCurrent((c) => (c.length < NUM_COLS ? c + ch : c))
                }
                style={keyStyleFor(ch)}
              >
                {ch}
              </button>
            ))}

            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onMouseUp={() => setCurrent((c) => c.slice(0, -1))}
              style={keyStyleFor("", true)}
            >
              Back
            </button>
          </div>

          {/* Reset button removed (New Game button below replaces it) */}
        </div>
      </div>
      <button
        onClick={reset}
        style={{
          padding: "12px 16px",
          borderRadius: 8,
          border: "none",
          cursor: "pointer",
          background: "#3b82f6",
          color: "#ffffff",
          fontSize: 16,
          fontWeight: 700,
          width: "100%",
          maxWidth: 400,
          marginTop: 12,
        }}
      >
        New Game
      </button>
      {toast && (
        <Toast
          message={toast}
          onReset={() => {
            setToast(null);
            reset();
          }}
        />
      )}
    </div>
  );
}

export default function Pordle() {
  return (
    <div
      style={{
        fontFamily: "sans-serif",
        background: "#121213",
        minHeight: "100vh",
      }}
    >
      <NavBar />
      <AppInner />
    </div>
  );
}
