import type { LetterResult, AnswerBody } from "../types/types";

const API_BASE = "https://word-api-hmlg.vercel.app/api";

export async function getDifficulties() {
    try {
        const res = await fetch(`${API_BASE}/difficulties`);
        if (!res.ok) throw new Error("Error al obtener dificultades");
        return res.json();
    } catch (error) {
        throw new Error("No se pudo conectar con el servidor");
    }
}

export async function getSessionByDifficulty(id: string) {
    try {
        const res = await fetch(`${API_BASE}/difficulties/${id}`);
        if (!res.ok) throw new Error("Sesión no encontrada");
        return res.json();
    } catch (error) {
        throw new Error("No se pudo iniciar la sesión de juego");
    }
}

export async function checkWord(sessionId: string, word: string): Promise<LetterResult[]> {
    const answerBody : AnswerBody = {
        sessionId: sessionId,
        word: word
    }
    const response = await fetch(`${API_BASE}/checkWord`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(answerBody)
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Error desconocido");
  }

  return response.json();
}