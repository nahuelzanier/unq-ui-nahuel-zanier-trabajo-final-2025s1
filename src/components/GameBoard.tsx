import { useState } from "react";
import { checkWord } from "../api/wordApi";
import type { GameSession, LetterResult } from "../types/types";

type Props = {
  session: GameSession;
};

type Attempt = LetterResult[];

export default function GameBoard({ session }: Props) {
  const [word, setWord] = useState("");
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [status, setStatus] = useState<"playing" | "won" | "lost">("playing");
  const maxAttempts = 30;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (word.length !== session.wordLength || status !== "playing") return;

    try {
      const result: LetterResult[] = await checkWord(session.sessionId, word.toLowerCase());
      console.log(result)
      setAttempts((prev) => [...prev, result]);
      setWord("");

      const isWin = result.every((r) => r.solution === "correct");
      if (isWin) {
        setStatus("won");
      } else if (attempts.length + 1 === maxAttempts) {
        setStatus("lost");
      }
    } catch (err: any) {
        console.log(err)
      alert("Palabra inválida: " + err.message);
    }
  };

  return (
    <div>
      <h2>Intentos</h2>
      {attempts.map((attempt, index) => (
        <div key={index} style={{ display: "flex", gap: "5px", marginBottom: "5px" }}>
          {attempt.map((res, i) => (
            <div
              key={i}
              style={{
                width: "40px",
                height: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "4px",
                fontWeight: "bold",
                textTransform: "uppercase",
                backgroundColor:
                  res.solution === "correct"
                    ? "#4caf50"
                    : res.solution === "elsewhere"
                    ? "#ffeb3b"
                    : "#ccc",
              }}
            >
              {res.letter}
            </div>
          ))}
        </div>
      ))}

      {status === "playing" && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={word}
            onChange={(e) => setWord(e.target.value)}
            maxLength={session.wordLength}
            minLength={session.wordLength}
            style={{ textTransform: "uppercase" }}
          />
          <button type="submit">Enviar</button>
        </form>
      )}

      {status === "won" && <p>🎉 ¡Ganaste!</p>}
      {status === "lost" && <p>❌ Perdiste. Se acabaron los intentos.</p>}
    </div>
  );
}