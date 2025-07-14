import { useState } from "react";
import { checkWord } from "../api/wordApi";
import type { LetterResult, GameSession } from "../types/types";

export function useGameLogic(session: GameSession) {
  const [word, setWord] = useState("");
  const [attempts, setAttempts] = useState<LetterResult[][]>([]);
  const [status, setStatus] = useState<"playing" | "won" | "lost">("playing");
  const maxAttempts = 6;

  const handleSubmit = async () => {
    if (word.length !== session.wordLength || status !== "playing") return;

    try {
      const result = await checkWord(session.sessionId, word.toLowerCase());
      setAttempts((prev) => [...prev, result]);
      setWord("");

      const isWin = result.every((r) => r.solution === "correct");
      if (isWin) {
        setStatus("won");
      } else if (attempts.length + 1 === maxAttempts) {
        setStatus("lost");
      }
    } catch (err: any) {
      throw new Error(err.message);
    }
  };

  return {
    word,
    setWord,
    attempts,
    status,
    handleSubmit,
  };
}