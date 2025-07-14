import { useState, useEffect } from "react";
import { getDifficulties, getSessionByDifficulty } from "../api/wordApi";
import type { Difficulty, GameSession } from "../types/types";

type Props = {
  onSessionStart: (session: GameSession) => void;
};

export default function DifficultySelector({ onSessionStart }: Props) {
  const [difficulties, setDifficulties] = useState<Difficulty[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchDifficulties() {
      try {
        const data = await getDifficulties();
        setDifficulties(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchDifficulties();
  }, []);

  const handleSelect = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    if (!selectedId) return;

    try {
      const rawSession = await getSessionByDifficulty(selectedId);
      const session: GameSession = {
        sessionId: rawSession.sessionId,
        difficulty: rawSession.difficulty,
        wordLength: rawSession.wordLenght,
      };
      onSessionStart(session);
    } catch (err: any) {
      alert("Error al iniciar sesión");
    }
  };

  if (loading) return <p className="text-gray-600">Cargando dificultades...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
      <label
        htmlFor="difficulty"
        className="block text-lg font-semibold text-gray-700"
      >
        Seleccionar dificultad
      </label>

      <select
        id="difficulty"
        onChange={handleSelect}
        defaultValue=""
        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      >
        <option value="" disabled>
          Elegí una opción
        </option>
        {difficulties.map((diff) => (
          <option key={diff.id} value={diff.id}>
            {diff.name}
          </option>
        ))}
      </select>
    </div>
  );
}
